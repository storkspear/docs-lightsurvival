// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-loadout.js — 편성표 · 출격준비 **두 장이 같이 쓰는** 편성 살림
//
// `vfx.js` · `hud.js` 뒤, 각 장의 제 스크립트 **앞**에 실린다.
// 최상위 이름은 `LO`/`lo` 로 격리한다. **이 파일은 아무것도 안 세운다** —
// 표와 함수만 있고 `$(id)` 로 무는 자리가 없어, 두 장 어디에 실려도 안전하다.
//
// ── 왜 갈라 뒀나 ────────────────────────────────────────────────────────
// 두 화면이 **같은 한 벌**을 말한다. 편성표 화면은 「편성표들을 관리한다」이고 출격준비는
// 「편성표 하나를 골라 나간다」인데, 말하는 대상(캐릭터 · 자리 열 · 후보 표)은 하나다.
// 그것을 두 파일에 베끼면 **반드시 갈라진다** — 이 저장소가 이미 여러 번 겪은
// 병이고, 갈라지는 순간 「편성표를 누르면 이렇게 앉는다」가 거짓이 된다.
//
// ⭐ **고르는 창도 여기 하나다.** 편성표의 「편집」과 출격준비의 「바꾼다」가 같은
//   창을 연다 — 두 벌로 만들면 같은 일을 두 문법으로 하게 된다.
//
// ── 길이는 전부 엔진 상수다 ─────────────────────────────────────────────
//   일반 1 + 스킬 5 = `kSlotCapMax`(=`kDeckSize`) 6   `lib/sim/config/balance_offers.dart`
//   채굴 1                                            `MiningKind` 셋 중 하나 · 강제 슬롯
//   성좌 3                                            `kConstellationSlots`
//   캐릭터 18종                                       `kCharacterDefs`
//   출격 조건 내 속성 3                                `kCharacterOwnMin`
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 고르는 창의 CSS — **창과 한 파일에 둔다** ────────────────────────────
// 창이 두 장에서 열리므로 그 배치도 두 장이 같이 써야 한다. 페이지 `<style>` 에
// 적으면 두 벌이 되고, 두 벌은 반드시 갈라진다. `hud.js` 의 `hudInjectCSS` 와
// 같은 손짓으로 한 번만 심는다.
const LOCSS = `
.hudpop.full{background:#020509EC}
.hudpop.full .bx>.hd{display:flex;align-items:center;gap:7px;padding:5px 12px 5px 16px;
  border-bottom:1px solid #4FC3F733;font-size:9.5px;letter-spacing:.2em;color:#6E93AD}
.hudpop.full .bx>.hd b{font-size:11px;letter-spacing:.1em;color:#D8F2FF}
.hudpop.full .bx>.hd .x{margin-left:auto;font-size:12px;color:#6E93AD;cursor:pointer}
/* 캐릭터 줄이 **맨 위**다 — 캐릭터를 안 고르면 아래 격자가 「내 속성」을
   판정할 근거가 없다. 위에서 아래로 읽으면 그 의존이 저절로 보인다. */
.lo-crow{flex:0 0 auto;display:flex;align-items:center;gap:6px;padding-bottom:4px;
  border-bottom:1px solid #4FC3F71F}
.lo-crow .lb{flex:0 0 auto;font-size:8.5px;letter-spacing:.2em;color:#6E93AD}
.lo-crow .ct{flex:0 0 auto;margin-left:auto;font-size:8.5px;color:#6E93AD;
  font-variant-numeric:tabular-nums}
.lo-crow .hudchars{flex:1 1 auto;overflow:hidden}
.hudpop.full .hudtabs{flex:0 0 auto;margin-top:2px}
.hudpop.full .hudtab{padding:5px 10px 6px;font-size:10.5px}
/* 탭의 잔글은 **정원**이다 — .soon(「곧」 배지)의 주황을 그대로 두면 탭 다섯이
   전부 주황으로 물들어 탭 이름보다 잔글이 먼저 읽힌다. */
.hudpop.full .hudtab .soon{color:#3A5468}
.hudpop.full .hudtab.ult{border:1px dashed #3A546866;border-bottom-width:1px;
  color:#3A5468;cursor:default;margin-left:6px}
.hudpop.full .hudtab.ult .soon{color:#FF8A3D88}
.lo-main{flex:1 1 auto;min-height:0;display:flex;gap:9px;margin-top:5px}
.lo-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:4px;align-content:start}
.lo-grid .hudcell{flex-direction:row;align-items:center;gap:6px;padding:4px 7px}
.lo-grid .hudcell .n{font-size:9.5px;text-align:left}
.lo-grid .hudcell .why{text-align:left;font-size:7px}
.hudpop.full .hudside .ttl{flex:0 0 auto}
.hudpop.full .hudside .hudkv{margin-top:4px;line-height:1.36}
.hudpop.full .hudside .hudkv b{flex:0 0 26px}
.hudpop.full .hudside .hudkv em{font-style:normal;color:#4FC3F7;font-size:8px;margin-left:2px}
.lo-gate{margin-top:auto;padding-top:5px;font-size:9px;color:#D8F2FF;
  border-top:1px solid #4FC3F71F}
.lo-gate b{color:#4FC3F7;font-variant-numeric:tabular-nums}
.lo-gate i{display:block;font-style:normal;font-size:7.5px;color:#6E93AD;margin-top:1px}
.lo-done{flex:0 0 auto;margin-top:6px}
.lo-done .hudbtn{width:100%;height:30px;font-size:11.5px}
`;
{
  // ⚠️ 스모크 스텁의 `document` 에는 `head` 가 없다 — `&&` 로 조용히 건너뛴다.
  if (typeof document !== "undefined" && document.createElement && !window.__loCSS) {
    window.__loCSS = 1;
    const st = document.createElement("style");
    st.textContent = LOCSS;
    document.head && document.head.appendChild(st);
  }
}

// ── 캐릭터 열여덟 중 화면에 서는 열 ──────────────────────────────────────
// 정본은 `lib/data/characters.dart` 의 `kCharacterDefs`(기본 6 + 특수 12 = 18).
// ⚠️ **여기 서는 것은 열 칸**이고, 쌍 융합 여덟은 마지막 칸 「＋8 · 그림 대기」가
//   자리를 대신 진다.
// ⚠️⚠️ **「그림 대기」는 지금은 사실이 아니다** — 쌍 융합 열 종의 몸은 `vfx.js` 의
//   `FVSET`/`FVFIX` 에 다 그려져 있고, 폭마·섬화 장이 이미 `fvBody` 로 띄운다.
//   열여덟을 다 세우면 이 줄이 열에서 열여덟으로 늘어 팝업 배치가 통째로 달라지므로
//   **줄을 늘릴지 접을지가 판정 대기**다(`mockup-hud-deck.html#s-open` ④).
//   그 판정 전까지는 화면을 안 바꾼다.
// key 는 `ELEM.*` 의 그리기 함수 키와 그대로 같다(2차 목록을 안 만든다).
const LOCHARS = [
  { key: "gold", nm: "무속성", own: true },
  { key: "ice", nm: "빙 氷", own: true },
  { key: "fire", nm: "염 炎", own: true },
  { key: "bolt", nm: "뇌 雷", own: true },
  { key: "poison", nm: "독 毒", own: true },
  { key: "gale", nm: "풍 風", own: true },
  { key: "shade", nm: "암 影", own: false },
  { key: "whiteBase", nm: "백광 白光", own: false },
  { key: "numb", nm: "마 痲", own: false, noart: true },
  { key: "blast", nm: "플라즈마 漿", own: false, noart: true },
];
/// 로스터 키 → **평상시 몸**을 그리는 `ELEM` 칸.
///
/// ⚠️⚠️ **`ELEM.ice`·`ELEM.fire` … 를 부르지 않는다.** 그 칸들은 둘레에 모티프가
///   서는 몸이라 열 칸이 전부 「무언가를 두른 상태」로 보인다 — 캐릭터는 늘
///   **코어만 물든 평상시 몸**이다. 엔진이 같은 판정을 이미 못 박았다
///   (`lib/game/fx/body_elements.dart` 의 `drawElem` — 코어 하나뿐이다).
/// ⚠️ 백광만 제 몸이 따로 있다(`ELEM.whiteBase`) — 엔진도 코어로 안 접고
///   `body_white.dart` 의 `drawWhite` 를 따로 부른다. 여기서 같이 접으면
///   백광이 「흰 코어」로 납작해진다.
/// ⚠️ `ELEM` 의 `pre○` 라는 이름은 **함수 이름에만 남은 옛 낱말**이다 —
///   가르던 상태는 폐기됐고, 지금 이 이름들이 가리키는 것이 유일한 몸이다.
const LOBODY = {
  gold: "base", ice: "preIce", fire: "preFire", bolt: "preBolt",
  poison: "prePoison", gale: "preGale", shade: "preShade",
  whiteBase: "whiteBase",
};
function loDraw(k) { return ELEM[LOBODY[k] || k]; }
/// `hudChars` 가 받는 꼴로 편다.
function loRoster() {
  return LOCHARS.map((r) => ({ ...r, draw: r.noart ? null : loDraw(r.key) }));
}
function loCharOf(k) { return LOCHARS.find((r) => r.key === k); }

// ── 자리에 들어가는 문양 ─────────────────────────────────────────────────
// ⚠️ **새 문양을 하나도 안 그린다.** 표본은 `ICON` 에 이미 있는 것으로만 짰다 —
//   자리표를 새로 그리면 진짜 문양이 오는 날 둘이 되고, 그때 어느 쪽이 정본인지
//   아무도 모르게 된다(상점 장이 같은 이유로 `FLWGLYPH.codex` 로 떨어진다).
//   채굴 셋만은 `ICON` 에 자리가 없어 [hudMineGlyph] 가 받는다.
const LOICO = (k) => (c, W) => ICON[k](c, W);
const LOMINE = (kind) => (c, W) => hudMineGlyph(c, W, kind);
const LOCON = (id) => (c, W) => {
  const d = STCON.find((x) => x.id === id);
  if (d) stConDraw(c, W / 2, W / 2, W * 0.40, 0, d);
};

// ── 짜인 편성표 한 벌 ────────────────────────────────────────────────────────
// 표본은 **무속성**이다 — 갓 깐 저장본이 실제로 주는 캐릭터고
// (`kDefaultCharacterId`), 출격 조건 「내 속성 ≥ 3」(`kCharacterOwnMin`)이
// 스킬 다섯 안에서 **정확히 3** 으로 차 게이트가 어떻게 읽히는지가 보인다.
//   공전 · 결계 · 개안 = 무속성 3   ·   성역 = 풍 風 · 파문 = 빙 氷
// (속성 배분의 정본은 `lib/data/skill_element.dart` 의 `kSkillElementIds`)
// ⚠️ 성좌의 아랫줄은 **효과가 아니라 갈래**다(상승 · 게임). 좁은 자리에 「공격력
//   +18% · 최대 HP −20%」는 안 들어가고, 줄여 적으면 성좌의 값을 시안이 고쳐
//   쓰는 셈이 된다. 값 열둘의 정본은 성좌 장이다.
const LODECK1 = {
  char: "gold",
  basic: { nm: "빛파동", sub: "일반 · 무", glyph: LOICO("bolt") },
  skills: [
    { nm: "공전", sub: "일반 · 무", glyph: LOICO("orbit") },
    { nm: "결계", sub: "방어 · 무", glyph: LOICO("ward") },
    { nm: "개안", sub: "마법 · 무", glyph: LOICO("flare") },
    { nm: "성역", sub: "마법 · 풍", glyph: LOICO("sanctum") },
    { nm: "파문", sub: "마법 · 빙", glyph: LOICO("pulse") },
  ],
  mine: { nm: "채굴빔", sub: "이어진다", glyph: LOMINE("beam") },
  cons: [
    { nm: "사자 獅子", sub: "상승", glyph: LOCON("leo") },
    { nm: "쌍둥이 雙子", sub: "상승", glyph: LOCON("gem") },
    { nm: "황소 金牛", sub: "상승", glyph: LOCON("tau") },
  ],
};

/// **직전 출격** — 편성표가 아니다. 저장하는 슬롯이 아니라 「지난번에 이렇게 갔다」
/// 하나이고, **전역으로 한 벌**이라 스테이지를 옮겨도 따라온다.
/// ⚠️ 편성표 01 과 **한 칸만 다르다**(파문 → 낙광 · 황소 → 물병). 가깝지만 같지
///   않은 것이 「편성표」와 「직전」이 다른 물건이라는 것을 한 줄로 말한다.
const LOLAST = {
  char: "gold",
  basic: LODECK1.basic,
  skills: [
    LODECK1.skills[0], LODECK1.skills[1], LODECK1.skills[2], LODECK1.skills[3],
    { nm: "낙광", sub: "마법 · 뇌", glyph: LOICO("lightfall") },
  ],
  mine: LODECK1.mine,
  cons: [
    LODECK1.cons[0], LODECK1.cons[1],
    { nm: "물병 寶瓶", sub: "게임", glyph: LOCON("aqr") },
  ],
};

// ── 묶음 다섯의 **성격** — 두 화면이 같이 읽는 정본 ──────────────────────
// ⚠️⚠️ 이 다섯은 **개수가 다른 목록이 아니라 성격이 다른 물건**이다. 그것을
//   여기 한 자리에 적어 두고 두 화면이 같이 읽는다 — 크기·판·잔글은 화면이
//   제 치수로 정하지만, **무엇이 기둥이고 무엇이 안 싸우는 것인가는 하나다.**
//     lead 기둥   — 늘 나가는 것. 이 캐릭터의 정체            (일반 1)
//     (없음)      — 골라 담는 것                              (스킬 5 · 성좌 3)
//     aux  곁것   — **싸우는 물건이 아니다**                   (채굴도구 1)
//   궁극기는 아직 자리만이라 여기 없다 — 화면이 제 빈 칸으로 든다.
const LOROLE = {
  basic: { lb: "일반", ct: "늘 나간다", tone: "lead" },
  skills: { lb: "스킬", ct: "다섯", sep: true },
  mine: { lb: "채굴도구", ct: "안 싸운다", sep: true, tone: "aux" },
  cons: { lb: "성좌", ct: "셋", right: true },
};

/// 한 벌 → 자리 한 줄의 묶음 넷. **두 화면이 같은 줄을 쓴다.**
/// `state` 를 주면 모든 자리에 같은 상태를 입힌다(견본용).
function loGroups(d, state) {
  const s = (it) => (state ? { ...it, state } : it);
  return [
    { ...LOROLE.basic, items: [s(d.basic)] },
    { ...LOROLE.skills, items: d.skills.map(s) },
    { ...LOROLE.mine, items: [s(d.mine)] },
    { ...LOROLE.cons, items: d.cons.map(s) },
  ];
}
/// 빈 편성표의 줄 — 같은 길이 · 같은 묶음 · 속만 「＋」다. 자리 수가 같아야
/// 「비어 있다」가 「덜 만들어졌다」로 안 읽힌다.
function loVoidGroups() {
  const v = (n) => Array.from({ length: n }, () => ({ state: "void" }));
  return [
    { ...LOROLE.basic, items: v(1) },
    { ...LOROLE.skills, items: v(5) },
    { ...LOROLE.mine, items: v(1) },
    { ...LOROLE.cons, items: v(3) },
  ];
}

// ── 출격준비의 배치 — **묶음이 낱칸보다 먼저 읽히게** ────────────────────
// ⚠️⚠️ 자리 사이 틈만으로 묶음을 가르는 것은 **칸이 작을 때만 되는 수**다.
//   편성표 화면은 30px 문양만이라 자리 사이 3px 과 묶음 사이 12px 이 **네 배**로
//   벌어져 묶음이 저절로 덩이가 된다. 출격준비는 이름까지 적느라 칸이 커져
//   같은 틈이 **0.15 배**로 사라지고, 사라지는 순간 열 칸이 **균일 격자** 하나로
//   뭉쳐 「도감 한 쪽」이 된다 — 어느 것이 기본 공격이고 어느 것이 채굴 무기인지를
//   **라벨을 읽어야** 알게 된다.
//   ⇒ 이 화면은 **판**으로 감싸고 **묶음마다 크기를 달리** 준다.
//
// ⭐ 치수의 근거는 **실기(667×375)**다 — 시안 랙(788)에서만 재면 실기에서 넘친다.
//   무대 안쪽 = 667 − 여백 40 − 세로 띠 96 − 판 여백 20 = 511px.
//   첫 줄  일반 판(6+72+6+2=86) + 틈 8 + 스킬 판(6+5×54+4×3+6+2=296)
//          + 틈 8 + 궁극기 58 = 456
//   둘째 줄 성좌 판(6+3×54+2×3+6+2=182) + 틈 8 + 채굴 판(6+54+6+2=68) = 258
//   ⇒ 두 줄 다 511 안에 여유가 남아 **잔글 한 줄**이 오른쪽에 같이 선다.
//   세로도 실기가 정한다 — 판 한 줄 = 테 2 + 여백 7 + 머리글 14 + 칸 76 = 99 이고
//   카드 252 안에 머리줄 26 · 두 줄 198 · 틈 8 이 들어 4px 이 남는다.
/// ⚠️ 기둥의 **문양은 칸만큼 안 키운다.** 칸을 72 로 키운 것은 「늘 나간다」를
///   폭으로 말하려는 것이고, 문양까지 0.62 배로 따라 키우면 45px 이 되어 이름
///   두 줄이 칸 밖으로 밀린다(실측: 필요 82 · 있는 것 76). 문양은 40 에서 멈춘다.
const LOSZ = { lead: 72, leadArt: 40, skill: 54, cons: 54, mine: 54 };
/// 이름을 적는 자리의 세로 — 문양 + 이름 두 줄. 한 값으로 못박아 **줄마다
/// 자리 밑선이 맞게** 한다(크기가 달라도 높이는 같아야 두 줄이 나란히 선다).
const LOSLOTH = 76;
/// 출격준비의 자리 줄 **둘**. 가르는 자리는 축이 갈리는 곳이다:
///   첫 줄  = **내가 쏘는 것** — 일반(기둥) · 스킬 다섯 · (궁극기 빈 자리)
///   둘째 줄 = **그 밖** — 성좌(판에 걸린 것) · 채굴도구(안 싸우는 것)
/// ⚠️⚠️ 채굴을 첫 줄에서 뗀 것이 이 배치의 알맹이다. 스킬 옆에 같은 꼴로 서면
///   「여섯 번째 스킬」로 읽힌다 — **줄을 갈라야** 「다른 일」이 그림이 된다.
function loGroupsSortie(d) {
  const g = loGroups(d);
  const sz = (x, s, a) => ({ ...x, size: s, art: a, h: LOSLOTH, sep: false, right: false });
  return [
    [sz(g[0], LOSZ.lead, LOSZ.leadArt), sz(g[1], LOSZ.skill)],
    [sz(g[3], LOSZ.cons), sz(g[2], LOSZ.mine)],
  ];
}

// ── 고르는 창 — 편성표의 「편집」과 출격준비의 「바꾼다」가 **같은 창**이다 ────
// ⭐ **차례가 곧 규칙이다** — 캐릭터 줄이 맨 위에 있고 그 아래가 탭이다.
//   캐릭터를 안 고르면 어떤 스킬이 「내 속성」인지 정해지지 않아 아래 격자가
//   무엇도 못 판정한다. 위에서 아래로 읽으면 그 의존이 저절로 보인다.
const LOTABS = [
  ["일반공격", "하나만 든다"],
  ["스킬", "다섯"],
  ["성좌", "셋"],
  ["채굴", "하나 · 비울 수 없다"],
];
/// 탭마다의 후보. `st`: ""(보유) · "on"(고른 것) · "dim"(미보유)
/// ⚠️ 여덟·여섯·셋은 **문양이 있는 것 전부**다. 도감은 53종이고, 격자 아래의
///   페이드 한 줄이 그것을 말한다(도감 장이 세운 문법 — 자르고 끝내지 않는다).
const LOPOOL = {
  0: [["빛파동", "무 · 기본 지급", LOICO("bolt"), "on"],
  ["빛따발총", "뇌 · 상점", LOICO("smg"), ""],
  ["바람산탄총", "풍 · 상점", LOICO("scatter"), ""],
  ["유도탄", "무 · 상점", LOICO("seeker"), ""],
  ["뇌광", "뇌 · 기본 지급", LOICO("arc"), ""],
  ["순포", "염 · 상점", LOICO("sunpo"), "dim"]],
  1: [["공전", "일반 · 무", LOICO("orbit"), "on"],
  ["결계", "방어 · 무", LOICO("ward"), "on"],
  ["개안", "마법 · 무", LOICO("flare"), "on"],
  ["성역", "마법 · 풍", LOICO("sanctum"), "on"],
  ["파문", "마법 · 빙", LOICO("pulse"), "on"],
  ["낙광", "마법 · 뇌", LOICO("lightfall"), ""],
  ["광주", "마법 · 뇌", LOICO("pillar"), ""],
  ["빛폭탄", "일반 · 염", LOICO("shotgun"), "dim"]],
  2: STCON.map((d, i) => [d.nm, d.eff, LOCON(d.id), i < 3 ? "on" : (i < 7 ? "" : "dim")]),
  3: [["채굴빔", "이어진다", LOMINE("beam"), "on"],
  ["채굴포", "한 발씩", LOMINE("cannon"), ""],
  ["채굴탄", "뭉친 광맥을 한 번에", LOMINE("bomb"), ""]],
};

/// 고르는 창을 연다.
/// o: {title 창틀 글, deck 지금 한 벌(없으면 빈 편성표), tab 처음 열 탭, done 마침 단추 글}
///
/// ⚠️⚠️ **틀을 `innerHTML` 로 찍고 `querySelector` 로 되찾지 않는다.**
///   스모크 스텁(`tools/mockup_smoke.js`)의 가짜 DOM 은 `innerHTML` 이 무동작이고
///   `querySelector` 가 늘 null 이라, 그 길로 지으면 장이 통째로 「LOAD FAIL」이
///   된다. 칸은 `createElement` 로 쌓고 **참조를 그 자리에서 들고 간다.**
function loPicker(scr, o) {
  if (!scr) return null;
  const opt = o || {};
  const old = scr.querySelector(".hudpop"); if (old) old.remove();
  const mkdiv = (cls, parent) => {
    const e = document.createElement("div");
    e.className = cls;
    if (parent) parent.appendChild(e);
    return e;
  };
  const pop = mkdiv("hudpop full");
  const bx = mkdiv("bx", pop);
  const head = mkdiv("hd", bx);
  // 창틀의 낱말만 두 화면에서 다르다 — 편성표에서는 **편성표에 저장하는 일**이고,
  // 출격준비에서는 **이번 판에만 쓰는 일**이다. 창은 같고 하는 일이 갈린다.
  head.insertAdjacentHTML("beforeend", `<b>${opt.title || "편성"}</b> ${opt.verb || "고르기"}`);
  const x = mkdiv("x", head);
  x.textContent = "✕";
  const bd = mkdiv("bd", bx);
  const crow = mkdiv("lo-crow", bd);
  crow.insertAdjacentHTML("beforeend", `<span class="lb">캐릭터</span>`);
  const chost = mkdiv("hudchars", crow);
  crow.insertAdjacentHTML("beforeend", `<span class="ct">보유 6 / 18</span>`);
  const tabs = mkdiv("hudtabs", bd);
  const main = mkdiv("lo-main", bd);
  // 격자를 상자에 넣고 그 아래에 「더 있다」 한 줄 — 도감이 세운 문법 그대로다.
  const gbox = mkdiv("hudscrollbox", main);
  const grid = mkdiv("lo-grid", gbox);
  const fade = mkdiv("hudfade", gbox);
  fade.textContent = "아래로 — 도감 53종이 같은 규칙으로 이어진다";
  const side = mkdiv("hudside", main);
  scr.appendChild(pop);

  const d = opt.deck;
  // 빈 편성표를 열면 **아무도 안 골라져 있다** — 캐릭터가 첫 손짓인 것이 그래야 보인다.
  hudChars(chost, loRoster(), d ? d.char : null, { size: 26 }, () => { });
  // ＋8 — 그림이 아직 없는 쌍 융합 여덟의 자리. 열여덟이라는 수가 화면에서
  // 안 사라지게 한다.
  chost.insertAdjacentHTML("beforeend", `<div class="hudchar more">＋8<br>그림 대기</div>`);

  // ⚠️⚠️ **금테는 후보 표가 아니라 지금 한 벌에서 읽는다.** 표에 박아 두면
  //   창이 어느 편성표에서 열리든 늘 같은 다섯에 금테가 서서, 오른쪽 「편성 요약」이
  //   말하는 것과 격자가 말하는 것이 어긋난다(직전 출격은 파문이 아니라 낙광이다).
  const picked = new Set();
  if (d) {
    [d.basic, d.mine].forEach((it) => it && picked.add(it.nm));
    (d.skills || []).forEach((it) => picked.add(it.nm));
    (d.cons || []).forEach((it) => picked.add(it.nm));
  }

  let cur = opt.tab == null ? 1 : opt.tab;
  const paint = () => {
    tabs.innerHTML = LOTABS.map(([nm, ds], i) =>
      `<div class="hudtab${i === cur ? " on" : ""}" data-t="${i}">${nm}<span class="soon">${ds}</span></div>`).join("")
      // 궁극기 — 자리만. 눌러도 아무 일이 없다(무엇을 열어야 할지가 안 정해졌다).
      + `<div class="hudtab ult">궁극기<span class="soon">판정 대기</span></div>`;
    tabs.querySelectorAll("[data-t]").forEach((el) => el.addEventListener("click", () => {
      cur = +el.dataset.t; paint();
    }));
    grid.innerHTML = "";
    (LOPOOL[cur] || []).forEach(([nm, sub, glyph, st0]) => {
      // 표가 지는 것은 **보유·미보유**뿐이다(편성표와 무관하다). 금테는 위에서 뽑은
      // `picked` 가 진다 — 빈 편성표면 그 집합이 비어 있어 저절로 하나도 안 선다.
      const st = st0 === "dim" ? "dim" : (picked.has(nm) ? "on" : "");
      const cell = document.createElement("div");
      cell.className = "hudcell" + (st === "on" ? " on" : "") + (st === "dim" ? " lock dim" : "");
      const cv = document.createElement("canvas");
      cv.style.width = "22px"; cv.style.height = "22px";
      cell.appendChild(cv);
      cell.insertAdjacentHTML("beforeend",
        `<div class="n">${nm}</div><div class="why">${st === "dim" ? "상점에서" : sub}</div>`);
      grid.appendChild(cell);
      mk(cv, [48, 48], function loPoolGlyph(c, t, dt, W) { glyph(c, W); }, { clear: true });
    });
  };
  paint();

  // 오른쪽 창 — 「편성 요약」. **탭이 바뀌어도 안 바뀐다**: 지금 무엇을 고르고
  // 있든 「출격까지 얼마나 남았나」는 계속 보여야 한다(엔진의 같은 기둥과 같은 몫,
  // `lib/ui/loadout_gate.dart` — **엔진 쪽은 아직 옛 이름 「고른 것」이다**).
  // ⚠️ 여기는 **자리 그림이 아니라 이름**이다 — 176px 창에 자리 열을 구겨 넣으면
  //   그림도 이름도 안 읽힌다. 뒤의 화면이 이미 자리 그림을 지고 있다.
  const ch = d && loCharOf(d.char);
  const kv = (k, v) => `<div class="hudkv"><b>${k}</b><span>${v}</span></div>`;
  const nil = `<span style="color:#3A5468">아직 없다</span>`;
  side.insertAdjacentHTML("beforeend",
    `<div class="ttl">편성 요약<i>${opt.title || ""}</i></div>`
    + kv("캐릭터", ch ? ch.nm : nil)
    + kv("일반", d ? `${d.basic.nm} <em>1 / 1</em>` : `${nil} <em>0 / 1</em>`)
    + kv("스킬", d ? `${d.skills.map((s) => s.nm).join(" · ")} <em>5 / 5</em>` : `${nil} <em>0 / 5</em>`)
    + kv("채굴", d ? `${d.mine.nm} <em>1 / 1</em>` : `${nil} <em>0 / 1</em>`)
    + kv("성좌", d ? `${d.cons.map((s) => s.nm).join(" · ")} <em>3 / 3</em>` : `${nil} <em>0 / 3</em>`)
    + `<div class="lo-gate">출격 조건 — ${ch ? ch.nm : "캐릭터"} 스킬 <b>${d ? 3 : 0}</b> / 3`
    + `<i>다섯 중 셋이 내 속성이라야 나갈 수 있다</i></div>`
    + `<div class="lo-done"><div class="hudbtn ${d ? "sel" : "lock"}">${opt.done || "편성"}</div></div>`);
  x.addEventListener("click", () => pop.remove());
  hudPanels();
  return pop;
}
