/* ══════════════════════════════════════════════════════════════════════════
   운석 재질 후보 — **보석(A안)**. `rock.js`(정본 — 무채 3단 + 크레이터 안벽
   틴트 + 광맥 발광)와 `rock-fissure.js`(균열 B안, 정본으로 확정)와 나란히
   검토됐던 「패싯 크리스탈」 방향이다.

   ⚠️⚠️ **정본이 아니다.** 2026-08-24 사용자 판정 — 색 운석 자리는 균열(B안)
     로 확정됐다. 몸통 자체를 등급색 보석으로 칠하는 이 안은 「보석으로
     읽힌다」는 이유로 색 운석 자리에서 빠졌다. 버리지 않고 **다른 종류의
     운석 보석** 후보로 여기 킵해 둔다 — 정본이던 동안 실제로 `rock.js` 의
     `rkStone`/`rock_paint.dart` 의 `paintOreStone` 에 있었다(2026-08-24
     하루 동안). 다시 자리를 얻으면 그때의 접두로 새로 정리한다.

   재질 언어 — 정본이던 동안의 그대로:
   · 등급 색의 그늘·몸·앞날 세 값을 축으로 **계단식 다섯 단**을 짠다
     (그라디언트가 아니라 사이 값 없는 다섯 칸).
   · 실루엣 그늘 쪽에 몸의 가장 밝은 단보다도 밝은 **금속 테**를 두른다
     (흰색 65% — 몸의 가장 밝은 단과 확실히 갈리게).
   · 가장 밝은 자리에 별빛 **스파클**(`IBspark`)을 얹는다.

   ⚠️ `rock.js` 의 정본 몸은 다면체(`rkSolidFaces`)를 삼각형 면 단위로 굽지만,
     여기는 **후보 보관용**이라 그 무게를 다 안 옮긴다. 대신 `rock.js` 의
     조각(`rkB`/`rkD`)이 쓰는 「광원 축으로 민 판을 겹쳐 계단을 만드는」
     더 가벼운 기법을 다섯 단으로 늘려 같은 인상을 낸다 — 실제 다면체 위에서
     다시 살릴 때는 이 파일이 아니라 `rock.js` 의 `rkSolidFaces` 위에서 다시
     짜야 한다(이 파일의 몸은 근사다).

   `vfx.js` 가 이미 실려 있다고 가정한다(A · hash · TAU · jagPoly · fillPoly ·
   celStroke · celHoop · IBspark · TONE · MOUNT). 이름은 전부 rg/RG_ 로
   접두해 `rk`/`RK_`(rock.js) · `rf`/`RF_`(rock-fissure.js)와 안 겹치게 한다.
   ══════════════════════════════════════════════════════════════════════════ */

const RG_LA = 0.70, RG_LX = Math.cos(RG_LA), RG_LY = Math.sin(RG_LA);

function rgFit(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || +cv.getAttribute('width');
  const h = cv.clientHeight || +cv.getAttribute('height');
  if (cv.width !== Math.round(w * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
  }
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.lineJoin = 'round';
  c.lineCap = 'round';
  return [c, w, h];
}

const RG_BG = '#0A0910';

// 덩어리 실루엣 — `rock.js` 의 `RK_N`/`RK_SPIKE` 와 같은 값(9·0.8 이 별이
// 아니라 돌로 읽히는 지점).
const RG_N = 9, RG_SPIKE = 0.8;

// 등급 → 톤. 이름은 새로 짓지 않는다 — `lib/game/rock_view.dart` 의
// `kRockGradeTones` 가 직결하는 `vfx.js` 의 TONE 키를 그대로 쓴다
// (`rock.js` 의 `RK_KIND`·`rock-fissure.js` 의 `RF_GRADES` 와 같은 넷).
const RG_GRADES = [
  ['ember', '공격'],
  ['blast', '치명'],
  ['magnet', '생존'],
  ['murk', '중력'],
];
const rgTone = (k) =>
  (typeof TONE !== 'undefined' && TONE[k]) || ['#123A5E', '#4FC3F7', '#E8F8FF'];

/// 16진 색 둘을 섞는다 — 사다리·테를 짜는 산수 하나뿐이다(그림 원시함수가
/// 아니다). 정본이던 동안 엔진의 `_mixArgb`(`rock_paint.dart`)와 같은 식이었다.
function rgMix(a, b, k) {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = (sh) => Math.round(((pa >> sh) & 0xFF) +
    (((pb >> sh) & 0xFF) - ((pa >> sh) & 0xFF)) * k);
  return '#' + [16, 8, 0].map((sh) => ch(sh).toString(16).padStart(2, '0'))
    .join('');
}

/// 등급의 세 값(그늘·몸·앞날)을 축으로 **다섯 단**을 짠다. 그라디언트가
/// 아니라 **사이 값 없는 다섯 칸**이다.
function rgLadder(T) {
  return [T[0], rgMix(T[0], T[1], 0.5), T[1], rgMix(T[1], T[2], 0.55), T[2]];
}

/// 실루엣의 금속 테 — 몸의 가장 밝은 단([T[2]])보다도 밝다. 흰색을 65%
/// 섞는다 — 「생존」처럼 T[2] 자체가 이미 순백에 가까운 등급에서도 몸의
/// 가장 밝은 단과 확실히 갈리려면 그만큼 섞어야 한다.
function rgRim(T) { return rgMix(T[2], '#FFFFFF', 0.65); }

/// 몸 — 다섯 단을 광원 축으로 겹쳐 쌓는다. `rock.js` 의 `rkB`(3단짜리)를
/// 다섯 단으로 늘린 것과 같은 문법: 판마다 광원 쪽으로 조금씩 더 밀고
/// 조금씩 줄여, 밀린 만큼만 다음 단이 드러나게 한다.
function rgBody(c, r, seed, rot, g, ladder) {
  const cs = Math.cos(rot), sn = Math.sin(rot);
  const ux = RG_LX * cs + RG_LY * sn, uy = -RG_LX * sn + RG_LY * cs;
  const step = (gg, rr, col) =>
    fillPoly(c, jagPoly(-ux * r * gg, -uy * r * gg * 0.94,
      Math.max(0.35, rr), RG_N, seed, RG_SPIKE, 0.94), A(col, 1));
  const n = ladder.length;
  for (let i = 0; i < n; i++) {
    const gg = g * (i / (n - 1));
    step(gg, r * (1 - 1.15 * gg), ladder[i]);
  }
}

/// 운석 한 알. [x,y] 는 화면 좌표, [r] 은 반지름, [seed] 는 개체차, [t] 는
/// 초 단위 진행 시간, [key] 는 등급 톤 키.
function rgGem(c, x, y, r, seed, t, key) {
  const T = rgTone(key);
  const ladder = rgLadder(T);
  const rim = rgRim(T);
  const bob = Math.sin(t * 0.7 + seed) * r * 0.05;
  const yy = y + bob;
  const rot = seed + t * 0.15;
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seed);

  // 그림자 — 어두운 속 + 밝은 테. 부유하는 몸과 안 겹치게 흔들리지 않는다.
  const sh = r * 0.74;
  c.save();
  c.globalAlpha = 0.6;
  c.beginPath();
  c.ellipse(x, y + r * 1.1, sh, sh * 0.26, 0, 0, TAU);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.1, sh, 0.26, 0, Math.max(1.4, r * 0.05), key, 0.3);

  c.save();
  c.translate(x, yy);
  c.rotate(rot);

  rgBody(c, r, seed, rot, 0.62, ladder);

  const bodyPoly = jagPoly(0, 0, r, RG_N, seed, RG_SPIKE, 0.94);
  const bodyPath = () => {
    c.beginPath();
    bodyPoly.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
    c.closePath();
  };

  // 금속 테 — 그늘 쪽 실루엣에만, 몸의 가장 밝은 단보다도 밝게(`rgRim`).
  // 일반 운석의 림라이트보다 밝고 두껍다 — 「금속감」은 여기서만 선다.
  const rimAng = Math.atan2(RG_LY, RG_LX) + Math.PI - rot;
  c.strokeStyle = A(rim, 0.5);
  c.lineWidth = Math.max(1.1, r * 0.032);
  c.beginPath();
  c.arc(0, 0, r * 0.97, rimAng - 1.05, rimAng + 1.05);
  c.stroke();

  c.save();
  bodyPath();
  c.clip();

  // 안쪽 면 경계 — 다섯 단이 사이 값 없이 갈리는 자리를 옅은 골로 짚는다.
  // ⚠️ 몸이 이미 층층이 밀린 판이라 경계가 동심원으로 나온다 — 실제
  //   다면체(`rkSolidFaces`)라면 이 자리에 면 경계가 선다.
  for (let i = 1; i < ladder.length; i++) {
    const cs = Math.cos(rot), sn = Math.sin(rot);
    const ux = RG_LX * cs + RG_LY * sn, uy = -RG_LX * sn + RG_LY * cs;
    const gg = 0.62 * (i / (ladder.length - 1));
    c.strokeStyle = A('#04030A', 0.30);
    c.lineWidth = Math.max(0.6, r * 0.01);
    c.beginPath();
    c.arc(-ux * r * gg, -uy * r * gg * 0.94, Math.max(0.35, r * (1 - 1.15 * gg)),
      0, TAU);
    c.stroke();
  }

  c.restore(); // 클립 끝

  c.strokeStyle = A('#04030A', 0.4);
  c.lineWidth = Math.max(0.7, r * 0.012);
  bodyPath();
  c.stroke();

  // 스파클 — 가장 밝은 자리(광원 쪽) 근처 둘. 실제 다면체가 없어 「가장
  // 밝은 면 둘의 무게중심」을 광원 방향으로 근사한 두 점으로 대신한다.
  const cs2 = Math.cos(rot), sn2 = Math.sin(rot);
  const ux2 = RG_LX * cs2 + RG_LY * sn2, uy2 = -RG_LX * sn2 + RG_LY * cs2;
  const sparkA = [-ux2 * r * 0.50, -uy2 * r * 0.50 * 0.94];
  const spAng = Math.atan2(-uy2, -ux2) + 0.9 + hash(seed * 6.1) * 0.6;
  const sparkB = [Math.cos(spAng) * r * 0.30, Math.sin(spAng) * r * 0.30];
  IBspark(c, sparkA[0], sparkA[1], r * 0.16, key, 0.55 + 0.45 * pulse,
    seed * 6.2);
  IBspark(c, sparkB[0], sparkB[1], r * 0.12, key, 0.4 + 0.35 * (1 - pulse),
    seed * 9.4 + 2.1);

  c.restore(); // translate/rotate 끝

  // 몸 둘레로 번지는 빛 — 몸에 딱 붙는다, 넓으면 빛나는 구름이 된다.
  c.save();
  c.globalCompositeOperation = 'lighter';
  const gg = c.createRadialGradient(x, yy, r * 0.8, x, yy, r * 1.2);
  gg.addColorStop(0, A(T[1], 0.08 + 0.04 * pulse));
  gg.addColorStop(1, A(T[1], 0));
  c.fillStyle = gg;
  c.beginPath();
  c.arc(x, yy, r * 1.2, 0, TAU);
  c.fill();
  c.restore();
}

/// 배경 별 — 단층 정지 산포(`rock-fissure.js` 의 `rfStars` 와 같은 것).
function rgStars(c, w, h, n, seed) {
  for (let i = 0; i < n; i++) {
    const x = hash(seed + i * 3.7) * w;
    const y = hash(seed + i * 5.9 + 50) * h;
    const rr = 0.5 + 1.1 * hash(seed + i * 7.1 + 90);
    c.beginPath();
    c.arc(x, y, rr, 0, TAU);
    c.fillStyle = A('#8A93B4', 0.22 + 0.35 * hash(seed + i * 2.3 + 20));
    c.fill();
  }
}

function rgLabel(c, label, key, x, y) {
  const T = rgTone(key);
  c.textAlign = 'center';
  c.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  c.fillStyle = A(T[1], 0.95);
  c.fillText(label, x, y);
  c.font = "400 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  c.fillStyle = A('#7D7288', 0.8);
  c.fillText(key, x, y + 15);
}

function rgGradePanel(cv, t) {
  const [c, w, h] = rgFit(cv);
  c.clearRect(0, 0, w, h);
  c.fillStyle = RG_BG;
  c.fillRect(0, 0, w, h);
  rgStars(c, w, h, 70, 4.13);
  const n = RG_GRADES.length;
  const cellW = w / n;
  RG_GRADES.forEach(([key, label], i) => {
    const cx = cellW * i + cellW / 2;
    const cy = h * 0.44;
    const r = Math.min(cellW, h) * 0.30;
    rgGem(c, cx, cy, r, i * 5.1 + 2, t + i * 1.3, key);
    rgLabel(c, label, key, cx, h * 0.88);
  });
}

let rgT0 = null;
function rgFrame(ms) {
  if (rgT0 === null) rgT0 = ms;
  const t = (ms - rgT0) / 1000;
  const cv = MOUNT('rg-grade');
  if (cv) rgGradePanel(cv, t);
  requestAnimationFrame(rgFrame);
}
requestAnimationFrame(rgFrame);
