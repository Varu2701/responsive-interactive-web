import { el } from "./helper.js";

export function Header() {
  const header = el("header", {
    class: "sticky top-0 z-40 bg-white shadow-sm"
  });

  header.append(
    el("div", {
      class: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"
    }, [
      el("a", { href: "#", class: "text-2xl font-bold text-primary" }, ["Travila"]),

      el("nav", { class: "hidden md:flex gap-6 text-slate-700" }, [
        el("a", { href: "#", class: "hover:text-primary" }, ["Home"]),
        el("a", { href: "#tours", class: "hover:text-primary" }, ["Tours"]),
        el("a", { href: "#hotels", class: "hover:text-primary" }, ["Hotels"]),
        el("a", { href: "#cars", class: "hover:text-primary" }, ["Cars"]),
        el("a", { href: "#blog", class: "hover:text-primary" }, ["Blog"])
      ])
    ])
  );

  return header;
}
