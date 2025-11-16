import { el } from "./helper.js";

export function Footer() {
  const f = el("footer", { class: "bg-figmaFooter text-white mt-12" });

  f.append(
    el("div", { class: "max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6" }, [
      el("div", {}, [
        el("h3", { class: "text-xl font-bold mb-2" }, ["Travila"]),
        el("p", { class: "text-slate-400" }, ["Subscribe for deals and updates."])
      ]),

      el("div", {}, [
        el("h4", { class: "font-semibold mb-2" }, ["Company"]),
        el("a", { href: "#", class: "block text-slate-400 mb-1" }, ["About"]),
        el("a", { href: "#", class: "block text-slate-400 mb-1" }, ["Careers"])
      ]),

      el("div", {}, [
        el("h4", { class: "font-semibold mb-2" }, ["Support"]),
        el("a", { href: "#", class: "block text-slate-400 mb-1" }, ["Help Center"]),
        el("a", { href: "#", class: "block text-slate-400 mb-1" }, ["Contact"])
      ])
    ]),

    el("div", { class: "text-center text-slate-500 py-4" }, [
      "© 2025 Travila. All rights reserved."
    ])
  );

  return f;
}
