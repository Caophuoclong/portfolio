const xzs = ['home', 'about', 'education', 'skills', 'work', 'contact'];
const url = document.baseURI;
const selected = url.split('#')[1] || 'home';
const converter = new showdown.Converter();
const introMySelf = `**Hi, I'm Tran Cao Phuoc Long**.\n
I'm a senior student at **Can Tho University**, I'm majoring in **Software Engineering**. I expect graduated in Spring, 2024. \n
I'm looking forward to work in a professional environment, that help me improve my skills and knowledge.\n
I alway put my heart and soul into my work, and I'm always looking for new opportunities to learn and grow.\n
Apart from coding, I also like to play games, do sport and listen to music. \n
That is all I have to share with you. Thank for reading.
  `;
const homeIntro = `
In this site, you can find my resume, my skills, my work, and my contact.\n
I code this project with **HTML5, CSS3 and JavaScript**.
`;
document.querySelector('#introMySelf').innerHTML =
  converter.makeHtml(introMySelf);
document.querySelector('#homeIntro').innerHTML = converter.makeHtml(homeIntro);
function tapToShow(el) {
  const nextSibling = document.querySelector(`#${el}`);
  if (nextSibling.classList.contains('hide')) {
    nextSibling.classList.remove('hide');
  } else {
    nextSibling.classList.add('hide');
  }
}

window.addEventListener('load', () => {
  const showUp = document.querySelector('.showUp');
  const typewriter = new Typewriter(showUp, {
    loop: true,
  });
  typewriter
    .pauseFor(500)
    .typeString('Web Developer')
    .pauseFor(300)
    .deleteAll()
    .typeString('MERN Stack Developer')
    .deleteAll()
    .start();
  let html = '';
  xzs.forEach((xz) => {
    html += `<div class="box">
    <a class="custom-underline" href="#${xz}">${capitalizeFirstLetter(xz)}</a>
  </div>`;
  });
  document.querySelector('nav').innerHTML = html;
  addSelected(selected);
  document.querySelector(`#${selected}`).scrollIntoView();
  window.addEventListener('hashchange', (e) => {
    const url = e.newURL.split('#')[1];
    const prevSelected = document.querySelector('.selected');
    const name = prevSelected.getAttribute('href').split('#')[1];
    const currentPos = xzs.indexOf(name);
    const nextPos = xzs.indexOf(url);
    addSelected(url);
  });
  let lastScrollTop = 0;
  window.addEventListener('scroll', (e) => {
    const prevSelected = document.querySelector('.selected');
    const nameHref = prevSelected.getAttribute('href').replace('#', '');
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
  const tag = document.querySelector(`[href="#${selected || 'home'}"]`);
  const tags = document.querySelectorAll('nav a');
  tags.forEach((tag) => tag.classList.remove('selected'));
  tag.classList.add('selected');
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
