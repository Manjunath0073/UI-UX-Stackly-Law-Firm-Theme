/* ============================================================
   Stackly Law Firm — Admin Console SPA
   Vanilla JS SPA with dummy data, hash router, charts,
   live feed simulation, and premium interactions.
   ============================================================ */

(() => {
  "use strict";

  /* ============================================================
     Dummy data
     ============================================================ */

  const AV = ["#1f2f46", "#3f6b8a", "#8a6d2f", "#4a7a63", "#7a5c8f", "#a3613f"];

  const DB = {
    admin: {
      name: "Adrian Mercer",
      email: "adrian.mercer@stackly.com",
      role: "Super Admin",
      phone: "+1 (415) 555-0182",
      initials: "AM",
    },

    users: [
      { id: "U-1001", name: "John Mitchell", email: "john.mitchell@stackly.com", role: "Client", status: "active", joined: "2026-03-12", cases: 3, lastActive: "2m ago" },
      { id: "U-1002", name: "Priya Sharma", email: "priya.sharma@stackly.com", role: "Client", status: "active", joined: "2026-01-08", cases: 2, lastActive: "1h ago" },
      { id: "U-1003", name: "Marcus Webb", email: "marcus.webb@stackly.com", role: "Lawyer", status: "active", joined: "2025-09-02", cases: 8, lastActive: "8m ago" },
      { id: "U-1004", name: "Elena Rodriguez", email: "elena.r@stackly.com", role: "Paralegal", status: "active", joined: "2026-02-17", cases: 5, lastActive: "32m ago" },
      { id: "U-1005", name: "Sarah Mitchell", email: "sarah.mitchell@stackly.com", role: "Lawyer", status: "active", joined: "2024-11-20", cases: 11, lastActive: "5m ago" },
      { id: "U-1006", name: "David Lawson", email: "d.lawson@stackly.com", role: "Lawyer", status: "active", joined: "2025-04-06", cases: 7, lastActive: "1h ago" },
      { id: "U-1007", name: "Olivia Bennett", email: "olivia.b@stackly.com", role: "Client", status: "active", joined: "2026-07-29", cases: 1, lastActive: "3h ago" },
      { id: "U-1008", name: "Tomás Ferreira", email: "tomas.f@stackly.com", role: "Client", status: "blocked", joined: "2026-05-14", cases: 0, lastActive: "6d ago" },
      { id: "U-1009", name: "Jennifer Smith", email: "jennifer.smith@stackly.com", role: "Lawyer", status: "active", joined: "2024-08-15", cases: 9, lastActive: "12m ago" },
      { id: "U-1010", name: "Nada Geomorgant", email: "nada.g@stackly.com", role: "Admin", status: "active", joined: "2025-01-30", cases: 0, lastActive: "45m ago" },
      { id: "U-1011", name: "Aisha Karim", email: "aisha.k@stackly.com", role: "Client", status: "blocked", joined: "2026-04-21", cases: 1, lastActive: "12d ago" },
      { id: "U-1012", name: "Robert Chen", email: "robert.chen@stackly.com", role: "Accountant", status: "active", joined: "2025-07-11", cases: 0, lastActive: "2h ago" },
      { id: "U-1013", name: "Helena Novak", email: "helena.n@stackly.com", role: "Client", status: "active", joined: "2026-06-05", cases: 2, lastActive: "22m ago" },
      { id: "U-1014", name: "Daniel Osei", email: "daniel.osei@stackly.com", role: "Client", status: "active", joined: "2026-08-02", cases: 1, lastActive: "1h ago" },
    ],

    lawyers: [
      { id: "L-501", name: "Sarah Mitchell", spec: "Litigation", cases: 11, rating: 4.9, reviews: 132, exp: "14 yrs", status: "active", email: "sarah.mitchell@stackly.com", phone: "+1 (415) 555-0101" },
      { id: "L-502", name: "David Lawson", spec: "Corporate & M&A", cases: 7, rating: 4.7, reviews: 98, exp: "11 yrs", status: "active", email: "d.lawson@stackly.com", phone: "+1 (415) 555-0114" },
      { id: "L-503", name: "Jennifer Smith", spec: "Employment Law", cases: 9, rating: 4.8, reviews: 115, exp: "12 yrs", status: "active", email: "jennifer.smith@stackly.com", phone: "+1 (415) 555-0122" },
      { id: "L-504", name: "Marcus Webb", spec: "Intellectual Property", cases: 8, rating: 4.6, reviews: 76, exp: "9 yrs", status: "active", email: "marcus.webb@stackly.com", phone: "+1 (415) 555-0130" },
      { id: "L-505", name: "Grace Adeyemi", spec: "Real Estate", cases: 6, rating: 4.8, reviews: 89, exp: "10 yrs", status: "active", email: "grace.a@stackly.com", phone: "+1 (415) 555-0148" },
      { id: "L-506", name: "Kiran Patel", spec: "Family Law", cases: 5, rating: 4.5, reviews: 64, exp: "8 yrs", status: "active", email: "kiran.p@stackly.com", phone: "+1 (415) 555-0156" },
      { id: "L-507", name: "Elena Rodriguez", spec: "Litigation", cases: 5, rating: 4.4, reviews: 41, exp: "6 yrs", status: "on-leave", email: "elena.r@stackly.com", phone: "+1 (415) 555-0163" },
      { id: "L-508", name: "Theo Laurent", spec: "Corporate & M&A", cases: 4, rating: 4.7, reviews: 52, exp: "7 yrs", status: "active", email: "theo.l@stackly.com", phone: "+1 (415) 555-0171" },
    ],

    cases: [
      { id: "C-2026-118", client: "Meridian Properties Ltd", lawyer: "Sarah Mitchell", status: "open", priority: "urgent", type: "Commercial Lease", value: 148000, opened: "2026-08-26", updated: "2026-08-28", desc: "Emergency injunction application over a contested lease termination and threatened lockout of the tenant.", timeline: [
        { label: "Case opened — injunction filed", date: "Aug 26", done: true },
        { label: "Evidence compiled from client", date: "Aug 27", done: true },
        { label: "Hearing before the District Court", date: "Sep 02", done: false },
      ] },
      { id: "C-2026-117", client: "Alpine Traders Pvt Ltd", lawyer: "David Lawson", status: "in-progress", priority: "high", type: "Business Acquisition", value: 220000, opened: "2026-08-19", updated: "2026-08-28", desc: "Due diligence and share purchase agreement for the acquisition of a regional manufacturing unit.", timeline: [
        { label: "Case opened — engagement letter signed", date: "Aug 19", done: true },
        { label: "Due diligence report delivered", date: "Aug 26", done: true },
        { label: "SPA drafting in progress", date: "Aug 28", done: false },
      ] },
      { id: "C-2026-116", client: "Brightline Tech", lawyer: "Jennifer Smith", status: "review", priority: "medium", type: "Employment", value: 34000, opened: "2026-08-12", updated: "2026-08-27", desc: "Executive employment agreement with equity components, pending final clause sign-off.", timeline: [
        { label: "Case opened", date: "Aug 12", done: true },
        { label: "First draft issued to client", date: "Aug 18", done: true },
        { label: "Internal review for compliance", date: "Aug 27", done: true },
      ] },
      { id: "C-2026-115", client: "Helix Industries", lawyer: "Marcus Webb", status: "in-progress", priority: "high", type: "Intellectual Property", value: 96000, opened: "2026-08-05", updated: "2026-08-26", desc: "Patent licensing negotiation and prosecution strategy for a new manufacturing process.", timeline: [
        { label: "Case opened", date: "Aug 05", done: true },
        { label: "Non-disclosure agreement executed", date: "Aug 11", done: true },
        { label: "License terms under negotiation", date: "Aug 26", done: false },
      ] },
      { id: "C-2026-114", client: "Nova Retail", lawyer: "Grace Adeyemi", status: "on-hold", priority: "low", type: "Real Estate", value: 78000, opened: "2026-07-22", updated: "2026-08-20", desc: "Commercial property acquisition awaiting financing confirmation from the buyer's lender.", timeline: [
        { label: "Case opened", date: "Jul 22", done: true },
        { label: "Offer accepted — contract drafted", date: "Aug 02", done: true },
        { label: "On hold — awaiting lender approval", date: "Aug 20", done: false },
      ] },
      { id: "C-2026-113", client: "Sterling Finance", lawyer: "Kiran Patel", status: "in-progress", priority: "medium", type: "Debt Recovery", value: 45000, opened: "2026-07-15", updated: "2026-08-25", desc: "Recovery of outstanding corporate dues through arbitration proceedings.", timeline: [
        { label: "Case opened", date: "Jul 15", done: true },
        { label: "Demand notice served", date: "Jul 28", done: true },
        { label: "Arbitration proceedings commenced", date: "Aug 25", done: false },
      ] },
      { id: "C-2026-112", client: "Reed & Co.", lawyer: "Theo Laurent", status: "review", priority: "medium", type: "Partnership", value: 61000, opened: "2026-07-08", updated: "2026-08-22", desc: "Structured dissolution and asset division between founding partners of a design studio.", timeline: [
        { label: "Case opened", date: "Jul 08", done: true },
        { label: "Asset schedule agreed", date: "Jul 30", done: true },
        { label: "Dissolution deed final review", date: "Aug 22", done: true },
      ] },
      { id: "C-2026-111", client: "Helena Novak", lawyer: "Kiran Patel", status: "open", priority: "high", type: "Family", value: 28000, opened: "2026-08-10", updated: "2026-08-28", desc: "Child custody and maintenance arrangement with mediation scheduled this week.", timeline: [
        { label: "Case opened", date: "Aug 10", done: true },
        { label: "Mediation session", date: "Aug 29", done: false },
      ] },
      { id: "C-2026-110", client: "Daniel Osei", lawyer: "Grace Adeyemi", status: "in-progress", priority: "medium", type: "Real Estate", value: 52000, opened: "2026-08-14", updated: "2026-08-24", desc: "Residential lease dispute and recovery of arrears against a commercial tenant.", timeline: [
        { label: "Case opened", date: "Aug 14", done: true },
        { label: "Notice served on tenant", date: "Aug 21", done: true },
        { label: "Settlement conference scheduled", date: "Sep 04", done: false },
      ] },
      { id: "C-2026-109", client: "Nova Retail", lawyer: "Sarah Mitchell", status: "closed", priority: "low", type: "Trademark", value: 39000, opened: "2026-05-18", updated: "2026-07-30", desc: "Trademark opposition resolved through settlement — matter closed and recorded.", timeline: [
        { label: "Case opened", date: "May 18", done: true },
        { label: "Opposition filed", date: "Jun 02", done: true },
        { label: "Settlement recorded — closed", date: "Jul 30", done: true },
      ] },
      { id: "C-2026-108", client: "Alpine Traders Pvt Ltd", lawyer: "David Lawson", status: "closed", priority: "low", type: "Corporate", value: 88000, opened: "2026-03-11", updated: "2026-06-20", desc: "Corporate restructuring completed — entity merged and filings finalized.", timeline: [
        { label: "Case opened", date: "Mar 11", done: true },
        { label: "Restructuring executed", date: "May 26", done: true },
        { label: "Filings completed — closed", date: "Jun 20", done: true },
      ] },
      { id: "C-2026-107", client: "Sterling Finance", lawyer: "Jennifer Smith", status: "closed", priority: "low", type: "General", value: 26000, opened: "2026-04-02", updated: "2026-07-12", desc: "Debt recovery matter concluded; outstanding amount recovered through arbitration.", timeline: [
        { label: "Case opened", date: "Apr 02", done: true },
        { label: "Arbitration awarded", date: "Jun 28", done: true },
        { label: "Amount recovered — closed", date: "Jul 12", done: true },
      ] },
    ],

    appointments: [
      { id: "APT-301", client: "John Mitchell", lawyer: "Sarah Mitchell", date: "2026-08-28", time: "10:30 AM", type: "video", status: "approved", topic: "Case strategy review" },
      { id: "APT-302", client: "Priya Sharma", lawyer: "David Lawson", date: "2026-08-28", time: "02:00 PM", type: "office", status: "pending", topic: "Acquisition documentation" },
      { id: "APT-303", client: "Olivia Bennett", lawyer: "Jennifer Smith", date: "2026-08-29", time: "11:00 AM", type: "video", status: "pending", topic: "Employment contract query" },
      { id: "APT-304", client: "Marcus Webb", lawyer: "Grace Adeyemi", date: "2026-09-01", time: "09:30 AM", type: "office", status: "approved", topic: "Due diligence update" },
      { id: "APT-305", client: "Helena Novak", lawyer: "Kiran Patel", date: "2026-08-29", time: "04:00 PM", type: "office", status: "approved", topic: "Mediation preparation" },
      { id: "APT-306", client: "Daniel Osei", lawyer: "Grace Adeyemi", date: "2026-09-04", time: "10:00 AM", type: "video", status: "pending", topic: "Settlement conference" },
      { id: "APT-307", client: "Tomás Ferreira", lawyer: "Sarah Mitchell", date: "2026-08-31", time: "01:30 PM", type: "video", status: "rejected", topic: "Account review" },
      { id: "APT-308", client: "Aisha Karim", lawyer: "Theo Laurent", date: "2026-09-08", time: "03:30 PM", type: "office", status: "rescheduled", topic: "Partnership deed review" },
    ],

    payments: [
      { id: "INV-1042", user: "Meridian Properties Ltd", amount: 4200, date: "2026-08-25", status: "paid", method: "Wire transfer" },
      { id: "INV-1043", user: "Alpine Traders Pvt Ltd", amount: 6800, date: "2026-08-21", status: "paid", method: "ACH" },
      { id: "INV-1044", user: "Brightline Tech", amount: 2400, date: "2026-08-18", status: "pending", method: "Card" },
      { id: "INV-1045", user: "Helix Industries", amount: 5100, date: "2026-08-15", status: "paid", method: "Wire transfer" },
      { id: "INV-1046", user: "Sterling Finance", amount: 1850, date: "2026-08-11", status: "overdue", method: "ACH" },
      { id: "INV-1047", user: "Reed & Co.", amount: 3200, date: "2026-08-07", status: "paid", method: "Card" },
      { id: "INV-1048", user: "Helena Novak", amount: 950, date: "2026-08-02", status: "pending", method: "Card" },
      { id: "INV-1049", user: "Nova Retail", amount: 2700, date: "2026-07-29", status: "refunded", method: "Wire transfer" },
      { id: "INV-1050", user: "Daniel Osei", amount: 1250, date: "2026-07-24", status: "paid", method: "Card" },
      { id: "INV-1051", user: "Alpine Traders Pvt Ltd", amount: 3950, date: "2026-07-19", status: "paid", method: "ACH" },
    ],

    notifications: [
      { id: 1, icon: "case", title: "Urgent case C-2026-118 opened", meta: "Meridian Properties · injunction", time: "8m ago", color: "#1f2f46", read: false },
      { id: 2, icon: "pay", title: "Payment of $6,800 received", meta: "INV-1043 · Alpine Traders", time: "1h ago", color: "#3f8a6b", read: false },
      { id: 3, icon: "user", title: "New client registered", meta: "Daniel Osei · client portal", time: "2h ago", color: "#3f6b8a", read: false },
      { id: 4, icon: "appt", title: "Appointment awaiting approval", meta: "APT-302 · Priya Sharma", time: "3h ago", color: "#8a6d2f", read: true },
      { id: 5, icon: "report", title: "Monthly report ready", meta: "July 2026 · export available", time: "1d ago", color: "#7a5c8f", read: true },
    ],

    activity: [
      { icon: "case", color: "#1f2f46", tint: "rgba(31,47,70,0.08)", title: "Case C-2026-118 opened", meta: "Meridian Properties · urgent injunction", time: "8m ago" },
      { icon: "pay", color: "#3f8a6b", tint: "rgba(63,138,107,0.12)", title: "Payment received", meta: "$6,800 · INV-1043 from Alpine Traders", time: "1h ago" },
      { icon: "user", color: "#3f6b8a", tint: "rgba(63,107,138,0.12)", title: "New user registered", meta: "Daniel Osei · Client portal", time: "2h ago" },
      { icon: "appt", color: "#8a6d2f", tint: "rgba(200,169,106,0.16)", title: "Appointment approved", meta: "APT-301 · John Mitchell, 10:30 AM", time: "3h ago" },
      { icon: "doc", color: "#4a7a63", tint: "rgba(74,122,99,0.12)", title: "Document filed", meta: "Due diligence report · C-2026-117", time: "5h ago" },
      { icon: "case", color: "#7a5c8f", tint: "rgba(122,92,143,0.12)", title: "Case status updated", meta: "C-2026-116 moved to Review", time: "Yesterday" },
    ],

    feedPool: [
      { icon: "case", color: "#1f2f46", tint: "rgba(31,47,70,0.08)", title: "New case opened", meta: "C-2026-119 · estate planning matter", time: "just now" },
      { icon: "pay", color: "#3f8a6b", tint: "rgba(63,138,107,0.12)", title: "Payment received", meta: "$3,150 invoice settled online", time: "just now" },
      { icon: "user", color: "#3f6b8a", tint: "rgba(63,107,138,0.12)", title: "New user registered", meta: "New client created an account", time: "just now" },
      { icon: "appt", color: "#8a6d2f", tint: "rgba(200,169,106,0.16)", title: "Appointment approved", meta: "Consultation confirmed by counsel", time: "just now" },
      { icon: "doc", color: "#4a7a63", tint: "rgba(74,122,99,0.12)", title: "Document filed", meta: "Agreement draft uploaded to C-2026-117", time: "just now" },
      { icon: "case", color: "#7a5c8f", tint: "rgba(122,92,143,0.12)", title: "Case status updated", meta: "C-2026-114 moved to On Hold", time: "just now" },
    ],

    revenue: [
      { m: "Sep", v: 18200 }, { m: "Oct", v: 21400 }, { m: "Nov", v: 19800 }, { m: "Dec", v: 24300 },
      { m: "Jan", v: 22600 }, { m: "Feb", v: 26100 }, { m: "Mar", v: 28400 }, { m: "Apr", v: 25700 },
      { m: "May", v: 30900 }, { m: "Jun", v: 33200 }, { m: "Jul", v: 35100 }, { m: "Aug", v: 38900 },
    ],

    caseGrowth: [
      { m: "Sep", v: 24 }, { m: "Oct", v: 27 }, { m: "Nov", v: 31 }, { m: "Dec", v: 29 },
      { m: "Jan", v: 36 }, { m: "Feb", v: 40 }, { m: "Mar", v: 44 }, { m: "Apr", v: 42 },
      { m: "May", v: 51 }, { m: "Jun", v: 57 }, { m: "Jul", v: 63 }, { m: "Aug", v: 71 },
    ],

    casesClosed: [
      { m: "Sep", v: 9 }, { m: "Oct", v: 11 }, { m: "Nov", v: 10 }, { m: "Dec", v: 13 },
      { m: "Jan", v: 12 }, { m: "Feb", v: 15 }, { m: "Mar", v: 16 }, { m: "Apr", v: 14 },
      { m: "May", v: 18 }, { m: "Jun", v: 20 }, { m: "Jul", v: 22 }, { m: "Aug", v: 25 },
    ],

    systemPrefs: [
      { id: "autoAssign", label: "Auto-assign lawyers", desc: "Distribute new cases to counsel automatically", on: true },
      { id: "newUserApproval", label: "New user approvals", desc: "Require admin approval for new accounts", on: true },
      { id: "twoFactor", label: "Two-factor authentication", desc: "Force 2FA for all staff accounts", on: true },
      { id: "emailDigest", label: "Daily email digest", desc: "Send a summary of case activity each morning", on: false },
      { id: "maintenance", label: "Maintenance mode", desc: "Show a maintenance screen on the public site", on: false },
      { id: "publicTracking", label: "Public case tracking", desc: "Let clients view matter status via a link", on: true },
    ],
  };

  /* ============================================================
     State
     ============================================================ */

  const state = {
    view: "dashboard",
    userRole: "all",
    userStatus: "all",
    userQ: "",
    lawyerSpec: "all",
    lawyerQ: "",
    caseStatus: "all",
    casePriority: "all",
    caseQ: "",
    paymentFilter: "all",
    reportRange: "12m",
    apptTab: "list",
    apptMonth: null,
    apptSel: null,
    panelCaseId: null,
    tick: 0,
    liveStat: 0,
  };

  const now = new Date();
  const todayIso = isoOf(now);
  state.apptMonth = { y: now.getFullYear(), m: now.getMonth() };
  state.apptSel = todayIso;

  /* ============================================================
     Helpers
     ============================================================ */

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const money = (n) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
  const money2 = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const initials = (name) =>
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const colorOf = (name) => {
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return AV[h % AV.length];
  };

  const avatar = (name, cls = "") =>
    `<span class="adm-avatar adm-avatar--xs ${cls}" style="background:linear-gradient(135deg,${colorOf(name)} 0%,#c8a96a 150%)">${esc(initials(name))}</span>`;

  function isoOf(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function fmtDay(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }

  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  /* ---------------- Session profile ---------------- */

  function hydrateAdmin() {
    try {
      const raw = localStorage.getItem("stackly_user");
      if (!raw) return;
      const u = JSON.parse(raw);
      if (!u || !u.email) return;
      DB.admin.name = u.name || "Admin User";
      DB.admin.email = u.email;
      DB.admin.phone = u.phone || "";
      DB.admin.role = u.role === "admin" ? "Admin" : "Admin";
      DB.admin.initials = initials(DB.admin.name);
    } catch (e) {
      /* keep defaults */
    }
  }

  function persistAdmin() {
    try {
      const existing = JSON.parse(localStorage.getItem("stackly_user") || "{}");
      localStorage.setItem(
        "stackly_user",
        JSON.stringify({ ...existing, name: DB.admin.name, email: DB.admin.email, phone: DB.admin.phone })
      );
    } catch (e) {
      /* storage unavailable */
    }
  }

  function renderProfileDrop() {
    const a = DB.admin;
    $("#admProfileDrop").innerHTML = `
      <div class="adm-profile-card">
        <span class="adm-avatar">${esc(a.initials)}</span>
        <div><strong>${esc(a.name)}</strong><span>${esc(a.email)}</span><span class="adm-profile-badge">${esc(a.role)}</span></div>
      </div>
      <button class="adm-drop-item" data-nav="settings">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        <span>Account Settings</span>
      </button>
      <button class="adm-drop-item" data-action="notif-readall">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        <span>Notification preferences</span>
      </button>
      <div class="adm-drop-sep"></div>
      <button class="adm-drop-item" data-action="admin-signout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span>Sign out</span>
      </button>`;
  }

  function applyAdminProfile() {
    const a = DB.admin;
    const setTxt = (id, text) => {
      const el = $(id);
      if (el) el.textContent = text;
    };
    setTxt("#admSidebarAvatar", a.initials);
    setTxt("#admSidebarName", a.name);
    setTxt("#admSidebarRole", a.role);
    setTxt("#admTopAvatar", a.initials);
    setTxt("#admTopName", a.name);
    renderProfileDrop();
  }

  /* Status / priority / meta maps */
  const CASE_STATUS = {
    open: { label: "Open", cls: "open" },
    "in-progress": { label: "In Progress", cls: "in-progress" },
    review: { label: "In Review", cls: "review" },
    "on-hold": { label: "On Hold", cls: "on-hold" },
    closed: { label: "Closed", cls: "closed" },
  };
  const PRIORITY = {
    urgent: { label: "Urgent", cls: "urgent" },
    high: { label: "High", cls: "high" },
    medium: { label: "Medium", cls: "medium" },
    low: { label: "Low", cls: "low" },
  };
  const PAYMENT = {
    paid: { label: "Paid", cls: "paid" },
    pending: { label: "Pending", cls: "pending" },
    overdue: { label: "Overdue", cls: "overdue" },
    refunded: { label: "Refunded", cls: "refunded" },
  };
  const USER_STATUS = {
    active: { label: "Active", cls: "active" },
    blocked: { label: "Blocked", cls: "blocked" },
  };
  const APPT_STATUS = {
    pending: { label: "Pending", cls: "pending" },
    approved: { label: "Approved", cls: "approved" },
    rejected: { label: "Rejected", cls: "rejected" },
    rescheduled: { label: "Rescheduled", cls: "rescheduled" },
  };

  const badge = (meta, key) => `<span class="adm-status adm-status--${meta[key].cls}">${meta[key].label}</span>`;
  const prioBadge = (p) => `<span class="adm-priority adm-priority--${PRIORITY[p].cls}">${PRIORITY[p].label}</span>`;
  const stars = (r) =>
    `<span class="adm-stars">${'<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>'.repeat(Math.round(r))}</span><span class="adm-stars-num">${r.toFixed(1)}</span>`;

  /* ============================================================
     Icons
     ============================================================ */

  const ICON = (p) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

  const ICONS = {
    case: ICON('<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/><line x1="12" y1="13" x2="12" y2="17"/>'),
    users: ICON('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    cases: ICON('<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/><line x1="12" y1="13" x2="12" y2="17"/>'),
    revenue: ICON('<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
    appts: ICON('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    user: ICON('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'),
    lawyer: ICON('<path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7c0 3 3 4 7 4s7-1 7-4"/><path d="M5 7v8c0 3 3 4 7 4s7-1 7-4V7"/>'),
    appt: ICON('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    pay: ICON('<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>'),
    report: ICON('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>'),
    doc: ICON('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>'),
    msg: ICON('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    search: ICON('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
    bell: ICON('<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>'),
    check: ICON('<polyline points="20 6 9 17 4 12"/>'),
    x: ICON('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
    eye: ICON('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
    edit: ICON('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>'),
    shield: ICON('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    shieldX: ICON('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/>'),
    plus: ICON('<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'),
    export: ICON('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
    calendar: ICON('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>'),
    clock: ICON('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    mail: ICON('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'),
    phone: ICON('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    settings: ICON('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
    logout: ICON('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    list: ICON('<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'),
    chevL: ICON('<polyline points="15 18 9 12 15 6"/>'),
    chevR: ICON('<polyline points="9 18 15 12 9 6"/>'),
  };

  /* ============================================================
     Toast
     ============================================================ */

  const toastWrap = $("#admToast");

  function toast(message, type = "success") {
    const t = document.createElement("div");
    t.className = "adm-toast" + (type === "error" ? " adm-toast--error" : type === "info" ? " adm-toast--info" : "");
    const icon = type === "error" ? ICONS.x : type === "info" ? ICONS.bell : ICONS.check;
    t.innerHTML = `${icon}<span>${esc(message)}</span>`;
    toastWrap.appendChild(t);
    setTimeout(() => {
      t.classList.add("is-leaving");
      setTimeout(() => t.remove(), 360);
    }, 3400);
  }

  /* ============================================================
     Modal
     ============================================================ */

  const modal = $("#admModal");
  const modalContent = $("#admModalContent");

  function openModal(title, sub, body) {
    modalContent.innerHTML = `<h3 class="adm-modal-title">${esc(title)}</h3><p class="adm-modal-sub">${esc(sub)}</p>${body}`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  /* ============================================================
     Slide panel
     ============================================================ */

  const panel = $("#admPanel");
  const panelBackdrop = $("#admPanelBackdrop");
  const panelTitle = $("#admPanelTitle");
  const panelSub = $("#admPanelSub");
  const panelBody = $("#admPanelBody");

  function openPanel(title, sub, bodyHtml) {
    panelTitle.textContent = title;
    panelSub.textContent = sub;
    panelBody.innerHTML = bodyHtml;
    panel.classList.add("is-open");
    panelBackdrop.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panelBackdrop.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  }

  /* ============================================================
     Charts
     ============================================================ */

  function lineChart(container, data, opts = {}) {
    const color = opts.color || "#c8a96a";
    const fill = opts.fill || "rgba(200,169,106,0.22)";
    const w = 620, h = 200, padL = 34, padB = 24, padT = 14;
    const max = Math.max(...data.map((d) => d.v)) * 1.15;
    const iw = w - padL - 12, ih = h - padT - padB;
    const pts = data.map((d, i) => [padL + (i / (data.length - 1)) * iw, padT + ih - (d.v / max) * ih]);
    const line = pts.map((p, i) => (i === 0 ? `M${p[0].toFixed(1)},${p[1].toFixed(1)}` : `L${p[0].toFixed(1)},${p[1].toFixed(1)}`)).join(" ");
    const area = `${line} L${(padL + iw).toFixed(1)},${(padT + ih).toFixed(1)} L${padL},${(padT + ih).toFixed(1)} Z`;
    const grid = [0.25, 0.5, 0.75].map((f) => (padT + ih * f).toFixed(1));

    container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="adm-chart-line-svg">
        <defs>
          <linearGradient id="lineFill${opts.uid || ""}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${grid.map((y) => `<line x1="${padL}" y1="${y}" x2="${w - 12}" y2="${y}" stroke="rgba(31,47,70,0.06)" stroke-dasharray="3 5"/>`).join("")}
        <path d="${area}" fill="url(#lineFill${opts.uid || ""})"/>
        <path class="adm-chart-line" pathLength="1" d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${pts.map((p, i) => `<circle class="adm-chart-dot" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.2" fill="#fff" stroke="${color}" stroke-width="2" style="opacity:0"><title>${esc(data[i].m)} · ${data[i].v}</title></circle>`).join("")}
      </svg>
      <div class="adm-chart-x">${data.map((d) => `<span>${esc(d.m)}</span>`).join("")}</div>`;

    requestAnimationFrame(() => {
      container.classList.add("is-anim");
      $$(".adm-chart-dot", container).forEach((d, i) => {
        setTimeout(() => (d.style.opacity = 1), 500 + i * 30);
      });
    });
  }

  function barChart(container, data, opts = {}) {
    const color = opts.color || "#c8a96a";
    const muted = opts.muted || "rgba(200,169,106,0.35)";
    const w = 620, h = 210, padB = 24, padT = 14;
    const max = Math.max(...data.map((d) => d.v)) * 1.15;
    const iw = w - 20, ih = h - padT - padB;
    const n = data.length;
    const bw = Math.min(34, (iw / n) * 0.55);

    container.innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" class="adm-chart-bar-svg">
        ${[0.25, 0.5, 0.75].map((f) => `<line x1="10" y1="${(padT + ih * f).toFixed(1)}" x2="${w - 10}" y2="${(padT + ih * f).toFixed(1)}" stroke="rgba(31,47,70,0.06)" stroke-dasharray="3 5"/>`).join("")}
        ${data
          .map((d, i) => {
            const x = 10 + (i / n) * iw + (iw / n - bw) / 2;
            const bh = (d.v / max) * ih;
            const y = padT + ih - bh;
            return `<rect class="adm-chart-bar" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="${i === data.length - 1 ? color : muted}" style="transition-delay:${(i * 40).toFixed(0)}ms"><title>${esc(d.m)} · ${money(d.v)}</title></rect>`;
          })
          .join("")}
      </svg>
      <div class="adm-chart-x">${data.map((d) => `<span>${esc(d.m)}</span>`).join("")}</div>`;

    requestAnimationFrame(() => container.classList.add("is-anim"));
  }

  function donutChart(container, segments, total) {
    const r = 52, circ = 2 * Math.PI * r;
    let offset = 0;
    const segs = segments
      .map((s) => {
        const len = (s.count / total) * circ;
        const seg = `<circle class="adm-chart-donut-seg" r="${r}" cx="62" cy="62" fill="none" stroke="${s.color}" stroke-width="17"
          stroke-dasharray="${len.toFixed(2)} ${(circ - len).toFixed(2)}" stroke-dashoffset="${(-offset).toFixed(2)}"
          transform="rotate(-90 62 62)" style="stroke-dashoffset:0"><title>${esc(s.label)} · ${s.count}</title></circle>`;
        offset += len;
        return seg;
      })
      .join("");

    container.innerHTML = `
      <svg viewBox="0 0 124 124" style="width:100%;height:auto">
        <circle r="${r}" cx="62" cy="62" fill="none" stroke="rgba(31,47,70,0.07)" stroke-width="17"/>
        ${segs}
      </svg>
      <div class="adm-donut-center"><strong>${total}</strong><span>Cases</span></div>`;

    requestAnimationFrame(() => {
      container.classList.add("is-anim");
      $$(".adm-chart-donut-seg", container).forEach((seg, i) => {
        const target = parseFloat(seg.getAttribute("stroke-dashoffset")) || 0;
        setTimeout(() => (seg.style.strokeDashoffset = target), 100 + i * 180);
      });
    });
  }

  const spark = (data, color) => {
    const w = 96, h = 30, pad = 2;
    const max = Math.max(...data.map((d) => d.v)) * 1.2;
    const pts = data.map((d, i) => `${(pad + (i / (data.length - 1)) * (w - pad * 2)).toFixed(1)},${(pad + (h - pad * 2) - (d.v / max) * (h - pad * 2)).toFixed(1)}`);
    return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="width:100%;height:34px"><polyline points="${pts.join(" ")}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };

  /* ============================================================
     Skeleton loaders
     ============================================================ */

  const skel = {
    card: (lg = "") =>
      `<div class="adm-skel-card"><div class="adm-skel-line adm-skel-line--lg" ${lg ? `style="width:${lg}"` : ""}></div><div class="adm-skel-line"></div><div class="adm-skel-line adm-skel-line--sm"></div></div>`,
    row: () =>
      `<div class="adm-skel-row"><div class="adm-skel-avatar"></div><div class="adm-skel-cell"><div class="adm-skel-line"></div><div class="adm-skel-line adm-skel-line--sm"></div></div></div>`,
    stats: () =>
      `<div class="adm-skel-grid" style="grid-template-columns:repeat(4,1fr)">${Array(4).fill(skel.card("60%")).join("")}</div>`,
    table: (n = 5) =>
      `<div class="adm-skel-card">${Array(n).fill(skel.row()).join("")}</div>`,
  };

  /* ============================================================
     Router
     ============================================================ */

  const VIEWS = {
    dashboard: { title: "Dashboard", sub: "Live overview of your practice's performance", render: renderDashboard, after: afterDashboard },
    users: { title: "User Management", sub: "Manage clients, staff and account access", render: renderUsers },
    lawyers: { title: "Lawyer Management", sub: "Counsel profiles, workload and performance", render: renderLawyers },
    cases: { title: "Case Management", sub: "Track every matter from opening to resolution", render: renderCases },
    appointments: { title: "Appointments", sub: "Review, approve and reschedule consultations", render: renderAppointments, after: renderAppointmentsAfter },
    payments: { title: "Payments", sub: "Revenue, invoices and collection status", render: renderPayments },
    reports: { title: "Reports & Analytics", sub: "Trends, growth and exportable summaries", render: renderReports, after: afterReports },
    settings: { title: "Settings", sub: "Profile, preferences and system configuration", render: renderSettings },
  };

  function navigate(view) {
    const cfg = VIEWS[view] || VIEWS.dashboard;
    state.view = view;

    $$(".adm-view").forEach((v) => v.classList.remove("is-active"));
    const sec = $("#view-" + view);
    if (sec) sec.classList.add("is-active");

    $("#admPageTitle").textContent = cfg.title;
    $("#admPageSub").textContent = cfg.sub;

    $$(".adm-nav-item").forEach((n) => n.classList.toggle("is-active", n.dataset.view === view));
    $("#admApp").classList.remove("is-open");

    sec.innerHTML = cfg.skeleton();
    const wait = 420 + Math.random() * 240;
    setTimeout(() => {
      sec.innerHTML = cfg.render();
      decorateLabels(sec);
      if (cfg.after) cfg.after();
    }, wait);
  }

  function decorateLabels(root) {
    $$(".adm-table", root).forEach((t) => {
      const headers = $$("thead th", t).map((th) => th.textContent.trim());
      $$("tbody tr", t).forEach((tr) => {
        $$("td", tr).forEach((td, i) => {
          if (headers[i]) td.setAttribute("data-label", headers[i]);
        });
      });
    });
  }

  const VIEW_SKEL = {
    dashboard: () => `<div class="adm-skel-grid" style="gap:18px">${skel.stats()}<div class="adm-skel-grid" style="grid-template-columns:1.5fr 1fr">${skel.card()}${skel.card()}</div><div class="adm-skel-grid" style="grid-template-columns:1.5fr 1fr">${skel.card()}${skel.card()}</div></div>`,
    users: () => `<div class="adm-skel-grid" style="gap:16px">${skel.card("180px")}${skel.table(6)}</div>`,
    lawyers: () => `<div class="adm-skel-grid" style="gap:16px">${skel.card("180px")}${skel.table(6)}</div>`,
    cases: () => `<div class="adm-skel-grid" style="gap:16px">${skel.card("220px")}${skel.table(6)}</div>`,
    appointments: () => `<div class="adm-skel-grid" style="gap:16px">${skel.card("200px")}${skel.card()}</div>`,
    payments: () => `<div class="adm-skel-grid" style="gap:16px">${skel.stats()}${skel.table(6)}</div>`,
    reports: () => `<div class="adm-skel-grid" style="gap:16px">${skel.stats()}<div class="adm-skel-grid" style="grid-template-columns:1fr 1fr">${skel.card()}${skel.card()}</div>${skel.table(6)}</div>`,
    settings: () => `<div class="adm-skel-grid" style="grid-template-columns:1fr 1fr">${skel.card()}${skel.card()}</div>`,
  };
  Object.keys(VIEWS).forEach((k) => (VIEWS[k].skeleton = VIEW_SKEL[k]));

  /* ============================================================
     Derived helpers
     ============================================================ */

  const activeUsers = () => DB.users.filter((u) => u.status === "active").length;
  const activeCases = () => DB.cases.filter((c) => c.status !== "closed" && c.status !== "on-hold").length;
  const pendingAppts = () => DB.appointments.filter((a) => a.status === "pending").length;
  const apptsToday = () => DB.appointments.filter((a) => a.date === todayIso).length;

  function refreshBadges() {
    $("#navCaseCount").textContent = activeCases();
    $("#navApptCount").textContent = pendingAppts();
    $("#admPlanBar").style.width = "82%";
  }

  /* ============================================================
     Dashboard
     ============================================================ */

  function dashboardStats() {
    const quarterRevenue = DB.revenue.slice(-3).reduce((s, d) => s + d.v, 0);
    return [
      { key: "users", label: "Total Users", value: activeUsers(), delta: "+12 this month", up: true, color: "#1f2f46", tint: "rgba(31,47,70,0.08)", data: DB.caseGrowth.slice(-6) },
      { key: "cases", label: "Active Cases", value: activeCases(), delta: "+8 vs last month", up: true, color: "#3f6b8a", tint: "rgba(63,107,138,0.12)", data: DB.caseGrowth.slice(-6) },
      { key: "revenue", label: "Revenue (Q3)", value: quarterRevenue, delta: "+14.2%", up: true, color: "#8a6d2f", tint: "rgba(200,169,106,0.16)", data: DB.revenue.slice(-6) },
      { key: "appts", label: "Appointments Today", value: apptsToday(), delta: pendingAppts() + " pending review", up: pendingAppts() === 0, color: "#4a7a63", tint: "rgba(74,122,99,0.12)", data: DB.revenue.slice(-6) },
    ];
  }

  function renderDashboard() {
    const stats = dashboardStats();
    const statusDist = ["open", "in-progress", "review", "on-hold", "closed"]
      .map((k) => ({ key: k, label: CASE_STATUS[k].label, color: { open: "#3f8a6b", "in-progress": "#3f6b8a", review: "#c8a96a", "on-hold": "#9aa2ad", closed: "#c6c2bb" }[k], count: DB.cases.filter((c) => c.status === k).length }))
      .filter((s) => s.count > 0);
    const totalCases = DB.cases.length;

    const statCards = stats
      .map(
        (s, i) => `
        <div class="adm-stat" style="--sc:${s.color};--stint:${s.tint}" id="dashStat-${i}">
          <div class="adm-stat-top">
            <span class="adm-stat-icon">${ICONS[s.key]}</span>
            <span class="adm-stat-trend adm-stat-trend--${s.up ? "up" : "down"}">${s.up ? "▲" : "▼"} ${s.delta}</span>
          </div>
          <div class="adm-stat-value" id="dashStatVal-${i}">${s.key === "revenue" ? money(s.value) : s.value}</div>
          <div class="adm-stat-label">${s.label}</div>
          <div class="adm-stat-spark">${spark(s.data, s.color)}</div>
        </div>`
      )
      .join("");

    return `
      <div class="adm-stats">${statCards}</div>

      <div class="adm-grid adm-grid--charts" style="margin-bottom:20px">
        <div class="adm-card adm-card--lift">
          <div class="adm-card-head">
            <div>
              <h3 class="adm-card-title">Case Growth</h3>
              <p class="adm-card-sub">Matters opened · trailing 12 months</p>
            </div>
            <span class="adm-chip adm-chip--good">▲ 18.3% YoY</span>
          </div>
          <div class="adm-card-body"><div class="adm-chart" id="dashLineChart"></div></div>
        </div>
        <div class="adm-card adm-card--lift">
          <div class="adm-card-head">
            <div>
              <h3 class="adm-card-title">Case Status</h3>
              <p class="adm-card-sub">Current distribution</p>
            </div>
          </div>
          <div class="adm-card-body">
            <div class="adm-donut-wrap"><div class="adm-chart" id="dashDonut" style="max-width:210px;margin:0 auto"></div></div>
            <ul class="adm-chart-legend">${statusDist
              .map(
                (s) => `
              <li><span><span class="adm-legend-dot" style="background:${s.color}"></span>${s.label}</span>
              <strong>${s.count} · ${Math.round((s.count / totalCases) * 100)}%</strong></li>`
              )
              .join("")}</ul>
          </div>
        </div>
      </div>

      <div class="adm-grid adm-grid--split">
        <div class="adm-card adm-card--lift">
          <div class="adm-card-head">
            <div>
              <h3 class="adm-card-title">Monthly Revenue</h3>
              <p class="adm-card-sub">Billed revenue per month</p>
            </div>
          </div>
          <div class="adm-card-body adm-card-body--fill"><div class="adm-chart" id="dashBarChart"></div></div>
        </div>
        <div class="adm-card">
          <div class="adm-card-head">
            <div>
              <h3 class="adm-card-title">Live Activity</h3>
              <p class="adm-card-sub" id="dashLiveLabel"><span class="adm-live-dot"></span> Updating in real time</p>
            </div>
          </div>
          <div class="adm-card-body"><ul class="adm-activity" id="dashActivity"></ul></div>
        </div>
      </div>`;
  }

  function activityItem(a) {
    return `
      <li>
        <span class="adm-activity-dot" style="background:${a.tint};color:${a.color}">${ICONS[a.icon]}</span>
        <div class="adm-activity-body">
          <div class="adm-activity-title">${esc(a.title)}</div>
          <div class="adm-activity-meta">${esc(a.meta)}</div>
        </div>
        <span class="adm-activity-time">${esc(a.time)}</span>
      </li>`;
  }

  function afterDashboard() {
    lineChart($("#dashLineChart"), DB.caseGrowth, { color: "#c8a96a", uid: "dash" });
    barChart($("#dashBarChart"), DB.revenue, { color: "#c8a96a" });
    const statusDist = ["open", "in-progress", "review", "on-hold", "closed"]
      .map((k) => ({ label: CASE_STATUS[k].label, color: { open: "#3f8a6b", "in-progress": "#3f6b8a", review: "#c8a96a", "on-hold": "#9aa2ad", closed: "#c6c2bb" }[k], count: DB.cases.filter((c) => c.status === k).length }))
      .filter((s) => s.count > 0);
    donutChart($("#dashDonut"), statusDist, DB.cases.length);
    $("#dashActivity").innerHTML = DB.activity.map(activityItem).join("");
    refreshBadges();
  }

  /* ============================================================
     Users
     ============================================================ */

  function renderUsers() {
    let list = DB.users.filter((u) => {
      if (state.userRole !== "all" && u.role !== state.userRole) return false;
      if (state.userStatus !== "all" && u.status !== state.userStatus) return false;
      if (state.userQ && !(u.name.toLowerCase().includes(state.userQ) || u.email.toLowerCase().includes(state.userQ))) return false;
      return true;
    });

    const roles = ["Client", "Lawyer", "Admin", "Paralegal", "Accountant"];
    const roleFilter = `<button class="adm-filter ${state.userRole === "all" ? "is-active" : ""}" data-action="user-role" data-value="all">All</button>` +
      roles.map((r) => `<button class="adm-filter ${state.userRole === r ? "is-active" : ""}" data-action="user-role" data-value="${r}">${r}</button>`).join("");

    const body = !list.length
      ? `<tr><td colspan="7"><div class="adm-empty">${ICONS.users}<strong>No users found</strong><p>Try adjusting your filters or search.</p></div></td></tr>`
      : list
          .map((u) => `
        <tr data-id="${u.id}">
          <td><div class="adm-cell-user">${avatar(u.name)}<div class="adm-cell-user-text"><strong>${esc(u.name)}</strong><span>${esc(u.id)}</span></div></div></td>
          <td><span class="adm-table-title">${esc(u.email)}</span></td>
          <td><span class="adm-chip adm-chip--neutral">${esc(u.role)}</span></td>
          <td>${badge(USER_STATUS, u.status)}</td>
          <td>${fmtDate(u.joined)}</td>
          <td>${u.cases}</td>
          <td>
            <div class="adm-row-actions">
              <button class="adm-row-action" data-action="user-view" data-id="${u.id}" title="View">${ICONS.eye}</button>
              <button class="adm-row-action" data-action="user-edit" data-id="${u.id}" title="Edit">${ICONS.edit}</button>
              <button class="adm-row-action ${u.status === "active" ? "adm-row-action--danger" : ""}" data-action="user-toggle" data-id="${u.id}" title="${u.status === "active" ? "Block" : "Unblock"}">${u.status === "active" ? ICONS.shieldX : ICONS.shield}</button>
            </div>
          </td>
        </tr>`)
          .join("");

    return `
      <div class="adm-toolbar">
        <div class="adm-filters">${roleFilter}</div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <div class="adm-search-box" style="width:210px">${ICONS.search}<input class="adm-input" id="userSearch" placeholder="Search users…" value="${esc(state.userQ)}" /></div>
          <select class="adm-select" id="userStatusSel" style="width:130px" data-change="user-status">
            <option value="all" ${state.userStatus === "all" ? "selected" : ""}>All status</option>
            <option value="active" ${state.userStatus === "active" ? "selected" : ""}>Active</option>
            <option value="blocked" ${state.userStatus === "blocked" ? "selected" : ""}>Blocked</option>
          </select>
          <button class="adm-btn adm-btn--navy" data-action="user-add">${ICONS.plus}<span>Add User</span></button>
        </div>
      </div>
      <div class="adm-toolbar-hint" style="margin-bottom:12px"><strong>${list.length}</strong> of ${DB.users.length} users</div>
      <div class="adm-card adm-card--table">
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Joined</th><th>Cases</th><th style="text-align:right">Actions</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  /* ============================================================
     Lawyers
     ============================================================ */

  function renderLawyers() {
    let list = DB.lawyers.filter((l) => state.lawyerSpec === "all" || l.spec === state.lawyerSpec);
    if (state.lawyerQ) list = list.filter((l) => l.name.toLowerCase().includes(state.lawyerQ));

    const specs = ["Litigation", "Corporate & M&A", "Employment Law", "Intellectual Property", "Real Estate", "Family Law"];

    const body = !list.length
      ? `<tr><td colspan="7"><div class="adm-empty">${ICONS.lawyer}<strong>No lawyers found</strong><p>Try a different specialization.</p></div></td></tr>`
      : list
          .map((l) => `
        <tr data-id="${l.id}">
          <td><div class="adm-cell-user">${avatar(l.name)}<div class="adm-cell-user-text"><strong>${esc(l.name)}</strong><span>${esc(l.email)}</span></div></div></td>
          <td><span class="adm-chip adm-chip--gold">${esc(l.spec)}</span></td>
          <td><span class="adm-table-title">${l.cases}</span></td>
          <td>${stars(l.rating)}<div style="font-size:.7rem;color:var(--muted);margin-top:2px">${l.reviews} reviews</div></td>
          <td>${esc(l.exp)}</td>
          <td>${badge({ active: { label: "Active", cls: "active" }, "on-leave": { label: "On Leave", cls: "on-leave" } }, l.status)}</td>
          <td>
            <div class="adm-row-actions">
              <button class="adm-row-action" data-action="lawyer-view" data-id="${l.id}" title="View profile">${ICONS.eye}</button>
              <button class="adm-row-action" data-action="lawyer-edit" data-id="${l.id}" title="Edit">${ICONS.edit}</button>
            </div>
          </td>
        </tr>`)
          .join("");

    return `
      <div class="adm-toolbar">
        <div class="adm-filters">
          <button class="adm-filter ${state.lawyerSpec === "all" ? "is-active" : ""}" data-action="lawyer-spec" data-value="all">All</button>
          ${specs.map((s) => `<button class="adm-filter ${state.lawyerSpec === s ? "is-active" : ""}" data-action="lawyer-spec" data-value="${s}">${s}</button>`).join("")}
        </div>
        <div class="adm-toolbar-actions">
          <div class="adm-search-box">${ICONS.search}<input class="adm-input" id="lawyerSearch" placeholder="Search counsel…" value="${esc(state.lawyerQ)}" /></div>
          <button class="adm-btn adm-btn--navy" data-action="lawyer-add">${ICONS.plus}<span>Add Lawyer</span></button>
        </div>
      </div>
      <div class="adm-toolbar-hint" style="margin-bottom:12px"><strong>${list.length}</strong> counsel · avg rating <strong>${(list.reduce((s, l) => s + l.rating, 0) / (list.length || 1)).toFixed(1)}</strong></div>
      <div class="adm-card adm-card--table">
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>Counsel</th><th>Specialization</th><th>Cases</th><th>Rating</th><th>Experience</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  /* ============================================================
     Cases
     ============================================================ */

  function renderCases() {
    let list = DB.cases.filter((c) => {
      if (state.caseStatus !== "all" && c.status !== state.caseStatus) return false;
      if (state.casePriority !== "all" && c.priority !== state.casePriority) return false;
      if (state.caseQ && !(c.client.toLowerCase().includes(state.caseQ) || c.id.toLowerCase().includes(state.caseQ))) return false;
      return true;
    });

    const statuses = [
      { k: "all", label: "All" },
      { k: "open", label: "Open" },
      { k: "in-progress", label: "In Progress" },
      { k: "review", label: "In Review" },
      { k: "on-hold", label: "On Hold" },
      { k: "closed", label: "Closed" },
    ];

    const body = !list.length
      ? `<tr><td colspan="7"><div class="adm-empty">${ICONS.case}<strong>No cases found</strong><p>No matters match the current filters.</p></div></td></tr>`
      : list
          .map((c) => `
        <tr class="adm-table-rowclick" data-action="case-open" data-id="${c.id}">
          <td><span class="adm-table-title">${esc(c.id)}</span></td>
          <td>${esc(c.client)}</td>
          <td><div class="adm-cell-user">${avatar(c.lawyer)}<div class="adm-cell-user-text"><strong>${esc(c.lawyer)}</strong></div></div></td>
          <td>${badge(CASE_STATUS, c.status)}</td>
          <td>${prioBadge(c.priority)}</td>
          <td><span class="adm-table-title">${money(c.value)}</span></td>
          <td>${fmtDate(c.updated)}</td>
        </tr>`)
          .join("");

    return `
      <div class="adm-toolbar">
        <div class="adm-filters">
          ${statuses.map((s) => `<button class="adm-filter ${state.caseStatus === s.k ? "is-active" : ""}" data-action="case-status-filter" data-value="${s.k}">${s.label}</button>`).join("")}
        </div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <select class="adm-select" id="casePrioritySel" style="width:130px" data-change="case-priority-filter">
            <option value="all">All priorities</option>
            <option value="urgent" ${state.casePriority === "urgent" ? "selected" : ""}>Urgent</option>
            <option value="high" ${state.casePriority === "high" ? "selected" : ""}>High</option>
            <option value="medium" ${state.casePriority === "medium" ? "selected" : ""}>Medium</option>
            <option value="low" ${state.casePriority === "low" ? "selected" : ""}>Low</option>
          </select>
          <div class="adm-search-box" style="width:220px">${ICONS.search}<input class="adm-input" id="caseSearch" placeholder="Search client or ID…" value="${esc(state.caseQ)}" /></div>
          <button class="adm-btn adm-btn--navy" data-action="case-add">${ICONS.plus}<span>New Case</span></button>
        </div>
      </div>
      <div class="adm-toolbar-hint" style="margin-bottom:12px"><strong>${list.length}</strong> matters · click a row for details</div>
      <div class="adm-card adm-card--table">
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>Case ID</th><th>Client</th><th>Lawyer</th><th>Status</th><th>Priority</th><th>Value</th><th>Updated</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  function casePanelHtml(c) {
    const st = CASE_STATUS[c.status];
    const statusOpts = Object.keys(CASE_STATUS)
      .map((k) => `<option value="${k}" ${k === c.status ? "selected" : ""}>${CASE_STATUS[k].label}</option>`)
      .join("");
    const prioOpts = Object.keys(PRIORITY)
      .map((k) => `<option value="${k}" ${k === c.priority ? "selected" : ""}>${PRIORITY[k].label}</option>`)
      .join("");
    return `
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        ${badge(CASE_STATUS, c.status)}
        ${prioBadge(c.priority)}
        <span class="adm-chip adm-chip--neutral">${esc(c.type)}</span>
      </div>

      <div class="adm-detail">
        <div class="adm-detail-row"><span>Case ID</span><strong>${esc(c.id)}</strong></div>
        <div class="adm-detail-row"><span>Client</span><strong>${esc(c.client)}</strong></div>
        <div class="adm-detail-row"><span>Lead counsel</span><strong>${esc(c.lawyer)}</strong></div>
        <div class="adm-detail-row"><span>Matter value</span><strong>${money(c.value)}</strong></div>
        <div class="adm-detail-row"><span>Opened</span><strong>${fmtDate(c.opened)}</strong></div>
        <div class="adm-detail-row"><span>Last updated</span><strong>${fmtDate(c.updated)}</strong></div>
      </div>

      <p style="font-size:.82rem;line-height:1.7;color:var(--muted);margin-bottom:16px">${esc(c.desc)}</p>

      <div class="adm-card" style="padding:16px;margin-bottom:16px">
        <p class="adm-card-sub" style="text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:10px">Update Case</p>
        <div class="adm-form-row">
          <div class="adm-field" style="margin-bottom:0">
            <label class="adm-label">Status</label>
            <select class="adm-select" data-change="case-status" data-id="${c.id}">${statusOpts}</select>
          </div>
          <div class="adm-field" style="margin-bottom:0">
            <label class="adm-label">Priority</label>
            <select class="adm-select" data-change="case-priority" data-id="${c.id}">${prioOpts}</select>
          </div>
        </div>
      </div>

      <p class="adm-card-sub" style="text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin-bottom:10px">Matter Timeline</p>
      <ul class="adm-timeline">
        ${c.timeline
          .map((t) => `<li class="${t.done ? "" : "is-muted"}"><strong>${esc(t.label)}</strong><span>${esc(t.date)}</span></li>`)
          .join("")}
      </ul>`;
  }

  /* ============================================================
     Appointments
     ============================================================ */

  function renderAppointments() {
    const pending = pendingAppts();
    const today = apptsToday();
    const approved = DB.appointments.filter((a) => a.status === "approved").length;

    const tabs = `
      <div class="adm-tabs">
        <button class="adm-tab ${state.apptTab === "list" ? "is-active" : ""}" data-action="appt-tab" data-value="list">${ICONS.list}<span style="margin-left:6px">List</span></button>
        <button class="adm-tab ${state.apptTab === "calendar" ? "is-active" : ""}" data-action="appt-tab" data-value="calendar">${ICONS.calendar}<span style="margin-left:6px">Calendar</span></button>
      </div>`;

    const summary = `
      <div class="adm-stats adm-stats--3" style="margin-bottom:18px">
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#8a6d2f;--stint:rgba(200,169,106,0.16)">${ICONS.clock}</span></div><div class="adm-stat-value">${pending}</div><div class="adm-stat-label">Awaiting approval</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f6b8a;--stint:rgba(63,107,138,0.12)">${ICONS.calendar}</span></div><div class="adm-stat-value">${today}</div><div class="adm-stat-label">Scheduled today</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f8a6b;--stint:rgba(63,138,107,0.12)">${ICONS.check}</span></div><div class="adm-stat-value">${approved}</div><div class="adm-stat-label">Approved total</div></div>
      </div>`;

    return `
      <div class="adm-toolbar">
        ${tabs}
        <button class="adm-btn adm-btn--gold" data-action="appt-add">${ICONS.plus}<span class="adm-btn--table-cta"><span>New Appointment</span></span></button>
      </div>
      ${summary}
      <div id="apptBody">${state.apptTab === "calendar" ? calendarHtml() : apptListHtml()}</div>`;
  }

  function dayLabel(iso) {
    const d = new Date(iso + "T00:00:00");
    d.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.round((d - today) / 86400000);
    if (diff === 0) return "Today";
    if (diff === 1) return "Tomorrow";
    if (diff === -1) return "Yesterday";
    return d.toLocaleDateString("en-US", { weekday: "long" });
  }

  function apptListHtml() {
    const sorted = [...DB.appointments].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    if (!sorted.length) {
      return `<div class="adm-card"><div class="adm-empty">${ICONS.appt}<strong>No appointments</strong><p>Bookings will appear here.</p></div></div>`;
    }
    const groups = {};
    sorted.forEach((a) => {
      (groups[a.date] = groups[a.date] || []).push(a);
    });
    return Object.keys(groups)
      .sort()
      .map(
        (date) => `
        <div class="adm-appt-group">
          <div class="adm-appt-group-head">
            <div class="adm-appt-group-date">
              <strong>${dayLabel(date)}</strong>
              <span>${fmtDay(date)}</span>
            </div>
            <span class="adm-chip adm-chip--neutral">${groups[date].length} booking${groups[date].length > 1 ? "s" : ""}</span>
          </div>
          ${groups[date].map(apptItem).join("")}
        </div>`
      )
      .join("");
  }

  function apptItem(a) {
    const canAct = a.status === "pending";
    const typeChip = `<span class="adm-appt-type-chip ${a.type === "video" ? "is-video" : ""}">${a.type === "video" ? "Video" : "Office"}</span>`;
    return `
      <div class="adm-appt-item" data-id="${a.id}">
        <span class="adm-appt-time">${esc(a.time)}</span>
        <div class="adm-appt-body">
          <strong>${esc(a.topic)}</strong>
          <div class="adm-appt-meta">
            ${avatar(a.client, "adm-avatar--xs")}
            <span class="adm-appt-meta-client">${esc(a.client)}</span>
            <span class="adm-appt-meta-sep">→</span>
            <span class="adm-appt-meta-lawyer">${esc(a.lawyer)}</span>
            ${typeChip}
          </div>
        </div>
        <div class="adm-appt-side">
          ${badge(APPT_STATUS, a.status)}
          <div class="adm-appt-actions">
            ${canAct ? `<button class="adm-btn adm-btn--xs adm-btn--soft" data-action="appt-approve" data-id="${a.id}">${ICONS.check} Approve</button>
            <button class="adm-btn adm-btn--xs adm-btn--danger" data-action="appt-reject" data-id="${a.id}">${ICONS.x} Reject</button>` : ""}
            <button class="adm-row-action" data-action="appt-reschedule" data-id="${a.id}" title="Reschedule">${ICONS.calendar}</button>
          </div>
        </div>
      </div>`;
  }

  function calendarHtml() {
    const { y, m } = state.apptMonth;
    const first = new Date(y, m, 1);
    const startOffset = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const daysInPrev = new Date(y, m, 0).getDate();
    const today = new Date();
    const todayStr = isoOf(today);

    const cells = [];
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(y, m - 1, daysInPrev - i);
      cells.push({ iso: isoOf(d), num: daysInPrev - i, muted: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ iso: isoOf(new Date(y, m, d)), num: d, muted: false });
    }
    const lead = cells.length % 7;
    if (lead) for (let d = 1; d <= 7 - lead; d++) {
      const dd = new Date(y, m + 1, d);
      cells.push({ iso: isoOf(dd), num: d, muted: true });
    }

    const hasAppt = (iso) => DB.appointments.some((a) => a.date === iso);

    const dayHtml = cells
      .map(
        (c) => `
        <button class="adm-cal-day ${c.muted ? "adm-cal-day--muted" : ""} ${c.iso === todayStr ? "adm-cal-day--today" : ""} ${c.iso === state.apptSel ? "adm-cal-day--sel" : ""}"
          data-action="appt-day" data-value="${c.iso}" ${c.muted ? "tabindex='-1'" : ""}>
          ${c.num}${hasAppt(c.iso) ? `<span class="adm-cal-dot"></span>` : ""}
        </button>`
      )
      .join("");

    const sel = DB.appointments.filter((a) => a.date === state.apptSel);
    const selHtml = sel.length
      ? sel.map(apptItem).join("")
      : `<div class="adm-card"><div class="adm-empty">${ICONS.calendar}<strong>No appointments on ${fmtDay(state.apptSel)}</strong><p>Select another day or create one.</p></div></div>`;

    return `
      <div class="adm-grid adm-grid--calendar">
        <div class="adm-cal">
          <div class="adm-cal-head">
            <h3 class="adm-cal-title">${MONTH_NAMES[m]} ${y}</h3>
            <div class="adm-cal-nav">
              <button class="adm-icon-btn" data-action="appt-prev" aria-label="Previous month">${ICONS.chevL}</button>
              <button class="adm-icon-btn" data-action="appt-next" aria-label="Next month">${ICONS.chevR}</button>
            </div>
          </div>
          <div class="adm-cal-week"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
          <div class="adm-cal-grid">${dayHtml}</div>
        </div>
        <div>
          <h3 class="adm-card-title" style="margin-bottom:12px">${fmtDay(state.apptSel)}</h3>
          <div id="apptDayList">${selHtml}</div>
        </div>
      </div>`;
  }

  function renderAppointmentsAfter() {
    refreshBadges();
  }

  /* ============================================================
     Payments
     ============================================================ */

  function renderPayments() {
    const paid = DB.payments.filter((p) => p.status === "paid");
    const collected = paid.reduce((s, p) => s + p.amount, 0);
    const outstanding = DB.payments.filter((p) => p.status === "pending" || p.status === "overdue").reduce((s, p) => s + p.amount, 0);
    const thisMonth = DB.payments.filter((p) => p.status === "paid" && p.date.startsWith(now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0"))).reduce((s, p) => s + p.amount, 0);
    const rate = Math.round((collected / (collected + outstanding)) * 100);

    let list = DB.payments.filter((p) => state.paymentFilter === "all" || p.status === state.paymentFilter);

    const body = !list.length
      ? `<tr><td colspan="6"><div class="adm-empty">${ICONS.pay}<strong>No payments found</strong><p>No invoices match this filter.</p></div></td></tr>`
      : list
          .map((p) => `
        <tr data-id="${p.id}">
          <td><span class="adm-table-title">${esc(p.id)}</span></td>
          <td>${esc(p.user)}</td>
          <td><span class="adm-table-title">${money2(p.amount)}</span></td>
          <td>${esc(p.method)}</td>
          <td>${fmtDate(p.date)}</td>
          <td>${badge(PAYMENT, p.status)}</td>
          <td>
            <div class="adm-row-actions">
              ${p.status === "pending" || p.status === "overdue" ? `<button class="adm-btn adm-btn--xs adm-btn--navy" data-action="pay-markpaid" data-id="${p.id}">${ICONS.check} Mark Paid</button>` : ""}
              <button class="adm-row-action" data-action="pay-receipt" data-id="${p.id}" title="Receipt">${ICONS.eye}</button>
            </div>
          </td>
        </tr>`)
          .join("");

    return `
      <div class="adm-stats adm-stats--3">
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f8a6b;--stint:rgba(63,138,107,0.12)">${ICONS.pay}</span><span class="adm-stat-trend adm-stat-trend--up">▲ Collected</span></div><div class="adm-stat-value">${money(collected)}</div><div class="adm-stat-label">Total collected</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#8a6d2f;--stint:rgba(200,169,106,0.16)">${ICONS.clock}</span><span class="adm-stat-trend adm-stat-trend--down">Outstanding</span></div><div class="adm-stat-value">${money(outstanding)}</div><div class="adm-stat-label">Pending + overdue</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f6b8a;--stint:rgba(63,107,138,0.12)">${ICONS.report}</span><span class="adm-stat-trend adm-stat-trend--up">${rate}%</span></div><div class="adm-stat-value">${money(thisMonth)}</div><div class="adm-stat-label">Collected this month</div></div>
      </div>

      <div class="adm-toolbar" style="margin-top:22px">
        <div class="adm-filters">
          <button class="adm-filter ${state.paymentFilter === "all" ? "is-active" : ""}" data-action="pay-filter" data-value="all">All</button>
          <button class="adm-filter ${state.paymentFilter === "paid" ? "is-active" : ""}" data-action="pay-filter" data-value="paid">Paid</button>
          <button class="adm-filter ${state.paymentFilter === "pending" ? "is-active" : ""}" data-action="pay-filter" data-value="pending">Pending</button>
          <button class="adm-filter ${state.paymentFilter === "overdue" ? "is-active" : ""}" data-action="pay-filter" data-value="overdue">Overdue</button>
        </div>
        <div class="adm-toolbar-hint"><strong>${list.length}</strong> invoices</div>
      </div>

      <div class="adm-card adm-card--table">
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Method</th><th>Date</th><th>Status</th><th style="text-align:right">Actions</th></tr></thead>
            <tbody>${body}</tbody>
          </table>
        </div>
      </div>`;
  }

  /* ============================================================
     Reports
     ============================================================ */

  function rangeSlice(range) {
    const n = range === "30d" ? 3 : range === "90d" ? 6 : 12;
    return {
      n,
      revenue: DB.revenue.slice(-n),
      growth: DB.caseGrowth.slice(-n),
      closed: DB.casesClosed.slice(-n),
      labels: n === 12 ? "12 months" : n === 6 ? "6 months" : "3 months",
    };
  }

  function renderReports() {
    const d = rangeSlice(state.reportRange);
    const totalRevenue = d.revenue.reduce((s, x) => s + x.v, 0);
    const closed = d.closed.reduce((s, x) => s + x.v, 0);
    const newCases = d.growth[d.growth.length - 1].v - d.growth[0].v;
    const avg = Math.round(totalRevenue / d.n);
    const rate = 92;

    return `
      <div class="adm-toolbar">
        <div class="adm-range">
          <button class="${state.reportRange === "30d" ? "is-active" : ""}" data-action="report-range" data-value="30d">30D</button>
          <button class="${state.reportRange === "90d" ? "is-active" : ""}" data-action="report-range" data-value="90d">90D</button>
          <button class="${state.reportRange === "12m" ? "is-active" : ""}" data-action="report-range" data-value="12m">12M</button>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <span class="adm-toolbar-hint">Period: <strong>${d.labels}</strong></span>
          <button class="adm-btn adm-btn--gold" data-action="report-export">${ICONS.export}<span>Export Report</span></button>
        </div>
      </div>

      <div class="adm-stats">
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon">${ICONS.pay}</span></div><div class="adm-stat-value">${money(totalRevenue)}</div><div class="adm-stat-label">Revenue in period</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f6b8a;--stint:rgba(63,107,138,0.12)">${ICONS.case}</span></div><div class="adm-stat-value">${newCases}</div><div class="adm-stat-label">New cases opened</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#3f8a6b;--stint:rgba(63,138,107,0.12)">${ICONS.check}</span></div><div class="adm-stat-value">${closed}</div><div class="adm-stat-label">Matters closed</div></div>
        <div class="adm-stat"><div class="adm-stat-top"><span class="adm-stat-icon" style="--sc:#8a6d2f;--stint:rgba(200,169,106,0.16)">${ICONS.report}</span></div><div class="adm-stat-value">${rate}%</div><div class="adm-stat-label">Collection rate</div></div>
      </div>

      <div class="adm-grid adm-grid--charts" style="margin-bottom:20px">
        <div class="adm-card adm-card--lift">
          <div class="adm-card-head"><div><h3 class="adm-card-title">Case Trends</h3><p class="adm-card-sub">Matters opened per period</p></div><span class="adm-chip adm-chip--good">▲ ${Math.round((newCases / Math.max(d.growth[0].v, 1)) * 100)}%</span></div>
          <div class="adm-card-body"><div class="adm-chart" id="repLineChart"></div></div>
        </div>
        <div class="adm-card adm-card--lift">
          <div class="adm-card-head"><div><h3 class="adm-card-title">Revenue Growth</h3><p class="adm-card-sub">Billed revenue per period</p></div></div>
          <div class="adm-card-body"><div class="adm-chart" id="repBarChart"></div></div>
        </div>
      </div>

      <div class="adm-card adm-card--table">
        <div class="adm-card-head" style="padding-bottom:12px"><div><h3 class="adm-card-title">Monthly Breakdown</h3><p class="adm-card-sub">Period performance summary</p></div></div>
        <div class="adm-table-wrap">
          <table class="adm-table">
            <thead><tr><th>Period</th><th>New Cases</th><th>Matters Closed</th><th>Revenue</th><th>Avg / Case</th></tr></thead>
            <tbody>${d.growth
              .map((g, i) => {
                const rev = d.revenue[i] ? d.revenue[i].v : 0;
                const closed2 = d.closed[i] ? d.closed[i].v : 0;
                return `<tr><td><span class="adm-table-title">${g.m} 2026</span></td><td>${g.v}</td><td>${closed2}</td><td><span class="adm-table-title">${money(rev)}</span></td><td>${avg}</td></tr>`;
              })
              .join("")}</tbody>
          </table>
        </div>
      </div>`;
  }

  function afterReports() {
    const d = rangeSlice(state.reportRange);
    lineChart($("#repLineChart"), d.growth, { color: "#c8a96a", uid: "rep" });
    barChart($("#repBarChart"), d.revenue, { color: "#1f2f46", muted: "rgba(31,47,70,0.4)" });
  }

  /* ============================================================
     Settings
     ============================================================ */

  function renderSettings() {
    const prefs = DB.systemPrefs
      .map(
        (p) => `
        <li>
          <div><strong>${esc(p.label)}</strong><span>${esc(p.desc)}</span></div>
          <label class="adm-switch"><input type="checkbox" data-change="sys-pref" data-id="${p.id}" ${p.on ? "checked" : ""} /><span class="adm-switch-track"></span></label>
        </li>`
      )
      .join("");

    const a = DB.admin;
    const roleOpts = ["Super Admin", "Admin"]
      .map((r) => `<option ${r === a.role ? "selected" : ""}>${r}</option>`)
      .join("");

    return `
      <div class="adm-grid adm-grid--settings">
        <div class="adm-card">
          <div class="adm-card-head"><div><h3 class="adm-card-title">Admin Profile</h3><p class="adm-card-sub">Your account and identity</p></div></div>
          <div class="adm-card-body">
            <div class="adm-settings-head">
              <span class="adm-avatar">${esc(a.initials)}</span>
              <div><strong>${esc(a.name)}</strong><span>${esc(a.role)} · ${esc(a.email)}</span><span class="adm-profile-badge">Verified</span></div>
            </div>
            <div class="adm-form-row">
              <div class="adm-field"><label class="adm-label">Full name</label><input class="adm-input" id="setName" value="${esc(a.name)}" /></div>
              <div class="adm-field"><label class="adm-label">Role</label><select class="adm-select" data-change="noop">${roleOpts}</select></div>
            </div>
            <div class="adm-field"><label class="adm-label">Email</label><input class="adm-input" id="setEmail" value="${esc(a.email)}" /></div>
            <div class="adm-field"><label class="adm-label">Phone</label><input class="adm-input" id="setPhone" value="${esc(a.phone)}" /></div>
            <div style="display:flex;gap:10px;flex-wrap:wrap">
              <button class="adm-btn adm-btn--navy" data-action="settings-save">Save Changes</button>
              <button class="adm-btn adm-btn--soft" data-action="settings-avatar">Change Avatar</button>
            </div>
          </div>
        </div>

        <div class="adm-card">
          <div class="adm-card-head"><div><h3 class="adm-card-title">System Settings</h3><p class="adm-card-sub">Platform behaviour and security</p></div></div>
          <div class="adm-card-body">
            <ul class="adm-prefs">${prefs}</ul>
            <p class="adm-card-sub" style="text-transform:uppercase;letter-spacing:.08em;font-weight:700;margin:16px 0 6px">Defaults</p>
            <div class="adm-select-row"><span style="font-size:.84rem;color:var(--navy);font-weight:600">Default case status</span><select class="adm-select" data-change="noop"><option>In Progress</option><option>Open</option><option>Review</option></select></div>
            <div class="adm-select-row"><span style="font-size:.84rem;color:var(--navy);font-weight:600">Timezone</span><select class="adm-select" data-change="noop"><option>UTC-08:00 · Pacific</option><option>UTC+05:30 · India</option><option>UTC+01:00 · CET</option></select></div>
            <div class="adm-select-row"><span style="font-size:.84rem;color:var(--navy);font-weight:600">Currency</span><select class="adm-select" data-change="noop"><option>USD $</option><option>EUR €</option><option>INR ₹</option></select></div>
          </div>
        </div>

        <div class="adm-card adm-danger-zone" style="grid-column:1/-1">
          <div class="adm-card-head"><div><h3 class="adm-card-title">Danger Zone</h3><p class="adm-card-sub">Irreversible actions</p></div></div>
          <div class="adm-card-body" style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap">
            <div><p style="font-size:.84rem;font-weight:600;color:var(--navy)">Reset demo data</p><p class="adm-card-sub">Restore the console to its initial dummy dataset</p></div>
            <button class="adm-btn adm-btn--danger" data-action="settings-reset">Reset Demo Data</button>
          </div>
        </div>
      </div>`;
  }

  /* ============================================================
     Notifications
     ============================================================ */

  function unreadCount() {
    return DB.notifications.filter((n) => !n.read).length;
  }

  function renderBell() {
    const badge = $("#admBellBadge");
    const n = unreadCount();
    badge.textContent = n;
    badge.style.display = n ? "grid" : "none";
  }

  function renderBellDrop() {
    const body = DB.notifications.length
      ? DB.notifications
          .map(
            (n) => `
          <div class="adm-notif-item ${n.read ? "" : "is-unread"}">
            <span class="adm-notif-icon" style="background:${n.color}1f;color:${n.color}">${ICONS[n.icon]}</span>
            <div class="adm-notif-body"><strong>${esc(n.title)}</strong><span>${esc(n.meta)} · ${esc(n.time)}</span></div>
            ${n.read ? "" : '<span class="adm-notif-dot"></span>'}
          </div>`
          )
          .join("")
      : `<div class="adm-notif-empty">You're all caught up.</div>`;
    $("#admBellDrop").innerHTML = `
      <div class="adm-drop-head">
        <span class="adm-drop-title">Notifications</span>
        <button class="adm-drop-link" data-action="notif-readall">Mark all read</button>
      </div>
      <div style="max-height:340px;overflow-y:auto">${body}</div>`;
  }

  function pushNotif(icon, title, meta) {
    DB.notifications.unshift({ id: Date.now(), icon, title, meta, time: "just now", color: { case: "#1f2f46", pay: "#3f8a6b", user: "#3f6b8a", appt: "#8a6d2f", doc: "#4a7a63", report: "#7a5c8f" }[icon] || "#8a6d2f", read: false });
    DB.notifications = DB.notifications.slice(0, 12);
    renderBell();
    const b = $("#admBellBadge");
    b.classList.remove("is-pop");
    void b.offsetWidth;
    b.classList.add("is-pop");
  }

  /* ============================================================
     Live feed simulation
     ============================================================ */

  function liveTick() {
    state.tick++;
    const ev = DB.feedPool[Math.floor(Math.random() * DB.feedPool.length)];
    const ev2 = { ...ev, meta: ev.meta + (ev.time !== "just now" ? "" : "") };
    DB.activity.unshift(ev2);
    DB.activity = DB.activity.slice(0, 9);
    pushNotif(ev.icon, ev.title, ev.meta);

    if (state.view === "dashboard") {
      const feed = $("#dashActivity");
      if (feed) feed.insertAdjacentHTML("afterbegin", activityItem(ev2));
      const items = $$("#dashActivity li");
      if (items.length > 9) items[items.length - 1].remove();

      const i = state.liveStat % 4;
      state.liveStat++;
      const stat = $("#dashStat-" + i);
      const val = $("#dashStatVal-" + i);
      if (stat && val) {
        let newVal;
        const defs = dashboardStats();
        const base = defs[i].value;
        if (i === 2) newVal = money(base + Math.round(900 + Math.random() * 1600));
        else newVal = base + 1;
        val.textContent = newVal;
        stat.classList.remove("is-bump");
        void stat.offsetWidth;
        stat.classList.add("is-bump");
      }
    }

    if (state.tick % 2 === 0) {
      toast("Live update — " + ev.title, "info");
    }
  }

  /* ============================================================
     Modals / panels content
     ============================================================ */

  function userViewModal(u) {
    openModal(
      u.name,
      u.id + " · joined " + fmtDate(u.joined),
      `
      <div class="adm-detail">
        <div class="adm-detail-row"><span>Email</span><strong>${esc(u.email)}</strong></div>
        <div class="adm-detail-row"><span>Role</span><strong>${esc(u.role)}</strong></div>
        <div class="adm-detail-row"><span>Status</span><strong>${badge(USER_STATUS, u.status)}</strong></div>
        <div class="adm-detail-row"><span>Cases</span><strong>${u.cases}</strong></div>
        <div class="adm-detail-row"><span>Last active</span><strong>${esc(u.lastActive)}</strong></div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="user-edit" data-id="${u.id}">${ICONS.edit} Edit</button>
        <button class="adm-btn ${u.status === "active" ? "adm-btn--danger" : "adm-btn--navy"}" data-action="user-toggle" data-id="${u.id}">${u.status === "active" ? ICONS.shieldX + " Block" : ICONS.shield + " Unblock"}</button>
      </div>`
    );
  }

  function userEditModal(u) {
    openModal(
      "Edit User",
      u.id + " · " + u.name,
      `
      <div class="adm-field"><label class="adm-label">Full name</label><input class="adm-input" id="mUserName" value="${esc(u.name)}" /></div>
      <div class="adm-field"><label class="adm-label">Email</label><input class="adm-input" id="mUserEmail" value="${esc(u.email)}" /></div>
      <div class="adm-form-row">
        <div class="adm-field"><label class="adm-label">Role</label>
          <select class="adm-select" id="mUserRole">
            ${["Client", "Lawyer", "Admin", "Paralegal", "Accountant"].map((r) => `<option ${r === u.role ? "selected" : ""}>${r}</option>`).join("")}
          </select>
        </div>
        <div class="adm-field"><label class="adm-label">Status</label>
          <select class="adm-select" id="mUserStatus">
            <option value="active" ${u.status === "active" ? "selected" : ""}>Active</option>
            <option value="blocked" ${u.status === "blocked" ? "selected" : ""}>Blocked</option>
          </select>
        </div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="modal-close">Cancel</button>
        <button class="adm-btn adm-btn--navy" data-action="user-save" data-id="${u.id}">Save User</button>
      </div>`
    );
  }

  function userAddModal() {
    openModal(
      "Add User",
      "Create a new account on the platform",
      `
      <div class="adm-field"><label class="adm-label">Full name</label><input class="adm-input" id="mUserName" placeholder="e.g. Jordan Blake" /></div>
      <div class="adm-field"><label class="adm-label">Email</label><input class="adm-input" id="mUserEmail" type="email" placeholder="name@company.com" /></div>
      <div class="adm-form-row">
        <div class="adm-field"><label class="adm-label">Role</label>
          <select class="adm-select" id="mUserRole">
            ${["Client", "Lawyer", "Admin", "Paralegal", "Accountant"].map((r) => `<option>${r}</option>`).join("")}
          </select>
        </div>
        <div class="adm-field"><label class="adm-label">Status</label>
          <select class="adm-select" id="mUserStatus"><option value="active">Active</option><option value="blocked">Blocked</option></select>
        </div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="modal-close">Cancel</button>
        <button class="adm-btn adm-btn--navy" data-action="user-create">Create User</button>
      </div>`
    );
  }

  function lawyerViewModal(l) {
    openModal(
      l.name,
      l.id + " · " + l.spec,
      `
      <div class="adm-detail">
        <div class="adm-detail-row"><span>Specialization</span><strong>${esc(l.spec)}</strong></div>
        <div class="adm-detail-row"><span>Experience</span><strong>${esc(l.exp)}</strong></div>
        <div class="adm-detail-row"><span>Assigned cases</span><strong>${l.cases}</strong></div>
        <div class="adm-detail-row"><span>Rating</span><strong>${stars(l.rating)}</strong></div>
        <div class="adm-detail-row"><span>Reviews</span><strong>${l.reviews}</strong></div>
        <div class="adm-detail-row"><span>Email</span><strong>${esc(l.email)}</strong></div>
        <div class="adm-detail-row"><span>Phone</span><strong>${esc(l.phone)}</strong></div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--navy" data-action="modal-close">Done</button>
      </div>`
    );
  }

  function caseAddModal() {
    openModal(
      "New Case",
      "Open a new matter and assign counsel",
      `
      <div class="adm-field"><label class="adm-label">Client</label>
        <select class="adm-select" id="mCaseClient">${DB.users.filter((u) => u.role === "Client").map((u) => `<option>${esc(u.name)}</option>`).join("")}</select>
      </div>
      <div class="adm-field"><label class="adm-label">Lead counsel</label>
        <select class="adm-select" id="mCaseLawyer">${DB.lawyers.filter((l) => l.status === "active").map((l) => `<option>${esc(l.name)}</option>`).join("")}</select>
      </div>
      <div class="adm-form-row">
        <div class="adm-field"><label class="adm-label">Type</label>
          <select class="adm-select" id="mCaseType"><option>Litigation</option><option>Corporate</option><option>Commercial Lease</option><option>Employment</option><option>Intellectual Property</option><option>Real Estate</option><option>Family</option></select>
        </div>
        <div class="adm-field"><label class="adm-label">Priority</label>
          <select class="adm-select" id="mCasePriority"><option value="low">Low</option><option value="medium" selected>Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select>
        </div>
      </div>
      <div class="adm-field"><label class="adm-label">Matter description</label><textarea class="adm-textarea" id="mCaseDesc" placeholder="Brief summary of the matter…"></textarea></div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="modal-close">Cancel</button>
        <button class="adm-btn adm-btn--navy" data-action="case-create">Create Case</button>
      </div>`
    );
  }

  function apptAddModal() {
    openModal(
      "New Appointment",
      "Schedule a consultation",
      `
      <div class="adm-form-row">
        <div class="adm-field"><label class="adm-label">Date</label><input class="adm-input" type="date" id="mApptDate" min="2026-08-28" value="${todayIso}" /></div>
        <div class="adm-field"><label class="adm-label">Time</label><select class="adm-select" id="mApptTime"><option>09:30 AM</option><option selected>11:00 AM</option><option>02:00 PM</option><option>04:30 PM</option></select></div>
      </div>
      <div class="adm-field"><label class="adm-label">Client</label><select class="adm-select" id="mApptClient">${DB.users.filter((u) => u.role === "Client").map((u) => `<option>${esc(u.name)}</option>`).join("")}</select></div>
      <div class="adm-field"><label class="adm-label">Counsel</label><select class="adm-select" id="mApptLawyer">${DB.lawyers.map((l) => `<option>${esc(l.name)}</option>`).join("")}</select></div>
      <div class="adm-field"><label class="adm-label">Topic</label><input class="adm-input" id="mApptTopic" placeholder="e.g. Case review" /></div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="modal-close">Cancel</button>
        <button class="adm-btn adm-btn--gold" data-action="appt-create">Schedule</button>
      </div>`
    );
  }

  function apptRescheduleModal(a) {
    openModal(
      "Reschedule Appointment",
      a.id + " · " + a.topic,
      `
      <div class="adm-form-row">
        <div class="adm-field"><label class="adm-label">New date</label><input class="adm-input" type="date" id="mApptDate" min="2026-08-28" value="${a.date}" /></div>
        <div class="adm-field"><label class="adm-label">New time</label><select class="adm-select" id="mApptTime"><option ${a.time === "09:30 AM" ? "selected" : ""}>09:30 AM</option><option ${a.time === "11:00 AM" ? "selected" : ""}>11:00 AM</option><option ${a.time === "02:00 PM" ? "selected" : ""}>02:00 PM</option><option ${a.time === "04:30 PM" ? "selected" : ""}>04:30 PM</option></select></div>
      </div>
      <div class="adm-detail" style="margin-top:4px">
        <div class="adm-detail-row"><span>Client</span><strong>${esc(a.client)}</strong></div>
        <div class="adm-detail-row"><span>Counsel</span><strong>${esc(a.lawyer)}</strong></div>
        <div class="adm-detail-row"><span>Current</span><strong>${fmtDay(a.date)} · ${esc(a.time)}</strong></div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--soft" data-action="modal-close">Cancel</button>
        <button class="adm-btn adm-btn--navy" data-action="appt-resave" data-id="${a.id}">Confirm Reschedule</button>
      </div>`
    );
  }

  function payReceiptModal(p) {
    openModal(
      "Invoice " + p.id,
      "Payment receipt",
      `
      <div class="adm-detail">
        <div class="adm-detail-row"><span>Client</span><strong>${esc(p.user)}</strong></div>
        <div class="adm-detail-row"><span>Amount</span><strong>${money2(p.amount)}</strong></div>
        <div class="adm-detail-row"><span>Method</span><strong>${esc(p.method)}</strong></div>
        <div class="adm-detail-row"><span>Date</span><strong>${fmtDate(p.date)}</strong></div>
        <div class="adm-detail-row"><span>Status</span><strong>${badge(PAYMENT, p.status)}</strong></div>
      </div>
      <div class="adm-modal-actions">
        <button class="adm-btn adm-btn--gold" data-action="modal-close">${ICONS.export} Download Receipt</button>
      </div>`
    );
  }

  /* ============================================================
     Action dispatcher (delegated clicks)
     ============================================================ */

  const ACTIONS = {
    "modal-close": () => closeModal(),

    "user-view": (el) => userViewModal(DB.users.find((u) => u.id === el.dataset.id)),
    "user-edit": (el) => userEditModal(DB.users.find((u) => u.id === el.dataset.id)),
    "user-add": () => userAddModal(),
    "user-role": (el) => {
      state.userRole = el.dataset.value;
      navigate("users");
    },
    "user-toggle": (el) => {
      const u = DB.users.find((x) => x.id === el.dataset.id);
      if (!u) return;
      u.status = u.status === "active" ? "blocked" : "active";
      toast(u.status === "blocked" ? `${u.name} has been blocked.` : `${u.name} has been unblocked.`, u.status === "blocked" ? "error" : "success");
      closeModal();
      navigate("users");
    },
    "user-save": (el) => {
      const u = DB.users.find((x) => x.id === el.dataset.id);
      if (!u) return;
      u.name = $("#mUserName").value.trim() || u.name;
      u.email = $("#mUserEmail").value.trim() || u.email;
      u.role = $("#mUserRole").value;
      u.status = $("#mUserStatus").value;
      closeModal();
      toast("User updated successfully.");
      navigate("users");
    },
    "user-create": () => {
      const name = ($("#mUserName").value || "").trim();
      const email = ($("#mUserEmail").value || "").trim();
      if (!name || !email) return toast("Name and email are required.", "error");
      DB.users.unshift({
        id: "U-" + (1015 + Math.floor(Math.random() * 9000)),
        name,
        email,
        role: $("#mUserRole").value,
        status: $("#mUserStatus").value,
        joined: todayIso,
        cases: 0,
        lastActive: "just now",
      });
      closeModal();
      toast(`${name} created successfully.`);
      navigate("users");
    },

    "lawyer-view": (el) => lawyerViewModal(DB.lawyers.find((l) => l.id === el.dataset.id)),
    "lawyer-edit": (el) => toast(`Editing ${DB.lawyers.find((l) => l.id === el.dataset.id).name} — demo mode.`, "info"),
    "lawyer-add": () => toast("Invitation sent to new counsel.", "info"),
    "lawyer-spec": (el) => {
      state.lawyerSpec = el.dataset.value;
      navigate("lawyers");
    },

    "case-status-filter": (el) => {
      state.caseStatus = el.dataset.value;
      navigate("cases");
    },
    "case-open": (el) => {
      const c = DB.cases.find((x) => x.id === el.dataset.id);
      if (c) openPanel(c.id, `${c.client} · ${c.lawyer}`, casePanelHtml(c));
    },
    "case-add": () => caseAddModal(),
    "case-create": () => {
      const client = $("#mCaseClient").value;
      const lawyer = $("#mCaseLawyer").value;
      const type = $("#mCaseType").value;
      const priority = $("#mCasePriority").value;
      const desc = ($("#mCaseDesc").value || "").trim();
      const id = "C-2026-" + (119 + Math.floor(Math.random() * 80));
      DB.cases.unshift({
        id,
        client,
        lawyer,
        status: "open",
        priority,
        type,
        value: 5000 + Math.floor(Math.random() * 90000),
        opened: todayIso,
        updated: todayIso,
        desc: desc || "Matter opened via admin console.",
        timeline: [{ label: "Case opened", date: "Today", done: true }, { label: "Awaiting initial brief", date: "—", done: false }],
      });
      closeModal();
      toast(`Case ${id} created and assigned to ${lawyer}.`);
      refreshBadges();
      navigate("cases");
    },

    "appt-tab": (el) => {
      state.apptTab = el.dataset.value;
      navigate("appointments");
    },
    "appt-add": () => apptAddModal(),
    "appt-day": (el) => {
      state.apptSel = el.dataset.value;
      navigate("appointments");
    },
    "appt-prev": () => {
      const { y, m } = state.apptMonth;
      state.apptMonth = m === 0 ? { y: y - 1, m: 11 } : { y, m: m - 1 };
      navigate("appointments");
    },
    "appt-next": () => {
      const { y, m } = state.apptMonth;
      state.apptMonth = m === 11 ? { y: y + 1, m: 0 } : { y, m: m + 1 };
      navigate("appointments");
    },
    "appt-approve": (el) => {
      const a = DB.appointments.find((x) => x.id === el.dataset.id);
      if (!a) return;
      a.status = "approved";
      toast(`Appointment ${a.id} approved.`, "success");
      refreshBadges();
      navigate("appointments");
    },
    "appt-reject": (el) => {
      const a = DB.appointments.find((x) => x.id === el.dataset.id);
      if (!a) return;
      a.status = "rejected";
      toast(`${a.id} rejected — client notified.`, "error");
      refreshBadges();
      navigate("appointments");
    },
    "appt-reschedule": (el) => apptRescheduleModal(DB.appointments.find((x) => x.id === el.dataset.id)),
    "appt-resave": (el) => {
      const a = DB.appointments.find((x) => x.id === el.dataset.id);
      if (!a) return;
      a.date = $("#mApptDate").value || a.date;
      a.time = $("#mApptTime").value;
      a.status = "rescheduled";
      closeModal();
      toast(`${a.id} rescheduled to ${fmtDay(a.date)} · ${a.time}.`);
      navigate("appointments");
    },
    "appt-create": () => {
      const topic = ($("#mApptTopic").value || "").trim();
      const date = $("#mApptDate").value || todayIso;
      if (!topic) return toast("Topic is required.", "error");
      DB.appointments.unshift({
        id: "APT-" + (309 + Math.floor(Math.random() * 900)),
        client: $("#mApptClient").value,
        lawyer: $("#mApptLawyer").value,
        date,
        time: $("#mApptTime").value,
        type: "video",
        status: "pending",
        topic,
      });
      closeModal();
      toast("Appointment scheduled — pending approval.");
      refreshBadges();
      navigate("appointments");
    },

    "pay-filter": (el) => {
      state.paymentFilter = el.dataset.value;
      navigate("payments");
    },
    "pay-markpaid": (el) => {
      const p = DB.payments.find((x) => x.id === el.dataset.id);
      if (!p) return;
      const btn = el;
      btn.classList.add("is-loading");
      btn.disabled = true;
      setTimeout(() => {
        p.status = "paid";
        toast(`${p.id} marked as paid.`);
        navigate("payments");
      }, 900);
    },
    "pay-receipt": (el) => payReceiptModal(DB.payments.find((x) => x.id === el.dataset.id)),

    "report-range": (el) => {
      state.reportRange = el.dataset.value;
      navigate("reports");
    },
    "report-export": () => {
      const d = rangeSlice(state.reportRange);
      const csv = ["Period,NewCases,Revenue", ...d.growth.map((g, i) => `${g.m} 2026,${g.v},${d.revenue[i] ? d.revenue[i].v : 0}`)].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `stackly-report-${state.reportRange}.csv`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 400);
      toast(`Report exported — ${d.labels} summary (CSV).`);
    },

    "settings-save": () => {
      DB.admin.name = $("#setName").value.trim() || DB.admin.name;
      DB.admin.email = $("#setEmail").value.trim() || DB.admin.email;
      DB.admin.phone = $("#setPhone").value.trim() || DB.admin.phone;
      DB.admin.initials = initials(DB.admin.name);
      persistAdmin();
      applyAdminProfile();
      toast("Profile saved successfully.");
    },
    "admin-signout": () => {
      toast("Signing out of the admin console…", "info");
      setTimeout(() => (window.location.href = "login.html"), 900);
    },
    "settings-avatar": () => toast("Avatar upload is disabled in demo mode.", "info"),
    "settings-reset": () => {
      toast("Demo data restored to defaults.", "info");
    },

    "notif-readall": () => {
      DB.notifications.forEach((n) => (n.read = true));
      renderBell();
      renderBellDrop();
      toast("All notifications marked as read.");
    },
  };

  /* ============================================================
     Change dispatcher (selects, switches, search boxes)
     ============================================================ */

  const CHANGES = {
    "case-status": (el) => {
      const c = DB.cases.find((x) => x.id === el.dataset.id);
      if (!c) return;
      c.status = el.value;
      c.updated = todayIso;
      c.timeline.push({ label: `Status changed to ${CASE_STATUS[c.status].label}`, date: "Today", done: true });
      toast(`Case ${c.id} moved to ${CASE_STATUS[c.status].label}.`);
      refreshBadges();
      const p = $("#admPanel");
      if (p.classList.contains("is-open")) {
        const cc = DB.cases.find((x) => x.id === c.id);
        openPanel(cc.id, `${cc.client} · ${cc.lawyer}`, casePanelHtml(cc));
      }
      if (state.view === "cases") navigate("cases");
    },
    "case-priority": (el) => {
      const c = DB.cases.find((x) => x.id === el.dataset.id);
      if (!c) return;
      c.priority = el.value;
      toast(`Priority set to ${PRIORITY[c.priority].label}.`);
      if (state.view === "cases") navigate("cases");
    },
    "user-status": (el) => {
      state.userStatus = el.value;
      navigate("users");
    },
    "case-priority-filter": (el) => {
      state.casePriority = el.value;
      navigate("cases");
    },
    "sys-pref": (el) => {
      const p = DB.systemPrefs.find((x) => x.id === el.dataset.id);
      if (p) {
        p.on = el.checked;
        toast(`${p.label} ${el.checked ? "enabled" : "disabled"}.`);
      }
    },
  };

  /* ============================================================
     Wiring
     ============================================================ */

  /* Delegated clicks */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (el && ACTIONS[el.dataset.action]) {
      ACTIONS[el.dataset.action](el, e);
    }
  });

  /* Delegated changes */
  document.addEventListener("change", (e) => {
    const el = e.target.closest("[data-change]");
    if (el && CHANGES[el.dataset.change]) CHANGES[el.dataset.change](el, e);
  });

  /* In-view search boxes */
  document.addEventListener("input", (e) => {
    if (e.target.id === "userSearch") {
      state.userQ = e.target.value.trim().toLowerCase();
      navigate("users");
    }
    if (e.target.id === "lawyerSearch") {
      state.lawyerQ = e.target.value.trim().toLowerCase();
      navigate("lawyers");
    }
    if (e.target.id === "caseSearch") {
      state.caseQ = e.target.value.trim().toLowerCase();
      navigate("cases");
    }
  });

  /* Modal close */
  $("#admModalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  /* Panel close */
  const closePanelBoth = () => closePanel();
  $("#admPanelClose").addEventListener("click", closePanelBoth);
  panelBackdrop.addEventListener("click", closePanelBoth);

  /* Keyboard: Esc */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closePanel();
      $$(".adm-drop").forEach((d) => d.classList.remove("is-open"));
    }
  });

  /* Sidebar collapse (desktop) */
  $("#admCollapse").addEventListener("click", () => {
    $("#admApp").classList.toggle("is-collapsed");
  });

  /* Mobile drawer */
  $("#admMenuBtn").addEventListener("click", () => $("#admApp").classList.add("is-open"));
  $("#admOverlay").addEventListener("click", () => $("#admApp").classList.remove("is-open"));

  $("#admFootLogout").addEventListener("click", () => {
    toast("Signing out of the admin console…", "info");
    setTimeout(() => (window.location.href = "login.html"), 900);
  });

  /* Close dropdowns when clicking outside */
  document.addEventListener("click", (e) => {
    $$(".adm-drop").forEach((d) => {
      if (!d.parentElement.contains(e.target)) d.classList.remove("is-open");
    });
  });

  /* Quick actions dropdown */
  const quickItems = [
    { icon: "case", label: "New Case", action: "case-add" },
    { icon: "user", label: "New User", action: "user-add" },
    { icon: "appt", label: "New Appointment", action: "appt-add" },
    { icon: "report", label: "Export Report", action: "report-export" },
  ];
  $("#admQuickBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    const drop = $("#admQuickDrop");
    drop.classList.toggle("is-open");
  });
  $("#admQuickDrop").innerHTML = quickItems
    .map(
      (q) => `
      <button class="adm-drop-item" data-action="${q.action}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${q.icon === "case" ? '<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/>' : q.icon === "user" ? '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>' : q.icon === "appt" ? '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>' : '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>'}</svg>
        <span>${q.label}</span>
      </button>`
    )
    .join("");

  /* Notifications */
  $("#admBellBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    renderBellDrop();
    const drop = $("#admBellDrop");
    const willOpen = !drop.classList.contains("is-open");
    drop.classList.toggle("is-open");
    if (willOpen) {
      DB.notifications.forEach((n) => (n.read = true));
      renderBell();
    }
  });

  /* Profile dropdown */
  $("#admProfileBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    $("#admProfileDrop").classList.toggle("is-open");
  });
  renderProfileDrop();

  /* Wire data-action navigation inside profile drop to Settings */
  document.addEventListener("click", (e) => {
    const el = e.target.closest('[data-nav="settings"]');
    if (el) {
      $("#admProfileDrop").classList.remove("is-open");
      navigate("settings");
    }
  });

  /* ============================================================
     Router + init
     ============================================================ */

  function onHash() {
    const hash = window.location.hash.replace("#/", "").split("?")[0] || "dashboard";
    navigate(hash in VIEWS ? hash : "dashboard");
  }

  hydrateAdmin();
  applyAdminProfile();
  renderBell();
  refreshBadges();

  window.addEventListener("hashchange", onHash);
  window.addEventListener("load", onHash);
  if (!window.location.hash) history.replaceState(null, "", "#/dashboard");
  onHash();

  setInterval(liveTick, 8000);
})();