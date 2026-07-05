import React, { useEffect, useState } from "react";
import api from "../lib/axioss";

interface ProfileData {
  fullname: string;
  email: string;
  mobile: string;
  avatarUrl?: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<ProfileData | null>(null);
  const [avatar, setAvatar] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSession = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get("/auth/session");
        // Adjust this if your API wraps the user inside e.g. data.user
        const sessionUser: ProfileData = data.user ?? data;

        if (isMounted) {
          setUser(sessionUser);
          setAvatar(sessionUser.avatarUrl);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ??
              "Unable to load profile. Please try again."
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const initials = user
    ? user.fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "";

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9F8] px-6 py-12">
        <div className="w-full max-w-sm rounded-xl border border-[#DCE5E2] bg-white shadow-sm p-10 flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#DCE5E2] border-t-[#0F6B64] animate-spin" />
          <p className="text-sm text-[#5B6B67]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9F8] px-6 py-12">
        <div className="w-full max-w-sm rounded-xl border border-[#DCE5E2] bg-white shadow-sm p-8 text-center">
          <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2.5">
            {error ?? "No profile data found."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9F8] px-6 py-12">
      <div className="w-full max-w-sm rounded-xl border border-[#DCE5E2] bg-white shadow-sm overflow-hidden">
        {/* Header band */}
        <div className="h-20 bg-gradient-to-br from-[#0A4A45] to-[#0F6B64] relative">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-20 h-20 rounded-full ring-4 ring-white bg-[#F2A93B] flex items-center justify-center overflow-hidden">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-[#0A4A45]">
                    {initials}
                  </span>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#0F6B64] border-2 border-white flex items-center justify-center cursor-pointer hover:bg-[#0A4A45] transition"
                title="Change photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="pt-14 pb-8 px-8">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-[#10231F]">
              {user.fullname}
            </h2>
            <p className="text-xs text-[#5B6B67] mt-0.5">Intern Profile</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-md border border-[#DCE5E2] bg-[#F7F9F8] px-3.5 py-2.5">
              <div className="w-8 h-8 rounded-md bg-[#0F6B64]/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F6B64"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-[#9AAAA6] font-medium">
                  Full name
                </p>
                <p className="text-sm text-[#10231F] truncate">
                  {user.fullname}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-[#DCE5E2] bg-[#F7F9F8] px-3.5 py-2.5">
              <div className="w-8 h-8 rounded-md bg-[#0F6B64]/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F6B64"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M4 4h16v16H4z" stroke="none" />
                  <path d="M22 6 12 13 2 6" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-[#9AAAA6] font-medium">
                  Email
                </p>
                <p className="text-sm text-[#10231F] truncate">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-md border border-[#DCE5E2] bg-[#F7F9F8] px-3.5 py-2.5">
              <div className="w-8 h-8 rounded-md bg-[#0F6B64]/10 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0F6B64"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-[#9AAAA6] font-medium">
                  Mobile number
                </p>
                <p className="text-sm text-[#10231F] truncate">
                  {user.mobile}
                </p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 rounded-md bg-[#0F6B64] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A4A45]">
            Edit profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;