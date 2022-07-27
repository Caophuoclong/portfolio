const xzs = [
  'home',
  'about',
  'skills',
  'experiences',
  'projects',
  'education',
  'contact',
];
const url = document.baseURI;
const selected = url.split('#')[1] || 'home';
const converter = new showdown.Converter();
const expirences = [
  {
    title: 'Fresher Fullstack Web Developer',
    company: 'Gcalls',
    location: 'VietNam',
    date: {
      // month from 0 to 11
      from: new Date(2022, 0),
      to: new Date(2022, 2),
    },
    descriptions: ['Test', '1234'],
  },
  {
    title: 'Intern Fullstack Web Developer',
    company: 'Gcalls',
    location: 'VietNam',
    date: {
      // month from 0 to 11
      from: new Date(2021, 7),
      to: new Date(2021, 10),
    },
    descriptions: ['Test', '1234'],
  },
];

expirences.sort((a, b) => a.date.from.getDate() - b.date.from.getDate());
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

let expTimeLine = '';
expirences.forEach((exp) => {
  let descs = '';
  exp.descriptions.forEach((desc) => {
    descs += `<li>${desc}</li>`;
  });
  expTimeLine += `
  <div class="timeline__item">
  <div class="timeline__content">
    <div class="work">
      <span class="work__position">${exp.title}</span>
      <!-- Where u work -->
      <span class="work__address">@${exp.company}, ${exp.location}</span>
      <!-- Time -->
      <span class="work__time">${moment(exp.date.from).format(
        'MMM, YYYY'
      )} - ${moment(exp.date.to).format('MMM, YYYY')}</span>
      <ul class="work__description">
        ${descs}
      </ul>
    </div>
  </div>
</div>`;
});
document.querySelector('#expirence_timeline').innerHTML = expTimeLine;
timeline(document.querySelectorAll('.timeline'), {
  verticalStartPosition: 'right',
  verticalTrigger: '150px',
});
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
