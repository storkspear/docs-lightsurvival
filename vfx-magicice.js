// ══════════════════════════════════════════════════════════════════════════
// MI — 마법 장의 **파문을 새 그림으로 갈아 끼운다**            (2026-08-28)
//
// ⭐⭐ **한 스킬에 그림이 둘이면 안 된다.** 파문은 2026-08-28 3차에 빙 장에서
//   다시 그려졌고(`vfx-ice6.js` 의 `FX.IZpulse`), 그때 빙 장의 칸 키만
//   `pulse` → `IZpulse` 로 갈렸다. 마법 장은 그대로 `vfx.js` 의 옛 `FX.pulse`
//   를 그리고 있었다 — 같은 스킬이 두 장에서 **서로 다른 그림**으로 서 있었고,
//   그것이 이 레포가 결빙에서 이미 한 번 겪은 병이다(반년을 나란히 섰다).
//
// ── ⚠️ 왜 `vfx.js` 를 안 고치고 곁 파일로 하나 ────────────────────────────
// `vfx.js` 는 5만 줄이고 **여덟 갈래가 같은 사이클에 같이 쓴다.** 파문의 마운트
// (`MOUNT("magic")` + `tile`)와 성장표(`lvTable`)는 그 파일 안에 있어서, 거기서
// 고치면 남의 편집과 정면으로 부딪힌다. ⇒ **이미 만들어진 칸의 그리기 함수만**
// 뒤에서 갈아 끼운다. 마크업·캡션·성장표 문구는 한 글자도 안 건드린다.
//
// ── ⚠️ 왜 `FX.pulse = FX.IZpulse` 한 줄로 안 되나 ────────────────────────
// [tile] 과 [lvTable] 이 **마운트 시각에** `const fn=reg[key]` 로 함수를
// **붙잡아 둔다**. 우리가 실릴 때는 이미 붙잡힌 뒤라, 표를 갈아도 화면은 안
// 바뀐다 — 「고쳤는데 아무 일도 안 일어난다」의 전형이다.
// ⇒ [anims] 에 들어간 **그 항목의 `fn` 자체**를 바꾼다. 캔버스도 크기도
//   그대로이고 바뀌는 것은 **다음 프레임에 무엇을 그리나** 하나뿐이다.
//
// ⚠️ 레벨 감싸기를 **똑같이 재현해야 한다.** 격자 칸은 `LV=5`(완성형)로 그리고
//   성장표는 칸마다 `LV=L` 이다 — 안 감싸면 다섯 칸이 전부 같은 그림이 된다.
// ⚠️ `RECOLOR` 도 원본과 같게 되돌린다(파문은 `WTONE` 에 없어 `null` 이지만,
//   빠뜨리면 앞 칸의 색이 새 나간다).
// ══════════════════════════════════════════════════════════════════════════
{
  // ⚠️ 이 장에만 있는 호스트다 — 없는 장에서는 **조용히 건너뛴다**(다른 곁
  //   파일과 같은 규율). 린터 검사 ① 이 이 줄을 보고 짝을 맞춘다.
  const MIgrid = document.getElementById("magic");
  const MIlv = document.getElementById("levelsm");

  /// 캔버스로 [anims] 항목을 찾는다. 못 찾으면 null — 조용히 건너뛴다.
  const MIanim = (cv) => {
    if (typeof anims === "undefined") return null;
    for (const a of anims) if (a.cv === cv) return a;
    return null;
  };
  /// 그 항목의 그리기 함수를 **레벨을 감싸** 갈아 끼운다.
  /// ⚠️ 이름 있는 함수식이라야 [mk] 의 `label` 자리가 안 비고, 스모크가
  ///   `--only=` 로 이 줄만 골라 돌 수 있다.
  const MIswap = (cv, lv) => {
    const a = MIanim(cv);
    if (!a || typeof FX === "undefined" || !FX.IZpulse) return 0;
    const NEW = FX.IZpulse;
    a.fn = { IZpulse: function (c, t, dt, W, H, st) {
      const sl = LV, sr = RECOLOR;
      LV = lv; RECOLOR = null;
      try { NEW(c, t, dt, W, H, st); } finally { LV = sl; RECOLOR = sr; }
    } }.IZpulse;
    a.label = "IZpulse";
    // ⚠️ **앞 그림이 쌓아 둔 상태를 버린다.** 옛 `FX.pulse` 는 `st.r`(퍼지는
    //   파동 배열)·`st.F`(제 적 배치)를 들고 있는데, 새 그림은 `st.F` 를 **다른
    //   자리 넷**으로 만든다. 안 비우면 첫 프레임이 옛 적 자리 위에 새 파면을
    //   그려 **한 번 튄다**.
    a.st = { p: [] };
    return 1;
  };

  /// 칸의 이름표에서 스킬 이름을 읽는다 — 키가 아니라 **화면의 이름**으로 찾는다.
  /// ⚠️ 키로 찾을 수가 없다: [tile] 이 키를 DOM 어디에도 안 남긴다.
  const MItext = (el, sel) => {
    const n = el && el.querySelector ? el.querySelector(sel) : null;
    return n ? (n.textContent || "").trim() : "";
  };

  let swapped = 0;

  // ── ① 마법 공격 격자의 파문 한 칸 — 격자는 **L5(완성형)** 로 그린다 ──────
  if (MIgrid && MIgrid.querySelectorAll) {
    for (const d of MIgrid.querySelectorAll(".tile")) {
      if (MItext(d, ".cap .nm") !== "파문") continue;
      const cv = d.querySelector ? d.querySelector("canvas") : null;
      if (cv) swapped += MIswap(cv, 5);
    }
  }

  // ── ② 성장표의 파문 한 줄 — 다섯 칸이 **칸마다 제 레벨**이다 ────────────
  if (MIlv && MIlv.querySelectorAll) {
    for (const row of MIlv.querySelectorAll(".lvblock")) {
      // ⚠️ **`.hd b` 로 찾지 않는다.** [lvTable] 의 머리는
      //   `<div class="hd"><b>이름</b><span>부제</span></div>` 라 `.hd` 의 글월이
      //   「이름 + 부제」다 ⇒ **앞이 이름인가**로 본다. 중첩 선택자에 기대면
      //   마크업이 한 겹만 바뀌어도 조용히 못 찾는다(검산 하네스에서 실제로 났다).
      if (!MItext(row, ".hd").startsWith("파문")) continue;
      const cells = row.querySelectorAll ? row.querySelectorAll(".cell canvas") : [];
      let L = 1;
      for (const cv of cells) swapped += MIswap(cv, L++);
    }
  }

  // ⚠️ **조용히 실패하면 안 된다.** 이 파일이 하는 일은 「이미 있는 것을 갈아
  //   끼우기」라, 못 찾아도 화면은 멀쩡히(옛 그림으로) 돈다 — 그래서 사람 눈이
  //   못 잡는다. 콘솔에 밝힌다(`charMISS` 와 같은 자리).
  // ⚠️ 칸이 **하나라도 있을 때만** 운다 — 가짜 DOM(`mockup_smoke.js`)은
  //   `querySelectorAll` 이 늘 빈 배열이라, 무조건 울면 스모크가 매번 거짓
  //   경보를 낸다(실제로 냈다). 「칸은 있는데 파문이 없다」가 진짜 결함이다.
  const MIn = (MIgrid && MIgrid.querySelectorAll)
    ? MIgrid.querySelectorAll(".tile").length : 0;
  if (MIn > 0 && !swapped)
    console.warn("MI — 마법 장에서 파문 칸을 못 찾았다(옛 그림이 그대로 선다)");
}
