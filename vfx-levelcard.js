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
//   ⚠️ 2026-08-28 사용자 판정으로 **빛이 등급 축이 됐다**([LCLIT]). [LCHALO] 는
//     그대로 넷이 나눠 쓰고, 그 위에 발광 사다리가 한 축 더 얹혔다.
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
//   [⚠️ 뒤집힌 축] **후광 예산.** [LCHALO] 는 그대로지만 2026-08-28 에 [LCLIT]
//     가 위에 얹혔다 — 사용자 원문 「지금은 카드 자체에서 빛이 나진 않으니까」.
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
//   ⚠️ **풀린 금지** | 발광 세기로 등급을 구분하는 것 — 2026-08-28 사용자 요구로
//     [LCLIT] 가 섰다. 다만 **층·테·문양의 사다리는 한 값도 안 내렸다**(빛이
//     화려함을 대신하는 것이 아니라 그 위에 얹힌다).
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

// ── ⭐⭐ 발광 사다리 — **카드가 제 빛을 낸다**               (2026-08-28) ──
//
// 사용자 원문: 「'레전더리' 카드의 경우 **발광 효과를 좀 더 추가**해 보는 것도
// 방법일 듯? **지금은 카드 자체에서 빛이 나진 않으니까**」
//
// ⚠️⚠️ **이 파일의 옛 규약을 사용자께서 뒤집으셨다.** [LCHALO] 는 「발광 세기로
//   등급을 가르지 마라」를 못 박은 값이었다(넷이 한 예산을 나눠 씀). 그 규약은
//   「화려함을 발광으로 때우지 마라」를 지키려던 것이고 그 뜻은 지금도 유효하다 —
//   그래서 **층·테·문양의 사다리는 한 값도 안 내렸고**, 빛을 **위에 한 축 더**
//   얹었다. 발광이 층을 대신하는 것이 아니라 층 위에 얹힌다.
// ⭐ 사다리로 세운 까닭: 넷을 가르던 축이 **색 하나**뿐이었다. 빛을 축으로 더하면
//   정지 화면에서도 순서가 읽힌다(안 빛남 → 제일 밝게 빛남). 그리고 일반이
//   **브론즈(안 빛나는 금속)**로 내려간 지금, 레전더리(빛나는 금)와 색상각이
//   6.1° 로 붙는데 **「빛나나 안 빛나나」가 그 둘을 가르는 제일 큰 축**이 된다.
// ⚠️ **속성 여섯은 이 사다리에 안 낀다** — 등급이 없는 카드라 사다리에 끼우면
//   「빙이 레어보다 위」 같은 거짓말을 그림이 하게 된다. 여섯이 **한 값**을
//   나눠 쓰고([LCATLIT]), 그 값은 사다리의 어느 칸과도 안 같다.
// ⚠️ **블러를 안 쓴다.** 엔진의 레벨업 카드 층(`lib/ui/levelup_*.dart`)에는
//   `MaskFilter.blur` 가 한 곳도 없고 있는 것은 `lcGlow()` = `BlendMode.plus`
//   하나다(`levelup_art.dart:38`). 시안도 그 문 하나만 쓴다(`gAdd` = `lighter`) —
//   번짐은 블러가 아니라 **계조**로 낸다(굵기·알파를 달리해 세 겹).
const LCLIT = {common: 0, rare: 0.34, unique: 0.68, legend: 1.0};
/// 속성 여섯이 나눠 쓰는 한 값 — 사다리 밖이다.
/// ⚠️ 사다리의 **어느 칸과도 안 같고**, 제일 낮은 칸(레어 0.34)보다 **아래**다 —
///   속성 카드가 어느 등급으로도 안 읽히게 하는 값이다.
/// ⚠️ 여섯의 **실측 광량은 서로 다르다**(뇌가 제일 크고 빙이 제일 작다). 그것은
///   사다리가 아니라 각 정체색의 밝기 차다 — 값은 하나다.
const LCATLIT = 0.26;

// ── ⭐⭐ 발치 밀도 사다리 — **아래가 얼마나 찼나**          (2026-08-28) ──
//
// 사용자 원문(레전더리 갈무리의 아래쪽을 빨간 상자로 짚으며):
//   「레전더리의 경우 **이쪽도 문양을 좀 더 채워서 더 화려하게** 안 되려나?」
//
// ⚠️⚠️ **글 뒤를 안 채운다.** 바로 앞 회차에 사용자께서 일반 카드를 「너무
//   어두워서 **가독성이 떨어짐**」으로 반려하셨다 — 지금 글이 안 읽히는 것에
//   민감하시다. ⇒ 채우는 곳은 글의 **둘레**뿐이다: 좌우 여백의 눈금 기둥 ·
//   아래 두 모서리의 받침 · 구분선의 구슬 · 아래 테를 도는 룬 띠.
// ⚠️ **넓은 면을 안 칠한다.** 아래 절반은 면적이 넓고 3택은 석 장이 동시에
//   뜬다. 채우는 것은 전부 **가늘고 긴 것**이라 칠해지는 픽셀이 거의 안 는다.
// ⭐ 사다리로 세운 까닭: 「등급이 오르면 화려해진다」가 이 카드들의 축인데 그
//   축이 카드 **위쪽에만** 있었다. 아래까지 사다리를 이으면 카드가 위아래로
//   안 갈리고, 정지 화면에서 급을 말하는 자리가 하나 더 생긴다.
const LCFOOT = {common: 0.10, rare: 0.40, unique: 0.72, legend: 1.0};
/// 속성 여섯 — 등급이 없으므로 사다리 밖의 한 값이다.
/// ⚠️ 0.34 는 [LCFOOT] 의 어느 칸과도 안 같다(0.10 · 0.40 · 0.72 · 1.0). 그리고
///   항이 서는 문턱(0.20 · 0.30 · 0.35 · 0.55 · 0.65 · 0.80 · 0.88) 중 앞의 둘만
///   넘으므로, 여섯의 발치는 **같은 항 셋**으로 통일된다.
const LCATFOOT = 0.34;

const LCFONT = (w, s) => `${w} ${s}px "Apple SD Gothic Neo",-apple-system,sans-serif`;

// ── 등급 넷 ───────────────────────────────────────────────────────────────
//
// `p`       등장 확률(%) — 사용자 확정 65 / 27 / 7 / 1
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
//
// ── ⭐⭐ 색을 옮긴 자리 둘 — **일반 · 레전더리**              (2026-08-28)
//
// ⚠️ **레어는 옮겼다가 되돌렸다.** 한때 하늘색(`#78CDF2`)이었다 — 빙과 벌리려던
//   것인데, 사용자께서 보시고 「'빙'의 경우 완전히 파란색이 되어서 레어와 확실히
//   구분이 되었음. **레어색을 다시 원래색으로 되돌려도 될 만큼** 바뀐 듯함」이라
//   하셨다. ⇒ `#4FA0E8` 그대로다. 벌린 것은 빙 쪽 하나뿐이다.
//
// ⭐ **일반 = 놋쇠**(2026-08-28). 사용자 원문 셋이 한 자리로 모였다:
//     ① 「일반 '옮긴 안'(따뜻한 회색) 괜찮긴 한데 **너무 구린데** ㅋㅋ」
//     ② 「따듯한 회색 쪽으로 가되 좀 더 **진한 갈색? Bronze 느낌**」
//     ③ 「**너무 어두워서 가독성이 떨어짐**」 → ④ 「**놋쇠까지 가도 될 거 같은데**」
//   ⇒ 온도는 맞았고 **재질과 밝기**가 모자랐다. 채도 12 의 누런 회색은 「빛바랜
//     것」이고, 채도를 올려 금속으로 만들면 그 자리에서 놋쇠가 된다.
// ⚠️⚠️ **`#E8C93A`(49°) 는 안 썼다.** 이 저장소가 단전(`halt`) 항에서 「재 보면
//   49° 라 **염·뇌의 금 무리 한복판**」이라고 판정하고 이미 버린 값이다
//   (`lib/render/cel_tones.dart`). 놋쇠를 **색상 43.7° · 채도 38** 로 잡아
//   그 값에서 색상 5.3° · 채도 41 을 뺐다 — 같은 「놋쇠」라도 **탁한 쪽**이다.
// ⚠️⚠️ 그래도 **레전더리 금과 색상각이 7.6° 로 붙는다.** 색으로는 못 가르므로
//   갈리는 축을 셋 세웠다(전부 실측):
//     채도 38 대 100 · 발광 0 대 1.0 · 발치 장식 564px 대 3484px
//
// ⭐ **레전더리는 아주 살짝 주황 쪽으로**(사용자 원문: 「아주 살짝 '주황색 계열
//   쪽으로' … **황금색이라는 이미지가 무너지면 안 됨**」). 색상 39.8° → 36.1°,
//   **3.7° 만** 내렸고 채도 100 · 명도 64.5 는 한 톨도 안 건드렸다.
const LCRANK = [
  {id:"common", nm:"일반", p:65, layers:15, hues:1,
   col:["#534727","#C6B380","#EFE9D7"],
   flow:["#B7A066","#DACEA9","#C1AD7B"],
   rankRef:"common('일반','一')",
   rule:"⭐ **옛 레어의 도안을 그대로 물려받았다** — 뇌문 띠 · 밧줄 꼬임 · 오목한 4각별 · 방사선 · 파선 고리 셋 · 구슬 축선 · 별 셋 · 테 셋. " +
        "무채 한 색이고 **아무것도 안 움직인다**(흐름 고정 · 두 박자 없음). " +
        "⭐ 색은 **놋쇠**다(2026-08-28 이동) — 무(무채색)와는 재질로, 레전더리(황금)와는 " +
        "채도·발광·발치 장식으로 갈린다",
   opens:"내려와 멎고, 빗금 하나가 판을 한 번 훑고 지나간다 (0.34초)"},
  {id:"rare", nm:"레어", p:27, layers:16, hues:2,
   col:["#13324E","#4FA0E8","#DCEEFF"],
   flow:["#3E86D4","#5FD8D0","#4FA0E8","#79B8F2"],
   rankRef:"rare('희귀','稀') — ⚠️ 화면 이름만 「레어」다",
   rule:"일반과 **같은 도안**이다. 갈리는 것은 색이 아니라 ⭐ **문양이 앉는 자리** — 레어만 문양이 " +
        "**각인 판(음각 판)** 위에 앉는다. 거기에 흐름이 돌고(청↔민트) 두 박자가 붙는다 — **자리는 안 움직인다**. " +
        "⭐ 색은 **원래대로**다 — 한때 하늘색으로 옮겼다가 사용자 판정으로 되돌렸다(빙이 대신 내려갔다)",
   opens:"미끄러져 들어와 멎고, 불붙은 끝이 안쪽 테를 한 바퀴 긋는다 (1.00초)"},
  {id:"unique", nm:"유니크", p:7, layers:25, hues:3,
   col:["#2E1A52","#B07AF0","#F0E4FF"],
   flow:["#9A5FE4","#E070D8","#7C74F0","#C48CF6"],
   rankRef:"unique('유니크','唯')",
   rule:"층이 선다 — 성좌 도해 + 각도 눈금 + 소용돌이 + 4각별 두 겹 + 밧줄 + 뇌문 사방. " +
        "⭐ 중앙은 4각 별이 아니라 **혼천의**다 — 역방향 궤도 두 겹 + 잔향이 그 둘레를 돈다",
   opens:"각인이 켜지며 번지고, 별을 잇는 선을 빛이 타고 흐르고, 마지막에 혼천의가 선다 — " +
         "대좌 → 자오환 → 누워 있던 고리 넷이 일어선다 (1.80초)"},
  {id:"legend", nm:"레전더리", p:1, layers:30, hues:4,
   col:["#4A2E06","#FFB74A","#FFF3DC"],
   flow:["#F09928","#FFF3DC","#FFB74A","#FFDA9A"],
   rankRef:"— **없다.** 스킬 등급에 다섯째 칸이 없어 여기서 지었다",
   rule:"⭐ **테가 곧 그림이다.** 황도 고리 + 밧줄 꼬임 + 오목한 4각별 + 소용돌이 + " +
        "방사선 + 쐐기 각인 띠 + 모서리 문장 획 + 마루장식이 **테 밖으로 넘는다**",
   opens:"닫힌 석판이 갈라지고 그 틈에서 빛이 새어나온다 → 고리가 보이고 → 각인이 번지고 → " +
         "대좌가 벌어지고 첨탑이 솟고 깃이 펼쳐지고 보석 조각 여섯이 날아와 맞물린다 (3.10초)"},
];

// ── ⭐⭐ 단계 값 — **카드에 뜨는 수는 전부 여기서 나온다** ─────────────────
//
// ⚠️⚠️ **이 표가 정본이다.** 카드도 표도 이 하나를 읽는다 — 손으로 옮겨 적으면
//   그 순간 갈라지고, 카드에 뜬 수가 어디서 왔는지 아무도 못 짚게 된다.
//
// ⭐⭐ **축마다 사다리가 다르다**(2026-08-27 사용자 확정). 한 사다리로 여덟을
//   덮으려다 실패한 자리다 — 축마다 **단위가 다르기** 때문이다:
//     · 치명타 확률 · 공격속도 — **%p**(더하기). 0 에서 시작하므로 곱이 안 된다
//     · 공격력 · 스킬공격력 — **% amp**. `finalDamage` 의 amp 항이 1.0 에서 시작
//     · 이동속도 · 체력 — **기본값의 %**
//     · 치명타 피해 — **배수의 %p**(기본 1.5배 = 150)
//     · 방어력 — **받는 피해 감소 %**(0 에서 시작하므로 「방어력의 %」가 아니다)
//
// ⭐ **안쪽은 좁고 사이는 넓다** — 사용자 원칙: 「등급 간의 차이는 벌어지고 그
//   안에서는 차이가 미미해야 될 것 같아. 그냥 **소소한 이득과 소소한 손실**」.
//
// ⚠️⚠️ **폭이 넓으면 등급이 뒤집힌다.** 옛 값(±30%)에서는 레어 최고가 유니크
//   최저를 넘어 「내 유니크가 내 레어보다 약하다」가 **열 판에 여덟 판**
//   일어났다(20만 판 실측). 등장률이 27% 대 7% 인데 뒤집히면 그것은 운이
//   아니라 사다리가 틀린 것이다.
//
// ⚠️ **단계 수가 축마다 다르다.** 값이 작으면 정수 안에 서로 다른 셋이 안
//   들어간다(2 의 ±10% 안에 정수가 하나뿐이다). 그래서 큰 축은 둘, 작은
//   축은 하나다 — **보여 줄 수 없는 차이는 안 두는 것이 맞다.**
//
// ⚠️ **싸움의 여덟 중 고정 꼴은 셋뿐이다**(공격력 · 방어력 · 체력). 나머지
//   다섯은 퍼센트뿐이다 — 「+100 치명타 확률」 같은 것은 뜻이 없다.
//   ⭐ 아래 **게임 관련 넷**에서는 그 셈이 뒤집힌다(2026-08-28) — 셋이 퍼센트
//     뿐이고 **초당회복력 하나만 고정**이다(사용자가 「+30」·「+100」으로 주셨다).
//     ⇒ 표 전체로는 축 **열둘** · 고정 꼴을 가진 축 **넷**이다.
const LCAXIS = [
  {sym:"atk",      nm:"일반공격력",  unit:"% amp",  base:"무기 피해 × amp(1.0 에서 시작)",
   pct:{common:[5], rare:[7], unique:[12], legend:[20]},
   flat:{common:[1], rare:[2], unique:[4], legend:[8]}},
  {sym:"aspd",     nm:"공격속도",    unit:"%p 쿨감", base:"상한 45% (kCdrFloorMul)",
   pct:{common:[3, 5], rare:[8, 10], unique:[13, 15], legend:[20, 25]}},
  // ⚠️ `tbd` 는 「**아직 안 정했다**」 하나만 뜻한다 — 「그 등급에 안 만든다」와
  //   반드시 갈라야 한다(아래 게임 관련 넷이 등급을 비운다). 전에는 표가
  //   `!ax.pct` 로 이 둘을 같이 읽어서, 퍼센트 꼴이 없는 축이 서면 그 줄이
  //   통째로 「수치 미정」으로 뒤집혔다.
  {sym:"spell",    nm:"스킬공격력",  unit:"% amp",  base:"공격력과 같은 amp 항",
   tbd:true, pct:null},
  {sym:"speed",    nm:"이동속도",    unit:"%",      base:"기본 이동속도",
   pct:{common:[5, 7], rare:[10, 12], unique:[15], legend:[20]}},
  {sym:"crit",     nm:"치명타 확률", unit:"%p",     base:"0 에서 시작 · 천장 100%p",
   pct:{common:[3, 5], rare:[8, 10], unique:[13, 15], legend:[20, 25]}},
  {sym:"critdmg",  nm:"치명타 피해", unit:"%p",     base:"기본 1.5배 = 150",
   pct:{common:[30], rare:[50], unique:[100], legend:[200]}},
  {sym:"defense",  nm:"방어력",      unit:"% 감소",  base:"받는 피해 감소 · 상쇄 상한 60%",
   pct:{common:[5], rare:[7], unique:[12], legend:[20]},
   flat:{common:[0.5], rare:[1], unique:[2], legend:[4]}},
  {sym:"vitality", nm:"체력",        unit:"%",      base:"kPlayerHpMax 100",
   pct:{common:[5], rare:[10], unique:[15], legend:[25]},
   flat:{common:[8], rare:[16], unique:[25], legend:[45]}},

  // ── ⭐⭐ 게임 관련 넷 — **판을 굴리는 것들** (2026-08-28 사용자 신설) ──────
  //
  // 사용자 원문: 「일반 카드 쪽에 **게임과 관련된 카드**를 넣고 싶은데」
  //
  // ⭐ 위 여덟은 전부 **싸움의 수**(때리는 힘 · 맞는 힘)다. 이 넷은 싸움이
  //   아니라 **판을 굴리는 것**이다 — 캐고 · 줍고 · 버틴다. 축이 갈리므로
  //   표에서도 한 묶음으로 세운다.
  //
  // ⚠️⚠️ **「—」는 0 이 아니라 「그 등급에 안 만든다」다.** 사용자 원문:
  //   「일반이나 레전더리 언급 없는 것들은 **해당 등급에 만들지 않음**」
  //   ⇒ 빈 칸을 임의로 채우지 않는다. 넷 다 **레전더리가 없고**, 흡수반경과
  //     초당회복력은 **일반도 없다**. 카드 격자([LCGAME])도 그대로 따라서
  //     **만드는 등급만** 굽는다 — 표와 그림이 같은 수를 말해야 한다.
  //
  // ⚠️⚠️⚠️ **전부 합 계산이다. 복리가 아니다.** 사용자 원문 둘:
  //     「채굴 도구의 기본 속도가 100이면 **복리 계산이 아니라 기본 속도 대비
  //       합 계산**임」
  //     「고정 흡수 반경이 100이면 (게임 진입 전) **10%를 3개 먹으면 복리
  //       계산이 아니라 130**인 거임」
  //   ⇒ 기준값 × (1 + Σ퍼센트) 다. 100 × 1.1³ = 133.1 **이 아니라**
  //     100 + 10 + 10 + 10 = **130**. 곱으로 접으면 카드에 적힌 수와 실제로
  //     오르는 값이 갈리고, 그 갈라짐은 카드가 늘수록 커진다.
  //   ⚠️ 이식할 때 제일 틀리기 쉬운 자리다 — 엔진의 `Stats.absorbMul` 은
  //     지금 **곱**으로 얹힌다(`constellation_apply.dart` 의 `s.absorbMul *=`).
  //     카드를 같은 필드에 `*=` 로 물리면 그 순간 복리가 된다.
  // ⚠️ 단위 글줄에 **기준값이 무엇인지**를 적는다 — 「%」만 적으면 무엇의
  //   퍼센트인지가 안 남고, 합 계산은 **기준값이 있어야만** 뜻이 선다.
  {sym:"mining",   nm:"채굴속도",     unit:"기본 속도의 %", game:true,
   base:"채굴 무기의 기본 속도 — 빔 0.2s · 포 0.6s · 탄 1.05s 주기",
   pct:{common:[3], rare:[5], unique:[7, 10]}},
  {sym:"absorb",   nm:"흡수반경",     unit:"기본 반경의 %", game:true,
   base:"kAbsorbRadiusBase 48",
   pct:{rare:[10], unique:[20]}},
  // ⚠️ **지속 스탯이 아니다 — 먹는 순간 한 번 찬다.** 스탯 칸을 안 먹으므로
  //   상한(`kStatPicksMax`)에도 안 걸린다. 폐기된 `heal` 카드가 하던 일이다.
  {sym:"healcur",  nm:"현재체력회복", unit:"최대 체력의 % · 1회성", game:true,
   once:true, base:"kPlayerHpMax 100 · 지속 스탯이 아니라 즉시 적용",
   pct:{common:[30], rare:[50], unique:[100]}},
  // ⚠️ **%가 아니라 고정값이다**(사용자 원문의 「+30」·「+100」). 그래서 퍼센트
  //   칸이 통째로 비고 고정 칸만 선다 — 표에서 이 줄만 좌우가 뒤집혀 보인다.
  // ⚠️ 「추후 변경 가능」(사용자) ⇒ 값은 **이 두 칸이 전부**다. 바꿀 때 고칠
  //   자리가 여기 한 줄이고, 카드도 표도 이것을 되읽는다.
  {sym:"regen",    nm:"초당회복력",   unit:"고정값 · HP/초", game:true,
   base:"Stats.regenPerSec 에 더한다 — 그 필드가 이미 덧셈이다",
   pct:null, flat:{rare:[30], unique:[100]}},
];
/// 축을 `sym` 으로 집는다. 표도 카드도 이 하나를 탄다.
const LCax = (sym) => LCAXIS.find((a) => a.sym === sym);
/// 한 축 · 한 등급의 단계. **없으면 `null`** — 「그 꼴이 없다」와 「아직 안
/// 정했다」를 같은 값으로 낸다. 부르는 쪽이 그 자리를 비워 두게 하려는 것이다.
const LCsteps = (sym, rank, form) => {
  const a = LCax(sym);
  const t = a && a[form || "pct"];
  return (t && t[rank]) || null;
};

/// 단계 하나를 카드에 뜨는 글자로. `i` 를 안 주면 **마지막 칸**(제일 센 것)이다.
/// ⚠️ 그 축에 그 꼴이 없으면 `null` 이다 — 「+0」 이 아니라 **없는 것**이다.
const LCval = (sym, rank, form, i) => {
  const v = LCsteps(sym, rank, form);
  if (!v) return null;
  const n = v[i == null ? v.length - 1 : i];
  return "+" + n + (form === "flat" ? "" : (LCax(sym).unit.indexOf("%p") === 0 ? "%p" : "%"));
};
/// 한 축 · 한 등급의 단계를 줄글로. 없으면 `—`.
const LCstepText = (sym, rank, form) => {
  const v = LCsteps(sym, rank, form);
  return v ? v.join(" · ") : "—";
};
/// 그 축이 그 꼴을 갖는가. **고정은 세 축만 있다.**
const LChasForm = (sym, form) => !!(LCax(sym) || {})[form];
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

// ── 문양 — 스탯 열둘(싸움 여덟 + 게임 관련 넷) · 스킬 · 성좌 ─────────────
//
// ⚠️ **어휘를 새로 안 지었다.** `lib/ui/icons_card.dart` 의 `drawMiscIcon` 이
//   이미 정본이다(주문력 = 4갈래 별 · 이속 = 겹화살 · 치명 = 빗겨 선 별 ·
//   방어 = 멈춘 획 셋 · 체력 = 이어 붙는 막대). 그것을 캔버스로 옮겼다.
// ⚠️⚠️ **`atk`·`aspd` 는 그 파일에 case 가 없다** — 「일반공격력」과
//   「공격속도」는 카드가 없으니 문양도 없다. 여기 있는 둘은 **이 장이 새로
//   짓는 것**이고, 이식할 때 `icons_card.dart` 에 같이 나야 한다.
// ⚠️⚠️ **게임 관련 넷도 마찬가지다**(2026-08-28). 그중 셋(`mining`·`absorb`·
//   `regen`)은 그 파일에 case 가 없어 **여기서 새로 지었고**, 이식할 때
//   `icons_card.dart` 에 같이 나야 한다(위 둘과 같은 선례).
//   ⭐ **`healcur` 은 안 지었다** — 그 파일의 `heal_s`·`heal_m`·`heal_l` 십자가
//     이미 정본이고, 그것을 캔버스로 옮겼을 뿐이다. 크기 셋이 등급 셋(일반 ·
//     레어 · 유니크)에 그대로 얹힌다.
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
  // ── ⭐⭐ 게임 관련 넷 (2026-08-28) ────────────────────────────────────────
  //
  // ⚠️⚠️ **넷이 기존 여덟과 겹치면 안 된다.** 이 파일이 이미 한 번 물린 자리라
  //   (별꼴 셋을 실루엣으로 갈랐다) 넷의 갈리는 축을 먼저 못 박는다:
  //     `mining`  **면** — 유일하게 덩어리(다각형)를 칠한다 + 그 안에 금
  //     `absorb`  **고리** — 유일하게 테두리 고리를 두른다 + 쐐기가 **안쪽**을 본다
  //     `healcur` **십자** — 정본(`icons_card.dart` 의 `heal_*`)에서 옮긴 그것
  //     `regen`   **십자 셋 + 축** — 같은 십자가 시간 축 위에 **되풀이된다**
  //   ⭐ 회복 둘은 **일부러 한 가족**이다 — 갈리는 것은 개수와 축이다(한 번 대
  //     되풀이). `heal_s/m/l` 이 「같은 십자, 굵기만 다르다」로 이미 쓰던 문법이다.
  // ⚠️ `atk`(모여서 한 점을 친다)와 `absorb`(사방에서 가운데로)가 제일 가깝다.
  //   갈리는 축은 둘이다 — **한 방향 대 사방 대칭** · **고리가 있나 없나**.

  // ⭐신설 — 채굴속도. 「덩어리가 **쪼개져 벌어진다**」. 조각이 튄다.
  // ⚠️ **곡괭이를 안 그렸다** — 이 게임에 곡괭이가 없다. 채굴 무기는 빔 · 포 ·
  //   탄 셋뿐이고(`sim/combat/mining_weapon.dart`) 그 셋의 슬롯 문양은 따로
  //   있다(`ui/loadout_slots.dart` 의 `MiningGlyph`). 없는 물건을 그리면 문양이
  //   게임에 대해 거짓말을 한다 — 그래서 **연장이 아니라 결과**를 그린다.
  // ⚠️ 덩어리를 **정육각으로 안 깎는다** — 정육각 겹침은 빙(`ice`)의 어휘다.
  // ⚠️⚠️ **금을 밝은 획으로 안 긋는다**(첫 판을 그렇게 그렸다가 되돌렸다) —
  //   덩어리를 관통하는 밝은 지그재그는 그 자리에서 **뇌광**으로 읽힌다
  //   (`icons_card.dart` 의 `bolt` = `drawWeaponIcon('arc')`). 그래서 금은
  //   **틈**이다 — 조각을 밀어내 벌린 자리가 곧 금이고, 획이 한 획도 없다.
  mining: (c, x, y, s, b, l) => {
    // 쪼갠 자리 — 위 모서리 `P` 와 아래 모서리 `Q` 를 잇는 선이 덩어리를 가른다.
    const face = (pts, dx, dy, col) => {
      c.beginPath();
      pts.forEach((p, i) => i
        ? c.lineTo(x + (p[0] + dx) * s, y + (p[1] + dy) * s)
        : c.moveTo(x + (p[0] + dx) * s, y + (p[1] + dy) * s));
      c.closePath(); c.fillStyle = col; c.fill();
    };
    const P = [0.01, -0.325], Q = [-0.052, 0.30];
    face([[-0.34, -0.04], [-0.16, -0.34], P, Q, [-0.25, 0.25]], 0, 0, b);
    face([P, [0.18, -0.31], [0.34, 0.05], [0.11, 0.34], Q], 0.055, -0.03, l);
    LCdia(c, x + s * 0.46, y - s * 0.26, s * 0.055, l);   // 튀는 조각 둘
    LCdia(c, x + s * 0.28, y - s * 0.47, s * 0.040, l);
  },

  // ⭐신설 — 흡수반경. 「**사방에서 가운데로** 끌려온다」 + 그 반경이 고리로 선다.
  // ⚠️ 쐐기가 **안쪽을 본다** — 밖을 보게 하면 그 자리에서 치명타 별이 된다
  //   (`critdmg` 는 45°로 밖을 향한 쐐기 넷이다). 여기는 0/90/180/270 이고
  //   방향이 반대다 — 각도와 방향 둘 다 갈라 놓았다.
  absorb: (c, x, y, s, b, l) => {
    for (let k = 0; k < 4; k++) {             // ① 반경 — 파선 고리 넷 토막
      const a0 = k * Math.PI / 2 + 0.34;
      c.beginPath(); c.arc(x, y, s * 0.40, a0, a0 + Math.PI / 2 - 0.68);
      c.lineWidth = s * 0.045; c.lineCap = "round"; c.strokeStyle = b; c.stroke();
    }
    for (let k = 0; k < 4; k++) {             // ② 끌려오는 것 넷 — 안쪽을 본다
      const a = k * Math.PI / 2;
      LCtri(c, x + Math.cos(a) * s * 0.30, y + Math.sin(a) * s * 0.30,
        a + Math.PI, s * 0.17, s * 0.075, b);
    }
    LCdot(c, x, y, s * 0.09, l);              // ③ 모이는 자리
  },

  // ⭐ **새로 안 지었다** — `icons_card.dart` 의 `heal_l` 을 그대로 옮겼다
  //   (십자 두 겹: 어두운 굵은 획 + 그 위 밝은 가는 획). 값도 그 파일 그대로다.
  // ⚠️ 그 파일은 크기 셋(`heal_s` .64 · `heal_m` .82 · `heal_l` 1.0)을 갖는데
  //   여기 문양은 등급을 안 받는다(`sym(c, x, y, S*eS, b, l)`) — 카드가 크기를
  //   이미 정하기 때문이다. **이식할 때는 등급 셋에 그 크기 셋을 물리면 된다**
  //   (일반 = `heal_s` · 레어 = `heal_m` · 유니크 = `heal_l`).
  healcur: (c, x, y, s, b, l) => {
    LCbar(c, x, y, s * 0.20, s * 0.58, b, s * 0.05);
    LCbar(c, x, y, s * 0.58, s * 0.20, b, s * 0.05);
    LCbar(c, x, y, s * 0.11, s * 0.48, l, s * 0.03);
    LCbar(c, x, y, s * 0.48, s * 0.11, l, s * 0.03);
  },

  // ⭐신설 — 초당회복력. 「같은 십자가 **시간 축 위에서 되풀이된다**」.
  // ⚠️ 위 `healcur` 과 **일부러 한 가족**이다 — 갈리는 것은 **개수와 축**이다:
  //   저쪽은 큰 십자 하나(한 번 찬다), 이쪽은 작은 십자 셋이 눈금을 밟으며
  //   커진다(매 초 찬다). 다른 문양을 지어 갈랐으면 두 카드가 남남이 된다.
  regen: (c, x, y, s, b, l) => {
    const y0 = y + s * 0.24;                  // ① 시간 축 — 「매 초」의 실체
    c.beginPath(); c.moveTo(x - s * 0.42, y0); c.lineTo(x + s * 0.42, y0);
    c.lineWidth = s * 0.030; c.lineCap = "round"; c.strokeStyle = b; c.stroke();
    for (let i = 0; i < 3; i++) {
      const px = x + (i - 1) * s * 0.30, k = 0.60 + i * 0.20;
      c.beginPath(); c.moveTo(px, y0); c.lineTo(px, y0 + s * 0.07);
      c.lineWidth = s * 0.030; c.strokeStyle = b; c.stroke();   // ② 눈금 셋
      const col = i === 2 ? l : b;                               // ③ 십자 셋
      LCbar(c, px, y - s * 0.10, s * 0.085 * k, s * 0.26 * k, col, s * 0.03 * k);
      LCbar(c, px, y - s * 0.10, s * 0.26 * k, s * 0.085 * k, col, s * 0.03 * k);
    }
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
//     레어      **각인 판**    음각 판 위에 앉는다           ← [LCPLQ] 안 넷
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

// ── ⭐ 각인 판 — 안 넷 ────────────────────────────────────────────────────
//
// 바꾸는 것은 **문양을 감싼 테**뿐이다 — 가운데 문양([LCSYM])은 안 건드린다.
// ⚠️ 넷이 다 지키는 것:
//   · **면이 있다.** 배경이 전부 선이라 「판」은 면일 때만 한 겹으로 읽힌다
//   · **불투명하지 않다.** 뒤 도해가 비쳐야 레어가 일반보다 안 비어 보인다
//   · **유니크의 어휘를 안 쓴다** — 겹쳐 도는 고리 · 관 · 다면체 원석
//   · **등장은 알파가 아니라 크기다**(`rev` 가 반지름을 0 에서 벌린다)
//   · 색은 등급이 준 것(`g` · `ink`)만 쓴다 — 레어는 청↔민트다
// ⚠️ 고른 것은 [LCPLQPICK] 하나가 정하고, **고르지 않은 셋도 남긴다** —
//   사용자가 [lcplq] 격자에서 눈으로 보고 갈아탈 수 있어야 한다.

/// 판의 음각 테 두 획 — 어두운 홈 + 그 안쪽 밝은 모서리. 네 안이 같이 쓴다.
/// `path(m)` 은 배율 `m` 으로 같은 꼴을 다시 그리는 함수다.
function LCplqCarve(c, path, ink, a) {
  path(1); c.strokeStyle = A("#000000", 0.55 * a); c.lineWidth = 2.2; c.stroke();
  path(0.985); c.strokeStyle = ink(0.72); c.lineWidth = 1.4; c.stroke();
}
/// 판의 면 — 가운데가 짙고 가장자리로 풀린다. 「면이 있다」가 이 겹의 전부다.
function LCplqFace(c, path, cx, cy, r, g, a, k) {
  const kk = k == null ? 1 : k;
  const gd = c.createRadialGradient(cx, cy, 0, cx, cy, r);
  gd.addColorStop(0, A(g[0], 0.92 * a * kk));
  gd.addColorStop(0.72, A(g[0], 0.70 * a * kk));
  gd.addColorStop(1, A(g[0], 0.30 * a * kk));
  path(1); c.fillStyle = gd; c.fill();
}

/// 안 A — **비문 석판.** 네 귀를 짧게 접은 네모 면에 위·아래로 뇌문 띠가 지나고
/// 좌우에 눈금 기둥이 선다. 고리가 아니라 **가로로 읽는 판**이라 둥근 것이
/// 하나도 안 남는다 — 카드 테의 어휘(뇌문 · 눈금 · 못)를 문양 자리로 한 겹 들인 것.
/// ⚠️ 뇌문은 **위·아래 둘뿐**이다. 사방으로 두르면 카드 테의 「유니크부터 사방」과
///   같은 신호가 되어 등급 사다리가 흐려진다.
function LCplqA(c, cx, cy, R, g, ink, a, rev) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const s = R * r * 0.92, ch = s * 0.22;
  const face = (m) => {
    const q = s * m, k = ch * m;
    c.beginPath();
    c.moveTo(cx - q + k, cy - q); c.lineTo(cx + q - k, cy - q);
    c.lineTo(cx + q, cy - q + k); c.lineTo(cx + q, cy + q - k);
    c.lineTo(cx + q - k, cy + q); c.lineTo(cx - q + k, cy + q);
    c.lineTo(cx - q, cy + q - k); c.lineTo(cx - q, cy - q + k);
    c.closePath();
  };
  LCplqFace(c, face, cx, cy, s * 1.24, g, a);
  LCplqCarve(c, face, ink, a);
  // 위·아래 뇌문 띠 — 「글이 새겨진 자리」. 아래는 방향을 뒤집어 마주 본다.
  const bw = s * 0.185, bl = (s - ch) * 1.86;
  LCmeander(c, cx - bl / 2, cy - s * 0.94, 1, 0, bl, bw, ink(0.44), 1, 1);
  LCmeander(c, cx + bl / 2, cy + s * 0.94, -1, 0, bl, bw, ink(0.44), 1, 1);
  // 좌우 눈금 기둥 — 「재어서 새긴 판」. 안쪽을 향해 짧게 문다.
  c.strokeStyle = A(g[1], 0.30 * a); c.lineWidth = 1; c.lineCap = "butt";
  c.beginPath();
  for (let i = 0; i < 7; i++) {
    const ty = cy + (i / 6 - 0.5) * s * 1.06, L = s * (i % 3 === 0 ? 0.17 : 0.10);
    for (const sg of [-1, 1]) {
      c.moveTo(cx + sg * s * 0.93, ty); c.lineTo(cx + sg * (s * 0.93 - L), ty);
    }
  }
  c.stroke();
  // 접은 귀 넷의 못 — 여덟이 아니라 **넷**이라 지금 판보다 조용하다
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]])
    LCdot(c, cx + sx * (s - ch * 0.5), cy + sy * (s - ch * 0.5), 1.6, A(g[2], 0.62 * a));
}

/// 안 B — **눈금 마름모.** 45° 로 선 마름모 면 안에 이 게임의 각진 셀 격자가
/// 깔리고, 네 변마다 눈금이 밖으로 물리고, 꼭짓점 넷에 못이 박힌다.
/// ⚠️ 실루엣이 **마름모**라 지금 판(팔각 고리)과 제일 멀고, 변이 45° 라
///   문양의 갈래(0°·90°)와 획이 안 겹친다.
function LCplqB(c, cx, cy, R, g, ink, a, rev) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = R * r;
  const V = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  const dia = (m) => {
    c.beginPath();
    V.forEach((v, k) => {
      const px = cx + v[0] * RR * m, py = cy + v[1] * RR * m;
      k ? c.lineTo(px, py) : c.moveTo(px, py);
    });
    c.closePath();
  };
  LCplqFace(c, dia, cx, cy, RR, g, a);
  // ② 안쪽 격자 — 「각진 셀」이 판 안에만 든다
  c.save(); dia(0.94); c.clip();
  LClattice(c, cx - RR, cy - RR, RR * 2, RR * 2, RR * 0.24, A(g[1], 0.16 * a), 1);
  c.restore();
  LCplqCarve(c, dia, ink, a);
  dia(0.82); c.strokeStyle = A(g[1], 0.22 * a); c.lineWidth = 1; c.stroke();
  // ③ 네 변의 눈금 — 밖을 향해 짧게. 변마다 다섯이고 가운데 것만 길다.
  c.strokeStyle = A(g[1], 0.34 * a); c.lineWidth = 1; c.lineCap = "butt";
  c.beginPath();
  for (let k = 0; k < 4; k++) {
    const p0 = V[k], p1 = V[(k + 1) % 4];
    const nx = (p0[0] + p1[0]) / Math.SQRT2, ny = (p0[1] + p1[1]) / Math.SQRT2;
    for (let i = 0; i < 5; i++) {
      const u = 0.2 + i * 0.15;
      const bx = cx + (p0[0] + (p1[0] - p0[0]) * u) * RR;
      const by = cy + (p0[1] + (p1[1] - p0[1]) * u) * RR;
      const L = RR * (i === 2 ? 0.15 : 0.08);
      c.moveTo(bx, by); c.lineTo(bx + nx * L, by + ny * L);
    }
  }
  c.stroke();
  // ④ 꼭짓점 넷의 못
  V.forEach((v) => LCdot(c, cx + v[0] * RR * 0.97, cy + v[1] * RR * 0.97, 1.7,
    A(g[2], 0.62 * a)));
}

/// 안 C — **어긋난 두 네모 인장.** 네모 하나와 45° 돌아간 네모 하나가 겹쳐
/// 놓이고, **겹친 자리만 짙다**. 「도장을 눌러 찍은 자리」로 읽힌다.
/// ⚠️ 면을 둘 다 옅게 칠해 겹치는 데서만 짙어지게 한다 — 한 겹으로 칠하고
///   테만 둘 그으면 두 네모가 「선 뭉치」로 보인다.
function LCplqC(c, cx, cy, R, g, ink, a, rev) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  // ⚠️ 네모의 반쪽 변은 **마름모 반지름의 0.76** 이다 — 그래야 네모의 꼭짓점이
  //   마름모의 변을 뚫고 나와 여덟 갈래가 **고르게** 선다. 더 작으면 「마름모 안에
  //   네모가 하나 들어 있다」로 보이고 겹침이 사건이 되지 않는다.
  const RR = R * r, q = RR * 0.76;
  const sq = (m) => { c.beginPath(); c.rect(cx - q * m, cy - q * m, q * 2 * m, q * 2 * m); };
  const dia = (m) => {
    c.beginPath();
    c.moveTo(cx, cy - RR * m); c.lineTo(cx + RR * m, cy);
    c.lineTo(cx, cy + RR * m); c.lineTo(cx - RR * m, cy);
    c.closePath();
  };
  LCplqFace(c, sq, cx, cy, q * 1.34, g, a, 0.60);
  LCplqFace(c, dia, cx, cy, RR * 1.02, g, a, 0.60);
  LCplqCarve(c, sq, ink, a);
  LCplqCarve(c, dia, ink, a);
  // 겹친 자리의 안쪽 테 — 팔각 한 겹이 「눌린 자국」을 맺는다.
  // ⚠️ 두 꼴의 **안쪽 경계**를 따라간다(네모는 변, 마름모는 변) — 그래야
  //   겹친 면의 테두리가 되고, 따로 그은 여덟 각짜리 도형으로 안 보인다.
  c.beginPath();
  for (let k = 0; k < 8; k++) {
    const an = -Math.PI / 2 + k * TAU / 8;
    const m = (k % 2 ? q * Math.SQRT2 : RR) * 0.78;
    const px = cx + Math.cos(an) * m, py = cy + Math.sin(an) * m;
    k ? c.lineTo(px, py) : c.moveTo(px, py);
  }
  c.closePath();
  c.strokeStyle = A(g[1], 0.30 * a); c.lineWidth = 1; c.stroke();
  // 마름모 쪽 꼭짓점 넷의 못 — 네모 쪽 넷은 획이 맺어 비워 둔다
  for (const [sx, sy] of [[0, -1], [1, 0], [0, 1], [-1, 0]])
    LCdot(c, cx + sx * RR * 0.94, cy + sy * RR * 0.94, 1.6, A(g[2], 0.60 * a));
}

/// 각인 판 안 넷. `now` 가 지금 카드에 서 있는 팔각 고리다.
const LCPLQ = {now: LCplaque, A: LCplqA, B: LCplqB, C: LCplqC};
/// ⚠️ **한 글자만 고치면 레어 전체가 갈아탄다.** 판정이 나면 이 값만 바꾼다.
const LCPLQPICK = "B";

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

// ── ⭐⭐ 유니크 급 스탯 문양 — **싸움의 여덟**(아래 넷은 이 구획 끝) ────────
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

  // ── ⭐⭐ 게임 관련 넷의 유니크 (2026-08-28) ───────────────────────────────
  //
  // ⚠️⚠️ **비워 두면 넷이 한 얼굴이 된다.** 표에 없는 스탯은 [LCUNIPICK](="A",
  //   혼천의)으로 떨어지므로, 넷을 안 적으면 방어력까지 **다섯 장이 같은 안**을
  //   쓴다 — 유니크에서 「어느 카드인가」를 문양이 못 말하게 된다.
  //   ⇒ 안 셋(A 혼천의 · B 반관 · C 팔면체 원석)에 **나눠 앉힌다.** `spell`·
  //     `crit`·`defense` 가 이미 쓰는 그 idiom 그대로이고(같은 비율 · 같은 인자),
  //     속 문양만 제 것으로 갈린다.
  // ⭐ 배정은 **뜻이 닿는 쪽**으로 골랐다 — 채굴은 **원석**(안 C), 흡수는
  //   **도는 궤도**(안 A), 회복 둘은 **두르는 띠**(안 B)다.
  // ⭐ 회복 둘을 **일부러 같은 안에 앉혔다** — 문양이 이미 한 가족이고(십자 하나
  //   대 십자 셋), 안까지 같으면 유니크에서도 「형제 카드」로 읽힌다. 그리고 안 B는
  //   속 문양이 **관 한가운데 위쪽**에 서서 셋 중 제일 잘 보인다(실측) — 갈리는
  //   것이 속 문양뿐인 짝은 그 자리에 두는 것이 맞다.
  // ⚠️ **[LCLSYM] 에는 안 넣는다** — 넷은 레전더리를 안 만드는 카드라
  //   ([LCAXIS] 의 ⚠️⚠️) 그 표에 이름이 없어야 맞다. 「유니크만 있고 레전더리가
  //   없다」가 여기서는 **어긋남이 아니라 사양**이다.
  mining: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniC(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.mining, S),
  absorb: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniA(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.absorb, S),
  healcur: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniB(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.healcur, S),
  regen: (c, x, y, S, g, ink, t, a, rev) =>
    LCuniB(c, x, y, S * 0.38 * 0.54 / 0.42, g, ink, t, a, rev, LCSYM.regen, S),
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

// ── ⭐⭐ 레전더리의 스탯 문장 셋 ──────────────────────────────────────────
//
// 사용자 원문: 「**방어력부터 하나** 만들어줘. **'방어력' 로고에 꽂히지 말고
// '멋'에 꽂혀주삼**」 ⇒ 셋을 지었고, 그 다음 판정이 「**셋 다 쓰자**」였다.
//
// ⚠️⚠️ **뜻이 아니라 멋으로 배정했다.** 셋은 「방어를 어떻게 그리나」가 아니라
//   「압도의 종류가 무엇인가」로 갈린 것이라(빛 · 짜임 · 무게) 어느 스탯에 앉혀도
//   뜻이 어긋나지 않는다. 배정이 지켜야 하는 것은 **셋이 서로 갈리는가 · 왕관과
//   싸우지 않는가 · 유니크보다 위로 읽히는가** 셋뿐이다([LCLSYM] 참조).
//
// ⇒ **방패 · 갑옷 · 자물쇠를 안 그렸다.** 무엇을 올려 주는 카드인지는 카드의
//   글자가 이미 말한다 — 이 등급이 파는 것은 뜻이 아니라 **압도**다.
// ⚠️⚠️ **유니크의 어휘를 안 쓴다.** 겹쳐 도는 궤도 고리 · 반관 · 팔면체 원석은
//   전부 유니크의 물건이고, 그것을 크게 그리면 「유니크를 확대한 것」이 된다.
//   셋 다 유니크가 **안 가진 것**으로 지었다 — 유니크는 선뿐이라 **면 · 못 ·
//   계단 · 짜임**이 없다. 이 넷이 급의 실체다.
// ⚠️ **왕관을 한 획도 안 고쳤다.** 문장은 육각 보석이 **맞물린 뒤에** 그 자리에서
//   자란다 — 보석이 문장의 **받침**이 되고 왕관은 그것을 **감싼 테**로 남는다.
// ⚠️ 도는 것은 배경 [LCzodiac] 과 **같은 시계**([LCROT])를 읽는다. 속도가 다르면
//   황도 고리와 문장이 두 물건으로 갈라진다.
// ⚠️ 등장은 이 파일의 규약대로 **알파가 아니라 형태**다 — 마디마다 길이 · 자리 ·
//   각도가 변하고, 알파는 그 마디가 시작할 때 이미 차 있다.
// ⚠️ 어느 문장이 어느 스탯인지는 [LCLSYM] 한 표가 정한다 — 고르개가 없다.
//   [lcldef] 격자는 그래서 「셋 중 무엇을 고르나」가 아니라 **「제 스탯의 유니크
//   위에 서는가」**를 보는 자리가 됐다(칸마다 유니크와 레전더리가 한 짝이다).

/// 문장 셋이 같이 쓰는 **둘레** — 방사 살 · 눈금 고리 · 파선 고리.
/// 「재는 물건」의 결이 배경 황도 고리와 같아야 문장이 카드에 속한 것으로 읽힌다.
/// ⚠️ 안팎이 **반대로** 돈다 — 한 방향으로만 돌면 둘레가 통째로 미끄러져 보인다.
function LCldRim(c, x, y, R, g, t, a, k) {
  if (k <= 0.005) return;
  const rot = TAU * t / LCROT;
  LCrays(c, x, y, R * 0.74, R * 1.02, 24, A(g[1], 0.30 * a), rot, k);
  LCdashring(c, x, y, R * 0.88 * k, A(g[1], 0.22 * a), 1, [2.2, 4.4], rot);
  LCticks(c, x, y, R * 0.70 * k, 36, R * 0.05 * k, A(g[1], 0.34 * a), 1, -rot, 3);
}

/// 문장 셋이 같이 쓰는 **흰 심** — 이 등급에서만 서는 색 넷째 단계.
/// ⚠️ 두 박자는 주기당 한 번이고 순수 주기 함수라 이음매가 없다. **자리는 안
///   움직인다** — 가운데가 흔들리면 문장이 떠 있는 물건으로 읽힌다.
function LCldCore(c, x, y, R, g, t, a, k) {
  if (k <= 0.01) return;
  const bt = 1 + 0.10 * LCbump((t % LCT) / LCT, 3);
  LCspark(c, x, y, R * 0.62 * k * bt, A(g[2], 0.40 * a));
  LCdia(c, x, y, R * 0.34 * k * bt, A(g[2], 0.95 * a));
  LCdot(c, x, y, R * 0.11 * k, A(g[0], 0.85 * a));
}

/// 안 A — **광배(光背).** 뒤에서 빛이 터지고 그 앞에 팔각 각인 판과 오목한
/// 4각별 두 겹이 선다. 압도의 종류가 **빛**이다.
/// ⚠️ 4각별을 45° 로 한 겹 더 얹어 **여덟 갈래**로 만든다 — 갈래가 넷이면 일반 ·
///   레어의 문양과 같은 실루엣이라 등급이 안 올라간다.
function LCldefA(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kRay = st(0.00, 0.44), kTeeth = st(0.14, 0.62), kPlate = st(0.34, 0.78),
        kStar = st(0.58, 0.94), kCore = st(0.80, 1.00);
  const rot = TAU * t / LCROT, al = 0.95 * a;
  LCldRim(c, x, y, R, g, t, a, kRay);
  // ② 톱니 고리 — 각진 셀 열둘이 밖을 문다. 안쪽 셋씩 차례로 선다.
  for (let k = 0; k < 12; k++) {
    const kf = LCes(LCcl(kTeeth * 2.2 - (k % 3) * 0.20));
    if (kf <= 0.005) continue;
    const an = rot + k * TAU / 12;
    LCtri(c, x + Math.cos(an) * R * 0.50, y + Math.sin(an) * R * 0.50, an,
      R * 0.24 * kf, R * 0.085 * kf, A(k % 2 ? g[0] : g[1], al));
  }
  // ③ 팔각 각인 판 — **면이 선다.** 유니크가 못 가진 겹이 이것이다.
  if (kPlate > 0.01) {
    const RR = R * 0.52 * kPlate;
    const oct = (m) => {
      c.beginPath();
      for (let k = 0; k < 8; k++) {
        const an = -Math.PI / 2 + k * TAU / 8;
        const px = x + Math.cos(an) * RR * m, py = y + Math.sin(an) * RR * m;
        k ? c.lineTo(px, py) : c.moveTo(px, py);
      }
      c.closePath();
    };
    LCplqFace(c, oct, x, y, RR, g, a);
    c.save(); oct(0.94); c.clip();
    LClattice(c, x - RR, y - RR, RR * 2, RR * 2, RR * 0.30, A(g[1], 0.20 * a), 1);
    c.restore();
    LCplqCarve(c, oct, ink, a);
    for (let k = 0; k < 8; k++) {                 // 여덟 모서리의 못
      const an = -Math.PI / 2 + k * TAU / 8;
      LCdot(c, x + Math.cos(an) * RR * 0.95, y + Math.sin(an) * RR * 0.95,
        k % 2 ? 1.1 : 1.7, A(g[2], 0.66 * a));
    }
  }
  // ④ 오목한 4각별 두 겹 — 0° 와 45°. 겹쳐서 여덟 갈래가 된다.
  if (kStar > 0.01) {
    LCstar4(c, x, y, R * 0.30 * kStar, 0.30, Math.PI / 4);
    c.fillStyle = A(g[0], al); c.fill();
    c.strokeStyle = A(g[2], 0.34 * a); c.lineWidth = 1; c.stroke();
    LCstar4(c, x, y, R * 0.46 * kStar, 0.24, 0);
    c.fillStyle = A(g[1], al); c.fill();
    c.strokeStyle = A(g[2], 0.55 * a); c.lineWidth = 1; c.stroke();
  }
  LCldCore(c, x, y, R * 0.34, g, t, a, kCore);
}

/// 안 B — **성망 인장(星芒印).** 삼각 둘이 **엇갈려 짜이고** 겹친 자리만 짙다.
/// 꼭짓점 여섯이 왕관의 육각 보석 꼭짓점과 같은 각이라 **보석이 별로 자란** 것처럼
/// 이어진다. 압도의 종류가 **짜임**이다.
/// ⚠️ 면을 둘 다 옅게 칠해 겹치는 데서만 짙어지게 한다 — 한 겹으로 칠하면 두
///   삼각이 「선 뭉치」로 보이고 짜였다는 것이 안 읽힌다.
function LCldefB(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kRim = st(0.00, 0.34), kTri = st(0.10, 0.62), kHex = st(0.44, 0.80),
        kPin = st(0.68, 0.92), kCore = st(0.82, 1.00);
  const al = 0.95 * a;
  const V = (k, m) => {
    const an = -Math.PI / 2 + k * TAU / 6;
    return [x + Math.cos(an) * R * m, y + Math.sin(an) * R * m];
  };
  LCldRim(c, x, y, R, g, t, a, kRim);
  // ① 삼각 둘 — 위 삼각이 먼저 서고 아래 삼각이 그 위로 문다
  const tri = (o) => (m) => {
    c.beginPath();
    for (let k = 0; k < 3; k++) {
      const p = V(o + k * 2, m * 0.90 * kTri);
      k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]);
    }
    c.closePath();
  };
  if (kTri > 0.01) {
    const up = tri(0), dn = tri(1);
    LCplqFace(c, up, x, y, R * 0.90 * kTri, g, a, 0.58);
    LCplqFace(c, dn, x, y, R * 0.90 * kTri, g, a, 0.58);
    // ⚠️⚠️ 변은 **면이 아니라 띠**다. 삼각을 면으로만 칠하면 어두운 칸(`g[0]`)
    //   위에서 통째로 묻혀 「가는 선 별」로 보인다 — 굵은 획에 흰 심을 넣어야
    //   금속 띠가 되고, 그래야 짜였다는 것이 읽힌다.
    const limb = (o) => {
      const path = () => {
        c.beginPath();
        for (let k = 0; k < 3; k++) {
          const p = V(o + k * 2, 0.90 * kTri);
          k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]);
        }
        c.closePath();
      };
      c.lineJoin = "miter"; c.lineCap = "butt";
      path(); c.strokeStyle = A("#000000", 0.55 * a); c.lineWidth = R * 0.155; c.stroke();
      path(); c.strokeStyle = A(g[1], al); c.lineWidth = R * 0.120; c.stroke();
      path(); c.strokeStyle = ink(0.85); c.lineWidth = R * 0.062; c.stroke();
      path(); c.strokeStyle = A(g[2], 0.50 * a); c.lineWidth = 1; c.stroke();
    };
    limb(1); limb(0);
    // ⭐ **짜임** — 엇갈리는 여섯 자리 중 **하나 걸러** 위 삼각을 다시 긋는다.
    //   자리마다 위아래가 바뀌어야 「겹쳐 놓았다」가 아니라 「엮였다」가 된다.
    for (const k of [0, 2, 4]) {
      const an = -Math.PI / 3 + k * TAU / 6, q = R * 0.90 * kTri * 0.577;
      c.save();
      c.beginPath();
      c.arc(x + Math.cos(an) * q, y + Math.sin(an) * q, R * 0.17, 0, TAU);
      c.clip();
      limb(0);
      c.restore();
    }
  }
  // ② 안쪽 육각 — 겹친 자리를 한 겹 더 눌러 「눌러 찍은 자국」을 맺는다
  if (kHex > 0.01) {
    const hr = R * 0.45 * kHex;
    const hex = (m) => {
      c.beginPath();
      for (let k = 0; k < 6; k++) {
        const an = -Math.PI / 6 + k * TAU / 6;
        const px = x + Math.cos(an) * hr * m, py = y + Math.sin(an) * hr * m;
        k ? c.lineTo(px, py) : c.moveTo(px, py);
      }
      c.closePath();
    };
    LCplqFace(c, hex, x, y, hr, g, a);
    c.save(); hex(0.92); c.clip();
    LClattice(c, x - hr, y - hr, hr * 2, hr * 2, hr * 0.34, A(g[1], 0.20 * a), 1);
    c.restore();
    LCplqCarve(c, hex, ink, a);
  }
  // ③ 꼭짓점 여섯의 못과 그 밖으로 무는 쐐기 — 「박아 둔 인장」
  if (kPin > 0.01) {
    for (let k = 0; k < 6; k++) {
      const an = -Math.PI / 2 + k * TAU / 6;
      const p = V(k, 0.90);
      LCtri(c, p[0], p[1], an, R * 0.14 * kPin, R * 0.045 * kPin, A(g[1], al));
      LCdot(c, p[0], p[1], 1.8 * kPin, A(g[2], 0.72 * a));
      LCspoke(c, x, y, an + TAU / 12, R * 0.50, R * 0.86 * kPin, A(g[1], 0.34 * a), 1);
    }
  }
  LCldCore(c, x, y, R * 0.32, g, t, a, kCore);
}

/// 안 C — **층탑(層塔).** 층이 아래로 갈수록 벌어지며 매달리고, 둘째 층에 뇌문이
/// 새겨지고, 꼭대기에 각진 사발이 얹힌다. 압도의 종류가 **무게**다.
/// ⚠️ 실루엣이 셋 중 유일하게 **세로**라 왕관의 첨탑 축과 한 줄로 선다 — 문장이
///   왕관 「안에」 든 것으로 읽히는 것이 이 안의 값이다.
/// ⚠️ 층마다 **셀로 갈라야** 한다. 막대만 쌓으면 계단이지 「지어진 것」이 아니다.
///
/// ── ⭐⭐ 대좌를 걷어냈다 — 이 안의 유일한 결함이 그것이었다 ────────────────
/// 첫 판은 층마다 **곧은 가로 막대**를 깔았다. 맨 아래 막대가 왕관의 이단 대좌와
/// 나란히 서서 **받침이 둘**로 보였다 — 「받침 위의 받침」.
/// 사용자 판정: 「층탑은 **사무라이 투구**처럼 보이기도 하네」 ⇒ **그쪽으로 밀어**
/// 풀었다. 투구는 받침 위에 서는 물건이 아니라 **얹히는** 물건이다:
///   · 층의 **양끝이 처진다** — 곧은 가로 막대가 한 장도 안 남는다
///   · 아래로 갈수록 **더 처진다** — 아래가 무거운 것이 아니라 **매달린 것**이 된다
///   · 맨 아래 층 밑에 **아무것도 안 깐다** — 처진 끝이 쐐기로 맺히고 끝난다
///   · 무게를 **위로** 옮겼다 — 갓돌 자리에 각진 사발이 앉고 이랑이 진다
/// ⇒ 왕관의 이단 대좌가 문장의 **경쟁자가 아니라 받침대**가 된다.
/// ⚠️ 화풍은 안 건드렸다 — 각진 셀 · 가는 선 · 기하 문양 · 못, 넷 그대로다.
function LCldefC(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kBack = st(0.00, 0.36), kTier = st(0.08, 0.66), kBand = st(0.48, 0.78),
        kBowl = st(0.62, 0.92), kCore = st(0.84, 1.00);
  const al = 0.95 * a, rot = TAU * t / LCROT;
  // 층의 자리 — 위가 좁고 아래로 벌어진다. `TD` 가 **끝이 처지는 깊이**다.
  const TN = 4, TW = 0.46, TS = 0.118, TY = 0.02, TG = 0.176,
        TH = 0.155, TD = 0.045, TDS = 0.042, TSH = 0.56;
  const tw = (i) => R * (TW + i * TS), ty = (i) => y + R * (TY + i * TG),
        td = (i) => R * (TD + i * TDS);
  // ① 등지고 선 빛 — 살이 탑 뒤에서 자란다
  if (kBack > 0.005) {
    LCrays(c, x, y, R * 0.34, R * 1.02, 16, A(g[1], 0.28 * a), rot, kBack);
    LCdashring(c, x, y, R * 0.94 * kBack, A(g[1], 0.20 * a), 1, [2.2, 4.4], -rot);
  }
  // ② 층 넷 — **위 층부터** 서고 아래로 이어 달린다.
  // ⚠️⚠️ 층마다 **윗면이 밝아야** 한다. 어두운 칸(`g[0]`)으로만 쌓으면 층이 한 덩이
  //   그림자로 뭉쳐 「검은 블록」이 된다 — 깎인 윗면이 있어야 층이 층으로 보이고,
  //   그 밝은 띠가 곧 이 안이 파는 **무게**다.
  for (let i = 0; i < TN; i++) {
    const kf = LCes(LCcl(kTier * 2.4 - i * 0.30));
    if (kf <= 0.005) continue;
    const w = tw(i) * kf, d = td(i) * kf, hh = R * TH * 0.5, cy2 = ty(i),
          sh = w * TSH;
    // 처진 판 — 어깨까지 평평하다가 거기서 끝까지 내려앉는다
    const path = (m) => {
      const ww = w * m, ss = sh * m, q = hh * m, dd = d * m;
      c.beginPath();
      c.moveTo(x - ww, cy2 - q + dd); c.lineTo(x - ss, cy2 - q);
      c.lineTo(x + ss, cy2 - q);      c.lineTo(x + ww, cy2 - q + dd);
      c.lineTo(x + ww, cy2 + q + dd); c.lineTo(x + ss, cy2 + q);
      c.lineTo(x - ss, cy2 + q);      c.lineTo(x - ww, cy2 + q + dd);
      c.closePath();
    };
    LCplqFace(c, path, x, cy2, w, g, a);
    // 깎인 윗면 — 판의 위 모서리를 따라 굵은 획 + 그 위 가는 흰 획
    const brim = (off, col, lw) => {
      c.beginPath();
      c.moveTo(x - w, cy2 - hh + d + off); c.lineTo(x - sh, cy2 - hh + off);
      c.lineTo(x + sh, cy2 - hh + off);    c.lineTo(x + w, cy2 - hh + d + off);
      c.strokeStyle = col; c.lineWidth = lw; c.lineJoin = "round"; c.lineCap = "round";
      c.stroke();
    };
    brim(hh * 0.34, A(g[1], 0.88 * a), Math.max(1.4, hh * 0.62));
    brim(hh * 0.06, A(g[2], 0.62 * a), 1);
    // 셀 — 층을 세로로 가른다. 칸 수가 아래로 갈수록 는다.
    c.strokeStyle = A(g[1], 0.52 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    const n = 4 + i;
    for (let k = 1; k < n; k++) {
      const px = x - sh + (sh * 2) * k / n;
      c.moveTo(px, cy2 - hh * 0.30); c.lineTo(px, cy2 + hh * 0.86);
    }
    c.stroke();
    LCplqCarve(c, path, ink, a);
    // 처진 끝 — 쐐기로 맺고 못을 박는다. **여기가 바닥이고 그 아래는 없다.**
    for (const sg of [-1, 1]) {
      LCtri(c, x + sg * w, cy2 + hh * 0.4 + d, Math.PI / 2 + sg * 0.34,
        R * 0.075 * kf, R * 0.030 * kf, A(g[1], al));
      LCdot(c, x + sg * w * 0.97, cy2 - hh * 0.1 + d, 1.6 * kf, A(g[2], 0.72 * a));
    }
  }
  // ③ 둘째 층의 뇌문 띠 — 「글이 새겨진 층」
  if (kBand > 0.01) {
    const w = tw(1) * TSH, bw = R * 0.072;
    LCmeander(c, x - w, ty(1) - bw * 0.5, 1, 0, w * 2, bw, ink(0.62), 1, kBand);
  }
  // ④ 각진 사발 — 갓돌 자리에 **얹히고 솟는다.** 이랑이 꼭대기로 모인다.
  if (kBowl > 0.01) {
    const by = y - R * 0.10, bw = R * 0.58, bh = R * 0.76 * kBowl;
    const P = [[-1.00, 0.00], [-0.93, 0.30], [-0.64, 0.72], [-0.25, 0.97],
               [0.25, 0.97], [0.64, 0.72], [0.93, 0.30], [1.00, 0.00]];
    const bowl = (m) => {
      c.beginPath();
      P.forEach((p, j) => {
        const px = x + p[0] * bw * m, py = by - p[1] * bh * m;
        j ? c.lineTo(px, py) : c.moveTo(px, py);
      });
      c.closePath();
    };
    LCplqFace(c, bowl, x, by - bh * 0.34, bw, g, a);
    c.save(); bowl(0.92); c.clip();
    LClattice(c, x - bw, by - bh, bw * 2, bh, bh * 0.30, A(g[1], 0.20 * a), 1);
    c.restore();
    c.strokeStyle = A(g[1], 0.52 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (const p of P) {                          // 이랑 — 테에서 꼭대기로 모인다
      c.moveTo(x + p[0] * bw * 0.88, by - p[1] * bh * 0.88);
      c.lineTo(x + p[0] * bw * 0.18, by - bh * 0.92);
    }
    c.stroke();
    LCplqCarve(c, bowl, ink, a);
    LCring(c, x, by - bh * 0.97, R * 0.055 * kBowl, A(g[2], 0.70 * a), 1);
    for (const sg of [-1, 1])
      LCdot(c, x + sg * bw * 0.96, by, 1.7 * kBowl, A(g[2], 0.72 * a));
  }
  // ⑤ 흰 심 — 사발 테 한가운데가 안에서 빛난다
  LCldCore(c, x, y - R * 0.10, R * 0.26, g, t, a, kCore);
}

// ── ⭐⭐ 스탯 문장을 여덟으로 — 축을 먼저 정하고 그림을 뽑는다 ──────────────
//
// ⚠️⚠️ **판정은 낱장이 아니라 한 벌이다.** 하나씩 보면 다 그럴듯하고, 여덟을
//   나란히 놓아야 겹치는 것이 드러난다 — [lcldef] 격자가 그 자리다.
// ⇒ 그래서 **그림보다 축을 먼저** 정했다. 그림부터 그리면 반드시 비슷해진다.
//   앞선 셋이 가져간 빛 · 짜임 · 무게에 다섯을 더해, 여덟이 **꼴의 갈래**를
//   하나씩 나눠 갖는다:
//
//     퍼짐  광배   빛     ·  엮임  성망 인장  짜임   ·  쌓임  층탑     무게
//     모임  대검   劍     ·  엇갈림 모래시계 漏     ·  흘러감 기운 창날 斜
//     쪼개짐 갈라진 판 裂  ·  담김  품은 알   藏
//
// ⚠️ **뜻이 아니라 멋으로 배정한다** — 앞선 셋과 같은 규약이다. 「공격속도니까
//   화살표」는 이 등급이 파는 물건이 아니다. 지켜야 하는 것은 **서로 갈리는가 ·
//   왕관과 싸우지 않는가 · 유니크보다 위로 읽히는가** 셋뿐이다.
// ⚠️⚠️ **곧은 가로 막대를 맨 아래에 안 깐다.** 왕관의 이단 대좌와 나란히 서면
//   그 순간 「받침 위의 받침」이 된다([LCldefC] 가 그 자리를 이미 치렀다).
//   다섯 다 아래가 **꼭짓점 · 처진 끝 · 열린 꼴**이다.
// ⚠️ 유니크의 어휘(겹쳐 도는 궤도 · 혼천의 · 반관 · 팔면체 원석)를 한 겹도 안 쓴다.
//   다섯이 무는 자리는 유니크에 없는 **면 · 격자 · 못 · 셀**이고, 그 넷을 아래
//   두 연장이 나른다.

/// 문장이 같이 쓰는 **면 한 장** — 면 + 격자 + 음각 테를 한 번에 얹는다.
/// 유니크가 못 가진 겹이 정확히 이 셋이라 한 함수로 묶어 둔다.
/// `path(m)` 은 배율 `m` 으로 같은 꼴을 다시 그리는 함수이고, `rx`·`ry` 는
/// 격자를 물릴 상자의 반지름이다.
function LCldSlab(c, path, cx, cy, rx, ry, g, ink, a, step) {
  LCplqFace(c, path, cx, cy, Math.max(rx, ry), g, a);
  c.save(); path(0.94); c.clip();
  LClattice(c, cx - rx, cy - ry, rx * 2, ry * 2, step, A(g[1], 0.20 * a), 1);
  c.restore();
  LCplqCarve(c, path, ink, a);
}

/// 문장이 같이 쓰는 **파인 홈 한 줄** — 어두운 골 + 그 곁의 가는 밝은 모서리.
/// 고리를 한 겹도 안 쓰고 뒤를 채우는 획이라, 둘레가 고리인 안 둘([LCldRim])과
/// 뒤가 안 겹친다.
function LCldGroove(c, x0, y0, x1, y1, ink, a, w) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy);
  if (L < 0.5) return;
  const nx = -dy / L * w * 0.44, ny = dx / L * w * 0.44;
  c.lineCap = "butt";
  c.strokeStyle = A("#000000", 0.50 * a); c.lineWidth = w;
  c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  c.strokeStyle = ink(0.58); c.lineWidth = 1;
  c.beginPath(); c.moveTo(x0 + nx, y0 + ny); c.lineTo(x1 + nx, y1 + ny); c.stroke();
}

/// 문장이 같이 쓰는 **다각형 한 꼴** — 점 목록을 `(cx,cy)` 둘레로 `m` 배 키워
/// 다시 그리는 함수를 낸다. [LCldSlab] 이 같은 꼴을 배율만 바꿔 세 번(면 · 격자 ·
/// 음각 테) 그리므로 꼴은 **값이 아니라 함수**라야 하고, 배율의 중심이 꼴의
/// 중심이라야 음각 테가 한쪽으로 밀리지 않는다.
function LCldPoly(c, pts, cx, cy) {
  return (m) => {
    c.beginPath();
    pts.forEach((p, j) => {
      const px = cx + (p[0] - cx) * m, py = cy + (p[1] - cy) * m;
      j ? c.lineTo(px, py) : c.moveTo(px, py);
    });
    c.closePath();
  };
}

/// 문장이 같이 쓰는 **밝은 모서리 한 줄** — 굵은 금속 획 위에 가는 흰 획.
/// 실루엣을 정하는 변만 이걸로 긋는다. 음각 테만 두르면 어두운 칸(`g[0]`) 위에서
/// 통째로 묻혀 작게 줄였을 때 덩이가 사라진다 — **바깥 꼴이 읽히는 자리**가 이 획이다.
function LCldEdge(c, pts, g, a, w) {
  if (pts.length < 2) return;
  const path = () => {
    c.beginPath();
    pts.forEach((p, j) => (j ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
  };
  c.lineJoin = "round"; c.lineCap = "round";
  path(); c.strokeStyle = A("#000000", 0.50 * a); c.lineWidth = w * 1.55; c.stroke();
  path(); c.strokeStyle = A(g[1], 0.92 * a); c.lineWidth = w; c.stroke();
  path(); c.strokeStyle = A(g[2], 0.52 * a); c.lineWidth = 1; c.stroke();
}

/// 안 D — **대검(大劍).** 곧게 선 날 하나를 **날밑이 가로지르고** 그 위로 자루가
/// 솟는다. 압도의 종류가 **모임**이다 — 겹이 전부 한 꼭짓점으로 내려와 맺힌다.
/// ⚠️⚠️ 이 안이 파는 것은 날이 아니라 **십자 실루엣**이다. 세로 획만으로는 작게
///   줄였을 때 층탑과 같은 「세로 덩이」로 뭉친다 — 왕관 깃이 벌어진 틈을 가로로
///   건너는 날밑이 그 자리를 가르고, 그러면 왕관이 뒤로 물러나 테가 된다.
/// ⚠️ 끝이 **꼭짓점**이고 그 아래에 아무것도 안 깐다 — 왕관의 이단 대좌가 받침으로
///   남는다. 유니크의 일반공격력은 모이는 **살**이라 여기 면 · 격자 · 못이 없다.
function LCldefD(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kSlit = st(0.00, 0.30), kBlade = st(0.08, 0.62), kGuard = st(0.40, 0.74),
        kGrip = st(0.62, 0.90), kCore = st(0.84, 1.00);
  const al = 0.95 * a;
  const GY = y - R * 0.50, BW = R * 0.47, GT = R * 0.128;
  // ① 벤 홈 — 가로 하나가 날밑 축을 뒤에서 한 번 더 긋고, 빗금 둘이 **아래로 모인다.**
  if (kSlit > 0.005) {
    const L = R * 1.36 * kSlit;
    LCldGroove(c, x - L, GY, x + L, GY, ink, a, R * 0.054);
    for (const sg of [-1, 1]) {
      const q = R * 0.74 * kSlit;
      LCldGroove(c, x + sg * q, y + R * 0.06, x + sg * q * 0.42, y + R * 0.86 * kSlit,
        ink, a, R * 0.040);
    }
  }
  // ② 날 — 날밑 아래로 **자란다.** 면이 서고 셀이 갈린다.
  if (kBlade > 0.01) {
    const hgt = R * 2.02 * kBlade, tip = GY + hgt;
    const P = [[0.34, 0.00], [1.00, 0.10], [0.94, 0.42], [0.66, 0.72], [0.30, 0.92], [0.00, 1.00]];
    const pts = P.map((p) => [x + p[0] * BW, GY + p[1] * hgt]);
    for (let j = P.length - 2; j >= 0; j--) pts.push([x - P[j][0] * BW, GY + P[j][1] * hgt]);
    const cy2 = GY + hgt * 0.42;
    const blade = LCldPoly(c, pts, x, cy2);
    LCldSlab(c, blade, x, cy2, BW, hgt * 0.56, g, ink, a, R * 0.15);
    // 벼려진 면 — **한쪽만 밝다.** 양쪽이 같이 밝으면 날이 아니라 기둥이다.
    c.save(); blade(0.96); c.clip();
    const bev = c.createLinearGradient(x - BW, 0, x + BW, 0);
    bev.addColorStop(0, A(g[1], 0.10 * a));
    bev.addColorStop(0.46, A(g[1], 0.40 * a));
    bev.addColorStop(0.54, A(g[0], 0.16 * a));
    bev.addColorStop(1, A(g[0], 0.34 * a));
    c.fillStyle = bev; c.fillRect(x - BW, GY - hgt * 0.12, BW * 2, hgt * 1.24);
    c.restore();
    // 갈린 면 넷 — 끝으로 모인다. **모임**이 그림에 남는 자리다.
    c.strokeStyle = A(g[1], 0.44 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (const q of [-0.66, -0.32, 0.32, 0.66]) {
      c.moveTo(x + BW * q, GY + hgt * 0.06);
      c.lineTo(x + BW * q * 0.14, tip - hgt * 0.10);
    }
    c.stroke();
    // 옆 모서리 — 실루엣을 정하는 변이라 밝은 획으로 긋는다
    LCldEdge(c, [[x - BW * 1.00, GY + hgt * 0.10], [x - BW * 0.66, GY + hgt * 0.72],
      [x, tip], [x + BW * 0.66, GY + hgt * 0.72], [x + BW * 1.00, GY + hgt * 0.10]],
      g, a, Math.max(1.3, R * 0.028));
    // 심 — 굵은 획 위에 가는 흰 획
    c.lineCap = "round";
    c.strokeStyle = A(g[1], 0.90 * a); c.lineWidth = R * 0.050;
    c.beginPath(); c.moveTo(x, GY + hgt * 0.02); c.lineTo(x, tip - hgt * 0.09); c.stroke();
    c.strokeStyle = A(g[2], 0.62 * a); c.lineWidth = 1;
    c.beginPath(); c.moveTo(x, GY + hgt * 0.06); c.lineTo(x, tip - hgt * 0.14); c.stroke();
    for (const sg of [-1, 1])
      LCdot(c, x + sg * BW * 0.72, GY + hgt * 0.16, 1.5, A(g[2], 0.66 * a));
    // 벼려지는 결 — 심을 한 주기에 한 번 훑고 되돌아온다. 순수 주기 함수라 이음매가 없다.
    const gu = 0.5 - 0.5 * Math.cos(TAU * (t % LCT) / LCT);
    LCspark(c, x, GY + hgt * (0.08 + 0.80 * gu), R * 0.090, A(g[2], 0.62 * a));
  }
  // ③ 날밑 — 가운데에서 **좌우로 뻗는다.** 끝이 위로 솟아 곧은 막대가 안 된다.
  if (kGuard > 0.01) {
    const gw = R * 1.06 * kGuard;
    const pts = [[x - gw, GY - GT * 2.6], [x - gw * 0.56, GY - GT],
                 [x + gw * 0.56, GY - GT], [x + gw, GY - GT * 2.6],
                 [x + gw, GY + GT * 0.6], [x + gw * 0.56, GY + GT],
                 [x - gw * 0.56, GY + GT], [x - gw, GY + GT * 0.6]];
    const arm = LCldPoly(c, pts, x, GY);
    LCldSlab(c, arm, x, GY, gw, GT * 2.6, g, ink, a, R * 0.12);
    c.strokeStyle = A(g[1], 0.52 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (let k = -3; k <= 3; k++) {
      if (!k) continue;
      const px = x + k * gw * 0.150;
      c.moveTo(px, GY - GT * 0.84); c.lineTo(px, GY + GT * 0.84);
    }
    c.stroke();
    LCldEdge(c, pts.concat([pts[0]]), g, a, Math.max(1.4, R * 0.036));
    for (const sg of [-1, 1]) LCdot(c, x + sg * gw * 0.82, GY, 1.7, A(g[2], 0.74 * a));
  }
  // ④ 자루 — 날밑 위로 **솟는다.** 왕관의 첨탑과 같은 축이라 한 줄로 이어진다.
  if (kGrip > 0.01) {
    const gh = R * 0.56 * kGrip, gw = R * 0.115, ty = GY - GT * 2.4;
    const pts = [[x - gw, ty], [x - gw * 0.58, ty - gh], [x + gw * 0.58, ty - gh], [x + gw, ty]];
    const grip = LCldPoly(c, pts, x, ty - gh * 0.5);
    LCldSlab(c, grip, x, ty - gh * 0.5, gw, gh * 0.5, g, ink, a, R * 0.10);
    c.strokeStyle = A(g[1], 0.55 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (let k = 1; k <= 3; k++) {
      const py = ty - gh * k / 4, ww = gw * (1 - k * 0.10);
      c.moveTo(x - ww, py); c.lineTo(x + ww, py);
    }
    c.stroke();
    LCdia(c, x, ty - gh, R * 0.105 * kGrip, A(g[2], al));
  }
  // ⑤ 흰 심 — 날밑 한가운데. 끝이 아니라 **쥐는 자리**가 빛난다.
  LCldCore(c, x, GY, R * 0.22, g, t, a, kCore);
}

/// 안 E — **모래시계(漏).** 쐐기 둘이 허리에서 물려 위아래로 벌어지고, 위·아래
/// 끝이 **안으로 패여** 네 귀가 뿔로 남는다. 압도의 종류가 **엇갈림**이다.
/// ⚠️⚠️ 여덟 중 혼자 **허리가 잘록하다** — 작게 줄였을 때 제일 먼저 갈리는 자리가
///   그것이다. 나머지 일곱은 한 덩이거나 갈라진 덩이라 잘록한 데가 없다.
/// ⚠️ 끝이 **패인 꼴**이라야 한다. 곧게 자르면 아래가 가로 막대가 되어 왕관의
///   이단 대좌와 나란히 선다.
/// ⚠️ 유니크의 공격속도는 휜 **낫꼴 획**이라 여기 면 · 셀 · 못이 없다.
function LCldefE(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kGro = st(0.00, 0.30), kUp = st(0.08, 0.58), kDn = st(0.28, 0.78),
        kTrim = st(0.66, 0.92), kCore = st(0.84, 1.00);
  const al = 0.95 * a, u = (t % LCT) / LCT;
  const WH = R * 0.240 * (1 - 0.14 * LCbump(u, 3));   // 허리 반폭 — 주기당 한 번 조인다
  const WY = R * 0.06;
  // ① 네 귀로 뻗는 홈 — 허리로 모여 잘록한 자리를 뒤에서 한 번 더 짚는다.
  if (kGro > 0.005) {
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
      const q0 = R * 0.44, q1 = R * (0.44 + 0.62 * kGro), an = 1.04;
      LCldGroove(c, x + sx * Math.cos(an) * q0, y + sy * Math.sin(an) * q0,
        x + sx * Math.cos(an) * q1, y + sy * Math.sin(an) * q1, ink, a, R * 0.042);
    }
  }
  /// 패인 끝의 한 점 — `f` 가 -1(왼 귀) → 0(가운데 패인 자리) → 1(오른 귀).
  const rim = (f, hw, cy2, dy2) => {
    const q = Math.abs(f);
    return [x + hw * f, cy2 + (dy2 - cy2) * (1 - q)];
  };
  // ② 위 쐐기 — 허리에서 **위로 자란다.**
  if (kUp > 0.01) {
    const TY = y - R * 1.22 * kUp, TD = y - R * 1.00 * kUp, HW = R * 0.78 * kUp;
    const pts = [[x - HW, TY], [x, TD], [x + HW, TY], [x + WH, y - WY], [x - WH, y - WY]];
    const cy2 = (TY + y) / 2;
    const up = LCldPoly(c, pts, x, cy2);
    LCldSlab(c, up, x, cy2, HW, (y - TY) * 0.5, g, ink, a, R * 0.20);
    c.strokeStyle = A(g[1], 0.50 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (let k = -2; k <= 2; k++) {
      const f = k / 2.4, p = rim(f, HW * 0.90, TY, TD);
      c.moveTo(x + WH * f * 0.80, y - WY); c.lineTo(p[0], p[1]);
    }
    c.stroke();
    LCldEdge(c, [[x - HW, TY], [x, TD], [x + HW, TY]], g, a, Math.max(1.3, R * 0.028));
  }
  // ③ 아래 쐐기 — 허리에서 **아래로 자란다.** 끝이 패여 두 뿔로 맺힌다.
  if (kDn > 0.01) {
    const BY = y + R * 1.12 * kDn, BD = y + R * 0.92 * kDn, HW = R * 0.72 * kDn;
    const pts = [[x - WH, y + WY], [x + WH, y + WY], [x + HW, BY], [x, BD], [x - HW, BY]];
    const cy2 = (y + BY) / 2;
    const dn = LCldPoly(c, pts, x, cy2);
    LCldSlab(c, dn, x, cy2, HW, (BY - y) * 0.5, g, ink, a, R * 0.20);
    c.strokeStyle = A(g[1], 0.50 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (let k = -2; k <= 2; k++) {
      const f = k / 2.4, p = rim(f, HW * 0.90, BY, BD);
      c.moveTo(x + WH * f * 0.80, y + WY); c.lineTo(p[0], p[1]);
    }
    c.stroke();
    LCldEdge(c, [[x - HW, BY], [x, BD], [x + HW, BY]], g, a, Math.max(1.3, R * 0.028));
  }
  // ④ 옆 모서리 · 귀의 못 — 실루엣을 정하는 네 변을 밝은 획으로 못 박는다.
  if (kTrim > 0.01) {
    const TY = y - R * 1.22 * kUp, TW = R * 0.78 * kUp;
    const BY = y + R * 1.12 * kDn, BW2 = R * 0.72 * kDn;
    for (const sg of [-1, 1]) {
      LCldEdge(c, [[x + sg * TW, TY], [x + sg * WH, y - WY],
        [x + sg * WH, y + WY], [x + sg * BW2, BY]], g, a, Math.max(1.2, R * 0.024));
      LCtri(c, x + sg * TW, TY, -Math.PI / 2 + sg * 0.50, R * 0.12 * kTrim,
        R * 0.042 * kTrim, A(g[1], al));
      LCtri(c, x + sg * BW2, BY, Math.PI / 2 - sg * 0.50, R * 0.12 * kTrim,
        R * 0.042 * kTrim, A(g[1], al));
      LCdot(c, x + sg * TW, TY, 1.7 * kTrim, A(g[2], 0.74 * a));
      LCdot(c, x + sg * BW2, BY, 1.7 * kTrim, A(g[2], 0.74 * a));
    }
    // 허리 고리 — 두 쐐기가 **물린 자리.** 육각 판 하나가 이음매를 덮는다.
    const hw = R * 0.30 * kTrim, hh = R * 0.135 * kTrim, hc = R * 0.11 * kTrim;
    const hub = LCldPoly(c, [[x - hw, y], [x - hc, y - hh], [x + hc, y - hh],
      [x + hw, y], [x + hc, y + hh], [x - hc, y + hh]], x, y);
    LCldSlab(c, hub, x, y, hw, hh, g, ink, a, R * 0.11);
    for (const sg of [-1, 1]) LCdot(c, x + sg * hw * 0.66, y, 1.5, A(g[2], 0.72 * a));
  }
  // ⑤ 목을 지나는 것 — 한 주기에 한 번 위 끝에서 아래 끝까지 훑고 되돌아온다.
  //   순수 주기 함수라 주기 끝과 처음이 어긋날 자리가 없다.
  if (kDn > 0.02) {
    const gu = 0.5 - 0.5 * Math.cos(TAU * u);
    const y0 = y - R * 0.86 * kUp, y1 = y + R * 0.80 * kDn;
    LCspark(c, x, y0 + (y1 - y0) * gu, R * 0.088, A(g[2], 0.60 * a));
  }
  LCldCore(c, x, y, R * 0.20, g, t, a, kCore);
}

/// 안 F — **기운 창날(斜).** 굵은 창 한 자루가 비스듬히 눕고 뒤로 가는 띠 둘이
/// 흐른다. 압도의 종류가 **흘러감**이다.
/// ⚠️⚠️ 여덟 중 혼자 **기운 축**을 쓴다 — 나머지 일곱이 다 세로 대칭이라 작게
///   줄여도 이 하나만 기울어 보인다. 그것이 이 안의 값 전부다.
/// ⚠️ 굵은 것이 **하나**라야 한다. 셋을 나란히 굵게 놓으면 덩이가 흩어져
///   「빗금 뭉치」가 되고 기운 것이 실루엣에 안 남는다.
/// ⚠️ 유니크의 이동속도는 열린 **꺾쇠** 셋이라 여기 면 · 셀 · 못이 없다.
function LCldefF(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kGro = st(0.00, 0.32), kLance = st(0.08, 0.64), kTrail = st(0.44, 0.78),
        kBarb = st(0.66, 0.92), kCore = st(0.84, 1.00);
  const al = 0.95 * a;
  const AN = -0.52, ca = Math.cos(AN), sa = Math.sin(AN);
  /// 기운 축의 좌표 — `s` 는 흐르는 쪽, `n` 은 그 옆.
  const P = (s, n) => [x + ca * s - sa * n, y + sa * s + ca * n];
  // ① 결 홈 다섯 — 창과 같은 기울기로 뒤를 훑는다.
  if (kGro > 0.005) {
    for (let k = -1; k <= 1; k++) {
      const L = R * (1.06 - Math.abs(k) * 0.11) * kGro, nn = k * R * 0.42;
      const p0 = P(-L, nn), p1 = P(L, nn);
      LCldGroove(c, p0[0], p0[1], p1[0], p1[1], ink, a, R * 0.040);
    }
  }
  // ② 뒤로 흐르는 가는 띠 둘 — 창보다 **뒤**에 깔린다. 자리가 점대칭이라
  //   기운 것이 방향으로만 남고 무게로는 안 남는다.
  if (kTrail > 0.01) {
    for (const sg of [-1, 1]) {
      const nn = sg * R * 0.46, w = R * 0.070, L = R * 1.00 * kTrail;
      const K = [[-1.00, 0.00], [-0.72, -1], [0.52, -1], [0.68, 0], [0.52, 1], [-0.72, 1]];
      const pts = K.map((p) => P(-R * 0.14 + p[0] * L, nn + p[1] * w));
      const ctr = P(-R * 0.14, nn);
      const band = LCldPoly(c, pts, ctr[0], ctr[1]);
      LCldSlab(c, band, ctr[0], ctr[1], L, L, g, ink, a, R * 0.22);
      const e0 = P(-R * 0.14 - L * 0.70, nn - w * 0.62), e1 = P(-R * 0.14 + L * 0.60, nn - w * 0.62);
      c.strokeStyle = A(g[1], 0.72 * a); c.lineWidth = 1; c.lineCap = "round";
      c.beginPath(); c.moveTo(e0[0], e0[1]); c.lineTo(e1[0], e1[1]); c.stroke();
    }
  }
  // ③ 창 — **앞으로 자란다.** 자루가 가늘고 머리가 벌어져 방향이 한눈에 읽힌다.
  if (kLance > 0.01) {
    const L = R * 1.24 * kLance, w = R * 0.44;
    const K = [[-1.00, -0.72], [-0.74, 0.00], [-1.00, 0.72], [0.14, 0.34],
               [0.22, 0.98], [1.00, 0.00], [0.22, -0.98], [0.14, -0.34]];
    const pts = K.map((p) => P(p[0] * L, p[1] * w));
    const lance = LCldPoly(c, pts, x, y);
    LCldSlab(c, lance, x, y, L, L, g, ink, a, R * 0.19);
    // 벼려진 면 — 앞쪽 반만 밝다. 뒤까지 밝으면 창이 아니라 막대다.
    c.save(); lance(0.96); c.clip();
    const h0 = P(-L, 0), h1 = P(L, 0);
    const bev = c.createLinearGradient(h0[0], h0[1], h1[0], h1[1]);
    bev.addColorStop(0, A(g[0], 0.30 * a));
    bev.addColorStop(0.52, A(g[0], 0.14 * a));
    bev.addColorStop(0.66, A(g[1], 0.38 * a));
    bev.addColorStop(1, A(g[1], 0.12 * a));
    c.fillStyle = bev; c.fillRect(x - R * 1.4, y - R * 1.4, R * 2.8, R * 2.8);
    c.restore();
    // 마디 — 창을 가로질러 칸을 만든다
    c.strokeStyle = A(g[1], 0.50 * a); c.lineWidth = 1; c.lineCap = "butt";
    c.beginPath();
    for (let k = 0; k < 4; k++) {
      const s = L * (-0.86 + 0.30 * k), ww = w * (0.30 + 0.04 * k);
      const q0 = P(s, -ww), q1 = P(s, ww);
      c.moveTo(q0[0], q0[1]); c.lineTo(q1[0], q1[1]);
    }
    c.stroke();
    // 실루엣을 정하는 변 — 머리의 두 어깨와 끝
    LCldEdge(c, [P(0.14 * L, -0.34 * w), P(0.22 * L, -0.98 * w), P(L, 0),
      P(0.22 * L, 0.98 * w), P(0.14 * L, 0.34 * w)], g, a, Math.max(1.3, R * 0.028));
    // 심 — 자루를 지나는 가는 흰 획
    const c0 = P(-L * 0.92, 0), c1 = P(L * 0.86, 0);
    c.lineCap = "round";
    c.strokeStyle = A(g[1], 0.86 * a); c.lineWidth = R * 0.040;
    c.beginPath(); c.moveTo(c0[0], c0[1]); c.lineTo(c1[0], c1[1]); c.stroke();
    c.strokeStyle = A(g[2], 0.58 * a); c.lineWidth = 1;
    c.beginPath(); c.moveTo(c0[0], c0[1]); c.lineTo(c1[0], c1[1]); c.stroke();
    // 흐르는 결 — 한 주기에 한 번 자루를 훑고 되돌아온다. 순수 주기 함수다.
    const gu = 0.5 - 0.5 * Math.cos(TAU * (t % LCT) / LCT);
    const q = P(-L * 0.86 + L * 1.66 * gu, 0);
    LCspark(c, q[0], q[1], R * 0.086, A(g[2], 0.60 * a));
  }
  // ④ 미늘과 못 — 머리 어깨에 물리고 꽁지에 박힌다.
  if (kBarb > 0.01) {
    const L = R * 1.24 * kLance, w = R * 0.44;
    for (const sg of [-1, 1]) {
      const q = P(0.24 * L, sg * 0.96 * w);
      LCtri(c, q[0], q[1], AN + sg * 1.32, R * 0.20 * kBarb, R * 0.050 * kBarb, A(g[1], al));
      LCdot(c, q[0], q[1], 1.7 * kBarb, A(g[2], 0.74 * a));
      const p = P(-1.00 * L, sg * 0.72 * w);
      LCdot(c, p[0], p[1], 1.5 * kBarb, A(g[2], 0.66 * a));
    }
    const tp = P(L, 0);
    LCdia(c, tp[0], tp[1], R * 0.052 * kBarb, A(g[2], al));
  }
  LCldCore(c, x, y, R * 0.20, g, t, a, kCore);
}

/// 안 G — **갈라진 판(裂).** 한 장이던 넓은 판이 **번개 금 하나로 둘이 되어**
/// 좌우로 밀린다. 압도의 종류가 **쪼개짐**이다.
/// ⚠️⚠️ 여덟 중 혼자 **덩이가 둘**이고 혼자 **세로보다 가로가 넓다** — 작게
///   줄이면 「가운데가 밝게 갈라진 넓은 덩이」 하나로 남고, 그 꼴은 다른 일곱에 없다.
/// ⚠️ 조각을 여럿으로 흩으면 둘레가 둥글어져 광배와 한 물건이 된다. 금이 **하나**,
///   덩이가 **둘**이라야 갈라진 것이 실루엣에 남는다.
/// ⚠️ 밀려난 거리·튄 자리는 **번호에서 닫힌 식으로** 낸다(`Random` 이 없다).
/// ⚠️ 유니크의 치명타 피해는 X 로 뻗는 **살**과 깨진 **고리**라 여기 면이 없다.
function LCldefG(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kCrack = st(0.00, 0.28), kHalf = st(0.08, 0.62), kPush = st(0.44, 0.78),
        kSpall = st(0.64, 0.90), kCore = st(0.84, 1.00);
  const al = 0.95 * a, u = (t % LCT) / LCT;
  const HW = R * 1.06, HH = R * 0.96;
  const PX = R * (0.17 + 0.04 * LCbump(u, 2)) * kPush;   // 아직 밀려나는 중이다
  // 금의 자리 — 위에서 아래로 꺾이며 내려간다. 두 덩이가 이 선을 공유한다.
  const ZG = [[-1.00, 0.00], [-0.62, 0.17], [-0.24, -0.11], [0.16, 0.16],
              [0.56, -0.09], [1.00, 0.00]];
  // 판의 오른쪽 바깥 변(아래 → 위)
  const OUT = [[0.28, 0.96], [0.88, 0.50], [1.04, -0.08], [0.60, -0.74]];
  const half = (sg, k) => {
    const pts = [];
    ZG.forEach((p) => pts.push([x + sg * p[1] * R * 0.20 * k, y + p[0] * HH * k]));
    OUT.forEach((p) => pts.push([x + sg * p[0] * HW * k, y + p[1] * HH * k]));
    return pts;
  };
  // ① 두 덩이 — **면이 갈린다.** 자라고, 그 다음 밀린다.
  if (kHalf > 0.01) {
    for (const sg of [-1, 1]) {
      const pts = half(sg, kHalf).map((p) => [p[0] + sg * PX, p[1]]);
      const cx2 = x + sg * (HW * kHalf * 0.42 + PX);
      const plate = LCldPoly(c, pts, cx2, y);
      LCldSlab(c, plate, cx2, y, HW * kHalf * 0.62, HH * kHalf, g, ink, a, R * 0.20);
      // 갈린 바깥 변만 밝다 — 안쪽 변까지 밝으면 덩이가 아니라 테가 된다.
      LCldEdge(c, OUT.map((p) => [x + sg * (p[0] * HW * kHalf + PX), y + p[1] * HH * kHalf]),
        g, a, Math.max(1.5, R * 0.038));
      // 셀 — 금에서 바깥 변으로 갈라져 나간다
      c.strokeStyle = A(g[1], 0.48 * a); c.lineWidth = 1; c.lineCap = "butt";
      c.beginPath();
      for (let k = 0; k < 4; k++) {
        const v = -0.60 + 0.42 * k;
        c.moveTo(x + sg * PX, y + v * HH * kHalf);
        c.lineTo(x + sg * (HW * kHalf * 0.88 + PX), y + (v * 0.72 + 0.10) * HH * kHalf);
      }
      c.stroke();
      for (let k = 0; k < OUT.length; k++) {
        const p = OUT[k];
        LCdot(c, x + sg * (p[0] * HW * kHalf * 0.86 + PX), y + p[1] * HH * kHalf * 0.86,
          1.5, A(g[2], 0.68 * a));
      }
    }
  }
  // ② 금 — 두 덩이 **사이**에서 빛난다. 위에서부터 그어져 내려온다.
  if (kCrack > 0.005) {
    const n = Math.max(2, Math.round(ZG.length * kCrack));
    const line = ZG.slice(0, n).map((p) => [x + p[1] * R * 0.20, y + p[0] * HH]);
    if (line.length > 1) {
      const pth = () => {
        c.beginPath();
        line.forEach((p, j) => (j ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
      };
      c.lineCap = "butt"; c.lineJoin = "miter";
      pth(); c.strokeStyle = A("#000000", 0.62 * a); c.lineWidth = R * 0.15; c.stroke();
      pth(); c.strokeStyle = A(g[1], 0.95 * a); c.lineWidth = Math.max(1.8, R * 0.046); c.stroke();
      pth(); c.strokeStyle = A(g[2], 0.88 * a); c.lineWidth = Math.max(1, R * 0.016); c.stroke();
    }
  }
  // ③ 튄 조각 — 판 밖으로 더 나간 것. 자리는 번호에서 낸다.
  if (kSpall > 0.005) {
    for (let k = 0; k < 8; k++) {
      const an = -Math.PI / 2 + 0.28 + k * 2.399;
      const q = R * (1.06 + 0.20 * ((k * 4) % 5) / 4) * kSpall;
      const px = x + Math.cos(an) * q, py = y + Math.sin(an) * q * 0.86;
      if (k % 2) LCtri(c, px, py, an, R * 0.085 * kSpall, R * 0.028 * kSpall, A(g[1], 0.82 * a));
      else LCdia(c, px, py, R * 0.030 * kSpall, A(g[2], 0.66 * a));
    }
  }
  // ④ 흰 심 — 금 한가운데. **갈라진 자리**가 마지막에 탄다.
  LCldCore(c, x, y, R * 0.22, g, t, a, kCore);
}

/// 안 H — **품은 알(藏).** 위아래가 뾰족한 알 하나가 곧게 서고, 각진 발 한 쌍이
/// 그것을 물어 잡는다. 압도의 종류가 **담김**이다 — 여덟 중 혼자 **안이 있는 물건**이다.
/// ⚠️⚠️ 실루엣이 **위아래로 뾰족한 한 덩이**다. 층탑은 얹힌 사발이라 위가 둥글고
///   아래로 벌어지는데, 이 안은 통째로 하나라 작게 줄이면 둘이 안 겹친다.
/// ⚠️ 밑이 **꼭짓점**이다. 굽을 달면 그 순간 왕관의 이단 대좌와 나란히 서서
///   받침이 둘이 된다.
/// ⚠️ 유니크의 체력은 겹겹이 선 **고리**라 여기 면 · 격자 · 못이 없다.
function LCldefH(c, x, y, R, g, ink, t, a, rev) {
  const r = LCcl(rev == null ? 1 : rev);
  if (r <= 0.005) return;
  const st = (a0, a1) => LCes(LCcl((r - a0) / (a1 - a0)));
  const kClaw = st(0.00, 0.34), kBody = st(0.10, 0.64), kBand = st(0.46, 0.76),
        kFacet = st(0.62, 0.88), kCore = st(0.84, 1.00);
  const al = 0.95 * a;
  /// 알의 오른쪽 옆선(위 → 아래). 왼쪽은 이 선을 되짚어 쓴다.
  /// ⚠️ 위가 좁고 배가 아래쪽에서 제일 부르다 — 위아래가 같으면 마름모가 되어
  ///   유니크의 팔면체 원석과 어휘가 붙는다.
  const PR = [[0.00, -1.18], [0.30, -0.84], [0.58, -0.34], [0.68, 0.16],
              [0.53, 0.68], [0.25, 0.98], [0.00, 1.18]];
  // ① 무는 발 한 쌍 — 알보다 **먼저** 서고 위아래로 뿔이 남는다.
  if (kClaw > 0.005) {
    const k = kClaw;
    const CP = [[0.11, -1.28], [0.82, -0.46], [0.88, 0.22], [0.32, 1.02]];
    for (const sg of [-1, 1]) {
      const pts = CP.map((p, j) => {
        const f = LCcl(k * CP.length - j);
        return [x + sg * (CP[0][0] + (p[0] - CP[0][0]) * f) * R,
                y + (CP[0][1] + (p[1] - CP[0][1]) * f) * R];
      });
      LCldEdge(c, pts, g, a, Math.max(1.1, R * 0.030));
      LCdot(c, x + sg * CP[1][0] * R * k, y + CP[1][1] * R, 1.6 * k, A(g[2], 0.70 * a));
    }
  }
  // ② 알 — 발 사이에서 **자란다.** 면 · 격자 · 음각 테가 여기서 선다.
  if (kBody > 0.01) {
    const k = kBody;
    const pts = PR.map((p) => [x + p[0] * R * k, y + p[1] * R * k]);
    for (let j = PR.length - 2; j >= 1; j--) pts.push([x - PR[j][0] * R * k, y + PR[j][1] * R * k]);
    const body = LCldPoly(c, pts, x, y + R * 0.06 * k);
    LCldSlab(c, body, x, y + R * 0.06 * k, R * 0.68 * k, R * 1.18 * k, g, ink, a, R * 0.26);
    // 옆선 — 실루엣을 정하는 변이라 굵은 금속 띠에 흰 심을 넣는다.
    const edge = [];
    PR.forEach((p) => edge.push([x + p[0] * R * k, y + p[1] * R * k]));
    for (let j = PR.length - 2; j >= 0; j--) edge.push([x - PR[j][0] * R * k, y + PR[j][1] * R * k]);
    LCldEdge(c, edge, g, a, Math.max(1.6, R * 0.064));
    if (kFacet > 0.01) {
      c.save(); body(0.94); c.clip();
      // 저폴리 갈림 — 배의 꼭짓점마다 가운데로 금이 간다. 면이 갈려야 「돌」이 된다.
      c.strokeStyle = A(g[1], 0.44 * a); c.lineWidth = 1; c.lineCap = "butt";
      c.beginPath();
      for (const p of PR) {
        for (const sg of [-1, 1]) {
          c.moveTo(x + sg * p[0] * R * k, y + p[1] * R * k);
          c.lineTo(x + sg * p[0] * R * k * 0.16, y + R * 0.10 * k);
        }
      }
      c.stroke();
      c.restore();
      for (const p of [PR[2], PR[4]]) for (const sg of [-1, 1])
        LCdot(c, x + sg * p[0] * R * k * 0.86, y + p[1] * R * k * 0.94, 1.5 * kFacet,
          A(g[2], 0.68 * a));
    }
    // 담긴 것 — 한 주기에 한 번 배 안을 오르내린다. 순수 주기 함수다.
    const gu = 0.5 - 0.5 * Math.cos(TAU * (t % LCT) / LCT);
    LCspark(c, x, y + R * k * (0.72 - 1.28 * gu), R * 0.088, A(g[2], 0.56 * a));
  }
  // ③ 뇌문 띠 — 배가 제일 부른 자리. 「글이 새겨진 물건」이 된다.
  // ⚠️ 몸통보다 **좁아야** 한다. 폭을 다 채우면 배를 가로지르는 막대로 보인다.
  if (kBand > 0.01) {
    const w = R * 0.34 * kBody, bw = R * 0.064;
    LCmeander(c, x - w, y + R * 0.14 * kBody - bw * 0.5, 1, 0, w * 2, bw, ink(0.58), 1, kBand);
  }
  // ④ 흰 심 — 배 안에서 빛난다. **담긴 것**이 이 안의 마지막 박자다.
  LCldCore(c, x, y + R * 0.14, R * 0.24, g, t, a, kCore);
}

/// 레전더리의 스탯 문장 표 — **문장 여덟이 스탯 여덟을 하나씩 맡는다.**
///
/// ⭐ **게임 관련 넷은 여기 없는 것이 맞다**(2026-08-28) — 넷 다 레전더리를
///   안 만드는 카드라([LCAXIS] 의 ⚠️⚠️) 레전더리 카드 자체가 안 굽힌다.
///   「유니크에는 있는데 여기 없다」가 이 넷에서는 어긋남이 아니라 **사양**이다.
///   `atk` 대검 — 모임        `aspd` 모래시계 — 엇갈림  `spell` 광배 — 빛
///   `speed` 기운 창날 — 흘러감 `crit` 성망 인장 — 짜임  `critdmg` 갈라진 판 — 쪼개짐
///   `defense` 층탑 — 무게     `vitality` 품은 알 — 담김
/// ⚠️⚠️ 키는 [LCUSYM] 과 **같은 이름**이라야 한다. 카드는 `d.sym` 하나로 두 표를
///   같이 타므로, 이름이 어긋나면 유니크만 승급하고 레전더리는 조용히 옛 문양으로
///   떨어진다 — **아무 데서도 안 터지는 종류의 어긋남**이라 표가 유일한 방어선이다.
/// ⚠️ 여기 없는 스탯은 그대로 **옛 그림으로 떨어진다** — 왕관 가운데에 축의 기본
///   문양([LCSYM])이 아주 작게 앉는다. 칸을 더할 때 이 표만 채우면 카드는 안 고친다.
const LCLSYM = {
  atk: LCldefD, aspd: LCldefE, spell: LCldefA, speed: LCldefF,
  crit: LCldefB, critdmg: LCldefG, defense: LCldefC, vitality: LCldefH,
};

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

// ══════════════════════════════════════════════════════════════════════════
// ⭐⭐ 속성 스킬 카드 — **등급 사다리를 안 탄다**              (2026-08-28)
//
// 사용자 원문: 「'스킬' 의 경우 일반(회색)·레어(파랑)·유니크(보라)·레전더리(황금)
// 같은 취급할 게 아니라 **'속성'의 스킬용 카드로 따로 만들어야 될 것 같아**. 근데
// 이건 **등급을 나눌 필요는 없고 속성마다 1개의 레벨업카드 디자인만** 추가하면
// 될 것 같아. … '염' 캐릭터로 플레이할 경우에는 '스킬' 나올 시 모두 '염' 속성의
// 색상 스킬 레벨업카드가 뜨면 됨」
//
// ⇒ **사다리가 없다.** 속성마다 한 장이고 여섯이 서로 위아래가 아니다. 등급 이름도
//   확률도 카드에 안 뜬다 — 그 자리에 「속성 · 스킬」이 선다.
//
// ── ⚠️⚠️ 겹칠 자리 셋 — **색이 아니라 결이 가른다**(재판정) ────────────────
// 사용자 판정이 이 자리에서 두 번 뒤집혔다.
//   ① 「서리결정·뇌광·빛파동은 기존 색깔들과 너무 비슷한데?」 → 색을 옮겼다
//   ② 「**'색'만으로 구별하려고 하면 조금 인지가 안 될 거 같음**」 → 결을 세웠다
// ⇒ **결이 주 방어선이다.** 옮긴 뒤의 실측(다른 픽셀은 240×336 전 픽셀 대조):
//   빙  #4FC3F7→#2673D9 ↔ 레어 #4FA0E8(되돌림)
//        색상각 9.7→6.0°  명도 2.9→11.0%p  대비 1.39→1.66:1  다른 픽셀 18.0→24.4%
//   뇌  #FFE03A→#FFF585 ↔ 레전더리 #FFC24A→#FFB74A
//        색상각 10.8→18.9°  명도 3.1→11.6%p  다른 픽셀 53.0→62.6%
//   무  #9A9AA8(그대로)  ↔ 일반 #98A0AE→#C6B380
//        색상각 21.8→163.7°  채도 4.5→30.6  다른 픽셀 7.2→30.7%
//
// ⚠️⚠️ **빙↔레어는 색으로 못 가른다** — 레어를 되돌린 뒤 색상각이 6.0° 로 45쌍
//   중 제일 가깝다. 그런데도 다른 픽셀이 18.0 → 24.4% 로 는 것은 **색이 아니라
//   얼음 문양(새긴 눈꽃 · 고드름 · 날리는 결정) 덕**이다. 이 짝의 방어선은
//   결이고, 색은 명도 11%p 를 거들 뿐이다.
// ⇒ 그러면서도 이 저장소가 스스로 찾은 원칙은 그대로 선다
//   (`docs/design/시안-판정.md`): **면과 빛을 가르는 것은 색이 아니라 잉크의
//   모양이다.** 색은 이제 거들지 않고 같이 가르지만, **본 방어선은 여전히**
//   결(배경에 앉는 무늬)과 자리(문양이 앉는 판)다:
//     빙   **자라다 멎는다** — 서리는 앉는 것이라 시간을 한 톨도 안 먹는다
//          ↔ 레어 는 흐르고(하늘↔민트) 두 박자로 뛴다
//     뇌   **꺾이고 깜빡인다** — 줄기 다섯이 차례로 좁게 튄다
//          ↔ 레전더리 는 황도 고리가 **매끈하게 한 방향으로 돈다**
//     무   **면이다** — 매끈한 판 한 장이 도해를 덮고 자리에 무늬가 없다
//          ↔ 일반 은 선뿐이고 문양이 **맨몸**으로 뜬다
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️⚠️ **뼈대를 안 바꿨다.** 폭·높이·문양 자리(`ay`·`aR`)·글줄 자리·테 셋·모서리
//   갈고리·여는 층 일곱이 전부 일반·레어의 공통 블록 그대로다. 속성 카드는
//   [LCcard] 라는 **같은 함수**를 타고, 갈리는 자리마다 `AT` 한 값이 켜질 뿐이다 —
//   두 벌로 두면 그날로 갈라진다는 이 파일의 규약을 그대로 지킨다.
// ⚠️ **암은 안 만들었다** — 사용자 보류(배경 어둠과 색이 같다).
// ⚠️⚠️ **색 넷이 엔진과 갈려 있다**(2026-08-28 이동 · 이식 대기):
//     시안 `LCATTR.frost` #2673D9  ↔ 엔진 `kToneFrost`  #4FC3F7
//     시안 `LCATTR.volt`  #FFF585  ↔ 엔진 `kToneVolt`   #FFE03A
//     시안 `LCRANK.common`#C6B380  ↔ 엔진 `kGradeSkin[common]` #98A0AE
//     시안 `LCRANK.legend`#FFB74A  ↔ 엔진 `kGradeSkin[legend]` #FFC24A
//   ⭐ 등급 둘은 **레벨업 카드에만** 사는 색이라 `levelup_grade.dart` 한 곳만
//     따라오면 끝난다. **속성 둘은 그렇지 않다** — `cel_tones.dart` 의
//     `kToneFrost`·`kToneVolt` 는 그 속성의 **모든** 이펙트가 읽는 정체색이라
//     거기를 옮기면 게임 전체의 빙·뇌 색이 같이 바뀐다. 카드만 옮기려면 엔진에
//     **카드 전용 속성 팔레트**를 따로 두어야 한다 — 그 갈림은 사용자 판정이다.
//   ⚠️ 레어는 **안 갈렸다**(옮겼다가 되돌렸다). 염·독·풍·무 넷도 정체색 그대로다.
// ⚠️ **흐름을 쓰는 것은 셋뿐**이다(염·독·풍). 빙·뇌·무는 `hues` 가 1 이라 위상이
//   고정이고 **안 움직인다** — 그 정지가 겹칠 자리 셋을 가르는 손잡이의 절반이다.
// ⚠️ 난수 0건 · 한자 0건. 흩뿌린 자리는 [LChash], 박자는 전부 `t/LCT` 의 순수
//   주기 함수라 주기 끝과 처음이 어긋날 자리가 없다.
// ══════════════════════════════════════════════════════════════════════════

/// 속성 카드의 **여는 길이**(초).
/// ⚠️⚠️ 엔진이 2026-08-28 에 등급 넷을 **한 값으로 통일**했다
///   (`lib/ui/levelup_grade.dart` 의 `kOpenSec` — 사용자 판정 「연출은 넣되
///   시간은 동일하게 하고 싶은데 말야」). 속성 카드도 **그 값**을 쓴다.
/// ⚠️ 이 파일의 [LCOPEN] 은 아직 옛 길이(0.34 · 1.00 · 1.80 · 3.10)를 들고 있다 —
///   그 넷은 이 회차가 손댈 자리가 아니라 **그대로 두었고**, 갈린 채로 남아 있다는
///   사실을 격자 칸의 밑줄이 적는다(판정 자리).
const LCATSEC = 0.62;

// ── 속성의 결 — 배경에 앉는 무늬 ──────────────────────────────────────────
//
// 결은 전부 같은 자리에 선다: 배경 도해가 다 선 **뒤**, 흩뿌린 반짝임 **앞**.
// 그래서 여섯이 「같은 카드에 다른 무늬가 앉은 것」으로 읽히고, 어느 하나도
// 뼈대를 밀어내지 않는다.
//   `(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar)` — `ar` 는 배경 도해의 진행이다.

/// 염 — **불꽃 혀.** 자리 둘레에서 밖으로 핥고, 아래에서 잉걸이 올라온다.
/// ⚠️ 혀가 **한쪽으로 눕는다** — 좌우 대칭이면 별의 갈래로 읽힌다.
function LCatEmber(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  if (ar <= 0.01) return;
  const u = (t % LCT) / LCT, k = 0.55 + 0.45 * ar;
  c.save();
  c.lineCap = "round"; c.lineJoin = "round";
  for (let i = 0; i < 12; i++) {
    const an = -Math.PI / 2 + i * TAU / 12;
    const fk = 0.55 + 0.45 * LCbump((u + i / 12) % 1, 2);
    const r0 = aR * 0.60, r1 = aR * (0.80 + 0.34 * fk) * k;
    if (r1 - r0 <= 1) continue;
    const ca = Math.cos(an), sa = Math.sin(an), nx = -sa, ny = ca;
    // ⚠️ 첫 판은 0.34 였고 화면에서 **해무리**로 읽혔다(2026-08-28 실측) —
    //   곧게 뻗은 살은 불이 아니라 빛이다. 더 눕히면 그 자리에서 「혀」가 된다.
    const lick = (i % 2 ? 1 : -1) * 0.56 * (r1 - r0);
    const mx = cx + ca * (r0 + r1) * 0.5 + nx * lick * 0.5;
    const my = ay + sa * (r0 + r1) * 0.5 + ny * lick * 0.5;
    const ex = cx + ca * r1 + nx * lick, ey = ay + sa * r1 + ny * lick;
    c.strokeStyle = ink(0.56 * ar); c.lineWidth = 1.8;
    c.beginPath();
    c.moveTo(cx + ca * r0, ay + sa * r0);
    c.quadraticCurveTo(mx, my, ex, ey);
    c.stroke();
    // 속심 — 짧고 밝다. 획이 둘이라야 「혀」가 되고 하나면 그냥 살이다.
    c.strokeStyle = A(g[2], 0.34 * a * ar * fk); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx + ca * (r0 + 2), ay + sa * (r0 + 2));
    c.quadraticCurveTo(mx, my, cx + ca * (r0 + (r1 - r0) * 0.62) + nx * lick * 0.6,
      ay + sa * (r0 + (r1 - r0) * 0.62) + ny * lick * 0.6);
    c.stroke();
  }
  // 잉걸 — **올라온다.** 자리는 번호에서, 높이는 위상에서 낸다.
  // ⚠️ 글줄 위로 안 올린다 — 위쪽 56% 안에서만 산다.
  // ⚠️⚠️ 열여섯 → **스물여덟**(2026-08-28 사용자 요구 「불씨가 … 좀 더 강하게」).
  //   ⭐ **개수로 풀었지 크기로 안 풀었다** — 이 저장소의 병목은 GPU 채우기라
  //     비용은 톨의 **면적**에 붙는다. 작은 톨을 더 많이 뿌리는 쪽이 싸고,
  //     「또렷하게」는 알파(0.42 → 0.52)로 낸다.
  for (let i = 0; i < 28; i++) {
    const uu = (u + LChash(i * 3 + 5)) % 1;
    const fx = 0.06 + LChash(i * 7 + 11) * 0.88;
    const fy = 0.56 - 0.50 * uu;
    const al = Math.sin(Math.PI * uu) * 0.52 * a * ar;
    if (al <= 0.004) continue;
    LCdot(c, X + fx * W + Math.sin(uu * TAU + i) * 3, Y + fy * H,
      0.8 + LChash(i * 11 + 3) * 1.1, A(g[2], al));
  }
  c.restore();
}

/// ⭐⭐ **발치 장식** — 글줄 둘레와 **판 가운데 아래**를 채운다.
/// ⚠️⚠️ 항이 열둘이고 **①~⑧ 은 테두리 · 귀퉁이 · 가로선**, **⑨~⑫ 가 가운데를
///   지나간다.** 첫 판은 ①~⑧ 뿐이라 가운데 아래가 통째로 비었고 사용자께서
///   「하단의 빈 영역에 뭐 안 넣었네?」로 짚으셨다.
/// ⚠️ 어느 항도 **글 뒤로 안 들어간다** — 글이 없는 띠 둘(205~213 · 292~336)
///   안에서만 산다. 글자와 바탕의 명도 차가 떨어지면 안 되는 것이 이 자리의
///   조건이고(직전 회차의 가독성 반려), 그래서 ⑨~⑫ 는 **새김**([LCcarve])이다.
function LCfoot(c, X, Y, W, H, cx, g, ink, a, k) {
  if (k <= 0.01) return;
  const y0 = Y + H * 0.585, y1 = Y + H * 0.945;
  c.save();
  c.lineCap = "butt";
  // ⚠️⚠️ **사다리는 알파가 아니라 「무엇이 서는가」로 낸다.** 같은 그림을 옅게
  //   그리면 「덜 화려하다」가 아니라 「흐리다」가 된다 — 이 파일이 배경 도해에서
  //   이미 배운 함정이다(「도해는 알파가 아니라 크기로 선다」). 그래서 발치도
  //   등급이 오를 때마다 **항이 하나씩 는다.**
  // ① 글줄 좌우의 눈금 기둥 — 넷 다 갖는다. 눈금 수만 등급을 따른다.
  const n = 4 + Math.round(k * 8);
  for (const sg of [-1, 1]) {
    const bx = cx + sg * (W * 0.5 - 13);
    c.strokeStyle = A(g[1], (0.22 + 0.16 * k) * a); c.lineWidth = 1;
    c.beginPath(); c.moveTo(bx, y0); c.lineTo(bx, y1); c.stroke();
    for (let i = 0; i <= n; i++) {
      const yy = y0 + (y1 - y0) * i / n, L = i % 3 === 0 ? 6.5 : 3.2;
      c.beginPath(); c.moveTo(bx, yy); c.lineTo(bx - sg * L, yy); c.stroke();
    }
    LCdia(c, bx, y0, 2.2, A(g[2], (0.35 + 0.25 * k) * a));
    LCdia(c, bx, y1, 2.2, A(g[2], (0.35 + 0.25 * k) * a));
  }
  // ② 구분선의 구슬 — 밋밋한 가로선이 장식선이 된다 (레어부터)
  if (k > 0.20) {
    const m = k > 0.62 ? 3 : 2;
    for (const fy of [0.605, 0.805]) {
      const yy = Y + H * fy, hw = W / 2 - 34;
      for (let i = -m; i <= m; i++) {
        if (!i) continue;
        LCdot(c, cx + hw * (i / m), yy, Math.abs(i) === 2 ? 1.5 : 1.0,
          A(g[1], 0.42 * a));
      }
    }
  }
  // ③ 아래 두 모서리의 받침 — 위쪽 갈고리와 **같은 어휘**로 아래를 받는다 (레어부터)
  if (k > 0.30) {
    for (const sg of [-1, 1]) {
      const bx = cx + sg * (W * 0.5 - 9), by = Y + H - 9;
      c.strokeStyle = A(g[1], 0.42 * a); c.lineWidth = 1.2;
      c.beginPath();
      c.moveTo(bx - sg * 15, by); c.lineTo(bx, by); c.lineTo(bx, by - 15);
      c.stroke();
      LCdia(c, bx, by, 2.0, A(g[2], 0.50 * a));
    }
  }
  // ④ 아래 테를 도는 룬 띠 — 글 **밑**을 지난다(글 뒤가 아니다) (레어부터)
  if (k > 0.35) LCmeander(c, X + 14, Y + H - 17, 1, 0, W - 28, 5, A(g[1], 0.22 * a), 1, 1);
  // ⑤ 글줄 사이 좌우의 룬 획 — 글 **옆**의 여백을 짧은 획이 받는다 (유니크부터)
  if (k > 0.55) {
    for (const fy of [0.655, 0.735, 0.885]) {
      const yy = Y + H * fy;
      for (const sg of [-1, 1]) {
        const bx = cx + sg * (W * 0.5 - 22);
        c.strokeStyle = A(g[1], 0.30 * a); c.lineWidth = 1;
        c.beginPath();
        c.moveTo(bx, yy - 4); c.lineTo(bx - sg * 5, yy); c.lineTo(bx, yy + 4);
        c.stroke();
      }
    }
  }
  // ⑥ 아래 테 한 겹 더 — 가늘고 길어 면적이 거의 안 는다 (유니크부터)
  if (k > 0.65) {
    c.strokeStyle = A(g[1], 0.22 * a); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(X + 20, Y + H - 11); c.lineTo(X + W - 20, Y + H - 11); c.stroke();
  }
  // ⑦ 아래 귀퉁이의 작은 원환 둘 — 위쪽 문양(고리)과 같은 어휘 (레전더리만)
  if (k > 0.80) {
    for (const sg of [-1, 1]) {
      LCring(c, cx + sg * (W * 0.5 - 26), Y + H - 26, 7.5, A(g[1], 0.28 * a), 1);
      LCring(c, cx + sg * (W * 0.5 - 26), Y + H - 26, 3.4, A(g[2], 0.24 * a), 1);
      LCticks(c, cx + sg * (W * 0.5 - 26), Y + H - 26, 7.5, 8, 2.4,
        A(g[1], 0.24 * a), 1, 0, 2);
    }
  }
  // ⑧ 글줄 사이의 실선 한 쌍 — 아래가 통째로 짜인 것으로 보인다 (레전더리만)
  if (k > 0.88) {
    c.strokeStyle = A(g[1], 0.16 * a); c.lineWidth = 1;
    for (const fy of [0.705, 0.845]) {
      const yy = Y + H * fy;
      c.beginPath();
      c.moveTo(cx - (W / 2 - 46), yy); c.lineTo(cx + (W / 2 - 46), yy); c.stroke();
    }
  }

  // ══ ⭐⭐ 판 **가운데 아래** — 사용자 판정 「하단의 빈 영역에 뭐 안 넣었네?」 ══
  //
  // ⚠️⚠️ 위의 여덟은 전부 **테두리 · 귀퉁이 · 가로선**이었다. 판 가운데 아래로는
  //   한 획도 안 지나갔고, 그래서 채웠는데도 「안 넣었다」로 보였다. 아래 넷이
  //   **가운데를 지나간다.**
  // ⭐ 글줄 실측(H=336): 규칙선 203 · 이름 230(위 215 · 아래 234) · 값 260
  //   (위 242 · 아래 265) · 가는 선 270 · 부제 287(위 279 · 아래 290).
  //   ⇒ 글이 **없는** 띠는 둘이다: **205~213** 과 **292~336**(폭 240 전체).
  //   여기 넷은 그 두 띠 안에서만 산다 — 글 뒤로 안 들어간다.
  // ⚠️⚠️ **면을 안 칠한다.** 넓은 면은 3택(석 장 동시)에서 곱절이 되고, 이
  //   저장소의 병목은 GPU 채우기다. 여기 있는 것은 전부 **가늘고 긴 것**이고,
  //   새기는 것은 [LCcarve](어두운 홈 + 1px 어긋난 밝은 모서리)라 글자와
  //   **명도로 안 다툰다** — 판에 파인 것으로 읽힌다.
  const drk = A("#000000", 0.44 * a), lit = A(g[1], (0.30 + 0.22 * k) * a);

  // ⑨ **아래 테에서 피어오르는 부채** — 살이 위로 뻗어 가운데를 지난다.
  //   ⚠️ 중심을 `Y+H-6` 에 두면 아래 절반이 판 클립에 잘려 **위 절반만** 남는다.
  //     부채는 그렇게 낸다(반원을 따로 그리면 끝이 잘린 살로 보인다).
  if (k > 0.30) {
    LCrays(c, cx, Y + H - 6, 9, 34, 10 + Math.round(k * 16),
      A(g[1], 0.26 * a), -Math.PI / 2, 1);
  }
  // ⑩ **반쪽 로제트** — 부채 위에 겹쳐 가운데 아래에 꼴을 만든다 (유니크부터)
  if (k > 0.55) {
    LCrosette(c, cx, Y + H - 4, 30, k > 0.86 ? 12 : 8, A(g[1], 0.22 * a), 1,
      -Math.PI / 2);
  }
  // ⑪ **중앙 문장 + 좌우로 뻗는 이중선 + 끝 마름모** — 부제 아래 띠의 한복판.
  //   글이 없는 자리라 여기만 마음껏 채운다. (레어부터)
  if (k > 0.20) {
    const my = Y + H * 0.905, er = 8;
    LCcarve(c, (cc, o) => {                       // 문장 — 오목한 4각 별
      cc.moveTo(cx, my - er + o);
      cc.quadraticCurveTo(cx + er * 0.22, my - er * 0.22, cx + er - o, my + o);
      cc.quadraticCurveTo(cx + er * 0.22, my + er * 0.22, cx, my + er - o);
      cc.quadraticCurveTo(cx - er * 0.22, my + er * 0.22, cx - er + o, my + o);
      cc.quadraticCurveTo(cx - er * 0.22, my - er * 0.22, cx, my - er + o);
    }, drk, lit, 1.2);
    const x1 = W * 0.5 - 20;
    const rows = k > 0.62 ? [-2.6, 2.6] : [0];    // 이중선은 유니크부터
    for (const dy of rows) {
      LCcarve(c, (cc, o) => {
        cc.moveTo(cx + er + 4, my + dy + o); cc.lineTo(cx + x1, my + dy + o);
        cc.moveTo(cx - er - 4, my + dy + o); cc.lineTo(cx - x1, my + dy + o);
      }, drk, lit, 1);
      LCdia(c, cx + x1, my + dy, 2.2, A(g[2], 0.50 * a));
      LCdia(c, cx - x1, my + dy, 2.2, A(g[2], 0.50 * a));
    }
    if (k > 0.80) {                               // 문장 둘레의 눈금 (레전더리만)
      LCticks(c, cx, my, er + 4.5, 12, 2.6, A(g[1], 0.26 * a), 1, 0, 3);
    }
  }
  // ⑫ **새김 마름모 사슬** — 글줄 **사이**의 가운데를 가로지른다.
  //   ⚠️ 205~213 띠 안에만 산다(높이 ±3). 이름의 위끝이 215 라 안 닿는다.
  {
    const nd = 3 + 2 * Math.round(k * 3);
    const chain = (yy, half) => {
      LCcarve(c, (cc, o) => {
        for (let i = 0; i < nd; i++) {
          const dx = (i / (nd - 1) - 0.5) * 2 * half;
          const r = i % 2 ? 2.0 : 3.2;
          cc.moveTo(cx + dx, yy - r + o);
          cc.lineTo(cx + dx + r - o, yy);
          cc.lineTo(cx + dx, yy + r - o);
          cc.lineTo(cx + dx - r + o, yy);
          cc.closePath();
        }
      }, drk, lit, 1);
      LCcarve(c, (cc, o) => {                     // 사슬을 꿰는 실
        cc.moveTo(cx - half - 6, yy + o); cc.lineTo(cx + half + 6, yy + o);
      }, drk, lit, 1);
    };
    chain(Y + H * 0.622, W * 0.5 - 46);           // 규칙선 ↔ 이름 사이
    if (k > 0.60) chain(Y + H * 0.885, W * 0.5 - 34);   // 부제 아래 (유니크부터)
  }
  c.restore();
}

/// ⭐ 카드 테가 **제 빛을 낸다** — 가산 합성 세 겹. 블러가 아니라 계조다.
/// ⚠️ **면적이 안 는다.** 칠하는 것은 테 둘레 띠뿐이고(폭 6px 안), 3택은 석 장이
///   동시에 뜨므로 넓게 흐리면 그 비용이 세 배가 된다. 이 저장소의 병목은
///   GPU 채우기다(raster p95 18.24ms · build 0.49ms).
function LCglowRim(c, X, Y, W, H, g, k, t) {
  if (k <= 0.004 || typeof gAdd !== "function") return;
  // ⭐⭐ **숨 쉬는 맥동** — 사용자 요구(「좀 더 **기분 좋은** 느낌으로」).
  //   ⚠️ 밝기만 올리면 눈이 부시고 글이 안 읽힌다. 좋은 느낌은 **움직임**에서
  //     온다 — 다만 **느리고 얕아야** 한다. 3택은 사람이 읽고 고르는 화면이라
  //     빠른 맥동은 깜빡임이 되어 피곤해진다.
  //   ⭐ 주기 `LCT*2` = **14.4초** · 진폭 **±9%**. [LCROT](28.8초)의 정확히
  //     반이라 주기 끝과 처음이 어긋날 자리가 없다(위상 하나에서만 파생).
  const br = 1 + 0.09 * Math.sin(TAU * (t || 0) / (LCT * 2));
  const kk = k * br;
  gAdd(c, (cc) => {
    const rr = (o) => {
      cc.beginPath();
      if (cc.roundRect) cc.roundRect(X - o, Y - o, W + o * 2, H + o * 2, 3 + (o > 0 ? o : 0));
      else cc.rect(X - o, Y - o, W + o * 2, H + o * 2);
    };
    // 밖으로 **네 겹** — 멀수록 넓고 옅다. 한 겹을 세게 하는 것보다 여러 겹이
    // 「은은하면서 깊게」 보인다. 같은 자리에 쌓이므로 면적이 거의 안 는다.
    [[7.2, 7.0, 0.028], [4.4, 5.2, 0.050], [2.4, 3.2, 0.095], [0.6, 1.8, 0.185]]
      .forEach((b) => {
        rr(b[0]); cc.lineWidth = b[1]; cc.strokeStyle = A(g[1], b[2] * kk); cc.stroke();
      });
    // 안쪽 심 — 등급의 **밝은 칸**이다. 레전더리는 그것이 `#FFF3DC`(따뜻한 크림)
    // 이라 번짐이 **따뜻한 쪽**으로 간다 — 흰빛으로 번지면 금이 차가워진다.
    rr(-1.8); cc.lineWidth = 1.4; cc.strokeStyle = A(g[2], 0.26 * kk); cc.stroke();
  });
  // ⭐ **가장자리를 훑는 반짝임** — 테를 따라 밝은 점이 한 바퀴 돈다.
  //   ⚠️ 가늘고 긴 것이라 칠해지는 면적이 거의 안 늘고, 「살아 있다」는 신호는
  //     제일 크다. 한 바퀴가 [LCROT] 라 맥동(14.4초)과 정확히 두 배 관계다.
  if (typeof LCframePt === "function") {
    const ph = ((t || 0) % LCROT) / LCROT;
    for (let i = 0; i < 2; i++) {
      const pt = LCframePt(X + 3, Y + 3, W - 6, H - 6, (ph + i * 0.5) % 1);
      if (!pt) continue;
      gAdd(c, (cc) => {
        const gd = cc.createRadialGradient(pt[0], pt[1], 0, pt[0], pt[1], 11);
        gd.addColorStop(0, A(g[2], 0.55 * kk));
        gd.addColorStop(0.42, A(g[1], 0.20 * kk));
        gd.addColorStop(1, A(g[1], 0));
        cc.fillStyle = gd;
        cc.beginPath(); cc.arc(pt[0], pt[1], 11, 0, TAU); cc.fill();
      });
    }
  }
}

/// ⭐ 판 한가운데의 후광 — 이미 있던 자리에 **세기만** 얹는다(새 면적이 없다).
function LCglowCore(c, cx, cy, r, g, k) {
  if (k <= 0.004 || typeof gAdd !== "function") return;
  gAdd(c, (cc) => {
    const gd = cc.createRadialGradient(cx, cy, 0, cx, cy, r);
    gd.addColorStop(0, A(g[2], 0.20 * k));
    gd.addColorStop(0.28, A(g[1], 0.12 * k));
    gd.addColorStop(1, A(g[1], 0));
    cc.fillStyle = gd;
    cc.beginPath(); cc.arc(cx, cy, r, 0, TAU); cc.fill();
  });
}

/// 여섯 갈래 눈꽃 하나 — 팔 여섯에 곁가지 두 쌍. 크기만 바꿔 큰 문양과 작은
/// 결정에 같이 쓴다(두 벌로 두면 그날로 갈라진다).
/// ⚠️ 획을 **긋기만** 한다 — 칠하면 면이 되어 「결정」이 아니라 「별」로 읽힌다.
function LCiceStar(c, px, py, s, arms) {
  c.beginPath();
  for (let m = 0; m < 6; m++) {
    const an = m * TAU / 6;
    const ca = Math.cos(an), sa = Math.sin(an);
    c.moveTo(px, py); c.lineTo(px + ca * s, py + sa * s);
    for (let b = 0; b < arms; b++) {
      const at = 0.34 + b * 0.28, bl = s * (0.36 - b * 0.10);
      const bx = px + ca * s * at, by = py + sa * s * at;
      for (const sg of [-1, 1]) {
        c.moveTo(bx, by);
        c.lineTo(bx + Math.cos(an + sg * 0.9) * bl, by + Math.sin(an + sg * 0.9) * bl);
      }
    }
  }
}

/// ⭐⭐ 빙의 **새김 문양** — 카드에 새긴 큰 눈꽃과 처마의 고드름 (2026-08-28)
///
/// 사용자 원문: 「'빙' 스킬카드의 경우 **색상은 유지**하고 **카드 자체에 '얼음'
/// 문양을 좀 더 새겨 넣을 것**」
/// ⇒ 결(테에서 자란 바늘)은 **배경**이라 멀리서는 무늬로 안 읽혔다. 여기서 더하는
///   둘은 **새김**이다 — 큰 눈꽃 하나가 판 한가운데를 지나고, 위 처마에서 고드름이
///   내려온다. 새김은 [LCplqCarve] 와 같은 문법이다(검은 골 + 밝은 획).
/// ⚠️ **안 움직인다.** 빙의 정체가 「시간을 한 톨도 안 먹는다」이고, 그 정지가
///   레어(흐름 · 두 박자)와 갈리는 축의 절반이다.
/// ⚠️ 글줄(0.605H 아래)을 안 넘는다 — 눈꽃 반지름을 `aR*0.96` 으로 묶어 둔 까닭.
function LCatFrostCarve(c, X, Y, W, H, cx, ay, aR, g, ink, a, ar) {
  const k = LCes(ar);
  if (k <= 0.01) return;
  c.save();
  c.lineCap = "round"; c.lineJoin = "round";
  // ① 큰 눈꽃 — 판 한가운데. 검은 골을 먼저 긋고 그 위에 밝은 획을 얹는다.
  const R = aR * 0.96 * (0.55 + 0.45 * k);
  LCiceStar(c, cx, ay, R, 2);
  c.strokeStyle = A("#000000", 0.42 * a * k); c.lineWidth = 3.4; c.stroke();
  LCiceStar(c, cx, ay, R, 2);
  c.strokeStyle = ink(0.52 * k); c.lineWidth = 1.3; c.stroke();
  // 눈꽃을 두르는 육각 테 — 「결정면」이 있다고 알린다
  for (const m of [0.62, 0.88]) {
    c.beginPath();
    for (let q = 0; q <= 6; q++) {
      const an = -Math.PI / 2 + q * TAU / 6;
      const qx = cx + Math.cos(an) * R * m, qy = ay + Math.sin(an) * R * m;
      q ? c.lineTo(qx, qy) : c.moveTo(qx, qy);
    }
    c.strokeStyle = A(g[1], (m > 0.7 ? 0.26 : 0.18) * a * k); c.lineWidth = 1;
    c.stroke();
  }
  // ② 고드름 — 위 처마에서 내려온다. **속을 안 채운다**: 채우면 실루엣이 되어
  //   클립아트로 읽힌다(뇌의 번개 기호가 그 자리에서 반려됐다). 얼음은 **자라는
  //   가는 심**이고, 두 모서리와 속심 셋이 그 자람을 그린다.
  for (let i = 0; i < 11; i++) {
    const fx = X + 18 + (W - 36) * (i / 10);
    const L = (11 + LChash(i * 19 + 6) * 21) * k;
    const lean = (LChash(i * 23 + 3) - 0.5) * 5;
    const wd = 1.8 + LChash(i * 29 + 5) * 2.0;
    c.strokeStyle = ink(0.44 * k); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(fx - wd, Y + 14); c.lineTo(fx + lean, Y + 14 + L);
    c.moveTo(fx + wd, Y + 14); c.lineTo(fx + lean, Y + 14 + L);
    c.stroke();
    // 속심 — 얼음은 속이 비쳐야 얼음이다. 심이 모서리보다 밝다
    c.beginPath();
    c.moveTo(fx, Y + 15); c.lineTo(fx + lean * 0.8, Y + 14 + L * 0.84);
    c.strokeStyle = A(g[2], 0.40 * a * k); c.lineWidth = 1; c.stroke();
  }
  c.restore();
}

/// 빙 — **서리 결.** 테 안쪽에서 안으로 자란 바늘 결정. 줄기 하나에 가지 세 쌍.
/// ⚠️⚠️ **시간을 한 톨도 안 먹는다.** 서리는 흐르는 것이 아니라 **앉는 것**이고,
///   그 정지가 레어(흐름 · 두 박자)와 갈리는 자리다. 반짝임조차 안 준다.
function LCatFrost(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  if (ar <= 0.01) return;
  const k = 0.25 + 0.75 * LCes(ar);
  c.save();
  c.lineCap = "round";
  c.strokeStyle = ink(0.46 * ar); c.lineWidth = 1;
  for (let i = 0; i < 30; i++) {
    const sd = i % 4;                              // 0 위 · 1 오른 · 2 아래 · 3 왼
    let p = LChash(i * 5 + 2);
    // ⚠️ 아래 변은 **좌우 끝만** 쓴다 — 가운데는 이름·수치가 서는 자리다.
    if (sd === 2) p = p < 0.5 ? p * 0.30 : 1 - (1 - p) * 0.30;
    // ⚠️⚠️ 첫 판은 최대 36px 였고 결이 테 언저리에만 머물러, 레어와 잉크 자국이
    //   0.86 이나 겹쳤다(2026-08-28 실측). 서리는 **판 안쪽까지 자라야** 레어의
    //   「가운데 판 하나 + 빈 여백」과 자국이 갈린다.
    const L = (20 + LChash(i * 9 + 7) * 40) * k;
    const tilt = (LChash(i * 13 + 5) - 0.5) * 0.7;
    let bx, by, dx, dy;
    if (sd === 0) { bx = X + 14 + p * (W - 28); by = Y + 14; dx = 0; dy = 1; }
    else if (sd === 1) { bx = X + W - 14; by = Y + 14 + p * (H - 28); dx = -1; dy = 0; }
    else if (sd === 2) { bx = X + 14 + p * (W - 28); by = Y + H - 14; dx = 0; dy = -1; }
    else { bx = X + 14; by = Y + 14 + p * (H - 28); dx = 1; dy = 0; }
    const ca = Math.cos(tilt), sa = Math.sin(tilt);
    const ux = dx * ca - dy * sa, uy = dx * sa + dy * ca;   // 줄기 방향
    const vx = -uy, vy = ux;                                // 가지 방향
    c.beginPath();
    c.moveTo(bx, by); c.lineTo(bx + ux * L, by + uy * L);
    for (let j = 1; j <= 3; j++) {                 // 가지 세 쌍 — 밖으로 갈수록 짧다
      const s = L * (0.26 + j * 0.22), bl = L * 0.34 * (1 - (j - 1) * 0.22);
      const px = bx + ux * s, py = by + uy * s;
      for (const sg of [-1, 1]) {
        c.moveTo(px, py);
        c.lineTo(px + (ux * 0.52 + vx * sg * 0.85) * bl, py + (uy * 0.52 + vy * sg * 0.85) * bl);
      }
    }
    c.stroke();
  }
  // 여섯 갈래 결정 — 결의 「끝」에 놓인다. 이것도 안 움직인다.
  // ⚠️ 열둘로 늘렸다(2026-08-28) — 사용자 요구가 「얼음 문양을 좀 더」였고,
  //   같은 무늬를 더 뿌리는 것이 새 어휘를 들이는 것보다 싸고 조용하다.
  for (let i = 0; i < 12; i++) {
    const fx = 0.10 + LChash(i * 17 + 4) * 0.80, fy = 0.10 + LChash(i * 23 + 9) * 0.44;
    const s = (5 + LChash(i * 29 + 1) * 5) * k;
    c.strokeStyle = A(g[2], 0.40 * a * ar); c.lineWidth = 1;
    LCiceStar(c, X + fx * W, Y + fy * H, s, 1);
    c.stroke();
  }
  // ⭐⭐ **날아다니는 결정** — 사용자 요구(「얼음 결정이 날아다니는 거 추가」).
  // ⚠️⚠️ **한 바퀴가 [LCROT]** 이다 — 레어의 흐름([LCT])보다 **네 배 느리다.**
  //   빙의 정체는 「시간을 한 톨도 안 먹는다」였고 그것이 레어와 가르는 축의
  //   절반이었다. 그 축을 **버리지 않고 속도로 지켰다**: 레어는 7.2초에 한 바퀴,
  //   빙은 28.8초에 한 바퀴다. 나란히 놓으면 하나는 흐르고 하나는 **떠 있다.**
  // ⚠️ 위상은 `t/LCROT` 하나에서만 파생한다 — 주기 끝과 처음이 어긋날 자리가 없다.
  {
    const dr = (t % LCROT) / LCROT;
    for (let i = 0; i < 11; i++) {
      const uu = (dr + LChash(i * 7 + 13)) % 1;
      const fx = 0.06 + LChash(i * 11 + 3) * 0.88;
      const fy = 0.04 + uu * 0.54;                 // 위에서 아래로 아주 천천히
      const al = Math.sin(Math.PI * uu) * 0.52 * a * ar;
      if (al <= 0.006) continue;
      const s = (2.6 + LChash(i * 13 + 5) * 3.4) * k;
      c.save();
      c.translate(X + fx * W + Math.sin(uu * TAU + i) * 4, Y + fy * H);
      c.rotate(uu * TAU * 0.5 + i);
      c.strokeStyle = A(g[2], al); c.lineWidth = 1;
      LCiceStar(c, 0, 0, s, 1);
      c.stroke();
      c.restore();
    }
  }
  c.restore();
  LCatFrostCarve(c, X, Y, W, H, cx, ay, aR, g, ink, a, ar);
}

/// **두 점을 잇는** 각진 획의 점 목록 — `vfx.js` 의 `bgJag` 와 같은 문법이다
/// (마디마다 **법선으로** 튕긴다). 어휘를 새로 안 짓고 그쪽을 빌려 왔다.
/// ⚠️⚠️ **두 끝은 안 흔든다.** 끝이 흔들리면 이어진 자리가 풀려 획이 허공에
///   뜨고, 그 순간 방전이 아니라 **낙서**가 된다 — 앞 판이 반려된 원인이
///   정확히 이것이었다(자리를 두르는 호만 그려 두 끝이 아무 데도 안 닿았다).
/// ⚠️ 씨앗은 **마디 번호**에서 온다. 매 프레임 굴리면 지지직이 아니라 잡음이 되고,
///   고정하면 `vfx.js:18002` 가 적은 대로 「얼어붙은 철사」가 된다.
function LCjag(ax, ay, bx, by, sd, jit, n) {
  const N = n || 8, P = [];
  const dx = -(by - ay), dy = bx - ax, L = Math.hypot(dx, dy) || 1;
  for (let s = 0; s <= N; s++) {
    const q = s / N;
    let nx = ax + (bx - ax) * q, ny = ay + (by - ay) * q;
    if (s > 0 && s < N) {
      // 가운데가 제일 크게 튄다 — 끝으로 갈수록 0 이라 이은 자리가 안 풀린다
      const w = Math.sin(Math.PI * q);
      const j = (LChash(sd + s * 13.7) - 0.5) * jit * w;
      nx += dx / L * j; ny += dy / L * j;
    }
    P.push([nx, ny]);
  }
  return P;
}

/// ⭐⭐ **방전 한 가닥** — 넓고 옅은 무리 둘 + 검은 골 + 본색 + **가늘고 흰 심**.
/// ⚠️⚠️ 앞 판은 검은 집 하나에 1px 심뿐이라 **굵기가 안 갈렸다.** 어두운 판에
///   검정을 깔면 아무것도 안 깔린 것과 같다 — 무리는 **색**이라야 방전이 된다.
///   그래서 무리 둘을 **가산**으로 깔고(엔진 `lcGlow()` = `BlendMode.plus` 와
///   같은 문), 그 위에 검은 골로 심을 떼어 낸다.
/// ⚠️ 심은 `w*0.20` 이다 — **밝은 것이 제일 가늘어야** 「탄다」로 읽힌다.
function LCfilament(c, P, w, g, ink, al) {
  if (al <= 0.004 || P.length < 2) return;
  const path = () => {
    c.beginPath();
    P.forEach((q, i) => (i ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
  };
  c.save();
  c.lineCap = "round"; c.lineJoin = "round";
  // ① 무리 — 넓고 옅다. 가산이라 겹치는 자리만 밝아진다(면적이 아니라 겹으로)
  if (typeof gAdd === "function") {
    gAdd(c, (cc) => {
      const pth = () => {
        cc.beginPath();
        P.forEach((q, i) => (i ? cc.lineTo(q[0], q[1]) : cc.moveTo(q[0], q[1])));
      };
      cc.lineCap = "round"; cc.lineJoin = "round";
      pth(); cc.strokeStyle = A(g[1], 0.10 * al); cc.lineWidth = w * 3.4; cc.stroke();
      pth(); cc.strokeStyle = A(g[1], 0.16 * al); cc.lineWidth = w * 1.9; cc.stroke();
    });
  }
  // ② 검은 골 — 무리와 심을 떼어 놓는다. 이것이 없으면 전부 한 덩어리가 된다
  path(); c.strokeStyle = A("#000000", 0.42 * al); c.lineWidth = w; c.stroke();
  // ③ 본색
  path(); c.strokeStyle = ink(0.88 * al); c.lineWidth = w * 0.55; c.stroke();
  // ④ 심 — 제일 가늘고 제일 밝다
  path(); c.strokeStyle = A(g[2], 0.98 * al);
  c.lineWidth = Math.max(0.7, w * 0.20); c.stroke();
  c.restore();
}

/// ⭐⭐ 뇌의 **지지직** — 새김이 아니라 **현상**이다   (2026-08-28 · 2차 개정)
///
/// ⚠️⚠️ 1차는 ⚡ 꼴 폴리곤이었고 「너무 촌스럽다」로 반려됐다. 2차(자리를 두르는
///   호)는 「지지직 거리는 효과가 좀 촌스러워」로 다시 반려됐다. 뜯어 보니 까닭이
///   넷이었고, 넷 다 **모양과 박자**의 문제였다(색은 사용자 확인값이라 안 건드린다):
///     ① **아무 데도 안 이어져 있었다** — 호가 허공에 떠 방전이 아니라 낙서였다
///     ② **굵기가 안 갈렸다** — 심도 무리도 없이 한 겹이었다
///     ③ **가지가 없었다** — 한 줄로 지나가면 그것은 지그재그 기호다
///     ④ **늘 켜져 있었다** — 여덟이 계속 보여 「전기」가 아니라 「무늬」였다
///
/// ⇒ 넷을 이렇게 고쳤다:
///   ① **두 끝이 있다** — 테의 못에서 자리 테로(테→코어), 그리고 못에서 못으로
///     (극↔극). 두 끝이 다 **눈에 보이는 물건** 위에 앉는다. 못은 안 튈 때도
///     남아 있어 「튈 곳」이 늘 보인다.
///   ② **다섯 겹**([LCfilament]) — 넓은 무리 둘 · 검은 골 · 본색 · 가는 흰 심
///   ③ **가지가 갈리고 먼저 죽는다** — 55% 지점에서 갈라져 봉투가 제곱으로 준다
///   ④ **점유율 24%** — 한 마디(`LCT/12` = 0.6초) 안에서 가닥마다 제 창이 있고,
///     그 마디에 튀는 가닥은 절반뿐이다. 어두운 사이가 있어야 번쩍이 번쩍이 된다.
/// ⚠️ 위상은 `t/LCT` **하나**에서만 파생한다 — 주기 끝과 처음이 안 어긋난다.
const LCVSTEP = 12;                    // 마디 수. [LCT] 를 정수로 나눈다
const LCVDUTY = 0.24;                  // 한 마디에서 켜져 있는 시간
function LCatVoltCarve(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  const k = LCes(ar);
  if (k <= 0.01) return;
  const u = (t % LCT) / LCT;
  const ph = u * LCVSTEP;
  const st = Math.floor(ph) % LCVSTEP;           // 마디 번호 — 여기서 모양이 점프
  const f = ph - Math.floor(ph);                 // 마디 안 진행
  const NA = 8;                                  // 못 여덟
  const rIn = aR * 0.66;
  // ⚠️⚠️ 못을 **자리 둘레의 원**에 두면 안 된다. 반지름 `aR*1.30` 짜리 원은
  //   위로는 카드 밖(y=-3)으로 나가고 아래로는 **이름 글줄(0.685H)** 을 밟는다 —
  //   첫 판이 실제로 그랬고, 글자 픽셀 43개가 획에 닿았다. ⇒ 못은 **도해 칸의
  //   안쪽 테**(위 16 ~ 0.55H)를 따라 돈다. 그 테는 글줄 위에서 끝나므로 어느
  //   못도 글자에 안 닿고, 두 끝이 다 「보이는 물건」 위에 앉는 것도 그대로다.
  const bx0 = X + 16, by0 = Y + 16, bw = W - 32, bh = H * 0.55 - 16;
  const anc = (i) => {
    const p = LCframePt(bx0, by0, bw, bh, i / NA + 0.06);
    return [p[0], p[1], Math.atan2(ay - p[1], cx - p[0])];
  };
  c.save();
  // ⓪ 못 — **안 튈 때도 남는다.** 두 끝이 어디인지 늘 보여야 방전이 된다.
  for (let i = 0; i < NA; i++) {
    const p = anc(i);
    LCdia(c, p[0], p[1], 2.0, A(g[1], 0.40 * a * k));
    c.strokeStyle = A(g[1], 0.22 * a * k); c.lineWidth = 1;
    c.beginPath();
    c.arc(p[0], p[1], 3.4, 0, TAU); c.stroke();
  }
  // ① 테 → 코어 — 못에서 자리 테로 내리꽂는다
  for (let i = 0; i < NA; i++) {
    if (LChash(st * 17 + i * 5 + 1) > 0.52) continue;   // 이 마디엔 안 튄다
    const w0 = LChash(st * 23 + i * 7 + 3) * (1 - LCVDUTY);
    const q = (f - w0) / LCVDUTY;
    if (q <= 0 || q >= 1) continue;
    const env = Math.sin(Math.PI * q) * k;
    const p = anc(i);
    // 끝점 — 자리 테 위에서 **못을 마주 보는** 자리. 두 끝이 다 물건 위다.
    const ex = cx - Math.cos(p[2]) * rIn, ey = ay - Math.sin(p[2]) * rIn;
    const sd = st * 31 + i * 11 + 2;
    const P = LCjag(p[0], p[1], ex, ey, sd, aR * 0.20, 8);
    LCfilament(c, P, 3.2, g, ink, 0.95 * env);
    // 가지 — 55% 지점에서 갈라져 **먼저 죽는다**(봉투가 제곱이라 빨리 진다)
    const b = P[Math.round(P.length * 0.55)];
    const bx = b[0] + (LChash(sd + 3.3) - 0.5) * aR * 0.52;
    const by = b[1] + (LChash(sd + 7.1) - 0.5) * aR * 0.42;
    LCfilament(c, LCjag(b[0], b[1], bx, by, sd + 5.9, aR * 0.10, 4), 2.0, g, ink,
      0.75 * env * env);
    // 닿은 자리의 불티 — 끝점이 보이면 「닿았다」가 된다
    LCdot(c, ex, ey, 1.4, A(g[2], 0.95 * env));
  }
  // ② 극 ↔ 극 — 이웃한 못 둘을 잇는다. 이쪽은 더 드물고 더 가늘다
  for (let i = 0; i < NA; i++) {
    if (LChash(st * 29 + i * 13 + 7) > 0.30) continue;
    const w0 = LChash(st * 37 + i * 3 + 5) * (1 - LCVDUTY);
    const q = (f - w0) / LCVDUTY;
    if (q <= 0 || q >= 1) continue;
    const env = Math.sin(Math.PI * q) * k;
    const p = anc(i), n2 = anc((i + 1) % NA);
    LCfilament(c, LCjag(p[0], p[1], n2[0], n2[1], st * 41 + i * 17, aR * 0.16, 7),
      2.4, g, ink, 0.80 * env);
  }
  // ③ 판을 가로지르는 심 하나 — 위 처마의 두 못을 잇는다. 제일 드물다
  {
    const w0 = LChash(st * 43 + 11) * (1 - LCVDUTY);
    const q = (f - w0) / LCVDUTY;
    if (q > 0 && q < 1 && LChash(st * 47 + 19) < 0.34) {
      const env = Math.sin(Math.PI * q) * k;
      const yy = Y + H * 0.085;
      LCfilament(c, LCjag(X + 18, yy, X + W - 18, yy, st * 53 + 3, 11, 9),
        2.6, g, ink, 0.72 * env);
    }
  }
  c.restore();
}

/// 뇌 — **지직거리는 꺾인 선.** 줄기 다섯이 차례로 **좁게** 튄다.
/// ⚠️ 켜지는 창이 좁아야(`LCbump` 의 지수 12) 「깜빡인다」가 되고, 넓으면
///   「밝아졌다 어두워진다」가 되어 레전더리의 매끈한 회전과 같은 결이 된다.
/// ⚠️ 꺾인 자리는 [LChash] 가 낸다 — 난수가 아니라 **번호**라 매번 같은 번개다.
function LCatVolt(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  if (ar <= 0.01) return;
  const u = (t % LCT) / LCT;
  c.save();
  c.lineCap = "round"; c.lineJoin = "miter";
  for (let i = 0; i < 5; i++) {
    const fl = LCbump((u + i / 5) % 1, 12) * LCes(ar);
    // 전극 — 켜지지 않아도 **자리는 남는다**. 「튈 곳」이 늘 보여야 한다.
    const an = -Math.PI / 2 + i * TAU / 5 + 0.30;
    const r0 = aR * (1.06 + 0.16 * LChash(i * 3 + 1));
    const ex = cx + Math.cos(an) * r0, ey = ay + Math.sin(an) * r0;
    LCtri(c, ex, ey, an + Math.PI, aR * 0.15, aR * 0.048, A(g[1], 0.46 * a * ar));
    if (fl <= 0.02) continue;
    // 줄기 — 전극에서 자리 테까지. 마디마다 옆으로 꺾인다.
    const r1 = aR * 0.70;
    const dx = (cx + Math.cos(an) * r1) - ex, dy = (ay + Math.sin(an) * r1) - ey;
    const nx = -dy, ny = dx;
    const pt = [];
    for (let j = 0; j <= 7; j++) {
      const s = j / 7, w = (LChash(i * 31 + j * 7 + 3) - 0.5) * (j && j < 7 ? 0.30 : 0);
      pt.push([ex + dx * s + nx * w, ey + dy * s + ny * w]);
    }
    const line = () => {
      c.beginPath();
      pt.forEach((p, j) => (j ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
    };
    line(); c.strokeStyle = A("#000000", 0.42 * fl); c.lineWidth = 4.2; c.stroke();
    line(); c.strokeStyle = ink(0.95 * fl); c.lineWidth = 2.0; c.stroke();
    line(); c.strokeStyle = A(g[2], 0.90 * fl); c.lineWidth = 1; c.stroke();
    // 갈래 — 셋째 마디에서 하나 튄다. 갈라져야 「방전」이고 안 갈리면 「선」이다.
    const b = pt[3], b2 = pt[4];
    c.strokeStyle = A(g[2], 0.62 * fl); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(b[0], b[1]);
    c.lineTo(b[0] + (b2[1] - b[1]) * 0.9 + (b2[0] - b[0]) * 0.4,
      b[1] - (b2[0] - b[0]) * 0.9 + (b2[1] - b[1]) * 0.4);
    c.stroke();
  }
  c.restore();
  LCatVoltCarve(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar);
}

/// 독 — **맺혀 떨어지는 결.** 방울이 부풀었다 꺼지고, 자리 밑에서 셋이 떨어진다.
/// ⚠️ 방울은 **속이 빈 고리 + 한쪽의 점**이다 — 꽉 찬 원은 별점과 같아 보인다.
function LCatToxin(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  if (ar <= 0.01) return;
  const u = (t % LCT) / LCT, k = LCes(ar);
  c.save();
  // ⚠️ 열여덟 → **스물여덟**(2026-08-28 사용자 요구 「독 카드도 마찬가지」).
  //   여기도 개수로 풀었다 — 방울 하나의 반지름은 그대로다.
  for (let i = 0; i < 28; i++) {
    const fx = 0.07 + LChash(i * 7 + 2) * 0.86;
    let fy = 0.08 + LChash(i * 11 + 5) * 0.48;
    if (fx > 0.22 && fx < 0.78 && fy > 0.44) fy -= 0.22;   // 자리 아래를 비운다
    const bs = 0.55 + 0.45 * LCbump((u + LChash(i * 13 + 3)) % 1, 3);
    const rr = (1.6 + LChash(i * 17 + 9) * 3.4) * bs * k;
    if (rr <= 0.3) continue;
    const px = X + fx * W, py = Y + fy * H;
    LCring(c, px, py, rr, A(g[1], 0.46 * a * ar), 1);
    LCdot(c, px - rr * 0.34, py - rr * 0.34, rr * 0.26, A(g[2], 0.44 * a * ar));
  }
  // 떨어지는 방울 셋 — 자리 밑에서 맺혀 떨어진다. 크기가 양끝에서 0 이라
  // 주기 끝과 처음이 같다(알파가 아니라 **크기**로 나고 든다).
  for (let i = 0; i < 3; i++) {
    const uu = (u + i / 3) % 1;
    const rr = 2.6 * Math.sin(Math.PI * uu) * k;
    if (rr <= 0.2) continue;
    const px = cx + (i - 1) * aR * 0.46;
    const py = ay + aR * 0.78 + uu * aR * 0.52;
    LCdot(c, px, py, rr, A(g[1], 0.55 * a * ar));
    LCtri(c, px, py - rr * 1.9, -Math.PI / 2, rr * 1.5, rr * 0.7, A(g[1], 0.40 * a * ar));
  }
  c.restore();
}

/// 풍 — **한 방향으로 흐르는 결.** 긴 결 다섯이 카드를 비스듬히 지나고, 그
/// 파선이 한 주기에 **정확히 한 마디** 미끄러진다(주기 끝과 처음이 같다).
/// ⚠️ 결이 **한 방향뿐**이라야 바람이다 — 좌우로 나뉘면 「빗금」이 된다.
function LCatGale(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  if (ar <= 0.01) return;
  const u = (t % LCT) / LCT, k = LCes(ar), per = 26;
  c.save();
  c.lineCap = "butt";
  if (c.setLineDash) c.setLineDash([11 * k + 0.5, per - 11 * k - 0.5]);
  c.lineDashOffset = -u * per;
  // ⚠️ 다섯 → **아홉**(2026-08-28). 사용자께서 풍만 「**연하게**」라 하셨으므로
  //   **줄 수만 늘리고 알파를 내렸다**(0.44 → 0.34) — 세게가 아니라 은은하게다.
  for (let i = 0; i < 9; i++) {
    const fy = 0.075 + i * 0.062;
    const y0 = Y + fy * H, sag = (i % 2 ? -1 : 1) * H * 0.055;
    c.strokeStyle = ink(0.34 * ar); c.lineWidth = i === 4 ? 1.6 : 1.0;
    c.beginPath();
    c.moveTo(X + 12, y0 + H * 0.05);
    c.quadraticCurveTo(X + W * 0.5, y0 + sag, X + W - 12, y0 - H * 0.05);
    c.stroke();
  }
  if (c.setLineDash) c.setLineDash([]);
  c.lineDashOffset = 0;
  // 실려 가는 티끌 — 바람은 **무엇이 실려 가야** 보인다. 아주 옅다.
  for (let i = 0; i < 16; i++) {
    const uu = (u + LChash(i * 5 + 9)) % 1;
    const fy = 0.08 + LChash(i * 7 + 2) * 0.46;
    const al = Math.sin(Math.PI * uu) * 0.30 * a * ar;
    if (al <= 0.004) continue;
    LCdot(c, X + 10 + (W - 20) * uu, Y + fy * H, 0.8 + LChash(i * 11 + 4) * 0.9,
      A(g[2], al));
  }
  // 소용돌이 둘 — 열린 채로 돈다. 배경 고리와 같은 시계를 읽는다.
  LCswirl(c, X + W * 0.19, Y + H * 0.155, aR * 0.06, aR * 0.30 * k, 2,
    A(g[1], 0.30 * a * ar), TAU * t / LCROT, 1.5);
  LCswirl(c, X + W * 0.82, Y + H * 0.475, aR * 0.05, aR * 0.24 * k, 2,
    A(g[1], 0.26 * a * ar), -TAU * t / LCROT, 1.5);
  c.restore();
}

/// 무 — **결이 없다.** 매끈한 면 한 장이 도해를 덮는다.
/// ⚠️⚠️ 이 하나가 「무채색이라 일반과는 조금 다른 느낌으로」의 답이다. 일반은
///   **선뿐**이고 문양이 맨몸으로 뜨는데, 무는 **면**이 있다 — 색이 같아도
///   실루엣이 다르므로 작게 줄여도 갈린다.
/// ⚠️ **불투명하면 안 된다**(레어 판의 규약과 같다). 뒤의 선이 비쳐야
///   「비어 있다」가 아니라 「덮였다」가 된다.
/// ⚠️ 등장은 알파가 아니라 **높이**다 — 면이 위아래로 벌어진다.
function LCatNumb(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar) {
  const k = LCes(ar);
  if (k <= 0.01) return;
  const sw = W * 0.80, sh = H * 0.38 * k;
  const x0 = cx - sw / 2, y0 = ay - sh / 2;
  c.save();
  // ⚠️⚠️ **반투명이라야 한다.** 첫 판은 가운데를 0.62 로 칠했더니 도해를 통째로
  //   지워 카드가 일반보다 **비어 보였다**(2026-08-28 실측) — 레어 판이 이미
  //   적어 둔 그 함정이다(「판이 불투명하면 안 된다」). 면은 **덮는 것**이지
  //   지우는 것이 아니다.
  const gd = c.createLinearGradient(0, y0, 0, y0 + sh);
  gd.addColorStop(0, A(g[0], 0.16 * a));
  gd.addColorStop(0.42, A(g[0], 0.34 * a));
  gd.addColorStop(1, A(g[0], 0.12 * a));
  c.beginPath();
  if (c.roundRect) c.roundRect(x0, y0, sw, sh, 5); else c.rect(x0, y0, sw, sh);
  c.fillStyle = gd; c.fill();
  // 모서리 두 획 — 어두운 홈 + 그 안쪽 밝은 모서리. 카드의 음각 문법 그대로다.
  c.strokeStyle = A("#000000", 0.46 * a); c.lineWidth = 2.0; c.stroke();
  c.beginPath();
  if (c.roundRect) c.roundRect(x0 + 1.4, y0 + 1.4, sw - 2.8, sh - 2.8, 4);
  else c.rect(x0 + 1.4, y0 + 1.4, sw - 2.8, sh - 2.8);
  c.strokeStyle = ink(0.40); c.lineWidth = 1; c.stroke();
  // 윗면 한 줄만 밝다 — 면이라는 것을 이 한 획이 말한다. 그리고 **여기서 끝난다.**
  c.strokeStyle = A(g[2], 0.34 * a * k); c.lineWidth = 1;
  c.beginPath();
  c.moveTo(x0 + 8, y0 + 3.4); c.lineTo(x0 + sw - 8, y0 + 3.4); c.stroke();
  // 아랫면 한 줄은 어둡다 — 위가 밝고 아래가 어두워야 「누운 면」이 된다
  c.strokeStyle = A("#000000", 0.34 * a * k); c.lineWidth = 1;
  c.beginPath();
  c.moveTo(x0 + 8, y0 + sh - 3.4); c.lineTo(x0 + sw - 8, y0 + sh - 3.4); c.stroke();
  c.restore();
}

// ── 속성의 자리 — 문양이 앉는 판 ──────────────────────────────────────────
//
// ⚠️ 자리는 **일반·레어와 같은 중심·같은 반지름**에 선다(`cx`·`ay`·`aR*0.72`).
//   갈리는 것은 **실루엣**뿐이다 — 여섯이 서로 다르고, 레어의 눈금 마름모와도
//   다르다. 등장은 이 파일의 규약대로 **알파가 아니라 크기**다.
//   `(c, cx, cy, R, g, ink, t, a, rev)`

/// 자리 넷이 같이 쓰는 **안쪽 격자** — 레어의 눈금 마름모가 이미 쓰는 그 겹이다.
/// ⚠️⚠️ **이것이 없으면 속성 카드가 일반보다 비어 보인다**(2026-08-28 실측).
///   레어 판이 시끄럽지 않으면서도 꽉 찬 까닭이 면 하나가 아니라 **면 + 격자 +
///   음각 테** 셋을 다 갖기 때문이다. 속성 자리도 같은 셋을 갖되 **실루엣만**
///   다르다 — 그래야 「기존 카드와 큰 차이가 없는」 형제로 읽힌다.
/// ⚠️ 무만 이걸 안 쓴다 — 「결이 없다」가 그 속성의 전부이므로.
function LCatGrid(c, path, cx, cy, RR, g, a, step) {
  c.save(); path(0.94); c.clip();
  LClattice(c, cx - RR, cy - RR, RR * 2, RR * 2, RR * (step || 0.26), A(g[1], 0.17 * a), 1);
  c.restore();
}

/// 염 — **불꽃 자리.** 갈래 여덟이 한 방향으로 눕는다.
function LCatSeatEmber(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r), N = 8;
  const path = (m) => {
    c.beginPath();
    for (let k = 0; k <= N; k++) {
      const a0 = -Math.PI / 2 + k * TAU / N;
      const px = cx + Math.cos(a0) * RR * m, py = cy + Math.sin(a0) * RR * m;
      if (!k) { c.moveTo(px, py); continue; }
      const am = a0 - TAU / N / 2 + 0.22;          // 골이 한쪽으로 밀린다
      c.quadraticCurveTo(cx + Math.cos(am) * RR * m * 0.54,
        cy + Math.sin(am) * RR * m * 0.68, px, py);
    }
    c.closePath();
  };
  LCplqFace(c, path, cx, cy, RR, g, a, k);
  LCatGrid(c, path, cx, cy, RR, g, a, 0.24);
  LCplqCarve(c, path, ink, a);
  path(0.72); c.strokeStyle = A(g[1], 0.24 * a); c.lineWidth = 1; c.stroke();
  for (let q = 0; q < N; q++) {                    // 갈래 끝의 불씨
    const an = -Math.PI / 2 + q * TAU / N;
    LCdot(c, cx + Math.cos(an) * RR * 0.93, cy + Math.sin(an) * RR * 0.93,
      q % 2 ? 1.0 : 1.7, A(g[2], 0.62 * a));
  }
}

/// 빙 — **육각 결정 판.** 면이 갈리고 꼭짓점마다 바늘이 밖으로 문다.
/// ⚠️ 못을 안 박는다 — 서리에는 박은 자국이 없다(레어의 눈금 마름모와 갈리는 자리).
function LCatSeatFrost(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r);
  const V = (k, m) => {
    const an = -Math.PI / 2 + k * TAU / 6;
    return [cx + Math.cos(an) * RR * m, cy + Math.sin(an) * RR * m];
  };
  const hex = (m) => {
    c.beginPath();
    for (let k = 0; k < 6; k++) { const p = V(k, m); k ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); }
    c.closePath();
  };
  LCplqFace(c, hex, cx, cy, RR, g, a, k);
  LCatGrid(c, hex, cx, cy, RR, g, a, 0.22);
  // 갈린 면 — 꼭짓점에서 가운데로. 면이 갈려야 「결정」이 된다.
  c.save(); hex(0.94); c.clip();
  c.strokeStyle = A(g[1], 0.30 * a); c.lineWidth = 1;
  c.beginPath();
  for (let k = 0; k < 6; k++) {
    const p = V(k, 0.98);
    c.moveTo(p[0], p[1]); c.lineTo(cx, cy);
    const q = V(k + 0.5, 0.62);
    c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]);
  }
  c.stroke();
  c.restore();
  LCplqCarve(c, hex, ink, a);
  hex(0.72); c.strokeStyle = A(g[1], 0.24 * a); c.lineWidth = 1; c.stroke();
  for (let k = 0; k < 6; k++) {                    // 꼭짓점 여섯의 바늘
    const an = -Math.PI / 2 + k * TAU / 6, p = V(k, 1);
    // 바늘 — 육각 밖으로 **길게** 문다. 레어의 마름모는 꼭짓점에서 끝나고
    // 밖으로 아무것도 안 뻗는다 — 갈리는 자리가 여기다.
    LCspoke(c, cx, cy, an, RR, RR * 1.52, A(g[2], 0.55 * a), 1.4);
    for (const sg of [-1, 1])                      // 바늘의 곁가지 한 쌍
      LCspoke(c, cx + Math.cos(an) * RR * 1.18, cy + Math.sin(an) * RR * 1.18,
        an + sg * 0.9, 0, RR * 0.26, A(g[2], 0.40 * a), 1);
    LCdia(c, p[0], p[1], 1.6, A(g[2], 0.62 * a));
  }
}

/// 뇌 — **방전 고리.** 끊긴 고리 두 도막 사이를 꺾인 선이 튄다.
/// ⚠️ 고리가 **닫히면 안 된다** — 닫힌 고리는 레전더리의 황도 고리와 같은 어휘다.
function LCatSeatVolt(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r);
  const face = (m) => { c.beginPath(); c.arc(cx, cy, Math.max(0.02, RR * m), 0, TAU); };
  LCplqFace(c, face, cx, cy, RR, g, a, 0.60 * k);
  LCatGrid(c, face, cx, cy, RR, g, a, 0.26);
  // 계기의 눈금 — 「재는 물건」의 결이 여기서도 난다
  LCticks(c, cx, cy, RR * 0.62, 24, RR * 0.10, A(g[1], 0.30 * a), 1, 0, 6);
  // 두 도막 — 위아래가 열려 있다
  c.lineCap = "butt";
  for (const sg of [0, 1]) {
    for (const [m, lw, al] of [[1.0, 2.2, 0.55], [0.86, 1.2, 0.30]]) {
      c.strokeStyle = sg ? ink(al) : A("#000000", 0.50 * a);
      c.lineWidth = sg ? lw : lw + 1.2;
      c.beginPath();
      c.arc(cx, cy, RR * m, -Math.PI * 0.78, -Math.PI * 0.22); c.stroke();
      c.beginPath();
      c.arc(cx, cy, RR * m, Math.PI * 0.22, Math.PI * 0.78); c.stroke();
    }
  }
  // 전극 둘 — 좌우에서 마주 본다
  for (const sg of [-1, 1]) {
    LCtri(c, cx + sg * RR * 0.96, cy, sg > 0 ? Math.PI : 0, RR * 0.26, RR * 0.10,
      A(g[1], 0.92 * a));
    LCdot(c, cx + sg * RR * 0.96, cy, 1.8, A(g[2], 0.72 * a));
  }
  // 튀는 선 — 주기당 두 번, 창이 좁다. 꺾인 자리는 번호에서 낸다.
  const fl = LCbump((t % LCT) / LCT * 2 % 1, 10) * r;
  if (fl > 0.02) {
    const L = RR * 1.42;
    c.lineJoin = "miter";
    const line = () => {
      c.beginPath();
      for (let j = 0; j <= 6; j++) {
        const s = j / 6, x2 = cx - L / 2 + L * s;
        const y2 = cy + (LChash(j * 9 + 2) - 0.5) * (j && j < 6 ? RR * 0.42 : 0);
        j ? c.lineTo(x2, y2) : c.moveTo(x2, y2);
      }
    };
    line(); c.strokeStyle = A("#000000", 0.40 * fl); c.lineWidth = 4; c.stroke();
    line(); c.strokeStyle = A(g[1], 0.95 * fl); c.lineWidth = 1.8; c.stroke();
    line(); c.strokeStyle = A(g[2], 0.92 * fl); c.lineWidth = 1; c.stroke();
  }
}

/// 독 — **세 잎 방울 판.** 여섯 중 혼자 둥글고 각이 하나도 없다.
function LCatSeatToxin(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r);
  const lobe = (m) => {
    c.beginPath();
    for (let i = 0; i <= 72; i++) {
      const th = -Math.PI / 2 + i / 72 * TAU;
      const rr = RR * m * (0.76 + 0.24 * Math.cos(3 * (th + Math.PI / 2)));
      const px = cx + Math.cos(th) * rr, py = cy + Math.sin(th) * rr;
      i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath();
  };
  LCplqFace(c, lobe, cx, cy, RR, g, a, k);
  LCatGrid(c, lobe, cx, cy, RR, g, a, 0.24);
  LCplqCarve(c, lobe, ink, a);
  lobe(0.74); c.strokeStyle = A(g[1], 0.22 * a); c.lineWidth = 1; c.stroke();
  // 잎 셋의 눈 — 방울이 셋이라는 것을 점이 못 박는다
  for (let k = 0; k < 3; k++) {
    const th = -Math.PI / 2 + k * TAU / 3;
    LCring(c, cx + Math.cos(th) * RR * 0.62, cy + Math.sin(th) * RR * 0.62,
      RR * 0.13, A(g[2], 0.52 * a), 1);
  }
  // 맺힌 끝 — 아래로 한 방울. 「떨어지려는 것」이 실루엣에 남는다.
  const dy = cy + RR * 1.02;
  LCtri(c, cx, dy - RR * 0.10, Math.PI / 2, RR * 0.22 * r, RR * 0.085 * r, A(g[1], 0.88 * a));
  LCdot(c, cx, dy + RR * 0.12, RR * 0.075 * r, A(g[2], 0.70 * a));
}

/// 풍 — **열린 소용돌이 자리.** 초승 호 둘이 서로 반대로 감기고 두 곳이 열린다.
/// ⚠️ 닫으면 고리가 되어 뇌·레전더리와 어휘가 붙는다 — **열린 채로** 둔다.
function LCatSeatGale(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r);
  const face = (m) => { c.beginPath(); c.arc(cx, cy, Math.max(0.02, RR * m * 0.86), 0, TAU); };
  LCplqFace(c, face, cx, cy, RR * 0.86, g, a, 0.66 * k);
  LCatGrid(c, face, cx, cy, RR * 0.86, g, a, 0.24);
  LCticks(c, cx, cy, RR * 0.70, 30, RR * 0.08, A(g[1], 0.28 * a), 1, TAU * t / LCROT, 5);
  c.lineCap = "round";
  for (const sg of [-1, 1]) {
    const a0 = sg > 0 ? -Math.PI * 0.46 : Math.PI * 0.54;
    for (const [m, lw, al] of [[1.0, 2.4, 0.90], [0.80, 1.4, 0.52]]) {
      c.strokeStyle = A("#000000", 0.46 * a); c.lineWidth = lw + 1.4;
      c.beginPath(); c.arc(cx, cy, RR * m, a0, a0 + Math.PI * 0.86 * r); c.stroke();
      c.strokeStyle = ink(al); c.lineWidth = lw;
      c.beginPath(); c.arc(cx, cy, RR * m, a0, a0 + Math.PI * 0.86 * r); c.stroke();
    }
    // 깃 — 호의 끝에서 밖으로 흘러 나간다
    const ae = a0 + Math.PI * 0.86 * r;
    LCtri(c, cx + Math.cos(ae) * RR, cy + Math.sin(ae) * RR, ae + Math.PI / 2,
      RR * 0.26 * r, RR * 0.070 * r, A(g[1], 0.90 * a));
    LCdot(c, cx + Math.cos(a0) * RR, cy + Math.sin(a0) * RR, 1.7, A(g[2], 0.68 * a));
  }
  LCdashring(c, cx, cy, RR * 0.56, A(g[1], 0.26 * a), 1, [2.2, 5.0], TAU * t / LCROT);
}

/// 무 — **민판.** 원 하나, 음각 두 획, 그리고 **아무것도 더 없다.**
/// ⚠️⚠️ 못도 눈금도 격자도 뇌문도 안 붙인다 — 「결이 없다」가 이 속성의 전부이고,
///   장식을 하나라도 붙이면 그 순간 다른 다섯과 같은 말을 하게 된다.
function LCatSeatNumb(c, cx, cy, R, g, ink, t, a, rev, k) {
  const r = LCes(rev == null ? 1 : rev);
  if (r <= 0.01) return;
  const RR = Math.max(0.5, R * r);
  const face = (m) => { c.beginPath(); c.arc(cx, cy, Math.max(0.02, RR * m), 0, TAU); };
  LCplqFace(c, face, cx, cy, RR, g, a, k);
  LCplqCarve(c, face, ink, a);
}

// ── 속성 여섯의 표 — **카드도 표도 이 하나를 읽는다** ─────────────────────
//
// `col`   [어두움, 바탕, 밝음] — 엔진 `cel_tones.dart` 의 정체색 그대로다.
// `flow`  획 안을 흐르는 색 고리. **`hues` 가 1 이면 위상이 고정**이라 안 움직인다.
// `bg`    판의 바탕. 등급 넷과 같은 밝기 띠(광도 0.004~0.006) 안에서 온도만 다르다.
// `skill` 그 속성의 기본공격 이름(`lib/data/characters.dart` 의 `kGrantedBasicIds`) —
//         카드에 뜨는 이름을 **지어내지 않으려고** 도감에서 가져왔다.
// `sr`    자리의 반지름(`aR` 배). ⚠️⚠️ **꼴마다 다르다.** 레어의 눈금 마름모는
//         꼭짓점이 `aR*0.72` 라도 **안쪽 반지름이 그 0.71 배**뿐이라 밧줄 고리가
//         네 곳에서 삐져나온다. 육각·세잎처럼 살진 꼴을 같은 값에 두면 자리가
//         배경 도해를 **통째로 덮어** 카드가 일반보다 **비어 보인다**
//         (2026-08-28 실측에서 실제로 그랬다) — 그래서 살진 꼴은 반지름을 줄였다.
// `sk`    자리의 **면 무게.** 정체색의 어두운 칸이 등급 넷보다 훨씬 원색이라
//         (`#5E1A06` 주황 · `#123D1C` 초록) 같은 알파로 칠하면 면이 튄다.
const LCATTR = {
  ember: {nm: "염", bg: "#150C08", hues: 2, skill: "순포", sr: 0.62, sk: 0.62,
    col: ["#5E1A06", "#FF6A1E", "#FFE7CC"],
    flow: ["#E8541A", "#FF8A3A", "#FF6A1E", "#FFA657"],
    grain: LCatEmber, seat: LCatSeatEmber, sh: "불꽃 혀",
    gnm: "불꽃 혀 열둘 + 올라오는 잉걸",
    snm: "한쪽으로 눕는 갈래 여덟",
    vs: "겹치는 등급이 없다 — 주황은 넷 중 아무도 안 쓴다"},
  frost: {nm: "빙", bg: "#0A1219", hues: 1, skill: "서리결정", sr: 0.58, sk: 0.92,
    col: ["#0E2A4E", "#2673D9", "#D6EDFF"],
    flow: ["#1F5FAD", "#81BDF8", "#2673D9"],
    grain: LCatFrost, seat: LCatSeatFrost, sh: "서리 결정 · 정지",
    gnm: "테에서 안으로 자란 바늘 결정 · 안 움직인다",
    snm: "육각 결정 판 — 못이 없다",
    vs: "레어 와 색상각 6.0° · 명도 11.0%p · 대비 1.66:1 — 색만으로는 못 가른다. **다른 픽셀 24.4%**(전 18.0%)를 만든 것은 얼음 문양과 날리는 결정이다"},
  volt: {nm: "뇌", bg: "#14110A", hues: 1, skill: "뇌광", sr: 0.66, sk: 0.70,
    col: ["#685B08", "#FFF585", "#FFFDEB"],
    flow: ["#F9DD24", "#FFFBC2", "#FFF585"],
    grain: LCatVolt, seat: LCatSeatVolt, sh: "꺾인 방전 · 깜빡임",
    gnm: "줄기 다섯이 차례로 좁게 튄다",
    snm: "끊긴 고리 + 마주 선 전극 둘",
    vs: "레전더리 와 색상각 18.9° · 명도 11.6%p — 노랑이 올라오고 금이 주황으로 내려가 **양쪽으로** 갈렸다(다른 픽셀 53.0 → 62.6%)"},
  toxin: {nm: "독", bg: "#0A140D", hues: 2, skill: "독침", sr: 0.66, sk: 0.66,
    col: ["#123D1C", "#57D96B", "#E6FFEA"],
    flow: ["#3FA84E", "#7BE88C", "#57D96B", "#9BF0A8"],
    grain: LCatToxin, seat: LCatSeatToxin, sh: "맺히는 방울",
    gnm: "부푸는 방울 열여덟 + 떨어지는 방울 셋",
    snm: "세 잎 방울 판 — 각이 하나도 없다",
    vs: "겹치는 등급이 없다 — 초록은 넷 중 아무도 안 쓴다"},
  gale: {nm: "풍", bg: "#091513", hues: 2, skill: "바람원반", sr: 0.64, sk: 0.80,
    col: ["#0F3D3A", "#5FD9C6", "#E4FFFA"],
    flow: ["#3FB8A6", "#8FEFDC", "#5FD9C6", "#B0F5E8"],
    grain: LCatGale, seat: LCatSeatGale, sh: "흐르는 결",
    gnm: "한 방향으로 미끄러지는 결 다섯 + 소용돌이 둘",
    snm: "열린 초승 호 둘 — 닫히지 않는다",
    vs: "⚠️ 사용자께서 「연두」라 하셨는데 엔진 정체색은 청록입니다(아래 판정 자리)"},
  numb: {nm: "무", bg: "#101014", hues: 1, skill: "빛파동", sr: 0.48, sk: 1.00,
    col: ["#2B2B33", "#9A9AA8", "#DCDCE8"],
    flow: ["#7E7E8C", "#B4B4C2", "#8E8E9C"],
    grain: LCatNumb, seat: LCatSeatNumb, sh: "면 · 결이 없다",
    gnm: "결이 없다 — 매끈한 면 한 장이 도해를 덮는다",
    snm: "민판 — 원 하나, 음각 두 획, 그것뿐",
    vs: "일반 과 색상각 163.7° — 일반이 **놋쇠**로 가서 무채색 ↔ 재질로 갈린다(다른 픽셀 7.2 → 30.7%)"},
};
/// 화면에 서는 차례. ⚠️ **암은 없다** — 사용자 보류다.
const LCATORDER = ["ember", "frost", "volt", "toxin", "gale", "numb"];

// ── 카드 한 장 ────────────────────────────────────────────────────────────
//
// `op` 가 **여는 연출의 층**이다. 정지 칸은 전부 1 이고(빛만 0), 여는 칸은
// 위상에서 낸다 — 같은 함수가 둘을 다 그리므로 「연출이 끝나면 저 그림이 된다」가
// 코드에서 보장된다(두 벌로 두면 그날로 갈라진다).
//   plate 판이 놓인 정도 · split 두 짝이 갈라진 정도 · carve 테가 그어진 정도
//   art   배경 도해 · emb 문장 · txt 글자 · light 여는 빛(정지 칸은 0) · u 진행
function LCcard(c, X, Y, W, H, d, t, op) {
  // ⭐⭐ **속성 카드도 이 함수를 탄다.** `d.at` 이 있으면 등급 사다리 대신
  //   [LCATTR] 한 줄이 색·결·자리를 들고, 뼈대는 **일반·레어의 공통 블록**
  //   (`R = 0`)을 한 줄도 안 고치고 그대로 쓴다 — 두 벌로 두면 그날로 갈라진다.
  const AT = d.at ? LCATTR[d.at] : null;
  const R = AT ? 0 : LCRANK.findIndex((r) => r.id === d.rank);
  // ⚠️ `d.col`·`d.flow`·`d.bg` 는 **갤러리가 색만 갈아 끼우는 문**이다(일반의
  //   색을 옮기는 안을 전·후로 나란히 놓으려면 이 문이 있어야 한다). 실제
  //   카드는 아무도 안 넘기므로 등급 넷의 그림은 한 픽셀도 안 바뀐다.
  const RK = LCRANK[R], g = d.col || (AT ? AT.col : RK.col), a = op.plate;
  if (a <= 0.001) return;
  const cx = X + W / 2;
  const ay = Y + H * 0.335, aR = W * 0.38;
  const u = op.u == null ? 1 : op.u;
  const lit = op.light || 0;
  // ⭐⭐ **발광 사다리** — 등급이면 [LCLIT], 속성이면 [LCATLIT] 한 값이다.
  //   ⚠️ 여는 동안에는 `u` 를 따라 차오른다 — 다 열리기 전에 만개하면 「빛이
  //     났다」가 아니라 「처음부터 밝았다」로 읽힌다.
  const GLOW = (AT ? LCATLIT : LCLIT[RK.id]) * a * LCes(u);

  // ⭐ **획 색.** 등급의 좁은 흐름 하나를 카드 안의 획이 전부 나눠 쓴다.
  //   ⚠️ 일반(`hues===1`)은 위상이 **고정**이라 안 움직인다 — 「색 하나 ·
  //     움직임 없음」이 등급 정의이고, 명도 흐름은 움직임이 아니다.
  // ⚠️ 속성 여섯 중 **빙·뇌·무는 `hues` 가 1** 이라 위상이 고정이고 안 움직인다 —
  //   그 정지가 겹칠 자리 셋(빙↔레어 · 뇌↔레전더리 · 무↔일반)을 가르는 손잡이다.
  const ph = (AT ? AT.hues : RK.hues) > 1 ? t / LCT : 0.12;
  const FLOW = d.flow || (AT ? AT.flow : RK.flow);
  const ink = (al, sh) => LCflowL(c, X, Y + H, X + W, Y, FLOW, al * a, ph + (sh || 0));

  c.save();
  c.globalAlpha = 1;

  // ── 판 ──
  // 바탕색은 등급마다 아주 조금씩 다르다. **채도가 아니라 온도**다 —
  // 무채 → 청 → 자 → 금. 넷을 나란히 놓았을 때 급이 「올라간다」로 읽히게.
  // ⚠️ 속성 여섯도 **같은 밝기 띠**(광도 0.004~0.006) 안에 있다 — 온도만 다르다.
  const BG = d.bg || (AT ? AT.bg : ["#0F1116", "#0C1119", "#100C18", "#130F09"][R]);
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
    // ⚠️⚠️ **속성은 이 층을 반으로 줄인다.** 정체색의 어두운 칸이 등급 넷보다
    //   훨씬 원색이라(`#5E1A06` 주황 · `#123D1C` 초록) 같은 세기로 깔면 가운데가
    //   **색 덩어리**가 되고, 그 위의 가는 획(밧줄 · 4각별 · 꽃 · 구슬 축선)이
    //   통째로 씻겨 나간다 — 2026-08-28 실측에서 속성 여섯이 등급 넷보다
    //   **비어 보인** 진짜 원인이 이것이었다(자리 크기가 아니었다).
    //   ⭐ 세기만 줄이고 **색은 그대로**다 — 온도를 등급이 아니라 속성이 낼 뿐이다.
    const vg = c.createRadialGradient(cx, ay, 0, cx, ay, H * 0.74);
    vg.addColorStop(0, A(g[0], (AT ? 0.26 : 0.50) * a));
    vg.addColorStop(0.62, A(g[0], (AT ? 0.09 : 0.16) * a));
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
    // ⭐⭐ 속성의 **결** — 도해가 다 선 뒤, 반짝임 앞. 이 한 겹이 속성을 가른다.
    //   ⚠️ 등급 넷은 여기를 안 지난다(`AT` 가 null 이다).
    if (AT) AT.grain(c, X, Y, W, H, cx, ay, aR, g, ink, t, a, ar);
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
  // ⚠️ 글자는 **가운데**에 선다. 카드가 세로축 대칭(왕관 · 판 · 이름 띠)이라
  //   한쪽 끝에 붙이면 반대쪽이 비어 글이 허공에 뜬 것으로 읽히고, 밑금이
  //   가운데에서 좌우로 벌어지므로 그 축과도 어긋난다.
  {
    const ty = Y + 36, m0 = 30, tk = LCes(op.txt), ta = LCcl(op.txt * 1.8);
    c.font = LCFONT(600, 9.5); c.textAlign = "center"; c.textBaseline = "middle";
    c.fillStyle = A(g[1], 0.80 * a * ta);
    // ⚠️⚠️ **속성 카드에는 등급이 없다** — 등급 이름도 확률도 안 적는다.
    //   사다리를 안 타는 카드에 사다리의 눈금을 적으면 그 순간 「속성별 일반」이
    //   되어 사용자가 없애라고 한 그 취급이 그대로 돌아온다.
    c.fillText(AT ? AT.nm + " 속성 · 스킬" : RK.nm + "  " + RK.p + "%", cx, ty);
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
    // ⚠️ 속성 카드의 문양은 **언제나 스킬 문양** 하나다(「한 획이 갈래로
    //   갈라진다」) — 속성 카드는 스킬 카드이므로 스탯 축이 없다. 「무엇인가」는
    //   문양이, 「어느 속성인가」는 색과 결과 자리가 말한다.
    const sym = AT ? LCSYM.skill : (LCSYM[d.sym] || LCSYM.spell);
    const S = W * 0.42;
    // ⭐ **발광 사다리 ① — 판 안쪽의 후광.** 문양 **밑**에 깔린다: 위에 얹으면
    //   글자와 획이 씻겨 「빛난다」가 아니라 「흐리다」가 된다.
    LCglowCore(c, cx, ay, aR * 1.28, g, GLOW * op.emb);
    const e = LCes(op.emb);
    const eS = 0.46 + 0.54 * e;        // 크기 — 이것이 등장의 실체다
    const eA = LCcl(e * 2.4);          // 알파 — 앞쪽에서 이미 찬다
    if (AT) {
      // ⭐ 자리 — **일반·레어와 같은 중심·같은 반지름**(`aR*0.72`)이다. 갈리는
      //   것은 실루엣뿐이고, 등장은 이 파일의 규약대로 알파가 아니라 크기다.
      AT.seat(c, cx, ay, aR * AT.sr, g, ink, t, a, op.art, AT.sk);
      c.globalAlpha = eA;
      sym(c, cx, ay, S * eS, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    } else if (R === 3) {
      LCcrest(c, cx, ay, aR * 0.92, g, t, a, op.emb, lit);
      // 왕관 한가운데에 **보석 자리에서 자라는 것**을 얹는다.
      // ⚠️ 보석이 맞물린 **뒤에** 선다(0.58~) — 먼저 서면 조각 사이로 비친다.
      const ec = LCes(LCcl((op.emb - 0.58) / 0.42));
      if (ec > 0.005) {
        // ⭐⭐ 스탯 문장이 있는 스탯은 **제 문장**이 선다([LCLSYM]) — 없으면
        //   축의 기본 문양이 아주 작게 앉는다(「무엇인가」는 남아야 한다).
        // ⚠️ 여기서 **안을 손으로 집는 자리가 없다.** 표 하나가 전부다 — 갤러리도
        //   실제 카드와 **같은 길**을 타야 배선이 어긋난 것을 눈으로 잡는다.
        const le = LCLSYM[d.sym];
        c.save(); c.globalAlpha = LCcl(ec * 2.4);
        if (le) le(c, cx, ay - aR * 0.055, aR * 0.40, g, ink, t, a, ec);
        else sym(c, cx, ay + aR * 0.02, S * 0.40 * (0.46 + 0.54 * ec),
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
      //   스탯 카드면 승급한 **스탯 문양**([LCUSYM]), 스킬·성좌 카드면 **기물 셋**이다.
      // ⚠️ `d.uni` 가 **명시된 자리는 [lcuni] 갤러리뿐**이다 — 안 A/B/C 를 눈으로
      //   비교하려고 일부러 `sym:"spell"` 을 셋 다 같이 준 자리라, `d.sym` 을
      //   먼저 보면 셋 다 같은 스탯 문양으로 뭉개진다. **명시된 안이 항상 이긴다.**
      const uu = d.uni ? null : LCUSYM[d.sym];
      if (uu) uu(c, cx, ay, S, g, ink, t, a, op.emb);
      else (LCUNI[d.uni] || LCUNI[LCUNIPICK])(c, cx, ay, aR * 0.54, g, ink, t, a, op.emb, sym, S);
    } else if (R === 1) {
      // ⭐⭐ **레어가 일반과 갈리는 유일한 겹** — 문양이 각인 판 위에 앉는다.
      // ⚠️ 안이 **명시된 자리는 [lcplq] 갤러리뿐**이다 — 나머지는 [LCPLQPICK] 을 탄다.
      (LCPLQ[d.plq] || LCPLQ[LCPLQPICK])(c, cx, ay, aR * 0.72, g, ink, a, op.art);
      // ⚠️⚠️ **문양은 제자리에 못 박혀 있다.** 좌우로 흔들면 각인 판에 **앉은
      //   것**이 아니라 판 위에 **떠 있는 물건**으로 읽히고, 그러면 이 등급의
      //   유일한 겹이 스스로 무너진다. 「시간이 든다」는 자리가 아니라 **박자**가
      //   맡는다 — `skill_rank` 희귀의 어휘 셋(잔상 · 선행 · 두 박자) 가운데
      //   카드가 무는 것은 **두 박자** 하나다.
      // 두 박자 — 주기당 한 번 문양이 살짝 커졌다 돌아온다. 순수 주기 함수라
      // 주기 끝과 처음이 어긋날 자리가 없다.
      const b = 1 + 0.045 * LCbump((t % LCT) / LCT, 3);
      c.globalAlpha = eA;
      sym(c, cx, ay, S * b * eS, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    } else {
      // 일반 — **레어와 같은 문양을 같은 크기로** 그린다. 다른 것은 둘뿐이다:
      // 판이 없고 · 두 박자가 없다(무채는 색이 하는 몫이다).
      c.globalAlpha = eA;
      sym(c, cx, ay, S * eS, A(g[1], 0.95 * a), A(g[2], 0.95 * a));
    }
    // ⚠️ 이 후광은 **넷이 같다**([LCHALO]) — 등급이 올라도 안 커진다.
    //   등급을 말하는 빛은 이것이 아니라 [LCLIT] 다(별도의 층).
    if (typeof gAdd === "function")
      gAdd(c, (cc) => LCdot(cc, cx, ay, W * 0.09, A(g[1], LCHALO * 0.20 * a * op.emb)));
    c.restore();
  }

  // ── 글자 — 98 의 발치 이름 띠 ──
  // ⚠️ 글자는 획을 그을 수 없어 알파를 쓸 수밖에 없다. 대신 **아래에서 6px 올라와
  //   앉고** 규칙선이 **가운데에서 좌우로 벌어진다** — 자리가 바뀌면 사람 눈은
  //   그것을 「놓였다」로 읽지 「밝아졌다」로 안 읽는다.
  // ⭐⭐ 발치 장식 — **글줄보다 먼저** 그린다. 글이 늘 위에 선다.
  LCfoot(c, X, Y, W, H, cx, g, ink, a,
    (AT ? LCATFOOT : LCFOOT[RK.id]) * LCes(op.txt));

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

  // ── ⭐⭐ 발광 사다리 ② — **테가 빛난다.** 클립 **밖**이라야 밖으로 번진다 ──
  // ⚠️ 맨 끝이다. 테와 마루장식 위에 얹혀야 「카드가 빛난다」로 읽히고, 밑에
  //   깔면 그 획들이 빛을 가려 「안이 밝다」가 된다.
  LCglowRim(c, X, Y, W, H, g, GLOW, t);
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
  // ⭐⭐ **속성 — 일반의 박자를 그대로 쓰고 길이만 다르다.**
  // ⚠️ 박자를 새로 안 짰다. `common.seq` 를 **되읽는다** — 사본을 두면 일반을
  //   고치는 날 속성만 옛 박자로 남는다(이 파일이 이미 여러 번 밟은 자리다).
  // ⚠️⚠️ 길이는 [LCATSEC] = 0.62 다 — 엔진이 2026-08-28 에 등급 넷을 통일한
  //   그 값(`lib/ui/levelup_grade.dart` 의 `kOpenSec`)이고, 위 넷은 이 파일에서
  //   아직 옛 값(0.34 · 1.00 · 1.80 · 3.10)이라 **여기서만 갈려 있다**(판정 자리).
  attr: {dur: LCATSEC, seq: (u) => LCOPEN.common.seq(u)},
};
/// ⚠️⚠️ **열여덟이 같은 위상을 탄다.** 칸마다 위상을 밀면 뜨는 차례가 뒤죽박죽으로
///   보인다 — 시계는 [frame] 이 모든 칸에 같은 `t` 를 넘기는 전역 하나다.
/// ⚠️ **끝나는 때는 다르다**(0.34 · 1.00 · 1.80 · 3.10초). 같이 시작해서 다르게
///   끝나는 것이 등급의 뜻이라, 그것이 보여야 「레전더리가 오래 열린다」가 읽힌다.
function LCopening(d) {
  // ⚠️ 속성 카드는 등급표에 없다 — 이름도 진행 눈금의 색도 [LCATTR] 이 든다.
  const O = LCOPEN[d.at ? "attr" : d.rank];
  const LB = d.at ? LCATTR[d.at] : LCRANK.find((r) => r.id === d.rank);
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
    c.fillText(LB.nm + " · " + O.dur.toFixed(2) + "s", 8, H - 7);
    c.fillStyle = A("#26262F", 1); c.fillRect(0, H - 3, W, 3);
    c.fillStyle = A(LB.col[1], 0.8);
    c.fillRect(0, H - 3, W * LCcl((ph - a0) / (a1 - a0)), 3);
  };
}

// ── ⭐⭐ 레전더리 전용 칸 ──────────────────────────────────────────────────
//
// ⚠️ **그림은 안 건드린다.** 여기서 하는 일은 이미 통과한 레전더리를 **보이게
//   세우는 것**뿐이다 — 사다리(`lcladder`)와 여는 칸(`lcopen`)에서 여섯 중
//   한 장으로만 끼어 있어 페이지를 훑으면 안 보였다.
// ⚠️ 3.10초짜리 연출은 **흐르는 채로는 판정이 안 된다**(마디 하나가 0.3초다).
//   ⇒ 마디마다 **멈춰 세운 칸**을 따로 놓는다.

/// 여는 연출을 **한 마디에서 멈춘 정지 칸.** 굳히는 것은 진행(`u`)뿐이고
/// 시간은 그대로 흐른다 — 고리는 계속 돌고 획의 색도 계속 흐른다.
/// ⚠️ 마지막 마디(`u=1`)만 빛이 0 이다. 「다 열린 카드의 발광은 넷이 같다」는
///   규약([LCFULL])이 멈춰 세운 칸에서도 참이라야 한다.
function LCfreeze(d, u) {
  const O = LCOPEN[d.rank];
  return (c, t, dt, W, H) => {
    c.clearRect(0, 0, W, H);
    const s = O.seq(u), m = 6;
    c.save();
    c.translate(0, (s.drop || 0) * 16);
    LCcard(c, m, m, W - m * 2, H - m * 2, d, t, {
      plate: 1, split: s.split, carve: s.carve, art: s.art, emb: s.emb,
      txt: s.txt, light: u < 1 ? 1 : 0, u: u,
    });
    c.restore();
    // 진행 눈금 — 「3.10초 중 어디인가」가 보여야 마디가 판정이 된다
    c.font = LCFONT(600, 9); c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.fillStyle = A("#5A5A68", 0.9);
    c.fillText((u * O.dur).toFixed(2) + "s / " + O.dur.toFixed(2) + "s", 8, H - 7);
    c.fillStyle = A("#26262F", 1); c.fillRect(0, H - 3, W, 3);
    c.fillStyle = A(LCRANK.find((r) => r.id === d.rank).col[1], 0.8);
    c.fillRect(0, H - 3, W * u, 3);
  };
}

/// ⭐ **유니크와 레전더리를 나란히.** 맨 위 두 칸은 따로 보면 판정이 안 된다 —
/// 같은 줄에 **같은 카드를 같은 크기로** 세워야 「레전더리가 위」가 그림에서
/// 참인지 보인다. 둘 다 다 열린 꼴([LCFULL])이라 **여는 빛이 한 톨도 없다** —
/// 갈리는 것은 오직 그림의 급이다.
function LCvs(c, t, dt, W, H) {
  LCduo(c, [LCLADDER[2], LCLADDER[3]], W, H, t, 1.34,
    "레전더리만 갖는 것 — 닫힌 석판 · 황도 12칸 고리 · 쐐기 각인 띠 · " +
    "왕관 · 테 밖으로 넘는 마루장식");
}

/// 두 장을 **한 칸 안에** 나란히 세운다. 격자 트랙이 몇 열로 접히든 둘이 갈라서지
/// 않는다 — 「위인가」는 붙여 놓아야만 판정되므로 짝을 칸 두 개로 나눌 수 없다.
function LCduo(c, pair, W, H, t, sc, foot) {
  c.clearRect(0, 0, W, H);
  c.fillStyle = "#07070C"; c.fillRect(0, 0, W, H);
  const cw = LCCW * sc, gap = W * 0.09, y = 64;
  c.textBaseline = "alphabetic";
  pair.forEach((d, i) => {
    const x0 = W / 2 + (i ? gap / 2 : -gap / 2 - cw);
    const RK = LCRANK.find((r) => r.id === d.rank);
    c.save();
    c.translate(x0, y); c.scale(sc, sc);
    LCcard(c, 0, 0, LCCW, LCCH, d, t, LCFULL);
    c.restore();
    // ⚠️ 라벨을 **가운데에 안 쓴다** — 레전더리는 마루장식이 테 위로 넘어와
    //   가운데를 지나간다. 좌우 끝에 붙이면 그 위를 안 지난다.
    c.font = LCFONT(700, 13); c.fillStyle = A(RK.col[2], 0.95);
    c.textAlign = "left"; c.fillText(RK.nm, x0, y - 14);
    c.font = LCFONT(500, 10); c.fillStyle = A("#9494A2", 0.95);
    c.textAlign = "right";
    c.fillText("등장 " + RK.p + "% · 층 " + RK.layers + " · 색 " + RK.hues, x0 + cw, y - 14);
  });
  c.textAlign = "center";
  c.font = LCFONT(500, 10.5); c.fillStyle = A("#7A7A88", 0.95);
  c.fillText(foot, W / 2, H - 16);
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

/// 스탯 여덟 — **등급 넷을 다 갖는 축들**이고, 유니크·레전더리 격자가 이것을 편다.
/// ⚠️ 능력치 표는 이 목록이 아니라 [LCAXIS] 를 읽는다(축 **열둘**) — 게임 관련
///   넷은 등급이 비는 자리가 있어 여기 안 든다. 그 넷의 격자는 [LCGAME] 이다.
/// ⚠️ `sym` 이 [LCUSYM]·[LCLSYM] 의 키와 같은 이름이라야 한다. 카드는 `d.sym`
///   하나로 두 표를 같이 타므로, 어긋나면 유니크만 승급하고 레전더리는 조용히
///   옛 문양으로 떨어진다 — **아무 데서도 안 터지는 종류의 어긋남**이다.
/// ⚠️⚠️ **꼴도 수도 여기 안 적는다.** 여덟이 **퍼센트로도 고정으로도** 뜨고 네
///   등급에 다 뜬다 — 꼴은 능력치의 속성이 아니라 카드가 뽑힐 때 갈리는 **축**이다
///   (스탯 × 꼴 × 등급). 값은 [LCSTEP] 이 등급 × 꼴로 낸다.
/// ⚠️ **문양 이름도 안 적는다.** 「다섯 살」·「반관」은 그리는 사람의 말이라
///   값 옆에 놓으면 값의 일부로 읽힌다 — 문양은 카드 그림에 이미 보인다.
const LCLDEFS = [
  {sym:"atk",      nm:"일반공격력"},
  {sym:"aspd",     nm:"공격속도"},
  {sym:"spell",    nm:"스킬공격력"},
  {sym:"speed",    nm:"이동속도"},
  {sym:"crit",     nm:"치명타 확률"},
  {sym:"critdmg",  nm:"치명타 피해"},
  {sym:"defense",  nm:"방어력"},
  {sym:"vitality", nm:"체력"},
];
/// 카드 한 장의 **값 글줄 둘**(`val` · `sub`) — 목록 둘이 이 하나를 같이 쓴다.
///
/// ⚠️⚠️ **손으로 적는 수가 한 자도 없다** — 값도 단위도 단계 수도 전부
///   [LCAXIS] 가 낸다. 목록이 둘로 갈리면서 이 계산이 사본이 될 뻔한 자리라
///   (스탯 여덟 · 게임 관련 넷) 함수로 세워 둔다.
/// ⚠️ 값이 없으면 **「미정」**이다 — 다만 그것은 `spell` 처럼 **아직 안 정한**
///   축의 자리다. 「그 등급에 안 만든다」는 여기 안 온다: 부르는 쪽이 그 칸을
///   아예 안 굽는다([LCGAME]).
function LCfill(d) {
  const form = LChasForm(d.sym, "flat") ? "flat" : "pct";
  const v = LCsteps(d.sym, d.rank, form);
  const rk = LCRANK.find((r) => r.id === d.rank);
  const ax = LCax(d.sym);
  if (!v) {
    return {...d, val: "미정",
      sub: `${ax.unit} · ${ax.base}\n⚠️ 수치가 아직 안 정해졌습니다`};
  }
  // ⚠️ **1회성은 「가산」이라 안 적는다** — 쌓이는 것이 아니라 그 자리에서
  //   한 번 차는 것이다(`healcur`). 같은 말로 적으면 지속 스탯으로 읽힌다.
  const how = form === "flat" ? "고정 꼴 — 그대로 더한다"
    : ax.once ? ax.unit : ax.unit + " · 가산";
  return {...d, val: LCval(d.sym, d.rank, form),
    sub: how + `\n${rk.nm} 단계 ${v.join(" · ")}` +
      (v.length > 1 ? " 중 마지막 칸" : "")};
}

const LCPICK = [
  {rank:"common", nm:"이동속도", val:"+11%", sym:"speed", sub:"기본값 기준 · 가산"},
  {rank:"legend", nm:"치명타 피해", val:"+100%", sym:"critdmg", sub:"기본값 기준 · 가산", lock: true},
  {rank:"rare", nm:"방어력", val:"+300", sym:"defense", sub:"고정 꼴"},
];

// ── 조립 — **페이지에 서는 것은 둘** ──────────────────────────────────────
//
// 사용자가 답을 받고 싶은 것은 셋이다: **뜰 때 연출 · 카드 종류 · 카드마다 능력치.**
// 그런데 셋째만 표이고 앞 둘은 **같은 그림 한 벌이 같이 답한다**:
//   「종류별로 디자인이 다르니까 **어떻게 뜨는지도** 봐야겠다」
// ⇒ 열여덟 장을 **전부 연출로** 돌린다. 그러면 「무엇이 있나」와 「어떻게 뜨나」가
//   한 격자에서 같이 읽힌다.
// ⚠️⚠️ 그래서 **등급 대표 넷을 따로 안 돌린다.** 일반·레어는 어차피 한 장씩이라
//   이 격자에 이미 있고, 유니크·레전더리 대표는 여덟 중 하나라 그것을 또 그리면
//   중복이다 — 이 회차 내내 걷어낸 것이 정확히 그런 자리다.
// ⚠️ 안 셋·안 넷을 그리던 **함수는 남긴다**([LCPLQ]·[LCUNI]). 안 그려질 뿐이라
//   갈아탈 때 한 글자만 고치면 되고, 지우면 그 선택지가 통째로 사라진다.
// ⚠️ 제목에 「N종」을 안 쓴다 — 린트 ⑪(제목의 「N종」 ↔ 실제 칸 수)이 곁
//   스크립트의 칸을 0 으로 세기 때문이다.

/// 칸 하나 = 카드 하나 + **한 줄 제목**. 설명 문단은 안 붙인다 — 칸마다 글이
/// 붙으면 그림보다 글이 많아진다.
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
    el.insertAdjacentHTML("beforeend", `<div class="cap"><div class="nm">${d.cap}</div></div>`);
    host.appendChild(el);
    mk(cv, [LCCW, LCCH], fn(d));
  }
}

// ── ① 카드 종류 + 뜰 때 연출 — **열여덟 장이 같이 뜬다** ─────────────────
//
// ⚠️ 일반·레어는 **스탯이 달라도 같은 그림**이라 한 장씩이다 — 문양만 갈리고
//   테·판·색은 스탯과 무관하다. 유니크·레전더리만 스탯마다 제 그림을 갖는다.
// ⚠️⚠️ **`form` 은 이 한 장이 뽑은 꼴이지 그 능력치의 속성이 아니다.** 여덟은
//   두 꼴 다로 뜬다 — 카드 한 장에 꼴 하나가 뜰 뿐이다. 두 꼴이 다 화면에
//   보이도록 갈라 두었다.
// ⚠️ 카드에 뜨는 수는 [LCAXIS] 에서 뽑고, **몇 칸 중 몇째인지**를 카드가 같이
//   적는다 — 그러지 않으면 등급마다 값이 하나인 것처럼 읽힌다.
// ⚠️ 고정 꼴을 가진 축은 셋뿐이라(`atk`·`defense`·`vitality`) 그 셋만 고정으로
//   그린다. 나머지는 퍼센트뿐이다.
const LCCARDS = [
  // ⚠️ 대표 칸은 **수치가 선 축**을 씁니다. 스킬공격력을 세웠더니 두 장이
  //   나란히 「미정」을 띄워, 일반·레어가 값이 없는 등급으로 읽혔습니다.
  {rank:"common", nm:"치명타 확률", sym:"crit", cap:"일반 — 스탯 열둘이 같은 그림"},
  {rank:"rare", nm:"치명타 확률", sym:"crit", cap:"레어 — 스탯 열둘이 같은 그림"},
  ...LCLDEFS.map((d) => ({rank:"unique", nm:d.nm, sym:d.sym, cap:`유니크 · ${d.nm}`})),
  ...LCLDEFS.map((d) => ({rank:"legend", nm:d.nm, sym:d.sym, cap:`레전더리 · ${d.nm}`})),
].map(LCfill);
LCmount("lccards", LCCARDS, LCopening, 196);

// ── ①-b 게임 관련 넷 — **만드는 등급만 선다** ────────────────────────────
//
// 사용자 원문: 「일반 카드 쪽에 **게임과 관련된 카드**를 넣고 싶은데」
//
// ⚠️⚠️ **격자가 표를 그대로 따라야 한다.** 넷은 등급이 다 차 있지 않다 —
//   레전더리가 넷 다 없고, 일반은 둘만 있다([LCAXIS] 의 게임 관련 넷 ⚠️⚠️).
//   그래서 여기서 **등급 넷을 다 굽지 않는다**: `LCsteps` 가 값을 주는 칸만
//   굽는다. 빈 등급을 「미정」으로 채우면 그 자리에서 **「아직 안 정한 것」과
//   「안 만드는 것」이 한 얼굴**이 되고, 그것이 사용자가 못 박은 그 구분이다.
// ⚠️ 위 격자와 달리 **일반·레어를 대표 한 장으로 안 접는다** — 축마다 등급이
//   비는 자리가 다르므로, 접으면 「어느 등급이 서고 어느 등급이 없나」가 통째로
//   안 보인다. 이 격자가 답하는 것이 정확히 그 하나다.
const LCGAME = LCAXIS.filter((ax) => ax.game).flatMap((ax) => {
  const form = LChasForm(ax.sym, "flat") ? "flat" : "pct";
  return LCRANK.filter((r) => LCsteps(ax.sym, r.id, form)).map((r) =>
    LCfill({rank: r.id, nm: ax.nm, sym: ax.sym, cap: `${r.nm} · ${ax.nm}`}));
});
// ⚠️⚠️ **여는 연출을 안 켠다 — [LCstill] 이다**(2026-08-28 사용자 판정).
//   사용자 원문: 「얘네들 **카드 등장 애니메이션은 제거**해 줘. **디자인 보려고
//   하는데 자꾸 재시작**하네」
//   ⭐ 이 격자는 **다 지어진 그림을 보는 자리**다 — 「어떻게 뜨나」는 위 격자
//     (`lccards`)의 몫이고, 여기서 답할 것은 **넷이 어느 등급에 서고 그때
//     무엇이 적히나** 하나뿐이다. 판이 지어지는 과정이 7.2초마다 다시 돌면
//     그 답을 볼 시간이 매번 끊긴다.
//   ⚠️ **도로 [LCopening] 으로 되돌리지 마라** — 빠진 것이 아니라 걷은 것이다.
//   ⚠️ 걷은 것은 **여는 연출 하나**다. [LCFULL] 은 진행만 1 로 굳히고 `t` 는
//     그대로 흘려보내므로, 다 지어진 뒤의 잔잔한 움직임(획을 흐르는 색 · 별
//     반짝임 · 잔향 · 유니크 궤도)은 살아 있다 — 「한 장에 나란히」 절이 쓰는
//     그 길과 같다. `light: 0` 이라 **여는 빛만** 한 톨도 안 난다.
//   ⭐ 실측(한 주기 7.2초를 240프레임으로): **획 수가 프레임 내내 한 획도 안
//     바뀐다**(일반 132 · 레어 179 · 유니크 317 고정) — 판이 다시 지어지는 자리가
//     없다는 뜻이다. 옛 길로 두면 같은 카드가 획 3~321 사이를 오가고 **유니크는
//     한 주기의 32%(2.3초)가 다 안 지어진 상태**였다 — 그것이 「자꾸 재시작」이다.
//   ⚠️ **완전 정지(픽셀까지 동일)는 일부러 안 했다.** 색 흐름 · 궤도는 계속 도므로
//     두 프레임의 색이 다른 픽셀이 8~41% 다(실측). 그것은 **다 지어진 카드가 원래
//     하는 움직임**이고 게임에서도 그렇게 돈다. 완전 정지가 필요하면 여기 한 줄에서
//     `t` 를 상수로 물리면 된다 — 다만 그러면 시안이 그림을 **정지화면으로
//     거짓말**하게 되므로 사용자 지시 없이는 안 한다.
LCmount("lcgame", LCGAME, LCstill, 196);

// ── ② 카드마다 능력치 ─────────────────────────────────────────────────────
//
// ⚠️⚠️ **줄여 쓰지 않는다.** 「일반에서 일반공격력이 몇으로 뜨나」를 두 표를
//   오가며 맞춰 보게 하면 그 표는 답을 안 한 것이다(2026-08-27 사용자 지시:
//   「축약하지 말고 펼쳐서 제대로 써라」). ⇒ 축 여덟 × 등급 넷을 다 편다.
// ⚠️ 축마다 사다리가 다르므로 **줄마다 값이 다르다.** 한 사다리를 쓰던 때는
//   여덟 줄이 전부 같은 말이었다 — 그것이 표를 무의미하게 만들었다.
// ⚠️ 고정 칸이 비는 축이 다섯이다. **`—` 로 비운다** — 0 이 아니라 없는 것이다.
// ⚠️ 손으로 적은 수가 한 자도 없다 — 전부 [LCAXIS] 가 낸다.
// ⭐⭐ **줄이 여덟에서 열둘이 됐다**(2026-08-28) — 게임 관련 넷이 아래 한 묶음으로
//   붙는다. 그 넷은 **등급이 비는 자리가 있고**, 비는 칸의 `—` 는 위 여덟의 `—`
//   와 **뜻이 다르다**: 위는 「그 꼴이 없다」이고 아래는 「**그 등급에 안
//   만든다**」다. 묶음 머리줄이 그 말을 한 번 하고 지나간다.
{
  const host = document.getElementById("lcstattbl");
  if (host) {
    const cell = (sym, rank, form) => {
      const v = LCsteps(sym, rank, form);
      if (!v) return '<td style="color:#4A4A56">—</td>';
      return `<td><b>${v.join(" · ")}</b></td>`;
    };
    // ⚠️ 묶음 머리줄은 **첫 게임 관련 축 앞에서 한 번만** 선다 — 표의 칸 수
    //   (능력치 1 + 퍼센트 4 + 고정 4 = 9)를 그대로 먹는다.
    let grouped = false;
    const rows = LCAXIS.map((ax) => {
      let head = "";
      if (ax.game && !grouped) {
        grouped = true;
        head = '<tr><td colspan="9" style="color:#E8C879;background:#16161E">' +
          "⭐ <b>게임 관련 넷</b> — 싸움의 수가 아니라 <b>판을 굴리는 것</b>입니다" +
          "(캐고 · 줍고 · 버팁니다). <b>퍼센트는 전부 기준값 대비 합 계산이고 " +
          "복리가 아닙니다</b> — 10% 를 셋 먹으면 100 → <b>130</b>(133.1 이 " +
          '아닙니다). <span style="color:#9A9AA8">여기서 ' +
          "<b>—</b> 는 0 이 아니라 <b>그 등급에 안 만든다</b>는 뜻입니다 — " +
          "사용자 확정(「일반이나 레전더리 언급 없는 것들은 해당 등급에 만들지 " +
          "않음」).</span></td></tr>";
      }
      const undecided = !!ax.tbd;
      const nm = `<b>${ax.nm}</b><br><span style="color:#5A5A68">${ax.unit}</span>`;
      if (undecided) {
        return head + `<tr><td>${nm}</td>` +
          '<td colspan="4" style="color:#FFD27A">⚠️ 수치 미정 — 공격력과 같은 amp 항이라 ' +
          "같은 값이 될 공산이 크지만 확정 전에는 안 적는다</td>" +
          '<td colspan="4" style="color:#4A4A56">—</td></tr>';
      }
      return head + `<tr><td>${nm}</td>` +
        LCRANK.map((r) => cell(ax.sym, r.id, "pct")).join("") +
        LCRANK.map((r) => cell(ax.sym, r.id, "flat")).join("") + "</tr>";
    }).join("");
    host.innerHTML =
      '<table class="st"><tr><th rowspan="2">능력치</th>' +
      '<th colspan="4">퍼센트 단계</th><th colspan="4">고정 단계</th></tr><tr>' +
      LCRANK.map((r) => `<th>${r.nm}<br><span style="text-transform:none;letter-spacing:0;color:#5A5A68">${r.p}%</span></th>`).join("") +
      LCRANK.map((r) => `<th>${r.nm}</th>`).join("") + "</tr>" +
      rows + "</table>" +
      '<p class="def">⭐ <b>축마다 단위가 다르다.</b> 치명타 확률·공격속도는 ' +
      "<b>%p</b>(0 에서 시작하므로 곱이 안 된다) · 공격력은 <b>amp 항의 %</b> · " +
      "치명타 피해는 <b>배수의 %p</b>(기본 1.5배 = 150) · 방어력은 " +
      "<b>받는 피해 감소 %</b>다.<br>" +
      "⭐ <b>고정 꼴은 세 축만 있다</b> — 공격력 · 방어력 · 체력. 나머지 다섯은 " +
      "「+100 치명타 확률」 같은 것이 뜻이 없어 퍼센트뿐이다. " +
      "게임 관련 넷에서는 <b>초당회복력</b> 하나가 고정 꼴이고, 그 줄만 퍼센트 " +
      "칸이 통째로 빕니다.<br>" +
      "⚠️⚠️⚠️ <b>퍼센트는 전부 합 계산입니다 — 복리가 아닙니다.</b> " +
      "기준값 × (1 + Σ퍼센트) 이고, 사용자 원문 그대로 " +
      "「고정 흡수 반경이 100이면 <b>10%를 3개 먹으면 복리 계산이 아니라 130</b>」 " +
      "입니다 — 100 × 1.1³ = 133.1 <b>이 아닙니다</b>. " +
      "「채굴 도구의 기본 속도가 100이면 <b>복리 계산이 아니라 기본 속도 대비 " +
      "합 계산</b>」도 같은 말입니다. <b>이식할 때 제일 틀리기 쉬운 자리</b>이고, " +
      "엔진의 <code>Stats.absorbMul</code> 은 지금 곱으로 얹힙니다" +
      "(<code>constellation_apply.dart</code> 의 <code>s.absorbMul *=</code>) — " +
      "카드를 같은 필드에 <code>*=</code> 로 물리면 그 순간 복리가 됩니다.<br>" +
      "⚠️⚠️ <b>이식 인벤토리 — 엔진에 새로 뚫을 것</b> ① <b>채굴속도</b>는 " +
      "<code>RunStats</code> 에 <b>자리가 없습니다</b>. 주기는 상수 셋" +
      "(<code>kMineBeamPeriod</code> 0.2 · <code>kMineShotGap</code> 0.6 · " +
      "<code>kMineBombGap</code> 1.05)에 박혀 있고 배수가 없습니다 — 필드를 새로 " +
      "뚫고 <b>주기 ÷ (1 + Σ)</b> 로 물립니다. " +
      "② <b>흡수반경</b>은 훅이 <b>반쯤 있습니다</b> — " +
      "<code>Stats.absorbMul</code> 과 <code>absorbRadius</code> getter" +
      "(<code>kAbsorbRadiusBase</code> 48 × 배수)가 이미 있는데 <b>곱</b>입니다. " +
      "카드는 <b>합</b>이라 더하는 칸을 따로 두거나, 성좌(물병)까지 같이 합으로 " +
      "옮겨야 합니다(<b>판정 자리</b>). " +
      "③ <b>현재체력회복</b>은 <b>스탯이 아닙니다</b> — 1회성이라 " +
      "<code>RunStats</code> 에 안 쌓고 발동 즉시 " +
      "<code>PlayerState.hp</code> 를 <code>hpMax</code> 의 %만큼 올립니다. " +
      "⭐ 이 카드가 <b>폐기된 <code>heal</code> 카드가 비운 자리를 메웁니다</b> — " +
      "「전부 만렙일 때 3택을 채우는 카드」가 없어졌는데 그 노릇을 이것이 합니다. " +
      "④ <b>초당회복력</b>만 훅이 <b>그대로 있습니다</b> — " +
      "<code>Stats.regenPerSec</code> 이 이미 <b>덧셈</b> 필드라" +
      "(<code>world_step.dart</code> 의 재생 틱 한 곳이 소비) 더하기만 하면 " +
      "됩니다.<br>" +
      "⚠️ <b>판정이 필요한 자리</b> — ① 스킬공격력 수치가 미정이다. " +
      "② 공격력 고정은 정액이라 <b>연사가 빠른 무기에서 훨씬 세다</b>" +
      "(기본 볼트 <code>kBoltDamage 10</code>). ③ 이동속도는 천장이 없다. " +
      "④ <b>초당회복력의 자릿수</b> — 지금 엔진의 유일한 자동 재생원은 성좌(게)의 " +
      "<b>0.2 HP/초</b>이고 최대 체력은 <b>100</b>입니다(<code>kPlayerHpMax</code>). " +
      "카드의 +30 · +100 을 HP/초로 그대로 읽으면 <b>3.3초 만에 만피</b>가 되고, " +
      "그 상수의 주석이 「자동 재생이 강하면 도망 다니는 것이 최적해가 된다」로 " +
      "값을 작게 묶어 둔 자리입니다. 사용자께서 「추후 변경 가능」이라 하셨으므로 " +
      "<b>적힌 수를 그대로 두었습니다</b> — 단위를 바꾸실 자리입니다. " +
      "⑤ 게임 관련 넷은 <b>레전더리가 없습니다</b> — 레전더리 3택에서는 이 넷이 " +
      "안 뜹니다.</p>";
  }
}

// ══════════════════════════════════════════════════════════════════════════
// ⭐⭐ 속성 카드의 판정 자리 — **격자 넷**                     (2026-08-28)
//
// ⚠️⚠️ **판정은 낱장이 아니라 한 벌이다.** 하나씩 보면 여섯이 다 그럴듯하고,
//   등급 넷 옆에 나란히 놓아야 겹치는 것이 드러난다. 그래서 이 회차가 세우는
//   것은 그림 여섯이 아니라 **고르는 자리 넷**이다:
//     ① 속성 여섯이 **어떻게 뜨나** (연출로 돈다)
//     ② 등급 넷 · 속성 여섯을 **한 장에 나란히** — 고르는 자리
//     ③ 겹칠 자리 셋을 **붙여 놓고 수로** 대조 — 「느낌상 다르다」는 근거가 아니다
//     ④ 일반의 색을 옮기는 안 — **전 · 후를 같이** 놓고 사용자가 고른다
// ══════════════════════════════════════════════════════════════════════════

// ── 색을 재는 자 — 「느낌상 다르다」를 수로 바꾼다 ─────────────────────────
/// `#RRGGBB` → [색상각, 채도%, 명도%]. 화면에 적을 수를 이 하나가 낸다.
function LChsl(h) {
  const p = (i) => parseInt(h.slice(1 + i * 2, 3 + i * 2), 16) / 255;
  const r = p(0), g = p(1), b = p(2);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), dd = mx - mn;
  let H = 0;
  if (dd) {
    if (mx === r) H = ((g - b) / dd) % 6;
    else if (mx === g) H = (b - r) / dd + 2;
    else H = (r - g) / dd + 4;
    H *= 60; if (H < 0) H += 360;
  }
  const L = (mx + mn) / 2;
  return [H, (dd ? dd / (1 - Math.abs(2 * L - 1)) : 0) * 100, L * 100];
}
/// 상대 휘도 — 대비를 내는 데만 쓴다.
function LClum(h) {
  const c2 = [0, 1, 2].map((i) => {
    const v = parseInt(h.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c2[0] + 0.7152 * c2[1] + 0.0722 * c2[2];
}
/// 두 색의 **색상각 차** — 360도 고리라 180을 넘으면 되접는다.
function LCdH(x, y) { const d = Math.abs(LChsl(x)[0] - LChsl(y)[0]); return d > 180 ? 360 - d : d; }
/// 두 색의 **명도 차**(%p).
const LCdL = (x, y) => LChsl(x)[2] - LChsl(y)[2];
/// 두 색의 **대비비**. 1.00 에 가까울수록 「밝기로는 못 가른다」는 뜻이다.
function LCcon(x, y) {
  const p = LClum(x), q = LClum(y);
  return (Math.max(p, q) + 0.05) / (Math.min(p, q) + 0.05);
}
/// 한 짝의 실측 한 줄 — 카드 밑에 이 문자열이 그대로 뜬다.
const LCmeasure = (x, y) =>
  "색상각 " + LCdH(x, y).toFixed(1) + "° · 명도 " + Math.abs(LCdL(x, y)).toFixed(1) +
  "%p · 대비 " + LCcon(x, y).toFixed(2) + ":1";

// ── 굽는 연장 ─────────────────────────────────────────────────────────────
/// 카드 한 장을 격자 자리에 굽는다 — 위에 이름, 아래에 한 줄.
/// ⚠️ 정지 칸([LCFULL])이라 **여는 빛이 한 톨도 없다** — 나란히 놓고 고르는
///   자리에서 빛이 켜져 있으면 그림이 아니라 연출을 보게 된다.
function LCbake(c, x, y, sc, d, t, nm, note, col) {
  c.save(); c.translate(x, y); c.scale(sc, sc);
  LCcard(c, 0, 0, LCCW, LCCH, d, t, LCFULL);
  c.restore();
  const w = LCCW * sc;
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  c.font = LCFONT(700, 12); c.fillStyle = A(col, 0.95);
  c.fillText(nm, x + w / 2, y - 9);
  if (note) {
    c.font = LCFONT(500, 9.5); c.fillStyle = A("#8A8A98", 0.95);
    c.fillText(note, x + w / 2, y + LCCH * sc + 15);
  }
}
/// 넓은 칸 하나 — 격자 한 줄을 통째로 쓴다(`.tile.wide`).
/// ⚠️ 여러 장을 한 캔버스에 굽는 자리라 칸을 쪼갤 수 없다 — 「나란히」가
///   판정의 조건이므로 격자가 접히면서 짝이 갈라서면 그 칸은 답을 못 한다.
function LCmountWide(hostId, size, fn, cap) {
  const host = document.getElementById(hostId);
  if (!host) return;
  asRow(host, 186);
  const el = document.createElement("div");
  el.className = "tile wide";
  const cv = document.createElement("canvas");
  box(cv, {width: "100%", height: "auto", display: "block",
    aspectRatio: size[0] + "/" + size[1], background: "#07070C"});
  el.appendChild(cv);
  el.insertAdjacentHTML("beforeend", `<div class="cap"><div class="nm">${cap}</div></div>`);
  host.appendChild(el);
  mk(cv, size, fn);
}

// ── ① 속성 여섯 — 어떻게 뜨나 ─────────────────────────────────────────────
//
// ⚠️ 카드에 뜨는 스킬 이름을 **지어내지 않았다** — 그 속성의 기본공격이
//   `lib/data/characters.dart` 의 `kGrantedBasicIds` 에 이미 있다.
// ⚠️ 값이 「레벨 3」인 것은 스킬 카드가 파는 것이 **레벨 한 칸**이기 때문이다 —
//   스탯 카드의 「+12%」와 뜻이 다르므로 같은 꼴로 안 적는다.
const LCATCARDS = LCATORDER.map((k) => {
  const at = LCATTR[k];
  return {at: k, rank: "common", nm: at.skill, val: "레벨 3",
    sub: at.nm + " 속성 · 스킬 강화", cap: at.nm + " — " + at.sh};
});
LCmount("lcattr", LCATCARDS, LCopening, 196);

// ── ② 등급 넷 · 속성 여섯 — 한 장에 나란히 ────────────────────────────────
/// 등급 넷의 대표 칸 — **넷이 같은 축**(치명타 확률)이라야 급만 갈려 보인다.
const LCSHEETRANK = LCRANK.map((r) => ({
  rank: r.id, nm: "치명타 확률", sym: "crit", val: LCval("crit", r.id, "pct"),
  sub: "%p · 가산",
}));
function LCsheet(c, t, dt, W, H) {
  c.clearRect(0, 0, W, H);
  c.fillStyle = "#07070C"; c.fillRect(0, 0, W, H);
  const sc = 0.775, cw = LCCW * sc, ch = LCCH * sc, gap = 14;
  const line = (list, y, hd) => {
    const n = list.length, x0 = (W - (n * cw + (n - 1) * gap)) / 2;
    c.textAlign = "left"; c.textBaseline = "alphabetic";
    c.font = LCFONT(600, 11.5); c.fillStyle = A("#7A7A88", 1);
    c.fillText(hd, x0, y - 28);
    list.forEach((it, i) =>
      LCbake(c, x0 + i * (cw + gap), y, sc, it.d, t, it.nm, it.note, it.col));
  };
  line(LCSHEETRANK.map((d, i) => ({
    d, nm: LCRANK[i].nm, col: LCRANK[i].col[2],
    note: "등장 " + LCRANK[i].p + "% · 층 " + LCRANK[i].layers + " · " +
      LCOPEN[LCRANK[i].id].dur.toFixed(2) + "s",
  })), 74, "등급 넷 — 사다리를 탄다 (색 · 층 · 테가 급을 말한다)");
  line(LCATCARDS.map((d) => ({
    d, nm: LCATTR[d.at].nm, col: LCATTR[d.at].col[2],
    note: LCATTR[d.at].sh + " · " + LCATSEC.toFixed(2) + "s",
  })), 74 + ch + 74, "속성 여섯 — 사다리가 없다 (등급도 확률도 안 뜬다) · 암은 보류");
  c.textAlign = "center";
  c.font = LCFONT(500, 10.5); c.fillStyle = A("#7A7A88", 0.95);
  c.fillText("여는 길이 — 속성 여섯은 엔진 판정값 0.62초입니다. 등급 넷은 이 시안이 아직 옛 값(0.34~3.10초)을 들고 있어 여기서만 갈려 있습니다",
    W / 2, H - 16);
}
LCmountWide("lcsheet", [1240, 74 + 336 * 0.775 * 2 + 74 + 62], LCsheet,
  "등급 넷 · 속성 여섯 — 정지 칸(여는 빛 0)으로 나란히");

// ── ③ 겹칠 자리 셋 — 붙여 놓고 수로 대조 ──────────────────────────────────
//
// ⚠️⚠️ **떨어뜨려 놓으면 다 달라 보인다.** 색이 겹치는지는 **붙여 놓아야만**
//   판정되므로 셋을 한 캔버스에 굽는다.
// ⚠️ 수는 손으로 안 적는다 — [LCmeasure] 가 그 자리에서 잰다.
// ⚠️ `was` 는 **옮기기 전의 두 색**이다 — 「벌어졌다」는 전과 후를 같이 놓아야만
//   판정되므로, 지금 값만 재고 옛 값을 안 적으면 그 칸은 절반만 답한다.
//   ⭐ 옛 수도 손으로 안 적는다 — [LCmeasure] 가 `was` 를 그 자리에서 다시 잰다.
const LCPAIRS = [
  {at: "frost", rank: "rare", was: ["#4FC3F7", "#4FA0E8"], moved: "빙만",
   how: "가르는 것 — 빙은 **자라다 멎고**(시간을 안 먹는다) 레어는 **흐르고 뛴다**"},
  {at: "volt", rank: "legend", was: ["#FFE03A", "#FFC24A"], moved: "둘 다",
   how: "가르는 것 — 뇌는 **꺾이고 깜빡이고** 레전더리는 **매끈하게 한 방향으로 돈다**"},
  {at: "numb", rank: "common", was: ["#9A9AA8", "#98A0AE"], moved: "일반만",
   how: "가르는 것 — 무는 **면**이고(민판 한 장) 일반은 **선뿐**이다(맨몸 문양)"},
];
function LCpairSheet(c, t, dt, W, H) {
  c.clearRect(0, 0, W, H);
  c.fillStyle = "#07070C"; c.fillRect(0, 0, W, H);
  const sc = 0.70, cw = LCCW * sc, ch = LCCH * sc, inn = 10, out = 44;
  const pw = cw * 2 + inn;
  const x0 = (W - (pw * 3 + out * 2)) / 2, y = 78;
  LCPAIRS.forEach((p, i) => {
    const at = LCATTR[p.at], rk = LCRANK.find((r) => r.id === p.rank);
    const bx = x0 + i * (pw + out);
    LCbake(c, bx, y, sc, LCATCARDS.find((d) => d.at === p.at), t,
      at.nm + " 속성", null, at.col[2]);
    LCbake(c, bx + cw + inn, y, sc,
      LCSHEETRANK.find((d) => d.rank === p.rank), t, rk.nm + " 등급", null, rk.col[2]);
    c.textAlign = "center"; c.textBaseline = "alphabetic";
    // 전 — 옮기기 앞의 두 색. 흐리게 두어 「지금」이 앞에 서게 한다.
    c.font = LCFONT(500, 9.5); c.fillStyle = A("#6E6E7C", 0.95);
    c.fillText("전 " + p.was[0] + " / " + p.was[1] + "  ·  " +
      LCmeasure(p.was[0], p.was[1]), bx + pw / 2, y + ch + 20);
    c.font = LCFONT(600, 11); c.fillStyle = A("#C8C8D6", 0.95);
    c.fillText("후 " + LCmeasure(at.col[1], rk.col[1]), bx + pw / 2, y + ch + 38);
    c.font = LCFONT(500, 9.5); c.fillStyle = A("#8A8A98", 0.95);
    c.fillText(at.col[1] + "  /  " + rk.col[1] + "  (" + p.moved + " 옮겼습니다)",
      bx + pw / 2, y + ch + 54);
    c.font = LCFONT(500, 10); c.fillStyle = A(at.col[1], 0.95);
    c.fillText(p.how.replace(/\*\*/g, ""), bx + pw / 2, y + ch + 72);
  });
  c.textAlign = "center";
  c.font = LCFONT(600, 12.5); c.fillStyle = A("#E8C879", 0.95);
  c.fillText("겹칠 자리 셋 — 색을 옮긴 뒤 (전 · 후)", W / 2, 34);
  c.font = LCFONT(500, 10.5); c.fillStyle = A("#7A7A88", 0.95);
  c.fillText("사용자 판정: 「'색'만으로 구별하려고 하면 조금 인지가 안 될 거 같음」 — 그래서 본 방어선은 결입니다. 빙↔레어는 색상각이 6.0도로 45쌍 중 제일 가까운데도 다른 픽셀이 18.0에서 24.4%로 늘었고, 그것을 만든 것은 얼음 문양입니다",
    W / 2, 54);
}
LCmountWide("lcpair", [1240, 78 + 336 * 0.70 + 98], LCpairSheet,
  "빙↔레어 · 뇌↔레전더리 · 무↔일반 — 옮기기 전 · 후 실측");

// ── ④ 일반의 색 — 고르는 자리 (지나온 자리 둘 · 놋쇠 세 단) ───────────────
//
// 사용자 원문 다섯이 한 줄로 이어진다:
//   ① 「일반 카드와 구별하기 어려우면 **일반의 색상을 조금 변경**해서」
//   ② 「'옮긴 안'(따뜻한 회색) 괜찮긴 한데 **너무 구린데** ㅋㅋ」
//   ③ 「따듯한 회색 쪽으로 가되 좀 더 **진한 갈색? Bronze 느낌**」
//   ④ 「**너무 어두워서 가독성이 떨어짐**」  ⑤ 「**놋쇠까지 가도 될 거 같은데**」
//
// ⭐⭐ **방향이 틀린 게 아니라 재질과 밝기가 모자랐다.** 채도 12 의 누런 회색은
//   눈에 「빛바랜 것」으로 읽힌다 — 그것이 「구리다」의 정체였다. 채도를 올려
//   **금속**으로 만들고, 명도를 올려 **읽히게** 하면 그 자리에서 놋쇠가 된다.
// ⭐ 사다리의 관습과도 맞는다 — **청동/놋쇠 < 은 < 금.**
//
// ⚠️⚠️ **`#E8C93A`(49°) 를 피했다.** 이 저장소가 단전(`halt`) 항에서 「재 보면
//   49° 라 **염·뇌의 금 무리 한복판**」이라 판정하고 이미 버린 값이다. 여기 놋쇠는
//   **43.7° · 채도 38** 이라 그 값에서 색상 5.3° · 채도 41 을 뺐다 — **탁한** 놋쇠다.
// ⚠️⚠️ **셋이 한 자리에 모인다** — 일반(놋쇠 43.7°) · 레전더리(금 36.1°) ·
//   뇌(노랑 55.1°). 색상각으로는 못 가른다(일반↔레전더리 7.6°). 가르는 축 셋:
//     채도    일반 38   · 레전더리 100 · 뇌 100
//     명도    일반 63.9 · 레전더리 64.5 · 뇌 76.1
//     발광    일반 **0** · 레전더리 **1.0** · 속성 0.26([LCATLIT])
//   ⭐ 셋째 축이 [LCLIT] 이다 — 사용자 지시 둘(놋쇠 · 레전더리 발광)이 여기서
//     맞물린다. **그러니 일반에는 발광을 안 넣는다** — 그것이 제일 굵은 선이다.
//
// ⚠️ **적용한 것은 ㉣ 놋쇠 하나**다([LCRANK] 의 일반 한 줄). 나머지는 이 칸이
//   `d.col` 로 색만 갈아 끼워 나란히 보여 준다 — 판정이 뒤집히면 그 한 줄만 바꾼다.
const LCCOMOPT = [
  {id: "warm", nm: "㉠ 따뜻한 회색 — 기각", axis: "색상 35.5° · 채도 12 · 명도 63.9",
   col: ["#2F2A23", "#AEA598", "#E8E1D8"],
   flow: ["#948D7F", "#CEC4B6", "#A39B8F"], bg: "#14120E",
   note: "재질이 없어 「빛바랜 것」으로 읽힙니다"},
  {id: "bronzeDark", nm: "㉡ 짙은 청동 — 기각", axis: "색상 31.8° · 채도 36 · 명도 46.1",
   col: ["#2D2215", "#A0784B", "#E1D0B7"],
   flow: ["#826240", "#BD986B", "#96714A"],
   note: "⚠️ 어두워 글줄이 묻힙니다(사용자 반려)"},
  {id: "brassDull", nm: "㉢ 탁한 놋쇠", axis: "색상 43.6° · 채도 34 · 명도 57.8",
   col: ["#4B4025", "#B8A46F", "#E9E2CE"],
   flow: ["#A89057", "#CEBF97", "#B39D6B"],
   note: "제일 탁합니다 · 레전더리와 제일 멉니다"},
  {id: "brass", nm: "㉣ 놋쇠 — 적용", axis: "색상 43.7° · 채도 38 · 명도 63.9",
   col: ["#534727", "#C6B380", "#EFE9D7"],
   flow: ["#B7A066", "#DACEA9", "#C1AD7B"],
   note: "바탕 대비가 다른 카드 대역 한가운데입니다"},
  {id: "brassLite", nm: "㉤ 밝은 놋쇠", axis: "색상 44.8° · 채도 44 · 명도 70.0",
   col: ["#605229", "#D4C391", "#F5F0E0"],
   flow: ["#C7B175", "#E6DCBC", "#D0BD8B"],
   note: "⚠️ 제일 잘 읽히나 채도가 올라 금에 다가섭니다"},
];
/// ⚠️ 지금 [LCRANK] 에 들어가 있는 안이 어느 것인가 — 손으로 안 적고 색으로 찾는다.
const LCCOMAPPLIED = LCCOMOPT.find((o) => o.col[1] === LCRANK[0].col[1]);
/// 카드 바탕 — 등급 넷의 값은 [LCcard] 안에 박혀 있어 여기서 되읽는다.
const LCCOMBG = "#0F1116";
function LCshiftSheet(c, t, dt, W, H) {
  c.clearRect(0, 0, W, H);
  c.fillStyle = "#07070C"; c.fillRect(0, 0, W, H);
  const sc = 0.60, cw = LCCW * sc, ch = LCCH * sc, gap = 20;
  const base = LCSHEETRANK[0];
  const NUM = LCATTR.numb.col[1];
  const set = [
    {d: LCATCARDS.find((x) => x.at === "numb"), nm: "무 속성 — 못 옮긴다",
     col: LCATTR.numb.col[2], note: "엔진 kToneNeutral · 채도 7"},
    {d: {...base, col: ["#242830", "#98A0AE", "#D8DEE8"],
         flow: ["#7E8695", "#B8C0CE", "#8E96A6"]},
     nm: "일반 — 옮기기 전", col: "#D8DEE8",
     note: "무와 " + LCmeasure("#98A0AE", NUM)},
    ...LCCOMOPT.map((o) => ({
      d: {...base, col: o.col, flow: o.flow, bg: o.bg}, nm: o.nm, col: o.col[2],
      note: "무와 " + LCmeasure(o.col[1], NUM),
    })),
  ];
  const x0 = (W - (set.length * cw + (set.length - 1) * gap)) / 2, y = 92;
  set.forEach((s, i) => LCbake(c, x0 + i * (cw + gap), y, sc, s.d, t, s.nm, s.note, s.col));
  // 안마다 축 · 바탕 대비 · 한 줄 평 — 카드 밑에 세 줄 더
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  LCCOMOPT.forEach((o, i) => {
    const bx = x0 + (i + 2) * (cw + gap) + cw / 2;
    c.font = LCFONT(500, 9); c.fillStyle = A("#6E6E7C", 0.95);
    c.fillText(o.axis, bx, y + ch + 30);
    c.fillText("바탕 대비 " + LCcon(o.col[1], o.bg || LCCOMBG).toFixed(2) + ":1", bx,
      y + ch + 43);
    c.font = LCFONT(500, 9); c.fillStyle = A(o.col[1], 0.95);
    c.fillText(o.note, bx, y + ch + 56);
  });
  c.font = LCFONT(600, 12.5); c.fillStyle = A("#E8C879", 0.95);
  c.fillText("일반의 색 — 놋쇠 세 단 (지나온 자리 둘을 곁에)", W / 2, 34);
  c.font = LCFONT(500, 10.5); c.fillStyle = A("#7A7A88", 0.95);
  c.fillText("따뜻한 쪽이 맞았고 재질과 밝기가 모자랐던 것입니다 — 채도 12 의 누런 회색은 재질이 없어 「빛바랜 것」이 되고, 채도와 명도를 올려 금속으로 만들면 그 자리에서 놋쇠가 됩니다",
    W / 2, 54);
  c.fillStyle = A("#8A8A98", 0.95);
  c.fillText("청동 < 은 < 금 — 일반이 놋쇠면 레전더리(황금)와 한 사다리 위에 놓입니다. 색상각이 " +
    LCdH(LCRANK[0].col[1], LCRANK[3].col[1]).toFixed(1) +
    "도로 붙는 대신 채도(" + LChsl(LCRANK[0].col[1])[1].toFixed(0) + " 대 " +
    LChsl(LCRANK[3].col[1])[1].toFixed(0) + ") · 발광(" + LCLIT.common.toFixed(2) + " 대 " +
    LCLIT.legend.toFixed(2) + ") · 발치 장식이 셋을 가릅니다",
    W / 2, 72);
  c.fillStyle = A("#7A7A88", 0.95);
  c.fillText("본 방어선은 여전히 면(무)과 선(일반)입니다 — 색을 옮겨도 그것을 대신하지 못합니다. 지금 적용된 안은 " +
    LCCOMAPPLIED.nm + " 이고, 바꾸려면 LCRANK 의 일반 한 줄만 갈아 끼웁니다", W / 2, H - 14);
}
LCmountWide("lcshift", [1240, 92 + 336 * 0.60 + 106], LCshiftSheet,
  "무 · 일반(전) · 지나온 자리 둘 · 놋쇠 세 단 — 나란히");

// ── ⑤ 속성 여섯의 표 — 색 세 칸 · 결 · 자리 ───────────────────────────────
//
// ⚠️ 손으로 적은 색이 한 자도 없다 — 전부 [LCATTR] 이 낸다. 표와 카드가 갈리면
//   그 표는 그날로 거짓말이 된다.
{
  const host = document.getElementById("lcattrtbl");
  if (host) {
    const sw = (h) => `<span style="color:${h}">${h}</span>`;
    const rows = LCATORDER.map((k) => {
      const at = LCATTR[k];
      return `<tr><td><b>${at.nm}</b><br><span style="color:#5A5A68">${at.skill}</span></td>` +
        `<td>${at.col.map(sw).join("<br>")}</td>` +
        `<td><b>${at.gnm}</b></td><td><b>${at.snm}</b></td>` +
        `<td>${at.hues > 1 ? "흐른다" : "<b>안 움직인다</b>"}</td>` +
        `<td style="color:#9A9AA8">${at.vs}</td></tr>`;
    }).join("");
    host.innerHTML =
      '<table class="st"><tr><th>속성</th><th>색 세 칸</th><th>결</th><th>자리</th>' +
      "<th>흐름</th><th>겹칠 자리</th></tr>" + rows + "</table>" +
      '<p class="def">⭐ <b>넷은 엔진 정체색 그대로입니다</b> — ' +
      "<code>lib/render/cel_tones.dart</code> 의 <code>kToneEmber</code>(염) · " +
      "<code>kToneToxin</code>(독) · <code>kToneGale</code>(풍) · " +
      "<code>kToneNeutral</code>(무). 사용자 판정(「나머지는 저대로 해도 될 듯」)이라 " +
      "한 자도 안 건드렸습니다.<br>" +
      "⚠️⚠️ <b>둘은 2026-08-28 에 옮겼고 엔진과 갈려 있습니다</b> — " +
      "<b>빙</b> <code>kToneFrost</code> #4FC3F7 → 시안 " +
      `<span style="color:${LCATTR.frost.col[1]}">${LCATTR.frost.col[1]}</span>` +
      "(진한 파랑) · <b>뇌</b> <code>kToneVolt</code> #FFE03A → 시안 " +
      `<span style="color:${LCATTR.volt.col[1]}">${LCATTR.volt.col[1]}</span>` +
      "(밝은 노랑). 사용자 원문: 「'빙' 레벨업카드를 좀 더 파란색으로 … 얼음 느낌」 · " +
      "「뇌는 좀 더 노란색에 가깝게(밝은 쪽으로)」. <b>⚠️ 엔진에 그대로 옮기면 그 " +
      "속성의 이펙트 전부가 같이 바뀝니다</b> — 카드만 옮기려면 엔진에 카드 전용 " +
      "속성 팔레트를 따로 두어야 합니다(판정 자리).<br>" +
      "⚠️ <b>등급 둘도 같이 옮겼습니다</b> — <b>일반</b> #98A0AE → " +
      `<span style="color:${LCRANK[0].col[1]}">${LCRANK[0].col[1]}</span>` +
      "(놋쇠) · <b>레전더리</b> #FFC24A → " +
      `<span style="color:${LCRANK[3].col[1]}">${LCRANK[3].col[1]}</span>` +
      "(아주 살짝 주황 쪽). <b>레어는 옮겼다가 되돌렸습니다</b>(사용자 판정). " +
      "엔진은 <code>lib/ui/levelup_grade.dart</code> 의 " +
      "<code>kGradeSkin[OfferGrade.common]</code> · " +
      "<code>kGradeSkin[OfferGrade.legend]</code> 의 <code>tone</code>·<code>flow</code> " +
      "두 칸만 따라오면 됩니다 — 레벨업 카드에만 사는 색이라 번지지 않습니다.<br>" +
      "⚠️ <b>발광·발치 장식은 엔진에 아직 없습니다</b> — 시안의 <code>LCLIT</code>" +
      "(0 · 0.34 · 0.68 · 1.0) · <code>LCATLIT</code>(0.26) · <code>LCFOOT</code>" +
      "(0.10 · 0.40 · 0.72 · 1.0) · <code>LCATFOOT</code>(0.34) 를 " +
      "<code>GradeSkin</code> 에 칸으로 더해야 합니다. 발광은 " +
      "<code>levelup_art.dart</code> 의 <code>lcGlow()</code>(<code>BlendMode.plus</code>)로 " +
      "그대로 납니다 — 블러를 안 씁니다.<br>" +
      "⭐ <b>뼈대는 일반·레어의 공통 블록 그대로입니다</b> — 폭 240 · 높이 336 · " +
      "문양 자리(중심 0.335H · 반지름 0.38W) · 글줄 자리(0.605 · 0.685 · 0.775 · " +
      "0.855H) · 테 셋 · 모서리 갈고리 넷이 한 값도 안 바뀌었습니다.<br>" +
      "⚠️ <b>판정이 필요한 자리</b> — ① <b>풍</b>을 「연두」라 하셨는데 엔진 정체색은 " +
      "청록(색상각 171도)입니다. 저장소가 「풍의 정체색은 165~171도 청록이라 새 색을 " +
      "안 짓는다」고 못 박아 두어(<code>cel_tones.dart</code>) <b>정체색을 따랐습니다</b> — " +
      "연두로 옮기려면 표의 <code>gale</code> 한 줄만 고칩니다. " +
      "② <b>암</b>은 안 만들었습니다(보류). " +
      "③ 여는 길이가 속성 0.62초 ↔ 등급 0.34~3.10초로 갈려 있습니다 — " +
      "엔진은 이미 넷을 0.62 로 통일했고(<code>kOpenSec</code>) 이 시안의 등급 넷만 " +
      "옛 값입니다.</p>";
  }
}
