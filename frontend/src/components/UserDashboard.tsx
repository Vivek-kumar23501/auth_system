import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axioss";

interface Application {
  id: string;
  company: string;
  role: string;
  appliedOn: string;
  status: "Applied" | "Shortlisted" | "Interview" | "Offer" | "Rejected";
}

interface DashboardData {
  fullname: string;
  applications: Application[];
}

const statusStyles: Record<Application["status"], string> = {
  Applied: "bg-[#EEF2F1] text-[#5B6B67]",
  Shortlisted: "bg-[#FDF1DD] text-[#B67A16]",
  Interview: "bg-[#E6F3F1] text-[#0F6B64]",
  Offer: "bg-[#0F6B64]/10 text-[#0A4A45]",
  Rejected: "bg-red-50 text-red-600",
};

const sampleData: DashboardData = {
  fullname: "Aditi Sharma",
  applications: [
    { id: "1", company: "Nimbus Labs", role: "Frontend Intern", appliedOn: "12 Jun 2026", status: "Interview" },
    { id: "2", company: "Orbit Health", role: "Data Analyst Intern", appliedOn: "05 Jun 2026", status: "Shortlisted" },
    { id: "3", company: "Fieldwire", role: "Product Design Intern", appliedOn: "28 May 2026", status: "Applied" },
    { id: "4", company: "Corestack", role: "Backend Intern", appliedOn: "20 May 2026", status: "Offer" },
    { id: "5", company: "Lumen Retail", role: "Marketing Intern", appliedOn: "14 May 2026", status: "Rejected" },
  ],
};

const UserDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: res } = await api.get("/dashboard");
        if (isMounted) setData(res.user ?? res);
      } catch (err: any) {
        if (isMounted) {
          // Fall back to sample data if the endpoint isn't wired up yet
          setData(sampleData);
          setError(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  const stats = data
    ? [
        { label: "Total applications", value: data.applications.length },
        {
          label: "Interviews lined up",
          value: data.applications.filter((a) => a.status === "Interview").length,
        },
        {
          label: "Offers received",
          value: data.applications.filter((a) => a.status === "Offer").length,
        },
      ]
    : [];

  return (
    <div className="min-h-screen flex bg-[#F7F9F8]">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-60 flex-col bg-gradient-to-b from-[#0A4A45] to-[#0F6B64] text-white px-5 py-6">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45]">
            T
          </div>
          <span className="font-semibold text-sm leading-tight">
            TrackMap Innovations
          </span>
        </div>

        <nav className="flex flex-col gap-1 text-sm">
          <Link
            to="/UserDashboard"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 bg-white/10 font-medium"
          >
            <DashboardIcon />
            Dashboard
          </Link>
          <Link
            to="/applications"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[#CDE7E2] hover:bg-white/10 transition"
          >
            <ApplicationsIcon />
            Applications
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-[#CDE7E2] hover:bg-white/10 transition"
          >
            <ProfileIcon />
            Profile
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <button className="flex items-center gap-2.5 w-full rounded-md px-3 py-2.5 text-sm text-[#CDE7E2] hover:bg-white/10 transition">
            <LogoutIcon />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#DCE5E2] bg-white">
          <div className="md:hidden flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45] text-sm">
              T
            </div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#10231F]">
              {loading ? "Loading..." : `Welcome back, ${data?.fullname.split(" ")[0]}`}
            </h1>
            <p className="text-xs text-[#5B6B67] mt-0.5">
              Here's what's happening with your internships.
            </p>
          </div>
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-[#F2A93B] flex items-center justify-center font-semibold text-sm text-[#0A4A45]"
          >
            {data?.fullname
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() ?? ""}
          </Link>
        </header>

        <main className="flex-1 px-6 md:px-10 py-8">
          {error && (
            <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-lg border border-[#DCE5E2] bg-white animate-pulse"
                  />
                ))
              : stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-[#DCE5E2] bg-white px-5 py-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-[#9AAAA6] font-medium">
                      {s.label}
                    </p>
                    <p className="text-2xl font-semibold text-[#10231F] mt-1.5">
                      {s.value}
                    </p>
                  </div>
                ))}
          </div>

          {/* Applications table */}
          <div className="rounded-lg border border-[#DCE5E2] bg-white overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE5E2]">
              <h2 className="text-sm font-semibold text-[#10231F]">
                Recent applications
              </h2>
              <Link
                to="/applications"
                className="text-xs font-medium text-[#0F6B64] hover:underline"
              >
                View all
              </Link>
            </div>

            {loading ? (
              <div className="p-5 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-10 rounded-md bg-[#F7F9F8] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-[#9AAAA6] border-b border-[#DCE5E2]">
                      <th className="px-5 py-3 font-medium">Company</th>
                      <th className="px-5 py-3 font-medium">Role</th>
                      <th className="px-5 py-3 font-medium">Applied on</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.applications.map((app) => (
                      <tr
                        key={app.id}
                        className="border-b border-[#DCE5E2] last:border-0 hover:bg-[#F7F9F8] transition"
                      >
                        <td className="px-5 py-3.5 text-[#10231F] font-medium">
                          {app.company}
                        </td>
                        <td className="px-5 py-3.5 text-[#5B6B67]">{app.role}</td>
                        <td className="px-5 py-3.5 text-[#5B6B67]">{app.appliedOn}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[app.status]}`}
                          >
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const ApplicationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 15h6" />
    <path d="M9 11h6" />
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

export default UserDashboard;