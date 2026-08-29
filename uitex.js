// ══════════════════════════════════════════════════════════════════════════
// uitex.js — **UI 텍스처 경로(시안 쪽).** `lib/ui/ui_tex.dart` 와 한 벌이다.
//
// `vfx.js` 뒤에 실린다(`A`·`hash` 를 읽는다). 최상위 이름은 `UT`/`ut` 로 격리.
//
// ── 두 판이 같아야 하는 것 세 가지 ────────────────────────────────────────
// ① **굽기** — mask_*·noise_* 는 알파가 통짜 불투명이라(결이 RGB 에 있다)
//    휘도를 알파로 편다. 그 뒤 알파 정규화 `a' = 255·a/max(a)`.
//    안 하면 텍스처마다 밝기가 제각각이다(실측: kenney_flame ×1.20 ·
//    kenney_smoke ×1.28 · mask_glow_soft ×1.59).
//    ⇒ 엔진 쪽 정본은 `lib/render/atlas/fx_tex_prep.dart`.
// ② **색 입히기** — 흰 스프라이트 × 단색 = modulate. 굽는 단계에서 미리
//    곱해 둔다(`source-in` 은 **여기서만** 쓴다 — 화면 합성에는 안 쓴다).
// ③ **화면 합성은 전부 가산**(`lighter`). 두 가지가 여기서 같이 풀린다:
//    · 텍스처가 그림을 **어둡게 못 만든다** — 성긴 알파를 「덮개」로 쓰면
//      텍스처가 옅은 만큼 통째로 어두워지는데, 더하기는 그 사고가 안 난다.
//      밝기는 **색**으로 정하고 결은 **알파**에 남긴다.
//    · **순서가 결과를 안 바꾼다** — 더하기는 교환법칙이 성립한다. 엔진이
//      쿼드를 모았다 `drawAtlas` 한 번으로 내는 근거가 그것이다.
//
// ⚠️ 이 파일은 `mockup-texture.html` 의 텍스처 파이프라인과 **다른 물건**이다.
//   저쪽은 판 안의 FX 용(거울 타일 · 블렌드 되섞기 · 96MB 색칠본 캐시)이고,
//   여기는 **UI 화면용**이라 색이 서넛뿐이고 정지 그림이다. 겹치는 것은 굽기 ①
//   하나인데, 그 정본은 애초에 엔진(`fx_tex_prep.dart`)이라 두 벌이 아니다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

/// 텍스처 한 장의 한 변 — 열여덟 장이 전부 128² 다.
const UT_SIZE = 128;

/// 굽는 표. `luma` 는 「알파가 통짜라 휘도에서 알파를 뽑아야 한다」는 뜻이고,
/// 그 판정은 엔진의 `kFxTextureSprites` 의 `useSourceAlpha` 와 같은 것이다.
const UT_MANIFEST = [
  { k: "kenney_circle" }, { k: "kenney_fire" }, { k: "kenney_flame" },
  { k: "kenney_light" }, { k: "kenney_magic" }, { k: "kenney_smoke" },
  { k: "kenney_spark" }, { k: "kenney_star" }, { k: "kenney_twirl" },
  { k: "mask_beam_vertical", luma: 1 }, { k: "mask_crystal_flower", luma: 1 },
  { k: "mask_crystal_mandala", luma: 1 }, { k: "mask_glow_soft", luma: 1 },
  { k: "mask_ring_double", luma: 1 },
  { k: "noise_grainy", luma: 1 }, { k: "noise_spokes", luma: 1 },
  { k: "noise_streak", luma: 1 }, { k: "noise_vein", luma: 1 },
];

/// 파생 텍스처 — **결(네모난 노이즈) × 모양(둥근 구름)**.
///
/// ⭐ 노이즈 넉 장은 판을 꽉 채운 **네모**라 그대로 찍으면 네모 테두리가 보인다.
///   화면에서 오려내려면 층을 새로 떠야 하므로 **굽는 단계에서 한 장으로 만든다.**
const UT_BLEND = {
  grainCloud: ["noise_grainy", "kenney_smoke"],
  streakCloud: ["noise_streak", "kenney_smoke"],
};

const UT = { ready: false, tex: {} };

function utCanvas(w, h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h; return c;
}

/// 휘도→알파(필요하면) + 알파 정규화 + 흰색으로 밀기.
function utBake(img, luma) {
  const c = utCanvas(UT_SIZE, UT_SIZE);
  const g = c.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0, UT_SIZE, UT_SIZE);
  const id = g.getImageData(0, 0, UT_SIZE, UT_SIZE), d = id.data;
  let maxA = 0;
  for (let i = 0; i < d.length; i += 4) {
    const a = luma ? (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) : d[i + 3];
    d[i] = 255; d[i + 1] = 255; d[i + 2] = 255; d[i + 3] = a;
    if (a > maxA) maxA = a;
  }
  if (maxA > 0 && maxA < 255) {
    const gain = 255 / maxA;
    for (let i = 3; i < d.length; i += 4) d[i] = Math.min(255, Math.round(d[i] * gain));
  }
  g.putImageData(id, 0, 0);
  return c;
}

/// 두 장의 알파를 곱해 한 장으로. `destination-in` 이 엔진의 `BlendMode.dstIn`.
function utMultiply(base, mask) {
  const c = utCanvas(UT_SIZE, UT_SIZE), g = c.getContext("2d");
  g.drawImage(base, 0, 0);
  g.globalCompositeOperation = "destination-in";
  g.drawImage(mask, 0, 0);
  return c;
}

/// 색칠본 — 흰 스프라이트 × 단색. 색이 서넛뿐이라 캐시가 안 자란다.
function utTint(key, hex) {
  const t = UT.tex[key];
  if (!t) return null;
  let c = t.tint[hex];
  if (c) return c;
  c = utCanvas(UT_SIZE, UT_SIZE);
  const g = c.getContext("2d");
  g.drawImage(t.base, 0, 0);
  g.globalCompositeOperation = "source-in";   // ⚠️ 굽는 단계 전용.
  g.fillStyle = hex;
  g.fillRect(0, 0, UT_SIZE, UT_SIZE);
  t.tint[hex] = c;
  return c;
}

/// ⚠️⚠️ **`file://` 로 열면 굽기가 막힌다.** 굽는 단계가 `getImageData` 를 쓰는데
///   `file://` 에서 읽은 그림은 캔버스를 오염시켜 그 호출이 SecurityError 로 터진다.
///   ⇒ 그때는 **텍스처를 통째로 끈다**(`UT.ready` 가 false 로 남는다). [utStamp] 이
///   무동작이 되어 램프·선만 남은 그림이 나오고, 페이지의 나머지는 멀쩡하다 —
///   엔진의 「아직 안 데워진 첫 프레임」과 **같은 갈래**다.
///   서버로 열면(`python3 -m http.server`) 정상이다.
function utLoad() {
  if (UT.pending) return UT.pending;
  UT.pending = Promise.all(UT_MANIFEST.map(m => new Promise((res) => {
    const img = new Image();
    img.onload = () => {
      try { UT.tex[m.k] = { base: utBake(img, m.luma), tint: {} }; }
      catch (e) { UT.blocked = String(e); }
      res();
    };
    img.onerror = () => { UT.blocked = "load failed: " + m.k; res(); };
    img.src = "fx/" + m.k + ".png";
  }))).then(() => {
    if (UT.blocked) { console.warn("uitex: 텍스처를 껐다 —", UT.blocked); return; }
    for (const k in UT_BLEND) {
      const [a, b] = UT_BLEND[k];
      UT.tex[k] = { base: utMultiply(UT.tex[a].base, UT.tex[b].base), tint: {} };
    }
    UT.ready = true;
  });
  return UT.pending;
}
utLoad();

/// 텍스처 쿼드 하나 — **가산.** [rx]·[ry] 는 반지름(픽셀), [rot] 은 라디안.
///
/// ⚠️ 엔진 쪽 [TexPen] 은 균일 배율을 모았다 `drawAtlas` 한 번으로 내는데,
///   캔버스 2D 에는 그 묶음이 없어 여기는 늘 그 자리에서 낸다. **그림은
///   같다** — 전부 가산이라 순서가 결과를 안 바꾸기 때문이다.
function utStamp(c, key, x, y, rx, ry, rot, hex, alpha) {
  if (!UT.ready || alpha <= 0) return;
  const t = utTint(key, hex);
  if (!t) return;
  c.save();
  c.globalCompositeOperation = "lighter";
  c.globalAlpha = alpha;
  c.translate(x, y);
  if (rot) c.rotate(rot);
  c.scale(rx / (UT_SIZE / 2), ry / (UT_SIZE / 2));
  c.drawImage(t, -UT_SIZE / 2, -UT_SIZE / 2);
  c.restore();
}

/// 방사 램프의 꼬리 — `(1-d)^2.6` 을 정지점 여섯으로 근사한다. 텍스처가 못 내는
/// **완전히 매끈한 면**이 필요한 자리(핵 · 팽대부 · 헤일로)가 이것을 쓴다.
///
/// ⚠️⚠️ **정지점을 셋으로 두면 원의 테가 눈에 잡힌다** — 마지막 구간이 직선이라
///   거기서 기울기가 꺾이고, 눈이 그 꺾임을 테두리로 읽는다.
function utFalloff(c, x, y, r, hex, alpha) {
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  const S = [[0, 1], [0.2, 0.53], [0.4, 0.27], [0.6, 0.11], [0.8, 0.028], [1, 0]];
  for (const [p, v] of S) g.addColorStop(p, A(hex, alpha * v));
  return g;
}

/// 눌린 매끈한 면 하나 — 가산.
function utRamp(c, x, y, rx, ry, rot, hex, alpha) {
  c.save();
  c.globalCompositeOperation = "lighter";
  c.translate(x, y);
  if (rot) c.rotate(rot);
  c.scale(1, ry / rx);
  c.fillStyle = utFalloff(c, 0, 0, rx, hex, alpha);
  c.beginPath(); c.arc(0, 0, rx, 0, TAU); c.fill();
  c.restore();
}

/// 가산 획 하나 — 팔·꼬리가 쓴다.
function utStroke(c, path, w, hex, alpha) {
  c.save();
  c.globalCompositeOperation = "lighter";
  c.strokeStyle = A(hex, alpha);
  c.lineWidth = w; c.lineCap = "round"; c.lineJoin = "round";
  c.beginPath();
  path.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
  c.stroke();
  c.restore();
}
