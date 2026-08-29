// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-log.js — 화면 6 「출격일지」
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HL`/`hl` 로 격리한다.
//
// ── 이 파일이 새로 짓는 것은 껍질뿐이다 ─────────────────────────────────
// 기록의 정본은 `vfx.js` 의 `LBCLEAR`(스테이지 · 이름 · 난이도별 별)이고,
// 규칙 셋(접기 · 안 그리기 · 별은 모양)은 `mockup-lobby.html#s-log` 가
// 정했다. 여기서 하는 일은 그 둘을 SF HUD 창에 앉히는 것뿐이다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

/// 별 셋 — **못 딴 별은 지우지 않고 죽인다.** 3 이 만점임이 보여야 ★2 가
/// 「하나 남았다」로 읽힌다(옛 로비 장의 규칙 그대로).
/// ⚠️ 색만 이 트랙의 것으로 바꿨다 — 옛 죽은 별색(#262630)은 이 화면의
///   짙은 남색 바탕 위에서 거의 안 보인다(모양이 남아야 규칙이 산다).
const HLSTAR_ON = "#FFD27A", HLSTAR_OFF = "#24384C";
function hlStars(n) {
  let o = "";
  for (let i = 0; i < 3; i++)
    o += `<span class="hl-st" style="color:${i < n ? HLSTAR_ON : HLSTAR_OFF}">★</span>`;
  return o;
}

// ── 배경 — 공용 껍질 + 이 화면의 표식 ────────────────────────────────────
// 일지의 표식은 **레이더 하나**다 — 「어디까지 갔나」를 묻는 화면이라 항로를
// 훑는 그림이 맞다. 스토리 칸 뒤쯤에 앉혀 기록 줄을 안 가린다.
function hlBg(seed) {
  return function hlBgDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed });
    const r = Math.min(box.w, box.h) * 0.42;
    // ⚠️ **알파를 통째로 눌러 둔다.** 이 화면은 두 칸이 무대를 다 덮어서
    //   표식이 반드시 판 **뒤**로 비친다 — 제 알파 그대로 그리면 스윕이
    //   기록 줄 위로 지나가 글이 안 읽힌다(첫 판에서 실제로 그랬다).
    c.save(); c.globalAlpha = 0.38;
    hudRadar(c, box.x + box.w * 0.22, box.cy, r, tAbs,
      { rings: [1, 0.72, 0.48, 0.26], ticks: 48, sweepSpeed: 0.5, core: 0.10 });
    hudOrbit(c, box.x + box.w * 0.76, box.cy, r * 0.9, r * 0.42, tAbs,
      { speed: 0.12, alpha: 0.10, dots: 2, dotR: 1.8 });
    c.restore();
  };
}
{ const a = $("hl1-bg"); if (a) mk(a, [788, 364], hlBg(5), { clear: true }); }
{ const b = $("hl2-bg"); if (b) mk(b, [788, 364], hlBg(29), { clear: true }); }

/// 화면 한 장 — 왼쪽 스토리(자리만) · 오른쪽 클리어 기록.
/// ⚠️ **기록이 없는 것은 아예 안 그린다** — 깬 적 없는 스테이지는 줄이 없고
///   안 깬 난이도는 칸이 없다. 「매우어려움 ―」 같은 빈 자리를 남기면 못 깬
///   것이 목록의 절반이 되어 일지가 성적표가 된다. 여기는 **한 일**이 적히는 곳이다.
function hlScreen(hostId, empty) {
  const h = $(hostId); if (!h) return;
  // 왼쪽 — 스토리. 기획 전이라 자리만 둔다(지어내지 않는다).
  h.insertAdjacentHTML("beforeend",
    `<div class="hudside hl-story">`
    + `<div class="ttl" style="font-size:8.5px;letter-spacing:.2em;color:#6E93AD">스토리</div>`
    + `<div class="mid">한 번 본 것을<br>여기서 다시 본다</div>`
    + `<div class="soon">기획 중</div></div>`);
  // 오른쪽 — 클리어 기록. ⚠️ 가로선만 긋는다(칸을 두르면 표가 된다).
  const R = document.createElement("div");
  R.className = "hudside hl-rec";
  R.insertAdjacentHTML("beforeend",
    `<div class="hd"><span class="lb">클리어 기록</span>`
    + `<span class="ct">${empty ? "" : LBCLEAR.length + "개 스테이지"}</span></div>`);
  if (empty) {
    R.insertAdjacentHTML("beforeend", `<div class="none">아직 깬 곳이 없다</div>`);
  } else {
    const rows = document.createElement("div"); rows.className = "rows";
    LBCLEAR.forEach(([no, nm, marks]) => {
      rows.insertAdjacentHTML("beforeend",
        `<div class="r"><div class="no"><div class="k">스테이지 ${no}</div>`
        + `<div class="nm">${nm}</div></div>`
        + `<div class="mk">` + marks.map(([t, n]) =>
          `<span class="one"><span class="dif">${t}</span>${hlStars(n)}</span>`).join("")
        + `</div></div>`);
    });
    R.appendChild(rows);
  }
  h.appendChild(R);
}
hlScreen("hl1-body", 0);
hlScreen("hl2-body", 1);

// ── 설정 톱니 · 레일 ─────────────────────────────────────────────────────
["hl1-set", "hl2-set"].forEach((id) => {
  const h = $(id); if (!h) return;
  const cv = document.createElement("canvas");
  cv.style.width = "18px"; cv.style.height = "18px"; h.appendChild(cv);
  mk(cv, [18, 18], function hlGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true });
});
hudRail("hl1-rail", "log");
hudRail("hl2-rail", "log");
hudPanels();
