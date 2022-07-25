const url = document.baseURI;
const selected = url.split("#")[1];
addSelected(selected);
document.querySelector(`#${selected}`).scrollIntoView();
// alert(tag);

window.addEventListener("hashchange", (e) => {
  const url = e.newURL.split("#")[1];
  addSelected(url);
});
window.addEventListener("scroll", (e) => {
  const prevSelected = document.querySelector(".selected");
  const nameHref = prevSelected.getAttribute("href").replace("#", "");
  const xyz = document.querySelectorAll("nav a");
  // xyz.forEach((tag) => {
  //   const asd = tag.getAttribute("href").replace("#", "");
  //   // console.log(asd);
  // });
  if (isInViewport(document.querySelector(`#${nameHref}`))) {
    console.log(nameHref);
    const arrTag = document.querySelectorAll(`nav a`);
    const currentPos = arrTag.map((tag, i) =>
      tag.getAttribute("href").replace("#", "") === nameHref ? i : null
    )[0];
    console.log(currentPos);
    // const next = document
    //   .querySelectorAll("nav a")
    //   .forEach((tag) => tag.getAttribute("href").replace("#", ""));
    // addSelected(nameHref);
  }
});
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    800 <=
    (window.innerHeight || document.documentElement.clientHeight) - rect.bottom
  );
}
function addSelected(selected) {
  const tag = document.querySelector(`[href="#${selected || "home"}"]`);
  const tags = document.querySelectorAll("nav a");
  tags.forEach((tag) => tag.classList.remove("selected"));
  tag.classList.add("selected");
}
