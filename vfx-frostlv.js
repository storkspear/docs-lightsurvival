// ══════════════════════════════════════════════════════════════════════════
// FQ — 서리결정 **지점 폭발**의 다섯 칸 (L1~L5)                (2026-08-23)
//
// ── 무엇을 그리는 표인가 ──────────────────────────────────────────────────
// 확정본은 `vfx-frostspot.js` 의 [FX.FSspot] 이다(고르기 페이지 `#pkfspot`).
// 그것은 **설계가 무엇인가**에 답하는 한 칸이고 — 한 주기 8.4초에 세 경우
// (맞음 · 지나감 · 없음)를 다 담는다 — 이 파일은 **레벨이 오르면 무엇이
// 자라나**에만 답하는 다섯 칸이다.
//
// ⚠️⚠️ **한 칸에 세 경우를 담지 않는다.** 그건 확정본 칸이 하는 일이고, 여기서
//   그걸 또 하면 다섯 칸이 서로 다른 순간을 보여 **나란히 놓아도 비교가 안 된다.**
//   ⇒ 다섯 칸을 **같은 경우 하나**(자리에 적이 서 있는 경우)로 통일했다.
//     달라지는 것은 오직 `SCN`·`SCRAD`·`SCBOOM` 셋뿐이다.
//
// ── ⭐ 성장축은 **엔진 표가 정본이다** ─────────────────────────────────────
// `lib/sim/combat/weapons/frostcrystal_tuning.dart` 를 읽어 대조했다. 시안의
// `SCN`·`SCRAD`·`SCBOOM`(`vfx.js` 45702~45704)과 **한 값도 안 다르다**:
//
//   | LV | 연타 SCN | 마디 반지름 SCRAD | 사슬 굵기 | 얼음 폭발 SCBOOM |
//   |----|---------|------------------|---------|-----------------|
//   | L1 |    5    |       5.2        |  10.4   |        —        |
//   | L2 |    7    |       5.7        |  11.4   |        —        |
//   | L3 |    9    |       6.2        |  12.4   |        —        |
//   | L4 |  9 그대로 |       6.7        |  13.4   |        ○        |
//   | L5 |   11    |       7.2        |  14.4   |        ○        |
//
//   엔진: `kFrostcrystalHits=[0,5,7,9,9,11]` · `kFrostcrystalRadius=[0,5.2,
//   5.7,6.2,6.7,7.2]` · `kFrostcrystalBoom=[f,f,f,f,t,t]`(6칸 · `[0]`=미장착).
//   ⚠️ **L4 에서 연타가 안 는다.** 9 가 두 번 적힌 것은 오타가 아니라 계약이고
//     (`frostcrystal_tuning.dart` 가 그렇게 못 박았다), 그 칸의 사건은
//     **얼음 폭발**이다. 그래서 L3 → L4 는 **수가 아니라 사건이 갈리는** 자리다.
// ⇒ 이 파일은 값을 **하나도 안 짓는다.** 위 세 표를 `LV` 로 읽어 도는 것이 전부다.
//
// ── ⭐ 다섯 칸에서 보여야 하는 것 셋 ──────────────────────────────────────
//   ① **연타 수가 는다(5 → 11)** — 화면에서 **셀 수 있어야** 한다.
//      세는 자리를 **둘** 뒀다:
//        · 날아가는 동안 **사슬의 마디**가 통째로 보인다(N개가 다 나와 있다)
//        · 갈릴 때마다 적 몸에 **서리 가시가 하나씩 박힌다** — 끝나면 정확히 N개
//      ⚠️ 확정본은 가시를 `P.a+(i%2?1:-1)*(.55+i*.30)` 로 부채처럼 폈는데,
//        i 가 10 까지 가면 각이 ±3.55rad 로 **서로 겹쳐 셀 수가 없다.** 여기서는
//        **한 바퀴에 고르게** 돌리고 가시를 **반지름 방향**으로 눕혔다(짧은 축이
//        접선이라 N=11 에서도 이웃과 안 붙는다). 세는 것이 이 표의 일이라
//        그 자리만 고쳤다.
//   ② **L4 부터 얼음 폭발이 붙는다** — L1~L3 엔 없다. 자리 둘레의 적 둘이
//      L4·L5 에서만 밀리고 얼고 눈송이 도장이 찍힌다. 멀리 선 하나는 다섯 칸
//      내내 아무 일도 안 당한다(반경 32 의 경계가 그 둘 사이에서 읽힌다).
//   ③ **지점 폭발의 정체가 유지된다** — 자리 표식 → 날아감 → 박힘 → 갈림.
//      확정본의 다섯 단계를 그대로 돈다. 적을 안 따라간다.
//
// ── 주기 = **2.8초.** 왜 그 수인가 ────────────────────────────────────────
// 확정본은 8.4초인데 그건 **한 발(2.8초)을 셋 이어 붙인 것**이다(`FSSLOT=2.8`,
// `FSPER=FSSLOT*3`). 세 경우를 담느라 셋이 필요했을 뿐, **한 발에 주는 시간은
// 2.8초**다. 성장표는 경우가 하나라 발도 하나면 된다 ⇒ **2.8초.**
//   2.8 = 엔진 주기 `SCPER` 2.6 + 예고 `FQTELE` .14 + 뒤끝 정리 램프.
//   ⚠️ **다섯 칸이 정확히 같은 주기**라야 나란히 놓고 볼 수 있다. 이 표에서
//     레벨이 건드리는 시간은 **연타가 끝나는 시각**뿐이고(N×0.125초), 제일 긴
//     L5 도 2.353초에 다 끝나 램프(2.42~2.76)를 안 건드린다.
//
// ── ⚠️ 영웅을 칸 한복판에서 **오른아래로 20칸 옮겼다** ────────────────────
// L5 사슬은 마디 사이가 9.792칸 × 10 = **97.9칸**이고 얼음 폭발은 **반경 32칸**
// 이다. 영웅을 한복판(119,119)에 두면 그 둘이 한 칸에 안 들어간다 —
// 사슬을 다 보이게 하면 폭발이 위·왼쪽으로 **잘리고**, 폭발을 넣으면 사슬
// 꼬리가 영웅 몸에 **묻혀 열한 개를 못 센다.**
//   ⇒ 영웅을 (+20,+20) 으로 옮겨 대각선 여유를 28칸 벌었다. 자리까지 123.1칸을
//     쓰고도 폭발이 칸 안에 다 든다(잘린 화소 0 이 이 절의 조건이다).
//   ⚠️ **확정본은 안 건드렸다** — 저쪽은 자리가 셋이라 제일 먼 것이 100.5칸이고
//     한복판에서 충분하다. 옮긴 것은 **이 표의 칸**뿐이다.
//
// ── 왜 별도 파일인가 ──────────────────────────────────────────────────────
// `vfx.js` 는 50,761줄이고 같은 사이클에 여러 손이 같이 쓴다. `vfx-poison.js` ·
// `vfx-flamelv.js` · `vfx-frostspot.js` 의 전례대로 새 그림은 여기 만들고
// `vfx.js` 는 **읽기만** 한다. 페이지가 `vfx.js` **뒤**에 이 파일을 부르므로
// `FX`·`LV`·`tile`·`lvTable`·`hash`·`saw`·`dep`·`hero`·`IB*`·`SC*` 가 다 보인다.
// ⚠️ 최상위 이름을 전부 `FQ` 로 격리한다(실측: `FQ` 로 시작하는 이름은
//   vfx / nav / char-page / chapter / rock / vfx-poison / vfx-flamelv /
//   vfx-flamenat / vfx-frostspot / mockup-char-*.js 에 **0건**).
// ⚠️⚠️ **처음에 고른 `FZ` 는 이미 임자가 있었다** — `vfx.js` 의 **결빙**
//   (`FZtomb1/2/3`·`FZvortex1/2/3`·`FZDUR`·`FZpop`·`FZring`…) 열셋이 그 접두를
//   쓴다. 이름이 하나도 안 겹쳐 **스크립트는 멀쩡히 돌았지만**, 뜻이 다른 접두를
//   빌려 쓰면 다음 손이 「결빙 코드인가」로 헛짚는다 ⇒ `FQ` 로 옮겼다.
//   ⚠️⚠️ **그 충돌을 처음에 못 본 이유를 적어 둔다** — 검사에 쓴 셸이 zsh 인데
//     `grep -E "\b$p[A-Za-z0-9_]*"` 의 `$p[...]` 를 zsh 가 **배열 첨자**로 읽어
//     빈 문자열이 됐다. **검사가 조용히 0건을 돌려줬다.** 접두 검사는 변수를
//     `${p}` 로 감싸거나 리터럴로 박아야 한다.
// ⚠️⚠️ **확정본과 `vfx.js` 는 한 글자도 안 건드린다.** `SCN`·`SCRAD`·`SCBOOM`·
//   `SCPER`·`SCHIT`·`SCMUZ`·`SCBR`·`SCKB`·`SCFRZ`·`SCTICK`·`SCGAPM` 은
//   **읽기만** 한다. 갈아야 하는 것만 `FQ*` 로 복제해 갖는다.
//   ⚠️ `FS*` 를 직접 못 읽는다 — 이 장은 `vfx-frostspot.js` 를 안 싣는다(그건
//     고르기 페이지의 칸이다). 그래서 확정본의 값을 **옮겨 적고** 어디서 온
//     값인지 줄마다 밝힌다.
//
// ── ⚠️ 난수 0건 ──────────────────────────────────────────────────────────
// `Math.random` 을 부르는 도구(`emit`·`hitFoe`·`IBpushFrag`)를 **하나도 안 쓴다**
// (확정본과 같은 규율). 부스러기·조각은 `hash()` 표로 직접 그린다. ⇒ 주기 끝과
// 처음이 **같은 스케줄 하나**에서 나온다.
// ⚠️ 확정본에 없던 자리 하나를 더 막았다: **넉백에 뒤끝 램프를 곱한다.** 확정본은
//   슬롯이 넘어갈 때 `f.kx=0` 으로 툭 끊는데, 감쇠가 남긴 잔값(0.1~0.5칸)이
//   그 프레임에 사라진다. 여기서는 `f.kx = f.ax*z` 라 **램프가 정확히 0 을 만든다.**
//
// ── ⚠️ 게이트가 이 파일을 안 돈다 (실측) ──────────────────────────────────
// `tools/mockup_lint.js` 의 정적·런타임 검사와 `tools/mockup_smoke.js` 는 둘 다
// **`docs/vfx/vfx.js` 하나만** 읽는다.
//   ⇒ 자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-frostlv.js > /tmp/zf.js &&
//                 node tools/mockup_smoke.js /tmp/zf.js`
//   ⇒ 린트 ⑪(제목의 「N종」 ↔ 실제 칸 수)이 이 파일의 칸을 **0으로** 세므로
//     새 `<h2>` 에는 **「N종」을 안 쓴다**.
// ══════════════════════════════════════════════════════════════════════════

// ── 무대 ──────────────────────────────────────────────────────────────────
/// 한 주기(s). **확정본이 한 발에 주는 시간 `FSSLOT` 그대로다.**
const FQPER = 2.8;
/// 자리가 먼저 보이는 시간(s) — 확정본 `FSTELE`.
const FQTELE = .14;
/// 던지는 속도(238칸/s) — 확정본 `FSSPD`. **거리가 시간을 정한다**(확정본의
/// 판단 그대로: 상수 시간으로 두면 먼 자리를 더 빠르게 던지게 된다).
const FQSPD = 287;
/// 영웅을 칸 한복판에서 옮긴 값(238칸). 위 머리말 「영웅을 옮겼다」 절이 근거다.
const FQHX = 20, FQHY = 20;
/// 자리 — **영웅에서 잰다**(238칸). 엔진이 고르는 값의 한 예이지 규칙이 아니다.
///   거리 123.11칸 → 비행 0.4429초(확정본 `SCFLY` .30 과 같은 눈금·같은 식)
const FQSPOT = [-84, -90];
/// 갈리는 자리에 **몸이 걸리는가** — 자리 중심에서 겉면까지의 문턱(× 마디 반지름).
/// 확정본 `FSBITE` 그대로다(선 판정 `SCcontact` 를 점 판정으로 옮긴 값).
const FQBITE = 1.05;
/// 뒤끝 정리 램프(s). 시작은 확정본 `FSTH0` 그대로다 — 제일 긴 L5 의 폭발이
/// 2.353초에 끝나므로 **다섯 칸 어디도 이 램프에 안 걸린다.**
/// ⚠️⚠️ **끝을 주기보다 0.04초 앞당겼다**(확정본 `FSTH1` 은 슬롯 끝 2.80 이다).
///   램프가 주기 끝에서야 0 이 되면 마지막 프레임의 `z` 가 **0 이 아니라 2.8e-5**
///   이고, 상태 표식은 `f.pv>0` 이면 그리므로 **보이지도 않는 표식이 한 겹 더
///   그려진다** — 그 한 겹이 이음매에서 통째로 사라져 도약이 된다.
///   ⇒ 2.76~2.80 은 `z` 가 **정확히 0** 인 구간이라, 주기 끝 화면이 주기 처음과
///     **화소 하나까지 같아진다**(아래 검산에서 0개 차이로 확인).
const FQTH0 = 2.42, FQTH1 = 2.76;
/// 마디가 **몸에서 빠져나오는 동안** 알파가 오르는 거리(× 마디 반지름).
/// 확정본 `FSEMG`. 이게 없으면 주기 처음에 마디가 툭 나타난다.
const FQEMG = 1.6;
/// 둘레 장식이 켜지는 데 걸리는 시간(s) — 확정본 `FSAMBIN`.
const FQAMBIN = .12;

// ── 자리 표식 (확정본 `FSMK*`) ────────────────────────────────────────────
const FQMKOUT = .20, FQMKSQ = .50, FQMKR = 2.60, FQMKN = 6;

// ── 갈릴 때 튀는 조각 (확정본 `emit` 대신 — 난수 0) ───────────────────────
/// 한 대에 튀는 조각 수 · 수명(s) · 속도(238칸/s) · 중력 · 뒤로 퍼지는 각(rad).
/// 확정본 `FSCN`·`FSCL`·`FSCV`·`FSCVR`·`FSCG`·`FSCS` 그대로다.
const FQCN = 3, FQCL = .34, FQCV = 46, FQCVR = 52, FQCG = 210, FQCS = 2.1;
/// 폭발이 흩는 조각 — 수 · 수명(s) · 속도 · 중력.
/// ⚠️ **속도만 확정본과 다르다**(96~180 → 40~74). 확정본은 자리가 칸 가장자리에서
///   멀어 그 속도로도 안 잘렸는데, 이 표는 자리를 123칸까지 밀어 놔서 조각이
///   **칸 밖으로 나간다.** 40~74 는 0.52초에 20.8~38.5칸을 가므로 조각이
///   **폭발 반경(32) 언저리에서 멈춘다** — 잘린 화소 0 이 이 절의 조건이다.
const FQBN = 9, FQBL = .52, FQBV = 40, FQBVR = 34, FQBG = 70;

// ── 적 넷 — **안 움직인다** ───────────────────────────────────────────────
// ⚠️ 확정본은 「지나가는 적」을 보이려고 적을 걷게 했다. 이 표는 **경우가 하나**라
//   걸을 이유가 없고, 길을 없애면 주기 이음매가 날 자리도 같이 없어진다.
// [x, y, r] — **영웅에서 잰 자리**(238칸). 자리 = [-84,-90].
const FQFOE = [
  // ① 표적 — 자리에서 12.7 → 겉면까지 **0.7**. 제일 좁은 L1 의 문턱(5.46)보다
  //    작으므로 **다섯 칸 전부에서 갈린다.** 연타 수를 세는 몸이 이 놈이다.
  //    ⚠️ 반지름을 12 로 키웠다(옆의 셋은 7). 이 몸에 **서리 가시 N개가 박혀
  //      수를 말하므로**, 작으면 열한 개가 한 덩어리로 뭉쳐 못 센다.
  [-75.3, -80.7, 12],
  // ② 자리에서 32.6 → 겉면 **25.6**. 문턱(≤7.56) 밖이라 **한 번도 안 갈리고**,
  //    폭발 반경(32) 안이라 **L4·L5 에서만** 밀리고 언다.
  [-52, -96, 7],
  // ③ 자리에서 35.6 → 겉면 **28.6**. ② 와 같은 처지 — 반대쪽에 하나 더 둔다.
  [-106, -62, 7],
  // ④ 자리에서 96.1 → 겉면 **89.1**. 반경 밖이라 **다섯 칸 내내 아무 일도
  //    안 당한다** — ②③ 과 나란히 놓여 폭발의 경계를 읽어 준다.
  [10, -70, 7]];

// ── 파생 — **레벨을 안 탄다**(다섯 칸이 같은 시각에 같은 일을 한다) ────────
/// 영웅에서 자리까지(238칸).
const FQCD = Math.hypot(FQSPOT[0], FQSPOT[1]);
/// 자리를 보는 각(rad).
const FQANG = Math.atan2(FQSPOT[1], FQSPOT[0]);
/// 비행 시간(s) = (거리 − 총구) ÷ 속도. 총구(`SCMUZ`)에서 재므로 확정본과 같은 눈금.
const FQFLY = (FQCD - SCMUZ) / FQSPD;
/// 자리에 닿는 시각(슬롯 안, s).
const FQTA = FQTELE + FQFLY;

/// 뒤끝 정리 램프 — 1 → 0. 끝이 평평한 매끈 계단이라 미분이 양 끝에서 0 이다.
/// (확정본 `FSz` 와 같은 식.)
function FQz(s) {
  const v = (s - FQTH0) / (FQTH1 - FQTH0);
  return v <= 0 ? 1 : (v >= 1 ? 0 : 1 - v * v * (3 - 2 * v));
}

// ── ⭐ 스케줄 하나 — 그리기와 검산이 **같은 함수**를 본다 ─────────────────
// ⚠️⚠️ 그리기 쪽과 검산 쪽에 식을 따로 두면 그날로 갈라진다. 그리는 값을
//   여기서만 만들고 [FQDBG] 로도 같은 함수를 내보낸다(1ms 훑기가 실제 코드
//   경로를 잰다).
// ⚠️ 인자·결과는 **전부 238칸 단위**다(px 가 아니다). 확정본은 px 로 셈해서
//   칸 크기가 236 이면 비행 시간이 0.4% 흔들리는데, 다섯 칸이 **정확히 같은
//   박자**여야 하는 이 표에서는 그 흔들림을 없애는 편이 맞다.
//   ⇒ 시간은 칸 크기와 무관하고, 자리는 그릴 때만 ×SC 한다.
function FQsched(tau, GAPu, N) {
  const s = tau, q = s - FQTA;
  const o = { s, q, FLY: FQFLY, TA: FQTA, hp: 0, gone: 0, mark: 0, amb: 0,
              z: FQz(s), boom: -1 };
  // ① 자리 표식 — 예고에 돋고, 도착하면 사슬에 흡수된다
  o.mark = (q < 0) ? Math.min(1, s / FQTELE) : Math.max(0, 1 - q / FQMKOUT);
  // ② 사슬 — 총구에서 자리까지. 가속(1.55승)은 확정본 그대로다
  if (s < FQTELE) { o.hp = SCMUZ; return o; }
  if (q < 0) {
    o.hp = SCMUZ + (FQCD - SCMUZ) * Math.pow((s - FQTELE) / FQFLY, 1.55);
    o.amb = Math.min(1, (s - FQTELE) / FQAMBIN);
    return o;
  }
  // ③ 자리에 박혀 갈린다 — 확정본과 **한 값도 안 다르다**
  o.hp = FQCD + GAPu * (q / SCHIT);
  o.gone = Math.min(N, Math.floor(q / SCHIT) + 1);
  o.amb = Math.min(1, (s - FQTELE) / FQAMBIN) *
          Math.max(0, Math.min(1, (FQTA + N * SCHIT + .30 - s) / .30));
  // ④ 얼음 폭발 — 마지막 마디가 부서진 뒤. 넉백 → (0.22초) → 빙결
  if (q >= (N - 1) * SCHIT) o.boom = q - (N - 1) * SCHIT;
  return o;
}

// ══════════════════════════════════════════════════════════════════════════
Object.assign(FX, {
/// 서리결정 성장표 한 칸 — **전역 `LV` 가 정하는 것은 셋뿐**이다:
/// 연타 수(`SCN`) · 마디 반지름(`SCRAD`) · 얼음 폭발(`SCBOOM`).
FQlv(c, t, dt, W, H, st) {
  const SC = Math.min(W, H) / 238;
  const hx = W / 2 + FQHX * SC, hy = H / 2 + FQHY * SC;   // 영웅 — 화면 좌표
  const N = SCN[LV - 1], RADu = SCRAD[LV - 1], BOOM = SCBOOM[LV - 1];
  const GAPu = RADu * SCGAPM;                     // 마디 간격(238칸)
  const RAD = RADu * SC, BR = SCBR * SC;
  const EMGu = RADu * FQEMG, BITEu = RADu * FQBITE;
  const ca = Math.cos(FQANG), sa = Math.sin(FQANG);
  const sx = hx + FQSPOT[0] * SC, sy = hy + FQSPOT[1] * SC;   // 자리 — 화면 좌표

  if (!st.F) {                                    // 적 넷 — `mgInit` 과 같은 모양
    st.F = FQFOE.map((v) => ({ ux: v[0], uy: v[1], ru: v[2],
      ox: 0, oy: 0, r: v[2] * SC, hit: 0, kx: 0, ky: 0, ax: 0, ay: 0,
      burn: 0, pv: 0, frz: 0, mk: 0 }));
  }
  for (const f of st.F) f.r = f.ru * SC;          // 칸 크기가 바뀌어도 따라온다

  const u = saw(t, FQPER), tau = u * FQPER;
  // 주기가 넘어갔다 — 앞 발의 셈을 되돌린다. ⚠️ 이때 램프 `z` 는 이미 0 이라
  //   **화면에서는 아무것도 안 바뀐다**(램프가 먼저 다 지웠다).
  if (st.pu === undefined || u < st.pu) {
    st.n = 0; st.im = []; st.ch = []; st.bp = 0; st.tgt = null;
    for (const f of st.F) { f.pv = 0; f.frz = 0; f.ax = 0; f.ay = 0; f.kx = 0; f.ky = 0; f.mk = 0; f.hit = 0; }
  }
  st.pu = u;
  const S = FQsched(tau, GAPu, N), z = S.z;
  // ⭐ **주기에 못 박은 시각.** 절대 시각 `t` 로 도는 층(영웅 호흡 · 적 실루엣
  //   요동)을 그대로 두면 그림이 주기마다 달라진다. 한 칸이 **완전한 고리**라야
  //   다섯 칸을 같은 조건으로 견준다. 둘 다 주기당 정수 바퀴다.
  const tp = tau * TAU / FQPER, th = tau * (TAU * 2 / 2.2) / FQPER;
  const wob = TAU * 2 * tau / FQPER;
  // 검산 창구 — 그리는 상태를 그대로 내놓는다(눈으로 세지 않기 위해).
  st.dbg = { LV, N, BOOM, hits: 0, mk: 0, tau };

  // ── 적 — 제자리에 서고, 언 놈은 굳는다 ─────────────────────────────────
  for (const f of st.F) {
    const px = f.ux * SC, py = f.uy * SC;
    // 넉백은 **램프를 탄다** — 주기 끝에 정확히 0 이라야 이음매가 안 생긴다.
    const d = f.frz ? Math.pow(.02, dt) : Math.pow(.86, dt * 60);
    f.ax *= d; f.ay *= d;
    f.kx = f.ax * z; f.ky = f.ay * z;
    const hold = f.frz ? z : 0;                   // 언 놈은 요동이 멎는다
    f.ox = px + (1 - hold) * Math.sin(wob + px * .07) * 3.2 * SC;
    f.oy = py + (1 - hold) * Math.cos(wob + py * .05) * 2.4 * SC;
    // 상태 표식은 **대입**이다(누적이 아니다) — 램프가 정확히 0 을 만든다.
    f.pv = (f.frz ? 2.4 : Math.min(1, f.mk / N) * 2.4) * z;
    // 연타 번쩍이 뭉치는 것을 푼다(확정본 머리 ㉡: 기본 감쇠 dt*5 는 연타 간격
    // 0.125 보다 길어 열한 번이 한 번의 긴 번쩍으로 뭉친다).
    // ⚠️ **갈리는 놈만** 더 떨군다 — 다른 적까지 떨구면 폭발의 넉백 번쩍이
    //   같이 짧아져 두 사건이 붙어 보인다(확정본이 못 박은 자리다).
    f.hit = Math.max(0, f.hit - dt * (f === st.tgt ? 13.3 : 5));
  }

  // ── 갈린다 — **자리에 걸린 놈**을 마디마다 다시 잡는다 ──────────────────
  while (st.n < S.gone) {
    let best = null, bd = 1e9;
    for (const f of st.F) {
      const d = Math.hypot(f.ux - FQSPOT[0], f.uy - FQSPOT[1]) - f.ru;
      if (d <= BITEu && d < bd) { bd = d; best = f; }
    }
    // ⚠️ 이 표에서는 ① 이 늘 걸린다(겉면 3.7 ≤ 5.46). 「빈 자리」 가지는
    //   확정본이 보이는 것이고 여기서는 안 쓴다 — 그래도 지우지 않는다.
    if (best) { best.hit = 1; best.ax += ca * 2.6 * SC; best.ay += sa * 2.6 * SC; best.mk++; st.tgt = best; }
    st.im.push({ l: 0, s: hash(st.n * 7.3 + LV) * 40, h: best ? 1 : 0 });
    // 조각 — 뒤로 튄다. **난수 0**(전부 `hash` 표)
    for (let j = 0; j < FQCN; j++) st.ch.push({ b: S.q, bo: 0,
      a: FQANG + Math.PI + (hash(st.n * 5.1 + j * 2.7) - .5) * FQCS,
      v: (FQCV + FQCVR * hash(st.n * 3.3 + j * 1.9)) * SC,
      r: (1.5 + 1.3 * hash(st.n * 8.7 + j * 4.1)) * SC, m: FQCL, g: FQCG * SC });
    st.n++;
  }
  st.dbg.hits = st.n;

  // ── 얼음 폭발 — **L4·L5 만.** 자리에서 터진다. 넉백 → (0.22초) → 빙결 ────
  if (BOOM && S.boom >= 0) {
    if (!st.bp) {                                 // ① 넉백 — 자리에서 밀어낸다
      st.bp = 1;
      for (const f of st.F) {
        const dx = f.ux - FQSPOT[0], dy = f.uy - FQSPOT[1], d = Math.hypot(dx, dy) || 1;
        if (d - f.ru > SCBR) continue;
        f.hit = 1; f.ax += dx / d * 12 * SC; f.ay += dy / d * 12 * SC;
      }
      for (let j = 0; j < FQBN; j++) st.ch.push({ b: S.boom, bo: 1,
        a: hash(j * 3.7 + LV) * TAU, v: (FQBV + FQBVR * hash(j * 6.1)) * SC,
        r: (2.0 + 1.8 * hash(j * 4.9)) * SC, m: FQBL, g: FQBG * SC });
    }
    if (S.boom >= SCFRZ && st.bp === 1) {         // ② 빙결 — **그러고 나서** 언다
      st.bp = 2;
      for (const f of st.F) {
        if (Math.hypot(f.ux - FQSPOT[0], f.uy - FQSPOT[1]) - f.ru > SCBR) continue;
        f.frz = 1;
      }
    }
  }
  if (z <= 0) for (const f of st.F) f.frz = 0;    // 램프가 끝나면 녹는다

  for (let i = st.im.length - 1; i >= 0; i--) { const q = st.im[i]; q.l += dt;
    if (q.l >= SCTICK) st.im.splice(i, 1); }

  // ══ 그리기 ═══════════════════════════════════════════════════════════════
  // ① **자리 표식** — 바닥에 서리가 먼저 돋는다. ⚠️ 판정 안내선이 아니다:
  //   부채꼴도 점선도 반경 원도 아니고, **각진 서리 자국**이 눌려 누워 있다.
  if (S.mark > .01) {
    const m = S.mark, br = 1 + .07 * Math.sin(tp * 3);
    IBroot(c, sx, sy, RAD * FQMKR * (.85 + .35 * m), "frost", .62 * m, .42);
    IBrim(c, jagPoly(sx, sy, RAD * FQMKR * br * (.62 + .38 * m), 9, 4.3, 1.05, FQMKSQ),
      "frost", .95 * m, 1.7 * SC);
    IBrim(c, jagPoly(sx, sy, RAD * FQMKR * br * (.34 + .20 * m), 9, 8.9, 1.02, FQMKSQ),
      "frost", .62 * m, 1.1 * SC);
    for (let i = 0; i < FQMKN; i++) {
      const a0 = i / FQMKN * TAU + 1.1;
      const d = RAD * FQMKR * (.58 + .34 * hash(i * 3.1));
      IBshard(c, sx + Math.cos(a0) * d, sy + Math.sin(a0) * d * FQMKSQ,
        (1.7 + 1.6 * hash(i * 5.3)) * SC * m, a0 + .6, "frost", .88 * m, .5);
    }
  }

  // 갈린 자리에 쌓이는 지면 파편 · 자란 자리의 흰 발광 (확정본 그대로)
  if (st.n > 0 && z > .01) {
    IBroot(c, sx, sy + RAD * .2, RAD * (1.6 + .10 * st.n), "frost", .62 * (st.n < N ? 1 : .5) * z, .32);
    shards(c, sx, sy + RAD * .5, Math.max(1, RAD * (1.0 + .16 * st.n)),
      Math.min(9, 3 + st.n), LV * 3.1, .45 * z, "frost");
  }
  // 총구의 흰 발광 — 나가는 동안만. 켜고 끄기는 램프(`amb`)를 탄다.
  if (S.amb > .01) IBroot(c, hx + ca * 6 * SC, hy + sa * 6 * SC, RAD * 1.5, "frost", .40 * S.amb, .34);

  mgMarks(c, tp, hx, hy, st.F, "frost", "frost", SC);

  // ── ⭐ ㉣ **누적 서리 가시 = 맞은 횟수.** 이 표에서 수를 세는 자리다 ──────
  // ⚠️ 확정본은 부채꼴로 폈는데 열한 개가 겹쳐 못 센다. 여기서는 **한 바퀴에
  //   고르게** 돌리고 가시를 **반지름 방향**으로 눕힌다 — 짧은 축(0.46R)이
  //   접선이라 N=11 에서도 이웃 사이가 벌어진다.
  if (z > .01) for (const f of st.F) {
    if (!f.mk) continue;
    const bx = hx + f.ox + f.kx, by = hy + f.oy + f.ky;
    for (let i = 0; i < f.mk; i++) {
      const a0 = FQANG + Math.PI + (i + .5) / N * TAU;
      const d = f.r * (1.08 + .10 * hash(i * 5.1));
      IBshard(c, bx + Math.cos(a0) * d, by + Math.sin(a0) * d,
        RAD * (.62 + .12 * hash(i * 3.3)), a0, "frost", .92 * z, .46);
    }
    st.dbg.mk = Math.max(st.dbg.mk, f.mk);
  }

  // ── 사슬 — 묶인 마디. 앞에서부터 줄어든다 (확정본 그대로) ────────────────
  // ⭐ **여기가 「연타 수를 센다」의 첫 자리다** — 날아가는 동안 N개가 다 보인다.
  let pyy = null, pxx = 0, pr = 0, pa = 1, minA = 1;
  const LFT = [], RGT = [];
  for (let i = st.n; i < N; i++) {
    const du = S.hp - i * GAPu; if (du < SCMUZ) continue;   // 아직 몸에서 안 나왔다
    const head = (i === st.n);
    const x = hx + ca * du * SC, y = hy + sa * du * SC, r = RAD * (head ? 1.12 : 1);
    const a = Math.min(1, (du - SCMUZ) / EMGu);   // 몸을 벗어난 만큼만 진해진다
    if (a <= .01) continue;
    minA = Math.min(minA, a);
    dep(c, y, hy, (cc, dz) => {
      const Q = [];
      for (let q = 0; q < 7; q++) {
        const a0 = q / 7 * TAU + i * .9;
        const rr = r * (.80 + .34 * hash(i * 4.7 + q * 3.1));
        Q.push([x + Math.cos(a0) * rr, y + Math.sin(a0) * rr * 1.22]);
      }
      IBcrys(cc, Q, "frost", dz * a * (head ? 1 : .88), i * 4.7 + LV,
        { mos: 2, thru: .92, w: 1.15 * SC, grain: FQANG });
    });
    if (pyy !== null) {                            // ㉠ 이음매 — 묶인 자리
      const my = (y + pyy) * .5, mx = (x + pxx) * .5;
      const mr = Math.min(r, pr) * .92, ma = Math.min(a, pa);
      dep(c, my, hy, (cc, dz) => {
        IBline(cc, [[mx + sa * mr, my - ca * mr], [mx - sa * mr, my + ca * mr]],
          1.0 * SC, "frost", .68 * dz * ma, 0);
      });
    }
    LFT.push([x + sa * r, y - ca * r]); RGT.push([x - sa * r, y + ca * r]);
    pyy = y; pxx = x; pr = r; pa = a;
  }
  if (LFT.length > 1) front((cc) => {              // 사슬을 옆에서 훑는 끈 둘
    IBline(cc, LFT, .7 * SC, "frost", .34 * minA, 0);
    IBline(cc, RGT, .7 * SC, "frost", .34 * minA, 0);
  });

  // 둘레의 마름모·반짝이 — **개수는 확정본과 같은 다섯**. 위상을 전부 주기에
  // 못 박았다(마름모는 회전 대칭이 π, 반짝이는 π/2 라 각각 π · 3π 로 맞춘다).
  // ⚠️⚠️ **한 자리를 고쳤다 — 축이다.** 확정본은 이 다섯을 `cy - S.hp*…` 로
  //   **세로선 위**에 세운다(조준이 위로 고정이던 옛 `SCspine` 의 잔재다).
  //   자리가 대각선이면 그 식은 장식을 사슬에서 떼어 놓고, 게다가 `S.hp` 는
  //   갈리는 동안 `CD + GAP×(N−1)` 까지 자라서(L5 = 221칸) 장식이 **칸 위로
  //   빠져나간다**(실측: 최소 y −76.6). ⇒ 축을 **진행 방향**으로 돌리고 길이를
  //   `min(hp, CD)` 로 **자리에서 멈춘다**. 장식이 사슬을 따라 눕고 잘림이 사라진다.
  if (S.amb > .01) {
    const uu = tau / FQPER, span = Math.min(S.hp, FQCD) * SC;
    const nx = -sa, ny = ca;                      // 진행축의 법선
    for (let i = 0; i < 5; i++) {
      const ph = tp + i * 1.7;
      const d = span * (.18 + .62 * hash(i * 6.1)) + Math.abs(Math.sin(ph)) * 6 * SC;
      const off = (hash(i * 2.3) - .5) * RAD * 5.2;
      IBshard(c, hx + ca * d + nx * off, hy + sa * d + ny * off,
        (1.6 + 1.5 * hash(i * 5.1)) * SC, ph * .5 + i, "frost", .72 * S.amb);
    }
    for (let i = 0; i < 5; i++) {
      const ph = (uu * 3 + i * .37) % 1;
      const d = span * hash(i * 8.1);
      const off = (hash(i * 3.7) - .5) * RAD * 4.6;
      IBspark(c, hx + ca * d + nx * off, hy + sa * d + ny * off,
        (2.0 + 1.4 * hash(i * 6.3)) * SC, "frost",
        (.32 + .62 * Math.sin(ph * Math.PI)) * S.amb, uu * Math.PI * 3 + i);
    }
  }

  // ── ㉢ 탄착 마디 — 한 대마다 자리에서 한 번. 확정본 그대로 ───────────────
  for (const q of st.im) {
    const v = q.l / SCTICK, a = (1 - v) * (q.h ? 1 : .52);
    IBrim(c, jagPoly(sx, sy, RAD * (1.0 + 2.2 * v), 9, q.s, 1.08, .84), "frost",
      a * .88, 1.5 * SC * (1 - v * .55));
  }

  // ── 조각 — 갈릴 때·터질 때 튄다. **난수 0**(자리·시각이 전부 표에서 나온다) ──
  for (const g of st.ch) {
    const base = g.bo ? S.boom : S.q, ts = base - g.b;
    if (ts <= 0 || ts >= g.m) continue;
    const w = ts / g.m;
    IBshard(c, sx + Math.cos(g.a) * g.v * ts, sy + Math.sin(g.a) * g.v * ts + .5 * g.g * ts * ts,
      g.r * (1 - .45 * w), g.a + 1.1, "frost", Math.min(1, w * 9) * (1 - w) * .92, .5);
  }

  // ── 얼음 폭발 — 퍼지는 테(넉백) → 오므라드는 테(빙결) (확정본 그대로) ────
  if (S.boom >= 0 && BOOM) {
    if (S.boom < SCFRZ) {
      const v = Math.min(1, S.boom / SCKB);
      IBrim(c, jagPoly(sx, sy, BR * (.28 + .80 * v), 11, 5.7, 1.10, .86), "frost",
        (1 - v * .72), 2.4 * SC * (1 - v * .55));
      IBroot(c, sx, sy, BR * (.5 + .5 * v), "frost", .55 * (1 - v), .40);
    } else {
      const v = Math.min(1, (S.boom - SCFRZ) / .30);
      IBrim(c, jagPoly(sx, sy, BR * (1.06 - .44 * v), 11, 9.1, 1.04, .86), "frost",
        (1 - v) * .95, 2.6 * SC * (1 - v));
      // 언 놈마다 육각 눈송이 도장 — 「멈췄다」를 못 박는다
      if (v < 1) for (const f of st.F) {
        if (!f.frz) continue;
        IBflake(c, hx + f.ox + f.kx, hy + f.oy + f.ky, f.r * (1.05 + .25 * v), tp * .06,
          "frost", (1 - v) * .85 * z, 1.0 * SC, .9);
      }
    }
  }

  hero(c, th, hx, hy);
},
});

// ── 검산용 창구 — 그리기와 **같은 함수**를 내보낸다 ───────────────────────
window.FQDBG = { sched: FQsched, z: FQz,
  K: { FQPER, FQTELE, FQSPD, FQHX, FQHY, FQSPOT, FQBITE, FQTH0, FQTH1, FQEMG,
       FQAMBIN, FQMKOUT, FQMKSQ, FQMKR, FQMKN, FQCN, FQCL, FQCV, FQCVR, FQCG,
       FQCS, FQBN, FQBL, FQBV, FQBVR, FQBG, FQFOE, FQCD, FQANG, FQFLY, FQTA },
  E: { SCN, SCRAD, SCBOOM, SCPER, SCFLY, SCHIT, SCMUZ, SCBR, SCKB, SCFRZ,
       SCTICK, SCGAPM } };

// ── 다섯 칸 ───────────────────────────────────────────────────────────────
/// ⚠️ **문구를 지어내지 않았다.** 수는 전부 `SCN`·`SCRAD`·`SCBOOM` 에서 왔고,
///   말은 도감(`lib/data/weapons.dart` 의 `frostcrystal`, 시안의 `SCspine`
///   성장표가 옮겨 둔 원문)에서 왔다. 달라진 한 줄은 **표적이 「처음 맞은 적」
///   에서 「고른 자리」로 바뀐 것**뿐이고, 그것이 이 사이클의 확정 설계다.
const FQROW = ["FQlv", "서리결정 霜結晶 · 지점 폭발",
  "연타 5 · 7 · 9 · 9 · 11 — 얼음 폭발은 L4 · L5 만. 사거리는 다섯 칸이 같다", [
    "사슬 <b>마디 5</b> — 고른 자리에 박혀 <b>5연타</b>. 마디 반지름 <b>5.2</b>" +
    "(사슬 굵기 10.4) · 얼음 폭발 <b>없다</b>",
    "<b>7연타</b> — 마디 둘이 붙는다. 반지름 <b>5.7</b>(굵기 11.4, <b>+9.6%</b>)" +
    " · 폭발 없다",
    "<b>9연타</b> — 마디 둘이 더. 반지름 <b>6.2</b>(굵기 12.4, <b>+8.8%</b>)" +
    " · 폭발 없다",
    "연타는 <b>9 그대로</b> — 이 칸의 사건은 <b>얼음 폭발</b>이다. 마지막 마디가 " +
    "부서지면 <b>그 자리에서</b> 밀어내고 <b>0.22초 뒤</b> 반경 32 안이 언다. " +
    "반지름 <b>6.7</b>(굵기 13.4)",
    "각성 — <b>11연타</b> + 얼음 폭발. 반지름 <b>7.2</b>(굵기 14.4, L1 의 " +
    "<b>1.385배</b>)"]];

/// 칸을 크게 쓴다 — `.lvset` 은 넓은 화면에서 덩어리를 둘씩 세우고 `--blockmax`
/// 가 754px 라 한 칸이 150px 로 줄어든다. 이 줄만 **한 줄을 통째로** 쓰게 해
/// 칸을 ~311px 로 키운다(`vfx-flamelv.js` 의 `FLXrelay` 와 같은 수법).
/// ⚠️ **2열로 접히는 것과는 다른 이야기다.** 칸이 몇 열인지는 `--n`(=5) 이 정하고
///   접히는 자리는 `@media(max-width:640px)` 하나뿐이다(폰).
/// ⚠️ `flex` 로 전폭을 만들면 안 된다 — `mockup_lint.js` 검사 ④ 가 잡는다.
const FQCELL = 236;

{
  const H = document.getElementById("cifrostlv");
  // ⚠️ **호스트가 없는 장에서는 조용히 건너뛴다.** 이 그림은 빙 氷 캐릭터 장의
  //   것이고, 다른 장이 이 파일을 실을 일은 없다.
  if (H) {
    const made = lvTable({ host: H, rows: [FQROW], reg: FX,
      cell: FQCELL, name: "FQcell" });
    // ⚠️ 스모크 하네스의 가짜 DOM 에는 `lastElementChild` 가 없다 — 없으면
    //   폭 조정만 건너뛴다(그림은 이미 다 붙었다).
    const row = made && H.lastElementChild;
    if (row && row.style) {
      row.style.gridColumn = "1 / -1";
      row.style.setProperty("--blockmax", "none");
    }
  }
}
