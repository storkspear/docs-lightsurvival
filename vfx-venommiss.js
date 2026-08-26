// ══════════════════════════════════════════════════════════════════════════
// PN — 독침: **빗나감**                                          (2026-08-23)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 확정본 `PZneedle30` 은 가짜 적(`PZnFOE`)을 **항상 넷** 세워 두고, 침을
// `q.fi` 로 그 넷 사이에서 **돌린다**. 그래서 **한 대도 빗나간 적이 없다** —
// 「안 맞았을 때 어떻게 되나」를 시안이 한 번도 안 그렸고, 그러면 엔진도 안
// 그린다. 이 레포는 그 부류를 **「시안이 안 다룬 상태」**라 부르고, 같은 날
// 서리결정이 `vfx-frostmiss.js` 로 같은 구멍을 메웠다.
//
// ⚠️⚠️ **확정본은 적 0마리에서 아예 터진다** — `st.F[q.fi]` 가 `undefined` 라
//   `spot()` 의 `f.ox` 에서 `TypeError` 가 난다(2026-08-23 실측). 「그림이 이상하다」가 아니라
//   **그릴 수가 없다**. 독침은 독 캐릭터의 **기본 지급** 기본공격이라
//   (`data/characters.dart`) 판 시작부터 이 장면이 나오는데도 그랬다.
//
// ── ⭐ 「빗나감」의 정의 — 세 갈래가 **두 그림**으로 모인다 ────────────────
// (번호는 아래 [PNFOE] 의 **슬롯 번호**와 같다 — 칸에서 왼쪽부터 그 순서다.)
//   ① **표적 소멸**  꽂아 둔 적이 **스택 셋이 차기 전에** 죽는다 → 꽂혔던 침이
//                    갈 곳을 잃고 **부러져 떨어진다**
//   ② **사거리 밖**  발사 순간 사거리 안에 아무도 없다 → 정면으로 곧게 날아가
//                    **사거리 끝에서 빛이 다한다**
//   ③ **적 0마리**   마당이 비었다 → **침의 그림이** ②와 한 픽셀도 안 다르다
//                    (②는 적이 **보이는데도** 그렇다 — 그것이 「사거리 밖」이다)
// ⇒ ②③은 같은 그림이고 ①만 다르다. 셋 다 **지우지도 박제하지도 않는다.**
//
// ── 「사라지는 연출」은 무엇인가 ──────────────────────────────────────────
// 독침은 **빛의 침**이다(확정본: 「앞은 빛 · 뒤는 묻은 것」). 그래서 사라짐의
// 어휘도 빛에서 나온다:
//
//   ②③ **빛이 다한다** — 꽂힐 데가 없으면 침은 제 빛을 다 쓰고 꺼진다.
//      확정본이 이미 그 손잡이를 갖고 있다: `PZneedle1` 의 `px`(0=갓 쏜 빛,
//      1=다 식고 독만 남았다). 날아가는 동안 그 값을 0 → 1 로 밀면 **앞의
//      흰 심부터 빠지고 묻은 독만 남았다가** 사라진다. 새 장치가 0 개다.
//      ⚠️ 알파만 내리는 안은 반려했다 — 그러면 「멀어서 흐리다」로 읽히고,
//        서리결정이 같은 이유로 반려한 그 안이다.
//   ① **부러져 떨어진다** — 꽂힌 침은 몸에 **박혀 있는** 물건이라 몸이 없어지면
//      갈 곳이 없다. 확정본의 폭발이 이미 「부러진 침이 튄다」를 쓰므로
//      (`PZnSHARD`) 같은 어휘를 쓴다: 두 토막으로 부러져 **아래로** 떨어지며
//      식는다. ⚠️ 한 프레임에 지우지 마라 — 그러면 「맞은 적이 없었던 것」이
//      되어 3스택이 왜 안 찼는지가 화면에서 사라진다.
//
// ── ④ 되풀이 방지 — **적 0마리 슬롯을 못 박는다** ─────────────────────────
// 이 병의 뿌리는 「시연 타일이 가짜 적을 늘 세워 두는 것」이었다. 그래서 이 칸은
// 세 슬롯 중 **하나를 영구히 빈 마당**으로 둔다(슬롯 ③, [PNFOE] 가 `null`).
// ⚠️ **여기에 적을 세우지 마라.** 세우는 순간 이 파일이 존재하는 이유가 없어진다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️ `docs/vfx/vfx.js` 와 `docs/vfx/vfx-poison.js` 는 **읽기만** 한다.
//   최상위 이름을 전부 `PN` 으로 격리했다(확인: `PN` 으로 시작하는 최상위 이름은
//   vfx/vfx-poison/vfx-frostmiss/vfx-frostspot/vfx-numb/vfx-flame*/vfx-frostlv 에 **0건**).
// ⚠️ **난수 0건.** `Math.random` 을 부르는 도구를 하나도 안 쓴다. 주기 끝과 처음이
//   같은 **하나의 톱니**에서 나온다(이 저장소가 같은 원인으로 네 번 반려).
// ⚠️ **주기 이음매를 0 으로 맞춘다.** 슬롯마다 마당이 다르므로 적이 툭 서고 툭
//   사라지면 그 프레임이 통째로 튄다 — [PNenv] 가 양 끝을 0 으로 민다.
// ⚠️ 게이트(`mockup_lint.js`·`mockup_smoke.js`)는 `vfx.js` 하나만 읽는다.
//   자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-poison.js docs/vfx/vfx-venommiss.js \
//              > /tmp/z.js && node tools/mockup_smoke.js /tmp/z.js`
// ⚠️ 호스트(`pkpnmiss`)가 없는 장에서는 조용히 건너뛴다 — 고르기 페이지에 칸을
//   다는 것은 `docs/vfx/` 를 쥔 손의 몫이다(이 사이클에 같이 쓰는 중이라 안 건드렸다).
// ══════════════════════════════════════════════════════════════════════════

/// 슬롯 하나의 길이(초)와 한 바퀴. 셋이 한 바퀴다.
/// ⚠️ 슬롯이 `비행 + PZnDW(2.0) + 부러짐` 보다 길어야 이음매가 0 이 된다.
const PNSLOT = 3.2, PNPER = PNSLOT * 3;

/// 마당이 뜨고 지는 램프(초) — 이음매를 0 으로 미는 그것.
const PNENV = .25;

/// 영웅이 서는 높이(칸 높이 비). ⚠️ 확정본은 한복판인데 여기서는 **아래**다:
/// 사거리 끝이 197 이라 한복판에 세우면 칸(238) 위로 잘려 나간다 —
/// 「멀리 던지고 거기서 꺼진다」가 이 칸의 절반이므로 잘리면 안 그린 것과 같다.
const PNHERO = .86;

/// 적이 서는 거리 · **사거리 끝**(몸 기준 · 238 눈금 = 월드 1:1).
///   근  100 — 엔진 잡몹이 몸 반지름 16 짜리로 서 있는 자리
///   끝  197 — 엔진 `kVenomdartRangeMul` 21 × 몸 반지름 … 칸에 맞춘 값
const PNNEAR = 100, PNREACH = 197;

/// 슬롯마다 세우는 적 — `[거리, 반지름]` 또는 **`null`(적 0마리)**.
///   ① 가까이 — 꽂히고, 그 다음에 **죽는다**
///   ② 사거리 **밖** — 있어도 못 문다(엔진 `_pickTarget` 이 −1 을 준다)
///   ③ ⚠️ **영구히 `null`**(머리말 ④). 여기에 적을 세우지 마라.
const PNFOE = [[PNNEAR, 16], [PNREACH + 30, 16], null];

/// 몇 대째가 꽂힌 뒤 죽나 · 죽는 데 걸리는 시간(초).
/// ⚠️ [PZnSTKMAX] **미만**이라야 「셋이 차기 전에 죽었다」가 된다.
const PNDIE = 2, PNFADE = .26;

/// 꽂혔던 침이 부러져 떨어지는 시간(초) · 조각 수 · 낙하 가속(238/s²).
const PNDROP = .34, PNSHARD = 2, PNG = 190;

/// 빗나간 침이 **빛을 다 쓰는** 구간 — 비행의 마지막 몫.
/// ⚠️ 1.0 으로 두면 총구에서부터 식어 「약하게 쐈다」가 된다. 끝에서만 꺼진다.
const PNDRY = .42;

/// 적 실루엣 색 — 무기 색이 몸으로 새면 안 된다(vfx.js `hero` 의 규약과 같은 줄).
const PNFOEC = "#3A4450", PNFOEL = "#7E8B99";

/// 이음매를 0 으로 미는 창 — 슬롯 안 시각 `s` 에서 0 → 1 → 0.
const PNenv = (s) => Math.min(1, s / PNENV) * Math.min(1, (PNSLOT - s) / PNENV);

/// 침 하나의 **슬롯 안 일정**. 확정본의 상수만 읽고 박자를 다시 안 적는다.
///   `t0` 나가는 시각 · `fly` 나는 시간 · `d` 날아갈 거리
function PNplan(i, foe) {
  const far = !foe || foe[0] > PNREACH;
  const d = far ? PNREACH : foe[0] - foe[1];   // 겉면에 꽂힌다
  return { t0: .12 + i * PZnBURST, fly: .26 * (d / PNNEAR), d, far };
}

// ══════════════════════════════════════════════════════════════════════════
Object.assign(FX, {
/// 독침 — **꽂힐 데가 없으면 빛이 다하고, 꽂아 둔 몸이 없어지면 부러져 떨어진다.**
PNmiss(c, t, dt, W, H, st) {
  const SC = Math.min(W, H) / 238, cx = W / 2, cy = H * PNHERO;
  const NS = PZnSHOT[LV - 1], L = PZnLENS[0] * SC, w = PZnW * SC;
  const tau = t % PNPER;
  const ki = Math.min(2, Math.floor(tau / PNSLOT));
  const s = tau - ki * PNSLOT;                 // 슬롯 안 시각
  const FOE = PNFOE[ki];
  const env = PNenv(s);
  const fd = FOE ? FOE[0] * SC : 0, fr = FOE ? FOE[1] * SC : 0;
  const fx = cx, fy = cy - fd;

  // ── 적이 죽는 시각 — [PNDIE] 대째가 꽂히는 순간 ────────────────────────
  // ⚠️ 적이 **사거리 안**일 때만 죽는다. ②③에서는 아무 일도 안 난다 —
  //   그래도 아래 그림은 한 줄도 안 갈린다. 그것이 이 칸이 말하는 전부다.
  const near = !!FOE && FOE[0] <= PNREACH;
  const P0 = PNplan(PNDIE - 1, FOE);
  const tDie = near ? P0.t0 + P0.fly : 1e9;
  const dead = s > tDie ? Math.min(1, (s - tDie) / PNFADE) : 0;

  // ── ① 적 — 살아 있는 동안만. 꽂힌 수만큼 자국이 는다 ───────────────────
  if (FOE && dead <= 0) {
    fillPoly(c, jagPoly(fx, fy, fr, 7, 3.7, 1.22), A(PNFOEC, .95 * env));
    fillPoly(c, jagPoly(fx, fy, fr * .42, 7, 8.3, 1.10), A(PNFOEL, .55 * env));
  } else if (FOE && dead > 0 && dead < 1) {
    // 죽는 한 박자 — 몸이 쪼그라들며 꺼진다. **알파만 내리지 않는다.**
    fillPoly(c, jagPoly(fx, fy, fr * (1 - .78 * dead), 7, 3.7, 1.22),
      A(PNFOEC, (1 - dead) * .9 * env));
  }

  // ── ② 침 — 나가고 · 꽂히고 · (몸이 없어지면) 부러진다 ──────────────────
  for (let i = 0; i < NS; i++) {
    const P = PNplan(i, FOE);
    const u = s - P.t0;
    if (u < 0) continue;

    // ⓐ **나는 중** — 곧게 간다. 빗나가는 침은 **끝에서 빛이 다한다.**
    if (u < P.fly) {
      const v = u / P.fly, d = P.d * SC * v;
      const x = cx, y = cy - d;
      // ⭐ 확정본의 `px` 손잡이 그대로 — 앞의 흰 심부터 빠진다.
      const px = P.far ? Math.max(0, (v - (1 - PNDRY)) / PNDRY) : 0;
      const al = P.far ? Math.min(1, (1 - px) * 1.35) : 1;
      for (let k = 2; k >= 1; k--) {           // 잔상 둘(확정본 ⓑ)
        const vv = v - k * .075; if (vv <= 0) continue;
        PZneedle1(c, x, cy - P.d * SC * vv, -Math.PI / 2, L, w * .9,
          (.26 - k * .07) * al, px);
      }
      PZneedle1(c, x, y, -Math.PI / 2, L, w, al, px);
      continue;
    }

    // ⓑ **빗나갔다** — 사거리 끝에서 이미 꺼졌다. 더 그릴 것이 없다.
    //   ⚠️ **박제하지 않는다**(엔진이 사슬을 사거리 끝에 세워 뒀던 그 병).
    if (P.far || !near) continue;

    // ⓒ **꽂혀 있다** — 확정본과 같은 그림(잠긴 몫 · 드러난 몫 · 주입).
    const sy = fy + fr * .92;                  // 꽂힌 점 — 날아온 쪽(아래)
    const stick = u - P.fly;
    const drop = dead > 0 && i < PNDIE ? (s - tDie) / PNDROP : -1;
    if (drop < 0) {
      const su = Math.min(1, stick / PZnDW);
      const fade = Math.min(1, (1 - su) * 4.2) * Math.min(1, su / .05);
      if (fade <= .01) continue;
      PZneedle1(c, cx, sy - L * .45, -Math.PI / 2, L, w, .85 * fade, su);
      PZinject(c, cx, sy, fx, fy, fr, su, SC, fade);
      PZneedle1(c, cx, sy, -Math.PI / 2, L * .55, w * .88, fade, su);
      gAdd(c, g => gHalo(g, cx, sy, w * 4.2, PZTOX, .60 * fade * (1 - su * .86)));
      continue;
    }
    // ⓓ ⭐ **부러져 떨어진다** — 몸이 없어졌으니 갈 곳이 없다.
    //   두 토막이 좌우로 갈라져 아래로 떨어지며 식는다. 확정본의 폭발이 쓰는
    //   그 어휘(`PZnSHARD`)이고, 새 장치가 0 개다.
    if (drop >= 1) continue;
    const fo = 1 - drop;
    for (let k = 0; k < PNSHARD; k++) {
      const side = k ? 1 : -1;
      const vx = side * (14 + 8 * hash(i * 3.1 + k)) * SC;
      const x = cx + vx * drop * PNDROP;
      const y = sy + .5 * PNG * SC * (drop * PNDROP) * (drop * PNDROP);
      // ⚠️ 부러지는 **첫 프레임**의 길이가 드러난 몫(`L*.55`)과 같아야 한다 —
      //   거기서 짧은 토막으로 툭 갈아 끼우면 그 한 프레임이 통째로 튄다
      //   (실측: 1ms 도약 503 → 이 줄로 절반이 준다).
      PZneedle1(c, x, y, -Math.PI / 2 + side * (.5 + .9 * drop),
        L * (.55 - .21 * drop), w * .9, fo * .95, .85);
    }
  }
  hero(c, t, cx, cy);
},
});

// ── 검산용 창구 — 그리기와 **같은 값**을 내보낸다 ─────────────────────────
window.PNDBG = { K: { PNSLOT, PNPER, PNENV, PNHERO, PNNEAR, PNREACH, PNFOE,
  PNDIE, PNFADE, PNDROP, PNSHARD, PNG, PNDRY }, plan: PNplan, env: PNenv };

// ── 마운트 — **칸은 하나다** ──────────────────────────────────────────────
// ⚠️ 호스트가 없는 장에서는 조용히 건너뛴다(확정본과 같은 규약).
{
  const H = document.getElementById("pkpnmiss");
  if (H) tile(H, FX, "PNmiss", "빗나가면 빛이 다하고, 몸이 없어지면 부러진다", "",
    "한 바퀴(<b>9.6초</b>)에 <b>빗나감 세 갈래</b>가 다 나온다 — " +
    "① <b>표적 소멸</b>(두 대 꽂힌 뒤 죽는다 · 꽂혔던 침이 <b>부러져 떨어진다</b> · " +
    "스택 셋이 <b>안 찬다</b>) ② <b>사거리 밖</b>(정면으로 날아가 <b>사거리 끝 197</b>에서 " +
    "빛이 다한다) ③ <b>적 0마리</b>(마당이 비었다 — <b>침의 그림이 ②와 한 픽셀도 " +
    "안 다르다</b>. ②에 적이 <b>보이는데도</b> 그렇다 — 그것이 「사거리 밖」이다). " +
    "확정본 <code>PZneedle30</code> 은 이 셋을 하나도 안 그렸고, ③에서는 <b>예외로 터진다</b>",
    236, 236, undefined, 5);
}
