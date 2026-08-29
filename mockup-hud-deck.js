// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-deck.js — 화면 7 「편성표」(계정의 편성표 세 벌 · 편집 팝업)
//
// `vfx.js` · `hud.js` · `mockup-hud-loadout.js` 뒤에 실린다.
// 최상위 이름은 `HD`/`hd` 로 격리한다.
//
// ── 이 화면이 답하는 질문 ────────────────────────────────────────────────
// 「나갈 때마다 다시 고르지 않으려면 무엇을 미리 정해 둬야 하나.」
// 답이 **편성표**이고, 편성표 한 벌은 **캐릭터 + 그 캐릭터가 들 수 있는 것 전부**다 —
// 캐릭터를 빼면 스킬을 고를 근거가 사라진다(고유 속성이 캐릭터에 달려 있다).
// 그래서 편성표 카드의 머리줄에 캐릭터가 서고, 몸줄에 자리들이 선다.
//
// ⭐⭐ **여기는 넷을 나란히 눕힌다.** 출격준비는 같은 편성표를 **세로 탭**으로 세우는데,
//   묻는 것이 다르기 때문이다: 여기는 「편성표들을 관리한다」라 **넷을 한눈에 견주는
//   것**이 일이고(어느 것이 짜였나 · 어디가 비었나 · 몇 벌 더 살 수 있나),
//   출격준비는 「편성표 하나를 고른다」라 **고른 하나의 알맹이**가 무대를 차지해야
//   한다. 같은 물건이라도 하는 일이 다르면 꼴이 달라도 된다.
//
// ── 표·문양·창은 여기서 안 짓는다 ────────────────────────────────────────
// 캐릭터 표 · 편성표 한 벌 · 후보 표 · 고르는 창은 전부 `mockup-hud-loadout.js` 에
// 있다(출격준비와 **한 벌**이라야 「편성표를 누르면 이렇게 앉는다」가 참이 된다).
// 이 파일이 정하는 것은 **편성표 넷이 어떤 카드로 서나**뿐이다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 편성표 넷 — 짜임 · 비어 있음 둘 · 살 수 있음 ─────────────────────────────
// ⭐ **셋이 서로 다른 사건이다.** 비어 있는 칸은 **내 것인데 안 채웠다**,
//   살 수 있는 칸은 **아직 내 것이 아니다**, 잠긴 칸은 **돈으로도 지금은
//   안 열린다**. 밝기로만 가르면 셋이 「어두운 칸」 하나로 뭉친다 ⇒ 속을
//   다르게 한다(＋ · 값 · 빗금 — `hud.js` ⑪절).
const HDDECKS = [
  { n: 1, st: "on", deck: LODECK1 },
  { n: 2, st: "void" },
  { n: 3, st: "void" },
  { n: 4, st: "buy" },
];

// ── 배경 — 공용 껍질 + 이 화면의 표식 ────────────────────────────────────
// 편성표의 표식은 **셋으로 나뉜 고리**다 — 기본이 세 벌이라는 것이 배경에서 한 번
// 더 말해지고, 그 밖의 점선 고리 하나가 「더 살 수 있다」를 든다.
function hdBg(seed) {
  return function hdBgDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed });
    const r = Math.min(box.w, box.h) * 0.46;
    c.save(); c.translate(box.cx, box.cy); c.rotate(tAbs * 0.05);
    hudSectorRing(c, 0, 0, r, 3, { alpha: 0.13, spoke: r * 0.16, w: 1.4 });
    c.restore();
    hudRing(c, box.cx, box.cy, r * 1.34, { dash: [3, 9], alpha: 0.09, w: 1 });
    hudOrbit(c, box.cx, box.cy, r * 0.72, r * 0.34, tAbs, { speed: 0.11, dots: 3, alpha: 0.10, dotR: 1.8 });
  };
}

// ── 편성표 카드 한 장 ────────────────────────────────────────────────────────
/// 머리줄(캐릭터 · 이름 · 단추) + 몸줄(자리) + 묶음 이름 — 사용자 손그림 그대로.
function hdCard(host, row, onEdit) {
  if (!host) return;
  const d = document.createElement("div");
  d.className = "hd-card " + row.st;
  const hd = document.createElement("div"); hd.className = "hh";
  // ⚠️ **번호가 먼저다.** 짜인 편성표만 캐릭터 이름을 앞세우면 넷이 서로 다른 꼴로
  //   시작해 「몇 번 편성표인가」를 훑을 수가 없다 — 문양이 캐릭터를 이미 말하므로
  //   글자 자리의 첫 낱말은 넷 다 번호여야 한다.
  if (row.deck) {
    const ch = loCharOf(row.deck.char);
    const cv = document.createElement("canvas");
    cv.className = "cv"; cv.style.width = "22px"; cv.style.height = "22px";
    hd.appendChild(cv);
    hd.insertAdjacentHTML("beforeend", `<b>편성표 0${row.n}</b><span class="dn">${ch ? ch.nm : ""}</span>`);
    mk(cv, [56, 56], function hdCardChar(c, t, dt, W, H, st) {
      (loDraw(row.deck.char) || ELEM.base)(c, t, dt, W, H, st);
    }, { clear: true });
  } else {
    hd.insertAdjacentHTML("beforeend",
      `<span class="cv ${row.st === "buy" ? "buycv" : "voidcv"}"></span>`
      + `<b>${row.st === "buy" ? "편성표 칸 04" : "편성표 0" + row.n}</b>`
      + `<span class="dn">${row.st === "buy" ? "아직 내 것이 아니다" : "비어 있다"}</span>`);
  }
  // 머리줄 오른쪽 — 단추. 짜인 편성표만 삭제가 있다(빈 편성표에는 지울 것이 없다).
  const btns = row.deck
    ? `<div class="hudbtn sm" data-edit="1">편집</div><div class="hudbtn sm ghost">삭제</div>`
    : row.st === "buy"
      ? `<div class="hudbtn sm">상점에서 연다 ›</div>`
      : `<div class="hudbtn sm" data-edit="1">편성</div>`;
  hd.insertAdjacentHTML("beforeend", `<div class="bt">${btns}</div>`);
  d.appendChild(hd);
  // 몸줄 — 살 수 있는 칸은 자리를 안 그린다. 없는 것을 그리면 「비어 있다」와
  // 같은 그림이 되어 둘이 안 갈린다.
  const bd = document.createElement("div"); bd.className = "bb";
  d.appendChild(bd);
  if (row.st === "buy") {
    bd.insertAdjacentHTML("beforeend",
      `<div class="buyline">편성표 한 벌이 더 는다 — 캐릭터 · 일반 1 · 스킬 5 · 채굴 1 · 성좌 3</div>`);
  } else {
    // ⚠️ **여기는 묶음 판(`pane`)을 안 켠다.** 30px 문양만 서는 줄은 자리 사이
    //   3px 과 묶음 사이 12px 의 **네 배 차이**가 이미 묶음을 갈라 준다. 판을
    //   두르면 카드 테 안에 테가 하나 더 생겨 이중이 되고, 판 머리글이 얹히는
    //   만큼 몸줄이 67px 카드 밖으로 밀린다(실측). 판이 필요한 쪽은 이름까지
    //   적느라 칸이 72·54 로 커진 출격준비다 — 거기서는 그 틈이 안 보인다.
    hudSlotRow(bd, row.deck ? loGroups(row.deck) : loVoidGroups(), { size: 30, art: 19 });
    // 궁극기 — **손그림에 없는 칸이다.** 자리만 비워 두고 무엇도 안 채운다.
    bd.insertAdjacentHTML("beforeend", `<div class="ultspot">궁극기<i>판정 대기</i></div>`);
  }
  host.appendChild(d);
  const eb = d.querySelector("[data-edit]");
  if (eb && onEdit) eb.addEventListener("click", () => onEdit(row));
  hudPanels();
}

// ── 화면 하나를 세운다 ───────────────────────────────────────────────────
function hdScreen(id, seed, openPop) {
  const bg = $(id + "-bg");
  if (bg) mk(bg, [788, 364], hdBg(seed), { clear: true });
  const list = $(id + "-list");
  const scr = $(id + "-screen");
  const open = (r) => loPicker(scr, {
    title: "편성표 0" + r.n, verb: "편성", deck: r.deck, tab: r.deck ? 1 : 0, done: "편성",
  });
  if (list) HDDECKS.forEach((row) => hdCard(list, row, open));
  if (openPop) open(HDDECKS[0]);
  hudRail(id + "-rail", "home");
  lbCur(id + "-cur", "12,480", "36");
}
hdScreen("hd1", 5, false);
hdScreen("hd2", 23, true);

// ── 상태 견본 셋 — 카드와 **같은 함수**로 짓는다 ─────────────────────────
// 견본이 제 손으로 그리면 「이 상태가 화면에서 어떻게 보이나」를 거짓으로
// 말하게 된다(도감 장이 같은 자리에서 같은 판정을 내렸다).
{ const h = $("hd-samps");
  if (h) [
    [{ n: 2, st: "void" }, "비어 있음 — 내 칸인데 안 채웠다. 자리 수는 짜인 편성표와 같다"],
    [{ n: 4, st: "buy" }, "살 수 있음 — 아직 내 것이 아니다. 자리를 안 그린다"],
    [{ n: 5, st: "lock" }, "잠김 — 빗금. 넷째를 연 뒤에야 열린다"],
  ].forEach(([row, cap]) => {
    const w = document.createElement("div"); w.className = "hd-samp";
    hdCard(w, row, null);
    w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
    h.appendChild(w);
  });
}
hudPanels();
