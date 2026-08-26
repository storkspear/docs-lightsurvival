// ══════════════════════════════════════════════════════════════════════════
// VM — 뢰 둘(뇌광·낙광)의 **「시안이 안 다룬 상태」**            (2026-08-23)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 서리결정이 `vfx-frostmiss.js` 로, 독침이 `vfx-venommiss.js` 로 같은 구멍을
// 메웠다. 이 레포에서 되풀이해 터지는 부류의 뿌리는 하나다 —
// **시연 타일이 가짜 적을 늘 세워 두고 늘 맞는다.**
//   `FX.arc`      적 넷이 **안 죽고 안 걷는다**. 표적이 사라지는 장면이 없다.
//   `FX.lightfall` 낙하 넷이 `k%3` 으로 **서로 다른 적**을 문다. 겹치는 장면이 없다.
//
// ⭐ **그 둘이 엔진에서는 흔하다.**
//   ⓐ 뇌광 — 전류가 나는 동안 적이 죽는다(속도 760, 마디 사이 ~0.09초).
//     `w_arc_parts.dart` 는 죽은 마디를 **물었던 자리에 남긴다** — 안 그러면
//     경로가 접힌다. **아무도 그 그림을 안 그려 봤다.**
//   ⓑ 낙광 — 낙하 지점을 `w.rng.gameplay.nextInt(e.count)` 로 뽑으므로 한 시전이
//     **같은 적을 두 번** 고를 수 있다(적 셋이면 네 낙하 중 겹칠 확률이 높다).
//     ⇒ 두 낙하가 **한 점**에 선다. 2026-08-23 에 이 장면이 엔진 결함을 냈다:
//     `w_lightfall_cel.dart` 의 고정 지점 감시가 자리만 보고 짝지어, **뒤엣
//     낙하가 앞엣것의 자리를 집고 통째로 안 그려졌다**(거대 기둥이 보통 기둥으로
//     그려지는 것까지 같은 원인). 지문 하네스가 그 4발을 잡았다.
//
// ── ⭐ 이 파일이 못 박는 답 ───────────────────────────────────────────────
//   ① **표적이 사라져도 지우지도 박제하지도 않는다.** 마디는 물었던 자리에
//      남고, 전류의 **수명**이 끝나면 경로가 통째로 사라진다(시간 잔광 아님).
//   ② **한 점에 둘이 서면 둘 다 그린다.** 가산이라 겹치는 자리가 더 밝다 —
//      그것이 「두 번 맞는다」의 그림이다. 하나로 합치면 거짓말이 된다.
//   ③ **적 0마리면 아무것도 안 그린다.** 두 무기 다 시뮬이 시전을 조용히
//      넘기므로(`lightfall.dart` 의 `if (e.count == 0) return;` · 뇌광은 첫
//      표적 탐색 실패) 화면에 **한 획도 없다.** 「비어 있으니 뭐라도 그리자」가
//      이 레포에서 결함이 나던 자리다.
//
// ── ④ 되풀이 방지 — **적 0마리 슬롯을 못 박는다** ─────────────────────────
// 두 칸 다 슬롯 하나를 **영구히 빈 마당**으로 둔다([VMAFOE] 의 `null` ·
// [VMFDROP] 의 `null`).
// ⚠️ **여기에 적을 세우지 마라 — 세우는 순간 이 파일이 존재하는 이유가 없어진다.**
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️ `docs/vfx/vfx.js`(50,346줄)는 **읽기만** 한다. 최상위 이름을 전부 `VM` 으로
//   격리했다(확인: `VM` 으로 시작하는 최상위 이름이 vfx/vfx-frostmiss/
//   vfx-venommiss/vfx-poison/vfx-numb/vfx-flame*/vfx-frost* 에 **0건**).
// ⚠️ **난수 0건.** `Math.random` 을 부르는 도구를 하나도 안 쓴다. 주기 끝과
//   처음이 **한 스케줄**에서 나온다(이 저장소가 같은 원인으로 네 번 반려).
// ⚠️ **낙광은 붓을 안 베낀다** — 확정본 [PKfallPick]·[PKfallGround] **그 함수**를
//   부른다. 뇌광은 확정본이 `FX.arc` 안에 리터럴로 들고 있어 창구가 없다:
//   아래 [VMASTR]·[VMAW]·[VMAJIT]·[VMASEED] 는 그 리터럴의 **사본**이다.
//   ⚠️⚠️ `FX.arc` 의 다발 값을 고치면 **여기도 같이** 고쳐라(사본이 둘이다).
// ⚠️ 게이트(`mockup_lint.js`·`mockup_smoke.js`)는 `vfx.js` 하나만 읽는다.
//   자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-voltmiss.js > /tmp/z.js &&
//              node tools/mockup_smoke.js /tmp/z.js`
// ⚠️ 호스트가 없는 장에서는 조용히 건너뛴다(확정본과 같은 규약).
// ══════════════════════════════════════════════════════════════════════════

// ── 뇌광 ──────────────────────────────────────────────────────────────────

/// `FX.arc` 채택본 「A · 다발」의 사본 — 가닥 수 · 굵기 · 지글 폭 · 씨앗 간격.
/// ⚠️ 원본은 `FX.arc` 안의 리터럴이다(머리말의 ⚠️⚠️).
const VMASTR = [1, 2, 2, 3, 3];
const VMAW = k => 3.0 - k * .85, VMAJIT = k => 24 - k * 5;
const VMASEED = (i, k, t) => i * 29 + k * 173 + ((t * 20) | 0);
/// 지나간 마디 · 가닥별 알파 감쇠 · 회귀선 — 전부 확정본 값.
const VMAFADE = .42, VMAK = .22, VMAHOME = [1.8, .65, 14];

/// 마당 셋 — `[x, y, r]` 셋이 한 줄로 엮인다. **자리는 안 걷는다.**
const VMAFOE = [[0, -74], [64, -18], [40, 56]];

/// 슬롯 셋의 대본. `die` 는 「몇 번째 마디를 문 뒤에 표적이 다 죽나」이고
/// `null` 이면 **적 0마리**다(머리말 ④).
///   ① 안 죽는다 — 셋을 다 물고 L5 회귀선이 몸으로 돌아온다(확정본과 같은 그림)
///   ② 첫 마디를 문 순간 나머지가 다 죽는다 — **문 자리 하나만 남고** 회귀한다
///   ③ **적 0마리** — 한 획도 안 그린다
const VMADIE = [99, 1, null];

/// 슬롯 하나의 초. 물기 0.30 × 마디 셋(=0.9) + 회귀 0.5 + **빈자리 1.0**.
/// 빈자리가 있어야 「전류가 끝났다」가 다음 슬롯과 안 붙는다.
const VMASLOT = 2.4, VMABITE = .30, VMAHOLD = .5;

/// 전류 한 벌을 그린다 — `n` 마디까지 물었고 `home` 이면 회귀선이 있다.
function VMAdraw(c, cx, cy, t, n, home) {
  const pts = [[0, 0], ...VMAFOE.map(f => [f[0], f[1]])];
  const NS = VMASTR[LV - 1];
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[i + 1];
    const al = i === n - 1 ? 1 : VMAFADE;
    for (let k = 0; k < NS; k++) {
      const P = PKjag(cx, cy, a, b, VMASEED(i, k, t), VMAJIT(k), 7);
      dep(c, cy + b[1], cy, (c2, dz) => gAdd(c2, g =>
        gStroke(g, P, VMAW(k), "mArc", al * dz * (1 - k * VMAK))));
    }
  }
  if (n <= 0) return;
  const e = pts[n];
  gAdd(c, g => gFlare(g, cx + e[0], cy + e[1], 7, "mArc", .95, t * 3, 4));
  if (home) gAdd(c, g => gStroke(g,
    [[cx + e[0], cy + e[1]], [cx + e[0] * .5, cy + e[1] * .5 - VMAHOME[2]], [cx, cy]],
    VMAHOME[0], "mArc", VMAHOME[1]));
}

// ── 낙광 ──────────────────────────────────────────────────────────────────

/// 낙하 셋의 대본 — `[x, y]` 또는 **`null`(적 0마리)**.
/// ⚠️ ①②가 **같은 점**이다. 그것이 이 칸의 요지다(머리말 ⓑ).
const VMFDROP = [[-6, -34], [-6, -34], null];

/// 엇박 — 확정본이 슬롯 위상을 벌리는 **같은 비**(`s.i*PER*.26`)다. 엔진은
/// 같은 0.26 을 **시전 주기**(1.6s)에 걸어 0.416초를 내고, 여기 칸은 시안
/// 주기 `PER`(L5 2.0s)에 걸어 **0.52초**를 낸다 — 자가 다르니 초도 다르다.
/// ⚠️ 「엔진과 같은 초」로 읽지 마라. 이 칸이 말하는 것은 **겹친 둘이 동시가
///   아니라 어긋나 온다**는 사실 하나다.
const VMFSTAG = .26;

/// 마당 하나 — 확정본 `PKfT4` 를 그대로 읽는다(박자를 다시 안 적는다).
function VMFvars(i) {
  const T4 = PKfT4[LV - 1], SPL = PKfSPL[LV - 1];
  return { TE: T4[0], LK: T4[1], HIT: T4[0] + T4[1], FA: T4[2],
           B0: PKfB0[LV - 1], rr: PKfRING[LV - 1], bw: PKfBW[LV - 1],
           spl: SPL, amp: SPL * .72, sd: i * 17 };
}

Object.assign(FX, {

/// 뇌광 — **표적이 사라진다 · 적 0마리.**
VMmiss(c, t, dt, W, H, st) {
  const cx = W / 2, cy = H / 2;
  const PER = VMASLOT * VMADIE.length, tau = t % PER;
  const si = Math.min(VMADIE.length - 1, Math.floor(tau / VMASLOT));
  const u = tau - si * VMASLOT, die = VMADIE[si];
  // 적 0마리 — **한 획도 안 그린다.** 몸만 선다.
  if (die === null) { hero(c, t, cx, cy); return; }
  const grown = Math.min(VMAFOE.length, Math.floor(u / VMABITE) + 1);
  // 죽은 뒤로는 더 안 문다 — 마디는 **물었던 자리에 남는다**.
  const n = Math.min(grown, die);
  const done = u >= VMABITE * Math.min(VMAFOE.length, die);
  const gone = u >= VMABITE * Math.min(VMAFOE.length, die) + VMAHOLD;
  // 살아 있는 적만 그린다 — 죽은 자리는 **비어 있고 마디만 남는다**.
  drawFoes(c, t, cx, cy, VMAFOE.slice(0, die >= VMAFOE.length ? VMAFOE.length
    : (u < VMABITE * die ? VMAFOE.length : 0)).map(
      f => ({ ox: f[0], oy: f[1], r: 10, hit: 0, kx: 0, ky: 0, burn: 0 })));
  if (!gone) VMAdraw(c, cx, cy, t, n, atL(5) && done);
  hero(c, t, cx, cy);
},

/// 낙광 — **낙하 둘이 한 점에 선다 · 적 0마리.**
VMdup(c, t, dt, W, H, st) {
  const cx = W / 2, cy = H / 2;
  const T4 = PKfT4[LV - 1], PER = T4[0] + T4[1] + T4[2] + T4[3];
  st.s = st.s || VMFDROP.map((d, i) => ({ i, u: 0 }));
  for (let i = 0; i < VMFDROP.length; i++) {
    // **한 스케줄**에서 파생한다 — 위상마다 따로 재면 주기 끝과 처음이 안 맞는다.
    st.s[i].u = (t + i * VMFSTAG * PER) % PER;
  }
  // 바닥 — 마법진은 적보다 먼저(확정본의 계약).
  for (let i = 0; i < VMFDROP.length; i++) {
    const d = VMFDROP[i]; if (!d) continue;      // 적 0마리 — 안 그린다
    PKfallGround(c, t, cx + d[0], cy + d[1], st.s[i].u, VMFvars(i), st.s[i]);
  }
  for (let i = 0; i < VMFDROP.length; i++) {
    const d = VMFDROP[i]; if (!d) continue;
    const x = cx + d[0], y = cy + d[1];
    dep(c, y, cy, (c2, dz) =>
      PKfallPick(c2, t, x, y, st.s[i].u, VMFvars(i), dz, st.s[i]));
  }
  hero(c, t, cx, cy);
},
});

// ── 검산용 창구 — 그리기와 **같은 값**을 내보낸다 ─────────────────────────
window.VMDBG = { K: { VMASTR, VMAFOE, VMADIE, VMASLOT, VMABITE, VMAHOLD,
  VMAFADE, VMAK, VMAHOME, VMFDROP, VMFSTAG } };

// ── 마운트 — 칸 둘. 호스트가 없는 장에서는 조용히 건너뛴다 ────────────────
{
  const A = document.getElementById("pkvmarc");
  if (A) tile(A, FX, "VMmiss", "표적이 사라져도 경로는 남는다", "",
    "한 주기(<b>7.2초</b>)에 <b>세 갈래</b>가 다 나온다 — " +
    "① <b>안 죽는다</b>(셋을 다 물고 회귀선이 몸으로 돌아온다) " +
    "② <b>표적 소멸</b>(첫 마디를 문 순간 나머지가 죽는다 — <b>문 자리 하나만</b> " +
    "남고 전류의 수명이 끝나면 통째로 사라진다. 시간 잔광이 아니다) " +
    "③ <b>적 0마리</b>(<b>한 획도 안 그린다</b>)",
    236, 236, undefined, 5);
  const F = document.getElementById("pkvmfall");
  if (F) tile(F, FX, "VMdup", "같은 자리에 둘이 떨어진다", "",
    "시뮬이 낙하 지점을 <b>제비뽑기</b>로 고르므로 한 시전이 <b>같은 적을 두 번</b> " +
    "고를 수 있다 — 마법진 둘이 <b>한 점</b>에 서고 <b>엇박</b>(0.26×주기)만큼 " +
    "어긋나 떨어진다. 가산이라 겹치는 자리가 더 밝다: 그것이 <b>두 번 맞는다</b>의 " +
    "그림이다. 셋째 슬롯은 <b>적 0마리</b> — 예고도 낙하도 없다",
    236, 236, undefined, 5);
}
