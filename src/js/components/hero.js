import { el } from "./helper.js";
import Swiper from "swiper";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function SearchCard() {
  const form = el("form", {
    class: "bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-3 items-center"
  });

  const dest = el("input", {
    type: "text",
    placeholder: "Where to?",
    class: "flex-1 border rounded px-3 py-2"
  });

  const date = el("input", {
    type: "date",
    class: "border rounded px-3 py-2"
  });

  const btn = el("button", {
    class: "btn-primary",
    type: "submit"
  }, ["Search"]);

  form.append(dest, date, btn);
  return form;
}

export function Hero() {
  const section = el("section", { class: "relative" });

  const wrapper = el("div", {
    class: "max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 items-center"
  });

  const slides = [
    {
      title: "Unleash Your Wanderlust",
      subtitle: "Book Your Next Journey",
      img:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600"
    },
    {
      title: "Explore Exotic Places",
      subtitle: "Find curated tours",
      img:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600"
    },
    {
      title: "Adventure Awaits",
      subtitle: "Pick your next destination",
      img:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600"
    }
  ];

  const main = el("div", {
    class: "md:col-span-2 rounded-2xl overflow-hidden relative"
  });

  const swiperWrapper = el("div", { class: "swiper hero-swiper" });
  const wrapperInner = el("div", { class: "swiper-wrapper" });

  slides.forEach(s => {
    const slide = el("div", {
      class: "swiper-slide",
      style: `background-image:url(${s.img});background-size:cover;background-position:center;`
    });

    slide.append(
      el("div", { class: "absolute inset-0 hero-gradient" }),
      el("div", { class: "relative z-10 p-6 text-white" }, [
        el("h1", { class: "text-4xl font-bold mb-3" }, [s.title]),
        el("p", { class: "mb-6 text-lg" }, [s.subtitle]),
        SearchCard()
      ])
    );

    wrapperInner.append(slide);
  });

  swiperWrapper.append(wrapperInner);
  main.append(swiperWrapper);

  const thumbs = el("div", { class: "flex flex-col gap-3" });
  slides.forEach((s, i) => {
    thumbs.append(
      el("div", { class: "card flex items-center p-3", "data-index": i }, [
        el("div", {
          class: "w-20 h-14 rounded bg-cover",
          style: `background-image:url(${s.img})`
        }),
        el("div", {}, [
          el("h4", { class: "font-semibold" }, [s.title]),
          el("p", { class: "text-xs text-slate-500" }, [s.subtitle])
        ])
      ])
    );
  });

  wrapper.append(main, thumbs);
  section.append(wrapper);

  setTimeout(() => {
    const heroSwiper = new Swiper(".hero-swiper", {
      modules: [Pagination, Autoplay, Navigation],
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: ".swiper-pagination", clickable: true }
    });

    thumbs.querySelectorAll("[data-index]").forEach(btn =>
      btn.addEventListener("click", () =>
        heroSwiper.slideToLoop(Number(btn.dataset.index))
      )
    );
  }, 100);

  return section;
}
