// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-meta.js — 화면 3 「강화」
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HM`/`hm` 로 격리한다.
//
// ── 이 화면이 무슨 화면인가 ──────────────────────────────────────────────
// **기르는 곳**이다. 사는 곳이 아니다.
//   - 낱칸을 고르는 것이 아니라 **줄마다 눈금이 찬다**
//   - 손짓은 「골라서 산다」가 아니라 **±를 여러 번 누른다**
//   - 값은 칸마다 붙는 것이 아니라 **위에 모여 줄어드는 것이 보인다**(지갑 띠)
//   - 그리고 **확인 전까지 무를 수 있다**(초기화)
// 앞선 판은 게이트 격자 여덟 칸이라 「카드를 고른다」였고, 그것이 곧 상점의
// 문법이라 사용자에게 반려됐다(2026-08-27). 격자를 걷고 줄로 갈아 끼운 것이
// 이 판이다.
//
// ── 값은 한 줄도 새로 안 짓는다 ─────────────────────────────────────────
// `vfx.js` 의 `SSTAT`(축 여덟) · `SWALLET`(지갑 여섯) · `STONENM`/`stoneGlyph`
// (강화석 문양) · `kStatLevelMax`(99) 를 **읽기만** 한다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 대의 경계 — 눈금 막대의 키 큰 획 둘 ──────────────────────────────
// 지갑 띠가 이미 글로 적고 있는 그 셋이다(「대 셋 — Lv1~20 일반 · Lv21~70 색 ·
// Lv71~99 색+유니크」). 99 를 눈금 아흔아홉 개로 못 그리는 대신 **재료가
// 갈리는 자리**만 키를 키우는 것이 이 화면의 답이고, 그 자리가 여기 둘이다.
const HMBAND = [20, 70];

/// 왼쪽 평균 눈금의 키 큰 획 둘 — **평균 레벨이 여는 난이도 문**.
/// ⚠️ 값의 정본은 엔진이다(`lib/store/tier_unlock.dart` 의
///   `kTierHardMetaAvg` 20 · `kTierNightmareMetaAvg` 50). 여기서 정하는 값이
///   아니라 **평균이 뜻을 갖는 유일한 자리**라 적어 둔 것이다 — 이 둘이 없으면
///   왼쪽의 평균은 결과가 없는 숫자가 되고, 세워 둔 도형도 장식이 된다.
const HMGATE = [20, 50];

/// 도형의 밑동과 끝 — 레벨 0 의 반지름과 만렙 99 의 반지름.
/// ⚠️ 밑동이 0 이면 꼭짓점 여덟이 중심 한 점에 모여 **도형 자체가 사라진다**.
const HMR0 = 12, HMR1 = 52;

/// 만렙의 테 — 「아직 이만큼 남았다」를 말하는 바깥 고리. 도형의 끝보다
/// 한 겹 밖이라, 꼴이 작을수록 **남은 자리가 크게 보인다**.
const HMRIM = 56;

/// 도형의 중심 · 받침의 높이 — 받침이 테 바로 밑에 닿아야 「올려놓았다」가 된다.
/// ⚠️ 멀리 떼면 받침이 물건이 아니라 **딴 물건**으로 읽힌다(첫 판에서 그랬다).
const HMCY = 70, HMPY = 138;

// ── 한 판의 상태 ─────────────────────────────────────────────────────────
// ⚠️ `SWALLET` 은 `vfx.js` 의 것이라 **베껴서 갖는다** — 판이 둘이고 둘 다
//   지갑을 깎으므로, 원본을 건드리면 한쪽의 확인이 다른 쪽 지갑을 줄인다.
function hmState() {
  return {
    lv: SSTAT.map((r) => r[1]),
    add: SSTAT.map(() => 0),
    wal: SWALLET.slice(),
    hot: -1,
  };
}

/// 이번에 얹은 단이 무는 강화석 — 종별 합.
/// ⚠️ 한 단에 **한 개**인 것은 `SSTAT` 이 개수 설계 전에 그린 자리 채우기다.
///   엔진은 **사다리 둘**로 물고(`lib/sim/player/meta_gate.dart` 의
///   `metaPlainStones` · `metaColorStones` · `kMetaPlainPlateau`), 그 어긋남은
///   `#s-gap` 에 적어 둔 자리다 — 시안이 정하는 것은 **「무슨 돌이 몇 개」가
///   앉는 자리**이지 그 수가 아니다.
function hmSpent(st) {
  const s = st.wal.map(() => 0);
  SSTAT.forEach(([, , need], i) => need.forEach((kk) => { s[kk] += st.add[i]; }));
  return s;
}

/// 확인하고 나면 남을 지갑 — **띠에 큰 자리로 서는 수가 이것**이다.
function hmLeft(st) { const sp = hmSpent(st); return st.wal.map((n, kk) => n - sp[kk]); }

/// 이 축을 한 단 더 얹을 수 있나 — 만렙이 아니고, **남을 돌**이 값을 넘나.
/// ⚠️ 보유가 아니라 **남을 것**을 본다: 이동속도를 두 번 누르면 유니크가
///   바닥나 세 번째가 죽어야 한다. 「줄어드는 게 보인다」가 손잡이까지 가는 자리다.
function hmCanRaise(st, i) {
  if (st.lv[i] + st.add[i] >= kStatLevelMax) return false;
  const left = hmLeft(st);
  return SSTAT[i][2].every((kk) => left[kk] >= 1);
}

const hmAvg = (a) => a.reduce((x, y) => x + y, 0) / a.length;

// ── 배경 — 공용 껍질 + 이 화면의 표식 하나 ───────────────────────────────
// ⚠️ 화면마다 제 표식이 하나씩 있어야 여섯 장이 「같은 창의 다른 방」으로
//   읽힌다. 강화의 표식은 **큰 세그먼트 고리 둘** — 「대 셋으로 잘린 사다리」를
//   고리로 옮긴 것이다. 알파는 줄보다 한참 아래(0.09~0.13)라 글을 안 먹는다.
function hmBg(seed) {
  return function hmBgDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed });
    const r = Math.min(box.w, box.h) * 0.44;
    hudSectorRing(c, box.cx, box.cy, r, 24, { alpha: 0.12 });
    hudSectorRing(c, box.cx, box.cy, r * 0.66, 12, { alpha: 0.09, rot: 0.13 });
    hudRing(c, box.cx, box.cy, r * 0.86, { alpha: 0.08, w: 1, dash: [3, 5] });
    c.save(); c.translate(box.cx, box.cy); c.rotate(tAbs * 0.06);
    hudTicks(c, 0, 0, r * 1.08, 24, { len: 4, bigLen: 4, every: 999, alpha: 0.09 });
    c.restore();
  };
}

// ══════════════════════════════════════════════════════════════════════════
// 한 판을 통째로 짓는다 — 판이 둘이라(손대기 전 · 얹은 뒤) 조립은 하나다
// ══════════════════════════════════════════════════════════════════════════
// ⚠️ **갓 만든 노드에 `querySelector` 를 안 쓴다** — 스모크 스텁의 가짜 DOM 은
//   그걸 `null` 로 돌려줘 이 장 전체가 죽는다(상점 장이 겪은 그 자리).
//   고칠 노드는 만들 때 손에 쥐고 배열에 담는다.
function hmBuild(p, seed, preset) {
  const st = hmState();
  { const bg = $(p + "-bg"); if (bg) mk(bg, [788, 364], hmBg(seed), { clear: true }); }
  { const h = $(p + "-set");
    if (h) { const cv = document.createElement("canvas");
      cv.style.width = "18px"; cv.style.height = "18px"; h.appendChild(cv);
      mk(cv, [18, 18], function hmGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true }); } }
  hudRail(p + "-rail", "meta");

  // ── 지갑 띠 — 이 화면의 「강화 포인트」 줄 ───────────────────────────────
  // ⭐ 참조(레이싱 강화 화면)가 위에 「강화 포인트: 0」 한 줄을 두는 그 자리를
  //   **이 트랙은 이미 갖고 있다.** 다른 것은 값이 하나가 아니라 **여섯 종**
  //   이라는 것뿐이고, 그래서 한 줄에 여섯 칸이 선다.
  // ⚠️ **0 인 종도 자리를 지킨다**(흐리게만) — 「아직 한 번도 안 캤다」가
  //   보여야 아래 막힌 줄의 「어디서 캔다」와 이어진다.
  const walOne = [], walNum = [], walDel = [];
  { const h = $(p + "-wal");
    if (h) {
      h.insertAdjacentHTML("beforeend", `<span class="lb">지갑</span>`);
      st.wal.forEach((n, kk) => {
        const w = document.createElement("span");
        w.className = "one";
        w.title = STONENM[kk];
        const cv = document.createElement("canvas");
        cv.style.width = "13px"; cv.style.height = "13px";
        w.appendChild(cv);
        const num = document.createElement("span");
        const del = document.createElement("i");
        w.appendChild(num); w.appendChild(del);
        h.appendChild(w);
        walOne.push(w); walNum.push(num); walDel.push(del);
        mk(cv, [13, 13], function hmWalGlyph(c, t, dt, W) {
          stoneGlyph(c, W, kk, hmLeft(st)[kk] === 0);
        }, { clear: true });
      });
      // 대 셋 — 한 줄. **눈금 막대의 키 큰 획 둘이 정확히 이 두 수**다.
      h.insertAdjacentHTML("beforeend",
        `<span class="rt">대 셋 — Lv1~${HMBAND[0]} 일반 · `
        + `Lv${HMBAND[0] + 1}~${HMBAND[1]} 색 · Lv${HMBAND[1] + 1}~${kStatLevelMax} 색+유니크</span>`);
    }
  }

  // ── 왼쪽 — **기르는 대상**. 여덟 축이 만드는 꼴 ───────────────────────
  // ⭐⭐ 참조는 자동차를 세운다. 라서의 강화는 **계정 단위**라(엔진
  //   `Progress.meta` — 캐릭터마다가 아니다) 여기에 캐릭터를 세우면 거짓말이고,
  //   홈이 이미 캐릭터를 가운데 크게 세워서 두 화면이 안 갈린다.
  //   ⇒ 세우는 것은 **여덟 축이 만드는 꼴** 하나다. 살 여덟의 길이가 곧 레벨
  //     여덟이고, +를 누르면 그 살이 **금빛으로 자란다** — 「기른다」가 왼쪽에서
  //     한 번, 오른쪽 눈금에서 또 한 번 보인다.
  { const fig = $(p + "-fig");
    if (fig) {
      const cv = document.createElement("canvas");
      cv.style.width = "196px"; cv.style.height = "166px";
      fig.appendChild(cv);
      mk(cv, [196, 166], function hmFigure(c, tAbs, dt, W) {
        const cx = W / 2;
        // 만렙의 테 — 「아직 이만큼 남았다」. 눈금 스물넷이 99 를 두른다.
        hudSectorRing(c, cx, HMCY, HMRIM * 0.78, 16, { alpha: 0.13 });
        hudTicks(c, cx, HMCY, HMRIM, 24, { len: 4, bigLen: 8, every: 3, alpha: 0.40 });
        hudRing(c, cx, HMCY, HMRIM, { alpha: 0.30, w: 1 });
        hudOrbit(c, cx, HMCY, HMRIM + 8, (HMRIM + 8) * 0.34, tAbs,
          { speed: 0.22, dots: 1, alpha: 0.26, dotR: 1.6 });
        const rOf = (v) => HMR0 + (HMR1 - HMR0) * hudCl(v / kStatLevelMax);
        const aOf = (i) => -TAU / 4 + i * TAU / 8;
        const pOf = (i, v) => [cx + Math.cos(aOf(i)) * rOf(v), HMCY + Math.sin(aOf(i)) * rOf(v)];
        const poly = (get, fill, line) => {
          c.beginPath();
          for (let i = 0; i < 8; i++) {
            const q = pOf(i, get(i));
            if (i) c.lineTo(q[0], q[1]); else c.moveTo(q[0], q[1]);
          }
          c.closePath();
          c.fillStyle = fill; c.fill();
          c.strokeStyle = line; c.lineWidth = 1.4; c.lineJoin = "round"; c.stroke();
        };
        // 얹은 꼴이 먼저(바깥), 확정된 꼴이 나중(안쪽) — 그래야 그 사이가
        // **금빛 테**로 남는다. 그 테 하나가 「무를 수 있는 것」의 전부다.
        poly((i) => st.lv[i] + st.add[i], A(HUDSEL, 0.18), A(HUDSEL, 0.92));
        poly((i) => st.lv[i], A(HUDLINE, 0.26), A(HUDLINE, 0.88));
        for (let i = 0; i < 8; i++) {
          const q = pOf(i, st.lv[i] + st.add[i]);
          const on = st.hot === i;
          c.strokeStyle = A(on ? HUDGLOW : HUDLINE, on ? 0.90 : 0.46);
          c.lineWidth = on ? 1.6 : 1;
          c.beginPath(); c.moveTo(cx, HMCY); c.lineTo(q[0], q[1]); c.stroke();
          hudNode(c, q[0], q[1], on ? 2.4 : 1.6, { alpha: on ? 1 : 0.62 });
          // 손이 얹힌 줄만 이름이 뜬다 — 여덟을 늘 적으면 도형이 표가 된다.
          if (on) {
            const r = Math.cos(aOf(i)) >= 0;
            hudTag(c, q[0] + (r ? 6 : -6), q[1] - 4, SSTAT[i][0],
              { align: r ? "left" : "right", alpha: 0.95, color: HUDINK, fs: 8 });
          }
        }
        // ⚠️⚠️ **얹은 몫을 살 위에 굵게 덧그린다.** 꼴만으로는 다섯 단이
        //   2px 남짓이라(99 중 다섯) 눌러도 안 움직이는 것처럼 보인다 — 실측
        //   캡처에서 그랬다. 굵은 금빛 마디 + 끝의 점이 있어야 **누른 것이
        //   대상에 남는다**가 정지 화면에서도 판정된다.
        for (let i = 0; i < 8; i++) {
          if (!st.add[i]) continue;
          const q0 = pOf(i, st.lv[i]), q1 = pOf(i, st.lv[i] + st.add[i]);
          c.save();
          c.strokeStyle = HUDSEL; c.lineWidth = 3.2; c.lineCap = "round";
          c.beginPath(); c.moveTo(q0[0], q0[1]); c.lineTo(q1[0], q1[1]); c.stroke();
          c.restore();
          c.fillStyle = HUDGLOW;
          c.beginPath(); c.arc(q1[0], q1[1], 2.2, 0, TAU); c.fill();
        }
        gHalo(c, cx, HMCY, 5.2, HUDK, 0.95);
        hudPedestal(c, cx, HMPY, 168);
      }, { clear: true });
    }
  }

  // 평균 — **여덟 축이 만드는 꼴의 크기**. 이 화면에서 도형이 장식이 아닌
  // 근거이고(난이도 문을 여는 것이 이 수다), +를 누르면 여기도 같이 움직인다.
  const avgTx = $(p + "-avg");
  { const h = $(p + "-avgsc");
    if (h) {
      const cv = document.createElement("canvas");
      cv.style.width = "150px"; cv.style.height = "11px";
      h.appendChild(cv);
      mk(cv, [150, 11], function hmAvgScale(c, t, dt, W, H) {
        const cur = hmAvg(st.lv);
        const nxt = hmAvg(st.lv.map((v, i) => v + st.add[i]));
        hudScale(c, 0, 0, W, H,
          { lv: cur, add: nxt - cur, max: kStatLevelMax, bands: HMGATE, tick: 10 });
      }, { clear: true });
    }
  }

  // ── 오른쪽 — 축마다 한 줄 ───────────────────────────────────────────────
  // 이름 · 레벨 · **눈금 막대** · 드는 돌 · − · + . 참조가 세운 줄 그대로이고,
  // 라서가 더한 것은 「드는 돌」 한 칸뿐이다 — 값이 포인트 하나가 아니라
  // **여섯 종**이라 어느 종을 무는지가 줄에 있어야 지갑 띠와 이어진다.
  const rows = [];
  { const g = $(p + "-rows");
    if (g) SSTAT.forEach(([nm, , need, miss], i) => {
      const row = document.createElement("div");
      row.className = "hudrow";

      const nme = document.createElement("div");
      nme.className = "nm";
      // 막힌 줄은 **이름 밑에서** 「어디서 캔다」를 말한다 — 못 누르는 이유가
      // 못 누르는 것의 이름 옆에 있어야 읽히고, 줄 높이도 안 늘어난다.
      nme.insertAdjacentHTML("beforeend", `<b>${nm}</b>` + (miss ? `<i>${miss}</i>` : ``));
      row.appendChild(nme);

      const lve = document.createElement("div");
      lve.className = "lv";
      row.appendChild(lve);

      const sce = document.createElement("div");
      sce.className = "sc";
      const scv = document.createElement("canvas");
      scv.style.width = "218px"; scv.style.height = "12px";
      sce.appendChild(scv);
      row.appendChild(sce);

      // 드는 돌 — 「얼마」가 아니라 **「무슨 돌이 몇 개」**. 둘이면 가운데에
      // `+` 가 선다(「둘 중 하나」가 아니라 둘 다인 것이 Lv71~99 대의 정의다).
      const cst = document.createElement("div");
      cst.className = "cost";
      need.forEach((kk, j) => {
        if (j) cst.insertAdjacentHTML("beforeend", `<em>+</em>`);
        const g2 = document.createElement("canvas");
        g2.style.width = "11px"; g2.style.height = "11px";
        cst.appendChild(g2);
        cst.insertAdjacentHTML("beforeend", `1`);
        mk(g2, [11, 11], function hmCostGlyph(c, t, dt, W) { stoneGlyph(c, W, kk, false); }, { clear: true });
      });
      row.appendChild(cst);

      const stp = document.createElement("div");
      stp.className = "st";
      const dn = document.createElement("div");
      dn.className = "hudstep"; dn.textContent = "−";
      const up = document.createElement("div");
      up.className = "hudstep"; up.textContent = "+";
      stp.appendChild(dn); stp.appendChild(up);
      row.appendChild(stp);
      g.appendChild(row);

      mk(scv, [218, 12], function hmRowScale(c, t, dt, W, H) {
        hudScale(c, 0, 0, W, H, {
          lv: st.lv[i], add: st.add[i], max: kStatLevelMax,
          bands: HMBAND, tick: 5, blocked: !hmCanRaise(st, i),
        });
      }, { clear: true });

      up.addEventListener("click", () => { if (hmCanRaise(st, i)) { st.add[i] += 1; hmSync(); } });
      dn.addEventListener("click", () => { if (st.add[i] > 0) { st.add[i] -= 1; hmSync(); } });
      row.addEventListener("mouseenter", () => { st.hot = i; });
      row.addEventListener("mouseleave", () => { if (st.hot === i) st.hot = -1; });
      rows.push({ row, lve, up, dn });
    });
  }

  // ── 되돌림과 확정 ───────────────────────────────────────────────────────
  // ⚠️⚠️ **엔진의 사는 문은 즉시 확정이다** — `Progress.buyMetaLevel` 이 부른
  //   그 자리에서 돌을 물고 레벨을 올리고, **되파는 문이 없다**
  //   (`lib/store/meta_stats.dart`). 얹은 단은 화면이 들고(엔진은
  //   `lib/ui/meta_plan.dart`), 확인이 그 문을 얹은 수만큼 **차례로** 부른다 —
  //   그래서 저장 계약은 한 줄도 안 바뀐다. 근거는 `#s-notes` 의 그 줄에 있다.
  const reset = $(p + "-reset"), ok = $(p + "-ok");
  if (reset) reset.addEventListener("click", () => { st.add.fill(0); hmSync(); });
  if (ok) ok.addEventListener("click", () => {
    // 확인 — 여기서야 값이 나간다. 남을 지갑이 그대로 새 지갑이 된다.
    st.wal = hmLeft(st);
    st.lv = st.lv.map((v, i) => v + st.add[i]);
    st.add.fill(0);
    hmSync();
  });

  /// 그림이 아닌 것(글자 · 손잡이의 죽고 삶)을 한 번에 맞춘다. 캔버스는 매
  /// 프레임 `st` 를 다시 읽으므로 여기서 건드릴 것이 없다.
  function hmSync() {
    const left = hmLeft(st);
    let any = 0;
    st.wal.forEach((n, kk) => {
      const d = n - left[kk];
      walNum[kk].textContent = String(left[kk]);
      walDel[kk].textContent = d ? "−" + d : "";
      if (left[kk] === 0) walOne[kk].classList.add("zero");
      else walOne[kk].classList.remove("zero");
    });
    rows.forEach((r, i) => {
      any += st.add[i];
      const to = st.lv[i] + st.add[i];
      const can = hmCanRaise(st, i);
      r.lve.innerHTML = `<b>${st.lv[i]}</b>`
        + (st.add[i] ? `<em>→${to}</em>` : ``)
        + ` /${kStatLevelMax}`;
      if (!can && to < kStatLevelMax) r.row.classList.add("poor");
      else r.row.classList.remove("poor");
      if (can) r.up.classList.remove("off"); else r.up.classList.add("off");
      if (st.add[i]) r.dn.classList.remove("off"); else r.dn.classList.add("off");
    });
    if (avgTx) {
      const cur = hmAvg(st.lv), nxt = hmAvg(st.lv.map((v, i) => v + st.add[i]));
      avgTx.innerHTML = `<span class="k">평균</span> <b>${cur.toFixed(1)}</b>`
        + (any ? ` <em>→ ${nxt.toFixed(1)}</em>` : ``)
        + ` <span class="k">/ ${kStatLevelMax}</span>`;
    }
    if (ok) ok.className = "hudbtn" + (any ? " sel" : " lock");
    if (reset) reset.className = "hudbtn ghost" + (any ? "" : " lock");
  }

  // 판 둘 중 하나는 **이미 몇 단 얹은 채**로 선다. 금빛 테 · 줄어든 지갑 ·
  // 살아난 확인 — 「무를 수 있다」가 정지 화면에서 판정되려면 그래야 한다.
  if (preset) preset.forEach(([i, n]) => { st.add[i] = n; });
  hmSync();
}

// 판 둘 — ① 손대기 전 ② **열세 단 얹은 뒤**.
// ⚠️ 얹는 수를 다섯 · 여섯 · 둘로 잡은 근거: ⓐ 한 단(1/99 = 2.2px)은 정지
//   화면에서 안 보인다 ⓑ 이동속도 둘이면 **유니크가 바닥나** 그 줄의 +가
//   죽는다 — 「위에서 줄어드는 것」이 숫자에서 그치지 않고 **손잡이까지**
//   가는 것을 한 장으로 보여 주는 자리다.
hmBuild("hma", 7, null);
hmBuild("hmb", 19, [[0, 5], [4, 6], [7, 2]]);
hudPanels();
