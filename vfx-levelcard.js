// ══════════════════════════════════════════════════════════════════════════
// LC — 레벨업 카드                                              (2026-08-24)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 사용자 원문: 「레벨업 카드 **종류에 대한 시안과 도감을 정확히 분류하지 않아서**
// 내가 레벨업 카드에 뭐가 뜨는지 모르겠는 게 문제인 듯」
// ⇒ **엔진이 나중에 이 장을 따른다.** 지금 하는 일은 장을 세우는 것이다.
//
// ── ⭐⭐ 등급은 **색이 아니라 그림의 급**이다 ──────────────────────────────
// 사용자 판정(2026-08-24):
//   「**등급색은 겹쳐도 상관없긴 한데** 대신 **화려하게** 해야 함, **등급이
//     올라갈수록**」 · 「**화려하다는 게 빛을 막 넣고 어쩌고가 아니고**」 ·
//   「**그림 자체가 멋있어야 함**」
//
// ⇒ **발광을 등급의 손잡이로 쓰지 않는다.** 넷의 후광 예산이 같다 —
//   [LCHALO] 하나를 넷이 공유하고, 등급이 올라도 이 값이 안 바뀐다.
//
// ── ⭐⭐ 2차 판정 — 「심심하다」 (2026-08-24 오후) ─────────────────────────
// 사용자가 첫 판을 보고 넷을 더 말했다:
//   ① 「오 대박! 이런 형태 완전 기대한 거 맞아」 — **구조는 반겼다.**
//      ⇒ 등급 넷 · 확률 · 수치 · 연출의 층 구성은 **안 건드린다.**
//   ② 「근데 아직도 **조금 심심한 느낌**이 있긴 해서 이거 참고해서 더 화려하게」
//      + 레퍼런스 석 장(금 선화 카드 뒷면 · 홀로그램 타로 · 원신풍 채색 카드)
//   ③ 「'일반'이 심심한 건 좋은데 **'너무' 심심해**」 ·
//      「**일반의 화려함 수준을 올리고** 레전더리의 화려함 수준을 **엄청 올려줘**」
//   ④ 「'열리는 애니메이션' 자체는 괜찮은데 솔직히 **'화려'하진 않거든?**
//      **빛이 세어나온다거나** 좀 더 디테일한 디자인들이 더 들어가야 될 것 같아」
//   ⑤ 「**카드다 보니까 좀더 프레임 많이 써도 될 것 같아**」 ·
//      「레벨업은 게임 내내 보여지는 게 아니고 **'레벨업 시' 보여지는 거니까**」
//
// ⇒ 이 파일이 그 넷을 받은 판이다. 손댄 축은 셋이고, **안 댄 축이 하나** 있다.
//
//   [올린 축 ①] **도안의 밀도** — 빈 검은 면을 없앴다. 레퍼런스 97 을 보면
//     어디에도 빈 검은 면이 없다. 바닥 격자 · 파선 고리 · 꽃무늬 · 흩뿌린
//     반짝임을 **전 등급에** 깔았고, 일반도 예외가 아니다(등급이 낮은 것은
//     「비어 있다」가 아니라 「**조용하다**」로 나야 한다 — 무채 한 색으로,
//     움직이지 않게).
//   [올린 축 ②] **획의 색 수** — 아래 [색 흐름] 절.
//   [올린 축 ③] **여는 동안의 빛** — 아래 [여는 빛] 절.
//   [⚠️ 안 댄 축] **후광 예산.** [LCHALO] 는 그대로 넷이 나눠 쓴다.
//
// ── ⭐⭐ 색 흐름 — 화려함의 둘째 축 ────────────────────────────────────────
// 지금까지 축이 「층수」 하나였다. 레퍼런스 98(홀로그램 타로 4장)이 둘째를
// 갖고 있었다 — 그 카드들은 **선이 얇은데도** 화려하다. 화려함이 굵기가 아니라
// **한 획 안에서 색이 흐르는 것**에서 온다.
//
// ⚠️⚠️ **무지개를 그대로 안 쓴다.** 98 은 분홍→하늘→민트→보라가 한 획을
//   지나는데, 그것을 등급 넷에 그대로 얹으면 **넷이 다 비슷해진다** — 등급을
//   가르려고 넷으로 갈라 둔 색이 통째로 뭉개진다. ⇒ 각 등급의 **본색을 중심으로
//   한 좁은 흐름**만 쓴다(레어면 청→민트→청, 유니크면 보라→자홍→청보라,
//   레전더리면 금→백→금). 일반은 **색이 하나**라 명도만 흐르고 **안 움직인다.**
// ⚠️⚠️ **`A()` 는 `#RRGGBB` 만 받는다.** 그리고 캔버스는 잘못된
//   `strokeStyle`/`fillStyle` 을 예외 없이 **조용히 무시**한다 — 면이 안 보이면
//   밝기가 아니라 **칠 실패**다. 그라디언트는 문자열이 아니라 **객체**라
//   `createLinearGradient` 로 직접 짓고 넣는다. [LCflowL] 이 그 유일한 문이다.
// ⚠️⚠️ 그라디언트 좌표는 **칠하는 순간의 좌표계**로 읽힌다 — `translate`·
//   `rotate` 안에서 쓰면 무늬가 획과 같이 돈다. ⇒ 흐름을 쓰는 도안은 **변환을
//   안 쓰고** 기저 벡터로 직접 찍는다(뇌문 띠가 `ux,uy / vx,vy` 를 쓰는 이유).
//
// ── ⭐⭐ 여는 빛 — 사다리가 아니라 **타임라인** 위에 있다 ──────────────────
// 사용자 ④(「빛이 세어나온다거나」)와 「발광을 등급의 손잡이로 쓰지 마라」는
// **모순이 아니다.** 둘을 이렇게 갈랐다:
//
//   여전히 금지 | 발광 **세기로 등급을 구분**하는 것. [LCHALO] 공유 규약 유지
//   이제 한다   | **여는 순간의 장면**으로서의 빛 — 갈라진 틈에서 새는 빛,
//               | 각인이 켜지며 번지는 빛, 별을 잇는 선을 타고 흐르는 빛
//
// ⇒ 코드에서 지키는 방법: `op.light` 는 **여는 칸에서만 1**이고 정지 칸
//   ([LCFULL])에서 **0**이다. 다 열려 놓인 카드 넷의 발광은 **완전히 같다.**
//
// ── ⭐ 「우주 고대」의 어휘는 이 게임 안에 이미 있다 ────────────────────────
// 사용자 원문: 「진짜 막 그 **우주 속 고대에 엄청 화려하고 멋있는 카드를 여는
// 것 같은** 연출」
// ⇒ 새 그림체를 안 들였다. ⚠️ 「화풍」이라 안 적는다 — 2026-08-24 부터 염+풍
//   캐릭터 이름이 **「화풍」**이라(`vfx.js` 의 `FVNAME`) 같은 글자가 됐다.
//   **성좌 12**(`vfx.js` 의 `STCON`)가 정확히 그 자리다 —
//   별 배치 + 잇는 선 + 알파성. `constellations.dart` 가 「별 좌표와 선 연결은
//   안 옮긴다 — 그것은 아이콘의 일이고, 아이콘은 아직 없다」고 적어 둔 그
//   미사용 자산을 **카드의 배경 도해로** 쓴다.
//   ⚠️ `STCON` 을 **읽지도 부르지도 않는다** — 배치를 베끼면 「사자자리 카드」가
//     되어 성좌 카드와 뜻이 겹친다. 빌린 것은 **문법**(점·선·알파성·눈금)이다.
//
// ── 레퍼런스 석 장에서 가져온 것 ──────────────────────────────────────────
//   97 금 선화 카드 뒷면 | 이중 테 + 그 사이 여백 띠 · 모서리 갈고리 장식 ·
//                       | 뇌문(ㄱ자) 띠 · 밧줄 꼬임 고리 · 오목한 4각별 ·
//                       | 꽃 모티프 · 흩뿌린 4각 반짝임
//                       | ⭐ **빈 검은 면이 한 군데도 없다** ← 제일 큰 수확
//   98 홀로그램 타로    | 한 획 안의 색 흐름 · 동심원 파선 · 구슬 축선 ·
//                       | 머리의 규칙선-문양-규칙선 · 발치의 이름 띠 ·
//                       | 떠 있는 짧은 눈금선 · 저폴리 면 갈림
//   99 원신풍 채색 카드 | **구도만** 가져왔다 — 발광 코어 + 그 둘레를 감는
//                       | 소용돌이 + 방사선 + 한 색조 배경. ⚠️ 손으로 그린
//                       | 채색은 절차 생성으로 그대로 못 간다(가져오려 하면
//                       | 붓질을 흉내 내다 획이 지저분해진다)
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️ `docs/vfx/vfx.js`(50,000줄+)는 **읽기만** 한다. 최상위 이름을 전부 `LC` 로
//   격리했다. `A`·`TAU`·`mixHex`·`gAdd`·`mk`·`asRow`·`asCell`·`box` 는 그쪽
//   것을 **부른다**(사본 금지).
// ⚠️ **`FX` 에 안 얹는다** — `FX` 는 엔진 배선과 대조되는 표라(린트 ㉓) 엔진에
//   없는 id 를 넣을 자리가 아니다. 그리기 함수는 `mk()` 에 직접 넘긴다.
// ⚠️ **난수 0건.** `Math.random` 을 한 번도 안 부른다. 흩뿌린 별의 자리는
//   [LChash] 가 인덱스에서 내는 값이라 새로고침해도 같은 카드가 나온다.
// ⚠️ **루프는 [LCT] 하나에서 파생한다.** 주기가 둘이면 최소공배수 자리에서
//   툭 끊긴다(`STCON_T` 가 먼저 겪은 자리). 고리의 회전만 [LCROT] 인데 그것도
//   `LCT` 의 정수배로 잡았다.
// ⚠️ **연산량은 안 아낀다**(사용자 ⑤). 이 그림은 전투가 **멎은** 화면에만 뜨고
//   전투 렌더와 예산을 안 다툰다 — 이 저장소의 오랜 병목(GPU 채우기)이
//   여기서는 안 걸린다. 겹치는 층·세밀한 획을 비용을 이유로 빼지 않았다.
// ⚠️⚠️ **길이는 예산이 아니라 설계다.** 허용치를 다 쓰지 않았다 — 판당
//   레벨업이 70회라 일반은 여전히 **짧아야** 한다(0.34초). 빈 시간이 붙은
//   연출은 화려한 것이 아니라 **느린 것**이다.
// ⚠️ 호스트가 없는 장에서는 조용히 건너뛴다.
// ══════════════════════════════════════════════════════════════════════════

/// 모든 카드의 **단일 주기**(초). 여는 연출 · 반짝임 · 두 박자가 전부 여기서 난다.
/// ⚠️ 4.8 → 7.2 로 늘렸다. 레전더리 연출이 3.1초가 되면서 4.8초 주기에서는
///   **다 열린 카드를 볼 시간이 0.9초**밖에 안 남았다(등장 뒤 바로 퇴장).
///   그림을 화려하게 해 놓고 볼 틈을 안 주면 올린 밀도가 화면에 안 남는다.
const LCT = 7.2;
/// 고리가 한 바퀴 도는 시간. ⚠️ **`LCT` 의 정수배**라야 이음매가 안 생긴다.
const LCROT = LCT * 4;

/// 카드의 논리 크기. 세로가 긴 것은 이 게임의 3택 카드가 그렇기 때문이다
/// (`vfx.js` 의 `CARDS` 블록 · 206px 폭).
const LCCW = 240, LCCH = 336;

/// ⚠️⚠️ **넷이 같이 쓰는 후광 예산.** 등급이 올라도 이 값이 안 바뀐다 —
///   그것이 「발광으로 화려하게 하지 마라」를 코드에서 지키는 방법이다.
///   등급을 올리는 손잡이는 [LCRANK] 의 `layers`·`hues` 다.
/// ⚠️ 「여는 동안의 빛」은 이 예산 **밖**이다 — 그것은 사다리가 아니라
///   타임라인 위에 있고, 다 열린 뒤에는 0 이라 넷이 다시 같아진다.
const LCHALO = 0.30;

const LCFONT = (w, s) => `${w} ${s}px "Apple SD Gothic Neo",-apple-system,sans-serif`;

// ── 등급 넷 ───────────────────────────────────────────────────────────────
//
// `p`       등장 확률(%) — 사용자 확정 65 / 27 / 7 / 1
// `mark`    한 글자 문양. `skill_rank.dart` 가 「색이 아니라 글자다」로 못 박은
//           그 장치를 그대로 빌렸다(계열 색이 이미 여덟이라 아홉째 색을 만들면
//           화면에서 두 축이 색으로 싸운다).
// `col`     [어두움, 본색, 밝음] — `CelTone` 과 같은 3단 구성이다.
// `flow`    ⭐ **획 안을 흐르는 색 고리.** 본색 언저리에서만 돈다. 일반만
//           명도 셋(= 색 하나)이고 **위상이 고정**이라 안 움직인다.
// `layers`  이 등급이 세우는 층 수. **이것이 등급의 실체다.**
// `hues`    쓰는 색 수. `skill_rank` 의 유니크 조건이 「색이 둘 이상」이다.
// `rankRef` `lib/data/skill_rank.dart` 의 어느 칸에 대응하나.
//
// ⚠️⚠️ **「레어」는 화면 이름이고 코드 이름은 「희귀 稀」다**(사용자 지시:
//   「등급은 일반 레어 유니크 레전더리」). 같은 것이므로 여기서 이어 둔다.
// ⚠️⚠️ **두 사다리는 칸 수만 같고 칸이 안 맞는다.** `skill_rank` 는
//   일반 一 · 고급 高 · 희귀 稀 · 유니크 唯 인데, 카드 등급에는 **고급 高 이
//   없고** 대신 **레전더리가 위에 하나 더** 있다. 같은 낱말을 쓰되 같은 표가
//   아니다 — 이식할 때 `SkillRank` 를 그대로 재사용하면 안 되는 자리다.
const LCRANK = [
  {id:"common", nm:"일반", mark:"一", p:65, layers:15, hues:1,
   col:["#242830","#98A0AE","#D8DEE8"],
   flow:["#7E8695","#B8C0CE","#8E96A6"],
   rankRef:"common('일반','一')",
   rule:"⭐ **옛 레어의 도안을 그대로 물려받았다** — 뇌문 띠 · 밧줄 꼬임 · 오목한 4각별 · 방사선 · 파선 고리 셋 · 구슬 축선 · 별 셋 · 테 셋. " +
        "무채 한 색이고 **아무것도 안 움직인다**(흐름 고정 · 잔상 없음 · 두 박자 없음)",
   opens:"내려와 멎고, 빗금 하나가 판을 한 번 훑고 지나간다 (0.34초)"},
  {id:"rare", nm:"레어", mark:"稀", p:27, layers:16, hues:2,
   col:["#13324E","#4FA0E8","#DCEEFF"],
   flow:["#3E86D4","#5FD8D0","#4FA0E8","#79B8F2"],
   rankRef:"rare('희귀','稀') — ⚠️ 화면 이름만 「레어」다",
   rule:"일반과 **같은 도안**이다. 갈리는 것은 색이 아니라 ⭐ **문양이 앉는 자리** — 레어만 문양이 " +
        "**각인 판(팔각 음각 판)** 위에 앉는다. 거기에 흐름이 돌고(청↔민트) 잔상과 두 박자가 붙는다",
   opens:"미끄러져 들어와 멎고, 불붙은 끝이 안쪽 테를 한 바퀴 긋는다 (1.00초)"},
  {id:"unique", nm:"유니크", mark:"唯", p:7, layers:25, hues:3,
   col:["#2E1A52","#B07AF0","#F0E4FF"],
   flow:["#9A5FE4","#E070D8","#7C74F0","#C48CF6"],
   rankRef:"unique('유니크','唯')",
   rule:"층이 선다 — 성좌 도해 + 각도 눈금 + 소용돌이 + 4각별 두 겹 + 밧줄 + 뇌문 사방. " +
        "⭐ 중앙은 4각 별이 아니라 **혼천의**다 — 역방향 궤도 두 겹 + 잔향이 그 둘레를 돈다",
   opens:"각인이 켜지며 번지고, 별을 잇는 선을 빛이 타고 흐르고, 마지막에 혼천의가 선다 — " +
         "대좌 → 자오환 → 누워 있던 고리 넷이 일어선다 (1.80초)"},
  {id:"legend", nm:"레전더리", mark:"極", p:1, layers:30, hues:4,
   col:["#4A2E06","#FFC24A","#FFF2CE"],
   flow:["#F0A828","#FFF6DC","#FFC24A","#FFE49A"],
   rankRef:"— **없다.** 스킬 등급에 다섯째 칸이 없어 여기서 지었다",
   rule:"⭐ **테가 곧 그림이다.** 황도 고리 + 밧줄 꼬임 + 오목한 4각별 + 소용돌이 + " +
        "방사선 + 쐐기 각인 띠 + 모서리 문장 획 + 마루장식이 **테 밖으로 넘는다**",
   opens:"닫힌 석판이 갈라지고 그 틈에서 빛이 새어나온다 → 고리가 보이고 → 각인이 번지고 → " +
         "대좌가 벌어지고 첨탑이 솟고 깃이 펼쳐지고 보석 조각 여섯이 날아와 맞물린다 (3.10초)"},
];

// ── 루프 안전 스케줄 ──────────────────────────────────────────────────────
// 넷 다 `t/LCT` 의 순수 주기 함수다 — 위상에서 파생한 값(누적기 · `(t*k)|0`)은
// 안 쓴다. 주기 끝과 처음이 다르면 매 주기 툭 하고 다시 시작하는 것이 보인다.

/// 별 반짝임 — 주기당 정확히 5번. `stConTwinkle` 과 같은 꼴이다.
/// ⚠️ 3 → 5. `LCT` 를 4.8 → 7.2 로 늘렸으므로 그대로 두면 반짝임이 1.5배 느려진다.
function LCtw(t, i) { return 0.62 + 0.38 * Math.sin(TAU * 5 * t / LCT + i * 2.399); }
/// 두 박자 — 주기당 1번, 양끝에서 값도 기울기도 0. sin(πu) 를 안 쓰는 이유는
/// 양끝 기울기가 ±π 로 부호만 뒤집혀 이음매에 각이 지기 때문이다.
function LCbump(u, p) {
  const s = 0.5 - 0.5 * Math.cos(TAU * u);
  return Math.pow(s, p == null ? 6 : p);
}
/// 흩뿌린 자리 — 인덱스만 먹는다. **시간을 안 먹으므로** 새로고침해도 같다.
function LChash(i) { const s = Math.sin(i * 127.1 + i * i * 0.017) * 43758.5453; return s - Math.floor(s); }
const LCcl = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
/// 0→1 을 부드럽게. 여는 연출의 모든 구간이 이걸 지난다.
const LCes = (v) => { const u = LCcl(v); return u * u * (3 - 2 * u); };
/// **한 사건의 봉우리.** 여는 빛이 전부 이걸 지난다 — `c0` 에서 제일 밝고
/// **`u=1` 에서 정확히 0** 이다. 끝이 0 이라야 「다 열린 넷의 발광이 같다」가
/// 그림에서 참이 된다.
function LCbell(u, c0, w) {
  const x = LCcl(u), v = (x - c0) / w;
  return Math.exp(-v * v * 4) * (1 - LCes((x - 0.76) / 0.24));
}

// ── ⭐ 색 흐름 — 이 파일에서 그라디언트가 나는 유일한 문 ───────────────────
//
// ⚠️ `cols` 를 **고리로** 읽는다. 위상 `ph` 가 0→1 을 돌면 처음 그림으로
//   정확히 돌아오므로 이음매가 원래 없다.
// ⚠️ 반환값은 **문자열이 아니라 객체**다 — `A()` 로 만들 수 없다.

/// 직선 흐름. 카드 대각선 하나에 걸어 두고 카드 안의 획이 전부 나눠 쓴다
/// (98 의 카드들이 한 장 안에서 같은 홀로그램 결을 공유하는 것과 같다).
function LCflowL(c, x0, y0, x1, y1, cols, al, ph) {
  const gd = c.createLinearGradient(x0, y0, x1, y1);
  const n = cols.length, p = ((ph || 0) % 1 + 1) % 1;
  for (let i = 0; i <= 12; i++) {
    const uu = i / 12, f = ((uu + p) % 1) * n;
    const k = Math.floor(f) % n;
    gd.addColorStop(uu, A(mixHex(cols[k], cols[(k + 1) % n], f - Math.floor(f)), al));
  }
  return gd;
}
// ── 획 ────────────────────────────────────────────────────────────────────

/// 쐐기 — 스탯 문양의 기본 획이다(`lib/ui/icons_card.dart` 의 `icTri`).
function LCtri(c, x, y, a, len, wid, col) {
  const ca = Math.cos(a), sa = Math.sin(a);
  c.beginPath();
  c.moveTo(x + ca * len, y + sa * len);
  c.lineTo(x - sa * wid, y + ca * wid);
  c.lineTo(x + sa * wid, y - ca * wid);
  c.closePath(); c.fillStyle = col; c.fill();
}
function LCdot(c, x, y, r, col) {
  if (!(r > 0)) return;
  c.beginPath(); c.arc(x, y, r, 0, TAU); c.fillStyle = col; c.fill();
}
function LCring(c, x, y, r, col, lw) {
  if (!(r > 0)) return;
  c.beginPath(); c.arc(x, y, r, 0, TAU);
  c.strokeStyle = col; c.lineWidth = lw || 1; c.stroke();
}
function LCbar(c, x, y, w, h, col, r) {
  c.beginPath();
  if (c.roundRect) c.roundRect(x - w / 2, y - h / 2, w, h, r || 0);
  else c.rect(x - w / 2, y - h / 2, w, h);
  c.fillStyle = col; c.fill();
}
/// 마름모 — 규칙선의 끝을 맺는다(98 의 이름 띠 양끝).
function LCdia(c, x, y, s, col) {
  c.beginPath();
  c.moveTo(x, y - s); c.lineTo(x + s, y); c.lineTo(x, y + s); c.lineTo(x - s, y);
  c.closePath(); c.fillStyle = col; c.fill();
}
/// **4각 반짝임** — 97 이 배경에 흩뿌린 그것. 오목한 네 갈래라 「별」이 된다.
function LCspark(c, x, y, s, col, thin) {
  const k = thin == null ? 0.13 : thin;
  c.beginPath();
  for (let q = 0; q < 4; q++) {
    const a0 = q * Math.PI / 2, a1 = a0 + Math.PI / 2, am = a0 + Math.PI / 4;
    const px = x + Math.cos(a0) * s, py = y + Math.sin(a0) * s;
    const mx = x + Math.cos(am) * s * k, my = y + Math.sin(am) * s * k;
    const nx = x + Math.cos(a1) * s, ny = y + Math.sin(a1) * s;
    if (!q) c.moveTo(px, py);
    c.quadraticCurveTo(mx, my, nx, ny);
  }
  c.closePath(); c.fillStyle = col; c.fill();
}
/// **음각 획** — 어두운 홈 + 그 아래 밝은 모서리. 「파낸 자국」의 최소 문법이고
/// 이 카드의 「고대 석판」이 여기서 난다(그림자 하나로 두께가 생긴다).
/// ⚠️ `dark`·`lite` 는 **문자열이거나 그라디언트**다 — 등급이 오르면 밝은 쪽이
///   흐름 객체로 바뀌면서 같은 획이 홀로그램이 된다.
function LCcarve(c, path, dark, lite, lw) {
  c.lineWidth = lw || 1; c.lineCap = "butt";
  c.strokeStyle = dark; c.beginPath(); path(c, 0); c.stroke();
  c.strokeStyle = lite; c.beginPath(); path(c, 1); c.stroke();
}
/// 사각 음각 테. `rev` 가 1 미만이면 **그 비율만큼만 그어진다**(여는 연출).
function LCframe(c, x, y, w, h, dark, lite, rev, lw) {
  const per = 2 * (w + h), r = LCcl(rev == null ? 1 : rev);
  if (r <= 0) return;
  c.save();
  if (r < 1 && c.setLineDash) c.setLineDash([per * r, per]);
  LCcarve(c, (cc, o) => cc.rect(x + 0.5 + o, y + 0.5 + o, w - 1 - o * 2, h - 1 - o * 2), dark, lite, lw);
  c.restore();
  if (c.setLineDash) c.setLineDash([]);
}
/// 테 위의 한 점 — `u`(0~1)가 둘레를 한 바퀴 돈다. `rect()` 와 **같은 차례**
/// (좌상 → 우 → 하 → 좌)라야 「긋고 있는 끝」이 실제 획 끝에 붙는다.
function LCframePt(x, y, w, h, u) {
  let dd = (((u % 1) + 1) % 1) * 2 * (w + h);
  if (dd < w) return [x + dd, y];
  dd -= w; if (dd < h) return [x + w, y + dd];
  dd -= h; if (dd < w) return [x + w - dd, y + h];
  dd -= w; return [x, y + h - dd];
}

// ── ⭐ 97 에서 가져온 도안 — 「빈 검은 면을 없애는」 연장들 ─────────────────

/// **바닥 격자** — 대각 빗금 두 방향. 97 의 수확이 이것 하나다: 레퍼런스는
/// 어디에도 빈 검은 면이 없다. 제일 싼 채움이고, 알파를 낮게 쓰면 「채워졌지만
/// 조용하다」가 된다.
/// ⚠️ 일반도 이걸 깐다. 등급이 낮은 것은 **비어 있는 것이 아니라 조용한 것**이다.
function LClattice(c, X, Y, W, H, step, ink, lw) {
  c.save();
  c.lineWidth = lw || 1; c.strokeStyle = ink; c.lineCap = "butt";
  c.beginPath();
  for (let d = -H; d < W + H; d += step) {
    c.moveTo(X + d, Y); c.lineTo(X + d + H, Y + H);
    c.moveTo(X + d, Y); c.lineTo(X + d - H, Y + H);
  }
  c.stroke();
  c.restore();
}

/// **뇌문 띠**(그리스 ㄱ자 무늬) — 97 의 좌우 변 무늬.
/// ⚠️ **변환을 안 쓴다.** 흐름 그라디언트를 `rotate` 안에서 칠하면 무늬가 획과
///   같이 돌아 카드마다 색 배치가 달라진다. 기저 벡터로 직접 찍는다.
function LCmeander(c, x, y, dx, dy, len, w, ink, lw, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0) return;
  const unit = w * 1.35, n = Math.floor(len / unit);
  if (n <= 0) return;
  const vx = -dy, vy = dx;
  const P = (aa, bb) => [x + dx * aa + vx * bb, y + dy * aa + vy * bb];
  const K = [[0, 1], [0, 0], [0.78, 0], [0.78, 0.72], [0.28, 0.72], [0.28, 0.30],
             [0.56, 0.30], [0.56, 0.50]];
  c.save();
  c.lineWidth = lw || 1; c.lineJoin = "miter"; c.lineCap = "butt";
  c.strokeStyle = ink;
  c.beginPath();
  for (let i = 0; i < n; i++) {
    if ((i + 1) / n > r) break;
    K.forEach((p, j) => {
      const q = P((i + p[0]) * unit, p[1] * w);
      j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1]);
    });
  }
  const b0 = P(0, w), b1 = P(unit * n * r, w);
  c.moveTo(b0[0], b0[1]); c.lineTo(b1[0], b1[1]);
  c.stroke();
  c.restore();
}

/// **모서리 갈고리** — 97 의 네 귀퉁이 곡선 장식. 안쪽으로 말리고 끝에 구슬이
/// 하나 달린다. 대칭 넷이 서면 그것만으로 「짜인 테」가 된다.
function LCcornerHook(c, x, y, sx, sy, s, ink, lw, k) {
  const kk = LCcl(k == null ? 1 : k);
  if (kk <= 0) return;
  c.save();
  c.lineWidth = lw || 1; c.lineCap = "round"; c.strokeStyle = ink;
  for (const m of [1, 0.62]) {
    const L = s * m * kk;
    c.beginPath();
    c.moveTo(x + sx * L, y);
    c.quadraticCurveTo(x + sx * L * 0.30, y, x + sx * L * 0.24, y + sy * L * 0.34);
    c.quadraticCurveTo(x + sx * L * 0.20, y + sy * L * 0.72, x, y + sy * L);
    c.stroke();
  }
  LCdot(c, x + sx * s * 0.98 * kk, y, lw * 1.1, ink);
  LCdot(c, x, y + sy * s * 0.98 * kk, lw * 1.1, ink);
  c.restore();
}

/// **밧줄 꼬임 고리** — 97 중앙의 그것. 위상이 어긋난 파형 둘이 서로를 넘고,
/// 넘는 자리마다 짧은 빗금이 하나 선다. 그 빗금 없이는 「두 줄」로만 보인다.
function LCrope(c, cx, cy, r, n, amp, ink, lw, rot) {
  c.save();
  c.lineWidth = lw || 1; c.strokeStyle = ink;
  for (const sg of [1, -1]) {
    c.beginPath();
    for (let i = 0; i <= 168; i++) {
      const th = (i / 168) * TAU, rr = r + sg * amp * Math.sin(n * th + (rot || 0));
      const px = cx + Math.cos(th) * rr, py = cy + Math.sin(th) * rr;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath(); c.stroke();
  }
  c.beginPath();
  for (let k = 0; k < n; k++) {
    const th = (rot || 0) * -1 / n + (k + 0.5) * TAU / n;
    c.moveTo(cx + Math.cos(th) * (r - amp), cy + Math.sin(th) * (r - amp));
    c.lineTo(cx + Math.cos(th) * (r + amp), cy + Math.sin(th) * (r + amp));
  }
  c.stroke();
  c.restore();
}

/// **오목한 4각별**(나침반 별) — 97 중앙의 골격. 갈래 사이가 안으로 파여야
/// 「별」이고, 볼록하면 그냥 마름모다.
function LCstar4(c, cx, cy, R, inner, rot) {
  c.beginPath();
  for (let k = 0; k < 4; k++) {
    const a0 = (rot || 0) + k * Math.PI / 2, a1 = a0 + Math.PI / 2, am = a0 + Math.PI / 4;
    const x0 = cx + Math.cos(a0) * R, y0 = cy + Math.sin(a0) * R;
    const xm = cx + Math.cos(am) * R * inner, ym = cy + Math.sin(am) * R * inner;
    const x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
    if (!k) c.moveTo(x0, y0);
    c.quadraticCurveTo(xm, ym, x1, y1);
  }
  c.closePath();
}

/// **꽃 모티프** — 97 중앙 안쪽. 잎이 `n` 장. 일반의 빈 면을 조용히 메우는
/// 제일 좋은 도안이다(대칭이라 시끄럽지 않다).
function LCrosette(c, cx, cy, r, n, ink, lw, rot) {
  c.save();
  c.lineWidth = lw || 1; c.strokeStyle = ink; c.lineJoin = "round";
  for (let k = 0; k < n; k++) {
    const a0 = (rot || 0) + k * TAU / n, hw = TAU / n * 0.5;
    c.beginPath();
    c.moveTo(cx, cy);
    c.quadraticCurveTo(cx + Math.cos(a0 - hw) * r * 0.72, cy + Math.sin(a0 - hw) * r * 0.72,
      cx + Math.cos(a0) * r, cy + Math.sin(a0) * r);
    c.quadraticCurveTo(cx + Math.cos(a0 + hw) * r * 0.72, cy + Math.sin(a0 + hw) * r * 0.72, cx, cy);
    c.stroke();
  }
  c.restore();
}

// ── ⭐ 98 에서 가져온 도안 ────────────────────────────────────────────────

/// **동심원 파선** — 98 이 겹겹이 깐 그것. 실선 고리보다 조용하면서 면을 채운다.
function LCdashring(c, cx, cy, r, ink, lw, dash, rot) {
  if (!(r > 0)) return;
  c.save();
  if (c.setLineDash) c.setLineDash(dash || [2.2, 4.4]);
  c.lineWidth = lw || 1; c.strokeStyle = ink;
  c.beginPath(); c.arc(cx, cy, r, rot || 0, (rot || 0) + TAU); c.stroke();
  if (c.setLineDash) c.setLineDash([]);
  c.restore();
}

/// **눈금 고리** — 짧은 살이 둘레를 두르는 자. 97 과 98 이 둘 다 갖고 있고,
/// **면을 채우면서도 안 시끄럽다** — 등급을 한 눈금 올리는 데 제일 싼 도안이다.
/// `every` 번째 살만 길어서 「셈이 되는 자」로 읽힌다.
function LCticks(c, cx, cy, r, n, len, ink, lw, rot, every) {
  if (!(r > 0)) return;
  c.save();
  c.strokeStyle = ink; c.lineWidth = lw || 1; c.lineCap = "butt";
  c.beginPath();
  for (let k = 0; k < n; k++) {
    const an = (rot || 0) + k * TAU / n;
    const L = len * ((every && k % every === 0) ? 2.0 : 1);
    c.moveTo(cx + Math.cos(an) * r, cy + Math.sin(an) * r);
    c.lineTo(cx + Math.cos(an) * (r + L), cy + Math.sin(an) * (r + L));
  }
  c.stroke();
  c.restore();
}

/// **구슬 축선** — 98 의 「구슬을 실에 꿴 수직 축」. 상하 대칭축을 눈에 보이게
/// 세우는 장치라 카드가 **조판된 물건**으로 읽힌다.
function LCbeads(c, cx, y0, y1, ink, n, t, a, seed) {
  c.save();
  c.strokeStyle = ink; c.lineWidth = 1;
  c.beginPath(); c.moveTo(cx, y0); c.lineTo(cx, y1); c.stroke();
  for (let i = 0; i < n; i++) {
    const u = (i + 0.5) / n, y = y0 + (y1 - y0) * u;
    const big = i % 3 === 0, rr = big ? 2.4 : 1.4;
    if (big) {
      c.beginPath(); c.arc(cx, y, rr, 0, TAU);
      c.strokeStyle = ink; c.lineWidth = 1; c.stroke();
    } else {
      LCdot(c, cx, y, rr * (0.7 + 0.3 * LCtw(t, i + (seed || 0))), ink);
    }
  }
  c.restore();
}

/// **떠 있는 짧은 눈금선** — 98 이 도해 옆에 흘려 둔 가로 획들. 도안에 「재고
/// 있다」는 결을 붙인다.
function LCrules(c, cx, Y, H, W, rows, ink) {
  c.save();
  c.strokeStyle = ink; c.lineWidth = 1; c.lineCap = "butt";
  c.beginPath();
  for (const rw of rows) {
    const y = Y + H * rw[0], w0 = W * rw[1], off = W * rw[2];
    for (const sg of [-1, 1]) {
      c.moveTo(cx + sg * off, y); c.lineTo(cx + sg * (off + w0), y);
    }
  }
  c.stroke();
  c.restore();
}

// ── ⭐ 99 에서 가져온 구도 ────────────────────────────────────────────────
// ⚠️ 채색은 안 가져왔다 — 손으로 그린 붓질이라 절차 생성으로 흉내 내면 획이
//   지저분해진다. 가져온 것은 **구도**뿐이다: 코어 · 둘레를 감는 층 · 단색조.

/// **방사선** — 코어에서 뻗는 가는 살. 길이가 셋으로 갈려야 「살」이 된다.
function LCrays(c, cx, cy, r0, r1, n, ink, rot, k) {
  const kk = LCcl(k == null ? 1 : k);
  if (kk <= 0) return;
  c.save();
  c.strokeStyle = ink; c.lineWidth = 1; c.lineCap = "butt";
  c.beginPath();
  for (let i = 0; i < n; i++) {
    const an = (rot || 0) + i * TAU / n;
    const L = r0 + (r1 - r0) * (i % 3 === 0 ? 1 : i % 2 ? 0.58 : 0.82) * kk;
    c.moveTo(cx + Math.cos(an) * r0, cy + Math.sin(an) * r0);
    c.lineTo(cx + Math.cos(an) * L, cy + Math.sin(an) * L);
  }
  c.stroke();
  c.restore();
}

/// **감는 소용돌이** — 99 의 「코어 둘레를 감는 물결」. 팔이 안에서 밖으로
/// 풀리며 굵기가 준다.
function LCswirl(c, cx, cy, r0, r1, arms, ink, rot, turns) {
  c.save();
  c.strokeStyle = ink; c.lineCap = "round";
  for (let a2 = 0; a2 < arms; a2++) {
    c.lineWidth = 1.4;
    c.beginPath();
    for (let i = 0; i <= 40; i++) {
      const u = i / 40;
      const th = (rot || 0) + a2 * TAU / arms + u * (turns || 1.9);
      const rr = r0 + (r1 - r0) * u;
      const px = cx + Math.cos(th) * rr, py = cy + Math.sin(th) * rr;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.stroke();
  }
  c.restore();
}

// ── 문양 — 스탯 여덟 · 스킬 · 성좌 ────────────────────────────────────────
//
// ⚠️ **어휘를 새로 안 지었다.** `lib/ui/icons_card.dart` 의 `drawMiscIcon` 이
//   이미 정본이다(주문력 = 4갈래 별 · 이속 = 겹화살 · 치명 = 빗겨 선 별 ·
//   방어 = 멈춘 획 셋 · 체력 = 이어 붙는 막대). 그것을 캔버스로 옮겼다.
// ⚠️⚠️ **`atk`·`aspd` 는 그 파일에 case 가 없다** — 「일반공격력」과
//   「공격속도」는 카드가 없으니 문양도 없다. 여기 있는 둘은 **이 장이 새로
//   짓는 것**이고, 이식할 때 `icons_card.dart` 에 같이 나야 한다.
const LCSYM = {
  // ⭐신설 — 「모여서 한 점을 친다」. 방패꼴·별꼴을 피한 것은 그것이 각각
  //   방어구와 주문력의 어휘이기 때문이다(`icons_card.dart` 의 ⚠️).
  atk: (c, x, y, s, b, l) => {
    for (let k = -1; k <= 1; k++)
      LCtri(c, x - s * 0.30 + k * 0.0, y + k * s * 0.24, 0, s * (0.34 - Math.abs(k) * 0.08), s * 0.055, k === 0 ? l : b);
    LCdot(c, x + s * 0.30, y, s * 0.075, l);
  },
  // ⭐신설 — 「두 박자가 한 박자로 좁혀진다」. 갈매기 둘의 간격이 곧 공속이다.
  aspd: (c, x, y, s, b, l) => {
    for (let k = 0; k < 2; k++) {
      const ox = x - s * 0.16 + k * s * 0.30;
      c.beginPath(); c.moveTo(ox - s * 0.14, y - s * 0.26);
      c.lineTo(ox + s * 0.10, y); c.lineTo(ox - s * 0.14, y + s * 0.26);
      c.lineWidth = s * 0.10; c.lineJoin = "round"; c.lineCap = "round";
      c.strokeStyle = k ? l : b; c.stroke();
    }
  },
  spell: (c, x, y, s, b, l) => {          // 스킬공격력 — 4갈래 별(바로 섰다)
    for (let k = 0; k < 4; k++)
      LCtri(c, x, y, -Math.PI / 2 + k * Math.PI / 2, s * (k % 2 === 0 ? 0.34 : 0.24), s * 0.07, k % 2 === 0 ? l : b);
    LCdot(c, x, y, s * 0.09, b);
  },
  speed: (c, x, y, s, b, l) => {          // 이동속도 — 겹화살
    LCtri(c, x - s * 0.22, y, 0, s * 0.30, s * 0.17, b);
    LCtri(c, x + s * 0.06, y, 0, s * 0.28, s * 0.14, l);
  },
  crit: (c, x, y, s, b, l) => {           // 치명타 확률 — 빗겨 선 별, 한 갈래만 밝다
    for (let k = 0; k < 4; k++)
      LCtri(c, x, y, Math.PI / 4 + k * Math.PI / 2, s * 0.30, s * 0.06, k === 0 ? l : b);
    LCdot(c, x, y, s * 0.08, b);
  },
  critdmg: (c, x, y, s, b, l) => {        // 치명타 피해 — 전부 밝고 크다
    for (let k = 0; k < 4; k++)
      LCtri(c, x, y, Math.PI / 4 + k * Math.PI / 2, s * 0.36, s * 0.08, l);
    LCdot(c, x, y, s * 0.10, b);
  },
  defense: (c, x, y, s, b, l) => {        // 방어력 — 내려오다 멈춘 획 셋 + 벽
    for (let k = -1; k <= 1; k++)
      LCtri(c, x + k * s * 0.20, y - s * 0.30, Math.PI / 2, s * 0.20, s * 0.06, b);
    LCbar(c, x, y + s * 0.16, s * 0.68, s * 0.14, l, s * 0.05);
  },
  vitality: (c, x, y, s, b, l) => {       // 체력 — 막대가 오른쪽으로 이어 붙는다
    LCbar(c, x - s * 0.10, y, s * 0.48, s * 0.22, b, s * 0.07);
    LCbar(c, x + s * 0.26, y, s * 0.24, s * 0.22, l, s * 0.07);
  },
  // 스킬 레벨업 — 「한 획이 갈래로 갈라진다」. 레벨이 오르면 갈래가 는다는
  // 이 게임의 성장 문법(빛파동·분열)을 한 문양으로 접은 것이다.
  skill: (c, x, y, s, b, l) => {
    c.lineWidth = s * 0.085; c.lineCap = "round"; c.lineJoin = "round";
    c.strokeStyle = b;
    c.beginPath(); c.moveTo(x - s * 0.34, y); c.lineTo(x - s * 0.02, y); c.stroke();
    for (let k = -1; k <= 1; k++) {
      c.beginPath(); c.moveTo(x - s * 0.02, y);
      c.lineTo(x + s * 0.32, y + k * s * 0.26); c.strokeStyle = k === 0 ? l : b; c.stroke();
    }
    LCdot(c, x - s * 0.02, y, s * 0.085, l);
  },
  // 성좌 강화 — 별 넷과 잇는 선. **상승 성좌의 문법**(선으로 이어진 골격)이다.
  star: (c, x, y, s, b, l) => {
    const P = [[-0.34, 0.26], [-0.10, -0.20], [0.24, -0.34], [0.34, 0.18]];
    c.lineWidth = s * 0.045; c.strokeStyle = b; c.lineCap = "round";
    c.beginPath();
    P.forEach((p, i) => i ? c.lineTo(x + p[0] * s, y + p[1] * s) : c.moveTo(x + p[0] * s, y + p[1] * s));
    c.stroke();
    P.forEach((p, i) => LCdot(c, x + p[0] * s, y + p[1] * s, s * (i === 2 ? 0.10 : 0.06), i === 2 ? l : b));
  },
};

// ── 배경 도해 — 등급이 올라갈수록 층이 는다 ───────────────────────────────

/// **흩뿌린 4각 반짝임** — 97 의 배경 별. 난수 0건이고, **글자 자리를 피한다**
/// (아래쪽으로 떨어진 별은 좌우 여백으로 밀어낸다 — 안 그러면 이름 위에 뜬다).
function LCscatter(c, X, Y, W, H, n, col2, a, t, seed, gw) {
  const k = gw == null ? 1 : gw;
  for (let i = 0; i < n; i++) {
    const u = LChash(i + seed), v = LChash(i * 3 + 7 + seed), w2 = LChash(i * 5 + 19 + seed);
    let fx = u, fy = 0.05 + v * 0.90;
    if (fy > 0.55) fx = u < 0.5 ? 0.035 + u * 0.13 : 0.835 + (u - 0.5) * 0.13;
    const s = (1.5 + w2 * 2.6) * k;
    if (s <= 0.2) continue;
    LCspark(c, X + fx * W, Y + fy * H, s, A(col2, (0.16 + w2 * 0.30) * a * LCtw(t, i + seed)));
  }
}

/// 레어의 별 셋. **셋인 것은 양 白羊 이 실제로 별이 셋이기 때문이다** — 이
/// 게임의 성좌 도감에서 제일 단순한 배치가 그것이고(`STCON` 의 `ari`), 그
/// 「최소 단위」를 레어의 몫으로 삼았다.
function LCstars3(c, X, Y, W, H, g, t, a) {
  const P = [[0.24, 0.20], [0.72, 0.31], [0.55, 0.68]];
  P.forEach((p, i) => LCdot(c, X + p[0] * W, Y + p[1] * H, 1.5 + (i === 1 ? 0.9 : 0), A(g[2], 0.42 * a * LCtw(t, i))));
}

/// 유니크의 성좌 도해 — 별 일곱 + 잇는 선 여섯 + 각도 눈금 호 두 겹.
/// `rev` 로 **선이 하나씩 이어진다**(여는 연출의 셋째 층).
/// ⚠️ 좌표를 **모듈 상수로 뽑았다** — 여는 빛이 「지금 긋고 있는 끝」을 같은
///   표에서 읽어야 실선과 빛이 어긋나지 않는다(두 벌로 두면 그날로 갈라진다).
const LCCHART_P = [[-0.62, 0.30], [-0.30, -0.10], [0.04, -0.52], [0.36, -0.16],
                   [0.58, 0.28], [0.10, 0.24], [-0.20, 0.62]];
const LCCHART_LN = [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [5, 6]];
function LCchart(c, cx, cy, R, g, ink, t, a, rev) {
  const P = LCCHART_P, LN = LCCHART_LN;
  const r = LCcl(rev == null ? 1 : rev);
  // 각도 눈금 — 고대 천문 도해의 결. 원이 아니라 **호**라서 「재는 물건」이 된다.
  c.save();
  c.lineWidth = 1; c.strokeStyle = A(g[1], 0.20 * a * r);
  for (const rr of [R * 0.92, R * 0.70]) {
    c.beginPath(); c.arc(cx, cy, rr, -Math.PI * 0.86, Math.PI * 0.22); c.stroke();
  }
  for (let k = 0; k < 14; k++) {
    const an = -Math.PI * 0.86 + (k / 13) * Math.PI * 1.08;
    const i0 = R * 0.92, i1 = R * (k % 3 === 0 ? 0.82 : 0.87);
    c.beginPath(); c.moveTo(cx + Math.cos(an) * i0, cy + Math.sin(an) * i0);
    c.lineTo(cx + Math.cos(an) * i1, cy + Math.sin(an) * i1);
    c.strokeStyle = A(g[1], 0.26 * a * r); c.stroke();
  }
  c.restore();
  // 잇는 선 — 한 마디씩 그어진다. ⭐ 획이 **흐름**으로 그어진다.
  const total = LN.length, done = r * total;
  c.lineWidth = 1.3; c.lineCap = "round";
  LN.forEach((ln, i) => {
    const k = LCcl(done - i);
    if (k <= 0) return;
    const p0 = P[ln[0]], p1 = P[ln[1]];
    const x0 = cx + p0[0] * R, y0 = cy + p0[1] * R;
    const x1 = cx + p1[0] * R, y1 = cy + p1[1] * R;
    c.strokeStyle = ink;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x0 + (x1 - x0) * k, y0 + (y1 - y0) * k); c.stroke();
  });
  P.forEach((p, i) => {
    const k = LCcl(done - i * 0.7);
    if (k <= 0) return;
    LCdot(c, cx + p[0] * R, cy + p[1] * R, (i === 2 ? 2.4 : 1.6) * k,
      A(i === 2 ? g[2] : g[1], (i === 2 ? 0.68 : 0.46) * a * LCtw(t, i)));
  });
}
/// 성좌 선을 **지금 긋고 있는 끝**의 좌표. `LCchart` 와 같은 표를 읽는다.
function LCchartHead(cx, cy, R, rev) {
  const done = LCcl(rev) * LCCHART_LN.length;
  const i = Math.min(LCCHART_LN.length - 1, Math.floor(done));
  const k = LCcl(done - i);
  if (k <= 0 || k >= 1) return null;
  const p0 = LCCHART_P[LCCHART_LN[i][0]], p1 = LCCHART_P[LCCHART_LN[i][1]];
  const x0 = cx + p0[0] * R, y0 = cy + p0[1] * R;
  const x1 = cx + p1[0] * R, y1 = cy + p1[1] * R;
  return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
}

/// 레전더리의 **황도 12칸 고리** — 이 게임의 성좌가 정확히 열둘이고
/// (`constellations.dart`: 「황도 12궁이 정확히 열둘이라 왜 열둘이냐에 따로
/// 답할 필요가 없다」) 그 열둘을 고리의 눈금으로 쓴다.
/// ⚠️ 회전 주기는 [LCROT] = 4×LCT 라 이음매가 없다.
function LCzodiac(c, cx, cy, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev), rot = TAU * t / LCROT;
  if (r <= 0) return;
  c.save();
  c.lineWidth = 1;
  for (const [rr, al] of [[R, 0.34], [R * 0.80, 0.24], [R * 0.46, 0.16]]) {
    c.strokeStyle = A(g[1], al * a * r);
    c.beginPath(); c.arc(cx, cy, rr * r, 0, TAU); c.stroke();
  }
  // 12 칸을 가르는 살 + 칸마다 새긴 눈금 셋 — 「재는 물건」의 밀도
  for (let k = 0; k < 12; k++) {
    const an = rot + k * TAU / 12;
    const c0 = Math.cos(an), s0 = Math.sin(an);
    c.strokeStyle = ink; c.lineWidth = 1.2;
    c.beginPath();
    c.moveTo(cx + c0 * R * 0.80 * r, cy + s0 * R * 0.80 * r);
    c.lineTo(cx + c0 * R * r, cy + s0 * R * r);
    c.stroke();
    c.strokeStyle = A(g[1], 0.20 * a * r); c.lineWidth = 1;
    for (let m = 1; m <= 2; m++) {
      const am = an + m * TAU / 36;
      c.beginPath();
      c.moveTo(cx + Math.cos(am) * R * 0.90 * r, cy + Math.sin(am) * R * 0.90 * r);
      c.lineTo(cx + Math.cos(am) * R * r, cy + Math.sin(am) * R * r);
      c.stroke();
    }
    const big = k === 0;
    LCdot(c, cx + c0 * R * 0.90 * r, cy + s0 * R * 0.90 * r, (big ? 2.6 : 1.5) * r,
      A(big ? g[2] : g[1], (big ? 0.78 : 0.48) * a * LCtw(t, k)));
  }
  // 안쪽 별 흩뿌림 — 난수 없이 인덱스에서 낸다
  for (let i = 0; i < 18; i++) {
    const an = LChash(i) * TAU, rr = (0.16 + LChash(i + 40) * 0.28) * R;
    LCdot(c, cx + Math.cos(an) * rr * r, cy + Math.sin(an) * rr * r,
      1.1 * r, A(g[2], 0.34 * a * LCtw(t, i + 3)));
  }
  c.restore();
}

// ── ⭐⭐ 문양이 **앉는 자리** — 등급의 새 손잡이 ─────────────────────────────
//
// 2026-08-24 재편에서 등급 사다리의 손잡이가 하나 더 늘었다. 사용자가 옛 일반을
// 버리고 **옛 레어의 도안을 일반으로 내리라**고 했으므로(「'일반' 디자인이 너무
// 허접해서 '레어' 수준까지 올린 걸 일반으로 쓰고 싶어서」), 일반과 레어가 **같은
// 도안**을 쓰게 된다. 그런데 이 둘이 확률의 **92%**(65 + 27)다 — 색 하나로만
// 갈리면 색맹 · 작은 화면 · 빠른 판단에서 통째로 무너진다.
//
// ⇒ **문양이 무엇 위에 앉는가**를 사다리로 삼았다. 네 등급이 한 규칙으로 꿰인다:
//
//     일반      맨몸           문양이 그냥 떠 있다
//     레어      **각인 판**    팔각 음각 판 위에 앉는다      ← [LCplaque]
//     유니크    **기물**       혼천의 · 반관 · 원석, 또는 승급한 스탯 문양
//     레전더리  **문장**       대좌 · 축 · 깃 · 보석이 조판된다
//
// ⚠️ 이 손잡이는 **발광이 아니다.** [LCHALO] 는 여전히 넷이 나눠 쓰고, 판은
//   **면**이라 실루엣으로 읽힌다 — 배경이 전부 선인 카드에서 면은 하나뿐이다.
// ⚠️ 판이 **불투명하면 안 된다.** 뒤의 도해(밧줄 · 4각별 · 방사선)를 다 덮으면
//   레어가 일반보다 **비어 보인다** — 갈라 놓고 급을 뒤집는 셈이다.

/// **각인 판** — 팔각 음각 판. 「레어만 갖는 한 겹」이 이것이다.
/// ⚠️ 채움은 `g[0]`(등급의 어두운 칸)이라 바탕(#0C1119)보다 **한 눈금 밝고**,
///   그 위로 뒤 도해가 비칠 만큼 옅다.
/// ⭐ 등장은 알파가 아니라 **반지름**이다 — 판이 0 에서 벌어진다(이 파일의 규약).
function LCplaque(c, cx, cy, R, g, ink, a, rev) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = R * r;
  const P = (k, m) => {                        // 팔각 — 꼭짓점 여덟
    const an = -Math.PI / 2 + k * TAU / 8;
    return [cx + Math.cos(an) * RR * m, cy + Math.sin(an) * RR * m];
  };
  const oct = (m) => {
    c.beginPath();
    for (let k = 0; k < 8; k++) { const p = P(k, m); k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }
    c.closePath();
  };
  // ① 면 — 가운데가 짙고 가장자리로 풀린다. **면이 있다**가 이 겹의 전부다.
  const gd = c.createRadialGradient(cx, cy, 0, cx, cy, RR);
  gd.addColorStop(0, A(g[0], 0.92 * a));
  gd.addColorStop(0.72, A(g[0], 0.70 * a));
  gd.addColorStop(1, A(g[0], 0.30 * a));
  oct(1); c.fillStyle = gd; c.fill();
  // ② 음각 테 — 어두운 홈 + 그 안쪽 밝은 모서리. 카드의 「고대 석판」 문법 그대로.
  oct(1.0); c.strokeStyle = A("#000000", 0.55 * a); c.lineWidth = 2.2; c.stroke();
  oct(0.985); c.strokeStyle = ink(0.72); c.lineWidth = 1.4; c.stroke();
  oct(0.86); c.strokeStyle = A(g[1], 0.22 * a); c.lineWidth = 1; c.stroke();
  // ③ 여덟 모서리의 못 — 「박아 둔 판」이 되게 한다(모서리마다 하나)
  for (let k = 0; k < 8; k++) {
    const p = P(k, 0.93);
    LCdot(c, p[0], p[1], k % 2 ? 1.0 : 1.7, A(g[2], 0.62 * a));
  }
}

// ── 문장 · 궤도 ───────────────────────────────────────────────────────────

// ── ⭐⭐ 유니크의 중앙 문양 — 안 셋 ────────────────────────────────────────
//
// 사용자 판정(2026-08-24): 「유니크에서 이거 디자인 바꾸자 ㅎ **레전더리 왕관보다는
// 조금 낮은 느낌으로.** 대신 **일반/레어랑은 구별되게!**」
//
// ⚠️⚠️ **원인은 색이 아니라 도형이었다.** 넷의 중앙이 「별 · 별 · 별 · 왕관」이라
//   셋이 같은 4각 별이고 유니크만 보라였다 — 그러니 「레어의 색놀이」로 읽힌다.
//   ⇒ **유니크만** 도형을 간다. 일반·레어의 4각 별은 **안 건드린다**(통과했고,
//     둘까지 같이 갈면 사다리가 다시 고르게 퍼져 유니크가 안 도드라진다).
//
// ⭐ **어휘는 이미 정해져 있었다.** 이 등급의 배경이 성좌 도해 · 각도 눈금 호 ·
//   역방향 궤도 두 겹이다 — 이 등급은 **천체 관측**이다. 중앙도 거기서 뽑으면
//   카드 한 장이 한 이야기가 된다(레전더리가 황도 12칸 ↔ 왕관으로 묶여 있듯).
//
// ⚠️ **세 안 다 왕관에 없는 권위를 안 준다** — 첨탑이 없고, 깃이 없고, 육각 보석이
//   없다. 레전더리가 계속 정상이어야 한다.
// ⚠️ 세 안 다 **등장이 알파가 아니라 형태**다(이 파일의 규약). 각 안의 마디는
//   함수 머리말에 적어 뒀다.
// ⚠️ 고른 것은 [LCUNIPICK] 하나가 정하고, **고르지 않은 둘도 남긴다** —
//   사용자가 「유니크 중앙 문양 — 안 셋」 격자에서 눈으로 보고 갈아탈 수 있어야 한다.

/// 안 A — **혼천의.** 고리 여럿이 서로 다른 각으로 겹치고 가운데 코어가 앉는다.
/// 배경의 역방향 궤도와 **정확히 같은 문법**이라 카드가 한 이야기로 묶인다.
/// ⭐ 등장: 대좌가 벌어지고 → 자오환이 그어지고 → **누워 있던 고리 셋이 선다**
///   (`ry` 가 0 에서 자란다 — 혼천의가 실제로 하는 동작이 그것이다) → 코어가 앉는다.
function LCuniA(c, cx, cy, R, g, ink, t, a, rev, sym, S) {
  const r = LCcl(rev == null ? 1 : rev);
  const st = (a0, a1) => LCes((r - a0) / (a1 - a0));
  const kBase = st(0.00, 0.22), kRing = st(0.08, 0.58),
        kTilt = st(0.30, 0.86), kCore = st(0.58, 1.00);
  const rot = TAU * t / LCROT;
  c.save();
  c.lineCap = "butt"; c.lineJoin = "round";

  // ① 대좌 — 가운데에서 좌우로 벌어지고, **기둥이 고리 바닥까지 닿는다.**
  //   ⚠️ 첫 판은 가로 획만 있어 고리와 안 이어졌다 — 「기구」가 아니라 떠 있는
  //     고리 밑의 밑줄로 보였다(2026-08-24 실측).
  if (kBase > 0.01) {
    LCbar(c, cx, cy + R * 1.34, R * 1.02 * kBase, R * 0.055, ink(0.62), R * 0.02);
    c.strokeStyle = ink(0.56); c.lineWidth = 2;
    c.beginPath(); c.moveTo(cx, cy + R * 1.32); c.lineTo(cx, cy + R * (1.32 - 0.34 * kBase));
    c.stroke();
    c.strokeStyle = ink(0.40); c.lineWidth = 1.3;
    for (const sg of [-1, 1]) {
      c.beginPath();
      c.moveTo(cx + sg * R * 0.02, cy + R * 1.32);
      c.quadraticCurveTo(cx + sg * R * 0.34 * kBase, cy + R * 1.30,
        cx + sg * R * 0.44 * kBase, cy + R * 1.12);
      c.stroke();
    }
  }
  // ② 자오환 두 겹 — **구를 감싼 고리 둘.** 바깥 원과 세로 타원이 짝이다.
  if (kRing > 0.01) {
    // ⚠️ 고리만 그으면 **선 뭉치**로 보인다(1/3 크기에서 특히). 안을 아주 옅게
    //   채워 「속이 있는 구」로 만든다 — 앞의 둘이 꽉 찬 별이라 그와 무게를 맞춘다.
    const sph = c.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
    sph.addColorStop(0, A(g[0], 0.62 * a * kRing));
    sph.addColorStop(1, A(g[0], 0.16 * a * kRing));
    c.fillStyle = sph;
    c.beginPath(); c.arc(cx, cy, R * kRing, 0, TAU); c.fill();

    c.strokeStyle = ink(0.90); c.lineWidth = 2.2;
    c.beginPath(); c.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + TAU * kRing); c.stroke();
    if (c.ellipse) {
      c.strokeStyle = ink(0.70); c.lineWidth = 2;
      c.beginPath();
      c.ellipse(cx, cy, Math.max(0.02, R * 0.36 * kRing), R, 0, 0, TAU);
      c.stroke();
    }
    LCticks(c, cx, cy, R, Math.max(1, Math.round(24 * kRing)), R * 0.11,
      A(g[1], 0.44 * a), 1, rot, 6);
  }
  // ③ 기울어진 고리 넷 — **누웠다가 선다.**
  // ⚠️⚠️ 바깥 원보다 **큰 고리가 있어야 한다.** 전부 안쪽에만 두었더니
  //   「밝은 고리 + 그 안의 가로 타원 + 가운데 점」이 되어 화면에서 **눈**으로
  //   읽혔다(2026-08-24 실측 — 이 저장소엔 이미 개안이 있어 뜻이 겹친다).
  //   고리가 바깥 원을 **가로지르면** 그 순간 「우리(cage)」가 되고 눈이 아니게 된다.
  if (kTilt > 0.005 && c.ellipse) {
    const T = [[1.16, 0.20, 0.12, 0.66], [1.02, 0.44, -0.46, 0.54],
               [0.82, 0.64, 0.58, 0.44], [0.62, 0.26, 1.16, 0.38]];
    for (const [rx, ry, tr, al] of T) {
      c.strokeStyle = ink(al); c.lineWidth = 1.5;
      c.beginPath();
      c.ellipse(cx, cy, R * rx, Math.max(0.02, R * rx * ry * kTilt), tr + rot * 0.25, 0, TAU);
      c.stroke();
    }
  }
  // ④ 코어 — 자란다. **작다** — 크면 다시 홍채가 된다.
  if (kCore > 0.01) {
    const cr = R * 0.19 * kCore;
    c.beginPath(); c.arc(cx, cy, cr, 0, TAU);
    c.fillStyle = A(g[0], 0.94 * a); c.fill();
    c.strokeStyle = ink(0.88); c.lineWidth = 1.4; c.stroke();
    c.save(); c.globalAlpha = LCcl(kCore * 2.4);
    sym(c, cx, cy, S * 0.27 * kCore, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    c.restore();
  }
  c.restore();
}

/// 안 B — **반관(서클릿).** 왕관과 나란히 놓으면 **서열이 즉시** 읽힌다.
/// ⚠️ 낮게 두려고 셋을 지켰다 — 뿔이 **셋**(왕관은 깃 다섯 쌍 + 첨탑), 높이가
///   반지름 안에 들고, 가운데 돌이 **원**이다(왕관의 육각 보석과 안 겹친다).
/// ⭐ 등장: 띠가 가운데에서 좌우로 그어지고 → 뿔이 솟고(가운데 먼저) → 돌이 앉는다.
function LCuniB(c, cx, cy, R, g, ink, t, a, rev, sym, S) {
  const r = LCcl(rev == null ? 1 : rev);
  const st = (a0, a1) => LCes((r - a0) / (a1 - a0));
  const kBand = st(0.00, 0.34), kSpike = st(0.22, 0.74), kStone = st(0.56, 1.00);
  // 띠는 아래로 처진 호다 — 중심을 한참 아래에 두어야 **얕은 아치**가 된다.
  const by = cy + R * 1.55, br = R * 1.95, hw = Math.PI * 0.20;
  const on = (u) => [cx + Math.sin(u) * br, by - Math.cos(u) * br];   // u=0 이 꼭대기
  c.save();
  c.lineCap = "butt"; c.lineJoin = "round";

  // ① 띠 — 가운데에서 좌우로 그어진다. 두 겹 사이가 곧 띠의 두께다.
  if (kBand > 0.01) {
    const sp = hw * kBand;
    for (const [m, lw, al] of [[1.0, 2.0, 0.86], [0.945, 1.6, 0.60]]) {
      c.strokeStyle = ink(al); c.lineWidth = lw;
      c.beginPath();
      c.arc(cx, by, br * m, -Math.PI / 2 - sp, -Math.PI / 2 + sp); c.stroke();
    }
    // 띠에 박힌 알 — 「세공된 물건」의 결
    for (let k = -5; k <= 5; k++) {
      const p = on((k / 5) * sp);
      LCdot(c, p[0], p[1] + R * 0.055, (k % 2 ? 1.0 : 1.6) * kBand, A(g[2], 0.62 * a));
    }
    for (const sg of [-1, 1]) {
      const p = on(sg * sp);
      LCdia(c, p[0], p[1] + R * 0.03, 3.0 * kBand, A(g[2], 0.85 * a));
    }
  }
  // ② 뿔 셋 — 가운데가 먼저 솟는다.
  // ⚠️⚠️ 첫 판은 획이 `g[0]`(짙은 자주)이라 **바탕에 묻혀 안 보였다** — 띠만 남아
  //   화면에서 「웃는 입」으로 읽혔다(2026-08-24 실측). 본색으로 칠하고 심을 흰빛으로.
  // ⚠️ 셋을 지킨다 — 왕관은 깃 다섯 쌍 + 첨탑이다. 여기서 늘리면 서열이 흐려진다.
  if (kSpike > 0.005) {
    const SP = [[0.00, 1.00, 0.105], [-0.135, 0.62, 0.078], [0.135, 0.62, 0.078]];
    SP.forEach((p, i) => {
      const k = LCes(LCcl(kSpike * 2.2 - (i ? 0.7 : 0)));
      if (k <= 0.005) return;
      const b = on(p[0] * Math.PI), an = -Math.PI / 2 + p[0] * Math.PI * 0.62;
      LCtri(c, b[0], b[1], an, R * p[1] * k, R * p[2], A(g[1], 0.95 * a));
      LCtri(c, b[0], b[1], an, R * p[1] * 0.62 * k, R * p[2] * 0.34, A(g[2], 0.92 * a));
      LCdot(c, b[0] + Math.cos(an) * R * p[1] * k, b[1] + Math.sin(an) * R * p[1] * k,
        1.8 * k, A(g[2], 0.95 * a));
    });
  }
  // ③ 가운데 돌 — **원**이다(육각은 레전더리의 것). 가운데 뿔 앞에 앉는다.
  if (kStone > 0.01) {
    const sr = R * 0.26 * kStone, sy = by - br * 1.0 - R * 0.02;
    c.beginPath(); c.arc(cx, sy, sr, 0, TAU);
    c.fillStyle = A(g[0], 0.96 * a); c.fill();
    c.strokeStyle = ink(0.92); c.lineWidth = 1.8; c.stroke();
    for (let k = 0; k < 6; k++) {
      const an = -Math.PI / 2 + k * TAU / 6;
      LCdot(c, cx + Math.cos(an) * sr * 1.55, sy + Math.sin(an) * sr * 1.55,
        1.3 * kStone, A(g[1], 0.7 * a));
    }
    c.save(); c.globalAlpha = LCcl(kStone * 2.4);
    sym(c, cx, sy, S * 0.30 * kStone, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    c.restore();
  }
  c.restore();
}

/// 안 C — **팔면체 원석.** 이 게임 고유의 어휘다(얼음운석 · 빛의 결정이 전부
/// 다면체 셀 셰이딩이다). ⭐ 레전더리 왕관 **안에** 이미 보석이 있으므로,
/// 「부품 하나가 통째가 된 것」이라는 뜻에서 자연히 한 단 아래로 읽힌다.
/// ⚠️ 육각(레전더리)과 안 겹치게 **팔면체**로 갈랐다 — 넓적한 육각 ↔ 세로로 선 팔면체.
/// ⭐ 등장: 적도가 벌어지고 → 위·아래 뿔이 솟고 → 면이 갈리고 → 고리가 돈다.
function LCuniC(c, cx, cy, R, g, ink, t, a, rev, sym, S) {
  const r = LCcl(rev == null ? 1 : rev);
  const st = (a0, a1) => LCes((r - a0) / (a1 - a0));
  const kEq = st(0.00, 0.28), kTip = st(0.18, 0.62),
        kFacet = st(0.46, 0.82), kOrb = st(0.30, 0.86), kSym = st(0.62, 1.00);
  const rot = TAU * t / LCROT;
  c.save();
  c.lineJoin = "round";

  // ① 적도 — 좌우로 벌어진다. 팔면체의 허리다.
  const ex = R * 0.62 * kEq, ey = R * 0.06;
  const near = [cx, cy + R * 0.24 * kEq], far = [cx, cy - R * 0.12 * kEq];
  const lft = [cx - ex, cy + ey], rgt = [cx + ex, cy + ey];
  // ② 위·아래 뿔 — 솟는다
  const top = [cx, cy - R * 1.00 * kTip], bot = [cx, cy + R * 0.86 * kTip];
  const face = (p0, p1, p2, al) => {
    c.beginPath();
    c.moveTo(p0[0], p0[1]); c.lineTo(p1[0], p1[1]); c.lineTo(p2[0], p2[1]);
    c.closePath(); c.fillStyle = A(g[0], al * a); c.fill();
  };
  if (kEq > 0.01 && kTip > 0.01) {
    // 면 넷 — 밝기를 달리해 **셀 셰이딩**으로 읽히게 한다
    face(top, lft, near, 0.95); face(top, near, rgt, 0.72);
    face(bot, lft, near, 0.62); face(bot, near, rgt, 0.86);
  }
  // ③ 모서리 — 갈린 면이 보여야 「돌」이 된다
  if (kFacet > 0.01) {
    c.strokeStyle = ink(0.86); c.lineWidth = 1.6;
    c.beginPath();
    c.moveTo(top[0], top[1]); c.lineTo(lft[0], lft[1]);
    c.lineTo(bot[0], bot[1]); c.lineTo(rgt[0], rgt[1]); c.closePath();
    c.stroke();
    c.strokeStyle = ink(0.44 * kFacet); c.lineWidth = 1;
    c.beginPath();
    for (const p of [near, far]) {
      c.moveTo(lft[0], lft[1]); c.lineTo(p[0], p[1]); c.lineTo(rgt[0], rgt[1]);
      c.moveTo(top[0], top[1]); c.lineTo(p[0], p[1]);
      c.moveTo(bot[0], bot[1]); c.lineTo(p[0], p[1]);
    }
    c.stroke();
  }
  // ④ 둘레 미니 고리 넷 — 서로 다른 각. 배경 궤도의 축소판이다.
  if (kOrb > 0.005 && c.ellipse) {
    const O = [[1.16, 0.16, 0.00], [1.02, 0.30, 0.62], [1.02, 0.30, -0.62], [0.86, 0.10, 1.4]];
    O.forEach((o, i) => {
      const k = LCes(LCcl(kOrb * 2.0 - i * 0.35));
      if (k <= 0.005) return;
      c.strokeStyle = ink(0.30); c.lineWidth = 1;
      c.beginPath();
      c.ellipse(cx, cy, R * o[0], Math.max(0.02, R * o[0] * o[1] * k), o[2] + rot * 0.4, 0, TAU);
      c.stroke();
    });
  }
  // ⑤ 문양 — 돌의 한가운데
  if (kSym > 0.01) {
    c.save(); c.globalAlpha = LCcl(kSym * 2.4);
    sym(c, cx, cy + R * 0.02, S * 0.30 * kSym, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    c.restore();
  }
  c.restore();
}

/// ⚠️ **고르지 않은 둘을 지우지 않는다** — 시안의 「안 셋」 격자가 이 표를 읽는다.
const LCUNI = {A: LCuniA, B: LCuniB, C: LCuniC};
/// ⭐ 실제 카드가 쓰는 안. 갈아타려면 이 한 글자만 고치면 된다.
const LCUNIPICK = "A";

// ── ⭐⭐ 유니크 급 **스탯 문양 여덟** ───────────────────────────────────────
//
// 사용자 원문(2026-08-24): 「강화하는 **스텟이 8개**잖아? **유니크와 레전더리만
// 8개씩 해당 스텟과 연관된 디자인**으로 하는 건 어때? 디자인 비용이 너무 큰가?」
//
// ⇒ **비용은 크지 않다. 백지에서 짓는 것이 아니다.** 재료는 이미 이 장에 있다 —
//   [LCuniA]/[LCuniB]/[LCuniC](겹쳐 도는 궤도 · 방사살 · 점 액센트 · 작은 코어).
//   **`lib/ui/icons_card.dart` 의 채운 아이콘은 이 여덟의 밑그림이 아니다** — 면이
//   아니라 선(획)으로 짓고, 방패꼴 · 성벽 · 이어붙는 칸 같은 평평한 UI 어휘를 쓰지
//   않는다. 남은 일은 안 셋의 문법을 스탯 여덟에 나눠 앉히는 것이고, 규칙은 하나다:
//
//     ⭐ **문양이 「기호」에서 「사건」이 된다.**
//        기호는 무엇인지만 말하고, 사건은 **무엇이 벌어지는지**를 말한다.
//        일반·레어의 별은 그냥 별이지만, 유니크의 별은 **관통당하고 · 깨지고 ·
//        한 팔만 자라고 · 벽에 부딪힌다.**
//
// ⚠️⚠️ **1/3 크기(214px)가 판정선이다.** 셋(`spell`·`crit`·`critdmg`)이 전부
//   별꼴이라 여기가 제일 위험하다 — 그래서 **셋의 갈리는 축을 미리 정했다**:
//     `spell`   바로 선 십자 8갈래 + **가로로 관통하는 고리**
//     `crit`    **비대칭** — 한 팔만 압도적으로 길고 거기에만 불이 붙는다
//     `critdmg` 45° **대칭** 넷 + 둘레의 **깨진 고리**(조각 넷)
//   확대해야 갈리는 것은 실패다. 이 셋은 **실루엣**이 서로 다르다.
// ⚠️ 등장은 여기서도 **알파가 아니라 형태**다(이 파일의 규약) — 마디마다
//   길이 · 자리 · 각도가 변하고, 알파는 그 마디가 시작할 때 이미 차 있다.
// ⚠️ 각 문양이 **잔향 한 겹**을 갖는다([LCecho]). `skill_rank` 의 유니크 조건이
//   「코어 + 궤적 + **잔향**이 다 선다」라서다 — 셋째 항을 안 빼먹는다.

/// 잔향 — 주기당 한 번 퍼졌다 사라지는 고리. **위상에서 직접** 낸다(누적기 없음).
/// ⚠️ 반지름은 **진행**에서, 알파는 **1-진행**에서 따로 낸다. 한 값에서 내면
///   흐릿할 때 제일 큰 고리가 그려진다(이 파일이 이미 두 번 밟은 함정).
function LCecho(c, x, y, r0, r1, g, a, t, sh) {
  const u = ((t / LCT + (sh || 0)) % 1 + 1) % 1;
  const al = Math.pow(1 - u, 1.7) * 0.30 * a;
  if (al <= 0.004) return;
  LCring(c, x, y, r0 + (r1 - r0) * u, A(g[1], al), 1);
}

/// 살대 — 방사 방향의 얇은 선. 안 A/B/C 가 쓰는 획이 쐐기(LCtri)가 아니라 이것이다
/// (자오환 · 눈금 · 방사선이 전부 얇은 stroke 다). 스탯 여덟은 이 획을 기본으로 쓴다.
function LCspoke(c, x, y, an, r0, r1, col, lw) {
  if (r1 - r0 <= 0.02) return;
  c.strokeStyle = col; c.lineWidth = Math.max(0.8, lw || 1.4); c.lineCap = "round";
  c.beginPath();
  c.moveTo(x + Math.cos(an) * r0, y + Math.sin(an) * r0);
  c.lineTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1);
  c.stroke();
}

const LCUSYM = {
  /// 일반공격력 — 다섯 살대가 밖에서 안으로 모여 **한 점을 부순다**.
  /// 실루엣: 왼쪽에서 모이는 살 다섯 → 오른쪽 한 점 + 그 점에서 터지는 금.
  atk: (c, x, y, S, g, ink, t, a, rev) => {
    const r = LCcl(rev == null ? 1 : rev), st = (a0, a1) => LCes((r - a0) / (a1 - a0));
    const kFan = st(0.00, 0.56), kHit = st(0.48, 0.86), kBurst = st(0.70, 1.00);
    const hx = x + S * 0.32;
    for (let k = -2; k <= 2; k++) {              // ① 살 다섯 — 밖에서 안으로 온다
      const kf = LCes(LCcl(kFan * 2.2 - Math.abs(k) * 0.28));
      if (kf <= 0.005) continue;
      const an = Math.PI + k * 0.32;             // 왼쪽을 향한 밑동
      const r1 = S * 0.66 * kf;
      LCspoke(c, hx, y, an, S * 0.10, r1, A(k === 0 ? g[1] : g[0], 0.92 * a),
        S * (0.052 - Math.abs(k) * 0.008));
      LCdot(c, hx + Math.cos(an) * r1, y + Math.sin(an) * r1, S * 0.02 * kf, A(g[2], 0.75 * a));
    }
    if (kHit > 0.01) {                           // ② 맞는 점 — 별점이 자란다
      LCspark(c, hx, y, S * 0.16 * kHit, A(g[1], 0.95 * a));
      LCring(c, hx, y, S * 0.09 * kHit, A(g[2], 0.85 * a), 1.2);
    }
    if (kBurst > 0.01) {                         // ③ 터지는 금 — 점 **뒤로** 뻗는다
      for (const k of [-1, 1])
        LCspoke(c, hx + S * 0.13, y + k * S * 0.05, k * 0.92, 0, S * 0.26 * kBurst, ink(0.80), 1.6);
    }
    LCecho(c, hx, y, S * 0.16, S * 0.60, g, a, t);
  },

  /// 공격속도 — 낫꼴 살 셋의 휘어진 정도가 **좁아지고 빨라진다**, 그 아래 자가 잰다.
  /// 실루엣: 오른쪽으로 휘는 활꼴 셋 + 그 아래 **간격을 재는 자**. 별꼴과 안 겹친다.
  aspd: (c, x, y, S, g, ink, t, a, rev) => {
    const r = LCcl(rev == null ? 1 : rev), st = (a0, a1) => LCes((r - a0) / (a1 - a0));
    const kV = st(0.00, 0.62), kRule = st(0.52, 1.00);
    const P = [-0.40, 0.00, 0.28];               // 간격이 오른쪽으로 갈수록 좁다
    P.forEach((px, i) => {
      const k = LCes(LCcl(kV * 2.0 - i * 0.34));
      if (k <= 0.005) return;
      const ox = x + S * px, h = S * 0.30 * k, bow = S * 0.14 * k;
      c.beginPath();
      c.moveTo(ox - S * 0.14, y - h);
      c.quadraticCurveTo(ox + bow, y, ox - S * 0.14, y + h);
      c.lineWidth = S * (0.050 - i * 0.005); c.lineCap = "round";
      c.strokeStyle = i === 2 ? ink(0.95) : A(g[i ? 1 : 0], 0.95 * a);
      c.stroke();
      LCdot(c, ox + bow, y, S * 0.018 * k, A(g[2], 0.7 * a));
    });
    if (kRule > 0.01) {                          // 간격을 재는 자 — 「공속」의 실체
      c.strokeStyle = A(g[1], 0.55 * a); c.lineWidth = 1; c.lineCap = "butt";
      const y0 = y + S * 0.42, w = S * 0.52 * kRule;
      c.beginPath(); c.moveTo(x - w, y0); c.lineTo(x + w, y0); c.stroke();
      c.beginPath();
      P.forEach((px, i) => {
        const ox = x + S * px * kRule;
        c.moveTo(ox, y0); c.lineTo(ox, y0 - S * (i === 2 ? 0.13 : 0.08));
      });
      c.strokeStyle = A(g[2], 0.75 * a); c.stroke();
    }
    LCecho(c, x + S * 0.10, y, S * 0.20, S * 0.58, g, a, t);
  },

  /// 스킬공격력 — 안 B(반관) 그대로. R·위치는 1927행 `LCUNI` 호출과 같은 비율
  /// (`aR*0.54`, `aR=W*0.38`, `S=W*0.42` ⇒ `S*0.38*0.54/0.42`)이고, 속 문양은
  /// 이 스탯의 아이콘([LCSYM].spell)이다.
  spell: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniB(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.spell, S),

  /// 이동속도 — 열린 꺾쇠(화살촉 윤곽) 셋이 **커지며** 뒤로 속도선이 흐른다.
  speed: (c, x, y, S, g, ink, t, a, rev) => {
    const r = LCcl(rev == null ? 1 : rev), st = (a0, a1) => LCes((r - a0) / (a1 - a0));
    const kArr = st(0.00, 0.66), kTrail = st(0.44, 1.00);
    if (kTrail > 0.01) {                         // 속도선 — 화살보다 **뒤**에 깔린다
      c.strokeStyle = A(g[1], 0.44 * a); c.lineWidth = 1.4; c.lineCap = "round";
      c.beginPath();
      for (let i = 0; i < 3; i++) {
        const yy = y + (i - 1) * S * 0.20, w = S * (0.30 + i % 2 * 0.14) * kTrail;
        c.moveTo(x - S * 0.46, yy); c.lineTo(x - S * 0.46 + w, yy);
      }
      c.stroke();
    }
    for (let i = 0; i < 3; i++) {                // 꺾쇠 셋 — 오른쪽으로 갈수록 크다
      const k = LCes(LCcl(kArr * 2.0 - (2 - i) * 0.30));
      if (k <= 0.005) continue;
      const bx = x - S * 0.34 + i * S * 0.26;
      const ln = S * (0.22 + i * 0.055) * k, wd = S * (0.12 + i * 0.03);
      c.strokeStyle = A(i === 2 ? g[1] : g[0], 0.95 * a);
      c.lineWidth = S * (0.040 - i * 0.003); c.lineCap = "round"; c.lineJoin = "round";
      c.beginPath();
      c.moveTo(bx - ln, y - wd); c.lineTo(bx, y); c.lineTo(bx - ln, y + wd);
      c.stroke();
      LCdot(c, bx, y, S * 0.018 * (i + 1), A(g[2], 0.85 * a * (i === 2 ? 1 : 0.5)));
    }
    LCecho(c, x + S * 0.14, y, S * 0.18, S * 0.58, g, a, t);
  },

  /// 치명타 확률 — 안 C(팔면체 원석) 그대로. R·위치·속 문양 규약은 `spell` 과 같다
  /// ([LCSYM].crit).
  crit: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniC(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.crit, S),

  /// 치명타 피해 — 45° 대칭 넷이 **겹살 플레어**로 멀리 뻗고, 둘레 고리가 조각나 밀린다.
  /// ⭐ 조각 넷이 밖으로 밀려 있다 — 「터졌다」가 실루엣에 남는다.
  critdmg: (c, x, y, S, g, ink, t, a, rev) => {
    const r = LCcl(rev == null ? 1 : rev), st = (a0, a1) => LCes((r - a0) / (a1 - a0));
    const kStar = st(0.00, 0.50), kBreak = st(0.38, 0.86), kCore = st(0.74, 1.00);
    for (let k = 0; k < 4; k++) {                // ① 45° 대칭 넷 — 겹살로 멀리 뻗는다
      const kf = LCes(LCcl(kStar * 1.9 - k * 0.10));
      if (kf <= 0.005) continue;
      const an = Math.PI / 4 + k * Math.PI / 2, L = S * 0.56 * kf;
      LCspoke(c, x, y, an, S * 0.10, L, A(g[1], 0.92 * a), S * 0.032);
      LCspoke(c, x, y, an + 0.06, S * 0.10, L * 0.62, A(g[2], 0.6 * a), 1);
      LCdia(c, x + Math.cos(an) * L, y + Math.sin(an) * L, S * 0.05 * kf, A(g[2], 0.92 * a));
    }
    if (kBreak > 0.005) {                        // ② 깨진 고리 — 조각 넷이 **밀려난다**
      const push = S * 0.13 * kBreak, rr = S * 0.40;
      c.lineWidth = 2.0; c.lineCap = "butt"; c.strokeStyle = ink(0.72);
      for (let k = 0; k < 4; k++) {
        const mid = -Math.PI / 2 + k * Math.PI / 2;
        c.save(); c.translate(Math.cos(mid) * push, Math.sin(mid) * push);
        c.beginPath(); c.arc(x, y, rr, mid - 0.52, mid + 0.52); c.stroke();
        c.restore();
      }
    }
    if (kCore > 0.01) LCdia(c, x, y, S * 0.09 * kCore, A(g[2], 0.95 * a));
    LCecho(c, x, y, S * 0.30, S * 0.72, g, a, t);
  },

  /// 방어력 — 안 A(혼천의) 그대로. R·위치·속 문양 규약은 `spell` 과 같다
  /// ([LCSYM].defense).
  defense: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniA(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.defense, S),

  /// 체력 — 고리가 안에서 밖으로 겹겹이 서고, 가장 바깥 고리는 **아직 다 안 닫혔다**.
  /// ⭐ 열린 끝이 남아 있다 — 「계속 늘어난다(상한 없음)」가 그림에 남는다.
  vitality: (c, x, y, S, g, ink, t, a, rev) => {
    const r = LCcl(rev == null ? 1 : rev), st = (a0, a1) => LCes((r - a0) / (a1 - a0));
    const kRing = st(0.00, 0.56), kGrow = st(0.46, 0.88), kTick = st(0.70, 1.00);
    const gap = -Math.PI / 2;                    // 모든 고리가 같은 자리에서 자란다
    for (let i = 0; i < 3; i++) {                // ① 닫힌 고리 셋 — 안에서 바깥으로 선다
      const k = LCes(LCcl(kRing * 2.0 - i * 0.30));
      if (k <= 0.005) continue;
      const rr = S * (0.14 + i * 0.13);
      c.strokeStyle = A(i === 2 ? g[1] : g[0], 0.92 * a); c.lineWidth = S * 0.026; c.lineCap = "round";
      c.beginPath(); c.arc(x, y, rr, gap + 0.001, gap + TAU * k - 0.001); c.stroke();
    }
    if (kGrow > 0.005) {                         // ② 자라는 중인 고리 — 아직 다 안 닫혔다
      const rr = S * 0.53, sweep = TAU * kGrow;
      c.strokeStyle = A(g[1], 0.95 * a); c.lineWidth = S * 0.026; c.lineCap = "round";
      c.beginPath(); c.arc(x, y, rr, gap, gap + sweep); c.stroke();
      if (sweep < TAU * 0.97) {                  // 아직 안 닫혔다는 표 — 열린 끝의 점
        const ea = gap + sweep;
        LCdot(c, x + Math.cos(ea) * rr, y + Math.sin(ea) * rr, S * 0.03, A(g[2], 0.85 * a));
      }
    }
    if (kTick > 0.01) {                          // ③ 고리를 꿰는 축 — 가운데 심
      c.strokeStyle = A(g[1], 0.55 * a); c.lineWidth = 1;
      c.beginPath(); c.moveTo(x, y - S * 0.58 * kTick); c.lineTo(x, y + S * 0.06); c.stroke();
      LCdot(c, x, y, S * 0.045, A(g[1], 0.95 * a));
    }
    LCecho(c, x, y, S * 0.24, S * 0.64, g, a, t);
  },
};

/// 유니크의 궤도 — **안팎이 역방향**이다. `skill_rank` 의 유니크 조건
/// 「코어 + 궤적 + 잔향이 다 선다」를 문자 그대로 셋 다 세운 것.
function LCorbit(c, cx, cy, R, g, ink, t, a) {
  for (const [rr, dir, n, w] of [[R * 0.86, 1, 3, 1.6], [R * 0.60, -1, 2, 1.2]]) {
    c.strokeStyle = ink; c.lineWidth = 1;
    c.beginPath(); c.arc(cx, cy, rr, 0, TAU); c.stroke();
    for (let i = 0; i < n; i++) {
      const an = dir * TAU * t / LCT + i * TAU / n;
      // 꼬리 — 다섯 점을 뒤로 흘린다(잔상)
      for (let k = 4; k >= 0; k--) {
        const aa = an - dir * k * 0.09;
        LCdot(c, cx + Math.cos(aa) * rr, cy + Math.sin(aa) * rr,
          w * (1 - k * 0.13), A(k ? g[1] : g[2], (0.75 - k * 0.14) * a));
      }
    }
  }
  // 잔향 — 퍼졌다 사라지는 고리 하나. 주기당 한 번.
  const u = (t % LCT) / LCT, ea = Math.pow(1 - u, 1.6);
  c.strokeStyle = A(g[1], 0.30 * a * ea); c.lineWidth = 1;
  c.beginPath(); c.arc(cx, cy, R * (0.34 + u * 0.86), 0, TAU); c.stroke();
}

/// 레전더리의 **좌우 대칭 문장** — 첨탑 · 깃 세 쌍 · 육각 보석 · 이단 대좌.
///
/// ⚠️ 이것이 이 등급의 실체다. 앞의 셋은 문양이 「기호」인데 여기서만 **조판된
///   물건**이 된다 — 세로 대칭축이 있고, 대좌가 있고, 보석이 그 위에 놓인다.
/// ⚠️⚠️ **첫 판을 버렸다.** 굽은 날개 두 쌍 + 그 아래 가로 막대로 그렸더니
///   화면에서 **콧수염 달린 얼굴**로 읽혔다(2026-08-24 실측 — 굽은 획이
///   바깥·아래로 말리고 그 밑에 가로획이 붙으면 사람 눈이 얼굴을 만든다).
///   ⇒ 획을 **위·바깥으로** 세우고(부챗살), 가로 막대를 **이단 대좌**로 바꿔
///     「받치는 물건」임이 먼저 읽히게 했다.
/// ⚠️ 깃을 세 쌍 → **다섯 쌍**으로 늘렸다(2차 판정 「레전더리를 엄청 올려줘」).
///   바깥 두 쌍은 짧고 어두워 부챗살의 **밑동**만 채운다 — 길이를 다 같이 키우면
///   문장이 카드를 다 먹어 보석이 안 보인다.
///
/// ── ⭐⭐ 등장은 **알파가 아니라 형태**다 (2026-08-24 3차 판정) ──────────────
/// 사용자 원문: 「여기서 마지막에 이 **왕관 모양 나올 때** 좀 더 화려하고
/// 자연스럽게 나오게 해줘. 지금은 **페이드아웃으로 나오는 거 같아서 조금 짜치네**」
///
/// ⚠️⚠️ **알파만 0→1 로 올리는 등장은 형태가 안 생긴다** — 이미 거기 있던 것이
///   밝아질 뿐이라 「나타났다」로 안 읽힌다. 그것이 「짜친다」의 정체다.
/// ⇒ 다섯 마디가 **차례로 지어진다.** 알파는 각 마디가 시작하는 순간 이미 차 있고,
///   변하는 것은 **길이 · 각도 · 자리**다:
///     ① 대좌가 가운데에서 **좌우로 벌어지고**
///     ② 첨탑이 그 위로 **솟고**
///     ③ 깃이 접힌 채(수직) 있다가 부챗살로 **펼쳐지고** — 안쪽 쌍부터
///     ④ 보석이 조각 여섯으로 **날아와 맞물리고** — 맞물리는 순간 빛이 터진다
///     ⑤ 톱니와 술이 마지막에 달린다
/// ⚠️ `lt`(여는 빛)는 정지 칸에서 0 이다 — 다 지어진 문장은 넷과 같은 후광만 쓴다.
function LCcrest(c, cx, cy, R, g, t, a, rev, lt) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0) return;
  const L = lt || 0;
  const st = (a0, a1) => LCes((r - a0) / (a1 - a0));
  const kBase = st(0.00, 0.26), kSpire = st(0.13, 0.46),
        kFan = st(0.22, 0.78), kGem = st(0.58, 0.92), kTrim = st(0.80, 1.00);
  c.save();
  // ⚠️ 솟는 거리를 0.55R → 0.14R 로 줄였다. 「올라오면서 밝아진다」가 주된
  //   읽기가 되면 다시 페이드로 보인다 — 주된 읽기는 **지어지는 것**이라야 한다.
  c.translate(cx, cy + (1 - r) * R * 0.14);
  const s = R * (0.90 + 0.10 * r), al = 0.95 * a;
  const glow = (x, y, rr, k) => { if (L > 0.01 && k > 0.01) LCpen(c, x, y, rr, g, k * L); };

  // ── ① 이단 대좌 — 가운데에서 **좌우로 벌어진다.** 「받치는 물건」이 먼저 선다.
  for (const [w, h, col] of [[0.86, 0.075, g[0]], [1.02, 0.055, g[0]], [0.62, 0.035, g[1]]]) {
    const ww = s * w * kBase;
    if (ww <= 0.5) continue;
    LCbar(c, 0, s * (0.46 + (w > 0.9 ? 0.11 : 0)), ww, s * h, A(col, al), s * 0.02);
  }
  if (kBase > 0.02 && kBase < 0.999)
    for (const sg of [-1, 1]) glow(sg * s * 0.51 * kBase, s * 0.57, s * 0.30, 1);

  // ── ② 첨탑 — 대좌에서 **솟는다.** 대칭축이 눈에 보이게 선다.
  if (kSpire > 0.01) {
    LCtri(c, 0, s * 0.10, -Math.PI / 2, s * 1.22 * kSpire, s * 0.085, A(g[0], al));
    LCtri(c, 0, s * 0.08, -Math.PI / 2, s * 1.08 * kSpire, s * 0.032, A(g[1], al));
    if (kSpire < 0.999) glow(0, s * 0.10 - s * 1.22 * kSpire, s * 0.34, 1);
  }

  // ── ③ 깃 다섯 쌍 — 접힌 채 있다가 **펼쳐진다.** 안쪽 쌍이 먼저 열린다.
  for (const sg of [-1, 1]) {
    for (let k = 0; k < 5; k++) {
      const kf = LCes(LCcl(kFan * 4.4 - k * 0.60));
      if (kf <= 0.001) continue;
      const anEnd = sg * (0.40 + k * 0.30);
      const an = -Math.PI / 2 + anEnd * kf;             // 수직(접힘) → 부챗살
      const len = s * (0.98 - k * 0.155) * (0.26 + 0.74 * kf);
      const wid = s * (0.105 - k * 0.016);
      const bx = sg * s * (0.09 + k * 0.085) * kf, by = s * 0.16;
      // 깃 하나 = 쐐기 + 그 안의 밝은 심. **두 획**이라 「깃」이 된다.
      LCtri(c, bx, by, an, len, wid, A(k === 0 ? g[1] : g[0], al));
      LCtri(c, bx, by, an, len * 0.72, wid * 0.34, A(g[2], al * (k === 0 ? 0.85 : 0.42)));
      if (kf < 0.999)
        glow(bx + Math.cos(an) * len, by + Math.sin(an) * len, s * 0.26, 1 - kf * 0.4);
    }
  }

  // ── ⑤ 톱니와 술 — 마지막에 달린다(먼저 달면 대좌가 뭉툭해 보인다)
  if (kTrim > 0.01) {
    for (let k = -4; k <= 4; k++)
      LCtri(c, k * s * 0.115, s * 0.60, Math.PI / 2, s * 0.055 * kTrim, s * 0.026,
        A(g[1], al * 0.7));
    for (const sg of [-1, 1]) {
      c.beginPath();
      c.moveTo(sg * s * 0.30, s * 0.62);
      c.quadraticCurveTo(sg * s * 0.36, s * 0.80 * kTrim + s * 0.62 * (1 - kTrim),
        sg * s * (0.30 - 0.06 * kTrim), s * (0.62 + 0.32 * kTrim));
      c.strokeStyle = A(g[1], 0.55 * a); c.lineWidth = s * 0.035; c.lineCap = "round";
      c.stroke();
    }
    LCdia(c, 0, -s * 1.06, s * 0.055 * kTrim, A(g[2], al));
  }

  // ── ④ 육각 보석 — **조각 여섯이 날아와 맞물린다.** 색 넷째 단계(흰 심)가
  //    여기서만 서고, 맞물리는 순간이 이 등급의 마지막 박자다.
  if (kGem > 0.005) {
    const gy = -s * 0.06, gr = s * 0.30, bt = 0.94 + 0.06 * LCbump((t % LCT) / LCT, 2);
    const rr = gr * bt, ry = 1.18;
    const V = (k) => {
      const an = -Math.PI / 2 + k * TAU / 6;
      return [Math.cos(an) * rr, gy + Math.sin(an) * rr * ry];
    };
    const push = (1 - kGem) * s * 1.05;
    for (let k = 0; k < 6; k++) {
      const am = -Math.PI / 2 + (k + 0.5) * TAU / 6;
      const ox = Math.cos(am) * push, oy = Math.sin(am) * push * ry;
      const p0 = V(k), p1 = V(k + 1);
      c.save(); c.translate(ox, oy);
      c.beginPath();
      c.moveTo(0, gy); c.lineTo(p0[0], p0[1]); c.lineTo(p1[0], p1[1]); c.closePath();
      c.fillStyle = A(g[0], al); c.fill();
      // ⚠️ `round` 캡이라야 다 맞물렸을 때 여섯 모서리에 **틈이 안 난다**
      //   (`butt` 이면 조각마다 따로 긋는 획이 꼭짓점에서 살짝 벌어진다).
      c.strokeStyle = A(g[1], 0.95 * a); c.lineWidth = 1.6; c.lineCap = "round";
      c.beginPath(); c.moveTo(p0[0], p0[1]); c.lineTo(p1[0], p1[1]); c.stroke();
      // 98 의 저폴리 갈림 — 면이 갈려야 「돌」이 된다
      c.strokeStyle = A(g[2], 0.34 * a); c.lineWidth = 1;
      c.beginPath(); c.moveTo(0, gy); c.lineTo(p0[0], p0[1]); c.stroke();
      c.restore();
      if (kGem < 0.999) glow(ox, gy + oy, s * 0.22, 0.8);
    }
    // 흰 심 — 0 에서 자란다(알파가 아니라 크기)
    c.beginPath();
    for (let k = 0; k < 6; k++) {
      const an = -Math.PI / 2 + k * TAU / 6, q = rr * 0.52 * kGem;
      const x = Math.cos(an) * q, y = gy + Math.sin(an) * q * ry;
      k ? c.lineTo(x, y) : c.moveTo(x, y);
    }
    c.closePath(); c.fillStyle = A(g[2], 0.85 * a); c.fill();
    c.strokeStyle = A(g[2], 0.34 * a); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, gy - rr * ry * kGem); c.lineTo(0, gy + rr * ry * kGem); c.stroke();
    // ⭐ 맞물리는 순간의 섬광 — 조각이 앉는 마지막 한 박자에만 터진다.
    // ⚠️ 고리는 **자라면서 사라진다**(반지름 ∝ `sk`, 알파 ∝ `sin πsk`). 첫 판은
    //   알파에서 반지름을 냈더니 흐릿할 때 제일 커져 **글자를 가로지르는 큰 활**로
    //   보였다(2026-08-24 실측 — 「퍼지는 고리」가 아니라 「그어진 선」이었다).
    if (L > 0.01) {
      const sk = LCcl((kGem - 0.72) / 0.28), sf = Math.sin(Math.PI * sk);
      if (sf > 0.01) {
        LCpen(c, 0, gy, s * 0.85, g, sf * L);
        LCshock(c, 0, gy, s * (0.28 + 1.0 * sk), g, sf * L, 2);
      }
    }
  }
  c.restore();
}

/// 레전더리의 **마루장식** — 위쪽이 카드 테 **밖으로 넘는다.**
/// 「카드가 자기 틀에 안 담긴다」가 이 등급이 하는 유일한 파격이고, 그것을
/// 빛이 아니라 **모양**으로 낸 것이다.
/// ⚠️ 갈고리 곁장식 한 쌍을 더 달았다 — 첨탑 하나만 넘으면 「튀어나온 못」으로
///   보이고, 곁이 붙어야 「마루에 올린 장식」으로 읽힌다.
function LCfinial(c, cx, y, w, g, a, up, rev) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0) return;
  const d = up ? -1 : 1, h = w * 0.62 * r;
  c.beginPath();
  c.moveTo(cx - w / 2, y);
  c.lineTo(cx - w * 0.16, y + d * h * 0.52);
  c.lineTo(cx, y + d * h);
  c.lineTo(cx + w * 0.16, y + d * h * 0.52);
  c.lineTo(cx + w / 2, y);
  c.closePath();
  c.fillStyle = A(g[0], 0.95 * a); c.fill();
  c.strokeStyle = A(g[1], 0.85 * a); c.lineWidth = 1; c.stroke();
  LCdot(c, cx, y + d * h * 0.52, w * 0.07, A(g[2], 0.85 * a));
  // 곁장식 — 좌우로 흘러 내려가는 갈고리 한 쌍
  c.strokeStyle = A(g[1], 0.60 * a); c.lineWidth = 1.2; c.lineCap = "round";
  for (const sg of [-1, 1]) {
    c.beginPath();
    c.moveTo(cx + sg * w * 0.5, y);
    c.quadraticCurveTo(cx + sg * w * 0.92, y, cx + sg * w * 1.02, y + d * h * 0.34 * r);
    c.stroke();
  }
}

/// 레전더리의 **쐐기 각인 띠** — 바깥 테와 안쪽 테 사이를 채운다.
/// 고대의 결이 여기서 난다: 매끈한 SF 가 아니라 **파낸 자국이 반복되는 판**이다.
/// ⚠️ 마디마다 점을 하나 더 찍는다 — 쐐기만 반복하면 「톱니」로 보이고, 점이
///   끼면 「새긴 글」로 보인다(97 의 뇌문 띠가 같은 수법을 쓴다).
/// ⚠️ `cm` 은 **모서리 여백**이다. 97 의 띠는 모서리까지 안 간다 — 모서리는
///   갈고리 장식의 몫이고, 둘이 겹치면 그 자리만 뭉개진다.
function LCwedges(c, x, y, w, h, g, ink, a, rev, cm) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0) return;
  const step = 10, m = 3.0, cg = cm || 0;
  c.lineWidth = 1; c.strokeStyle = ink;
  const seg = (x0, y0, dx, dy, n) => {
    for (let i = 0; i < n; i++) {
      if (i / n > r) break;
      const px = x0 + dx * step * i, py = y0 + dy * step * i;
      c.beginPath();
      c.moveTo(px - dy * m, py - dx * m);
      c.lineTo(px + dx * step * 0.42, py + dy * step * 0.42);
      c.lineTo(px + dy * m, py + dx * m);
      c.stroke();
      if (i % 2 === 0)
        LCdot(c, px + dx * step * 0.72, py + dy * step * 0.72, 0.9, A(g[1], 0.42 * a * r));
    }
  };
  const n1 = Math.floor((w - cg * 2) / step), n2 = Math.floor((h - cg * 2) / step);
  seg(x + cg, y, 1, 0, n1);
  seg(x + cg, y + h, 1, 0, n1);
  seg(x, y + cg, 0, 1, n2);
  seg(x + w, y + cg, 0, 1, n2);
}

// ── ⭐⭐ 여는 빛 — 타임라인 위에서만 산다 ──────────────────────────────────
//
// ⚠️⚠️ **[LCHALO] 와 싸우지 않는다.** 이 넷은 `op.light` 가 1 일 때만 그려지고,
//   `op.light` 는 **여는 칸에서만** 1 이다([LCFULL] 이 0). 다 열려 놓인 카드
//   넷의 발광은 여전히 정확히 같다 — 빛은 사다리가 아니라 **타임라인** 위에 있다.
// ⚠️ 전부 `gAdd`(가산 합성)로 얹는다. 가산이라야 「빛」이고, 덮어쓰면 「칠」이다.

/// 판을 한 번 훑는 빗금 — 일반. 카드가 놓이는 그 순간에만 지나간다.
function LCsweep(c, X, Y, W, H, g, u, k, wide) {
  if (k <= 0.002) return;
  const d = -0.35 + 1.7 * u, wd = (wide || 0.26);
  const x0 = X + W * (d - wd), x1 = X + W * (d + wd);
  const gd = c.createLinearGradient(x0, Y, x1, Y + H);
  gd.addColorStop(0, A(g[2], 0));
  gd.addColorStop(0.5, A(g[2], 0.40 * k));
  gd.addColorStop(1, A(g[2], 0));
  gAdd(c, (cc) => { cc.fillStyle = gd; cc.fillRect(X, Y, W, H); });
}

/// **긋고 있는 끝의 불** — 레어. 테를 긋는 획의 머리에 붙어 같이 돈다.
/// 「선이 그어진다」를 「불이 지나간다」로 바꾸는 것이 이 한 점이다.
function LCpen(c, x, y, r, g, k) {
  if (k <= 0.002) return;
  gAdd(c, (cc) => {
    const gd = cc.createRadialGradient(x, y, 0, x, y, r);
    gd.addColorStop(0, A(g[2], 0.95 * k));
    gd.addColorStop(0.42, A(g[1], 0.44 * k));
    gd.addColorStop(1, A(g[1], 0));
    cc.fillStyle = gd; cc.beginPath(); cc.arc(x, y, r, 0, TAU); cc.fill();
  });
}

/// 퍼지는 고리 한 겹 — 코어가 앉는 순간·문장이 솟는 순간.
function LCshock(c, cx, cy, r, g, k, lw) {
  if (k <= 0.002 || !(r > 0)) return;
  gAdd(c, (cc) => {
    cc.strokeStyle = A(g[2], 0.8 * k); cc.lineWidth = lw || 2;
    cc.beginPath(); cc.arc(cx, cy, r, 0, TAU); cc.stroke();
  });
}

/// ⭐⭐ **갈라진 틈에서 새는 빛** — 레전더리. 사용자 요구(④)의 정확한 그림이다.
/// 틈의 폭만큼 밝은 띠가 서고, 그 띠가 판 밖으로 번지고, 살이 사방으로 뻗는다.
function LCseamLight(c, cx, iy, ih, half, off, g, k) {
  if (k <= 0.002) return;
  const w = Math.max(3, off * 2);
  gAdd(c, (cc) => {
    // ① 틈 그 자체 — 흰 심
    const gd = cc.createLinearGradient(cx - w * 2.4, 0, cx + w * 2.4, 0);
    gd.addColorStop(0, A(g[1], 0));
    gd.addColorStop(0.36, A(g[1], 0.42 * k));
    gd.addColorStop(0.5, A(g[2], 0.98 * k));
    gd.addColorStop(0.64, A(g[1], 0.42 * k));
    gd.addColorStop(1, A(g[1], 0));
    cc.fillStyle = gd;
    cc.fillRect(cx - w * 2.4, iy, w * 4.8, ih);
    // ② 세로로 흐르는 결 — 틈이 「면」이 아니라 「열린 자리」로 읽히게
    cc.strokeStyle = A(g[2], 0.30 * k); cc.lineWidth = 1;
    for (let i = 0; i < 7; i++) {
      const fx = cx + (LChash(i * 7 + 3) - 0.5) * w * 1.6;
      cc.beginPath(); cc.moveTo(fx, iy + ih * LChash(i * 11 + 5) * 0.5);
      cc.lineTo(fx, iy + ih * (0.5 + LChash(i * 13 + 9) * 0.5)); cc.stroke();
    }
    void half;
  });
}

// ── 카드 한 장 ────────────────────────────────────────────────────────────
//
// `op` 가 **여는 연출의 층**이다. 정지 칸은 전부 1 이고(빛만 0), 여는 칸은
// 위상에서 낸다 — 같은 함수가 둘을 다 그리므로 「연출이 끝나면 저 그림이 된다」가
// 코드에서 보장된다(두 벌로 두면 그날로 갈라진다).
//   plate 판이 놓인 정도 · split 두 짝이 갈라진 정도 · carve 테가 그어진 정도
//   art   배경 도해 · emb 문장 · txt 글자 · light 여는 빛(정지 칸은 0) · u 진행
function LCcard(c, X, Y, W, H, d, t, op) {
  const R = LCRANK.findIndex((r) => r.id === d.rank);
  const RK = LCRANK[R], g = RK.col, a = op.plate;
  if (a <= 0.001) return;
  const cx = X + W / 2;
  const ay = Y + H * 0.335, aR = W * 0.38;
  const u = op.u == null ? 1 : op.u;
  const lit = op.light || 0;

  // ⭐ **획 색.** 등급의 좁은 흐름 하나를 카드 안의 획이 전부 나눠 쓴다.
  //   ⚠️ 일반(`hues===1`)은 위상이 **고정**이라 안 움직인다 — 「색 하나 ·
  //     움직임 없음」이 등급 정의이고, 명도 흐름은 움직임이 아니다.
  const ph = RK.hues > 1 ? t / LCT : 0.12;
  const ink = (al, sh) => LCflowL(c, X, Y + H, X + W, Y, RK.flow, al * a, ph + (sh || 0));

  c.save();
  c.globalAlpha = 1;

  // ── 판 ──
  // 바탕색은 등급마다 아주 조금씩 다르다. **채도가 아니라 온도**다 —
  // 무채 → 청 → 자 → 금. 넷을 나란히 놓았을 때 급이 「올라간다」로 읽히게.
  const BG = ["#0F1116", "#0C1119", "#100C18", "#130F09"][R];
  c.fillStyle = A(BG, 0.985 * a);
  c.beginPath();
  if (c.roundRect) c.roundRect(X, Y, W, H, 3); else c.rect(X, Y, W, H);
  c.fill();

  // ── ⭐ 바탕의 층 — 99 의 「한 색조, 명도로 층을 나눔」 ──
  // ⚠️ **세기는 넷이 같다**(0.5). 색만 등급 온도를 따른다 — 이것을 등급마다
  //   올리면 그 순간 「발광 사다리」가 되어 금지 규약을 어긴다.
  c.save();
  c.beginPath();
  if (c.roundRect) c.roundRect(X + 1, Y + 1, W - 2, H - 2, 3); else c.rect(X + 1, Y + 1, W - 2, H - 2);
  c.clip();
  {
    const vg = c.createRadialGradient(cx, ay, 0, cx, ay, H * 0.74);
    vg.addColorStop(0, A(g[0], 0.50 * a));
    vg.addColorStop(0.62, A(g[0], 0.16 * a));
    vg.addColorStop(1, A(g[0], 0));
    c.fillStyle = vg; c.fillRect(X, Y, W, H);
  }

  // ── ⭐ 바닥 격자 — **빈 검은 면을 없앤다.** 전 등급 공통 ──
  // 97 의 수확: 레퍼런스는 어디에도 빈 검은 면이 없다. 알파가 등급마다 조금
  // 오르지만 **일반도 실제로 보이는** 세기다(0.055) — 「비어 있다」가 아니라
  // 「조용하다」로 나야 한다는 것이 2차 판정이었다.
  LClattice(c, X, Y, W, H, [8, 8, 7, 7][R], A(g[1], [0.088, 0.088, 0.098, 0.078][R] * a), 1);

  // ── 배경 도해 — 등급이 층을 쌓는다 ──
  //
  // ⚠️⚠️ **사다리의 기울기가 이 블록에서 정해진다.** 3차 판정에서 사용자가
  //   「레어랑 유니크도 지금보다 더 화려하게 (**레전더리랑 차이가 너무 심해서**)」
  //   라고 짚었다 — 곡선이 일반→유니크까지 완만하다가 레전더리에서 **절벽처럼**
  //   뛰었다. ⇒ **레전더리를 안 낮추고 가운데 둘을 올려** 곡선을 폈다.
  //   일반은 「지금 수준도 만족스럽긴 한데 아주 조금만 더」라 **한 눈금만** 올렸다.
  // ⚠️ 도해는 **알파가 아니라 크기로** 선다(`gw`) — 알파 페이드는 「나타났다」로
  //   안 읽힌다는 것이 이 판의 제일 큰 교훈이다.
  c.globalAlpha = 1;
  {
    const ar = op.art, gw = 0.55 + 0.45 * ar;
    // ① 파선 고리 — 98. 등급이 오르면 겹이 는다.
    const rings = [[0.96, 0.76, 0.54], [0.96, 0.76, 0.54], [1.02, 0.84, 0.64, 0.44],
                   [1.06, 0.88, 0.68, 0.46]][R];
    const ra = [0.26, 0.26, 0.28, 0.26][R];
    rings.forEach((m, i) => LCdashring(c, cx, ay, aR * m * gw,
      A(g[1], (ra - i * 0.035) * a * ar), 1, i % 2 ? [1.6, 5.2] : [2.4, 4.6],
      (i % 2 ? -1 : 1) * TAU * t / LCROT));
    // ② 눈금 고리 — 97·98. 면을 채우면서 안 시끄러운 제일 싼 도안.
    LCticks(c, cx, ay, aR * [0.96, 0.96, 1.02, 1.10][R] * gw, [36, 36, 48, 60][R],
      [4, 4, 5, 5][R], A(g[1], [0.24, 0.24, 0.28, 0.26][R] * a * ar), 1,
      TAU * t / LCROT, [6, 6, 8, 10][R]);
    // ③ 꽃 모티프 — 97. 빈 면을 조용히 메우는 제일 좋은 도안이다.
    LCrosette(c, cx, ay, aR * [0.62, 0.62, 0.68, 0.64][R] * gw, [12, 12, 16, 16][R],
      A(g[1], [0.20, 0.20, 0.22, 0.15][R] * a * ar), 1, TAU * t / LCROT * 0.5);
    // ④ 등급 전용 도해
    if (R <= 1) {
      // ⭐⭐ **일반과 레어가 같은 블록을 쓴다**(2026-08-24 재편). 옛 일반(층 8)을
      //   버리고 옛 레어의 도안을 일반으로 내렸다 — 사용자 원문: 「'일반' 디자인이
      //   너무 허접해서 '레어' 수준까지 올린 걸 일반으로 쓰고 싶어서」.
      //   갈리는 자리는 **색이 아니라** 문양이 앉는 자리다(아래 [LCplaque]).
      LCrays(c, cx, ay, aR * 0.34, aR * 1.02 * gw, 24, A(g[1], 0.13 * a * ar),
        -TAU * t / LCROT, ar);
      c.save();
      LCstar4(c, cx, ay, aR * 0.92 * gw, 0.15, 0);
      c.strokeStyle = ink(0.32 * ar); c.lineWidth = 1.2; c.stroke();
      c.restore();
      LCrope(c, cx, ay, aR * 0.56 * gw, 18, aR * 0.032, A(g[1], 0.26 * a * ar), 1,
        TAU * t / LCROT * 2);
      LCstars3(c, X, Y, W, H, g, t, a * ar);
      LCbeads(c, cx, Y + H * 0.10, Y + H * 0.575, A(g[1], 0.24 * a * ar), 13, t, a, 2);
      LCrules(c, cx, Y, H, W, [[0.175, 0.12, 0.30], [0.475, 0.10, 0.34], [0.545, 0.15, 0.24]],
        A(g[1], 0.24 * a * ar));
    }
    if (R === 2) {
      // ⭐ **유니크를 올린 자리.** 레어가 얻은 셋을 더 촘촘히 갖고, 여기에 99 의
      //   소용돌이와 안쪽 4각별이 더 붙는다. 층 다섯이 는다.
      LCrays(c, cx, ay, aR * 0.32, aR * 1.16 * gw, 36, A(g[1], 0.15 * a * ar),
        -TAU * t / LCROT, ar);
      LCswirl(c, cx, ay, aR * 0.36, aR * 1.10 * gw, 3, A(g[1], 0.17 * a * ar),
        TAU * t / LCROT, 1.7);
      c.save();
      LCstar4(c, cx, ay, aR * 1.06 * gw, 0.15, 0);
      c.strokeStyle = ink(0.34 * ar); c.lineWidth = 1.3; c.stroke();
      LCstar4(c, cx, ay, aR * 0.64 * gw, 0.17, Math.PI / 4);
      c.strokeStyle = A(g[1], 0.24 * a * ar); c.lineWidth = 1; c.stroke();
      c.restore();
      LCrope(c, cx, ay, aR * 0.74 * gw, 24, aR * 0.038, A(g[1], 0.30 * a * ar), 1,
        TAU * t / LCROT * 2);
      // ⚠️ 성좌 도해를 궤도 **밖으로** 내보냈다(1.14 → 1.30). 안에 있을 때는
      //   궤도 고리와 잇는 선이 서로를 지나 **긁힌 자국**으로 보였다(2026-08-24 실측).
      LCchart(c, cx, ay, aR * 1.24, g, ink(0.46 * ar), t, a, ar);
      LCbeads(c, cx, Y + H * 0.085, Y + H * 0.585, A(g[1], 0.22 * a * ar), 17, t, a, 5);
      LCrules(c, cx, Y, H, W, [[0.155, 0.12, 0.31], [0.185, 0.08, 0.36],
        [0.475, 0.10, 0.34], [0.545, 0.16, 0.24]], A(g[1], 0.26 * a * ar));
      LCstars3(c, X, Y, W, H, g, t, a * ar * 0.8);
    }
    if (R === 3) {
      // ⭐⭐ 레전더리 — 99 의 구도(코어 + 감는 층 + 방사선)를 황도 고리 위에
      //   통째로 얹는다. ⚠️ **3차 판정에서 통과했다 — 안 낮춘다.**
      LCrays(c, cx, ay, aR * 0.30, aR * 1.30, 48, A(g[1], 0.16 * a * ar),
        TAU * t / LCROT * -1, ar);
      LCswirl(c, cx, ay, aR * 0.34, aR * 1.24, 5, A(g[1], 0.22 * a * ar),
        TAU * t / LCROT, 1.9);
      LCzodiac(c, cx, ay, aR * 1.16, g, ink(0.30 * ar), t, a, ar);
      LCrope(c, cx, ay, aR * 0.78 * gw, 26, aR * 0.045,
        A(g[1], 0.34 * a * ar), 1, TAU * t / LCROT * 2);
      c.save();
      LCstar4(c, cx, ay, aR * 1.02 * gw, 0.15, 0);
      c.strokeStyle = ink(0.40 * ar); c.lineWidth = 1.4; c.stroke();
      LCstar4(c, cx, ay, aR * 0.60 * gw, 0.17, Math.PI / 4);
      c.strokeStyle = A(g[1], 0.26 * a * ar); c.lineWidth = 1; c.stroke();
      c.restore();
      LCstars3(c, X, Y, W, H, g, t, a * ar * 0.7);
      LCrules(c, cx, Y, H, W, [[0.145, 0.11, 0.33], [0.50, 0.09, 0.36], [0.565, 0.15, 0.26]],
        A(g[1], 0.22 * a * ar));
    }
    // ⑤ 흩뿌린 4각 반짝임 — 97. 등급이 오르면 수가 는다.
    //   ⚠️ **크기가 자란다** — 알파만 올리면 그것이 곧 페이드다.
    LCscatter(c, X, Y, W, H, [22, 22, 28, 32][R], g[2], a * ar, t, R * 17, 0.35 + 0.65 * ar);
  }

  // ── 테 ──
  // ⭐ 등급이 오를수록 **테가 그림에 참여한다.**
  //   ⚠️ 97 의 골격을 **전 등급 공통**으로 깔았다: 바깥 굵은 테 + 안쪽 얇은 테 +
  //     그 사이 **여백 띠** + 모서리 갈고리 넷. 일반이 「너무 심심」했던 이유가
  //     정확히 이 골격이 없어서였다.
  // ⚠️ **고리를 겹치지 않게 배분한다.** 첫 판에서 뇌문 띠(10.5~16)와 셋째 테(14)가
  //   같은 자리에 서서 그 띠만 뭉갰다 — 화면에서 「지저분한 선」으로 보였다.
  //   ⇒ 반지름을 표로 못 박는다:
  //     4  바깥 굵은 테 (전 등급)
  //     7  ⭐ 레전더리 쐐기 각인 띠 — 97 이 두 테 **사이**를 채우는 그 자리다
  //     10 안쪽 얇은 테 (전 등급) · 그 사이 4~10 이 **여백 띠**
  //     10.5~16 뇌문 띠 (레어부터) · 같은 고리의 **모서리는 갈고리의 몫**
  //     17 셋째 테 (레어부터)
  //     21 넷째 테 · 못 (유니크부터)
  //     25 모서리 각인 브래킷 (유니크부터) · 절취선 (레어)
  const cv = op.carve;
  const HK = [15, 15, 18, 20][R];                   // 모서리 갈고리 크기
  LCframe(c, X + 4, Y + 4, W - 8, H - 8, A(g[0], 0.9 * a), ink(0.62), cv, 1.6);
  if (R === 3) LCwedges(c, X + 7, Y + 7, W - 14, H - 14, g, ink(0.30), a, cv, HK + 4);
  LCframe(c, X + 10, Y + 10, W - 20, H - 20, A(g[0], 0.8 * a), ink(0.30), cv, 1);

  // 뇌문 띠 — 97 의 변 무늬. ⭐ **일반·레어는 좌우**(재편 전 레어의 몫이었다),
  // 유니크부터 사방.
  {
    const bw = 5.4, mx = X + 10.5, my = Y + 10.5, mw = W - 21, mh = H - 21, cg = HK + 5;
    LCmeander(c, mx, my + mh - cg, 0, -1, mh - cg * 2, bw, ink(0.30), 1, cv);
    LCmeander(c, mx + mw, my + cg, 0, 1, mh - cg * 2, bw, ink(0.30), 1, cv);
    if (R >= 2) {
      LCmeander(c, mx + cg, my, 1, 0, mw - cg * 2, bw, ink(0.26), 1, cv);
      LCmeander(c, mx + mw - cg, my + mh, -1, 0, mw - cg * 2, bw, ink(0.26), 1, cv);
    }
  }
  // 모서리 갈고리 — 97 의 네 귀퉁이 곡선 장식. ⭐ **일반도 갖는다.**
  for (let i = 0; i < 4; i++) {
    const k = LCes(LCcl(cv * 3 - i * 0.25)); if (k <= 0) continue;
    const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1;
    LCcornerHook(c, cx + sx * (W / 2 - 10.5), Y + H / 2 + sy * (H / 2 - 10.5),
      -sx, -sy, HK, ink(0.55), 1.2, k);
  }
  LCframe(c, X + 17, Y + 17, W - 34, H - 34, A(g[0], 0.6 * a), ink(0.20), cv, 1);
  if (R >= 2) LCframe(c, X + 21, Y + 21, W - 42, H - 42, A(g[0], 0.4 * a), ink(0.13), cv, 1);

  if (R <= 1) {
    // 절취선 — 모서리를 자른 자국 넷
    c.lineWidth = 1; c.strokeStyle = A(g[1], 0.44 * a * cv);
    for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const px = cx + sx * (W / 2 - 25), py = Y + H / 2 + sy * (H / 2 - 25);
      c.beginPath(); c.moveTo(px - sx * 9, py); c.lineTo(px, py - sy * 9); c.stroke();
    }
  }
  if (R >= 2) {
    // 모서리 각인 브래킷 — 하나씩 그어진다(여는 연출의 첫째 층)
    const bl = 22;
    for (let i = 0; i < 4; i++) {
      const k = LCcl(cv * 4 - i); if (k <= 0) continue;
      const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1;
      const px = cx + sx * (W / 2 - 25), py = Y + H / 2 + sy * (H / 2 - 25);
      c.lineWidth = 1.6; c.lineCap = "square"; c.strokeStyle = ink(0.72);
      c.beginPath();
      c.moveTo(px - sx * bl * k, py); c.lineTo(px, py); c.lineTo(px, py - sy * bl * k);
      c.stroke();
    }
    // 위·아래 중앙 못
    for (const sy of [-1, 1]) {
      const py = Y + H / 2 + sy * (H / 2 - 21);
      c.save(); c.translate(cx, py); c.rotate(Math.PI / 4);
      c.fillStyle = A(g[1], 0.55 * a * cv); c.fillRect(-2.6, -2.6, 5.2, 5.2);
      c.restore();
    }
  }
  if (R === 3) {
    // 모서리에서 안쪽으로 뻗는 문장 획 — 테가 그림이 되는 자리
    for (let i = 0; i < 4; i++) {
      const k = LCes(LCcl(cv * 2 - i * 0.3)); if (k <= 0) continue;
      const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1;
      const px = cx + sx * (W / 2 - 5), py = Y + H / 2 + sy * (H / 2 - 5);
      c.strokeStyle = ink(0.66); c.lineWidth = 1.4; c.lineCap = "round";
      c.beginPath(); c.moveTo(px, py);
      c.quadraticCurveTo(px - sx * 24 * k, py - sy * 5 * k, px - sx * 34 * k, py - sy * 28 * k);
      c.stroke();
      c.beginPath(); c.moveTo(px, py);
      c.quadraticCurveTo(px - sx * 5 * k, py - sy * 24 * k, px - sx * 28 * k, py - sy * 34 * k);
      c.stroke();
    }
  }

  // ── 등급 머리줄 — 98 의 「규칙선 – 문양 – 규칙선」 ──
  {
    const ty = Y + 36, m0 = 30, tk = LCes(op.txt), ta = LCcl(op.txt * 1.8);
    c.font = LCFONT(700, 15); c.textAlign = "left"; c.textBaseline = "middle";
    c.fillStyle = A(g[1], 0.92 * a * ta);
    c.fillText(RK.mark, X + m0, ty);
    c.font = LCFONT(600, 9.5); c.textAlign = "right";
    c.fillStyle = A(g[1], 0.75 * a * ta);
    c.fillText(RK.nm + "  " + RK.p + "%", X + W - m0, ty);
    // 머리줄 밑금 — 굵은 획 + 그 아래 가는 획, 양끝에 마름모(98 의 규칙선).
    // ⚠️ **가운데에서 좌우로 벌어진다** — 알파만 올리면 그것이 곧 페이드다.
    const hw = (W / 2 - m0) * tk;
    c.strokeStyle = ink(0.55); c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(cx - hw, Y + 47.5); c.lineTo(cx + hw, Y + 47.5); c.stroke();
    c.strokeStyle = A(g[1], 0.26 * a); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx - (hw - 6), Y + 50.5); c.lineTo(cx + (hw - 6), Y + 50.5); c.stroke();
    LCdia(c, cx - hw, Y + 47.5, 2.4 * tk, A(g[1], 0.7 * a));
    LCdia(c, cx + hw, Y + 47.5, 2.4 * tk, A(g[1], 0.7 * a));
  }

  // ── 문양 ──
  //
  // ⚠️⚠️ **알파만 올리는 등장을 안 쓴다**(2026-08-24 3차 판정). 문양은 **자라서**
  //   선다 — 크기가 0.46 에서 1 로 가고, 알파는 앞쪽 42% 에서 이미 다 찬다.
  //   「이미 거기 있던 것이 밝아진다」와 「없던 것이 생긴다」는 다른 사건이다.
  {
    c.save();
    const sym = LCSYM[d.sym] || LCSYM.spell;
    const S = W * 0.42;
    const e = LCes(op.emb);
    const eS = 0.46 + 0.54 * e;        // 크기 — 이것이 등장의 실체다
    const eA = LCcl(e * 2.4);          // 알파 — 앞쪽에서 이미 찬다
    if (R === 3) {
      LCcrest(c, cx, ay, aR * 0.92, g, t, a, op.emb, lit);
      // 문장 한가운데에 축의 문양을 아주 작게 얹는다 — 「무엇인가」는 남아야 한다
      // ⚠️ 보석이 맞물린 **뒤에** 선다(0.58~) — 먼저 서면 조각 사이로 비친다.
      const ec = LCes(LCcl((op.emb - 0.58) / 0.42));
      if (ec > 0.005) {
        c.save(); c.globalAlpha = LCcl(ec * 2.4);
        sym(c, cx, ay + aR * 0.02, S * 0.40 * (0.46 + 0.54 * ec),
          A(g[0], 0.95 * a), A(g[2], 0.95 * a));
        c.restore();
      }
    } else if (R === 2) {
      // ⚠️ 궤도는 **코어가 아니라 배경 도해**다 — `emb` 가 아니라 `art` 를 따른다.
      //   `emb` 에 매달았더니 「각인이 먼저」라고 적어 둔 차례와 그림이 어긋났다.
      const ao = LCes(op.art);
      if (ao > 0.004)
        LCorbit(c, cx, ay, aR * 0.92 * (0.55 + 0.45 * ao), g, ink(0.55), t, a);
      // ⭐⭐ 유니크는 **카드가 무엇인가**에 따라 중앙이 갈린다(2026-08-24 재편).
      //   스탯 카드면 승급한 **스탯 문양 여덟**, 스킬·성좌 카드면 **기물 셋**이다.
      // ⚠️ `d.uni` 가 **명시된 자리는 [lcuni] 갤러리뿐**이다 — 안 A/B/C 를 눈으로
      //   비교하려고 일부러 `sym:"spell"` 을 셋 다 같이 준 자리라, `d.sym` 을
      //   먼저 보면 셋 다 같은 스탯 문양으로 뭉개진다. **명시된 안이 항상 이긴다.**
      const uu = d.uni ? null : LCUSYM[d.sym];
      if (uu) uu(c, cx, ay, S, g, ink, t, a, op.emb);
      else (LCUNI[d.uni] || LCUNI[LCUNIPICK])(c, cx, ay, aR * 0.54, g, ink, t, a, op.emb, sym, S);
    } else if (R === 1) {
      // ⭐⭐ **레어가 일반과 갈리는 유일한 겹** — 문양이 각인 판 위에 앉는다.
      LCplaque(c, cx, ay, aR * 0.72, g, ink, a, op.art);
      // 선행 잔상 — 0.22초 앞선 자리. 「시간이 든다」의 최소 문법이다.
      const off = (tt) => Math.sin(TAU * tt / LCT) * W * 0.018;
      c.save(); c.globalAlpha = 0.30 * eA;
      sym(c, cx + off(t + 0.22), ay, S * eS, A(g[0], a), A(g[1], a));
      c.restore();
      c.save(); c.translate(off(t), 0);
      // 두 박자 — 주기당 한 번 문양이 살짝 커졌다 돌아온다
      const b = 1 + 0.045 * LCbump((t % LCT) / LCT, 3);
      c.globalAlpha = eA;
      sym(c, cx, ay, S * b * eS, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
      c.restore();
    } else {
      // 일반 — **레어와 같은 문양을 같은 크기로** 그린다. 다른 것은 셋뿐이다:
      // 판이 없고 · 잔상이 없고 · 두 박자가 없다(무채는 색이 하는 몫이다).
      c.globalAlpha = eA;
      sym(c, cx, ay, S * eS, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    }
    // ⚠️ 후광은 **넷이 같다**([LCHALO]). 등급이 올라도 안 커진다.
    if (typeof gAdd === "function")
      gAdd(c, (cc) => LCdot(cc, cx, ay, W * 0.09, A(g[1], LCHALO * 0.20 * a * op.emb)));
    c.restore();
  }

  // ── 글자 — 98 의 발치 이름 띠 ──
  // ⚠️ 글자는 획을 그을 수 없어 알파를 쓸 수밖에 없다. 대신 **아래에서 6px 올라와
  //   앉고** 규칙선이 **가운데에서 좌우로 벌어진다** — 자리가 바뀌면 사람 눈은
  //   그것을 「놓였다」로 읽지 「밝아졌다」로 안 읽는다.
  if (op.txt > 0.02) {
    const tk = LCes(op.txt);
    c.save(); c.globalAlpha = LCcl(op.txt * 1.8);
    c.translate(0, (1 - tk) * 6);
    c.textAlign = "center"; c.textBaseline = "alphabetic";
    const rw = (W / 2 - 30) * tk;
    c.strokeStyle = ink(0.5); c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(cx - rw, Y + H * 0.605); c.lineTo(cx + rw, Y + H * 0.605); c.stroke();
    LCdia(c, cx - rw, Y + H * 0.605, 2.4 * tk, A(g[1], 0.7 * a));
    LCdia(c, cx + rw, Y + H * 0.605, 2.4 * tk, A(g[1], 0.7 * a));
    c.font = LCFONT(700, 15.5); c.fillStyle = A("#EDEDF2", 0.98 * a);
    c.fillText(d.nm, cx, Y + H * 0.685);
    c.font = LCFONT(700, 19); c.fillStyle = A(g[2], 0.98 * a);
    c.fillText(d.val, cx, Y + H * 0.775);
    c.strokeStyle = A(g[1], 0.24 * a); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx - (W / 2 - 44) * tk, Y + H * 0.805);
    c.lineTo(cx + (W / 2 - 44) * tk, Y + H * 0.805); c.stroke();
    c.font = LCFONT(500, 10.5); c.fillStyle = A("#9494A2", 0.95 * a);
    const words = String(d.sub || "").split("\n");
    words.forEach((w, i) => c.fillText(w, cx, Y + H * 0.855 + i * 14));
    c.restore();
  }

  // ── ⭐ 여는 빛 ①~③ — 판 **안쪽**에서 나는 것 ──
  // ⚠️ 클립 안이다. 카드 밖으로 안 샌다.
  if (lit > 0.002 && typeof gAdd === "function") {
    // ⭐ **모서리 갈고리에 불이 붙는다** — 전 등급 공통. 갈고리 넷이 차례로
    //   끝나고, 끝나는 그 순간에만 한 번씩 번진다(「각인이 켜지며 번지는 빛」).
    for (let i = 0; i < 4; i++) {
      const k = LCcl(cv * 3 - i * 0.25), fl = LCbell(k, 1.0, 0.30) * lit * 0.8;
      if (fl <= 0.01) continue;
      const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1;
      LCpen(c, cx + sx * (W / 2 - 10.5), Y + H / 2 + sy * (H / 2 - 10.5), 13, g, fl);
    }
    if (R === 0) {
      LCsweep(c, X, Y, W, H, g, u, LCbell(u, 0.46, 0.34) * lit, 0.24);
    } else if (R === 1) {
      LCsweep(c, X, Y, W, H, g, u, LCbell(u, 0.30, 0.30) * lit * 0.8, 0.30);
      // 불붙은 끝이 안쪽 테를 한 바퀴 긋는다 — 획의 **머리**에 붙어 같이 돈다
      const pt = LCframePt(X + 17, Y + 17, W - 34, H - 34, cv);
      if (cv > 0.02 && cv < 0.995) LCpen(c, pt[0], pt[1], 14, g, lit);
      // 코어가 앉는다
      LCshock(c, cx, ay, aR * (0.24 + 0.95 * LCes(op.emb)), g,
        LCbell(u, 0.80, 0.14) * lit * 0.8, 1.6);
    } else if (R === 2) {
      LCsweep(c, X, Y, W, H, g, u, LCbell(u, 0.22, 0.24) * lit * 0.7, 0.30);
      // ⭐ **별을 잇는 선을 빛이 타고 흐른다** — 실선과 **같은 표**를 읽는다.
      const hd = LCchartHead(cx, ay, aR * 1.24, op.art);
      if (hd) LCpen(c, hd[0], hd[1], 15, g, lit);
      const pt = LCframePt(X + 21, Y + 21, W - 42, H - 42, cv);
      if (cv > 0.02 && cv < 0.995) LCpen(c, pt[0], pt[1], 13, g, lit * 0.8);
      // 각인이 켜지며 번진다 — 모서리 브래킷 넷이 끝나는 순간마다 한 번씩
      for (let i = 0; i < 4; i++) {
        const k = LCcl(cv * 4 - i), fl = LCbell(k, 1.0, 0.26) * lit * 0.9;
        if (fl <= 0.01) continue;
        const sx = i % 2 ? -1 : 1, sy = i < 2 ? 1 : -1;
        LCpen(c, cx + sx * (W / 2 - 25), Y + H / 2 + sy * (H / 2 - 25), 16, g, fl);
      }
      // 코어가 앉는다
      LCshock(c, cx, ay, aR * (0.30 + 1.15 * LCes(op.emb)), g, LCbell(u, 0.80, 0.16) * lit, 2);
    }
  }

  c.restore();   // ── 판 안쪽 클립 끝 ──

  // ── 레전더리의 마루장식 — **테 밖으로 넘는다**(클립 밖이라야 넘는다) ──
  if (R === 3) {
    LCfinial(c, cx, Y + 4, 34, g, a * cv, true, op.emb);
    LCfinial(c, cx, Y + H - 4, 24, g, a * cv * 0.8, false, op.emb);
  }

  // ── ⭐ 레전더리 — **닫힌 석판이 갈라지고 그 틈에서 빛이 샌다** ────────────
  // ⚠️ 덮개를 **맨 끝에 얹는다.** 처음엔 「안쪽을 검게 칠하고 갈라진 만큼만
  //   보이기」로 했는데, 그러면 닫힌 카드가 **검은 구멍**으로 보였다(2026-08-24
  //   실측). 닫혀 있을 때도 그것은 **새겨진 판**이라야 「열린다」가 성립한다.
  const ix = X + 8, iy = Y + 8, iw = W - 16, ih = H - 16;
  const half = iw / 2, kSplit = LCes(op.split), off = half * kSplit;
  if (R === 3 && op.split < 0.999) {
    // 닫힌 판의 얼굴 — 세로 결 + 인장(고리 · 12눈금 · 육각) + 뇌문 한 줄.
    // 인장이 **한가운데**라 갈라질 때 그것이 반으로 쪼개지는 것이 곧 「연다」다.
    const slab = (cc) => {
      cc.fillStyle = BG; cc.fillRect(ix, iy, iw, ih);
      // ⚠️ 결을 `g[0]`(짙은 밤색)로 그었더니 바탕과 붙어 **닫힌 판이 검은
      //   구멍**으로 보였다. 본색을 아주 옅게 쓰는 쪽이 「새겨진 돌」이 된다.
      LClattice(cc, ix, iy, iw, ih, 8, A(g[1], 0.055), 1);
      cc.lineWidth = 1; cc.strokeStyle = A(g[1], 0.14);
      for (let i = 1; i < 6; i++) {
        const lx = ix + iw * i / 6;
        cc.beginPath(); cc.moveTo(lx, iy); cc.lineTo(lx, iy + ih); cc.stroke();
      }
      const sx = ix + iw / 2, sy = iy + ih * 0.42, sr = iw * 0.31;
      LCring(cc, sx, sy, sr, A(g[1], 0.46), 1.4);
      LCring(cc, sx, sy, sr * 0.72, A(g[1], 0.26), 1);
      cc.strokeStyle = A(g[1], 0.34); cc.lineWidth = 1;
      cc.beginPath();
      for (let i = 0; i < 12; i++) {
        const an = i * TAU / 12;
        cc.moveTo(sx + Math.cos(an) * sr * 0.72, sy + Math.sin(an) * sr * 0.72);
        cc.lineTo(sx + Math.cos(an) * sr, sy + Math.sin(an) * sr);
      }
      cc.stroke();
      LCstar4(cc, sx, sy, sr * 0.44, 0.16, 0);
      cc.strokeStyle = A(g[2], 0.5); cc.lineWidth = 1.6; cc.stroke();
      LCrosette(cc, sx, sy, sr * 0.26, 8, A(g[1], 0.30), 1, 0);
      LCmeander(cc, ix + 6, iy + ih - 12, 1, 0, iw - 12, 5, A(g[1], 0.18), 1, 1);
    };
    for (const sg of [-1, 1]) {
      c.save();
      c.beginPath(); c.rect(ix, iy, iw, ih); c.clip();   // 판 밖으로 안 나간다
      c.translate(sg * off, 0);
      c.beginPath(); c.rect(sg < 0 ? ix : ix + half, iy, half, ih); c.clip();
      slab(c);
      // 맞물리는 마구리 — 「두께」가 보여야 두 짝이 된다
      c.fillStyle = A(g[1], 0.75);
      c.fillRect(sg < 0 ? ix + half - 1.5 : ix + half, iy, 1.5, ih);
      c.restore();
    }
  }

  // ── ⭐⭐ 여는 빛 ④ — 레전더리. **덮개 위**라야 「새어나온다」가 된다 ──────
  if (R === 3 && lit > 0.002 && typeof gAdd === "function") {
    const kSeam = LCbell(u, 0.24, 0.20) * lit;
    if (kSeam > 0.004) {
      c.save();
      c.beginPath(); c.rect(ix, iy, iw, ih); c.clip();
      LCseamLight(c, cx, iy, ih, half, Math.max(1.5, off), g, kSeam);
      c.restore();
      // 틈에서 사방으로 뻗는 살 — 클립 밖이라 카드 밖으로 번진다
      gAdd(c, (cc) => {
        cc.save();
        cc.strokeStyle = A(g[2], 0.34 * kSeam); cc.lineWidth = 1;
        cc.beginPath();
        for (let i = 0; i < 26; i++) {
          const an = LChash(i * 3 + 1) * TAU;
          const L = (0.30 + LChash(i * 5 + 2) * 0.85) * H * 0.5 * kSeam;
          cc.moveTo(cx, iy + ih * 0.5);
          cc.lineTo(cx + Math.cos(an) * L, iy + ih * 0.5 + Math.sin(an) * L * 0.9);
        }
        cc.stroke();
        cc.restore();
      });
    }
    // 각인이 번진다 — 쐐기 띠가 차오르는 동안 테를 따라 밝아진다
    const kEng = LCbell(u, 0.52, 0.13) * lit;
    if (kEng > 0.004) {
      c.save();
      c.beginPath(); c.rect(X, Y, W, H); c.clip();
      gAdd(c, (cc) => {
        cc.strokeStyle = A(g[2], 0.55 * kEng); cc.lineWidth = 2.4;
        cc.strokeRect(X + 7, Y + 7, W - 14, H - 14);
        cc.strokeStyle = A(g[2], 0.30 * kEng); cc.lineWidth = 1.4;
        cc.strokeRect(X + 13.5, Y + 13.5, W - 27, H - 27);
      });
      c.restore();
    }
    // ⭐ 보석 조각 여섯이 **맞물리는** 그 한 박자에 판이 통째로 번쩍인다.
    // ⚠️ 자리를 0.72 → 0.875 로 옮겼다. `emb` 가 0.92 일 때 보석이 앉는데
    //   (`LCcrest` 의 `kGem` 이 0.58~0.92), `emb = LCes((u-0.58)/0.32)` 이므로
    //   그 순간은 u ≈ 0.875 다. 섬광이 사건보다 **먼저** 터지면 무엇이 번쩍였는지
    //   안 읽힌다 — 첫 판이 그랬다.
    const fk = LCcl((u - 0.845) / 0.095), kFlash = Math.sin(Math.PI * fk) * lit;
    if (kFlash > 0.004) {
      c.save();
      c.beginPath();
      if (c.roundRect) c.roundRect(X, Y, W, H, 3); else c.rect(X, Y, W, H);
      c.clip();
      gAdd(c, (cc) => { cc.fillStyle = A(g[1], 0.22 * kFlash); cc.fillRect(X, Y, W, H); });
      c.restore();
      // ⚠️ 반지름은 **진행**에서 내고 알파는 봉우리에서 낸다 — 둘을 한 값에서
      //   내면 흐릿할 때 제일 큰 고리가 그려진다(위 [LCcrest] 의 ⚠️ 와 같은 함정).
      LCshock(c, cx, ay, aR * (0.42 + 1.05 * fk), g, kFlash * 0.62, 2.4);
    }
  }
  c.restore();
}

// ── 정지 칸 — 넷을 나란히 ─────────────────────────────────────────────────
// ⚠️⚠️ `light: 0` 이 여기 있는 것이 규약의 전부다 — **다 열려 놓인 카드 넷의
//   발광은 정확히 같다.** 빛은 사다리가 아니라 타임라인 위에 있다.
const LCFULL = {plate: 1, split: 1, carve: 1, art: 1, emb: 1, txt: 1, light: 0, u: 1};
function LCstill(d) {
  return (c, t, dt, W, H) => {
    c.clearRect(0, 0, W, H);
    const m = 6;
    LCcard(c, m, m, W - m * 2, H - m * 2, d, t, LCFULL);
  };
}

// ── 여는 연출 ─────────────────────────────────────────────────────────────
//
// ⭐ 축은 **동작의 층수**다. `open` 이 그 층을 순서대로 켜고, `light` 가 그
//   층마다 **빛을 하나씩 붙인다**(사용자 ④: 「빛이 세어나온다거나」).
//
// ⚠️ **길이는 예산이 아니라 설계다.** 허용치(0.45 / 1.1 / 1.9 / 3.2)를 다 안
//   썼다 — 일반은 0.34초에 할 말을 다 한다. 판당 70회는 여전히 사실이고,
//   빈 시간이 붙은 연출은 화려한 것이 아니라 **느린 것**이다.
// ⚠️ **주기 끝과 처음이 같다.** ph=0 에서 카드가 없고 ph→1 에서 다시 없다 —
//   그 사이가 등장·유지·퇴장이다. 「보이다 툭 하고 처음으로」가 안 난다.
const LCOPEN = {
  common: {dur: 0.34, seq: (u) => ({
    carve: LCes(u / 0.62), art: LCes((u - 0.14) / 0.66),
    emb: LCes((u - 0.26) / 0.60), txt: LCes((u - 0.46) / 0.54),
    split: 1, drop: 1 - LCes(u), light: 1})},
  // ⚠️ 테를 `u=0` 에서 바로 긋기 시작한다. 0.16 부터 긋게 했더니 앞의 0.16초가
  //   **빈 판**이었다(2026-08-24 실측) — 짧은 연출에서 그 공백은 「느리다」로만 읽힌다.
  rare: {dur: 1.00, seq: (u) => ({
    carve: LCes(u / 0.66), art: LCes((u - 0.30) / 0.52),
    emb: LCes((u - 0.10) / 0.54), txt: LCes((u - 0.58) / 0.42),
    split: 1, drop: (1 - LCes(u / 0.6)), light: 1})},
  unique: {dur: 1.80, seq: (u) => ({
    carve: LCes(u / 0.36), art: LCes((u - 0.26) / 0.46),
    emb: LCes((u - 0.60) / 0.36), txt: LCes((u - 0.76) / 0.24),
    split: 1, drop: (1 - LCes(u / 0.22)) * 0.5, light: 1})},
  // ⚠️⚠️ **첫 스케줄을 버렸다.** 갈라짐(0.06~0.42)이 끝난 뒤에야 각인이
  //   시작되게 짰더니, **문이 열리고 나온 것이 빈 검은 판**이었다(2026-08-24
  //   실측 — 87% 열린 순간에 뒤가 통째로 비어 있었다).
  //   ⇒ 황도 고리가 **갈라지는 동안** 켜지게 겹쳤다. 그래야 「그 틈으로 고리가
  //     먼저 보인다」가 그림에서 참이 된다. 층은 그대로고 **차례만** 겹쳤다.
  legend: {dur: 3.10, seq: (u) => ({
    split: LCes((u - 0.10) / 0.28), art: LCes((u - 0.15) / 0.32),
    carve: LCes((u - 0.36) / 0.30), emb: LCes((u - 0.58) / 0.32),
    txt: LCes((u - 0.76) / 0.24), drop: 0, light: 1})},
};
function LCopening(d) {
  const O = LCOPEN[d.rank];
  return (c, t, dt, W, H) => {
    c.clearRect(0, 0, W, H);
    const ph = (t % LCT) / LCT;
    // 등장 [0.05, 0.05+dur/LCT] · 유지 · 퇴장 [0.86, 0.97]
    const a0 = 0.05, a1 = a0 + O.dur / LCT;
    let u, out = 0;
    if (ph < a0) { u = 0; }
    else if (ph < a1) { u = (ph - a0) / (a1 - a0); }
    else { u = 1; out = LCes((ph - 0.86) / 0.11); }
    const s = O.seq(u);
    const vis = (ph < a0 ? 0 : 1) * (1 - out);
    const m = 6, dy = (s.drop || 0) * 16;
    c.save();
    c.translate(0, dy);
    LCcard(c, m, m, W - m * 2, H - m * 2, d, t, {
      plate: vis * (u > 0 ? 1 : 0),
      split: s.split, carve: s.carve, art: s.art, emb: s.emb, txt: s.txt,
      light: u < 1 ? vis : 0, u: u,
    });
    c.restore();
    // 진행 눈금 — 「지금 몇 초짜리 연출인가」가 보여야 판정이 된다
    c.font = LCFONT(600, 9); c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.fillStyle = A("#5A5A68", 0.9);
    c.fillText(LCRANK.find((r) => r.id === d.rank).nm + " · " + O.dur.toFixed(2) + "s", 8, H - 7);
    c.fillStyle = A("#26262F", 1); c.fillRect(0, H - 3, W, 3);
    c.fillStyle = A(LCRANK.find((r) => r.id === d.rank).col[1], 0.8);
    c.fillRect(0, H - 3, W * LCcl((ph - a0) / (a1 - a0)), 3);
  };
}

// ── ⭐ 리롤 · 잠금 — 아이콘과 남은 횟수 ────────────────────────────────────
//
// 사용자 원문(2026-08-24): 「리롤과 잠금 버튼은 **아이콘으로** 해줘 (그리고
// 게임에서 **리롤은 2번까지, 잠금은 1번까지** 할 수 있게끔 해주고 그걸 ui/ux 로
// **간단하게 녹여**주셈)」
//
// ⚠️⚠️ **단위를 사용자가 안 밝혔다 — 「판당」으로 읽었다.** 근거 둘:
//   ① 레벨업이 판당 70회다(`kLevelTarget`). 「레벨업당 2회」면 판당 140회가 되어
//      제한이 뜻을 잃는다.
//   ② 「리롤 2 : 잠금 1」이라는 비는 「두 번 리롤하는데 한 번만 잠글 수 있다」로
//      읽어야 말이 된다 — 레벨업당이면 둘이 한 화면에서 안 만난다.
//   ⇒ **판당으로 그리되 판정 자리로 남긴다.**
// ⚠️ 지금 엔진은 `kRerollMaxPerRun = 2` 로 **이미 판당 2회**다 — 리롤 쪽은
//   사용자 수치와 엔진이 우연히 같다. 잠금은 엔진에 개념 자체가 없다.
// ⚠️ **다 쓴 뒤의 꼴을 같이 그린다.** 시안이 실패 장면을 안 그리면 엔진에도
//   안 생긴다 — 이 저장소에서 반복된 실패다(아래 「잠금 0」 칸이 그것이다).

/// 리롤 아이콘 — **자물쇠 대신 못**을 쓴 이 카드의 결을 그대로 이었다.
/// 고리 두 도막 + 쐐기 머리 둘. 「돌아서 다시 온다」가 두 도막으로 읽힌다.
function LCicoReroll(c, x, y, s, col, lite) {
  c.save();
  c.lineWidth = s * 0.15; c.lineCap = "butt"; c.strokeStyle = col;
  for (const sg of [0, 1]) {
    c.beginPath();
    c.arc(x, y, s * 0.62, sg * Math.PI + 0.42, sg * Math.PI + Math.PI - 0.30);
    c.stroke();
  }
  // 쐐기 머리 둘 — 도는 방향을 못 박는다
  LCtri(c, x + Math.cos(0.42) * s * 0.62, y + Math.sin(0.42) * s * 0.62,
    0.42 - Math.PI / 2, s * 0.30, s * 0.16, lite);
  LCtri(c, x + Math.cos(Math.PI + 0.42) * s * 0.62, y + Math.sin(Math.PI + 0.42) * s * 0.62,
    0.42 + Math.PI / 2, s * 0.30, s * 0.16, lite);
  c.restore();
}
/// 잠금 아이콘 — **못 넷**. 자물쇠는 「열 수 없다」의 어휘라 「이 칸을 지킨다」와
/// 뜻이 반대고, 이 게임의 카드 테는 이미 각인 · 못의 어휘를 갖고 있다.
function LCicoLock(c, x, y, s, col, lite) {
  c.save();
  c.strokeStyle = col; c.lineWidth = 1.2;
  c.strokeRect(x - s * 0.52, y - s * 0.52, s * 1.04, s * 1.04);
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    c.save();
    c.translate(x + sx * s * 0.52, y + sy * s * 0.52);
    c.rotate(Math.PI / 4);
    c.fillStyle = lite; c.fillRect(-s * 0.16, -s * 0.16, s * 0.32, s * 0.32);
    c.restore();
  }
  c.restore();
}
/// **남은 횟수** — 「간단하게」가 조건이라 숫자를 안 쓴다. 칸이 `max` 개 있고
/// 쓴 만큼 **속이 빈다**. 3택 화면은 퀵슬롯·스탯·미니맵이 들어갈 자리라 여백이
/// 없다 — 점 두세 개가 화면을 제일 안 어지럽힌다.
function LCpips(c, x, y, gap, max, left, col, dim) {
  for (let i = 0; i < max; i++) {
    const px = x + i * gap;
    if (i < left) { LCdia(c, px, y, 3.4, col); }
    else {
      c.beginPath();
      c.moveTo(px, y - 3.4); c.lineTo(px + 3.4, y); c.lineTo(px, y + 3.4); c.lineTo(px - 3.4, y);
      c.closePath(); c.strokeStyle = dim; c.lineWidth = 1; c.stroke();
    }
  }
}

// ── 3택 화면 한 컷 ────────────────────────────────────────────────────────
function LCscreen(c, t, dt, W, H) {
  c.clearRect(0, 0, W, H);
  c.fillStyle = "#07070C"; c.fillRect(0, 0, W, H);
  // 머리줄
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  c.font = LCFONT(600, 17); c.fillStyle = A("#E8C879", 0.95);
  c.fillText("LEVEL UP", W / 2, 34);
  c.font = LCFONT(500, 10); c.fillStyle = A("#5A5A68", 1);
  c.fillText("2 / 4 남음", W / 2, 50);

  // ⚠️ `y` 를 68 → 88 로 내렸다 — 잠금 라벨(`y - 12`)이 머리줄의 「2 / 4 남음」과
  //   겹쳐 두 글자가 포개졌다(2026-08-24 실측).
  const cw = 214, ch = 300, gap = 26, y = 88;
  const x0 = W / 2 - (cw * 3 + gap * 2) / 2;
  LCPICK.forEach((d, i) => {
    const X = x0 + i * (cw + gap);
    LCcard(c, X, y, cw, ch, d, t, LCFULL);
    // 잠긴 칸 — 자물쇠 대신 **못 넷**. 「이 자리를 박아 둔다」가 이 게임의 결이다
    if (d.lock) {
      c.strokeStyle = A("#FFC24A", 0.9); c.lineWidth = 1.6;
      c.beginPath();
      if (c.roundRect) c.roundRect(X - 3, y - 3, cw + 6, ch + 6, 4);
      else c.rect(X - 3, y - 3, cw + 6, ch + 6);
      c.stroke();
      for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
        c.save();
        c.translate(X + cw / 2 + sx * (cw / 2 + 3), y + ch / 2 + sy * (ch / 2 + 3));
        c.rotate(Math.PI / 4);
        c.fillStyle = A("#FFC24A", 0.95); c.fillRect(-3.4, -3.4, 6.8, 6.8);
        c.restore();
      }
      c.font = LCFONT(700, 9.5); c.textAlign = "center";
      c.fillStyle = A("#FFC24A", 0.95);
      c.fillText("잠금 — 리롤해도 안 바뀐다", X + cw / 2, y - 12);
    }
  });

  // ── 아래 손잡이 둘 — **아이콘 + 남은 칸** ──
  // ⚠️ 오른쪽 칸이 **다 쓴 꼴**이다. 시안이 실패 장면을 안 그리면 엔진에도
  //   안 생긴다 — 여기서 미리 그려 둔다.
  const by = y + ch + 46;
  const BT = [
    {ico: LCicoReroll, nm: "리롤", sub: "세 장을 다시 뽑는다", max: 2, left: 1},
    {ico: LCicoLock, nm: "잠금", sub: "다 썼다 — 이 판에서 더 못 잠근다", max: 1, left: 0},
  ];
  BT.forEach((b, i) => {
    const bw = 292, bx = W / 2 + (i ? 16 : -16 - bw);
    const on = b.left > 0;
    const line = on ? A("#5A5A66", 1) : A("#2C2C36", 1);
    const face = on ? A("#EDEDF2", 0.94) : A("#54545E", 0.9);
    const lite = on ? A("#FFC24A", 0.95) : A("#54545E", 0.75);
    c.strokeStyle = line; c.lineWidth = 1;
    c.beginPath();
    if (c.roundRect) c.roundRect(bx, by - 26, bw, 52, 3); else c.rect(bx, by - 26, bw, 52);
    c.stroke();
    // 모서리 못 넷 — 이 화면의 테 어휘를 손잡이도 쓴다
    for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      c.save();
      c.translate(bx + bw / 2 + sx * (bw / 2 - 6), by + sy * 20);
      c.rotate(Math.PI / 4);
      c.fillStyle = on ? A("#5A5A66", 1) : A("#2C2C36", 1);
      c.fillRect(-1.8, -1.8, 3.6, 3.6);
      c.restore();
    }
    b.ico(c, bx + 30, by, 13, face, lite);
    c.textAlign = "left";
    c.font = LCFONT(600, 12); c.fillStyle = face;
    c.fillText(b.nm, bx + 54, by - 4);
    c.font = LCFONT(500, 9.5); c.fillStyle = on ? A("#9494A2", 0.9) : A("#4A4A54", 0.9);
    c.fillText(b.sub, bx + 54, by + 12);
    // 남은 칸 — 오른쪽 끝. 채워진 마름모가 남은 것, 빈 것이 쓴 것.
    LCpips(c, bx + bw - 22 - (b.max - 1) * 13, by - 6, 13, b.max, b.left, lite, A("#3A3A46", 1));
    c.textAlign = "right";
    c.font = LCFONT(500, 8.5); c.fillStyle = A("#5A5A68", 1);
    c.fillText("판당 " + b.max, bx + bw - 16, by + 13);
    if (!on) {
      // 다 쓴 표시 — 아이콘을 가로지르는 획 하나. 「없다」는 **빼는 것이 아니라
      // 긋는 것**이라야 「원래 없었다」와 안 헷갈린다.
      c.strokeStyle = A("#7A7A88", 0.9); c.lineWidth = 1.4; c.lineCap = "round";
      c.beginPath();
      c.moveTo(bx + 30 - 12, by + 12); c.lineTo(bx + 30 + 12, by - 12); c.stroke();
    }
  });
  c.textAlign = "center";
  c.font = LCFONT(500, 9); c.fillStyle = A("#4A4A54", 1);
  c.fillText("⚠️ 「리롤 2 · 잠금 1」의 단위를 사용자가 안 밝혔다 — 이 화면은 「판당」으로 읽었다(판정 대기)",
    W / 2, by + 46);
}

// ── 칸 목록 ───────────────────────────────────────────────────────────────
//
// ⚠️ 수치는 **이 장의 표와 같은 값이어야 한다.** 퍼센트는 등급 단계에서,
//   고정은 고정 단계에서 실제로 뽑은 값이다(HTML 의 표가 정본).
const LCLADDER = [
  {rank:"common", nm:"스킬공격력", val:"+7%", sym:"spell",
   sub:"기본값 기준 · 가산\n일반 단계 7 · 9 · 11 · 13 중 첫 칸"},
  {rank:"rare", nm:"스킬공격력", val:"+22%", sym:"spell",
   sub:"기본값 기준 · 가산\n레어 단계 14 · 18 · 22 · 26 중 셋째 칸"},
  {rank:"unique", nm:"스킬공격력", val:"+36%", sym:"spell",
   sub:"기본값 기준 · 가산\n유니크 단계 24 · 30 · 36 중 셋째 칸"},
  {rank:"legend", nm:"스킬공격력", val:"+130%", sym:"spell",
   sub:"기본값 기준 · 가산\n레전더리 단계 70 · 100 · 130 중 셋째 칸"},
];
const LCKIND = [
  {rank:"rare", nm:"빛파동", val:"LEVEL 3", sym:"skill",
   sub:"파동 2장 — 뒤따라 한 번 더\n① 스킬 레벨업 · 들고 들어간 6종만 뜬다"},
  {rank:"unique", nm:"사자 獅子", val:"+8% → +26%", sym:"star",
   sub:"⚠️ 이번 판만 — 영구 강화가 아니다\n② 성좌 강화 · 판 밖에서 끼고 온 3칸"},
  {rank:"rare", nm:"일반공격력", val:"+250", sym:"atk",
   sub:"고정 꼴 — 기본값에 그대로 더한다\n③ 스탯 강화 · ⭐ 카드도 문양도 신설"},
  {rank:"legend", nm:"체력", val:"+100%", sym:"vitality",
   sub:"퍼센트 꼴 — 기본값의 100%\n③ 스탯 강화 · 상한 없음"},
];
/// 유니크 중앙 문양 — 안 셋. **고르지 않은 둘도 남긴다**(사용자가 눈으로 보고
/// 갈아탈 수 있어야 한다). 실제 카드가 쓰는 것은 [LCUNIPICK] 하나가 정한다.
const LCUNIS = [
  {rank:"unique", nm:"스킬공격력", val:"+36%", sym:"spell", uni:"A",
   cap:"<b>안 A · 혼천의</b> ⭐ <b>채택</b> — 고리 여럿이 서로 다른 각으로 겹치고 " +
       "가운데 코어가 앉는다. <b>배경의 역방향 궤도와 같은 문법</b>이라 카드가 " +
       "한 이야기로 묶인다. 왕관에 없는 권위(첨탑·깃·육각 보석)를 하나도 안 쓴다",
   sub:"기본값 기준 · 가산\n안 A — 혼천의"},
  {rank:"unique", nm:"스킬공격력", val:"+36%", sym:"spell", uni:"B",
   cap:"<b>안 B · 반관(서클릿)</b> — 왕관과 나란히 두면 <b>서열이 즉시</b> 읽힌다. " +
       "다만 관은 관이라 <b>레전더리와 같은 축</b>에 서고, 유니크가 「작은 왕관」이 " +
       "되어 제 정체를 잃는다",
   sub:"기본값 기준 · 가산\n안 B — 반관"},
  {rank:"unique", nm:"스킬공격력", val:"+36%", sym:"spell", uni:"C",
   cap:"<b>안 C · 팔면체 원석</b> — 이 게임 고유 어휘(다면체 셀 셰이딩). 다만 " +
       "실루엣이 <b>세로로 선 마름모</b>라 일반·레어의 4각 별과 <b>1/3 크기에서 " +
       "덜 갈린다</b> — 요구 ②를 제일 약하게 만족한다",
   sub:"기본값 기준 · 가산\n안 C — 팔면체 원석"},
];
/// 유니크 급 스탯 문양 여덟 — [LCUSYM] 여덟 다 한 자리에서 눈으로 비교한다.
/// ⚠️ `uni` 필드를 **일부러 안 준다** — 주면 위 [lcuni] 갤러리처럼 [LCUNI] 로
///   빠진다. 여기는 그 반대(문양이 자동으로 [LCUSYM] 을 타는지)를 보는 자리다.
const LCUSTAT = [
  {rank:"unique", nm:"일반공격력", val:"+820", sym:"atk",
   cap:"다섯 갈래 부챗살이 <b>한 점을 부순다</b> — 맞는 순간 마름모가 자라고 획이 뒤로 튄다",
   sub:"고정 꼴 — 기본값에 그대로 더한다"},
  {rank:"unique", nm:"공격속도", val:"+22%", sym:"aspd",
   cap:"갈매기가 <b>셋</b>으로 늘고, 그 아래 <b>간격을 재는 자</b>가 선다",
   sub:"기본값 기준 · 가산"},
  {rank:"unique", nm:"스킬공격력", val:"+36%", sym:"spell",
   cap:"⭐ <b>안 B · 반관 그대로</b> — 뿔 셋이 솟고 가운데 돌에 문양이 앉는다",
   sub:"기본값 기준 · 가산"},
  {rank:"unique", nm:"이동속도", val:"+26%", sym:"speed",
   cap:"화살이 <b>셋</b>이 되고 뒤로 <b>속도선</b>이 흐른다",
   sub:"기본값 기준 · 가산"},
  {rank:"unique", nm:"치명타 확률", val:"+14%", sym:"crit",
   cap:"⭐ <b>안 C · 팔면체 원석 그대로</b> — 적도가 벌어지고 위·아래 뿔이 솟아 면이 갈린다",
   sub:"기본값 기준 · 가산"},
  {rank:"unique", nm:"치명타 피해", val:"+55%", sym:"critdmg",
   cap:"⭐ <b>45° 대칭 넷</b> + 둘레의 <b>깨진 고리</b>(조각 넷이 밖으로 밀려난다)",
   sub:"기본값 기준 · 가산"},
  {rank:"unique", nm:"방어력", val:"+950", sym:"defense",
   cap:"⭐ <b>안 A · 혼천의 그대로</b> — 고리 여럿이 서로 다른 각으로 겹치고 코어가 앉는다",
   sub:"고정 꼴 — 기본값에 그대로 더한다"},
  {rank:"unique", nm:"체력", val:"+140%", sym:"vitality",
   cap:"칸이 <b>넷</b>이 되고, 마지막 칸이 <b>아직 떨어져 다가오는 중</b>이다",
   sub:"기본값 기준 · 가산"},
];
const LCPICK = [
  {rank:"common", nm:"이동속도", val:"+11%", sym:"speed", sub:"기본값 기준 · 가산"},
  {rank:"legend", nm:"치명타 피해", val:"+100%", sym:"critdmg", sub:"기본값 기준 · 가산", lock: true},
  {rank:"rare", nm:"방어력", val:"+300", sym:"defense", sub:"고정 꼴"},
];

// ── 조립 ──────────────────────────────────────────────────────────────────
// ⚠️ 제목에 「N종」을 안 쓴다 — 린트 ⑪(제목의 「N종」 ↔ 실제 칸 수)이 곁
//   스크립트의 칸을 0 으로 세기 때문이다(`vfx-flamenat.js` 가 먼저 겪은 자리).
function LCmount(hostId, list, fn, cw) {
  const host = document.getElementById(hostId);
  if (!host) return;
  asRow(host, cw);
  for (const d of list) {
    const el = document.createElement("div");
    el.className = "tile"; asCell(el, cw);
    const cv = document.createElement("canvas");
    box(cv, {width: "100%", height: "auto", display: "block",
      aspectRatio: LCCW + "/" + LCCH, background: "#07070C"});
    el.appendChild(cv);
    const rk = LCRANK.find((r) => r.id === d.rank);
    el.insertAdjacentHTML("beforeend",
      `<div class="cap"><div class="nm">${rk.nm} · ${d.nm}</div>` +
      `<div class="ds">${d.cap || rk.rule}</div></div>`);
    host.appendChild(el);
    mk(cv, [LCCW, LCCH], fn(d));
  }
}
LCmount("lcladder", LCLADDER, LCstill, 196);
LCmount("lcopen", LCLADDER.map((d) => ({...d, cap: LCRANK.find((r) => r.id === d.rank).opens})),
        LCopening, 196);
LCmount("lckind", LCKIND, LCstill, 196);
LCmount("lcuni", LCUNIS, LCstill, 210);
LCmount("lcustat", LCUSTAT, LCstill, 196);
{
  const host = document.getElementById("lcscreen");
  if (host) {
    asRow(host, 980, false);
    const el = document.createElement("div");
    el.className = "tile wide";
    const cv = document.createElement("canvas");
    box(cv, {width: "100%", height: "auto", display: "block",
      aspectRatio: "980/520", background: "#07070C"});
    el.appendChild(cv);
    el.insertAdjacentHTML("beforeend",
      `<div class="cap"><div class="nm">3택 한 컷 — 가운데가 <b>잠긴</b> 칸이다</div>` +
      `<div class="ds">잠긴 칸은 자물쇠가 아니라 <b>못 넷</b>으로 박는다. ` +
      `손잡이 둘은 <b>글자가 아니라 아이콘</b>이고, 오른쪽 끝의 <b>마름모가 남은 횟수</b>다 ` +
      `— 채워진 것이 남은 것, 빈 것이 쓴 것. <b>리롤 2 · 잠금 1</b>(판당)이라 ` +
      `화면의 잠금은 <b>이미 다 쓴 꼴</b>로 그려 뒀다.</div></div>`);
    host.appendChild(el);
    mk(cv, [980, 520], LCscreen);
  }
}
