// ══════════════════════════════════════════════════════════════════════════
// chapter.js — 관측소. 은하를 고르고 · 스테이지를 고르고 · 나간다  (docs/vfx)
//
// ── 이 판이 무엇을 바꿨나 ─────────────────────────────────────────────────
// 그리는 **내용**은 그대로고 **입는 옷**만 갈아입었다. 관측소만 제 창틀 ·
// 제 레일 · 제 별밭을 들고 있어서 강화 · 편성표 옆에 놓으면 다른 게임처럼
// 보였다 ⇒ 여섯 장이 같이 쓰는 부품통(`hud.js`)으로 갈아 끼운다:
//   창틀 · 레일 · 지갑 띠 · 브래킷 · 귀퉁이 판독값 = [hudChrome] · [hudRail] ·
//   `.hudstrip` · `.hudbtn` — **한 줄도 새로 안 짓는다.**
//
// ── 텍스처가 들어왔다 ────────────────────────────────────────────────────
// 은하를 알갱이 1,500개로 뿌리던 것을 걷고 `map-galaxy.js` 의 [gxTexDraw] 를
// 부른다. 그 파일이 이미 「램프 + 텍스처」로 은하를 그리고 **엔진
// (`lib/ui/watch_galaxy.dart`)과 한 벌**이라, 여기서 두 번째 은하를 그릴
// 이유가 없다.
// ⚠️⚠️ **`mask_glow_soft` 는 후광이 아니라 속이 빈 고리다**(실측: 중심 0.00 ·
//   r56 0.79 · r64 0). 매끈한 면이 필요한 자리는 텍스처가 아니라 **램프**
//   (`utRamp`)가 진다 — 후광 · 노드 광원 · 팝업의 온도 wash 가 그렇다.
// ⚠️ `file://` 로 열면 굽기가 막혀 텍스처가 통째로 꺼진다(`uitex.js` 머리말).
//   그때도 램프 · 선은 남아 화면이 성립한다 — 결만 빠진다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️⚠️ **최상위 이름을 전부 `CH_`/`ch` 로 격리한다.** 이 파일은 `vfx.js`
//   (5만 줄) · `hud.js` · `uitex.js` · `map-galaxy.js` 뒤에 실린다 —
//   최상위 `const` 가 하나만 겹쳐도 **스크립트가 통째로 죽는다**(실제로
//   `TAU` → `DRIFT` 순으로 두 번 그렇게 빈 캔버스가 나왔다).
// ⚠️⚠️ **`TAU`·`hash`·`A`·`jagPoly`·`fillPoly` 는 여기서 안 만든다** — 앞의
//   파일들이 갖고 있고, 사본을 두면 언젠가 갈라진다.
// ⚠️⚠️ **제 프레임 루프를 안 돈다.** 옛 판은 `requestAnimationFrame` 을 직접
//   돌려 **탭이 숨어도 계속 그렸다**(`vfx.js` 의 `document.hidden` 가드가 안
//   닿는 자리였다). ⇒ 전부 [mk] 로 등록한다 — 가드 · 화면 밖 버퍼 해제 ·
//   `dpr` 백버퍼가 한꺼번에 딸려 온다. `tools/mockup_smoke.js` 도 그제서야
//   이 장을 돈다(옛 판의 등록 칸 수는 **0** 이었다).
// ⚠️⚠️ **되풀이는 위상 파생값을 따로 안 든다.** 링은 `u` 하나에서 반경·알파를
//   같이 뽑고 알파가 `sin(πu)` 라 u=0 과 u=1 이 둘 다 0 이다. 나머지는 전부
//   `t*속도` 를 각도에 그대로 먹이는 연속 회전이라 이음매가 없다.
// ⚠️ 캔버스는 잘못된 색 문자열을 **조용히 무시한다** — 이 파일의 색은 전부
//   `#RRGGBB` 이고 알파는 `A()` 가 붙인다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 창의 치수 — **CSS 와 캔버스가 같은 수를 봐야 한다** ──────────────────
// `mockup-chapter.html` 의 `.ch-screen` 절이 같은 수를 든다. 한쪽만 고치면
// 지도가 지갑 띠 밑으로 파고들거나 발치 줄을 덮는다(홈 · 강화가 이미 겪은
// 자리 — `hud.js` ⑨절의 「위 54 · 아래 24」 주석이 그 기록이다).
const CH_W = 788, CH_H = 364;
const CH_PAD_T = 54, CH_PAD_B = 24, CH_PAD_L = 10, CH_PAD_R = 20;
const CH_STRIP_H = 22 + 7;                 // 띠 + 그 아래 margin
const CH_FOOT_H = 38;                      // 범례 + 「편집 ›」 줄
/// 지도가 쓰는 사각 — 띠와 발치 줄 사이.
const CH_FIELD = {
  x0: HUD_RAILW + CH_PAD_L,                          // 68
  x1: CH_W - CH_PAD_R,                               // 768
  y0: CH_PAD_T + CH_STRIP_H,                         // 83
  y1: CH_H - CH_PAD_B - CH_FOOT_H,                   // 302
};
/// 노드가 앉는 사각 — 판 안에서 한 겹 더 들어온다(번호 · ★ · 후광 자리).
const CH_NODE_BOX = { x0: 106, x1: 730, y0: 132, y1: 256 };

// ── 색 — **`hud.js` 의 냉광을 그대로 빌린다** ────────────────────────────
// 두 계가 안 섞이는 이유는 kit 이 적어 둔 그대로다: 냉광은 「기계가 늘 켜 두는
// 것」, 금빛은 「지금 누를 수 있는 단 하나」. 관측소에서 그 둘의 뜻이 이렇다:
//   냉광 = **열려 있다**(갈 수 있는 길 · 아직 안 깬 칸)
//   금빛 = **여기부터**(지금 깨야 할 칸 하나)
const CH_INK = {
  now: HUDSEL,                        // 지금 깨야 할 칸 — 화면에서 유일한 금빛
  done: "#CED0E0",                    // 깼는데 난이도 기록이 없는 자리
  open: HUDLINE,                      // 열린 것 — 윤곽만
  lock: HUDFAINT,                     // 잠긴 것
};

// ── 난이도 테마 — **팝업이 통째로 그 색을 입는다** ────────────────────────
//
// 사용자 확정: 쉬움 **초록** · 보통 **하양** · 어려움 **빨강** ·
//   매우어려움 **보라**(넷 중 하나만 빛난다).
//
// ⭐ **왜 색을 통째로 바꾸나** — 난이도는 「고른 것」이 아니라 **「지금 어떤
//   판에 들어가려는가」**다. 칩 하나만 물들면 그 사실이 칩 크기만큼만 크고,
//   팝업이 물들면 **화면 전체가 그 판의 온도**가 된다.
//
// ⚠️ 냉광 뼈대는 안 물든다 — 테 · 브래킷 · 온도 wash · 고른 칩 · 출격 띠
//   다섯 자리만 테마 색이다. 뼈까지 물들이면 강화 · 편성표와 다른 창이 된다.
// ⚠️ **금빛이 여기 없는 것이 규칙이다.** 첫 판은 보통을 금빛으로 뒀는데
//   걷었다(사용자: 「금색을 이미 쓰는 컬러가 있어서」) — 난이도가 금빛을
//   가져가면 「출격」과 「보통」이 같은 색이 되어 색이 두 가지를 말한다.
const CH_THEME = {
  // ⚠️ **밝기가 아니라 채도였다.** 「너무 어두운 초록」이라는 반려를 받고 재
  //   보니 띠 끝색의 명도는 오히려 제일 높았다(초록 L .053 vs 빨강 .028).
  //   탁해 보인 것은 청록 쪽이라 회색기가 돌아서다 ⇒ 채도를 올리고 연두 쪽으로.
  "쉬움":       { key: "#5CF2A2", rgb: "92,242,162",  g0: "#0C3A22", g1: "#1C8A50", ink: "#04180C", glow: 0 },
  "보통":       { key: "#E4E4EE", rgb: "228,228,238", g0: "#1E1E26", g1: "#3A3A48", ink: "#12121A", glow: 0 },
  // ⚠️ 빨강 첫 판(#E4705E)은 연어색이라 「어렵다」가 아니라 「따뜻하다」였다.
  "어려움":     { key: "#FF4A3D", rgb: "255,74,61",   g0: "#2E0C0A", g1: "#5C1410", ink: "#1A0403", glow: 0 },
  // ⭐ **매우어려움만 빛을 뿜는다.** 색을 더 밝히면 그냥 연보라가 되고,
  //   발광은 **그 색이 광원**이라는 뜻이라 다르게 읽힌다.
  //   ⚠️ 넷 중 하나만 빛나야 한다 — 둘이 빛나면 「제일 위험한 것」이 안 정해진다.
  "매우어려움": { key: "#CE7CFF", rgb: "206,124,255", g0: "#240C3A", g1: "#4E1682", ink: "#100320", glow: 1 },
};
const CH_TIERS = ["쉬움", "보통", "어려움", "매우어려움"];

// ── 배경 은하 — **한 번 굽고 돌린다** ────────────────────────────────────
//
// ⭐ 그리는 손은 `map-galaxy.js` 의 [gxTexDraw] 다 — 1뎁스에 뜨는 그 은하와
//   **같은 함수**라야 「지금 이 은하 안에 있다」가 성립한다.
// ⚠️ 텍스처 쿼드 수십 장을 매 프레임 다시 찍으면 관측소가 배터리를 먹는다
//   (오래 켜 두는 화면이다). 오프스크린에 한 번 그려 두고 매 프레임은
//   `drawImage` + 회전만 한다.
// ⚠️⚠️ **텍스처가 늦게 온다.** `utLoad()` 가 끝나기 전에 구우면 램프만 든
//   그림이 굳어 버린다 ⇒ 준비 상태가 뒤집히는 순간 구운 것을 통째로 버린다.
const CH_BAKE = new Map();
let CH_TEXREADY = false;
/// 배경 은하의 반경. `S = R*3.6` 이 구운 판의 한 변이고(헤일로가 `r*1.75`),
/// dpr 2 에서 판 하나가 4.7MB 다 — 세 장(1·2·3장)이 캐시에 남는 상한이다.
const CH_BGR = 150;

function chBakeSweep() {
  if (UT.ready === CH_TEXREADY) return;
  CH_TEXREADY = UT.ready;
  CH_BAKE.clear();
}

function chBakedGalaxy(kind, R, seed, dpr) {
  const key = kind + ":" + Math.round(R) + ":" + seed + ":" + dpr;
  const hit = CH_BAKE.get(key);
  if (hit) return hit;
  const SS = Math.max(1, Math.min(2, dpr));
  const S = Math.ceil(R * 3.6);
  const off = document.createElement("canvas");
  off.width = off.height = Math.round(S * SS);
  const oc = off.getContext("2d");
  oc.setTransform(SS, 0, 0, SS, 0, 0);
  // st=2(지나온 것) — 배경은 **주인공이 아니다.** 고른 것(st=1)으로 구우면
  // 금빛이 화면에 둘이 되어 「여기부터」가 안 정해진다.
  gxTexDraw(oc, S / 2, S / 2, R, kind, 2, seed);
  CH_BAKE.set(key, { img: off, ss: SS, s: S });
  return CH_BAKE.get(key);
}

// ── 별밭 — hudChrome 의 정지 별 위에 **아주 느린 먼지 두 겹** ────────────
//
// ⚠️ [hudChrome] 이 이미 결정론 별밭을 깐다. 여기서 또 한 벌을 뿌리면 두
//   문법이 겹쳐 「지지직대는 배경」이 된다 ⇒ 더하는 것은 **흐르는 먼지**와
//   **십자 빛** 둘뿐이다. 십자 빛이 텍스처가 값을 하는 자리고(`kenney_star`),
//   먼지는 1픽셀 사각이라 텍스처로 바꾸면 오히려 뭉갠다.
// ⚠️ **아주 느리다** — 깊은 겹이 초당 2.4px 이라 화면을 가로지르는 데 5분이다.
//   관측소는 오래 켜 두는 화면이라 「흐른다」가 눈에 걸리면 못 쉰다.
const CH_DRIFT = [
  [0.28, 66, "#3F4763", 0.55],
  [1.00, 30, "#8FA8C8", 0.85],
];
const CH_DRIFT_SPEED = 2.4;

function chDust(c, W, H, t, seed) {
  let k = seed * 7.1;
  for (const [dep, n, col, al] of CH_DRIFT) {
    const sp = CH_DRIFT_SPEED * dep;
    for (let i = 0; i < n; i++) {
      k += 1;
      let x = (hash(k * 1.7) * W - t * sp) % W;
      if (x < 0) x += W;
      const y = hash(k * 3.3 + 9) * H;
      // 겹마다 제 박자로 숨 쉰다 — 다 같이 밝아지면 화면이 깜빡인다.
      const br = 0.78 + 0.22 * Math.sin(t * (0.35 + dep * 0.5) + k);
      c.fillStyle = A(col, al * (0.55 + 0.45 * hash(k * 5.1)) * br);
      c.fillRect(x - 0.5, y - 0.5, 1, 1);
    }
  }
  // 드문 십자 빛 — **화면당 서넛까지.** 여기서만 반짝인다.
  for (let i = 0; i < 4; i++) {
    k += 1;
    let x = (hash(k * 1.7) * W - t * CH_DRIFT_SPEED * 0.6) % W;
    if (x < 0) x += W;
    const y = hash(k * 3.3 + 9) * H;
    const tw = 0.30 + 0.70 * Math.pow(Math.max(0, Math.sin(t * 1.1 + i * 2.4)), 3);
    const rr = 3.0 + 1.8 * hash(k * 4.9 + 7);
    utStamp(c, "kenney_star", x, y, rr, rr, 0, "#CFE8FF", 0.42 * tw);
    // 텍스처가 꺼진 판(file://)에서도 별은 남아야 한다.
    if (!UT.ready) { c.fillStyle = A("#CFE8FF", 0.7 * tw); c.fillRect(x - 0.8, y - 0.8, 1.6, 1.6); }
  }
}

// ── 길의 자리 — **뱀처럼 접는다** ──────────────────────────────────────────
// ⚠️ 한 줄에 몇 개를 둘지는 **줄이 고르게 갈리도록** 역산한다. 7개 고정으로
//   두면 8개짜리 장이 「7 + 1」이 되어 둘째 줄에 한 개만 외로 남는다.
function chLayout(N, x0, x1, y0, y1) {
  const rows = Math.max(1, Math.ceil(N / 7));
  const cols = Math.ceil(N / rows);
  const out = [];
  for (let i = 0; i < N; i++) {
    const r = Math.floor(i / cols);
    let cc = i % cols;
    if (r % 2 === 1) cc = cols - 1 - cc;           // 되꺾기 — 길이 이어진다
    const px = cols === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * (cc / (cols - 1));
    const py = rows === 1 ? (y0 + y1) / 2 : y0 + (y1 - y0) * (r / (rows - 1));
    out.push([px, py, r]);
  }
  return out;
}

// ── 조준 — **「고르는 곳」이 「보는 곳」과 갈리는 자리** ──────────────────
//
// ⭐⭐ 격자에 카드를 깔면 도감이 된다. 관측소가 도감이 아닌 이유는 화면에
//   **겨누고 있는 것 하나**가 있기 때문이다 — 눈금 고리가 돌고, 브래킷 넷이
//   물고, 그 안에서 빛이 발원한다. 「여기를 누르면 나간다」가 그림으로 선다.
// ⚠️ 화면에 조준은 **하나뿐**이다. 둘이면 겨누는 것이 아니라 목록이 된다.
function chReticle(c, x, y, r, t, col, rgb) {
  c.save();
  c.translate(x, y); c.rotate(t * 0.5);           // 연속 회전 — 이음매가 없다
  hudTicks(c, 0, 0, r, 24, { len: 3, bigLen: 7, every: 6, alpha: 0.55, color: col });
  c.restore();
  hudRing(c, x, y, r, { dash: [2, 6], alpha: 0.42, w: 1, color: col });
  hudBracket(c, x - r - 7, y - r - 7, (r + 7) * 2, (r + 7) * 2, 9, { w: 1.5, alpha: 0.85 });
  // 브래킷은 kit 이 냉광으로 그린다 — 겨누는 대상의 색은 **안쪽 고리**가 진다.
  c.strokeStyle = A(col, 0.5); c.lineWidth = 1;
  c.beginPath(); c.arc(x, y, r + 7, -0.22, 0.22); c.stroke();
  c.beginPath(); c.arc(x, y, r + 7, Math.PI - 0.22, Math.PI + 0.22); c.stroke();
}

// ── 노드 하나 ─────────────────────────────────────────────────────────────
//
// ⭐⭐ **색은 「그 스테이지를 깬 가장 어려운 난이도」다**(사용자 확정).
//   그래서 축이 둘이다 — **색** = 어느 난이도로 깼나, **형태** = 지금 어디인가.
//   두 축이 안 겹치므로 「빨간 노드 위에 지금 서 있다」가 한 번에 읽힌다.
// ⭐⭐ **금빛의 자리는 「지금 깨야 할 칸」이다**(사용자 확정) — 난이도 넷에서
//   금빛을 뺀 것이 이 자리를 비우려던 것이었다.
// ⚠️ **아직 안 깬 「지금」 칸만 금빛**이다. 이미 깬 칸에 다시 서 있으면
//   (더 높은 난이도에 도전 중) 색은 그 난이도 것이 남는다 — 「해낸 것」이
//   「해야 할 것」에 지워지면 기록이 사라진다.
function chNode(c, x, y, n, st, stars, best, t) {
  const th = best ? CH_THEME[best] : null;
  const todo = st === 1 && !best;
  const col = todo ? CH_INK.now
    : (th ? th.key : (st === 1 || st === 2 ? CH_INK.done : CH_INK.open));
  const rgb = todo ? "255,210,122" : (th ? th.rgb : "206,208,224");

  if (st === -1) {                                  // 잠김 — 작은 고리 하나
    c.fillStyle = A("#02060C", 0.72);
    c.beginPath(); c.arc(x, y, 7, 0, TAU); c.fill();
    hudRing(c, x, y, 7, { alpha: 0.36, w: 1, color: CH_INK.lock });
    return;
  }
  const R = st === 1 ? 16 : 12;

  if (st === 1) {                                   // 지금 — **광원이 형태다**
    // ⚠️⚠️ **위상 파생값을 따로 안 든다.** 링마다 `u` 하나를 뽑고 반경·알파를
    //   거기서만 파생한다. 알파가 `sin(πu)` 라 양끝이 0 이다 — 링이 생기는
    //   순간과 사라지는 순간이 둘 다 투명해야 주기의 이음매가 안 보인다.
    const RINGS = 3;
    for (let k = 0; k < RINGS; k++) {
      const u = (t * 0.55 + k / RINGS) % 1;
      const rr = R * (1.15 + 2.4 * u);
      const a = Math.sin(Math.PI * u) * 0.34;
      c.beginPath(); c.arc(x, y, rr, 0, TAU);
      c.strokeStyle = "rgba(" + rgb + "," + a + ")";
      c.lineWidth = 1.4 * (1 - u * 0.5);
      c.stroke();
    }
    // 그 아래 숨 쉬는 광원 — 링만 있으면 「신호」이지 「광원」이 아니다.
    // ⚠️ 매끈한 면은 텍스처가 아니라 **램프**의 몫이다(`mask_glow_soft` 는 고리).
    const pu = 0.5 + 0.5 * Math.sin(t * 2.0);
    utRamp(c, x, y, R * (2.6 + 0.5 * pu), R * (2.6 + 0.5 * pu), 0, col, 0.30 + 0.18 * pu);
    chReticle(c, x, y, R + 12, t, col, rgb);
  }

  // ⚠️ 배경 은하가 진해지면 노드가 묻힌다 — 바탕을 어둡게 깔아 글자를 띄운다.
  c.beginPath(); c.arc(x, y, R, 0, TAU);
  c.fillStyle = A("#02060C", 0.86); c.fill();
  // 매우어려움으로 깬 것만 빛난다 — 팝업의 그 규약 그대로
  if (th && th.glow) {
    // 명멸 — **아주 얕게.** 깜빡이면 「고장」이고, 숨 쉬면 「살아 있다」다.
    const br = 10 + 6 * (0.5 + 0.5 * Math.sin(t * 1.4 + x * 0.01));
    c.save();
    c.shadowColor = "rgba(" + th.rgb + ",.80)"; c.shadowBlur = br;
    c.strokeStyle = col; c.lineWidth = 1.6; c.stroke();
    c.restore();
  }
  c.strokeStyle = col; c.lineWidth = st === 1 ? 1.9 : 1.2; c.stroke();

  c.fillStyle = col;
  c.font = (st === 1 ? "600 13.5px" : "12px") + " -apple-system,sans-serif";
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(String(n), x, y + 0.5);
  c.textAlign = "left"; c.textBaseline = "alphabetic";
  if (best && stars > 0) {                          // ★ — 깬 것만
    c.textAlign = "center";
    c.font = "8px -apple-system,sans-serif";
    c.fillStyle = A(th.key, 0.66);
    c.fillText("★".repeat(stars), x, y + R + 11);
    c.textAlign = "left";
  }
}

// ── 2뎁스 지도 층 — 배경 은하 + 길 + 노드 ────────────────────────────────
// ⚠️ 이름을 `chDepth1`/`chDepth2` 로 짝지어 둔다 — `vfx.js` 의 주석이
//   「1뎁스 은하 지도의 정본은 `chapter.js` 의 `chDepth1`」이라 적고 있어서,
//   이름을 갈면 그쪽 이정표가 아무 데도 안 닿는 글이 된다.
function chDepth2(c, t, opt) {
  const B = CH_NODE_BOX;
  // 은하 — **아주 느리게** 돈다(한 바퀴에 약 4분). 빠르면 「돌아간다」가 되어
  //   지도가 못 쉰다.
  {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const g = chBakedGalaxy(opt.shape, CH_BGR, opt.seed, dpr);
    const w = g.img.width / g.ss, h = g.img.height / g.ss;
    c.save();
    c.globalCompositeOperation = "lighter";
    c.globalAlpha = 0.50;                        // 배경이다 — 길보다 뒤로 물러난다
    c.translate((B.x0 + B.x1) / 2, (B.y0 + B.y1) / 2);
    c.rotate(t * 0.026);
    c.drawImage(g.img, -w / 2, -h / 2, w, h);
    c.restore();
  }

  const pts = chLayout(opt.count, B.x0, B.x1, B.y0, B.y1);

  // 길 — 노드보다 먼저. 지나온 구간만 밝고 실선이다.
  for (let i = 0; i < opt.count - 1; i++) {
    const [x0, y0, r0] = pts[i], [x1, y1, r1] = pts[i + 1];
    const passed = i + 1 < opt.at;
    c.strokeStyle = passed ? A(HUDGLOW, 0.34) : A(HUDLINE, 0.24);
    c.lineWidth = 1.2; c.setLineDash(passed ? [] : [3, 4]);
    c.beginPath();
    if (r0 === r1) { c.moveTo(x0, y0); c.lineTo(x1, y1); }
    else {                                       // 줄이 바뀌는 자리 — 밖으로 돈다
      const bend = x0 > CH_W / 2 ? 34 : -34;
      c.moveTo(x0, y0);
      c.quadraticCurveTo(x0 + bend, (y0 + y1) / 2, x1, y1);
    }
    c.stroke();
  }
  c.setLineDash([]);

  for (let i = 0; i < opt.count; i++) {
    const st = i + 1 < opt.at ? 2 : (i + 1 === opt.at ? 1 : (i + 1 === opt.at + 1 ? 0 : -1));
    // ⚠️ **지금 서 있는 칸도 깼을 수 있다** — 보통으로 깨고 어려움에 도전하는
    //   중이면 st 는 1(지금)이고 기록은 「보통 ★★」이다. 둘은 다른 축이다.
    const rec = opt.best ? opt.best[i] : null;
    chNode(c, pts[i][0], pts[i][1], i + 1, st, rec ? rec[1] : 0, rec ? rec[0] : null, t);
  }
}

// ── 1뎁스 — **은하 지도.** 장을 고른다 ───────────────────────────────────
//
// ⭐ 자리 · 종 · 반경은 `vfx.js` 의 `WGALAXY` 를 그대로 읽는다 — **표를 여기
//   베끼지 않는다**(두 벌이 되는 순간 갈린다).
// ⚠️ `WGALAXY` 의 y 는 .24~.52 — 단위 정사각의 위쪽 28% 에만 산다. 그대로
//   판 높이에 곱하면 은하가 전부 위로 몰리므로 **가운데를 기준으로 펴서**
//   판 안에 앉힌다. 늘리는 배수(300)는 판 높이(219)보다 커서 다섯이 판을 다
//   쓴다 — 그래야 「형태가 곧 이름」인 배치가 안 뭉갠다.
const CH_D1_ST = [2, 2, 1, 0, 0];           // 2 지나옴 · 1 고른 것 · 0 잠김
const CH_D1_NM = ["1장 · 스며드는 어둠", "2장 · 갈라지는 어둠", "3장 · 덮쳐오는 어둠",
  "4장 잠김", "5장 잠김"];
const CH_D1_SPREAD = 300;

/// 자리는 `WGALAXY` 에서 **한 번만** 편다 — 매 프레임 다시 재면 그 값이
/// 프레임마다 새로 도는 쓰레기가 된다(다섯 개짜리라 티는 안 나지만, 표를
/// 읽는 자리는 한 곳으로 모아 두는 편이 다음 손에게도 싸다).
const CH_D1_POS = (() => {
  const ys = WGALAXY.map((q) => q.y), xs = WGALAXY.map((q) => q.x);
  const mid = (Math.min(...ys) + Math.max(...ys)) / 2;
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const cy = (CH_FIELD.y0 + CH_FIELD.y1) / 2;
  return WGALAXY.map((p) => [
    112 + (722 - 112) * ((p.x - x0) / (x1 - x0)),
    cy + (p.y - mid) * CH_D1_SPREAD,
  ]);
})();

function chDepth1(c, t) {
  const pos = CH_D1_POS;
  // 길 — 2뎁스와 **같은 문법**이다. 지나온 구간만 실선이고 앞은 점선이다.
  //
  // ⚠️⚠️ **은하 앞에서 끊는다.** 중심에서 중심으로 그으면 획이 은하를
  //   **가로질러** 지나가 「길」이 아니라 **금 간 자국**으로 읽힌다(실측).
  //   받침의 뒷테를 안 그리는 것과 같은 자리다 — 앞을 지나는 획만 남긴다.
  for (let i = 0; i < pos.length - 1; i++) {
    const passed = CH_D1_ST[i] === 2 && CH_D1_ST[i + 1] !== 0;
    const [ax, ay] = pos[i], [bx, by] = pos[i + 1];
    const d = Math.hypot(bx - ax, by - ay) || 1;
    const ux = (bx - ax) / d, uy = (by - ay) / d;
    const ra = WGALAXY[i].r * 1.35 + 6, rb = WGALAXY[i + 1].r * 1.35 + 6;
    if (ra + rb >= d) continue;
    c.strokeStyle = passed ? A(HUDGLOW, 0.20) : A(HUDLINE, 0.18);
    c.lineWidth = 1; c.setLineDash(passed ? [] : [3, 5]);
    c.beginPath();
    c.moveTo(ax + ux * ra, ay + uy * ra);
    c.lineTo(bx - ux * rb, by - uy * rb);
    c.stroke();
  }
  c.setLineDash([]);

  WGALAXY.forEach((p, i) => gxTexDraw(c, pos[i][0], pos[i][1], p.r, p.k, CH_D1_ST[i], i * 13.7 + 3));

  // 겨누고 있는 은하 하나 — 2뎁스의 「지금」 칸과 같은 표식이다.
  const pick = CH_D1_ST.indexOf(1);
  if (pick >= 0) chReticle(c, pos[pick][0], pos[pick][1], WGALAXY[pick].r * 1.45, t, CH_INK.now, "255,210,122");

  // 이름표
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  WGALAXY.forEach((p, i) => {
    const x = pos[i][0];
    const ty = pos[i][1] - (CH_D1_ST[i] === 1 ? p.r * 1.45 + 12 : p.r + 12);
    if (CH_D1_ST[i] === 1) {
      c.fillStyle = HUDDIM; c.font = hudFont(600, 8);
      c.fillText("착 륙  예 정  지 점", x, ty - 13);
      c.fillStyle = HUDINK; c.font = "600 13px -apple-system,sans-serif";
    } else if (CH_D1_ST[i] === 0) {
      c.fillStyle = HUDFAINT; c.font = "11px -apple-system,sans-serif";
    } else {
      c.fillStyle = HUDDIM; c.font = "11px -apple-system,sans-serif";
    }
    c.fillText(CH_D1_NM[i], x, ty);
  });
  c.textAlign = "left";
}

// ── 화면 배경 한 장 ───────────────────────────────────────────────────────
//
// ⭐ 창(별밭 · 브래킷 · 귀퉁이 판독값 · 대각선)은 [hudChrome] 하나가 세운다 —
//   여섯 장이 같은 창을 써야 「같은 창의 다른 방」으로 읽힌다.
// ⚠️ 화면마다 제 표식이 하나씩 있어야 그 여섯이 안 뭉친다. 관측소의 표식은
//   **레이더**다 — 이름이 곧 하는 일이라 다른 다섯이 못 쓰는 표식이고,
//   스윕은 연속 회전이라 이음매가 없다. 알파는 지도보다 한참 아래다.
function chScreenBg(opt) {
  return function chScreenBgDraw(c, t, dt, W, H) {
    chBakeSweep();
    const box = hudChrome(c, W, H, t, { seed: opt.seed, stars: 34 });
    const rx = (CH_FIELD.x0 + CH_FIELD.x1) / 2, ry = (CH_FIELD.y0 + CH_FIELD.y1) / 2;
    const rr = Math.min(box.w, box.h) * 0.46;
    c.save();
    c.globalAlpha = 0.30;
    hudRadar(c, rx, ry, rr, t, { rings: [1, 0.72, 0.44], ticks: 36, sweep: false, core: 0 });
    c.restore();
    // 스윕 — **날이 없는 부채**로 따로 그린다. [hudRadar] 의 스윕은 앞머리에
    // 밝은 획을 세우는데, 그 획이 지도 위에서는 **은하를 가르는 금**으로
    // 보였다(실측). 표식은 「돌고 있다」만 말하면 되므로 면만 남긴다.
    {
      const a = t * 0.22;
      const g = c.createLinearGradient(rx, ry, rx + Math.cos(a) * rr, ry + Math.sin(a) * rr);
      g.addColorStop(0, A(HUDGLOW, 0.07)); g.addColorStop(1, A(HUDGLOW, 0));
      c.save();
      c.beginPath(); c.arc(rx, ry, rr, 0, TAU); c.clip();
      c.fillStyle = g;
      c.beginPath(); c.moveTo(rx, ry); c.arc(rx, ry, rr, a - 0.55, a); c.closePath(); c.fill();
      c.restore();
    }
    chDust(c, W, H, t, opt.seed);
    if (opt.depth1) chDepth1(c, t);
    else chDepth2(c, t, opt);
  };
}

// ══════════════════════════════════════════════════════════════════════════
// 스테이지 팝업 — **나가는 문은 여기 하나다**
// ══════════════════════════════════════════════════════════════════════════
// 사용자 확정: 「저 스테이지를 누르면 팝업이 뜨고, **난이도를 선택**할 수 있고,
//   **간단하게 캐릭터 상태를 파악**할 수 있는 거지」.
//
// ⭐ 두 칸이다. 왼쪽이 **누가 가나**(몸 · 능력치), 오른쪽이 **무엇을 들고 ·
//   얼마나 세게**(덱 · 난이도). 그 둘을 본 뒤에 아래 출격을 누른다.
// ⚠️ **여기서 직접 고치지는 않는다 — 고치러 가는 문이 안에 있다**: 「편집 ›」과
//   덱 아이콘 스무 칸. 규약은 본문 ⑮.
// ⚠️ 팝업은 **제 캔버스**를 쓴다(`.ch-pop`, z 8). 지도와 한 캔버스에 그리면
//   DOM 으로 선 레일 · 창틀 · 지갑 띠가 팝업 **위로** 뜬다 — 어둠막이 덮어야
//   할 것을 못 덮으면 팝업이 아니라 배경 무늬가 된다.

const CH_TIER = [
  { nm: "쉬움", mul: "×0.6", lock: 0, star: 3, best: "20:38" },
  { nm: "보통", mul: "×1.0", lock: 0, star: 2, best: "22:11" },
  { nm: "어려움", mul: "×1.6", lock: 0, star: 0, best: null },
  { nm: "매우어려움", mul: "×2.5", lock: 1, star: 0, best: null },
];
// ── 덱 — **든 것을 낱개로 보여 준다** ─────────────────────────────────────
// ⭐ 스무 칸은 **문이다** — 누르면 편성(덱 탭)이 열린다. 빈 칸도 눌린다.
const CH_DECK = [
  "일반", "일반", "일반", "일반", "마법", "마법", "일반", "마법",
  "방어", "일반", "마법", "버프", "일반", "마법", "방어", "버프",
];
const CH_DECK_CAP = 20;
// 계열 색 — 도감 · 상점과 같은 **대분류 넷**.
const CH_TAGCOL = { "일반": "#FFD27A", "마법": "#96BEFF", "방어": "#A0DCC8", "버프": "#DCC8A0" };
// 능력치 요약 — 홈 콜아웃과 **같은 여섯**(축이 화면마다 다르면 못 외운다).
// **[축, Lv, 값]** 셋이다 — 상점에서 사는 것은 값이 아니라 **레벨**이라,
// 레벨이 안 보이면 이 표와 상점이 다른 것을 말하게 된다.
const CH_STATSUM = [
  ["공격력", 8, "+12.4%"], ["마법력", 6, "+38.8%"], ["치명타", 3, "9.3%"],
  ["체력", 9, "166"], ["방어력", 4, "3.6"], ["이동", 3, "+10.5%"],
];
const CH_LV_CAP = 99;

// 팝업 판의 치수 — 한 자리에 모아 둔다(안쪽 좌표가 전부 여기서 파생된다).
const CH_PW = 640, CH_PH = 312;
const CH_PX = Math.round((CH_W - CH_PW) / 2), CH_PY = Math.round((CH_H - CH_PH) / 2);

/// ⚠️ `jagPoly` 도 `vfx.js` 것을 쓴다 — 「뾰족한 실루엣」의 문법이 한 벌이어야
///   캐릭터가 홈과 여기서 같은 몸으로 보인다.
function chJag(c, cx, cy, r, n, seed, spike) {
  fillPoly(c, jagPoly(cx, cy, r, n, seed, spike), c.fillStyle);
}

/// 캐릭터 — **발현 전의 몸.** 홈에 선 그 몸을 팝업 크기로 접은 것.
/// 계수는 `vfx.js` 의 `elemBody` 그대로다(광휘 `R*1.5` 알파 .30 · 코어
/// `R*.40/.30/.16` · 씨앗 3.2/3.6/4.2 · 뿔 배수 1.30/1.25/1.20).
/// ⚠️ 톤은 **무속성 회백**이다 — 이 게임의 빛은 색이 없는 것이라야 속성을
///   먹는 일이 「빛이 색을 입는다」로 읽힌다.
function chHero(c, cx, cy, R) {
  const T = TONE.gold;
  c.save();
  c.globalCompositeOperation = "lighter";
  const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5);
  g.addColorStop(0, A(T[1], 0.30));
  g.addColorStop(1, A(T[1], 0));
  c.fillStyle = g;
  c.beginPath(); c.arc(cx, cy, R * 1.5, 0, TAU); c.fill();
  c.restore();
  c.fillStyle = A(T[0], 0.95); chJag(c, cx, cy, R * 0.40, 7, 3.2, 1.30);
  c.fillStyle = A(T[1], 1); chJag(c, cx, cy, R * 0.30, 7, 3.6, 1.25);
  c.fillStyle = A(T[2], 1); chJag(c, cx, cy, R * 0.16, 7, 4.2, 1.20);
}

// 발광 — [th.glow] 가 0 이면 아무 일도 안 한다(다른 셋은 그대로).
//
// ⚠️⚠️ **`shadowBlur` 한 번으론 안 번진다.** 캔버스의 그림자는 한 겹이라
//   테두리 바로 옆에서 뚝 끊긴다 — 「빛난다」가 아니라 「테두리가 두껍다」로
//   읽힌다. ⇒ 같은 획을 blur 를 키우며 세 번 그려 **광원**을 만든다.
// ⚠️⚠️ **`strokeStyle` 을 여기서 반드시 정한다.** 첫 판은 발광 없는 갈래에서
//   그걸 빠뜨려 **직전에 쓰던 색**으로 그렸고 테두리 셋이 통째로 사라졌다.
//   캔버스 상태는 전역이라, 상태를 안 정하고 그리는 함수는 부르는 자리에
//   따라 다른 그림을 낸다.
function chGlowStroke(c, th, path, base) {
  if (!th.glow) { c.strokeStyle = base; path(); c.stroke(); return; }
  for (const [blur, a] of [[26, 0.34], [14, 0.52], [6, 0.78]]) {
    c.save();
    c.shadowColor = "rgba(" + th.rgb + "," + a + ")";
    c.shadowBlur = blur * th.glow;
    c.strokeStyle = "rgba(" + th.rgb + "," + (a * 0.9) + ")";
    path(); c.stroke();
    c.restore();
  }
  c.strokeStyle = base; path(); c.stroke();
}
function chGlowOn(c, th, blur) {
  if (!th.glow) return;
  c.shadowColor = "rgba(" + th.rgb + ",.85)";
  c.shadowBlur = blur * th.glow;
}
function chGlowOff(c) { c.shadowBlur = 0; c.shadowColor = "transparent"; }

/// `.hudpanel` 의 각(좌상 · 우하를 깎는다)을 캔버스로 옮긴 것.
function chPanelPath(c, x, y, w, h, k) {
  c.beginPath();
  c.moveTo(x + k, y); c.lineTo(x + w, y); c.lineTo(x + w, y + h - k);
  c.lineTo(x + w - k, y + h); c.lineTo(x, y + h); c.lineTo(x, y + k);
  c.closePath();
}

function chPopupLayer(cv, opt) {
  return function chPopupDraw(c, t, dt, W, H) {
    const TH = CH_THEME[opt.tier];
    const px = CH_PX, py = CH_PY, pw = CH_PW, ph = CH_PH;

    // ── 어둠막 — 뒤가 보이는 만큼이 「돌아갈 데가 있다」는 뜻이다.
    c.fillStyle = A("#02050A", 0.74); c.fillRect(0, 0, W, H);

    // ── 판 — 냉광 뼈대 + 난이도 테마의 테
    chPanelPath(c, px, py, pw, ph, 14);
    const bgg = c.createLinearGradient(px, py, px + pw, py + ph);
    bgg.addColorStop(0, A(HUDBASE, 0.98)); bgg.addColorStop(1, A("#081422", 0.98));
    c.fillStyle = bgg; c.fill();
    c.save(); chPanelPath(c, px, py, pw, ph, 14); c.clip();
    // 온도 wash — **화면 전체가 그 판의 온도**가 되는 자리. 매끈한 면이라 램프다.
    utRamp(c, px + pw * 0.5, py + ph, pw * 0.62, ph * 0.66, 0, TH.key, TH.glow ? 0.20 : 0.13);
    // 결 — 유리판의 결. 텍스처가 값을 하는 자리이고 알파는 글을 안 먹는 값이다.
    utStamp(c, "noise_grainy", px + pw / 2, py + ph / 2, pw * 0.6, ph * 0.6, 0, HUDLINE, 0.05);
    c.restore();
    c.lineWidth = 1;
    chGlowStroke(c, TH, () => chPanelPath(c, px, py, pw, ph, 14),
      TH.glow ? "rgba(" + TH.rgb + ",.92)" : "rgba(" + TH.rgb + ",.46)");
    hudBracket(c, px, py, pw, ph, 16, { only: ["tr", "bl", "br"], w: 1.6, alpha: 0.8 });

    // ── 머리 — 어디로 가나
    c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.fillStyle = HUDDIM; c.font = hudFont(600, 8);
    c.fillText("착 륙  예 정  지 점", px + 22, py + 22);
    c.fillStyle = HUDINK; c.font = "600 16px -apple-system,sans-serif";
    chGlowOn(c, TH, 10); c.fillText(opt.stage, px + 22, py + 43); chGlowOff(c);
    c.fillStyle = HUDDIM; c.font = "10px -apple-system,sans-serif";
    c.fillText(opt.blurb, px + 22, py + 58);
    c.textAlign = "right";
    c.fillStyle = HUDDIM; c.font = "12px -apple-system,sans-serif";
    c.fillText("✕", px + pw - 20, py + 26);
    c.textAlign = "left";
    c.strokeStyle = A(HUDLINE, 0.22); c.lineWidth = 1;
    c.beginPath(); c.moveTo(px + 16, py + 72.5); c.lineTo(px + pw - 16, py + 72.5); c.stroke();

    // ── 가르는 획
    const mid = px + 248;
    c.strokeStyle = A(HUDLINE, 0.16);
    c.beginPath(); c.moveTo(mid + 0.5, py + 80); c.lineTo(mid + 0.5, py + 262); c.stroke();

    // ── 왼쪽 — **캐릭터 + 능력치.** 숫자로 읽기 전에 몸으로 본다.
    //
    // ⚠️⚠️ 첫 판의 왼쪽 칸은 숫자 여섯뿐이었다(사용자: 「능력치 쪽에 캐릭터
    //   보여 주는 게 낫지 않나? 너무 텍스트만 있는데」) — 이 칸의 물음은
    //   「내가 얼마나 세나」이고, 그 답을 숫자로 읽기 전에 몸으로 본다.
    const lx = px + 22;
    // ⚠️⚠️ **격납 표식이 머리줄을 넘으면 안 된다.** 첫 판은 중심을 py+104 에
    //   두고 브래킷 반변을 48 로 잡았는데, 그러면 위 모서리 둘이 py+56 —
    //   가름줄(py+72)보다 **위**라 냇물 같은 세로 획 둘이 소개 글을 가로질렀다
    //   (실측 확대에서 잡았다). 표식은 **판 안(py+80~)에서 시작한다.**
    const hx = px + 125, hy = py + 118, hr = 38;
    // ⚠️ **`mask_crystal_mandala` 은 결이지 면이 아니다.** 알파를 올리면
    //   무늬가 뭉쳐 「행성」이 되어 캐릭터 뒤에 딴 물건이 선다(실측) —
    //   옅게 찍어야 살이 갈라진 격납 문양으로 읽힌다.
    utStamp(c, "mask_crystal_mandala", hx, hy, 58, 58, t * 0.05, HUDLINE, 0.09);
    hudRing(c, hx, hy, hr - 4, { dash: [2, 5], alpha: 0.26 });
    c.save(); c.translate(hx, hy); c.rotate(-t * 0.12);
    hudTicks(c, 0, 0, hr - 4, 24, { len: 3, bigLen: 6, every: 6, alpha: 0.34 });
    c.restore();
    hudBracket(c, hx - hr, hy - hr, hr * 2, hr * 2, 12, { w: 1.4, alpha: 0.55 });
    chHero(c, hx, hy, 24);
    c.textAlign = "center";
    c.fillStyle = HUDDIM; c.font = "10px -apple-system,sans-serif";
    c.fillText("강 화  평 균  Lv " + opt.avgLv, hx, py + 172);
    c.textAlign = "left";

    c.fillStyle = HUDDIM; c.font = hudFont(600, 8);
    c.fillText("능 력 치", lx, py + 188);
    // ⚠️ 줄 사이를 21 로 두면 값(+13)과 다음 줄 이름 사이가 8px 이라 글자가
    //   붙어 보인다(실측 캡처에서 「치명타」가 「+12.4%」에 물렸다). 22 가
    //   여섯 줄이 판 안(py+262)에 들면서 안 붙는 최소치다.
    CH_STATSUM.forEach(([nm, lv, v], i) => {
      const cx2 = lx + (i % 2) * 106, cy2 = py + 200 + Math.floor(i / 2) * 22;
      // 축 이름 + Lv — 「상점에서 무엇을 더 살 수 있나」가 여기서 읽힌다
      c.fillStyle = HUDDIM; c.font = "9px -apple-system,sans-serif";
      c.fillText(nm, cx2, cy2);
      const nw = c.measureText(nm).width;
      c.fillStyle = A(TH.key, 0.76); c.font = hudFont(600, 8.5);
      c.fillText("Lv " + lv, cx2 + nw + 6, cy2);
      c.fillStyle = HUDFAINT;
      c.fillText("/" + CH_LV_CAP, cx2 + nw + 6 + c.measureText("Lv " + lv).width, cy2);
      // 값 — 그 레벨이 지금 내는 것
      c.fillStyle = HUDINK; c.font = hudFont(700, 11);
      c.fillText(v, cx2, cy2 + 13);
    });

    // ── 오른쪽 위 — 들고 가는 것
    //
    // ⭐ 이 글자 + 아래 스무 칸 전부가 **같은 문**이다 — 누른 자리가 첫
    //   탭(덱)이 된다. 규약은 본문 ⑮.
    const rx = mid + 16;
    c.fillStyle = HUDDIM; c.font = hudFont(600, 8);
    c.fillText("들 고  가 는  것", rx, py + 90);
    c.textAlign = "right";
    c.fillStyle = HUDLINE; c.font = "11px -apple-system,sans-serif";
    c.fillText("편집 ›", px + pw - 22, py + 90);
    c.textAlign = "left";
    c.fillStyle = HUDINK; c.font = hudFont(700, 12);
    const cnt = CH_DECK.length + " / " + CH_DECK_CAP;
    c.fillText(cnt, rx, py + 108);
    // ⚠️ **다 안 찼으면 그 사실이 보여야 한다** — 빈 칸을 지우면 「스무 칸짜리」가
    //   화면에서 사라져 「덜 들었다」를 알 수가 없다.
    // ⚠️ 자리는 **재서** 잡는다. 상수(48)로 두면 분수의 자릿수가 바뀌는 날
    //   두 글이 겹친다 — 실제로 「16 / 20빈 칸 4」로 겹쳐 찍혔다.
    const cw = c.measureText(cnt).width;
    c.fillStyle = HUDDIM; c.font = "9.5px -apple-system,sans-serif";
    c.fillText(CH_DECK.length < CH_DECK_CAP ? "빈 칸 " + (CH_DECK_CAP - CH_DECK.length) : "가득",
      rx + cw + 9, py + 108);

    // 아이콘 격자 — 10열 × 2행. 낱개 하나가 스킬 하나다.
    const IS = 19, IG = 4;
    for (let i = 0; i < CH_DECK_CAP; i++) {
      const gx2 = rx + (i % 10) * (IS + IG), gy2 = py + 116 + Math.floor(i / 10) * (IS + IG);
      const tag = CH_DECK[i];
      if (!tag) {
        c.save(); c.setLineDash([2, 3]);
        hudBox(c, gx2 + 0.5, gy2 + 0.5, IS - 1, IS - 1, 4);
        c.strokeStyle = A(HUDFAINT, 0.62); c.lineWidth = 1; c.stroke();
        c.restore();
        continue;
      }
      const col = CH_TAGCOL[tag];
      hudBox(c, gx2 + 0.5, gy2 + 0.5, IS - 1, IS - 1, 4);
      c.fillStyle = A(col, 0.10); c.fill();
      c.strokeStyle = A(col, 0.46); c.lineWidth = 1; c.stroke();
      // 문양 자리 — 시안의 `drawOfferIcon` 이 들어올 칸이다. 여기서는 계열
      // 색의 각진 조각으로 대신한다(**아이콘을 지어내지 않는다**).
      c.fillStyle = A(col, 0.82);
      c.beginPath();
      const mx = gx2 + IS / 2, my = gy2 + IS / 2, rr = 5.0;
      for (let k = 0; k < 7; k++) {
        const a = k / 7 * TAU, rv = rr * (k % 2 ? 0.58 : 1);
        k ? c.lineTo(mx + Math.cos(a) * rv, my + Math.sin(a) * rv * 0.92)
          : c.moveTo(mx + Math.cos(a) * rv, my + Math.sin(a) * rv * 0.92);
      }
      c.closePath(); c.fill();
    }

    // 계열 범례
    c.font = "9px -apple-system,sans-serif";
    let lgx = rx;
    Object.entries(CH_TAGCOL).forEach(([nm, col]) => {
      c.fillStyle = A(col, 0.82); c.fillRect(lgx, py + 167, 6, 6);
      c.fillStyle = HUDDIM; c.fillText(nm, lgx + 10, py + 173);
      lgx += 10 + c.measureText(nm).width + 12;
    });
    c.fillStyle = HUDDIM; c.font = "10px -apple-system,sans-serif";
    c.fillText("성좌 3 / 3   ·   궁극기  개안", rx, py + 189);

    // ── 오른쪽 아래 — 난이도. **칩 넷 한 줄**이다.
    //
    // ⚠️ 첫 판은 세로로 쌓은 큰 버튼 넷이었다(사용자: 「난이도 선택하는 버튼이
    //   너무 크다」) — 넷 중 하나를 고르는 일에 화면의 절반을 쓸 이유가 없다.
    // ⭐ **난이도마다 제 기록이 붙는다** — 그래야 칩이 「고르는 것」이 아니라
    //   「어디까지 해냈나」가 된다.
    c.fillStyle = HUDDIM; c.font = hudFont(600, 8);
    c.fillText("난 이 도", rx, py + 206);
    const CW = 84, CG = 6, CHH = 40, CY = py + 214;
    CH_TIER.forEach((t0, i) => {
      const on = t0.nm === opt.tier;
      const x = rx + i * (CW + CG);
      const chip = () => hudBox(c, x, CY, CW, CHH, 6);
      chip();
      if (on) {
        c.fillStyle = TH.key; chGlowOn(c, TH, 16); c.fill(); chGlowOff(c);
        c.lineWidth = 1; chGlowStroke(c, TH, chip, TH.key);
      } else {
        c.fillStyle = A(HUDLINE, t0.lock ? 0.03 : 0.07); c.fill();
        c.strokeStyle = A(t0.lock ? HUDFAINT : HUDLINE, t0.lock ? 0.40 : 0.34);
        c.lineWidth = 1; chip(); c.stroke();
      }
      c.textAlign = "center";
      // 고른 칩은 바탕이 테마 색이라 글자가 어둡다 — 「색은 화면에 하나」를 칩 안에서 지킨다
      c.fillStyle = on ? TH.ink : (t0.lock ? HUDFAINT : HUDINK);
      c.font = (on ? "600 11px" : "11px") + " -apple-system,sans-serif";
      c.fillText(t0.nm, x + CW / 2, CY + 15);
      // 아랫줄 — **제 기록**. `star` 0 = 아직 안 깼다(비워 두면 「못 깬다」로 읽힌다).
      c.font = hudFont(500, 8);
      if (t0.lock) {
        c.fillStyle = A(HUDFAINT, 0.8);
        c.fillText("★★ 필요", x + CW / 2, CY + 29);
      } else if (t0.star > 0) {
        c.fillStyle = on ? A(TH.ink, 0.64) : A(TH.key, 0.62);
        c.font = "8.5px -apple-system,sans-serif";
        c.fillText("★".repeat(t0.star), x + CW / 2, CY + 27);
        c.fillStyle = on ? A(TH.ink, 0.56) : HUDDIM;
        c.font = hudFont(500, 7.5);
        c.fillText(t0.best, x + CW / 2, CY + 35);
      } else {
        c.fillStyle = on ? A(TH.ink, 0.54) : HUDDIM;
        c.fillText("아직", x + CW / 2, CY + 29);
      }
      c.textAlign = "left";
    });
    // 고른 것의 뜻만 한 줄 — 넷의 배수를 다 적으면 다시 표가 된다
    const sel = CH_TIER.find((q) => q.nm === opt.tier);
    c.fillStyle = HUDDIM; c.font = "9px -apple-system,sans-serif";
    c.fillText("보상 " + sel.mul + "   ·   ★는 그 난이도에서 낸 최고 기록입니다", rx, py + 264);

    // ── 출격 — **나가는 유일한 문.** 폭이 곧 무게다.
    //
    // ⭐⭐ 충전 게이지 — 「출격 버튼을 누르면 **로딩되듯이** 게이지가 가득 차고
    //   **소리가 나며** 진입」(사용자 확정). 왜 즉시 안 나가나 — 출격은
    //   **20분을 거는 결정**이라 ① 잘못 눌렀을 때 손을 뗄 수 있고 ② 「간다」가
    //   사건이 된다. 0.75초는 손을 떼기엔 넉넉하고 기다린다고 느끼기엔 짧다.
    // ⚠️ **누름의 시계도 프레임의 `t` 에서 판다.** 제 `requestAnimationFrame`
    //   을 따로 돌리면 탭이 숨어도 게이지가 도는 자리가 다시 생긴다.
    const bx0 = px + 22, bx1 = px + pw - 22, byT = py + ph - 42, bh = 30;
    if (cv._pressAt === -1) cv._pressAt = t;
    let ch = 0, flash = 0;
    if (cv._pressAt > 0) {
      const el = t - cv._pressAt;
      if (el <= CH_CHARGE_SEC) ch = el / CH_CHARGE_SEC;
      else if (el <= CH_CHARGE_SEC + 0.42) { ch = 1; flash = 1 - (el - CH_CHARGE_SEC) / 0.42; }
      else cv._pressAt = 0;                       // 시안이라 되돌아온다
    }

    const bar = () => {
      c.beginPath();
      c.moveTo(bx0, byT); c.lineTo(bx1 - 10, byT); c.lineTo(bx1, byT + 10);
      c.lineTo(bx1, byT + bh); c.lineTo(bx0 + 10, byT + bh); c.lineTo(bx0, byT + bh - 10);
      c.closePath();
    };
    const g = c.createLinearGradient(bx0, 0, bx1, 0);
    g.addColorStop(0, TH.g0); g.addColorStop(1, TH.g1);
    c.fillStyle = g; bar(); c.fill();
    c.save(); bar(); c.clip();
    utStamp(c, "noise_streak", (bx0 + bx1) / 2, byT + bh / 2, (bx1 - bx0) * 0.5, bh * 1.4, 0, TH.key, 0.10);
    if (ch > 0) {
      // 찬 만큼 — 왼쪽에서 오른쪽으로
      const w = (bx1 - bx0) * ch;
      const gg = c.createLinearGradient(bx0, 0, bx0 + w, 0);
      gg.addColorStop(0, "rgba(" + TH.rgb + ",.30)");
      gg.addColorStop(1, "rgba(" + TH.rgb + ",.62)");
      c.fillStyle = gg; c.fillRect(bx0, byT, w, bh);
      // 앞끝 — **지금 어디까지 찼나**가 선 하나로 읽힌다
      c.fillStyle = "rgba(" + TH.rgb + ",.95)";
      c.fillRect(bx0 + w - 2, byT, 2, bh);
      utStamp(c, "mask_beam_vertical", bx0 + w, byT + bh / 2, 9, bh * 0.9, 0, TH.key, 0.55);
    }
    c.restore();
    c.lineWidth = 1;
    chGlowStroke(c, TH, bar,
      TH.glow ? "rgba(" + TH.rgb + ",.98)" : "rgba(" + TH.rgb + ",.58)");
    // 게이지가 다 차면 섬광 — 「들어간다」의 마침표
    if (flash > 0) {
      c.save(); c.globalCompositeOperation = "lighter";
      c.fillStyle = "rgba(255,255,255," + flash * 0.5 + ")";
      bar(); c.fill(); c.restore();
    }
    // 눌리는 자리를 기억해 둔다 — 클릭 판정이 그림과 어긋나면 안 된다
    cv._bar = [bx0, byT, bx1 - bx0, bh];

    // ── 글자 — **바뀌는 것이 아니라 갈린다** ────────────────────────────
    // ⚠️ 첫 판은 한 줄 삼항이라 글자가 **툭** 바뀌어 촌스러웠다(사용자).
    //   ⭐ 옛 글자는 위로 밀려 나가고 새 글자는 아래에서 올라온다 — 자리를
    //     물려주는 것이 보이면 「바뀌었다」가 아니라 「넘어갔다」가 된다.
    // ⚠️ 겹치는 구간을 짧게 둔다(0.18) — 길면 두 글자가 나란히 떠 「겹쳤다」로
    //   읽힌다.
    const k = ch <= 0 ? 0 : Math.min(1, ch / 0.18);
    const ease = k * k * (3 - 2 * k);              // smoothstep — 끝이 부드럽다
    const cxT = (bx0 + bx1) / 2 - 34;
    c.textAlign = "center";
    c.save(); bar(); c.clip();                      // 띠 밖으로 안 새어 나간다
    chGlowOn(c, TH, 12);
    c.font = "600 14px -apple-system,sans-serif";
    c.fillStyle = TH.key;
    if (ease < 1) { c.globalAlpha = 1 - ease; c.fillText("출 격", cxT, byT + 20 - ease * 16); }
    if (ease > 0) { c.globalAlpha = ease; c.fillText("출 격 중", cxT, byT + 20 + (1 - ease) * 16); }
    c.globalAlpha = 1;
    chGlowOff(c);
    // 오른쪽 꼬리표도 같이 갈린다 — 「보상 ×1.6」 자리에 진행률이 든다
    c.fillStyle = HUDDIM; c.font = hudFont(500, 9.5);
    const cxS = (bx0 + bx1) / 2 + 56;
    if (ease < 1) { c.globalAlpha = 1 - ease; c.fillText(opt.tier + " · 보상 " + sel.mul, cxS, byT + 20 - ease * 16); }
    if (ease > 0) { c.globalAlpha = ease; c.fillText(Math.round(ch * 100) + "%", cxS, byT + 20 + (1 - ease) * 16); }
    c.globalAlpha = 1;
    c.restore();
    c.textAlign = "left";
  };
}

// ── 소리 — **「지-잉」** ────────────────────────────────────────────────────
//
// ⚠️ WebAudio 는 **사용자가 누르기 전엔 소리를 못 낸다**(자동재생 정책). 그래서
//   `AudioContext` 를 미리 안 만들고 **첫 클릭에** 만든다 — 미리 만들면
//   `suspended` 로 태어나 첫 소리가 통째로 사라진다.
const CH_CHARGE_SEC = 0.75;
let CH_AC = null;
function chSndCharge(sec) {
  try {
    CH_AC = CH_AC || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = CH_AC.currentTime;
    // 몸통 — 톱니가 **차오르는 소리**의 뼈대다(사인은 너무 곱고 사각은 거칠다)
    const o = CH_AC.createOscillator(), g = CH_AC.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(120, t0);
    o.frequency.exponentialRampToValueAtTime(520, t0 + sec);   // 지 —— 잉
    // ⚠️ 로우패스를 같이 열어야 「음이 올라간다」가 아니라 **「차오른다」**가 된다
    const lp = CH_AC.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(400, t0);
    lp.frequency.exponentialRampToValueAtTime(3600, t0 + sec);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.14, t0 + sec * 0.25);
    g.gain.exponentialRampToValueAtTime(0.20, t0 + sec);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + sec + 0.18);
    o.connect(lp); lp.connect(g); g.connect(CH_AC.destination);
    o.start(t0); o.stop(t0 + sec + 0.2);
    // 마침 — 다 차는 순간의 「탁」. 이게 없으면 끝이 흐지부지하다.
    const o2 = CH_AC.createOscillator(), g2 = CH_AC.createGain();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(880, t0 + sec);
    o2.frequency.exponentialRampToValueAtTime(220, t0 + sec + 0.16);
    g2.gain.setValueAtTime(0.22, t0 + sec);
    g2.gain.exponentialRampToValueAtTime(0.0001, t0 + sec + 0.22);
    o2.connect(g2); g2.connect(CH_AC.destination);
    o2.start(t0 + sec); o2.stop(t0 + sec + 0.24);
  } catch (e) { /* 소리는 있으면 좋은 것이지 없으면 안 되는 것이 아니다 */ }
}

// ── 누르기 ────────────────────────────────────────────────────────────────
// ⚠️ 캔버스는 좌표가 **CSS 픽셀**로 온다 — 백버퍼(dpr 배)로 재면 두 배 어긋난다.
function chArmSortie(cv) {
  cv._pressAt = 0;
  cv.style.cursor = "pointer";
  cv.addEventListener("pointerdown", (e) => {
    const b = cv._bar;
    if (!b || cv._pressAt) return;
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (CH_W / r.width);
    const y = (e.clientY - r.top) * (CH_H / r.height);
    if (x < b[0] || x > b[0] + b[2] || y < b[1] || y > b[1] + b[3]) return;
    cv._pressAt = -1;                    // 다음 프레임의 `t` 가 시작점이 된다
    chSndCharge(CH_CHARGE_SEC);
  });
}

// ══════════════════════════════════════════════════════════════════════════
// 마운트
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 레일은 [hudRail] 이 `LBRAIL` 을 그대로 읽는다 — **여섯 칸**이다(홈 · 상점 ·
//   강화 · 도감 · 일지 · 관측소). 옛 판은 제 손으로 다섯을 적어 강화가 빠져
//   있었다. 목록을 베끼는 자리가 없어지면 그 사고가 다시 안 난다.

// ── 깬 기록 — **[가장 어려운 난이도, 그 난이도에서 받은 별]** ─────────────
// ⭐ **쌍이다.** 색과 별이 **같은 판**에서 나와야 한다 — 쉬움에서 ★★★ 이고
//   매우어려움에서 ★ 인 사람의 칸에 「보라 + ★★★」을 적으면 **하지도 않은
//   일**이 화면에 뜬다. 그래서 별을 해시로 뽑던 첫 판을 걷었다.
const CH_BEST1 = [
  ["보통", 3], ["매우어려움", 2], ["어려움", 3], ["쉬움", 1], null,
  null, null, null, null, null, null, null];
const CH_BEST2 = [["보통", 2], ["어려움", 3], null, null, null, null, null, null];
const CH_BEST3 = [
  ["매우어려움", 3], ["어려움", 2], ["어려움", 3], ["보통", 1], ["매우어려움", 1],
  ["쉬움", 3], ["보통", 2], ["어려움", 2], ["쉬움", 1],
  null, null, null, null, null];

/// 팝업 넷이 같이 쓰는 판 — **1장 지도 위에 뜬다**(⑤~⑦도 같은 자리다).
const CH_BASE = {
  shape: "E3", count: 12, at: 5, seed: 3, best: CH_BEST1,
  avgLv: 24,
  title: "1장 · 스며드는 어둠",
  stage: "1-5 「얕은 여울」",
  blurb: "표류가 벽을 이룬다 — 서서 벨 수 있는 자리",
};

/// 화면 한 장을 세운다 — 배경 캔버스 · 레일 · (팝업이면) 팝업 캔버스.
function chMount(p, opt) {
  const bg = $(p + "-bg");
  if (bg) mk(bg, [CH_W, CH_H], chScreenBg(opt), { clear: true });
  hudRail(p + "-rail", "watch");
  if (opt.tier) {
    const pop = $(p + "-pop");
    if (pop) { mk(pop, [CH_W, CH_H], chPopupLayer(pop, opt), { clear: true }); chArmSortie(pop); }
  }
}

chMount("ch0", { depth1: true, seed: 5 });
chMount("ch1", { shape: "E3", count: 12, at: 5, seed: 3, best: CH_BEST1 });
chMount("ch2", { shape: "S0", count: 8, at: 3, seed: 17, best: CH_BEST2 });
chMount("ch3", { shape: "Sb", count: 14, at: 9, seed: 31, best: CH_BEST3 });
CH_TIERS.forEach((tier, i) => chMount("ch" + (4 + i), Object.assign({}, CH_BASE, { tier })));
