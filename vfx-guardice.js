// ══════════════════════════════════════════════════════════════════════════
// GI — 방어 장의 **빙벽 셋을 새 그림으로 갈아 끼운다**       (2026-08-28)
//
// ⭐⭐ 사용자 판정(2026-08-28 6차): 「빙벽은 **2D가 아니라 3D 형태로 세워야**
//   할 듯하고 **빙벽이 생성되는 형태부터 애니메이션 짜야** 할 거 같음.
//   **지금은 그냥 뿅 하고 나타남**」
// ⇒ 새 그림은 `vfx-ice6.js` 의 `FX.IZwall1`·`IZwall2`·`IZwall4` 다. 빙 장은 칸
//   키를 갈아 끼웠지만, 방어 장의 성장표(`#levelsg`)는 `vfx.js` 안에서 마운트되어
//   칸 키를 못 바꾼다. ⇒ **이미 만들어진 칸의 그리기 함수만** 뒤에서 갈아 끼운다.
//
// ⚠️ `vfx.js` 를 안 고치는 까닭은 마법 장(`vfx-magicice.js`)과 같다 — 5만 줄을
//   여덟 갈래가 같이 쓴다. 마크업·캡션·성장표 문구는 한 글자도 안 건드린다.
// ⚠️ [tile]·[lvTable] 이 **마운트 시각에** `const fn=reg[key]` 로 함수를 붙잡아
//   두므로 `FX.WLwall1 = …` 로는 화면이 안 바뀐다 — [anims] 항목의 `fn` 을 바꾼다.
// ⚠️ 성장표는 칸마다 `LV=L` 이라 **레벨 감싸기를 그대로 재현**해야 한다.
// ══════════════════════════════════════════════════════════════════════════
{
  // ⚠️ 이 장에만 있는 호스트다 — 없는 장에서는 조용히 건너뛴다(린터 검사 ①).
  const GIlv = document.getElementById("levelsg");
  const GIgrid = document.getElementById("guard");

  /// 성장표 머리의 이름 ↔ 새 그림. ⚠️ **셋이 서로 다른 함수**다 — 솟는 방식이
  ///   달라야 셋이 화면에서 갈린다(같은 메커니즘이면 또 걷힌다).
  const GIMAP = [["빙벽 A", "IZwall1"], ["빙벽 B", "IZwall2"], ["빙벽 D", "IZwall4"]];
  /// 격자 낱칸의 이름 ↔ 새 그림(낱칸은 L5 로 그린다).
  const GITILE = [["호 A", "IZwall1"], ["호 B", "IZwall2"], ["호 D", "IZwall4"]];

  const GIanim = (cv) => {
    if (typeof anims === "undefined") return null;
    for (const a of anims) if (a.cv === cv) return a;
    return null;
  };
  const GIswap = (cv, lv, key) => {
    const a = GIanim(cv);
    if (!a || typeof FX === "undefined" || !FX[key]) return 0;
    const NEW = FX[key];
    a.fn = { [key]: function (c, t, dt, W, H, st) {
      const sl = LV, sr = RECOLOR;
      LV = lv; RECOLOR = null;
      try { NEW(c, t, dt, W, H, st); } finally { LV = sl; RECOLOR = sr; }
    } }[key];
    a.label = key;
    // ⚠️ 앞 그림이 쌓아 둔 상태를 버린다 — 적 배치가 다르다(새 그림은 위에서
    //   내려와 벽 앞에서 멈춘다). 안 비우면 첫 프레임이 옛 자리 위에 그려진다.
    a.st = { p: [] };
    return 1;
  };
  const GItext = (el, sel) => {
    const n = el && el.querySelector ? el.querySelector(sel) : null;
    return n ? (n.textContent || "").trim() : "";
  };

  let n = 0;
  // ── ① 성장표 세 줄 — 칸마다 제 레벨이다 ────────────────────────────────
  if (GIlv && GIlv.querySelectorAll) {
    for (const row of GIlv.querySelectorAll(".lvblock")) {
      const head = GItext(row, ".hd");
      const hit = GIMAP.find(([nm]) => head.startsWith(nm));
      if (!hit) continue;
      let L = 1;
      for (const cv of row.querySelectorAll(".cell canvas")) n += GIswap(cv, L++, hit[1]);
    }
  }
  // ── ② 방어 격자의 낱칸 셋 — 격자는 L5(완성형) ──────────────────────────
  if (GIgrid && GIgrid.querySelectorAll) {
    for (const d of GIgrid.querySelectorAll(".tile")) {
      const nm = GItext(d, ".cap .nm");
      const hit = GITILE.find(([k]) => nm.startsWith(k));
      if (!hit) continue;
      const cv = d.querySelector ? d.querySelector("canvas") : null;
      if (cv) n += GIswap(cv, 5, hit[1]);
    }
  }
  // ⚠️ 칸이 하나라도 있을 때만 운다 — 가짜 DOM 은 늘 빈 배열을 돌려준다.
  const GIn = (GIlv && GIlv.querySelectorAll) ? GIlv.querySelectorAll(".lvblock").length : 0;
  if (GIn > 0 && !n)
    console.warn("GI — 방어 장에서 빙벽 칸을 못 찾았다(옛 그림이 그대로 선다)");
}
