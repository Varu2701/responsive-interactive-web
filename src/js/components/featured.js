import { el } from "./helper.js";

export async function Featured() {
  const sec = el("section", {
    id: "tours",
    class: "max-w-7xl mx-auto px-4 py-12"
  });

  sec.append(
    el("h2", { class: "text-2xl font-bold mb-4" }, ["Our Featured Tours"])
  );

  const controls = el("div", { class: "flex gap-3 mb-4" });
  ["All", "Beach", "City", "Nature"].forEach(c => {
    controls.append(
      el("button", {
        class: "px-3 py-1 rounded-full bg-gray-100 text-sm"
      }, [c])
    );
  });

  const grid = el("div", {
    class: "grid gap-6 md:grid-cols-3",
    id: "featuredGrid"
  });

  // Skeleton screens
  for (let i = 0; i < 3; i++) {
    grid.append(
      el("div", { class: "card p-4 animate-pulse" }, [
        el("div", { class: "h-40 bg-gray-200 rounded mb-3" }),
        el("div", { class: "h-4 bg-gray-200 rounded w-3/4 mb-2" }),
        el("div", { class: "h-3 bg-gray-200 rounded w-1/2" })
      ])
    );
  }

  sec.append(controls, grid);

  try {
    const res = await fetch("/data/posts.json");
    const data = await res.json();

    grid.innerHTML = "";

    (data.tours || []).slice(0, 6).forEach(t => {
      const card = el("article", { class: "card" });

      card.append(
        el("div", {
          class: "h-44 bg-cover bg-center",
          style: `background-image:url(${t.image})`
        }),
        el("div", { class: "p-4" }, [
          el("div", {
            class: "flex items-start justify-between mb-2"
          }, [
            el("h3", { class: "font-semibold" }, [t.title]),
            el("span", { class: "pill" }, [t.category])
          ]),
          el("p", { class: "text-sm text-slate-600 mb-4" }, [t.summary]),
          el("div", {
            class: "flex items-center justify-between"
          }, [
            el("div", { class: "text-primary font-bold text-lg" }, [
              `$${t.price.toFixed(2)}`
            ]),
            el("button", {
              class: "px-3 py-1 border rounded hover:bg-primary hover:text-white"
            }, ["Book"])
          ])
        ])
      );

      grid.append(card);
    });
  } catch (err) {
    grid.innerHTML = `<p class="text-red-500">Failed to load tours.</p>`;
  }

  return sec;
}
