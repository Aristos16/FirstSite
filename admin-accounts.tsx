import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/admin-accounts")({
  component: AdminAccountsPage,
});

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  approval_status: string;
  created_at: string;
};

function AdminAccountsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  async function loadData() {
    const { data: userData } = await supabase.auth.getUser();

    if (!userData.user) {
      window.location.href = "/login";
      return;
    }

    setCurrentUserId(userData.user.id);

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

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    setProfiles(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function updateProfileStatus(id: string, approvalStatus: "approved" | "rejected") {
    setMessage("");

    const { error } = await supabase.rpc("admin_update_profile_status", {
      target_profile_id: id,
      new_status: approvalStatus,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadData();
  }

  async function makeAdmin(id: string) {
    setMessage("");

    const { error } = await supabase.rpc("admin_make_profile_admin", {
      target_profile_id: id,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadData();
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return <div className="min-h-screen bg-[#070b12] p-8 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#070b12] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/admin" className="text-sm text-lime-300">
              ← Back to admin dashboard
            </a>
            <h1 className="mt-3 text-4xl font-black">Accounts</h1>
            <p className="text-white/60">Approve members and manage admins.</p>
          </div>

          <button onClick={logout} className="rounded-md border border-white/10 px-4 py-2 text-sm">
            Logout
          </button>
        </div>

        {message && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
            {message}
          </div>
        )}

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-white/10 text-white/60">
                <tr>
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-white/10">
                    <td className="py-4">{profile.full_name || "—"}</td>
                    <td>{profile.email}</td>
                    <td>{profile.phone || "—"}</td>
                    <td>{profile.role}</td>
                    <td>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                        {profile.approval_status}
                      </span>
                    </td>
                    <td>
                      {profile.id === currentUserId ? (
                        <span className="text-xs text-white/50">This is you</span>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profile.approval_status !== "approved" && (
                            <button
                              onClick={() => updateProfileStatus(profile.id, "approved")}
                              className="rounded-md bg-lime-400 px-3 py-1.5 text-xs font-bold text-black"
                            >
                              Approve
                            </button>
                          )}

                          {profile.approval_status !== "rejected" && (
                            <button
                              onClick={() => updateProfileStatus(profile.id, "rejected")}
                              className="rounded-md bg-red-400 px-3 py-1.5 text-xs font-bold text-black"
                            >
                              Reject
                            </button>
                          )}

                          {profile.role !== "admin" && (
                            <button
                              onClick={() => makeAdmin(profile.id)}
                              className="rounded-md border border-white/10 px-3 py-1.5 text-xs"
                            >
                              Make admin
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}