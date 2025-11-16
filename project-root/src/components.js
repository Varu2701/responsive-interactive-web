import Swiper from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// helper
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const k in attrs) {
    if (k === 'class') node.className = attrs[k];
    else if (k === 'html') node.innerHTML = attrs[k];
    else node.setAttribute(k, attrs[k]);
  }
  children.forEach(c => node.append(typeof c === 'string' ? document.createTextNode(c) : c));
  return node;
}

function showToast(message, type='info') {
  let portal = document.getElementById('toast-portal');
  if (!portal) { portal = el('div', {id:'toast-portal', class:'fixed right-6 top-6 z-50'}); document.body.append(portal); }
  const box = el('div', {class:'px-4 py-2 rounded shadow mb-2'}, [message]);
  if (type === 'error') box.classList.add('bg-red-500','text-white');
  else if (type === 'success') box.classList.add('bg-green-600','text-white');
  else box.classList.add('bg-gray-800','text-white');
  portal.append(box);
  setTimeout(()=> box.remove(), 2500);
}

// Header
export function Header() {
  const header = el('header', {class:'sticky top-0 z-40 bg-white shadow-sm'});
  header.append(
    el('div',{class:'max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'}, [
      el('a',{href:'#', class:'text-2xl font-bold text-primary'}, ['Travila']),
      el('nav',{class:'hidden md:flex gap-6 text-slate-700'}, [
        el('a',{href:'#', class:'hover:text-primary'}, ['Home']),
        el('a',{href:'#tours', class:'hover:text-primary'}, ['Tours']),
        el('a',{href:'#hotels', class:'hover:text-primary'}, ['Hotels']),
        el('a',{href:'#cars', class:'hover:text-primary'}, ['Cars']),
        el('a',{href:'#blog', class:'hover:text-primary'}, ['Blog'])
      ]),
      el('div',{class:'flex items-center gap-3'}, [
        el('button',{class:'btn-primary hidden md:inline-flex', id:'open-search'}, ['Search']),
        el('a',{href:'#', class:'text-slate-600'}, ['Login'])
      ])
    ])
  );
  return header;
}

// Search card used in hero
function SearchCard() {
  const form = el('form', {class:'bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-3 items-center', id:'heroSearch'});
  const dest = el('input', {type:'text', name:'q', placeholder:'Where to?', class:'flex-1 border rounded px-3 py-2', required: ''});
  const date = el('input', {type:'date', name:'date', class:'border rounded px-3 py-2'});
  const btn = el('button', {class:'btn-primary', type:'submit'}, ['Search']);
  form.append(dest, date, btn);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = dest.value.trim();
    if (!q) return showToast('Please enter a destination', 'error');
    window.dispatchEvent(new CustomEvent('siteSearch', {detail:{query:q}}));
  });

  return form;
}

// Hero (Swiper + right thumbnails)
export function Hero() {
  const section = el('section', {class:'relative'});
  const wrapper = el('div', {class:'max-w-7xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 items-center'});

  // big slide container (left, spans 2 columns)
  const left = el('div', {class:'md:col-span-2 rounded-2xl overflow-hidden relative', style:'min-height:420px'});
  left.innerHTML = `
    <div class="swiper hero-swiper h-full">
      <div class="swiper-wrapper"></div>
      <div class="swiper-pagination"></div>
    </div>
  `;
  const swiperWrapper = left.querySelector('.swiper-wrapper');

  const slidesData = [
    {title:'Unleash Your Wanderlust', subtitle:'Book Your Next Journey', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'},
    {title:'Explore Exotic Places', subtitle:'Find curated tours', img:'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop'},
    {title:'Adventure Awaits', subtitle:'Pick your next destination', img:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80'}
  ];

  slidesData.forEach((s, idx) => {
    const slide = el('div', {class:'swiper-slide relative', style:`background-image:url(${s.img});background-size:cover;background-position:center;`});
    const overlay = el('div', {class:'absolute inset-0 hero-gradient'});
    const content = el('div', {class:'relative z-10 max-w-3xl px-6 py-16 text-white'});
    content.append(
      el('h1',{class:'text-3xl md:text-5xl font-extrabold mb-3'}, [s.title]),
      el('p',{class:'mb-6 text-lg'}, [s.subtitle]),
      SearchCard()
    );
    slide.append(overlay, content);
    swiperWrapper.append(slide);
  });

  // right thumbnails
  const rightCol = el('div', {class:'flex flex-col gap-3'});
  slidesData.forEach((s, i) => {
    const t = el('button', {class:'thumb-card card p-3 flex items-center gap-3', 'data-index': String(i)});
    t.append(
      el('div', {class:'w-20 h-14 bg-cover rounded-md', style:`background-image:url(${s.img});`}),
      el('div', {}, [ el('h4', {class:'font-semibold'}, [s.title]), el('div',{class:'text-xs text-slate-500'}, [s.subtitle]) ])
    );
    rightCol.append(t);
  });

  left.append(el('div',{class:'absolute left-6 bottom-6'})); // placeholder for dots (Swiper renders)
  wrapper.append(left, rightCol);
  section.append(wrapper);

  // init Swiper (with modules)
  setTimeout(()=> {
    const heroSwiper = new Swiper('.hero-swiper', {
      modules: [Pagination, Autoplay, Navigation],
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true }
    });

    // thumbnail clicks -> slide
    rightCol.querySelectorAll('.thumb-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = Number(btn.dataset.index);
        heroSwiper.slideToLoop(i); // slideToLoop accounts for loop index
      });
    });
  }, 100);

  return section;
}

// Featured tours
export async function Featured() {
  const sec = el('section', {id:'tours', class:'max-w-7xl mx-auto px-4 py-12'});
  sec.append(el('h2', {class:'text-2xl font-bold mb-4'}, ['Our Featured Tours']));

  const controls = el('div', {class:'flex gap-3 mb-4'}, []);
  ['All','Beach','City','Nature'].forEach(c => {
    controls.append(el('button', {class:'px-3 py-1 rounded-full bg-gray-100 text-sm'}, [c]));
  });

  const grid = el('div', {class:'grid gap-6 md:grid-cols-3', id:'featuredGrid'});
  // initial skeletons
  for (let i=0;i<3;i++) grid.append(el('div',{class:'card p-4 animate-pulse'}, [ el('div',{class:'h-40 bg-gray-200 rounded mb-3'}), el('div',{class:'h-4 bg-gray-200 rounded w-3/4 mb-2'}), el('div',{class:'h-3 bg-gray-200 rounded w-1/2'}) ]));

  sec.append(controls, grid);

  // load data
  try {
    const r = await fetch('/data/posts.json');
    const data = await r.json();
    grid.innerHTML = '';
    (data.tours || []).slice(0,6).forEach(t => {
      const card = el('article', {class:'card'});
      card.append(
        el('div', {class:'h-44 bg-cover bg-center', style:`background-image:url(${t.image})`}),
        el('div', {class:'p-4'}, [
          el('div',{class:'flex items-start justify-between mb-2'}, [ el('h3',{class:'font-semibold'},[t.title]), el('span',{class:'pill'}, [t.category]) ]),
          el('p',{class:'text-sm text-slate-600 mb-4'}, [t.summary]),
          el('div',{class:'flex items-center justify-between'}, [ el('div',{class:'text-primary font-bold text-lg'}, [`$${t.price.toFixed(2)}`]), el('button',{class:'px-3 py-1 border rounded hover:bg-primary hover:text-white'}, ['Book']) ])
        ])
      );
      grid.append(card);
    });
  } catch (err) {
    grid.innerHTML = '<p class="text-red-500">Failed to load tours.</p>';
  }

  return sec;
}

// Categories (tabs)
export function Categories() {
  const sec = el('section', {class:'max-w-7xl mx-auto px-4 py-8'});
  sec.append(el('h2',{class:'text-xl font-bold mb-4'}, ['Top Categories of Tours']));
  const tabs = el('div', {class:'flex gap-3 mb-6', id:'tabs'});
  ['All','Beach','Nature','City'].forEach((c,i) => {
    const btn = el('button', {class:`px-3 py-2 rounded ${i===0?'bg-primary text-white':'bg-gray-100'}`, 'data-cat':c}, [c]);
    tabs.append(btn);
  });
  const panel = el('div', {class:'grid md:grid-cols-4 gap-4', id:'catPanel'});
  sec.append(tabs, panel);

  // load function
  async function load(cat='All') {
    panel.innerHTML = '';
    const r = await fetch('/data/posts.json');
    const d = await r.json();
    let items = d.tours || [];
    if (cat !== 'All') items = items.filter(it => it.category === cat);
    items.slice(0,4).forEach(t => {
      const card = el('div', {class:'card'});
      card.append(
        el('div',{class:'h-28 bg-cover bg-center', style:`background-image:url(${t.image})`}),
        el('div',{class:'p-3'}, [ el('h4',{class:'font-semibold mb-1'}, [t.title]), el('p',{class:'text-sm text-slate-600'}, [t.summary]) ])
      );
      panel.append(card);
    });
  }

  tabs.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    [...tabs.children].forEach(b => { b.classList.remove('bg-primary','text-white'); b.classList.add('bg-gray-100'); });
    btn.classList.add('bg-primary','text-white');
    load(btn.dataset.cat);
  });

  load('All');
  return sec;
}

// Hotels (Swiper slider)
export async function Hotels() {
  const sec = el('section', {class:'py-12 bg-pinkbg'});
  const container = el('div', {class:'max-w-7xl mx-auto px-4'});
  container.append(el('h2',{class:'text-2xl font-bold mb-6'}, ['Top Rated Hotels']));

  const swiperHolder = el('div', {class:'swiper hotel-swiper'});
  const wrapper = el('div', {class:'swiper-wrapper', id:'hotelTrack'});
  swiperHolder.append(wrapper);
  container.append(swiperHolder);
  sec.append(container);

  const r = await fetch('/data/posts.json');
  const data = await r.json();
  (data.hotels || []).forEach(h => {
    const slide = el('div', {class:'swiper-slide card min-w-[260px] overflow-hidden'});
    slide.append(
      el('div',{class:'h-44 bg-cover bg-center', style:`background-image:url(${h.image})`}),
      el('div',{class:'p-4'}, [ el('h4',{class:'font-semibold mb-1'}, [h.title]), el('div',{class:'text-sm text-slate-600 mb-2'}, [`${h.rating} ★ · $${h.price}`]), el('button',{class:'px-3 py-1 border rounded'}, ['View']) ])
    );
    wrapper.append(slide);
  });

  setTimeout(()=> {
    new Swiper('.hotel-swiper', {
      modules: [Autoplay, Navigation, Pagination],
      slidesPerView: 'auto',
      spaceBetween: 16,
      loop: true,
      autoplay: { delay: 3000 }
    });
  }, 100);

  return sec;
}

// Cars
export async function Cars() {
  const sec = el('section', {id:'cars', class:'max-w-7xl mx-auto px-4 py-12'});
  sec.append(el('h2',{class:'text-xl font-bold mb-4'}, ['Recent Launched Car']));
  const grid = el('div', {class:'grid md:grid-cols-3 gap-6'});
  sec.append(grid);

  const r = await fetch('/data/posts.json');
  const d = await r.json();
  (d.cars || []).forEach(c => {
    const card = el('div',{class:'card p-4'});
    card.append(
      el('div',{class:'h-40 bg-cover bg-center rounded-md mb-3', style:`background-image:url(${c.image})`}),
      el('h4',{class:'font-semibold mb-2'}, [c.title]),
      el('div',{class:'flex items-center justify-between'}, [ el('div',{class:'text-primary font-bold'}, [`$${c.price}`]), el('button',{class:'px-3 py-1 border rounded'}, ['Rent']) ])
    );
    grid.append(card);
  });

  return sec;
}

// Testimonials
export function Testimonials() {
  const sec = el('section', {class:'py-12'});
  sec.append(el('div', {class:'max-w-7xl mx-auto px-4'}, [
    el('h2',{class:'text-2xl font-bold mb-6'}, ["Don't take our word for it"]),
    el('div', {class:'flex gap-4 overflow-x-auto'}, [
      el('div',{class:'card p-6 min-w-[260px]'}, [ el('p',{class:'mb-3 italic'}, ['The best booking experience']), el('p',{class:'font-semibold text-right'}, ['— Jane']) ]),
      el('div',{class:'card p-6 min-w-[260px]'}, [ el('p',{class:'mb-3 italic'}, ['Amazing tours and guides']), el('p',{class:'font-semibold text-right'}, ['— Rohit']) ]),
      el('div',{class:'card p-6 min-w-[260px]'}, [ el('p',{class:'mb-3 italic'}, ['Truly unforgettable']), el('p',{class:'font-semibold text-right'}, ['— Maria']) ])
    ])
  ]));
  return sec;
}

// Blog / News
export async function Blog() {
  const sec = el('section', {id:'blog', class:'max-w-7xl mx-auto px-4 py-12'});
  sec.append(el('h2',{class:'text-2xl font-bold mb-6'}, ['News, Tips & Guides']));
  const grid = el('div', {class:'grid md:grid-cols-3 gap-6'});
  sec.append(grid);

  const r = await fetch('/data/posts.json');
  const d = await r.json();
  (d.posts || []).forEach(p => {
    const card = el('div',{class:'card overflow-hidden'});
    card.append(
      el('img',{src:p.image, class:'w-full h-44 object-cover'}),
      el('div',{class:'p-4'}, [ el('h4',{class:'font-semibold mb-2'}, [p.title]), el('p',{class:'text-sm text-slate-600'}, [p.summary]) ])
    );
    grid.append(card);
  });

  return sec;
}

// Footer
export function Footer() {
  const f = el('footer', {class:'bg-figmaFooter text-white mt-12'});
  f.append(
    el('div',{class:'max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6'}, [
      el('div', {}, [ el('h3',{class:'text-xl font-bold mb-2'}, ['Travila']), el('p',{class:'text-slate-400'}, ['Subscribe for deals and updates.']) ]),
      el('div', {}, [ el('h4',{class:'font-semibold mb-2'}, ['Company']), el('a',{href:'#', class:'block text-slate-400 mb-1'}, ['About']), el('a',{href:'#', class:'block text-slate-400 mb-1'}, ['Careers']) ]),
      el('div', {}, [ el('h4',{class:'font-semibold mb-2'}, ['Support']), el('a',{href:'#', class:'block text-slate-400 mb-1'}, ['Help Center']), el('a',{href:'#', class:'block text-slate-400 mb-1'}, ['Contact']) ])
    ]),
    el('div',{class:'text-center text-slate-500 py-4'}, ['© 2025 Travila. All rights reserved.'])
  );
  return f;
}