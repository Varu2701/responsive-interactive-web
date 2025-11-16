import "../css/tailwind.css";
import "../css/components.css";

import {
  Header,
  Hero,
  Featured,
  Categories,
  Hotels,
  Cars,
  Testimonials,
  Blog,
  Footer
} from "./components.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  app.append(
    Header(),
    Hero(),
    await Featured(),
    Categories(),
    await Hotels(),
    await Cars(),
    Testimonials(),
    await Blog(),
    Footer()
  );
});
