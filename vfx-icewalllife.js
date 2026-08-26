// ══════════════════════════════════════════════════════════════════════════
// IW — 빙벽 셋의 **나고 죽는 법**                                (2026-08-23)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 사용자 지시 원문: 「빙에 **빙벽 3개**(빙벽 기본 · 바늘 숲 · 모자이크 석벽)
//   스킬이 시전되어 **벽이 생성되는 이미지**부터 벽이 **망가져서 혹은 지속시간이
//   끝나서 사라지는 이펙트**도 같이 만들어야 되어서 **개선 대상**」
//
// ⭐ **확정본(`AWwall1`·`AWwall2`·`AWwall4`)은 「서 있는 벽」만 그린다.**
//   칸을 열면 벽이 이미 서 있고, 깎임(`st.hp`)이 있긴 하지만 그건 **적이
//   때려서** 나는 일이라 「어떻게 서는가」와 「수명이 다하면 어떻게 되는가」는
//   한 프레임도 안 그려졌다. 이 저장소는 그 부류를 **「시안이 안 다룬 상태」**
//   라 부른다(`docs/vfx/mockup-miss.html` 머리말).
//
// ⚠️⚠️ **그래서 엔진이 지어냈다.** 2026-08-22 사용자 실기 판정(「뻘하게
//   스티커가 나오듯」)에 밀려 `w_barrier_ice_parts.dart` 가 솟는 연출 셋
//   (높이 · 마루선 · 밑동 번쩍)을 **시안 없이** 만들었고, 그 파일 머리말이
//   스스로 「⚠️⚠️ **시안에 없다 — 엔진이 만들었다**」고 적어 두었다.
//   ⇒ **이 파일이 그 빈칸의 정본이다.** 여기서 정하고 저기가 따른다.
//
// ── ⭐ 사라짐은 **알파가 아니라 개수**다 ──────────────────────────────────
// 서리결정 담당이 같은 날 낸 판정을 그대로 쓴다(`vfx-frostmiss.js` 머리말):
//   「녹는(알파만 내리는) 안은 반려했다: 알파가 내려가는 동안 사슬이 **그 자리에
//    그대로 떠 있어** 『굳어져 있음』과 화면에서 구별이 안 된다.」
// 빙벽은 그 함정이 더 크다 — 벽은 **면**이라 반투명해지면 「사라지는 중」이
// 아니라 **「얇은 벽」**으로 읽힌다. 그래서 셋 다 사라짐을 **개수 · 길이 ·
// 높이**로만 낸다. 이 파일에서 알파가 시간을 타는 것은 **밑동 자국** 하나뿐이고,
// 그것은 벽이 이미 통째로 없어진 **뒤에만** 남는다(아래 [IWTAIL]).
//
// ⚠️ 이 저장소의 규약 「**성기다 ≠ 투명하다**」와 같은 줄이다 — 반투명 막은
//   구멍이 아니다. 여기서 성김은 **안 그리는 것**으로 낸다.
//
// ── ⭐⭐ 세 벽이 **각자의 정체에서** 나고 죽는다 ──────────────────────────
// 셋이 같은 연출을 쓰면 「세 개를 만들었다」가 아니라 「하나를 세 번 그렸다」다.
// 그래서 나고 죽는 순서를 **그 벽이 이미 갖고 있는 축**에서 뽑았다:
//
// | | 정체(확정본·도감) | **난다** | **수명이 다한다** | **망가진다** |
// |---|---|---|---|---|
// | 호 A 겹친 유리판 | 판이 **겹쳐** 선다 | 가운데부터 **한 장씩 겹쳐 든다** | 끝에서부터 **한 장씩 주저앉는다** | 금이 가고 **한꺼번에** 터진다 |
// | 호 B 바늘 숲 | 성장축이 **버팀(시간)** | **긴 것이 늦게** 자란다 | **짧은 것부터** 밑동으로 스민다 | **긴 것부터** 꺾이고 **그루터기**가 남는다 |
// | 호 D 모자이크 석벽 | 성장축이 **겹(줄)** | **안쪽 줄부터** 쌓인다 | **바깥 줄부터** 통째로 빠진다 | **맞은 칸만** 떨어져 구멍이 뚫린다 |
//
// ⭐ 셋의 갈림이 **키 하나**에 다 들어 있다([IWramp] 의 `k`):
//   · 판   `k=|u-.5|*2`  — 같은 키가 「가운데부터 서고 끝부터 진다」를 **동시에** 낸다
//   · 바늘 `k=rank` ↔ `k=1-rank` — 나는 키와 지는 키가 **뒤집힌다**. 그것이
//     「자랄 때는 긴 것이 늦고, 스밀 때는 긴 것이 남는다」이고, 이 벽의 성장축
//     (버팀=시간)이 그림에서 읽히는 유일한 자리다
//   · 벽돌 `k=row` — 쌓은 순서의 **역**. 줄 단위라 **질서**가 있고, 그것이
//     망가짐(맞은 칸만 = **무질서**)과 갈리는 자리다
//
// ⚠️ **모자이크만 채도가 빠져 있다**(`lib/render/cel_tones.dart` 의 `icebrick`:
//   「여섯 중 유일하게 덩어리(면)라, 얼음과 같은 채도로 두면 화면에서 『푸른
//   판때기』가 되고 석벽으로 안 읽힌다」). 그래서 이 벽의 죽음에는 **반짝이를
//   한 톨도 안 뿌린다** — 뿌리는 순간 채도가 되돌아와 정체가 지워진다.
//   나머지 둘과 달리 벽돌은 **구조만으로** 죽는다.
//
// ── 시각표 — **엔진 상수 그대로다. 여기서 새로 짓는 것은 [IWDIE] 하나** ────
//   [IWPER]  6.00 = `kIceArcCastPeriod`   한 바퀴 = 한 번의 시전
//   [IWRISE] 0.35 = `kIceArcRiseSec`      솟는 데 걸리는 시간
//   [IWLIFE] 3.00 = `kIceArcLifeSec`      막는 벽으로 서 있는 시간
//   [IWDIE]  0.45 = **새로 정한다**       다 죽는 데 걸리는 시간
// ⚠️ `3.00 + 0.45 = 3.45 < 6.00` — 죽는 연출이 **다음 시전을 침범하지 않는다.**
//   벽 규약 ③(「수명 < 주기」로 벽이 아예 없는 구간이 산수로 보장된다)이
//   죽는 연출을 얹어도 그대로 산다.
//
// ── ⚠️ 「망가짐」은 지금 엔진에 **없는 사건**이다 ──────────────────────────
// `icearc.dart` 의 벽은 **내구도가 없다** — `standing` 은 `_r > 0 && _age <
// kIceArcLifeSec` 하나이고 죽는 길이 **수명 하나뿐**이다. 확정본 시안에는
// `st.hp` 가 있는데(적이 때리면 깎인다) 엔진이 그것을 **일부러 안 옮겼고**
// 근거도 적어 두었다(`w_barrier_ice_cel.dart`: 「엔진의 셋은 내구도 없는
// 장판이라 깎임(sh)이 늘 0 이다」).
// ⇒ 그래서 이 파일은 **둘 다 그리되 갈라 그린다.** 오른쪽 석 장(`IW*x`)은
//   **지금 엔진이 못 내는 장면**이고, 켜려면 시뮬에 벽 HP 가 생겨야 한다 —
//   그것은 그림이 아니라 **밸런스**라(압력이 높을수록 벽이 일찍 죽는다 =
//   제일 필요할 때 제일 약해진다) 사람이 정할 일이다. 정본은 여기 남겨 둔다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️ `docs/vfx/vfx.js`(50,349줄)는 **읽기만** 한다. 최상위 이름을 전부 `IW`
//   로 격리했다(확인: `IW` 로 시작하는 최상위 이름은 `vfx.js` 와 곁 파일
//   아홉에 **0건**).
// ⚠️ **값을 창작하지 않는다.** 서 있는 벽의 모양(개수 · 폭 · 알파 · 씨앗 ·
//   테 두께)은 확정본 `AWwall1`·`AWwall2`·`AWwall4` 에서 **한 자도 안 고치고**
//   옮겼다. 이 파일이 더하는 것은 **시간축 하나**다.
// ⚠️ **난수 0건.** `Math.random`(=`R`)을 부르는 도구를 하나도 안 쓴다 —
//   `emit`/`stepP`/`drawP` 가 그래서 빠졌고, 파편은 `hash` 로만 도는
//   `IBpushFrag` 를 쓴다. 이 저장소가 같은 원인으로 네 번 반려됐다.
// ⚠️ **가짜 적을 안 세운다.** 확정본 타일은 적 넷을 늘 세워 두는데, 그 습관이
//   정확히 「시안이 안 다룬 상태」를 낳은 병이다(`vfx-frostmiss.js` ④).
//   여기서 물어야 할 것은 「벽이 어떻게 나고 죽나」 하나이고, 적과 부딪히는
//   그림의 정본은 **위쪽 확정본 타일**이 이미 갖고 있다. 덤으로 이 칸은
//   **상태도 난수도 없어** 위상에서 통째로 파생된다.
// ⚠️ 게이트(`mockup_lint.js`·`mockup_smoke.js`)는 `vfx.js` 하나만 읽는다.
//   자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-icewalllife.js > /tmp/z.js &&
//              node tools/mockup_smoke.js /tmp/z.js`
// ⚠️ 호스트(`icelife`)가 없는 장에서는 조용히 건너뛴다.
// ══════════════════════════════════════════════════════════════════════════

/// 호 기하 — **확정본과 같은 객체를 문다.** 베껴 적으면 그날로 갈라진다.
const IWG = AWG;

/// 시각표. [IWDIE] 만 이 파일이 새로 정한다(위 「시각표」 절).
const IWPER = 6.0, IWRISE = 0.35, IWLIFE = 3.0, IWDIE = 0.45;

/// 망가지는 판의 시각 — 깎이기 시작하는 때 · 무너지는 때(초).
/// ⚠️ 둘 다 [IWLIFE] 보다 **한참 앞**이어야 한다. 수명 근처에서 부수면 두
///   죽음이 화면에서 같은 사건으로 보인다.
const IWWEAR = 0.95, IWBRK = 1.90;

/// 구조가 다 없어지는 지점(죽는 시간의 몫). 나머지 [1−IWTAIL] 동안 **밑동
/// 자국**만 남는다 — 이 파일에서 알파가 시간을 타는 **유일한** 자리이고,
/// 벽이 이미 통째로 없어진 뒤라 「굳어져 있음」과 헷갈릴 것이 없다.
const IWTAIL = 0.70;

/// 밑동이 시전 순간 얼마나 더 밝은가 — 엔진 `_kRootFlare` 와 같은 값.
const IWFLARE = 0.9;

/// 한 바퀴의 상태. [x] 0 = **수명이 다한다** · 1 = **망가진다**.
///
/// ⭐ **그려지는 값이 전부 이 하나에서 파생한다** — 주기의 끝(s→6⁻)과 처음
///   (s=0)이 둘 다 「아무것도 안 그림」이라 이음매가 없다. 시전 순간(s=0)의
///   밑동 번쩍은 **사건**이라 도약이 맞다(엔진도 같다).
function IWlife(t, x) {
  const s = saw(t, IWPER) * IWPER;
  // 감속 큐빅 — u=1 에서 값이 정확히 1 이고 기울기가 0(엔진 `rise` 와 같은 식).
  const rise = s >= IWRISE ? 1 : ease(s / IWRISE);
  // 깎임 — 망가지는 판에서만. 무너지기 직전에 1 에 닿는다.
  const wear = x && s > IWWEAR
    ? Math.min(1, (s - IWWEAR) / (IWBRK - IWWEAR)) : 0;
  const at = x ? IWBRK : IWLIFE;
  // 죽는 진행 0~1.
  const g = s > at ? Math.min(1, (s - at) / IWDIE) : 0;
  return {
    s, rise, wear, g,
    /// 구조가 남은 몫 — [IWTAIL] 에서 이미 0 이다.
    left: 1 - Math.min(1, g / IWTAIL),
    /// 밑동 자국 — 구조보다 늦게 꺼진다.
    glow: (1 - g) * (1 + IWFLARE * (1 - rise)),
    /// 벽이 아직 하나라도 그려질 구간인가.
    on: s < at + IWDIE,
  };
}

/// **차례로 도는 램프** — 원소마다 시작이 다르고 **양 끝은 전부 정확히 0·1**.
///
/// [k] 0~1 = 차례 키(클수록 **늦게 서고 먼저 진다**) · [tight] 0 = 전부 동시,
/// 1 에 가까울수록 차례가 뚜렷. 나는 몫은 `IWramp(rise,k,t)`, 남은 몫은
/// `IWramp(left,k,t)` — **같은 함수 하나**라 두 사건의 박자가 못 갈린다.
///
/// ⚠️ `u=1` 에서 `(1-k*tight)/(1-tight) ≥ 1` 이라 **모든 원소가 정확히 1**,
///   `u=0` 에서 전부 정확히 0 이다. 그래서 정지 상태와 글자 그대로 이어진다.
function IWramp(u, k, tight) {
  const v = (u - k * tight) / (1 - tight);
  return v < 0 ? 0 : (v > 1 ? 1 : v);
}

/// 밑동 발광 한 줄 — 셋이 나눠 쓴다(확정본의 `AWroot` 호출부 그대로).
function IWroots(c, cx, cy, RB, SPAN, n, rr, al, sq, gl) {
  const a = al * gl;
  if (a <= 0.01) return;
  for (let i = 0; i < n; i++)
    AWroot(c, cx, cy, AWang((i + 0.5) / n, SPAN), RB, rr, "frost", a, sq);
}

/// **시전 마루선** — 솟는 벽의 꼭대기를 앞질러 가는 얇은 획 하나.
///
/// ⚠️⚠️ **엔진이 먼저 만든 것을 시안이 되받는다.** 2026-08-22 에
///   `w_barrier_ice_parts.dart` 가 시안 없이 지어낸 셋 중 하나이고, 그 파일이
///   스스로 「시안에 없다 — 엔진이 만들었다」고 적어 두었다. 여기가 그 빈칸의
///   정본이 되는 이상 **그 획을 이 파일이 승인하거나 버려야 한다** — 그냥 두면
///   시안과 엔진이 서로 다른 벽을 그리게 되고, 지문 하네스가 그 차이를 「층
///   누락」으로 읽는다. ⇒ **승인한다.** 근거는 엔진이 적어 둔 그대로다:
///   면이 아니라 **선**이라 이 게임의 병목(칠하기)을 안 건드리면서
///   「선이 벽을 끌어올린다」를 만든다.
///
/// ⭐ 값도 엔진 것을 그대로 쓴다(마디 11 · 앞섬 1.18 · 굵기 1.7 · 알파 1−rise).
///   `rise==1` 에서 알파가 정확히 0 이라 **정지 상태와 글자 그대로 이어진다.**
/// ⚠️ **죽을 때는 안 긋는다.** 죽음은 개수로 내는 사건이라(머리말) 여기에 획을
///   하나 더 얹으면 「선이 벽을 끌어내린다」가 개수를 덮어 읽힌다.
function IWcrest(c, cx, cy, RB, TH, SPAN, SC, rise) {
  const fade = 1 - rise;
  if (fade <= .02) return;
  const lead = Math.min(1, rise * 1.18), pts = [];
  for (let i = 0; i <= 11; i++) {
    const u = i / 11, uu = Math.abs(u - .5) * 2, a = AWang(u, SPAN);
    const d = RB + (AWface(RB, TH, uu) - RB) * lead;
    pts.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d]);
  }
  IBline(c, pts, 1.7 * SC, "frost", fade);
}

/// 파편 바구니 — **바퀴가 바뀌면 통째로 버린다.**
///
/// ⚠️ 파편만은 위상 파생이 아니라 상태다(`IBstepFrag` 가 dt 로 적분한다) —
///   확정본 `AWburst` 와 같은 자리이고, 수명 0.70초라 다음 바퀴(6.0초) 전에
///   반드시 빈다. 바퀴가 바뀔 때 버려서 이음매를 없앤다.
function IWfrag(st, t, dt, SC) {
  const cyc = Math.floor(t / IWPER);
  if (st._c !== cyc) { st._c = cyc; st.fr = []; st._b = 0; st._m = 0; }
  IBstepFrag(st, dt, SC);
}

/// 한 바퀴에 **한 번만** 터진다 — 되면 true.
function IWonce(st) { if (st._b) return false; st._b = 1; return true; }

/// 낱칸이 **제 차례에 한 번만** 떨어진다(비트 하나가 칸 하나) — 되면 true.
function IWfell(st, i) {
  const m = 1 << i;
  if (st._m & m) return false;
  st._m |= m; return true;
}

Object.assign(FX, {

// ── 호 A · **겹친 유리판** — 가운데부터 겹쳐 들고, 끝부터 주저앉는다 ──────
//
// 이 벽의 정체는 「겹친다」다(확정본: 「판 아홉이 호를 따라 서고, 접선 겹침이
// 끝으로 갈수록 깊어진다」). 그래서 **한꺼번에 솟으면 겹친 것이 안 보인다** —
// 가운데 판이 먼저 서고 옆 판이 그 어깨에 겹쳐 드는 차례가 있어야 겹침이 사건이
// 된다. 지는 것은 그 역이다: 끝(제일 얇고 제일 늦게 선 자리)이 먼저 못 버틴다.
//
// ⭐ **키가 하나다** — `k=|u-.5|*2`. 이 한 줄이 「가운데부터 선다」와 「끝부터
//   진다」를 **동시에** 낸다(램프가 `k` 를 늦게 시작·먼저 끝으로 읽으므로).
IWpaneA(c, t, dt, W, H, st) { IWpane(c, t, dt, W, H, st, 0); },
IWpaneAx(c, t, dt, W, H, st) { IWpane(c, t, dt, W, H, st, 1); },

// ── 호 B · **바늘 숲** — 긴 것이 늦게 자라고, 짧은 것부터 스민다 ──────────
//
// 성장축이 **버팀(시간)**이다(`barrier_ice_tuning.dart`: 「시안 `AWwall2` 의
// 성장축은 『버팀(시간) — 얼마나 오래 서 있나』」). 그 축을 그림으로 옮기면
// **긴 바늘 = 오래 버티는 것**이다:
//   · 날 때  긴 것이 **늦게** 다 자란다 (`k=rank`)
//   · 질 때  짧은 것이 **먼저** 스민다 — 긴 것이 마지막까지 남아 숲이 성기어진다
//     (`k=1-rank`)
//   · 부러질 때 **긴 것부터** 꺾인다 (확정본 `cut` 규칙 그대로 — `rank<sh*1.15`)
// ⇒ 나는 순서와 스미는 순서가 **뒤집혀 있고**, 부러지는 순서는 스미는 순서와
//   **또 반대**다. 세 사건이 한 축(`rank`)의 세 함수라 헷갈릴 수가 없다.
IWneedleB(c, t, dt, W, H, st) { IWneedle(c, t, dt, W, H, st, 0); },
IWneedleBx(c, t, dt, W, H, st) { IWneedle(c, t, dt, W, H, st, 1); },

// ── 호 D · **모자이크 석벽** — 안쪽 줄부터 쌓이고, 바깥 줄부터 빠진다 ─────
//
// 성장축이 **겹(줄)**이다(`barrier_ice_tuning.dart`: 「시안 `AWwall4` 의
// 성장축은 『겹(반지름) — 몇 겹을 뚫어야 하나』」). 쌓는 물건이므로 **줄이
// 단위**다: 안쪽 줄이 다 앉은 뒤에야 바깥 줄이 그 위에 얹히고, 수명이 다하면
// 얹은 순서의 역으로 바깥 줄이 통째로 빠진다.
//
// ⭐ 두 죽음이 **질서로** 갈린다 — 수명은 **줄 단위**(질서), 망가짐은 **맞은
//   칸만**(구멍). 같은 벽이 어떻게 사라지느냐로 원인이 읽힌다.
// ⚠️ **반짝이를 한 톨도 안 뿌린다** — 이 벽은 채도를 뺀 것이 정체다(머리말).
IWbrickD(c, t, dt, W, H, st) { IWbrick(c, t, dt, W, H, st, 0); },
IWbrickDx(c, t, dt, W, H, st) { IWbrick(c, t, dt, W, H, st, 1); },

});

// ══════════════════════════════════════════════════════════════════════════
// 그리기 — 서 있는 벽의 모양은 확정본에서 **한 자도 안 고쳤다.**
// ══════════════════════════════════════════════════════════════════════════

/// 판 아홉이 겹쳐 서는 것 — 확정본 `AWwall1` + 시간축.
function IWpane(c, t, dt, W, H, st, x) {
  const cx = W / 2, cy = H / 2, SC = Math.min(W, H) / 238;
  const RB = IWG.R * SC, TH = IWG.TH * SC, SPAN = IWG.SPAN, N = 9;
  const L = IWlife(t, x);
  IWfrag(st, t, dt, SC);
  const TIGHT = 0.55;                    // 겹쳐 드는 차례가 보일 만큼만
  // ⭐ 무너질 때는 판이 **한 프레임에 통째로** 없어지고 그 자리에 파편이 선다 —
  //   수명(차례차례 주저앉는다)과 갈리는 자리가 정확히 이 「동시에」다.
  const blown = x && L.g > 0;
  if (blown && IWonce(st)) for (let i = 0; i < N; i += 2) {
    const a = AWang((i + .5) / N, SPAN), r = RB + TH * .55;
    IBpushFrag(st, cx + Math.cos(a) * r, cy + Math.sin(a) * r, TH * .38, SC, 1);
  }
  if (L.on) {
    IWroots(c, cx, cy, RB, SPAN, 5, TH * 0.92, 0.40, 0.34, L.glow);
    const SP = (RB + TH * 0.40) * SPAN / N;
    for (let i = 0; i < N; i++) {
      const u = (i + 0.5) / N, a = AWang(u, SPAN), uu = Math.abs(u - 0.5) * 2;
      // ⭐ 한 키가 둘을 낸다 — 늦게 서는 것이 먼저 진다.
      const p = blown ? 0
        : IWramp(L.rise, uu, TIGHT) * IWramp(L.left, uu, TIGHT);
      if (p <= 0.004) continue;
      // 높이는 **벽면까지의 몫**에만 곱한다 — 밑동은 그 자리다(엔진 규약).
      const hh = (AWface(RB, TH, uu) - RB) * (0.86 + 0.86 * hash(i * 3.1)) * p;
      const ww = SP * (0.92 + 0.44 * hash(i * 7.7)), ln = (hash(i * 5.3) - 0.5) * 0.9;
      const base = RB + TH * 0.10 + Math.sin(t * 1.1 + i) * 1.2 * SC;
      const P = AWpoly(cx, cy, a, base,
        [[-ww, 0], [-ww * .94, -hh * .34], [-ww * .46 + ln * ww * .5, -hh * .88],
         [ln * ww, -hh], [ww * .72 + ln * ww, -hh * .60], [ww * .98, -hh * .10],
         [ww * .88, 0]]);
      IBpane(c, P, "frost", (.92 - L.wear * .30) * (i % 2 ? 1 : .84), i * 4.1, 1.3 * SC);
    }
    // 금 — 깎일수록 판을 반지름 방향으로 가로지른다(확정본 그대로).
    // **망가지는 판에만 있다** — 수명이 다해 지는 벽은 안 깎였으니 금이 없다.
    if (L.wear > .12) for (let i = 0; i < 4; i++) {
      const a = AWang((i + .62) / 4, SPAN), pts = [];
      for (let j = 0; j <= 4; j++) pts.push(AWpt(cx, cy, a,
        RB + TH * 1.12 - TH * 1.12 * (j / 4) * Math.min(1, L.wear * 1.7),
        (hash(i * 9 + j) - .4) * TH * .42));
      IBline(c, pts, 1.5 * SC * L.wear, "frost", Math.min(1, L.wear * 1.5), 0);
    }
    // 떠 있는 마름모 — 벽이 지면 같이 진다(개수로).
    for (let i = 0; i < 6; i++) {
      const p = blown ? 0
        : IWramp(L.rise, hash(i * 5.9), TIGHT) * IWramp(L.left, hash(i * 5.9), TIGHT);
      if (p <= .01) continue;
      const ph = t * .5 + i * 1.7, a = AWang(hash(i * 2.3), SPAN);
      const q = AWpt(cx, cy, a, RB + (TH * 1.32 + Math.abs(Math.sin(ph)) * 13 * SC) * p, 0);
      IBshard(c, q[0], q[1], (2.4 + 2.2 * hash(i * 5.1)) * SC, ph * .5 + i, "frost", .85);
    }
    IWcrest(c, cx, cy, RB, TH, SPAN, SC, L.rise);
  }
  IBdrawFrag(c, st, SC);
  hero(c, t, cx, cy);
}

/// 바늘 열넷이 방사하는 것 — 확정본 `AWwall2` + 시간축.
function IWneedle(c, t, dt, W, H, st, x) {
  const cx = W / 2, cy = H / 2, SC = Math.min(W, H) / 238;
  const RB = IWG.R * SC, TH = IWG.TH * 1.13 * SC, SPAN = IWG.SPAN, N = 14;
  const L = IWlife(t, x);
  IWfrag(st, t, dt, SC);
  const TIGHT = 0.70;                    // 「자란다」가 이 벽의 사건이라 뚜렷하게
  // 꺾일 때 — 큰 바늘이 한 번에 부러져 날아가고 **그루터기가 남는다**.
  const snapped = x && L.g > 0;
  if (snapped && IWonce(st)) for (let i = 0; i < N; i += 3) {
    const a = AWang((i + .5) / N, SPAN), r = RB + TH * .6;
    IBpushFrag(st, cx + Math.cos(a) * r, cy + Math.sin(a) * r, TH * .26, SC, 1);
  }
  if (L.on) {
    IWroots(c, cx, cy, RB, SPAN, 6, TH * 1.00, .60, .28, L.glow);
    // 뿌리 부스러기 — **제일 먼저 돋고 제일 늦게 스민다.** 숲의 바닥이다.
    const gp = IWramp(L.rise, 0, TIGHT) * L.left;
    if (gp > .01) for (let i = 0; i < 12; i++) {
      const a = AWang((i + .5) / 12, SPAN) + (hash(i * 4.7) - .5) * .09;
      const q = AWpt(cx, cy, a, RB - 1.5 * SC, 0);
      IBneedle(c, q[0], q[1], a + (hash(i * 3.3) - .5) * 1.5,
        (4 + 5 * hash(i * 8.9)) * SC * gp, 1.7 * SC, i * 2.1, "frost", .85, { mos: 1 });
    }
    for (let i = 0; i < N; i++) {
      const rank = hash(i * 6.1);        // 0 = 짧다 · 1 = 길다
      const u = (i + .5) / N, uu = Math.abs(u - .5) * 2;
      // ⭐ 나는 키와 지는 키가 **뒤집힌다** — 긴 것이 늦게 자라고 마지막까지 남는다.
      const p = snapped ? 0
        : IWramp(L.rise, rank, TIGHT) * IWramp(L.left, 1 - rank, TIGHT);
      // 부러짐 — **긴 것부터**(확정본 `cut` 규칙 그대로).
      const cut = rank < L.wear * 1.15 ? .30 + .18 * hash(i * 2.9) : 1;
      const len = (AWface(RB, TH, uu) - RB) * (.78 + 1.20 * rank) * p * cut;
      if (len <= .6 * SC) continue;
      const a = AWang(u, SPAN) + (hash(i * 5.5) - .5) * .05;
      const ang = a + (u - .5) * .30 + (hash(i * 9.7) - .5) * .30;
      const q = AWpt(cx, cy, a, RB, 0);
      IBneedle(c, q[0], q[1], ang, len, (3.2 + 2.4 * hash(i * 7.3)) * SC, i * 3.7,
        "frost", 1, { mos: 2, tip: .20, slant: .55 + .5 * hash(i * 1.9) });
      if (cut < 1) IBspark(c, q[0] + Math.cos(ang) * len, q[1] + Math.sin(ang) * len,
        4 * SC, "frost", .7, t * 2 + i);
    }
    IWroots(c, cx, cy, RB, SPAN, 4, TH * .60, .48, .24, L.glow);
    for (let i = 0; i < 7; i++) {
      const p = snapped ? 0
        : IWramp(L.rise, hash(i * 4.1), TIGHT) * IWramp(L.left, hash(i * 4.1), TIGHT);
      if (p <= .01) continue;
      const ph = t * .6 + i * 1.3, a = AWang(hash(i * 2.3), SPAN);
      const q = AWpt(cx, cy, a, RB + (TH * 1.20 + Math.abs(Math.sin(ph)) * 15 * SC) * p, 0);
      IBshard(c, q[0], q[1], (2.2 + 2.4 * hash(i * 5.1)) * SC, ph * .4 + i, "frost", .8);
    }
    // **그루터기** — 부러진 뒤에만 남는다(확정본의 `else` 가지). 수명이 다해
    // 스민 벽에는 없다: 스민 것은 밑동으로 들어갔지 꺾여 남은 것이 아니다.
    if (snapped) for (let i = 0; i < 9; i++) {
      const a = AWang((i + .5) / 9, SPAN), q = AWpt(cx, cy, a, RB, 0);
      IBneedle(c, q[0], q[1], a, (5 + 4 * hash(i * 3.1)) * SC * L.left, 2.2 * SC,
        i * 3.7, "frost", .75, { mos: 1 });
    }
    IWcrest(c, cx, cy, RB, TH, SPAN, SC, L.rise);
  }
  IBdrawFrag(c, st, SC);
  hero(c, t, cx, cy);
}

/// 벽돌 7열×2줄이 부채꼴로 쌓이는 것 — 확정본 `AWwall4` + 시간축.
function IWbrick(c, t, dt, W, H, st, x) {
  const cx = W / 2, cy = H / 2, SC = Math.min(W, H) / 238;
  const RB = IWG.R * SC, TH = IWG.TH * 1.47 * SC, SPAN = IWG.SPAN;
  const COL = 7, ROW = 2, NB = COL * ROW;
  const L = IWlife(t, x);
  IWfrag(st, t, dt, SC);
  // ⭐ **두 줄이 정확히 잇달아 선다** — 키가 `row/(ROW-1)` = {0,1} 이므로
  //   `tight=.5` 에서 안쪽 줄이 끝나는 지점이 바깥 줄이 시작하는 지점이다.
  //   쌓는 물건이라 이 자리는 취향이 아니라 **산수**다(겹치면 떠 있게 된다).
  const TIGHT = 0.5;
  const dq = SPAN / COL;
  const bu = i => ((i % COL) + .5) / COL, ba = i => AWang(bu(i), SPAN);
  const buu = i => Math.abs(bu(i) - .5) * 2;
  if (L.on) {
    IWroots(c, cx, cy, RB, SPAN, 5, TH * .95, .36, .30, L.glow);
    for (let i = 0; i < NB; i++) {
      const row = i / COL | 0, k = row / (ROW - 1);
      // ⭐ 안쪽 줄부터 쌓이고 **바깥 줄부터** 빠진다 — 키 하나가 둘을 낸다.
      let p = IWramp(L.rise, k, TIGHT) * IWramp(L.left, k, TIGHT);
      // 망가짐 — **맞은 칸만** 떨어진다. 칸마다 다른 문턱이라 구멍이 무질서하다
      // (수명이 줄 단위인 것과 정확히 갈리는 자리). 떨어지는 칸은 **제 자리에**
      // 파편을 하나 남긴다 — 「구멍이 뚫렸다」의 원인이 화면에 있어야 한다.
      if (x && L.wear > hash(i * 4.3)) {
        if (IWfell(st, i)) {
          const am0 = ba(i);
          const rm0 = RB + (AWface(RB, TH, buu(i)) - RB) * (row + .5) / ROW;
          IBpushFrag(st, cx + Math.cos(am0) * rm0, cy + Math.sin(am0) * rm0,
            TH * .16, SC, 1);
        }
        p = 0;
      }
      if (p <= .004) continue;
      // 칸의 안·바깥 — 확정본 `bIn`/`bOut` 그대로, 바깥 몫에만 [p] 를 먹인다.
      const span = AWface(RB, TH, buu(i)) - RB;
      const r0 = RB + span * row / ROW, r1 = r0 + span / ROW * p;
      const am = ba(i), rm = (r0 + r1) * .5, qh = rm * dq * .5, sd = i * 3.7;
      const NP = 5 + ((i * 7 + row * 3) % 3), P = [], OV = 1.16;
      const jq = (hash(sd + 1.3) - .5) * qh * .36, jr = (hash(sd + 2.9) - .5) * (r1 - r0) * .18;
      for (let j = 0; j < NP; j++) {
        const a0 = j / NP * TAU + .4 + hash(sd + j * 1.7) * .5;
        const rr = (.52 + .20 * hash(sd + j * 2.3)) * (1 + .14 * Math.sin(a0 * 2));
        P.push(AWarcPt(cx, cy, am, rm + jr - Math.sin(a0) * (r1 - r0) * rr * OV,
          jq + Math.cos(a0) * qh * rr * OV * OV));
      }
      IBcrys(c, P, "frost", 1, sd, { mos: 2, w: 1.4 * SC * .9, thru: .62, grain: am });
    }
    // ⚠️ 떠 있는 마름모는 **확정본에 있는 그대로만** 둔다 — 죽을 때 새 반짝이를
    //   더하지 않는다(머리말: 채도가 되돌아오면 석벽이 아니라 얼음이 된다).
    for (let i = 0; i < 5; i++) {
      const p = IWramp(L.rise, hash(i * 6.7), .5) * IWramp(L.left, hash(i * 6.7), .5);
      if (p <= .01) continue;
      const ph = t * .55 + i * 1.5, a = AWang(hash(i * 2.3), SPAN);
      const q = AWpt(cx, cy, a, RB + (TH * 1.40 + Math.abs(Math.sin(ph)) * 12 * SC) * p, 0);
      IBshard(c, q[0], q[1], (2.2 + 2.0 * hash(i * 5.1)) * SC, ph * .5 + i, "frost", .8);
    }
    IWcrest(c, cx, cy, RB, TH, SPAN, SC, L.rise);
  }
  IBdrawFrag(c, st, SC);
  hero(c, t, cx, cy);
}

// ── 마운트 ────────────────────────────────────────────────────────────────
// ⚠️ 「수명이 다한다」 셋을 **먼저** 세운다 — 지금 엔진이 실제로 내는 사건이
//   그쪽 하나뿐이라, 이식하는 사람이 먼저 닿아야 하는 줄이 그 줄이다.
{const IWH = MOUNT("icelife");
 if (IWH) {
  [["IWpaneA", "호 A · 수명", "가운데부터 겹쳐 들고 · 끝부터 한 장씩 주저앉는다"],
   ["IWneedleB", "호 B · 수명", "긴 것이 늦게 자라고 · 짧은 것부터 밑동으로 스민다"],
   ["IWbrickD", "호 D · 수명", "안쪽 줄부터 쌓이고 · 바깥 줄부터 통째로 빠진다"],
   ["IWpaneAx", "호 A · 망가짐", "금이 가고 한꺼번에 터진다 (⚠️ 엔진에 벽 HP 가 없다)"],
   ["IWneedleBx", "호 B · 망가짐", "긴 것부터 꺾이고 그루터기가 남는다 (⚠️ 엔진에 벽 HP 가 없다)"],
   ["IWbrickDx", "호 D · 망가짐", "맞은 칸만 떨어져 구멍이 뚫린다 (⚠️ 엔진에 벽 HP 가 없다)"]]
    .forEach(([k, nm, ds]) => tile(IWH, FX, k, nm, "", ds, 238));}}
