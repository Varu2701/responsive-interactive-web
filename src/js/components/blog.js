import { el } from "./helper.js";

export async function Blog() {
  const sec = el("section", {
    id: "blog",
    class: "max-w-7xl mx-auto px-4 py-12"
  });

  sec.append(
    el("h2", { class: "text-2xl font-bold mb-6" }, ["News, Tips & Guides"])
  );

  const grid = el("div", { class: "grid md:grid-cols-3 gap-6" });
  sec.append(grid);

  const res = await fetch("/data/posts.json");
  const data = await res.json();

  (data.posts || []).forEach(p => {
    const card = el("div", { class: "card overflow-hidden" });

    card.append(
      el("img", {
        src: p.image,
        class: "w-full h-44 object-cover"
      }),
      el("div", { class: "p-4" }, [
        el("h4", { class: "font-semibold mb-2" }, [p.title]),
        el("p", { class: "text-sm text-slate-600" }, [p.summary])
      ])
    );

    grid.append(card);
  });

  return sec;
}
