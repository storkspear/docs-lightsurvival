// ══════════════════════════════════════════════════════════════════════════
// map-galaxy.js — **관측소 은하, 텍스처를 얹은 판.**
//
// `vfx.js` · `uitex.js` 뒤에 실린다. 최상위 이름은 `GXT`/`gxt` 로 격리한다.
// 엔진 짝은 `lib/ui/watch_galaxy.dart` 의 `drawGalaxy` — **수치가 한 벌**이다.
//
// ── 왜 새 파일인가 ───────────────────────────────────────────────────────
// 옛 판(`vfx.js` 의 `gxDraw`)은 **방사 램프와 선만으로** 그린다. 그 그림이
// 「뭉개진 흰 덩어리」로 읽힌 이유는 밝기가 모자라서가 아니라 **결이 없어서**다
// — 은하는 정체가 있는 물건이 아니라 **빛과 가스**라, 텍스처가 제일 잘 먹는
// 자리인데 그 자리를 비워 두고 있었다.
//
// ⚠️ `gxDraw` 를 안 고치고 옆에 둔다 — 옛 그림이 남아 있어야 「무엇이
//   나아졌나」를 나란히 볼 수 있고, `chapter.js` 의 1뎁스가 아직 그쪽을 부른다.
//
// ── 텍스처를 어디에 썼나 ─────────────────────────────────────────────────
// | 자리 | 텍스처 | 왜 |
// |---|---|---|
// | 원반 · 타원의 몸 | `kenney_smoke` | 가운데가 밝고 결이 구름인 유일한 장 |
// | 늙은 별무리의 알갱이 | `noise_grainy × kenney_smoke` | 네모 노이즈를 둥글게 오려 굽는다 |
// | 원반을 흐르는 결 | `noise_streak × kenney_smoke` | 같은 이유 |
// | 팔 위의 별 생성 마디 | `kenney_smoke` | 팔이 머리카락 한 올이 아니게 |
// | 핵 · 밝은 별의 십자 빛 | `kenney_star` | 가운데가 뾰족하게 밝은 유일한 장 |
// | 렌즈의 테 | `kenney_circle` | 팔 없이 「원반이 있다」를 말하는 테 하나 |
// | 잠긴 칸의 부드러운 테 | `mask_glow_soft` | **속이 빈 고리**다(실측) — 윤곽만 |
//
// ⚠️⚠️ **`mask_glow_soft` 는 후광이 아니라 고리다.** 이름만 보고 「부드러운
//   빛」으로 쓰면 그리는 것마다 도넛이 된다(실측 반경 프로파일: 중심 0.00 →
//   r56 에서 0.79 → r64 에서 0). 매끈한 면이 필요한 자리는 텍스처가 아니라
//   **램프**(`utRamp`)의 몫이다 — 핵 · 팽대부 · 헤일로 · 막대가 그렇다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

const GXT_INK = {
  pick: "#E8C879", done: "#CED0E0", dim: "#9696AF",
  corePick: "#FFF4D6", coreDone: "#EEF0FC",
};

/// 지나온 은하가 눌리는 몫 — 옛 `GXINK.done` 의 그 .78 이다.
/// **금빛 하나만 온전한 밝기**라는 규약이 여기 한 수로 모인다.
const GXT_DONE = 0.78;

/// 은하 하나. [k] 는 허블 종, [st] 는 0 잠김 · 1 고른 것 · 2 지나온 것.
/// 인자와 뜻이 `gxDraw` 와 같다 — 부르는 쪽이 한 글자만 바꿔 갈아탈 수 있다.
function gxTexDraw(c, x, y, r, k, st, seed) {
  if (st === 0) {                                  // 잠김 — 윤곽만
    utStamp(c, "mask_glow_soft", x, y, r * 1.05, r * 1.05, 0, GXT_INK.dim, 0.10);
    c.save();
    c.strokeStyle = A(GXT_INK.dim, 0.34); c.lineWidth = 1;
    c.beginPath(); c.arc(x, y, r * 0.82, 0, TAU); c.stroke();
    c.restore();
    return;
  }
  const pick = st === 1;
  const dim = pick ? 1 : GXT_DONE;
  const ink = pick ? GXT_INK.pick : GXT_INK.done;
  const core = pick ? GXT_INK.corePick : GXT_INK.coreDone;
  const tilt = (hash(seed) - 0.5) * 1.7;           // 기울기 — 종마다 안 겹치게
  const ca = Math.cos(tilt), sa = Math.sin(tilt);
  const L = (dx, dy) => [x + dx * ca - dy * sa, y + dx * sa + dy * ca];

  // 헤일로 — 어느 종이든 깔린다. 은하가 「빛 덩어리」로 먼저 읽히는 이유.
  utRamp(c, x, y, r * 1.75, r * 1.75, 0, ink, pick ? 0.19 : 0.11);

  const CORE = (rr, a) => {
    utRamp(c, x, y, rr * 1.7, rr * 1.7, 0, core, 0.30 * a);
    utStamp(c, "kenney_star", x, y, rr * 3.2, rr * 3.2, 0, core, 0.16 * a);
  };
  const DISK = (w, a0, a1) => {
    utStamp(c, "kenney_smoke", x, y, r * w, r * w * 0.42, tilt, ink, a0 * dim);
    utStamp(c, "streakCloud", x, y, r * (w - 0.10), r * (w - 0.10) * 0.40,
      tilt + 1.6, ink, a1 * dim);
  };
  const ARM = (a0, turn, off) => {
    const b = Math.log(3.2) / (turn * TAU);
    const c0 = Math.cos(a0), s0 = Math.sin(a0);
    const pt = (th) => {
      const rad = r * 0.24 * Math.exp(b * th);
      const px = Math.cos(th) * rad, py = Math.sin(th) * rad * 0.42;
      return L(off * c0 + px * c0 - py * s0, off * s0 + px * s0 + py * c0);
    };
    const path = [];
    for (let i = 0; i <= 40; i++) path.push(pt(i / 40 * turn * TAU));
    // ⚠️ 한 겹 굵은 선은 **플라스틱 띠**가 된다(실측: 가산이라 안쪽이 흰색으로
    //   몰리고 테가 칼 같았다). 넓고 옅은 어깨 + 얇고 밝은 심 두 겹이라야
    //   팔이 원반에서 솟은 것으로 읽힌다.
    const w = r * 0.11;
    utStroke(c, path, w * 2.4, ink, 0.10 * dim);
    utStroke(c, path, w, ink, 0.26 * dim);
    for (let i = 2; i <= 10; i++) {
      const tt = i / 10, q = pt(tt * turn * TAU);
      utStamp(c, "kenney_smoke", q[0], q[1], w * (1.5 + 0.6 * tt),
        w * (1.5 + 0.6 * tt), tilt, ink, 0.10 * dim);
      if (tt > 0.6) utStamp(c, "kenney_star", q[0], q[1], w * 2.6, w * 2.6, 0, core, 0.13 * dim);
    }
  };

  if (k[0] === "E") {                              // 타원 — 납작함이 곧 이름
    const sq = 1 - (+k[1]) * 0.098;
    // 늙은 별무리는 **매끈한 것이 먼저**다 — 알갱이만 얹으면 실루엣이
    // 구름처럼 울퉁불퉁해져 타원으로 안 읽힌다.
    utRamp(c, x, y, r * 1.25, r * 1.25 * sq, tilt, ink, 0.30 * dim);
    utStamp(c, "kenney_smoke", x, y, r * 1.45, r * 1.45 * sq, tilt, ink, 0.30 * dim);
    utStamp(c, "grainCloud", x, y, r * 1.30, r * 1.30 * sq, tilt + 2.1, ink, 0.26 * dim);
    utStamp(c, "kenney_smoke", x, y, r * 0.62, r * 0.62 * sq, tilt, core, 0.30 * dim);
    CORE(r * 0.22, 0.90 * dim);
  } else if (k === "S0") {                         // 렌즈 — 원반은 있고 팔이 없다
    utRamp(c, x, y, r * 1.50, r * 1.50 * 0.26, tilt, ink, 0.34 * dim);
    utStamp(c, "kenney_circle", x, y, r * 1.50, r * 1.50 * 0.30, tilt, ink, 0.10 * dim);
    utStamp(c, "streakCloud", x, y, r * 1.24, r * 1.24 * 0.22, tilt, ink, 0.14 * dim);
    utRamp(c, x, y, r * 0.58, r * 0.44, tilt, ink, 0.34 * dim);
    CORE(r * 0.26, dim);
  } else if (k[0] === "S" && k[1] === "B") {       // 막대나선 — 팔이 막대 끝에서
    const t = { a: 2.05, b: 1.5, c: 1.05 }[k[2]], bar = r * 0.52;
    DISK(1.35, 0.15, 0.12);
    utRamp(c, x, y, bar * 1.05, r * 0.15, tilt, ink, 0.40 * dim);
    ARM(0, t, bar); ARM(Math.PI, t, bar);
    CORE(r * 0.18, 0.90 * dim);
  } else if (k[0] === "S") {                       // 나선 — 핵이 작아지고 팔이 풀린다
    const t = { a: 2.2, b: 1.55, c: 1.05 }[k[1]];
    const cr = { a: 0.52, b: 0.38, c: 0.24 }[k[1]];
    DISK(1.40, 0.12, 0.11);
    ARM(0, t, 0); ARM(Math.PI, t, 0);
    utRamp(c, x, y, r * cr * 1.25, r * cr * 0.85, tilt, ink, 0.22 * dim);
    CORE(r * cr * 0.50, dim);
  } else if (k === "Irr") {                        // 불규칙 — 중심이 없다
    for (let i = 0; i < 7; i++) {
      const a = hash(seed + i * 2.7) * TAU;
      const d = r * (0.22 + 0.78 * hash(seed + i * 5.3));
      const rr = r * (0.17 + 0.22 * hash(seed + i * 9.1));
      const p = L(Math.cos(a) * d, Math.sin(a) * d * 0.7);
      utStamp(c, "kenney_smoke", p[0], p[1], rr * 1.2, rr * 0.92,
        tilt + hash(seed + i * 1.3) * TAU, ink, 0.20 * dim);
      utStamp(c, "kenney_star", p[0], p[1], rr * 0.8, rr * 0.8, 0, core, 0.14 * dim);
    }
  } else {                                         // Pec — 둘이 서로 끌고 있다
    const clump = (dx, dy, rx, ry, glint, a) => {
      const p = L(dx, dy);
      utStamp(c, "kenney_smoke", p[0], p[1], rx, ry, tilt, ink, 0.20 * a * dim);
      utStamp(c, "kenney_star", p[0], p[1], glint, glint, 0, core, 0.30 * a * dim);
    };
    clump(-r * 0.42, 0, r * 0.50, r * 0.46, r * 1.05, 1);
    clump(r * 0.66, r * 0.22, r * 0.30, r * 0.26, r * 0.62, 0.85);
    const tail = [];
    for (let i = 0; i <= 14; i++) {
      const tt = i / 14;
      tail.push(L(-r * 0.42 + tt * r * 1.77,
        -r * 0.34 * Math.sin(tt * Math.PI * 0.9) + tt * tt * r * 1.02));
    }
    utStroke(c, tail, r * 0.09, ink, 0.34 * dim);
  }
}

/// 별밭 — 먼지 1픽셀 + 십자 빛 몇 톨. 엔진의 `WatchMapPainter._starfield` 짝.
///
/// ⚠️ 먼지는 **1픽셀 사각**이다 — 텍스처 쿼드로 바꾸면 한 톨이 흐려져 별이
///   아니라 티끌이 된다. 텍스처가 값을 하는 자리는 십자 빛 쪽이다.
function gxtStars(c, W, H, dust, glint) {
  for (let i = 0; i < dust; i++) {
    c.fillStyle = A("#C6C8D6", 0.08 + 0.20 * hash(i * 5.1));
    c.fillRect(hash(i * 1.7) * W, hash(i * 3.3 + 9) * H, 1, 1);
  }
  for (let i = 0; i < glint; i++) {
    const rr = 3.4 + 2.2 * hash(i * 4.9 + 7);
    utStamp(c, "kenney_star", hash(i * 7.3 + 2) * W, hash(i * 11.1 + 5) * H,
      rr, rr, 0, "#C6C8D6", 0.30);
  }
}

// ══════════════════════════════════════════════════════════════════════════
// 마운트 — `mockup-map.html` 의 「관측소 은하」 절.
//
// ⚠️ 여기는 **지도 층만** 그린다(엔진의 `WatchMapPainter` 가 그리는 것). 레일·
//   창틀 같은 껍질의 정본은 `mockup-chapter.html` 의 1뎁스 절이라, 베끼면
//   그 둘이 언젠가 갈라진다.
// ══════════════════════════════════════════════════════════════════════════

/// 관측소가 고르는 다섯 — 자리·종·반경은 `vfx.js` 의 `WGALAXY` 를 그대로 읽는다.
/// **표를 여기 베끼지 않는다** — 두 벌이 되는 순간 갈린다.
const GXT_ST = [2, 2, 1, 0, 0];
const GXT_NM = ["1장 · 스며드는 어둠", "2장 · 갈라지는 어둠", "3장 · 덮쳐오는 어둠",
  "4장 잠김", "5장 잠김"];

function gxtCard(host, cap, W, H, fn) {
  if (!host) return;
  const d = document.createElement("div");
  d.className = "tile";
  const cv = document.createElement("canvas");
  cv.style.cssText = "width:100%;height:auto;display:block;background:#100810;"
    + "aspect-ratio:" + W + "/" + H;
  d.appendChild(cv);
  d.insertAdjacentHTML("beforeend",
    `<div class="cap" style="padding:6px 8px 7px;border-top:1px solid #26262F;`
    + `font-size:10px;color:#9494A2;line-height:1.4">${cap}</div>`);
  host.appendChild(d);
  mk(cv, [W, H], fn, { clear: true });
}

/// 이름표 — 캔버스가 아니라 글자다(엔진도 위젯으로 얹는다). 여기서는 한 장으로
/// 견주는 것이 목적이라 캔버스에 같이 그린다.
function gxtLabel(c, i, x, y, r) {
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  const ty = y - r - 12;
  if (GXT_ST[i] === 1) {
    c.fillStyle = "#8B8B99"; c.font = "9px -apple-system,sans-serif";
    c.fillText("착륙 예정 지점", x, ty - 13);
    c.fillStyle = "#E8E8F0"; c.font = "600 13px -apple-system,sans-serif";
  } else {
    c.fillStyle = GXT_ST[i] === 0 ? "#4A4A58" : "#8B8B99";
    c.font = "11px -apple-system,sans-serif";
  }
  c.fillText(GXT_NM[i], x, ty);
}

/// 지도 한 장. [draw] 가 `gxDraw`(옛) 또는 `gxTexDraw`(새)다.
function gxtMap(draw, glint) {
  return function gxtMapDraw(c, t, dt, W, H) {
    gxtStars(c, W, H, 190, glint ? 11 : 0);
    WGALAXY.forEach((p, i) => draw(c, p.x * W, p.y * H, p.r, p.k, GXT_ST[i], i * 13.7 + 3));
    WGALAXY.forEach((p, i) => gxtLabel(c, i, p.x * W, p.y * H, p.r));
  };
}

gxtCard($("gxt-new"), "<b style='color:#EDEDF2'>새 판</b> — 텍스처를 얹은 지도. "
  + "엔진(<code>lib/ui/watch_map.dart</code>)이 그리는 것과 한 벌이다.",
  763, 371, gxtMap(gxTexDraw, true));
gxtCard($("gxt-old"), "<b style='color:#8B8B99'>옛 판</b> — 램프와 선만. "
  + "<code>vfx.js</code> 의 <code>gxDraw</code> 그대로다(안 고쳤다).",
  763, 371, gxtMap(gxDraw, false));

/// 여섯 종 한 줄 — **형태 자체가 이름**이라는 것이 보여야 한다.
const GXT_KINDS = [["E3", 20], ["S0", 22], ["Sb", 31], ["SBc", 24], ["Irr", 21], ["Pec", 24]];
function gxtKinds(draw) {
  return function gxtKindsDraw(c, t, dt, W, H) {
    gxtStars(c, W, H, 90, draw === gxTexDraw ? 5 : 0);
    const step = W / GXT_KINDS.length;
    GXT_KINDS.forEach(([k, r], i) => {
      const x = step * (i + 0.5);
      draw(c, x, H * 0.45, r, k, i === 2 ? 1 : 2, i * 13.7 + 3);
      c.textAlign = "center"; c.fillStyle = "#6E6E7C";
      c.font = "10px -apple-system,sans-serif";
      c.fillText(k, x, H - 10);
    });
  };
}
gxtCard($("gxt-kinds-new"), "<b style='color:#EDEDF2'>새 판</b> — 여섯 종. "
  + "가운데(Sb)만 고른 것이라 금빛이다.", 788, 190, gxtKinds(gxTexDraw));
gxtCard($("gxt-kinds-old"), "<b style='color:#8B8B99'>옛 판</b> — 같은 여섯 종.",
  788, 190, gxtKinds(gxDraw));
