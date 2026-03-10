document.addEventListener("DOMContentLoaded", () => {

gsap.registerPlugin(ScrollTrigger);

/* =========================
LENIS SMOOTH SCROLL
========================= */

const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

lenis.on("scroll", ScrollTrigger.update)


/* =========================
SPLIT TITLES
========================= */

document.querySelectorAll(".split-title").forEach(title=>{
  new SplitType(title,{
    types:"words,chars"
  });
});

ScrollTrigger.refresh();


/* =========================
STICKY HEADER
========================= */

const header = document.getElementById("siteHeader");

function handleHeaderState(){

  if(!header) return;

  if(window.scrollY > 40){
    header.classList.add("is-sticky");
  } else {
    header.classList.remove("is-sticky");
  }

}

handleHeaderState();
window.addEventListener("scroll", handleHeaderState);


/* =========================
HERO SLIDER
========================= */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

let currentSlide = 0;
let sliderInterval;

function goToSlide(index){

  slides.forEach((slide,i)=>{
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot,i)=>{
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;

}

function nextSlide(){
  if(!slides.length) return;
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function prevSlide(){
  if(!slides.length) return;
  const prev = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prev);
}

function startSlider(){
  if(slides.length){
    sliderInterval = setInterval(nextSlide,5000);
  }
}

function stopSlider(){
  clearInterval(sliderInterval);
}

nextBtn?.addEventListener("click",()=>{
  stopSlider();
  nextSlide();
  startSlider();
});

prevBtn?.addEventListener("click",()=>{
  stopSlider();
  prevSlide();
  startSlider();
});

dots.forEach(dot=>{
  dot.addEventListener("click",()=>{
    stopSlider();
    goToSlide(Number(dot.dataset.slide));
    startSlider();
  });
});

startSlider();


/* =========================
MENU OVERLAY
========================= */

const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const menuLinks = document.querySelectorAll(".menu-link");

let menuOpen = false;

gsap.set(".menu-overlay__inner > *",{opacity:0});
gsap.set(".menu-link",{y:40,opacity:0});

const menuTl = gsap.timeline({paused:true});

menuTl
.set(menuOverlay,{
  visibility:"visible",
  opacity:1,
  pointerEvents:"auto"
})
.to(".menu-overlay__inner > *",{
  opacity:1,
  duration:.35,
  stagger:.05
})
.to(".menu-link",{
  y:0,
  opacity:1,
  duration:.55,
  stagger:.07
},"-=0.18");


function openMenu(){

menuOpen = true;

document.body.classList.add("menu-open");

menuToggle?.classList.add("active");

stopSlider();

menuTl.play(0);

}

function closeMenu(){

menuOpen = false;

document.body.classList.remove("menu-open");

menuToggle?.classList.remove("active");

gsap.timeline({
onComplete:()=>{
gsap.set(menuOverlay,{
visibility:"hidden",
opacity:0,
pointerEvents:"none"
});
startSlider();
}
})
.to(".menu-link",{
y:-28,
opacity:0,
duration:.3,
stagger:{each:.04,from:"end"}
})
.to(".menu-overlay__inner > *",{
opacity:0,
duration:.2
},"-=0.16");

}

menuToggle?.addEventListener("click",()=>{
menuOpen ? closeMenu() : openMenu();
});

menuLinks.forEach(link=>{
link.addEventListener("click",closeMenu);
});


/* =========================
HERO INTRO
========================= */

function introAnimations(){

const tl = gsap.timeline({delay:.3});

tl.from(".hero-kicker",{
y:24,
opacity:0,
duration:.8
})

.from(".hero-title .word",{
yPercent:110,
opacity:0,
stagger:.05,
duration:.9,
ease:"power4.out"
},"-=.4")

.from(".hero-text",{
x:-46,
opacity:0,
duration:.9
},"-=.5")

.from(".hero-actions .btn",{
opacity:0,
y:18,
stagger:.1
},"-=.4")

.from(".hero-controls",{
opacity:0,
y:18
},"-=.4");

}

introAnimations();


/* =========================
SCROLL ANIMATIONS
========================= */

gsap.utils.toArray(".section-title").forEach(title=>{

const words = title.querySelectorAll(".word");

gsap.from(words,{
scrollTrigger:{
trigger:title,
start:"top 85%"
},
yPercent:120,
opacity:0,
stagger:.045,
duration:.9,
ease:"power4.out"
});

});


gsap.utils.toArray(".fade-left").forEach(el=>{

gsap.from(el,{
scrollTrigger:{
trigger:el,
start:"top 88%"
},
x:-60,
opacity:0,
duration:1
});

});


gsap.utils.toArray(".fade-up").forEach(el=>{

gsap.from(el,{
scrollTrigger:{
trigger:el,
start:"top 90%"
},
y:40,
opacity:0,
duration:.9
});

});


gsap.utils.toArray(".fade-btn").forEach(el=>{

gsap.from(el,{
scrollTrigger:{
trigger:el,
start:"top 92%"
},
opacity:0,
duration:1
});

});


/* =========================
IMAGE REVEAL
========================= */

gsap.utils.toArray(".image-reveal").forEach(wrap=>{

const img = wrap.querySelector("img");

if(!img) return;

const fromLeft = wrap.classList.contains("reveal-left");

gsap.set(wrap,{
clipPath: fromLeft ? "inset(0 0 0 100%)":"inset(0 100% 0 0)"
});

gsap.to(wrap,{
clipPath:"inset(0 0% 0 0)",
duration:1.3,
ease:"sine.out",
scrollTrigger:{
trigger:wrap,
start:"top 85%"
}
});

});


/* =========================
PARALLAX
========================= */

gsap.utils.toArray(".parallax-media img").forEach(img=>{

gsap.fromTo(img,
{y:40,scale:1.08},
{
y:-40,
scale:1.02,
ease:"none",
scrollTrigger:{
trigger:img,
start:"top bottom",
end:"bottom top",
scrub:true
}
});

});


/* =========================
MARQUEE
========================= */

gsap.to(".moving-line--top span",{
xPercent:-30,
repeat:-1,
duration:18,
ease:"linear"
});

gsap.to(".moving-line--bottom span",{
xPercent:30,
repeat:-1,
duration:20,
ease:"linear"
});


/* =========================
MAGNETIC BUTTON
========================= */

document.querySelectorAll(".magnetic").forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect = btn.getBoundingClientRect();

const x = e.clientX - rect.left - rect.width/2;
const y = e.clientY - rect.top - rect.height/2;

gsap.to(btn,{
x:x*.12,
y:y*.12,
duration:.35
});

});

btn.addEventListener("mouseleave",()=>{

gsap.to(btn,{
x:0,
y:0,
duration:.45
});

});

});
/* =========================
AUTO GALLERY CAROUSEL
========================= */

const galleryTrack = document.getElementById("galleryTrack");

if (galleryTrack) {

const totalWidth = galleryTrack.scrollWidth;

gsap.to(galleryTrack,{
  x: -totalWidth / 2,
  duration: 25,
  ease: "none",
  repeat: -1
});

}

/* =========================
SMOOTH ANCHOR LINKS
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

anchor.addEventListener("click",(e)=>{

const targetId = anchor.getAttribute("href");

if(!targetId || targetId === "#") return;

const target = document.querySelector(targetId);

if(!target) return;

e.preventDefault();

lenis.scrollTo(target,{
offset:-70,
duration:1.2
});

});

});


});