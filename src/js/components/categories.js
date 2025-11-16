import { el } from "./helper.js";

export function Categories() {
  const sec = el("section", {
    class: "max-w-7xl mx-auto px-4 py-8"
  });

  sec.append(
    el("h2", { class: "text-xl font-bold mb-4" }, [
      "Top Categories of Tours"
    ])
  );

  const tabs = el("div", { class: "flex gap-3 mb-6", id: "tabs" });
  ["All", "Beach", "Nature", "City"].forEach((c, i) => {
    tabs.append(
      el(
        "button",
        {
          class: `px-3 py-2 rounded ${
            i === 0 ? "bg-primary text-white" : "bg-gray-100"
          }`,
          "data-cat": c
        },
        [c]
      )
    );
  });

  const panel = el("div", {
    class: "grid md:grid-cols-4 gap-4",
    id: "catPanel"
  });

  sec.append(tabs, panel);

  async function load(cat = "All") {
    panel.innerHTML = "";

    const res = await fetch("/data/posts.json");
    const data = await res.json();

    let items = data.tours || [];

    if (cat !== "All") {
      items = items.filter(it => it.category === cat);
    }

    items.slice(0, 4).forEach(t => {
      const card = el("div", { class: "card" });

      card.append(
        el("div", {
          class: "h-28 bg-cover bg-center",
          style: `background-image:url(${t.image})`
        }),
        el("div", { class: "p-3" }, [
          el("h4", { class: "font-semibold mb-1" }, [t.title]),
          el("p", { class: "text-sm text-slate-600" }, [t.summary])
        ])
      );

      panel.append(card);
    });
  }

  tabs.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;

    [...tabs.children].forEach(b => {
      b.classList.remove("bg-primary", "text-white");
      b.classList.add("bg-gray-100");
    });

    btn.classList.add("bg-primary", "text-white");

    load(btn.dataset.cat);
  });

  load("All");

  return sec;
}
