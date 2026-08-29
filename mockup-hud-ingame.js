// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-ingame.js — 화면 「판 안 HUD」(경험치 바 · 시간 · 퀵슬롯)
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `IG`/`ig` 로 격리한다.
//
// ── 이 장이 답하는 질문 ──────────────────────────────────────────────────
// 「싸우는 화면 위에 얹히는 것들이 **로비와 한 식구**로 보이려면 어떻게 생겨야
//  하나.」 사용자 판정(2026-08-27): 「인게임 내에서 경험치바, 시간, 퀵슬롯 UI
//  좀 촌스러운데 무드에 맞게 고쳐 줄 수 있나」.
//
// ⚠️⚠️ **이 화면은 로비가 아니다.** `hud.js` 의 창(레일 · 격자 · 스캔라인 ·
//   비네트 · `.hudpanel`)은 **가만히 서서 고르는 방**의 문법이고, 여기는
//   **적이 오는 판**이다. 그래서 이 파일은 키트에서 **말투만** 빌리고
//   (냉광 삼색 · 각진 클립 · 눈금 · 앞머리 · 브래킷) **창은 안 빌린다.**
//   판을 덮는 반투명 판은 한 장도 없다 — 받침은 글자와 칸에 딱 붙는 것뿐이다.
//
// ⚠️⚠️ **칠한 면적이 곧 성능이다.** 이 레포 실측이 `raster` p95 18.24ms vs
//   `build` p95 0.49ms(37배)다. HUD 는 매 프레임 전부 그려지므로 **덮은 넓이가
//   그대로 프레임을 먹는다.** ⇒ 안마다 「가린 면적」을 [IGPLAN] 의 `geo()` 한
//   군데에서 뽑아 재고, 그 **같은 사각**을 painter 가 그린다 — 장부와 그림이
//   갈라질 수 없게 묶어 둔 것이다(수를 손으로 적으면 반드시 거짓말이 된다).
//
// ── 채택안 D ─────────────────────────────────────────────────────────────
//   ⭐ 안 셋(A 난간 · B 계기판 · C 위아래)을 사용자가 보고 **D 를 손으로 조립**
//     했다(2026-08-28). 셋은 그날 걷었다 — 내력은 [IGPLAN] 머리말.
//   D 는 **네 자리가 뜻으로 갈린다**: 왼쪽 위 = 내 상태 + 편성 · 버프 /
//     12시 = 시간 / 오른쪽 위 = 번 것 / 아래 = 쓰는 것(스킬 5칸).
//
// ── 값은 한 줄도 새로 안 짓는다 ─────────────────────────────────────────
// 정원 · 상한 · 시계는 전부 엔진에서 읽어 [IGSNAP] 에 옮겨 적었다:
//   `kSlotCapStart` 3 · `kSlotCapMax` 6 · `kArmorSlots` 3 ·
//   `kWeaponLevelMax`/`kArmorLevelMax` 5 · `durationSec` 1200 · `bossAtSec` 1140.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 글꼴 — 엔진이 싣는 두 벌 그대로 ───────────────────────────────────────
// ⚠️⚠️ **판 위 숫자는 `Chakra Petch`, 한글은 `Pretendard`** 다(`lib/ui/app.dart`
//   의 `kUiFontFamily`/`kUiFontFallback`, 2026-08-27 사용자 확정). 시안이 딴
//   글꼴로 그리면 이식하는 손이 「시안이 정본」을 못 지킨다.
// ⚠️ `hudFont`(로비의 SF Mono)를 안 쓴다 — 그건 판독값용 모노스페이스고
//   여기는 **엔진이 실제로 그리는 글꼴**이라야 한다. 목적이 달라 다른 함수다.
function igFont(w, s) {
  return `${w} ${s}px "LSChakra","Chakra Petch",ui-monospace,Menlo,monospace`;
}
function igKo(w, s) {
  return `${w} ${s}px "LSPretendard","Pretendard","Apple SD Gothic Neo",sans-serif`;
}

// ── 색 — 로비의 냉광에서 **한 단 세게** ──────────────────────────────────
// ⚠️⚠️ 로비(`hud.js`)의 본문색은 `HUDINK` #D8F2FF 인데 여기는 #EAF7FF 다.
//   로비는 바탕이 늘 #050B14 라 그 값으로 충분하지만, **판 위는 바탕이 매
//   프레임 다르다** — 장판 · 폭발 · 적 무리가 지나가면 그 자리가 밝아진다.
//   ⇒ 글자·구조선을 한 단 올리고, 모든 글자가 `lbText` 로 **제 어두운 테를
//     스스로 두른다**(지도 라벨이 밝은 행성 대기에서 지워졌던 그 판정과 같은
//     자리 — `vfx.js` 의 `lbText` 머리말).
const IGINK = "#EAF7FF";               // 판 위 본문
const IGDIM = "#8FB7CE";               // 보조 글자(로비 HUDDIM 보다 한 단 밝다)
const IGLINE = HUDLINE;                // 구조선 — 로비와 **같은 값**이라야 한 식구다
const IGGLOW = HUDGLOW;                // 앞머리 · 하이라이트
const IGSEL = HUDSEL;                  // ⚠️ 상시 표시에는 안 쓴다(아래 참조)
const IGBACK = "#02060C";              // 띠의 빈 자리 — 거의 검정
const IGPAD = "#040A12";               // 받침
// 체력은 **몸의 언어**라 냉광에서 뺀다 — 엔진이 이미 쓰는 값 그대로
// (`game_layers_hud.dart` 의 `_hpFill` · `_hpFillLow`).
const IGHP = "#FFEFD9";
const IGHURT = "#FF2D55";
const IGHPLOW = 0.35;                  // 엔진과 같은 문지방(경고 링과 한 사건)
// ⚠️ 암흑물질 색은 여기 안 적는다 — 문양을 `CURGLYPH.matter` 가 그리고 그것이
//   제 색(엔진 `kHarvestArgb` 와 같은 보라)을 든다. 사본을 두면 갈라진다.

// ⚠️⚠️ **금빛(`IGSEL`)을 판 위에 상시로 두지 않는다.** 로비에서 금빛은
//   「지금 누를 수 있는 단 하나」다(`hud.js` 팔레트 머리말). 경험치 바를 늘
//   금빛으로 칠하면 판 안에 「누를 수 있는 것」이 계속 떠 있는 셈이라 그 뜻이
//   죽고, 로비로 나갔을 때 주 버튼이 안 눈에 띈다. ⇒ 금빛은 **사건**에만 쓴다:
//   경험치가 가득 차는 순간(=3택이 열리는 순간)의 한 번.
const IGFULL = 0.995;

// ══════════════════════════════════════════════════════════════════════════
// 판의 한순간 — 네 폰이 **같은 상태**를 그린다
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 넷이 다른 값을 그리면 「어느 안이 잘 읽히나」가 아니라 「어느 값이 읽기
//   쉽나」를 비교하게 된다. 값은 한 벌뿐이고, 안은 그 한 벌을 어떻게 놓느냐다.
// ⚠️ 시계는 **안 흐른다** — 이 장은 판의 한순간을 뜬 것이다. 흐르게 두면
//   갈무리마다 수가 달라져 견줄 수가 없다.
const IGSNAP = {
  lv: 12,
  xp: 0.62,
  hp: 0.46,
  left: 518,                           // 남은 초 = 8:38
  dur: 1200,                           // `stages.dart` durationSec
  bossAt: 1140,                        // `stages.dart` bossAtSec — 남은 1:00 이 보스다
  matter: 128,
  // 사용자 갈무리의 그 상태다 — 「무기 3 / 3」 · 「방어구 0 / 3」.
  // ⚠️ 무기 정원은 `run.openCap` 이라 **레벨로 열린다**(시작 3 · 만렙 6).
  //   안 열린 칸은 안 그린다 — 엔진 규칙(`equip_hud.dart`)을 그대로 지킨다.
  wcap: 3,
  weapons: [["orbit", 3], ["smg", 2], ["ward", 1]],
  acap: 3,
  armors: [],
  // ⭐⭐ **판 밖에서 정하고 판 안에서 안 바뀌는 둘**(2026-08-28 사용자 판정).
  //   일반공격(`Progress.startingWeaponId`)과 채굴(`Progress.miningKind`)은
  //   편성에서 고르고 판 안에서는 **바꿀 수가 없다.** 그래서 아래 자리 줄의
  //   큰 칸을 쓸 까닭이 없고, 「지금 뭘 들었나」만 알면 된다.
  // ⚠️ 지금 엔진 HUD 에는 이 둘이 **아예 안 뜬다**(`equip_hud.dart` 는 무기 랙과
  //   방어구 랙 둘뿐이다). 빼는 것이 아니라 **없던 것을 더하는** 자리다.
  basic: "bolt",                       // 일반공격 — `_codexIds` 첫 basic
  mine: "beam",                        // 채굴 — `MiningKind.beam` 이 기본
  // ⭐⭐ **자리 줄은 5칸 단일이다**(2026-08-28 사용자 확정: 「엔진도 결국 스킬
  //   5개로 바꾸기로 했잖아, 무기랑 방어구 구별 안 하기로 했잖아」).
  //   편성이 **일반 1 · 스킬 5 · 채굴 1** 이고, 그중 일반과 채굴은 판 안에서
  //   안 바뀌어 위 고정 칸으로 빠졌다 ⇒ 아래 줄이 드는 것은 **스킬 5** 뿐이다.
  //
  // ⚠️⚠️ **엔진은 아직 둘로 갈라져 있다** — `equip_hud.dart` 가 무기 랙
  //   (`run.weapons` · `openCap` 3→6)과 방어구 랙(`kArmorSlots` 3)을 따로 세운다.
  //   덱 쪽은 이미 「6칸 단일」로 합쳐졌는데(`balance_offers.dart` 의 `kDeckSize`
  //   머리말: 「정원이 6칸 단일이 되며 덱이 곧 칸이 됐다」) **판 안 랙만 옛
  //   가름을 이고 있다.** 이 장이 그 가름을 지운 그림이다.
  // ⚠️ 「지금」 판과 부품 견본은 [IGSNAP] 의 `weapons`·`armors` 를 그대로 쓴다 —
  //   그 둘이 재는 것은 **오늘의 엔진**이라 새 규칙으로 그리면 거짓이 된다.
  skcap: 5,
  skills: [["orbit", 3], ["smg", 2], ["ward", 1]],
  // ⭐⭐ **판에서 버는 것은 셋이다**(2026-08-28 사용자: 「암흑물질만 할 게
  //   아니고 빛의 결정도 들어가야 되는데」 · 「운석 먹은 갯수도 넣어야 되는데」).
  //   정본은 `sim/run_state.dart` 다 — 셋 다 **주운** 수이지 죽인 수가 아니다.
  //     `matterPicked`  암흑물질   — 모든 적이 떨군다
  //     `lumenPicked`   빛의 결정  — **엘리트·보스만** 떨군다(그래서 수가 작다)
  //     `stonePicked`   강화석     — 운석을 캐서 나온다(여섯 종의 합)
  // ⚠️⚠️ **「운석 먹은 갯수」를 세는 칸은 엔진에 없다.** 있는 것은 그것을 캐서
  //   나온 **강화석 수**(`stonePicked`)뿐이다. 운석은 판마다 같은 자리에 같은
  //   개수로 나므로(`store/wallet.dart:107`) 둘이 거의 같이 움직이지만 같지는
  //   않다 — 「부순 운석 수」를 그대로 보이려면 런 상태에 칸을 하나 더 내야 한다.
  //   ⇒ 이 장은 **있는 수**로 그렸다. 판정이 나면 그때 갈아 끼운다.
  lumen: 12,
  // ⭐⭐ **강화석은 여섯 종이다** — `pools/matter.dart` 의 `StoneKind` 차례
  //   그대로(일반 · 공격 · 치명 · 생존 · 중력 · 유니크). 합쳐 담으면 메타
  //   게이트를 못 센다(색은 Lv21~99 · 유니크는 Lv71~99) — 그래서 런 상태도
  //   `stonePicked` 를 **여섯 칸**으로 든다.
  // ⚠️ 이 판의 표본은 「일반 운석 위주로 캐고 치명 하나가 붙었다」다.
  stones: [5, 0, 1, 0, 0, 0],
  // ⭐⭐ **버프 넷은 이미 시뮬에 있고 HUD 가 없다**(`sim/player/pickup_buffs.dart`).
  //   자석 3.0초 · 가속 5초 · 사거리 6초 · 범위 6초(`config/mining.dart`) —
  //   밟으면 창이 감기고 매 틱 식는데 **화면이 그 창을 한 번도 안 말한다.**
  //   ⇒ 재화가 비운 그 줄이 이 넷의 자리다(2026-08-28 사용자 판정).
  // ⚠️ 표본은 「가속을 밟은 지 얼마 안 됐고, 자석이 곧 꺼진다」다 —
  //   `left / total` 이 각각 .72 와 **.14**(임박)라 깜빡임을 이 장에서 볼 수 있다.
  buffs: [["haste", 3.6, 5], ["magnet", 0.42, 3]],
};

/// 만렙 줄 — 「무기 랙이 하나로 접힌 뒤의 그림」(진행판 미해결)에 답하는 자리.
const IGSNAPMAX = {
  wcap: 6,
  weapons: [["orbit", 5], ["smg", 4], ["ward", 3], ["seeker", 3], ["pillar", 2], ["flare", 1]],
  acap: 3,
  armors: [["chain", 4], ["dawn", 2]],
};

const IGLVMAX = 5;                     // `kWeaponLevelMax` = `kArmorLevelMax` = 5

/// 자리 사이 · 랙 사이 — **한 자리에만 적는다.** 그림([igSlotRow])과
/// 장부([igRowBoxes])와 자([igSlotRowW]) 셋이 같은 수를 봐야 면적이 참이 된다.
const IGGAP = 4, IGSEP = 11;

// ══════════════════════════════════════════════════════════════════════════
// ① 난전 배경 — **검은 바탕에 그리면 다 예뻐 보인다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ 이 장의 판정은 「예쁜가」가 아니라 **「이 위에서 읽히는가」**다. 그래서
//   배경은 실제 판처럼 시끄럽게 깐다 — 장판 둘 · 적 아홉 · 궤도체 · 떠오르는
//   피해 숫자. 특히 **밝은 자리를 HUD 밑에 일부러 둔다**(왼쪽 위 불장판,
//   가운데 위 섬광) — 어두운 데만 깔면 대비 판정이 거짓말이 된다.
//
// ⚠️ 되풀이는 전부 **나이의 닫힌 함수**다. 누적기도 `Math.random` 도 없다:
//   적의 자리는 사인/코사인(원래 이음매가 없다), 피해 숫자는 `sin(pi*u)` 라
//   u=0 과 u=1 이 **둘 다 0** 이다(주기의 이음매에서 안 튄다).

/// 적 아홉 — [종, 가로비, 세로비, 반지름, 도는 속도, 위상].
const IGFOES = [
  ["grunt", 0.16, 0.30, 13, 0.31, 0.4],
  ["drifter", 0.26, 0.72, 15, 0.24, 2.1],
  ["runner", 0.63, 0.22, 11, 0.42, 1.2],
  ["urchin", 0.78, 0.58, 16, 0.19, 3.4],
  ["swarm", 0.46, 0.18, 10, 0.36, 5.0],
  ["bomber", 0.86, 0.34, 12, 0.27, 0.9],
  ["charger", 0.55, 0.83, 14, 0.22, 4.2],
  ["grunt", 0.71, 0.86, 12, 0.29, 2.7],
  ["runner", 0.34, 0.44, 11, 0.38, 5.8],
];

/// 떠오르는 피해 숫자 — [글, 가로비, 세로비, 위상].
const IGHITS = [
  ["128", 0.24, 0.40, 0.00],
  ["64", 0.60, 0.32, 0.31],
  ["310", 0.75, 0.62, 0.58],
  ["96", 0.42, 0.74, 0.79],
  ["212", 0.83, 0.44, 0.17],
];

/// 판 하나 — 배경 캔버스가 **매 프레임 맨 처음** 부른다.
function igField(seed) {
  return function igFieldDraw(c, tAbs, dt, W, H, st) {
    const t = tAbs;
    // 바닥 — 판은 로비보다 어둡다(#05050B). 로비 바탕(#050B14)보다 푸른끼를
    // 뺀 것은 **여기가 냉광의 자리가 아니기 때문**이다: 냉광은 HUD 의 색이라
    // 바탕까지 푸르면 HUD 가 바탕에 묻는다.
    c.fillStyle = "#05050B"; c.fillRect(0, 0, W, H);
    // 별 — 결정론(`hash` 만 쓴다. `hudStars` 와 같은 규약이되 판은 더 성기다).
    for (let i = 0; i < 54; i++) {
      const x = hash(seed + i * 12.9 + 41) * W, y = hash(seed + i * 7.1 + 44) * H;
      const r = 0.6 + hash(seed + i * 3.3 + 47) * 1.1;
      c.fillStyle = A("#C8D8F0", 0.10 + hash(seed + i * 5.7 + 49) * 0.20);
      c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
    }
    // 장판 둘 — **HUD 밑에 밝은 자리를 일부러 둔다.** 왼쪽 위가 불장판이라
    // 지금·A·C 의 「Lv」와 퀵슬롯이 정확히 그 위에 선다.
    const pool = (px, py, rx, ry, col, a) => {
      const g = c.createRadialGradient(px, py, 0, px, py, rx);
      g.addColorStop(0, A(col, a)); g.addColorStop(1, A(col, 0));
      c.save(); c.translate(px, py); c.scale(1, ry / rx); c.translate(-px, -py);
      c.fillStyle = g; c.beginPath(); c.arc(px, py, rx, 0, TAU); c.fill(); c.restore();
    };
    pool(W * 0.20, H * 0.20, 132, 78, "#FF8A3D", 0.30 + 0.05 * Math.sin(t * 0.9));
    pool(W * 0.66, H * 0.80, 118, 66, "#7CFFB0", 0.20 + 0.04 * Math.sin(t * 0.7 + 1.1));
    pool(W * 0.50, H * 0.16, 96, 52, "#FFE3A8", 0.16 + 0.05 * Math.sin(t * 1.3 + 2.2));

    // 운석 둘 — 판에 늘 굴러다니는 것. 자전은 연속 회전이라 이음매가 없다.
    [[W * 0.10, H * 0.66, 22, 0.11], [W * 0.90, H * 0.16, 17, -0.09]].forEach(([x, y, r, sp], i) => {
      c.save(); c.translate(x, y); c.rotate(t * sp);
      fillPoly(c, jagPoly(0, 0, r, 7, 3.1 + i, 1.15, 0.66), A("#2A2A38", 0.95));
      c.strokeStyle = A("#6E6E86", 0.55); c.lineWidth = 1.2; c.stroke();
      c.restore();
    });

    const px = W * 0.40, py = H * 0.56;

    // 적 — `FOEART` 를 그대로 부른다. **늘 플레이어를 본다**(그 규약은
    // `foeEyes` 가 이미 든다 — 종별 그림 안에서 알아서 돈다).
    IGFOES.forEach(([k, fx, fy, r, sp, ph], i) => {
      const x = W * fx + Math.sin(t * sp + ph) * 26;
      const y = H * fy + Math.cos(t * sp * 0.83 + ph) * 16;
      const ang = Math.atan2(py - y, px - x);
      c.save();
      (FOEART[k] || FOEART.grunt)(c, x, y, r, ang, t + i);
      c.restore();
      // 다친 적에게만 체력 바 — 엔진의 옵션 그대로(`_pushHealthBars`).
      if (i % 3 === 0) {
        const f = 0.28 + 0.22 * (1 + Math.sin(t * 0.6 + i)) * 0.5;
        c.fillStyle = A("#000000", 0.55); c.fillRect(x - r, y - r - 8, r * 2, 3);
        c.fillStyle = f > IGHPLOW ? A("#FFF0C8", 0.95) : A(IGHURT, 0.95);
        c.fillRect(x - r, y - r - 8, r * 2 * f, 3);
      }
    });

    // 궤도체 — 무기 하나가 도는 그림. 연속 회전이라 이음매가 없다.
    for (let i = 0; i < 3; i++) {
      const a = t * 1.35 + (i / 3) * TAU;
      gHalo(c, px + Math.cos(a) * 58, py + Math.sin(a) * 58 * 0.62, 7, "gold", 0.9);
    }
    // 쏜 탄 여섯 — 판이 늘 무언가 쏘고 있다는 것.
    // ⚠️ 처음엔 화면을 가로지르는 **긴 획 둘**이었는데, 갈무리에서 그것이
    //   무기가 아니라 **화면에 난 흠집**으로 읽혔다(캔버스 위 1자 직선은
    //   「그린 것」이 아니라 「긁힌 것」이 된다 — 홈의 지시선이 같은 이유로
    //   꺾인 선이 됐다). ⇒ 짧은 마디로 끊어 **날아가는 중**으로 만든다.
    for (let i = 0; i < 6; i++) {
      const a = (i / 3) * TAU * 0.5 + t * 0.35 + (i % 2) * 1.9;
      const u = (t * 0.9 + i * 0.17) % 1;
      const d0 = 40 + u * 150, d1 = d0 + 16;
      celStroke(c, [
        [px + Math.cos(a) * d0, py + Math.sin(a) * d0 * 0.62],
        [px + Math.cos(a) * d1, py + Math.sin(a) * d1 * 0.62],
      ], 2.6, "gold", Math.sin(Math.PI * u) * 0.75);
    }

    // 플레이어 — 시안 정본 그대로(`ELEM.base`). 몸을 새로 안 그린다.
    { const S = 118;
      c.save(); c.translate(px - S / 2, py - S / 2);
      ELEM.base(c, t, dt, S, S, st);
      c.restore(); }

    // 피해 숫자 — ⚠️ 알파가 `sin(pi*u)` 라 **u=0 과 u=1 이 둘 다 0** 이다.
    //   `1-u*u` 로 두면 주기의 이음매에서 0 → 1 로 튄다(이 레포가 같은 원인으로
    //   네 번 반려된 자리다).
    c.textAlign = "center";
    IGHITS.forEach(([s, fx, fy, ph]) => {
      const u = (t * 0.5 + ph) % 1;
      const a = Math.sin(Math.PI * u);
      c.font = igFont(700, 15);
      c.fillStyle = A("#FFFFFF", a);
      lbText(c, s, W * fx, H * fy - u * 34);
    });
    c.textAlign = "left";
  };
}

// ══════════════════════════════════════════════════════════════════════════
// ② 부품 — 네 안이 **같은 부품**을 다르게 놓는다
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 안마다 부품을 다시 그리면 「배치가 다른 것」이 아니라 「네 벌의 다른
//   디자인」이 되어 비교가 안 된다. 안이 정하는 것은 **자리와 크기**뿐이다.

/// 눈금 띠 — 경험치 · 체력 · 시간이 **같은 한 부품**을 쓴다.
///
/// ⭐⭐ 「선 하나」를 **눈금 있는 띠**로 바꾸는 것이 이 화면의 절반이다.
///   지금 경험치 바는 길이만 있는 획이라 난전에서 「얼마나 남았나」를 재려면
///   화면 폭과 견줘야 한다 — 이펙트가 덮이면 그 기준선이 사라진다. 눈이
///   서면 **덮인 채로도 남은 칸을 센다.** 로비의 `hudScale`(강화 화면의
///   눈금 막대)이 이미 세운 문법이고, 여기서 새로 짓지 않는다.
///
/// ⚠️ 빈 자리는 **거의 검다**(#02060C). 안 그러면 찬 면과 대비가 안 서서
///   「띠에 눈금이 그어져 있다」로만 읽히고 「얼마나 찼나」가 안 보인다 —
///   `hudScale` 이 첫 판에서 겪은 그 자리와 같다.
///
/// ⭐⭐ **경험치와 체력은 꼴이 달라야 한다.** 지금 둘은 3px·4px 가로 획이 붙어
///   서 있어 **한 덩어리로 뭉쳐 읽힌다** — 사용자 갈무리에서 체력 바가 「안
///   보이던」 까닭이 없어서가 아니라 그것이다. 색만 갈라서는 안 된다(밝은
///   장판 위에서 두 따뜻한 색이 같이 뜬다). ⇒ **꼴로 가른다**:
///     경험치 = 이어진 띠 + 눈  — **차오르는 것**
///     체력   = 끊어진 칸 열 개 — **줄어드는 것**(`seg`)
///   난전에서 남은 칸을 **세는 것**이 길이를 재는 것보다 빠르고, 이펙트가
///   덮여도 칸의 경계가 남는다.
///
/// o: {frac, tick 눈 개수, seg 칸 개수, band 키 큰 획의 비율, col, low, full}
function igBar(c, x, y, w, h, o) {
  const opt = o || {};
  const f = hudCl(opt.frac == null ? 0 : opt.frac);
  const col = opt.low ? IGHURT : (opt.full ? IGSEL : (opt.col || IGLINE));
  if (opt.seg) {
    // 끊어진 칸 — 마지막 칸은 **부분만** 찬다(체력은 이어진 값이다).
    const n = opt.seg, gp = 2, bw = (w - gp * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const bx = x + i * (bw + gp), k = hudCl(f * n - i);
      c.fillStyle = A(IGBACK, 0.72); c.fillRect(bx, y, bw, h);
      if (k > 0) { c.fillStyle = A(col, 0.92); c.fillRect(bx, y, bw * k, h); }
      c.strokeStyle = A(col, k > 0 ? 0.55 : 0.26); c.lineWidth = 1;
      c.strokeRect(bx + 0.5, y + 0.5, bw - 1, h - 1);
    }
    return;
  }
  c.fillStyle = A(IGBACK, 0.72); c.fillRect(x, y, w, h);
  c.fillStyle = A(col, 0.92); c.fillRect(x, y, w * f, h);
  // 찬 면의 윗날 — 면이 「유리판에 찬 것」으로 읽히는 자리(hudScale 과 같은 한 줄).
  c.fillStyle = A(IGGLOW, 0.30); c.fillRect(x, y, w * f, 1);
  // 눈 — 찬 면 위에서는 어둡게. 획이 그대로면 면을 갉아 먹는다.
  const n = opt.tick || 0;
  for (let i = 1; i < n; i++) {
    const u = i / n, tx = Math.round(x + w * u) + 0.5;
    const on = u <= f;
    c.strokeStyle = A(on ? IGBACK : col, on ? 0.55 : 0.34);
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(tx, y); c.lineTo(tx, y + h); c.stroke();
  }
  // 키 큰 획 — **뜻이 바뀌는 자리**(시간 띠에서는 보스가 오는 순간).
  if (opt.band != null && opt.band > 0 && opt.band < 1) {
    const bx = Math.round(x + w * opt.band) + 0.5;
    c.strokeStyle = A(IGHURT, 0.86); c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(bx, y - 2.5); c.lineTo(bx, y + h + 2.5); c.stroke();
  }
  // 앞머리 — 지금 어디까지 왔나. 위아래로 삐져나와 **덮여도 끝이 보인다.**
  const cap = Math.round(x + w * f) + 0.5;
  c.strokeStyle = opt.full ? IGSEL : IGGLOW; c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(cap, y - 2); c.lineTo(cap, y + h + 2); c.stroke();
  // 테 — 맨 나중에. 면과 눈이 테를 넘지 않게 덮는다.
  c.strokeStyle = A(col, 0.40); c.lineWidth = 1;
  c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

/// 받침 — 글자·칸이 **제 밑만** 깐다. ⚠️ 판을 크게 깔지 않는다(면적=프레임).
/// 칸 테만 다시 긋는다 — **[igPad] 와 같은 경로**(`hudBox`)를 탄다.
///
/// ⚠️⚠️ **0.5px 이 눈에 보인다**(2026-08-28 사용자: 「살짝 안 맞는 거 아님?」).
///   판은 `hudBox` 경로를 그대로 긋고(잉크 x−0.5 ~ x+0.5) 칸은
///   `strokeRect(x+0.5, …)` 로 그어(잉크 x ~ x+1) **반 픽셀이 밀려 있었다.**
///   실기 1.5배에서는 그 반 픽셀이 한 픽셀로 굳어 줄이 어긋나 보인다.
///   ⇒ 테를 긋는 자를 **하나로** 모은다.
function igBoxStroke(c, x, y, w, h, cut, col, a) {
  hudBox(c, x, y, w, h, cut);
  c.strokeStyle = A(col, a); c.lineWidth = 1; c.stroke();
}

function igPad(c, x, y, w, h, o) {
  const opt = o || {};
  hudBox(c, x, y, w, h, opt.cut == null ? Math.min(7, h * 0.34) : opt.cut);
  c.fillStyle = A(IGPAD, opt.a == null ? 0.62 : opt.a); c.fill();
  if (opt.line !== false) {
    c.strokeStyle = A(IGLINE, opt.lineA == null ? 0.34 : opt.lineA);
    c.lineWidth = 1; c.stroke();
  }
}

/// 자리 하나 — 문양 + 레벨. **빈 자리는 「살 수 있다」로 읽혀야 한다.**
///
/// ⚠️⚠️ 지금 빈 칸은 **점선 네모 하나**뿐이라 「아직 안 만든 자리」로 읽힌다
///   (사용자 판정). 점선이 문제가 아니라 **속이 비어 있는 것**이 문제다 —
///   로비가 이미 답을 내 뒀다(`hud.js` ⑪절): 비어 있음 = 점선 테 + 가운데
///   **＋**. ＋ 하나가 「여기 들어올 자리가 있다」를 말하고, 그것이 「덜
///   만들어졌다」와 갈리는 전부다.
///
/// ⚠️ 레벨은 **밑변의 눈 다섯**이다(기본). 숫자를 읽으려면 시선이 머무는데
///   판 위에서 시선이 머무는 표시는 이 HUD 의 금기다(엔진 `game_layers_hud.dart`
///   가 체력에 숫자를 안 붙이는 것과 같은 근거). 눈은 **세는 것**이라 안 머문다.
///   `badge` 를 켜면 각진 숫자 배지로 갈린다 — 견본 줄이 둘을 나란히 낸다.
function igSlot(c, x, y, S, it, o) {
  const opt = o || {};
  const cut = Math.max(5, S * 0.24);
  if (!it) {
    c.save();
    c.setLineDash([3, 3]);
    hudBox(c, x + 0.5, y + 0.5, S - 1, S - 1, cut);
    c.fillStyle = A(IGPAD, 0.34); c.fill();
    c.strokeStyle = A(IGLINE, 0.46); c.lineWidth = 1; c.stroke();
    c.restore();
    const m = S * 0.19, cx = x + S / 2, cy = y + S / 2;
    c.strokeStyle = A(IGLINE, 0.78); c.lineWidth = 1.4; c.lineCap = "round";
    c.beginPath();
    c.moveTo(cx - m, cy); c.lineTo(cx + m, cy);
    c.moveTo(cx, cy - m); c.lineTo(cx, cy + m);
    c.stroke();
    c.lineCap = "butt";
    return;
  }
  hudBox(c, x + 0.5, y + 0.5, S - 1, S - 1, cut);
  c.fillStyle = A(IGPAD, 0.76); c.fill();
  c.strokeStyle = A(IGLINE, 0.66); c.lineWidth = 1; c.stroke();
  // 만렙 칸은 테가 한 겹 밝다 — 「여기는 더 안 오른다」가 숫자 없이 선다.
  if (it[1] >= IGLVMAX) {
    c.strokeStyle = A(IGGLOW, 0.55); c.lineWidth = 1;
    hudBox(c, x + 2.5, y + 2.5, S - 5, S - 5, cut * 0.7); c.stroke();
  }
  // 문양 — 도감·상점·편성표가 쓰는 그 문양(`ICON`/`AICON`) 그대로.
  // ⚠️ 문양은 **따뜻한 색**(`IC` 팔레트)이고 그것이 맞다: 냉광은 **틀**의 색,
  //   물건은 제 색을 갖는다. 로비가 이미 그렇게 서 있다.
  const G = Math.round(S * 0.74);
  const gy = y + (S - G) / 2 - (opt.badge ? 0 : S * 0.06);
  c.save(); c.translate(x + (S - G) / 2, gy);
  const draw = ICON[it[0]] || AICON[it[0]];
  if (draw) draw(c, G);
  c.restore();
  if (opt.badge) igLvBadge(c, x, y, S, it[1]); else igLvPips(c, x, y, S, it[1]);
}

/// 레벨 — 밑변의 눈 다섯. `kWeaponLevelMax`/`kArmorLevelMax` 가 둘 다 5 다.
///
/// ⚠️⚠️ **왼쪽 여백이 깎인 모서리보다 커야 한다.** [hudBox] 는 오른쪽 위와
///   **왼쪽 아래**를 깎으므로, 눈을 칸 왼쪽 끝에서 시작하면 첫 눈이 깎인
///   자리 **바깥으로 튀어나와** 칸에 붙은 부스러기처럼 보인다(실측 캡처에서
///   그랬다). 여백을 깎는 폭에서 파생시키면 칸 크기를 바꿔도 안 어긋난다.
function igLvPips(c, x, y, S, lv) {
  const cut = Math.max(5, S * 0.24);
  const l = x + cut + 1, r = x + S - 3.5;
  const gap = 1.6, w = (r - l - gap * (IGLVMAX - 1)) / IGLVMAX;
  const py = y + S - 5;
  for (let i = 0; i < IGLVMAX; i++) {
    const bx = l + i * (w + gap);
    // 안 찬 눈도 **자리를 지킨다** — 「몇 중 몇」이라야 세는 것이 된다.
    c.fillStyle = A(IGLINE, 0.26); c.fillRect(bx, py, w, 2.5);
    if (i < lv) { c.fillStyle = A(IGGLOW, 0.95); c.fillRect(bx, py, w, 2.5); }
  }
}

/// 레벨 — 우하단 각진 숫자 배지(견본용 딴 안).
function igLvBadge(c, x, y, S, lv) {
  const w = 13, h = 11;
  const bx = x + S - w - 1, by = y + S - h - 1;
  hudBox(c, bx, by, w, h, 4);
  c.fillStyle = A(IGBACK, 0.90); c.fill();
  c.strokeStyle = A(IGLINE, 0.55); c.lineWidth = 1; c.stroke();
  c.font = igFont(700, 8.5); c.textAlign = "center"; c.textBaseline = "middle";
  c.fillStyle = lv >= IGLVMAX ? IGGLOW : IGINK;
  c.fillText(String(lv), bx + w / 2, by + h / 2 + 0.5);
  c.textAlign = "left"; c.textBaseline = "alphabetic";
}

/// 자리 한 줄 — 무기 ┃ 방어구. **라벨 글자를 안 적는다.**
///
/// ⚠️⚠️ 「무기 3 / 3」·「방어구 0 / 3」이 글자로 서 있었다. 칸이 이미 세 개
///   보이는데 수를 또 적는 것이라 같은 말이 두 번이고, 그 두 번째가 판 위에서
///   **세로를 15px 먹는다**(글 10 + 숨통 5, `equip_slot.dart` 의 `kEquipLabelH`
///   + `kEquipLabelGap`). 가로에서 아까운 축이 정확히 세로다.
///   ⇒ 두 랙을 가르는 것은 **세로 획 하나**로 족하다(`hud.js` ⑪절 `.hudslots
///     .sep` 이 로비에서 이미 그 일을 한다).
/// ⚠️ 안 열린 칸은 **안 그린다** — 엔진 규칙(`equip_hud.dart` 의 `cap == 0`)
///   그대로다. 정원은 `run.openCap` 이라 레벨로 열린다.
function igSlotRow(c, x, y, S, snap, o) {
  const opt = o || {}, gap = IGGAP, sep = IGSEP;
  let cx = x;
  // ⭐ **5칸 단일** — 가름 획이 없다. 가를 것이 없으면 획도 없어야 한다.
  if (opt.single) {
    for (let i = 0; i < snap.skcap; i++) {
      igSlot(c, cx, y, S, snap.skills[i] || null, opt);
      cx += S + gap;
    }
    return cx - gap - x;
  }
  for (let i = 0; i < snap.wcap; i++) {
    igSlot(c, cx, y, S, snap.weapons[i] || null, opt);
    cx += S + gap;
  }
  cx -= gap;
  // 세로 획 — 무기 랙 ↔ 방어구 랙. 하나뿐인 가름이라 이것이 안 보이면
  // 여섯 칸이 한 줄로 뭉친다(`equip_hud.dart` 의 `kEquipRackGap` 이 든 짐).
  const sx = Math.round(cx + sep) + 0.5;
  c.strokeStyle = A(IGLINE, 0.46); c.lineWidth = 1;
  c.beginPath(); c.moveTo(sx, y + 2); c.lineTo(sx, y + S - 2); c.stroke();
  cx = sx + sep;
  for (let i = 0; i < snap.acap; i++) {
    igSlot(c, cx, y, S, snap.armors[i] || null, opt);
    cx += S + gap;
  }
  return cx - gap - x;
}

/// 위 줄의 폭 — 자리를 미리 잡아야 하는 쪽(`geo`)이 부른다.
function igSlotRowW(S, snap, single) {
  if (single) return snap.skcap * S + (snap.skcap - 1) * IGGAP;
  return snap.wcap * S + (snap.wcap - 1) * IGGAP + IGSEP * 2
    + snap.acap * S + (snap.acap - 1) * IGGAP;
}

/// 나가는 문 — **엄지 자 44.** ⚠️ 엔진·시안은 지금 34 다(`kDoorSize`,
/// `mockup-ui.html` 「좌상단 34px」). 같은 시안이 「최소 44」도 못 박고 있어
/// 두 값이 부딪히는 자리다 — 어긋남은 장의 표에 적어 두고, 여기서는 44 로 그린다.
function igDoor(c, x, y, S) {
  igPad(c, x, y, S, S, { a: 0.58, cut: S * 0.26, lineA: 0.44 });
  const w = S * 0.09, h = S * 0.30, cx = x + S / 2, cy = y + S / 2;
  c.fillStyle = A(IGGLOW, 0.92);
  c.fillRect(cx - w * 1.9, cy - h / 2, w, h);
  c.fillRect(cx + w * 0.9, cy - h / 2, w, h);
}

/// 라벨 + 큰 수 한 벌 — 「Lv 12」·「128」이 같은 꼴로 선다.
/// ⚠️ 라벨은 **작고 옅게**, 수는 크고 밝게. 둘이 같은 급이면 판독이 두 번 든다.
function igStat(c, x, y, w, h, lb, val, o) {
  const opt = o || {};
  igPad(c, x, y, w, h, { a: 0.60, lineA: opt.lineA == null ? 0.30 : opt.lineA });
  let tx = x + 6;
  if (opt.glyph) {
    const G = h - 8;
    c.save(); c.translate(tx, y + 4); opt.glyph(c, G); c.restore();
    tx += G + 4;
  } else if (lb) {
    c.font = igFont(600, 8);
    c.fillStyle = A(IGDIM, 0.95);
    c.textBaseline = "middle";
    lbText(c, lb, tx, y + h / 2 + 0.5);
    tx += c.measureText(lb).width + 5;
    c.textBaseline = "alphabetic";
  }
  c.font = igFont(700, opt.fs || 14);
  c.fillStyle = opt.col || IGINK;
  c.textBaseline = "middle";
  lbText(c, val, tx, y + h / 2 + 1);
  c.textBaseline = "alphabetic";
}

/// 시계 숫자 — **자리마다 폭을 못박는다.**
/// ⚠️ `Chakra Petch` 는 모노스페이스가 아니다. 그냥 `fillText` 로 찍으면 초가
///   바뀔 때마다 글자 폭이 달라져 **시계가 떤다** — 판 위에서 떠는 숫자는
///   「지금 뭔가 일어났나」로 오독된다. 자리 폭을 고정하고 가운데 정렬한다.
function igDigits(c, s, x, y, pitch, col) {
  c.textAlign = "center"; c.textBaseline = "middle";
  let cx = x;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const w = ch === ":" ? pitch * 0.48 : pitch;
    c.fillStyle = col;
    lbText(c, ch, cx + w / 2, y);
    cx += w;
  }
  c.textAlign = "left"; c.textBaseline = "alphabetic";
  return cx - x;
}
function igDigitsW(s, pitch) {
  let w = 0;
  for (let i = 0; i < s.length; i++) w += s[i] === ":" ? pitch * 0.48 : pitch;
  return w;
}

/// m:ss — 남은 초에서. 엔진과 같은 올림(`left.ceil()`).
function igClockText(sec) {
  const n = sec > 0 ? Math.ceil(sec) : 0;
  return (n / 60 | 0) + ":" + String(n % 60).padStart(2, "0");
}

/// 시간 — **남은 시간임이 형태로 보여야 한다.**
///
/// ⭐⭐ 지금은 `8:38` 넉 자뿐이라 「지난 8분 38초」인지 「남은 8분 38초」인지
///   화면이 말하지 않는다. 판이 20분이고 시계가 곧 목표라 이건 뜻이 반대로
///   읽히는 자리다. ⇒ 셋을 겹쳐 못박는다:
///     ① **줄어드는 띠** — 남은 것을 그리므로 길이가 준다
///     ② 「남음」 한 낱말(한글이라 `Pretendard`)
///     ③ **보스 획** — `bossAtSec` 1140 이라 **남은 1:00** 자리에 키 큰 붉은
///        획이 선다. 앞머리가 그 획에 닿는 순간이 보스다. 지금 판에는 보스가
///        언제 오는지를 말하는 것이 **하나도 없다.**
function igClock(c, x, y, w, snap, o) {
  const opt = o || {};
  const h = opt.h || 26;
  igPad(c, x, y, w, h, { a: 0.60, lineA: 0.30 });
  const pitch = opt.pitch || 11;
  const txt = igClockText(snap.left);
  const tw = igDigitsW(txt, pitch);
  igDigits(c, txt, x + 7, y + h * 0.38, pitch, IGINK);
  c.font = igKo(500, 8.5);
  c.fillStyle = A(IGDIM, 0.95); c.textBaseline = "middle";
  lbText(c, "남음", x + 10 + tw, y + h * 0.38);
  c.textBaseline = "alphabetic";
  const bw = w - 14;
  igBar(c, x + 7, y + h - 8, bw, 4, {
    frac: snap.left / snap.dur,
    tick: opt.tick == null ? 4 : opt.tick,
    band: (snap.dur - snap.bossAt) / snap.dur,
    col: IGDIM,
  });
}

/// 시간 다이얼 — B 안이 쓰는 **줄어드는 부채꼴**. `celGauge` 를 그대로 감싼다.
///
/// ⭐ 호는 12시에서 시계 방향으로 자라고, 남은 비율이 줄면 **끝이 12시 쪽으로
///   되감긴다.** 보스 눈이 12시 바로 뒤(남은 5% 자리)에 박혀 있어, 되감긴 끝이
///   그 눈에 닿는 순간이 곧 보스다 — 「언제 오나」가 각도 하나로 선다.
function igDialTime(c, cx, cy, r, snap) {
  hudRing(c, cx, cy, r, { alpha: 0.20, w: 3 });
  celGauge(c, cx, cy, r, snap.left / snap.dur, 3, "frost", 0.92);
  // 보스 눈 — 남은 1:00 자리. 띠의 키 큰 획과 **같은 사건 같은 색**이다.
  const a = -Math.PI / 2 + TAU * ((snap.dur - snap.bossAt) / snap.dur);
  c.strokeStyle = A(IGHURT, 0.9); c.lineWidth = 1.4;
  c.beginPath();
  c.moveTo(cx + Math.cos(a) * (r - 4), cy + Math.sin(a) * (r - 4));
  c.lineTo(cx + Math.cos(a) * (r + 4), cy + Math.sin(a) * (r + 4));
  c.stroke();
  hudTicks(c, cx, cy, r + 3, 12, { len: 2, bigLen: 4, every: 3, alpha: 0.36 });
}

/// 암흑물질 계기 — 엔진이 이미 드는 것(`_pushHarvest`). 자리만 옮겨 준다.
/// **판 안에서 안 바뀌는 것을 담는 칸** — 일반공격 · 채굴.
///
/// ⚠️⚠️ 자리 줄의 칸([igSlot])과 **일부러 다르게** 생겼다. 그쪽은 「빈 칸이
///   들어올 자리로 읽혀야」 해서 점선과 ＋ 를 달고 레벨 배지를 붙이지만,
///   이 둘은 **한 판 내내 안 변한다** — 배지를 달면 「올릴 수 있나」로 읽히고
///   점선을 달면 「더 넣을 수 있나」로 읽힌다. 둘 다 거짓말이다.
///   ⇒ 옅은 받침 + 문양만. 크기도 한 급 작다(20 대 32).
function igFixed(c, x, y, S, glyph) {
  c.save();
  // ⚠️ 판과 **같은 함수**로 깐다 — `fillRect`+`strokeRect` 로 따로 그리면
  //   반 픽셀이 밀려 위 판의 왼쪽 선과 어긋난다([igBoxStroke] 머리말).
  // ⚠️⚠️ **`cut: 0` — 반듯한 네모다**(2026-08-28 사용자: 「얘네들 디자인 왜
  //   사각형에서 바뀌었냐」). 반 픽셀을 고치려고 [igPad] 로 옮기면서 그 함수의
  //   **기본 클립 7 이 딸려 왔다** — 고친 것은 자리인데 모양이 같이 바뀌었다.
  //   ⇒ 자리만 가져오고 모양은 되돌린다. 클립은 **판이 쓰는 말**이지 칸의 말이
  //     아니다(자리 줄 칸도 반듯한 네모다 — `igSlot`).
  igPad(c, x, y, S, S, { a: 0.55, cut: 0, lineA: 0.34 });
  c.globalAlpha = 0.80;
  // ⚠️ 안여백은 **3 그대로**다. 2 로 줄여 봤지만 잉크는 81.4 에서 안 움직였다 —
  //   [ICON] 그림이 **제 상자 안에 이미 25% 여백**을 이고 있어서다. 여백을 더
  //   깎아도 그림만 커지고 줄은 안 맞는다. ⇒ 맞추는 것은 **상자**다(둘 다 75).
  c.translate(x + 3, y + 3); glyph(c, S - 6);
  c.restore();
}

/// **판에서 번 것 셋** — 암흑물질 · 빛의 결정 · 강화석.
///
/// ⚠️⚠️ **받침을 안 깐다.** 사용자가 보낸 갈무리에서 받침처럼 보인 것은 실은
///   계기판 그 자체였다 — 그 그림이 말한 요점은 받침이 아니라 **색 글리프 +
///   밝은 흰 수**다. 여기에 받침 셋을 깔면 2,600px 가 더 덮인다.
/// ⚠️ 셋을 **같은 크기로** 쓴다. 「빛의 결정이 더 귀하다」는 문양의 색이 이미
///   말한다(금기 도는 흰빛 대 보라) — 크기로 또 말하면 두 번이다.
/// ⭐ 되돌리는 값은 **다음 x** 다 — 자리를 재는 쪽과 그리는 쪽이 같은 식을 탄다.
const IGCURG = 13, IGCURFS = 12, IGCURGAP = 10;

/// ⚠️ **재는 붓을 따로 둔다** — `geo()`·`boxes()` 는 그리는 붓이 없는데 자리를
///   잡아야 한다. 그리는 쪽과 **같은 식**을 타야 장부와 그림이 안 갈린다.
const IGMEAS = (() => {
  const cv = document.createElement("canvas");
  return cv.getContext ? cv.getContext("2d") : null;
})();

/// ⚠️⚠️ **[pad] 는 「받침을 깐다」가 아니라 「칸이 된다」다**(2026-08-28 사용자
///   갈무리 두 장). 첫 갈무리를 보고 「받침처럼 보인 것은 계기판 자체」라고
///   읽어 문양+수만 남겼는데, 두 번째 갈무리가 **점선 칸 옆에 선 각진 클립
///   테두리 칸**을 그대로 보여 줬다 — 받침이 아니라 [igStat] 의 그 칸이었다.
/// ⭐ 칸이 붙는 것은 **암흑물질·빛의 결정 둘**뿐이다. 강화석 줄은 문양만 남긴다 —
///   위는 「늘 있는 둘」이라 자리가 고정이고, 아래는 캔 종만 서서 수가 변한다.
///   둘을 같은 꼴로 그리면 그 차이가 안 보인다.
const IGCURH = 20;

function igCurW(val, pad) {
  const t = String(val);
  const w = IGMEAS
    ? (IGMEAS.font = igFont(700, IGCURFS), Math.ceil(IGMEAS.measureText(t).width))
    : t.length * 8;
  // 칸일 때는 `igStat` 의 자를 그대로 센다 — 안여백 6 · 문양 h−8 · 숨통 4 · 끝 6.
  return pad ? 6 + (IGCURH - 8) + 4 + w + 6 : IGCURG + 4 + w;
}

/// 셋이 오른쪽 끝에 붙어 설 때의 사각 목록 — **자리와 장부가 한 식이다.**
/// **여럿을 한 칸에** — 암흑물질 · 빛의 결정이 받침 하나를 같이 쓴다.
///
/// ⚠️⚠️ **칸을 둘로 나누지 않는다**(2026-08-28 사용자: 「이거는 왜 나눈 거임?
///   뒷배경 하나로 하고 하나에 두 개 다 넣으면 안 되는 거임?」). 칸을 나누면
///   테가 둘, 안여백이 넷이 되어 **수 둘을 보이려고 그림 여섯을 그리는** 꼴이
///   된다 — 게다가 둘은 늘 같이 서는 한 벌(「이 판에서 번 것」)이라 나눌 뜻도
///   없다. ⇒ 받침 하나에 둘을 넣고 **사이는 여백으로만** 가른다.
/// ⭐ 덕분에 덮는 면적도 준다(테 하나 · 안여백 둘이 사라진다).
const IGCURSEP = 12;

function igCurGroupW(cur) {
  let w = 12;                                   // 좌우 안여백 6 + 6
  cur.forEach(([, v], i) => {
    w += (IGCURH - 8) + 4 + igCurTextW(v) + (i ? IGCURSEP : 0);
  });
  return w;
}

function igCurTextW(val) {
  const t = String(val);
  if (!IGMEAS) return t.length * 8;
  IGMEAS.font = igFont(700, IGCURFS);
  return Math.ceil(IGMEAS.measureText(t).width);
}

function igCurGroup(c, x, y, cur) {
  const G = IGCURH - 8;
  igPad(c, x, y, igCurGroupW(cur), IGCURH, { a: 0.60, lineA: 0.30 });
  let tx = x + 6;
  cur.forEach(([kind, v], i) => {
    if (i) tx += IGCURSEP;
    c.save(); c.translate(tx, y + 4);
    if (typeof CURGLYPH !== "undefined") CURGLYPH[kind](c, G, false);
    c.restore();
    tx += G + 4;
    c.font = igFont(700, IGCURFS); c.fillStyle = IGINK; c.textBaseline = "middle";
    lbText(c, String(v), tx, y + IGCURH / 2 + 1);
    c.textBaseline = "alphabetic";
    tx += igCurTextW(v);
  });
}

function igCurBoxes(cur, right, y, pad) {
  let w = 0;
  cur.forEach(([, v], i) => { w += igCurW(v, pad) + (i ? IGCURGAP : 0); });
  let x = right - w;
  return cur.map(([kind, v, k]) => {
    const b = [x, y, igCurW(v, pad), pad ? IGCURH : IGCURG, kind, v, k || 0];
    x += igCurW(v, pad) + IGCURGAP;
    return b;
  });
}

function igCur(c, x, y, kind, val, k, pad) {
  if (pad) {
    // A·B 의 재화 칸과 **같은 함수**를 탄다 — 자를 두 벌로 두지 않는다.
    igStat(c, x, y, igCurW(val, true), IGCURH, null, String(val), {
      fs: IGCURFS, col: IGINK,
      glyph: (cc, G) => { if (typeof CURGLYPH !== "undefined") CURGLYPH[kind](cc, G, false); },
    });
    return;
  }
  c.save();
  c.translate(x, y);
  if (kind === "stone") {
    if (typeof stoneGlyph === "function") stoneGlyph(c, IGCURG, k || 0, false);
  } else if (typeof CURGLYPH !== "undefined") {
    CURGLYPH[kind](c, IGCURG, false);
  }
  c.restore();
  c.font = igFont(700, IGCURFS);
  c.fillStyle = IGINK;
  c.textBaseline = "middle";
  lbText(c, String(val), x + IGCURG + 4, y + IGCURG / 2 + 1);
  c.textBaseline = "alphabetic";
}

/// **캔 강화석만 골라 [igCurBoxes] 가 먹는 꼴로** 만든다.
///
/// ⚠️⚠️ **안 캔 종은 안 그린다 — 되돌렸다**(2026-08-28 사용자 갈무리: 「재화
///   이런 식으로 했는데 좀 깔끔하게 안 되나? 이상한데」). 처음엔 「자리가 안
///   흔들려야 눈이 다시 안 찾는다」로 여섯을 늘 세우고 안 캔 것은 흐렸는데,
///   **받침이 없는 판 위에서 흐린 문양은 자리 표시가 아니라 흩어진 점**으로
///   읽힌다 — 수가 붙은 둘이 그 점들 사이에 묻혔다.
///   ⭐ 자리가 안 흔들리는 것은 다른 수로 지킨다: **오른쪽 끝을 못박는다.**
///     새로 캔 종은 왼쪽으로 밀고 들어오므로 눈이 잡는 그 끝은 안 움직인다
///     (자릿수가 늘 때와 같은 규율).
/// ⚠️ 여섯을 안 세운다고 **종을 합치지는 않는다** — 색이 메타 게이트를 가르므로
///   (`pools/matter.dart`) 합치면 「무엇을 캤나」가 사라진다.
function igStoneCur(arr) {
  const out = [];
  for (let i = 0; i < 6; i++) if ((arr[i] || 0) > 0) out.push(["stone", arr[i], i]);
  return out;
}

/// **버프 창 하나** — 자리 칸과 같은 **각진 칸**, 그 안에 문양.
///
/// ⚠️⚠️ **띠가 아니다 — 시계처럼 돈다**(2026-08-28 사용자 판정). 처음엔 문양
///   옆에 줄어드는 띠를 붙였는데, 그건 「얼마 남았나」를 **가로 길이**로 말한다.
///   버프는 초 단위로 끝나는 것이라 눈이 그 3px 를 좇을 겨를이 없다.
///   ⇒ **지나간 몫을 회색 부채꼴이 12시부터 시계방향으로 덮는다.** 칸 전체가
///     시계가 되므로 곁눈으로도 「반쯤 갔다」가 잡힌다(쿨타임의 그 문법).
/// ⚠️ 깜빡이는 것도 **칸이지 문양이 아니다** — 문양만 흔들면 무엇이 급한지가
///   아니라 무엇이 고장 났는지로 읽힌다. 테와 바탕을 같이 흔든다.
/// ⚠️ 문지방은 남은 **비율**([IGBUFFWARN])이다. 자석 3초와 범위 6초가 같은
///   순간에 깜빡이려면 초로 재면 안 된다.
/// ⭐ **주기 계약** — 깜빡임은 `1 - u` 로 되짚어 주기 끝과 처음이 같은 값이다.
///   그리는 값이 그 한 스케줄에서만 나오므로 이음매에서 안 튄다.
/// ⚠️⚠️ **버프 칸은 편성 칸(20)보다 작다**(2026-08-28 사용자 판정: 「버프 사이즈
///   왤케 커. 크게 보여 줄 필요 없음. 일반 무기랑 채굴 무기 사이즈보다 더 작게
///   해도 상관없음」). 26 은 편성 칸보다 커서 **곁것이 본것보다 큰** 꼴이었다.
///   ⭐ 크기가 곧 급수다 — 자리 줄 32 > 편성 20 > **버프 15**. 셋이 이 차례로
///     서면 「무엇이 오래 가는 것인가」가 크기만으로 읽힌다.
///
/// ⚠️⚠️ **칸을 줄이는 것과 문양을 줄이는 것은 다른 일이다**(2026-08-28 사용자:
///   「왜 버프 로고 패딩이 없음? 패딩 좀 넣으셈. 꽉 채우지 말고 촌스러워」).
///   26 → 16 으로 줄일 때 안여백을 2 로 뒀더니 획이 테에 닿아, **작아졌는데도
///   더 꽉 차 보였다** — 「크다」로 읽히던 것의 절반은 크기가 아니라 **여백 없음**
///   이었다. ⇒ 칸은 15 로 더 줄이고 안여백을 **3** 으로 늘린다(문양 9).
/// ⚠️ 그 대신 문양의 **속 지름을 줄였다** — 획이 제 상자의 6/7 까지 뻗던 것을
///   4.6/7 로 당겼다. 안 그러면 안여백 3 이 그림에는 안 보인다(상자만 비고 획은
///   그대로 끝까지 간다). **여백은 상자가 아니라 획이 만든다.**
/// ⚠️ 클립 **0** — 버프 칸도 반듯한 네모다(위 [igFixed] 의 그 판정).
const IGBUFFS = 15, IGBUFFGAP = 3, IGBUFFWARN = 0.25, IGBUFFCUT = 0;
const IGBUFFPAD = 3;

/// 버프 문양 넷 — **여기서 처음 짓는다.** 시안 어디에도 없었다(HUD 가 없었으니
/// 문양도 없다). 넷이 **한눈에 갈려야** 하므로 뜻을 획 하나로 줄였다:
///   자석 = 안으로 모이는 화살 · 가속 = 뒤로 흐르는 획 셋
///   사거리 = 밖으로 뻗는 화살 · 범위 = 커지는 두 겹 고리
function igBuffGlyph(c, W, kind) {
  // ⭐ `u` 는 **속 지름**이다 — 상자의 절반이 아니라 획이 뻗는 끝. 이 한 수를
  //   당기면 넷이 **같은 비로** 같이 물러난다(모양마다 손보면 넷이 어긋난다).
  const u = (W / 14) * 0.77, m = W / 2;
  c.strokeStyle = IGGLOW; c.lineWidth = 1.2; c.lineCap = "round";
  c.beginPath();
  if (kind === "magnet") {
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dx, dy]) => {
      c.moveTo(m + dx * 6 * u, m + dy * 6 * u);
      c.lineTo(m + dx * 2.4 * u, m + dy * 2.4 * u);
    });
  } else if (kind === "haste") {
    for (let i = 0; i < 3; i++) {
      const x = m - 4 * u + i * 4 * u;
      c.moveTo(x, m - 4 * u); c.lineTo(x + 3 * u, m); c.lineTo(x, m + 4 * u);
    }
  } else if (kind === "reach") {
    c.moveTo(m - 5 * u, m); c.lineTo(m + 5 * u, m);
    c.moveTo(m + 1.6 * u, m - 3 * u); c.lineTo(m + 5 * u, m);
    c.lineTo(m + 1.6 * u, m + 3 * u);
  } else {
    c.stroke(); c.beginPath();
    c.arc(m, m, 2.4 * u, 0, TAU); c.stroke();
    c.beginPath(); c.globalAlpha *= 0.55; c.arc(m, m, 5.4 * u, 0, TAU);
  }
  c.stroke();
}

function igBuff(c, x, y, kind, left, total, t) {
  const S = IGBUFFS;
  const f = total > 0 ? Math.max(0, Math.min(1, left / total)) : 0;
  const warn = f <= IGBUFFWARN;
  // 깜빡임 — **하나의 스케줄**에서 파생한다(이음매에서 안 튄다).
  const u = (t % 0.44) / 0.44;
  const blink = warn ? 0.38 + 0.62 * (u < 0.5 ? u * 2 : (1 - u) * 2) : 1;
  c.save();
  c.globalAlpha = blink;
  // ① 칸 — 자리 줄과 같은 각진 클립. 임박하면 테가 붉어진다.
  igPad(c, x, y, S, S, { a: 0.72, cut: IGBUFFCUT, line: false });
  c.save();
  c.translate(x + IGBUFFPAD, y + IGBUFFPAD);
  igBuffGlyph(c, S - IGBUFFPAD * 2, kind);
  c.restore();
  // ② 지나간 몫 — **12시부터 시계방향**으로 회색이 덮는다. 칸 밖으로 안 넘치게
  //    칸 모양으로 자른다(둥근 부채꼴이 각진 칸을 뚫으면 다른 그림이 된다).
  if (f < 1) {
    c.save();
    c.beginPath(); c.rect(x, y, S, S); c.clip();
    c.beginPath();
    c.moveTo(x + S / 2, y + S / 2);
    c.arc(x + S / 2, y + S / 2, S, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - f));
    c.closePath();
    c.fillStyle = A("#8FA6B8", 0.42);
    c.fill();
    c.restore();
  }
  // ③ 테 — 부채꼴 **위에** 그어 칸의 윤곽이 안 먹힌다.
  igBoxStroke(c, x, y, S, S, IGBUFFCUT,
    warn ? IGHURT : IGLINE, warn ? 0.95 : 0.5);
  c.restore();
}

function igBuffsW(n) { return n * IGBUFFS + (n - 1) * IGBUFFGAP; }

function igHarvest(c, x, y, w, h, snap) {
  igStat(c, x, y, w, h, null, String(snap.matter), {
    fs: 12, col: IGINK,
    glyph: (cc, G) => { if (typeof CURGLYPH !== "undefined") CURGLYPH.matter(cc, G, false); },
  });
}

// ══════════════════════════════════════════════════════════════════════════
// ③ 지금 — **엔진이 실제로 그리는 그림**을 그대로 다시 그린다
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ 「지금」을 대충 그리면 세 안이 저절로 이겨서 판정이 거짓말이 된다.
//   그래서 숫자는 **엔진의 7세그먼트를 그 좌표 그대로** 옮겼다
//   (`lib/render/atlas/bake_draw.dart` 의 `_sevenSegment` · `_kSegMask`).
//   32×48 칸에 굵기 5 둥근끝, 배율 0.5, 글리프마다 숨통 2 —
//   `hud_glyphs.dart` 의 `pushGlyph` 가 정한 그 자다.
const IGSEG = [63, 6, 91, 79, 102, 109, 125, 7, 127, 111];
const IGSEGPTS = [
  [9, 7, 23, 7], [25, 9, 25, 22], [25, 26, 25, 39], [9, 41, 23, 41],
  [7, 26, 7, 39], [7, 9, 7, 22], [9, 24, 23, 24],
];

/// 글리프 하나(7세그먼트 숫자 · 쌍점 · Lv). 되돌리는 값은 **다음 x** 다.
function igGlyph(c, ch, x, y, s, col) {
  c.save();
  c.translate(x, y); c.scale(s, s);
  c.strokeStyle = col; c.lineWidth = 5; c.lineCap = "round";
  let w = 32;
  if (ch === ":") {
    c.beginPath(); c.moveTo(16, 14); c.lineTo(16, 34); c.stroke();
  } else if (ch === "L") {
    w = 48;
    c.beginPath();
    c.moveTo(10, 8); c.lineTo(10, 40); c.lineTo(21, 40);
    c.moveTo(27, 26); c.lineTo(33, 40); c.lineTo(39, 26);
    c.stroke();
  } else {
    const m = IGSEG[+ch];
    c.beginPath();
    IGSEGPTS.forEach((p, i) => {
      if (m & (1 << i)) { c.moveTo(p[0], p[1]); c.lineTo(p[2], p[3]); }
    });
    c.stroke();
  }
  c.restore();
  return x + w * s + 2;
}
function igGlyphRun(c, s0, x, y, s, col) {
  let cx = x;
  for (let i = 0; i < s0.length; i++) cx = igGlyph(c, s0[i], cx, y, s, col);
  return cx;
}

// ══════════════════════════════════════════════════════════════════════════
// ④ 「지금」과 채택안 D — `geo()` 하나에서 **그림과 장부가 같이 나온다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ 「가린 면적」을 손으로 적으면 그림을 고치는 날 수만 안 따라온다. ⇒
//   `geo(W,H)` 가 사각을 내고, `draw` 는 **그 사각을 받아서** 그리고,
//   `boxes` 는 **같은 사각**을 세어 넓이를 낸다. 갈라질 자리가 없다.
// ⚠️ 넓이의 뜻은 「**불투명하게 덮은 것**」이다 — 띠 · 받침 · 자리 · 문.
//   글자만 있고 받침이 없는 자리(지금의 `Lv 12`·시계)는 글리프가 실제로 먹는
//   사각을 센다. 안 세면 「지금」이 실제보다 가벼워 보인다.

const IGGOLD = "#FFD27A";              // 지금의 색 — `_xpFill`·`_ink` 그대로

const IGPLAN = {
  // ── 지금 ────────────────────────────────────────────────────────────────
  now: {
    nm: "지금",
    one: "얇은 금색 줄 둘 · 계산기 숫자 · 글자 라벨 · 점선 빈 칸.",
    geo(W, H) {
      const L = 14, T = 6, w = W - L * 2;
      const lane = L + 52;                       // 엔진 `kDoorLane`(10+34+8)
      const band = T + 38;                       // 엔진 `kHudBandTop`(10+24+4)
      return {
        xp: [L, T, w, 3], hp: [L, T + 4, w, 4],
        door: [L, T + 10, 34, 34],
        lv: [lane, T + 10, 52, 24],
        harv: [lane + 56, T + 12, 44, 20],
        clock: [L + w / 2 - 32, T + 8, 70, 24],
        wlb: [lane, band, 62, 10], albl: [lane + 178, band, 74, 10],
        slot: 46, sy: band + 15, sx: lane, gap: 6, rack: 28,
      };
    },
    boxes(g) {
      const b = [g.xp, g.hp, g.door, g.lv, g.harv, g.clock, g.wlb, g.albl];
      const n = IGSNAP.wcap + IGSNAP.acap;
      for (let i = 0; i < n; i++) {
        const wpn = i < IGSNAP.wcap;
        const k = wpn ? i : i - IGSNAP.wcap;
        const x = g.sx + (wpn ? 0 : IGSNAP.wcap * (g.slot + g.gap) - g.gap + g.rack)
          + k * (g.slot + g.gap);
        b.push([x, g.sy, g.slot, g.slot]);
      }
      return b;
    },
    draw(c, g, snap) {
      // 경험치 · 체력 — 엔진 그대로 **획 하나씩**. 둘이 붙어 있어 한 덩어리로
      // 읽히는 것이 사용자 갈무리에서 체력 바가 「안 보이던」 까닭이다.
      c.fillStyle = A(IGGOLD, 0.15); c.fillRect(g.xp[0], g.xp[1], g.xp[2], g.xp[3]);
      c.fillStyle = A(IGGOLD, 0.90); c.fillRect(g.xp[0], g.xp[1], g.xp[2] * snap.xp, g.xp[3]);
      c.fillStyle = A(IGHP, 0.14); c.fillRect(g.hp[0], g.hp[1], g.hp[2], g.hp[3]);
      c.fillStyle = A(snap.hp < IGHPLOW ? IGHURT : IGHP, 0.91);
      c.fillRect(g.hp[0], g.hp[1], g.hp[2] * snap.hp, g.hp[3]);
      // 문 — 34. 지금 자리 그대로.
      c.strokeStyle = A("#EDEDF2", 0.55); c.lineWidth = 1;
      c.strokeRect(g.door[0] + 0.5, g.door[1] + 0.5, g.door[2] - 1, g.door[3] - 1);
      c.fillStyle = A("#EDEDF2", 0.85);
      c.fillRect(g.door[0] + 11, g.door[1] + 10, 3, 14);
      c.fillRect(g.door[0] + 19, g.door[1] + 10, 3, 14);
      // Lv · 시계 — **7세그먼트 · 금색.** 엔진의 그 글리프다.
      igGlyphRun(c, "L" + snap.lv, g.lv[0], g.lv[1], 0.5, A(IGGOLD, 0.9));
      igGlyphRun(c, igClockText(snap.left), g.clock[0], g.clock[1], 0.5, A(IGGOLD, 0.9));
      // 암흑물질 계기
      c.save(); c.translate(g.harv[0], g.harv[1] + 2);
      if (typeof CURGLYPH !== "undefined") CURGLYPH.matter(c, 16, false);
      c.restore();
      igGlyphRun(c, String(snap.matter), g.harv[0] + 20, g.harv[1] - 2, 0.5, A(IGGOLD, 0.9));
      igNowRow(c, g.sx, g.sy, g, snap, { label: true, ly: g.wlb[1] + 8 });
    },
  },

  // ⚠️⚠️ **안 셋(A 난간 · B 계기판 · C 위아래)이 여기 있었다 — 2026-08-28 에
  //   걷었다.** 사용자가 셋을 보고 D 를 손으로 조립해 판정이 끝났고, 끝난 안을
  //   두면 **다음에 읽는 사람이 아직 안 정해진 줄 안다.** 셋에서 무엇을
  //   가져왔는지는 아래 [IGPLAN] `d` 머리말이 다 든다 — 되살릴 일은 없다.
  //   ⭐ 「지금」은 남긴다 — 안이 아니라 **기준점**이고, 아래 면적 표의
  //     「지금 대비」가 그것을 분모로 쓰며, 이식할 때 「무엇을 걷어내는가」의
  //     정본이기도 하다.

  // ── D 계기판+시계+자리 — **B 와 C 의 장점만** ──────────────────────────
  // ⚠️⚠️ **사용자가 셋을 보고 손으로 조립한 안이다**(2026-08-28). 순서대로:
  //   「C가 좋아보이고」 → 「B랑 C를 합치고싶어」 → 「B상태에서 C처럼 퀵슬롯만
  //   아래로」 → 「아 근데 시간은 또 12시 방향이좋은데」 → 「재화갯수는 체력바
  //   밑으로가야되려나?」. ⇒ **B 를 뼈대로 두고 C 에서 둘만 가져온다.**
  //
  // ⭐ 가져온 것 둘 — **시계는 12시**(위 가운데) · **자리는 아래 가장자리**.
  // ⭐ 남긴 것 — 좌상단 한 덩어리. B 의 요점이 「시선이 한 번만 움직인다」라
  //   나머지를 흩으면 B 를 고른 뜻이 사라진다.
  //
  // ⚠️ **차례가 급한 순서다** — 레벨 → 경험치 → 체력 → (판 밖) 편성 둘 · 재화.
  //   재화가 판 밖인 까닭과, **흐리게 깔았다가 되돌린** 내력은 `geo()` 의
  //   `matter` 머리말에 적었다.
  // ⚠️ 시계가 나가 덩어리 폭이 **190 → 168** 로 줄었다. 띠가 그만큼 짧아지지만
  //   B 의 판단(「폭이 짧아진 만큼 눈이 그 몫을 진다」)을 그대로 잇는다.
  d: {
    nm: "D · 계기판 + 12시 + 아래자리",
    one: "B 의 좌상단 덩어리에, C 의 12시 시계와 아래 자리를 얹었습니다.",
    geo(W, H) {
      const L = 14, T = 6, S = 32;
      // ⚠️⚠️ **재화는 판 「밖」이다**(2026-08-28 사용자 판정: 「재화 128 정보를
      //   레벨정보 바깥으로 빼서 아래에다가」). 판 안에 넣었더니 받침이 54 로
      //   자라 위에서 70px 를 먹었다(B 54 · C 62 보다 두꺼웠다).
      //   ⭐ **종류가 다른 수라 밖이 맞다** — 레벨·경험치·체력은 「지금 내 판」
      //     이고 재화는 **판이 끝나도 남는 것**이다. 한 받침에 담으면 그 셋과
      //     같은 급으로 읽혀 급한 둘 사이에 끼어든다.
      //   ⭐⭐ 그리고 **받침이 줄어 덮는 면적이 실제로 내려간다** — 판 40 +
      //     받침 없는 글리프 한 줄이라, 판 54 짜리보다 2,352px 덜 덮는다.
      //   ⚠️ 그 몫만큼 받침이 도로 붙는다(52×20) — 아래 `matter` 머리말 참조.
      // ⚠️⚠️ **판 키 = 문 키**(2026-08-28 사용자: 「일시정지 버튼 레벨업 영역이랑
      //   높이값 맞춰」). 옛 40 은 문(44)보다 4px 짧아 문 밑동만 삐져나왔다.
      //   ⭐ **줄여서 맞추면 안 된다** — 문은 누르는 것이라 [엄지 자 44] 가 하한이다
      //     (`theme.dart` 의 그 자). ⇒ **판을 44 로 늘려** 맞춘다.
      const pw = 168, ph = 44;
      const px = L + 44 + 8;
      // ⚠️⚠️ **판을 1px 파고들고 있었다**(2026-08-28 사용자: 「위에랑 마진 2px
      //   정도 줘봐」). 옛 식은 `my = T+ph+4` 에 `fy = my-5` 라 줄이 **45** 에서
      //   시작했는데 판 밑변이 **46** 이다 — 겹친 1px 이 「안 맞는다」의 절반이었다.
      //   ⇒ 줄의 자리를 판 밑변에서 **곧장 재고**, 여백을 수로 못박는다.
      const IGSUBGAP = 2;
      const my = T + ph + IGSUBGAP;
      // ⭐⭐ **아래 줄이 무는 것은 판의 「바깥 모서리」다**(2026-08-28 사용자가
      //   선을 그어 물음: 「이 선 기준으로 정렬하면 안 되는 거임?」).
      //   안쪽 선(px+9)은 **판 안의 글이 쓰는 자**다 — `LV`·띠가 그 자를 쓴다.
      //   아래 줄은 판 **밖**이라 그 자를 빌릴 까닭이 없고, 바깥 모서리에 물리면
      //   아래 줄이 판과 **정확히 같은 폭**으로 서서 둘이 한 덩어리로 읽힌다.
      // ⚠️ 그래서 이 파일에는 자가 둘이다 — 안(글) · 밖(줄). 섞어 쓰지 마라.
      const inL = px, inR = px + pw;
      const roww = igSlotRowW(S, IGSNAP, true);
      return {
        door: [L, T, 44, 44],
        panel: [px, T, pw, ph],
        // ⚠️ 받침이 없어도 **장부에는 든다** — 글리프와 수가 실제로 먹는 사각을
        //   센다(이 절 머리말의 규율). 안 세면 D 가 실제보다 가벼워 보인다.
        // ⚠️⚠️ **왼쪽이 일반·채굴, 오른쪽이 재화다**(2026-08-28 사용자 판정:
        //   「일반채굴위치랑 재화위치 바꿔야될거같아」). 왼쪽은 위 판의 글이
        //   시작하는 자리(px+9)와 같은 세로선이라 **판과 한 기둥으로 읽힌다** —
        //   편성은 판 상태의 연장이고, 재화는 그 기둥 밖으로 밀어낸 것이 맞다.
        // ⚠️ 칸 사이 **3**(옛 5) — 둘은 한 벌이라 붙여야 「편성 둘」로 읽힌다
        //   (사용자: 「일반|채굴 간격 줄이고」). 자리 줄의 칸 사이(4)보다도
        //   좁은 것이 그 뜻을 말한다.
        // ⭐⭐ **판 안쪽 기준선 둘이 아래 줄까지 내려온다**(2026-08-28 사용자:
        //   「바로 위에 레벨 표시하는 거랑 좌측정렬 라인 맞추고, 버프는 우측
        //   라인에 정렬 맞추셈」). 판 안의 `LV`·띠 둘이 [inL] 에서 시작하고
        //   판이 [inR] 에서 끝나므로, 아래 줄도 **그 둘에 물린다** — 편성은
        //   왼쪽 선에, 버프는 오른쪽 선에.
        // ⚠️ 수를 다시 적지 않는다(`px + 9` 를 네 군데 쓰면 한 곳만 고쳐진다).
        fix: 20, fgap: 3, fx: inL, fy: my,
        // ⭐⭐ **재화가 비운 자리는 버프 줄이다**(2026-08-28 사용자 판정: 「지금
        //   재화 있는 자리는 나중에 버프 같은 거 뜨면 버프 유지 시간, 쿨타임
        //   도는 거 표시하는 용으로」). 편성 둘 오른쪽, 판 오른쪽 끝까지.
        // ⚠️ 이 줄은 **판 안에서 시시각각 바뀌는 유일한 것**이라 왼쪽 기둥에
        //   있는 것이 맞다 — 재화는 판이 끝나야 쓰이니 오른쪽으로 갔다.
        // ⚠️ 편성 칸(20)과 **세로 가운데를 맞춘다** — 위를 맞추면 작은 칸이
        //   떠 보이고 아래를 맞추면 가라앉아 보인다.
        // ⚠️ **오른쪽 끝에서 되짚는다** — 왼쪽에서 세면 버프가 하나 뜰 때마다
        //   줄이 오른쪽으로 자라 판 밖으로 나간다. 오른쪽에 물리면 새 버프가
        //   **왼쪽으로 밀고 들어오고** 눈이 잡는 그 끝은 안 움직인다
        //   (우상단 재화가 자릿수에 대해 쓰는 것과 같은 규율).
        bfx: inR - igBuffsW(IGSNAP.buffs.length),
        bfy: my + (20 - IGBUFFS) / 2,
        // ⚠️⚠️ **재화는 안 흐리다 — 되돌렸다**(2026-08-28 사용자 판정, 갈무리로).
        //   처음엔 「손이 한 번도 안 가는 수」라는 이유로 [IGDIM] 11px 로 깔았는데,
        //   그 논리는 **읽을 수 있다는 전제** 위에서만 맞다. 난전 위에 흐린
        //   11px 를 놓으면 읽는 것이 아니라 **안 보이는** 것이 된다 —
        //   「덜 급하다」와 「없어도 된다」는 다르다. ⇒ **색 글리프 + 흰 수.**
        // ⭐⭐ **번 것은 우상단이다**(2026-08-28 사용자 판정: 「재화는 우측상단에
        //   이런 형태로 넣으면」). 시계가 12시로 나가 그 절반이 통째로 비었고,
        //   **속성 운석이 여섯 종이라 판 밑 줄에는 애초에 자리가 없다.**
        //   ⇒ 네 자리가 뜻으로 갈린다: 왼쪽=내 상태 · 가운데=시간 ·
        //     오른쪽=번 것 · 아래=쓰는 것.
        // ⭐ 두 줄인 까닭 — 위는 **죽이면 들어오는 것**(암흑물질·빛의 결정),
        //   아래는 **캐야 들어오는 것**(강화석 여섯). 활동이 갈리므로 줄도 갈린다.
        // ⚠️ 두 줄이 **같은 오른쪽 끝**을 쓴다 — 그것이 둘을 한 덩어리로 묶는
        //   유일한 자다(받침을 안 깔기로 했으므로).
        cur: [["matter", IGSNAP.matter], ["shard", IGSNAP.lumen]],
        st: igStoneCur(IGSNAP.stones),
        // ⚠️ 아랫줄이 T+26 인 것은 윗줄이 **칸(키 20)** 이 되며 밀린 몫이다.
        curRight: W - L, cy2: T + 4, sty: T + 28,
        // 12시 — **화면 가운데**다(덩어리 기준이 아니다). 위 가장자리가
        // 통째로 비어 있어 시계가 혼자 선다.
        clock: [Math.round(W / 2 - 58), T + 4, 116, 26],
        // 아래 가운데 — C 와 **같은 자리·같은 칸 크기**다.
        // ⚠️ 레벨업 3택과 겹치는 자리인데, 사용자 판정으로 **결함이 아니다**:
        //   3택이 열리면 판이 멈춰 이 줄은 누를 수도 없다(2026-08-28).
        single: true, slot: S, sx: Math.round(W / 2 - roww / 2),
        sy: H - T - 8 - S, roww,
      };
    },
    boxes(g) {
      const b = [g.door, g.panel, g.clock,
        [g.fx, g.fy, g.fix, g.fix],
        [g.fx + g.fix + g.fgap, g.fy, g.fix, g.fix]];
      b.push([g.curRight - igCurGroupW(g.cur), g.cy2, igCurGroupW(g.cur), IGCURH]);
      igCurBoxes(g.st, g.curRight, g.sty).forEach((r) => b.push(r));
      IGSNAP.buffs.forEach((_, i) => {
        b.push([g.bfx + i * (IGBUFFS + IGBUFFGAP), g.bfy, IGBUFFS, IGBUFFS]);
      });
      igRowBoxes(b, g, IGSNAP);
      return b;
    },
    draw(c, g, snap) {
      igDoor(c, g.door[0], g.door[1], 44);
      const [px, py, pw, ph] = g.panel;
      igPad(c, px, py, pw, ph, { a: 0.68, cut: 11, lineA: 0.44 });
      hudBracket(c, px, py, pw, ph, 12, { w: 1.5, alpha: 0.62, only: ["tr", "bl"] });
      // 1줄 — 레벨. 시계가 12시로 나가 이 줄은 레벨 하나가 쓴다.
      c.font = igFont(600, 8);
      c.fillStyle = A(IGDIM, 0.95); c.textBaseline = "middle";
      const inL = px + 9, bw = pw - 18;   // 아래 줄과 **같은 기준선**
      lbText(c, "LV", inL, py + 12);
      c.font = igFont(700, 15); c.fillStyle = IGINK;
      lbText(c, String(snap.lv), inL + 16, py + 12);
      c.textBaseline = "alphabetic";
      // 2·3줄 — 경험치 · 체력. 판이 드는 것은 **여기까지**다.
      // ⚠️ 판이 40 → 44 로 늘며 셋을 한 칸씩 내렸다(밑 여백 6 을 남긴다).
      igBar(c, inL, py + 23, bw, 6, { frac: snap.xp, tick: 5, full: snap.xp >= IGFULL });
      igBar(c, inL, py + 33, bw, 5,
        { frac: snap.hp, seg: 10, col: IGHP, low: snap.hp < IGHPLOW });
      // 우상단 — 번 것 두 줄. 오른쪽 끝에 붙여 세운다.
      // 윗줄 — **칸 하나에 둘**. 아랫줄 — 캔 종만, 문양만.
      igCurGroup(c, g.curRight - igCurGroupW(g.cur), g.cy2, g.cur);
      igCurBoxes(g.st, g.curRight, g.sty).forEach(([x, yy, , , kind, v, k]) => {
        igCur(c, x, yy, kind, v, k, false);
      });
      // 일반공격 · 채굴 — **읽는 칸**이라 레벨 배지도 점선 빈 칸도 없다.
      igFixed(c, g.fx, g.fy, g.fix, (cc, S) => {
        const d = (typeof ICON !== "undefined") && ICON[snap.basic];
        if (d) d(cc, S);
      });
      igFixed(c, g.fx + g.fix + g.fgap, g.fy, g.fix, (cc, S) => {
        if (typeof hudMineGlyph === "function") hudMineGlyph(cc, S, snap.mine);
      });
      // 버프 창 — 남은 몫이 [IGBUFFWARN] 아래면 **깜빡인다.**
      snap.buffs.forEach(([kind, left, total], i) => {
        igBuff(c, g.bfx + i * (IGBUFFS + IGBUFFGAP), g.bfy, kind, left, total,
          typeof igT === "number" ? igT : 0);
      });
      // 12시 시계 · 아래 자리 — C 에서 그대로.
      igClock(c, g.clock[0], g.clock[1], g.clock[2], snap, { pitch: 12 });
      igSlotRow(c, g.sx, g.sy, g.slot, snap, { single: true });
    },
  },
};

/// 지금의 자리 줄 — **엔진이 그리는 그대로.** 46px 칸 · `#0C0C12` 바탕
/// (`kEquipSlotBg`) · `#3A3A46` 테(`kEquipDashEdge`) · 우하단 금빛 레벨 숫자 ·
/// 빈 칸은 **점선뿐**. 랙 사이는 28(`kEquipRackGap`), 칸 사이 6(`kEquipGap`).
///
/// ⚠️ 견본 줄과 화면이 **같은 함수**를 탄다 — 견본이 제 손으로 그리면 「지금이
///   어떻게 보이나」를 거짓으로 말하게 된다.
function igNowRow(c, x, y, g, snap, o) {
  const opt = o || {};
  if (opt.label) {
    // 랙 이름표 — 시안 `.rl`(9.5px · 자간 .22em) 그대로.
    c.font = igKo(400, 9.5);
    c.fillStyle = A("#8B8B99", 0.95);
    igSpaced(c, `무기 ${snap.weapons.length} / ${snap.wcap}`, x, opt.ly, 2.1);
    igSpaced(c, `방어구 ${snap.armors.length} / ${snap.acap}`, x + 178, opt.ly, 2.1);
  }
  const S = g.slot, gap = g.gap, rack = g.rack;
  for (let i = 0; i < snap.wcap + snap.acap; i++) {
    const wpn = i < snap.wcap;
    const k = wpn ? i : i - snap.wcap;
    const bx = x + (wpn ? 0 : snap.wcap * (S + gap) - gap + rack) + k * (S + gap);
    const it = wpn ? snap.weapons[k] : snap.armors[k];
    if (it) {
      c.fillStyle = A("#0C0C12", 0.75); c.fillRect(bx, y, S, S);
      c.strokeStyle = A("#3A3A46", 1); c.lineWidth = 1;
      c.strokeRect(bx + 0.5, y + 0.5, S - 1, S - 1);
      c.save(); c.translate(bx + 1, y + 1);
      const d = ICON[it[0]] || AICON[it[0]]; if (d) d(c, S - 2);
      c.restore();
      c.font = igFont(700, 11); c.fillStyle = IGGOLD; c.textAlign = "right";
      c.fillText(String(it[1]), bx + S - 3, y + S - 4);
      c.textAlign = "left";
    } else {
      c.save(); c.setLineDash([3, 3]);
      c.strokeStyle = A("#3A3A46", 1); c.lineWidth = 1;
      c.strokeRect(bx + 0.5, y + 0.5, S - 1, S - 1);
      c.restore();
    }
  }
}

/// 자리 줄의 사각을 장부에 담는다 — 세 안이 같은 셈을 쓴다.
function igRowBoxes(b, g, snap) {
  const S = g.slot;
  let x = g.sx;
  if (g.single) {
    for (let i = 0; i < snap.skcap; i++) { b.push([x, g.sy, S, S]); x += S + IGGAP; }
    return;
  }
  for (let i = 0; i < snap.wcap; i++) { b.push([x, g.sy, S, S]); x += S + IGGAP; }
  x = x - IGGAP + IGSEP * 2;
  for (let i = 0; i < snap.acap; i++) { b.push([x, g.sy, S, S]); x += S + IGGAP; }
}

/// 자간 있는 글 — 지금의 랙 이름표(`.rl` 자간 .22em)를 흉내 낸다.
/// ⚠️ 캔버스에는 `letter-spacing` 이 없다(예전 브라우저 기준). 한 자씩 민다.
function igSpaced(c, s, x, y, sp) {
  let cx = x;
  for (let i = 0; i < s.length; i++) {
    c.fillText(s[i], cx, y);
    cx += c.measureText(s[i]).width + sp;
  }
  return cx - x;
}

// ══════════════════════════════════════════════════════════════════════════
// ⑤ 조립 — 폰 하나 = 배경 한 겹 + HUD 한 겹
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ **캔버스 하나에 둘 다 그린다.** 시안의 프레임 루프는 캔버스마다 매
//   프레임 불투명색으로 지우므로 캔버스를 겹치면 아래가 안 보인다
//   (`vfx.js` 의 `lobbyMap` 이 같은 자리에서 같은 판정을 내렸다). 엔진도
//   레이어 우선순위 하나로 같은 표면에 얹는다 — 구조가 같다.

const IGW = 788, IGH = 364;

/// 깜빡이는 것 하나(버프 임박)가 읽는 시각. `draw(c,g,snap)` 의 인자를 늘리면
/// 안 넷을 다 고쳐야 해서 여기 둔다 — **쓰는 곳이 하나뿐**이라 값이 안 갈린다.
let igT = 0;

function igPanel(id, key, seed) {
  const cv = $(id);
  if (!cv) return;
  const plan = IGPLAN[key];
  const field = igField(seed);
  mk(cv, [IGW, IGH], function igPanelDraw(c, tAbs, dt, W, H, st) {
    field(c, tAbs, dt, W, H, st);
    igT = tAbs;                        // 깜빡임이 읽는 시각 — 안이 인자를 안 늘린다
    const g = plan.geo(W, H);
    plan.draw(c, g, IGSNAP);
  }, { clear: true });
}

/// 가린 면적 — **`geo()` 가 낸 그 사각을 그대로 센다.**
function igAreaPct(key) {
  const plan = IGPLAN[key];
  const g = plan.geo(IGW, IGH);
  let s = 0;
  plan.boxes(g).forEach((r) => { s += r[2] * r[3]; });
  return { px: Math.round(s), pct: (s / (IGW * IGH)) * 100 };
}

/// HUD 가 위에서 먹는 세로 — **가로에서 아까운 축**(엔진이 47.3% 를 겪은 그 축).
function igTopBand(key) {
  const plan = IGPLAN[key];
  const g = plan.geo(IGW, IGH);
  let bot = 0;
  plan.boxes(g).forEach((r) => { if (r[1] < IGH * 0.5) bot = Math.max(bot, r[1] + r[3]); });
  return bot;
}

// 폰 둘 — 「지금」과 채택안 D. 같은 배경, 같은 값, 다른 자리.
igPanel("ig-now", "now", 3);
igPanel("ig-d", "d", 3);

// ── 면적 표 — 숫자를 **여기서 뽑아 넣는다** ──────────────────────────────
// ⚠️ 표에 수를 손으로 적으면 그림을 고치는 날 표만 안 따라온다.
{
  const h = $("ig-area");
  if (h && h.insertAdjacentHTML) {
    const base = igAreaPct("now");
    ["now", "d"].forEach((k) => {
      const a = igAreaPct(k), top = igTopBand(k);
      const d = k === "now" ? "—" : ((a.pct / base.pct - 1) * 100).toFixed(0) + "%";
      h.insertAdjacentHTML("beforeend",
        `<tr><td><b>${IGPLAN[k].nm}</b></td>`
        + `<td>${a.px.toLocaleString()}</td>`
        + `<td><b>${a.pct.toFixed(2)}%</b></td>`
        + `<td>${d}</td>`
        + `<td>${top}px · ${(top / IGH * 100).toFixed(1)}%</td>`
        + `<td>${IGPLAN[k].one}</td></tr>`);
    });
  }
}

// ══════════════════════════════════════════════════════════════════════════
// ⑥ 부품 견본 — 폰 밖. **화면과 같은 함수가 짓는다**
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ 견본이 제 손으로 그리면 「이 상태가 화면에서 어떻게 보이나」를 거짓으로
//   말하게 된다(편성표 장이 같은 자리에서 같은 판정을 내렸다).

/// 띠 견본 — 경험치 셋 · 체력 셋.
{ const h = $("ig-bars");
  if (h) {
    [
      ["<b>경험치 62%</b> — 이어진 띠. 눈 다섯 중 셋을 넘겼습니다", { frac: 0.62, tick: 5 }],
      ["<b>경험치 96%</b> — 앞머리가 마지막 눈을 넘었습니다", { frac: 0.96, tick: 5 }],
      ["<b>경험치 가득</b> — 3택이 열리는 <b>사건</b>이라 이때만 금빛입니다", { frac: 1, tick: 5, full: true }],
      ["<b>체력 46%</b> — 끊어진 칸 열. 꼴이 달라 경험치와 <b>안 뭉칩니다</b>", { frac: 0.46, seg: 10, col: IGHP }],
      ["<b>체력 31%</b> — 문지방 0.35 아래. 경고 링과 같은 순간 같은 색입니다", { frac: 0.31, seg: 10, col: IGHP, low: true }],
      ["<b>시간 43% 남음</b> — 붉은 획이 보스입니다(남은 1:00)", { frac: 0.43, tick: 4, col: IGDIM, band: 0.05 }],
    ].forEach(([cap, o]) => {
      const w = document.createElement("div"); w.className = "ig-samp";
      const cv = document.createElement("canvas");
      cv.style.width = "300px"; cv.style.height = "14px";
      w.appendChild(cv);
      w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
      h.appendChild(w);
      mk(cv, [300, 14], function igBarSamp(c, t, dt, W, H) {
        c.fillStyle = "#0C0C12"; c.fillRect(0, 0, W, H);
        igBar(c, 2, 4, W - 4, 6, o);
      }, { clear: true });
    });
  }
}

/// 자리 견본 — 「지금」 · 눈 다섯 · 숫자 배지, 그리고 **만렙 아홉 칸**.
{ const h = $("ig-slots");
  if (h) {
    const rows = [
      ["<b>지금</b> — 46px · 점선뿐인 빈 칸 · 우하단 금빛 숫자", "now", 46],
      ["<b>눈 다섯</b> — 레벨을 <b>세는 것</b>으로 바꿉니다(기본안)", "pip", 38],
      ["<b>숫자 배지</b> — 각진 배지로 <b>읽는</b> 안", "badge", 38],
    ];
    rows.forEach(([cap, kind, S]) => {
      const w = document.createElement("div"); w.className = "ig-samp";
      const cv = document.createElement("canvas");
      const cw = kind === "now" ? 340 : Math.ceil(igSlotRowW(S, IGSNAP, true)) + 4;
      cv.style.width = cw + "px"; cv.style.height = (S + 4) + "px";
      w.appendChild(cv);
      w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
      h.appendChild(w);
      mk(cv, [cw, S + 4], function igSlotSamp(c, t, dt, W, H) {
        c.fillStyle = "#0C0C12"; c.fillRect(0, 0, W, H);
        // ⚠️ 견본과 화면이 **같은 함수**를 탄다 — 견본이 제 손으로 그리면
        //   「이 상태가 화면에서 어떻게 보이나」를 거짓으로 말하게 된다.
        if (kind === "now") igNowRow(c, 2, 2, IGPLAN.now.geo(IGW, IGH), IGSNAP, null);
        else igSlotRow(c, 2, 2, S, IGSNAP, { badge: kind === "badge", single: true });
      }, { clear: true });
    });
    // 만렙 — 「무기 랙이 하나로 접힌 뒤의 그림」.
    { const S = 38;
      const w = document.createElement("div"); w.className = "ig-samp";
      const cv = document.createElement("canvas");
      const cw = Math.ceil(igSlotRowW(S, IGSNAPMAX)) + 4;
      cv.style.width = cw + "px"; cv.style.height = (S + 4) + "px";
      w.appendChild(cv);
      w.insertAdjacentHTML("beforeend",
        `<div class="sc"><b>만렙 — 오늘의 엔진</b>(무기 6 <b>┃</b> 방어구 3). `
        + `아홉 칸이 여전히 한 줄이고 이름표가 없어 <b>세로가 안 늡니다</b>. `
        + `⚠️ 채택안 D 는 <b>5칸 단일</b>이라 이 가름 획이 없습니다 — `
        + `이 줄은 <b>지우기 전의 그림</b>으로 남겨 둔 것입니다</div>`);
      h.appendChild(w);
      mk(cv, [cw, S + 4], function igSlotMaxSamp(c, t, dt, W, H) {
        c.fillStyle = "#0C0C12"; c.fillRect(0, 0, W, H);
        igSlotRow(c, 2, 2, S, IGSNAPMAX);
      }, { clear: true });
    }
  }
}
