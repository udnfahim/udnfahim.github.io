/* --- SYSTEM_NODE: LAYOUT_ENGINE v2.0.0 --- */

const Layout = {
    metadata: {
        version: "v2.0.0",
        title: "Fahim Uddin | System_Protocol v2.0.0",
        subtitle: "Legacy Protocol v2.0.0 | Production Stable",
        status: "Production Stable"
    },

    navItems: [
        { name: "Home", path: "index.html" },
        { name: "About", path: "about.html" },
        { name: "Projects", path: "projects.html" },
        { name: "Skills", path: "skills.html" },
        { name: "Resume", path: "resume.html" },
        { name: "Testimony", path: "testimony.html" },
        { name: "Contact", path: "contact.html" }
    ],

    sanitize(value) {
        const node = document.createElement("div");
        node.textContent = value;
        return node.innerHTML;
    },

    getCurrentPage() {
        const page = window.location.pathname.split("/").pop();
        return page || "index.html";
    },

    injectHeadMeta() {
        document.title = this.metadata.title;

        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            const policy = document.createElement("meta");
            policy.httpEquiv = "Content-Security-Policy";
            policy.content = "upgrade-insecure-requests";
            document.head.appendChild(policy);
        }
    },

    injectAmbientGlow() {
        if (document.getElementById("system-glow")) {
            return;
        }

        const glow = document.createElement("div");
        glow.id = "system-glow";
        glow.className = "pointer-events-none fixed inset-0 z-0 overflow-hidden";
        glow.innerHTML = `
            <div class="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full"></div>
            <div class="absolute bottom-0 right-0 w-[640px] h-[640px] bg-indigo-600/5 blur-[150px] rounded-full opacity-70"></div>
        `;

        document.body.prepend(glow);
    },

    injectHeader() {
        const currentPage = this.getCurrentPage();
        const header = document.createElement("header");
        header.id = "global-header";
        header.className = "fixed top-0 w-full z-[100] border-b border-transparent py-5 transition-all duration-500";

        header.innerHTML = `
            <div class="relative z-[110] mx-auto flex max-w-7xl items-center justify-between px-6">
                <a href="index.html" class="group flex items-center gap-4" aria-label="Go to home">
                    <div class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-2xl shadow-blue-500/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:rotate-6">
                        <i class="fas fa-terminal text-sm"></i>
                        <span class="absolute inset-0 rounded-xl border border-white/10"></span>
                    </div>
                    <div class="flex flex-col leading-tight">
                        <span class="text-xl font-black uppercase italic tracking-tight text-white">
                            Fahim Uddin<span class="text-blue-500">.</span>
                        </span>
                        <span class="text-[9px] font-black uppercase tracking-[0.28em] text-slate-500">
                            ${this.sanitize(this.metadata.subtitle)}
                        </span>
                    </div>
                </a>

                <nav class="hidden xl:flex items-center gap-1" aria-label="Primary">
                    ${this.navItems.map((item) => `
                        <a href="${item.path}" class="nav-link ${currentPage === item.path ? "active" : ""}">
                            ${this.sanitize(item.name)}
                        </a>
                    `).join("")}
                </nav>

                <div class="flex items-center gap-4">
                    <div class="hidden lg:flex items-center gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-2 backdrop-blur-md">
                        <span class="relative flex h-2 w-2">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                            <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                        </span>
                        <span class="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">${this.sanitize(this.metadata.status)}</span>
                    </div>

                    <button id="mobile-toggle" type="button" aria-label="Open access vault" aria-expanded="false" class="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/70 text-slate-300 transition-all hover:border-blue-500/40 hover:text-white">
                        <i class="fas fa-bars-staggered text-lg"></i>
                    </button>
                </div>
            </div>

            <div id="mobile-drawer" class="pointer-events-none fixed inset-0 z-[105] flex items-center justify-center bg-slate-950/96 px-6 opacity-0 backdrop-blur-2xl transition-all duration-500 xl:hidden">
                <div class="w-full max-w-md rounded-[28px] border border-slate-800 bg-slate-950/90 p-8 shadow-2xl shadow-black/40">
                    <div class="mb-8 flex items-center justify-between border-b border-slate-800 pb-5">
                        <div>
                            <p class="text-[10px] font-black uppercase tracking-[0.35em] text-blue-400">Access Vault</p>
                            <p class="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">${this.sanitize(this.metadata.subtitle)}</p>
                        </div>
                        <button id="mobile-close" type="button" aria-label="Close access vault" class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition-all hover:border-blue-500/40 hover:text-white">
                            <i class="fas fa-xmark text-lg"></i>
                        </button>
                    </div>
                    <nav class="flex flex-col gap-3" aria-label="Mobile">
                        ${this.navItems.map((item) => `
                            <a href="${item.path}" class="vault-link rounded-2xl border px-5 py-4 text-sm font-black uppercase tracking-[0.26em] transition-all ${currentPage === item.path ? "border-blue-500/40 bg-blue-500/10 text-white" : "border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white"}">
                                ${this.sanitize(item.name)}
                            </a>
                        `).join("")}
                    </nav>
                </div>
            </div>
        `;

        document.body.prepend(header);
        this.bindEvents(header);
    },

    bindEvents(header) {
        const toggle = document.getElementById("mobile-toggle");
        const close = document.getElementById("mobile-close");
        const drawer = document.getElementById("mobile-drawer");
        const drawerLinks = drawer.querySelectorAll(".vault-link");
        let isOpen = false;

        const syncHeader = () => {
            const isScrolled = window.scrollY > 40;
            header.className = `fixed top-0 w-full z-[100] border-b py-5 transition-all duration-500 ${
                isScrolled ? "border-slate-800/60 bg-slate-950/88 py-3 backdrop-blur-xl shadow-2xl shadow-black/20" : "border-transparent bg-transparent"
            }`;
        };

        const setDrawerState = (open) => {
            isOpen = open;
            drawer.classList.toggle("opacity-100", open);
            drawer.classList.toggle("pointer-events-auto", open);
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
            toggle.innerHTML = open ? '<i class="fas fa-xmark text-lg"></i>' : '<i class="fas fa-bars-staggered text-lg"></i>';
            document.body.classList.toggle("overflow-hidden", open);
        };

        window.addEventListener("scroll", syncHeader, { passive: true });
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1280 && isOpen) {
                setDrawerState(false);
            }
        });

        toggle.addEventListener("click", () => setDrawerState(!isOpen));
        close.addEventListener("click", () => setDrawerState(false));
        drawerLinks.forEach((link) => link.addEventListener("click", () => setDrawerState(false)));
        drawer.addEventListener("click", (event) => {
            if (event.target === drawer) {
                setDrawerState(false);
            }
        });

        syncHeader();
    },

    injectFooter() {
        const year = new Date().getFullYear();
        const footer = document.createElement("footer");
        footer.className = "relative z-10 mt-40 border-t border-slate-900/80 bg-slate-950 py-24";
        footer.innerHTML = `
            <div class="mx-auto max-w-7xl px-6">
                <div class="grid items-start gap-16 md:grid-cols-3">
                    <div>
                        <div class="mb-6 flex items-center gap-2">
                            <span class="h-px w-8 bg-blue-600"></span>
                            <span class="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Legacy Protocol</span>
                        </div>
                        <p class="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Developed & Maintained By<br>
                            <span class="text-lg font-black italic text-white">Fahim Uddin<span class="text-blue-600">.</span></span>
                        </p>
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <div class="mb-8 flex gap-10">
                            <a href="https://github.com/udnfahim" target="_blank" rel="noreferrer" aria-label="Github" class="scale-125 text-slate-600 transition-all hover:text-blue-500"><i class="fab fa-github"></i></a>
                            <a href="https://linkedin.com/in/uddnfahim" target="_blank" rel="noreferrer" aria-label="LinkedIn" class="scale-125 text-slate-600 transition-all hover:text-blue-500"><i class="fab fa-linkedin"></i></a>
                        </div>
                        <div class="flex flex-col items-center gap-2">
                            <span class="rounded-full border border-slate-800 px-4 py-1.5 text-[8px] font-bold uppercase tracking-[0.3em] text-slate-500 backdrop-blur-sm">
                                ${this.sanitize(this.metadata.subtitle)}
                            </span>
                            <span class="text-[8px] font-mono uppercase tracking-[0.35em] text-emerald-400">${this.sanitize(this.metadata.status)}</span>
                        </div>
                    </div>

                    <div class="md:text-right">
                        <span class="mb-6 block text-[10px] font-black uppercase tracking-[0.4em] text-slate-700">System Metadata</span>
                        <p class="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500 leading-loose">
                            © 2024-${year} FAHIM UDDIN<br>
                            BUILD: [${this.metadata.version}]<br>
                            PROFILE: [SYSTEM_PROTOCOL]
                        </p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(footer);
    },

    initLucide() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    },

    init() {
        this.injectHeadMeta();
        this.injectAmbientGlow();
        this.injectHeader();
        this.injectFooter();
        this.initLucide();
    }
};

Layout.init();
