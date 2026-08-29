// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-shop.js — 화면 4 「상점」(1층 갈래 넷 · 2층 등급 띠)
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HS`/`hs` 로 격리한다.
//
// ── 값은 하나도 새로 안 짓는다 ──────────────────────────────────────────
// 표본 여덟 · 값 사다리 · 등급 차례의 정본은 `vfx.js` 의 `SSKILL`/`SRANK` 다.
// 1층 갈래 넷은 `mockup-shop.html#s-retab` 의 2026-08-25 재편 확정이고,
// 연계는 `lib/data/skill_link.dart` 의 열여섯 중 이 표본에 든 것뿐이다.
// 이 파일이 정하는 것은 「그것들이 SF HUD 창 안 어디에 앉나」뿐이다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 1층 갈래 넷 ──────────────────────────────────────────────────────────
// [이름, 한 줄, 문양 그리기]. ⚠️ 프리미엄은 **폐기**됐다(2026-08-25) — 자리를
//   남기지 않는다. 빈 자리였으므로 없애도 잃을 것이 없다는 것이 그 판정이다.
// ⚠️ 문양은 **전부 이미 있는 자산**이다. 채굴도구 문양이 저장소에 아직 없어
//   「기타」만 빛기둥(`ICON.pillar`)을 자리표로 빌린다 — 새로 그리면 진짜
//   문양이 오는 날 둘이 된다.
// ⚠️⚠️ **문양마다 「제 크기」가 다르다.** `FLWGLYPH.*` 는 24px 레일 칸을 위해
//   **고정 픽셀 반지름**(8.2·5.8·3.1)으로 그려져 W 를 키워도 안 커지고,
//   `ICON.*` 는 S 에 비례하되 내용이 S 의 0.4 쯤만 찬다. 그대로 부르면 넷의
//   크기가 제각각으로 뜬다(첫 판에서 캐릭터만 좁쌀만 했다) ⇒ 각 문양을
//   **「(0,0) 중심에 지름 S 로 그린다」**는 한 약속으로 감싼다.
const hsFlw = (fn) => (c, S) => {
  const k = S / 17; c.save(); c.scale(k, k); c.translate(-11, -11); fn(c, 22, 0); c.restore();
};
const hsIco = (fn) => (c, S) => {
  const D = S * 1.7; c.save(); c.translate(-D / 2, -D / 2); fn(c, D); c.restore();
};
const HSTIER = [
  ["캐릭터", "특수 열둘을 판다", hsFlw(FLWGLYPH.home)],
  ["일반", "일반공격 전종 · 속성으로 거른다", hsIco(ICON.smg)],
  ["마법", "마법 · 방어 · 버프 · 궁극", hsIco(ICON.sanctum)],
  ["기타", "기본 채굴도구 셋 무료 · 유료 추가는 자리만", hsIco(ICON.pillar)],
];
/// 지금 손이 얹힌 갈래 — 이 페이지의 **금빛 하나**. 아래 2층이 이 칸을 연 화면이다.
const HSOPEN = 1;

/// 2층 「일반」 탭의 속성 필터 여섯 — 승격하며 새로 생긴 축(옛 하위탭엔 없었다).
/// ⚠️ 차례는 배분표 차례다(`docs/design/캐릭터-속성-배분.md` §3): 무 · 빙 · 염 ·
///   뇌 · 독 · 풍. 무속성이 먼저인 것은 그것이 기준선이기 때문이다.
const HSFILT = ["무", "빙", "염", "뇌", "독", "풍"];
const HSFILTON = 0;

/// 연계가 있는 칸 — 정본은 `lib/data/skill_link.dart` 의 열여섯이고, 그중
/// **일반 계열 셋**(화염방사 · 서릿발 · 서리결정) 중 이 표본에 든 것은 하나다.
/// ⚠️ 시안 키와 엔진 id 는 다르다(시안 `flame` = 엔진 `flamer`) — `SSKILL`
///   머리가 이미 적어 둔 어긋남이라 여기서 맞추지 않고 표만 갖는다.
const HSLINK = { flame: 1 };

/// 칸 하나의 문양 — 있으면 `ICON`, 없으면 옛 상점과 **같은 자리표**.
function hsIcon(c, W, k, own) {
  if (ICON[k]) ICON[k](c, W); else FLWGLYPH.codex(c, W, own ? 2 : 0);
}

// ── 배경 — 공용 껍질 + 이 화면의 표식 ────────────────────────────────────
// 상점의 표식은 **겹친 궤도 둘**이다 — 「사다리를 한 칸씩 오른다」가 도는
// 고리로 읽힌다. 알파는 격자보다 한참 아래라 칸을 안 먹는다.
function hsBg(seed) {
  return function hsBgDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed });
    const r = Math.min(box.w, box.h) * 0.46;
    hudOrbit(c, box.cx, box.cy, r * 1.5, r * 0.72, tAbs, { speed: 0.09, alpha: 0.12, dots: 2, dotR: 2.2 });
    hudOrbit(c, box.cx, box.cy, r * 0.98, r * 0.46, -tAbs, { speed: 0.14, alpha: 0.10, dots: 3, dotR: 1.6 });
    hudRing(c, box.cx, box.cy, r * 0.62, { alpha: 0.10, w: 1.4 });
    hudSectorRing(c, box.cx, box.cy, r * 0.74, 18, { alpha: 0.09 });
  };
}
{ const a = $("hs1-bg"); if (a) mk(a, [788, 364], hsBg(3), { clear: true }); }
{ const b = $("hs2-bg"); if (b) mk(b, [788, 364], hsBg(11), { clear: true }); }

// ── 1층 — 갈래 넷 ────────────────────────────────────────────────────────
{ const g = $("hs1-tier");
  if (g) HSTIER.forEach(([nm, ds, glyph], i) => {
    const d = document.createElement("div");
    d.className = "hudpanel t" + (i === HSOPEN ? " on" : "");
    d.insertAdjacentHTML("beforeend", `<div class="hd"><b>갈래 ${i + 1} / ${HSTIER.length}</b></div>`);
    // 문양은 **눈금 고리 안에** 앉힌다 — 그래야 갈래 넷이 「계기 넷」으로
    // 읽히고, 기존 문양(암빛)과 냉광 틀이 한 화면에서 안 겉돈다.
    // ⚠️ 칸을 `createElement` 로 쌓고 **갓 만든 노드에 `querySelector` 를 안
    //   쓴다** — 스모크 스텁(`tools/mockup_smoke.js`)의 가짜 DOM 은 그걸
    //   `null` 로 돌려줘 이 장 전체가 「LOAD FAIL」로 죽는다(실제로 그랬다).
    const bd = document.createElement("div"); bd.className = "bd";
    const cv = document.createElement("canvas");
    bd.appendChild(cv);
    bd.insertAdjacentHTML("beforeend", `<div class="tn">${nm}</div><div class="td">${ds}</div>`);
    d.appendChild(bd);
    g.appendChild(d);
    mk(cv, [140, 140], function hsTierGlyph(c, t, dt, W) {
      const r = W * 0.40;
      hudRing(c, W / 2, W / 2, r, { alpha: 0.30, w: 1.6 });
      hudTicks(c, W / 2, W / 2, r * 1.04, 24, { len: 5, bigLen: 10, every: 6, alpha: 0.55 });
      hudRing(c, W / 2, W / 2, r * 0.80, { alpha: 0.18, w: 1, dash: [2, 5] });
      c.save(); c.translate(W / 2, W / 2); glyph(c, r * 0.92); c.restore();
    }, { clear: true });
  });
}

// ── 2층 — 탭 줄(1층 넷) + 속성 필터 여섯 ─────────────────────────────────
{ const t = $("hs2-tabs");
  if (t) HSTIER.forEach(([nm], i) => {
    t.insertAdjacentHTML("beforeend",
      `<div class="hudtab${i === HSOPEN ? " on" : ""}">${nm}</div>`);
  });
}
{ const f = $("hs2-filt");
  if (f) HSFILT.forEach((nm, i) => {
    f.insertAdjacentHTML("beforeend", `<div class="f${i === HSFILTON ? " on" : ""}">${nm}</div>`);
  });
}

// ── 2층 격자 — 등급 띠 넷 + 칸 여덟 ──────────────────────────────────────
// ⭐ 등급이 바뀌는 자리에 머리줄을 세운다 — 값이 `(등급, 도감 순)` 으로 서므로
//   격자를 등급으로 자르면 **값이 저절로 오름차순**이다(옛 상점과 같은 수법).
{ const g = $("hs2-grid"), scr = $("hs2-screen");
  if (g) SSKILL.forEach(([k, nm, px, st, rk, ds], i) => {
    if (i === 0 || SSKILL[i - 1][4] !== rk) {
      const band = SSKILL.filter((r) => r[4] === rk);
      const own = band.filter((r) => r[3] === 0).length;
      g.insertAdjacentHTML("beforeend",
        `<div class="hudhead"><b>${SRANK[rk][0]} ${SRANK[rk][1]}</b>`
        + `<span class="ct">${own} / ${band.length}</span></div>`);
    }
    const d = document.createElement("div");
    d.className = "hudcell" + (st === 0 ? " own" : "") + (st === 2 ? " poor" : "") + (st === 3 ? " lock" : "");
    d.dataset.k = k;
    const cv = document.createElement("canvas"); cv.className = "ic";
    d.appendChild(cv);
    // ⚠️ 잠긴 칸은 **값을 안 적는다** — 적으면 「모으면 살 수 있다」로 읽힌다.
    const price = st === 0 ? `<div class="v">보유</div>`
      : st === 3 ? `<div class="v">잠김</div><div class="why">일반 계열의 고급 등급을 다 사면</div>`
        : `<div class="v"><canvas class="cp" style="width:11px;height:11px"></canvas>${px.toLocaleString("en-US")}</div>`;
    d.insertAdjacentHTML("beforeend", `<div class="tx"><div class="n">${nm}</div>${price}</div>`
      + (HSLINK[k] ? `<div class="lk">연계</div>` : ``));
    g.appendChild(d);
    mk(cv, [26, 26], function hsCellGlyph(c, t, dt, W) { hsIcon(c, W, k, st === 0); }, { clear: true });
    const cp = d.querySelector(".cp");
    if (cp) mk(cp, [11, 11], function hsPriceGlyph(c, t, dt, W) { CURGLYPH.matter(c, W, st === 2); }, { clear: true });
    // 보유한 것도 누를 수 있다 — 「어떻게 나가나」는 산 뒤에도 궁금하다.
    // ⚠️ **잠긴 것만 예외다** — 열어 주면 「산다」가 뜨는데 안 눌리는 화면이 된다.
    if (st !== 3) d.addEventListener("click", () => hsPreview(scr, k, nm, px, st, rk, ds));
  });
}

/// 미리보기 창. **한 번에 하나만** 뜬다(두 장이 겹치면 뒤엣것이 유령이 된다).
/// ⭐ 이 게임에서 스킬의 정체는 **글이 아니라 움직임**이다 — 「전방 부채꼴
///   3발」이라고 써 봐야 서릿발과 산탄총이 같은 문장이 된다.
function hsPreview(scr, k, nm, px, st, rk, ds) {
  if (!scr) return;
  const old = scr.querySelector(".hudpop"); if (old) old.remove();
  const afford = st !== 2;
  const pop = document.createElement("div"); pop.className = "hudpop";
  pop.innerHTML =
    `<div class="bx">`
    + `<div class="pv"><canvas></canvas></div>`
    + `<div class="bd">`
    + `<div class="nm">${nm}<span class="hudchip" style="margin-left:8px">${SRANK[rk][0]} ${SRANK[rk][1]}</span></div>`
    + `<div class="ds">${ds}</div>`
    + `<div class="rw">`
    + (st === 0
      ? `<div class="hudbtn lock">이미 가지고 있다</div>`
      : `<span class="px"><canvas class="pp" style="width:13px;height:13px"></canvas>${px.toLocaleString("en-US")}</span>`
      + `<div class="hudbtn ${afford ? "sel" : "lock"}">${afford ? "산다" : "암흑물질이 모자란다"}</div>`)
    + `<div class="hudbtn ghost" data-x="1">닫기</div>`
    + `</div></div></div>`;
  scr.appendChild(pop);
  // ⚠️ **실제 그 그림**을 돌린다 — 확정본 FX 가 있으면 그것, 없으면 문양을 크게.
  //   `clear` 를 FX 쪽만 끄는 것은 FX 가 제 바탕을 깔기 때문이다(옛 상점과 같다).
  const cv = pop.querySelector(".pv canvas");
  const fx = (k === "flame" && typeof PKflameC4 !== "undefined") ? PKflameC4 : null;
  mk(cv, [430, 118], fx ? fx : function hsPreviewGlyph(c, t, dt, W, H) {
    c.save(); c.translate(W / 2 - 32, H / 2 - 32); hsIcon(c, 64, k, false); c.restore();
  }, { clear: !fx });
  const pp = pop.querySelector(".pp");
  if (pp) mk(pp, [13, 13], function hsPopPrice(c, t, dt, W) { CURGLYPH.matter(c, W, !afford); }, { clear: true });
  const close = () => pop.remove();
  pop.querySelector('[data-x]').addEventListener("click", close);
  pop.addEventListener("click", (e) => { if (e.target === pop) close(); });
  hudPanels();
}

// ── 창틀의 재화 · 레일 · 설정 ────────────────────────────────────────────
// ⚠️ 창틀은 **상점 전체의 재화**를 든다(강화석은 강화 화면의 지갑 띠가 든다).
//   잔액은 격자의 상태와 맞아야 한다 — 12,480 은 10,400 을 사고 13,800 은
//   못 사는 자리다(격자의 `st` 1 · 2 와 정확히 맞는다).
lbCur("hs1-cur", "12,480", "36");
lbCur("hs2-cur", "12,480", "36");
hudRail("hs1-rail", "shop");
hudRail("hs2-rail", "shop");
hudPanels();
