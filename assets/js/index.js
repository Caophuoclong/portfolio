const xzs = ["home", "about", "education", "skills", "work", "contact"];
const url = document.baseURI;
const selected = url.split("#")[1] || "home";
const converter = new showdown.Converter();
console.log(converter);
const introMySelf = `**Hi, I'm Phuoc Long** asdasdasdsdsads
  `;
document.querySelector("#introMySelf").innerHTML =
  converter.makeHtml(introMySelf);
window.addEventListener("load", () => {
  let html = "";
  xzs.forEach((xz) => {
    html += `<div class="box">
    <a class="custom-underline" href="#${xz}">${capitalizeFirstLetter(xz)}</a>
  </div>`;
  });
  document.querySelector("nav").innerHTML = html;
  addSelected(selected);
  document.querySelector(`#${selected}`).scrollIntoView();
  window.addEventListener("hashchange", (e) => {
    const url = e.newURL.split("#")[1];
    const prevSelected = document.querySelector(".selected");
    const name = prevSelected.getAttribute("href").split("#")[1];
    const currentPos = xzs.indexOf(name);
    const nextPos = xzs.indexOf(url);
    addSelected(url);
  });
  let lastScrollTop = 0;
  window.addEventListener("scroll", (e) => {
    const prevSelected = document.querySelector(".selected");
    const nameHref = prevSelected.getAttribute("href").replace("#", "");
    const innerHeight = window.innerHeight;
    let currentPos, nextPos;
    currentPos = xzs.indexOf(nameHref);
    const rect = document
      .querySelector(`#${xzs[currentPos]}`)
      .getBoundingClientRect();
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      nextPos = currentPos + 1;
      if (innerHeight - rect.bottom >= 800) {
        addSelected(xzs[nextPos]);
      }
    } else {
      if (currentPos === 0) {
        nextPos = 0;
      } else nextPos = currentPos - 1;
      if (innerHeight - rect.top <= 150) {
        addSelected(xzs[nextPos]);
      }
    }
    lastScrollTop = st;
  });
});

function addSelected(selected) {
  const tag = document.querySelector(`[href="#${selected || "home"}"]`);
  const tags = document.querySelectorAll("nav a");
  tags.forEach((tag) => tag.classList.remove("selected"));
  tag.classList.add("selected");
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
