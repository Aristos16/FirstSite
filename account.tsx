import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/account")({
  component: AccountPage,
});

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  approval_status: string;
};

type Booking = {
  id: string;
  booking_type: string;
  appointment_date: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingType, setBookingType] = useState("Free trial");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingHour, setBookingHour] = useState<number | "">("");

  async function loadAccount() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (!profileData) {
      window.location.href = "/login";
      return;
    }

    setProfile(profileData);

    const { data: bookingData } = await supabase
      .from("booking_requests")
      .select("id, booking_type, appointment_date, status, notes, created_at")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false });

    setBookings(bookingData ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadAccount();
  }, []);

  async function handleBooking(e: React.FormEvent) {
  e.preventDefault();

  setMessage("");

  if (!appointmentDate) {
    setMessage("Please select a date.");
    return;
  }

  if (bookingHour === "") {
    setMessage("Please select an hour.");
    return;
  }

  const { error } = await supabase.rpc("create_member_booking", {
    selected_booking_type: bookingType,
    selected_date: appointmentDate,
    selected_hour: Number(bookingHour),
    selected_notes: notes,
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage("Booking created successfully.");
  setBookingType("Free trial");
  setAppointmentDate("");
  setBookingHour("");
  setNotes("");
  await loadAccount();
}

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return <div className="min-h-screen bg-[#070b12] p-8 text-white">Loading...</div>;
  }

  if (!profile) return null;

  if (profile.approval_status === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b12] px-6 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-3xl font-black">Waiting for approval</h1>
          <p className="mt-3 text-white/60">
            Your account has been created, but an admin needs to approve it before you can book.
          </p>
          <button onClick={logout} className="mt-6 rounded-md bg-lime-400 px-5 py-3 font-bold text-black">
            Logout
          </button>
        </div>
      </div>
    );
  }

  if (profile.approval_status === "rejected") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070b12] px-6 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <h1 className="text-3xl font-black">Account rejected</h1>
          <p className="mt-3 text-white/60">
            Your account was not approved. Please contact the gym.
          </p>
          <button onClick={logout} className="mt-6 rounded-md bg-lime-400 px-5 py-3 font-bold text-black">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070b12] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link to="/gym-demo" className="text-sm text-lime-300">
              ← Gym demo
            </Link>
            <h1 className="mt-3 text-4xl font-black">Member account</h1>
            <p className="text-white/60">{profile.email}</p>
          </div>

          <button onClick={logout} className="rounded-md border border-white/10 px-4 py-2 text-sm">
            Logout
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <form
            onSubmit={handleBooking}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
          >
            <h2 className="text-2xl font-bold">Make a booking</h2>

            <div className="mt-6 grid gap-4">
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
                className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
              >
                <option>Free trial</option>
                <option>Personal training</option>
                <option>Membership info</option>
              </select>

              <input
                required
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
              />
              <select
  required
  value={bookingHour}
  onChange={(e) => setBookingHour(Number(e.target.value))}
  className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
>
  <option value="">Select hour</option>
  {Array.from({ length: 14 }, (_, i) => 9 + i).map((hour) => (
    <option key={hour} value={hour}>
      {String(hour).padStart(2, "0")}:00 - {String(hour + 1).padStart(2, "0")}:00
    </option>
  ))}
</select>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
                rows={4}
                className="rounded-md border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none focus:border-lime-400"
              />

              <button className="rounded-md bg-lime-400 px-5 py-3 font-bold text-black">
                Submit booking
              </button>

              {message && <p className="text-sm text-lime-300">{message}</p>}
            </div>
          </form>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-2xl font-bold">My bookings</h2>

            <div className="mt-6 space-y-4">
              {bookings.length === 0 && (
                <p className="text-sm text-white/60">No bookings yet.</p>
              )}

              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-xl border border-white/10 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold">{booking.booking_type}</p>
                      <p className="text-sm text-white/60">
                        Date: {booking.appointment_date ?? "No date"}
                      </p>
                      {booking.notes && (
                        <p className="mt-2 text-sm text-white/60">{booking.notes}</p>
                      )}
                    </div>

                    <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-bold text-lime-300">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}