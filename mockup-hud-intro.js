// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-intro.js — 화면 1 「게임 진입 인트로」 + 키트 카탈로그 그림
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HI`/`hi` 로 격리한다
// (이 페이지만 쓰는 값이라 `hud.js` 에는 안 둔다 — 예: 부팅 주기 [HIT] 는
// 이 화면만의 연출 길이지 키트가 강제할 값이 아니다).
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 부팅 시퀀스 타임라인 ─────────────────────────────────────────────────
// ⚠️⚠️ **한 스케줄에서 다 뽑는다.** [HIT] 하나로 나눈 `u=(t%HIT)/HIT` 가
//   프레임 위치의 유일한 출처다 — 「진행률」·「문구」·「밝기」모두 이 [u] 의
//   순수 함수라, 실시간 루프에도 고정 갈무리(아래 [hiFreeze])에도 같은 값을
//   넣으면 같은 그림이 나온다. 누적기나 "지난 프레임과의 차이" 로 진행을
//   추적하지 않는다 — 그 값은 탭이 백그라운드에 있다 돌아오는 순간처럼
//   프레임이 스킵되면 실제 시간과 어긋난다.
const HIT = 6.4;
const HISEGS = [
  { start: 0.00, end: 0.05, label: "" },
  { start: 0.05, end: 0.26, label: "SEARCHING" },
  { start: 0.26, end: 0.62, label: "LOADING", pFrom: 0, pTo: 100 },
  { start: 0.62, end: 0.72, label: "SYSTEM ONLINE" },
  { start: 0.72, end: 0.94, label: "TOUCH TO START" },
  { start: 0.94, end: 1.00, label: "" },
];
// hudOpenLoop 창 — [o0,oDur] 동안 자라고 [hold]까지 유지, [cDur] 동안 접는다.
// u=0·u=1 양끝이 전부 0(암전)이라 되풀이해도 이음매가 없다.
const HIENV = { o0: 0.02, oDur: 0.18, hold: 0.90, cDur: 0.07 };

// ══════════════════════════════════════════════════════════════════════════
// 타이틀 로고 — 재료를 직접 깎는다(폰트를 안 쓴다)
//
// ⭐⭐ **글자를 폴리곤으로 직접 정의한다.** `LIGHT SURVIVAL` 의 고유 글자
//   10개(L I G H T S U R V A) 전부를 「바(bar) 목록」으로 손으로 짰다 —
//   바란 두 점을 잇는 두께 있는 막대 하나([hiBarPoly]). 세로 획은 굵고
//   (1.15유닛) 가로 획은 가늘다(0.55유닛), 획 끝은 각지게 뽑은 스퍼(spur)로
//   마무리한다(『뾰족한 돌기』). 글자마다 격자 폭이 다르다(I=6 ↔ G=10.8) —
//   전부 똑같으면 폰트로 보인다.
//
// ⭐⭐ **그 위에 층을 쌓는다**(뒤→앞, 한 글자 폴리곤 전체에 매번 다시 칠한다):
//   ① 후광(넓게 흐리게, 가산) → ② 압출(같은 폴리곤을 조금씩 어긋나게 여러 겹,
//   어두운 색 — 두께) → ③ 정면 그라디언트(위 밝고 아래 어둡다, 암석↔결정을
//   `mat` 로 섞는다) → ④ 베벨(폭을 줄인 같은 폴리곤을 더 밝게, 안쪽 경사면)
//   → ⑤ 위쪽 모서리 하이라이트(가늘고 밝은 선, 알파가 위→아래로 죽는다).
//
// ⭐ **엠블럼도 이 저장소 안에서 직접 짰다** — 균열이 있는 결정(육각 바 +
//   가로지르는 균열선 + 새는 빛) 을 톱니 고리(짧은 방사 바 스물 + 긴 스파이크
//   여섯)가 두른다. `LIGHT` 를 가로지르는 균열의 한가운데, 글자들 **뒤에서**
//   빛나 「균열 속에서 캐낸 빛의 결정」으로 읽히게 앉혔다.
//
// ⚠️⚠️ **폰트를 안 쓰는 이유는 미감이 아니라 엔진 제약이다.** `pubspec.yaml`
//   확인 — `uses-material-design: false`, 커스텀 폰트 선언 0개, `assets/` 에
//   `.ttf`/`.otf` 없음. `fillText` 를 쓰면 플랫폼 기본 폰트가 기기마다 달라
//   로고가 기기마다 다르게 보인다. 폴리곤 좌표는 폰트 없이 어디서나 같다.
//
// ── 이 게임의 이야기 ────────────────────────────────────────────────────
// 균열(rock-fissure.js 의 「어두운 덩어리 틈에서 빛이 샌다」— 문서만 읽고
// 기법의 뜻만 가져왔다) · 빛의 결정(엠블럼 코어) · 채굴 빔(엠블럼에서 위로
// 뻗는 광주) · 성좌(엠블럼에서 네 귀퉁이 판독값까지 잇는 가는 선 — 그래서
// 귀퉁이 HUD 가 로고와 무관한 장식이 아니라 「같은 리액터가 보내는 신호」로
// 읽힌다).
//
// ── ⚙️ 엔진 대응(Flutter `CustomPainter`) ─────────────────────────────────
//   좌표 배열(바 폴리곤)                    → `Path()` (moveTo/lineTo/close) — 폰트보다 이식이 쉽다(좌표라 그대로 옮겨진다)
//   c.fill()                               → `canvas.drawPath(path, Paint()..style=PaintingStyle.fill)`
//   c.createLinearGradient + addColorStop   → `ui.Gradient.linear(colors, stops)` → `Paint.shader`
//   c.shadowColor/shadowBlur                → `Paint.maskFilter = MaskFilter.blur(BlurStyle.normal, sigma)`
//   c.globalCompositeOperation="lighter"    → `Paint.blendMode = BlendMode.plus`
//   c.save/translate/restore                → `canvas.save()/translate()/restore()`
//   mixHex(a,b,k)                           → `Color.lerp(a,b,k)`
//   전부 `dart:ui`/`Canvas` 표준 기능이고 추가 패키지가 없다.

/// 세로 획 굵기(유닛) — 격자 세로 14 · 가로는 글자마다 다르다.
const HIW = { thick: 1.15, thin: 0.55, med: 0.85 };
const HIROCK = ["#050A10", "#0A141E", "#0F1B28"];   // 재질 0(암석) 쪽 3단

/// 바 하나의 닫힌 다각형 — 끝을 각지게 뽑거나(spur>0) 이웃 바와 자연히
/// 이어붙게 살짝 늘린다(join, 관절이 갈라져 보이는 것을 막는다).
function hiBarPoly(ax, ay, bx, by, w, spurA, spurB, join) {
  const dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
  const ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
  const ax2 = ax - ux * join, ay2 = ay - uy * join;
  const bx2 = bx + ux * join, by2 = by + uy * join;
  const p = [];
  if (spurA > 0) { p.push([ax2 + nx * w, ay2 + ny * w]); p.push([ax2 - ux * spurA, ay2 - uy * spurA]); p.push([ax2 - nx * w, ay2 - ny * w]); }
  else { p.push([ax2 + nx * w, ay2 + ny * w]); p.push([ax2 - nx * w, ay2 - ny * w]); }
  if (spurB > 0) { p.push([bx2 - nx * w, by2 - ny * w]); p.push([bx2 + ux * spurB, by2 + uy * spurB]); p.push([bx2 + nx * w, by2 + ny * w]); }
  else { p.push([bx2 - nx * w, by2 - ny * w]); p.push([bx2 + nx * w, by2 + ny * w]); }
  return p;
}
/// 폴리라인 한 구간의 굵기 — `w:'auto'` 인 다구간 글자(G·S·U·R·V)에서
/// 구간의 방향으로 정한다(세로 성분이 크면 굵게).
function hiSegW(kind, dx, dy) {
  if (kind !== "auto") return HIW[kind];
  if (Math.abs(dy) > Math.abs(dx) * 1.3) return HIW.thick;
  if (Math.abs(dx) > Math.abs(dy) * 1.3) return HIW.thin;
  return HIW.med;
}
// 글자 10개 — 격자는 x:0..(글자 폭) · y:0(위)..14(바닥). `s0`/`s1` 은
// 폴리라인의 첫/끝점에 스퍼를 뽑을지(1) 말지(0, 이웃 획에 그대로 잇긴다).
const HILETTERS = {
  L: [
    { pts: [[2.3, 0.6], [2.3, 12.8]], w: "thick", s0: 1, s1: 0 },
    { pts: [[2.3, 12.8], [8.6, 12.8]], w: "thin", s0: 0, s1: 1 },
  ],
  I: [
    { pts: [[3, 0.6], [3, 13.4]], w: "thick", s0: 1, s1: 1 },
    { pts: [[1.2, 0.6], [4.8, 0.6]], w: "thin", s0: 1, s1: 1 },
    { pts: [[1.2, 13.4], [4.8, 13.4]], w: "thin", s0: 1, s1: 1 },
  ],
  G: [{ pts: [[9, 2.8], [7, 0], [3, 0], [0, 2.8], [0, 11.2], [3, 14], [7, 14], [10, 11.2], [10, 7.47], [5.5, 7.47]], w: "auto", s0: 1, s1: 1 }],
  H: [
    { pts: [[1.3, 0.6], [1.3, 13.4]], w: "thick", s0: 1, s1: 1 },
    { pts: [[8.7, 0.6], [8.7, 13.4]], w: "thick", s0: 1, s1: 1 },
    { pts: [[1.3, 6.8], [8.7, 6.8]], w: "thin", s0: 0, s1: 0 },
  ],
  T: [
    { pts: [[0.5, 0.6], [9.5, 0.6]], w: "thin", s0: 1, s1: 1 },
    { pts: [[5, 0.6], [5, 13.4]], w: "thick", s0: 0, s1: 1 },
  ],
  S: [{ pts: [[9, 2.8], [6.3, 0], [2.7, 0], [0, 2.8], [0, 6.07], [2.7, 7], [6.3, 7], [9, 7.93], [9, 11.2], [6.3, 14], [2.7, 14], [0, 11.2]], w: "auto", s0: 1, s1: 1 }],
  U: [{ pts: [[0, 0.4], [0, 10.4], [3, 13], [7, 13], [10, 10.4], [10, 0.4]], w: "auto", s0: 1, s1: 1 }],
  R: [
    { pts: [[0, 14], [0, 0], [7, 0], [10, 2.8], [10, 4.67], [7, 7.47], [0, 7.47]], w: "auto", s0: 1, s1: 0 },
    { pts: [[5, 7.47], [10, 14]], w: "thick", s0: 0, s1: 1 },
  ],
  V: [{ pts: [[0, 0.6], [5, 13.6], [10, 0.6]], w: "auto", s0: 1, s1: 1 }],
  A: [
    { pts: [[0, 13.6], [5, 0.6]], w: "thick", s0: 1, s1: 1 },
    { pts: [[5, 0.6], [10, 13.6]], w: "thick", s0: 1, s1: 1 },
    { pts: [[2.6, 9.5], [7.4, 9.5]], w: "thin", s0: 0, s1: 0 },
  ],
};
const HIADV = { L: 9.0, I: 6.0, G: 10.8, H: 10.8, T: 10.5, S: 9.5, U: 10.5, R: 10.8, V: 10.5, A: 10.5, " ": 6 };
const HIGAP = 1.3;
function hiWordWidthUnits(str) { let w = 0; for (const ch of str) w += (HIADV[ch] || 8) + HIGAP; return w - HIGAP; }

/// 글자 하나의 바 폴리곤 목록(유닛 좌표) — `wScale` 을 주면 전부 그만큼
/// 가늘게 다시 뽑는다(베벨 안쪽 겹이 이걸 쓴다 — 새 도형이 아니라 같은
/// 중심선을 더 얇게 되그린 것).
function hiLetterPolys(ch, wScale) {
  const strokes = HILETTERS[ch]; if (!strokes) return [];
  const ws = wScale == null ? 1 : wScale, out = [];
  strokes.forEach((st) => {
    const pts = st.pts, n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const w = hiSegW(st.w, b[0] - a[0], b[1] - a[1]) * ws;
      const spurA = (i === 0 && st.s0) ? 1.0 * ws : 0;
      const spurB = (i === n - 2 && st.s1) ? 1.0 * ws : 0;
      out.push(hiBarPoly(a[0], a[1], b[0], b[1], w, spurA, spurB, 0.35));
    }
  });
  return out;
}
function hiFillPolys(c, polys, style) {
  c.fillStyle = style;
  polys.forEach((p) => { c.beginPath(); p.forEach((pt, i) => i ? c.lineTo(pt[0], pt[1]) : c.moveTo(pt[0], pt[1])); c.closePath(); c.fill(); });
}
/// 글자 하나 — 다섯 겹(후광·압출·정면·베벨·하이라이트)을 순서대로 쌓는다.
function hiDrawLetter(c, ch, x0, y0, unit, mat, glow, ext) {
  const full = hiLetterPolys(ch, 1).map((p) => p.map((q) => [x0 + q[0] * unit, y0 + q[1] * unit]));
  if (!full.length) return;
  const bevel = hiLetterPolys(ch, 0.52).map((p) => p.map((q) => [x0 + q[0] * unit, y0 + q[1] * unit]));
  const T = toneOf(HUDK);
  // ① 후광
  if (glow > 0.02) {
    c.save();
    c.shadowColor = A(T[1], Math.min(1, glow)); c.shadowBlur = unit * 1.1 * glow;
    hiFillPolys(c, full, A(T[1], 0.5 * glow));
    c.restore();
  }
  // ② 압출 — 같은 폴리곤을 압출 방향으로 조금씩 어긋나게 여러 겹, 어둡게.
  const steps = 6;
  const backCol = mixHex(mixHex(HIROCK[0], "#000000", 0.35), mixHex(T[0], "#000000", 0.15), mat);
  for (let i = 0; i < steps; i++) {
    const k = i / (steps - 1);
    c.save(); c.translate(ext[0] * (1 - k) * unit * 0.11, ext[1] * (1 - k) * unit * 0.11);
    hiFillPolys(c, full, backCol);
    c.restore();
  }
  // ③ 정면 — 그라디언트(위 밝고 아래 어둡다). 암석(mat=0)↔결정(mat=1)을 섞는다.
  let ys = Infinity, ye = -Infinity;
  full.forEach((p) => p.forEach((q) => { if (q[1] < ys) ys = q[1]; if (q[1] > ye) ye = q[1]; }));
  const g = c.createLinearGradient(0, ys, 0, ye);
  g.addColorStop(0, mixHex(HIROCK[2], T[2], mat));
  g.addColorStop(0.55, mixHex(HIROCK[1], T[1], mat));
  g.addColorStop(1, mixHex(HIROCK[0], T[0], mat));
  hiFillPolys(c, full, g);
  // ④ 베벨 — 폭을 줄인 같은 획을 더 밝게(안쪽 경사면).
  if (mat > 0.04) {
    const bg = c.createLinearGradient(0, ys, 0, ye);
    bg.addColorStop(0, A("#FFFFFF", 0.55 * mat)); bg.addColorStop(0.5, A(T[2], 0.30 * mat)); bg.addColorStop(1, A(T[1], 0.10 * mat));
    hiFillPolys(c, bevel, bg);
  }
  // ⑤ 위쪽 모서리 하이라이트 — 가는 밝은 선, 알파가 위→아래로 죽는다.
  if (mat > 0.05) {
    const hg = c.createLinearGradient(0, ys, 0, ys + (ye - ys) * 0.5);
    hg.addColorStop(0, A("#FFFFFF", 0.9 * mat)); hg.addColorStop(1, A("#FFFFFF", 0));
    c.strokeStyle = hg; c.lineWidth = Math.max(0.6, unit * 0.05); c.lineJoin = "round";
    full.forEach((p) => { c.beginPath(); p.forEach((pt, i) => i ? c.lineTo(pt[0], pt[1]) : c.moveTo(pt[0], pt[1])); c.closePath(); c.stroke(); });
  }
}
/// 한 단어 — 가운데 정렬. 반환값은 실제 폭(px).
function hiDrawWord(c, str, cx, y0, unit, mat, glow, ext) {
  const w = hiWordWidthUnits(str) * unit; let x = cx - w / 2;
  for (const ch of str) {
    const adv = HIADV[ch] || 8;
    if (ch !== " ") hiDrawLetter(c, ch, x, y0, unit, mat, glow, ext);
    x += (adv + HIGAP) * unit;
  }
  return w;
}

// ── 엠블럼 — 균열 결정 + 톱니 고리(직접 깎은 것, 이 게임의 어휘) ─────────
/// 방사 바 하나(짧은 눈금 또는 긴 스파이크) — 고리 중심에서 뻗는다.
function hiSpoke(c, cx, cy, aRad, r0, r1, w, style) {
  const x0 = cx + Math.cos(aRad) * r0, y0 = cy + Math.sin(aRad) * r0;
  const x1 = cx + Math.cos(aRad) * r1, y1 = cy + Math.sin(aRad) * r1;
  hiFillPolys(c, [hiBarPoly(x0, y0, x1, y1, w, 0, w * 0.9, w * 0.3)], style);
}
/// 엠블럼 — 육각 결정(균열 + 새는 빛) 을 톱니 고리가 두른다. `crack` 은
/// 갈라짐 정도, `lit` 는 결정이 물든 정도, `flash` 는 온라인 섬광.
function hiEmblem(c, cx, cy, r, tAbs, crack, lit, flash) {
  const T = toneOf(HUDK);
  // 고리 — 짧은 눈금 스무 개(회전) + 긴 스파이크 여섯.
  c.save(); c.translate(cx, cy); c.rotate(tAbs * 0.10);
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * TAU;
    hiSpoke(c, 0, 0, a, r * 0.86, r * 1.02, r * 0.05, A(mixHex("#3A4A58", T[1], lit * 0.6), 0.7));
  }
  c.restore();
  c.save(); c.translate(cx, cy); c.rotate(-tAbs * 0.06);
  for (let i = 0; i < 6; i++) {
    const a = i * (TAU / 6);
    const g = c.createLinearGradient(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7, Math.cos(a) * r * 1.55, Math.sin(a) * r * 1.55);
    g.addColorStop(0, mixHex("#4A5A68", T[0], lit)); g.addColorStop(0.6, mixHex("#B9C6D0", T[2], lit)); g.addColorStop(1, mixHex("#5C6C7A", T[1], lit));
    hiSpoke(c, 0, 0, a, r * 0.70, r * 1.55, r * 0.16, g);
  }
  c.restore();
  // 안쪽 원판 — 어두운 바탕.
  c.beginPath(); c.arc(cx, cy, r * 0.66, 0, TAU); c.fillStyle = "#060B12"; c.fill();
  // 육각 결정 — 바 여섯으로 짠 정육각 테두리 + 균열선 + 새는 빛.
  const hexPts = []; for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + i * (TAU / 6); hexPts.push([cx + Math.cos(a) * r * 0.5, cy + Math.sin(a) * r * 0.5]); }
  const hexBars = []; for (let i = 0; i < 6; i++) hexBars.push(hiBarPoly(hexPts[i][0], hexPts[i][1], hexPts[(i + 1) % 6][0], hexPts[(i + 1) % 6][1], r * 0.07, 0, 0, r * 0.05));
  const hg = c.createLinearGradient(cx, cy - r * 0.5, cx, cy + r * 0.5);
  hg.addColorStop(0, mixHex("#152233", T[2], lit)); hg.addColorStop(1, mixHex("#0A121C", T[0], lit));
  hiFillPolys(c, hexBars, hg);
  // 속을 채운 면(가운데가 어둡게 빛나는 결정 몸통)
  fillPoly(c, jagPoly(cx, cy, r * 0.42, 6, 3, 1.15), mixHex("#0C1A28", T[0], lit * 0.8));
  fillPoly(c, jagPoly(cx, cy, r * 0.24, 6, 3.6, 1.15), mixHex("#1C2E40", T[1], lit));
  // 균열 — 결정을 가로지르는 지그재그, 갈라질수록 밝다.
  const cpts = hiCrackPts(cx - r * 0.46, cy - r * 0.08, cx + r * 0.46, cy + r * 0.12, 4.4, 5);
  const seg = hiCrackReveal(cpts, Math.max(crack, flash));
  if (seg) { c.save(); c.shadowColor = A(T[2], 1); c.shadowBlur = r * (0.3 + flash * 1.6); hiStrokePts(c, seg, Math.max(1, r * 0.05), A("#FFFFFF", Math.min(1, 0.6 + flash))); c.restore(); }
  if (lit > 0.05 || flash > 0.02) { c.save(); c.globalCompositeOperation = "lighter"; gHalo(c, cx, cy, r * (0.55 + flash * 1.3), "white", Math.min(1, lit * 0.7 + flash)); c.restore(); }
}

// ── 균열 · 채굴 빔 · 성좌 — 이 게임에 이미 있는 어휘 ───────────────────────
function hiCrackPts(x0, y0, x1, y1, seed, kinks) {
  const pts = [[x0, y0]];
  const dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
  for (let i = 1; i < kinks; i++) { const u = i / kinks, off = (hash(seed + i * 7.7) - 0.5) * len * 0.18; pts.push([x0 + dx * u + nx * off, y0 + dy * u + ny * off]); }
  pts.push([x1, y1]);
  return pts;
}
function hiCrackReveal(pts, reveal) {
  if (reveal <= 0.002) return null;
  let total = 0; for (let i = 1; i < pts.length; i++) total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const want = total * hudCl(reveal); let acc = 0; const out = [pts[0]];
  for (let i = 1; i < pts.length; i++) {
    const s = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc + s <= want) { out.push(pts[i]); acc += s; }
    else { const k = (want - acc) / s; out.push([pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * k, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * k]); break; }
  }
  return out.length >= 2 ? out : null;
}
function hiStrokePts(c, pts, w, style) {
  c.lineWidth = w; c.lineCap = "round"; c.lineJoin = "round"; c.strokeStyle = style;
  c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
}
function hiBeam(c, x, yTop, yBot, w, alpha) {
  if (alpha <= 0.01) return;
  const g = c.createLinearGradient(x, yTop, x, yBot);
  g.addColorStop(0, A(HUDGLOW, 0)); g.addColorStop(0.45, A(HUDGLOW, 0.32 * alpha)); g.addColorStop(1, A(HUDGLOW, 0));
  c.save(); c.globalCompositeOperation = "lighter"; c.fillStyle = g; c.fillRect(x - w / 2, yTop, w, yBot - yTop); c.restore();
}
/// 성좌 — 엠블럼에서 화면 네 귀퉁이 판독값까지 가는 선을 잇는다. 그래서
/// 귀퉁이 HUD 가 로고와 무관한 장식이 아니라 「같은 리액터의 신호」가 된다.
function hiConstellation(c, ex, ey, corners, alpha, tAbs) {
  if (alpha <= 0.01) return;
  c.save(); c.globalAlpha = alpha;
  corners.forEach(([x, y], i) => {
    c.strokeStyle = A(HUDLINE, 0.30); c.lineWidth = 1;
    const mx = ex + (x - ex) * 0.55, my = ey + (y - ey) * 0.35;
    c.beginPath(); c.moveTo(ex, ey); c.quadraticCurveTo(mx, my, x, y); c.stroke();
    const tw = 0.5 + 0.5 * Math.sin(tAbs * 1.6 + i * 2.1);
    gHalo(c, x, y, 2.0 * tw, "white", 0.7 * tw);
  });
  c.restore();
}
/// 결정론적 별 몇 점(hash 만 쓴다 — 난수 0건 관례). 배경을 채우는 용도라
/// 캔버스 전면을 매 프레임 다시 칠하지 않고 아주 옅게 몇 점만 찍는다.
function hiStars(c, W, H, n) {
  for (let i = 0; i < n; i++) {
    const x = hash(i * 12.9) * W, y = hash(i * 7.1 + 3) * H, r = 0.5 + hash(i * 3.3) * 1.1;
    c.fillStyle = A("#CFE8FF", 0.10 + hash(i * 5.7) * 0.35);
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
}
/// 가짜 진단 일련번호 — `hash` 로만 뽑는다(난수 0건 관례).
function hiSerial(step) {
  const a = Math.floor(hash(step * 3.1) * 900 + 100);
  const b = Math.floor(hash(step * 7.7 + 1) * 90 + 10);
  return a + "." + b;
}

// ── 레이아웃 — 전부 하나의 (cx,topMargin) 에서 파생하고, 겹치지 않는지
//    수식으로 검산했다(오프라인 `node` 계산: LIGHT/SURVIVAL/문구/대기줄
//    네 구간의 y 범위가 전부 양의 간격으로 떨어져 있다 — 최소 간격 7.2px).
function hiLayout(W, H) {
  const wLightU = hiWordWidthUnits("LIGHT"), wSurvU = hiWordWidthUnits("SURVIVAL");
  const unitL = Math.min(9, W * 0.70 / wLightU);
  const unitS = Math.min(4.6, W * 0.58 / wSurvU);
  const cx = W * 0.5, yLight = 30, lightH = unitL * 15.5;
  const ySurv = yLight + lightH + unitL * 0.8, survH = unitS * 15.5;
  const labelY = ySurv + survH + 18, promptY = labelY + 16;
  const crackY = yLight + lightH * 0.5, embR = unitL * 2.2;
  return { cx, unitL, unitS, yLight, ySurv, labelY, promptY, crackY, embR, wLightU, wSurvU };
}

/// 부팅 화면 한 장 — **실시간 루프와 고정 갈무리가 이 함수 하나를 같이 쓴다.**
function hiPaintBoot(c, tAbs, W, H) {
  const u = (tAbs % HIT) / HIT;
  const env = hudOpenLoop(u, HIENV);
  const ph = hudPhaseAt(u, HISEGS);
  const L = hiLayout(W, H);

  c.fillStyle = HUDBASE; c.fillRect(0, 0, W, H);
  hiStars(c, W, H, 60);
  if (env.line < 0.003 && env.fill < 0.003 && env.content < 0.003) return;

  // ① 선이 그어진다 — 뷰파인더 브래킷.
  c.save(); c.globalAlpha = env.line;
  hudBracket(c, W * 0.030, H * 0.05, W * 0.94, H * 0.92, 20, { w: 2 });
  c.restore();

  const corners = [[W * 0.10, H * 0.09], [W * 0.90, H * 0.09], [W * 0.10, H * 0.91], [W * 0.90, H * 0.91]];
  // ② 면이 찬다 — 귀퉁이 판독값. 엠블럼과 잇는 선은 ③에서(엠블럼 좌표가 필요).
  c.save(); c.globalAlpha = env.fill;
  hudReadout(c, corners[0][0] - 34, corners[0][1] + 4, "SYS.CHECK", hiSerial(Math.floor(tAbs * 0.4)), { fs: 8 });
  hudReadout(c, corners[1][0] - 34, corners[1][1] + 4, "BUILD", "v0.1.0", { fs: 8 });
  hudBars(c, corners[2][0] - 60, corners[2][1] - 8, 100, 30, null, { t: tAbs, n: 12, alpha: 0.6 });
  hudWave(c, corners[3][0] - 60, corners[3][1] - 8, 100, 26, tAbs, { speed: 1.3, alpha: 0.6 });
  c.restore();

  if (env.content <= 0.004) return;
  c.save(); c.globalAlpha = env.content;

  const mat = u < 0.62 ? (ph.pct == null ? 0.05 : hudCl(ph.pct / 100) * 0.55) : 1;
  const glowBase = 0.30 + 0.20 * mat;
  const crackGrow = u < 0.62 ? hudCl((ph.pct || 0) / 100) : 1;
  const flash = Math.exp(-Math.pow((u - 0.66) / 0.032, 2));
  const ext = [0.7, 1];

  // 엠블럼 — 글자 뒤에 먼저 앉힌다(LIGHT 가 그 위에 얹힌다).
  hiEmblem(c, L.cx, L.crackY, L.embR, tAbs, crackGrow, mat, flash);
  hiBeam(c, L.cx, H * 0.04, L.crackY - L.embR, L.unitL * 1.3, Math.min(1, crackGrow * 0.6 + flash * 1.4));
  hiConstellation(c, L.cx, L.crackY, corners, ph.label === "TOUCH TO START" ? 0.55 : 0, tAbs);
  if (flash > 0.01) { c.save(); c.globalCompositeOperation = "lighter"; gHalo(c, L.cx, L.crackY, W * 0.26 * flash, "white", flash); c.restore(); }

  hiDrawWord(c, "LIGHT", L.cx, L.yLight, L.unitL, mat, glowBase + flash * 0.8, ext);
  if (u > 0.30) hiDrawWord(c, "SURVIVAL", L.cx, L.ySurv, L.unitS, Math.min(1, mat * 1.15), glowBase * 0.7 + flash * 0.6, ext);

  const label = ph.label + (ph.pct != null ? " " + Math.round(ph.pct) + "%" : "");
  if (label) { c.textAlign = "center"; c.font = hudFont(700, 11); c.fillStyle = HUDDIM; lbText(c, label, L.cx, L.labelY); c.textAlign = "left"; }
  if (ph.label === "TOUCH TO START") {
    c.globalAlpha = env.content * (0.4 + 0.6 * (0.5 - 0.5 * Math.cos(tAbs * 3.6)));
    c.textAlign = "center"; c.font = hudFont(600, 10); c.fillStyle = HUDGLOW;
    lbText(c, "▸ 화면을 터치해 진입 ◂", L.cx, L.promptY);
    c.textAlign = "left";
  }
  c.restore();
}

{
  const bg = $("hi-boot-bg");
  // ⚠️ 로고 전체(엠블럼 · 균열 · 「LIGHT SURVIVAL」)가 이제 캔버스 하나에서
  //   다 그려진다 — 폰트를 안 쓰므로 opacity 를 맞출 DOM 워드마크가 없다.
  if (bg) mk(bg, [788, 364], function hiBoot(c, t, dt, W, H) { hiPaintBoot(c, t, W, H); }, { clear: true });
}

/// 고정 갈무리 — 같은 [hiPaintBoot] 를 다른 절대시각으로 불러 정지 화면을 뜬다.
function hiFreeze(uFixed) {
  return function hiFreezeDraw(c, t, dt, W, H) { hiPaintBoot(c, uFixed * HIT, W, H); };
}
[["hi-boot-k0", 0.14, "SEARCHING"], ["hi-boot-k1", 0.46, "LOADING"],
 ["hi-boot-k2", 0.665, "SYSTEM ONLINE"], ["hi-boot-k3", 0.82, "TOUCH TO START"]]
  .forEach(([id, u]) => { const cv = $(id); if (cv) mk(cv, [280, 160], hiFreeze(u), { clear: true }); });

// ══════════════════════════════════════════════════════════════════════════
// 키트 카탈로그 — 부품마다 눈으로 보는 최소 예시
// ══════════════════════════════════════════════════════════════════════════
{ const cv = $("hi-cat-panel-cv");
  if (cv) mk(cv, [40, 40], function hiCatPanelRing(c, t, dt, W, H) {
    hudTicks(c, W / 2, H / 2, W * 0.30, 24, { len: 3, bigLen: 6, every: 6 });
    hudDial(c, W / 2, H / 2, W * 0.30, 0.62, { w: 2.4, fs: 9 });
  }, { clear: true }); }

{ const cv = $("hi-cat-radar");
  if (cv) mk(cv, [160, 160], function hiCatRadar(c, t, dt, W, H) {
    hudRadar(c, W / 2, H / 2, W * 0.42, t, { sweepSpeed: 0.8, core: 0.8 });
  }, { clear: true }); }

[["hi-cat-dial-a", 0.60], ["hi-cat-dial-b", 0.30]].forEach(([id, pct]) => {
  const cv = $(id);
  if (cv) mk(cv, [96, 96], function hiCatDial(c, t, dt, W, H) {
    hudDial(c, W / 2, H / 2, W * 0.40, pct, { w: 6 });
  }, { clear: true });
});

{ const cv = $("hi-cat-orbit");
  if (cv) mk(cv, [160, 96], function hiCatOrbit(c, t, dt, W, H) {
    hudOrbit(c, W / 2, H / 2, W * 0.42, H * 0.34, t, { speed: 0.6, dots: 2 });
    hudOrbit(c, W / 2, H / 2, W * 0.24, H * 0.19, t, { speed: -0.9, dots: 1, alpha: 0.5 });
  }, { clear: true }); }

{ const cv = $("hi-cat-bars");
  if (cv) mk(cv, [160, 84], function hiCatBars(c, t, dt, W, H) {
    hudBars(c, 4, 4, W - 8, H - 8, null, { t: t, n: 14 });
  }, { clear: true }); }

{ const cv = $("hi-cat-wave");
  if (cv) mk(cv, [160, 84], function hiCatWave(c, t, dt, W, H) {
    hudWave(c, 4, 0, W - 8, H, t, { speed: 1.1 });
  }, { clear: true }); }

// 등장 애니메이션 데모 — 짧은 자체 주기로 되풀이(이 카드만의 값, 실화면
// 진입에는 이런 되풀이가 없다 — 되풀이는 「눈으로 확인하기 위한 것」이다).
{ const cv = $("hi-cat-open");
  if (cv) mk(cv, [220, 120], function hiCatOpen(c, t, dt, W, H) {
    const period = 3.0, u = (t % period) / period;
    const e = hudOpenLoop(u, { o0: 0.05, oDur: 0.22, hold: 0.62, cDur: 0.16 });
    c.fillStyle = HUDBASE; c.fillRect(0, 0, W, H);
    c.save(); c.globalAlpha = e.line;
    hudBracket(c, 10, 10, W - 20, H - 20, 14, { w: 2 });
    c.restore();
    c.save(); c.globalAlpha = e.fill;
    c.fillStyle = A(HUDLINE, 0.14); c.fillRect(14, 14, W - 28, H - 28);
    c.restore();
    c.save(); c.globalAlpha = e.content;
    c.textAlign = "center"; c.font = hudFont(700, 11); c.fillStyle = HUDINK;
    lbText(c, "PANEL ONLINE", W / 2, H / 2 - 2);
    c.font = hudFont(500, 8.5); c.fillStyle = HUDDIM;
    lbText(c, "line " + e.line.toFixed(2) + " · fill " + e.fill.toFixed(2) + " · content " + e.content.toFixed(2), W / 2, H / 2 + 14);
    c.textAlign = "left";
    c.restore();
  }, { clear: true }); }

hudRail("hi-cat-rail", "home");
