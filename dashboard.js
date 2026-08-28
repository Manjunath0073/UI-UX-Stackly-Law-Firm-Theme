/* ============================================================
   Stackly Law Firm — Client Dashboard SPA
   Vanilla JS SPA with dummy data, hash router, and interactions
   ============================================================ */

(() => {
  "use strict";

  /* ---------------- Dummy data ---------------- */

  const DUMMY = {
    user: {
      name: "John Mitchell",
      email: "john.mitchell@stackly.com",
      phone: "+91 98765 43210",
      initials: "JM",
    },

    stats: {
      activeCases: 3,
      appointments: 4,
      pendingPayments: 2,
      messages: 3,
    },

    caseActivity: [
      { m: "Mar", v: 3 },
      { m: "Apr", v: 5 },
      { m: "May", v: 4 },
      { m: "Jun", v: 7 },
      { m: "Jul", v: 6 },
      { m: "Aug", v: 9 },
    ],

    cases: [
      {
        id: "C-1042",
        title: "Commercial Lease Dispute",
        status: "active",
        lawyer: "Sarah Mitchell",
        updated: "2026-08-24",
        desc: "Ongoing negotiation regarding a contested commercial lease renewal and rent arrears.",
        party: "Meridian Properties Ltd",
        next: "Settlement conference — Sep 4",
        type: "Litigation",
      },
      {
        id: "C-1038",
        title: "Business Acquisition Review",
        status: "pending",
        lawyer: "David Lawson",
        updated: "2026-08-21",
        desc: "Due diligence and contract review for the acquisition of a local manufacturing unit.",
        party: "Alpine Traders Pvt Ltd",
        next: "Awaiting seller disclosures",
        type: "Corporate",
      },
      {
        id: "C-1031",
        title: "Employment Contract Negotiation",
        status: "active",
        lawyer: "Jennifer Smith",
        updated: "2026-08-19",
        desc: "Drafting and negotiating an executive employment agreement with equity components.",
        party: "Brightline Tech",
        next: "Final clause review — Aug 30",
        type: "Employment",
      },
      {
        id: "C-1027",
        title: "Trademark Infringement Claim",
        status: "closed",
        lawyer: "Sarah Mitchell",
        updated: "2026-07-30",
        desc: "Trademark dispute resolved through settlement and withdrawal of opposition.",
        party: "Nova Retail",
        next: "Closed — settlement recorded",
        type: "IP",
      },
      {
        id: "C-1022",
        title: "Partnership Dissolution",
        status: "pending",
        lawyer: "David Lawson",
        updated: "2026-07-28",
        desc: "Structured dissolution and asset division between founding partners.",
        party: "Reed & Co.",
        next: "Drafting dissolution deed",
        type: "Corporate",
      },
      {
        id: "C-1019",
        title: "Intellectual Property Licensing",
        status: "active",
        lawyer: "Jennifer Smith",
        updated: "2026-07-24",
        desc: "Negotiating a licensing agreement for a patented manufacturing process.",
        party: "Helix Industries",
        next: "License terms review",
        type: "IP",
      },
      {
        id: "C-1014",
        title: "Debt Recovery Proceedings",
        status: "closed",
        lawyer: "Nada Geomorgant",
        updated: "2026-07-12",
        desc: "Recovered outstanding dues through arbitration and enforcement.",
        party: "Sterling Finance",
        next: "Closed — amount recovered",
        type: "General",
      },
    ],

    appointments: [
      { id: 1, date: "2026-08-28", time: "10:30 AM", title: "Case Strategy Review", lawyer: "Sarah Mitchell", type: "video", location: "Video call" },
      { id: 2, date: "2026-08-28", time: "02:00 PM", title: "Document Signing", lawyer: "David Lawson", type: "office", location: "Stackly, Salem" },
      { id: 3, date: "2026-09-02", time: "11:00 AM", title: "Deposition Preparation", lawyer: "Jennifer Smith", type: "video", location: "Video call" },
      { id: 4, date: "2026-09-05", time: "09:30 AM", title: "Quarterly Case Review", lawyer: "Nada Geomorgant", type: "office", location: "Stackly, Salem" },
    ],

    documents: [
      { name: "Case-Brief-Commercial-Lease.pdf", type: "PDF", date: "2026-08-20", size: "1.2 MB" },
      { name: "Employment-Agreement-Draft.docx", type: "DOCX", date: "2026-08-15", size: "860 KB" },
      { name: "Invoice-Q3-2026.pdf", type: "PDF", date: "2026-08-10", size: "340 KB" },
      { name: "Evidence-Exhibit-B.docx", type: "DOCX", date: "2026-08-02", size: "2.1 MB" },
      { name: "Signed-MOU-Stackly.pdf", type: "PDF", date: "2026-07-25", size: "540 KB" },
    ],

    conversations: [
      {
        id: "c1",
        name: "Sarah Mitchell",
        role: "Senior Partner",
        color: "#1e2e45",
        time: "2m",
        messages: [
          { from: "them", text: "Good morning John, I've reviewed the latest lease draft.", time: "9:02 AM" },
          { from: "them", text: "The settlement conference is confirmed for Sep 4 at 10:30 AM.", time: "9:03 AM" },
        ],
      },
      {
        id: "c2",
        name: "David Lawson",
        role: "Corporate Counsel",
        color: "#7a5c2e",
        time: "1h",
        messages: [
          { from: "them", text: "Can you send the seller's financial statements?", time: "8:14 AM" },
          { from: "me", text: "Sending them now — the acquisition file is being compiled.", time: "8:31 AM" },
        ],
      },
      {
        id: "c3",
        name: "Jennifer Smith",
        role: "Senior Business Lawyer",
        color: "#3f6b8a",
        time: "Yesterday",
        messages: [
          { from: "them", text: "The executive agreement clauses are ready for your review.", time: "Yesterday" },
        ],
      },
    ],

    billing: [
      { id: "INV-2026-041", desc: "Legal consultation & case review", date: "2026-08-05", amount: 440, status: "paid" },
      { id: "INV-2026-044", desc: "Contract drafting — employment", date: "2026-08-12", amount: 320, status: "pending" },
      { id: "INV-2026-047", desc: "Litigation retainer — Q3", date: "2026-08-18", amount: 1200, status: "pending" },
      { id: "INV-2026-039", desc: "Intellectual property filing", date: "2026-07-22", amount: 680, status: "paid" },
    ],

    activity: [
      { icon: "doc", title: "New document added to C-1038", meta: "Business Acquisition Review", time: "12m ago" },
      { icon: "appt", title: "Appointment confirmed with Sarah Mitchell", meta: "Aug 28 · 10:30 AM", time: "2h ago" },
      { icon: "pay", title: "Invoice INV-2026-047 issued", meta: "$1,200.00 pending", time: "1d ago" },
      { icon: "msg", title: "New message from David Lawson", meta: "Evidence request", time: "2d ago" },
      { icon: "case", title: "C-1031 status updated", meta: "Active — awaiting hearing", time: "3d ago" },
    ],

    preferences: [
      { id: "pref-case", label: "Case status updates", desc: "Email me when a case status changes", on: true },
      { id: "pref-appt", label: "Appointment reminders", desc: "Notify me before scheduled meetings", on: true },
      { id: "pref-pay", label: "Payment receipts", desc: "Send a copy of every payment", on: false },
    ],

    autoReplies: [
      "Thanks for the message — I'll have our team review this and get back to you shortly.",
      "Noted. I'll update the case file and confirm the next steps.",
      "Understood. Let me check with the assigned counsel and revert.",
      "Appreciated. We'll keep you posted on any developments.",
    ],
  };

  /* ---------------- State ---------------- */

  const state = {
    view: "dashboard",
    caseFilter: "all",
    convoId: "c1",
    unread: 3,
    stats: { ...DUMMY.stats },
  };

  /* ---------------- Helpers ---------------- */

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const formatMoney = (n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  const formatDate = (iso) => {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const statusMeta = (s) =>
    ({
      active: { label: "Active", cls: "active" },
      pending: { label: "Pending", cls: "pending" },
      closed: { label: "Closed", cls: "closed" },
    }[s] || { label: s, cls: "closed" });

  const moneyStatus = (s) =>
    s === "paid" ? '<span class="dash-status dash-status--active">Paid</span>' : '<span class="dash-status dash-status--pending">Pending</span>';

  /* ---------------- Session profile ---------------- */

  function loadStoredUser() {
    try {
      const raw = localStorage.getItem("stackly_user");
      if (!raw) return;
      const u = JSON.parse(raw);
      if (!u || !u.email) return;
      const name = u.name || u.email.split("@")[0] || "User";
      DUMMY.user = {
        name,
        email: u.email,
        phone: u.phone || "",
        role: u.role === "admin" ? "Admin" : "Client",
        initials: name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase(),
      };
    } catch (e) {
      /* keep defaults */
    }
  }

  function storeStoredUser() {
    try {
      const existing = JSON.parse(localStorage.getItem("stackly_user") || "{}");
      localStorage.setItem(
        "stackly_user",
        JSON.stringify({ ...existing, name: DUMMY.user.name, email: DUMMY.user.email, phone: DUMMY.user.phone })
      );
    } catch (e) {
      /* storage unavailable */
    }
  }

  function applyUserProfile() {
    const u = DUMMY.user;
    const setTxt = (id, text) => {
      const el = $(id);
      if (el) el.textContent = text;
    };
    setTxt("#dashSidebarAvatar", u.initials);
    setTxt("#dashSidebarName", u.name);
    setTxt("#dashSidebarRole", u.role || "Client");
    setTxt("#dashTopAvatar", u.initials);
    setTxt("#dashTopName", u.name);
    setTxt("#dashDropAvatar", u.initials);
    setTxt("#dashDropName", u.name);
    setTxt("#dashDropEmail", u.email);
  }

  /* ---------------- Toast ---------------- */

  const toastWrap = $("#toastWrap");

  function showToast(message, type = "success") {
    const t = document.createElement("div");
    t.className = "dash-toast" + (type === "error" ? " dash-toast--error" : "");
    t.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
      <span>${escapeHtml(message)}</span>`;
    toastWrap.appendChild(t);
    setTimeout(() => {
      t.classList.add("is-leaving");
      setTimeout(() => t.remove(), 400);
    }, 3200);
  }

  /* ---------------- Modal ---------------- */

  const modal = $("#dashModal");
  const modalContent = $("#modalContent");
  const modalClose = $("#modalClose");

  function openModal(title, sub, bodyHtml) {
    modalContent.innerHTML = `
      <h3 class="dash-modal-title">${escapeHtml(title)}</h3>
      <p class="dash-modal-sub">${escapeHtml(sub)}</p>
      ${bodyHtml}`;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeCasePanel();
    }
  });

  /* ---------------- Case detail panel ---------------- */

  const casePanel = $("#casePanel");
  const casePanelTitle = $("#casePanelTitle");
  const casePanelBody = $("#casePanelBody");

  function openCasePanel(id) {
    const c = DUMMY.cases.find((x) => x.id === id);
    if (!c) return;
    const st = statusMeta(c.status);
    casePanelTitle.textContent = c.title;
    casePanelBody.innerHTML = `
      <div class="dash-detail-row"><span>Case ID</span><strong>${escapeHtml(c.id)}</strong></div>
      <div class="dash-detail-row"><span>Status</span><strong><span class="dash-status dash-status--${st.cls}">${st.label}</span></strong></div>
      <div class="dash-detail-row"><span>Type</span><strong>${escapeHtml(c.type)}</strong></div>
      <div class="dash-detail-row"><span>Lawyer</span><strong>${escapeHtml(c.lawyer)}</strong></div>
      <div class="dash-detail-row"><span>Opposing / Party</span><strong>${escapeHtml(c.party)}</strong></div>
      <div class="dash-detail-row"><span>Last Updated</span><strong>${formatDate(c.updated)}</strong></div>
      <div style="margin-top:18px">
        <p class="dash-card-sub" style="font-size:.82rem;line-height:1.7;color:var(--muted)">${escapeHtml(c.desc)}</p>
      </div>
      <div class="dash-card dash-card--accent" style="margin-top:18px;padding:16px">
        <p class="dash-card-sub" style="text-transform:uppercase;letter-spacing:.05em;font-size:.72rem;font-weight:600;color:var(--gold)">Next Step</p>
        <p style="font-size:.9rem;color:var(--navy-dark);margin-top:6px;font-weight:600">${escapeHtml(c.next)}</p>
      </div>`;
    casePanel.classList.add("is-open");
    casePanel.setAttribute("aria-hidden", "false");
  }

  function closeCasePanel() {
    casePanel.classList.remove("is-open");
    casePanel.setAttribute("aria-hidden", "true");
  }

  $("#casePanelClose").addEventListener("click", closeCasePanel);

  /* ---------------- Sidebar / drawer ---------------- */

  const dashApp = $("#dashApp");
  const sidebarToggle = $("#sidebarToggle");
  const mobileMenuBtn = $("#mobileMenuBtn");
  const overlay = $("#dashOverlay");

  sidebarToggle.addEventListener("click", () => {
    dashApp.classList.toggle("is-collapsed");
  });

  mobileMenuBtn.addEventListener("click", () => {
    dashApp.classList.toggle("is-open");
  });

  overlay.addEventListener("click", () => {
    dashApp.classList.remove("is-open");
  });

  /* ---------------- Profile dropdown ---------------- */

  const profileMenu = $("#profileMenu");
  $("#profileBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    profileMenu.classList.toggle("is-open");
  });
  document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) profileMenu.classList.remove("is-open");
  });

  /* ---------------- Notification bell ---------------- */

  $("#notifBtn").addEventListener("click", () => {
    const bell = $("#notifBtn");
    const badge = bell.querySelector(".dash-badge");
    if (state.unread > 0) {
      state.unread = 0;
      badge.style.display = "none";
      showToast("All notifications marked as read.");
    } else {
      showToast("You're all caught up — no new notifications.");
    }
  });

  /* ---------------- Router ---------------- */

  const views = {
    dashboard: { title: "Dashboard", render: renderDashboard },
    cases: { title: "My Cases", render: renderCases },
    appointments: { title: "Appointments", render: renderAppointments },
    documents: { title: "Documents", render: renderDocuments },
    messages: { title: "Messages", render: renderMessages },
    billing: { title: "Billing", render: renderBilling },
    settings: { title: "Settings", render: renderSettings },
  };

  function navigate(view, opts) {
    const cfg = views[view] || views.dashboard;
    state.view = view;

    $$(".dash-view").forEach((v) => v.classList.remove("is-active"));
    const target = $("#view-" + view);
    if (target) target.classList.add("is-active");

    $("#pageTitle").textContent = cfg.title;

    $$(".dash-nav-item[data-view]").forEach((n) => {
      n.classList.toggle("is-active", n.dataset.view === view);
    });

    dashApp.classList.remove("is-open");

    if (opts && opts.filter) state.caseFilter = opts.filter;
    cfg.render(opts);
  }

  function onHashChange() {
    const hash = window.location.hash.replace("#/", "").split("?")[0] || "dashboard";
    navigate(hash in views ? hash : "dashboard");
  }

  /* ---------------- Charts ---------------- */

  function renderAreaChart() {
    const data = DUMMY.caseActivity;
    const w = 600;
    const h = 180;
    const pad = 26;
    const max = Math.max(...data.map((d) => d.v)) + 2;
    const step = (w - pad * 2) / (data.length - 1);

    const pts = data.map((d, i) => [pad + i * step, h - pad - ((d.v / max) * (h - pad * 2))]);
    const line = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
    const area = `${line} L${pts[pts.length - 1][0]},${h - pad} L${pts[0][0]},${h - pad} Z`;
    const labels = data.map((d) => d.m);

    $("#areaChart").innerHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c8a96a" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#c8a96a" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <line x1="${pad}" y1="${pad}" x2="${w - pad}" y2="${pad}" stroke="rgba(30,46,69,0.06)"/>
        <line x1="${pad}" y1="${(h - pad) / 2}" x2="${w - pad}" y2="${(h - pad) / 2}" stroke="rgba(30,46,69,0.06)"/>
        <path d="${area}" fill="url(#areaFill)"/>
        <path d="${line}" fill="none" stroke="#c8a96a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        ${pts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="3.5" fill="#fff" stroke="#c8a96a" stroke-width="2"/>`).join("")}
      </svg>
      <div style="display:flex;justify-content:space-between;padding:6px ${pad}px 0;font-size:.72rem;color:var(--muted)">
        ${labels.map((l) => `<span>${l}</span>`).join("")}
      </div>`;
  }

  function renderDonut() {
    const statuses = [
      { key: "active", label: "Active", color: "#3f8a6b", count: DUMMY.cases.filter((c) => c.status === "active").length },
      { key: "pending", label: "Pending", color: "#c8a96a", count: DUMMY.cases.filter((c) => c.status === "pending").length },
      { key: "closed", label: "Closed", color: "#c6c2bb", count: DUMMY.cases.filter((c) => c.status === "closed").length },
    ];
    const total = statuses.reduce((s, x) => s + x.count, 0);
    $("#donutTotal").textContent = total;

    const chart = $("#donutChart");
    chart.querySelectorAll("svg").forEach((s) => s.remove());

    const r = 52;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    const segs = statuses
      .map((s) => {
        const len = (s.count / total) * circ;
        const seg = `<circle r="${r}" cx="60" cy="60" fill="none" stroke="${s.color}" stroke-width="16"
          stroke-dasharray="${len} ${circ - len}" stroke-dashoffset="${-offset}"
          stroke-linecap="butt" transform="rotate(-90 60 60)"/>`;
        offset += len;
        return seg;
      })
      .join("");

    chart.insertAdjacentHTML("afterbegin", `
      <svg viewBox="0 0 120 120" style="width:100%;height:100%">
        <circle r="${r}" cx="60" cy="60" fill="none" stroke="rgba(30,46,69,0.07)" stroke-width="16"/>
        ${segs}
      </svg>`);

    $("#donutLegend").innerHTML = statuses
      .map((s) => `
        <li>
          <span><span class="dash-legend-dot" style="background:${s.color}"></span>${s.label}</span>
          <strong style="color:var(--navy-dark)">${s.count}</strong>
        </li>`)
      .join("");
  }

  /* ---------------- Icons for activity ---------------- */

  const activityIcon = (k) => ({
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    appt: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    pay: '<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>',
    msg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    case: '<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/>',
  }[k] || "");

  /* ---------------- Dashboard ---------------- */

  function renderDashboard() {
    const stats = [
      { key: "activeCases", label: "Active Cases", icon: "case", color: "#3f8a6b", tint: "rgba(63,138,107,0.12)", delta: "+2 this month", up: true },
      { key: "appointments", label: "Upcoming Appointments", icon: "appt", color: "#3f6b8a", tint: "rgba(63,107,138,0.12)", delta: "Next in 2 days", up: true },
      { key: "pendingPayments", label: "Pending Payments", icon: "pay", color: "#c8a96a", tint: "rgba(200,169,106,0.14)", delta: "$1,520.00 due", up: false },
      { key: "messages", label: "Unread Messages", icon: "msg", color: "#96721c", tint: "rgba(150,114,28,0.12)", delta: "From your counsel", up: true },
    ];

    const icons = {
      case: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/><line x1="12" y1="13" x2="12" y2="17"/></svg>',
      appt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      pay: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
      msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    };

    const statsEl = $("#dashStats");
    statsEl.innerHTML = stats
      .map(
        (s) => `
        <div class="dash-stat" style="--stat-color:${s.color};--stat-tint:${s.tint}">
          <span class="dash-stat-icon">${icons[s.icon]}</span>
          <div class="dash-stat-value">${state.stats[s.key]}</div>
          <div class="dash-stat-label">${s.label}</div>
          <span class="dash-stat-delta ${s.up ? "dash-stat-delta--up" : "dash-stat-delta--down"}">${s.up ? "▲" : "●"} ${s.delta}</span>
        </div>`
      )
      .join("");

    // Activity
    $("#activityList").innerHTML = DUMMY.activity
      .map(
        (a) => `
        <li>
          <span class="dash-activity-dot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${activityIcon(a.icon)}</svg>
          </span>
          <div class="dash-activity-body">
            <div class="dash-activity-title">${escapeHtml(a.title)}</div>
            <div class="dash-activity-meta">${escapeHtml(a.meta)}</div>
          </div>
          <span class="dash-activity-time">${escapeHtml(a.time)}</span>
        </li>`
      )
      .join("");

    // Charts
    const areaChart = $("#areaChart");
    areaChart.innerHTML = "";
    setTimeout(() => {
      renderAreaChart();
      renderDonut();
    }, 450);
  }

  /* ---------------- Cases ---------------- */

  function renderCases(opts) {
    const filter = (opts && opts.filter) || state.caseFilter;
    state.caseFilter = filter;

    $$("#caseFilters .dash-filter").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.filter === filter);
    });

    const list = DUMMY.cases.filter((c) => filter === "all" || c.status === filter);
    $("#caseCount").textContent = `${list.length} of ${DUMMY.cases.length} cases`;

    const body = $("#casesBody");
    if (!list.length) {
      body.innerHTML = `<tr><td colspan="6"><div class="dash-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><path d="M3 9l2.5-4h13L21 9"/></svg><p>No ${filter} cases</p></div></td></tr>`;
      return;
    }

    body.innerHTML = list
      .map((c) => {
        const st = statusMeta(c.status);
        return `
        <tr class="dash-row-click" data-id="${c.id}">
          <td><span class="dash-table-title">${c.id}</span></td>
          <td>${escapeHtml(c.title)}</td>
          <td><span class="dash-status dash-status--${st.cls}">${st.label}</span></td>
          <td>${escapeHtml(c.lawyer)}</td>
          <td>${formatDate(c.updated)}</td>
          <td>
            <div class="dash-row-actions">
              <button class="dash-row-action" data-action="open" aria-label="View ${c.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </td>
        </tr>`;
      })
      .join("");

    $$("#casesBody tr[data-id]").forEach((tr) => {
      tr.addEventListener("click", (e) => {
        if (e.target.closest(".dash-row-action")) {
          openCasePanel(tr.dataset.id);
        } else {
          openCasePanel(tr.dataset.id);
        }
      });
    });
  }

  $("#caseFilters").addEventListener("click", (e) => {
    const btn = e.target.closest(".dash-filter");
    if (btn) navigate("cases", { filter: btn.dataset.filter });
  });

  /* ---------------- Appointments ---------------- */

  function renderAppointments() {
    const groups = {};
    DUMMY.appointments.forEach((a) => {
      (groups[a.date] = groups[a.date] || []).push(a);
    });

    const sortedDates = Object.keys(groups).sort();
    const el = $("#appointmentsList");

    if (!sortedDates.length) {
      el.innerHTML = `<div class="dash-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><p>No appointments booked yet</p></div>`;
      return;
    }

    el.innerHTML = sortedDates
      .map((date) => {
        const items = groups[date]
          .map((a) => `
            <div class="dash-appt-item">
              <span class="dash-appt-time">${escapeHtml(a.time)}</span>
              <div class="dash-appt-info">
                <div class="dash-appt-title">${escapeHtml(a.title)}</div>
                <div class="dash-appt-meta">${escapeHtml(a.lawyer)} · ${escapeHtml(a.location)}</div>
              </div>
              <span class="dash-appt-type ${a.type === "video" ? "dash-appt-type--video" : ""}">${a.type === "video" ? "Video" : "Office"}</span>
            </div>`)
          .join("");
        return `<div class="dash-appt-group">
          <div class="dash-appt-group-date">${formatDate(date)}</div>
          ${items}
        </div>`;
      })
      .join("");
  }

  $("#bookApptBtn").addEventListener("click", () => {
    openModal(
      "Book an Appointment",
      "Choose a time and we'll confirm with your counsel.",
      `
      <div class="dash-form">
        <div class="dash-field">
          <label class="dash-label" for="bkDate">Date</label>
          <input class="dash-input" type="date" id="bkDate" min="2026-08-28" value="2026-08-28" />
        </div>
        <div class="dash-field">
          <label class="dash-label" for="bkTime">Time</label>
          <select class="dash-select" id="bkTime">
            <option>09:30 AM</option><option selected>11:00 AM</option><option>02:00 PM</option><option>04:30 PM</option>
          </select>
        </div>
        <div class="dash-field">
          <label class="dash-label" for="bkLawyer">Lawyer</label>
          <select class="dash-select" id="bkLawyer">
            <option>Sarah Mitchell</option><option>David Lawson</option><option>Jennifer Smith</option><option>Nada Geomorgant</option>
          </select>
        </div>
        <div class="dash-field">
          <label class="dash-label" for="bkTopic">Topic</label>
          <input class="dash-input" type="text" id="bkTopic" placeholder="e.g. Case review" />
        </div>
        <button class="dash-btn dash-btn--gold" id="bkConfirm">Confirm Booking</button>
      </div>`
    );

    $("#bkConfirm").addEventListener("click", () => {
      const date = $("#bkDate").value || "2026-08-30";
      const time = $("#bkTime").value;
      const lawyer = $("#bkLawyer").value;
      const topic = $("#bkTopic").value.trim() || "Consultation";
      DUMMY.appointments.push({
        id: Date.now(),
        date,
        time,
        title: topic,
        lawyer,
        type: "office",
        location: "Stackly, Salem",
      });
      closeModal();
      showToast("Appointment booked — confirmation sent to your email.");
      renderAppointments();
    });
  });

  /* ---------------- Documents ---------------- */

  function renderDocuments() {
    const body = $("#documentsBody");
    if (!DUMMY.documents.length) {
      body.innerHTML = `<tr><td colspan="5"><div class="dash-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><p>No documents uploaded yet</p></div></td></tr>`;
      return;
    }
    body.innerHTML = DUMMY.documents
      .map(
        (d, i) => `
        <tr>
          <td><span class="dash-table-title">${escapeHtml(d.name)}</span></td>
          <td><span class="dash-chip dash-chip--neutral">${escapeHtml(d.type)}</span></td>
          <td>${formatDate(d.date)}</td>
          <td>${escapeHtml(d.size)}</td>
          <td>
            <div class="dash-row-actions">
              <button class="dash-row-action" data-doc="${i}" data-action="download" aria-label="Download ${escapeHtml(d.name)}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </button>
            </div>
          </td>
        </tr>`
      )
      .join("");

    $$('#documentsBody [data-action="download"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        showToast(`Downloading ${DUMMY.documents[+btn.dataset.doc].name}…`);
      });
    });
  }

  $("#uploadBtn").addEventListener("click", () => $("#fileInput").click());

  $("#fileInput").addEventListener("change", (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const size = file.size >= 1024 * 1024 ? (file.size / (1024 * 1024)).toFixed(1) + " MB" : Math.max(1, Math.round(file.size / 1024)) + " KB";
    const type = (file.name.split(".").pop() || "FILE").toUpperCase();
    DUMMY.documents.unshift({
      name: file.name,
      type: type.length > 4 ? "FILE" : type,
      date: new Date().toISOString().slice(0, 10),
      size,
    });
    e.target.value = "";
    showToast(`${file.name} uploaded successfully.`);
    renderDocuments();
  });

  /* ---------------- Messages ---------------- */

  function renderMessages() {
    $("#convoCount").textContent = DUMMY.conversations.length;
    const list = $("#conversationList");
    list.innerHTML = DUMMY.conversations
      .map((c) => {
        const last = c.messages[c.messages.length - 1];
        return `
        <div class="dash-convo ${c.id === state.convoId ? "is-active" : ""}" data-convo="${c.id}">
          <span class="dash-convo-avatar" style="background:${c.color}">${c.name.split(" ").map((w) => w[0]).join("")}</span>
          <div class="dash-convo-body">
            <div class="dash-convo-name">
              <strong>${escapeHtml(c.name)}</strong>
              <time>${escapeHtml(c.time)}</time>
            </div>
            <div class="dash-convo-preview">${escapeHtml(last.text)}</div>
          </div>
        </div>`;
      })
      .join("");

    $$(".dash-convo[data-convo]").forEach((el) => {
      el.addEventListener("click", () => {
        state.convoId = el.dataset.convo;
        renderMessages();
        renderChat();
      });
    });

    renderChat();
  }

  function renderChat() {
    const c = DUMMY.conversations.find((x) => x.id === state.convoId) || DUMMY.conversations[0];
    const head = $("#chatHead");
    head.innerHTML = `
      <span class="dash-convo-avatar" style="background:${c.color}">${c.name.split(" ").map((w) => w[0]).join("")}</span>
      <div>
        <strong>${escapeHtml(c.name)}</strong>
        <span>${escapeHtml(c.role)}</span>
      </div>`;

    const body = $("#chatMessages");
    body.innerHTML = c.messages
      .map(
        (m) => `
        <div class="dash-msg dash-msg--${m.from === "me" ? "out" : "in"}">
          ${escapeHtml(m.text)}
          <span class="dash-msg-time">${escapeHtml(m.time)}</span>
        </div>`
      )
      .join("");
    body.scrollTop = body.scrollHeight;
  }

  function sendMessage() {
    const input = $("#chatInput");
    const text = input.value.trim();
    if (!text) return;
    const c = DUMMY.conversations.find((x) => x.id === state.convoId);
    if (!c) return;

    c.messages.push({ from: "me", text, time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) });
    input.value = "";
    renderChat();

    // Simulate typing + auto response
    const body = $("#chatMessages");
    const typing = document.createElement("div");
    typing.className = "dash-msg dash-msg--in dash-msg--typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const reply = DUMMY.autoReplies[Math.floor(Math.random() * DUMMY.autoReplies.length)];
      c.messages.push({ from: "them", text: reply, time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) });
      c.time = "now";
      renderChat();
      renderMessages();
    }, 1500 + Math.random() * 900);
  }

  $("#chatSendBtn").addEventListener("click", sendMessage);
  $("#chatInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  /* ---------------- Billing ---------------- */

  function renderBilling() {
    const pending = DUMMY.billing.filter((b) => b.status === "pending");
    const paid = DUMMY.billing.filter((b) => b.status === "paid");
    const due = pending.reduce((s, b) => s + b.amount, 0);
    const paidQ = paid.reduce((s, b) => s + b.amount, 0);

    $("#balanceDue").textContent = formatMoney(due);
    $("#paidQuarter").textContent = formatMoney(paidQ);
    $("#dueChip").textContent = pending.length ? `${pending.length} invoice${pending.length > 1 ? "s" : ""} pending` : "All settled";

    const body = $("#billingBody");
    body.innerHTML = DUMMY.billing
      .map((b, i) => `
        <tr>
          <td><span class="dash-table-title">${escapeHtml(b.id)}</span></td>
          <td>${escapeHtml(b.desc)}</td>
          <td>${formatDate(b.date)}</td>
          <td>${formatMoney(b.amount)}</td>
          <td>${moneyStatus(b.status)}</td>
          <td>
            <div class="dash-row-actions">
              ${b.status === "pending" ? `<button class="dash-btn dash-btn--gold dash-btn--sm" data-pay="${i}">Pay Now</button>` : ""}
            </div>
          </td>
        </tr>`)
      .join("");

    $$("#billingBody [data-pay]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.pay;
        btn.disabled = true;
        btn.textContent = "Processing…";
        setTimeout(() => {
          DUMMY.billing[i].status = "paid";
          showToast(`${DUMMY.billing[i].id} paid successfully.`);
          renderBilling();
        }, 900);
      });
    });
  }

  /* ---------------- Settings ---------------- */

  function renderSettings() {
    $("#setName").value = DUMMY.user.name;
    $("#setEmail").value = DUMMY.user.email;
    $("#setPhone").value = DUMMY.user.phone;

    $("#prefList").innerHTML = DUMMY.preferences
      .map(
        (p) => `
        <li>
          <div>
            <strong style="color:var(--navy-dark)">${escapeHtml(p.label)}</strong>
            <div class="dash-card-sub" style="margin-top:2px">${escapeHtml(p.desc)}</div>
          </div>
          <label class="dash-switch">
            <input type="checkbox" data-pref="${p.id}" ${p.on ? "checked" : ""} />
            <span class="dash-switch-track"></span>
          </label>
        </li>`
      )
      .join("");

    $$("#prefList input[type=checkbox]").forEach((box) => {
      box.addEventListener("change", () => {
        const p = DUMMY.preferences.find((x) => x.id === box.dataset.pref);
        if (p) {
          p.on = box.checked;
          showToast(`${p.label} ${box.checked ? "enabled" : "disabled"}.`);
        }
      });
    });
  }

  const settingsForm = $("#settingsForm");
  const settingFields = [
    {
      input: () => $("#setName"),
      error: () => $("#setNameError"),
      validate: (v) => (!v ? "Full name is required." : !/^[A-Za-z .'-]{2,}$/.test(v) ? "Enter a valid name." : ""),
    },
    {
      input: () => $("#setEmail"),
      error: () => $("#setEmailError"),
      validate: (v) => (!v ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email." : ""),
    },
    {
      input: () => $("#setPhone"),
      error: () => $("#setPhoneError"),
      validate: (v) => (!v ? "Phone is required." : !/^[0-9+\s-]{8,15}$/.test(v) ? "Enter a valid phone number." : ""),
    },
  ];

  function validateSettings() {
    let ok = true;
    settingFields.forEach((f) => {
      const inp = f.input();
      const err = f.error();
      const msg = f.validate(inp.value.trim());
      if (msg) {
        err.textContent = msg;
        err.classList.add("is-visible");
        inp.classList.add("is-invalid");
        ok = false;
      } else {
        err.classList.remove("is-visible");
        inp.classList.remove("is-invalid");
      }
    });
    return ok;
  }

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateSettings()) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }
    DUMMY.user.name = $("#setName").value.trim();
    DUMMY.user.email = $("#setEmail").value.trim();
    DUMMY.user.phone = $("#setPhone").value.trim();
    DUMMY.user.initials = DUMMY.user.name.split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
    storeStoredUser();
    applyUserProfile();
    showToast("Profile updated successfully.");
  });

  settingFields.forEach((f) => {
    const inp = f.input();
    inp.addEventListener("blur", () => f.validate(inp.value.trim()) && validateSettings());
    inp.addEventListener("input", () => {
      if (inp.classList.contains("is-invalid")) validateSettings();
    });
  });

  /* ---------------- Init ---------------- */

  window.addEventListener("hashchange", onHashChange);
  window.addEventListener("load", () => {
    onHashChange();
  });

  // Redirect the site's existing script.js nav-link active tracking off the SPA
  if (!window.location.hash) history.replaceState(null, "", "#/dashboard");
  loadStoredUser();
  applyUserProfile();
  onHashChange();
})();