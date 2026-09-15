/* Loader */
window.addEventListener("load",()=>{
  setTimeout(()=>{
    document.getElementById("loader").classList.add("hide");
  },800);
});

/* Navbar */
const navbar=document.getElementById("navbar");

function updateNavbar(){
  navbar.classList.toggle("scrolled",window.scrollY>35);
}
window.addEventListener("scroll",updateNavbar,{passive:true});
updateNavbar();

/* Mobile menu */
const menuBtn=document.getElementById("menuBtn");
const navLinks=document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open",open);
  menuBtn.setAttribute("aria-expanded",open?"true":"false");
  menuBtn.textContent=open?"×":"☰";
});

navLinks.querySelectorAll("a").forEach(link=>{
  link.addEventListener("click",()=>{
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuBtn.setAttribute("aria-expanded","false");
    menuBtn.textContent="☰";
  });
});

/* Reveal on scroll */
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

/* Hero parallax */
const heroArt=document.getElementById("heroArt");

window.addEventListener("scroll",()=>{
  if(window.innerWidth>900){
    const y=Math.min(window.scrollY*.12,90);
    heroArt.style.transform=`translateY(${y}px)`;
  }
},{passive:true});

/* Year */
document.getElementById("year").textContent=new Date().getFullYear();

/* Smooth anchor */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener("click",function(e){
    const target=document.querySelector(this.getAttribute("href"));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});
