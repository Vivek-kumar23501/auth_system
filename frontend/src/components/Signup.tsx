import React, { useState } from "react";
import axios from "axios";
import api from "../lib/axioss";
import { Link } from "react-router-dom";



interface FormState {
  fullname: string;
  email: string;
  mobile: string;
  password: string;
}

const initialForm: FormState = {
  fullname: "",
  email: "",
  mobile: "",
  password: "",
};

const Signup: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitform = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data } = await api.post("/auth/signup", form);
      console.log(data);
      setSuccess(true);
      setForm(initialForm);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F7F9F8]">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between bg-gradient-to-br from-[#0A4A45] to-[#0F6B64] text-white px-12 py-12 overflow-hidden">
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45]">
            T
          </div>
          <span className="font-semibold text-lg tracking-tight">
            TrackMap Inovations Private Limited
          </span>
        </div>

        {/* Signature: animated tracking route with a moving pin */}
        <div className="relative z-10 my-16">
          <svg viewBox="0 0 400 100" className="w-full h-24 overflow-visible" fill="none">
            <path
              id="route-path"
              d="M10,80 C 80,80 90,20 160,20 C 230,20 240,70 310,70 C 350,70 360,30 390,30"
              stroke="#3E7A73"
              strokeWidth="2"
              strokeDasharray="6 6"
              strokeLinecap="round"
            />
            <path
              d="M10,80 C 80,80 90,20 160,20 C 230,20 240,70 310,70 C 350,70 360,30 390,30"
              stroke="#F2A93B"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="route-progress"
            />
            <circle r="5" fill="#F2A93B" className="route-pin">
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                path="M10,80 C 80,80 90,20 160,20 C 230,20 240,70 310,70 C 350,70 360,30 390,30"
              />
            </circle>
          </svg>
          <style>{`
            .route-progress {
              stroke-dasharray: 460;
              stroke-dashoffset: 460;
              animation: draw-route 3.2s ease-in-out infinite;
            }
            @keyframes draw-route {
              0% { stroke-dashoffset: 460; }
              80%, 100% { stroke-dashoffset: 0; }
            }
          `}</style>
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8FC6BF] font-medium">
            Internship management, simplified
          </p>
          <h1 className="text-3xl font-semibold leading-snug max-w-sm">
            Track every intern's journey, from application to offer.
          </h1>
          <p className="text-[#CDE7E2] text-sm max-w-sm leading-relaxed">
            TrackMap gives your team one place to manage applications,
            mentors, and progress across every internship batch.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-7 h-7 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45] text-sm">
              T
            </div>
            <span className="font-semibold text-[#0A4A45]">TrackMap Inovation Privated Limited</span>
          </div>

          <h2 className="text-2xl font-semibold text-[#10231F]">
            Create your account
          </h2>
          <p className="text-sm text-[#5B6B67] mt-1 mb-6">
            Set up access to manage internships for your organization.
          </p>

          {success && (
            <div className="mb-4 rounded-md border border-[#0F6B64]/20 bg-[#0F6B64]/5 px-4 py-2.5 text-sm text-[#0A4A45]">
              Account created successfully. You can now log in.
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={submitform} className="space-y-4">
            <div>
              <label htmlFor="fullname" className="block mb-1.5 text-sm font-medium text-[#10231F]">
                Full name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                required
                value={form.fullname}
                onChange={handleForm}
                placeholder="Enter your full name"
                className="w-full rounded-md border border-[#DCE5E2] bg-white px-3.5 py-2.5 text-sm text-[#10231F] placeholder:text-[#9AAAA6] outline-none transition focus:border-[#0F6B64] focus:ring-2 focus:ring-[#0F6B64]/15"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-[#10231F]">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleForm}
                placeholder="Enter your email"
                className="w-full rounded-md border border-[#DCE5E2] bg-white px-3.5 py-2.5 text-sm text-[#10231F] placeholder:text-[#9AAAA6] outline-none transition focus:border-[#0F6B64] focus:ring-2 focus:ring-[#0F6B64]/15"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block mb-1.5 text-sm font-medium text-[#10231F]">
                Mobile number
              </label>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                required
                value={form.mobile}
                onChange={handleForm}
                placeholder="Enter your mobile number"
                className="w-full rounded-md border border-[#DCE5E2] bg-white px-3.5 py-2.5 text-sm text-[#10231F] placeholder:text-[#9AAAA6] outline-none transition focus:border-[#0F6B64] focus:ring-2 focus:ring-[#0F6B64]/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-[#10231F]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={handleForm}
                placeholder="Enter your password"
                className="w-full rounded-md border border-[#DCE5E2] bg-white px-3.5 py-2.5 text-sm text-[#10231F] placeholder:text-[#9AAAA6] outline-none transition focus:border-[#0F6B64] focus:ring-2 focus:ring-[#0F6B64]/15"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#0F6B64] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A4A45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-[#5B6B67]">
              Already have an account?{<Link  className="font-medium text-[#0F6B64] cursor-pointer hover:underline" to={"/login"} > Login here</Link>}
              
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;