import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ---------- Content data ---------- */

const features = [
  {
    title: "Application tracking",
    description:
      "Every internship application moves through clear stages — applied, shortlisted, interview, offer — visible to the whole team in real time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: "Mentor management",
    description: "Assign mentors to interns, log check-ins, and keep feedback in one thread instead of scattered emails.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Batch progress",
    description: "A live view across every internship batch — who's active, who's completing, who needs attention.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 3v18h18" />
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
      </svg>
    ),
  },
  {
    title: "Role-based access",
    description: "Admins, mentors, and interns each see exactly what's relevant to them — nothing more, nothing less.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Document handling",
    description: "Resumes, offer letters, and completion certificates stored against each intern's profile, ready when you need them.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15h6" />
        <path d="M9 11h6" />
      </svg>
    ),
  },
  {
    title: "Notifications",
    description: "Automatic status updates so interns and mentors always know what's next, without anyone chasing anyone.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

const steps = [
  { number: "01", title: "Apply", description: "Interns submit applications with resumes and details through one guided form." },
  { number: "02", title: "Track", description: "Coordinators move applications through review, interview, and offer stages." },
  { number: "03", title: "Manage", description: "Once onboarded, mentors and admins track progress until the internship wraps up." },
  { number: "04", title: "Complete", description: "Generate completion records and feedback once the internship ends." },
];

const roleContent: Record<string, { heading: string; points: string[] }> = {
  Interns: {
    heading: "A clear view of your own journey",
    points: [
      "Track every application you've submitted in one dashboard",
      "See feedback from mentors as soon as it's added",
      "Get notified the moment your status changes",
    ],
  },
  Mentors: {
    heading: "Less admin, more mentoring",
    points: [
      "See only the interns assigned to you",
      "Log check-ins and feedback in seconds",
      "Flag interns who need extra support early",
    ],
  },
  Admins: {
    heading: "Full visibility, zero spreadsheets",
    points: [
      "Monitor every batch, mentor, and application at once",
      "Spot bottlenecks in the review pipeline before they pile up",
      "Export reports without stitching together five different sheets",
    ],
  },
};

const comparison = [
  { item: "Application status", spreadsheet: "Manually updated, easy to miss", trackmap: "Updated live, visible to everyone" },
  { item: "Mentor feedback", spreadsheet: "Buried in email threads", trackmap: "Logged against each intern's profile" },
  { item: "Batch overview", spreadsheet: "Rebuilt every time someone asks", trackmap: "Always up to date, one dashboard" },
  { item: "Access control", spreadsheet: "Everyone sees everything", trackmap: "Role-based, scoped to what's relevant" },
];

const faqs = [
  {
    q: "Who is TrackMap built for?",
    a: "TrackMap is built for organizations running structured internship programs — coordinators who manage applications and batches, mentors guiding interns, and interns tracking their own progress.",
  },
  {
    q: "Is my data secure?",
    a: "Access is role-based, so interns, mentors, and admins only see what's relevant to them. Authentication is handled through secure sessions with token refresh.",
  },
  {
    q: "Can I manage multiple internship batches at once?",
    a: "Yes. The dashboard is built to give a live view across every active batch, not just one cohort at a time.",
  },
  {
    q: "Do interns need to install anything?",
    a: "No. TrackMap runs in the browser — interns, mentors, and admins all log in through the same web app with role-based views.",
  },
];

const companyInfo = [
  { label: "CIN", value: "U74909BR2025PTC075493" },
  { label: "Company status", value: "Active" },
  { label: "Registration number", value: "075493" },
  { label: "Date of incorporation", value: "24th April, 2025" },
  { label: "Company age", value: "1 year, 2 months & 11 days" },
  { label: "RoC", value: "RoC-Patna" },
  { label: "Authorized capital", value: "₹10,00,000" },
  { label: "Paid-up capital", value: "₹1,00,000" },
  { label: "Company category", value: "Company limited by shares" },
  { label: "Company sub-category", value: "Non-govt company" },
  { label: "Class of company", value: "Private" },
  { label: "Activity", value: "Other professional, scientific and technical activities n.e.c." },
  { label: "Listing status", value: "Unlisted" },
  { label: "Directors / KMP", value: "Not publicly listed" },
  { label: "Last AGM", value: "N/A" },
  { label: "Latest balance sheet", value: "N/A" },
];

/* ---------- Component ---------- */

const Home: React.FC = () => {
  const [activeRole, setActiveRole] = useState<keyof typeof roleContent>("Interns");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F9F8] text-[#10231F]">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-[#F7F9F8]/90 backdrop-blur border-b border-[#DCE5E2]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45]">T</div>
            <span className="font-semibold text-sm tracking-tight">TrackMap Innovations</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#5B6B67]">
            <a href="#features" className="hover:text-[#10231F] transition">Features</a>
            <a href="#how-it-works" className="hover:text-[#10231F] transition">How it works</a>
            <a href="#roles" className="hover:text-[#10231F] transition">Who it's for</a>
            <a href="#faq" className="hover:text-[#10231F] transition">FAQ</a>
            <a href="#company" className="hover:text-[#10231F] transition">Company</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-[#0F6B64] hover:text-[#0A4A45] transition">Log in</Link>
            <Link to="/signup" className="text-sm font-semibold text-white bg-[#0F6B64] hover:bg-[#0A4A45] transition rounded-md px-4 py-2">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-4">
            Internship management, simplified
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
            Track every intern's journey, from application to offer.
          </h1>
          <p className="text-[#5B6B67] text-base mt-5 leading-relaxed max-w-md">
            TrackMap gives your team one place to manage applications, mentors,
            and progress across every internship batch — no more spreadsheets
            or scattered email threads.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <Link to="/signup" className="rounded-md bg-[#0F6B64] hover:bg-[#0A4A45] transition text-white text-sm font-semibold px-6 py-3">
              Create free account
            </Link>
            <Link to="/login" className="rounded-md border border-[#DCE5E2] hover:border-[#0F6B64] transition text-sm font-medium text-[#10231F] px-6 py-3">
              I already have an account
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#5B6B67] border border-[#DCE5E2] rounded-full px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0F6B64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              MCA registered company
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#5B6B67] border border-[#DCE5E2] rounded-full px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0F6B64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Role-based access
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#5B6B67] border border-[#DCE5E2] rounded-full px-3 py-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0F6B64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              Live status tracking
            </span>
          </div>
        </div>

        {/* Signature: animated tracking route */}
        <div className="relative rounded-2xl bg-gradient-to-br from-[#0A4A45] to-[#0F6B64] p-10 overflow-hidden">
          <svg viewBox="0 0 400 220" className="w-full h-auto overflow-visible" fill="none">
            <path d="M20,180 C 90,180 100,60 170,60 C 240,60 250,160 320,160 C 350,160 360,90 380,90" stroke="#3E7A73" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round" />
            <path d="M20,180 C 90,180 100,60 170,60 C 240,60 250,160 320,160 C 350,160 360,90 380,90" stroke="#F2A93B" strokeWidth="2.5" strokeLinecap="round" className="route-progress" />
            <circle cx="20" cy="180" r="5" fill="white" />
            <circle cx="380" cy="90" r="5" fill="#F2A93B" />
            <circle r="5" fill="#F2A93B" className="route-pin">
              <animateMotion dur="3.6s" repeatCount="indefinite" path="M20,180 C 90,180 100,60 170,60 C 240,60 250,160 320,160 C 350,160 360,90 380,90" />
            </circle>
          </svg>
          <div className="mt-4 flex items-center justify-between text-[#CDE7E2] text-xs">
            <span>Application submitted</span>
            <span>Offer received</span>
          </div>
          <style>{`
            .route-progress { stroke-dasharray: 520; stroke-dashoffset: 520; animation: draw-route 3.6s ease-in-out infinite; }
            @keyframes draw-route { 0% { stroke-dashoffset: 520; } 85%, 100% { stroke-dashoffset: 0; } }
          `}</style>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 border-t border-[#DCE5E2]">
        <div className="max-w-lg mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-3">What you get</p>
          <h2 className="text-2xl md:text-3xl font-semibold">Everything your internship program needs in one place</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg border border-[#DCE5E2] bg-white p-6">
              <div className="w-10 h-10 rounded-md bg-[#0F6B64]/10 text-[#0F6B64] flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-[#10231F] mb-2">{f.title}</h3>
              <p className="text-sm text-[#5B6B67] leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white border-t border-[#DCE5E2]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-lg mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-3">How it works</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Four steps from application to completion</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.number} className="relative">
                <span className="text-4xl font-semibold text-[#DCE5E2]">{s.number}</span>
                <h3 className="text-base font-semibold text-[#10231F] mt-3 mb-2">{s.title}</h3>
                <p className="text-sm text-[#5B6B67] leading-relaxed">{s.description}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 -right-4 w-8 h-px bg-[#DCE5E2]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-lg mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-3">Who it's for</p>
          <h2 className="text-2xl md:text-3xl font-semibold">Built for every role in the program</h2>
        </div>

        <div className="flex gap-2 mb-8">
          {(Object.keys(roleContent) as Array<keyof typeof roleContent>).map((role) => (
            <button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`text-sm font-medium rounded-md px-4 py-2 transition ${
                activeRole === role
                  ? "bg-[#0F6B64] text-white"
                  : "bg-white border border-[#DCE5E2] text-[#5B6B67] hover:border-[#0F6B64]"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-[#DCE5E2] bg-white p-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-lg font-semibold text-[#10231F] mb-4">
              {roleContent[activeRole].heading}
            </h3>
            <ul className="space-y-3">
              {roleContent[activeRole].points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-[#5B6B67]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0F6B64" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mt-0.5 shrink-0">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-[#F7F9F8] border border-[#DCE5E2] px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#F2A93B]/20 text-[#0A4A45] flex items-center justify-center mx-auto mb-3 font-semibold text-lg">
              {activeRole[0]}
            </div>
            <p className="text-sm text-[#5B6B67]">
              Logged in as <span className="font-medium text-[#10231F]">{activeRole.slice(0, -1)}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-white border-t border-[#DCE5E2]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-lg mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-3">Why switch</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Spreadsheets vs. TrackMap</h2>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#DCE5E2]">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[#DCE5E2] bg-[#F7F9F8]">
                  <th className="px-5 py-3 font-medium text-[#10231F]">Task</th>
                  <th className="px-5 py-3 font-medium text-[#5B6B67]">Spreadsheets &amp; email</th>
                  <th className="px-5 py-3 font-medium text-[#0F6B64]">TrackMap</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.item} className="border-b border-[#DCE5E2] last:border-0">
                    <td className="px-5 py-4 font-medium text-[#10231F]">{row.item}</td>
                    <td className="px-5 py-4 text-[#9AAAA6]">{row.spreadsheet}</td>
                    <td className="px-5 py-4 text-[#0A4A45] font-medium">{row.trackmap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-lg mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-[#0F6B64] font-semibold mb-3">FAQ</p>
          <h2 className="text-2xl md:text-3xl font-semibold">Common questions</h2>
        </div>

        <div className="max-w-2xl divide-y divide-[#DCE5E2] border-t border-b border-[#DCE5E2]">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left"
              >
                <span className="text-sm font-medium text-[#10231F]">{faq.q}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5B6B67"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {openFaq === i && (
                <p className="text-sm text-[#5B6B67] leading-relaxed pb-4 pr-8">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-2xl bg-gradient-to-br from-[#0A4A45] to-[#0F6B64] px-8 py-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            Ready to organize your internship program?
          </h2>
          <p className="text-[#CDE7E2] text-sm max-w-md mx-auto mb-7">
            Set up your account in minutes and get a clear view of every
            applicant, mentor, and batch.
          </p>
          <Link to="/signup" className="inline-block rounded-md bg-[#F2A93B] hover:bg-[#e0982b] transition text-[#0A4A45] text-sm font-semibold px-6 py-3">
            Create your account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="company" className="border-t border-[#DCE5E2] bg-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-md bg-[#F2A93B] flex items-center justify-center font-bold text-[#0A4A45] text-sm">T</div>
                <span className="font-semibold text-sm">TrackMap Innovations Private Limited</span>
              </div>
              <p className="text-xs text-[#5B6B67] leading-relaxed max-w-xs">
                Registered office: Ghusukpur Kalibagh, Bettiah West Champaran,
                Bettiah, West Champaran, Bihar, India, 845438
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#10231F] mb-3">Product</p>
              <ul className="space-y-2 text-xs text-[#5B6B67]">
                <li><a href="#features" className="hover:text-[#0F6B64] transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-[#0F6B64] transition">How it works</a></li>
                <li><a href="#roles" className="hover:text-[#0F6B64] transition">Who it's for</a></li>
                <li><a href="#faq" className="hover:text-[#0F6B64] transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#10231F] mb-3">Account</p>
              <ul className="space-y-2 text-xs text-[#5B6B67]">
                <li><Link to="/signup" className="hover:text-[#0F6B64] transition">Sign up</Link></li>
                <li><Link to="/login" className="hover:text-[#0F6B64] transition">Log in</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[#DCE5E2]">
            <button
              onClick={() => setShowCompanyDetails((v) => !v)}
              className="text-xs font-medium text-[#0F6B64] hover:underline"
            >
              {showCompanyDetails ? "Hide company registration details" : "View company registration details"}
            </button>

            {showCompanyDetails && (
              <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-xs">
                {companyInfo.map((item) => (
                  <div key={item.label}>
                    <p className="text-[#9AAAA6] uppercase tracking-wide">{item.label}</p>
                    <p className="text-[#10231F] font-medium mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-[#DCE5E2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9AAAA6]">
            <span>© {new Date().getFullYear()} TrackMap Innovations Private Limited. All rights reserved.</span>
            <span>CIN: U74909BR2025PTC075493</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;