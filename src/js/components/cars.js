import { el } from "./helper.js";

export async function Cars() {
  const sec = el("section", {
    id: "cars",
    class: "max-w-7xl mx-auto px-4 py-12"
  });

  sec.append(
    el("h2", { class: "text-xl font-bold mb-4" }, ["Recent Launched Car"])
  );

  const grid = el("div", { class: "grid md:grid-cols-3 gap-6" });
  sec.append(grid);

  const res = await fetch("/data/posts.json");
  const data = await res.json();

  (data.cars || []).forEach(c => {
    const card = el("div", { class: "card p-4" });

    card.append(
      el("div", {
        class: "h-40 bg-cover bg-center rounded-md mb-3",
        style: `background-image:url(${c.image})`
      }),
      el("h4", { class: "font-semibold mb-2" }, [c.title]),
      el("div", { class: "flex items-center justify-between" }, [
        el("div", { class: "text-primary font-bold" }, [`$${c.price}`]),
        el("button", { class: "px-3 py-1 border rounded" }, ["Rent"])
      ])
    );

    grid.append(card);
  });

  return sec;
}
