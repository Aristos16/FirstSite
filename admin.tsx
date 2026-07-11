import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type Booking = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  booking_type: string;
  appointment_date: string | null;
  booking_hour: number | null;
  end_hour: number | null;
  notes: string | null;
  status: string;
  created_at: string;
};

type ScheduleRow = {
  day_of_week: number;
  day_name: string;
  is_open: boolean;
  start_hour: number;
  end_hour: number;
  capacity: number;
};

function formatHour(hour: number | null) {
  if (hour === null) return "—";
  return `${String(hour).padStart(2, "0")}:00`;
}

function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [schedule, setSchedule] = useState<ScheduleRow[]>([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadAdminData() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: myProfile } = await supabase
      .from("profiles")
      .select("role, approval_status")
      .eq("id", userData.user.id)
      .single();

    if (
      !myProfile ||
      myProfile.role !== "admin" ||
      myProfile.approval_status !== "approved"
    ) {
      window.location.href = "/account";
      return;
    }

    const { data: bookingData } = await supabase
      .from("booking_requests")
      .select("*")
      .order("appointment_date", { ascending: false })
      .order("booking_hour", { ascending: true });

    const { data: scheduleData } = await supabase
      .from("gym_schedule")
      .select("*")
      .order("day_of_week", { ascending: true });

    setBookings(bookingData ?? []);
    setSchedule(scheduleData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadAdminData();
  }, []);

  async function updateSchedule(row: ScheduleRow, changes: Partial<ScheduleRow>) {
    setMessage("");

    const { error } = await supabase
      .from("gym_schedule")
      .update(changes)
      .eq("day_of_week", row.day_of_week);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadAdminData();
  }

  async function deleteBooking(id: string) {
    const confirmed = confirm("Delete this booking?");
    if (!confirmed) return;

    const { error } = await supabase.from("booking_requests").delete().eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadAdminData();
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  const selectedBookings = bookings.filter(
    (booking) => booking.appointment_date === selectedDate
  );

  const selectedDay = schedule.find(
    (row) => row.day_of_week === new Date(`${selectedDate}T12:00:00`).getDay()
  );

  const hours =
    selectedDay && selectedDay.is_open
      ? Array.from(
          { length: selectedDay.end_hour - selectedDay.start_hour },
          (_, i) => selectedDay.start_hour + i
        )
      : [];

  if (loading) {
    return <div className="min-h-screen bg-[#070b12] p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#070b12] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/gym-demo" className="text-sm text-lime-300">
              ← Gym demo
            </a>
            <h1 className="mt-3 text-4xl font-black">Admin dashboard</h1>
            <p className="text-white/60">Bookings, capacity, and weekly schedule.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin-accounts"
              className="rounded-md bg-lime-400 px-4 py-2 text-sm font-bold text-black"
            >
              Manage accounts
            </a>

            <button onClick={logout} className="rounded-md border border-white/10 px-4 py-2 text-sm">
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
            {message}
          </div>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Bookings by hour</h2>
              <p className="mt-1 text-sm text-white/60">
                Max capacity is shown from the selected day schedule.
              </p>
            </div>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-md border border-white/10 bg-black/30 px-4 py-2 text-sm outline-none"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {!selectedDay || !selectedDay.is_open ? (
              <div className="rounded-xl border border-white/10 p-4 text-sm text-white/60">
                Closed on this day.
              </div>
            ) : (
              hours.map((hour) => {
                const count = selectedBookings.filter(
                  (booking) =>
                    booking.booking_hour === hour &&
                    ["pending", "confirmed"].includes(booking.status)
                ).length;

                return (
                  <div key={hour} className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-lg font-black">
                      {formatHour(hour)} - {formatHour(hour + 1)}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      {count}/{selectedDay.capacity} booked
                    </p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full bg-lime-400"
                        style={{
                          width: `${Math.min(100, (count / selectedDay.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold">Booking requests</h2>

          <div className="mt-6 space-y-4">
            {bookings.length === 0 && (
              <p className="text-sm text-white/60">No bookings yet.</p>
            )}

            {bookings.map((booking) => (
              <div key={booking.id} className="rounded-xl border border-white/10 p-5">
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold">{booking.full_name}</h3>
                      <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-300">
                        {booking.status}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-white/60">{booking.email}</p>
                    <p className="text-sm text-white/60">{booking.phone || "No phone"}</p>

                    <div className="mt-4 grid gap-2 text-sm text-white/75 sm:grid-cols-3">
                      <p>Type: {booking.booking_type}</p>
                      <p>Date: {booking.appointment_date || "No date"}</p>
                      <p>
                        Time: {formatHour(booking.booking_hour)} - {formatHour(booking.end_hour)}
                      </p>
                    </div>

                    {booking.notes && (
                      <p className="mt-3 text-sm text-white/60">Notes: {booking.notes}</p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="rounded-md bg-red-400 px-3 py-2 text-sm font-bold text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-bold">Weekly booking schedule</h2>
          <p className="mt-1 text-sm text-white/60">
            Control which days are open and the capacity per hour.
          </p>

          <div className="mt-6 space-y-4">
            {schedule.map((row) => (
              <div
                key={row.day_of_week}
                className="grid gap-4 rounded-xl border border-white/10 p-4 md:grid-cols-[1fr_auto_auto_auto_auto]"
              >
                <div>
                  <p className="font-bold">{row.day_name}</p>
                  <p className="text-sm text-white/60">
                    {row.is_open
                      ? `${formatHour(row.start_hour)} - ${formatHour(row.end_hour)}`
                      : "Closed"}
                  </p>
                </div>

                <select
                  value={row.is_open ? "open" : "closed"}
                  onChange={(e) => updateSchedule(row, { is_open: e.target.value === "open" })}
                  className="rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm"
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>

                <input
                  type="number"
                  min={0}
                  max={23}
                  value={row.start_hour}
                  onChange={(e) => updateSchedule(row, { start_hour: Number(e.target.value) })}
                  className="w-24 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  min={1}
                  max={24}
                  value={row.end_hour}
                  onChange={(e) => updateSchedule(row, { end_hour: Number(e.target.value) })}
                  className="w-24 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm"
                />

                <input
                  type="number"
                  min={1}
                  value={row.capacity}
                  onChange={(e) => updateSchedule(row, { capacity: Number(e.target.value) })}
                  className="w-24 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}