// ══════════════════════════════════════════════════════════════════════════
// FM — 서리결정: **빗나감**                                     (2026-08-23)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 사용자 실기 판정 원문: 「내가 봤을 때 **적한테 안 맞았을 경우에 어떻게 처리할지를
//   생각 안 한 거 같음** ㅋㅋ **사라지는 연출을 시안에도 안 만들어놔서 그런가?**」
//
// ⭐ **사용자 진단이 맞았다.** 확정본 `SCspine` 은 가짜 적(`SCFOE`)을 **항상 다섯**
//   세워 둬서 실패 장면을 한 번도 안 그렸고, 그래서 엔진에도 없었다 —
//   `w_chain_cel.dart` 가 빗나간 사슬을 `_hp = cd; first = 0;` 로 **박제**했다.
//   이 레포는 그 부류를 **「시안이 안 다룬 상태」**라 부른다.
//
// `vfx-frostspot.js`(같은 날 확정)가 그 절반을 이미 메웠다 — 자리를 물게 하니
// 「빗나감」이 사슬 전체의 상태가 아니라 **마디 한 대의 결과**가 됐고, 슬롯 ③이
// 빈 자리를 치는 그림을 그린다. **이 파일이 메우는 것은 나머지 절반**이다:
//
//   ⓐ 확정본 타일은 자리를 **78~100 대역**에만 세운다. 엔진에서 선에 아무도 없으면
//      자리가 **사거리 끝**(몸 반지름 16 × 13 − 머리 반길이 ≈ **197**)에 선다 —
//      **아무도 그 길이를 안 그려 봤다.** 영웅을 칸 아래(0.86H)에 세워 그린다.
//   ⓑ 표적이 **갈리는 도중에 죽는** 장면. 확정본은 적이 안 죽는다.
//   ⓒ ⭐ **적 0마리 장면** — 마당이 통째로 빈 슬롯 하나(아래 「④ 되풀이 방지」).
//
// ── ⭐ 「빗나감」의 정의 — 세 갈래가 **한 그림**으로 모인다 ────────────────
//   ① **사거리 밖**  발사 순간 선에 아무도 없다 → 자리가 사거리 끝에 서고 N 대가 전부 마른다
//   ② **표적 소멸**  물었던 적이 갈리는 사이 죽는다 → 죽은 뒤의 대만 마른다
//   ③ **적 0마리**  마당이 비었다 → ①과 **한 픽셀도 안 다르다**
// ⇒ 셋 중 무엇이든 화면에서 갈리는 것은 **탕 ↔ 텅** 하나뿐이다. 사슬은 늘 자리에
//   박히고 늘 거기서 갈리고 늘 거기서 터진다. **지우지도 박제하지도 않는다.**
//   (엔진 짝의 정본 주석: `lib/game/fx/w_chain_spot.dart` 머리말.)
//
// ── 「사라지는 연출」은 무엇인가 ──────────────────────────────────────────
// 얼음이니 **녹거나 부서지거나 흩어지는** 쪽을 셋 다 그려 보고 고른 답은
// **「부서져 없어진다」**다 — 마디가 앞에서부터 하나씩 부서지고, 부서질 때마다
// 조각이 뒤로 튀고, 마지막 마디가 부서지면 사슬은 **더 그릴 것이 없다.**
// 녹는(알파만 내리는) 안은 반려했다: 알파가 내려가는 동안 사슬이 **그 자리에
// 그대로 떠 있어** 사용자가 본 「굳어져 있음」과 화면에서 구별이 안 된다.
// ⇒ 사라짐은 **알파가 아니라 개수**로 낸다. 남는 것은 뒤끝 램프([FMz])가
//   다음 발 전에 0 으로 내리는 자국뿐이다.
//
// ── ④ 되풀이 방지 — **적 0마리 슬롯을 못 박는다** ─────────────────────────
// 이 병의 뿌리는 「시연 타일이 가짜 적을 늘 세워 두는 것」이었다. 그래서 이 칸은
// 세 슬롯 중 **하나를 영구히 빈 마당**으로 둔다(슬롯 ③, [FMFOE] 가 `null`).
// ⚠️ **여기에 적을 세우지 마라.** 세우는 순간 이 파일이 존재하는 이유가 없어진다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️ `docs/vfx/vfx.js`(50,343줄)와 `docs/vfx/vfx-frostspot.js` 는 **읽기만** 한다.
//   최상위 이름을 전부 `FM` 으로 격리했다(확인: `FM` 으로 시작하는 최상위 이름은
//   vfx/vfx-frostspot/vfx-poison/vfx-flamelv/vfx-flamenat 에 **0건**).
// ⚠️ **박자를 다시 적지 않는다.** 스케줄은 확정본이 내보낸 `window.FSDBG.sched`
//   **그 함수**를 부른다 — 베껴 적으면 그날로 갈라진다(확정본 머리말의 ⭐).
// ⚠️ **난수 0건.** `Math.random` 을 부르는 도구를 하나도 안 쓴다. 주기 끝과 처음이
//   같은 스케줄 하나에서 나온다(이 저장소가 같은 원인으로 네 번 반려).
// ⚠️ 게이트(`mockup_lint.js`·`mockup_smoke.js`)는 `vfx.js` 하나만 읽는다.
//   자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-frostspot.js docs/vfx/vfx-frostmiss.js \
//              > /tmp/z.js && node tools/mockup_smoke.js /tmp/z.js`
// ⚠️ 호스트(`pkfmiss`)가 없는 장에서는 조용히 건너뛴다 — 고르기 페이지에 칸을
//   다는 것은 `docs/vfx/` 를 쥔 손의 몫이다(이 사이클에 같이 쓰는 중이라 안 건드렸다).
// ══════════════════════════════════════════════════════════════════════════

/// 확정본이 내보낸 창구 — **스케줄과 상수를 여기서만 읽는다.**
const FMD = window.FSDBG, FMK = FMD.K;

/// 영웅이 서는 높이(칸 높이 비). ⚠️ 확정본은 한복판(0.5)인데 여기서는 **아래**다:
/// 사거리 끝 자리가 197 이라 한복판에 세우면 칸(238) 위로 40 이 잘려 나간다.
/// 「멀리 던진다」가 이 칸의 절반이므로 잘리면 안 그린 것과 같다.
const FMHERO = .86;

/// 자리 셋(몸 기준 · 238 눈금 = 월드 1:1).
///   ① 85   — 적 겉면. 엔진 `_latch`: `along 100 − 반지름 11 − 물림 4`
///   ②③ 197 — 사거리 끝. 엔진: `몸 반지름 16 × 13 − 머리 반길이 7.2×1.5576`
const FMNEAR = 85, FMREACH = 197;
const FMSPOT = [[0, -FMNEAR], [0, -FMREACH], [0, -FMREACH]];

/// 슬롯마다 세우는 적 — `[y, 반지름]` 또는 **`null`(적 0마리)**.
/// ⚠️ ③은 **영구히 `null`** 이다(머리말 ④). 여기에 적을 세우지 마라.
const FMFOE = [[-100, 11], null, null];

/// 몇 대째에 죽나 · 부서져 없어지는 데 걸리는 시간(s).
const FMDIE = 3, FMFADE = .28;

/// 죽을 때 몸에서 튀는 조각 수 · 수명(s) · 속도(238/s).
const FMDN = 7, FMDL = .34, FMDV = 58, FMDVR = 46;

/// 적 실루엣 색 — 무기 색이 몸으로 새면 안 된다(vfx.js `hero` 의 규약과 같은 줄).
const FMFOEC = "#3A4450", FMFOEL = "#7E8B99";

/// ⚠️ 뒤끝 정리 램프(`S.z`)는 **확정본이 계산해 준다**(`FSsched` 가 `FSz` 를
///   불러 넣는다) — 여기서 다시 안 적는다.

// ══════════════════════════════════════════════════════════════════════════
Object.assign(FX, {
/// 서리결정 — **빗나가도 그 자리에서 갈리고 그 자리에서 터진다.**
FMmiss(c, t, dt, W, H, st) {
  const SC = Math.min(W, H) / 238, cx = W / 2, cy = H * FMHERO;
  const N = SCN[LV - 1], RAD = SCRAD[LV - 1] * SC, GAP = RAD * SCGAPM;
  const BOOM = SCBOOM[LV - 1], BR = SCBR * SC, R0 = SCMUZ * SC;
  const EMG = RAD * FMK.FSEMG, GLW = 6 * SC;
  if (!st.SP) {
    st.SP = FMSPOT.map(p => {
      const d = Math.hypot(p[0], p[1]) * SC;
      return { x: p[0] * SC, y: p[1] * SC, d, a: Math.atan2(p[1], p[0]) };
    });
    st.k = -1; st.n = 0; st.im = []; st.ch = []; st.bp = 0;
  }
  const tau = saw(t, FMK.FSPER) * FMK.FSPER;
  const ki = Math.min(2, Math.floor(tau / FMK.FSSLOT));
  const P = st.SP[ki];
  // ⭐ **확정본의 그 함수**를 부른다 — 박자를 두 번 적지 않는다.
  const S = FMD.sched(tau, P.d, GAP, R0, N);
  const ca = Math.cos(P.a), sa = Math.sin(P.a), z = S.z;
  const sx = cx + P.x, sy = cy + P.y;
  const FOE = FMFOE[ki];
  // 슬롯이 바뀌었다 — 앞 발의 셈을 되돌린다. 이때 `z` 는 이미 0 이라 화면에서는
  // 아무것도 안 바뀐다(램프가 먼저 다 지웠다).
  if (st.k !== ki) { st.k = ki; st.n = 0; st.im = []; st.ch = []; st.bp = 0; }
  const tp = tau * TAU / FMK.FSPER;             // 주기에 못 박은 시각(이음매 0)

  // ── 적 — 있으면 [FMDIE] 대째에 **부서져 없어진다** ──────────────────────
  // ⚠️ 슬롯 ②③은 여기부터 끝까지 **아무 일도 안 한다.** 그래도 아래 그림은
  //   한 줄도 안 갈린다 — 그것이 이 칸이 말하는 전부다.
  const dieQ = (FMDIE - 1) * SCHIT;             // 세 번째 마디가 부서지는 시각
  const alive = !!FOE && S.q < dieQ;
  const dead = !!FOE && S.q >= dieQ ? Math.min(1, (S.q - dieQ) / FMFADE) : 0;
  const fy = FOE ? cy + FOE[0] * SC : 0, fr = FOE ? FOE[1] * SC : 0;
  // ⚠️⚠️ **마당이 슬롯마다 다르므로 주기 이음매가 여기서 난다.** 앞 슬롯은
  //   적이 0마리인데 다음 슬롯 첫 프레임에 하나가 **툭** 선다(실측: 주기
  //   첫 프레임 잉크 202.59 · 마지막 0.00). 예고 시간에 걸쳐 켜서 양 끝을
  //   0 으로 맞춘다 — 이 저장소가 같은 원인으로 네 번 반려한 자리다.
  const app = Math.min(1, S.s / FMK.FSTELE);

  // ── 마디가 부서진다 — **탕이냐 텅이냐** ────────────────────────────────
  while (st.n < S.gone) {
    // 이 대가 맞았나 = **부서지는 순간 자리에 적이 있나.** 갈래 셋이 전부 이
    // 한 줄로 들어온다(사거리 밖·표적 소멸·적 0마리).
    const wet = !!FOE && st.n < FMDIE;
    st.im.push({ l: 0, s: hash(st.n * 7.3 + LV) * 40, h: wet ? 1 : 0 });
    const cn = wet ? FMK.FSCN : FMK.FSCN0;      // 맞으면 셋, 빈 자리면 둘
    for (let j = 0; j < cn; j++) st.ch.push({
      b: S.q, a: P.a + Math.PI + (hash(st.n * 5.1 + j * 2.7) - .5) * FMK.FSCS,
      v: (FMK.FSCV + FMK.FSCVR * hash(st.n * 3.3 + j * 1.9)) * SC,
      r: (1.5 + 1.3 * hash(st.n * 8.7 + j * 4.1)) * SC,
      m: FMK.FSCL, g: FMK.FSCG * SC, h: wet ? 1 : 0 });
    // 죽는 대 — 몸이 부서져 흩어진다(「사라지는 연출」의 본체).
    if (FOE && st.n === FMDIE - 1) for (let j = 0; j < FMDN; j++) st.ch.push({
      b: S.q, fo: 1, a: hash(j * 4.3 + LV) * TAU,
      v: (FMDV + FMDVR * hash(j * 7.1)) * SC,
      r: (2.0 + 1.6 * hash(j * 2.9)) * SC, m: FMDL, g: 90 * SC, h: 1 });
    st.n++;
  }
  // ── 얼음 폭발 — **빈 자리에서도 터진다** ───────────────────────────────
  if (BOOM && S.boom >= 0 && !st.bp) {
    st.bp = 1;
    for (let j = 0; j < FMK.FSBN; j++) st.ch.push({
      b: S.boom, bo: 1, a: hash(j * 3.7 + LV) * TAU,
      v: (FMK.FSBV + FMK.FSBVR * hash(j * 6.1)) * SC,
      r: (2.0 + 1.8 * hash(j * 4.9)) * SC, m: FMK.FSBL, g: 70 * SC, h: 1 });
  }
  for (let i = st.im.length - 1; i >= 0; i--) {
    const q = st.im[i]; q.l += dt; if (q.l >= SCTICK) st.im.splice(i, 1);
  }

  // ══ 그리기 ═══════════════════════════════════════════════════════════════
  // ① 자리 표식 — 예고에 돋고, 도착하면 사슬에 흡수된다.
  if (S.mark > .01) {
    const m = S.mark, br = 1 + .07 * Math.sin(tp * 3);
    IBroot(c, sx, sy, RAD * FMK.FSMKR * (.85 + .35 * m), "frost", .62 * m, .42);
    IBrim(c, jagPoly(sx, sy, RAD * FMK.FSMKR * br * (.62 + .38 * m), 9, 4.3, 1.05,
      FMK.FSMKSQ), "frost", .95 * m, 1.7 * SC);
    for (let i = 0; i < FMK.FSMKN; i++) {
      const a0 = i / FMK.FSMKN * TAU + 1.1;
      const d = RAD * FMK.FSMKR * (.58 + .34 * hash(i * 3.1));
      IBshard(c, sx + Math.cos(a0) * d, sy + Math.sin(a0) * d * FMK.FSMKSQ,
        (1.7 + 1.6 * hash(i * 5.3)) * SC * m, a0 + .6, "frost", .88 * m, .5);
    }
  }

  // ② 적 — 살아 있는 동안만. 맞은 수만큼 성에가 박힌다.
  if (alive && app > .01) {
    fillPoly(c, jagPoly(cx, fy, fr, 7, 3.7, 1.22), A(FMFOEC, .95 * app));
    IBrim(c, jagPoly(cx, fy, fr * .72, 7, 5.1, 1.16), "frost", .28 * app, 1.0 * SC);
    fillPoly(c, jagPoly(cx, fy, fr * .40, 7, 8.3, 1.10), A(FMFOEL, .55 * app));
    const mk = Math.min(FMDIE, S.gone);
    for (let i = 0; i < mk; i++) {
      const a0 = P.a + (i % 2 ? 1 : -1) * (.55 + i * .30);
      const d = fr * (.86 + .12 * hash(i * 5.1));
      IBshard(c, cx + Math.cos(a0) * d, fy + Math.sin(a0) * d,
        RAD * (.42 + .10 * hash(i * 3.3)), a0 + 1.1, "frost", .92 * app, .46);
    }
  } else if (dead > 0 && dead < 1) {
    // 부서지는 한 박자 — 몸이 쪼그라들며 꺼진다. **알파만 내리지 않는다**
    // (머리말 「사라지는 연출」: 알파만 내리면 「굳어 있음」과 구별이 안 된다).
    IBrim(c, jagPoly(cx, fy, fr * (1 - .72 * dead), 7, 5.1, 1.16),
      "frost", (1 - dead) * .85, 1.4 * SC);
  }

  // ③④ 갈리는 자리 — 흰 발광과 쌓이는 지면 파편.
  if (st.n > 0 && z > .01) {
    IBroot(c, sx, sy + RAD * .2, RAD * (1.6 + .10 * st.n), "frost",
      .62 * (st.n < N ? 1 : .5) * z, .32);
    shards(c, sx, sy + RAD * .5, Math.max(1, RAD * (1.0 + .16 * st.n)),
      Math.min(9, 3 + st.n), LV * 3.1, .45 * z, "frost");
  }
  if (S.amb > .01) IBroot(c, cx + ca * GLW, cy + sa * GLW, RAD * 1.5, "frost",
    .40 * S.amb, .34);

  // ── ① 사슬 — 묶인 마디. **앞에서부터 부서져 없어진다** ─────────────────
  let py = null, pxx = 0, pr = 0, pa = 1, minA = 1;
  const LFT = [], RGT = [];
  for (let i = st.n; i < N; i++) {
    const d = S.hp - i * GAP; if (d < SCMUZ * SC) continue;
    const head = (i === st.n);
    const x = cx + ca * d, y = cy + sa * d, r = RAD * (head ? 1.12 : 1);
    const a = Math.min(1, (d - SCMUZ * SC) / EMG);
    if (a <= .01) continue;
    minA = Math.min(minA, a);
    const Q = [];
    for (let q = 0; q < 7; q++) {
      const a0 = q / 7 * TAU + i * .9, rr = r * (.80 + .34 * hash(i * 4.7 + q * 3.1));
      Q.push([x + Math.cos(a0) * rr, y + Math.sin(a0) * rr * 1.22]);
    }
    IBcrys(c, Q, "frost", a * (head ? 1 : .88), i * 4.7 + LV,
      { mos: 2, thru: .92, w: 1.15 * SC, grain: P.a });
    if (py !== null) {                          // ㉠ 이음매 — 묶인 자리
      const my = (y + py) * .5, mx = (x + pxx) * .5;
      const mr = Math.min(r, pr) * .92, ma = Math.min(a, pa);
      IBline(c, [[mx + sa * mr, my - ca * mr], [mx - sa * mr, my + ca * mr]],
        1.0 * SC, "frost", .68 * ma, 0);
    }
    LFT.push([x + sa * r, y - ca * r]); RGT.push([x - sa * r, y + ca * r]);
    py = y; pxx = x; pr = r; pa = a;
  }
  if (LFT.length > 1) {                         // 사슬을 옆에서 훑는 끈 둘
    IBline(c, LFT, .7 * SC, "frost", .34 * minA, 0);
    IBline(c, RGT, .7 * SC, "frost", .34 * minA, 0);
  }

  // ── ㉢ 탄착 마디 — ⭐ **탕 ↔ 텅.** 이 칸의 주인공이다 ───────────────────
  // 맞은 대는 진하고, 빈 자리를 친 대는 [FSDRY] 만큼 옅다. 옅게 그리되
  // **반드시 그린다** — 안 그리면 「피해가 덜 들어온 것」과 구별이 안 된다.
  for (const q of st.im) {
    const v = q.l / SCTICK, a = (1 - v) * (q.h ? 1 : FMK.FSDRY);
    IBrim(c, jagPoly(sx, sy, RAD * (1.0 + 2.2 * v), 9, q.s, 1.08, .84),
      "frost", a * .88, 1.5 * SC * (1 - v * .55));
  }

  // ── 조각 — 갈릴 때·죽을 때·터질 때 튄다. **난수 0** ────────────────────
  for (const g of st.ch) {
    const base = g.bo ? S.boom : S.q, ts = base - g.b;
    if (ts <= 0 || ts >= g.m) continue;
    const w = ts / g.m, ox = g.fo ? cx : sx, oy = g.fo ? fy : sy;
    IBshard(c, ox + Math.cos(g.a) * g.v * ts,
      oy + Math.sin(g.a) * g.v * ts + .5 * g.g * ts * ts,
      g.r * (1 - .45 * w), g.a + 1.1, "frost",
      Math.min(1, w * 9) * (1 - w) * (g.h ? .92 : .62), .5);
  }

  // ── 얼음 폭발 — 퍼지는 테(넉백) → 오므라드는 테(빙결). **빈 자리에서도** ──
  if (S.boom >= 0 && BOOM) {
    if (S.boom < SCFRZ) {
      const v = Math.min(1, S.boom / SCKB);
      IBrim(c, jagPoly(sx, sy, BR * (.28 + .80 * v), 11, 5.7, 1.10, .86),
        "frost", (1 - v * .72), 2.4 * SC * (1 - v * .55));
      IBroot(c, sx, sy, BR * (.5 + .5 * v), "frost", .55 * (1 - v), .40);
    } else {
      const v = Math.min(1, (S.boom - SCFRZ) / .30);
      IBrim(c, jagPoly(sx, sy, BR * (1.06 - .44 * v), 11, 9.1, 1.04, .86),
        "frost", (1 - v) * .95, 2.6 * SC * (1 - v));
    }
  }

  hero(c, tau * (TAU * 2 / 2.2) / FMK.FSPER, cx, cy);
},
});

// ── 검산용 창구 — 그리기와 **같은 값**을 내보낸다 ─────────────────────────
window.FMDBG = { K: { FMHERO, FMNEAR, FMREACH, FMSPOT, FMFOE, FMDIE, FMFADE,
  FMDN, FMDL, FMDV, FMDVR, FMFOEC, FMFOEL } };

// ── 마운트 — **칸은 하나다** ──────────────────────────────────────────────
// ⚠️ 호스트가 없는 장에서는 조용히 건너뛴다(확정본과 같은 규약).
{
  const H = document.getElementById("pkfmiss");
  if (H) tile(H, FX, "FMmiss", "빗나가도 그 자리에서 터진다", "",
    "한 주기(<b>8.4초</b>)에 <b>빗나감 세 갈래</b>가 다 나온다 — " +
    "① <b>표적 소멸</b>(세 대 맞고 죽는다 · 남은 여덟 대는 <b>빈 자리</b>를 친다) " +
    "② <b>사거리 밖</b>(선에 아무도 없다 · 자리가 <b>사거리 끝 197</b>에 선다) " +
    "③ <b>적 0마리</b>(마당이 비었다 — <b>②와 한 픽셀도 안 다르다</b>). " +
    "빈 자리를 친 대는 테가 <b>옅다</b>(탕 ↔ 텅) — 지우지도 박제하지도 않는다",
    236, 236, undefined, 5);
}
