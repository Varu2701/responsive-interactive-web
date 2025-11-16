import Swiper from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { el } from "./helper.js";

export async function Hotels() {
  const sec = el("section", { class: "py-12 bg-pinkbg" });

  const container = el("div", { class: "max-w-7xl mx-auto px-4" });
  container.append(
    el("h2", { class: "text-2xl font-bold mb-6" }, ["Top Rated Hotels"])
  );

  const swiperHolder = el("div", { class: "swiper hotel-swiper" });
  const wrapper = el("div", { class: "swiper-wrapper", id: "hotelTrack" });
  swiperHolder.append(wrapper);
  container.append(swiperHolder);
  sec.append(container);

  const res = await fetch("/data/posts.json");
  const data = await res.json();

  (data.hotels || []).forEach(h => {
    const slide = el("div", { class: "swiper-slide card min-w-[260px] overflow-hidden" });

    slide.append(
      el("div", {
        class: "h-44 bg-cover bg-center",
        style: `background-image:url(${h.image})`
      }),
      el("div", { class: "p-4" }, [
        el("h4", { class: "font-semibold mb-1" }, [h.title]),
        el("div", { class: "text-sm text-slate-600 mb-2" }, [`${h.rating} ★ · $${h.price}`]),
        el("button", { class: "px-3 py-1 border rounded" }, ["View"])
      ])
    );

    wrapper.append(slide);
  });

  setTimeout(() => {
    new Swiper(".hotel-swiper", {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 16,
      loop: true,
      autoplay: { delay: 3000 }
    });
  }, 100);

  return sec;
}
