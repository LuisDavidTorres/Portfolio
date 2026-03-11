const section = document.getElementById("more");
const sectionProyects = document.getElementById("experience")

if(sectionProyects)

section?.addEventListener("click", () => {
  const yOffset = -100;
  const y = sectionProyects.getBoundingClientRect().top + window.scrollY + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
});
