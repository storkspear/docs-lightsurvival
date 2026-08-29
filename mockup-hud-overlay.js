// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-overlay.js — 화면 「덮는 화면 넷」(결과 · 일시정지 · 설정 · 클리어)
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `OV`/`ov` 로 격리한다.
//
// ── 이 장이 답하는 질문 ──────────────────────────────────────────────────
// 「판을 **덮는** 화면 넷이 로비 여덟 장 · 판 안 HUD 와 **한 식구**로 보이려면
//  어떻게 생겨야 하나.」 사용자 판정(2026-08-28): 「게임 종료 시 뜨는 화면인데,
//  설정이나 게임 종료 클리어 일시정지 뭐 이런 거 될 때 뜨는 화면들 있잖아?
//  **게임 무드에 맞게 버튼이라든가 재디자인** 해야 될 거 같은데」.
//
// ⚠️⚠️ **넷은 두 무리다.** 결과 · 클리어는 판이 **이미 꺼진 뒤**이고
//   (`ui/screens.dart` 가 `ColoredBox` 하나로 세계를 지운다), 일시정지 · 설정은
//   판이 **뒤에 살아 있다**(`ui/pause_overlay.dart` 의 어둠막 0xD9). 그래서
//   바탕이 갈린다 — 앞 둘은 화면 자체가 계기판이 되고(격자 · 창틀 전부),
//   뒤 둘은 어둠막 위에 **필요한 것만** 얹는다. 뒤에 있는 판을 더 가리면
//   「무엇이 오고 있었나」를 그만큼 못 본다.
//
// ⚠️⚠️ **「지금」을 여기 다시 안 그린다.** 세 화면의 그림은 `mockup-ui.html` 의
//   「일시정지 · 설정 · 결과」 세 절이 정본이고, 사본을 두면 그 셋과 갈라진다
//   (이 저장소가 같은 병을 여러 번 앓았다). ⇒ 이 장이 「지금」에 대해 하는 일은
//   **재는 것**뿐이다 — 수는 전부 `lib/ui` 의 심볼에서 옮겨 적었고 출처를
//   [OVNOW] 옆에 달았다.
//
// ── 부품을 새로 안 짓는다 ────────────────────────────────────────────────
// 각진 판 · 단추 · 칸 · 띠 · 줄은 전부 `hud.js` 의 CSS 클래스를 그대로 입는다:
//   `.hudpanel`(판) · `.hudbtn`(단추 · `.sel` 이 금빛) · `.hudcell`(칸) ·
//   `.hudstrip`(띠) · `.hudrow`(줄) · `.hudside`(옆창) · `.hudchip`(칩).
// 캔버스 쪽도 마찬가지다 — 창틀은 [hudChrome], 브래킷은 [hudBracket], 귀퉁이
// 판독값은 [hudCornerBar], 별밭은 [hudStars] 다. 이 파일이 **새로 그리는 것은
// 문양 셋뿐**이다(별 · 나가는 획 둘 · 판정 배지) — 부품이 아니라 그림이다.
//
// ── 값은 한 줄도 새로 안 짓는다 ─────────────────────────────────────────
// 난이도 이름은 `sim/progression/tier.dart` 의 `RunTier.label`, 설정 여섯의
// 이름과 잔글은 `ui/settings_screen.dart` 의 `_rows`, 계단 값은
// `render/world_fold.dart` 의 `kFoldSquashSteps`·`kFoldDepthSteps`,
// 색은 `game/hud_layout.dart` 의 `kLineArgb` 줄 그대로다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 색 — **한 벌뿐이다.** 새 색을 안 들인다 ──────────────────────────────
// ⚠️⚠️ 결과 화면만 딴 게임으로 보이던 까닭이 정확히 여기다. 지금 그 화면은
//   회백(#EEE4D8 계열) · 금빛 · 분홍(#C97487) **세 계보**에서 색을 뽑는데,
//   로비 여덟 장과 판 안 HUD 는 냉광 한 계보에 금빛 하나를 얹는다.
//   ⇒ 이 장의 색은 전부 아래 여덟 개 안에서만 나온다. 아래 목록이 곧
//     「재는 표」의 색 칸이라, 여기 한 줄을 더하면 표가 그만큼 는다.
//   글 · 선 여섯 — 냉광 · 하이라이트 · 금빛 · 본문 · 보조 · 붉은.
//   바탕 둘   — 판 #050B14 · 빈 자리 #02060C.
//   면의 계조 — `hud.js` 의 `.hudbtn`/`.hudpanel` 이 제 면에 쓰는 것 그대로.
// ⚠️ **색 가짓수를 손으로 안 센다.** ⑧절이 그려진 것에서 그대로 재고, 「SF HUD
//   밖의 색」은 [OVKIT] 과 견준다 — 여기에 색을 하나 들이면 표가 그날 그것을
//   잡는다(손으로 세면 안 잡힌다).
const OVLINE = HUDLINE;                // #4FC3F7 구조선 (= 엔진 `kLineArgb`)
const OVGLOW = HUDGLOW;                // #E8F8FF 하이라이트 (= `kGlowArgb`)
const OVINK = HUDINK;                  // #D8F2FF 본문
const OVDIM = HUDDIM;                  // #6E93AD 보조
const OVBAD = "#FF2D55";               // 붉은 (= `kHurtArgb`)

/// SF HUD 여덟 장이 쓰는 색 전부 — **표의 「밖」 칸이 이 집합을 본다.**
///
/// ⚠️⚠️ **손으로 안 적는다.** `hud.js` 의 CSS 문자열([HUDCSS])에서 여섯 자리
///   16진수를 통째로 긁고 그 파일의 팔레트 상수를 얹는다 — 키트가 자라면 이
///   집합도 그날 같이 자란다.
/// ⚠️ 판 안 HUD 장(`mockup-hud-ingame.js`)은 이 페이지가 안 싣는다. 그 장이 제
///   머리말에 못 박은 여섯(`IGINK`·`IGDIM`·`IGBACK`·`IGPAD`·`IGHP`·`IGHURT`)만
///   여기 옮겨 적는다 — 그 장이 값을 바꾸면 이 줄도 같이 고쳐야 한다.
const OVKIT = (() => {
  const s = new Set();
  const add = (h) => { if (h && h.charAt(0) === "#") s.add(h.slice(1, 7).toUpperCase()); };
  [HUDINK, HUDDIM, HUDFAINT, HUDBASE, HUDLINE, HUDGLOW, HUDSEL, HUDACC, HUDWARN].forEach(add);
  if (typeof HUDCSS === "string") (HUDCSS.match(/#[0-9A-Fa-f]{6}/g) || []).forEach(add);
  ["#EAF7FF", "#8FB7CE", "#02060C", "#040A12", "#FFEFD9", "#FF2D55"].forEach(add);
  return s;
})();

// ── 글꼴 — 엔진이 싣는 두 벌 그대로 ───────────────────────────────────────
// ⚠️ 숫자는 `Chakra Petch`, 한글은 `Pretendard` 다(`ui/app.dart` 의
//   `kUiFontFamily`/`kUiFontFallback`). 이 장의 글자는 **전부 DOM** 이라 그
//   지정은 HTML 의 `.ov-ui`/`.ov-num` 두 규칙이 든다 — 캔버스가 그리는 것은
//   문양뿐이라 글꼴 문자열이 필요한 자리가 없다.

// ══════════════════════════════════════════════════════════════════════════
// ① 판의 한순간 — 여덟 안이 **같은 두 벌**을 그린다
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 안마다 다른 값을 그리면 「어느 안이 잘 읽히나」가 아니라 「어느 값이 읽기
//   쉽나」를 비교하게 된다. 값은 두 벌뿐이다 — 진 판과 이긴 판.
// ⚠️ 난수가 없다. 시계도 안 흐른다 — 갈무리마다 수가 달라지면 견줄 수가 없다.

/// 진 판 — 결과 · 일시정지가 같은 판을 본다.
///
/// ⚠️⚠️ **암흑물질이 두 자리에서 다른 수다.** 일시정지는 판 **안**이라
///   `run.matterPicked` 를 날것으로 보이고(199), 결과는 판이 끝난 뒤라
///   난이도 배수를 곱한 지갑 값을 보인다(199 × 1.6 = 318,
///   `ui/screens.dart` 의 `matter` 와 `RunTier.rewardMul`). 둘을 같은 수로
///   그리면 시안이 엔진을 거짓말하게 만든다.
const OVSNAP = {
  stage: 3,
  tier: "어려움",                      // `RunTier.hard.label`
  cleared: false,
  verdict: "빛이 잦아들었다",           // `ui/screens.dart` — 죽음
  badge: "죽음",
  stars: 0,
  time: 512,                           // 8:32
  kills: 642,
  level: 17,
  rewardMul: 1.6,                      // `RunTier.hard.rewardMul`
  matterRaw: 199,                      // 판 안에서 보이는 수
  matter: 318,                         // 지갑에 들어간 수 = round(199 × 1.6)
  lumen: 2,
  // 강화석 여섯 — `pools/matter.dart` 의 `StoneKind` 차례
  // (일반 · 공격 · 치명 · 생존 · 중력 · 유니크). 0 인 종은 안 적는다.
  stones: [12, 4, 0, 7, 0, 1],
  unlock: null,
};

/// 이긴 판 — 클리어. **뼈대는 결과와 같다.**
///
/// ⚠️ 생존이 19:47 인 것은 보스가 19:00 에 오기 때문이다(`stages.dart` 의
///   `bossAtSec` 1140 · `durationSec` 1200). 클리어는 그 보스를 잡은 것이라
///   시각이 저절로 19분대다 — 12:00 같은 수를 적으면 판을 모르는 그림이 된다.
const OVWIN = {
  stage: 3,
  tier: "어려움",
  cleared: true,
  verdict: "어둠을 건넜다",
  badge: "돌파",
  stars: 3,
  time: 1187,                          // 19:47
  kills: 1204,
  level: 23,
  rewardMul: 1.6,
  matterRaw: 512,
  matter: 819,                         // = round(512 × 1.6)
  lumen: 12,
  stones: [18, 6, 1, 9, 0, 2],
  unlock: "유도탄",
};

/// 설정 여섯 — **`ui/settings_screen.dart` 의 `_rows` 그대로다.**
/// 이름도 잔글도 새로 안 짓는다. 잔글이 엔진과 어긋나면 그 글은 설명이 아니라
/// 거짓말이 된다(그 파일 머리말이 못 박아 둔 규약).
///
/// kind: "sw" 켜고 끄는 것 · "step" 계단을 도는 것.
/// `steps` 는 `render/world_fold.dart` 의 순회 값 그대로다 —
///   눕힘 `[1.00, 0.50, 0.85, 0.75, 0.62]` · 깊이 `[0, 0.20, 0.10, 0.15]`.
/// ⚠️ 계단이 **크기순이 아니다.** 첫 칸이 「끔」, 둘째 칸이 채택값이라 그 둘을
///   한 번 눌러 왕복한다(그 파일의 실기 판정). 시안이 순서를 고치면 안 된다.
const OVSET = [
  { nm: "데미지 숫자", kind: "sw", on: true,
    ht: "맞은 적의 머리 위로 깎인 체력이 떠오릅니다. 수백 마리 구간에서는 화면을 덮습니다." },
  { nm: "적 체력 바", kind: "sw", on: false,
    ht: "다친 적의 머리 위에 남은 체력이 띠로 붙습니다. 성한 적에게는 안 붙습니다." },
  { nm: "세계 눕힘", kind: "step", at: 1, steps: ["1.00", "0.50", "0.85", "0.75", "0.62"], pick: 1,
    ht: "화면 세로를 눌러 세계가 기울어 보입니다. 판정 반경은 그대로고 자리만 바뀝니다." },
  { nm: "깊이 크기", kind: "step", at: 1, steps: ["0%", "20%", "10%", "15%"], pick: 1,
    ht: "아래쪽 가까운 것이 크고 위쪽 먼 것이 작습니다. 서 있는 자리는 안 움직입니다." },
  { nm: "몸 세우기", kind: "sw", on: true,
    ht: "누운 세계에서 몸만 동그랗게 서고 발밑에 그림자가 깔립니다. 끄면 같이 눕습니다." },
  { nm: "위아래 속도 보정", kind: "sw", on: false,
    ht: "자신의 위아래 이동만 빨라집니다. 적은 안 빨라져서 여섯 중 이것만 판을 바꿉니다." },
];

// ── 수 꼴 ────────────────────────────────────────────────────────────────
// ⚠️ `toLocaleString` 을 안 쓴다 — 보는 사람의 지역에 따라 자리표가 갈려
//   갈무리가 달라진다. 이 장은 그림이 늘 같아야 한다.
function ovGroup(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function ovClock(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return m + ":" + String(s).padStart(2, "0");
}

// ══════════════════════════════════════════════════════════════════════════
// ② 바탕 — **판이 뒤에 있나, 꺼졌나**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ **탭이 숨으면 안 그린다.** `mk()` 가 도는 `vfx.js` 의 프레임 루프에도
//   같은 가드가 있지만(한 군데서 통째로 끈다), 이 장의 바탕은 화면을 통째로
//   덮는 겹이라 여기서도 한 번 더 막는다 — 두 겹이라고 손해 볼 것이 없다.
function ovHidden() {
  return typeof document !== "undefined" && document.hidden === true;
}

/// 판이 **뒤에 살아 있는** 바탕 — 일시정지 · 설정.
///
/// ⚠️ 판의 정본은 이 장이 아니라 `mockup-hud-ingame.js` 의 `igField` 다.
///   여기 있는 것은 「뒤에 판이 있다」만 말하는 아주 옅은 겹이라, 적도 안 움직이고
///   장판도 안 자란다 — 어둠막 0xD9 아래에서 실제로 보이는 것이 그 정도다.
/// ⚠️ 난수 0건. 자리는 전부 [hash] 에서 뽑고 되풀이는 사인 하나뿐이다.
function ovLiveField(c, W, H, t, seed) {
  c.fillStyle = "#05050B"; c.fillRect(0, 0, W, H);
  // 장판 둘 — 밝은 자리를 **글자 밑에 일부러 둔다.** 어두운 데만 깔면
  // 대비 판정이 거짓말이 된다(판 안 HUD 장이 세운 규약).
  // ⚠️ 톤 이름은 `vfx.js` 의 [TONE] 에 **실재하는 것**이라야 한다 — [toneOf] 는
  //   모르는 이름을 `gold` 로 조용히 접는다(첫 판이 「flame」을 써서 불장판이
  //   회백으로 나왔다). 여기 둘은 `ember`(불) · `frost`(냉기)다.
  gHalo(c, W * 0.28, H * 0.38, W * 0.16, "ember", 0.34);
  gHalo(c, W * 0.72, H * 0.62, W * 0.13, "frost", 0.26);
  // 적 열둘 — 자리는 정지, 밝기만 아주 느리게 숨 쉰다.
  for (let i = 0; i < 12; i++) {
    const x = hash(seed + i * 3.7 + 11) * W;
    const y = hash(seed + i * 5.1 + 23) * H;
    const r = 5 + hash(seed + i * 2.3 + 31) * 7;
    const a = 0.22 + 0.10 * Math.sin(t * 0.6 + i);
    c.fillStyle = A("#C8B0FF", a);
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
  // 어둠막 — 엔진의 0xD9(85%) 그대로. **이것이 이 바탕의 요점이다**:
  // 판을 떠날지 묻는 자리라 세계에서 눈을 뗀다(`pause_overlay.dart` 머리말).
  c.fillStyle = A("#050B14", 0.85); c.fillRect(0, 0, W, H);
}

/// 판이 **꺼진 뒤**의 바탕 — 결과 · 클리어.
///
/// ⭐ 여기는 화면 자체가 계기판이 된다. 엔진이 이미 세계를 지우고 있으므로
///   ([ResultScreen] 의 `ColoredBox`) 가릴 것이 없다 — 창틀 한 벌을 다 세운다.
function ovDeadField(c, W, H, t, seed) {
  return hudChrome(c, W, H, t, { rail: 0, top: 26, seed, stars: 40 });
}

/// 살아 있는 판 위에 세우는 **창틀 한 조각** — 브래킷과 귀퉁이 판독값만.
/// [hudChrome] 은 바탕을 통째로 칠하므로 여기서는 못 쓴다(뒤의 판이 지워진다).
function ovLiveChrome(c, W, H, t, seed) {
  const bx = 12, by = 28, bw = W - 24, bh = H - 28 - 10;
  hudBracket(c, bx, by, bw, bh, 16, { w: 1.7, alpha: 0.55 });
  hudCornerBar(c, 26, 42, 1, seed + 4, t, 0);
  hudCornerBar(c, W - 16, 42, -1, seed + 12, t, 1);
}

// ══════════════════════════════════════════════════════════════════════════
// ③ 문양 셋 — **이 파일이 새로 그리는 것은 이것뿐이다**
// ══════════════════════════════════════════════════════════════════════════

/// 별 하나 — **획으로 그린다.**
///
/// ⚠️⚠️ 지금 별은 열 꼭짓점 다각형에 금빛 두 단 계조 + 흐림 하나다
///   (`ui/screens.dart` 의 `_StarPainter`). 흐림은 이 계보에 없는 손이고
///   (냉광 HUD 는 흐림 대신 **획의 굵기**로 급을 가른다) 무엇보다 **금빛**이다.
/// ⭐⭐ **별은 금빛이 아니다.** 금빛은 「지금 누를 수 있는 단 하나」의 색이라
///   (`hud.js` 팔레트 머리말) 별 셋을 금빛으로 칠하면 결과 화면에 「누를 수
///   있는 것」이 넷이 되고, 그러면 오른아래 문이 안 눈에 띈다.
///   ⇒ 딴 별은 **하이라이트**, 못 딴 별은 **보조색 획**이다. 자리는 남는다 —
///     「셋 중 몇」이라야 세는 것이 된다(못 딴 별을 지우지 않는 그 규약).
function ovStar(c, W, lit) {
  const cx = W / 2, cy = W / 2, R = W * 0.42, r = R * 0.30;
  c.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU - Math.PI / 2;
    const rr = i % 2 === 0 ? R : r;
    const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    i ? c.lineTo(x, y) : c.moveTo(x, y);
  }
  c.closePath();
  if (lit) {
    c.fillStyle = A(OVGLOW, 0.92); c.fill();
    c.strokeStyle = A(OVLINE, 0.95); c.lineWidth = 1.2; c.stroke();
    // 딴 별에는 바깥 브래킷 넷이 붙는다 — 「채워졌다」가 획으로도 선다.
    hudBracket(c, 1.5, 1.5, W - 3, W - 3, W * 0.22, { w: 1.2, alpha: 0.72 });
  } else {
    c.strokeStyle = A(OVDIM, 0.62); c.lineWidth = 1.1; c.stroke();
  }
}

/// 나가는 획 둘 — 설정의 닫는 문. `settings_cells.dart` 의 `_XPainter` 와
/// 같은 두 획이고, 색만 이 계보로 온다.
function ovCloseX(c, W) {
  const m = W * 0.30;
  c.strokeStyle = OVINK; c.lineWidth = 1.8; c.lineCap = "round";
  c.beginPath();
  c.moveTo(m, m); c.lineTo(W - m, W - m);
  c.moveTo(W - m, m); c.lineTo(m, W - m);
  c.stroke();
  c.lineCap = "butt";
}

/// 판정 배지 — **색이 한 자리에 갇힌다.**
///
/// ⭐⭐ 지금은 판정을 **제목 글자의 색**으로 말한다(진 판이 #C97487). 그러면
///   화면의 색이 판정마다 하나씩 늘고, 그 색은 다른 어느 화면에도 없다.
///   ⇒ 제목 글자는 늘 같은 색이고, 갈리는 것은 **작은 배지 하나**다.
///     자리를 안 늘리면서 색을 한 군데에 가둔다.
function ovBadge(c, W, H, bad) {
  const col = bad ? OVBAD : OVLINE;
  hudBox(c, 0.5, 0.5, W - 1, H - 1, 5);
  c.fillStyle = A(col, 0.16); c.fill();
  c.strokeStyle = A(col, 0.85); c.lineWidth = 1; c.stroke();
  // 왼쪽 세로 획 하나 — 배지가 「칩」이 아니라 「표시」로 읽히는 자리.
  c.fillStyle = col; c.fillRect(2, 3, 2, H - 6);
}

// ══════════════════════════════════════════════════════════════════════════
// ④ 조각 — **전부 `hud.js` 의 클래스를 입는다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 여기서 새 생김새를 짓지 않는다. 이 절이 하는 일은 「어느 클래스를 어떤
//   차례로 붙이나」뿐이고, 각·테·계조는 전부 `hud.js` 의 `HUDCSS` 가 든다.

function ovEl(tag, cls, host) {
  const d = document.createElement(tag);
  if (cls) d.className = cls;
  if (host && host.appendChild) host.appendChild(d);
  return d;
}

/// 잘린 캔버스 한 칸 — 문양 자리. `mk` 가 돌리므로 탭 가드가 저절로 붙는다.
function ovCanvas(host, w, h, fn) {
  const cv = ovEl("canvas", null, host);
  cv.style.width = w + "px"; cv.style.height = h + "px";
  mk(cv, [w * 2, h * 2], function ovGlyphCell(c, t, dt, W, H) {
    if (ovHidden()) return;
    c.save(); c.scale(2, 2); fn(c, w, h, t); c.restore();
  }, { clear: true });
  return cv;
}

/// 단추 하나. `kind`: "" 곁길 · "sel" 금빛 · "ov-low" 나가는 문.
///
/// ⚠️⚠️ **`.hudbtn` 의 기본 높이는 38 이다** — 엄지 자 44 아래다(`theme.dart` 의
///   `kUiBtnLowH`). 로비 여덟 장이 그대로 쓰고 있는 값이라 이 장에서 고치지
///   않고, **이 장의 자만** 44 로 올린다(HTML 의 `.ovk .hudbtn`).
///   어긋남 자체는 이 장의 「어긋난 자리」 표에 적어 뒀다.
function ovBtn(host, label, kind) {
  const b = ovEl("div", "hudbtn ov-tap" + (kind ? " " + kind : ""), host);
  b.insertAdjacentHTML("beforeend", label);
  if (kind === "sel") b.dataset.ovGold = "1";
  return b;
}

/// 값 한 칸 — 생존 · 처치 · 레벨. `.hudcell` 을 그대로 입는다.
function ovStat(host, val, lb) {
  const d = ovEl("div", "hudcell ov-stat", host);
  d.insertAdjacentHTML("beforeend",
    `<div class="num">${val}</div><div class="lb">${lb}</div>`);
  return d;
}

/// 재화 한 알 — 문양 + 수. 문양은 `vfx.js` 의 [CURGLYPH]·[stoneGlyph] 그대로다.
function ovCoin(host, kind, val, k) {
  const one = ovEl("span", "one", host);
  ovCanvas(one, 13, 13, (c, w) => {
    if (kind === "stone") stoneGlyph(c, w, k, false);
    else CURGLYPH[kind](c, w, false);
  });
  one.insertAdjacentHTML("beforeend", `<b class="ov-num">${val}</b>`);
  return one;
}

/// 「몹이 흘린 것」 띠 — 암흑물질 · 빛의 결정.
/// ⚠️ 「+」는 지갑 잔액이 아니라 **이번 판에 번 것**이라는 표시다
///   (`ui/screens.dart` 와 `pause_overlay.dart` 가 같이 지키는 규약).
function ovEarnStrip(host, snap, raw) {
  const s = ovEl("div", "hudstrip", host);
  s.insertAdjacentHTML("beforeend", `<span class="lb">번 것</span>`);
  ovCoin(s, "matter", "+" + ovGroup(raw ? snap.matterRaw : snap.matter));
  ovCoin(s, "shard", "+" + snap.lumen);
  return s;
}

/// 「운석에서 캔 것」 띠 — 강화석 여섯 중 0 이 아닌 종만.
/// ⚠️⚠️ **줄이 갈리는 것이 뜻이다.** 위 띠는 몹이 흘린 것이고 이것은 운석에서
///   캔 것이라 쓰는 곳도 갈린다(위는 상점 · 아래는 메타 스탯). 한 줄에 섞으면
///   「다음 판에 어디를 갈까」가 사라진다.
/// ⚠️ 줄 자체는 **비어도 선다** — 「이 판에 채굴이 있기는 했나」를 화면이
///   답해야 한다(2026-08-22 사용자 판정). 0 인 **종**만 뺀다.
function ovMinedStrip(host, snap) {
  const s = ovEl("div", "hudstrip", host);
  s.insertAdjacentHTML("beforeend", `<span class="lb">캔 것</span>`);
  let n = 0;
  snap.stones.forEach((v, k) => {
    if (!v) return;
    n++;
    ovCoin(s, "stone", String(v), k);
  });
  if (!n) s.insertAdjacentHTML("beforeend", `<span class="one zero">없음</span>`);
  return s;
}

/// 판정 한 줄 — 배지 + 제목. 제목의 색은 **판정과 무관하게 늘 같다.**
function ovVerdict(host, snap) {
  const d = ovEl("div", "ov-verd", host);
  const bg = ovEl("div", "ov-badge " + (snap.cleared ? "ok" : "bad"), d);
  ovCanvas(bg, 44, 18, (c, w, h) => ovBadge(c, w, h, !snap.cleared));
  bg.insertAdjacentHTML("beforeend", `<i>${snap.badge}</i>`);
  d.insertAdjacentHTML("beforeend", `<b>${snap.verdict}</b>`);
  return d;
}

/// 별 셋 — 자리는 늘 셋이다.
function ovStars(host, snap) {
  const d = ovEl("div", "ov-stars", host);
  for (let i = 0; i < 3; i++) {
    const lit = i < snap.stars;
    ovCanvas(d, 20, 20, (c, w) => ovStar(c, w, lit));
  }
  return d;
}

/// 해금 띠 — 이긴 판이 앞으로 가는 문을 실제로 열었을 때만 선다.
/// ⚠️ 금빛을 안 쓴다 — 금빛은 오른아래 문 하나가 이미 쥐고 있다.
function ovUnlock(host, snap) {
  if (!snap.unlock) return null;
  const d = ovEl("div", "hudstrip ov-unlock", host);
  d.insertAdjacentHTML("beforeend",
    `<span class="lb">해금</span><span class="one">새 무기 · <b>${snap.unlock}</b></span>`);
  return d;
}

/// 통계 셋 한 줄.
function ovStatRow(host, snap) {
  const d = ovEl("div", "ov-statrow", host);
  ovStat(d, ovClock(snap.time), "생존");
  ovStat(d, ovGroup(snap.kills), "처치");
  ovStat(d, String(snap.level), "레벨");
  return d;
}

/// 설정 줄 하나 — `.hudrow` 를 그대로 입는다.
///
/// ⭐⭐ **줄 전체가 과녁이다**(`settings_cells.dart` 의 그 규약). 오른쪽 물건은
///   손잡이가 아니라 **판독값**이라, 44 아래여도 된다 — 노리는 것은 줄이다.
/// ⭐ 켜고 끄는 것은 **칸 둘 중 하나**로, 계단을 도는 것은 **눈금 여럿 중
///   하나**로 그린다. 자리 수가 곧 「몇 중 몇」이라 값을 안 읽어도 어디쯤인지
///   보인다 — 지금은 계단이 값 하나뿐이라 눌러 보기 전에는 몇 칸짜리인지 모른다.
function ovSetRow(host, r, opt) {
  const o = opt || {};
  const row = ovEl("div", "hudrow ov-tap ov-set-row" + (o.on ? " on" : ""), host);
  const nm = ovEl("div", "nm", row);
  nm.insertAdjacentHTML("beforeend",
    `<b>${r.nm}</b>${r.kind === "step" && r.at === r.pick ? `<em>기본값</em>` : ""}`
    + (o.hint ? `<i>${r.ht}</i>` : ""));
  const st = ovEl("div", "ov-seg", row);
  if (r.kind === "sw") {
    st.insertAdjacentHTML("beforeend",
      `<span class="sg${r.on ? "" : " on"}">끔</span>`
      + `<span class="sg${r.on ? " on" : ""}">켬</span>`);
  } else {
    st.insertAdjacentHTML("beforeend", `<b class="ov-num">${r.steps[r.at]}</b>`);
    const tk = ovEl("span", "tk", st);
    let h = "";
    for (let i = 0; i < r.steps.length; i++) h += `<i${i === r.at ? ' class="on"' : ""}></i>`;
    tk.insertAdjacentHTML("beforeend", h);
  }
  return row;
}

/// 나가는 문 — 오른쪽 위 44 칸. **판 길이와 무관한 구석**이라야 한다
/// (`settings_screen.dart` 가 아래 「돌아가기」를 걷어낸 그 근거).
function ovCloseBtn(host) {
  const b = ovEl("div", "hudbtn ov-tap ov-x", host);
  ovCanvas(b, 22, 22, (c, w) => ovCloseX(c, w));
  return b;
}

// ══════════════════════════════════════════════════════════════════════════
// ⑤ 여덟 안 — 축은 **하나다**: 판을 두르나, 화면을 창으로 쓰나
// ══════════════════════════════════════════════════════════════════════════
// ⭐⭐ 안을 둘로 가르는 축을 화면마다 다르게 잡으면 여덟 장이 여덟 질문이 되어
//   고를 수가 없다. ⇒ 넷 다 **같은 한 축**으로 가른다:
//
// ⚠️ 아래 [OVPLAN] 의 `shape` 가 그 축이다("pan" · "win"). 「이긴 판」을 말하는
//   `cleared` 와 헷갈리지 않게 이름을 갈라 뒀다 — 여기 `win` 은 **창**이다.
//
//   ㄱ 「판」  — 각진 판(`.hudpanel`) 한 장이 가운데 서고 그 안에 다 담는다.
//               로비의 문법이다. 눈이 한 군데에 머물고, 판정이 한 덩어리로 읽힌다.
//               ⚠️ 대신 **손이 가운데로 모인다** — 가로 폰에서 두 엄지는 아래
//                 양 끝에 있다.
//   ㄴ 「창」  — 판을 안 두르고 화면 자체를 창으로 쓴다(브래킷 · 귀퉁이 판독값).
//               내용이 가로로 눕고 손잡이가 **아래 두 귀퉁이**로 간다.
//               가로 폰의 두 엄지 문법이고, 지금 결과 화면이 이미 그 자리다.
//               ⚠️ 대신 **읽을 것이 흩어진다.**
//
// ⚠️ 「가린 면적」을 재는 규칙: `.ov-cover` 가 붙은 **가장 바깥 불투명 덩어리**만
//   센다. ㄱ 은 판 하나가 안을 다 덮으므로 판에만 붙고, ㄴ 은 띠 · 칸 · 단추
//   낱개에 붙는다 — 겹쳐 세면 면적이 거짓말이 된다.

const OVPLAN = {};

/// 결과 · 클리어의 ㄱ — 판 한 장.
function ovBuildSheetPanel(host, snap) {
  const p = ovEl("div", "hudpanel ov-sheet", host);
  const hd = ovEl("div", "hd", p);
  hd.insertAdjacentHTML("beforeend",
    `판정<b>스테이지 ${snap.stage} · ${snap.tier}</b>`);
  const bd = ovEl("div", "bd", p);
  ovVerdict(bd, snap);
  ovStars(bd, snap);
  ovStatRow(bd, snap);
  ovEarnStrip(bd, snap, false);
  ovMinedStrip(bd, snap);
  ovUnlock(bd, snap);
  if (!snap.cleared) {
    ovEl("div", "ov-foot", bd)
      .insertAdjacentHTML("beforeend", "주운 재화는 지갑에 들어갔다");
  }
  const go = ovEl("div", "ov-go", bd);
  ovBtn(go, "한 번 더", "");
  ovBtn(go, "로비로", "sel");
  return p;
}

/// 결과 · 클리어의 ㄴ — 화면이 창.
function ovBuildSheetWindow(host, snap) {
  const top = ovEl("div", "ov-top", host);
  const hd = ovEl("div", "hudstrip", top);
  hd.insertAdjacentHTML("beforeend",
    `<span class="lb">스테이지 ${snap.stage}</span><span class="one">${snap.tier}</span>`
    + `<span class="rt">난이도 배수 <b>×${snap.rewardMul}</b> 이 이미 셈에 들었습니다</span>`);
  const mid = ovEl("div", "ov-mid", host);
  const lf = ovEl("div", "ov-lf", mid);
  ovVerdict(lf, snap);
  ovStars(lf, snap);
  ovStatRow(lf, snap);
  const rt = ovEl("div", "ov-rt", mid);
  ovEarnStrip(rt, snap, false);
  ovMinedStrip(rt, snap);
  ovUnlock(rt, snap);
  if (!snap.cleared) {
    ovEl("div", "ov-foot", rt)
      .insertAdjacentHTML("beforeend", "주운 재화는 지갑에 들어갔다");
  }
  // 아래 두 귀퉁이 — 오른엄지가 앞으로 간다.
  const bl = ovEl("div", "ov-bl", host); ovBtn(bl, "한 번 더", "");
  const br = ovEl("div", "ov-br", host); ovBtn(br, "로비로", "sel");
}

/// 일시정지의 ㄱ — 판 한 장.
function ovBuildPausePanel(host, snap) {
  const p = ovEl("div", "hudpanel ov-pause", host);
  const hd = ovEl("div", "hd", p);
  hd.insertAdjacentHTML("beforeend",
    `멈춤<b>스테이지 ${snap.stage} · ${snap.tier}</b>`);
  const bd = ovEl("div", "bd", p);
  // **버리는 판이 무엇인지**가 물음보다 먼저 온다.
  const ctx = ovEl("div", "ov-ctx ov-num", bd);
  ctx.insertAdjacentHTML("beforeend",
    `${ovClock(snap.time)}<em>·</em>Lv ${snap.level}<em>·</em>처치 ${ovGroup(snap.kills)}`);
  ovEarnStrip(bd, snap, true);
  ovMinedStrip(bd, snap);
  const go = ovEl("div", "ov-col", bd);
  ovBtn(go, "계속", "sel");
  ovBtn(go, "설정", "");
  ovBtn(go, "판을 버리고 로비로", "ov-low");
  ovEl("div", "ov-foot", bd)
    .insertAdjacentHTML("beforeend", "이 판의 성장은 사라진다 · 재화는 남는다");
  return p;
}

/// 일시정지의 ㄴ — 화면이 창. **파괴적인 문을 제일 멀리 둔다.**
function ovBuildPauseWindow(host, snap) {
  const top = ovEl("div", "ov-top", host);
  const hd = ovEl("div", "hudstrip", top);
  hd.insertAdjacentHTML("beforeend",
    `<span class="lb">멈춤</span><span class="one">스테이지 ${snap.stage} · ${snap.tier}</span>`
    + `<span class="rt ov-num">${ovClock(snap.time)} · Lv ${snap.level} · 처치 ${ovGroup(snap.kills)}</span>`);
  // ⚠️ 결과 ㄴ 의 왼쪽 기둥과 **다른 클래스**다. 거기는 세 덩어리를 띠 안에
  //   펼치지만(판정 · 별 · 값), 여기는 띠 둘뿐이라 펼치면 화면 절반이 빈 채로
  //   남는다 — 게다가 이 화면은 **뒤에 판이 살아 있어** 덜 덮는 것이 이득이다.
  const mid = ovEl("div", "ov-mid", host);
  const lf = ovEl("div", "ov-lf2", mid);
  ovEarnStrip(lf, snap, true);
  ovMinedStrip(lf, snap);
  ovEl("div", "ov-foot", lf)
    .insertAdjacentHTML("beforeend", "이 판의 성장은 사라진다 · 재화는 남는다");
  // 오른아래에 앞으로 가는 문 둘, 왼아래에 나가는 문 하나 — 사이가 멀다.
  const br = ovEl("div", "ov-br", host);
  ovBtn(br, "설정", "");
  ovBtn(br, "계속", "sel");
  const bl = ovEl("div", "ov-bl", host);
  ovBtn(bl, "판을 버리고 로비로", "ov-low");
}

/// 설정의 ㄱ — 판 한 장 · 두 기둥. 줄마다 잔글이 붙는다.
function ovBuildSetPanel(host) {
  const p = ovEl("div", "hudpanel ov-set", host);
  const hd = ovEl("div", "hd", p);
  hd.insertAdjacentHTML("beforeend", `설정<b>멈춤에서 열렸습니다</b>`);
  const bd = ovEl("div", "bd", p);
  const two = ovEl("div", "ov-two", bd);
  const c1 = ovEl("div", "cl", two), c2 = ovEl("div", "cl", two);
  OVSET.forEach((r, i) => ovSetRow(i < 3 ? c1 : c2, r, { hint: true }));
  ovCloseBtn(host);
}

/// 설정의 ㄴ — 창 · 한 기둥 + 옆창. 잔글이 **고른 줄 하나**에만 선다.
///
/// ⭐ 줄에서 잔글을 빼면 줄이 44 로 내려앉아 여섯이 한 기둥에 다 선다. 그
///   대신 「무엇이 달라지나」가 갈 곳이 없어지는데, 로비가 이미 그 자리를
///   갖고 있다 — `.hudside`(눌린 칸이 무엇인지 말하는 창)다.
/// ⚠️ 옆창은 **비어도 자리를 남긴다**(그 클래스의 규약). 안 그러면 줄을 고를
///   때마다 왼쪽 기둥의 폭이 흔들린다.
function ovBuildSetWindow(host) {
  const mid = ovEl("div", "ov-mid ov-setwin", host);
  const col = ovEl("div", "ov-setcol", mid);
  // ⚠️ 나가는 문이 **오른쪽 기둥의 머리**에 앉는다. 화면 귀퉁이에 절대 자리로
  //   띄우면 `hudChrome` 의 귀퉁이 판독값과 겹치고(y 42 ±10), 여섯 줄이 쓸
  //   세로도 그만큼 준다. 기둥은 폭이 고정이라 판 길이와 무관하다 —
  //   `settings_screen.dart` 가 아래 「돌아가기」를 걷어낸 그 근거를 지킨다.
  const rt = ovEl("div", "ov-setrt", mid);
  ovCloseBtn(rt);
  const side = ovEl("div", "hudside", rt);
  const ttl = ovEl("div", "ttl", side);
  const kv = ovEl("div", "hudkv", side);
  const rows = [];
  const show = (i) => {
    const r = OVSET[i];
    ttl.textContent = r.nm;
    kv.textContent = r.ht;
    rows.forEach((el, k) => el.classList.toggle("on", k === i));
  };
  OVSET.forEach((r, i) => {
    const row = ovSetRow(col, r, { hint: false, on: i === 0 });
    rows.push(row);
    if (row.addEventListener) row.addEventListener("click", () => show(i));
  });
  show(0);
}

OVPLAN.r1 = { nm: "결과 · ㄱ 판", live: false, snap: OVSNAP, seed: 3, shape: "pan",
  one: "판 한 장이 판정을 통째로 든다. 눈이 한 군데에 머문다",
  build: (h, s) => ovBuildSheetPanel(h, s) };
OVPLAN.r2 = { nm: "결과 · ㄴ 창", live: false, snap: OVSNAP, seed: 8, shape: "win",
  one: "화면이 창이고 손잡이가 아래 두 귀퉁이로 간다 — 두 엄지 문법",
  build: (h, s) => ovBuildSheetWindow(h, s) };
OVPLAN.p1 = { nm: "일시정지 · ㄱ 판", live: true, snap: OVSNAP, seed: 15, shape: "pan",
  one: "판 한 장 · 손잡이 셋이 세로 기둥. 지금 엔진과 같은 뼈대다",
  build: (h, s) => ovBuildPausePanel(h, s) };
OVPLAN.p2 = { nm: "일시정지 · ㄴ 창", live: true, snap: OVSNAP, seed: 21, shape: "win",
  one: "앞으로 가는 문 둘은 오른아래, 판을 버리는 문은 왼아래 — 사이가 멀다",
  build: (h, s) => ovBuildPauseWindow(h, s) };
OVPLAN.s1 = { nm: "설정 · ㄱ 판", live: true, snap: OVSNAP, seed: 27, shape: "pan",
  one: "판 한 장에 여섯 줄이 두 기둥. 줄마다 잔글이 붙는다",
  build: (h) => ovBuildSetPanel(h) };
OVPLAN.s2 = { nm: "설정 · ㄴ 창", live: true, snap: OVSNAP, seed: 33, shape: "win",
  one: "여섯 줄이 한 기둥, 잔글은 고른 줄 하나만 옆창에 선다",
  build: (h) => ovBuildSetWindow(h) };
OVPLAN.c1 = { nm: "클리어 · ㄱ 판", live: false, snap: OVWIN, seed: 39, shape: "pan",
  one: "결과 ㄱ 과 <b>같은 뼈대</b> — 별 셋이 차고 해금 띠가 한 줄 는다",
  build: (h, s) => ovBuildSheetPanel(h, s) };
OVPLAN.c2 = { nm: "클리어 · ㄴ 창", live: false, snap: OVWIN, seed: 45, shape: "win",
  one: "결과 ㄴ 과 같은 뼈대 — 오른쪽 기둥이 한 줄 길어질 뿐이다",
  build: (h, s) => ovBuildSheetWindow(h, s) };

// ══════════════════════════════════════════════════════════════════════════
// ⑥ 조립 — 폰 하나 = 바탕 캔버스 한 겹 + 부품 한 겹
// ══════════════════════════════════════════════════════════════════════════

const OVW = 788, OVH = 364;

/// 「가린 면적」의 자리표를 **조립이 끝난 뒤 한 번에** 붙인다.
///
/// ⚠️⚠️ **겹쳐 세면 면적이 거짓말이 된다.** 조각을 짓는 함수가 제 손으로
///   자리표를 붙이면 판(ㄱ)에서는 판 하나가 안의 띠 · 칸 · 단추를 이미 덮고
///   있는데 그것들이 또 세어진다. ⇒ 자리표는 **모양을 아는 여기서** 붙인다:
///     ㄱ 판을 두른 안 — 판 하나. (설정의 나가는 문만 판 밖이라 따로 센다)
///     ㄴ 안 두른 안   — 띠 · 칸 · 줄 · 옆창 · 단추 낱개.
function ovMarkCover(host, win) {
  const has = (el, k) =>
    typeof el.className === "string" && el.className.split(" ").indexOf(k) >= 0;
  ovWalk(host, []).forEach((el) => {
    if (!el.classList) return;
    if (has(el, "ov-x")) { el.classList.add("ov-cover"); return; }
    if (win) {
      if (has(el, "hudstrip") || has(el, "hudcell") || has(el, "hudrow")
        || has(el, "hudside") || has(el, "hudbtn")) el.classList.add("ov-cover");
    } else if (has(el, "hudpanel")) el.classList.add("ov-cover");
  });
}

function ovPanel(key) {
  const plan = OVPLAN[key];
  if (!plan) return;
  const cv = $("ov-" + key + "-bg");
  const host = $("ov-" + key);
  if (cv) {
    mk(cv, [OVW, OVH], function ovBgDraw(c, tAbs, dt, W, H) {
      if (ovHidden()) return;
      if (plan.live) {
        ovLiveField(c, W, H, tAbs, plan.seed);
        if (plan.shape === "win") ovLiveChrome(c, W, H, tAbs, plan.seed);
      } else {
        ovDeadField(c, W, H, tAbs, plan.seed);
      }
    }, { clear: true });
  }
  if (host && host.appendChild) {
    host.classList.add("ov-shape-" + plan.shape);
    plan.build(host, plan.snap);
    ovMarkCover(host, plan.shape === "win");
  }
}

["r1", "r2", "p1", "p2", "s1", "s2", "c1", "c2"].forEach(ovPanel);
// `.hudpanel` 의 모서리 브래킷 셋은 `hud.js` 가 붙인다 — 이 장의 판은 그
// 함수가 한 번 돈 **뒤에** 생기므로 다시 부른다(같은 판에 두 번 안 붙는다).
hudPanels();

// ══════════════════════════════════════════════════════════════════════════
// ⑦ 지금 — **그림이 아니라 수만 옮겨 적는다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ 그림의 정본은 `mockup-ui.html` 의 세 절이다. 여기 다시 그리면 사본이
//   둘이 되고, 이 저장소는 사본이 갈라지는 병을 여러 번 앓았다. ⇒ 이 장이
//   「지금」에 대해 하는 일은 재는 것뿐이고, 아래 수는 전부 `lib/ui` 의 심볼에서
//   센 것이다. 안 여덟의 수는 **브라우저가 그린 것을 그대로 잰다**(⑧절) —
//   출처가 갈리므로 표에 표시를 달아 둔다.

const OVNOW = [
  {
    nm: "결과 · 지금",
    // 과녁 둘 — `ResultScreen` 의 `UiButton` 둘(`kUiBtnGhostH` 52 · `kUiBtnPrimaryH` 58).
    tap: 52, taps: 2,
    // 급수 열둘 — `screens.dart` 의 `size:` 인자와 `_BtnSpec` 의 `fontSize` 를 센 것:
    // 10 · 34 · 21 · 9 · 13 · 12.5 · 9 · 12.5 · 9 · 10.5 · 18 · 15.
    fonts: 12,
    // 색 열여덟 — `screens.dart` · `theme.dart` · `theme_button.dart` 의 RGB
    // (알파만 다른 것은 한 색으로 세고, 문양의 제 색은 뺐다).
    cols: 18,
    // 그중 SF HUD 여덟 장에 **한 번도 안 서는** 색.
    out: 15,
    // 금빛이 **셋**이다 — 별 · 해금 띠 · 「로비로」.
    gold: 3,
    one: "금빛이 셋이라 「지금 누를 수 있는 것」이 안 갈린다",
  },
  {
    nm: "일시정지 · 지금",
    // 과녁 셋 — 계속 58 · 설정 52 · 판을 버리고 로비로 44(`kUiBtnLowH`).
    tap: 44, taps: 3,
    // 급수 아홉 — 21 · 11.5 · 12 · 9 · 11.5 · 10.5 · 18 · 15 · 12.5.
    fonts: 9,
    // 색 열일곱 — 어둠막 0A0A0E · 글자 EEE4D8 · 주 버튼 일곱(FFD27A · 6E5524 ·
    // 57431C · 3C2E11 · FFFFFF · 000000 · FFE9C6) · 곁 버튼 여섯(B4B4C8 ·
    // 272733 · 1E1E27 · 15151C · D6D6E2 와 위와 겹치는 둘) · 나가는 문 셋
    // (181820 · 12121A · 8B8B99). 그중 넷만 SF HUD 여덟 장에도 선다.
    cols: 17,
    out: 13,
    gold: 1,
    one: "여기는 금빛이 하나뿐이다 — 셋 중 이 화면만 규약을 지키고 있다",
  },
  {
    nm: "설정 · 지금",
    // 과녁 일곱 — 줄 여섯(`kUiBtnLowH` 44 가 바닥) + 닫는 문 44.
    tap: 44, taps: 7,
    // 급수 여섯 — 20 · 11 · 16 · 11 · 11 · 9.
    fonts: 6,
    // 색 열둘 — 어둠막 0A0A0E · 글자 EEE4D8 · 줄 둘(17171F · B4B4C8) ·
    // 켠 스위치 넷(3A2B0E · FFD27A · FFE9C6 · E3BE83) · 끈 스위치 넷
    // (101016 · 5E5E6C · 3E3E4C · 2B2B36). 그중 SF HUD 에도 서는 것은 금빛뿐이다.
    cols: 12,
    out: 11,
    // 금빛이 **다섯**이다 — 켜진 스위치 둘 + 값 칸 셋(`SettingsValue` 가 금빛).
    gold: 5,
    one: "금빛이 다섯 — 값 칸과 켜진 스위치가 전부 금빛이라 손잡이와 안 갈린다",
  },
];

// ══════════════════════════════════════════════════════════════════════════
// ⑧ 재는 표 — **그려진 것을 그대로 잰다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ 표에 수를 손으로 적으면 그림을 고치는 날 표만 안 따라온다. ⇒ 안 여덟의
//   수는 브라우저가 배치를 끝낸 **그 사각과 그 글꼴 크기**에서 뽑는다.
//   ① 제일 작은 과녁 — `.ov-tap` 의 높이 중 최소
//   ② 과녁 수        — `.ov-tap` 의 개수
//   ③ 글자 급수      — 화면 안 모든 요소의 `font-size` 가짓수
//   ④ 색 가짓수      — 화면 안 모든 요소의 글자색 · 면 · 테 · 계조 · 그림자에서
//                      뽑은 RGB 가짓수(알파는 안 센다 — 알파만 다른 것은 한 색이다)
//   ⑤ SF HUD 밖의 색 — 그중 [OVKIT] 에 없는 것. **이 칸이 이 장의 요점이다**
//   ⑥ 금빛 자리      — `data-ov-gold` 가 붙은 것의 개수
//   ⑦ 가린 면적      — `.ov-cover` 의 넓이 합 ÷ 화면 넓이
//
// ⚠️ 자는 **화면에 대한 비율**로 잡는다. 좁은 창에서 폰이 줄어들어도 비율은
//   안 변하고, 그래야 높이를 시안 자(364)로 되돌려 적을 수 있다.
// ⚠️ 스모크의 가짜 DOM 에는 `getBoundingClientRect` 도 `getComputedStyle` 도
//   없다 — 없으면 **조용히 건너뛴다**(표만 안 차고 예외는 안 난다).

function ovWalk(root, out) {
  out.push(root);
  const kids = root.children || [];
  for (let i = 0; i < kids.length; i++) ovWalk(kids[i], out);
  return out;
}

/// 문자열 하나에서 색을 다 긁어 담는다 — `rgb()`/`rgba()` 는 계조와 그림자
/// 안에서도 같은 꼴로 나오므로 `background-image` 와 `box-shadow` 를 그대로
/// 먹여도 된다(그래서 **단추의 세 단이 안 빠진다**).
///
/// ⚠️ 알파 0 은 색이 아니다 — 안 보이는 것을 세면 「투명」이 한 색이 된다.
/// ⚠️ 알파는 **안 센다.** 같은 색을 옅게 쓴 것은 새 색이 아니라 같은 색이다.
function ovPutColors(set, str) {
  if (!str) return;
  const re = /rgba?\(\s*(\d+)[\s,]+(\d+)[\s,]+(\d+)(?:[\s,/]+([\d.]+))?\s*\)/g;
  let m;
  while ((m = re.exec(str))) {
    if (m[4] != null && parseFloat(m[4]) === 0) continue;
    set.add([m[1], m[2], m[3]]
      .map((v) => (+v).toString(16).padStart(2, "0")).join("").toUpperCase());
  }
}

/// 글자가 **실제로 있는** 요소인가. 글자색은 그릴 글자가 있을 때만 칠해진다.
/// ⚠️ 이걸 안 보면 격자 · 스캔라인처럼 글자가 없는 겹의 상속된 `color` 까지
///   색으로 잡힌다(첫 판이 페이지 잉크 `#EDEDF2` 를 여덟 번 세었다).
function ovHasText(el) {
  const n = el.childNodes || [];
  for (let i = 0; i < n.length; i++)
    if (n[i].nodeType === 3 && String(n[i].nodeValue).trim()) return true;
  return false;
}

/// 요소 하나가 실제로 칠하는 색 — 글자 · 면 · 테 넷 · 계조 · 그림자.
/// ⚠️ 테는 **그어질 때만** 센다. `border-style:none` 인 자리도 색은 계산되므로
///   (보통 `currentColor`) 안 걸러 내면 없는 테가 색으로 잡힌다.
function ovElColors(set, cs, el) {
  if (ovHasText(el)) ovPutColors(set, cs.color);
  ovPutColors(set, cs.backgroundColor);
  ["Top", "Right", "Bottom", "Left"].forEach((k) => {
    if (cs["border" + k + "Style"] !== "none") ovPutColors(set, cs["border" + k + "Color"]);
  });
  ovPutColors(set, cs.backgroundImage);
  ovPutColors(set, cs.boxShadow);
}

function ovMeasureOne(key) {
  const screen = $("ov-" + key + "-screen");
  const host = $("ov-" + key);
  if (!screen || !host || typeof screen.getBoundingClientRect !== "function") return null;
  if (typeof getComputedStyle !== "function") return null;
  const box = screen.getBoundingClientRect();
  if (!(box.width > 0) || !(box.height > 0)) return null;
  const kx = OVW / box.width, ky = OVH / box.height;
  // ⚠️ 색은 **화면 한 장 전부**에서 잰다 — 부품 겹뿐 아니라 격자 · 스캔라인 ·
  //   비네트도 칠하는 것이다. 「지금」 쪽도 어둠막을 세었으므로 같은 자를 쓴다.
  //   ⚠️ 캔버스는 CSS 색이 없어 **문양이 저절로 빠진다** — 문양은 어느 안에서도
  //     제 색을 그대로 들어서 안을 가르는 축이 아니다.
  const cols = new Set();
  ovWalk(screen, []).forEach((el) => {
    if (!el.getBoundingClientRect || el === screen) return;
    ovElColors(cols, getComputedStyle(el), el);
  });
  const all = ovWalk(host, []);
  let tapMin = Infinity, taps = 0, gold = 0, area = 0;
  const fonts = new Set();
  all.forEach((el) => {
    if (!el.getBoundingClientRect) return;
    const r = el.getBoundingClientRect();
    const cls = el.className || "";
    if (typeof cls === "string" && cls.split(" ").indexOf("ov-tap") >= 0) {
      taps++;
      tapMin = Math.min(tapMin, r.height * ky);
    }
    if (typeof cls === "string" && cls.split(" ").indexOf("ov-cover") >= 0) {
      area += (r.width * kx) * (r.height * ky);
    }
    if (el.dataset && el.dataset.ovGold === "1") gold++;
    const cs = getComputedStyle(el);
    if (cs && cs.fontSize) fonts.add(Math.round(parseFloat(cs.fontSize) * kx * 2) / 2);
  });
  return {
    tap: tapMin === Infinity ? 0 : Math.round(tapMin),
    taps, fonts: fonts.size, gold,
    cols: cols.size,
    out: [...cols].filter((c) => !OVKIT.has(c)).length,
    outList: [...cols].filter((c) => !OVKIT.has(c)),
    pct: (area / (OVW * OVH)) * 100,
  };
}

function ovFillTable() {
  const h = $("ov-tbl");
  if (!h || !h.insertAdjacentHTML) return;
  OVNOW.forEach((n) => {
    h.insertAdjacentHTML("beforeend",
      `<tr class="ov-nowrow"><td><b>${n.nm}</b></td>`
      + `<td>${n.tap}</td><td>${n.taps}</td><td>${n.fonts}</td>`
      + `<td>${n.cols}</td><td><b>${n.out}</b></td><td><b>${n.gold}</b></td>`
      + `<td>—</td><td>${n.one}</td></tr>`);
  });
  ["r1", "r2", "c1", "c2", "p1", "p2", "s1", "s2"].forEach((k) => {
    const m = ovMeasureOne(k);
    const plan = OVPLAN[k];
    if (!m || !plan) return;
    h.insertAdjacentHTML("beforeend",
      `<tr><td><b>${plan.nm}</b></td>`
      + `<td>${m.tap}</td><td>${m.taps}</td><td>${m.fonts}</td>`
      + `<td>${m.cols}</td><td><b>${m.out}</b></td><td><b>${m.gold}</b></td>`
      + `<td>${m.pct.toFixed(1)}%</td><td>${plan.one}</td></tr>`);
  });
}

// ⚠️ 글꼴이 늦게 실리면 줄 높이가 그 뒤에 한 번 더 바뀐다 — 다 실린 뒤에 잰다.
//   `document.fonts` 가 없는 판(스모크 · 옛 브라우저)에서는 프레임 둘을 기다린다.
if (typeof requestAnimationFrame === "function") {
  const go = () => requestAnimationFrame(() => requestAnimationFrame(ovFillTable));
  if (typeof document !== "undefined" && document.fonts && document.fonts.ready
      && document.fonts.ready.then) document.fonts.ready.then(go);
  else go();
}

// ══════════════════════════════════════════════════════════════════════════
// ⑨ 부품 견본 — 폰 밖. **화면과 같은 함수가 짓는다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 견본이 제 손으로 그리면 「이 상태가 화면에서 어떻게 보이나」를 거짓으로
//   말하게 된다(판 안 HUD 장이 같은 자리에서 같은 판정을 내렸다).

{
  const h = $("ov-parts");
  if (h && h.appendChild) {
    const one = (cap, fn) => {
      const w = ovEl("div", "ov-samp", h);
      fn(w);
      w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
    };
    one("<b>별 셋</b> — 획으로 그립니다. 딴 별은 <b>하이라이트</b>, 못 딴 별은 "
      + "보조색 획이고 <b>금빛이 아닙니다</b> — 금빛은 오른아래 문 하나가 쥡니다",
      (w) => { const d = ovEl("div", "ov-stars", w);
        [true, true, false].forEach((lit) =>
          ovCanvas(d, 20, 20, (c, ww) => ovStar(c, ww, lit))); });
    one("<b>판정 배지</b> — 진 판은 붉은, 이긴 판은 냉광. <b>제목 글자는 늘 같은 "
      + "색</b>이라 판정마다 색이 늘지 않습니다",
      (w) => { const d = ovEl("div", "ov-row", w);
        ovCanvas(d, 40, 18, (c, ww, hh) => ovBadge(c, ww, hh, true));
        ovCanvas(d, 40, 18, (c, ww, hh) => ovBadge(c, ww, hh, false)); });
    one("<b>단추 셋</b> — 곁길 · <b>금빛 하나</b> · 나가는 문. 각과 계조는 "
      + "<code>hud.js</code> 의 <code>.hudbtn</code> 그대로고 <b>자만 엄지 자로</b> "
      + "올렸습니다(38 → 44 · 52)",
      (w) => { const d = ovEl("div", "ov-row ovk", w);
        ovBtn(d, "한 번 더", ""); ovBtn(d, "로비로", "sel");
        ovBtn(d, "판을 버리고 로비로", "ov-low"); });
    one("<b>설정 손잡이 둘</b> — 켜고 끄는 것은 <b>칸 둘 중 하나</b>, 계단을 "
      + "도는 것은 <b>눈금 다섯 중 하나</b>. 자리 수가 곧 「몇 중 몇」이라 "
      + "값을 안 읽어도 어디쯤인지 보입니다",
      (w) => { const d = ovEl("div", "ov-col ovk ov-set", w);
        ovSetRow(d, OVSET[0], { hint: true });
        ovSetRow(d, OVSET[2], { hint: true }); });
    one("<b>나가는 문</b> — 획 둘. <b>44 칸</b>이고 자리가 판 길이와 무관합니다 "
      + "(ㄱ 은 창틀의 오른쪽 위, ㄴ 은 오른쪽 기둥의 머리) — 판이 길어져도 "
      + "안 밀립니다",
      (w) => { const d = ovEl("div", "ov-row ovk", w); ovCloseBtn(d); });
  }
}
