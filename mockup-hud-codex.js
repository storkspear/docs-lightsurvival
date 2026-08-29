// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-codex.js — 화면 5 「도감」
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HC`/`hc` 로 격리한다.
//
// ── 이 파일이 새로 짓는 것은 껍질뿐이다 ─────────────────────────────────
// 칸 · 상태 · 분수 · 오른쪽 창의 정본은 `mockup-codex.html` 이고, 성장표 네
// 줄은 `vfx.js` 의 `LVT`, 미리보기는 확정본 FX `PKflameC4` 다. 여기서 하는
// 일은 그 규칙들을 SF HUD 창에 앉히는 것뿐이라 **83칸을 다시 안 적는다** —
// 화면에 실제로 뜨는 두 묶음(일반 · 마법)만 든다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 계열 자리표 문양 여섯 ────────────────────────────────────────────────
// ⚠️ 실루엣은 옛 도감의 `i.sb`~`i.se`(CSS clip-path) **그대로**다 — 좌표를
//   0~1 로 옮겨 적었을 뿐 모양을 새로 짓지 않았다. 옛 장이 「격자의 문양은
//   자리표」라고 못 박아 뒀으므로 자리표가 두 벌이 되면 안 된다.
// ⚠️ 2톤인 것도 그대로다(위 52% 밝음 · 아래 어두움) — 색만 냉광으로 바꿨다.
//
// ⚠️⚠️ **일반 일곱만 자리표를 졸업했다**(2026-08-27). 자리표는 「같은 계열이다」를
//   말하는데, 한 계열 **안**에서 칸을 고르는 화면에서는 그 말이 이미 참이라
//   아무것도 안 가른다 — 일반 일곱 칸이 죄다 같은 화살표였고 사용자가 반려했다
//   (「촌스럽다」). 일곱의 낱 문양은 `glyph-weapon.js` 한 곳에서 나오고 옛 도감이
//   같은 파일을 읽는다. **낱 문양이 아직 없는 열**(공전 · 유도탄 · 빛폭탄 ·
//   바람원반 · 기생 · 기폭 · 분열 · 단전 · 부양 · 뇌광)과 마법은 자리표
//   그대로다 — 승급은 한 묶음씩 한다.
const HCFRONT = "#E8F8FF", HCBACK = "#4E7A96";
function hcTone(c, W) {
  const g = c.createLinearGradient(0, 0, 0, W);
  g.addColorStop(0, HCFRONT); g.addColorStop(0.52, HCFRONT);
  g.addColorStop(0.52, HCBACK); g.addColorStop(1, HCBACK);
  return g;
}
function hcPoly(c, W, pts) {
  c.fillStyle = hcTone(c, W);
  c.beginPath();
  pts.forEach(([x, y], i) => (i ? c.lineTo(x * W, y * W) : c.moveTo(x * W, y * W)));
  c.closePath(); c.fill();
}
const HCFAM = {
  // 일반 — 총구에서 곧장 나가는 것(화살).
  sb: (c, W) => hcPoly(c, W, [[0, .36], [.58, .36], [.58, .14], [1, .50], [.58, .86], [.58, .64], [0, .64]]),
  // 마법 — 장판 · 소환 · 전역기(마름모).
  sm: (c, W) => hcPoly(c, W, [[.50, 0], [1, .50], [.50, 1], [0, .50]]),
  // 방어 — 막는 것(방패 육각).
  sg: (c, W) => hcPoly(c, W, [[.50, 0], [1, .18], [1, .56], [.50, 1], [0, .56], [0, .18]]),
  // 버프 — 안 나가는 것(위로 뻗는 화살). 되돌리는 다섯과 푸는 셋이 한 꼴이다
  //   — 자리표는 「같은 계열이다」만 말하고, 그 안을 가르는 것은 `recovery`
  //   태그이지 문양이 아니다.
  sf: (c, W) => hcPoly(c, W, [[.50, 0], [1, .46], [.68, .46], [.68, 1], [.32, 1], [.32, .46], [0, .46]]),
  // 방어구 — 입는 것(납작 육각).
  sa: (c, W) => hcPoly(c, W, [[.50, 0], [1, .26], [1, .74], [.50, 1], [0, .74], [0, .26]]),
  // 적 — 만나는 것(구). 유일하게 면이 둥글다 — 나머지 일곱과 실루엣이 갈린다.
  se: (c, W) => {
    const g = c.createRadialGradient(W * .40, W * .36, W * .04, W * .5, W * .5, W * .52);
    g.addColorStop(0, HCFRONT); g.addColorStop(.72, HCBACK); g.addColorStop(1, "#2C4A5E");
    c.fillStyle = g; c.beginPath(); c.arc(W / 2, W / 2, W * .48, 0, TAU); c.fill();
  },
};

// ── 화면에 뜨는 세 묶음 ──────────────────────────────────────────────────
// [묶음 이름, 분수 [모은 수, 전체], 문양 키, 칸들 [이름, 상태]]
// 상태: "" 모음 · "dim" 안 모음(실루엣) · "pick" 고름 · "hollow" 헛 · "void" 안 만남
// ⚠️ 수는 옛 도감 장의 **그려진 격자** 그대로다(그 장의 수 표와 안 맞는 것은
//   이 장의 「어긋난 자리」에 적어 뒀다 — 고치지 않고 옮겼다).
/// 일반 일곱의 상태 — **이름도 차례도 여기 안 적는다.** `glyph-weapon.js` 의
/// [WEPORDER]·[WEPNAME] 이 정본이고 옛 도감도 같은 것을 읽는다. 여기 베끼면
/// 무기 하나가 늘 때 고칠 자리가 셋이 되고, 그중 하나만 고치는 날이 온다.
const HCBASIC = ["", "", "", "pick", "dim", "dim", "dim"];
/// 총구를 안 쓰는 열 — **낱 문양이 아직 없어** 일반 자리표(화살)를 받는다.
/// ⚠️ 대분류가 셋(일반 · 마법 · 방어)이 되며 옛 「보조」 묶음이 없어졌다.
///   묶음이 없어졌다고 칸이 없어지는 것이 아니라 **위 일곱과 한 줄에 선다.**
const HCOFFMUZZLE = [
  ["공전", ""], ["유도탄", ""], ["빛폭탄", ""], ["바람원반", "dim"], ["기생", "dim"],
  ["기폭", "dim"], ["분열", "dim"], ["단전", "dim"], ["부양", "dim"], ["뇌광", ""]];
const HCFAMS = [
  ["일반", [8, 17], "sb", [
    ...WEPORDER.map((k, i) => [WEPNAME[k], HCBASIC[i], k]), ...HCOFFMUZZLE]],
  ["마법", [4, 13], "sm", [
    ["암전", ""], ["결빙", "dim"], ["불비", "dim"], ["불밭", ""], ["화염회오리", "dim"],
    ["성역", "dim"], ["파문", "dim"], ["낙광", ""], ["광주", "dim"], ["개안", ""],
    ["극독", "dim"], ["감염", "dim"], ["공명", "dim"]]],
];

/// 칸 하나를 짓는다 — 격자와 상태 견본이 **같은 함수**를 쓴다(둘이 갈리면
/// 「이 상태가 화면에서 어떻게 보이나」를 견본이 거짓으로 말하게 된다).
function hcCell(fam, nm, state, wep) {
  const d = document.createElement("div");
  d.className = "hudcell " + state;
  // ⚠️ 안 만난 칸(`void`)에도 **문양 자리는 그대로** 둔다 — 물음표가 그
  //   자리를 받는다. 자리를 없애면 칸 높이가 저 혼자 달라져 격자가 흔들린다.
  const cv = document.createElement("canvas");
  cv.style.width = "20px"; cv.style.height = "20px";
  if (state === "void") d.insertAdjacentHTML("beforeend", `<div class="vq">?</div>`);
  else d.appendChild(cv);
  d.insertAdjacentHTML("beforeend", `<div class="n">${state === "void" ? "&nbsp;" : nm}</div>`);
  // ⚠️ 낱 문양은 [wepGlyphPaint] 로 **한 번만** 그린다 — 자리표는 `mk()` 의 프레임
  //   루프에 얹혀 있지만 문양은 정적이라 매 프레임 다시 그릴 이유가 없고, 열어 둔
  //   시안 탭이 CPU 를 계속 태우는 것이 이 저장소가 이미 한 번 치른 값이다.
  if (state === "void") return d;
  if (wep && typeof wepGlyphPaint === "function" && wepGlyphPaint(cv, wep, 20, HCFRONT, HCBACK))
    return d;
  mk(cv, [40, 40], function hcCellGlyph(c, t, dt, W) { HCFAM[fam](c, W); }, { clear: true });
  return d;
}

// ── 배경 — 공용 껍질 + 이 화면의 표식 ────────────────────────────────────
// 도감의 표식은 **눈금이 촘촘한 큰 고리 하나**다 — 「분모가 있다」를 고리
// 하나로 말한다. 격자 뒤라 알파를 아주 낮게 둔다.
{ const bg = $("hc-bg");
  if (bg) mk(bg, [788, 364], function hcBg(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed: 19 });
    const r = Math.min(box.w, box.h) * 0.48;
    hudRing(c, box.cx, box.cy, r, { alpha: 0.11, w: 1.4 });
    hudTicks(c, box.cx, box.cy, r * 1.03, 60, { len: 4, bigLen: 9, every: 5, alpha: 0.18 });
    hudRing(c, box.cx, box.cy, r * 0.70, { alpha: 0.09, w: 1, dash: [2, 6] });
    c.save(); c.translate(box.cx, box.cy); c.rotate(-tAbs * 0.05);
    hudSectorRing(c, 0, 0, r * 0.86, 20, { alpha: 0.09 });
    c.restore();
  }, { clear: true });
}

// ── 격자 — 묶음 머리줄 + 칸. 넘치는 만큼은 페이드가 「무엇이 남았나」로 받는다.
{ const g = $("hc-grid");
  if (g) HCFAMS.forEach(([nm, [got, all], fam, cells]) => {
    g.insertAdjacentHTML("beforeend",
      `<div class="hudhead"><b>${nm}</b><span class="ct${got === all ? " full" : ""}">${got} / ${all}</span></div>`);
    cells.forEach(([cn, st, wp]) => g.appendChild(hcCell(fam, cn, st, wp)));
  });
}

// ── 오른쪽 창 — 미리보기 위 · 성장표 아래 ────────────────────────────────
// ⚠️ **비어도 자리를 남긴다** — 고를 때마다 격자 폭이 흔들리면 방금 보던
//   칸이 흘러간다(옛 도감 장의 판정 그대로).
{ const s = $("hc-side");
  if (s) {
    const rows = (typeof LVT !== "undefined" && LVT["flamer"]) || [];
    s.insertAdjacentHTML("beforeend",
      `<div class="hc-pv"><canvas></canvas><span class="pvl">미리보기 — FX 그대로</span></div>`
      + `<div class="ttl">화염방사<i>일반</i></div>`
      + `<div class="hc-dk">해금</div>`
      + rows.map((t, i) => `<div class="hudkv"><b>L${i + 2}</b><span>${t}</span></div>`).join(""));
    const cv = s.querySelector(".hc-pv canvas");
    // ⭐ **그 그림을 그대로 돌린다.** 스킬의 정체는 글이 아니라 움직임이라는
    //   판정(상점 팝업이 먼저 내렸다)을 도감이 그대로 물려받는다.
    // ⚠️ 캔버스 픽셀 수가 곧 **그림의 축척**이다 — FX 는 제 좌표를 W·H 에서
    //   뽑으므로 큰 버퍼를 작은 칸에 눌러 담으면 불줄기가 좁쌀만 해진다.
    //   창의 실치수(≈158×74)에 가깝게 잡아야 창을 채운다.
    if (cv && typeof PKflameC4 !== "undefined") mk(cv, [200, 94], PKflameC4);
  }
}

// ── 상태 견본 다섯 — 격자와 같은 함수로 짓는다 ───────────────────────────
{ const h = $("hc-samps");
  // ⚠️ 무기 이름은 여기서도 안 적는다 — [WEPNAME] 이 정본이다(격자와 같은 규약).
  if (h) [["sb", "", "모음", "bolt"],
  ["sb", "dim", "안 모음 — 실루엣", "frostcrystal"],
  ["sb", "pick", "고름 — 흰 테(금이 아니다)", "flamer"],
  ["sm", "hollow", "헛 — 효과가 아직 없다", null, "물고기"],
  ["se", "void", "안 만남 — 빈 칸", null, ""]].forEach(([fam, st, cap, wp, nm]) => {
    const w = document.createElement("div"); w.className = "hc-samp";
    w.appendChild(hcCell(fam, wp ? WEPNAME[wp] : nm, st, wp));
    w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
    h.appendChild(w);
  });
}

// ── 일반 일곱 — **나란히 놓고 보는 자리** ────────────────────────────────
// ⚠️⚠️ **판정은 낱장이 아니라 한 벌이다**(레벨업 카드 장의 [lcldef] 격자가 이미
//   치른 값). 하나씩 보면 다 그럴듯하고, 일곱을 **실크기로 나란히** 놓아야
//   겹치는 것이 드러난다. 세 줄인 이유:
//     ① **실크기(20px)** — 큰 그림에서만 갈리는 것은 안 갈린 것이다
//     ② **잠김** — 도감이 절반을 채도 0 · 밝기 절반으로 그린다
//     ③ **회색조** — 등급 색도 계열 색도 없이 실루엣만 남는다
{ const h = $("hc-wep");
  if (h && typeof WEPORDER !== "undefined") [
    ["", "모음 — 실크기 20px"],
    ["dim", "안 모음 — 채도 0 · 밝기 절반"],
    ["gray", "회색조 — 색을 뺀다"],
  ].forEach(([mod, cap]) => {
    const row = document.createElement("div");
    row.className = "hc-weprow " + mod;
    row.insertAdjacentHTML("beforeend", `<div class="wc">${cap}</div>`);
    WEPORDER.forEach((k) => row.appendChild(hcCell("sb", WEPNAME[k], mod === "gray" ? "" : mod, k)));
    h.appendChild(row);
  });
}

// ── 화염방사 후보 — **「얹은 정도」만 다른 넷** ───────────────────────────
// ⚠️ 위 격자와 **같은 세 줄**로 세운다(실크기 · 잠김 · 회색조). 한 줄만 보고
//   고르면 잠긴 칸에서 골이 메워지는 것을 못 본다.
// ⚠️ **지금 것이 첫 칸**이다 — 얹는 일은 「바뀌었나」가 아니라 「얼마나
//   얹혔나」가 물음이라, 견줄 것이 같은 줄에 없으면 판정이 안 선다.
{ const h = $("hc-wepalt");
  if (h && typeof WEPFLAME !== "undefined") [
    ["", "모음 — 실크기 20px"],
    ["dim", "안 모음 — 채도 0 · 밝기 절반"],
    ["gray", "회색조 — 색을 뺀다"],
  ].forEach(([mod, cap]) => {
    const row = document.createElement("div");
    row.className = "hc-weprow " + mod;
    row.insertAdjacentHTML("beforeend", `<div class="wc">${cap}</div>`);
    Object.keys(WEPFLAME).forEach((k) => row.appendChild(
      hcCell("sb", WEPFLAME[k].lbl + (k === WEPFLAMEPICK ? " ★" : ""),
        mod === "gray" ? "" : mod, "flamer." + k)));
    h.appendChild(row);
  });
}

// ── 설정 톱니 · 레일 ─────────────────────────────────────────────────────
{ const h = $("hc-set");
  if (h) { const cv = document.createElement("canvas");
    cv.style.width = "18px"; cv.style.height = "18px"; h.appendChild(cv);
    mk(cv, [18, 18], function hcGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true }); } }
hudRail("hc-rail", "codex");
hudPanels();
