// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-home.js — 화면 2 「홈(캐릭터)」
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HH`/`hh` 로 격리한다.
//
// ── 세 번째 판 — 「밀도」가 판정 기준이다 ────────────────────────────────
// 첫 판은 기존 로비의 「좌우 스탯」 골격에 냉광만 입힌 것이었고, 둘째 판은
// 참조의 「중앙 허브 + 방사형 패널」 구조는 가져왔지만 **양이 10분의 1**
// 이었다(원 하나 + 패널 여섯). 참조 넉 장을 세어 보면 화면 하나에 동심원
// 고리가 대여섯 겹, 허브에서 뻗는 회로형 선이 예닐곱 가닥, 귀퉁이마다
// 다른 판독값 블록, 곳곳에 흩어진 미세 라벨이 있다 — 그 개수를 이 판이
// 채운다. 세부는 이 파일 안의 각 절 주석에 실제 개수로 적어 뒀다.
//
// ── 위계 — 밀도가 소음이 되지 않게 ──────────────────────────────────────
// 늘어난 요소는 전부 **장식**이고, 장식은 전부 **어둡다**(알파 0.15~0.55).
// 밝고 커야 하는 것은 셋뿐이다: ① 캐릭터(허브를 뚫고 선다) ② HSTAT
// 여섯 줄(실제로 읽어야 하는 스탯) ③ 편성 버튼(유일한 금빛). 이 셋은
// 전부 **맨 나중에** 그려 장식 위에 얹는다 — 그림 순서 자체가 위계다.
//
// ── 중심 정렬 ────────────────────────────────────────────────────────────
// ⚠️⚠️ 직전 판의 실측 버그(고리 중심과 패널 무게중심이 어긋남)가 다시
// 나지 않도록, **모든** 새 장식도 `hhLayout()` 이 낸 `(cx,cy)` 하나에서만
// 각도·반지름으로 파생한다. 귀퉁이 블록만 예외인데, 그건 성격이 달라서다
// (허브를 도는 것이 아니라 화면 네 귀퉁이에 박히는 것) — 그래도 좌표는
// `HH_RAILW`·`HH_TOPBARH`·`HH_ROSTERH`·`W`·`H` 에서 수식으로 뽑지 손으로
// 안 박는다(캔버스 크기가 바뀌어도 따라간다).
//
// 계승한 것은 값뿐이다: 좌측 허브 레일(그때 5칸 · 지금 여섯), 스탯 6줄의 데이터(`HSTAT`),
// 재화를 안 거는 것, `ELEM.*` 캐릭터 그리기 함수 — 전부 **이미 있는 자산을
// 다시 안 만들려는 것**이지 「기존 화면이 이랬으니 이 화면도 이래야 한다」가
// 아니다. 배치·장식·연출은 이번에 전부 새로 짰다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 로스터 열여덟 — **엔진의 도감이 정본이다** ──────────────────────────
// 엔진 홈은 `kCharacterDefs` **열여덟**을 다 세운다(`ui/home_roster.dart` 의
// `homeRosterOrder()`): 기본 6 → 두 속성 10 → 암 → 백광. 시안이 손으로
// 열 칸만 적어 두면 여덟이 빠져 **같은 화면이 두 벌**이 된다.
//
// ⚠️⚠️ **쌍 열의 이름을 여기 손으로 적지 않는다** — 정본은 `vfx.js` 의
//   `FVNAME` 이고 엔진도 그것을 옮겨 든다(`data/elements.dart` 의
//   `kElementPairNames`). 여기서는 앞머리(두 글자)만 잘라 쓴다: 칸 폭이 46px 라
//   「정수 · 염+빙」이 통째로 안 들어간다.
//
// ⚠️ `tone` 은 `TONE`/`EVTONE` 의 키다. 쌍 열의 톤은 엔진의 `fusionTone`
//   (`game/fx/body_fuse.dart`)과 **같은 표**여야 두 화면의 색이 안 갈린다.
//
// ⚠️⚠️ **한자를 안 단다 — 사용자 확정**(「게임 내에서 한문 절대 금지」).
//   이 표는 `빙 氷`·`염 炎`·`뇌 雷`·`독 毒`·`풍 風`·`암 影`·`백광 白光` 처럼
//   이름 뒤에 한자를 달고 있었다. 기본 여섯의 이름은 엔진 `SkillElement.label`
//   그대로이고 **거기에 한자가 없다** — 시안만 달고 있었던 것이다. 걷어내면
//   `mockup-hud-roster.js` 의 `HRBASIC` 과도 글자가 같아진다.
const HHPAIRS = [
  // C(5,2) — 차례는 엔진의 `_kPairElements`(빙·염·뇌·독·풍) 이중 루프 그대로다.
  ["aqua", "빙+염"], ["magnet", "빙+뇌"], ["plague", "빙+독"], ["snow", "빙+풍"],
  ["blast", "염+뇌"], ["smoke", "염+독"], ["fstorm", "염+풍"],
  ["numb", "뇌+독"], ["thunder", "뇌+풍"], ["murk", "독+풍"],
];
/// 쌍 이름 — `FVNAME` 앞머리 두 글자. 표가 없으면 조합 표기로 물러선다.
function hhPairName(tone, pair) {
  const full = (typeof FVNAME !== "undefined") && FVNAME[tone];
  return full ? String(full).split(" · ")[0] : pair;
}
const HHROSTER = [
  // 기본 여섯 — **처음부터 열려 있다**(`CharacterTier.basic`).
  { key: "gold", tone: "gold", nm: "무속성", own: true },
  { key: "ice", tone: "frost", nm: "빙", own: true },
  { key: "fire", tone: "ember", nm: "염", own: true },
  { key: "bolt", tone: "volt", nm: "뇌", own: true },
  { key: "poison", tone: "toxin", nm: "독", own: true },
  { key: "gale", tone: "gale", nm: "풍", own: true },
  // 특수 열둘 — **상점에서 산다.** 아직 안 산 상태로 그린다.
  ...HHPAIRS.map(([tone, pair]) => ({ key: "fuse_" + tone, tone, nm: hhPairName(tone, pair), own: false })),
  { key: "shade", tone: "shadeA", nm: "암", own: false },
  { key: "white", tone: "white", nm: "백광", own: false },
];
let HHMAIN = "gold";   // 지금 로비에 세운 「메인」 — 클릭이 이 값을 바꾼다.
// ⚠️⚠️ **첫 화면 기본값은 「기본 캐릭터」다 — 취향으로 고르는 자리가 아니다.**
// 갓 깐 저장본이 실제로 주는 것이 무속성이고(`lib/data/characters.dart` 의
// `kDefaultCharacterId = 'neutral'`, 저장 키가 없으면 거기로 접힌다), 엔진 홈은
// 그 저장본을 그대로 읽어 세운다(`ui/home_stage.dart` 의 `progress.characterDef`).
// 시안이 다른 속성을 세우면 **첫인상 스크린샷이 엔진 첫 화면과 다른 캐릭터**가
// 되고, 이 화면의 요구 셋 중 첫째(「캐릭터가 크게 서고」)를 재는 자가 갈린다.
// ⚠️ **무채색인 것이 흠이 아니라 이야기다** — 「빛이 색을 입는다」의 기준선이고,
// 첫 화면이 그 기준선을 보여 줘야 나머지 열일곱이 **색을 얻은 것**으로 읽힌다.
// 화려한 속성을 세우고 싶어서 여기를 갈아 끼우지 마라.
// ⚠️ `#hh-mainname` 이 HTML 에 `무속성`으로 박혀 있다 — 여기를 다른 키로 두면
// **몸과 이름표가 갈린다**(클릭 전까지 이름표를 고칠 코드가 안 돈다).

/// **홈에 서는 몸 — 열여덟이 한 함수다.**
///
/// ⭐ `elemBody` 의 `bare` 갈래(광휘 + 각진 별 코어 3겹, **둘레 모티프 없음**)에
/// **톤만 갈아 끼운다.** 엔진도 같은 방식으로 세운다(`ui/home_char.dart` 머리말 ·
/// `characterTone`).
/// ⭐ **몸에 필요한 것은 색 하나**이고 열여덟이 전부 색을 갖고 있다 ⇒ 「그림이
///   아직 없는 칸」이 안 생긴다.
/// ⚠️ 속성마다 다른 몸 함수를 부르지 마라 — 중앙 몸과 로스터 썸네일이 두 벌로
///   갈려 반드시 어긋난다.
function hhDraw(key) {
  const r = HHROSTER.find((x) => x.key === key);
  const tn = (r && r.tone) || "gold";
  return function hhBody(c, t, dt, W, H, st) { ELEM.elemBody(c, t, dt, W, H, st, tn, 1); };
}

// ── 단일 중심 — 이 화면의 모든 좌표가 갈라져 나오는 자리 ─────────────────
// HH_RAILW·HH_ROSTERH·HH_TOPBARH 는 `mockup-hud-home.html` 의 CSS 상수와
// **한 벌**이다(`.hh-mid`·`#hh-rail`·`.hh-bottom`). `hhLayout()` 하나가
// (cx,cy)·허브 반지름·패널 타원 반지름을 전부 내고, 이 파일의 모든 그림은
// 그 반환값 아니면 `W,H` 자체에서만 좌표를 뽑는다 — 상수를 눈대중으로
// 다시 곱하지 않는다.
const HH_RAILW = 58, HH_ROSTERH = 74, HH_TOPBARH = 26, HH_PANEL_W = 88, HH_PANEL_H = 36;
// ⚠️⚠️ **허브는 캐릭터를 덮지도, 패널을 밀지도 않는 크기다.** 고리띠의 바깥은
//   `hubR×1.28 = 66.6` 이고(극 눈금 `×1.82 = 94.6` 은 판이 비운 ±90° 에만 서서
//   판과 안 만난다), 제일 가까운 판 모서리는 위·아래 판의 안쪽 아래 귀
//   (중심에서 107)라 **41px** 이 남는다. 더 키우면 고리띠가 판에 닿아 「계기」가
//   아니라 「벽」이 되고, 더 줄이면 허브가 화면에서 외로워진다 — 이 화면의 요구
//   첫째가 「캐릭터가 크게 서고」라 그쪽으로도 못 간다.
//   ⚠️ 이 41 은 `HH_RXF`·`HH_RYF` 가 정한다 — 그 둘을 만지면 여기도 다시 잰다.
const HH_HUBR = 52;
// ⚠️⚠️ **몸은 허브와 한 벌이다.** 코어 반지름이 `캔버스 폭 × .30` 이라 156 이면
//   46.8 — `hubR 52` 의 0.90 이다. 이 비가 **「주인공이 고리를 뚫고 나온다」**를
//   만든다: 더 키우면 몸이 고리띠를 통째로 덮어 고리가 사라지고, 훨씬 줄이면
//   고리 안에 갇힌 작은 것이 된다.
//   ⚠️ `mockup-hud-home.html` 의 `#hh-hero-wrap{width/height}` 와 **한 벌**이다.
const HH_HEROPX = 156;

// ── 여섯 패널이 앉는 자리 — **왼쪽 셋 · 오른쪽 셋** ───────────────────────
// 극(±90°)은 비운다. 위아래에 판을 세우면 캐릭터가 위아래로 눌리고, 세로로
// 벌릴 자리도 그 둘이 먼저 먹는다.
// ⭐ 한쪽의 세 각도는 `0°` 를 사이에 두고 위아래 대칭이고, 반대쪽은 그 셋을
//   세로축에 비춘 것이다 ⇒ **좌우가 정확한 거울**이고 세로로는 세 자리가
//   `−sin · 0 · +sin` 으로 **고르게** 벌어진다.
// ⚠️ 차례는 `HSTAT` 의 `side`·`y` 와 같다 — 오른쪽 위→아래(공격력·마법력·
//   치명타) 다음 왼쪽 위→아래(체력·방어력·덱 칸).
// ⚠️⚠️ **벌림각의 하한을 정하는 것은 한쪽 세 판이 세로로 안 겹치는 자리다.**
//   위·아래 판이 가운데 판에서 떨어지는 몫이 `Ry × sin(벌림각)` 이고 판 높이가
//   36 이라, `sin ≥ 36/Ry`(지금 `Ry 106` 이니 20°) 아래로 눕히면 셋이 겹친다.
//   50° 면 그 몫이 81 이라 판 사이에 45px 이 남는다.
//   ⚠️ 옛 주석은 하한을 **귀퉁이 데이터 블록**(오른쪽 끝 `x=161`)으로 적어 뒀는데,
//     그건 판이 화면 끝에 있던 시절의 답이다 — 판을 캐릭터 쪽으로 당긴 지금
//     위·아래 판의 바깥 모서리가 `x=248.5` 라 그 블록에서 87px 이 떨어져 있고,
//     10° 까지 눕혀도 안 닿는다. 그 자리는 이제 하한을 안 정한다.
const HH_SPREAD = 50;
const HHPOS = [-HH_SPREAD, 0, HH_SPREAD, 180 + HH_SPREAD, 180, 180 - HH_SPREAD];
/// 여섯이 세로로 벌어지는 몫의 최대치 — `hhLayout()` 의 세로 반지름이 이걸로
/// 나뉜다. 극이 비어 있어 창틀에 닿는 것은 타원 반지름 자체가 아니라 **제일
/// 위 판이 실제로 올라가는 몫**이기 때문이다.
const HH_SINMAX = Math.max(...HHPOS.map((d) => Math.abs(Math.sin(d * Math.PI / 180))));
/// 허브 고리와 패널 사이의 빈 부채꼴 여섯 — 참조의 「[24] [45]」류 흩어진 미세
/// 판독값이 여기 앉는다. **`HHPOS` 에서 파생한다**(손으로 다시 적으면 자리가
/// 갈린다): 각도를 0~360 으로 접어 정렬한 뒤 이웃 둘의 한가운데를 잡는다
/// (마지막 짝은 360 을 넘어 첫째로 돌아온다) ⇒ 판이 앉은 각과 절대 안 겹치고,
/// 제일 넓은 두 틈(±90°)이 판을 뺀 극을 채운다.
const HH_GAPDEG = (() => {
  const s = HHPOS.map((d) => ((d % 360) + 360) % 360).sort((a, b) => a - b);
  return s.map((d, i) => (i === s.length - 1 ? (d + s[0] + 360) / 2 : (d + s[i + 1]) / 2));
})();

// ── ⭐⭐ 판이 앉는 타원 — **자는 화면이 아니라 캐릭터다** ──────────────────
// ⚠️⚠️ 2026-08-27 사용자 판정: 「능력치를 캐릭터 주변으로 땡기라고 했잖아.
//   지금은 화면의 끝에 다 가 있는데」. 그 전까지 이 파일은 `Rx` 를 **창틀에서
//   역산**했다(`(cx − 레일) − 판폭/2 − 여백`). 788 폭에서 그 값이 **313** 인데
//   판 폭이 88 이라 왼쪽 판이 `66~154`, 오른쪽 판이 `692~780` 이다 — 캔버스가
//   788 이니 **양쪽 다 끝에서 6~8px**. 즉 그 수식은 「제일 멀리」의 다른 이름
//   이었고, 캐릭터와 판 사이에 큰 빈 띠가 남았다.
// ⇒ 이제 **몸 크기의 배수**로 잡는다. `HH_HEROPX` 가 이 화면에서 유일하게
//   「캐릭터가 얼마나 큰가」를 아는 수이므로, 판까지의 거리를 그 배수로 적으면
//   **몸이 커지면 판도 같이 물러나고** 창 크기가 바뀌어도 비가 안 흔들린다.
//   창틀은 이제 **상한**으로만 쓴다(넘치면 깎는다) — 목표가 아니다.
//
// ⭐ **`HH_RXF` 하나가 두 시안을 잰다.** `mockup-hud-roster.js`(안 A)도 같은
//   배치를 쓰는데, 두 파일이 각자 수식을 들면 다음에 또 갈린다 — 그쪽은 이
//   값을 **읽어 간다**(`hrStats` 머리말). 여기가 정본이다.
//
// ⚠️⚠️ **두 수의 단위가 같다 — 둘 다 「몸의 몇 배」다.** 엔진이 이 둘을 그대로
//   들고 있으므로(`lib/ui/home_deco.dart` 의 `kHomeStatRxPerHero` ·
//   `kHomeStatRyPerHero`) 한쪽을 「가로의 몇 배」로 적으면 옮겨 심을 때 조용히
//   갈린다. 「세로/가로」로 적고 싶어도 여기서는 참는다.
//
// ⚠️ `HH_RXF` 는 **눈으로 골랐다**(788·1029 두 폭에서 나란히 굽고 골랐다,
//   2026-08-27). 기하가 정하는 하한은 `허브 52 + 여백 + 판폭/2 44 ≈ 104`
//   (= 몸의 0.67배)이고, 옛 창틀 역산값이 313(= 2.006배 = 화면 끝)이었다.
//   ⭐⭐ **1.30 의 하한을 정하는 것은 눈이 아니라 인출선이다.** 이 화면의
//     연결선은 「수평 직선 · 45° 사선 · 수평 직선」인데(사용자 확정), 45° 를
//     지키려면 사선이 **세로만큼 가로도** 먹어야 한다. 위·아래 갈래가 써야 하는
//     세로가 `Ry·sin50 − 도선 = 34.6` 이고 사선이 가져갈 수 있는 가로 몫이
//     `가로 × HH_DIAGMAX(0.55)` 이라, 가로가 63 아래로 떨어지면 사선이 세로를
//     다 못 먹고 **수직 직선 한 토막이 끼어든다** — 그 순간 열 가닥 중 넷만
//     딴 문장을 쓴다. 그 자리가 `HH_RXF = 1.016` 이고 1.30 은 그 위 28% 다.
//     ⚠️ 계약이 깨지기 전에 **직선이 먼저 안 읽힌다** — 1.016 에서 사선 앞뒤
//       직선이 12px·16px 까지 줄어 「직선」이 아니라 모서리가 된다. 1.30 은
//       24px·33px 이다.
//     ⚠️ `HH_RYF` 를 올리면 이 하한도 같이 올라간다(0.778 이면 1.230).
//   ⭐ 1.30 이면 판 안쪽 모서리가 중심에서 158.8 — 허브 고리(52)에서 107px,
//     몸 상자 모서리(78)에서 81px 이 뜬다.
const HH_RXF = 1.30;
/// 세로 반지름도 **몸의 배수**다(가로의 배수가 아니다 — 위 머리말).
///
/// ⚠️⚠️ **가로만 당기면 안 된다.** 옛 값은 `0.778`(= 시안 788×364 의 창틀
///   상한과 같은 수)이었는데, 그건 세로도 「들어가는 데까지 민다」였다 — 제일
///   위 판의 윗변이 `y 34` 라 톱바(26)에서 **8px**, 즉 세로로도 화면 끝이었다.
///   0.68 이면 그 윗변이 `y 45.7` 로 내려와 톱바에서 20px 이 뜨고, 여섯이
///   **창틀이 아니라 캐릭터를 두른 것**으로 읽힌다.
/// ⚠️ 더 줄이면(0.60 아래) 위·아래 판이 허브 고리띠 높이로 내려와 부채가
///   납작해지고, 판과 고리 사이 41px 이 사라진다.
const HH_RYF = 0.68;

function hhLayout(W, H) {
  const cx = HH_RAILW + (W - HH_RAILW) / 2;      // `.hh-stage` 의 flex 가운데와 같은 값
  const cy = (H - HH_ROSTERH) / 2;               // `.hh-mid` 의 flex 가운데와 같은 값
  const margin = 8, hw = HH_PANEL_W / 2, hh = HH_PANEL_H / 2;
  // 창틀 상한 — **목표가 아니라 넘침 방지**다. 세로는 위(톱바)가 아래(로스터)
  // 보다 좁으니 위가 정하고, 극이 비어 창틀에 닿는 것은 `Ry` 자체가 아니라
  // `Ry × HH_SINMAX` 다. 가로는 중심이 레일과 창 가장자리의 한가운데라
  // **한 값이 양쪽을 다 잰다.**
  const RxMax = (cx - HH_RAILW) - hw - margin;
  const RyMax = (cy - HH_TOPBARH - hh - margin) / HH_SINMAX;
  const Rx = Math.min(HH_HEROPX * HH_RXF, RxMax);
  const Ry = Math.min(HH_HEROPX * HH_RYF, RyMax);
  return { cx, cy, hubR: HH_HUBR, Rx, Ry };
}

/// 3자리까지 세어 오르는 정수 카운트업 — 단조 증가(`Math.min(1,t/dur)`)라
/// 되풀이가 없다. 루프가 아니므로 이음매를 걱정할 자리가 아니다.
function hhCountUp(target, t, dur) {
  const p = hudEase(Math.min(1, t / (dur || 1.1)));
  return Math.round(target * p);
}
/// 값 문자열에서 앞쪽 숫자만 뽑아 카운트업하고 나머지 꼬리(단위)는 그대로 둔다.
function hhCountStr(v, t) {
  const m = String(v).match(/^([\d,]+)(.*)$/);
  if (!m) return v;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  return hhCountUp(n, t).toLocaleString("en-US") + m[2];
}
/// 결정론적 미세 판독값 숫자 — 난수 0건 관례(`hash` 만 쓴다).
function hhNum(seed, digits) {
  return String(Math.floor(hash(seed) * Math.pow(10, digits))).padStart(digits, "0");
}

// ── 인출선 — **직선 + 사선**으로 꺾는 회로 도선 ───────────────────────────
// ⚠️⚠️ 공용 `hudLeader`(`hud.js`)는 **한 번**만 꺾고 그 한 번이 직각이다.
//   ⇒ `hudLeader` 를 고치지 않고 **여기서만** 다르게 꺾는다 — 그 함수는 강화·
//     상점·도감·일지 넉 장이 같이 쓰므로, 고치면 남의 화면이 같이 바뀐다.
//
// ⭐ **한 문장으로 열 갈래를 다 짓는다: 긴 축(가로)은 직선으로 달리고, 짧은
//   축(세로)은 45° 사선이 먹는다** ⇒ **수평 직선 · 사선 · 수평 직선**. 계단
//   (직각만)은 밋밋하고 사선만 쓰면 회로가 아니라 거미줄이 되므로, 둘을 **한
//   가닥 안에서** 섞는다. 여섯 판도 귀퉁이 넷도 가로가 긴 자리라 갈래는 하나면
//   된다 — 사선 각도가 갈리면 열 가닥이 서로 딴 언어를 쓴다.
// ⚠️ 가운데 두 판(0°·180°)만 세로 몫이 0 이라 사선이 안 생긴다 — 그 둘은 허브에서
//   곧게 나가는 **중앙 간선**이고, 위·아래 넷이 거기서 갈라져 나온 것으로 읽힌다.
// ⚠️⚠️ **흐르는 빛은 길이 기준(`hudPolyPoint`)으로 얹는다** — 각도나 마디
//   번호로 얹으면 꺾이는 자리마다 속도가 튄다. 사선을 섞어도 그 계약은 그대로다.
const HH_STUB = 9;      // 고리에서 떼는 방사 도선
/// **사선 앞 수평 직선이 남은 가로에서 차지하는 몫** — 사선을 가운데보다 조금
/// 앞에 두면 패널 쪽 직선이 길게 남아 「붙었다」가 또렷하다.
const HH_RUNF = 0.42;
/// 귀퉁이 갈래의 사선 자리는 **상수가 아니라 판이 정한다.**
///
/// ⚠️⚠️ 여기 `0.86` 이 박혀 있었다. 그 수는 판이 **화면 끝(`Rx 313`)** 에
///   있을 때만 맞는 답이었다 — 판을 캐릭터 쪽으로 당기자(`HH_RXF`) 허브 높이의
///   수평 직선이 **가운데 판을 뚫고 지나가** 판 뒤로 들어갔다 다시 나왔다
///   (`Rx 203` 에서 실측: 그 직선이 `x 193~264`, 가운데 왼쪽 판이 `x 176~264`).
///   ⇒ 「어디서 꺾나」는 **판이 어디 있나**의 함수다. 다시 못 박지 마라.
///
/// ⭐ 규칙 한 줄: **허브 높이의 직선은 가운데 판의 안쪽 모서리 앞에서 멈춘다.**
///   귀퉁이로 가는 갈래는 허브를 거의 수평으로 떠나(각이 얕다) 가운데 판과 같은
///   높이를 달리므로, 거기서 꺾어 올라가면 남은 길은 위·아래 판보다 **바깥
///   위/아래**를 지나 귀퉁이에 닿는다.
/// ⚠️ 위아래 상한은 옛 값(0.86)과 눈에 보이는 최소 몫(0.08)이다 — 판이 아주
///   멀면 규칙이 사선을 끝까지 밀어 마지막 직선이 없어지고, 아주 가까우면
///   사선이 허브에 붙는다.
const HH_RUNF_CORNER_MIN = 0.08, HH_RUNF_CORNER_MAX = 0.86;
/// 가운데 판 안쪽 모서리에서 이만큼 앞에서 꺾는다 — 0 이면 선과 판이 맞닿는다.
const HH_CORNER_CLEAR = 14;
/// 귀퉁이 갈래 하나의 `runf`. `ax` 는 방사 도선이 끝나는 x, `dirx` 는 나아가는
/// 쪽(±1), `adx`·`dg` 는 남은 가로와 사선이 먹을 몫이다 — 넷 다 [hhRoute] 가
/// 제 안에서 이미 잰 값을 그대로 넘겨 준다(밖에서 다시 재면 두 벌이 된다).
function hhCornerRunf(L, ax, dirx, adx, dg) {
  const run = adx - dg;
  if (run <= 1) return HH_RUNF_CORNER_MAX;
  // 꺾는 자리 = 가운데 판 안쪽 모서리에서 `HH_CORNER_CLEAR` 만큼 허브 쪽.
  const bx = L.cx + dirx * (L.Rx - HH_PANEL_W / 2 - HH_CORNER_CLEAR);
  const f = (bx - ax) / (dirx * run);
  return Math.max(HH_RUNF_CORNER_MIN, Math.min(HH_RUNF_CORNER_MAX, f));
}
/// 사선이 45° 를 지키느라 가로를 이만큼 넘게 먹으면, 넘는 몫은 수직 직선에
/// 넘긴다 — 안 그러면 세로가 가파른 갈래에서 사선이 가로를 통째로 삼킨다.
const HH_DIAGMAX = 0.55;

/// 꺾인 길의 꼭짓점 목록. 그리기는 [hhWire] 가 한다 — 좌표와 잉크를 가른다.
/// `runf` 는 수 하나이거나 **함수**다(`(ax, dirx, adx, dg) => 몫`) — 귀퉁이
/// 갈래처럼 「어디서 꺾나」가 판 자리에 매인 갈래가 `ax`·`dg` 를 여기서 받아
/// 간다. 그걸 밖에서 다시 재면 사선 몫이 두 벌이 된다.
function hhRoute(x0, y0, x1, y1, rad, runf) {
  const ax = x0 + Math.cos(rad) * HH_STUB, ay = y0 + Math.sin(rad) * HH_STUB;
  const dx = x1 - ax, dy = y1 - ay;
  const sx = dx < 0 ? -1 : 1, sy = dy < 0 ? -1 : 1;
  const adx = Math.abs(dx), ady = Math.abs(dy);
  const dg = Math.min(ady, adx * HH_DIAGMAX);         // 45° 라 사선이 먹는 가로 = 세로
  const f = typeof runf === "function" ? runf(ax, sx, adx, dg) : (runf == null ? HH_RUNF : runf);
  const bx = ax + sx * (adx - dg) * f;
  const ex = bx + sx * dg;
  const pts = [[x0, y0], [ax, ay]];
  if (dg > 0.5) pts.push([bx, ay], [ex, ay + sy * dg]);
  if (ady - dg > 0.5) pts.push([ex, y1]);             // 사선이 못 먹은 세로는 수직 직선이 받는다
  pts.push([x1, y1]);
  return pts;
}

/// 꺾인 길 하나를 긋고 꺾이는 자리마다 접속 노드를 박는다.
function hhWire(c, pts, o) {
  const a = o.alpha == null ? 0.35 : o.alpha;
  c.save();
  c.strokeStyle = A(HUDLINE, a); c.lineWidth = o.w || 1; c.lineJoin = "miter";
  c.beginPath();
  pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
  c.stroke();
  c.restore();
  if (o.node === false) return pts;
  // 꺾이는 자리 — 작게. 끝 — 한 단 크게(「여기 붙었다」가 도착점이라는 표시).
  for (let i = 1; i < pts.length - 1; i++) hudNode(c, pts[i][0], pts[i][1], o.nodeR || 1.5, { alpha: a * 1.25 });
  hudNode(c, pts[pts.length - 1][0], pts[pts.length - 1][1], (o.nodeR || 1.5) * 1.4, { alpha: a * 1.7 });
  return pts;
}

/// 패널 하나 — 각진 틀 + 라벨 + 카운트업 값 + 작은 레벨 다이얼. 이 여섯
/// 개는 **실제로 읽어야 하는** 것이라 장식과 달리 알파를 낮추지 않는다.
function hhPanel(c, x, y, w, h, label, valueStr, lv, lvMax, tAbs, alpha) {
  c.save(); c.globalAlpha = alpha;
  const cut = 7;
  c.beginPath();
  c.moveTo(x + cut, y); c.lineTo(x + w, y); c.lineTo(x + w, y + h - cut);
  c.lineTo(x + w - cut, y + h); c.lineTo(x, y + h); c.lineTo(x, y + cut); c.closePath();
  c.fillStyle = A(HUDBASE, 0.92); c.fill();
  c.strokeStyle = A(HUDLINE, 0.55); c.lineWidth = 1; c.stroke();
  c.textAlign = "left"; c.font = hudFont(600, 8); c.fillStyle = A(HUDDIM, 1);
  lbText(c, label, x + 8, y + 12);
  c.font = hudFont(700, 15); c.fillStyle = HUDINK;
  lbText(c, hhCountStr(valueStr, tAbs), x + 8, y + h - 9);
  hudDial(c, x + w - 15, y + h / 2 + 2, 10, hudCl((lv || 0) / (lvMax || 99)), { w: 2, label: false });
  c.restore();
}

// ── 귀퉁이 데이터 블록 — 화면 네 귀퉁이에 박히는 순수 장식 ───────────────
// 허브를 도는 것이 아니라 **화면 자체의 귀퉁이**에 붙는 계기다(참조 세 장
// 전부 이 자리에 서로 다른 위젯을 하나씩 둔다). 넷이 똑같으면 「복사한
// 장식」으로 읽히므로 `style` 로 두 벌(원형 눈금+막대 / 궤도 고리+파형)을
// 돌려쓴다. 반환하는 (rx,ry) 는 허브에서 여기로 뻗는 인출선의 도착점이다.
// ⚠️ 귀퉁이는 `.hudvig` 비네트(가장자리를 죽이는 CSS 레이어, `hud.js` ①절)가
// 가장 세게 어둡히는 자리다 — 실측(헤드리스 캡처 후 픽셀 대조)해 보니
// 중앙부와 같은 알파를 줬더니 귀퉁이 블록이 사실상 안 보였다. 그래서
// 이 함수의 알파는 중앙 허브보다 한 단 높게 잡는다 — 비네트를 뚫고
// 나와야 「장식」이 아니라 「보이는 밀도」가 된다.
function hhCornerCluster(c, x, y, sx, sy, seed, tAbs, style) {
  const rx = x + sx * 15, ry = y + sy * 15, rr = 12;
  if (style === 0) {
    hudTicks(c, rx, ry, rr, 16, { len: 2.4, bigLen: 5.5, every: 4, alpha: 0.72 });
    hudRing(c, rx, ry, rr * 0.6, { dash: [1, 3], alpha: 0.55, w: 1 });
  } else {
    hudRing(c, rx, ry, rr, { alpha: 0.48, w: 1.2 });
    hudOrbit(c, rx, ry, rr * 1.15, rr * 0.62, tAbs * (sx * sy) * 0.6, { speed: 0.35, dots: 1, alpha: 0.52, dotR: 1.6 });
  }
  const align = sx > 0 ? "left" : "right", tx = x + sx * 33;
  hudTag(c, tx, y + sy * 2, "SECTOR " + hhNum(seed, 2), { align, alpha: 0.64 });
  hudTag(c, tx, y + sy * 14, "[" + hhNum(seed + 5, 3) + "]", { align, alpha: 0.46 });
  const gw = 44, gh = 13, gx = sx > 0 ? tx : tx - gw, gy = sy > 0 ? y + 21 : y - 21 - gh;
  if (style === 0) hudBars(c, gx, gy, gw, gh, null, { t: tAbs * 0.6 + seed, n: 7, alpha: 0.44 });
  else hudWave(c, gx, gy, gw, gh, tAbs * 0.7 + seed, { speed: 0.9, alpha: 0.46 });
  return { rx, ry };
}

/// 결정론적 별 몇 점 — 배경의 아주 옅은 결(참조 넉 장 전부 별 입자가
/// 깔려 있다). 난수 0건 관례라 `hash` 로만 뽑는다.
/// ⚠️ 실측(헤드리스 캡처 후 픽셀 대조) — 최초 값(반지름 0.5~1.4, 알파
/// .04~.13)은 스크린샷에서 **가장 밝은 별조차 배경과 거의 안 갈렸다**(대비
/// 델타 한 자릿수). 반지름·알파를 둘 다 올려 낱개 점으로 실제로 읽히게 한다
/// — 그래도 고리·라벨보다는 한참 아래(가장 옅은 장식보다도 옅게 유지).
const HH_STAR_N = 42;
function hhStars(c, W, H) {
  for (let i = 0; i < HH_STAR_N; i++) {
    const x = hash(i * 12.9 + 41) * W, y = hash(i * 7.1 + 44) * H;
    const r = 0.7 + hash(i * 3.3 + 47) * 1.3;
    c.fillStyle = A("#CFE8FF", 0.16 + hash(i * 5.7 + 49) * 0.26);
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
}

// ── ⚠️⚠️ 이 파일은 **두 장이 싣는다** ────────────────────────────────────
// 본디 자리는 홈(`mockup-hud-home.html`)이고, 캐릭터 고르기 장
// (`mockup-hud-roster.html`)이 **`HH_RXF`·`HH_RYF` 를 읽으려고** 한 벌 더 싣는다
// (그 장 머리말의 「값 하나를 두 장이 나눠 쓴다」). 거기엔 `hh-*` 호스트가 없다.
//
// ⚠️ `$` 는 없는 id 에 **떨어진 캔버스**를 돌려주므로(`vfx.js` 머리말) 조립이
//   그대로 돌아도 그리기 비용은 0 이다. 그래도 **등록된 칸이 27개 늘어난다** —
//   프레임 루프가 매번 그만큼 더 돌고 스모크가 세는 수도 같이 는다.
//   ⇒ 호스트가 없으면 **조립 자체를 건너뛴다.** 값(상수·함수)은 그대로 남는다.
// ⚠️ 여기만 `$` 가 아니라 `document.getElementById` 를 직접 쓴다 — `$` 는 없는
//   것을 없다고 말해 주지 못한다(그게 그 함수의 일이다).
const HH_MOUNTED = !!document.getElementById("hh-bg");

// ── 배경 — 큰 허브 + 흩어진 연결선·귀퉁이 블록·미세 라벨 + HSTAT 여섯 ───
// 그림 순서 자체가 위계다: 별 → 귀퉁이 장식 → 허브 → 허브발 인출선 → 틈새
// 라벨(전부 장식, 낮은 알파) 순으로 **먼저** 깔고, 실제로 읽어야 하는
// HSTAT 인출선+패널은 **맨 나중에** 그려 장식 위에 얹는다.
if (HH_MOUNTED) { const bg = $("hh-bg");
  if (bg) mk(bg, [788, 364], function hhBg(c, tAbs, dt, W, H) {
    c.fillStyle = HUDBASE; c.fillRect(0, 0, W, H);
    hhStars(c, W, H);
    const L = hhLayout(W, H), cx = L.cx, cy = L.cy, hubR = L.hubR;
    const lvMax = typeof kStatLevelMax !== "undefined" ? kStatLevelMax : 99;

    // ① 뷰파인더 브래킷 — 레일·톱바·로스터에 안 가리는 「안쪽 사각」의
    // 네 귀퉁이(참조 넉 장 전부의 바깥 프레임과 같은 자리). 좌표는 전부
    // 레일 폭·톱바 높이·로스터 높이에서 뽑는다.
    hudBracket(c, HH_RAILW + 6, HH_TOPBARH + 4, W - HH_RAILW - 12, H - HH_TOPBARH - HH_ROSTERH - 8, 16,
      { w: 1.7, alpha: 0.70 });

    // ② 귀퉁이 데이터 블록 넷 — 서로 다른 위젯(원형 눈금+막대 / 궤도 고리
    // +파형)을 번갈아 쓴다. 이 좌표 넷만 허브 중심이 아니라 화면 자체의
    // 귀퉁이에서 파생한다(성격이 다른 것이라 예외다) — 그래도 손으로 박은
    // 상수가 아니라 W·H·레일폭·톱바높이·로스터높이의 수식이다.
    // ⚠️ 브래킷과 안 겹치게 26/22px 더 안쪽에 앉힌다 — 실측(헤드리스
    // 캡처)해 보니 처음엔 둘이 거의 같은 자리라 브래킷의 작은 L 이 블록의
    // 눈금·고리에 파묻혀 안 보였다. 바깥 테두리(브래킷)와 안쪽 판독값
    // (블록)이 한 자리를 다투면 밀도가 아니라 뭉갬이 된다.
    const cTL = hhCornerCluster(c, HH_RAILW + 26, HH_TOPBARH + 22, 1, 1, 4, tAbs, 0);
    const cTR = hhCornerCluster(c, W - 26, HH_TOPBARH + 22, -1, 1, 12, tAbs, 1);
    const cBL = hhCornerCluster(c, HH_RAILW + 26, H - HH_ROSTERH - 22, 1, -1, 21, tAbs, 1);
    const cBR = hhCornerCluster(c, W - 26, H - HH_ROSTERH - 22, -1, -1, 33, tAbs, 0);
    // 귀퉁이를 가로지르는 옅은 대각선 하나 — 참조가 흔히 보이는 「프레임을
    // 가로지르는 긴 선」. 아주 옅어서(0.07) 장식 중에서도 가장 뒤에 깐다.
    c.save(); c.strokeStyle = A(HUDLINE, 0.07); c.lineWidth = 1;
    c.beginPath(); c.moveTo(HH_RAILW + 8, H - HH_ROSTERH - 8); c.lineTo(W - 8, HH_TOPBARH + 6); c.stroke();
    c.restore();

    // ③ 허브 — 캐릭터(`#hh-hero`, 156px 상자 반 78 ≈ hubR*1.5)가 이 고리
    // 묶음보다 커서 살짝 넘치는 것은 일부러다 — 「고리 안에 작게 든 것」이
    // 아니라 「주인공이 고리를 뚫고 나온 것」으로 읽혀야 한다.
    // ⚠️ 그래서 반지름을 **전부 hubR 이상**으로 잡는다 — hubR 안쪽에 그린 겹은
    // 캐릭터 몸에 완전히 덮여 안 보인다. 캐릭터를 뚫는 게 목적이면 고리는
    // 뚫려 **나오는 자리**(hubR 밖)에 있어야 실제로 밀도로 보인다.
    // ⚠️⚠️ **겹 수는 띠 폭이 정한다.** 지금 띠는 `52~66.6`(14.6px)이고 다섯
    //   겹이라 간격이 ~3.4px 다 — 여기에 일곱을 쌓으면 간격이 2px 로 뭉개져
    //   회색 띠 하나가 된다. 밀도는 잉크의 양이 아니라 **셀 수 있는 겹의 수**로
    //   읽힌다.
    hudRing(c, cx, cy, hubR, { alpha: 0.34, w: 1.6 });                                 // 고리 1 — 굵은 외곽
    hudTicks(c, cx, cy, hubR * 1.07, 60, { len: 4, bigLen: 9, every: 5 });             // 눈금 고리 — 정지
    hudRing(c, cx, cy, hubR * 1.14, { alpha: 0.22, w: 1, dash: [1, 5] });              // 고리 2 — 점선
    hudSectorRing(c, cx, cy, hubR * 1.21, 16, { alpha: 0.22 });                        // 고리 3 — 부챗살 세그먼트
    c.save(); c.translate(cx, cy); c.rotate(-tAbs * 0.07);
    hudTicks(c, 0, 0, hubR * 1.28, 16, { len: 6, bigLen: 6, every: 999, alpha: 0.16 }); // 눈금 고리 — 역회전(성긴)
    c.restore();
    // 극 눈금 한 쌍 — 참조의 크로스헤어 중 **세로만** 남긴다. 가로축은 가운데
    // 두 판으로 가는 간선(⑥)이 이미 달리는 길이라 거기 그은 눈금은 선 밑에
    // 깔려 안 보인다. 남은 한 쌍이 판을 뺀 극을 채우되, 같은 자리의 틈새
    // 라벨(⑤, 반지름 1.42)보다 **바깥**에 서야 글자를 안 가른다.
    c.strokeStyle = A(HUDLINE, 0.14); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx, cy - hubR * 1.82); c.lineTo(cx, cy - hubR * 1.62);
    c.moveTo(cx, cy + hubR * 1.62); c.lineTo(cx, cy + hubR * 1.82);
    c.stroke();
    gHalo(c, cx, cy, hubR * 0.5, HUDK, 0.30 + 0.10 * Math.sin(tAbs * 1.6));
    // 궤도 둘 — 허브~패널 사이 빈 띠를 옆으로 눌린 궤도로 채운다(참조의
    // 「사방으로 층층이 겹친 고리」). 반지름은 L.Ry 안에서만 잡아 패널
    // 자리를 침범하지 않는다. 둘째 궤도는 이심률·회전 방향을 반대로 줘서
    // 「복사한 고리」로 안 보이게 한다 — ry 가 hubR 보다 작아 캐릭터 위아래를
    // 살짝 파고드는 것도 일부러다(참조의 「몸 뒤로 숨었다 나오는 궤도」).
    hudOrbit(c, cx, cy, Math.min(L.Rx, hubR * 2.6), hubR * 1.35, tAbs, { speed: 0.10, alpha: 0.14, dots: 2, dotR: 2.2 });
    hudOrbit(c, cx, cy, hubR * 1.70, hubR * 0.95, -tAbs, { speed: 0.16, alpha: 0.12, dots: 3, dotR: 1.6 });

    // ④ 허브 → 귀퉁이 인출선 **넷** — 대각으로 교차해 참조의 「프레임을
    // 가로지르는 굵은 선」느낌을 허브 쪽에서도 만든다. 시작점은 허브 고리
    // 가장자리에서, 그 귀퉁이를 향한 각도로 계산한다(손으로 안 박는다).
    // ⚠️⚠️ **둘이었는데 넷이 됐다.** 판을 캐릭터 쪽으로 당기자(`HH_RXF`) 판과
    //   귀퉁이 블록 사이가 크게 비었는데, 그 띠가 제일 넓은 실기(1029×480)에서
    //   TL·BR 두 가닥만 있으니 **한쪽 대각만 이어진 화면**으로 읽혔다(나머지 두
    //   블록은 허브와 아무 관계도 없는 것처럼 떠 있었다). 넷이면 그 띠가
    //   회로로 차고 귀퉁이 계기 넷이 전부 허브에 매인 것이 된다.
    // ⚠️ 여섯 패널 인출선과 **같은 언어**여야 한다 — 하나만 한 번 꺾으면 그
    //   하나가 딴 그림이 된다. 같은 `hhRoute` 를 쓰고 알파만 낮추되, 사선 자리만
    //   `hhCornerRunf` 가 **판 자리에서 매번 다시 재** 판 뒤를 안 지나게 한다.
    [cTL, cTR, cBL, cBR].forEach((pt) => {
      const a = Math.atan2(pt.ry - cy, pt.rx - cx);
      const x0 = cx + Math.cos(a) * hubR * 1.05, y0 = cy + Math.sin(a) * hubR * 1.05;
      const rf = (ax, dirx, adx, dg) => hhCornerRunf(L, ax, dirx, adx, dg);
      hhWire(c, hhRoute(x0, y0, pt.rx, pt.ry, a, rf), { alpha: 0.15, w: 1, nodeR: 1.3 });
    });

    // ⑤ 허브 고리띠 바로 밖, 여섯 패널과의 틈새에 미세 판독값을 심는다
    // (참조의 「[24] [45]」류). `HH_GAPDEG` 가 `HHPOS` 의 이웃 사이를 잡으므로
    // **패널이 앉은 각도와 절대 안 겹치고**, 제일 넓은 두 틈(±90°)이 판을 뺀
    // 극에 하나씩 선다 — 그 둘은 극 눈금(③)보다 안쪽(1.42 < 1.62)이다.
    HH_GAPDEG.forEach((deg, i) => {
      const a = deg * Math.PI / 180, gr = hubR * 1.42;
      hudTag(c, cx + Math.cos(a) * gr, cy + Math.sin(a) * gr, "[" + hhNum(60 + i, 2) + "]",
        { align: "center", alpha: 0.30 });
    });

    // ⑥ 여섯 연결선 + HSTAT 패널 — **맨 나중에** 그려 위 장식 전부의 위에
    // 얹는다. 좌표는 전부 `cx,cy,L.Rx,L.Ry` 에서만 파생한다(패널마다 다른
    // 상수를 쓰지 않는다 — 자리가 갈리는 것은 늘 거기서 시작한다). 연결선은
    // 수평 직선과 45° 사선을 한 가닥 안에서 섞고 마디마다 접속 노드가 박힌다
    // (참조 문법) — 흐르는 빛은 꺾인 자리도 속도가 안 튀도록 길이
    // 기준(`hudPolyPoint`)으로 얹는다.
    HHPOS.forEach((aDeg, i) => {
      const rad = aDeg * Math.PI / 180;
      const ex = cx + Math.cos(rad) * L.Rx, ey = cy + Math.sin(rad) * L.Ry;
      const x0 = cx + Math.cos(rad) * hubR, y0 = cy + Math.sin(rad) * hubR;
      const pts = hhWire(c, hhRoute(x0, y0, ex, ey, rad), { alpha: 0.42, w: 1.1, nodeR: 1.6 });
      const uu = (tAbs * 0.35 + i * 0.31) % 1;
      const fade = hudEase(Math.min(1, uu / 0.15)) * hudEase(Math.min(1, (1 - uu) / 0.15));
      if (fade > 0.02) { const p = hudPolyPoint(pts, uu); gHalo(c, p[0], p[1], 2.6, HUDK, fade); }

      const s = (typeof HSTAT !== "undefined") && HSTAT[i];
      if (s) hhPanel(c, ex - HH_PANEL_W / 2, ey - HH_PANEL_H / 2, HH_PANEL_W, HH_PANEL_H, s.k, s.v, s.lv, lvMax, tAbs, 1);
    });
  }, { clear: true });
}

// ── 캐릭터 — 실제 몸 그리기 함수를 그대로 부른다(사본 없음). 허브 안에
//    서서 화면의 주인공이 되도록 이전 판보다 크게 세운다. ─────────────────
// ⚠️ 캔버스 내부 해상도는 표시 크기의 딱 두 배로 잡는다(선명도) — 몸의 코어
//   반지름은 `min(W,H)*.30` 이라 **표시 크기에만** 매인다.
if (HH_MOUNTED) { const hero = $("hh-hero");
  if (hero) mk(hero, [HH_HEROPX * 2, HH_HEROPX * 2], function hhHero(c, t, dt, W, H, st) {
    hhDraw(HHMAIN)(c, t, dt, W, H, st);
  }, { clear: true });
}

// ── 로스터 — 클릭하면 실제로 메인이 바뀐다. ──────────────────────────────
// ⚠️⚠️ **「그림 없음」 칸이 없다.** 열여덟이 전부 같은 몸에 톤만 다르므로
//   그릴 수 없는 칸이 안 생긴다(`hhDraw` 머리말).
// ⚠️ 상태는 **둘**이고 밝기로만 갈린다 — 엔진과 같은 값이다
//   (`ui/home_roster.dart` 의 `dim`): 보유 1.0 · 미보유 .42. 엔진에는 셋째
//   (`보유했지만 아직 못 나감` .55)가 있지만 오늘 그 상태인 캐릭터가 없다 —
//   시안에 없는 상태를 지어 그리지 않는다.
if (HH_MOUNTED) { const host = $("hh-roster");
  if (host) {
    // ⚠️ 열여덟은 어느 폭에서도 한 줄에 안 들어간다(칸 52 × 18 = 936).
    //   그래서 **가로로 굴린다** — 엔진이 낸 같은 답이고(`home_roster.dart`
    //   머리말의 셋), 굴릴 자리를 만드는 안쪽 띠가 `#hh-rosrow` 다.
    const row = document.createElement("div"); row.id = "hh-rosrow";
    host.appendChild(row);
    HHROSTER.forEach((r) => {
      const b = document.createElement("div");
      b.className = "hh-ros" + (r.own ? "" : " lock") + (r.key === HHMAIN ? " sel" : "");
      b.dataset.key = r.key;
      const cv = document.createElement("canvas"); cv.className = "hh-roscv";
      b.appendChild(cv);
      const nmEl = document.createElement("div"); nmEl.className = "nm"; nmEl.textContent = r.nm;
      b.appendChild(nmEl);
      row.appendChild(b);
      mk(cv, [96, 96], hhDraw(r.key), { clear: true });
      if (r.own) b.addEventListener("click", () => {
        HHMAIN = r.key;
        row.querySelectorAll(".hh-ros").forEach((x) => x.classList.toggle("sel", x.dataset.key === r.key));
        const nm = $("hh-mainname"); if (nm) nm.textContent = r.nm;
      });
    });
  }
}

// ── 설정 톱니 · 레일 ─────────────────────────────────────────────────────
if (HH_MOUNTED) { const h = $("hh-set");
  if (h) { const cv = document.createElement("canvas");
    cv.style.width = "18px"; cv.style.height = "18px"; h.appendChild(cv);
    mk(cv, [18, 18], function hhGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true }); } }
if (HH_MOUNTED) hudRail("hh-rail", "home");
