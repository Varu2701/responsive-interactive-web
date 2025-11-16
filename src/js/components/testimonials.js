import { el } from "./helper.js";

export function Testimonials() {
  const sec = el("section", { class: "py-12" });

  const wrapper = el("div", { class: "max-w-7xl mx-auto px-4" });

  wrapper.append(
    el("h2", { class: "text-2xl font-bold mb-6" }, ["Don't take our word for it"]),
    el("div", { class: "flex gap-4 overflow-x-auto" }, [
      el("div", { class: "card p-6 min-w-[260px]" }, [
        el("p", { class: "mb-3 italic" }, ["The best booking experience"]),
        el("p", { class: "font-semibold text-right" }, ["— Jane"])
      ]),

      el("div", { class: "card p-6 min-w-[260px]" }, [
        el("p", { class: "mb-3 italic" }, ["Amazing tours and guides"]),
        el("p", { class: "font-semibold text-right" }, ["— Rohit"])
      ]),

      el("div", { class: "card p-6 min-w-[260px]" }, [
        el("p", { class: "mb-3 italic" }, ["Truly unforgettable"]),
        el("p", { class: "font-semibold text-right" }, ["— Maria"])
      ])
    ])
  );

  sec.append(wrapper);
  return sec;
}
