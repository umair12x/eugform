"use client";
import React, { useMemo, useState } from "react";
import Logo from "@/components/Logo";

/*
  Admin / landing dashboard for Uni.Enrollment
  - Tailwind CSS required
  - Replace mock data with real API calls later
*/

export default function Home() {
  // mock students, replace with API data
  const initialStudents = [
    {
      id: "UAF-2025-001",
      name: "Ahsan Ali",
      gender: "male",
      program: "BS Computer Science",
      session: "2024-25",
      semester: "1st",
      degree: "Undergraduate",
      status: "enrolled",
      voucher: null,
      phone: "0300-1112223",
      email: "ahsan.ali@example.com",
      branch: "Habib Bank, Gulberg",
      submittedAt: "2025-08-10",
    },
    {
      id: "UAF-2025-002",
      name: "Sara Khan",
      gender: "female",
      program: "BS Mathematics",
      session: "2024-25",
      semester: "1st",
      degree: "Undergraduate",
      status: "pending",
      voucher: null,
      phone: "0301-2223334",
      email: "sara.khan@example.com",
      branch: "",
      submittedAt: "",
    },
    {
      id: "UAF-2025-003",
      name: "Bilal Ahmed",
      gender: "male",
      program: "DPT",
      session: "2024-25",
      semester: "2nd",
      degree: "Diploma",
      status: "requires_action",
      voucher: null,
      phone: "0302-3334445",
      email: "bilal.ahmed@example.com",
      branch: "MCB, Model Town",
      submittedAt: "2025-08-09",
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [broadcastTarget, setBroadcastTarget] = useState("all");

  // voucher upload form state
  const [voucherFile, setVoucherFile] = useState(null);
  const [voucherBranch, setVoucherBranch] = useState("");
  const [voucherDate, setVoucherDate] = useState("");

  const stats = useMemo(() => {
    const total = students.length;
    const enrolled = students.filter(s => s.status === "enrolled").length;
    const pending = students.filter(s => s.status === "pending").length;
    const issues = students.filter(s => s.status === "requires_action").length;
    return { total, enrolled, pending, issues };
  }, [students]);

  const filtered = useMemo(() => {
    return students.filter(s => {
      if (filter !== "all" && s.status !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.program.toLowerCase().includes(q)
      );
    });
  }, [students, query, filter]);

  function openStudent(student) {
    setSelected(student);
  }

  function closeStudent() {
    setSelected(null);
  }

  function handleVoucherUpload(e) {
    e.preventDefault();
    if (!selected) return alert("Select a student first, then upload voucher");
    if (!voucherFile) return alert("Choose a voucher file to upload");
    if (!voucherBranch || !voucherDate) return alert("Provide bank branch and submission date");
    // simulate upload and attach to student
    setStudents(prev =>
      prev.map(s =>
        s.id === selected.id
          ? {
              ...s,
              voucher: { name: voucherFile.name, uploadedAt: voucherDate, branch: voucherBranch },
              status: "pending",
              submittedAt: voucherDate,
            }
          : s
      )
    );
    // reset voucher fields
    setVoucherFile(null);
    setVoucherBranch("");
    setVoucherDate("");
    alert("Voucher uploaded, status set to pending");
  }

  function handleBroadcast() {
    if (!message.trim()) return alert("Type a message to broadcast");
    // in real app, send to backend, here we simulate
    alert(`Message broadcast to ${broadcastTarget}, message preview: ${message}`);
    setMessage("");
  }

  function quickApprove(studentId) {
    setStudents(prev => prev.map(s => (s.id === studentId ? { ...s, status: "enrolled" } : s)));
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8 lg:p-12">
      <header className="max-w-7xl mx-auto flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-md bg-white shadow flex items-center justify-center p-1">
            {/* <Logo /> */}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Uni.Enrollment</h1>
            <p className="text-sm text-slate-500">Online enrollment system, neat, fast, secure</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200">Dashboard</button>
          <button className="px-4 py-2 rounded-md text-slate-700 border border-transparent hover:border-slate-200">Students</button>
          <button className="px-4 py-2 rounded-md text-slate-700 border border-transparent hover:border-slate-200">Reports</button>
          <button className="px-4 py-2 rounded-md text-slate-700 border border-transparent hover:border-slate-200">Settings</button>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3">
        {/* left column, hero and stats */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl p-5 shadow">
            <h2 className="text-lg font-semibold text-slate-800">Welcome, Admin</h2>
            <p className="text-sm text-slate-500 mt-1">
              This panel helps you manage enrollments, process vouchers, and contact students quickly
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <StatCard label="Total Students" value={stats.total} color="blue" />
              <StatCard label="Enrolled" value={stats.enrolled} color="green" />
              <StatCard label="Pending" value={stats.pending} color="amber" />
              <StatCard label="Issues" value={stats.issues} color="rose" />
            </div>
          </div>

          <EnrollmentGuide />

          <div className="bg-white rounded-xl p-4 shadow">
            <h3 className="font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <a
                href="#download-voucher"
                className="block text-sm px-3 py-2 rounded-md bg-slate-50 hover:bg-slate-100"
              >
                Download Fee Voucher, university site
              </a>
              <button
                onClick={() => alert("Open import students CSV dialog, not implemented here")}
                className="text-sm px-3 py-2 rounded-md bg-slate-50 hover:bg-slate-100"
              >
                Import Students CSV
              </button>
              <button
                onClick={() => alert("Open bulk approval modal, not implemented here")}
                className="text-sm px-3 py-2 rounded-md bg-slate-50 hover:bg-slate-100"
              >
                Bulk Approve Pending
              </button>
            </div>
          </div>
        </div>

        {/* middle column, list and messaging */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search by name, id, or program"
                  className="px-3 py-2 border rounded-md w-72 focus:outline-none"
                />
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="pending">Pending</option>
                  <option value="requires_action">Requires Action</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    // simulate export
                    alert("Exporting current list to CSV, not implemented here")
                  }}
                  className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200"
                >
                  Export
                </button>
                <div className="text-sm text-slate-500">Results {filtered.length}</div>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              {filtered.map(student => (
                <StudentCard
                  key={student.id}
                  student={student}
                  open={() => openStudent(student)}
                  quickApprove={() => quickApprove(student.id)}
                />
              ))}
            </div>
          </div>

          {/* messaging and upload */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-semibold text-slate-800 mb-2">Broadcast Message</h3>
              <p className="text-sm text-slate-500 mb-3">Send announcement to subset of students</p>
              <div className="flex items-center gap-2 mb-3">
                <select
                  value={broadcastTarget}
                  onChange={e => setBroadcastTarget(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">All Students</option>
                  <option value="enrolled">Enrolled Only</option>
                  <option value="pending">Pending Only</option>
                </select>
                <button
                  onClick={() => { setMessage("Admissions office will open at 10am tomorrow") }}
                  className="px-3 py-2 bg-slate-100 rounded-md text-sm"
                >
                  Quick note
                </button>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full border rounded-md p-3 min-h-[120px] focus:outline-none"
                placeholder="Type message to broadcast"
              />
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-slate-500">Preview, recipients may vary</div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMessage("")}
                    className="px-4 py-2 rounded-md bg-slate-50 hover:bg-slate-100"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleBroadcast}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-semibold text-slate-800 mb-2">Upload Fee Voucher</h3>
              <p className="text-sm text-slate-500 mb-3">
                Select student from the list, then upload voucher, provide bank branch and date, system will mark as pending
              </p>
              <div className="mb-3">
                <div className="text-sm text-slate-600 mb-1">Selected student</div>
                <div className="p-3 border rounded-md bg-slate-50">
                  {selected ? (
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${selected.gender === "female" ? "bg-pink-500" : "bg-sky-600"}`}>
                        {selected.name.split(" ").map(s => s[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{selected.name}</div>
                        <div className="text-sm text-slate-500">{selected.id}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">No student selected, click any student card to select</div>
                  )}
                </div>
              </div>

              <form onSubmit={handleVoucherUpload} className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-700 mb-1">Fee Voucher file</label>
                  <input
                    type="file"
                    onChange={e => setVoucherFile(e.target.files[0] ?? null)}
                    className="w-full"
                    accept="image/*,application/pdf"
                  />
                  {voucherFile && <div className="text-xs mt-1 text-slate-500">Selected, {voucherFile.name}</div>}
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Bank branch</label>
                  <input
                    type="text"
                    value={voucherBranch}
                    onChange={e => setVoucherBranch(e.target.value)}
                    placeholder="Branch name, e.g. Habib Bank, Gulberg"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-700 mb-1">Submission date</label>
                  <input
                    type="date"
                    value={voucherDate}
                    onChange={e => setVoucherDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>

                <div className="flex gap-2 justify-end">
                  <button type="button" onClick={() => {
                    // clear
                    setVoucherFile(null);
                    setVoucherBranch("");
                    setVoucherDate("");
                  }} className="px-4 py-2 rounded-md bg-slate-50 hover:bg-slate-100">Reset</button>

                  <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Upload</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* student detail modal panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-40 flex items-end lg:items-center justify-center p-4">
          <div className="bg-white w-full lg:w-3/5 rounded-xl shadow-lg p-6 overflow-auto max-h-[90vh]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-lg ${selected.gender === "female" ? "bg-pink-500" : "bg-sky-600"}`}>
                  {selected.name.split(" ").map(s => s[0]).slice(0,2).join("")}
                </div>
                <div>
                  <div className="text-xl font-semibold">{selected.name}</div>
                  <div className="text-sm text-slate-500">{selected.id} • {selected.program}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => quickApprove(selected.id)} className="px-3 py-2 rounded-md bg-emerald-600 text-white">Approve</button>
                <button onClick={closeStudent} className="px-3 py-2 rounded-md bg-slate-100">Close</button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoRow label="Program" value={selected.program} />
                <InfoRow label="Session" value={selected.session} />
                <InfoRow label="Semester" value={selected.semester} />
                <InfoRow label="Degree" value={selected.degree} />
                <InfoRow label="Status" value={selected.status} status />
                <InfoRow label="Phone" value={selected.phone} />
                <InfoRow label="Email" value={selected.email} />
              </div>

              <div className="space-y-3">
                <InfoRow label="Bank branch" value={selected.voucher?.branch ?? selected.branch ?? "Not provided"} />
                <InfoRow label="Submitted" value={selected.voucher?.uploadedAt ?? selected.submittedAt ?? "Not submitted"} />
                <div className="p-3 border rounded-md bg-slate-50">
                  <div className="text-sm text-slate-700 font-semibold mb-2">Voucher</div>
                  {selected.voucher ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm">{selected.voucher.name}</div>
                        <div className="text-xs text-slate-500">{selected.voucher.uploadedAt}</div>
                      </div>
                      <button className="px-3 py-1 rounded-md bg-slate-100" onClick={() => alert("Open voucher file, not implemented")}>View</button>
                    </div>
                  ) : (
                    <div className="text-sm text-slate-500">No voucher uploaded</div>
                  )}
                </div>

                <div className="p-3 rounded-md border">
                  <div className="text-sm text-slate-700 font-semibold mb-2">Notes</div>
                  <textarea className="w-full border rounded-md p-2" placeholder="Add internal note for this student" rows={4} />
                  <div className="mt-2 flex justify-end">
                    <button className="px-3 py-1 rounded-md bg-slate-100">Save note</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </main>
  );
}

/* small presentational components */

function StatCard({ label, value, color = "blue" }) {
  const colorMap = {
    blue: "bg-sky-50 text-sky-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return (
    <div className={`p-3 rounded-lg ${colorMap[color]} border`}>
      <div className="text-xs font-medium">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function StudentCard({ student, open, quickApprove }) {
  const genderColor = student.gender === "female" ? "bg-pink-50 border-pink-100" : "bg-sky-50 border-sky-100";
  const statusColor =
    student.status === "enrolled" ? "text-emerald-600 bg-emerald-50" : student.status === "pending" ? "text-amber-600 bg-amber-50" : "text-rose-600 bg-rose-50";

  return (
    <div className={`flex items-center justify-between p-3 rounded-md border ${genderColor}`}>
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${student.gender === "female" ? "bg-pink-500" : "bg-sky-600"}`}>
          {student.name.split(" ").map(s => s[0]).slice(0,2).join("")}
        </div>
        <div>
          <div className="font-semibold">{student.name}</div>
          <div className="text-xs text-slate-500">{student.id} • {student.program}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`px-3 py-1 rounded-md text-sm ${statusColor}`}>{student.status}</div>
        <div className="flex gap-2">
          <button onClick={open} className="px-3 py-1 rounded-md bg-slate-100 text-sm">Details</button>
          <button onClick={quickApprove} className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm">Approve</button>
        </div>
      </div>
    </div>
  );
}

function EnrollmentGuide() {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold text-slate-800 mb-2">Enrollment Procedure, step by step</h3>
      <ol className="list-decimal ml-5 space-y-2 text-sm text-slate-600">
        <li>Download official fee voucher from university website, use the button above or go to finance portal</li>
        <li>Pay the printed fee voucher at the selected bank branch, keep the receipt, record branch and submission date</li>
        <li>Return to this platform, select your student record, upload scanned voucher or photo, fill bank branch and date</li>
        <li>After upload, administration will verify, status will change to pending then to enrolled once approved</li>
        <li>For any issue, contact admin via the messaging panel or your department TGM teacher</li>
      </ol>
    </div>
  );
}

function InfoRow({ label, value, status = false }) {
  if (status) {
    const color = value === "enrolled" ? "text-emerald-600" : value === "pending" ? "text-amber-600" : "text-rose-600";
    return (
      <div className="flex items-center justify-between p-2 border rounded-md">
        <div className="text-sm text-slate-600">{label}</div>
        <div className={`text-sm font-medium ${color}`}>{value}</div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between p-2 border rounded-md">
      <div className="text-sm text-slate-600">{label}</div>
      <div className="text-sm font-medium text-slate-800">{value || "-"}</div>
    </div>
  );
}
