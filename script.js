// Floating mixed particles — hearts + sparkles
const funEmojis = ['💕','✨','🌸','💫','🌹','💗','⭐','🌷'];
const hc = document.getElementById('heartsContainer');
for (let i = 0; i < 24; i++) {
  const h = document.createElement('div');
  h.className = 'heart-particle';
  h.textContent = funEmojis[Math.floor(Math.random() * funEmojis.length)];
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = (14 + Math.random() * 18) + 'px';
  h.style.animationDuration = (8 + Math.random() * 10) + 's';
  h.style.animationDelay = (Math.random() * 10) + 's';
  hc.appendChild(h);
}

// NO button movement
const btnNo = document.getElementById('btnNo');
let noClicks = 0;
const winW = window.innerWidth, winH = window.innerHeight;

function moveNo() {
  noClicks++;
  const maxX = Math.max(winW - 150, 100);
  const maxY = Math.max(winH - 80, 100);
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  btnNo.style.left = x + 'px';
  btnNo.style.top  = y + 'px';
  const msgs = ['Nope!','Try again!','Catch me!','Not today!','Hehe!','Nice try!'];
  btnNo.textContent = msgs[noClicks % msgs.length];
}

// Initial NO placement
(function() {
  btnNo.style.left = '60%';
  btnNo.style.top  = '60%';
})();

// YES — go to places
function sayYes() {
  document.getElementById('page-ask').style.display = 'none';
  document.getElementById('page-places').style.display = 'block';
  window.scrollTo(0,0);
}

// Delhi places data (Google image URLs via search)
const places = [
  {
    name: 'Rajghat',
    emoji: '🕊️',
    bg: '#e8f5e9',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Raj_Ghat_-_Gandhi_memorial.jpg/800px-Raj_Ghat_-_Gandhi_memorial.jpg',
    tag: 'Peaceful & Historic',
    desc: 'Let\'s explore the calm pathways of Rajghat — soak in history, breathe the fresh air, and experience one of Delhi\'s most peaceful spots together.',
    msg: 'Rajghat it is! Let\'s go explore, walk those quiet paths, and experience a bit of Delhi\'s history together. Aditya is pumped! 🕊️'
  },
  {
    name: 'India Gate',
    emoji: '🏛️',
    bg: '#fff8e1',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/India_Gate_in_New_Delhi_03-2016.jpg/800px-India_Gate_in_New_Delhi_03-2016.jpg',
    tag: 'Iconic Monument',
    desc: 'Grab an ice cream and go experience Delhi\'s most iconic landmark — the energy around India Gate is something everyone should feel at least once!',
    msg: 'India Gate, here we come! Ice creams in hand, good vibes all around — can\'t wait to explore this iconic spot with you! 🏛️'
  },
  {
    name: 'Lodhi Garden',
    emoji: '🌿',
    bg: '#f1f8e9',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lodhi_Gardens_Entrance.jpg/800px-Lodhi_Gardens_Entrance.jpg',
    tag: 'Garden Vibes',
    desc: 'Let\'s go wander through ancient tombs and lush green gardens — a perfect place to explore, unwind, and discover hidden corners of Delhi.',
    msg: 'Lodhi Garden — let\'s get lost among the greenery and ancient ruins. Such a cool place to explore together! 🌿'
  },
  {
    name: 'Qutub Minar',
    emoji: '🏰',
    bg: '#fff3e0',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Qtub_minar.jpg/600px-Qtub_minar.jpg',
    tag: 'UNESCO Heritage',
    desc: 'Let\'s go experience one of the world\'s most stunning monuments up close — Qutub Minar is something that hits different when you\'re actually standing next to it!',
    msg: 'Qutub Minar — 73 metres of sheer history! Let\'s go explore and experience this UNESCO wonder together. So exciting! 🏰'
  },
  {
    name: 'Humayun\'s Tomb',
    emoji: '🌅',
    bg: '#fce4ec',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Humayun%27s_Tomb_at_Dusk.jpg/800px-Humayun%27s_Tomb_at_Dusk.jpg',
    tag: 'Mughal Splendour',
    desc: 'Let\'s go explore this Mughal masterpiece — walk through the grand gardens, discover the architecture, and soak in the incredible atmosphere around every corner.',
    msg: 'Humayun\'s Tomb — let\'s go explore every corner of this stunning place. It\'s going to be such an amazing experience! 🌅'
  },
  {
    name: 'Hauz Khas Village',
    emoji: '☕',
    bg: '#f3e5f5',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Hauz_Khas_Fort.jpg/800px-Hauz_Khas_Fort.jpg',
    tag: 'Artsy & Chic',
    desc: 'Street art, bookshops, quirky shops, and a medieval lake — let\'s go explore Hauz Khas Village and experience everything this cool neighbourhood has to offer!',
    msg: 'Hauz Khas Village — exploring the art, the alleys, and chilling by a 13th-century lake. Let\'s go experience it all! 🎨'
  },
];

// Render place cards
const grid = document.getElementById('placesGrid');
places.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'place-card';
  card.innerHTML = `
    <img class="place-img" src="${p.img}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="place-img-placeholder" style="display:none;background:${p.bg};font-size:60px">${p.emoji}</div>
    <div class="place-body">
      <h3>${p.emoji} ${p.name}</h3>
      <p>${p.desc}</p>
      <span class="place-tag">🏷 ${p.tag}</span>
    </div>
  `;
  card.onclick = () => selectPlace(p);
  grid.appendChild(card);
});

function selectPlace(p) {
  document.getElementById('selectedName').textContent = p.emoji + ' ' + p.name;
  document.getElementById('selectedMsg').textContent = p.msg;

  const wrap = document.getElementById('selectedImgWrap');
  wrap.innerHTML = `
    <img class="selected-img" src="${p.img}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div class="selected-img-placeholder" style="display:none;background:${p.bg};font-size:80px">${p.emoji}</div>
  `;

  const overlay = document.getElementById('page-selected');
  overlay.style.display = 'flex';
}

function showFinalPop() {
  document.getElementById('page-selected').style.display = 'none';
  document.getElementById('page-final').style.display = 'flex';
}

function closeSelected() {
  document.getElementById('page-selected').style.display = 'none';
}
