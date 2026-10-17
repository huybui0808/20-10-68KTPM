/* ========== TIỆN ÍCH ========== */
const $ = s => document.querySelector(s);
const rand = (a, b) => Math.random() * (b - a) + a;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const FLOWERS = ['🌸', '🌷', '🌹', '🌺', '🪷', '💐', '🌼'];
const DESKTOP_Q = '(min-width:1025px) and (hover:hover) and (pointer:fine)';
const IS_DESKTOP = matchMedia(DESKTOP_Q).matches;
matchMedia(DESKTOP_Q).addEventListener('change', () => location.reload());
const IS_SMALL = () => Math.min(innerWidth, innerHeight) < 520;

/* ========== DANH SÁCH LỚP (từ file Dssvnu68ktpm.xlsx) ==========
   Sắp xếp theo bảng chữ cái của TÊN (từ cuối), trùng tên thì xét họ đệm. */
const NAMES = [
  'Nguyễn Thị Ngọc Anh', 'Đinh Thị Thùy Chi', 'Trần Thị Hương Giang', 'Phạm Thị Khánh Ly',
  'Phạm Ánh Ngọc', 'Vũ Thị Hoài Phương', 'Lê Thị Thanh Thảo', 'Nguyễn Thị Thơm',
  'Lê Thị Thương', 'Nguyễn Hồng Chung Thủy', 'Vũ Thị Thu Trang', 'Nguyễn Cẩm Tú',
  'Nguyễn Hồng Uyên', 'Nguyễn Thị Ngọc Mai'
];
const collator = new Intl.Collator('vi');
const givenName = n => n.trim().split(/\s+/).pop();
NAMES.sort((a, b) => collator.compare(givenName(a), givenName(b)) || collator.compare(a, b));

const WISH_PARTS = [
  [ // sau "Chúc {tên}"
    "có một ngày 20-10 thật rực rỡ, ngập tràn hoa tươi, nụ cười và những lời yêu thương ấm áp nhất từ mọi người xung quanh.",
    "luôn xinh đẹp, tự tin và tỏa sáng theo cách riêng của mình, để mỗi ngày trôi qua đều là một ngày đáng nhớ.",
    "thật nhiều niềm vui trong ngày Phụ nữ Việt Nam, để mọi mệt mỏi tan biến và chỉ còn lại những khoảnh khắc nhẹ nhàng, bình yên.",
    "mãi là cô gái mạnh mẽ và dịu dàng, biết yêu thương bản thân, biết mỉm cười thật tươi dù ngày hôm nay có bận rộn đến đâu.",
    "một mùa hoa 20-10 thật ngọt ngào, nơi mọi ước mơ nhỏ bé đều được nâng niu và mọi nỗ lực đều được ghi nhận xứng đáng.",
    "ngày hôm nay và cả những ngày sau luôn được bao bọc bởi sự quan tâm, tiếng cười và những người bạn thật lòng.",
    "mỗi sớm mai thức dậy đều thấy lòng nhẹ tênh, thấy đời đẹp như một bó hoa vừa nở và thấy mình thật đáng quý.",
    "một ngày 20-10 trọn vẹn, được là chính mình, được yêu thương đủ đầy và được nhận thật nhiều bất ngờ dễ thương."
  ],
  [ // học tập, sự nghiệp
    "Chúc bạn học tập thật hiệu quả, những dòng code luôn chạy mượt, mọi kỳ thi đều suôn sẻ và điểm số luôn khiến bạn mỉm cười.",
    "Mong bạn gặp thật ít bug, nhiều ý tưởng hay, và mỗi dự án bạn làm ra đều khiến thầy cô, bạn bè phải gật gù khen ngợi.",
    "Chúc con đường học vấn của bạn rộng mở, kiến thức tích lũy mỗi ngày như hoa nở trong vườn, càng chăm càng thơm.",
    "Mong rằng mọi deadline đều đến chậm một chút, mọi bài tập đều dễ hơn một chút và mọi cố gắng đều được đền đáp xứng đáng.",
    "Chúc bạn giữ mãi ngọn lửa đam mê công nghệ, tự tin chinh phục những môn khó và bước thật xa trên hành trình trở thành lập trình viên giỏi.",
    "Mong tương lai bạn rực rỡ như pháo hoa đêm hội, sự nghiệp thăng hoa và công việc mơ ước sẽ sớm gõ cửa nhà bạn.",
    "Chúc bạn kiên trì với những điều mình theo đuổi, vì chúng mình tin bạn đủ giỏi, đủ bản lĩnh và đủ ngọt ngào để làm nên chuyện lớn.",
    "Mong bạn luôn tìm thấy niềm vui trong từng buổi học, từng dòng lệnh và từng thử thách nhỏ trên chặng đường phía trước."
  ],
  [ // sức khỏe, hạnh phúc
    "Chúc bạn luôn khỏe mạnh, ngủ thật ngon, ăn thật nhiều món mình thích và không bao giờ phải thức khuya vì deadline nữa.",
    "Mong nụ cười trên môi bạn luôn rạng rỡ như nắng sớm, và những muộn phiền chỉ như cánh hoa rơi, nhẹ nhàng rồi bay đi.",
    "Chúc trái tim bạn luôn bình yên, tâm hồn luôn trong trẻo và cuộc sống mỗi ngày đều đủ đầy những điều nhỏ bé đáng yêu.",
    "Mong bạn luôn đủ dịu dàng với chính mình, biết nghỉ ngơi khi mệt, biết vui khi được vui và biết cười khi có thể cười.",
    "Chúc bạn sức khỏe dồi dào, tinh thần phấn chấn và năng lượng tràn đầy như mùa xuân chưa bao giờ ngủ yên.",
    "Mong mọi lo toan đều nhẹ như gió thoảng, còn niềm vui thì nặng trĩu như những cành hoa đầu mùa trĩu nụ.",
    "Chúc bạn mỗi ngày đều có một lý do để mỉm cười, một người để chia sẻ và một điều gì đó thật ngọt ngào để mong chờ.",
    "Mong bạn luôn xinh tươi, tràn đầy sức sống và giữ được sự hồn nhiên đáng yêu mà ai gặp cũng muốn ở bên."
  ],
  [ // bạn bè, tình cảm
    "Chúc bạn luôn được bao quanh bởi những người bạn chân thành, những người sẵn sàng lắng nghe, sẻ chia và ở cạnh bạn lúc vui lẫn lúc buồn.",
    "Mong tình bạn của lớp mình mãi bền chặt như những đóa hoa không bao giờ héo, càng đi xa càng thấy nhớ, càng lớn càng thấy quý.",
    "Chúc bạn sớm gặp được người thật lòng thương yêu và trân trọng, người nhớ cả những điều nhỏ nhặt nhất về bạn.",
    "Mong gia đình bạn luôn êm ấm, bữa cơm luôn đông vui và bạn luôn có một nơi bình yên để trở về sau mỗi ngày dài.",
    "Chúc những ký ức đại học của bạn thật đẹp, đầy tiếng cười, đầy bạn bè và đủ để một ngày nào đó nhớ lại vẫn thấy lòng ấm áp.",
    "Mong bạn luôn cảm nhận được rằng mình quan trọng biết bao, rằng có rất nhiều người đang âm thầm quý mến và tự hào về bạn.",
    "Chúc bạn được yêu thương nhiều như số cánh hoa trong một vườn xuân, và cho đi yêu thương cũng nhiều như thế.",
    "Mong bạn luôn là mảnh ghép dịu dàng nhất của lớp, nơi mọi người nhìn thấy đều cảm thấy bớt mệt và vui hơn một chút."
  ],
  [ // kết, có {n}
    "Một lần nữa, chúc {n} mãi tươi trẻ, mãi rạng ngời và luôn hạnh phúc. Cảm ơn bạn đã làm cho lớp mình thêm nhiều màu sắc.",
    "Cảm ơn {n} vì đã là một phần không thể thiếu của tập thể. Mong bạn luôn thật vui, thật xinh và thật bình an nhé!",
    "{n} ơi, hôm nay là ngày của bạn, hãy cứ thoải mái tận hưởng thật trọn vẹn. Chúng mình luôn ở đây, luôn mến bạn thật nhiều!",
    "Gửi {n} thật nhiều hoa, thật nhiều yêu thương và cả một bầu trời lời chúc. Mong mọi điều đẹp nhất sẽ luôn tìm đến bạn!",
    "Chúc {n} một ngày 20-10 không chỉ đẹp mà còn thật đáng nhớ. Mong bạn mãi giữ được nụ cười tuyệt vời ấy nhé!",
    "Với tất cả sự quý mến, chúng mình gửi {n} lời chúc ngọt ngào nhất. Mong bạn luôn hạnh phúc, luôn tỏa sáng và luôn thật là chính mình!",
    "Hôm nay, ngày mai và mãi về sau, mong {n} luôn được che chở bởi những điều tốt đẹp. Chúng mình tự hào vì có bạn trong lớp!",
    "{n} nhớ rằng bạn xứng đáng với tất cả những điều tuyệt vời nhất trên đời. Chúc bạn 20-10 thật vui, thật ấm và thật nhiều hoa!"
  ]
];
const SHORT_WISHES = [
  'Luôn xinh đẹp ✿', 'Mãi tươi trẻ ✿', 'Hạnh phúc nhé ✿', 'Nụ cười rạng rỡ ✿',
  'Bình yên mỗi ngày ✿', 'Được yêu thương ✿', 'Thành công rực rỡ ✿', 'Khỏe mạnh, vui vẻ ✿',
  'Tỏa sáng nhé ✿', 'Ngọt ngào như hoa ✿', 'Chúc mừng 20-10 ✿', 'Mãi là cô gái tuyệt vời ✿'
];


/* Tách riêng: dòng "Chúc + họ tên" và đoạn lời chúc ngẫu nhiên */
function buildWish(name) {
  const p = WISH_PARTS.map(x => pick(x));
  p[4] = p[4].replace('{n}', name);
  const first = p[0].charAt(0).toUpperCase() + p[0].slice(1);
  return { head: `Chúc ${name},`, body: `${first} ${p[1]} ${p[2]} ${p[3]} ${p[4]}` };
}

/* ========== HOA TRANG TRÍ (tự thích ứng mọi màn hình) ========== */
function layoutFlowers() {
  const portrait = innerHeight > innerWidth;
  const count = IS_SMALL() ? 12 : 18;
  document.querySelectorAll('.flowers').forEach(box => {
    box.innerHTML = '';
    let made = 0, guard = 0;
    while (made < count && guard++ < 400) {
      const x = rand(1, 92), y = rand(1, 90);
      // chừa vùng giữa cho khung: màn dọc -> chỉ hoa ở dải trên/dưới; màn ngang -> hoa hai bên
      const inside = portrait ? (y > 13 && y < 85) : (x > 20 && x < 74 && y > 6 && y < 92);
      if (inside) continue;
      const f = document.createElement('div');
      f.className = 'flower ' + (Math.random() < .5 ? 'sway' : 'zoom');
      f.textContent = pick(FLOWERS);
      f.style.cssText = `left:${x}%;top:${y}%;--z:${rand(5, 9)};--d:${rand(1.6, 3.6)}s;--dl:${-rand(0, 3)}s`;
      box.appendChild(f); made++;
    }
  });
}
/* Co lá thư vừa màn hình */
function fitEnvelope() {
  const s = Math.min(1.15, (innerWidth - 32) / 420, (innerHeight - 40) / 470);
  document.documentElement.style.setProperty('--s', Math.max(.55, s).toFixed(3));
}
let rt;
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { layoutFlowers(); fitEnvelope(); resize(); }, 200); });

/* ========== PHÁO HOA & NỔ HOA (canvas) ========== */
const cv = $('#fx'), ctx = cv.getContext('2d');
let W, H, parts = [], running = false;
function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
resize();

const SPRITES = FLOWERS.map(e => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const x = c.getContext('2d'); x.font = '46px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(e, 32, 34);
  return c;
});
function firework(x, y) {
  const hue = rand(300, 360), n = IS_SMALL() ? 30 : 56;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n, s = rand(2, 6.5);
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay: rand(.008, .018),
      g: .05, color: `hsl(${hue + rand(-30, 40)},100%,${rand(60, 78)}%)`, r: rand(1.5, 3) });
  }
  loop();
}
function flowerBurst(x, y, n = 10) {
  for (let i = 0; i < n; i++) {
    const a = rand(0, Math.PI * 2), s = rand(3, 9);
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 2, life: 1, decay: rand(.005, .01),
      g: .09, emoji: pick(SPRITES), size: rand(22, 36), rot: rand(0, 6), vr: rand(-.1, .1) });
  }
  loop();
}
function loop() {
  if (running) return; running = true;
  (function step() {
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.life > 0);
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= .985; p.life -= p.decay;
      ctx.globalAlpha = Math.max(p.life, 0);
      if (p.emoji) {
        p.rot += p.vr; const c = Math.cos(p.rot), s = Math.sin(p.rot);
        ctx.setTransform(c, s, -s, c, p.x, p.y); ctx.drawImage(p.emoji, -p.size / 2, -p.size / 2, p.size, p.size);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    if (parts.length) requestAnimationFrame(step); else { running = false; ctx.clearRect(0, 0, W, H); }
  })();
}
function celebrate(times = 1) {
  for (let i = 0; i < times; i++) setTimeout(() => {
    firework(rand(W * .15, W * .85), rand(H * .12, H * .5));
    if (Math.random() < .6) flowerBurst(rand(W * .15, W * .85), rand(H * .2, H * .6));
  }, i * 380);
}

/* ========== CHUYỂN CẢNH: sương hồng mờ + cánh hoa bay ========== */
const veil = $('#veil');
for (let i = 0; i < 14; i++) {
  const p = document.createElement('i');
  p.textContent = pick(FLOWERS);
  p.style.cssText = `left:${rand(0, 95)}%;--x:${rand(-120, 120)}px;--r:${rand(-300, 300)}deg;animation-delay:${rand(0, .5)}s`;
  veil.appendChild(p);
}
async function goTo(id) {
  veil.classList.add('in');
  await sleep(700);
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  const next = $(id); next.classList.add('active'); next.scrollTop = 0;
  await sleep(120);
  veil.classList.remove('in');
}

/* ========== PHẦN 1: MỞ THƯ ========== */
$('#openBtn').addEventListener('click', async () => {
  $('#envelope').classList.add('opening');
  celebrate(2);
  await sleep(2200);                 // thư mở chầm chậm ~2s
  await goTo('#scene-name');
});

/* ========== PHẦN 2: CHỌN TÊN -> LỜI CHÚC ========== */
let chosen = '';
const list = $('#nameList'), nextBtn = $('#nextBtn');
(function renderNames() {
  let lastLetter = '', items;
  NAMES.forEach(name => {
    const g = givenName(name), letter = g.charAt(0).toUpperCase();
    if (letter !== lastLetter) {
      lastLetter = letter;
      const grp = document.createElement('div'); grp.className = 'grp';
      grp.innerHTML = `<span class="letter">${letter}</span><div class="items"></div>`;
      list.appendChild(grp); items = grp.querySelector('.items');
    }
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'name-opt'; b.setAttribute('role', 'option');
    const rest = name.slice(0, name.length - g.length);
    b.innerHTML = `<span class="av">${letter}</span><span>${rest}<b>${g}</b></span>`;
    b.addEventListener('click', () => {
      list.querySelectorAll('.name-opt').forEach(x => { x.classList.remove('sel'); x.setAttribute('aria-selected', 'false'); });
      b.classList.add('sel'); b.setAttribute('aria-selected', 'true');
      chosen = name; nextBtn.disabled = false;
    });
    items.appendChild(b);
  });
})();

nextBtn.addEventListener('click', async () => {
  if (!chosen) return;
  await goTo('#scene-wish');
  openLetter(buildWish(chosen));
});

/* Mở thư: nắp phong thư mở, thiệp bung ra rồi mới viết chữ */
async function openLetter(wish) {
  const mini = $('#miniEnv'), card = $('#wishCard');
  await sleep(700);
  mini.classList.add('open');
  await sleep(1100);
  card.classList.add('show');
  mini.classList.add('gone');
  await sleep(1700);
  writeWish(wish);
}

/* Hiện chữ mượt: từng từ mờ dần + trượt nhẹ, tính giờ bằng requestAnimationFrame */
function wrapWords(el, text) {
  el.textContent = '';
  return text.split(' ').map((w, i, a) => {
    const s = document.createElement('span'); s.className = 'w'; s.textContent = w;
    el.appendChild(s); if (i < a.length - 1) el.appendChild(document.createTextNode(' '));
    return s;
  });
}
function writeWish({ head, body }) {
  $('#afterWish').hidden = true;
  $('#signature').classList.remove('show');
  const words = [...wrapWords($('#wishHead'), head), ...wrapWords($('#wishText'), body)];
  const times = []; let t = 400;
  words.forEach(w => { times.push(t); t += 85 + (/[.,!:]$/.test(w.textContent) ? 260 : 0); });
  celebrate(1);
  const start = performance.now(); let i = 0;
  (function tick(now) {
    while (i < words.length && now - start >= times[i]) {
      words[i].classList.add('on'); i++;
      if (i % 28 === 0) celebrate(1);
    }
    if (i < words.length) return requestAnimationFrame(tick);
    finishWish();
  })(start);
}
async function finishWish() {
  await sleep(900);                         // viết xong lời chúc
  $('#signature').classList.add('show');    // rồi mới ký tên
  await sleep(2400);                        // chữ ký hiện xong hẳn
  celebrate(4);
  $('#afterWish').hidden = false;           // lúc này mới hiện "Xem tiếp"
  $('#afterWish').classList.add('show');
  setTimeout(() => $('#afterWish').scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
}

/* ========== PHẦN 3: VŨ TRỤ, MƯA HOA, KHÉP MÀN ========== */
(function makeStars() {
  const box = $('#stars'), n = IS_SMALL() ? 110 : 200;
  for (let i = 0; i < n; i++) {
    const s = document.createElement('div'), big = Math.random() < .08, z = big ? rand(2.5, 4) : rand(1, 2.2);
    s.className = 'star' + (big ? ' big' : '');
    s.style.cssText = `left:${rand(0, 100)}%;top:${rand(0, 100)}%;width:${z}px;height:${z}px;--d:${rand(2, 6)}s;--dl:${-rand(0, 6)}s`;
    box.appendChild(s);
  }
})();

$('#moreBtn').addEventListener('click', async () => {
  await goTo('#scene-magic');
  rainFlowers(9000);
  await sleep(9500);
  $('#finale').classList.add('show');
  celebrate(6);
  await sleep(7500);
  $('#scene-magic').classList.add('closing');
});

function rainFlowers(ms) {
  const rain = $('#rain'), end = Date.now() + ms, every = IS_SMALL() ? 170 : 110;
  const petalTimer = setInterval(() => {
    if (Date.now() > end) return clearInterval(petalTimer);
    const d = document.createElement('div');
    d.className = 'drop'; d.textContent = pick(FLOWERS);
    d.style.cssText = `left:${rand(0, 100)}%;font-size:${rand(18, 40)}px;--t:${rand(5, 9)}s;--x:${rand(-80, 80)}px;--r:${rand(-360, 360)}deg;opacity:${rand(.7, 1)}`;
    rain.appendChild(d); setTimeout(() => d.remove(), 9500);
  }, every);
  const textTimer = setInterval(() => {
    if (Date.now() > end - 1200) return clearInterval(textTimer);
    const b = document.createElement('div');
    b.className = 'wishbub'; b.textContent = pick(SHORT_WISHES);
    b.style.cssText = `left:${rand(4, 50)}%;--t:${rand(6, 8)}s;--x:${rand(-40, 40)}px;--r:0deg`;
    rain.appendChild(b); setTimeout(() => b.remove(), 8500);
  }, 800);
}

$('#replayBtn').addEventListener('click', () => location.reload());



/* ========== ĐẦU TRANG: hiệu ứng lá thư, lấp lánh, tim bay ========== */
(function intro() {
  if (IS_DESKTOP) return;
  const sp = $('#sparkles');
  for (let i = 0; i < 26; i++) {
    const s = document.createElement('i');
    s.className = 'sp'; s.textContent = pick(['✦', '✧', '✨', '·']);
    s.style.cssText = `left:${rand(2, 96)}%;top:${rand(4, 94)}%;font-style:normal;font-size:${rand(10, 22)}px;--d:${rand(2, 4)}s;--dl:${rand(0, 4)}s`;
    sp.appendChild(s);
  }
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('div');
    h.className = 'heartfloat'; h.textContent = pick(['💗', '💖', '🌸']);
    h.style.cssText = `left:${rand(18, 80)}%;--x:${rand(-40, 40)}px;animation-delay:${3 + i * .9}s`;
    document.body.appendChild(h); h.dataset.h = 1;
  }
  setTimeout(() => $('#envelope').classList.add('ready'), 3500);
})();
addEventListener('animationend', e => { if (e.target.classList?.contains('heartfloat')) e.target.remove(); });
$('#openBtn').addEventListener('click', () => document.querySelectorAll('.heartfloat').forEach(h => h.remove()));

/* ========== MÀN HÌNH LỚN: QR bấm để phóng to ========== */
(function gate() {
  const img = $('#qrImg'), frame = $('#qrBtn'), box = $('#lightbox');
  img.addEventListener('error', () => frame.classList.add('noimg'));
  frame.addEventListener('click', () => { if (!frame.classList.contains('noimg')) box.hidden = false; });
  box.addEventListener('click', () => box.hidden = true);
  addEventListener('keydown', e => { if (e.key === 'Escape') box.hidden = true; });
})();

/* ========== NHẠC NỀN (nhacnen/bainen1..4.mp3, bài 1 phát mặc định) ========== */
(function music() {
  if (IS_DESKTOP) return;
  const TRACKS = [
    { src: 'nhacnen/bainen1.mp3', title: 'Bài nền 1', tag: 'Mặc định' },
    { src: 'nhacnen/bainen2.mp3', title: 'Bài nền 2' },
    { src: 'nhacnen/bainen3.mp3', title: 'Bài nền 3' },
    { src: 'nhacnen/bainen4.mp3', title: 'Bài nền 4' }
  ];
  const au = $('#bgm'), pl = $('#player'), panel = $('#plPanel'), fab = $('#plFab');
  let cur = 0, userPaused = false;
  const fmt = s => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
  au.volume = .7;

  const ul = $('#plList');
  TRACKS.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<button type="button"><span class="n">${i + 1}</span><span class="t">${t.title}${t.tag ? ' · ' + t.tag : ''}</span><span class="d"></span></button>`;
    li.firstChild.addEventListener('click', () => { userPaused = false; load(i); play(); });
    ul.appendChild(li);
  });
  function load(i) {
    cur = (i + TRACKS.length) % TRACKS.length;
    au.src = TRACKS[cur].src;
    $('#plTitle').textContent = TRACKS[cur].title;
    $('#plSub').textContent = TRACKS[cur].tag || 'Nhạc nền';
    [...ul.children].forEach((li, k) => li.classList.toggle('act', k === cur));
    $('#plFill').style.width = '0'; $('#plCur').textContent = '0:00';
  }
  const play = () => au.play().then(() => true).catch(() => false);

  load(0);
  play();                                           // thử phát ngay khi vào trang
  const unlock = async () => {                      // trình duyệt chặn tự phát -> phát ở lần chạm đầu tiên
    if (userPaused || !au.paused) return cleanup();
    if (await play()) cleanup();
  };
  const evs = ['pointerup', 'touchend', 'click', 'keydown'];
  const cleanup = () => evs.forEach(e => removeEventListener(e, unlock, true));
  evs.forEach(e => addEventListener(e, unlock, true));

  au.addEventListener('play', () => pl.classList.add('playing'));
  au.addEventListener('pause', () => pl.classList.remove('playing'));
  au.addEventListener('ended', () => { load(cur + 1); play(); });
  au.addEventListener('loadedmetadata', () => $('#plDur').textContent = fmt(au.duration));
  au.addEventListener('timeupdate', () => {
    $('#plCur').textContent = fmt(au.currentTime);
    $('#plFill').style.width = (au.duration ? au.currentTime / au.duration * 100 : 0) + '%';
  });
  $('#plPlay').addEventListener('click', () => { if (au.paused) { userPaused = false; play(); } else { userPaused = true; au.pause(); } });
  $('#plPrev').addEventListener('click', () => { load(cur - 1); if (!userPaused) play(); });
  $('#plNext').addEventListener('click', () => { load(cur + 1); if (!userPaused) play(); });
  $('#plBar').addEventListener('click', e => {
    const r = e.currentTarget.getBoundingClientRect();
    if (au.duration) au.currentTime = ((e.clientX - r.left) / r.width) * au.duration;
  });
  fab.addEventListener('click', e => {
    e.stopPropagation();
    panel.hidden = !panel.hidden; fab.setAttribute('aria-expanded', String(!panel.hidden));
  });
  document.addEventListener('click', e => { if (!pl.contains(e.target) && !panel.hidden) { panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); } });
})();


/* ========== BỘ ĐẾM LƯỢT TRUY CẬP ==========
   - Dùng dịch vụ CounterAPI (miễn phí, không cần máy chủ riêng).
   - Mỗi thiết bị chỉ được tính 1 lần (nhớ bằng localStorage), tải lại trang không tăng thêm.
   - CHỦ WEB: mở link kèm  ?admin=1  một lần trên mỗi thiết bị của bạn -> thiết bị đó không bao giờ được tính.
     (muốn tính lại thì mở link kèm  ?admin=0 ) */
(function visitCounter() {
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch {} },
    del: k => { try { localStorage.removeItem(k); } catch {} }
  };
  const q = new URLSearchParams(location.search);
  if (q.get('admin') === '1') store.set('tl_owner', '1');
  if (q.get('admin') === '0') store.del('tl_owner');
  if (IS_DESKTOP) return;                                  // màn hình lớn chỉ hiện mã QR, không tính

  const KEY = 'ktpm68-20-10-2026';
  const PROVIDERS = [   // thử lần lượt, dịch vụ nào trả lời trước thì dùng
    { name: 'counterapi', up: `https://api.counterapi.dev/v1/${KEY}/luot-ghe-tham/up`, get: `https://api.counterapi.dev/v1/${KEY}/luot-ghe-tham`,
      read: d => d.count ?? d.Count ?? d.value ?? d.data?.up_count },
    { name: 'countapi', up: `https://countapi.mileshilliard.com/api/v1/hit/${KEY}-luot-ghe-tham`, get: `https://countapi.mileshilliard.com/api/v1/get/${KEY}-luot-ghe-tham`,
      read: d => d.value ?? d.count ?? d.Count }
  ];
  const owner = store.get('tl_owner') === '1';
  const counted = store.get('tl_counted') === '1';
  const el = $('#vCount'), box = $('#visits');
  const debug = q.get('debug') === '1';
  const log = msg => { if (!debug) return; let d = $('#vDebug'); if (!d) { d = document.createElement('div'); d.id = 'vDebug'; d.className = 'v-debug'; document.body.appendChild(d); } d.textContent += msg + ' | '; };
  el.classList.add('load');
  if (owner) $('#vOwner').hidden = false;
  log(`owner=${owner} counted=${counted}`);

  function show(n) {
    el.classList.remove('load');
    if (!Number.isFinite(n)) { el.textContent = store.get('tl_last') || '—'; return; }
    store.set('tl_last', n.toLocaleString('vi-VN'));
    const t0 = performance.now(), dur = 1300, from = Math.max(0, n - Math.min(n, 40));
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (n - from) * e).toLocaleString('vi-VN');
      if (p < 1) requestAnimationFrame(step); else { box.classList.add('pop'); }
    })(t0);
  }
  async function ask(p, countIt) {
    const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 7000);
    try {
      const r = await fetch(countIt ? p.up : p.get, { cache: 'no-store', signal: ctl.signal });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const n = Number(p.read(await r.json()));
      if (!Number.isFinite(n)) throw new Error('khong doc duoc so');
      return n;
    } finally { clearTimeout(tm); }
  }
  (async () => {
    const countIt = !owner && !counted;                  // chỉ người khác, lần đầu mới +1
    for (const p of PROVIDERS) {
      try {
        const n = await ask(p, countIt);
        log(`${p.name} OK ${n}`);
        if (countIt) store.set('tl_counted', '1');
        return show(n);
      } catch (e) { log(`${p.name} loi: ${e.message}`); }
    }
    show(NaN);
  })();
})();

fitEnvelope(); layoutFlowers();
