// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-sortie.js — 화면 8 「출격준비」(스테이지를 고른 **뒤에** 서는 문지방)
//
// `vfx.js` · `hud.js` · `mockup-hud-loadout.js` 뒤에 실린다.
// 최상위 이름은 `HG`/`hg` 로 격리한다.
//
// ── 이 화면이 답하는 질문 ────────────────────────────────────────────────
// 「지금 무엇을 챙겨 나가나.」 **나가기 전 마지막 확인**이라 판정 기준은
// 하나다 — 들고 갈 것이 **하나도 빠짐없이 보이나.**
//
// ── 그래서 무엇이 화면에 남고 무엇이 창으로 갔나 ────────────────────────
// 가르는 자는 하나다: **나가기 전에 확인해야 하는 것**인가, **고르는 동안만
// 필요한 것**인가.
//   화면 — 챙긴 한 벌(캐릭터 · 자리 열) · 편성표 세로 탭 · 출격 조건 · 출격
//   창   — 후보 중에서 하나 고르기(캐릭터 열여덟 · 스킬 · 성좌 · 채굴)
// ⚠️⚠️ **다 창으로 밀면 이 화면의 존재 이유가 없어진다** — 「출격 전에 다
//   보인다」가 그것이다. 그래서 **고른 결과는 화면에 남고 고르는 자리만 창**이다.
// ⚠️ 그 창은 편성표 화면의 「편집」과 **같은 창**이다([loPicker]) — 두 화면이 한
//   문법을 쓴다.
//
// ── 편성표는 **세로 탭**이다 ────────────────────────────────────────────────
// 편성표를 위에 가로로 눕히면 세로가 그만큼 죽고, 자리 열이 폭을 다투게 된다.
// 세로로 세우면 고른 편성표의 알맹이가 오른쪽을 통째로 채운다 — **탭 → 카드**다.
// ⚠️⚠️ **레일과 안 헷갈려야 한다.** 이 화면은 레일이 없으므로 왼쪽이 비어 있고,
//   거기에 레일과 같은 꼴(58px · 문양 가운데 · 잔글 한 줄)을 세우면 「또 하나의
//   레일」로 읽힌다. 그래서 넷을 다르게 잡았다:
//     ① **더 넓다**(96 vs 58) — 글이 왼쪽 맞춤으로 두 줄 선다
//     ② **글이 먼저다** — 레일은 문양이 크고 글이 잔글인데, 여기는 「편성표 01」이
//        크고 문양은 22px 곁딸이다
//     ③ **상태가 탭 안에서 읽힌다** — 비었음 · 살 수 있음이 칸마다 다르다
//        (레일 여섯 칸은 전부 같은 꼴이다)
//     ④ **고른 칸이 오른쪽으로 이어붙는다** — 오른쪽 테를 지우고 판과 한 몸이
//        된다. 레일 칸은 늘 제 테를 닫고 있다. 이 하나가 「탭」의 정의다
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 스테이지 — 창틀이 드는 것 ────────────────────────────────────────────
// 이름·난이도의 정본은 출격일지 장이고(스1 = 「스며드는 어둠」), 난이도 색
// 넷은 관측소 장의 표다(쉬움 초록 · 보통 하양 · 어려움 빨강 · 매우어려움 보라).
// ⚠️ 이 화면은 **보통**이다 — 하양이라 냉광 창과 안 부딪힌다.
const HGSTAGE = { no: "1-1", nm: "스며드는 어둠", diff: "보통", star: 2, starMax: 3 };

// ── 세로 띠에 서는 것 ────────────────────────────────────────────────────
// ⚠️ **맨 위 한 칸은 편성표가 아니다.** 「직전 출격」은 저장하는 슬롯이 아니라
//   「지난번에 이렇게 갔다」 하나다 — 이름이 없고, 벌 수가 안 늘고, 덮어쓸 수
//   있다. 그래서 **띠에서 떼어 위에 못박고** 밑에 가르는 선을 둔다: 편성표 목록이
//   길어져 굴러도 이 칸은 안 흘러간다.
const HGLAST = { key: "last", nm: "직전 출격", ds: "전역 한 벌", deck: LOLAST };
/// 편성표 넷 — 편성표 화면과 **같은 상태**다(짜임 하나 · 비어 있음 둘 · 살 수 있는 넷째).
const HGDECKS = [
  { key: "d1", n: 1, st: "", nm: "편성표 01", ds: "무속성", deck: LODECK1 },
  { key: "d2", n: 2, st: "void", nm: "편성표 02", ds: "비어 있다" },
  { key: "d3", n: 3, st: "void", nm: "편성표 03", ds: "비어 있다" },
  { key: "d4", n: 4, st: "buy", nm: "편성표 칸 04", ds: "상점에서 연다" },
];
/// 여덟 벌짜리 — **띠가 넘칠 때 어떻게 되나**를 보이는 표본. 상점에서 칸을
/// 사면 실제로 이렇게 는다.
/// ⭐ **굴린다**(접지 않는다). 접으면 「내 편성표가 몇 벌인가」가 화면에서 사라지는데,
///   그것이 이 띠가 있는 이유의 절반이다. 대신 굴러야 할 만큼이 남았다는 것을
///   페이드 한 줄이 말한다(도감 · 고르는 창이 이미 쓰는 문법).
// ⚠️ 넷의 캐릭터를 실제로 갈아 끼운다 — 탭이 이름은 「빙 氷」이라 하는데 문양은
//   무속성이면 그림이 거짓말을 한다(자리 알맹이는 이 표본에서 안 쓰인다).
const HGDECKS8 = [
  { key: "d1", n: 1, st: "", nm: "편성표 01", ds: "무속성", deck: LODECK1 },
  { key: "d2", n: 2, st: "", nm: "편성표 02", ds: "빙 氷", deck: { ...LODECK1, char: "ice" } },
  { key: "d3", n: 3, st: "", nm: "편성표 03", ds: "염 炎", deck: { ...LODECK1, char: "fire" } },
  { key: "d4", n: 4, st: "", nm: "편성표 04", ds: "뇌 雷", deck: { ...LODECK1, char: "bolt" } },
  { key: "d5", n: 5, st: "void", nm: "편성표 05", ds: "비어 있다" },
  { key: "d6", n: 6, st: "void", nm: "편성표 06", ds: "비어 있다" },
  { key: "d7", n: 7, st: "void", nm: "편성표 07", ds: "비어 있다" },
  { key: "d8", n: 8, st: "buy", nm: "편성표 칸 08", ds: "상점에서 연다" },
];

// ── 배경 — 공용 껍질. **레일이 없다** ────────────────────────────────────
// ⚠️⚠️ `rail: 0` 을 넘긴다 — 이 화면은 허브의 방이 아니라 **나가는 문지방**이라
//   레일을 안 켠다. 브래킷과 귀퉁이 판독값 넷이 그만큼 왼쪽으로 온다.
// 표식은 **한 점으로 좁혀 드는 조준선**이다 — 다른 화면의 표식이 「고른다 ·
// 기른다 · 센다」의 도는 고리였다면 여기는 **한 곳으로 간다**가 정체다.
function hgBg(seed) {
  return function hgBgDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed, rail: 0 });
    const r = Math.min(box.w, box.h) * 0.44;
    hudRing(c, box.cx, box.cy, r * 1.18, { dash: [2, 8], alpha: 0.08, w: 1 });
    hudRing(c, box.cx, box.cy, r * 0.78, { alpha: 0.11, w: 1.3 });
    hudTicks(c, box.cx, box.cy, r * 0.80, 36, { len: 3, bigLen: 7, every: 9, alpha: 0.16 });
    hudRing(c, box.cx, box.cy, r * 0.34, { alpha: 0.13, w: 1 });
    // 십자 조준선 — 가운데를 비워 두고 네 방향의 끝동만.
    c.save(); c.strokeStyle = A(HUDLINE, 0.10); c.lineWidth = 1;
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      c.beginPath();
      c.moveTo(box.cx + dx * r * 0.40, box.cy + dy * r * 0.40);
      c.lineTo(box.cx + dx * r * 1.10, box.cy + dy * r * 1.10);
      c.stroke();
    });
    c.restore();
  };
}

// ── 세로 탭 한 칸 ────────────────────────────────────────────────────────
/// `row` = {key, nm, ds, st, deck}. `on` 이면 오른쪽 테가 열려 판과 이어붙는다.
function hgTab(host, row, on, onPick) {
  if (!host) return;
  const b = document.createElement("div");
  b.className = "hg-tab " + (row.st || "") + (on ? " on" : "");
  b.dataset.k = row.key;
  let cv = null;
  if (row.deck) {
    cv = document.createElement("canvas");
    cv.style.width = "20px"; cv.style.height = "20px";
    b.appendChild(cv);
  } else {
    b.insertAdjacentHTML("beforeend", `<span class="ph"></span>`);
  }
  b.insertAdjacentHTML("beforeend", `<div class="tx"><b>${row.nm}</b><i>${row.ds}</i></div>`);
  host.appendChild(b);
  if (cv) mk(cv, [52, 52], function hgTabChar(c, t, dt, W, H, st) {
    (loDraw(row.deck.char) || ELEM.base)(c, t, dt, W, H, st);
  }, { clear: true });
  if (onPick && row.st !== "buy") b.addEventListener("click", () => onPick(row));
}

// ── 챙긴 한 벌 — 화면에 **남는** 것 ─────────────────────────────────────
/// 머리줄(캐릭터 · 어디서 왔나 · 바꾼다) + 자리 두 줄. 편성표 카드와 같은 문법이라
/// 「편성표를 눌렀더니 이렇게 앉았다」가 한눈에 이어진다.
/// ⚠️⚠️ 자리 줄을 **둘로 가르고 묶음마다 판을 두른다.** 열 칸을 한 줄에 같은
///   크기로 세우면 **균일 격자**가 되어 「도감 한 쪽」으로 읽힌다 — 어느 것이
///   기본 공격이고 어느 것이 스킬인지가 **라벨을 읽어야** 알게 된다. 가르는
///   자리는 축이 갈리는 곳이다: 첫 줄은 **내가 쏘는 것**, 둘째 줄은 **판에
///   걸린 것 · 안 싸우는 것**. 치수와 판의 정본은 [loGroupsSortie] 다.
function hgCard(host, row, onEdit) {
  if (!host) return;
  host.innerHTML = "";
  const d = row.deck;
  const ch = d && loCharOf(d.char);
  const hd = document.createElement("div"); hd.className = "hh";
  if (d) {
    const cv = document.createElement("canvas");
    cv.style.width = "26px"; cv.style.height = "26px";
    hd.appendChild(cv);
    mk(cv, [66, 66], function hgCardChar(c, t, dt, W, H, st) {
      (loDraw(d.char) || ELEM.base)(c, t, dt, W, H, st);
    }, { clear: true });
  }
  hd.insertAdjacentHTML("beforeend",
    `<b>${ch ? ch.nm : "캐릭터 없음"}</b>`
    + `<span class="src">${row.key === "last"
      ? "직전 출격에서 가져왔다 — 스테이지를 옮겨도 따라온다"
      : row.nm + " 을 그대로 앉혔다"}</span>`
    + `<div class="bt"><div class="hudbtn sm" data-edit="1">바꾼다 ›</div></div>`);
  host.appendChild(hd);
  const [r1g, r2g] = loGroupsSortie(d);
  const r1 = document.createElement("div"); r1.className = "hg-line";
  host.appendChild(r1);
  hudSlotRow(r1, r1g, { name: true, pane: true });
  // ⚠️ 둘째 줄에 `two` 를 안 붙인다 — 공용 CSS 의 `.two` 는 **긴 산문을 두 단으로
  //   흘리는 규칙**이라(1200px 이상), 이름이 겹치면 자리 줄이 그 규칙에 걸린다.
  const r2 = document.createElement("div"); r2.className = "hg-line";
  host.appendChild(r2);
  hudSlotRow(r2, r2g, { name: true, pane: true });
  // 궁극기 — **손그림에 없는 칸.** 자리만 두고 무엇도 안 채운다.
  // ⚠️ **첫 줄 끝**이다 — 궁극기도 「내가 쏘는 것」이라 그 축에 붙어야 하고,
  //   둘째 줄에 두면 채굴도구 옆에 서서 「채굴도 아직 미정인가」로 읽힌다.
  r1.insertAdjacentHTML("beforeend", `<div class="hg-ult">궁극기<i>판정 대기</i></div>`);
  r2.insertAdjacentHTML("beforeend",
    `<div class="hg-hint">자리를 누르면 <b>고르는 창</b>이 열린다`
    + ` — 편성표 화면의 「편집」과 같은 창이다</div>`);
  const eb = hd.querySelector("[data-edit]");
  if (eb && onEdit) eb.addEventListener("click", () => onEdit(row));
}

// ── 화면 하나를 세운다 ───────────────────────────────────────────────────
/// 출격 게이지 한 바퀴의 주기(초) — **누르는 시간 0.75초가 아니다.** 시안이
/// 「눌리는 동안」을 되풀이해 보여 주기 위한 창의 길이다.
const HG_HOLD_T = 3.4;
function hgScreen(id, seed, decks, openPop) {
  const bg = $(id + "-bg");
  if (bg) mk(bg, [788, 364], hgBg(seed), { clear: true });
  const scr = $(id + "-screen");
  const card = $(id + "-card");
  const pin = $(id + "-pin");
  const list = $(id + "-list");
  let cur = HGLAST;
  const open = (r) => loPicker(scr, {
    title: r.key === "last" ? "직전 출격" : r.nm,
    deck: r.deck, tab: r.deck ? 1 : 0, done: "이대로 나간다",
  });
  const draw = () => {
    if (pin) { pin.innerHTML = ""; hgTab(pin, HGLAST, cur.key === HGLAST.key, pick); }
    if (list) {
      list.innerHTML = "";
      decks.forEach((row) => hgTab(list, row, cur.key === row.key, pick));
    }
    hgCard(card, cur, open);
  };
  function pick(row) { cur = row.deck ? row : cur; draw(); }
  draw();
  if (openPop) open(cur);
  // 띠가 넘칠 때만 「더 있다」가 선다 — 안 넘치는데 세우면 없는 것을 말한다.
  const fade = $(id + "-fade");
  if (fade && decks.length > 4) fade.textContent = "굴린다 — 편성표 " + decks.length + "벌";
  // 창틀
  const h = $(id + "-stage");
  if (h) h.innerHTML = `<b>스테이지 ${HGSTAGE.no}</b><span class="nm">${HGSTAGE.nm}</span>`;
  const g = $(id + "-diff");
  if (g) g.innerHTML = `<span class="lb">${HGSTAGE.diff}</span>`
    + Array.from({ length: HGSTAGE.starMax }, (_, i) =>
      `<i class="${i < HGSTAGE.star ? "on" : ""}">★</i>`).join("");
  // 출격 — 0.75초 눌러야 나간다.
  // ⚠️⚠️ **되풀이되는 게이지는 위상 파생값을 그리면 안 된다.** `pct = (t%T)/T` 로
  //   차오르게 하면 주기 끝(가득)과 시작(빈 것)이 달라 매 주기마다 끊긴다.
  //   [hudOpenLoop] 은 **창 함수**라 u=0 과 u=1 이 둘 다 0 이다 — 그 `fill` 하나를
  //   그대로 게이지에 먹인다(찼다 · 머물렀다 · 비워진다). 이음매가 없다.
  const cv = $(id + "-hold");
  if (cv) mk(cv, [72, 72], function hgHold(c, tAbs, dt, W) {
    const u = (tAbs % HG_HOLD_T) / HG_HOLD_T;
    const k = hudOpenLoop(u, { o0: 0.06, oDur: 0.28, hold: 0.62, cDur: 0.14 });
    const r = W * 0.34;
    hudRing(c, W / 2, W / 2, r, { color: HUDSEL, alpha: 0.26, w: 3.4 });
    // ⚠️ `celGauge` 를 안 쓴다 — 그것은 **톤 이름**을 받는데 이 게이지가 원하는
    //   금빛(`HUDSEL`)은 톤표에 없는 색이고, `toneOf` 는 모르는 이름을
    //   `TONE.gold`(무속성 회백)로 조용히 접는다. 회백 게이지는 이 화면의
    //   「지금 누를 수 있는 단 하나」를 못 말한다.
    hudRing(c, W / 2, W / 2, r, {
      color: HUDSEL, alpha: 0.95, w: 3.4,
      a0: -Math.PI / 2, a1: -Math.PI / 2 + TAU * hudCl(k.fill),
    });
    hudTicks(c, W / 2, W / 2, r * 1.22, 12, { color: HUDSEL, len: 2, bigLen: 4, every: 3, alpha: 0.5 });
    // 고리 안의 숫자 — 고리만 두면 「불러오는 중」으로 읽힌다. 무엇을 세는
    // 고리인지가 고리 안에 있어야 한다.
    c.textAlign = "center"; c.textBaseline = "middle";
    c.font = hudFont(700, 9);
    c.fillStyle = A(HUDSEL, 0.9);
    c.fillText("0.75s", W / 2, W / 2);
    c.textAlign = "left"; c.textBaseline = "alphabetic";
  }, { clear: true });
}
hgScreen("hg1", 31, HGDECKS, false);
hgScreen("hg2", 47, HGDECKS, true);
hgScreen("hg3", 13, HGDECKS8, false);
hudPanels();
