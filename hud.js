// ══════════════════════════════════════════════════════════════════════════
// HUD — SF HUD 공용 키트                                        (docs/vfx/hud.js)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 인트로 · 홈 · 강화 · 상점 · 도감 · 출격일지 여섯 화면을 「짙은 남색 바탕 +
// 시안 얇은 선 + 각진 프레임」 SF HUD 로 다시 그리는 작업 중, 이 파일은
// **여섯이 같이 쓰는 부품통**이다. 이 파일을 만든 손은 인트로·홈 둘만 그리고
// (`mockup-hud-intro.html` · `mockup-hud-home.html`), 나머지 넷은 다른 손이
// 이 키트 위에 얹는다 — 그래서 부품은 **범용**이어야 하고, 그 두 장에서만
// 통하는 값(문구·배치)은 여기 두지 않는다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️⚠️ **`vfx.js`(5만 줄+)는 읽기만 한다.** 새 그림을 그 파일에 얹지 않는다 —
//   `vfx-levelcard.js` 가 세운 선례를 그대로 따른다: 새 파일을 만들고
//   HTML 에서 `vfx.js` **뒤에** 싣는다.
// ⚠️⚠️ **최상위 이름을 전부 `hud`/`HUD` 로 격리한다.** `vfx.js` 가 5만 줄이라
//   흔한 이름(`ease`·`clamp`·`ring`…)은 이미 다른 뜻으로 쓰이고 있을 가능성이
//   높다 — 실제로 `vfx.js` 안에도 **같은 이름의 최상위 `function` 이 두 번
//   선언돼 뒤엣것이 앞엣것을 조용히 덮는 자리**가 있다(`lbStars`, 15096행의
//   캔버스 성표와 16024행의 별점 문자열이 이름이 같다). 이 파일은 그 함정을
//   피하려고 `lbStars` 류의 전역을 아예 안 빌리고 배경은 직접 그린다.
// ⚠️⚠️ **`A()`/`c.fillStyle`/`c.strokeStyle` 는 `#RRGGBB` 만 받는다.** 캔버스는
//   잘못된 색 문자열을 예외 없이 조용히 무시한다 — 면이 안 보이면 밝기가
//   아니라 칠 문자열부터 검산한다. 이 파일의 색은 전부 6자리 16진수다.
// ⚠️⚠️ **루프 애니메이션은 위상 파생값을 따로 그리지 마라.** 주기 끝(u=1)과
//   시작(u=0)이 **같은 값**이라야 이음매가 안 끊긴다 — 이 저장소가 같은
//   원인으로 네 번 반려된 이력이 있다. 이 파일의 모든 반복 요소는 둘 중
//   하나다: ① `t*속도` 를 그대로 각도에 먹이는 **연속 회전**(사인/코사인은
//   원래 이음매가 없다), ② `hudOpenLoop` 처럼 **창 함수가 구간 밖에서 0 으로
//   수렴**해 u=0 과 u=1 이 둘 다 0 인 것. 「누적기」·「지난 프레임과의 차이」로
//   위상을 만들지 않는다 — 그 값은 프레임이 스킵되면 실제 시간과 어긋난다.
//
// ── 기존 것 재사용 (새로 안 그린 것) ──────────────────────────────────────
// `vfx.js` 를 먼저 읽고 겹치는 것은 그대로 불렀다:
//   `celGauge`  부채꼴 게이지 — [hudDial] 이 그대로 감싼다
//   `celHoop`   3단 계조 링 — 큰 반경의 「아우라」 자리에 그대로 쓴다
//   `celStroke` 3중 발광 획 — 브래킷 모서리 · 스윕선에 그대로 쓴다
//   `gHalo`·`gFlare` 중심 발광 — 리액터 코어에 그대로 쓴다
//   `arcPts`    호 위의 점열 — 브래킷·톱니 좌표를 여기서 뽑는다
//   `toneOf("frost")` = `[#123A5E,#4FC3F7,#E8F8FF]` — 딥네이비/하늘색/거의
//     흰빛. **새 팔레트를 만들지 않고 이 삼색을 그대로 빌린다** — SF HUD
//     냉광이 원하는 계조와 정확히 같다.
//   `lbText`    외곽선 있는 채움 글자
//   `A`·`TAU`·`hash`·`jagPoly`·`fillPoly` — 그대로.
// 겹치지 않아 새로 그린 것: 눈금 고리 · 점선 궤도 · 막대/파형 그래프 ·
//   모서리 브래킷을 사각 패널에 두르는 조립 · 각진 버튼/탭 CSS · 스캔라인·
//   격자 배경 · 여는 연출 시퀀서 · 부팅 문구 타임라인 · 공용 허브 레일.
"use strict";

// ── 팔레트 ──────────────────────────────────────────────────────────────
// 구조색(냉광) = 시안의 frost 톤을 빌린다. 선택/주 버튼 색은 **사이트 전역
// 규약을 그대로 쓴다** — 「색은 주 버튼 하나뿐」(`vfx.css`:root 의
// --gold/--amber). 두 계가 안 섞이는 이유: 냉광은 「기계가 늘 켜 두는 것」,
// 금빛은 「지금 누를 수 있는 단 하나」다 — 팔레트가 다르면 그 구분이 안
// 그려도 저절로 읽힌다.
const HUDK = "frost";                  // toneOf(HUDK) = [딥네이비, 하늘색, 거의흰빛]
const HUDINK = "#D8F2FF";              // 본문 글자 — 살짝 푸른 흰빛
const HUDDIM = "#6E93AD";              // 보조 글자
const HUDFAINT = "#3A5468";            // 가장 옅은 구조선(격자·비활성 눈금)
const HUDBASE = "#050B14";             // 패널 바탕 — 순검정보다 밝아 「유리판」으로 읽힌다
const HUDLINE = "#4FC3F7";             // 구조선 본색(=frost[1])
const HUDGLOW = "#E8F8FF";             // 구조선 하이라이트(=frost[2])
const HUDSEL = "#FFD27A";              // = --gold, 이 화면에서 「지금 누를 수 있는 것」
const HUDACC = "#FF8A3D";              // = --amber, 라벨/킥커 — 기존 관례 그대로
const HUDWARN = "#FF6A5A";             // 경고/부족 — HURT(#FF3B5C)와 안 겹치는 붉은끼

/// 캔버스에서 자주 쓰는 세 톤을 한 번에 — `toneOf(HUDK)` 를 매번 안 풀어써도 되게.
function hudTone() { return toneOf(HUDK); }

// ── 수식 도구 ─────────────────────────────────────────────────────────────
function hudCl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function hudEase(v) { const u = hudCl(v); return u * u * (3 - 2 * u); }
/// 주기 함수 하나에서 나는 종 모양 펄스(0..1). `phase=0`이면 u=.5에서 정점,
/// `phase=.5`면 u=0(=1, 주기의 이음매)에서 정점 — **이음매를 가리는 플래시**는
/// 이 두 번째 꼴로 쓴다. cos 기반이라 u=0/u=1 값이 항상 같다(=이음매 안전).
function hudBump(u, p, phase) {
  return Math.pow(0.5 - 0.5 * Math.cos(TAU * (u - (phase || 0))), p == null ? 6 : p);
}

// ══════════════════════════════════════════════════════════════════════════
// ① 배경 결 — 격자 · 스캔라인 · 비네트                               (CSS)
// ══════════════════════════════════════════════════════════════════════════
// **캔버스가 아니라 CSS 로 깐다.** 이 저장소의 오랜 병목은 GPU 채우기다
// (「화려함의 비용은 개수가 아니라 픽셀 면적」) — 화면 전체를 매 프레임
// 캔버스로 덮으면 그 값을 그대로 문다. `repeating-linear-gradient` 배경은
// GPU 합성 레이어로 붙어 비용이 훨씬 싸다. `mockup-ui.html` 의 `.ovworld`
// (「캔버스 없이 CSS 로만」)와 같은 결정이다.

const HUDCSS = `
.hudscreen{position:relative;background:${HUDBASE}}
/* 격자 — 아주 옅게. 진하면 「계기판」이 아니라 「모눈종이」로 읽힌다. */
.hudgrid{position:absolute;inset:0;z-index:1;pointer-events:none;
  background-image:
    linear-gradient(${HUDFAINT}22 1px,transparent 1px),
    linear-gradient(90deg,${HUDFAINT}22 1px,transparent 1px);
  background-size:28px 28px;
  -webkit-mask-image:radial-gradient(120% 90% at 50% 46%,#000 55%,transparent 100%);
          mask-image:radial-gradient(120% 90% at 50% 46%,#000 55%,transparent 100%)}
/* 스캔라인 — 가는 수평 결 + 위에서 아래로 도는 밝은 띠 하나. 띠의 이동은
   background-position 을 배경 타일 높이(정확히 6px)만큼 옮기는 것이라
   애니메이션이 저절로 이음매 없이 돈다(한 바퀴 돈 자리가 시작과 픽셀
   단위로 같다) — JS 로 위상을 셀 필요가 없는 자리는 CSS 에 맡긴다. */
.hudscan{position:absolute;inset:0;z-index:6;pointer-events:none;mix-blend-mode:screen;
  background:repeating-linear-gradient(180deg,${HUDLINE}00 0,${HUDLINE}00 5px,${HUDLINE}14 6px);
  animation:hudscanmove 5s linear infinite}
@keyframes hudscanmove{from{background-position:0 0}to{background-position:0 240px}}
/* 비네트 — 가장자리를 죽여 안쪽 판독값에 시선이 남게. */
.hudvig{position:absolute;inset:0;z-index:7;pointer-events:none;
  background:radial-gradient(120% 85% at 50% 46%,transparent 58%,#02050966 100%)}

/* ── 패널 — 모서리 하나를 크게 자른 각진 틀 + 이중 테 ─────────────────── */
.hudpanel{position:relative;background:linear-gradient(160deg,${HUDBASE} 0%,#081422 100%);
  border:1px solid ${HUDLINE}55;
  box-shadow:inset 0 0 0 1px ${HUDLINE}18,inset 0 1px 0 ${HUDGLOW}22;
  clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.hudpanel>.hd{display:flex;align-items:center;gap:8px;padding:7px 12px 6px 16px;
  border-bottom:1px solid ${HUDLINE}33;font-size:9.5px;letter-spacing:.22em;
  text-transform:uppercase;color:${HUDDIM}}
.hudpanel>.hd b{color:${HUDINK};font-weight:600;letter-spacing:.16em}
.hudpanel>.bd{padding:10px 14px 12px 16px}
/* 모서리 브래킷 — 잘리지 않은 세 모서리(우상·좌하·우하)에만 세운다. 잘린
   모서리(좌상)는 이미 각으로 「틀」임을 말하고 있어 거기까지 브래킷을
   더하면 그 모서리만 두 겹으로 진해진다. hudPanels() 가 자동으로 붙인다. */
.hudpanel .hc{position:absolute;width:10px;height:10px;pointer-events:none;
  border-color:${HUDLINE}CC}
.hudpanel .hc.tr{top:-1px;right:-1px;border-top:1.5px solid;border-right:1.5px solid}
.hudpanel .hc.bl{bottom:-1px;left:-1px;border-bottom:1.5px solid;border-left:1.5px solid}
.hudpanel .hc.br{bottom:-1px;right:-1px;border-bottom:1.5px solid;border-right:1.5px solid}
.hudpanel.on{border-color:${HUDSEL}77;box-shadow:inset 0 0 0 1px ${HUDSEL}22,0 0 26px -10px ${HUDSEL}99}
.hudpanel.on .hc{border-color:${HUDSEL}CC}

/* ── 버튼 — 한 모서리만 자른다(기존 .cut 문법과 같은 각). 냉광 = 보통,
   금빛 = 이 화면의 그 하나뿐인 주 버튼. ─────────────────────────────── */
.hudbtn{position:relative;display:inline-flex;align-items:center;justify-content:center;
  gap:6px;height:38px;padding:0 16px;font:inherit;font-size:12px;font-weight:600;
  letter-spacing:.08em;color:${HUDINK};cursor:pointer;
  background:linear-gradient(180deg,#0C2032 0%,#081422 100%);
  border:1px solid ${HUDLINE}66;
  box-shadow:inset 0 1px 0 ${HUDGLOW}22;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  transition:background-color .12s,border-color .12s}
.hudbtn:hover,.hudbtn.hover{border-color:${HUDLINE}CC;background:linear-gradient(180deg,#12314A 0%,#0B1D2E 100%)}
.hudbtn.sel,.hudbtn.on{color:#241505;border-color:${HUDSEL};
  background:linear-gradient(180deg,#FFE3A8 0%,${HUDSEL} 62%,#E3B15C 100%);
  box-shadow:inset 0 1px 0 #FFF5DC99,0 0 20px -6px ${HUDSEL}CC}
.hudbtn.ghost{background:transparent}
.hudbtn.lock{color:${HUDFAINT};border-color:${HUDFAINT}55;cursor:default;
  background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}
.hudbtn.lock:hover{border-color:${HUDFAINT}55;background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}
.hudbtn .k{font-size:9px;letter-spacing:.14em;opacity:.72}

/* ── 탭 — 가로로 늘어선 갈래. 현재 칸만 냉광 밑줄 + 밝은 글자. ─────────── */
.hudtabs{display:flex;gap:2px}
.hudtab{position:relative;padding:8px 13px 9px;font-size:11px;letter-spacing:.06em;
  color:${HUDDIM};cursor:pointer;border-bottom:2px solid transparent}
.hudtab.on{color:${HUDINK};border-bottom-color:${HUDLINE};text-shadow:0 0 12px ${HUDLINE}88}
.hudtab .soon{margin-left:5px;font-size:8.5px;letter-spacing:.1em;color:${HUDACC}88}

/* ── 칩 — 인라인 데이터 판독값. ────────────────────────────────────────── */
.hudchip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;font-size:10.5px;
  font-variant-numeric:tabular-nums;color:${HUDINK};background:${HUDLINE}14;
  border:1px solid ${HUDLINE}3D;
  clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
.hudchip b{color:${HUDGLOW};font-weight:700}

/* ── 허브 레일 — lbRail() 과 같은 자리 · 각진 냉광 스킨만 새로 입힌다. ── */
.hudrail{display:flex;flex-direction:column;gap:3px}
.hudrail .r{display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:6px 2px 5px;position:relative;color:${HUDDIM};
  border:1px solid transparent}
.hudrail .r.on{color:${HUDINK};border-color:${HUDLINE}55;background:${HUDLINE}12;
  box-shadow:inset 0 0 12px -4px ${HUDLINE}AA}
.hudrail .r.on::before{content:"";position:absolute;left:3px;top:3px;width:4px;height:4px;
  background:${HUDLINE};box-shadow:0 0 6px 1px ${HUDLINE}}
.hudrail .r .nm{font-size:8.5px;letter-spacing:.06em}
.hudrail .r.soon .nm{opacity:.4}
`;

/// CSS 를 한 번만 심는다 — 페이지가 이 파일을 두 번 싣는 사고를 대비한다
/// (`nav.js` 가 같은 이유로 `window.__navDrawn` 가드를 쓰는 것과 같은 자리).
function hudInjectCSS() {
  if (typeof document === "undefined" || !document.createElement) return;
  if (window.__hudCSS) return;
  window.__hudCSS = 1;
  const st = document.createElement("style");
  st.textContent = HUDCSS;
  // ⚠️ 스모크 스텁의 `document` 에는 `head` 가 없다 — `&&` 로 조용히 건너뛴다.
  document.head && document.head.appendChild(st);
}
hudInjectCSS();

/// `.hudpanel` 마다 모서리 브래킷 셋(우상·좌하·우하)을 붙인다. 저자는
/// `<div class="hudpanel">` 만 쓰면 되고, 브래킷을 손으로 3개씩 안 적어도 된다.
function hudPanels() {
  if (typeof document === "undefined" || !document.querySelectorAll) return;
  document.querySelectorAll(".hudpanel").forEach((p) => {
    if (p.__hudDeco) return; p.__hudDeco = 1;
    for (const cls of ["tr", "bl", "br"]) {
      const i = document.createElement("i");
      i.className = "hc " + cls;
      p.appendChild(i);
    }
  });
}
hudPanels();

// ══════════════════════════════════════════════════════════════════════════
// ② 원형 요소 — 눈금 고리 · 레이더/리액터 · 게이지 · 궤도                (canvas)
// ══════════════════════════════════════════════════════════════════════════

/// 옅은 뼈대 링 하나(글로 없이 — celHoop 은 3단 계조라 여러 겹 겹치면
/// 너무 무거워진다). `dash` 를 주면 점선 궤도의 재료가 된다.
function hudRing(c, x, y, r, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  c.save();
  if (o.dash) c.setLineDash(o.dash);
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.5 : o.alpha);
  c.lineWidth = o.w || 1;
  c.beginPath(); c.arc(x, y, r, o.a0 || 0, o.a1 == null ? TAU : o.a1); c.stroke();
  c.restore();
}

/// 원 둘레의 눈금 — 시계 문자반 문법. `big` 배수마다 더 길고 밝은 눈금.
function hudTicks(c, x, y, r, n, opt) {
  if (!(r > 0) || !(n > 0)) return;
  const o = opt || {};
  const len = o.len || 5, bigLen = o.bigLen || len * 1.8, every = o.every || 5;
  for (let i = 0; i < n; i++) {
    const big = every > 0 && i % every === 0;
    const L = big ? bigLen : len;
    const a = (i / n) * TAU;
    const x0 = x + Math.cos(a) * r, y0 = y + Math.sin(a) * r;
    const x1 = x + Math.cos(a) * (r + L), y1 = y + Math.sin(a) * (r + L);
    c.strokeStyle = A(o.color || HUDLINE, (big ? 0.85 : 0.4) * (o.alpha == null ? 1 : o.alpha));
    c.lineWidth = big ? 1.6 : 1;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  }
}

/// 레이더/리액터 — **참조 이미지의 큰 동심원 구조**. 겹치는 링 여러 겹 +
/// 눈금 고리 + 크로스헤어 + 회전 스윕(연속 회전이라 이음매가 없다) + 중심 발광.
/// opt: {rings:[반경비...], sweep:bool, sweepSpeed, cross:bool, core:0..1}
function hudRadar(c, x, y, r, t, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  const rings = o.rings || [1, 0.74, 0.5, 0.28];
  rings.forEach((k, i) => hudRing(c, x, y, r * k, { alpha: 0.30 - i * 0.03, w: 1 }));
  hudTicks(c, x, y, r * 1.06, o.ticks || 48, { len: 4, bigLen: 9, every: 6, alpha: 0.6 });
  if (o.cross !== false) {
    hudRing(c, x, y, r * 0.74, { dash: [1, 5], alpha: 0.35, w: 1 });
    c.strokeStyle = A(HUDLINE, 0.18); c.lineWidth = 1;
    c.beginPath(); c.moveTo(x - r * 1.02, y); c.lineTo(x + r * 1.02, y);
    c.moveTo(x, y - r * 1.02); c.lineTo(x, y + r * 1.02); c.stroke();
  }
  if (o.sweep !== false) {
    const a = t * (o.sweepSpeed || 0.7);
    const g = c.createLinearGradient(x, y, x + Math.cos(a) * r, y + Math.sin(a) * r);
    g.addColorStop(0, A(HUDGLOW, 0.55)); g.addColorStop(1, A(HUDGLOW, 0));
    c.save(); c.beginPath(); c.arc(x, y, r, 0, TAU); c.clip();
    c.fillStyle = g;
    c.beginPath(); c.moveTo(x, y);
    c.arc(x, y, r, a - 0.5, a); c.closePath(); c.fill();
    c.restore();
    c.strokeStyle = A(HUDGLOW, 0.8); c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.stroke();
  }
  if (o.core !== 0) gHalo(c, x, y, r * 0.30, HUDK, o.core == null ? 0.8 : o.core);
}

/// 부채꼴 게이지 — `celGauge` 를 감싼다. 배경 링(못 채운 부분) + 진행 호 +
/// 가운데 퍼센트 숫자(옵션). 참조 이미지의 「60%」·「30%」 다이얼과 같은 자리.
function hudDial(c, x, y, r, pct, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  hudRing(c, x, y, r, { w: o.w || 4, alpha: 0.18 });
  celGauge(c, x, y, r, hudCl(pct), o.w || 4, HUDK, 0.95);
  if (o.label !== false) {
    c.textAlign = "center"; c.textBaseline = "middle";
    c.font = hudFont(700, o.fs || r * 0.44);
    c.fillStyle = HUDINK;
    c.fillText(Math.round(pct * 100) + "%", x, y);
    c.textAlign = "left"; c.textBaseline = "alphabetic";
  }
}

/// 점선 궤도 — 타원 하나 + 그 위를 도는 점 n개(연속 회전이라 이음매가 없다).
function hudOrbit(c, x, y, rx, ry, t, opt) {
  if (!(rx > 0) || !(ry > 0)) return;
  const o = opt || {};
  c.save(); c.setLineDash(o.dash || [2, 6]);
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.4 : o.alpha);
  c.lineWidth = o.w || 1;
  c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.stroke();
  c.restore();
  const n = o.dots == null ? 1 : o.dots;
  for (let i = 0; i < n; i++) {
    const a = t * (o.speed || 0.5) + (i / n) * TAU;
    const px = x + Math.cos(a) * rx, py = y + Math.sin(a) * ry;
    gHalo(c, px, py, o.dotR || 3.2, HUDK, 0.9);
  }
}

/// 아주 작은 맥동 표식 — 항로도·읽음 표시에 쓰는 점 하나.
function hudBlip(c, x, y, r, t, opt) {
  const o = opt || {};
  const p = 0.7 + 0.3 * Math.sin(t * (o.speed || 3));
  gHalo(c, x, y, r * p, HUDK, o.alpha == null ? 0.9 : o.alpha);
}

// ══════════════════════════════════════════════════════════════════════════
// ③ 막대 · 파형 — 데이터 판독 결                                     (canvas)
// ══════════════════════════════════════════════════════════════════════════

/// 세로 막대 그래프. `vals` 는 0..1 배열이거나 `(i,n,t)=>0..1` 함수 —
/// 함수를 주면 절차적으로 「살아 움직이는」 판독값이 된다(진짜 데이터가
/// 없는 장식용 자리가 이 kit 을 쓰는 대부분이므로 함수 쪽이 기본값에 가깝다).
/// ⚠️ **난수 대신 `hash`** — 매 프레임 값이 다시 뽑히면 막대가 지지직댄다.
/// 정수 초 단위로만 갱신하고 그 사이는 이전 값에서 다음 값으로 부드럽게 간다.
function hudBars(c, x, y, w, h, vals, opt) {
  const o = opt || {}, n = o.n || (Array.isArray(vals) ? vals.length : 16);
  const gap = o.gap == null ? 2 : o.gap, bw = (w - gap * (n - 1)) / n;
  const t = o.t || 0;
  for (let i = 0; i < n; i++) {
    let v;
    if (Array.isArray(vals)) v = vals[i] || 0;
    else {
      const seed = i * 3.71, step = Math.floor(t * 1.4), f = (t * 1.4) % 1;
      const a = hash(seed + step), b = hash(seed + step + 1);
      v = vals ? vals(i, n, t) : (0.15 + 0.75 * (a + (b - a) * hudEase(f)));
    }
    v = hudCl(v);
    const bx = x + i * (bw + gap), bh = Math.max(1, h * v);
    c.fillStyle = A(o.color || HUDLINE, 0.20);
    c.fillRect(bx, y, bw, h);
    c.fillStyle = A(o.color || HUDLINE, o.alpha == null ? 0.85 : o.alpha);
    c.fillRect(bx, y + (h - bh), bw, bh);
  }
}

/// 파형(스파크라인) — 사인 성분 셋을 더한 연속 함수라 이음매 걱정이 없다
/// (모듈로 위상이 아니라 `t` 를 그대로 먹인다).
function hudWave(c, x, y, w, h, t, opt) {
  const o = opt || {}, n = o.n || 48, amp = h * 0.42, sp = o.speed || 1;
  c.beginPath();
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const v = Math.sin(u * 11 + t * sp) * 0.5
      + Math.sin(u * 23 - t * sp * 1.7 + 1.3) * 0.3
      + Math.sin(u * 5 + t * sp * 0.6 + 2.1) * 0.2;
    const py = y + h / 2 - v * amp;
    i ? c.lineTo(x + u * w, py) : c.moveTo(x + u * w, py);
  }
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.85 : o.alpha);
  c.lineWidth = o.w || 1.4; c.lineJoin = "round"; c.stroke();
}

// ══════════════════════════════════════════════════════════════════════════
// ④ 브래킷 — 사각을 두르는 뷰파인더 프레임                            (canvas)
// ══════════════════════════════════════════════════════════════════════════
// `.hudpanel` 은 CSS 로 두르지만, **배경 캔버스 위에 직접 그리는** 큰 초점
// 프레임(캐릭터·리액터를 둘러싸는 것 같은)은 좌표가 캔버스 픽셀이라 CSS 로
// 못 맞춘다 — 그 자리를 위한 canvas 버전. `celStroke` 의 발광 획을 그대로 쓴다.
function hudBracket(c, x, y, w, h, len, opt) {
  const o = opt || {}, L = len || Math.min(w, h) * 0.16, wid = o.w || 2.4;
  const corners = o.only || ["tl", "tr", "bl", "br"];
  const map = {
    tl: [[x, y + L], [x, y], [x + L, y]],
    tr: [[x + w - L, y], [x + w, y], [x + w, y + L]],
    bl: [[x, y + h - L], [x, y + h], [x + L, y + h]],
    br: [[x + w - L, y + h], [x + w, y + h], [x + w, y + h - L]],
  };
  corners.forEach((k) => { if (map[k]) celStroke(c, map[k], wid, HUDK, o.alpha == null ? 1 : o.alpha); });
}

// ══════════════════════════════════════════════════════════════════════════
// ⑤ 글자 — 판독값용 모노스페이스                                     (canvas)
// ══════════════════════════════════════════════════════════════════════════
// `LBFONT` 는 UI 본문 서체(둥근 고딕)라 데이터 판독값에는 자간이 안 맞는다.
// 여기는 **표 숫자가 나란해야** 하는 자리라 모노스페이스를 쓴다 — 다른
// 목적이라 다른 함수다(사본이 아니다).
function hudFont(w, s) {
  return `${w} ${s}px "SF Mono",ui-monospace,Menlo,Consolas,monospace`;
}

/// 라벨 + 값 한 줄 판독값 — 「WR/RT 735.37.36」 류.
function hudReadout(c, x, y, label, value, opt) {
  const o = opt || {};
  c.textAlign = o.align || "left"; c.textBaseline = "alphabetic";
  c.font = hudFont(500, o.fs || 8.5); c.fillStyle = A(HUDDIM, o.alpha == null ? 1 : o.alpha);
  lbText(c, label, x, y);
  c.font = hudFont(700, (o.fs || 8.5) + 1.5); c.fillStyle = A(HUDINK, o.alpha == null ? 1 : o.alpha);
  lbText(c, value, x, y + (o.gap == null ? 12 : o.gap));
  c.textAlign = "left";
}

// ══════════════════════════════════════════════════════════════════════════
// ⑥ 등장 애니메이션 — 선이 그어지고 → 면이 차고 → 내용이 뜬다        (수식)
// ══════════════════════════════════════════════════════════════════════════
// 화면 전환 한 번(진입)에는 [u] 를 **단조 증가**(`Math.min(1,(t-t0)/dur)`)로
// 넘긴다 — u=1 에 닿으면 계속 1 이니 되풀이될 일이 없어 이음매를 신경 안
// 써도 된다. 이 시안처럼 실제 화면전환 이벤트가 없어 **되풀이해서 보여줘야**
// 할 때만 [u] 에 `(t%period)/period` 를 넘긴다 — 그 경우를 위해 이 함수
// 자체가 **열림→유지→닫힘→(꺼짐)** 을 한 창 안에 다 넣어서, u=0 과 u=1
// 양끝이 항상 「꺼짐(0)」으로 같다. 그래서 반복 호출도 안전하다.
function hudOpenLoop(u, opt) {
  const o = opt || {};
  const o0 = o.o0 == null ? 0.04 : o.o0, oDur = o.oDur == null ? 0.16 : o.oDur;
  const hold = o.hold == null ? 0.66 : o.hold, cDur = o.cDur == null ? 0.10 : o.cDur;
  const o1 = o0 + oDur, c0 = hold, c1 = c0 + cDur;
  let k = 0, closing = 0;
  if (u < o0) k = 0;
  else if (u < o1) k = (u - o0) / oDur;
  else if (u < c0) k = 1;
  else if (u < c1) { k = 1; closing = (u - c0) / cDur; }
  else k = 0;
  const stage = (a, b) => hudEase(hudCl((k - a) / (b - a)));
  const openFall = 1 - hudEase(closing);
  return {
    line: stage(0, 0.40) * openFall,
    fill: stage(0.30, 0.75) * (1 - hudEase(Math.min(1, closing * 1.2))),
    content: stage(0.65, 1.0) * (1 - hudEase(Math.min(1, closing * 1.5))),
    k, closing,
  };
}

/// 타임라인 구간표에서 지금 [u] 가 속한 구간을 찾는다 — 부팅 문구·퍼센트처럼
/// 「구간마다 다른 문구 + 그 안에서 선형 보간되는 수치」에 공용으로 쓴다.
/// segs: [{start,end,label,pFrom,pTo}]. 못 찾으면 마지막 구간이 붙든 것으로.
function hudPhaseAt(u, segs) {
  for (const s of segs) {
    if (u >= s.start && u < s.end) {
      const k = hudEase((u - s.start) / (s.end - s.start));
      const pct = s.pFrom == null ? null : s.pFrom + (s.pTo - s.pFrom) * k;
      return { label: s.label, pct, k };
    }
  }
  const last = segs[segs.length - 1];
  return { label: last ? last.label : "", pct: last && last.pTo, k: 1 };
}

// ══════════════════════════════════════════════════════════════════════════
// ⑦ 허브 레일 — 여섯 화면이 공유하는 좌측 탭 5칸                     (DOM+canvas)
// ══════════════════════════════════════════════════════════════════════════
// **정본은 하나다.** 탭 목록·아이콘은 `vfx.js` 의 `LBRAIL`/`FLWGLYPH` 를
// 그대로 읽는다(사본을 만들면 반드시 갈라진다 — 이 저장소가 이미 겪은 병).
// 이 함수가 새로 하는 일은 **둘레만** — `lbRail()` 은 무채색 목록이고, 이건
// 냉광 각진 칸으로 감싼다. 아이콘 그리는 함수(FLWGLYPH)는 그대로다.
///
/// tabs 를 생략하면 `LBRAIL` 전체를 쓴다. 강화 화면처럼 탭 구성이 늘어날
/// 자리가 아직 확정 전이므로(2026-08 시점 `LBRAIL` 은 5칸 — 강화는 없다),
/// 다른 화면이 다른 구성을 보여줘야 하면 이 인자로 자기 배열을 넘기면 된다.
function hudRail(hostId, cur, tabs) {
  const host = $(hostId); if (!host) return;
  const list = tabs || (typeof LBRAIL !== "undefined" ? LBRAIL : []);
  list.forEach(([k, nm, soon]) => {
    const on = k === cur;
    const d = document.createElement("div");
    d.className = "r" + (on ? " on" : "") + (soon ? " soon" : "");
    const cv = document.createElement("canvas");
    cv.style.width = "22px"; cv.style.height = "22px";
    d.appendChild(cv);
    d.insertAdjacentHTML("beforeend", `<div class="nm">${nm}</div>`);
    host.appendChild(d);
    mk(cv, [22, 22], function hudRailGlyph(c) {
      if (typeof FLWGLYPH !== "undefined" && FLWGLYPH[k]) FLWGLYPH[k](c, 22, on ? 1 : (soon ? 2 : 0));
    }, { clear: true });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// ⑧ 밀도 확장 — 접속 노드 · 꺾인 인출선 · 세그먼트 고리 · 미세 라벨   (canvas)
// ══════════════════════════════════════════════════════════════════════════
// 인트로 · 홈 두 장뿐이던 시절엔 여섯 부품(①~⑦)으로 충분했다. 「참조는
// 화면 하나에 요소가 수십 개인데 우리는 원 하나 + 패널 여섯」이 밝혀진 뒤
// (홈 재작업, 2026-08-24) 다시 보니 부족한 건 부품 자체다 — 참조의 밀도는
// 링을 더 겹치는 것 말고도 **접속점이 있는 회로형 선** · **세그먼트로 나뉜
// 고리** · **구석마다 다른 판독값**이 만든다. 이 절은 그 셋을 채운다.

/// 작은 접속 노드 — 회로도에서 선이 꺾이거나 끝나는 자리에 찍는 점.
/// 중심 발광(`gHalo`) + 그 둘레의 옅은 고리 하나로, 「전선의 단자」로 읽힌다.
/// ⚠️ 이 키트는 통틀어 단일 색계(frost)다 — `gHalo` 는 색 문자열이 아니라
/// **톤 이름**(`toneOf` 키)을 받으므로, `hudRing`/`hudTag` 류의 `#RRGGBB`
/// 옵션과 헷갈리지 않도록 여기서는 색 옵션을 아예 받지 않는다.
function hudNode(c, x, y, r, opt) {
  const o = opt || {};
  const rr = r > 0 ? r : 1.6;
  hudRing(c, x, y, rr * 2, { alpha: (o.alpha == null ? 0.8 : o.alpha) * 0.45, w: 1 });
  gHalo(c, x, y, rr, HUDK, o.alpha == null ? 0.85 : o.alpha);
}

/// 꺾은 다각선 위의 한 점 — 누적 길이 기준 보간(`u`=0..1). `hudLeader` 가
/// 그린 회로형 선을 따라 흐르는 빛 입자가 꺾이는 자리에서도 속도가 안
/// 튀도록 길이 기준으로 보간한다(각도 기준이면 짧은 구간에서 빨라 보인다).
function hudPolyPoint(pts, u) {
  if (!pts || !pts.length) return [0, 0];
  if (pts.length === 1) return pts[0];
  const segLen = []; let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segLen.push(d); total += d;
  }
  const want = hudCl(u) * total; let acc = 0;
  for (let i = 0; i < segLen.length; i++) {
    const last = i === segLen.length - 1;
    if (want <= acc + segLen[i] || last) {
      const k = segLen[i] > 0 ? hudCl((want - acc) / segLen[i]) : 0;
      const a = pts[i], b = pts[i + 1];
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
    acc += segLen[i];
  }
  return pts[pts.length - 1];
}

/// 꺾인 인출선 — 참조 이미지의 「중앙 허브에서 각 패널로 뻗는, 한 번
/// 꺾이고 끝에 노드가 박힌 선」. `bend`(0..1)가 꺾이는 자리의 비율,
/// `vertical`이면 세로 구간을 먼저 뺀다(기본은 가로가 먼저 — HSTAT
/// 지시선과 같은 문법). 반환값은 꺾인 지점을 포함한 점열이라, 호출부가
/// [hudPolyPoint] 에 그대로 넘겨 흐르는 빛을 얹을 수 있다.
function hudLeader(c, x0, y0, x1, y1, opt) {
  const o = opt || {};
  const bend = o.bend == null ? 0.5 : o.bend;
  const kx = o.vertical ? x0 : x0 + (x1 - x0) * bend;
  const ky = o.vertical ? y0 + (y1 - y0) * bend : y0;
  const pts = [[x0, y0], [kx, ky], [x1, y1]];
  c.save();
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.35 : o.alpha);
  c.lineWidth = o.w || 1; c.lineJoin = "round";
  c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
  c.restore();
  if (o.node !== false) {
    const a = o.alpha == null ? 0.35 : o.alpha;
    hudNode(c, kx, ky, o.nodeR || 1.5, { alpha: a * 1.3 });
    hudNode(c, x1, y1, (o.nodeR || 1.5) * 1.4, { alpha: a * 1.7 });
  }
  return pts;
}

/// 세그먼트 고리 — 참조 이미지의 「사방으로 나뉜 큰 고리」(부챗살로 잘게
/// 나뉜 원). 링 하나 위에 짧은 방사 눈금 n개를 얹는다 — `hudTicks`(원의
/// 둘레를 도는 눈금)와 다르게 이건 **고리 자체를 자르는 나비스**처럼
/// 안팎으로 짧게 튀어나온다.
function hudSectorRing(c, x, y, r, n, opt) {
  if (!(r > 0) || !(n > 0)) return;
  const o = opt || {};
  const alpha = o.alpha == null ? 0.24 : o.alpha;
  hudRing(c, x, y, r, { color: o.color, alpha, w: o.w || 1 });
  const spoke = o.spoke == null ? r * 0.09 : o.spoke;
  c.strokeStyle = A(o.color || HUDLINE, Math.min(1, alpha * 1.6));
  c.lineWidth = o.w || 1;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + (o.rot || 0);
    const x0 = x + Math.cos(a) * (r - spoke), y0 = y + Math.sin(a) * (r - spoke);
    const x1 = x + Math.cos(a) * (r + spoke), y1 = y + Math.sin(a) * (r + spoke);
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  }
}

/// 아주 작은 배경 판독값 라벨 — 「SECTOR 07」·「[24]」류의 채움 장식. 항상
/// 옅은 알파로 그린다 — 이 라벨이 읽혀야 하는 자리라면 [hudReadout] 을 쓴다.
function hudTag(c, x, y, text, opt) {
  const o = opt || {};
  c.save();
  c.textAlign = o.align || "left"; c.textBaseline = "alphabetic";
  c.font = hudFont(o.w || 600, o.fs || 7.5);
  c.fillStyle = A(o.color || HUDDIM, o.alpha == null ? 0.55 : o.alpha);
  lbText(c, text, x, y);
  c.restore();
}
