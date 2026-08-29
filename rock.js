/* ══════════════════════════════════════════════════════════════════════════
   운석 — 시안 정본

   ⚠️⚠️ **새 원시함수를 하나도 안 만든다.** `celPuff`·`celSplash`·`jagPoly`·
      `celStroke`·`celHoop` 를 안 부르면 이 페이지만 `vfx.js` 48,490줄과
      **다른 언어**를 쓰게 되고, 그게 「촌스럽다 · 평면 같다」의 정체다.

   ⚠️ 이름은 전부 `rk`/`RK_` 로 접두한다 — `vfx.js` 를 같이 싣기 때문이다.
   ══════════════════════════════════════════════════════════════════════════ */

/// ⭐ **광원은 전역 하나다** — `vfx.js:19230` 의 `MU2LA=.70` 을 그대로 쓴다.
///   「한 덩이라도 반대쪽이 밝으면 그 순간 반사가 아니라 **얼룩**이 된다」
///   45° 정대각을 피해 40° 로 둔 이유도 그쪽에 적혀 있다.
const RK_LA = 0.70, RK_LX = Math.cos(RK_LA), RK_LY = Math.sin(RK_LA);

function rkFit(cv) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = cv.clientWidth || +cv.getAttribute('width');
  const h = cv.clientHeight || +cv.getAttribute('height');
  if (cv.width !== Math.round(w * dpr)) {
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
  }
  const c = cv.getContext('2d');
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  c.lineJoin = 'round';
  c.lineCap = 'round';
  return [c, w, h];
}

/// 돌 팔레트 — `vfx.js:263` 의 `gBoulder`("암갈 30° 저채도") 계열.
/// ⚠️ **그림자 단은 바탕보다 어두워야 한다** — 같은 밝기면 실루엣이 안 닫힌다.
const RK_BG = '#0A0910';
const RK_DARK = '#07060C';     // 바탕(#0A0910)보다 **어둡다**
const RK_MID = '#3A3240';
const RK_LIT = '#6E6478';
const RK_HOT = '#C6BCD2';

/// 속성 광맥 색 — `vfx.js` 의 `TONE` 을 **직접 부른다**(사본 금지).
/// ⚠️ 사본을 뜨면 저장소의 색과 어긋난다(`vfx.js:15255`).
/// ⚠️ 저장소 `TONE` 에 **황금이 없다** — `gold` 는 이름과 달리 회백이고
///   `amber` 는 주황이다. 유니크 재화의 황금은 여기서 더한다.
const RK_TONE_EXTRA = { unique: ['#4A3306', '#FFC64A', '#FFF3D0'] };
const rkTone = (k) => RK_TONE_EXTRA[k] ||
  (typeof TONE !== 'undefined' && TONE[k]) || ['#123A5E', '#4FC3F7', '#E8F8FF'];

/// ⚠️⚠️ **`jagPoly` 인자가 「별」과 「돌」을 가른다.** 마루/골 비가 1.9 를
///   넘으면 **별**이고, 1.3 언저리라야 **덩어리**다.
///
///   | n · spike | 마루/골 |
///   |---|---|
///   | 5 · 1.35 | **1.93** ← 별 |
///   | 7 · 1.0 | 1.61 |
///   | **9 · 0.8** | **1.29** ✓ |
///   | 11 · 0.62 | 1.00 (원에 가깝다) |
///
///   ⚠️ 11 이상은 원이 된다 — `vfx.js:19294` 도 「n=5~7 로 불렀더니 원에
///     가까워져」 반대 방향으로 같은 실수를 적어 뒀다. 9 가 가운데다.
const RK_N = 9, RK_SPIKE = 0.8;

/* ── 배경 — 4층 시차 ─────────────────────────────────────────────────────
   ⭐ **「우주에 떠 있다」는 배경이 만든다.** 별 한 층으로는 안 되고,
     **크기·밝기·속도가 함께** 변해야 깊이로 읽힌다(`vfx.js:13455`) — 셋 중
     하나만 바꾸면 「그냥 점이 다른 점」이다.

   ⚠️ 반전이 하나(`vfx.js:19198`) — **근층은 밝게가 아니라 어둡게.**
     「가리는 층」이라야 이펙트와 밝기로 안 싸운다.                        */

// [깊이, 칸수, 반지름, 색, 알파, 늘어남]
const RK_DRIFT = [
  [0.07, 150, 0.9, '#3F4763', 0.50, 0],
  [0.22, 90, 1.3, '#4E5878', 0.70, 0],
  [0.52, 46, 1.6, '#6E7899', 0.86, 0.35],
  [1.00, 22, 2.2, '#8A93B4', 1.00, 0.9],
];
/// ⚠️ **늘어남은 속도에 매인다.** 잔상으로 읽히려면 그만큼 빨라야 하는데
///   여기는 관측하는 화면이라 느리다(9px/s) — 늘어남도 같이 줄여야
///   근층이 **가로 막대**로 안 보인다.
const RK_SPEED = 9;

/* ── 조각의 몸 — **확정된 디자인**(6안 판정 F) ─────────────────────────
   ⚠️ 6안(A~F)과 광원 판정 판은 **판정이 끝나 걷어 냈다.** 채택된 F 의 층 중
     조각(`rkOre`)이 쓰는 둘만 남긴다 — 3단 계조 몸([rkB])과 크레이터([rkD]).
     본체(`rkStone`)는 다면체라 이 둘을 안 쓴다.                            */

/// **B안 — A + 중간단.** 3단 계조를 광원 축으로 **두 번** 민다.
///   `celPuff`(`vfx.js:700`)가 3단을 (−.06,−.10) → (−.10,−.18) 로 미는 그 문법.
/// [pal] `[그늘, 중간, 밝음]` — 안 주면 돌 팔레트. **등급이 여기서 갈린다.**
function rkB(c, x, y, r, seed, rot, g, pal) {
  // ⚠️ **확정된 것은 물어보기 전에 안 바꾼다.** 이 3단 계조는 6안 판정에서
  //   채택된 그림이고, 조각(`rkOre`)이 이것을 밟고 서 있다.
  const P3 = pal || [RK_DARK, RK_MID, RK_LIT];
  const cs = Math.cos(rot), sn = Math.sin(rot);
  const ux = RK_LX * cs + RK_LY * sn, uy = -RK_LX * sn + RK_LY * cs;
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  const step = (gg, rr, col) =>
    fillPoly(c, jagPoly(-ux * r * gg, -uy * r * gg * 0.94,
      Math.max(0.35, rr), RK_N, seed, RK_SPIKE, 0.94), A(col, 1));
  step(0, r, P3[0]);
  step(g * 0.55, r * (1 - 1.15 * g * 0.55), P3[1]);
  step(g, r * (1 - 1.15 * g), P3[2]);
  c.restore();
}

function rkD(c, x, y, r, seed, rot, g, pal) {
  rkB(c, x, y, r, seed, rot, g, pal);
  const P3 = pal || [RK_DARK, RK_MID, RK_LIT];
  const cs = Math.cos(rot), sn = Math.sin(rot);
  const ux = RK_LX * cs + RK_LY * sn, uy = -RK_LX * sn + RK_LY * cs;
  c.save();
  c.translate(x, y);
  c.rotate(rot);
  // 몸 안으로 자른다 — 균열이 돌 밖에 있으면 그건 긁힌 배경이다.
  c.beginPath();
  jagPoly(0, 0, r, RK_N, seed, RK_SPIKE, 0.94).forEach((p, i) =>
    i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
  c.closePath();
  c.clip();
  // ⚠️⚠️ **패인 것과 붙은 것은 명암이 정반대다.** 어두운 판 위에 밝은 판을
  //   얹으면 그건 **볼록**(혹)이라 튀어나와 보인다. 구멍은:
  //     · **광원 쪽 벽이 그늘**이다(빛이 테에 막혀 안 들어온다)
  //     · **반대쪽 안벽이 밝다**(빛이 거기 가서 닿는다)
  //   즉 볼록의 밝은 면과 **정확히 반대 방향**으로 민다.
  const NC = 3;
  for (let i = 0; i < NC; i++) {
    const a = hash(seed * 3.7 + i * 9.1) * Math.PI * 2;
    const d = r * (0.1 + 0.42 * hash(seed * 5.3 + i * 4.7));
    // 자국 크기도 **고르지 않게** — 큰 것 몇에 작은 것 여럿이라야 표면이다.
    const cr = r * (0.15 + 0.12 * hash(seed * 7.1 + i * 2.3));
    const px = Math.cos(a) * d, py = Math.sin(a) * d * 0.9;
    // 구멍 전체 — 그늘
    fillPoly(c, puffPoly(px, py, cr, 6, seed + i * 11, 0.86), A(P3[0], 0.85));
    // 반대쪽 안벽 — 밝다. 볼록과 **반대로** 민다(부호가 +ux 다)
    fillPoly(c, puffPoly(px + ux * cr * 0.4, py + uy * cr * 0.4,
      cr * 0.46, 5, seed + i * 13, 0.86), A(P3[2], 0.5));
  }
  c.restore();
}

function rkSky(c, W, H, t) {
  c.fillStyle = RK_BG;
  c.fillRect(0, 0, W, H);
  RK_DRIFT.forEach(([dep, n, rr, col, al, stretch], li) => {
    for (let i = 0; i < n; i++) {
      const sx = hash(i * 1.7 + li * 31) * (W + 80) - 40;
      const sy = hash(i * 3.3 + li * 57) * H;
      // 흐른다 — 깊을수록 빠르다. 감기는 자리에서 위치가 튀지 않게 modulo 는
      // **좌표에만** 쓰고 알파에는 안 쓴다(위상 파생값 금지).
      const x = ((sx - t * RK_SPEED * dep) % (W + 80) + W + 80) % (W + 80) - 40;
      // 층마다 제 박자로 숨 쉰다 — 다 같이 밝아지면 화면이 깜빡인다.
      const br = 0.78 + 0.22 * Math.sin(t * (0.35 + dep * 0.5) + i);
      c.globalAlpha = al * br;
      c.fillStyle = col;
      if (stretch > 0) {
        c.fillRect(x, sy, rr * (1 + stretch * 1.1), rr);
      } else {
        c.fillRect(x, sy, rr, rr);
      }
    }
  });
  c.globalAlpha = 1;
}


function rkLabel(c, s, x, y, col) {
  c.fillStyle = col || '#8B8B99';
  c.font = '10.5px -apple-system,sans-serif';
  c.textAlign = 'center';
  c.fillText(s, x, y);
}

/* ── 판 ──────────────────────────────────────────────────────────────── */







/// ⑥ 맞는 자리 — 각도가 돌면 부위가 따라 돈다
/// 3-1 **맞는 자리** — 여덟 방향에서 동시에 쏴 부위가 전부 다름을 보인다.
///
/// ⚠️⚠️ **「플레이어가 돌며 빔을 쏜다」 칸은 여기 없다 — 4-1 의 몫이다.**
///   그 칸(운석 하나 + 도는 플레이어 + 찬 빔 + 명중)은 `rkMinePanel` 의 빔
///   기둥과 **같은 그림**이었다. 같은 장면을 두 절이 각자 그리면 「3 과 4 가
///   똑같다」로 읽힌다. 잃는 것은 없다 — 도는 궤도도(`t*0.55`) 미끄러지는
///   타격점도([rkStoneHit]) 4-1 이 같은 식으로 그린다.
/// ⇒ 여기 남은 것은 **4-1 이 안 그리는 것 하나**다: 각도가 달라지면 타격점이
///   어디로 가나. 한 각도로는 못 보이므로 여덟을 한 번에 세운다.
function rkHitPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  // 칸을 통째로 쓰므로 반쪽이던 때보다 크게 — 타격점이 실루엣의 **어느
  // 굴곡**에 앉는지가 이 그림의 전부라, 다각형이 읽힐 만큼 커야 한다.
  const cx = W * 0.5, cy = H * 0.44, R = 62;
  rkStone(c, cx, cy, R, 3.1, t, 'ember', false);
  for (let i = 0; i < 8; i++) {
    const th = (i / 8) * Math.PI * 2 + t * 0.12;
    const [hx, hy] = rkStoneHit(cx, cy, R, 3.1, t, th);
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.strokeStyle = A('#5FD9FF', 0.28);
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx + Math.cos(th) * 142, cy + Math.sin(th) * 142);
    c.lineTo(hx, hy);
    c.stroke();
    c.restore();
    const nl = Math.hypot(hx - cx, hy - cy) || 1;
    rkImpact(c, hx, hy, (hx - cx) / nl, (hy - cy) / nl, 3, 'frost',
      t, i * 2.3 + 1);
  }
  rkLabel(c, '여덟 방향 — 맞는 부위가 전부 다르다', cx, H - 34, '#9C9CAC');
  rkLabel(c, '중심에서 터지면 스티커, 실루엣 위에서 터져야 덩어리 — 실제 다각형과 광선을 교차시킨다',
    W / 2, H - 12, '#5A5A68');
}

/// ⑦ 얼음운석 — **깨기 전.** 속이 창 너머로 비친다.
///
/// ⚠️ **「깨고 나서」 칸은 없다.** 떨구던 물건 넷(자석·신발·망원경·확성기)이
///   게임 무드와 안 맞아 폐기됐고, 대신 들어갈 **보석 하나**의 시안이 아직
///   없다 — 없는 것을 자리만 잡아 두면 그 빈칸이 곧 「버려진 시안」이 된다.
///   창 너머 힌트([rkItem])는 그 보석이 설 때까지 자리를 지키는 대역이다.
function rkIcePair(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  // 셋을 판 가운데로 — 한쪽으로 몰면 지운 자리가 빈칸으로 읽힌다. 간격은
  // 반쪽을 쓰던 때와 **같은 W 비율**(0.125)이라 좁은 폭에서도 안 겹친다.
  for (let i = 0; i < 3; i++) {
    const x = W * (0.375 + 0.125 * i);
    rkIceRock(c, x, H * 0.42, 34, i * 4.3 + 2, t + i * 1.1,
      (cc, ix, iy, ir) => rkItem(cc, ix, iy, ir, RK_ITEM[i % 4][0], t));
  }
  rkLabel(c, '깨기 전 — 얼음운석', W / 2, H * 0.42 + 62, '#E8E8F0');
  rkLabel(c, '속의 물건이 창 너머로 보인다 — 무엇을 하러 가나를 미리 고른다',
    W / 2, H * 0.42 + 78, '#6A6A78');
}


/// ⑨ 얼음운석 **꼴 여섯** — 텍스처·자전·색은 그대로, 덩어리의 꼴만 다르다.
function rkIceFormPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const step = W / RK_ICE_FORM.length;
  RK_ICE_FORM.forEach((F, i) => {
    const x = step * (i + 0.5);
    // ⚠️ 여덟이 한 줄이라 좁다. 「창끝」은 길어서 반지름을 그대로 두면 잘린다.
    // ⭐ 속의 물건도 같이 — 「몸 안에 드는 타원」에 맞아 **어떤 꼴에서도
    //   밖으로 안 나가는가**를 여덟 꼴 전부에서 대조하는 자리다.
    rkIceRock(c, x, H * 0.40, 30, i * 4.3 + 2, t + i * 0.9,
      (cc, ix, iy, ir) => rkItem(cc, ix, iy, ir, RK_ITEM[i % 4][0], t), F);
    rkLabel(c, F.nm, x, H * 0.40 + 62, '#E8E8F0');
  });
  rkLabel(c, '손잡이 셋 — 축 눌림(길쭉·납작) · 자른 면(쪼개진 자리) · 뿔',
    W / 2, H - 10, '#5A5A68');
}

/* ── 운석 **본체** ────────────────────────────────────────────────────────
   맵에 박혀 있는 덩어리. 깨면 나오는 **조각**(`rkOre`)과는 다른 물건이다 —
   작고 뭉툭하고 광맥이 빛나는 것은 **「캘 것」이 아니라 「캐서 나온 것」**이다.

   ⚠️⚠️ 얼음과 **같은 기계**(`rkSolidFaces`)를 쓰되 **칠하는 언어는 정반대**다:

   | | 얼음 | **돌** |
   |---|---|---|
   | 왜 그 모양인가 | **쪼개졌다**(결정면) | **부딪혀 닳았다** |
   | 자름 | 깊다(0.34~0.68) | **얕다**(0.62~0.82) — 떨어져 나간 자국 |
   | 계조 | 여섯 단 | **세 단**(저장소 정본 `RK_DARK/MID/LIT`) |
   | 속 | 창으로 비친다 | **안 보인다** — 불투명한 덩어리다 |
   | 실루엣 | 광원 쪽 **흰 앞날** | 그늘 쪽 **림라이트** — 「어둠은 밝은 림으로 보인다」 |
   | 빛나는 것 | 모서리 | **광맥뿐** |
   | 표면 | 파단면·서리 | **크레이터**(패인 것) |

   ⭐ 그리고 **본체와 조각은 「움직임」으로 가른다** — 크기만으로는 「아직 캘 게
     남았나?」가 된다. 본체는 판 시작에 박혀 안 움직이고, 조각은 떠다니다
     플레이어에게 **끌려온다.** 안 움직이면 캘 것, 나에게 오면 주울 것.       */

/// 돌 본체의 꼴 — 얼음보다 **둥글고 얕게** 깨진다.
const RK_LUMP = [0.42, 1.18, 0.48];   // 돌의 혹 — 잦고 완만하다
/// 기암의 혹 — **더 잦고 더 크게.** 덩치가 커지면 잔 굴곡은 안 보이고
/// 큰 굴곡만 남으므로, 같은 값을 쓰면 초거대는 오히려 **밋밋해 보인다.**
const RK_CRAG = [0.30, 1.24, 0.72];
const RK_STONE_FORM = [
  { nm: '민덩이', ax: 1.00, ay: 0.92, az: 0.96, jit: 1.15, pole: 0, sz: 1,
    cut: [], xc: [0, 2, 0.62, 0.20], lump: RK_LUMP, norm: 1 },
  // ⚠️ 비율을 너무 극단으로 두면 **크기 사다리가 안 읽힌다** — 「중간·길쭉」과
  //   「작은·납작」이 화면에서 같은 폭(50)이 됐다. 돌은 크기가 HP 라 꼴이
  //   그 뜻을 흐리면 안 되므로, 비율은 **알아볼 만큼만** 준다.
  { nm: '납작', ax: 1.20, ay: 0.82, az: 1.02, jit: 1.05, pole: 0, sz: 1,
    cut: [], xc: [1, 2, 0.58, 0.22], lump: RK_LUMP, norm: 1 },
  { nm: '길쭉', ax: 0.84, ay: 1.20, az: 0.88, jit: 1.05, pole: 0, sz: 1,
    cut: [], xc: [1, 2, 0.60, 0.20], lump: RK_LUMP, norm: 1 },
  { nm: '떨어진', ax: 1.02, ay: 0.96, az: 0.94, jit: 1.20, pole: 0, sz: 1,
    cut: [[0.5, 0.6, 0.6, 0.44]], xc: [1, 1, 0.62, 0.18], lump: RK_LUMP, norm: 1 },
];

/// **기암(奇巖)** — 거대형. 절벽처럼 우뚝 서고 험하게 깨져 혹이 크다.
/// ⚠️ 꼴을 하나로 고정한다 — 랜드마크는 **알아볼 수 있어야** 하고, 매번
///   다른 실루엣이면 「저기 그 큰 거」가 안 된다. 씨앗이 세부만 흔든다.
const RK_CRAG_FORM = {
  nm: '기암', ax: 0.90, ay: 1.32, az: 0.88, jit: 1.45, pole: 0.3, sz: 1,
  cut: [[0.42, -0.72, 0.55, 0.40]], xc: [1, 2, 0.58, 0.20],
  lump: RK_CRAG, norm: 1, topo: 2,
  // ⚠️ 봉우리는 **두셋**이다. 늘리면 사방에서 잡아 빼는 셈이라 덩이가 통째로
  //   부풀고 덩치 맞추기가 그걸 다시 줄여, **오히려 둥글어진다.**
  spire: [3, 1.35, 5],
};

/// 씨앗이 꼴을 고른다.
function rkStoneForm(seed) {
  return RK_STONE_FORM[Math.floor(hash(seed * 43.7) * RK_STONE_FORM.length) %
    RK_STONE_FORM.length];
}

/// 돌 운석 **본체**. [key] 속성 · [rare] 희귀.
/// [opt] `{form}` — 꼴을 지정한다. 안 주면 씨앗이 고른다.
function rkStone(c, x, y, r, seed, t, key, rare, opt) {
  const O = opt || {};
  const FM = O.form || rkStoneForm(seed);
  const bob = Math.sin(t * 0.7 + seed) * r * 0.05;
  const up = 0.5 + 0.5 * Math.sin(t * 0.7 + seed);
  const yy = y + bob;
  const tx = 0.30 + 0.55 * hash(seed * 11.3);
  const tz = -0.55 + 1.10 * hash(seed * 13.7);
  // ⚠️ 본체는 **천천히** 돈다. 조각처럼 팽팽 돌면 「떠다니는 것」이 된다.
  const { V, FA, TP } = rkSolidFaces(r, seed, t * 0.22 + seed, tx, tz, FM);
  const T = rkTone(key);

  // 그림자 — 어두운 속 + 밝은 테(`vfx.js:19029`). 검은 그림자를 검은 바탕에
  // 깔면 안 보인다.
  const sh = r * (0.74 - up * 0.14);
  c.save();
  c.globalAlpha = 0.7 - up * 0.18;
  c.beginPath();
  c.ellipse(x, y + r * 1.1, sh, sh * 0.26, 0, 0, Math.PI * 2);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.1, sh, 0.26, 0, Math.max(1.4, r * 0.05), key,
    0.42 - up * 0.14);

  c.save();
  c.translate(x, yy);

  // ⭐ **세 단.** 여섯 단으로 늘리면 얼음처럼 반짝여 재질이 섞인다.
  // ⚠️⚠️ 레퍼런스 둘이 같은 말을 한다 — **몸은 거의 검다.**
  //   ① 녹아붙은 운석: 새까만 덩이에 **주황 금**만 형형하다
  //   ② 실물 운석 사진: 짙은 회록색 무광, 대비가 **몸 안에서는 거의 없다**
  //   ⇒ 드라마는 몸이 아니라 **광맥**이 만든다. 조각용 팔레트(`RK_MID/LIT`)를
  //     그대로 쓰면 몸이 떠서 광맥이 죽는다. 본체는 한 단 더 눌러 둔다.
  // ⚠️⚠️ **레퍼런스를 그대로 따르면 안 됐다**. 사진은 밝은 데서 찍혔고
  //   우리 배경은 **이미 검다**(`#0A0910`) — 거의 검은 몸은 배경에 먹힌다.
  //   ⇒ 「거의 검다」는 **사진의 절대값**이 아니라 **배경 대비**로 읽어야 한다.
  //     한 단 올려 몸이 배경에서 떨어지게 두고, 대비는 그대로 광맥이 만든다.
  // ⭐ **돌은 크리스탈로 안 올린다**(2026-08-24 판정). 얼음과 돌을 가르는
  //   축이 「여섯 단·창 ↔ 세 단·불투명」이라, 돌에 채도를 넣으면 그 축이
  //   무너진다. 여기서 올린 것은 **면 대비 하나**이고, 그마저 **위쪽에서만**
  //   얻었다(빛 받는 단 #6E6478 → #7D7288). 색상은 그대로 무채 자갈이다.
  // ⚠️⚠️ **어두운 단은 안 내린다** — 배경(#0A0910)과의 거리가 좁아져 몸이
  //   배경에 먹힌다(위 ⚠️⚠️ 가 말하는 그 함정을 실제로 밟아 봤다).
  const TONE3 = ['#16141F', '#3A3342', '#7D7288'];
  const lam = f => 0.14 + 0.86 * Math.max(0,
    f.n[0] * RK_L3[0] + f.n[1] * RK_L3[1] + f.n[2] * RK_L3[2]);
  const step = f => { const u = lam(f); return u > 0.62 ? 2 : u > 0.34 ? 1 : 0; };
  const path = f => {
    c.beginPath();
    c.moveTo(f.p[0][0], f.p[0][1]);
    c.lineTo(f.p[1][0], f.p[1][1]);
    c.lineTo(f.p[2][0], f.p[2][1]);
    c.closePath();
  };
  const front = FA.map((f, i) => ({ f, i })).filter(o => o.f.n[2] > 0);
  const isFront = new Array(FA.length).fill(false);
  front.forEach(o => (isFront[o.i] = true));

  // ① 몸 — 불투명한 세 단.
  // ⚠️ 면마다 밝기를 **아주 조금** 흔든다. 세 단만 쓰면 이웃이 자꾸 같은 값이
  //   되어 큰 면으로 합쳐지고, 그러면 「회색 종이」가 된다. 돌은 균질하지 않다.
  front.forEach(o => {
    path(o.f);
    const j = 0.86 + 0.28 * hash(seed * 83.9 + o.i * 1.7);
    c.fillStyle = A(TONE3[step(o.f)], 1);
    c.fill();
    c.fillStyle = A(j > 1 ? '#FFFFFF' : '#000000', Math.abs(j - 1) * 0.34);
    c.fill();
  });

  /// 몸 전체를 한 경로로 — 표면에 얹는 것이 **밖으로 못 나가게** 막는다.
  /// ⚠️ 이게 없으면 구면 위에 놓은 광맥이 실루엣 밖에 뜬다.
  const bodyPath = () => {
    c.beginPath();
    front.forEach(o => {
      c.moveTo(o.f.p[0][0], o.f.p[0][1]);
      c.lineTo(o.f.p[1][0], o.f.p[1][1]);
      c.lineTo(o.f.p[2][0], o.f.p[2][1]);
      c.closePath();
    });
  };

  // ② 크레이터 — **패인 것.** 어두운 판 위에 밝은 판을 얹으면 그건 **혹**이다.
  //   구멍은 광원 쪽 벽이 그늘이고 **반대쪽 안벽이 밝다.**
  // ⚠️⚠️ **레퍼런스 셋이 크기를 두고 갈렸고, 그게 답이었다**:
  //     ② 실물 사진 — **잔 곰보**가 빽빽하다
  //     ③ 철운석 — **큰 구멍**(엄지로 눌러 판 듯한 홈)이 뚫려 있다
  //   ⇒ 어느 하나가 아니라 **크기가 섞여야** 표면이 진짜로 읽힌다. 큰 것만
  //     있으면 달 표면이고, 잔 것만 있으면 사포다.
  //
  // ⚠️ 그리고 **`puffPoly` 를 뭉쳐 놓으면 꽃이 된다** — 얼음에서 같은 실수를
  //   했다. 구멍은 **둥글고 하나**다. 자리도 면 중심이 아니라 **구면에 고르게**
  //   뿌려야 표면에 난 자국으로 읽힌다(면마다 몰면 격자로 보인다).
  const holeSph = (lon, lat, rr) => {
    const a = lon + t * 0.22 + seed, cl = Math.cos(lat);
    const X = Math.sin(a) * cl * rr, Y = Math.sin(lat) * rr, Z = Math.cos(a) * cl;
    const cx0 = Math.cos(tx), sx0 = Math.sin(tx);
    const cz0 = Math.cos(tz), sz0 = Math.sin(tz);
    const y2 = Y * cx0 - Z * rr * sx0, z2 = Y * sx0 / rr + Z * cx0;
    return [X * cz0 - y2 * sz0, X * sz0 + y2 * cz0, z2];
  };
  c.save();
  bodyPath();
  c.clip();
  for (let i = 0; i < 26; i++) {
    const P = holeSph(hash(seed * 17.3 + i * 2.9) * Math.PI * 2,
      (hash(seed * 19.7 + i * 1.7) - 0.5) * 2.5, r * 0.72);
    if (P[2] <= 0.08) continue;
    const big = hash(seed * 53.1 + i * 2.7) > 0.78;
    const cr = (big ? r * (0.09 + 0.06 * hash(seed * 57.3 + i))
                    : r * (0.022 + 0.045 * hash(seed * 57.3 + i) ** 1.5)) *
      Math.max(0.4, P[2]);
    const kf = Math.max(0.35, P[2]);           // 가장자리에서 납작해진다
    const rot2 = Math.atan2(P[1], P[0]);
    c.save();
    c.translate(P[0], P[1]);
    c.rotate(rot2);
    c.scale(kf, 1);
    c.rotate(-rot2);
    if (big) {
      // 큰 구멍은 **테가 밝다** — 가장자리에 빛이 걸린다(레퍼런스 ③).
      c.fillStyle = A('#6E6478', 0.26);
      c.beginPath();
      c.arc(-RK_L3[0] * cr * 0.18, -RK_L3[1] * cr * 0.18, cr * 1.14, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = A('#03020A', big ? 0.95 : 0.8);
    c.beginPath();
    c.arc(0, 0, cr, 0, Math.PI * 2);
    c.fill();
    // 광원 **반대쪽 안벽**이 밝다(볼록과 부호 반대).
    c.fillStyle = A('#6E6478', big ? 0.5 : 0.34);
    c.beginPath();
    c.arc(RK_L3[0] * cr * 0.42, RK_L3[1] * cr * 0.42, cr * 0.46, 0, Math.PI * 2);
    c.fill();
    c.restore();
  }
  c.restore();

  // ③ 광맥 — **표면에 박혀 빛난다.** 돌에서 빛나는 건 이것뿐이다.
  //
  // ⚠️⚠️ 레퍼런스 ①(녹아붙은 운석)이 구조를 바로잡았다 — 광맥은 **따로 노는
  //   획 몇 개가 아니라 갈라지는 금 하나**다. 굵은 줄기에서 가지가 뻗고,
  //   가지에서 더 가는 가지가 나온다. 획을 흩뿌리면 「긁힌 자국」이 된다.
  // ⭐ 그리고 **금 둘레가 뜨겁다** — 금 자체보다 넓고 옅은 열이 표면에 번진다.
  //   이 한 겹이 「빛나는 선」을 「달아오른 돌」로 바꾼다.
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seed);
  const spin2 = t * 0.22 + seed;
  const cxr = Math.cos(tx), sxr = Math.sin(tx), czr = Math.cos(tz), szr = Math.sin(tz);
  /// 구면 위의 점 — 광맥이 몸을 따라 감긴다.
  const sph = (lon, lat) => {
    // ⚠️ **몸보다 큰 구면에 놓으면 클립이 다 잘라 낸다** — 남는 건 가장자리에
    //   달라붙은 토막뿐이다(실제로 그렇게 나왔다). 다면체는 구보다 안쪽이라
    //   0.94 가 아니라 **0.72** 쯤이라야 앞면 위에 얹힌다.
    const a = lon + spin2, cl = Math.cos(lat), rr = r * 0.72;
    const X = Math.sin(a) * cl * rr, Y = Math.sin(lat) * rr, Z = Math.cos(a) * cl;
    const y2 = Y * cxr - Z * rr * sxr, z2 = Y * sxr / rr + Z * cxr;
    return [X * czr - y2 * szr, X * szr + y2 * czr, z2];
  };
  /// 한 줄기를 걷는다 — 앞면인 동안만 점을 모은다.
  const walk = (lon0, lat0, n, k0, sd) => {
    const pts = [];
    let lo = lon0, la = lat0, dep = 0;
    for (let k = 0; k <= n; k++) {
      const P = sph(lo, la);
      if (P[2] > 0.06) {
        pts.push([P[0], P[1]]);
        if (k === 0) dep = P[2];
      } else if (pts.length > 1) break;
      else pts.length = 0;
      const ang = k0 + (hash(sd + k * 3.1) - 0.5) * 1.9;
      lo += Math.cos(ang) * 0.26;
      la += Math.sin(ang) * 0.22;
    }
    return [pts, dep];
  };
  /// 열 번짐 → 3단 획. 순서가 뒤바뀌면 열이 금을 덮는다.
  const vein = (pts, w, a) => {
    if (pts.length < 2) return;
    c.save();
    c.globalCompositeOperation = 'lighter';
    celStroke(c, pts, w * 3.4, key, a * 0.16);
    c.restore();
    celStroke(c, pts, w, key, a);
  };
  // ⚠️ 군집의 곁덩이는 **광맥이 아예 없다.** 색만 바꾸면 여전히 빛나서
  //   크리스마스 트리가 된다 — 실제로 그렇게 나왔다.
  c.save();
  bodyPath();
  c.clip();
  const trunkN = rare ? 3 : 2;
  for (let v = 0; v < trunkN; v++) {
    const a0 = hash(seed * 11.3 + v * 6.1) * Math.PI * 2;
    const lat0 = (hash(seed * 7.7 + v * 2.9) - 0.5) * 1.5;
    const [pts, dep] = walk(a0, lat0, 4, a0, seed * 5.1 + v * 3.3);
    const fade = Math.min(1, 0.3 + Math.max(0, dep) * 1.8);
    vein(pts, Math.max(1.4, r * (rare ? 0.075 : 0.06)),
      (0.45 + 0.4 * pulse) * fade);
    // 가지 — 줄기 위의 점에서 갈라져 나간다. 가늘고 짧다.
    const nb = rare ? 3 : 2;
    for (let b = 0; b < nb; b++) {
      const at = 0.3 + 0.5 * hash(seed * 23.7 + v * 4.1 + b);
      const lo = a0 + Math.cos(a0) * 0.26 * (at * 4);
      const la = lat0 + Math.sin(a0) * 0.22 * (at * 4);
      const dir = a0 + (hash(seed * 29.1 + v * 2.7 + b) - 0.5) * 2.6;
      const [bp, bd] = walk(lo, la, 2, dir, seed * 31.3 + v * 5.9 + b);
      vein(bp, Math.max(0.9, r * 0.032),
        (0.35 + 0.3 * pulse) * Math.min(1, 0.3 + Math.max(0, bd) * 1.8));
    }
  }

  // ⭐ **금이 몸을 비춘다.** 돌은 스스로 빛나지 않지만, 갈라진 틈에서 나온 빛은
  //   둘레의 면에 **닿는다**. 몸 안쪽에 속성색을 옅게 얹어 그 반사를 만든다 —
  //   이러면 밝아지면서도 「빛나는 돌」이 아니라 「빛이 닿은 돌」로 읽힌다.
  {
    c.globalCompositeOperation = 'lighter';
    const rg = c.createRadialGradient(0, 0, 0, 0, 0, r * 0.95);
    rg.addColorStop(0, A(T[1], 0.12 + 0.05 * pulse));
    rg.addColorStop(1, A(T[1], 0));
    c.fillStyle = rg;
    c.beginPath();
    c.arc(0, 0, r * 0.95, 0, Math.PI * 2);
    c.fill();
    c.globalCompositeOperation = 'source-over';
  }
  c.restore();

  // ④ 윤곽 — 톤 경계는 **어두운 골**(돌은 안 빛난다), 실루엣은 **림라이트**.
  //   ⭐ 「어둠은 밝은 림으로 보인다」(`vfx.js:19240`) — 그늘 쪽만 얇게 밝힌다.
  TP.E.forEach(([a, b]) => {
    if (!isFront[a] && !isFront[b]) return;
    const sil = isFront[a] !== isFront[b];
    const fa = FA[a], fb = FA[b];
    if (!sil && step(fa) === step(fb)) return;
    const P = TP.F[a].filter(v2 => TP.F[b].includes(v2)).map(v2 => V[v2]);
    if (P.length < 2) return;
    const lit = Math.max(lam(fa), lam(fb));
    if (sil) {
      // ⚠️⚠️ **림은 그늘 쪽에만.** 실루엣을 통째로 두르면 「오려낸 조각」이
      //   된다 — 얼음이 「날붙이」로 보이는 것도 같은 원인이다. 모서리가 광원
      //   **반대쪽**에 있을 때만 밝힌다.
      const mx = (P[0][0] + P[1][0]) / 2, my = (P[0][1] + P[1][1]) / 2;
      const ml = Math.hypot(mx, my) || 1;
      const away = -(mx / ml * RK_L3[0] + my / ml * RK_L3[1]);  // 1 이면 정반대
      if (away < 0.35) return;
      c.strokeStyle = A(RK_HOT, 0.08 + 0.2 * away * (1 - lit * 0.5));
      c.lineWidth = Math.max(0.6, r * 0.011);
    } else {
      c.strokeStyle = A('#04030A', 0.5);
      c.lineWidth = Math.max(0.6, r * 0.012);
    }
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(P[0][0], P[0][1]);
    c.lineTo(P[1][0], P[1][1]);
    c.stroke();
  });

  // ⑤ 희귀 — 결정이 표면에 박힌다. 크기는 안 건드린다(크기 = HP).
  if (rare) {
    front.forEach(o => {
      if (lam(o.f) < 0.5 || hash(seed * 61.7 + o.i * 3.1) > 0.12) return;
      const q = o.f.ct;
      // ⚠️ `n=5, spike=1.2` 는 마루/골이 커서 **별**이 된다. 6·0.85 가 결정이다.
      fillPoly(c, jagPoly(q[0], q[1], r * 0.045, 6, seed + o.i, 0.85, 0.9),
        A(T[1], 0.7));
    });
  }
  c.restore();

  // ⑥ 광맥이 새는 빛 — 몸에 딱 붙는다. 넓으면 「빛나는 구름」이 된다.
  c.save();
  c.globalCompositeOperation = 'lighter';
  const gg = c.createRadialGradient(x, yy, r * 0.8, x, yy, r * (rare ? 1.2 : 1.08));
  gg.addColorStop(0, A(T[1], 0.05 + 0.03 * pulse));
  gg.addColorStop(1, A(T[1], 0));
  c.fillStyle = gg;
  c.beginPath();
  c.arc(x, yy, r * 1.2, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

/* ── 얼음운석 속 아이템 넷 ────────────────────────────────────────────────
   **자석** · **신발**(이속) · **망원경**(사거리) · **확성기**(범위).
   얼음운석에서만 나온다 — 몹은 암흑물질만 흘린다.

   ⭐ **색이 아니라 실루엣으로 가른다.** 화면에 이미 색 덩어리가 많다
     (색 운석 넷 · 유니크 금 · 암흑물질). 넷을 또 색으로 가르면 그것들과
     싸우므로 **백광 한 색**으로 두고 **모양**만 다르게 한다.

   ⚠️⚠️ **망원경과 확성기가 서로 먹는다** — 둘 다 「가늘게 시작해 벌어지는
     사선 통」이라 34px 에서 같은 것으로 보인다. 갈라 두는 법:

   | | 망원경 | 확성기 |
   |---|---|---|
   | 굵기 | **거의 균일**하다 | 한쪽만 **크게 벌어진다** |
   | 마디 | 렌즈 링이 **두 줄** | 없다 — 대신 **손잡이** |
   | 기울기 | **↗** | **↘** |

   ⭐ 자석·신발은 **가로로 넓고**, 망원경·확성기는 **사선으로 길다** — 축을
     둘 써야 34px 에서 넷이 갈린다.                                          */

/// 셋째 칸은 **효과 이름**이다 — 물건 이름과 다를 때만 적는다.
/// ⚠️⚠️ 자석은 비어 있다. 「중력」은 **색 운석의 중력석**(재화) 한 물건만
///   가리키는 말이라(설계 용어 표 ⚠️⚠️, 사용자 판정 2026-08-21) 버프 쪽에
///   쓰면 맵에서 무엇이 떨어졌는지 말로 못 가른다. 그리고 이 버프는 물건
///   이름이 곧 효과 이름이라(**자석**) 덧붙일 말 자체가 없다 — 정본 그대로다
///   (「자석 · 신발(이속) · 망원경(사거리) · 확성기(범위)」).
const RK_ITEM = [
  ['magnet', '자석', ''],
  ['boot', '신발', '이속'],
  ['scope', '망원경', '사거리'],
  ['horn', '확성기', '범위'],
];

/// 백광 3단 — 그늘 · 몸 · 앞날.
/// 아이템의 3단 — **강철빛**(`vfx.js` 의 `magnet` 계열). 순백으로 두면
/// 화면에서 혼자 튀어 **UI 아이콘**으로 보인다. 이 게임의 물건은 어두운
/// 우주에 떠 있는 **금속 덩이**다.
const RK_IT = ['#0C1024', '#4A5878', '#C6D2F0'];
/// 두께(옆면) — 몸보다 한 단 어둡다. 이 한 장이 「그림」을 「물건」으로 만든다.
const RK_IT_SIDE = '#070A18';

/// **폭 맞춤** — 넷이 같은 `r` 에서 같은 폭(1.50r)으로 보이게 하는 배수.
/// 실측 폭 1.56 / 1.27 / 1.42 / 1.60 을 1.50 으로 나눈 역수다.
const RK_IT_NORM = { magnet: 0.96, boot: 1.18, scope: 1.06, horn: 0.94 };


/// 아이템 하나. [kind] 는 `magnet`·`boot`·`scope`·`horn`.
///
/// ⭐ 셋을 겹쳐 그린다 — 그늘 판 → 몸 → **광원 쪽 앞날**. `celPuff` 가 3단을
///   미는 그 문법이고, 미는 방향은 전역 광원(왼쪽 위)이다.
function rkItem(c, x, y, r, kind, t) {
  const bob = Math.sin(t * 0.9 + kind.length) * r * 0.05;
  c.save();
  c.translate(x, y + bob);
  // ⚠️ **같은 `r` 을 줘도 넷의 크기가 달랐다** — 실측 폭이 신발 1.27r ↔
  //   확성기 1.60r 로 **26%** 벌어진다. 실루엣이 다르면 외접 폭도 다르므로
  //   꼴마다 **폭을 1.50r 로 맞춰** 넣는다. 크기는 등급이 아니라 **부피**를
  //   말해야 하고, 넷은 같은 등급이다.
  const nz = RK_IT_NORM[kind] || 1;
  c.scale(nz, nz);


  /// [pts] 를 **입체로** 쌓는다 — 옆면 → 몸 → 앞날 → 그늘 쪽 림.
  ///
  /// ⚠️⚠️ 평평한 실루엣 하나만 칠하면 **UI 아이콘**이 된다. 물건이 되려면
  ///   두께가 보여야 하고, 두께는 **광원 반대쪽으로 민 판 한 장**이다.
  /// ⭐ 그리고 어두운 배경에서는 **그늘 쪽 가장자리**가 얇게 빛난다(림라이트).
  const lay = (pts, w) => {
    // ① 옆면 — 광원 반대쪽으로 민다. 물건의 두께다.
    const dp = r * 0.12;
    fillPoly(c, pts.map(p => [p[0] - RK_LX * dp, p[1] - RK_LY * dp]),
      A(RK_IT_SIDE, 1));
    // ② 몸
    fillPoly(c, pts, A(RK_IT[1], 1));
    // ③ 앞날 — 광원 쪽으로 민 것을 몸 안에 클립
    c.save();
    c.beginPath();
    pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
    c.closePath();
    c.clip();
    fillPoly(c, pts.map(p => [p[0] + RK_LX * r * (w || 0.06),
      p[1] + RK_LY * r * (w || 0.06)]), A(RK_IT[2], 1));
    // ④ 접촉 그늘 — 아래쪽이 어둡다
    fillPoly(c, pts.map(p => [p[0] - RK_LX * r * 0.5, p[1] - RK_LY * r * 0.5]),
      A(RK_IT[0], 0.55));
    c.restore();
    // ⑤ 림 — 그늘 쪽 가장자리만 얇게
    c.strokeStyle = A(RK_IT[2], 0.35);
    c.lineWidth = Math.max(0.6, r * 0.02);
    c.beginPath();
    pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])));
    c.closePath();
    c.stroke();
  };

  if (kind === 'magnet') {
    // 말굽 — **입이 아래로.** 위로 열면 자석이 아니라 **컵**으로 읽힌다.
    //   ⚠️ 윤곽을 한 붓으로 그린다 — 바깥 활 → 오른 다리 → 안쪽 활 → 왼 다리.
    //     순서가 꼬이면 도형이 스스로를 가른다.
    c.rotate(0.18);
    const R = r * 0.52, W = r * 0.32;
    const Ro = R + W / 2, Ri = R - W / 2;
    const legY = r * 0.62, topY = -r * 0.1;
    const P = [];
    for (let i = 0; i <= 16; i++) {                 // 바깥 활 (왼→오른, 위로)
      const th = Math.PI - Math.PI * (i / 16);
      P.push([Math.cos(th) * Ro, topY - Math.sin(th) * Ro * 0.9]);
    }
    P.push([Ro, legY]);                              // 오른 다리 바깥
    P.push([Ri, legY]);                              // 오른 다리 안쪽
    for (let i = 0; i <= 16; i++) {                 // 안쪽 활 (오른→왼)
      const th = Math.PI * (i / 16);
      P.push([Math.cos(th) * Ri, topY - Math.sin(th) * Ri * 0.9]);
    }
    P.push([-Ri, legY]);                             // 왼 다리 안쪽
    P.push([-Ro, legY]);                             // 왼 다리 바깥
    lay(P, 0.05);
    // 극 — 두 다리 끝. **자석을 자석으로 만드는 것은 이 두 토막**이다.
    [-1, 1].forEach(sg => {
      const cx = sg * R;
      fillPoly(c, [[cx - W / 2, legY - r * 0.24], [cx + W / 2, legY - r * 0.24],
        [cx + W / 2, legY], [cx - W / 2, legY]], A(RK_IT[2], 1));
      fillPoly(c, [[cx - W / 2, legY - r * 0.24], [cx + W / 2, legY - r * 0.24],
        [cx + W / 2, legY - r * 0.19], [cx - W / 2, legY - r * 0.19]],
        A(RK_IT[0], 0.9));
    });
  } else if (kind === 'boot') {
    // 옆에서 본 부츠 — **가로로 길고 바닥이 평평하다.** 뒤축이 각졌다.
    const P = [
      [-r * 0.42, -r * 0.55], [-r * 0.1, -r * 0.55], [-r * 0.02, -r * 0.05],
      [r * 0.62, r * 0.12], [r * 0.72, r * 0.4], [-r * 0.42, r * 0.4],
    ];
    lay(P, 0.06);
    // 바닥 — 한 줄로 굵게. 신발을 신발로 만드는 것은 이 밑창이다.
    fillPoly(c, [[-r * 0.46, r * 0.4], [r * 0.76, r * 0.4],
      [r * 0.76, r * 0.58], [-r * 0.46, r * 0.58]], A(RK_IT[0], 1));
    fillPoly(c, [[-r * 0.46, r * 0.4], [r * 0.76, r * 0.4],
      [r * 0.76, r * 0.49], [-r * 0.46, r * 0.49]], A(RK_IT[2], 0.8));
  } else if (kind === 'scope') {
    // 망원경 — **↗ 사선 · 굵기가 거의 균일 · 렌즈 링 둘.**
    c.rotate(-0.62);
    const L = r * 1.3, W = r * 0.34;
    lay([[-L / 2, -W / 2], [L / 2, -W * 0.7], [L / 2, W * 0.7], [-L / 2, W / 2]], 0.05);
    [-0.14, 0.16].forEach(u => {
      const px = L * u;
      fillPoly(c, [[px, -W * 0.82], [px + r * 0.1, -W * 0.82],
        [px + r * 0.1, W * 0.82], [px, W * 0.82]], A(RK_IT[0], 1));
    });
    // 렌즈 — 앞쪽 끝에 밝은 원 하나. 「보는 것」이라는 표시다.
    c.fillStyle = A(RK_IT[2], 0.95);
    c.beginPath();
    c.ellipse(L / 2 - r * 0.04, 0, r * 0.05, W * 0.7, 0, 0, Math.PI * 2);
    c.fill();
  } else {
    // 확성기 — **↘ 사선 · 한쪽만 크게 벌어진다 · 손잡이.**
    c.rotate(0.5);
    const L = r * 1.15;
    lay([[-L * 0.5, -r * 0.16], [L * 0.42, -r * 0.62],
      [L * 0.42, r * 0.62], [-L * 0.5, r * 0.16]], 0.06);
    // 나팔 입 — 벌어진 쪽에 타원 테. 「퍼진다」가 여기서 읽힌다.
    c.strokeStyle = A(RK_IT[2], 0.9);
    c.lineWidth = Math.max(1.2, r * 0.07);
    c.beginPath();
    c.ellipse(L * 0.42, 0, r * 0.09, r * 0.62, 0, 0, Math.PI * 2);
    c.stroke();
    // 손잡이 — 망원경과 가르는 마지막 한 뼘
    fillPoly(c, [[-L * 0.5, -r * 0.1], [-L * 0.74, -r * 0.05],
      [-L * 0.74, r * 0.18], [-L * 0.5, r * 0.12]], A(RK_IT[0], 1));
  }
  c.restore();
}

/* ── 얼음운석 한 바퀴 — 깨면 아이템이 나온다 ──────────────────────────────
   운석 쪽(3-2)과 **같은 문법**이다 — 한 사건에서 나온 것은 같은 순간에
   출발하고 무게로만 갈라진다. 다만 나오는 것이 **하나**라 다르게 흐른다:

   | | 운석 | **얼음운석** |
   |---|---|---|
   | 나오는 것 | 강화석 **여럿** | 아이템 **하나** |
   | 채굴 중 | 때릴 때마다 확률로 하나씩 | **아무것도 안 나온다** |
   | 깨질 때 | 조각이 흩어져 떨어진다 | **하나가 솟았다 내려앉는다** |

   ⭐⭐ **무엇이 들었는지는 스폰 때 정해지고 깨기 전에 보인다**(사용자 판정
     2026-08-21 — 「깨기 전엔 모른다」를 이쪽으로 맞췄다). 창 너머로 물건이
     비치므로 「무엇을 하러 가나」를 지도에서 **미리 고른다** — 깨는 순간은
     서리빛이 걷히며 **보이던 것이 나온다**.

   ⚠️ 얼음이라 파편이 **다르다** — 돌은 뭉툭한 부스러기, 얼음은 **각진 판**이
     돌면서 흩어진다.                                                        */

/// 속 빛이 덮는 몫 — **앞면 면적의 비율.** 이 값 하나가 빛의 크기다.
/// ⚠️ 올리면 얼음 고유의 색이 먹혀 「누런 덩이」가 된다.
const RK_ICE_GLOW = 0.14;

const RK_IBOOM = 0.5;

/// 얼음운석 한 바퀴. [u] 0~1 위상 · [kind] 나오는 아이템.
function rkIceCycle(c, x, y, r, seed, u, kind, t) {
  const out = (k) => 1 - (1 - k) * (1 - k) * (1 - k);
  const env = (k, atk) => k < atk ? k / atk : Math.max(0, 1 - (k - atk) / (1 - atk));
  const B = RK_IBOOM;
  const bk = u - B;
  const px = x - r * 3.0, py = y + r * 1.5;
  const th = Math.atan2(py - y, px - x);

  // ── 채굴 ──────────────────────────────────────────────────────────
  if (u < B) {
    const app = Math.min(1, u / 0.06);
    const beat = u > 0.08 ? Math.min(1, (u - 0.08) / (B - 0.08)) : 0;
    const near = Math.max(0, (u - (B - 0.10)) / 0.10);
    const amp = r * (0.01 * beat + 0.075 * near * near);
    c.save();
    c.globalAlpha = app;
    c.translate(x + Math.sin(u * 300) * amp, y + Math.cos(u * 411) * amp * 0.7);
    c.rotate(Math.sin(u * 257) * 0.05 * near);
    // ⭐ 속의 물건이 창 너머로 보이고, 온기가 **때릴수록 세진다** —
    //   「곧 나온다」가 빛으로 읽힌다.
    rkIceRock(c, 0, 0, r, seed, t + beat * 1.4,
      (cc, ix, iy, ir) => rkItem(cc, ix, iy, ir, kind, t));
    c.restore();

    if (u > 0.08) {
      c.save();
      c.globalCompositeOperation = 'lighter';
      for (const [w, al] of [[5, 0.12], [2.4, 0.3], [1, 0.8]]) {
        c.strokeStyle = A('#5FD9FF', al);
        c.lineWidth = w;
        c.beginPath();
        c.moveTo(px, py);
        c.lineTo(x - Math.cos(th) * 0 + Math.cos(th) * r * 0.9,
          y + Math.sin(th) * r * 0.9);
        c.stroke();
      }
      c.restore();
      rkImpact(c, x + Math.cos(th) * r * 0.9, y + Math.sin(th) * r * 0.9,
        Math.cos(th), Math.sin(th), Math.max(3, r * 0.09), 'frost', t, seed);
    }
  }

  // ── 터짐 — 빛 ─────────────────────────────────────────────────────
  //   ⭐ 얼음은 **찬 빛**이다. 돌의 속성색과 달리 여기선 서리빛 + 황금이 섞인다.
  if (bk > 0.007 && bk < 0.16) {
    const k = (bk - 0.007) / 0.15;
    c.save();
    c.globalCompositeOperation = 'lighter';
    if (k < 0.3) {
      const fk = env(k / 0.3, 0.22);
      const rr = r * (0.3 + 0.8 * (k / 0.3));
      const g = c.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0, A('#FFFFFF', fk * 0.9));
      g.addColorStop(0.4, A('#FFE0A8', fk * 0.6));
      g.addColorStop(1, A('#8FCFE4', 0));
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, rr, 0, Math.PI * 2);
      c.fill();
    }
    const lean = hash(seed * 17.7) * Math.PI * 2;
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2 + hash(seed * 3.1 + i) * 0.9;
      const bias = 0.35 + 0.9 * Math.max(0, Math.cos(a0 - lean));
      const L = r * (0.5 + 2.0 * hash(seed * 5.7 + i)) * bias;
      const kk = Math.min(1, k / 0.42);
      const ev = env(kk, 0.12);
      const inn = r * 0.2 + L * out(kk) * 0.5;
      const o2 = inn + L * (1 - kk) * 0.9;
      if (o2 <= inn) continue;
      const cx0 = Math.cos(a0), sy0 = Math.sin(a0);
      const gg = c.createLinearGradient(x + cx0 * inn, y + sy0 * inn,
        x + cx0 * o2, y + sy0 * o2);
      gg.addColorStop(0, A('#FFFFFF', ev * ev * 0.55));
      gg.addColorStop(0.3, A('#BFE6F5', ev * ev * 0.34));
      gg.addColorStop(1, A('#8FCFE4', 0));
      c.strokeStyle = gg;
      c.lineWidth = Math.max(0.5, r * 0.055 * ev * ev);
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(x + cx0 * inn, y + sy0 * inn);
      c.lineTo(x + cx0 * o2, y + sy0 * o2);
      c.stroke();
    }
    c.restore();
  }

  // ── 터짐 — 얼음 판 ────────────────────────────────────────────────
  //   ⚠️ 돌의 부스러기와 다르다 — **각진 판**이 돌면서 흩어지고, 반투명하다.
  if (bk > 0 && bk < 0.24) {
    const k = bk / 0.24;
    for (let i = 0; i < 11; i++) {
      const a0 = hash(seed * 5.1 + i * 2.7) * Math.PI * 2;
      const d0 = r * (0.3 + 0.45 * hash(seed * 19.3 + i));
      const d = d0 + (r * (1.0 + 1.4 * hash(seed * 7.7 + i)) - d0) * out(k);
      const fr = r * (0.14 + 0.13 * hash(seed * 9.3 + i)) * (1 - k * 0.5);
      c.save();
      c.globalAlpha = Math.max(0, 1 - k * 1.15) * 0.9;
      c.translate(x + Math.cos(a0) * d, y + Math.sin(a0) * d * 0.8);
      c.rotate(a0 + k * 7);
      c.scale(1, 0.5 + 0.5 * Math.abs(Math.cos(a0 + k * 7)));   // 판이라 납작해진다
      fillPoly(c, jagPoly(0, 0, fr, 5, seed + i * 3.1, 1.1, 0.94), A('#20586F', 1));
      fillPoly(c, jagPoly(-RK_LX * fr * 0.3, -RK_LY * fr * 0.3, fr * 0.55, 5,
        seed + i * 3.1, 1.1, 0.94), A('#B4E0EE', 1));
      c.restore();
    }
  }

  // ── 아이템 — **하나가 솟았다 내려앉는다** ─────────────────────────
  //   ⭐ **보이던 것이 나온다** — 터진 자리에서 흰빛이 걷히면 창 너머로
  //     비치던 그 물건이다.
  if (bk > 0) {
    const toss = Math.min(1, bk / 0.22);
    const hop = (p) => p < 0.66 ? Math.sin((p / 0.66) * Math.PI) * r * 0.85
      : (p < 0.88 ? Math.sin(((p - 0.66) / 0.22) * Math.PI) * r * 0.2 : 0);
    const land = toss > 0.66 && toss < 0.74;
    const bx = x + r * 0.35 * out(toss);
    let by = y + r * 0.2 * out(toss) - hop(toss);
    if (toss >= 0.88) by += Math.sin(t * 0.8) * 3;
    let al = 1;
    let pull = 0;
    if (u > 0.86) {
      const q = Math.min(1, (u - 0.86) / 0.12);
      pull = q * q * q;
      al = 1 - q * q;
    }
    const fx = bx + (px - bx) * pull, fy = by + (py - by) * pull;
    if (land) {
      for (let d2 = 0; d2 < 3; d2++) {
        fillPoly(c, puffPoly(fx + (d2 - 1) * r * 0.22, fy + r * 0.32, r * 0.14, 5,
          seed + d2, 0.8), A('#4A4352', 0.4));
      }
    }
    c.save();
    c.globalAlpha = al;
    rkDropItem(c, fx, fy, r * 0.62, seed * 2.1 + 5, t,
      (cc, ix, iy, ir) => rkItem(cc, ix, iy, ir, kind, t));
    // 드러나는 순간 — 흰빛이 물건 위에서 걷힌다
    if (toss < 0.35) {
      const fk = 1 - toss / 0.35;
      c.save();
      c.globalCompositeOperation = 'lighter';
      const g = c.createRadialGradient(fx, fy, 0, fx, fy, r * 0.8);
      g.addColorStop(0, A('#FFFFFF', 0.75 * fk));
      g.addColorStop(1, A('#FFD27A', 0));
      c.fillStyle = g;
      c.beginPath();
      c.arc(fx, fy, r * 0.8, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
    c.restore();
  }
}

/// 1-3-2 얼음운석 — 깨기 전에 보인다 · 깨면 그것이 나온다
function rkIcePanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const CYCLE = 4.6;
  const col = W / 4;
  RK_ITEM.forEach(([k, nm, fx], i) => {
    const cx = col * (i + 0.5);
    const u = ((t + i * 1.15) % CYCLE) / CYCLE;
    rkIceCycle(c, cx, H * 0.4, 30, i * 6.1 + 3, u, k, t);
    // 효과 이름이 물건 이름과 같은 것(자석)은 한 번만 적는다 — RK_ITEM 머리.
    rkLabel(c, fx ? nm + ' · ' + fx : nm, cx, H - 42, '#E8E8F0');
    const bw = col * 0.6, bx = cx - bw / 2, by = H - 22;
    c.strokeStyle = 'rgba(180,180,200,.16)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(bx, by);
    c.lineTo(bx + bw, by);
    c.stroke();
    c.strokeStyle = 'rgba(180,180,200,.3)';
    c.beginPath();
    c.moveTo(bx + bw * RK_IBOOM, by - 4);
    c.lineTo(bx + bw * RK_IBOOM, by + 4);
    c.stroke();
    c.fillStyle = A('#E8C879', 0.9);
    c.beginPath();
    c.arc(bx + bw * u, by, 2.6, 0, Math.PI * 2);
    c.fill();
  });
  rkLabel(c, '무엇이 들었는지 깨기 전에 창으로 보인다 — 스폰에 정해지고, 깨면 그것이 나온다',
    W / 2, H - 6, '#5A5A68');
}

/* ── 채굴 한 바퀴 — 때리고 · 터지고 · 줍는다 ──────────────────────────────
   ⚠️⚠️ **한 사건에서 나온 것은 같은 순간에 출발한다.** 층마다 시작 시각과
     가속을 따로 잡으면 「빛이 먼저 나고 운석이 사라진다」 · 「터지고 나서
     조각이 튄다」로 **순서가 어긋나 보인다.** 각각은 맞는데 서로 안 맞는 것이다.

   ⭐ 그래서 폭발은 **한 순간**(`BOOM`)이고, 거기서 나온 셋은 **같은 감속 곡선**
     (`out`)을 나눠 가진 뒤 **무게에 따라** 갈라진다:

   | 층 | 무게 | 거리 | 수명 |
   |---|---|---|---|
   | **빛** | 0 | 제일 멀리 | **제일 짧다** |
   | **파편** | 가볍다 | 중간 | 중간 |
   | **조각**(재화) | 무겁다 | **제일 가깝다** | 길다 — 떨어져 **남는다** |

   ⭐ 「채굴하는 맛」의 손잡이 넷:
     · **누적** — 때릴수록 금이 늘고 밝아진다. 「거의 다 됐다」가 보인다
     · **반동** — 맞을 때마다 몸이 밀렸다 돌아온다
     · **임박** — 터지기 직전 떨림이 급히 커진다
     · **되돌아오는 맛** — 조각이 떨어져 머물다 **하나씩** 끌려온다

   ⚠️ 루프가 이어져야 한다 — 마지막 마디에서 조각이 다 사라지므로 `u=1` 과
     `u=0` 이 같은 그림이다.                                                */

/// 본체의 **맞는 자리** — 방향 [th] 로 쏜 빔이 닿는 표면 점.
///
/// ⭐ 다면체는 볼록에 가까우므로 **지지점**(그 방향으로 제일 먼 정점)이 곧
///   실루엣 위의 점이다. 중심에서 반지름만큼 나간 자리로 잡으면 울퉁불퉁한
///   테에서 뜬다 — 골에 맞으면 몸 안에서, 마루에 맞으면 허공에서 터진다.
function rkStoneHit(x, y, r, seed, t, th) {
  const FM = rkStoneForm(seed);
  const tx = 0.30 + 0.55 * hash(seed * 11.3);
  const tz = -0.55 + 1.10 * hash(seed * 13.7);
  const { V } = rkSolidFaces(r * FM.sz, seed, t * 0.22 + seed, tx, tz, FM);
  const dx = Math.cos(th), dy = Math.sin(th);
  let best = 0;
  V.forEach(p => {
    const d = p[0] * dx + p[1] * dy;
    if (d > best) best = d;
  });
  return [x + dx * best, y + dy * best];
}

/// 터지는 순간 · 채굴 중 조각이 나오는 때. 한 바퀴 안의 위상이다.
const RK_BOOM = 0.52;
const RK_TICK = [0.14, 0.26, 0.36, 0.45];

/// 한 바퀴를 그린다. [u] 는 0~1 위상.
function rkBreakCycle(c, x, y, r, seed, u, key, t) {
  const T = rkTone(key);
  /// 튄 것의 감속 — 처음 빠르고 뒤로 갈수록 느리다. **파편과 조각이 같이 쓴다.**
  const out = (k) => 1 - (1 - k) * (1 - k) * (1 - k);
  /// 빛의 포락선 — 짧게 솟았다가 길게 준다. 최대치에서 시작하면 「팍」 하고 끊긴다.
  const env = (k, atk) => k < atk ? k / atk : Math.max(0, 1 - (k - atk) / (1 - atk));

  const BOOM = RK_BOOM;
  const bk = (u - BOOM);                       // 터진 뒤 흐른 위상
  const px = x - r * 3.0, py = y + r * 1.5;    // 플레이어 자리
  const th = Math.atan2(py - y, px - x);       // 빔이 오는 방향

  // ── 채굴 ──────────────────────────────────────────────────────────
  if (u < BOOM) {
    const app = Math.min(1, u / 0.06);
    const beat = u > 0.08 ? Math.min(1, (u - 0.08) / (BOOM - 0.08)) : 0;

    // ⭐ **반동** — 맞을 때마다 몸이 빔 **반대쪽으로** 밀렸다 돌아온다.
    //   ⚠️ 되돌아오는 길을 두 단계로 쪼개면 스냅으로 보인다 — **한 번에** 준다.
    let kick = 0;
    for (const ti of RK_TICK) {
      const dt = (u - ti) / 0.055;
      if (dt >= 0 && dt < 1) kick = Math.max(kick, (1 - dt) * (1 - dt));
    }
    // ⭐ **임박** — 마지막 구간에서 떨림이 급히 커진다. 없으면 깨짐이 갑자기 온다.
    const near = Math.max(0, (u - (BOOM - 0.10)) / 0.10);
    const amp = r * (0.01 * beat + 0.075 * near * near);

    c.save();
    c.globalAlpha = app;
    c.translate(x + Math.sin(u * 300) * amp - Math.cos(th) * r * 0.06 * kick,
      y + Math.cos(u * 411) * amp * 0.7 - Math.sin(th) * r * 0.06 * kick);
    c.rotate(Math.sin(u * 257) * 0.05 * near);
    rkStone(c, 0, 0, r, seed, t, key, false);

    // ⭐ **누적** — 금이 늘고 밝아진다. 부서질 자리를 미리 알려 준다.
    if (beat > 0) {
      c.save();
      c.globalCompositeOperation = 'lighter';
      const nc = 1 + Math.floor(beat * 5);
      for (let i = 0; i < nc; i++) {
        const a0 = hash(seed * 3.7 + i * 5.1) * Math.PI * 2;
        const pts = [[0, 0]];
        let qx = 0, qy = 0;
        for (let k = 1; k <= 3; k++) {
          const ang = a0 + (hash(seed * 7.1 + i + k) - 0.5) * 1.6;
          qx += Math.cos(ang) * r * 0.3;
          qy += Math.sin(ang) * r * 0.28;
          pts.push([qx, qy]);
        }
        celStroke(c, pts, Math.max(1, r * 0.05), key,
          (0.2 + 0.5 * beat) * (0.7 + 0.3 * kick));
      }
      c.restore();
    }
    c.restore();

    // ── 빔 — **대상이 있는 동안만.** 터진 뒤에도 쏘면 허공을 쏜다.
    if (u > 0.08) {
      const [hx, hy] = rkStoneHit(x, y, r, seed, t, th);
      c.save();
      c.globalCompositeOperation = 'lighter';
      for (const [w, al] of [[5, 0.12], [2.4, 0.3], [1, 0.8]]) {
        c.strokeStyle = A('#5FD9FF', al);
        c.lineWidth = w;
        c.beginPath();
        c.moveTo(px, py);
        c.lineTo(hx, hy);
        c.stroke();
      }
      c.restore();
      const nl = Math.hypot(hx - x, hy - y) || 1;
      rkImpact(c, hx, hy, (hx - x) / nl, (hy - y) / nl, Math.max(3, r * 0.09),
        'frost', t, seed);
    }
  }

  // ── 터짐 — 빛 ─────────────────────────────────────────────────────
  //   ⭐ 파편보다 **두어 프레임 늦다** — 몸이 조각나고 **그래서** 빛이 샌다.
  const LAG = 0.007;
  if (bk > LAG && bk < LAG + 0.15) {
    const k = (bk - LAG) / 0.15;
    c.save();
    c.globalCompositeOperation = 'lighter';

    // 코어 — 짧게 솟았다 준다
    if (k < 0.3) {
      const fk = env(k / 0.3, 0.22);
      const rr = r * (0.3 + 0.7 * (k / 0.3));
      const g = c.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0, A('#FFFFFF', fk * 0.85));
      g.addColorStop(0.45, A(T[2], fk * 0.7));
      g.addColorStop(1, A(T[1], 0));
      c.fillStyle = g;
      c.beginPath();
      c.arc(x, y, rr, 0, Math.PI * 2);
      c.fill();
    }

    // 빛살 — **적고 · 길이 차가 크고 · 한쪽으로 치우친다.**
    //   ⚠️ 고르게 방사하면 **폭죽**이고, 오래 머물면 「선이 그려졌다 지워진다」다.
    const lean = hash(seed * 17.7) * Math.PI * 2;
    for (let i = 0; i < 6; i++) {
      const a0 = (i / 6) * Math.PI * 2 + hash(seed * 3.1 + i) * 0.9;
      const bias = 0.35 + 0.9 * Math.max(0, Math.cos(a0 - lean));
      const L = r * (0.45 + 2.1 * hash(seed * 5.7 + i)) * bias;
      const kk = Math.min(1, k / 0.42);
      const ev = env(kk, 0.12);
      const inn = r * 0.2 + L * out(kk) * 0.5;
      const o2 = inn + L * (1 - kk) * 0.9;
      if (o2 <= inn) continue;
      const cx0 = Math.cos(a0), sy0 = Math.sin(a0);
      const gg = c.createLinearGradient(x + cx0 * inn, y + sy0 * inn,
        x + cx0 * o2, y + sy0 * o2);
      gg.addColorStop(0, A('#FFFFFF', ev * ev * 0.55));
      gg.addColorStop(0.3, A(T[2], ev * ev * 0.34));
      gg.addColorStop(1, A(T[1], 0));
      c.strokeStyle = gg;
      c.lineWidth = Math.max(0.5, r * 0.055 * ev * ev);
      c.lineCap = 'round';
      c.beginPath();
      c.moveTo(x + cx0 * inn, y + sy0 * inn);
      c.lineTo(x + cx0 * o2, y + sy0 * o2);
      c.stroke();
    }

    // 스파크 — 알갱이. 제일 멀리 가고 **중력으로 끝이 처진다.**
    for (let i = 0; i < 16; i++) {
      const a0 = hash(seed * 11.1 + i * 3.7) * Math.PI * 2;
      const kk = Math.min(1, k / 0.6);
      const dd = r * (0.9 + 1.8 * hash(seed * 13.3 + i)) * out(kk);
      const sz = Math.max(0.7, r * 0.06 * (1 - kk));
      c.fillStyle = A(i % 3 ? T[2] : '#FFFFFF', env(kk, 0.1) * 0.75);
      c.beginPath();
      c.arc(x + Math.cos(a0) * dd, y + Math.sin(a0) * dd * 0.85 + r * 0.5 * kk * kk,
        sz, 0, Math.PI * 2);
      c.fill();
    }

    // 잔광 — 넓고 옅게, 천천히 식는다. 사건이 있었다는 자국.
    const ag = c.createRadialGradient(x, y, 0, x, y, r * (1.1 + k * 0.9));
    ag.addColorStop(0, A(T[1], env(k, 0.14) * 0.1));
    ag.addColorStop(1, A(T[1], 0));
    c.fillStyle = ag;
    c.beginPath();
    c.arc(x, y, r * (1.1 + k * 0.9), 0, Math.PI * 2);
    c.fill();
    c.restore();
  }

  // ── 터짐 — 파편 ───────────────────────────────────────────────────
  //   ⭐ **몸의 실루엣에서 출발한다.** 한 점에서 솟으면 「터졌다」가 아니라
  //     「생겼다」가 되고, 몸이 사라진 자리가 빈다.
  if (bk > 0 && bk < 0.22) {
    const k = bk / 0.22;
    for (let i = 0; i < 13; i++) {
      const a0 = hash(seed * 5.1 + i * 2.7) * Math.PI * 2;
      const d0 = r * (0.3 + 0.45 * hash(seed * 19.3 + i));
      const d = d0 + (r * (1.0 + 1.4 * hash(seed * 7.7 + i)) - d0) * out(k);
      const fr = r * (0.13 + 0.12 * hash(seed * 9.3 + i)) * (1 - k * 0.55);
      c.save();
      c.globalAlpha = Math.max(0, 1 - k * 1.15);
      c.translate(x + Math.cos(a0) * d, y + Math.sin(a0) * d * 0.8);
      c.rotate(a0 + k * 7);
      fillPoly(c, jagPoly(0, 0, fr, 6, seed + i * 3.1, 0.9, 0.94), A('#3A3342', 1));
      fillPoly(c, jagPoly(-RK_LX * fr * 0.3, -RK_LY * fr * 0.3, fr * 0.6, 6,
        seed + i * 3.1, 0.9, 0.94), A('#6E6478', 1));
      c.restore();
    }
  }

  // ── 조각(재화) ────────────────────────────────────────────────────
  //   ⭐⭐ **채굴 중엔 맞는 자리에서, 터질 땐 파편과 같은 순간에.**
  //     다 부순 뒤 한꺼번에 쏟으면 캐는 동안 아무 일도 안 일어나 채굴이
  //     「기다리기」가 되고, 터진 **뒤에** 나오면 폭발과 따로 논다.
  //   ⭐ 무거우니 파편보다 **덜 멀리** 가고, 떨어져 **남는다.**
  for (let i = 0; i < 5; i++) {
    const tick = i < RK_TICK.length;
    const su = tick ? RK_TICK[i] : BOOM;
    if (u < su) continue;
    // ⚠️ **채굴 중 조각은 맞은 쪽으로 튄다.** 사방으로 흩으면 맞는 자리에서
    //   나온 뜻이 사라지고, 중심으로 끌면 **한자리에 뭉친다.**
    const a0 = tick
      ? th + (hash(seed * 11.3 + i * 4.1) - 0.5) * 1.7
      : hash(seed * 11.3 + i * 4.1) * Math.PI * 2;
    const rest = r * (tick ? 0.9 + 0.7 * hash(seed * 13.7 + i)
                           : 0.62 * (1.0 + 0.5 * hash(seed * 13.7 + i)));
    const toss = Math.min(1, (u - su) / 0.16);

    // 나오는 자리 — 채굴 중엔 **빔이 맞은 점**, 터질 땐 몸의 실루엣.
    let sx0 = x, sy0 = y;
    if (tick) {
      const [hx, hy] = rkStoneHit(x, y, r, seed, su * 0 + t, th);
      sx0 = hx;
      sy0 = hy;
    }
    // ⭐ **튀어올라 툭 떨어진다.** 곧장 미끄러지면 「놓인 것」이다.
    const hop = (p) => p < 0.62 ? Math.sin((p / 0.62) * Math.PI) * r * 0.8
      : (p < 0.86 ? Math.sin(((p - 0.62) / 0.24) * Math.PI) * r * 0.22 : 0);
    const land = toss > 0.62 && toss < 0.70;
    const d = rest * out(toss);
    let bx = sx0 + Math.cos(a0) * d;
    let by = sy0 + Math.sin(a0) * d * 0.72 - hop(toss);
    if (toss >= 0.86) {
      bx += Math.sin(t * 0.7 + i * 1.9) * 3;
      by += Math.sin(t * 0.9 + i * 2.7) * 3;
    }

    // ⭐ **하나씩 차례로** 끌려간다 — 다섯이 한 몸처럼 가면 기계 같다.
    let al = 1;
    // ⚠️ **루프 이음매** — 마지막 조각까지 `u=1` 전에 사라져야 한다.
    //   0.86+4·0.022 에 창 0.10 을 더하면 1.048 이라 **한 바퀴를 넘어**
    //   이음매에서 조각이 튀어 보인다.
    const pullAt = 0.80 + i * 0.022;
    if (u > pullAt) {
      const q = Math.min(1, (u - pullAt) / 0.10);
      const pull = q * q * q;
      bx += (px - bx) * pull;
      by += (py - by) * pull;
      al = 1 - q * q;
    }
    // 튀어나오는 순간의 작은 섬광 — 「지금 하나 걸렸다」
    if (toss < 0.3) {
      c.save();
      c.globalCompositeOperation = 'lighter';
      const fk = 1 - toss / 0.3;
      const g = c.createRadialGradient(bx, by, 0, bx, by, r * 0.6 * fk);
      g.addColorStop(0, A('#FFFFFF', 0.45 * fk));
      g.addColorStop(1, A(T[1], 0));
      c.fillStyle = g;
      c.beginPath();
      c.arc(bx, by, r * 0.6 * fk, 0, Math.PI * 2);
      c.fill();
      c.restore();
    }
    // 툭 — 닿는 순간 먼지가 얕게 인다
    if (land) {
      for (let d2 = 0; d2 < 3; d2++) {
        fillPoly(c, puffPoly(bx + (d2 - 1) * r * 0.22, by + r * 0.3, r * 0.14, 5,
          seed + i * 3.7 + d2, 0.8), A('#4A4352', 0.4));
      }
    }
    c.save();
    c.globalAlpha = al;
    rkOre(c, bx, by, r * 0.48, i * 4.3 + 1 + seed, t + i * 0.8, 'crit', false,
      i === 0 ? 'unique' : (i < 3 ? key : RK_PLAIN));
    c.restore();
  }
}

/// 3-2 채굴 한 바퀴 — 때리고 · 터지고 · 줍는다
function rkBreakPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const CYCLE = 4.6;
  const u = (t % CYCLE) / CYCLE;
  rkBreakCycle(c, W * 0.5, H * 0.44, 46, 2, u, 'ember', t);

  // 위상 자 — 어느 마디인지 보이게
  const MARK = [['빔', 0.08], ['드롭', RK_TICK[0]], ['드롭', RK_TICK[1]],
                ['드롭', RK_TICK[2]], ['드롭', RK_TICK[3]], ['터짐', RK_BOOM],
                ['끌려감', 0.86]];
  const bw = W * 0.62, bx = W * 0.19, by = H - 30;
  c.strokeStyle = 'rgba(180,180,200,.18)';
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(bx, by);
  c.lineTo(bx + bw, by);
  c.stroke();
  MARK.forEach(([nm, p]) => {
    c.strokeStyle = 'rgba(180,180,200,.28)';
    c.beginPath();
    c.moveTo(bx + bw * p, by - 4);
    c.lineTo(bx + bw * p, by + 4);
    c.stroke();
    rkLabel(c, nm, bx + bw * p, by + 16, '#5A5A68');
  });
  c.fillStyle = A('#E8C879', 0.9);
  c.beginPath();
  c.arc(bx + bw * u, by, 3.2, 0, Math.PI * 2);
  c.fill();
  rkLabel(c, '한 사건에서 나온 것은 같은 순간에 출발한다 — 갈라지는 것은 거리와 수명뿐',
    W / 2, H - 8, '#5A5A68');
}

/* ── 크기 넷 × 운석 넷 — 맵에 뿌릴 실물 ────────────────────────────────
   ⭐ **크기는 곧 HP다** — 「얼마나 오래 캐야 하나」를 크기가
     말한다. 그래서 일반↔희귀를 크기로 가르지 않고 **광맥의 굵기·개수**로 가른다.

   ⚠️ 크기가 커지면 **잔 것이 상대적으로 작아 보인다.** 구멍·광맥은 반지름
     비례라 저절로 따라오지만, **혹**은 정점 자체를 잡아 빼는 것이라 큰 덩이일수록
     실루엣이 더 크게 울퉁불퉁해진다 — 그게 「덩치가 있다」로 읽힌다.        */

/// 크기 다섯 — 이름 · 반지름 · 꼴. 랜드마크 둘만 기암 꼴을 쓴다.
/// ⚠️ 반지름은 **서로의 비율**이 뜻이다(크기 = HP) — 칸에 맞춰 통째로 곱하되
///   비율은 안 건드린다.
const RK_SIZE = [
  ['특거대형', 86, RK_CRAG_FORM],
  ['거대형 · 기암', 59, RK_CRAG_FORM],
  ['대형', 38, null],
  ['중형', 25, null],
  ['소형', 16, null],
];

/* ── 등급 셋 — 일반 · 색 · 유니크 ────────────────────────────────────────
   | 캔 운석 | 나오는 강화석 | 확률 | 쓰임 |
   |---|---|---|---|
   | **일반 운석**(색이 없다) | 일반 | **보통** | 능력치 **Lv1~20** |
   | 〃 | 색 | **10% 미만** | — |
   | 〃 | **유니크**(황금) | **0.1% 미만** | — |
   | **색 운석**(넷) | 같은 색 | **보통** | 능력치 **Lv21~99** |
   | 〃 | **유니크**(황금) | **5% 미만** | **Lv71~99** — 색과 **결합**해야 쓰인다 |

   ⭐⭐ **등급이 레벨 구간을 나눈다** — 무엇을 캐야 하는지가 화면에 보인다.
   ⭐ 그래서 **색이 등급을 겸한다:**
     · 무채(회백) = 일반 — 어디에나 있다
     · 색(주황·보라·강철·황록) = 희귀 — 무엇을 올릴지 고르는 자리
     · 황금 = 유니크 — **재화로만** 있고 운석으로는 없다                     */

/// 일반 운석의 톤 — 저장소의 `gold` 는 **이름과 달리 회백**이다.
/// ⭐ 이 게임의 「빛」은 색이 없는 것이라야, 속성을 먹는 것이 「빛이 색을
///   입는다」로 읽힌다(`vfx.js` 무속성 정의).
const RK_PLAIN = 'gold';

/// 유니크 재화 — **황금빛.** 운석으로는 없고 색 운석에서 아주 드물게 나온다.
const RK_UNIQUE = RK_TONE_EXTRA.unique;

/// 1-1 등급 — 무채 · 색 · 황금. **한 등급에 하나씩만** 그린다.
///
/// ⚠️ 크기 축은 1-2, 색 넷의 몸은 2(균열) 가 정본이다 — 여기서 또 그리면
///   같은 운석이 한 장에 세 번 나온다.
function rkGradePanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const third = W / 3;

  // 일반 — 색이 없다.
  rkStone(c, third * 0.5, H * 0.40, 58, 9, t, RK_PLAIN, false);
  rkLabel(c, '일반 운석 — 색이 없다', third * 0.5, H * 0.40 + 92, '#E8E8F0');
  rkLabel(c, '일반 강화석(Lv1~20) 보통 · 색 재화 10% 미만 · 유니크 0.1% 미만',
    third * 0.5, H * 0.40 + 108, '#6A6A78');

  // 희귀 — 색. 넷 중 **대표 하나**만.
  rkStone(c, third * 1.5, H * 0.40, 58, 2, t + 1.3, RK_KIND[0].tone, true);
  rkLabel(c, '색 운석 — 색이 있다(넷 · 몸은 2)', third * 1.5, H * 0.40 + 92, '#E8C879');
  rkLabel(c, '같은 색 강화석(Lv21~99) 보통 · 유니크 5% 미만',
    third * 1.5, H * 0.40 + 108, '#6A6A78');

  // 유니크 — **장면으로** 보여 준다. 재화는 **운석 곁에** 있어야 「저기서
  //   나온 것」으로 읽힌다.
  // ⭐ **재화는 「조각」이다** — 깨서 나온 것은 작은 운석이고, 등급은 **색**이
  //   말한다(무채 = 일반 · 색 = 희귀 · 황금 = 유니크).
  // ⚠️⚠️ **궤도를 돌면 안 된다** — 운석이 사라지면 돌 기준이 없어진다.
  //   조각은 **떨어진 자리**에 있고 거기서 **제자리로만** 흔들린다.
  const ux = third * 2.5;
  rkStone(c, ux, H * 0.36, 40, 21, t, RK_KIND[1].tone, true);
  rkLabel(c, '유니크 — 황금', ux, H * 0.40 + 92, '#E8C879');
  rkLabel(c, '재화로만 있다 — 운석으로는 안 뜬다',
    ux, H * 0.40 + 108, '#6A6A78');
  const GRADE = ['gold', RK_KIND[1].tone, 'unique'];
  for (let i = 0; i < 6; i++) {
    // 떨어진 자리 — 씨앗이 정하고 **안 움직인다.**
    const a0 = hash(i * 3.1) * Math.PI * 2;
    const d0 = 56 + 24 * hash(i * 5.7);
    const dx = ux + Math.cos(a0) * d0;
    const dy = H * 0.36 + Math.sin(a0) * d0 * 0.46;
    // 제자리 부유 — 아주 작게, 주기가 서로 다르게(같이 흔들리면 한 덩어리로 보인다)
    const bx = Math.sin(t * 0.7 + i * 1.9) * 3;
    const by = Math.sin(t * 0.9 + i * 2.7) * 3;
    rkOre(c, dx + bx, dy + by, 9 + 3 * hash(i * 7.3), i * 4.3 + 1,
      t + i * 0.8, 'crit', false, GRADE[i % 3]);
  }
  [1, 2].forEach(i => {
    c.strokeStyle = 'rgba(180,180,200,.12)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(third * i, 16);
    c.lineTo(third * i, H - 16);
    c.stroke();
  });
  rkLabel(c, '색이 있다 = 희귀 — 색은 「무엇을 올리나」와 「등급」을 겸한다',
    W / 2, H - 10, '#5A5A68');
}

/// 2-1 강화석 셋 — 일반(무채) · 색(넷) · 유니크(황금)
///
/// ⭐ 셋 다 **조각**이다 — 깨서 나온 것은 작은 운석이고, **등급은 색**이 말한다.
///   운석은 빛을 **받고** 재화는 빛을 **낸다**(후광이 있다).
function rkStonesPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const third = W / 3;

  const bob = (i) => Math.sin(t * 0.7 + i * 1.9) * 3;
  const bly = (i) => Math.sin(t * 0.9 + i * 2.7) * 3;

  // 일반 — 무채 하나
  rkOre(c, third * 0.5 + bob(0), H * 0.42 + bly(0), 21, 1, t, 'crit', false,
    RK_PLAIN);
  rkLabel(c, '일반 강화석', third * 0.5, H * 0.42 + 44, '#E8E8F0');
  rkLabel(c, '무채 · 능력치 Lv1~20', third * 0.5, H * 0.42 + 60, '#6A6A78');

  // 색 — 넷
  RK_KIND.forEach((K, i) => {
    const x = third * 1.5 + (i - 1.5) * 48;
    rkOre(c, x + bob(i + 1), H * 0.42 + bly(i + 1), 18, i * 4.3 + 2, t + i * 0.8,
      'crit', false, K.tone);
    rkLabel(c, K.nm, x, H * 0.42 + 34, '#8A8A98');
  });
  rkLabel(c, '색 강화석 넷', third * 1.5, H * 0.42 + 60, '#E8E8F0');
  rkLabel(c, '운석과 같은 색 · 능력치 Lv21~99', third * 1.5, H * 0.42 + 76, '#6A6A78');

  // 유니크 — 황금
  rkOre(c, third * 2.5 + bob(6), H * 0.42 + bly(6), 21, 9, t, 'crit', false,
    'unique');
  rkLabel(c, '유니크 강화석', third * 2.5, H * 0.42 + 44, '#FFC64A');
  rkLabel(c, '황금 · Lv71~99 는 색과 결합', third * 2.5, H * 0.42 + 60, '#6A6A78');

  [1, 2].forEach(i => {
    c.strokeStyle = 'rgba(180,180,200,.12)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(third * i, 16);
    c.lineTo(third * i, H - 16);
    c.stroke();
  });
  rkLabel(c, '셋 다 조각이다 — 등급은 색이 말한다 · 운석은 빛을 받고 재화는 빛을 낸다',
    W / 2, H - 10, '#5A5A68');
}

/// 유니크 재화 한 알 — **황금빛.** 재화는 빛을 **낸다**(운석은 받는다).
function rkUniqueDrop(c, x, y, r, seed, t) {
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.1 + seed);
  c.save();
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(x, y, 0, x, y, r * 2.4);
  g.addColorStop(0, A(RK_UNIQUE[1], 0.24 + 0.1 * pulse));
  g.addColorStop(1, A(RK_UNIQUE[1], 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(x, y, r * 2.4, 0, Math.PI * 2);
  c.fill();
  c.restore();
  // ⚠️ **관이 넓으면 치즈가 된다**. 관 넷은
  //   윗면이 평평해 「자른 조각」으로 읽힌다. 재화는 **결정 조각**이라야 하므로
  //   **여섯 면 쌍뿔** — 허리가 좁고 위아래로 뾰족하다.
  const rot = t * 0.6 + seed;
  const rim = [];
  for (let i = 0; i < 6; i++) {
    const a = rot + (i / 6) * Math.PI * 2;
    rim.push([x + Math.cos(a) * r * 0.62, y + Math.sin(a) * r * 0.26, a]);
  }
  const apex = [x, y - r * 1.15];
  const base = [x, y + r * 1.0];
  for (let i = 0; i < 6; i++) {
    const p0 = rim[i], p1 = rim[(i + 1) % 6];
    const mid = (p0[2] + p1[2]) / 2;
    const lit = Math.max(0, Math.cos(mid + RK_LA));
    [[apex, 1.0], [base, 0.66]].forEach(([tip, k]) => {
      c.fillStyle = A(lit > 0.66 ? RK_UNIQUE[2] : RK_UNIQUE[1],
        (0.34 + 0.6 * lit) * k);
      c.beginPath();
      c.moveTo(tip[0], tip[1]);
      c.lineTo(p0[0], p0[1]);
      c.lineTo(p1[0], p1[1]);
      c.closePath();
      c.fill();
    });
  }
  // 하이라이트는 **한 점**.
  c.fillStyle = A('#FFFFFF', 0.8);
  c.beginPath();
  c.arc(x - r * 0.22, y - r * 0.5, Math.max(0.7, r * 0.1), 0, Math.PI * 2);
  c.fill();
}

/// ⑫ 크기 넷 × 운석 넷
///
/// ⚠️ 한 줄에 넷을 밀어 넣었더니 **초거대가 옆 칸을 밟았다.** 초거대는 랜드마크라
///   크기가 곧 전부인데 줄이면 뜻이 죽으므로, 줄을 나눈다 — 위는 초거대,
///   아래는 큰·중간·작은.
/// 1-2 크기 다섯 — **무채 한 벌로만** 잰다.
///
/// ⚠️ 색을 같이 돌리면 1-1 이 그린 색 넷을 크기마다 또 그리게 된다 — 한 장에
///   같은 운석이 열여섯 번 나오고, 정작 보라는 것(크기 차)이 안 보인다.
function rkSizePanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const colW = W / RK_SIZE.length;
  // 칸에 맞춰 통째로 줄인다 — 비율이 뜻이라 낱개로는 안 건드린다.
  const s = Math.min(1, colW / 200, (H * 0.38) / 86);
  // ⚠️ 이름은 **한 밑줄**에 모은다 — 기암 꼴은 반지름 밖으로 크게 뻗어서
  //   덩이마다 「r 아래」에 적으면 이름이 몸 위에 얹힌다.
  RK_SIZE.forEach(([nm, r0, form], i) => {
    const x = colW * (i + 0.5);
    rkStone(c, x, H * 0.40, r0 * s, i * 7.3 + 2, t + i * 1.1, RK_PLAIN, false,
      form ? { form } : undefined);
    rkLabel(c, nm, x, H - 36, i < 2 ? '#E8C879' : '#8A8A98');
  });
  rkLabel(c, '크기 = HP(얼마나 오래 캐나) · 색 = 무엇을 올리나(1-1) — 두 뜻이 안 겹친다',
    W / 2, H - 10, '#5A5A68');
}

/// 페이지 차례와 **같은 순서**로 둔다 — 읽는 사람이 대조한다.
const RK_PANELS = [
  ['r-grade', rkGradePanel],       // 운석 1-1 등급
  ['r-size', rkSizePanel],         // 운석 1-2 크기 다섯
  ['r-icepair', rkIcePair],        // 운석 1-3 얼음 운석
  ['r-iceform', rkIceFormPanel],   // 운석 1-3-1 얼음 꼴 여덟
  ['r-icelit', rkIceLitPanel],     // 운석 1-3-2 밝기 판정 — 사다리 셋
  ['r-hit', rkHitPanel],           // 운석 3-1 때릴 때
  ['r-break', rkBreakPanel],       // 운석 3-2 부서지는 순간 · 드롭
  ['r-mine', rkMinePanel],         // 운석 4 채굴 무기 셋
  ['r-ice', rkIcePanel],           // 재화 — 얼음운석 속
  ['r-stones', rkStonesPanel],     // 재화 — 강화석 셋
  ['r-mob', rkDropPanel],          // 재화 — 적이 남기는 것 셋
  ['r-zoom', rkZoomPanel],         // 재화 — 확대(실물 ↔ 굽는 크기)
];
let rkT0 = 0;
/// ⚠️⚠️ **보이는 판만 그린다.** 여덟을 다 그리면 한 프레임에 **11.9ms** 가 들어
///   16.7ms 예산의 71% 를 먹는다 — 그러면 브라우저 몫이 모자라 **프레임이 뚝뚝
///   끊기고**, 그 끊김이 이펙트를 촌스러워 보이게 만든다.
///   ⇒ 화면 밖 판은 건너뛴다. 스크롤 한 화면에 한둘이라 2~5ms 로 떨어진다.
function rkFrame(ms) {
  rkT0 = rkT0 || ms;
  const t = (ms - rkT0) / 1000;
  const vh = window.innerHeight || 800;
  for (const [id, fn] of RK_PANELS) {
    const cv = document.getElementById(id);
    if (!cv) continue;
    const b = cv.getBoundingClientRect();
    if (b.bottom < -80 || b.top > vh + 80) continue;   // 화면 밖
    try { fn(cv, t); } catch (e) {}
  }
  requestAnimationFrame(rkFrame);
}
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  for (const [id, fn] of RK_PANELS) {
    const cv = document.getElementById(id);
    if (cv) { try { fn(cv, 0); } catch (e) {} }
  }
} else if (typeof requestAnimationFrame === 'function') {
  requestAnimationFrame(rkFrame);
}

/* ══════════════════════════════════════════════════════════════════════════
   운석 아홉 — F 문법을 복사한다 

   F = B(3단 계조) + 크레이터 + 광맥 + 자전·부유·그림자.
   D·E 는 F 안에 층으로 들어 있으므로 **F 하나가 정본**이다.
   ══════════════════════════════════════════════════════════════════════════ */

/// 운석 넷 — **나오는 것**으로 가른다(속성 축은 버렸다).
///
/// ⚠️ 색을 고를 때 **이미 임자가 있는 자리**를 피했다:
///   · 채굴 빔 = 찬 색(청록·시안) — 생존을 시안으로 두면 무기와 겹친다
///   · 재화 = 금빛(`CURINK`) · 관측소 「지금」 칸도 금빛
///   · 적 눈 = 진홍 `#FF2D55`(`FOEEYE`)
const RK_KIND = [
  { k: 'atk', nm: '공격', tone: 'ember', ax: '공격력 · 마법력 · 공격속도' },
  { k: 'crit', nm: '치명', tone: 'blast', ax: '치명타 확률 · 피해' },
  { k: 'def', nm: '생존', tone: 'magnet', ax: '방어력 · 체력' },
  { k: 'grav', nm: '중력', tone: 'murk', ax: '이동속도 · 흡수반경' },
];

/// ⭐ **일반 ↔ 희귀는 「크기」로 안 가른다.** 크기는 **HP**(얼마나 오래 캐나)를
///   뜻해야 하므로 희귀에 쓰면 두 뜻이 겹친다. 대신 셋으로 가른다:
///     ① 광맥이 **굵고 많다**(2 → 4줄)
///     ② 광맥이 **겉으로 샌다**(후광이 붙는다)
///     ③ **결정 알갱이가 표면에 박혀 있다** — 「값진 것」의 신호
/// [toneKey] 를 주면 그 색으로 그린다 — **재화는 조각이고 등급은 색**이다:
/// 무채(초급) · 색 넷(희귀) · 황금(유니크).
function rkOre(c, x, y, r, seed, t, kind, rare, toneKey) {
  const K0 = RK_KIND.find((q) => q.k === kind) || RK_KIND[0];
  const K = toneKey ? { ...K0, tone: toneKey } : K0;
  // ⭐⭐ **등급은 몸에서 갈린다.** 광맥 색만 바꾸면 셋이 똑같이 보인다:
  //   · 일반 — 무채 돌. 광맥이 가늘고 후광이 옅다
  //   · 색   — 같은 돌인데 **광맥이 굵고 많고 결정이 박힌다**(희귀의 표시)
  //   · 유니크 — **몸까지 금이다.** 「황금빛으로 이루어진」 것이라 돌이 아니다
  const grade = toneKey === 'unique' ? 2 : (toneKey === RK_PLAIN ? 0 : 1);
  const PAL = grade === 2
    ? ['#4A3306', '#9A7318', '#E8C05A']   // 금 — 그늘도 금이다
    : null;
  rare = rare || grade === 1;
  const bob = Math.sin(t * 0.9 + seed) * r * 0.09;
  const up = 0.5 + 0.5 * Math.sin(t * 0.9 + seed);
  const rot = t * 0.22 + seed;
  const yy = y + bob;

  // 그림자 — 어두운 속 + 밝은 테. 높이에 따라 줄고 흐려진다.
  const sh = r * (0.72 - up * 0.18);
  c.save();
  c.globalAlpha = 0.7 - up * 0.2;
  c.beginPath();
  c.ellipse(x, y + r * 1.12, sh, sh * 0.26, 0, 0, Math.PI * 2);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.12, sh, 0.26, 0, Math.max(1.4, r * 0.05), 'gale',
    0.5 - up * 0.16);

  // 몸 + 크레이터 (D 층)
  rkD(c, x, yy, r, seed, rot, 0.34, PAL);

  // 광맥 (E 층) — 희귀는 굵고 많다
  const T = rkTone(K.tone);
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seed);
  const veins = rare ? 4 : 2;
  const cs = Math.cos(rot), sn = Math.sin(rot);
  const ux = RK_LX * cs + RK_LY * sn, uy = -RK_LX * sn + RK_LY * cs;
  c.save();
  c.translate(x, yy);
  c.rotate(rot);
  c.beginPath();
  jagPoly(0, 0, r, RK_N, seed, RK_SPIKE, 0.94).forEach((p, i) =>
    i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]));
  c.closePath();
  c.clip();
  for (let v = 0; v < veins; v++) {
    const a0 = hash(seed * 11.3 + v * 6.1) * Math.PI * 2;
    const pts = [];
    let px = Math.cos(a0) * r * 0.42, py = Math.sin(a0) * r * 0.38;
    pts.push([px, py]);
    for (let k = 1; k <= 3; k++) {
      const ang = a0 + (hash(seed * 5.1 + v * 3.3 + k) - 0.5) * 1.9;
      px += Math.cos(ang) * r * 0.2;
      py += Math.sin(ang) * r * 0.2;
      pts.push([px, py]);
    }
    celStroke(c, pts, Math.max(1.4, r * (grade ? 0.15 : 0.085)), K.tone,
      (grade === 2 ? 0.8 : grade ? 0.62 : 0.34) + 0.4 * pulse);
  }
  // 희귀 — 결정 알갱이가 표면에 박혀 있다
  if (rare) {
    for (let i = 0; i < 3; i++) {
      const a = hash(seed * 17.1 + i * 5.3) * Math.PI * 2;
      const d = r * (0.2 + 0.4 * hash(seed * 13.7 + i * 3.1));
      celSpike(c, x * 0 + Math.cos(a) * d, Math.sin(a) * d * 0.9,
        r * 0.16, a - Math.PI / 2, K.tone, 0.7 + 0.3 * pulse);
    }
  }
  c.restore();

  // 광맥이 새는 빛 — 몸에 딱 붙는다. 희귀만 조금 더.
  c.save();
  c.globalCompositeOperation = 'lighter';
  const halo = grade === 2 ? 1.5 : (grade ? 1.3 : 1.1);
  const gg = c.createRadialGradient(x, yy, r * 0.75, x, yy, r * halo);
  gg.addColorStop(0, A(T[1], (grade === 2 ? 0.2 : grade ? 0.11 : 0.04) + 0.03 * pulse));
  gg.addColorStop(1, A(T[1], 0));
  c.fillStyle = gg;
  c.beginPath();
  c.arc(x, yy, r * halo, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

/// ⭐ **드랍된 아이템 — 얼음운석을 깨고 나온 상태.**
///
/// ⚠️⚠️ 이건 **얼음운석이 아니다**.
///   ⇒ 둘은 **다른 물건**이고 둘 다 필요하다:
///     · **깨기 전** = 얼음운석 — 두껍고, 속은 **창으로만** 비친다([rkIceRock])
///     · **깨고 나서** = 이것 — 옅은 껍질에 감싸여 **둥둥 뜬다**
///
///   껍질의 정본은 결계 `FX.ward`(`vfx.js:3450`)다:
///     · **옅은 면 + 밝은 테두리** — 이 저장소의 「투명하지만 있는 것」
///     · **뒤 껍질 → 물체 → 앞 껍질** 순서라야 「안에 든 것」으로 읽힌다
///     · 셸 안쪽 그라디언트는 **안쪽 정지점이 0**(`vfx.js:5299`) —
///       가운데가 비고 가장자리만 밝아야 유리구다
function rkDropItem(c, x, y, r, seed, t, drawInner) {
  const bob = Math.sin(t * 0.7 + seed) * r * 0.08;
  const up = 0.5 + 0.5 * Math.sin(t * 0.7 + seed);
  const yy = y + bob;
  const spin = t * 0.5 + seed;

  const sh = r * (0.66 - up * 0.16);
  c.save();
  c.globalAlpha = 0.6 - up * 0.18;
  c.beginPath();
  c.ellipse(x, y + r * 1.16, sh, sh * 0.26, 0, 0, Math.PI * 2);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.16, sh, 0.26, 0, Math.max(1.3, r * 0.05), 'frost',
    0.42 - up * 0.14);

  // 셸 — 안쪽이 비고 가장자리만 밝다
  c.save();
  c.globalCompositeOperation = 'lighter';
  const sg = c.createRadialGradient(x, yy, r * 0.5, x, yy, r * 1.04);
  sg.addColorStop(0, A('#4FC3F7', 0));
  sg.addColorStop(0.82, A('#4FC3F7', 0.06));
  sg.addColorStop(1, A('#E8F8FF', 0.16));
  c.fillStyle = sg;
  c.beginPath();
  c.arc(x, yy, r * 1.04, 0, Math.PI * 2);
  c.fill();
  c.restore();

  // 뒤 껍질 → 물체 → 앞 껍질
  rkIceShell(c, x, yy, r, spin, false);
  // ⚠️⚠️ 껍질에 견줘 물건이 작으면 「구 안의 **점**」이다 — 껍질은 **감싼 것**
  //   이므로 물건이 안을 채워야 「저것이 나온다」가 읽힌다.
  //   실측: 0.72 × 호출부 0.92 로 껍질 폭의 **41~51%** 밖에 안 됐다.
  // ⭐ 배수를 **여기 한 곳으로 모은다** — 셋으로 흩어져 있어 어디를 만져야
  //   하는지 못 읽었다. 껍질 폭 2.07r · 물건 폭 1.50r ⇒ 채움 **0.70**.
  if (drawInner) drawInner(c, x, yy, r * 0.96);
  rkIceShell(c, x, yy, r, spin, true);
  // ⚠️ **가장자리 테를 안 그린다** — 조각만으로 이미 윤곽이 읽히고, 테를
  //   두르는 순간 그게 결계의 문법이 된다.
}

/// 얼음 껍질 — **각기둥이 제멋대로 엉킨 것.**
///
/// ⚠️⚠️ **육각 격자는 얼음이 아니다** — 규칙적으로 깔린 육각은 결계
///   (`FX.ward`), 곧 **인공 방벽**의 언어다.
///
/// ⭐ 이 저장소가 얼음을 어떻게 그리는지 이미 적어 뒀다(`vfx.js:5418`):
///   > 「⚠️ 판이 **고르게** 서면 얼음벽이 아니라 **톱니바퀴**가 된다 (…)
///   >   간격·기울기·높이를 전부 흩뜨리고, 몇 장은 아예 부러져 낮게 둔다 —
///   >   **깨진 채 서 있는** 벽이라야 얼음이다」
///   > 「빗금 — 얼음 결. 판 안쪽을 가로지르는 **밝은 선 하나면 「유리」**가 된다」
///
/// | | 결계 | **얼음** |
/// |---|---|---|
/// | 구조 | 육각이 **규칙적** | 각기둥이 **제멋대로** |
/// | 경계 | 셀마다 테두리 | 테두리 없이 **면이 겹쳐 두꺼워진다** |
/// | 빛 | 균일 | **결**이 있어 한쪽으로만 반짝 |
function rkIceShell(c, cx, cy, R, spin, front) {
  // ⚠️⚠️ **조각은 열셋이다. 늘리지 않는다.** 드랍된 아이템의 껍질은
  //   「갇힌 것」이 아니라 **「감싼 것」**이라 옅고 성겨야 맞다 — 두꺼우면
  //   다시 결계가 된다.
  const N = 13;
  for (let i = 0; i < N; i++) {
    // 간격이 안 고르다 — 이게 「톱니바퀴」를 피하는 첫 장치
    const jit = (hash(i * 13.7) - 0.5) * (Math.PI * 2 / N) * 0.62;
    const th = (i / N) * Math.PI * 2 + spin + jit;
    const ph = (hash(i * 5.1) - 0.5) * 1.5;          // 위도도 흩는다
    const dep = Math.cos(ph) * Math.cos(th);
    if ((dep >= 0) !== front) continue;

    const x = cx + Math.cos(ph) * Math.sin(th) * R;
    const y = cy + Math.sin(ph) * R * 0.9;
    const kf = Math.max(0.2, Math.abs(dep));          // 단축
    let ux = Math.cos(ph) * Math.sin(th), uy = Math.sin(ph);
    const ul = Math.hypot(ux, uy) || 1;
    ux /= ul; uy /= ul;

    // 각기둥 — 길쭉하고 **높이가 제각각**. 몇 장은 부러져 낮다.
    const broke = hash(i * 17.3) < 0.28 ? 0.42 : 1;
    const len = R * (0.22 + 0.3 * hash(i * 4.3)) * broke;
    const wid = R * (0.07 + 0.07 * hash(i * 23.1));
    const tilt = (hash(i * 9.7) - 0.5) * 1.1;        // 기울기도 흩는다
    const ca = Math.cos(tilt), sa = Math.sin(tilt);
    const P = [];
    // 끝이 뾰족한 사각 — 얼음 결정의 뼈대
    [[-wid, 0], [-wid * 0.5, len * 0.86], [wid * 0.34, len], [wid, len * 0.2]]
      .forEach(([lx, ly]) => {
        const rx = lx * ca - ly * sa, ry = lx * sa + ly * ca;
        const du = rx * ux + ry * uy, dv = -rx * uy + ry * ux;
        P.push([x + ux * du * kf - uy * dv, y + uy * du * kf + ux * dv]);
      });

    const al = front ? 0.42 + 0.36 * dep : 0.12 + 0.1 * (1 + dep);
    // ⚠️ **테두리를 안 그린다.** 면이 겹쳐 두꺼워지는 것이 얼음이고,
    //   셀마다 테를 두르면 그게 곧 결계다.
    c.save();
    c.globalCompositeOperation = 'lighter';
    fillPoly(c, P, A('#4FC3F7', 0.16 * al));
    // 결(빗금) — **밝은 선 하나면 유리가 된다**(`vfx.js:5436`)
    if (broke > 0.5 && front) {
      celStroke(c, [P[0], P[2]], Math.max(1, R * 0.022), 'frost', 0.5 * al);
    }
    c.restore();
  }
}

/// ⭐ **깨서 나온 재화가 주변에 둥둥 떠다닌다**.
///   이게 없으면 노다지가 그냥 **작아지기만** 해서 「캔 보람」이 화면에 없다.
///
/// ⚠️ 재화 알은 **운석과 다른 언어**를 써야 한다 — 같은 셀 덩어리로 그리면
///   「작은 운석」으로 읽혀 「아직 캘 게 남았나?」가 된다. 그래서:
///     · 운석 = **어두운 몸 + 밝은 면**(빛을 **받는다**)
///     · 재화 = **밝은 심 + 후광**(빛을 **낸다**)
///   빛을 받는 것과 내는 것은 이 저장소가 적·픽업을 가르는 그 축이다.
///
/// ⚠️ 떠다니는 것은 **위상 파생값을 안 쓴다** — 사인 하나에서 위치를 뽑고
///   알파는 건드리지 않는다(어제 이속에서 튀던 그 사고).
function rkDrop(c, x, y, s, tone, t, seed) {
  const T = rkTone(tone);
  const fx = x + Math.sin(t * 0.8 + seed * 2.1) * s * 1.6;
  const fy = y + Math.sin(t * 0.62 + seed * 3.7) * s * 1.2;
  // 후광 — 빛을 **낸다**
  c.save();
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(fx, fy, 0, fx, fy, s * 2.6);
  g.addColorStop(0, A('#FFFFFF', 0.42));
  g.addColorStop(0.22, A(T[2], 0.3));
  g.addColorStop(0.55, A(T[1], 0.14));
  g.addColorStop(1, A(T[1], 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(fx, fy, s * 2.6, 0, Math.PI * 2);
  c.fill();
  c.restore();
  // 심 — 작고 단단하다
  fillPoly(c, jagPoly(fx, fy, s, 6, seed * 5.3, 1.0, 0.92), A(T[2], 0.95));
}


/* ── 맞는 자리 — 각도에 따라 달라야 입체다 ────────────────────────────────
   ⭐⭐ 이것이 **평면과 입체를 가르는 결정적인 한 가지**다:
     · 중심에서 터지면 → **스티커**(그림 위에 얹은 것)
     · 실루엣 **위** 맞은 자리에서 터지면 → **덩어리**(부피가 있는 것)

   ⚠️ 그런데 `center + r·dir` 로 대충 잡으면 **울퉁불퉁한 테에서 뜬다** —
     골에 맞으면 표면 안쪽에서 터지고 마루에 맞으면 허공에서 터진다.
     ⇒ **실제 다각형과 광선을 교차**시킨다. jagPoly 가 내는 그 폴리곤이다.

   ⭐ 그리고 운석은 **자전한다.** 다각형이 도니 같은 화면 각도라도 실루엣
     반지름이 매 프레임 달라지고, 그래서 **맞는 자리가 표면을 따라 미끄러진다.**
     그 미끄러짐이 「돌고 있는 덩어리를 때리고 있다」를 말한다.               */



/// 채굴 타격 — 맞는 자리에 붙는다.
///
/// ⚠️ 셋이 다 **바깥 법선 방향**을 쓴다. 파편이 아무 데로나 튀면 「부딪혔다」가
///   아니라 「폭발했다」가 되고, 그건 공격 무기의 문법이다.
function rkImpact(c, hx, hy, nx, ny, s, tone, t, seed) {
  const T = rkTone(tone);
  const u = ((t * 2.6 + seed) % 1);
  const a = Math.sin(Math.PI * u);               // 양 끝이 0 — 이음매 없음

  // ① 닿은 자리 — 작고 흰 심
  c.save();
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(hx, hy, 0, hx, hy, s * 2.2);
  g.addColorStop(0, A('#FFFFFF', 0.85 * a));
  g.addColorStop(0.3, A(T[2], 0.5 * a));
  g.addColorStop(1, A(T[1], 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(hx, hy, s * 2.2, 0, Math.PI * 2);
  c.fill();

  // ② 파편 — **바깥 법선 쪽**으로만 튄다
  for (let i = 0; i < 4; i++) {
    const sp = (hash(seed * 7.1 + i * 3.3) - 0.5) * 1.5;   // 법선에서 벌어진 각
    const ang = Math.atan2(ny, nx) + sp;
    const d = s * (1.2 + 3.4 * u) * (0.6 + 0.7 * hash(seed * 4.7 + i));
    const px = hx + Math.cos(ang) * d, py = hy + Math.sin(ang) * d;
    c.fillStyle = A(T[2], 0.75 * (1 - u));
    c.beginPath();
    c.arc(px, py, s * 0.32 * (1 - u * 0.6), 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

/* ── 얼음 운석 — 깨기 전 ─────────────────────────────────────────────────
   ⭐⭐ **얼음은 부푼 것이 아니라 쪼개진 것이다.** 물이 얼면 결정면을 따라
     **평면으로 깨진다** — 크고 작은 **평평한 면**이 각을 이루고, 면마다 빛
     받는 각이 달라 밝기가 **뚝뚝 끊긴다.** 계조가 부드러워지는 순간
     **풍선**(공기로 부푼 것)이 된다.

   ⚠️ 그래서 매끈한 몸에 무늬를 얹으면 안 된다 — 떠도는 결과 둥근 서리는
     **면 위의 장식**이라 3차원으로 돌리면 **면이 없다는 게 그대로 보인다.**

   ⇒ **무늬가 아니라 몸을 바꾼다.** 정이십면체 위상에 정점마다 반지름을 흔들어
     불규칙한 덩이를 만들고, 면마다 **람베르트(면 법선 · 광원)로 한 가지 색을
     평평하게** 칠한다.
       · 면이 곧 명암이다 — 그라디언트가 **한 군데도 없다**
       · 뒷면을 먼저 옅게 깔아 **속이 비친다**(얼음은 반투명이다)
       · 자전이 진짜 3차원이라 면이 가장자리에서 **저절로 단축돼** 사라진다
       · **자전축을 기울인다** — 수평으로만 돌면 생동감이 죽는다             */

/// 정이십면체 — 12정점 · 20삼각면. 면을 손으로 적지 않고 **모서리 길이로**
/// 찾는다(인접 현² ≈ 1.106, 그다음이 2.894 라 1.2 로 깨끗이 갈린다).
/// 정이십면체를 [lv] 번 세분한 위상. 면 20 → 80 → 320.
///
/// ⭐ **세분 단계는 크기가 정한다.** 면 수가 같으면 큰 덩이일수록 면 하나가
///   넓어져 **밋밋해 보인다.** 랜드마크는 한 단 더 잘게 나눠야 같은 밀도로 읽힌다.
function rkBuildIco(lv) {
  const g = (1 + Math.sqrt(5)) / 2;
  const V = [[0, 1, g], [0, 1, -g], [0, -1, g], [0, -1, -g],
             [1, g, 0], [1, -g, 0], [-1, g, 0], [-1, -g, 0],
             [g, 0, 1], [-g, 0, 1], [g, 0, -1], [-g, 0, -1]]
    .map(v => { const L = Math.hypot(v[0], v[1], v[2]); return [v[0] / L, v[1] / L, v[2] / L]; });
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
  let F = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++)
      for (let k = j + 1; k < 12; k++)
        if (d2(V[i], V[j]) < 1.2 && d2(V[j], V[k]) < 1.2 && d2(V[i], V[k]) < 1.2)
          F.push([i, j, k]);

  // 세분 — 새 정점은 부모 둘의 중점이다. 부모를 적어 두어야 반지름을 물려받는다.
  const par = V.map(() => null);
  for (let step = 0; step < lv; step++) {
    const mid = new Map();
    const midOf = (a, b) => {
      const key = a < b ? a + '_' + b : b + '_' + a;
      if (mid.has(key)) return mid.get(key);
      const q = [(V[a][0] + V[b][0]) / 2, (V[a][1] + V[b][1]) / 2,
                 (V[a][2] + V[b][2]) / 2];
      const L = Math.hypot(q[0], q[1], q[2]);
      V.push([q[0] / L, q[1] / L, q[2] / L]);
      par.push([a, b]);
      mid.set(key, V.length - 1);
      return V.length - 1;
    };
    const F2 = [];
    F.forEach(([a, b, d]) => {
      const ab = midOf(a, b), bd = midOf(b, d), da = midOf(d, a);
      F2.push([a, ab, da], [b, bd, ab], [d, da, bd], [ab, bd, da]);
    });
    F = F2;
  }

  // 모서리 인접표 — 두 면이 정점 둘을 공유하면 그 둘 사이의 모서리다.
  //   ⭐ 셀 아트의 윤곽은 **면마다 두르는 선**이 아니라 **톤이 바뀌는 자리**와
  //     **실루엣**에만 있다. 그걸 가르려면 인접이 필요하다.
  const E = [];
  const own = new Map();
  F.forEach((f, fi) => {
    for (let k = 0; k < 3; k++) {
      const a = f[k], b = f[(k + 1) % 3];
      const key = a < b ? a * 100000 + b : b * 100000 + a;
      if (own.has(key)) E.push([own.get(key), fi, a, b]);
      else own.set(key, fi);
    }
  });
  return { V, F, E, par };
}

const RK_ICO = rkBuildIco(1);     // 면 80 — 보통 크기
const RK_ICO2 = rkBuildIco(2);    // 면 320 — 초거대(기암)

/// 3차원 광원 — 화면 광원(왼쪽 위)에 **앞쪽 성분**을 더한 것.
/// ⚠️ 화면 y 는 아래가 +다. 「왼쪽 위」가 (−x, −y).
const RK_L3 = (() => {
  const v = [-RK_LX, -RK_LY, 0.62], L = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / L, v[1] / L, v[2] / L];
})();

/// 색 사다리 보간 — [u]∈[0,1].
///
/// ⚠️⚠️ **반드시 `#RRGGBB` 로 돌려준다.** `A(h,a)`(`vfx.js:309`)가
///   `h.slice(1,3)` 으로 자르기 때문에 `rgb(...)` 를 주면 **NaN** 이 되고,
///   캔버스는 잘못된 `fillStyle` 을 **조용히 무시**한다(예외도 안 난다).
///   ⇒ 면이 아예 안 칠해져 **모서리만 남는다.** 「너무 어둡다」로 읽히지만
///     밝기 문제가 아니라 **칠이 실패한 것**이다.
function rkRamp(ramp, u) {
  const n = ramp.length - 1;
  const s = Math.max(0, Math.min(0.9999, u)) * n;
  const i = Math.floor(s), f = s - i;
  const hx = (v, k) => parseInt(v.slice(1 + k * 2, 3 + k * 2), 16);
  const m = k => Math.round(hx(ramp[i], k) * (1 - f) + hx(ramp[i + 1], k) * f)
    .toString(16).padStart(2, '0');
  return '#' + m(0) + m(1) + m(2);
}

/// 얼음 다면체의 면들을 화면 좌표로. [spin] 자전 위상,
/// [tx]/[tz] **자전축 기울기** — 이게 「사선으로 도는」 것을 만든다.
/* ── 얼음 운석의 **꼴** ─────────────────────────────────────────────────
   맵에 여러 형태가 다채롭게 뜨도록 꼴을 여덟으로 나눈다.

   ⚠️ 여기서 가르는 것은 **덩어리의 꼴 하나뿐**이다. 텍스처(여섯 단 계조 ·
     골 · 앞날 · 서리 조각 · 창)도, 자전도, 색도 건드리지 않는다.

   ⭐ 꼴을 가르는 손잡이는 셋이다:
     · **축 눌림** — 길쭉한가 납작한가
     · **자른 면** — 평면으로 뚝 잘린 자리(얼음은 결정면을 따라 **쪼개진다**)
     · **뿔** — 극을 잡아 빼면 뾰족해진다

   ⭐⭐ 그중 **자른 면**이 얼음의 정체성이다. 평면 하나로 여러 정점을 눌러
     붙이면 **큰 평면 한 장**이 생기는데, 그게 「깨진 자리」로 읽힌다.       */

/// [ax·ay·az] 축 눌림 · [jit] 울퉁불퉁함 · [pole] 뿔 · [cut] 자른 면 `[nx,ny,nz,d]`
///
/// ⚠️ 이 표(와 [rkSolidFaces])는 **얼음 전용이 아니다.** 돌 운석도 같은 기계를
///   쓰고 **칠하는 언어만** 다르다 — 얼음은 쪼개진 것, 돌은 부딪혀 닳은 것.
const RK_ICE_FORM = [
  { nm: '덩이', ax: 1.00, ay: 0.88, az: 0.94, jit: 1.00, pole: 0,
    cut: [] },
  { nm: '쐐기', ax: 1.08, ay: 0.94, az: 0.86, jit: 0.85, pole: 0,
    cut: [[0.5, 0.78, 0.38, 0.34]] },
  // ⚠️ **얇은 판은 안 쓴다** — 옆에서 보면 사라져 덩어리로 안 읽힌다.
  //   좌우(ax)는 길고 위아래(ay)는 낮되 **깊이(az)는 살려** 두께를 남긴다.
  { nm: '토막', ax: 1.52, ay: 0.60, az: 1.04, jit: 0.70, pole: 0,
    cut: [[0, 1, 0, 0.34], [0, -1, 0, 0.34]] },
  { nm: '기둥', ax: 0.64, ay: 1.44, az: 0.70, jit: 0.62, pole: 0,
    cut: [[1, 0, 0, 0.40], [-1, 0, 0, 0.40]] },
  { nm: '송곳', ax: 0.84, ay: 1.02, az: 0.84, jit: 0.9, pole: 0.9,
    cut: [] },
  { nm: '조각', ax: 1.02, ay: 0.80, az: 0.90, jit: 1.15, pole: 0,
    cut: [[0.62, -0.7, 0.36, 0.30], [-0.72, 0.3, -0.62, 0.34]] },
  // ⭐ 자른 면을 **중심 가까이**(d=0.05) 놓으면 덩이의 절반이 한 평면에 눌려
  //   붙어 **거대한 평면 한 장**이 생긴다 — 그것이 「쪼갠 자리」다.
  //   울퉁불퉁함을 낮춰야(jit 0.5) 그 면이 **깨끗하게** 남는다.
  { nm: '쪼갠', ax: 1.04, ay: 1.00, az: 1.00, jit: 0.50, pole: 0, sz: 1.26,
    cut: [[0.48, 0.66, 0.58, 0.05]] },
  // 날카로운 쪽 — 뿔 + 얕은 자름. 「부러진 창끝」
  { nm: '창끝', ax: 0.72, ay: 1.30, az: 0.74, jit: 0.9, pole: 1.5, sz: 1.05,
    cut: [[0.66, -0.5, 0.56, 0.22]] },
  // ⚠️ **뾰족함은 「창끝」(뿔 1.5)까지가 한계다** — 뿔 2.0 에 깊이 0.44 를
  //   겹치면 운석이 아니라 **칼날**이 된다.
].map(F => ({ sz: 1, ...F, cut: F.cut.map(([nx, ny, nz, d]) => {
  const L = Math.hypot(nx, ny, nz) || 1;
  return [nx / L, ny / L, nz / L, d];
}) }));

/// 씨앗이 모양을 고른다 — 맵에 흩뿌리면 저절로 다채로워진다.
function rkIceForm(seed) {
  return RK_ICE_FORM[Math.floor(hash(seed * 31.1) * RK_ICE_FORM.length) %
    RK_ICE_FORM.length];
}

function rkSolidFaces(r, seed, spin, tx, tz, form) {
  const TP = (form && form.topo === 2) ? RK_ICO2 : RK_ICO;
  const cs = Math.cos(spin), sn = Math.sin(spin);
  const cx = Math.cos(tx), sx = Math.sin(tx);
  const cz = Math.cos(tz), sz = Math.sin(tz);
  // ⚠️ **정다면체 그대로면 주사위(d20)다.** 얼음덩이는 큰 면 몇 개가 각을
  //   이루고 나머지는 작게 깨진 것이라 **면 크기가 고르지 않다.** 그래서
  //   ① 정점마다 반지름을 크게 흔들고 ② **축마다 눌러** 덩이를 찌그러뜨린다.
  const FM = form || RK_ICE_FORM[0];
  // 같은 꼴 안에서도 씨앗마다 조금씩 다르다 — 같은 것이 둘 뜨면 안 된다.
  let ax = FM.ax * (0.94 + 0.12 * hash(seed * 3.1));
  let ay = FM.ay * (0.94 + 0.12 * hash(seed * 4.7));
  let az = FM.az * (0.94 + 0.12 * hash(seed * 6.3));
  // ⚠️⚠️ **꼴이 크기를 흔들면 「크기 = HP」가 깨진다**. 같은 `r` 을 줘도 「길쭉」은
  //   0.78×1.26×0.86 이라 부피가 작아 **작아 보인다.** 돌은 크기가 곧 HP 를
  //   뜻하므로 꼴이 그 뜻을 흔들면 안 된다.
  //   ⇒ 세 축의 기하평균으로 나눠 **부피를 맞춘다.** 비율(길쭉·납작)은 그대로고
  //     크기만 같아진다.
  //   ⚠️ 얼음에는 안 건다 — 이미 확정된 그림이고, 얼음은 크기가 HP 가 아니다.
  // ⭐ **큰 형태는 원래 열두 정점이 정한다.** 세분으로 생긴 중점은 부모의
  //   평균에서 조금만 흔들려, 덩이 모양은 그대로 두고 **면만 잘게** 나뉜다.
  const RD = TP.V.map((v, i) => {
    const pr = TP.par[i];
    if (pr) return 0;
    // [jit] 이 0 에 가까울수록 고른 덩이, 1 을 넘으면 험하게 깨진 것.
    const j = 0.56 + 0.62 * hash(seed * 7.3 + i * 2.1) ** 1.4;
    let base = 1 - (1 - j) * FM.jit;
    // ⭐ **정점을 잡아 빼면 실루엣이 튀어나온다.** 이게 실루엣을 매번 다르게
    //   만드는 제일 센 손잡이고, 재질에 따라 뜻이 다르다:
    //     · 얼음 — 드물고 크게(0.70·1.30~2.05) = **뾰족하게 부러진 자리**
    //     · 돌   — 잦고 완만하게(0.42·1.18~1.66) = **혹**
    //
    // ⚠️⚠️ 크고 작은 것이 **달라붙은** 모양은 덩이를 얹어 만들지 않는다 —
    //   얹으면 「붙인 것」이지 **「난 것」**이 아니다. 혹은 **몸의 일부**다.
    const lp = FM.lump || [0.70, 1.30, 0.75];
    if (hash(seed * 71.3 + i * 5.7) > lp[0]) {
      base *= lp[1] + lp[2] * hash(seed * 73.1 + i);
    }
    // ⭐⭐ **봉우리** `[개수, 세기, 날카로움]` — 혹은 실루엣을 울퉁불퉁하게
    //   만들 뿐 **「절벽」을 못 만든다.** 절벽은 **몇 군데가 크게 솟은 것**이라,
    //   방향 몇을 뽑아 그쪽 정점만 크게 잡아 빼야 한다.
    //   ⚠️ 날카로움(지수)이 요점 — 낮으면 덩이가 통째로 부풀고, 높아야
    //     **가까운 정점만** 솟아 봉우리가 선다.
    if (FM.spire) {
      const [sn, sw, sp] = FM.spire;
      // ⚠️⚠️ **곱하면 바늘이 된다** — 봉우리 셋이 한 정점에 겹치면
      //   (1+1.7)³ ≈ 20배다. 봉우리는 **가장 가까운 하나**가 정하는 것이므로
      //   곱이 아니라 **최댓값**을 쓴다.
      let boost = 0;
      for (let k = 0; k < sn; k++) {
        const a1 = hash(seed * 101.3 + k * 7.1) * Math.PI * 2;
        const a2 = -0.6 + 1.6 * hash(seed * 103.7 + k * 3.3);
        const cl = Math.cos(a2);
        const dx = Math.sin(a1) * cl, dy = Math.sin(a2), dz = Math.cos(a1) * cl;
        const dot = v[0] * dx + v[1] * dy + v[2] * dz;
        if (dot > 0) boost = Math.max(boost, sw * Math.pow(dot, sp));
      }
      // ⚠️ 상한을 둔다 — 옆으로 뻗은 봉우리가 길어지면 「창」이 되고, 그건
      //   절벽이 아니다. 0.95 면 반지름이 두 배 조금 안 된다.
      base *= 1 + Math.min(0.95, boost);
    }
    // [pole] — 극을 잡아 빼면 뿔이 선다.
    return base * (1 + FM.pole * Math.abs(v[1]) ** 3);
  });
  // ⚠️⚠️ **중점을 구면으로 밀면 덩이가 공이 된다.** 정점을 단위구에 놓았으니
  //   반지름을 부모 평균 그대로 주면 원래 면보다 **바깥으로 부풀어** 실루엣이
  //   둥글어진다. 두 정점의 **평면 중점**은 길이가 cos(θ/2)=0.851 이므로 그만큼
  //   당겨 놓아야 **큰 면이 평면으로 남는다.** 거기서 조금만 흔들면 큰 면이
  //   **네 개의 살짝 다른 면**으로 쪼개진다 — 실제 깨진 얼음이 그렇다.
  const RK_PLANAR = 0.851;
  TP.par.forEach((pr, i) => {
    if (!pr) return;
    RD[i] = (RD[pr[0]] + RD[pr[1]]) / 2 * RK_PLANAR *
      (0.97 + 0.09 * hash(seed * 17.1 + i));
  });
  // ① 꼴 — 축 눌림까지. 아직 안 돈 상태(자른 면은 몸에 붙어 같이 돌아야 한다).
  //   ⭐ **기울여 늘이기**(shear) — 축에 맞춰 누르기만 하면 여덟이 전부 같은
  //     결로 보인다. 비스듬히 밀면 축과 무관한 꼴이 나온다.
  const shx = (hash(seed * 67.7) - 0.5) * 0.55;
  const shz = (hash(seed * 79.3) - 0.5) * 0.45;
  const P = TP.V.map((v, i) => {
    const k = RD[i] * r;
    const X = v[0] * k * ax, Y = v[1] * k * ay, Z = v[2] * k * az;
    return [X + Y * shx, Y, Z + Y * shz];
  });
  // ② **자른 면** — 평면 너머의 정점을 평면 위로 눌러 붙인다. 여러 정점이
  //   한 평면에 놓이면 **큰 평면 한 장**이 생겨 「쪼개진 자리」로 읽힌다.
  // ⭐⭐ 꼴이 정한 자름에 더해 **씨앗마다 한둘이 덧붙는다** — 같은 꼴이라도
  //   깨진 자리가 매번 달라, 맵에 흩뿌리면 같은 것이 둘 안 나온다.
  const cuts = FM.cut.slice();
  // ⚠️ 개수와 깊이는 **꼴이 정한다** `[기본, 흔들림, 깊이, 깊이흔들림]`.
  //   얼음은 깊게 쪼개지고(0.34~0.68) 돌은 얕게 떨어져 나간다(0.62~0.82).
  const xc = FM.xc || [1, 2, 0.34, 0.34];
  const nx2 = xc[0] + Math.floor(hash(seed * 61.3) * xc[1]);
  for (let k = 0; k < nx2; k++) {
    const a1 = hash(seed * 83.1 + k * 3.3) * Math.PI * 2;
    const a2 = (hash(seed * 89.7 + k * 2.1) - 0.5) * Math.PI;
    const cl = Math.cos(a2);
    cuts.push([Math.cos(a1) * cl, Math.sin(a2), Math.sin(a1) * cl,
      xc[2] + xc[3] * hash(seed * 97.1 + k)]);
  }
  cuts.forEach((cu, ci) => {
    const d = cu[3] * r * (0.86 + 0.28 * hash(seed * 37.7 + ci));
    P.forEach(q => {
      const u = q[0] * cu[0] + q[1] * cu[1] + q[2] * cu[2];
      if (u <= d) return;
      q[0] -= cu[0] * (u - d);
      q[1] -= cu[1] * (u - d);
      q[2] -= cu[2] * (u - d);
    });
  });
  // ⚠️⚠️ **축만 맞춰서는 부족했다**. 실측하니 같은 `r` 인데 폭이
  //   **82 ↔ 135** 로 1.6배 벌어졌다 — 축 눌림뿐 아니라 **혹**(정점을 1.18~1.66배
  //   잡아 빼는 것)과 **자름**(덩어리를 떼어 내는 것)이 덩치를 바꾸기 때문이다.
  //
  // ⭐ 그래서 **다 끝난 뒤에** 실제 덩치를 재서 맞춘다 — 중심에서 정점까지의
  //   평균 거리를 목표값(0.80r)에 맞춰 통째로 늘리고 줄인다. 비율(길쭉·납작)과
  //   울퉁불퉁함은 그대로고 **크기만** 같아진다.
  //   ⇒ 돌은 **크기가 곧 HP** 라 이 한 줄이 규약을 지키는 자리다.
  if (FM.norm) {
    let mean = 0;
    P.forEach(q => (mean += Math.hypot(q[0], q[1], q[2])));
    mean /= P.length || 1;
    const k = mean > 0 ? (r * 0.80) / mean : 1;
    P.forEach(q => { q[0] *= k; q[1] *= k; q[2] *= k; });
  }

  // ③ 자전 · 기울인 축
  const V = P.map(q => {
    const x1 = q[0] * cs + q[2] * sn, z1 = -q[0] * sn + q[2] * cs;
    const y2 = q[1] * cx - z1 * sx, z2 = q[1] * sx + z1 * cx;
    return [x1 * cz - y2 * sz, x1 * sz + y2 * cz, z2];
  });
  const FA = TP.F.map(f => {
    const a = V[f[0]], b = V[f[1]], d = V[f[2]];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const w = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
    let n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2],
             u[0] * w[1] - u[1] * w[0]];
    const L = Math.hypot(n[0], n[1], n[2]) || 1;
    n = [n[0] / L, n[1] / L, n[2] / L];
    const ct = [(a[0] + b[0] + d[0]) / 3, (a[1] + b[1] + d[1]) / 3,
                (a[2] + b[2] + d[2]) / 3];
    // 감기 방향이 제각각이라 **법선을 바깥으로** 맞춘다.
    if (n[0] * ct[0] + n[1] * ct[1] + n[2] * ct[2] < 0) n = [-n[0], -n[1], -n[2]];
    return { p: [a, b, d], n, ct };
  });
  // ⚠️⚠️ **속 물건이 몸 밖으로 튀어나왔다**.
  //   원인은 물건 크기를 **축 눌림만 보고** 정한 것 — `min(ax,ay,az)` 는
  //   **자른 면과 뿔을 모른다.** 「쪼갠」은 중심 가까이(d=0.05) 잘려 남은 게
  //   반쪽인데 축은 1.0 이라, 물건이 통째로 크게 잡혔다.
  //
  // ⭐ 답은 **재는 방법**을 바꾸는 것이다 — 몸 안에 실제로 들어가는 **가장 큰 공**을
  //   잰다. 무게중심에서 **모든 면까지의 거리 중 최솟값**이 그 반지름이고,
  //   이러면 자름·뿔·기울임이 뭘 하든 저절로 맞는다.
  //   ⚠️ **중심도 옮겨야** 한다 — 쪼갠 덩이의 무게중심은 원점이 아니다.
  const cen = [0, 0, 0];
  V.forEach(q => { cen[0] += q[0]; cen[1] += q[1]; cen[2] += q[2]; });
  cen[0] /= V.length;
  cen[1] /= V.length;
  cen[2] /= V.length;
  // ⚠️ 다만 **공**으로 재면 길쭉한 꼴(기둥·토막·쪼갠)에서 물건이 너무 작아진다
  //   — 남는 자리는 긴데 공은 제일 좁은 쪽에 맞춰지기 때문이다.
  //   ⇒ **타원**으로 잰다. 몸을 축마다 눌러 공처럼 만든 자리에서 내접 반지름을
  //     구하면(평면 거리는 `n` 을 같은 배로 늘린 길이로 나눈 값), 되돌렸을 때
  //     **몸을 따라 늘어난 타원**이 된다.
  const ext = [1e-6, 1e-6, 1e-6];
  V.forEach(q => {
    ext[0] = Math.max(ext[0], Math.abs(q[0] - cen[0]));
    ext[1] = Math.max(ext[1], Math.abs(q[1] - cen[1]));
    ext[2] = Math.max(ext[2], Math.abs(q[2] - cen[2]));
  });
  // ⚠️⚠️ **무게중심이 몸 안에 있다는 보장이 없다**. 「쪼갠」은 중심 가까이 잘려 정점 여럿이 자른 면에 눌려
  //   붙는데, 그러면 **정점 평균이 그 면 쪽으로 끌려가** 면 위나 밖에 선다.
  //   그 자리에서 재면 내접 반지름이 **0** 이 되어 물건이 통째로 사라진다.
  //   ⇒ 여기 `Math.max(0, …)` 가 그걸 **덮고 있어서 시안에서는 안 보였다.**
  //     「엔진에서 되나」를 재려고 옮겼더니 시안의 버그가 먼저 나왔다.
  //
  //   ⇒ **제일 좁은 면에서 안쪽으로 물러나며** 중심을 옮긴다(체비쇼프 중심의
  //     싼 근사). 걸음을 줄여 가며 열두 번이면 충분히 붙는다.
  const dist = f => (f.ct[0] - cen[0]) * f.n[0] + (f.ct[1] - cen[1]) * f.n[1] +
    (f.ct[2] - cen[2]) * f.n[2];
  const metric = f =>
    Math.hypot(f.n[0] * ext[0], f.n[1] * ext[1], f.n[2] * ext[2]) || 1;
  const ref = Math.max(ext[0], ext[1], ext[2]);
  let stepLen = 0.25;
  for (let it = 0; it < 12; it++) {
    let worst = Infinity, wn = null;
    FA.forEach(f => {
      const v = dist(f) / metric(f);
      if (v < worst) { worst = v; wn = f.n; }
    });
    if (!wn) break;
    cen[0] -= wn[0] * stepLen * ref;
    cen[1] -= wn[1] * stepLen * ref;
    cen[2] -= wn[2] * stepLen * ref;
    stepLen *= 0.72;
  }

  let inner = Infinity;
  FA.forEach(f => {
    const v = dist(f) / metric(f);
    if (v < inner) inner = v;
  });
  return { V, FA, TP, inner: Math.max(0, inner), cen, ext };
}

/// 얼음 다면체. [hint] 가 함수면 **속에 든 물건**을 그 함수로 그린다 —
/// 물건은 **깨기 전에 창 너머로 보인다**(스폰 때 정해진다, 판정 2026-08-21).
/// truthy 비함수는 온기(창 면 3단)만 — 꼴 연구처럼 속이 주제가 아닌 판의 것.
///
/// ⚠️⚠️ **칠하는 방식이 3D 렌더가 되면 옛날 그림이 된다:**
///   | 이렇게 하면 | 이렇게 보인다 |
///   |---|---|
///   | 연속 램프(중간 톤 수십 개) | 셀이 아니라 **부드러운 셰이딩** |
///   | 전부 반투명 | 뿌옇게 떠서 **유리구슬** |
///   | 면마다 두른 가는 선 | **와이어프레임 · CAD** |
///   | 둥근 흰 점 스펙큘러 | 2000년대 「크리스털」의 그 점 |
///
/// ⭐⭐ 이 저장소의 문법은 넷이다 — **면 채우기 · 3단 계조 · 뾰족한 윤곽 ·
///   흰 앞날.** 그대로 옮긴다:
///     · 면 색을 **네 단으로 양자화**한다(중간 톤을 아예 안 쓴다)
///     · 윤곽은 **톤이 바뀌는 자리와 실루엣에만** — 면마다 두르지 않는다
///     · 몸은 **불투명**하고, 속이 비치는 **창은 그늘 면 둘**뿐이다
///     · **흰 앞날** — 광원 쪽 실루엣만 굵고 밝게(반대쪽까지 두르면 날붙이다)
/// 얼음 운석의 **여섯 단** — 엔진 `ice_paint.dart` 의 `kIceTones` 와 짝이다.
///
/// ⭐⭐ **밝기는 「위」가 아니라 「아래」의 일이다.** 꼭대기 셋
///   (#2F94BE·#71C9E4·#D3F3FF)만 밝히는 안은 빙 마법 FX 와 ΔE 3.8 까지
///   붙는데, 화면을 재 보면 그 대가로 지키는 것도 거의 없다:
///
///   | 단 | 화면 점유(실측) | 빙 FX 까지 최단 ΔE |
///   |---|---|---|
///   | 0 | **63.8%** | 49.7 |
///   | 1 | **24.6%** | 42.3 |
///   | 2 | 4.1% | 27.8 |
///   | 3 | 0.6% | 17.0 |
///   | 4 | 1.3% | 12.9 |
///   | 5 | 3.3% | 6.2 |
///
///   ⇒ **덩이의 88% 가 아래 두 단**이고, 그 둘은 빙 FX 에서 42~50 이나 떨어져
///     **혼동 위험이 아예 없는 자리**다. 꼭대기 셋은 통틀어 **5.2%** 라,
///     그것만 밝히면 실제로 그린 몸의 광도가 71.1 → 71.6(**+0.7%**)밖에 안
///     오르면서 FX 거리만 6.2 → 3.8 로 내준다 — **비용 전부, 이득 없음.**
///   ⇒ 그래서 **아래를 든다.** 0~2 단을 올려 몸 광도 71.1 → **89.6(+26%)**
///     (1-3-3 칸의 같은 운석을 캔버스에서 되읽어 잰 수다). 그러면서 이웃 단
///     최소 거리는 8.7 → **11.3 으로 오히려 벌어진다**(합 62.6 → 70.3).
/// ⭐ **덤으로 두 획이 되살아난다.** 옛 0단(#08202F)은 골(`kIceSeam` #071A24)과
///   ΔE **3.1** — 「같은 색」선이라 **면 사이 골이 안 보였다.** 새 0단은 10.9 다.
///   바탕(#0A0910)과의 거리도 10.8 → 18.4 로 실루엣이 더 잘 닫힌다.
/// ⚠️ 판정은 정지 색표가 아니라 **전투 장면**에서 했다 — 시안 1-3-3 칸이
///   운석과 빙 이펙트를 한 화면에 놓고 여러 프레임으로 보여 준다.
/// ⚠️ **꼭대기(5단)는 그대로 둔다.** 밝혀 보면 `kIceEdge`(#DCF2FB 흰 앞날)·
///   `kIceWinRim`(#DDF3FC 창테)과 ΔE 2.2·2.3 — 「같은 색」선 3.0 **아래**로
///   내려가 앞날과 창테가 몸에 먹힌다. 위를 밝히는 값이 치르는 대가는 빙 FX
///   혼동만이 아니라 **제 획을 지우는 것**이었다.
const RK_ICE_TONE = ['#123A50', '#1F6382', '#2E8FA6', '#43ADB4', '#7ED8D2',
  '#C6E7F6'];
/// 그늘 쪽 실루엣 — 몸이 밝아지면 **같이 내려야** 한다. 옛 값 #2C5F76 은 새
/// 1단과 ΔE 3.1 이라 그 면에서 획이 사라졌다(내린 뒤 8.5).
const RK_ICE_RIMSHADE = '#1A4A63';
/// 1-3-3 판정 칸이 나란히 놓는 **후보들.** 지운 값이 아니라 **비교 대상**이라
/// 남긴다 — 다음 사람이 같은 자리에서 같은 실수를 다시 하지 않게.
const RK_ICE_TONE_ALT = [
  ['지금(아래를 듦)', RK_ICE_TONE],
  ['위만 밝힘',
    ['#08202F', '#0F3A52', '#1A6285', '#2F94BE', '#71C9E4', '#D3F3FF']],
  ['안 밝힌 판',
    ['#08202F', '#0F3A52', '#1A6285', '#2894A8', '#60C4C8', '#C6E7F6']],
];
function rkIceRock(c, x, y, r, seed, t, hint, form, tone) {
  const FM0 = form || rkIceForm(seed);
  // ⭐ 꼴마다 **크기도 다르다** — 「쪼갠 것」은 원래 컸던 덩이의 절반이라 크다.
  r = r * FM0.sz;
  const bob = Math.sin(t * 0.8 + seed) * r * 0.08;
  const up = 0.5 + 0.5 * Math.sin(t * 0.8 + seed);
  const yy = y + bob;
  const tx = 0.30 + 0.55 * hash(seed * 11.3);
  const tz = -0.55 + 1.10 * hash(seed * 13.7);
  const { V, FA, TP, inner, cen, ext } = rkSolidFaces(r, seed, t * 0.5 + seed, tx, tz, FM0);

  const sh = r * (0.7 - up * 0.18);
  c.save();
  c.globalAlpha = 0.5 - up * 0.16;
  c.beginPath();
  c.ellipse(x, y + r * 1.12, sh, sh * 0.26, 0, 0, Math.PI * 2);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.12, sh, 0.26, 0, Math.max(1.3, r * 0.05), 'frost',
    0.4 - up * 0.12);

  c.save();
  c.translate(x, yy);

  // ⚠️ **네 단은 너무 굵었다** — 이웃한 면이 자꾸 같은 색이 되어 큰 면으로
  //   합쳐지고, 그러면 **색종이**가 된다. 단을 여섯으로 늘려 이웃이 서로
  //   다른 값을 갖게 한다(= 면이 면으로 읽힌다). 사이 값은 여전히 없다.
  // ⚠️⚠️ **어둡게 해서 숨기지 않는다**.
  //   ⇒ 정확한 진단이고, **밝은 물체는 디테일 예산이 크다**는 뜻이다. 값을
  //     내려 가리는 건 문제를 감추는 것이라 아래 면 세분으로 밀도를 올렸다.
  // ⭐⭐ **면 대비를 벌렸다**(2026-08-24 레퍼런스 「크리스탈 군집」). 옛 사다리는
  //   아래 세 단이 서로 ΔE2000 6.6·9.6 밖에 안 떨어져 이웃한 면이 **같은 값으로
  //   합쳐졌고**, 그래서 덩이가 크리스탈이 아니라 **슬레이트 판**이었다.
  //   이웃 단 거리 합 62.6 → **70.3**, 제일 좁던 칸 6.6 → **11.3**.
  //   사다리 자체와 그 근거는 [RK_ICE_TONE] 에 있다(1-3-3 판정 칸이 정본).
  const TONE = tone || RK_ICE_TONE;
  const EDGE = '#DCF2FB';
  const lam = f => Math.max(0,
    f.n[0] * RK_L3[0] + f.n[1] * RK_L3[1] + f.n[2] * RK_L3[2]);
  /// 람베르트를 네 칸으로 자른다.
  const step = f => Math.min(5, Math.floor(Math.pow(lam(f), 1.05) * 6));
  const path = f => {
    c.beginPath();
    c.moveTo(f.p[0][0], f.p[0][1]);
    c.lineTo(f.p[1][0], f.p[1][1]);
    c.lineTo(f.p[2][0], f.p[2][1]);
    c.closePath();
  };

  const front = FA.map((f, i) => ({ f, i })).filter(o => o.f.n[2] > 0);
  const isFront = new Array(FA.length).fill(false);
  front.forEach(o => (isFront[o.i] = true));

  // ⚠️⚠️ **반투명이 홀로그램의 첫째 원인이다** — 통과해 보이는 몸 + 빛나는
  //   모서리 + 도는 것 = 투영이다. 얼음은 **덩어리**라 대부분 불투명하다.
  //
  // ⭐⭐ 속도 보여야 하지만 둘은 안 싸운다 — **몸 전체를 옅게 하지 말고 창
  //   하나를 크게 뚫는다.** 얼음덩이도 그렇게 생겼다: 대부분 뿌옇고
  //   **한 자리만 맑다.**
  //   ⚠️ 창은 **보는 쪽을 정면으로 향한 면**이라야 한다. 그늘 면은 가장자리에
  //     있어 **단축돼 좁고** 속을 가린다.
  const win = new Set(front.filter(o => o.f.n[2] > 0.66).map(o => o.i));
  if (!win.size) {
    const best = front.reduce((a, b) => (a.f.n[2] > b.f.n[2] ? a : b), front[0]);
    if (best) win.add(best.i);
  }

  // ⭐⭐ **속의 빛은 면이다.** 창 면 몇 개를 골라 두고 ② 에서 칠한 뒤 ③ 이
  //   덮게 한다 — 빛의 경계가 **면 모서리**라 셀 문법과 같은 언어가 되고,
  //   앞면 뒤에 있으니 「위에 붙은 것」이 아니라 「속」이 된다.
  //
  // ⚠️ 크기를 **속 자리(`inner`)에 매달면 안 된다** — 꼴마다 0.094~0.603 으로
  //   **6.4배** 흔들려 「뜨다 말다」 한다(r=90 에서 코어가 1.9px ↔ 10.6px).
  //   ⇒ **앞면 면적의 고정 비율**로 고른다. 꼴 여덟·자전 각도가 달라져도
  //     빛의 **양**이 같고, 모양만 덩이를 따른다.
  const glowLit = [];
  const glowNear = new Set();
  let glowBre = 1;
  if (hint) {
    const triA = q => Math.abs((q[1][0] - q[0][0]) * (q[2][1] - q[0][1])
      - (q[2][0] - q[0][0]) * (q[1][1] - q[0][1])) / 2;
    const span = Math.max(ext[0], ext[1]) || 1;
    const tot = front.reduce((a, o) => a + triA(o.f.p), 0) || 1;
    const cand = front.filter(o => win.has(o.i))
      .map(o => ({ o, d: Math.hypot(o.f.ct[0] - cen[0], o.f.ct[1] - cen[1]) / span }))
      .sort((a, b) => a.d - b.d);
    let acc = 0;
    for (const w of cand) {
      if (acc >= tot * RK_ICE_GLOW) break;
      acc += triA(w.o.f.p);
      glowLit.push(w.o);
    }
    // 맞댄 면 — ③-2 에서 **한 단**만 얹는다. 없으면 빛이 오려 붙인 듯 뜬다.
    const litSet = new Set(glowLit.map(o => o.i));
    TP.E.forEach(([a, b]) => {
      if (litSet.has(a) && !litSet.has(b) && isFront[b]) glowNear.add(b);
      if (litSet.has(b) && !litSet.has(a) && isFront[a]) glowNear.add(a);
    });
    // 숨쉬기는 **한 스케줄에서만** 나온다 — 위상 파생값을 따로 그리지 않는다.
    glowBre = 0.88 + 0.12 * (0.5 + 0.5 * Math.sin(t * 1.6 + seed));
  }

  // ① 뒷벽 — 창으로만 보인다. 한 단으로 평평하게.
  FA.forEach((f, i) => {
    if (isFront[i]) return;
    path(f);
    c.fillStyle = A(TONE[0], 1);
    c.fill();
  });

  // ② 속에 든 것 — 뒷벽과 앞면 **사이**라 갇혀 보인다.
  //
  // ②-1 **온기** — 고른 창 면을 3단으로 칠한다. 귀한 것이 들었다는 신호다.
  //   ⚠️⚠️ **원을 그리면 스티커가 된다.** 알파를 낮춰도 소용없었다 — 각진 몸
  //     위의 매끈한 원은 **크기와 무관하게** 「붙인 것」으로 읽힌다
  //     (실측 원형도 1.18 = 빈틈 없는 타원). ⇒ 원을 아예 안 그린다.
  //   ⭐ 사이 값은 없다 — 그게 셀이다. ③ 이 이 위를 알파 0.24 로 덮으므로
  //     보이는 따뜻함은 **76%** 로 눌리고, 그 눌림이 곧 「얼음 **속**」이다.
  if (hint) {
    const GT = [['#FFE9BC', 0.85], ['#F5C878', 0.5], ['#C98F42', 0.26]];
    glowLit.forEach((o, j) => {
      const g = GT[Math.min(2, Math.floor((j * 3) / Math.max(1, glowLit.length)))];
      path(o.f);
      c.fillStyle = A(g[0], g[1] * glowBre);
      c.fill();
    });
  }
  // ②-2 **물건** — 무엇이 들었는지 **깨기 전에 보인다**(사용자 판정
  //   2026-08-21: 스폰 때 정해진다 — 「무엇을 하러 가나」를 지도에서 미리
  //   고르는 것이 이 운석의 뜻이라, 깰 때 굴리면 그 고름이 사라진다).
  if (typeof hint === 'function') {
    c.save();
    // ⭐ **무게중심에 · 몸을 따라 늘어난 타원으로.** 눌림(irx/iry)은 비율만
    //   남긴다 — 얼음 속 물건은 **덩이 모양을 따라** 갇혀 있다. 0.52 는
    //   면에 안 닿을 여유다.
    // ⚠️⚠️ **반지름은 실제 픽셀로 준다** — r=1 로 주고 스케일로 키우면
    //   rkItem 의 획 최소 굵기(Math.max(0.6, …))가 스케일을 타고 부풀어
    //   물건이 획 덩어리로 뭉개진다.
    // ⚠️⚠️ **물건이 얼음과 같이 안 움직이면 「유리에 붙인 스티커」다.**
    //   ⭐ **시차**로 묶는다 — 물건은 창보다 깊이 있으므로 **덜 움직인다.**
    const ir0 = Math.max(0.05, inner * 0.52);
    const irx = ir0 * Math.max(0.001, ext[0]);
    const iry = ir0 * Math.max(0.001, ext[1]);
    const ir = Math.sqrt(irx * iry);
    c.translate(cen[0], cen[1]);
    c.scale(irx / ir, iry / ir);
    hint(c, 0, 0, ir, Math.sin(t * 0.5 + seed));
    c.restore();
  }

  // ③ 앞면 — **평평한 네 단.** 창만 비친다.
  front.sort((a, b) => a.f.ct[2] - b.f.ct[2]).forEach(o => {
    path(o.f);
    c.fillStyle = A(TONE[step(o.f)], win.has(o.i) ? 0.24 : 1);
    c.fill();
  });

  // ③-2 **빛이 맞댄 면** — 밝힌 면과 모서리를 맞댄 앞면에 **한 단**만.
  //   ⚠️ 거리로 서서히 죽이면(falloff) 그건 그라디언트고, 그 순간 다시
  //     매끈한 원이 된다. **한 단**이라 경계가 면 모서리에 그대로 남는다.
  //   ⚠️ 그리고 넓게 얹으면 얼음이 누렇게 전다 — **맞댄 한 겹까지만.**
  if (glowNear.size) {
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = A('#FFD9A0', 0.07 * glowBre);
    front.forEach(o => {
      if (!glowNear.has(o.i)) return;
      path(o.f);
      c.fill();
    });
    c.restore();
  }

  // ④ **속 금** — 얼음을 얼음으로 만드는 건 서리 뭉치가 아니라 **갈라진 금**이다.
  //   ⚠️ 둥근 뭉치를 얹으면 만화 구름이 된다. 금은 **곧고
  //     가늘고 각지다** — 면을 가로질러 정점 쪽으로 뻗는다.
  const litOne = front.reduce((a, b) => (lam(a.f) > lam(b.f) ? a : b), front[0]);
  front.forEach(o => {
    if (hash(seed * 41.3 + o.i * 1.9) > 0.3) return;
    const q = o.f.p, u = lam(o.f);
    c.save();
    path(o.f);
    c.clip();
    c.strokeStyle = A(EDGE, 0.12 + 0.34 * u);
    c.lineWidth = Math.max(0.6, r * 0.014);
    c.lineCap = 'round';
    for (let k = 0; k < 2; k++) {
      const v0 = q[k % 3], v1 = q[(k + 2) % 3];
      const g0 = 0.18 + 0.4 * hash(seed * 43.1 + o.i + k);
      c.beginPath();
      c.moveTo(v0[0] + (o.f.ct[0] - v0[0]) * 0.12,
        v0[1] + (o.f.ct[1] - v0[1]) * 0.12);
      c.lineTo(o.f.ct[0] + (v1[0] - o.f.ct[0]) * g0,
        o.f.ct[1] + (v1[1] - o.f.ct[1]) * g0);
      c.stroke();
    }
    c.restore();
  });

  // ⑤ **창의 테** — 맑은 자리와 뿌연 자리의 경계에 서리가 앉는다. 이 선이
  //   없으면 창이 「구멍」으로 읽히고, 있으면 「여기만 맑다」가 된다.
  TP.E.forEach(([a, b]) => {
    if (!isFront[a] || !isFront[b]) return;
    if (win.has(a) === win.has(b)) return;
    const P = TP.F[a].filter(v => TP.F[b].includes(v)).map(v => V[v]);
    if (P.length < 2) return;
    c.strokeStyle = A('#DDF3FC', 0.5);
    c.lineWidth = Math.max(0.8, r * 0.02);
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(P[0][0], P[0][1]);
    c.lineTo(P[1][0], P[1][1]);
    c.stroke();
  });

  // ⑥ 서리 — **불투명한 흰 조각.** 통과해 보이는 것 위에 안 통하는 것이 얹히면
  //   그 순간 「투영」이 아니라 「물건」이 된다. 각지게, 밝은 면 쪽에만.
  front.forEach(o => {
    if (win.has(o.i)) return;                 // 창은 맑아야 한다
    if (lam(o.f) < 0.45 || hash(seed * 53.7 + o.i * 2.3) > 0.26) return;
    const q = o.f.p, ct = o.f.ct;
    // ⚠️ 가운데로 균일하게 줄이면 **똑같은 삼각형**이 찍힌 것처럼 보인다.
    //   정점마다 다르게 당겨 **깨져 붙은 조각**으로 만든다.
    fillPoly(c, q.map((v, j) => {
      const k = 0.3 + 0.55 * hash(seed * 59.1 + o.i * 3.1 + j);
      return [ct[0] + (v[0] - ct[0]) * k, ct[1] + (v[1] - ct[1]) * k];
    }), A('#EAF7FF', 0.72));
  });

  // ⑦ 윤곽 — **톤이 바뀌는 자리와 실루엣에만.** 면마다 두르면 와이어프레임이다.
  TP.E.forEach(([a, b]) => {
    const fa = FA[a], fb = FA[b];
    const both = isFront[a] && isFront[b];
    if (!both && !isFront[a] && !isFront[b]) return;       // 둘 다 뒤 — 안 보인다
    const sil = isFront[a] !== isFront[b];                 // 실루엣 모서리
    if (both && step(fa) === step(fb)) return;             // 같은 단 — 선이 없다
    const P = TP.F[a].filter(v => TP.F[b].includes(v)).map(v => V[v]);
    if (P.length < 2) return;
    const lit = Math.max(lam(fa), lam(fb));
    if (sil) {
      // ⭐ **흰 앞날은 광원 쪽만.** 실루엣 전체를 두르면 「얼음 날붙이」가 된다.
      // ⚠️ 앞날이 굵으면 **테 두른 색종이**가 된다. 얇고 밝게.
      c.strokeStyle = A(lit > 0.6 ? EDGE : RK_ICE_RIMSHADE,
        lit > 0.6 ? 0.85 : 0.45);
      c.lineWidth = Math.max(0.9, r * (lit > 0.6 ? 0.028 : 0.018));
    } else {
      // ⚠️ 안쪽 선이 **빛나면** 그건 와이어프레임이고 홀로그램이다. 면과 면
      //   사이는 빛이 아니라 **골**이다 — 어둡게, 그리고 밝은 쪽만 살짝 반짝.
      const upLit = step(fa) > step(fb) ? fa : fb;
      const bright = lam(upLit) > 0.62;
      c.strokeStyle = A(bright ? EDGE : '#071A24', bright ? 0.3 : 0.42);
      c.lineWidth = Math.max(0.6, r * 0.012);
    }
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(P[0][0], P[0][1]);
    c.lineTo(P[1][0], P[1][1]);
    c.stroke();
  });

  // ⑧ 번쩍임 — **각진 조각 하나.** 둥근 점은 2000년대 크리스털의 그 점이다.
  if (litOne && lam(litOne.f) > 0.6) {
    const q = litOne.f.p;
    const m = (u, v, k) => [u[0] + (v[0] - u[0]) * k, u[1] + (v[1] - u[1]) * k];
    fillPoly(c, [m(q[0], q[1], 0.18), m(q[0], q[1], 0.46), m(q[0], q[2], 0.3)],
      A('#FFFFFF', 0.8));
  }
  c.restore();
}

/* ── 1-3-3 밝기 판정 — 운석과 빙 이펙트를 **한 화면에** ───────────────────
   ⚠️⚠️ **ΔE 하나로는 못 정한다.** 색차는 「같은 조건에서 두 색을 나란히 놓았을
     때」의 자다. 얼음운석과 빙 이펙트는 색 말고도 이렇게 다르다:

     | | 얼음 운석 | 빙 이펙트 |
     |---|---|---|
     | 움직임 | **박혀서 안 움직인다** | 가로질러 날아간다 |
     | 크기 | 크다(대형은 캐릭터보다) | 작다 |
     | 지속 | 판 내내 | 한순간 |

   ⇒ 그 셋이 갈리는지는 **여러 프레임**에 걸쳐야만 보인다. 정지 색표로 물러선
     판정이 2026-08-24 에 한 번 났고, 그래서 이 칸이 있다.                 */

/// 빙 계열 이펙트의 **저장소 색 그대로.** 사본을 뜨는 게 아니라 판정 대상이라
/// 여기 적는다 — `palette.dart` 의 `FxElement.frost`(심·겉)와
/// `cel_tones.dart` 의 `frostspine` · `wardfrost`.
const RK_FROST_FX = {
  core: '#2FA8FF', edge: '#DCFBFF', spine: '#4FC3F7', ward: '#62CEF9',
};

/// 날아가는 얼음 탄 한 발. [u] 0~1 이 한 번의 삶이다 — **잠깐이고 움직인다**가
/// 이 칸이 재려는 축이라 꼬리를 남긴다.
function rkFrostBolt(c, x, y, r, u, seed, dx) {
  const a = u < 0.10 ? u / 0.10 : Math.max(0, 1 - (u - 0.10) / 0.90);
  if (a <= 0.02) return;
  for (let k = 3; k >= 0; k--) {
    const kk = a * (k ? 0.20 / k : 1);
    const P = jagPoly(x - dx * k * 0.055, y, r * (1 - k * 0.14), 7,
      seed + k * 1.7, 1.25, 0.62);
    fillPoly(c, P, A(RK_FROST_FX.core, 0.92 * kk));
    if (k) continue;
    gAdd(c, cc => { gHalo(cc, x, y, r * 2.4, 'frost', 0.55 * a); });
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.beginPath();
    P.forEach((q, j) => (j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
    c.closePath();
    c.lineWidth = Math.max(1, r * 0.24);
    c.strokeStyle = A(RK_FROST_FX.edge, 0.85 * a);
    c.stroke();
    c.restore();
  }
}

/// 서릿발 — 바닥에서 솟았다 진다. 운석과 **같은 얼음**인데 다른 것으로
/// 읽혀야 하므로, 이 칸에서 제일 위험한 이펙트다.
function rkFrostSpine(c, x, gy, h, u, seed) {
  const grow = Math.min(1, u / 0.20);
  const a = Math.max(0, 1 - Math.max(0, u - 0.5) / 0.5);
  if (a <= 0.02) return;
  for (let k = 0; k < 3; k++) {
    const ox = (k - 1) * h * 0.36 + (hash(seed * 7.1 + k) - 0.5) * h * 0.22;
    const hh = h * (0.55 + 0.55 * hash(seed * 3.3 + k)) * grow;
    const w = Math.max(1.6, hh * 0.20);
    const P = [[x + ox - w, gy], [x + ox, gy - hh], [x + ox + w, gy]];
    fillPoly(c, P, A(RK_FROST_FX.spine, 0.82 * a));
    fillPoly(c, [[x + ox - w * 0.34, gy], [x + ox, gy - hh],
      [x + ox + w * 0.16, gy]], A(RK_FROST_FX.edge, 0.5 * a));
  }
  gAdd(c, cc => { gHalo(cc, x, gy - h * 0.3, h * 0.8, 'frost', 0.3 * a); });
}

/// 세 사다리를 **같은 장면**에 놓는다 — 씨앗도 시각도 같아 다른 것은 사다리뿐.
function rkIceLitPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const col = W / RK_ICE_TONE_ALT.length;
  const gy = H * 0.70;
  RK_ICE_TONE_ALT.forEach(([nm, TN], ci) => {
    const cx = col * (ci + 0.5);
    c.save();
    c.beginPath();
    c.rect(col * ci, 0, col, H);
    c.clip();
    // 바닥 — 운석이 **박혀 있다**는 것이 보이려면 지면이 있어야 한다.
    c.strokeStyle = 'rgba(120,140,170,.14)';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(col * ci + 14, gy);
    c.lineTo(col * (ci + 1) - 14, gy);
    c.stroke();
    // 박힌 것 둘 — 자리가 안 변한다.
    rkIceRock(c, cx - col * 0.20, gy - 30, 34, 2, t, 'magnet', null, TN);
    rkIceRock(c, cx + col * 0.21, gy - 20, 22, 7, t + 1.3, null, null, TN);
    // 결계 — 잠깐 켜졌다 꺼지는 고리. 운석과 **같은 자리**에 겹쳐 둔다.
    {
      const u = (t * 0.42) % 1;
      const a = Math.max(0, Math.sin(u * Math.PI)) * 0.8;
      c.save();
      c.globalCompositeOperation = 'lighter';
      c.beginPath();
      c.ellipse(cx - col * 0.20, gy - 6, 46 + 26 * u, (46 + 26 * u) * 0.30,
        0, 0, Math.PI * 2);
      c.lineWidth = 2.4;
      c.strokeStyle = A(RK_FROST_FX.ward, a * 0.7);
      c.stroke();
      c.restore();
    }
    // 서릿발 — 바닥에서. 운석과 같은 얼음이라 제일 헷갈릴 후보다.
    rkFrostSpine(c, cx + col * 0.02, gy, 34, (t * 0.55 + 0.3) % 1, 5);
    // 날아가는 탄 넷 — 가로지른다.
    for (let k = 0; k < 4; k++) {
      const u = (t * 0.62 + k * 0.27) % 1;
      const bx = col * ci + 10 + (col - 20) * u;
      const by = gy - 46 - 34 * Math.sin(k * 1.7) - 14 * Math.sin(u * 3.1 + k);
      rkFrostBolt(c, bx, by, 6.5 + 2 * hash(k * 3.1), u, k * 5.3 + 1,
        col - 20);
    }
    c.restore();
    // 사다리 여섯 조각 + 이름
    const sw = Math.min(26, col / 9);
    TN.forEach((h, i) => {
      c.fillStyle = h;
      c.fillRect(cx - sw * 3 + i * sw, H - 40, sw - 2, 13);
    });
    rkLabel(c, nm, cx, H - 48, ci === 0 ? '#8CE2DA' : '#7B7B8A');
    rkLabel(c, RK_ICE_LIT_NOTE[ci], cx, H - 12, '#66667A');
  });
  c.strokeStyle = 'rgba(180,180,200,.10)';
  c.lineWidth = 1;
  for (let i = 1; i < RK_ICE_TONE_ALT.length; i++) {
    c.beginPath();
    c.moveTo(col * i, 12);
    c.lineTo(col * i, H - 60);
    c.stroke();
  }
  rkLabel(c, '같은 씨앗 · 같은 시각 — 다른 것은 사다리뿐. 날아가는 것이 빙 이펙트(#2FA8FF·#DCFBFF·#4FC3F7·#62CEF9), 박힌 것이 운석이다',
    W / 2, 18, '#5A5A68');
}
/// 칸마다 **재 본 수**를 적는다 — 눈이 고르되 숫자가 따라와야 판정이 남는다.
const RK_ICE_LIT_NOTE = [
  '몸 광도 89.6(+26%) · 이웃 최소 ΔE 11.3 · 골이 0단에서 3.1 → 10.9 로 살아난다',
  '몸 광도 71.6(+0.7%) · 빙FX 최단 3.8 — 비용만 치르고 안 밝아진다',
  '몸 광도 71.1 · 빙FX 최단 6.2 — 「어둡다」로 반려된 판',
];

/* ══════════════════════════════════════════════════════════════════════════
   적이 남기는 것 셋 — 경험치 · 암흑물질 · 빛의 결정

   ⭐⭐ **적군은 암흑물질과 빛의 결정으로 이루어져 있다.** 죽으면 몸을 이루던
     것이 흩어지고, 「아무리 칠흑같은 어둠이라도 약간의 빛은 있는 법」이라
     빛의 결정이 하나 남는다. 경험치는 몸이 아니라 **사건**이라 물건이 안 된다.

   | | 경험치 | 암흑물질 | 빛의 결정 |
   |---|---|---|---|
   | 무엇 | 판 안 레벨업 | 상점 재화 | **프리미엄 재화** |
   | 어떻게 | **자동** — 즉시 빨려든다 | 떨어진다 — **주워야** 한다 | 떨어진다 — 엘리트·보스만 |
   | 모양 | **선** — 금빛 한 줄기 | **정육면체 하나**(검정) | **정육면체 여럿**(흰빛) |

   ⭐ **정육면체가 둘을 잇는 언어다.** 같은 격자에서 자란 것이라 각이 같고,
     **개수와 밝기**로만 갈린다 — 하나·검정 ↔ 여럿·흰빛. 색을 또 늘리지 않는다.

   ⚠️ **경험치만 금빛**이다. 유니크 강화석도 금빛이지만 그쪽은 **운석에서**
     나오고 이쪽은 **몹에서** 나오며, 무엇보다 저건 물건이고 이건 선이다.  */

/// 정육면체 여덟 꼭짓점 — x 오른쪽 · y 아래 · z 앞.
const RK_CV = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
/// 여섯 면 — 감김이 **바깥에서 볼 때 반시계**라야 법선이 밖을 본다.
const RK_CF = [[4, 5, 6, 7], [1, 0, 3, 2], [0, 4, 7, 3],
  [5, 1, 2, 6], [0, 1, 5, 4], [7, 6, 2, 3]];

/// 정육면체 하나를 돌려 **앞면만** 돌려준다.
///
/// ⭐ **아이소메트릭 고정 그림을 안 쓴다.** 안 굴러가는 육면체는 그 순간
///   「아이콘」이 되고, 이 게임의 물건은 전부 돈다. 그리고 이 계산이 곧
///   엔진 이식본이다 — 면 하나가 `VertexBatch.tri` 둘이다.
///
/// [o] 는 격자 위의 자리(정육면체 한 변 = 2 단위). 여럿을 같은 [yaw]·[pitch]
/// 로 돌리면 **같은 격자에서 자란 결정**이 된다.
function rkCubeFaces(s, yaw, pitch, o) {
  const cy0 = Math.cos(yaw), sy0 = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const rot = (v) => {
    const x = v[0] + (o ? o[0] : 0), y = v[1] + (o ? o[1] : 0),
      z = v[2] + (o ? o[2] : 0);
    const x1 = x * cy0 - z * sy0, z1 = x * sy0 + z * cy0;
    const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    return [x1 * s, y1 * s, z2 * s];
  };
  const V = RK_CV.map(rot);
  const out = [];
  for (const f of RK_CF) {
    const a = V[f[0]], b = V[f[1]], d = V[f[3]];
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const wx = d[0] - a[0], wy = d[1] - a[1], wz = d[2] - a[2];
    // ⚠️ 감김이 반시계면 (u × w) 가 아니라 (w × u) 가 바깥이다.
    let nx = wy * uz - wz * uy, ny = wz * ux - wx * uz, nz = wx * uy - wy * ux;
    const L = Math.hypot(nx, ny, nz) || 1;
    nx /= L; ny /= L; nz /= L;
    if (nz <= 0) continue;                    // 뒷면은 안 그린다 — 불투명하다
    const p = f.map(i => [V[i][0], V[i][1]]);
    const z = (V[f[0]][2] + V[f[1]][2] + V[f[2]][2] + V[f[3]][2]) / 4;
    const lam = Math.max(0, nx * RK_L3[0] + ny * RK_L3[1] + nz * RK_L3[2]);
    out.push({ p, z, lam });
  }
  out.sort((a, b) => a.z - b.z);              // 먼 것부터
  return out;
}

/// 셋의 3단 계조 — **저장소 규약대로 `TONE` 에 등록한다.** `celRibbon` ·
/// `celSplash` · `celSpike` 가 키로 찾으므로, 색을 손으로 칠하는 대신
/// 키를 넘겨야 **이 게임의 문법**(발광 한 겹 + 3단 + 흰 앞날)이 딸려 온다.
/// (`TONE.W3ray` 가 같은 이유로 등록돼 있다.)
TONE.rkXp = ['#6B5410', '#F2C94C', '#FFF8DC'];      // 경험치 · 금 45°
// ⭐ **테서렉트는 흰빛이지만 암흑물질은 「짙은 보라 어둠」이 빛난다**(사용자
//   확정). 그래서 제일 밝은 단이 흰색이 아니라 **보라**다 — 빛나는데도
//   어둡다는 모순이 이 물질의 정체다.
TONE.rkDark = ['#0E0620', '#3B1C86', '#8A4CFF'];    // 암흑물질 · 어둠 → 짙은 보라 발광
// ⚠️ 한때 **순검정**으로 뒀다가 되돌렸다 — 배경(#0A0910)과 값이 같아
//   「꽉 찬 덩이」가 아니라 **텅 빈 상자**로 읽혔다(사용자 진단).
//   ⇒ 보라를 아주 조금 섞어 배경에서 떠오르게 하되 **채도는 낮게** 둔다.
//     치명석(`blast` 채도 높은 보라)과는 그 채도 차이로 갈린다.
// ⚠️ 채도를 올리면 얼음운석(하늘색)과 겹치고, 큰 색면이 「블록」으로 읽힌다.
//   맑은 것은 **거의 무채**여야 맑아 보인다.
// ⭐ **「빛의」 결정이라 거의 흰색이다**(사용자 확정) — 푸른 기를 더 빼고
//   밝기를 올렸다. 채도가 남으면 얼음운석(하늘색)과 같은 층으로 읽힌다.
TONE.rkLumen = ['#8C959E', '#E2E8EE', '#FFFFFF'];   // 빛의 결정 · 흰빛
/// ⭐ **흰빛에 금빛을 섞는다**(2026-08-20 사용자). 몸은 흰 채로 두고 **빛만**
///   따뜻하게 — 새김이 타고, 속이 노랗게 비치고, 반짝임 절반이 금빛이다.
/// ⚠️ 몸까지 노랗게 하면 경험치(금빛 선)와 같은 층이 된다. 저건 **선**이고
///   이건 **물건**이지만, 색까지 같으면 그 구분이 안 남는다.
TONE.rkLumenWarm = ['#7A6320', '#E8C87A', '#FFF6E0'];

/// 이 게임이 물건을 세우는 법 — **발광 한 겹을 깔고 그 위에 면을 얹는다.**
///
/// ⚠️⚠️ 발광이 없으면 아무리 잘 칠해도 **다른 게임의 그림**이 된다. 무기
///   17종·마법 14종이 전부 이 한 겹 위에 서 있고, 이것이 없어서 첫 판
///   육면체가 「무채색 3D 렌더」로 보였다.
function rkAura(c, x, y, r, k, a) {
  const T = toneOf(k);
  c.save();
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, A(T[1], 0.30 * a));
  g.addColorStop(0.45, A(T[1], 0.14 * a));
  g.addColorStop(1, A(T[1], 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

/// 4갈래 별 — 무기 시안이 「빛나는 것」에 늘 붙이는 표식(`빛따발총`·`빛폭탄`).
/// 가로세로가 길고 대각이 짧다. 이게 있어야 **빛나는 물건**으로 읽힌다.
function rkStar(c, x, y, r, k, a, rot) {
  const T = toneOf(k);
  const arm = (R, w, col) => {
    const p = [];
    for (let i = 0; i < 8; i++) {
      const ang = rot + (i / 8) * Math.PI * 2;
      const rr = i % 2 === 0 ? R : R * w;
      p.push([x + Math.cos(ang) * rr, y + Math.sin(ang) * rr]);
    }
    fillPoly(c, p, col);
  };
  c.save();
  c.globalCompositeOperation = 'lighter';
  arm(r, 0.13, A(T[0], 0.8 * a));
  arm(r * 0.86, 0.11, A(T[1], 0.9 * a));
  arm(r * 0.6, 0.14, A(T[2], a));
  c.restore();
}

/// 정육면체를 **결계(ward)의 셸 문법**으로 푼다 — 면을 셀 격자로 나눠
/// 앞뒤 전부 돌려준다.
///
/// ⭐⭐ **투명함의 정체는 두 가지다**(`FX.ward` 를 그대로 읽어 뽑았다):
///   ① **뒷면을 그린다.** 뒤 셀이 흐리게 비쳐야 「속이 빈 껍질」로 읽힌다.
///      앞 `.55+.45·dep` · 뒤 `.16+.14·(1+dep)` — 결계의 그 값이다.
///   ② **면이 아니라 테가 셀을 만든다.** 면은 `α×.10` 으로 거의 비우고
///      테를 밝게 긋는다. 면을 채우면 그 순간 불투명한 상자가 된다.
///
/// [div] 는 한 면을 몇 칸으로 나눌지. 결계가 「셀을 각도로 깐다」로 밀도를
/// 정하듯, 여기서는 이 값 하나가 밀도를 정한다.
function rkCubeCells(s, yaw, pitch, div) {
  const cy0 = Math.cos(yaw), sy0 = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const rot = (x, y, z) => {
    const x1 = x * cy0 - z * sy0, z1 = x * sy0 + z * cy0;
    const y1 = y * cp - z1 * sp, z2 = y * sp + z1 * cp;
    return [x1 * s, y1 * s, z2 * s];
  };
  const out = [];
  for (const f of RK_CF) {
    const a = RK_CV[f[0]], b = RK_CV[f[1]], d = RK_CV[f[3]];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const v = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
    // 면의 법선(정육면체라 자리와 무관하다) — 깊이 dep 를 여기서 얻는다.
    const n3 = rot(u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2],
      u[0] * v[1] - u[1] * v[0]);
    const nl = Math.hypot(n3[0], n3[1], n3[2]) || 1;
    const dep = -n3[2] / nl;   // 감김이 반시계라 부호를 뒤집는다
    for (let i = 0; i < div; i++) {
      for (let j = 0; j < div; j++) {
        const P = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([q, r]) => {
          const uu = q / div, vv = r / div;
          return rot(a[0] + u[0] * uu + v[0] * vv, a[1] + u[1] * uu + v[1] * vv,
            a[2] + u[2] * uu + v[2] * vv);
        });
        out.push({
          p: P.map(q => [q[0], q[1]]),
          z: (P[0][2] + P[1][2] + P[2][2] + P[3][2]) / 4,
          dep,
        });
      }
    }
  }
  out.sort((a, b) => a.z - b.z);   // 먼 것부터 — 뒤 셀이 먼저 깔린다
  return out;
}

/// 셀 하나를 **휜 변**으로 두른다.
///
/// ⚠️ **곧은 변은 결정(結晶)의 문법이다**(`vfx.js` 결계 주석의 그 말).
///   딱딱한 직선 상자는 와이어프레임으로 읽히고, 변이 살짝 부풀어야
///   「팽팽한 막」이 된다 — 결계가 구로 보이는 이유도 여기 있다.
function rkCellPath(c, P, bow) {
  const mx = (P[0][0] + P[1][0] + P[2][0] + P[3][0]) / 4;
  const my = (P[0][1] + P[1][1] + P[2][1] + P[3][1]) / 4;
  c.beginPath();
  c.moveTo(P[0][0], P[0][1]);
  for (let i = 0; i < 4; i++) {
    const a = P[i], b = P[(i + 1) % 4];
    const ex = (a[0] + b[0]) / 2, ey = (a[1] + b[1]) / 2;
    // 제어점을 **중심 반대쪽**으로 민다 = 변이 바깥으로 부푼다.
    c.quadraticCurveTo(ex + (ex - mx) * bow, ey + (ey - my) * bow, b[0], b[1]);
  }
  c.closePath();
}

/// 면 위의 점 — 네 모서리를 겹선형으로 섞는다. [u]·[v] 는 면 로컬 좌표.
///
/// ⭐ **이것이 텍스처가 면에 붙어 도는 이유다.** 화면 좌표에 얼룩을 뿌리면
///   덩이가 돌아도 무늬는 제자리라 「유리에 붙인 스티커」가 된다.
/// ⚠️ [u]·[v] 를 0~1 밖으로 넘겨도 된다 — 클립이 자르므로 **면 밖까지 덮어**
///   가장자리에 빈 곳을 안 남기는 것이 요령이다.
function rkFaceUV(P, u, v) {
  const ax = P[0][0] + (P[1][0] - P[0][0]) * u;
  const ay = P[0][1] + (P[1][1] - P[0][1]) * u;
  const bx = P[3][0] + (P[2][0] - P[3][0]) * u;
  const by = P[3][1] + (P[2][1] - P[3][1]) * u;
  return [ax + (bx - ax) * v, ay + (by - ay) * v];
}

/// 암흑물질 — **투명한 얼음 같은 단단한 사각 결정, 안에서 암흑과 빛이
/// 소용돌이친다.**
///
/// ⚠️⚠️ 두 번 헛짚었다. ① 결계 문법(옅은 면 + 밝은 테)을 그대로 쓰니
///   **연필로 그린 빈 상자**가 됐고, ② 면마다 얼룩을 흩뿌리니 **곰팡이 핀
///   상자**가 됐다. 둘 다 틀린 이유는 같다 — 사용자가 말한 것은
///   **「소용돌이」**이고, 흩어진 얼룩은 소용돌이가 아니다.
///
/// ⭐ 층이 이렇게 선다:
///   ① **유리 뒷벽** — 어둡고 맑다. 여기가 있어야 속이 「안」이 된다
///   ② **소용돌이** — 실루엣에 갇힌 채 **감겨 돈다.** 어두운 팔과 밝은 팔이
///      번갈아 나선을 그린다. 이것이 「암흑과 빛」이다
///   ③ **유리 앞면** — 반투명이라 소용돌이가 비친다. 면마다 한 단씩 다르고
///      **굴절선**이 지나간다(단단한 결정의 표시)
///   ④ **모서리** — 그은 선이 아니라 **빛나는 앞날.** 얼음이 각진 이유다
/// ⚠️ **순검정은 배경(#0A0910)과 같아 「텅 빈」 것으로 읽힌다**(사용자 진단).
///   보라를 아주 조금 섞어 배경에서 **떠오르게** 한다 — 채도는 낮게 둬서
///   치명석(보라)과는 안 겹친다.
const RK_DM_DARK = '#120C22';
/// 유리 4단 — **두께가 곧 계조다.** 정면은 맑고(어둡고) 기울수록 뿌옇다.
/// ⭐ 2026-08-24 에 **네 단을 벌렸다**(레퍼런스 「크리스탈 군집」). 옛 사다리는
///   네 단이 밝기 0.09~0.22 안에 몰려 있어 세 면이 사실상 **한 값**이었다 —
///   면끼리 값이 붙으면 결정이 아니라 **빛나는 상자**다. 벌린 폭이 곧 「면이
///   면으로 읽히는」 폭이고, 그 정의는 얼음운석의 여섯 단과 같다.
const RK_DM_GLASS = ['#0D0620', '#1A0F3E', '#2C1A68', '#452696'];
/// 제일 밝은 심 — **흰색이 아니다.** 빛나는 것이 어둠 자체라야
/// 「암흑물질」이고, 흰 심을 쓰면 그냥 보라색 등불이 된다.
const RK_DM_LIT = '#B287FF';
/// 정육면체의 **실루엣 반지름 ÷ 반변**(√3). 실측 1.710 — 자전 각도를 걸쳐
/// 재도 이 값이다. 이걸 안 나누면 알갱이가 캐릭터보다 71% 크게 보인다.
const RK_CUBE_R = 1.71;
/// 자란 결정(클러스터)의 **실루엣 반지름 ÷ 기준 반변.** 실측 평균 2.26.
const RK_LUMEN_R = 2.26;
/// 자란 결정의 **바탕과 그늘.**
///
/// ⭐⭐ **그늘이 회색이면 석영이고, 남보라면 결정이다**(2026-08-24 사용자 판정
///   「크리스탈이 아니라 석영 느낌」 + 레퍼런스 두 장). 옛 값 `#6E7A85` 는
///   채도 0.09 의 회청색이라, 아무리 밝기를 흔들어도 화면에서는 **뿌연 흰
///   덩이** 하나였다 — 크리스탈로 읽히는 것은 밝기 차가 아니라 **그늘의 색**
///   이다. 레퍼런스(크리스탈 군집)의 그늘은 전부 짙은 남색·보라다.
/// ⚠️ 그래도 **몸은 흰빛**이다 — 밝은 쪽 끝은 순백을 지킨다. 양 끝이 흰빛과
///   남보라라야 한 면 안에서 색이 흐르고, 그 흐름이 곧 「맑다」다.
/// ⚠️ 채도를 더 올리면 얼음운석(하늘색)과 같은 층이 된다. **남보라(227°)**로
///   둔 이유가 그것이다 — 얼음운석은 시안·청록(189~197°) 쪽이라 색상환에서
///   갈리고, 실측 거리도 ΔE2000 12.0~52.5 로 넉넉하다.
const RK_LM_BASE = '#EAEFF4', RK_LM_SHADE = '#33499B';
/// 유리의 **두께** — 뒤가 비치되 배경이 그대로 보이지는 않는 어둠.
/// 그늘과 같은 남보라 계열이라야 속과 겉이 한 물건이다.
const RK_LM_DEEP = '#1B2440';
/// 새김의 **골** — 파인 자리는 빛이 안 닿아 어둡다.
/// ⚠️ 회색으로 두면 골이 「연필 자국」이다. 그늘과 **같은 남보라 계열**이라야
///   파인 자리도 결정의 색을 띤다(2026-08-24 레퍼런스).
const RK_LM_GROOVE = '#222B4C';
function rkDark(c, x, y, s, seed, t) {
  // ⚠️ **[s] 는 반지름이지 반변이 아니다.** 정육면체는 반변 s 를 주면
  //   실루엣이 **1.71배**(√3, 실측 1.710)까지 벌어져 같은 숫자를 준
  //   캐릭터보다 커 보인다 — 엔진의 `gemSizeOf` 와 자를 맞추려면
  //   **보이는 반지름**을 받아야 한다.
  const E = s / RK_CUBE_R;              // 반지름 → 반변
  // ⚠️⚠️ **자전을 안 한다**(2026-08-19 사용자 확정: 「그냥 우주에 둥둥 떠
  //   있는 느낌만」). 이 한 줄이 엔진 비용을 통째로 바꾼다 — 자전을 하면
  //   각도마다 스프라이트를 구워야 하지만, 안 하면 **한 장이면 된다.**
  // ⭐ 대신 「떠 있다」를 셋으로 낸다: **위아래 부유** · **아주 느린 갸웃**
  //   (±0.10 rad, 한 바퀴 아님) · 속 소용돌이. 갸웃은 런타임 쿼드 회전으로도
  //   되므로 굽는 장수를 안 늘린다.
  const bob = Math.sin(t * 0.9 + seed) * E * 0.11;
  const yaw = 0.62 + hash(seed * 3.7) * 1.2       // 씨앗마다 고정 — 개체차
    + Math.sin(t * 0.42 + seed) * 0.10;           // 갸웃
  const C = rkCubeCells(E, yaw, 0.42 + Math.sin(t * 0.31 + seed) * 0.05, 1);
  const T = TONE.rkDark;
  const pul = 0.72 + 0.28 * (0.5 + 0.5 * Math.sin(t * 1.6 + seed));
  const front = C.filter(q => q.dep >= 0), back = C.filter(q => q.dep < 0);
  c.save();
  c.translate(x, y + bob);

  rkAura(c, 0, 0, E * 2.1, 'rkDark', 0.7 * pul);

  const trace = (P, bow) => rkCellPath(c, P, bow);

  // ② 소용돌이 — **면마다 가장자리까지 꽉 채운다.**
  //
  // ⚠️⚠️ 세 번 헛짚었다. ① 빈 껍질 → 연필 상자, ② 나선 팔 → 선풍기,
  //   ③ 가운데 뭉치 → **가운데만 엉킨 빈 상자.** 셋 다 원인이 같다 —
  //   레퍼런스의 면은 **가장자리까지 텍스처가 차 있다.** 가운데만 밝으면
  //   부피가 아니라 「상자 안에 든 작은 것」이다.
  //
  // ⭐ 그래서 **면 로컬 좌표**로 그린다(`rkFaceUV`). 무늬가 면에 붙어 같이
  //   돌고, u·v 를 −0.1~1.1 로 넘겨 **면 밖까지 덮어** 가장자리에 빈 곳이
  //   안 남는다. 클립이 잘라 주므로 넘쳐도 된다.
  // ⚠️ 자리·크기·속도를 전부 `hash` 로 흩어 **회전 대칭을 없앤다** — 규칙이
  //   보이는 순간 연무가 아니라 무늬다.
  const swirl = t * 0.42 + seed;
  const nebula = (q, fi, lit) => {
    const P = q.p;
    c.save();
    c.beginPath();
    P.forEach((v, j) => (j ? c.lineTo(v[0], v[1]) : c.moveTo(v[0], v[1])));
    c.closePath();
    c.clip();
    // ⚠️⚠️ **여기를 불투명으로 두면 핵이 통째로 가려진다.** 앞 면 바탕이
    //   알파 1 이라 뒤에 그린 핵이 한 화소도 안 보였다(사용자 지적).
    //   유리는 **투명한 것**이므로 바탕도 비쳐야 한다.
    c.fillStyle = A(RK_DM_DARK, lit >= 1 ? 0.52 : 0.9);
    c.fill();
    const sz = (Math.hypot(P[1][0] - P[0][0], P[1][1] - P[0][1]) +
      Math.hypot(P[3][0] - P[0][0], P[3][1] - P[0][1])) / 2;
    c.globalCompositeOperation = 'lighter';
    // ① 연무 — 열여섯 덩이가 면을 **덮는다.** 겹칠수록 밝아져 결이 생긴다.
    for (let k = 0; k < 16; k++) {
      const h0 = hash(seed * 3.1 + fi * 17.3 + k * 5.7);
      const h1 = hash(seed * 7.9 + fi * 11.1 + k * 13.3);
      const h2 = hash(seed * 13.7 + fi * 3.3 + k * 9.1);
      const ph = swirl * (0.5 + 0.9 * h2) + h0 * 6.283;
      const u = -0.1 + 1.2 * h0 + Math.cos(ph) * 0.10;
      const v = -0.1 + 1.2 * h1 + Math.sin(ph * 0.83) * 0.10;
      const g = rkFaceUV(P, u, v);
      const rr = sz * (0.22 + 0.26 * h2);
      const aa = lit * (0.65 + 0.35 * Math.sin(ph * 1.3));
      fillPoly(c, jagPoly(g[0], g[1], rr, 8, seed + fi * 3.7 + k, 1.15, 1),
        A(T[1], 0.24 * aa));
      fillPoly(c, jagPoly(g[0], g[1], rr * 0.55, 7, seed + fi * 5.3 + k, 1.1, 1),
        A(T[2], 0.20 * aa));
      fillPoly(c, jagPoly(g[0], g[1], rr * 0.22, 6, seed + fi * 9.1 + k, 1, 1),
        A(RK_DM_LIT, 0.30 * aa));
    }
    // ② 가닥 — 얽힌 실. 이것이 「결」이고, 없으면 그냥 안개다.
    c.lineCap = 'round';
    for (let k = 0; k < 12; k++) {
      const h0 = hash(seed * 2.3 + fi * 7.1 + k * 13.7);
      const h1 = hash(seed * 4.1 + fi * 19.3 + k * 5.9);
      const h2 = hash(seed * 8.9 + fi * 2.7 + k * 3.1);
      const ph = swirl * (0.4 + 1.0 * h2) + h0 * 6.283;
      const pts = [];
      for (let i = 0; i <= 4; i++) {
        const uu = -0.05 + 1.1 * h0 + Math.cos(ph + i * 0.8 + h1 * 4) * (0.05 + 0.16 * i / 4);
        const vv = -0.05 + 1.1 * h1 + Math.sin(ph * 1.2 + i * 0.9) * (0.05 + 0.16 * i / 4);
        pts.push(rkFaceUV(P, uu, vv));
      }
      for (const [w, col, av] of [[2.4, T[1], 0.16], [1, T[2], 0.30],
        [0.32, RK_DM_LIT, 0.72]]) {
        c.lineWidth = Math.max(0.4, sz * 0.022) * w;
        c.strokeStyle = A(col, lit * (0.4 + 0.6 * h2) * av);
        c.beginPath();
        pts.forEach((v2, i) => (i ? c.lineTo(v2[0], v2[1]) : c.moveTo(v2[0], v2[1])));
        c.stroke();
      }
    }
    // ③ 어둠 — 빛만 있으면 안개다. 어두운 덩이가 갈라야 소용돌이가 된다.
    c.globalCompositeOperation = 'source-over';
    for (let k = 0; k < 5; k++) {
      const h0 = hash(seed * 6.1 + fi * 23.1 + k * 9.7);
      const h1 = hash(seed * 12.3 + fi * 5.1 + k * 4.3);
      const ph = swirl * (0.6 + 0.5 * h1) + h0 * 6.283;
      const g = rkFaceUV(P, -0.1 + 1.2 * h0 + Math.cos(ph) * 0.12,
        -0.1 + 1.2 * h1 + Math.sin(ph * 0.91) * 0.12);
      fillPoly(c, jagPoly(g[0], g[1], sz * (0.16 + 0.18 * h1), 8,
        seed + fi * 7.7 + k, 1.2, 1), A(RK_DM_DARK, 0.42 + 0.3 * h0));
    }
    // ④ 별 — 있으면 「우주」가 되고 없으면 「연기」다.
    c.globalCompositeOperation = 'lighter';
    for (let k = 0; k < 6; k++) {
      const h0 = hash(seed * 17.3 + fi * 3.9 + k * 5.1);
      const h1 = hash(seed * 19.7 + fi * 13.1 + k * 8.3);
      const g = rkFaceUV(P, 0.06 + 0.88 * h0, 0.06 + 0.88 * h1);
      gHalo(c, g[0], g[1], sz * (0.018 + 0.03 * h0), 'rkDark', lit * (0.4 + 0.5 * h1));
    }
    c.restore();
  };

  // 뒤 면 — 흐리게(앞 면 너머로 비친다), 앞 면 — 세게
  back.forEach((q, i) => nebula(q, i, 0.42));

  // ②-2 **핵** — 레퍼런스의 테서렉트는 가운데가 희게 타오른다. 그 자리가
  //   있어야 「연무가 든 상자」가 아니라 **동력원**이 된다.
  //   ⚠️ 앞 면보다 **먼저** 그린다 — 유리 너머로 비쳐야 속의 것이다.
  //   ⚠️ 원 하나로 두면 스티커다(얼음운석에서 배웠다) — 각진 심을 겹쳐
  //     테두리를 깨뜨린다.
  c.save();
  c.globalCompositeOperation = 'lighter';
  const kr = E * (0.46 + 0.06 * pul);
  const kg = c.createRadialGradient(0, 0, 0, 0, 0, kr * 1.7);
  kg.addColorStop(0, A('#FFFFFF', 0.55 * pul));
  kg.addColorStop(0.22, A(RK_DM_LIT, 0.36 * pul));
  kg.addColorStop(0.6, A(T[1], 0.16 * pul));
  kg.addColorStop(1, A(T[1], 0));
  c.fillStyle = kg;
  c.beginPath();
  c.arc(0, 0, kr * 1.7, 0, Math.PI * 2);
  c.fill();
  for (let k = 0; k < 3; k++) {
    const ph = t * 0.7 + seed + k * 2.1;
    fillPoly(c, jagPoly(0, 0, kr * (0.44 + 0.1 * Math.sin(ph)), 7,
      seed + k * 4.3, 1.25, 1), A(RK_DM_LIT, 0.24));
    fillPoly(c, jagPoly(0, 0, kr * (0.22 + 0.05 * Math.sin(ph * 1.3)), 6,
      seed + k * 8.1, 1.15, 1), A('#FFFFFF', 0.30));
  }
  c.restore();

  // ③ 유리 앞면 — **반투명.** 소용돌이가 이 너머로 비친다. 면마다 한 단씩.
  front.forEach((q, i) => {
    nebula(q, i + 3, 1);
    trace(q.p, 0.045);
    // ⚠️⚠️ **면이 비면 와이어프레임이다.** 알파 0.1 로 두니 「연필로 그린
    //   상자」로 읽혔다 — 유리도 **몸이 있다.**
    // ⭐ 기운 면일수록 유리가 **두꺼워** 더 뿌옇다(정면이 제일 맑다). 그래서
    //   두께가 곧 계조가 되고, 얼음운석이 창을 뚫던 그 문법과 같아진다.
    // ⚠️⚠️ 여기서 두 번 뒤집혔다. 면을 비우면 와이어프레임, 채우면 속이
    //   안 보인다 — **답은 면이 아니라 속이다.** 레퍼런스의 유리는 거의
    //   투명한데도 덩어리로 보인다. 속이 꽉 차서 밝기 때문이다.
    //   ⇒ 유리는 **얇게**, 기운 면만 조금 더 뿌옇게(두께).
    const dth = 1 - q.dep;                       // 기운 정도 = 유리 두께
    c.fillStyle = A(RK_DM_GLASS[Math.min(3, Math.floor(dth * 4))],
      0.07 + 0.40 * dth);
    c.fill();
    // 굴절선 — **곧다.** 단단한 결정은 곧게 쪼개진다. 면 안에 갇힌다.
    c.save();
    trace(q.p, 0.045);
    c.clip();
    const ct = [(q.p[0][0] + q.p[2][0]) / 2, (q.p[0][1] + q.p[2][1]) / 2];
    for (let k = 0; k < 2; k++) {
      const h0 = hash(seed * 7.1 + i * 3.3 + k * 11.9);
      const a0 = q.p[k], b0 = q.p[(k + 2) % 4];
      const g0 = [a0[0] + (b0[0] - a0[0]) * (0.2 + 0.6 * h0),
        a0[1] + (b0[1] - a0[1]) * (0.2 + 0.6 * h0)];
      const d0 = [ct[0] + (q.p[(k + 1) % 4][0] - ct[0]) * 2.2,
        ct[1] + (q.p[(k + 1) % 4][1] - ct[1]) * 2.2];
      c.strokeStyle = A(RK_DM_LIT, 0.10 + 0.14 * q.dep);
      c.lineWidth = Math.max(0.6, E * 0.028);
      c.beginPath();
      c.moveTo(g0[0], g0[1]);
      c.lineTo(d0[0], d0[1]);
      c.stroke();
    }
    c.restore();
  });

  // ③-2 **핵 겉불꽃** — 빛은 유리에 갇히지 않는다. 앞 면까지 다 그린 뒤
  //   한 번 더 가산으로 얹어야 「속에서 타오르는 것」이 된다. 뒤에만 두면
  //   유리 두께에 먹혀 사라진다.
  c.save();
  c.globalCompositeOperation = 'lighter';
  const bg = c.createRadialGradient(0, 0, 0, 0, 0, E * 1.15);
  bg.addColorStop(0, A('#FFFFFF', 0.42 * pul));
  bg.addColorStop(0.18, A(RK_DM_LIT, 0.30 * pul));
  bg.addColorStop(0.55, A(T[1], 0.12 * pul));
  bg.addColorStop(1, A(T[1], 0));
  c.fillStyle = bg;
  c.beginPath();
  c.arc(0, 0, E * 1.15, 0, Math.PI * 2);
  c.fill();
  // 심 — 각진 흰 덩이. 원 하나로 두면 스티커다.
  for (let k = 0; k < 2; k++) {
    const ph = t * 0.8 + seed + k * 2.4;
    fillPoly(c, jagPoly(0, 0, E * (0.20 + 0.05 * Math.sin(ph)), 7,
      seed + k * 6.1, 1.3, 1), A(RK_DM_LIT, 0.34));
    fillPoly(c, jagPoly(0, 0, E * (0.10 + 0.03 * Math.sin(ph * 1.4)), 6,
      seed + k * 9.3, 1.2, 1), A('#FFFFFF', 0.45));
  }
  c.restore();

  // ④ 모서리 — 빛나는 앞날. 뒤 모서리도 흐리게 비친다(단단한 유리의 표시).
  const edge = (q, isFront) => {
    const al = isFront ? 0.62 + 0.38 * q.dep : 0.13 + 0.12 * (1 + q.dep);
    const lw = Math.max(1.0, E * 0.07) * (isFront ? 1 : 0.5);
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.lineJoin = 'round';
    c.lineCap = 'round';
    // ⚠️ 심을 가늘고 밝게 — 앞날이 **날**로 읽혀야 각진 결정이다(굵으면 관).
    for (const [k, col, av] of [[3.2, T[1], 0.16], [1, T[2], 0.46],
      [0.26, RK_DM_LIT, 1]]) {
      trace(q.p, 0.045);
      c.lineWidth = lw * k;
      c.strokeStyle = A(col, al * av);
      c.stroke();
    }
    c.restore();
  };
  back.forEach(q => edge(q, false));
  front.forEach(q => edge(q, true));
  c.restore();
}


/* ── 볼록 다면체 하나 — **반공간 교집합** ─────────────────────────────────
   ⚠️⚠️ **정육면체를 여러 개 붙이는 것을 그만둔다.** 붙여 놓으면 큐브마다
     제 실루엣과 제 면이 있어서, 아무리 이음매를 지우고 계조를 낮춰도
     **겹친 선이 보인다** — 그건 렌더링으로 가리는 꼼수이지 하나의 객체가
     아니다(2026-08-20 사용자 지적).

   ⭐ 진짜 하나로 만드는 법은 **애초에 면을 하나만 두는 것**이다.
     큰 정육면체를 여러 평면으로 **깎아** 남은 볼록 덩이를 쓴다:
       · 안쪽 면이 **존재하지 않는다** — 지울 이음매가 없다
       · 앞면들이 실루엣을 **빈틈없이 한 번씩** 덮는다(볼록의 성질)
       · 깎는 평면의 거리·기울기를 씨앗으로 흔들면 결정마다 꼴이 다르다   */

/// 다각형 하나를 평면(n·v ≤ d)으로 자른다. 잘린 자리의 선분도 돌려준다.
function rkClipPoly(P, n, d) {
  const out = [], cut = [];
  const dist = (v) => v[0] * n[0] + v[1] * n[1] + v[2] * n[2] - d;
  for (let i = 0; i < P.length; i++) {
    const a = P[i], b = P[(i + 1) % P.length];
    const da = dist(a), db = dist(b);
    if (da <= 0) out.push(a);
    if ((da < 0 && db > 0) || (da > 0 && db < 0)) {
      const s = da / (da - db);
      const m = [a[0] + (b[0] - a[0]) * s, a[1] + (b[1] - a[1]) * s,
        a[2] + (b[2] - a[2]) * s];
      out.push(m);
      cut.push(m);
    }
  }
  return { poly: out, cut };
}

/// 잘린 점들로 **뚜껑 한 장**을 만든다.
///
/// ⚠️ 끝점을 이어 붙이는 방식은 부동소수 오차 하나에 고리가 끊겨 **면이
///   통째로 사라진다**(실제로 조각조각 깨졌다). 볼록 덩이의 단면은 볼록
///   이므로, 평면 위에서 **무게중심 기준 각도로 정렬**하는 편이 안전하다.
function rkCapFace(pts, n) {
  if (pts.length < 3) return null;
  // 중복 제거
  const P = [];
  for (const v of pts) {
    let dup = false;
    for (const w of P) {
      if (Math.abs(v[0] - w[0]) < 1e-6 && Math.abs(v[1] - w[1]) < 1e-6 &&
        Math.abs(v[2] - w[2]) < 1e-6) { dup = true; break; }
    }
    if (!dup) P.push(v);
  }
  if (P.length < 3) return null;
  const ct = [0, 0, 0];
  P.forEach(v => { ct[0] += v[0]; ct[1] += v[1]; ct[2] += v[2]; });
  ct[0] /= P.length; ct[1] /= P.length; ct[2] /= P.length;
  // 평면 위의 직교기저
  let ax = [1, 0, 0];
  if (Math.abs(n[0]) > 0.9) ax = [0, 1, 0];
  let ux = ax[1] * n[2] - ax[2] * n[1];
  let uy = ax[2] * n[0] - ax[0] * n[2];
  let uz = ax[0] * n[1] - ax[1] * n[0];
  const ul = Math.hypot(ux, uy, uz) || 1;
  ux /= ul; uy /= ul; uz /= ul;
  const vx = n[1] * uz - n[2] * uy;
  const vy = n[2] * ux - n[0] * uz;
  const vz = n[0] * uy - n[1] * ux;
  return P.map(q => {
    const dx = q[0] - ct[0], dy = q[1] - ct[1], dz = q[2] - ct[2];
    return { q, a: Math.atan2(dx * vx + dy * vy + dz * vz,
      dx * ux + dy * uy + dz * uz) };
  }).sort((a, b) => a.a - b.a).map(o => o.q);
}

/// 씨앗마다 다른 **깎은 결정 하나.** 돌려주는 것은 면 목록뿐이고,
/// 안쪽 면은 애초에 없다.
function rkCrystal(seed) {
  // 시작 — 정육면체 여섯 면(바깥에서 볼 때 반시계)
  const V = RK_CV.map(v => [v[0], v[1], v[2]]);
  let faces = RK_CF.map(f => f.map(i => V[i].slice()));

  const planes = [];
  // ① 축 여섯 — 면마다 조금씩 다른 거리로 밀어 **직육면체를 비뚤게** 만든다
  [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]]
    .forEach((n, i) => planes.push([n, 0.74 + 0.30 * hash(seed * 3.1 + i)]));
  // ② 모서리 열둘 — 45° 로 깎아 **각진 띠**를 낸다
  const E = [[1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
    [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
    [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1]];
  E.forEach((e, i) => {
    const L = Math.hypot(e[0], e[1], e[2]);
    planes.push([[e[0] / L, e[1] / L, e[2] / L],
      0.86 + 0.34 * hash(seed * 5.7 + i * 1.3)]);
  });
  // ③ 꼭짓점 여덟 — 셋 중 몇 개만 깎아 **꼴이 매번 다르게**
  const C = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
    [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
  C.forEach((v, i) => {
    if (hash(seed * 11.3 + i * 2.7) > 0.55) return;   // 안 깎고 남기는 것도 있다
    const L = Math.sqrt(3);
    planes.push([[v[0] / L, v[1] / L, v[2] / L],
      0.80 + 0.36 * hash(seed * 7.9 + i)]);
  });

  for (const [n, d] of planes) {
    const next = [], segs = [];
    for (const f of faces) {
      const { poly, cut } = rkClipPoly(f, n, d);
      if (poly.length >= 3) next.push(poly);
      cut.forEach(q => segs.push(q));
    }
    const cap = rkCapFace(segs, n);
    if (cap) next.push(cap);
    faces = next;
    if (!faces.length) break;
  }
  return faces;
}

/// 다면체를 돌려 **앞면만** 화면 좌표로. `rkCubeFaces` 와 같은 계약이다.
function rkSolidProject(faces, s, yaw, pitch) {
  const cy0 = Math.cos(yaw), sy0 = Math.sin(yaw);
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const rot = (v) => {
    const x1 = v[0] * cy0 - v[2] * sy0, z1 = v[0] * sy0 + v[2] * cy0;
    const y1 = v[1] * cp - z1 * sp, z2 = v[1] * sp + z1 * cp;
    return [x1 * s, y1 * s, z2 * s];
  };
  const out = [];
  for (const f of faces) {
    const R = f.map(rot);
    // ⚠️ **감김에 기대지 않는다.** 깎아 만든 면은 감김이 제각각이라 부호로
    //   앞뒤를 가리면 엉뚱한 면이 사라진다(조각조각 깨졌던 원인).
    //   ⇒ 얼음운석(`rkSolidFaces`)이 쓰는 그 방법 — 법선을 구한 뒤
    //     **무게중심에서 바깥을 보도록** 뒤집는다.
    const a = R[0], b = R[1], d = R[R.length - 1];
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
    const wx = d[0] - a[0], wy = d[1] - a[1], wz = d[2] - a[2];
    let nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
    const L = Math.hypot(nx, ny, nz);
    if (L < 1e-9) continue;
    nx /= L; ny /= L; nz /= L;
    let cx = 0, cy2 = 0, cz = 0;
    for (const q of R) { cx += q[0]; cy2 += q[1]; cz += q[2]; }
    cx /= R.length; cy2 /= R.length; cz /= R.length;
    if (nx * cx + ny * cy2 + nz * cz < 0) { nx = -nx; ny = -ny; nz = -nz; }
    // ⭐ **뒷면도 돌려준다.** 투명한 결정은 뒤가 비쳐야 결정이다 — 앞면만
    //   그리면 아무리 칠해도 「종이 모형」이다. 부르는 쪽이 `front` 로 고른다.
    out.push({
      p: R.map(q => [q[0], q[1]]),
      z: cz,
      front: nz > 0,
      lam: Math.max(0, nx * RK_L3[0] + ny * RK_L3[1] + nz * RK_L3[2]),
    });
  }
  out.sort((a, b) => a.z - b.z);
  return out;
}


/* ── 자란 결정 — **복셀에서 표면만 뽑은 단일 메시** ───────────────────────
   ⚠️⚠️ **정육면체를 여러 개 그리는 것을 구조적으로 막는다.** 붙여 그리면
     큐브마다 제 면과 제 실루엣이 있어 **겹친 선**이 보이고, 그걸 가리려고
     이음매를 지우거나 계조를 낮추는 것은 전부 꼼수였다(사용자 지적).
     볼록으로 깎아도 봤지만 그건 「깎은 조약돌」이지 자란 결정이 아니다.

   ⭐ 답은 **면을 애초에 안 만드는 것**이다:
     ① 덩이 몇 개를 **복셀 격자**에 채운다(축 정렬이라 오차가 없다)
     ② **빈 칸과 맞닿은 면만** 내보낸다 — 채워진 칸끼리의 면은 **생성조차
        안 되므로** 안쪽 면이 존재할 수 없다
     ③ 같은 평면의 이웃 면은 **직사각형으로 병합**한다(그리디 메싱) —
        면 수가 줄고, 남는 이음매도 함께 사라진다
   ⇒ 「하나의 객체」가 렌더링이 아니라 **자료구조**로 보장된다.          */

/// 격자 한 변. 크면 결이 잘아지고 작으면 뭉툭해진다.
const RK_VOX_N = 9;

/// 씨앗으로 채운 복셀 덩어리. 반환은 `(x,y,z)→bool` 배열.
///
/// ⚠️⚠️ **곁가지를 멀리 붙이면 L 자·구멍 난 꼴이 나온다.** 몸에서 떨어진
///   덩이는 「부서진 것」으로 읽히고, 깊은 홈은 「구멍 뚫린 상자」가 된다.
///   ⭐ 원본(소금 결정)은 **뭉툭한 한 덩이에 계단이 진** 모양이다 — 그래서
///     ① 몸을 크게 채우고 ② 겉을 **한두 칸씩만** 깎거나 붙인다. 그 얕은
///     단차가 곧 「자란 결정」의 결이다.
function rkVoxFill(seed) {
  const N = RK_VOX_N, g = new Uint8Array(N * N * N);
  const at = (x, y, z) => x * N * N + y * N + z;
  const box = (cx, cy, cz, hx, hy, hz, v) => {
    for (let x = Math.max(0, cx - hx); x <= Math.min(N - 1, cx + hx); x++)
      for (let y = Math.max(0, cy - hy); y <= Math.min(N - 1, cy + hy); y++)
        for (let z = Math.max(0, cz - hz); z <= Math.min(N - 1, cz + hz); z++)
          g[at(x, y, z)] = v;
  };
  const m = (N - 1) / 2;
  // ① 몸 — 축마다 두께가 **제각각**이라야 정육면체로 안 읽힌다.
  //   ⚠️ 셋을 같게 두면 아무리 깎아도 「모서리 자른 상자」다.
  const bx = 2 + Math.round(hash(seed * 3.1));
  const by = 2 + Math.round(hash(seed * 5.3));
  const bz = 2 + Math.round(hash(seed * 7.7));
  box(m, m, m, bx, by, bz, 1);

  // ② 계단 — ⭐ **깊이가 여러 단이라야 「기암」이다.** 한 깊이로만 깎으면
  //   면이 하나 더 생길 뿐이고, 1칸·2칸이 섞여야 층이 진다.
  const C = [[-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1]];
  C.forEach((v, i) => {
    const r0 = hash(seed * 11.3 + i * 2.7);
    if (r0 > 0.72) return;                       // 안 깎고 남기는 것도 있다
    const h = r0 < 0.30 ? 2 : 1;                 // **깊이 두 단**
    box(m + v[0] * bx, m + v[1] * by, m + v[2] * bz, h, h, h, 0);
  });

  // ③ 모서리 턱 — 모서리 가운데를 **한 칸**만 저며 낸다. 이 얕은 턱이
  //   층을 잇는 계단참이 된다(꼭짓점만 깎으면 「깎은 주사위」다).
  const EDG = [[1, 1, 0], [1, -1, 0], [-1, 1, 0], [-1, -1, 0],
    [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1],
    [1, 0, 1], [1, 0, -1], [-1, 0, 1], [-1, 0, -1]];
  EDG.forEach((v, i) => {
    if (hash(seed * 19.7 + i * 3.9) > 0.34) return;
    box(m + v[0] * bx, m + v[1] * by, m + v[2] * bz, 1, 1, 1, 0);
  });

  // ④ 돋은 단 — 겉면에 **한 칸 두께**로 얹는다. 파낸 것과 돋은 것이 섞여야
  //   「자라다 만 결정」이 된다.
  const n = 2 + Math.floor(hash(seed * 17.9) * 3);
  for (let i = 0; i < n; i++) {
    const ax = Math.floor(hash(seed * 19.1 + i * 2.3) * 3);
    const dir = hash(seed * 23.3 + i * 3.1) > 0.5 ? 1 : -1;
    const hb = [bx, by, bz];
    const p = [m, m, m];
    p[ax] = m + dir * hb[ax];
    p[(ax + 1) % 3] = m + Math.round((hash(seed * 29.1 + i) - 0.5) * 3);
    p[(ax + 2) % 3] = m + Math.round((hash(seed * 31.7 + i) - 0.5) * 3);
    const w2 = 1 + (hash(seed * 37.3 + i) > 0.5 ? 1 : 0);
    const hv = [w2, w2, w2];
    hv[ax] = 1;                                  // **한 칸 두께** — 계단이다
    box(p[0], p[1], p[2], hv[0], hv[1], hv[2], 1);
  }
  return g;
}

/// 복셀 덩어리의 **겉면만** 사각형으로 뽑는다(그리디 병합 포함).
///
/// ⭐ 채워진 칸끼리 맞닿은 자리는 아예 안 만든다 — 여기가 「안쪽 면이
///   없다」의 정체다.
function rkVoxSurface(g) {
  const N = RK_VOX_N, at = (x, y, z) => x * N * N + y * N + z;
  const on = (x, y, z) => x >= 0 && y >= 0 && z >= 0 && x < N && y < N &&
    z < N && g[at(x, y, z)] === 1;
  const faces = [];
  // 축 셋 × 앞뒤 둘
  for (let ax = 0; ax < 3; ax++) {
    const u = (ax + 1) % 3, v = (ax + 2) % 3;
    for (let dir = -1; dir <= 1; dir += 2) {
      for (let w = 0; w < N; w++) {
        // 이 슬라이스에서 내보낼 면의 2차원 마스크
        const mask = new Uint8Array(N * N);
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
          const p = [0, 0, 0];
          p[ax] = w; p[u] = i; p[v] = j;
          if (!on(p[0], p[1], p[2])) continue;
          const q = p.slice();
          q[ax] = w + dir;
          if (on(q[0], q[1], q[2])) continue;     // 이웃이 차 있으면 **안 만든다**
          mask[i * N + j] = 1;
        }
        // 그리디 — 가로로 늘리고 세로로 늘린다
        for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
          if (!mask[i * N + j]) continue;
          let jw = 1;
          while (j + jw < N && mask[i * N + j + jw]) jw++;
          let ih = 1;
          outer: while (i + ih < N) {
            for (let k = 0; k < jw; k++) {
              if (!mask[(i + ih) * N + j + k]) break outer;
            }
            ih++;
          }
          for (let a = 0; a < ih; a++) for (let b = 0; b < jw; b++) {
            mask[(i + a) * N + j + b] = 0;
          }
          // 사각형 네 꼭짓점 — 격자 좌표를 [-1,1] 로
          const s0 = 2 / N, o0 = -1;
          const face = [[0, 0], [0, jw], [ih, jw], [ih, 0]].map(([da, db]) => {
            const p = [0, 0, 0];
            p[ax] = o0 + (w + (dir > 0 ? 1 : 0)) * s0;
            p[u] = o0 + (i + da) * s0;
            p[v] = o0 + (j + db) * s0;
            return p;
          });
          faces.push(face);
        }
      }
    }
  }
  return faces;
}

/// 면에 **고대문자를 새긴다.**
///
/// ⭐ 저장소가 이미 적어 둔 규약을 따른다(`IBrune` 의 잔글씨 띠):
///   > 「글씨가 빼곡하다」는 인상은 **눈금 길이가 제각각**일 때만 난다
///   > (같으면 톱니바퀴가 된다).
///   ⇒ 획 길이·가지 수·자간을 전부 흔든다. 규칙이 보이면 문자가 아니라 무늬다.
///
/// ⭐ **새김은 두 획이다** — 광원 반대쪽에 **어두운 골**, 광원 쪽에 **밝은 날**.
///   한 획만 그으면 「그린 것」이고, 두 획이라야 「파낸 것」이 된다.
///
/// [P] 는 면의 네 꼭짓점. 글자는 **면 로컬 좌표**로 놓아 면과 같이 돈다.
function rkGlyphs(c, P, seed, s, a, pul) {
  const o = P[0];
  const e1 = [P[1][0] - o[0], P[1][1] - o[1]];
  const e2 = [P[3][0] - o[0], P[3][1] - o[1]];
  const w = Math.hypot(e1[0], e1[1]), h = Math.hypot(e2[0], e2[1]);
  if (w < 8 || h < 8) return;                    // 너무 작으면 얼룩이 된다
  const at = (u, v) => [o[0] + e1[0] * u + e2[0] * v,
    o[1] + e1[1] * u + e2[1] * v];
  const rows = Math.max(1, Math.min(4, Math.round(h / (s * 0.30))));
  const dep = Math.max(0.6, s * 0.016);          // 골의 깊이(획 간격)
  c.save();
  c.beginPath();
  P.forEach((q, j) => (j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
  c.closePath();
  c.clip();
  c.lineCap = 'round';
  c.lineJoin = 'round';
  for (let r = 0; r < rows; r++) {
    const v0 = (r + 0.5) / rows;
    let u = 0.10 + 0.10 * hash(seed + r * 7.3);
    let g = 0;
    while (u < 0.90 && g < 9) {
      const hh = hash(seed * 3.1 + r * 11.7 + g * 5.3);
      const h2 = hash(seed * 5.9 + r * 3.3 + g * 13.1);
      const gw = 0.045 + 0.045 * hh;             // 글자 폭 — 제각각
      const gh = 0.16 + 0.16 * h2;               // 글자 높이 — 제각각
      const seg = [];
      // 기둥
      seg.push([[u, v0 - gh / 2], [u, v0 + gh / 2]]);
      // 가지 둘~셋, 길이·높이 제각각
      const nb = 2 + (hash(seed * 7.7 + r + g) > 0.55 ? 1 : 0);
      for (let b = 0; b < nb; b++) {
        const bh = hash(seed * 17.3 + r * 2.1 + g * 3.7 + b * 9.1);
        const bl = 0.35 + 0.65 * hash(seed * 19.7 + g * 2.3 + b);
        const y = v0 - gh / 2 + gh * (0.18 + 0.64 * bh);
        const dir = hash(seed * 23.1 + g + b * 4.4) > 0.5 ? 1 : -1;
        seg.push([[u, y], [u + gw * bl * dir, y - gh * 0.20 * dir]]);
      }
      /// 획 한 벌을 그린다 — [off] 만큼 밀고, [lw] 굵기로.
      const strokeSeg = (off, lw, col, al, add) => {
        c.save();
        if (add) c.globalCompositeOperation = 'lighter';
        c.strokeStyle = A(col, al);
        c.lineWidth = lw;
        c.lineCap = 'round';
        c.lineJoin = 'round';
        c.beginPath();
        seg.forEach(([p0, p1]) => {
          const q0 = at(p0[0], p0[1]), q1 = at(p1[0], p1[1]);
          c.moveTo(q0[0] + RK_LX * off, q0[1] + RK_LY * off);
          c.lineTo(q1[0] + RK_LX * off, q1[1] + RK_LY * off);
        });
        c.stroke();
        c.restore();
      };
      const lw = Math.max(0.55, s * 0.017);
      // ① 파낸 것 — 어두운 골 → 밝은 날. 두 획이라야 「파냈다」가 된다.
      // ⭐ **날은 흰색이 아니라 금빛이다**(2026-08-24 레퍼런스 102 의 금테).
      //   흰 날은 면 색을 지워 결정을 **회백색 석영**으로 만들었다 — 새김이
      //   금빛이면 같은 획이 「빛의 결정에 새긴 문자」로 읽히고, 몸의 흰빛·
      //   남보라는 제 색으로 남는다.
      strokeSeg(dep, lw, RK_LM_GROOVE, 0.9 * a, false);
      strokeSeg(-dep * 0.7, lw, TONE.rkLumenWarm[2], 0.46 * a, true);
      // ② ⭐ **글자만 은은하게 탄다.** 빛의 결정이니 새긴 자리에서 빛이 배어
      //   나온다 — 넓고 옅게 번지고, 골 자리에 가는 심이 선다.
      //   ⚠️ 세게 두면 네온 간판이다. 「배어 나온다」가 상한이다.
      strokeSeg(dep, lw * 3.6, TONE.rkLumenWarm[1], 0.22 * a * pul, true);
      strokeSeg(dep, lw * 1.6, TONE.rkLumenWarm[2], 0.30 * a * pul, true);
      strokeSeg(dep, lw * 0.5, '#FFF8E6', 0.40 * a * pul, true);
      u += gw + 0.035 + 0.045 * hash(seed * 29.3 + r + g);   // 자간도 제각각
      g++;
    }
  }
  c.restore();
}

/// 씨앗별로 한 번만 깎는다 — 매 프레임 깎으면 비싸고, 꼴이 흔들린다.
const RK_CRY = {};
function rkCrystalOf(seed) {
  const k = Math.round(seed * 100);
  let e = RK_CRY[k];
  if (!e) {
    const faces = rkVoxSurface(rkVoxFill(seed));
    // **보이는 반지름**으로 정규화 — 엔진 `gemSizeOf` 와 같은 계약이다.
    let m = 0;
    for (const f of faces) for (const v of f) {
      const d = Math.hypot(v[0], v[1], v[2]);
      if (d > m) m = d;
    }
    m = m || 1;
    e = RK_CRY[k] = faces.map(f => f.map(v => [v[0] / m, v[1] / m, v[2] / m]));
  }
  return e;
}

/// 빛의 결정 — **깎아 낸 단단한 결정 하나.**
///
/// ⚠️⚠️ 정육면체를 일곱 개 붙여 쓰다가 버렸다. 붙여 놓으면 큐브마다 제
///   실루엣과 제 면이 있어서 **겹친 선이 보이고**, 그걸 가리려고 이음매를
///   지우고 계조를 낮추는 것은 전부 **꼼수**였다 — 구조가 하나가 아니면
///   하나로 안 보인다(사용자 지적, 2026-08-20).
///
/// ⭐ 이제 **면이 하나짜리 볼록 다면체**다(`rkCrystal`). 안쪽 면이 애초에
///   없으므로 지울 이음매도 없고, 앞면들이 실루엣을 **빈틈없이 한 번씩**
///   덮는다. 「하나의 객체」가 렌더링이 아니라 **기하로** 보장된다.
function rkLumen(c, x, y, s, seed, t) {
  const F = rkCrystalOf(seed);
  const bob = Math.sin(t * 0.8 + seed) * s * 0.08;
  const pul = 0.74 + 0.26 * (0.5 + 0.5 * Math.sin(t * 1.9 + seed));
  const all = rkSolidProject(F, s, t * 0.5 + seed, 0.42);
  if (!all.length) return;
  const T = TONE.rkLumen;
  c.save();
  c.translate(x, y + bob);

  // ⚠️ 반경을 넓게 두면 빛이 **덩이에서 떨어져** 뒤에 깔린 원처럼 보인다.
  //   배어 나오는 것이라 몸에 붙어 있어야 한다 — 좁게.
  // ⚠️⚠️ **흰 후광은 몸을 통과해 몸을 지운다.** 앞면 알파가 1 이 아니라
  //   뒤에 깐 흰빛이 그대로 비쳐, 면 색을 아무리 갈라 놔도 화면에서는 흰
  //   덩이 하나로 뭉쳤다(2026-08-24). ⇒ 흰 후광은 낮추고 **금빛 쪽을 남긴다** —
  //   덩이 뒤가 따뜻해야 몸의 흰빛·남보라가 그 위에서 제 색으로 읽힌다.
  rkAura(c, 0, 0, s * 1.55, 'rkLumen', 0.10 * pul);
  rkAura(c, 0, 0, s * 1.32, 'rkLumenWarm', 0.70 * pul);

  const unionPath = () => {
    c.beginPath();
    all.forEach(f => {
      f.p.forEach((q, j) => (j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.closePath();
    });
  };

  const front = all.filter(f => f.front), back = all.filter(f => !f.front);
  if (!front.length) { c.restore(); return; }
  const uni = () => {
    c.beginPath();
    front.forEach(f => {
      f.p.forEach((q, j) => (j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.closePath();
    });
  };

  /// 면 한 장 — 밝기 [a] 로. 결정은 한 면 안에서 **색이** 흐른다.
  ///
  /// ⭐⭐ **색을 정하는 것은 `lam` 이지 자리가 아니다.** 그늘 면(u=0)은 흰빛을
  ///   아예 안 받고 남보라가 통째로 덮으며, 빛 면(u=1)은 그 반대다 — 그래서
  ///   이웃한 두 면이 서로 **다른 색**이 된다(레퍼런스의 로우폴리 분할).
  ///   밝기만 흔들던 옛 값은 두 면이 「같은 흰색의 농담」이라 뭉쳐 보였다.
  const facet = (f, a, edge) => {
    // 빛 받는 정도를 0~1 로 편다 — 램버트 값이 0.2~0.9 에 몰려 있어 그대로
    // 쓰면 양 끝(순백·짙은 남보라)에 아무 면도 안 닿는다.
    const u = Math.max(0, Math.min(1, (f.lam - 0.28) / 0.46));
    let mnx = 1e9, mny = 1e9, mxx = -1e9, mxy = -1e9;
    f.p.forEach(q => {
      if (q[0] < mnx) mnx = q[0];
      if (q[0] > mxx) mxx = q[0];
      if (q[1] < mny) mny = q[1];
      if (q[1] > mxy) mxy = q[1];
    });
    const gr = c.createLinearGradient(mnx, mny, mxx, mxy);
    // ⚠️ 흰빛을 **앞쪽 35% 에만** 둔다. 양 끝에만 두면 면 절반이 회백색으로
    //   비고, 그 회백색이 곧 「석영」이었다 — 남보라가 면의 3분의 2 를 덮어야
    //   결정이 제 색을 가진다.
    gr.addColorStop(0, A('#FFFFFF', a * 1.10 * u));
    gr.addColorStop(0.35, A('#FFFFFF', a * 0.44 * u));
    gr.addColorStop(1, A(RK_LM_SHADE, a * (1.30 - 0.72 * u)));
    fillPoly(c, f.p, gr);
    if (edge <= 0) return;
    // ⭐⭐ **금빛 앞날**(레퍼런스 102 의 금테). 옛 값은 밝은 면에서만 살짝
    //   따뜻했고 나머지는 흰 선이라, 결정이 **테두리 없는 유리 덩이**로
    //   보였다. 금테는 두 겹이다 — 넓고 옅은 번짐 위에 좁고 밝은 심.
    //   ⚠️ 흰 선으로 두르면 서리고, 굵게 두르면 **금박 상자**다.
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.lineJoin = 'round';
    const rim = (w, col, al) => {
      c.beginPath();
      f.p.forEach((q, j) => (j ? c.lineTo(q[0], q[1]) : c.moveTo(q[0], q[1])));
      c.closePath();
      c.lineWidth = Math.max(0.5, s * w);
      c.strokeStyle = A(col, al);
      c.stroke();
    };
    // ⚠️⚠️ **모든 면에 테를 두르면 철망이다**(이 파일이 이미 적어 둔 함정).
    //   실측으로 굽는 반지름 38 에서 앞면 25~29장 · 면 짧은변 **중앙 5px** 이라,
    //   면마다 테를 두르면 화면의 대부분이 **테**가 되어 덩이가 통째로 하얘진다 —
    //   그것이 「석영」의 정체였다. ⇒ 테는 **빛 받는 면에만**(lam 가중 0.44/0.82),
    //   그늘 면은 남보라 면 자체로 남긴다.
    // ⚠️ **금테는 [1] 로 긋는다.** [2](#FFF6E0)는 가산으로 얹으면 곧바로
    //   흰색으로 포화해 「흰 철망」이 된다 — 레퍼런스의 금테는 **금색**이라야
    //   금테다.
    rim(0.034, TONE.rkLumenWarm[0], edge * (0.08 + 0.44 * f.lam));
    rim(0.013, TONE.rkLumenWarm[1], edge * (0.08 + 0.82 * f.lam));
    c.restore();
  };

  // ⓪ 속 — 유리의 두께. 뒤가 비치되 배경이 그대로 보이면 안 된다.
  uni();
  c.fillStyle = A(RK_LM_DEEP, 0.62);
  c.fill();

  // ① 뒷면 — ⭐ **이것이 결정과 종이 모형을 가른다.** 뒤 절단면이 앞으로
  //   비쳐야 「속이 있는 투명한 것」이 된다. 흐리게.
  // ⚠️ 뒤 절단면을 세게 그리면 **철망·도면**이 된다. 있는 듯 없는 듯만.
  back.forEach(f => facet(f, 0.07, 0.09));

  // ② 앞면 — 반투명. 뒤가 이 사이로 비친다.
  front.forEach(f => {
    facet(f, 0.62, 1);
    // ⭐ **고대문자를 새긴다.** 뒤 선을 지운 자리를 이것이 채운다 — 표면에
    //   읽을 것이 있어야 「결정」이지, 비어 있으면 유리 상자다.
    rkGlyphs(c, f.p, seed * 13.1 + f.z, s, 0.28 + 0.42 * f.lam, pul);
  });

  // ③ 섬광 — 제일 밝은 면 **하나**만 하얗게 탄다. 여럿이면 번들거림이다.
  const hot = front.reduce((a, b) => (a.lam > b.lam ? a : b), front[0]);
  if (hot && hot.lam > 0.55) {
    const ct = [0, 0];
    hot.p.forEach(q => { ct[0] += q[0]; ct[1] += q[1]; });
    ct[0] /= hot.p.length; ct[1] /= hot.p.length;
    c.save();
    c.globalCompositeOperation = 'lighter';
    fillPoly(c, hot.p.map(q => [ct[0] + (q[0] - ct[0]) * 0.6,
      ct[1] + (q[1] - ct[1]) * 0.6]), A('#FFF3D8', 0.34 * pul));
    c.restore();
  }

  // ④ 속빛 — 빛의 결정이라 안쪽이 환하다.
  // ⚠️⚠️ **이 한 겹이 결정을 석영으로 만들고 있었다**(2026-08-24). 실루엣
  //   전체를 흰 가산으로 덮으니 어렵게 칠한 면 색이 통째로 흰색으로 포화됐다 —
  //   화면에 남는 것은 「빛나는 흰 상자」였다. ⇒ 흰 심을 절반 아래로 줄이고
  //   **금빛 쪽으로 옮긴다.** 「안이 환하다」는 흰색이 아니라 **따뜻함**으로도
  //   난다(속빛은 새김빛과 같은 금빛 마스크에 살므로 색이 이미 그쪽이다).
  c.save();
  uni();
  c.clip();
  c.globalCompositeOperation = 'lighter';
  const ig = c.createRadialGradient(-s * 0.15, -s * 0.15, 0, 0, 0, s * 0.92);
  ig.addColorStop(0, A('#FFFFFF', 0.11 * pul));
  ig.addColorStop(0.30, A(TONE.rkLumenWarm[2], 0.15 * pul));
  ig.addColorStop(0.65, A(TONE.rkLumenWarm[1], 0.13 * pul));
  ig.addColorStop(1, A(TONE.rkLumenWarm[1], 0));
  c.fillStyle = ig;
  c.fillRect(-s * 2, -s * 2, s * 4, s * 4);
  c.restore();

  // ⑤ 반짝임 — ⭐ **「빛의」 결정이다.** 표면 여기저기서 별이 떴다 진다.
  //   ⚠️ 한꺼번에 켜지면 깜빡이는 전구다 — 자리마다 **위상을 어긋내** 늘
  //     어딘가는 켜져 있고 어딘가는 꺼져 있게 한다.
  //   ⚠️ 그리고 자리는 **면 위**라야 한다. 화면 좌표에 뿌리면 덩이가 도는데
  //     반짝임은 제자리라 「유리에 붙인 먼지」가 된다.
  const NSPK = 7;
  for (let k = 0; k < NSPK; k++) {
    const f = front[Math.floor(hash(seed * 3.7 + k * 5.1) * front.length)];
    if (!f) continue;
    const h0 = hash(seed * 11.3 + k * 7.9), h1 = hash(seed * 17.1 + k * 3.3);
    // 면 위의 한 점 — 네 꼭짓점을 겹선형으로 섞는다
    const o0 = f.p[0];
    const gx = o0[0] + (f.p[1][0] - o0[0]) * h0 + (f.p[3][0] - o0[0]) * h1;
    const gy = o0[1] + (f.p[1][1] - o0[1]) * h0 + (f.p[3][1] - o0[1]) * h1;
    // 위상 — 자리마다 다르게. 뜨는 시간은 짧고 지는 시간이 길다(별의 결).
    const ph = (t * (0.55 + 0.5 * h0) + h1 * 6.283) % 6.283;
    const u2 = ph / 6.283;
    const k2 = u2 < 0.18 ? u2 / 0.18 : Math.max(0, 1 - (u2 - 0.18) / 0.34);
    if (k2 <= 0.02) continue;
    const kk = k2 * (0.45 + 0.55 * f.lam);
    // 절반은 금빛으로 — 흰 것만 있으면 서리고, 섞여야 「보석」이 된다.
    const tk = k % 3 ? 'rkLumenWarm' : 'rkLumen';
    gAdd(c, (cc) => {
      gHalo(cc, gx, gy, s * 0.16 * kk, tk, 0.7 * kk);
    });
    rkStar(c, gx, gy, s * (0.16 + 0.20 * h0) * kk, tk, 0.9 * kk,
      h1 * 3.14 + t * 0.3);
  }

  // ⑥ 큰 반짝 — 제일 위 꼭짓점에.
  const top = front[front.length - 1];
  if (top) {
    const v = top.p.reduce((a, b) => (a[1] < b[1] ? a : b));
    rkStar(c, v[0], v[1], s * 0.30 * pul, 'rkLumen', 0.7, t * 0.6 + seed);
  }
  c.restore();
}

/// 경험치 — **금빛 한 줄기.** 물건이 아니라 **사건**이라 선으로 그린다.
///
/// ⚠️ 알갱이로 그리면 암흑물질과 같은 층이 되고, 그러면 「줍는 것」으로
///   읽혀 자동으로 드는 이유가 사라진다. **선은 못 줍는다** — 그게 요점이다.
///
/// ⚠️⚠️ **면으로 그리면 안 된다.** `celRibbon` 은 리본 **덩어리**라 슬래시·
///   물줄기의 문법이고, 이건 덩어리가 아니라 **빛**이다. 첫 판이 그래서
///   「금색 띠」로 보였다.
///   ⇒ 저장소의 **가산 발광** 문법을 쓴다(`gStroke`·`gFlare`·`gHalo`,
///     `vfx.js` 「가산 발광 후보」 블록). 넓고 어둡게 → 좁고 밝게 →
///     **아주 좁고 희게** 네 번 덧그어야 네온이 되고, 한 번만 그으면
///     그냥 굵은 선이다.
function rkXpBeam(c, x0, y0, x1, y1, k, seed) {
  if (k <= 0 || k >= 1) return;
  const out = (u) => 1 - (1 - u) * (1 - u) * (1 - u);
  const u = out(k);
  // 꼬리는 머리를 따라오되 **뒤처진다** — 그 간격이 곧 속도로 읽힌다.
  const tail = out(Math.max(0, k - 0.30));
  // ⭐ **S 자로 휜다.** 레퍼런스의 빛줄기는 활처럼 한 번 휘는 게 아니라
  //   부드럽게 두 번 방향을 바꾼다 — 2차 베지어 하나로는 그 우아함이 안 난다.
  //   ⇒ 제어점 둘을 **반대쪽으로** 두는 3차 베지어.
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;                  // 진행 방향의 법선
  const amp = L * 0.22;
  const c1 = [x0 + dx * 0.28 + nx * amp, y0 + dy * 0.28 + ny * amp];
  const c2 = [x0 + dx * 0.68 - nx * amp * 0.8, y0 + dy * 0.68 - ny * amp * 0.8];
  const at = (v) => {
    const w = (1 - v) ** 3, m = 3 * (1 - v) ** 2 * v,
      n = 3 * (1 - v) * v * v, e = v ** 3;
    return [x0 * w + c1[0] * m + c2[0] * n + x1 * e,
      y0 * w + c1[1] * m + c2[1] * n + y1 * e];
  };
  // ⭐ **꼬리가 길다.** 레퍼런스의 빛줄기는 머리 한 점이 아니라 **길게 끌린
  //   자국**이고, 그 길이가 곧 속도다. 짧게 두면 「점이 지나간다」가 된다.
  // ⚠️⚠️ **한 화면에 수십 줄기가 동시에 뜬다**(처치마다 하나). 그래서
  //   굵기·밝기·마디 수를 전부 낮게 잡았다 — 하나만 놓고 고르면 반드시
  //   과해지고, 쏟아지는 순간 화면이 하얗게 타서 **눈이 아프다**.
  //   ⇒ 굵기 1.9 · 줄기 알파 0.62 · 마디 14 · 반짝임 셋.
  //   엔진에서는 마디를 리본 정점으로 한 번에 넘겨 이 비용이 더 내려간다.
  const N = 14;
  const pts = [];
  for (let i = 0; i <= N; i++) pts.push(at(tail + (u - tail) * (i / N)));
  const fade = Math.min(1, (1 - k) / 0.22);
  const h = pts[N];
  gAdd(c, (cc) => {
    // ⭐⭐ **마디마다 알파를 갈아 가며** 긋는다. 한 번에 그으면 굵기는
    //   같은데 밝기가 균일해서 「띠」가 되고, 레퍼런스처럼 **꼬리가
    //   스러지는 광선**이 안 된다.
    // ⚠️ 그리고 **가늘어야 한다.** 굵히면 그 순간 리본(면)으로 읽힌다.
    for (let i = 0; i < N; i++) {
      const a = Math.pow(i / N, 1.7);          // 꼬리 0 → 머리 1
      if (a < 0.02) continue;
      gStroke(cc, [pts[i], pts[i + 1]], 1.9 * (0.34 + 0.66 * a) * fade,
        'rkXp', a * 0.62 * fade);
    }
    // 머리 — **작은 헤일로 하나뿐.** 십자 섬광은 안 쓴다(레퍼런스에 없고,
    //   그건 「무기가 번쩍인다」의 어휘라 이 층이 무기처럼 보인다).
    gHalo(cc, h[0], h[1], 5.0 * fade, 'rkXp', 0.55 * fade);
    // 줄기 곁의 **미세한 반짝임** — 레퍼런스가 빛줄기를 「공기 속의 것」으로
    //   보이게 하는 것이 이 점들이다. 선만 있으면 벡터 그래픽이 된다.
    for (let i = 0; i < 3; i++) {
      const v = hash(seed * 3.7 + i * 5.1);
      if (v > u || v < tail) continue;
      const q = at(v);
      const off = (hash(seed * 9.3 + i) - 0.5) * 16;
      const sp = 0.9 + 1.4 * hash(seed * 11.7 + i);
      gHalo(cc, q[0] + nx * off, q[1] + ny * off, sp * fade, 'rkXp',
        (0.18 + 0.26 * hash(seed * 13.1 + i)) * fade);
    }
  });
}

/// 엔진의 실측 치수 — **크기 비교는 눈대중으로 하지 않는다.**
///
/// | 무엇 | 월드 반지름 | 어디에 |
/// |---|---|---|
/// | 캐릭터 | **16** | `kBodyRadiusBase` |
/// | 암흑물질 하 · 중 · 상 | **12 · 15 · 18** | `gemSizeOf` |
/// | 암흑물질(보스) | **24** | `gemSizeOf`(xp ≥ 200) |
///
/// ⚠️ 시안의 `hero()` 는 몸 반지름이 **17**(s=1)이라 엔진의 16 과 다르다 —
///   배율을 그냥 1 로 두면 캐릭터만 6% 크게 그려져 비교가 어긋난다.
const RK_R_HERO = 16;
/// 암흑물질 **한 크기**.
/// ⚠️⚠️ **6 이었다가 9 로 키웠다**(2026-08-20 실기 판정: 「암흑물질이 안 뜬다」).
///   이 판은 확대(RK_WSC=1.55)라 6 도 멀쩡해 보였는데, 실기에서는 지름 12px 로
///   **가장 작은 적(r5)과 같은 크기**였다 — 움직이는 적은 그 크기에도 보이지만
///   가만히 있는 재화는 검은 배경에 묻힌다.
///   ⇒ **절대 크기는 이 판이 답하지 못한다.** 확대 판에서 고른 크기는 실기에서
///     다시 재야 한다.
///   비용은 실측했다 — 바닥에 깔리는 것이 최대 41개(정원 1024 의 4%)라
///   키워도 화면의 3% 다. 흡수 반경 48 이 계속 걷어가서 안 쌓인다.
/// ⚠️⚠️ **키우려다 6 으로 돌아왔다**(2026-08-20, 9 → 7 → 6). 되돌린 근거 둘:
///   드롭이 **5배**가 되어 바닥에 최대 205개가 깔리고(키우면 화면이 재화로
///   덮인다), 적 반지름이 5·7·8·9·11·12·13·15 라 키우면 **드롭템이 몹보다
///   커진다**(사용자 지적). 보이게 하는 일은 크기가 아니라 **대비와 개수**의
///   몫이다 — 하나가 안 보여도 무리는 보인다.
/// ⚠️ 티어별 크기(12·15·18·24)를 버린 것이다 — 크기가 **가치**를 말하던
///   자리를 비웠으므로, 티어는 다른 축(개수·색·빛)으로 말해야 한다.
const RK_R_GEM = 6;   // 2026-08-20: 9 → 7 → 6 (드롭 5배라 되돌림)
/// 빛의 결정 — 귀한 것이라 알갱이보다 크되 **줍는 것**이라 캐릭터보다 작다.
/// 암흑물질 r6 의 **두 배**(2026-08-20 사용자 확정, 18 → 9 → 12 로 잡음).
const RK_R_LUMEN = 12;
/// 판의 픽셀 ÷ 월드. 이 하나로 캐릭터와 알갱이가 **같은 자로** 그려진다.
const RK_WSC = 1.55;
/// 번쩍이 터지는 **최소 동시 도착 수**와 그 창(초).
/// ⚠️ 하나둘로 터지면 상시 점멸이라 눈이 피로하다 — 「몰아서 먹었다」가
///   사건으로 읽히려면 문턱이 있어야 한다.
const RK_XP_BURST = 3, RK_XP_WIN = 0.35;
/// 월드 반지름 [r] 로 캐릭터를 그린다.
function rkHero(c, x, y, r, t) {
  hero(c, t, x, y, 'gold', (r * RK_WSC) / 17);
}

/// 6-1 적이 남기는 것 셋 — 경험치 · 암흑물질 · 빛의 결정
function rkDropPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const col = W / 3, cy = H * 0.40;

  // ── ① 경험치 — 죽은 자리에서 **캐릭터**로 ──────────────────────────
  //   ⚠️ **한 줄기만 놓고 고르면 반드시 과해진다.** 실제 화면에서는 처치마다
  //     하나씩 동시에 쏟아지므로, 시안도 여럿을 겹쳐 놓고 판단한다.
  //   ⭐ 받는 쪽을 표식이 아니라 **캐릭터**로 둔다 — 줄기의 굵기가 적당한지는
  //     캐릭터에 견줘야만 판정할 수 있다.
  {
    const px = col * 0.5 + col * 0.26, py = cy;

    // ⭐⭐ **한꺼번에 들어오면 캐릭터가 번쩍인다.** 하나둘로는 안 터진다 —
    //   그러면 상시 점멸이라 눈이 피로하고, 「몰아서 먹었다」가 사건이 아니게
    //   된다. `RK_XP_BURST`(3) 이상이 `RK_XP_WIN`(0.35초) 안에 도착해야 한다.
    // ⚠️ 상태를 안 들고 **시각에서 파생**한다 — 프레임마다 세면 시안이
    //   프레임률에 따라 다르게 터진다.
    let burst = 0;
    for (let i = 0; i < 7; i++) {
      const CY = 2.2 + hash(i * 5.1) * 1.4;
      const ph = (t + i * 0.71) % CY;
      // 도착은 u=0.62 — 그 뒤로 얼마나 지났나
      const age = (ph - 0.62 * CY + CY) % CY;
      if (age < RK_XP_WIN) burst++;
    }
    const bk = burst >= RK_XP_BURST
      ? Math.min(1, (burst - RK_XP_BURST + 1) / 3) : 0;

    rkHero(c, px, py, RK_R_HERO * (1 + 0.10 * bk), t);
    if (bk > 0) {
      // 번쩍 — 몸이 달아오르고 고리가 한 번 퍼진다. 색은 경험치의 금빛이다.
      gAdd(c, (cc) => {
        gHalo(cc, px, py, RK_R_HERO * RK_WSC * (1.6 + 1.4 * bk), 'rkXp',
          0.55 * bk);
        gHalo(cc, px, py, RK_R_HERO * RK_WSC * 0.7, 'rkXp', 0.8 * bk);
        for (let i = 0; i < 14; i++) {
          const a1 = (i / 14) * Math.PI * 2;
          const RR = RK_R_HERO * RK_WSC * (1.5 + 1.1 * bk);
          gHalo(cc, px + Math.cos(a1) * RR, py + Math.sin(a1) * RR * 0.62,
            3.2 * bk, 'rkXp', 0.5 * bk);
        }
      });
    }

    for (let i = 0; i < 7; i++) {
      const a0 = (i / 7) * Math.PI * 2 + 0.4;
      const R = col * 0.19 + col * 0.06 * hash(i * 3.7);
      const mx = px - col * 0.28 + Math.cos(a0) * R;
      const my = py + Math.sin(a0) * R * 0.62;
      const CY = 2.2 + hash(i * 5.1) * 1.4;
      const u = ((t + i * 0.71) % CY) / CY;
      const die = Math.min(1, u / 0.14);
      if (u < 0.14) {
        const rr = 11 * (1 - die * 0.35);
        const body = jagPoly(mx, my, rr, 7, i * 2.3 + 1, 1.15, 1);
        c.save();
        c.globalAlpha = 1 - die * die;
        fillPoly(c, body, A('#24141F', 1));
        celStroke(c, body.concat([body[0]]), 1.9, 'murk', 0.85);
        c.restore();
      }
      rkXpBeam(c, mx, my, px, py, Math.min(1, u / 0.62), i * 4.1 + 2);
    }
    rkLabel(c, '경험치 · 금빛 한 줄기', col * 0.5, H * 0.76, '#E8C879');
    rkLabel(c, '자동 — 죽는 즉시 캐릭터로 · 못 줍는다 · 몰아서 들어오면 번쩍',
      col * 0.5, H * 0.76 + 16, '#6A6A78');
  }

  // ── ② 암흑물질 — 캐릭터와 **같은 자**로 ────────────────────────────
  {
    const x = col * 1.5;
    rkHero(c, x - col * 0.20, cy, RK_R_HERO, t);
    rkLabel(c, 'r16', x - col * 0.20, cy + RK_R_HERO * RK_WSC + 20, '#6A6A78');
    [0, 1, 2].forEach(i => {
      const gx = x + col * 0.10 + col * 0.11 * i;
      rkDark(c, gx, cy, RK_R_GEM * RK_WSC, i * 4.3 + 2.1, t + i * 0.8);
    });
    rkLabel(c, 'r' + RK_R_GEM, x + col * 0.21,
      cy + RK_R_GEM * RK_WSC + 20, '#6A6A78');
    rkLabel(c, '암흑물질 · 테서렉트', x, H * 0.76, '#B287FF');
    rkLabel(c, '캐릭터 r16 대비 r6 — 줍는 것이지 걸림돌이 아니라 작다',
      x, H * 0.76 + 16, '#6A6A78');
  }

  // ── ③ 빛의 결정 — 같은 자 ──────────────────────────────────────────
  {
    const x = col * 2.5;
    rkHero(c, x - col * 0.24, cy, RK_R_HERO, t);
    rkLabel(c, 'r16', x - col * 0.24, cy + RK_R_HERO * RK_WSC + 20, '#6A6A78');
    rkLumen(c, x + col * 0.16, cy, RK_R_LUMEN * RK_WSC, 4.7, t);
    rkLabel(c, 'r' + RK_R_LUMEN, x + col * 0.16,
      cy + RK_R_LUMEN * RK_WSC + 20, '#6A6A78');
    rkLabel(c, '빛의 결정 · 자란 결정', x, H * 0.76, '#EEF6FC');
    rkLabel(c, '엘리트 · 보스만 떨군다', x, H * 0.76 + 16, '#6A6A78');
  }

  c.strokeStyle = 'rgba(180,180,200,.10)';
  c.lineWidth = 1;
  [col, col * 2].forEach(gx => {
    c.beginPath();
    c.moveTo(gx, 16);
    c.lineTo(gx, H - 16);
    c.stroke();
  });
  rkLabel(c, '캐릭터와 같은 자로 그렸다 — 크기 판정은 눈대중이 아니라 엔진 상수(kBodyRadiusBase 16 · gemSizeOf)로',
    W / 2, H - 10, '#5A5A68');
}

/* ── 6-2 확대 — 실물 ↔ 굽는 크기 ──────────────────────────────────────────
   ⚠️⚠️ **이 시안에는 「크게 본 판」이 없었다.** 6-1 은 실기 크기(r12·r6)로만
     그려 지름이 24px·12px 이고, 그 크기에서는 칠을 고쳐도 고쳤는지조차 안
     보인다. 2026-08-24 의 크리스탈 칠은 **굽는 반지름 38** 에서 튜닝하고
     임시 프로브 페이지에서 확대해 판정했는데 그 페이지는 지워졌다 —
     ⇒ 판정 수단이 정본에 없었다. 여기가 그 수단이다.

   ⚠️⚠️ **확대는 최근접(`imageSmoothingEnabled=false`)이라야 한다.** 부드럽게
     늘리면 브라우저가 **없는 계조를 지어내** 「있는 것처럼」 보인다. 그러면
     이 칸의 존재 이유가 사라진다.

   ⭐ **실기 크기 칸을 따로 그리지 않는다.** 엔진은 굽는 크기로 **한 장만**
     굽고 줄여서 쓴다(`bake_lumen.dart` · `bake_matter.dart`). 시안이 r12 로
     새로 그리면 엔진에 없는 그림이 된다 — 실제로 `rkGlyphs` 의 씨앗이
     `f.z`(= s 배)라 크기마다 **다른 문자**가 새겨진다. ⇒ 굽는 칸 하나를
     그리고 **줄여서** 실기 칸을 만든다.                                    */

/// 확대 칸 둘의 제원. [bake] 는 엔진의 굽는 반지름, [big] 은 그 칸 한 변,
/// [real] 은 그 칸을 실기 크기로 줄인 한 변이다 — `real/big = 세계반지름/bake`
/// 라야 자가 맞는다(빛의 결정 28/88·38 = 12.09 ≒ r12, 암흑물질 19/44·14 =
/// 6.05 ≒ r6).
///
/// ⚠️ **굽는 반지름이 둘이 서로 다르다.** 빛의 결정은 38
/// (`kLumenBakeRadius`)이고 암흑물질은 14(`kMatterDesignRadius`, 칸 40²)다 —
/// 「38」은 결정 쪽 수이지 재화 전체의 수가 아니다.
/// ⚠️ 칸을 굽는 반지름의 딱 2배로 잡으면 **부유(bob)와 후광이 잘린다.**
/// 빛의 결정은 38 + bob 3.0 = 41 이라 반칸 44 가 그 여유다.
const RK_ZOOM_SPECS = [
  {
    key: 'lumen', name: '빛의 결정', col: '#EEF6FC',
    bake: 38, big: 88, real: 28, world: 12,
    draw: (c, x, y, s, t) => rkLumen(c, x, y, s, RK_LUMEN_SEED, t),
  },
  {
    key: 'matter', name: '암흑물질', col: '#B287FF',
    bake: 14, big: 44, real: 19, world: 6,
    draw: (c, x, y, s, t) => rkDark(c, x, y, s, RK_DARK_SEED, t),
  },
];
/// 6-1 이 쓰는 씨앗과 **같은 것**을 쓴다 — 두 칸이 다른 개체를 보이면 대조가
/// 안 된다(암흑물질은 6-1 의 첫째 알갱이 `i=0` 의 씨앗이다).
const RK_LUMEN_SEED = 4.7, RK_DARK_SEED = 2.1;

/// 확대 칸이 쓰는 화면 밖 캔버스들. **프레임마다 새로 만들지 않는다** —
/// 60fps 로 캔버스를 두 장씩 버리면 GC 가 프레임을 먹는다.
const RK_ZOOM_CV = {};
function rkZoomCanvas(key, n) {
  let cv = RK_ZOOM_CV[key];
  if (!cv) cv = RK_ZOOM_CV[key] = document.createElement('canvas');
  if (cv.width !== n) { cv.width = n; cv.height = n; }
  return cv;
}

/// 한 재화의 네 칸을 [Y] 줄에 그린다. [X] 는 칸 넷의 **중심 x** 넷.
function rkZoomRow(c, spec, X, Y, Z, t) {
  const big = spec.big, real = spec.real;
  // 확대 배수는 **정수**라야 한 텍셀이 정확히 정사각 블록이 된다.
  const zb = Math.max(1, Math.round(88 * Z / big));
  const zr = Math.max(1, Math.floor(88 * Z / real));

  // ① 굽는 크기로 한 장 — 바탕을 깔고 그린다. 발광이 `lighter` 라 **밑바탕이
  //   있어야** 화면에서와 같은 값이 난다(투명 위 가산은 다른 색이 된다).
  const ob = rkZoomCanvas(spec.key + 'B', big);
  const cb = ob.getContext('2d');
  cb.setTransform(1, 0, 0, 1, 0, 0);
  cb.globalAlpha = 1;
  cb.globalCompositeOperation = 'source-over';
  cb.imageSmoothingEnabled = true;
  cb.fillStyle = RK_BG;
  cb.fillRect(0, 0, big, big);
  spec.draw(cb, big / 2, big / 2, spec.bake, t);

  // ② 실기 크기 — 굽은 칸을 **줄인다**(GPU 가 `FilterQuality.low` 로 하는 그것).
  const os = rkZoomCanvas(spec.key + 'S', real);
  const cs = os.getContext('2d');
  cs.setTransform(1, 0, 0, 1, 0, 0);
  cs.globalAlpha = 1;
  cs.globalCompositeOperation = 'source-over';
  cs.imageSmoothingEnabled = true;
  cs.clearRect(0, 0, real, real);
  cs.drawImage(ob, 0, 0, real, real);

  // ③ 얹기. 실기 칸(①)만 부드럽게 — 그건 **모니터가 실제로 하는 일**이다.
  //   나머지 셋은 최근접이라야 있는 픽셀만 보인다.
  const tile = (src, d, cx, smooth) => {
    c.save();
    c.imageSmoothingEnabled = !!smooth;
    c.drawImage(src, cx - d / 2, Y - d / 2, d, d);
    c.restore();
    c.strokeStyle = 'rgba(180,180,200,.20)';
    c.lineWidth = 1;
    c.strokeRect(Math.round(cx - d / 2) - 0.5, Math.round(Y - d / 2) - 0.5,
      Math.round(d) + 1, Math.round(d) + 1);
  };
  tile(ob, real, X[0], true);
  tile(os, real * zr, X[1], false);
  tile(ob, big, X[2], false);
  tile(ob, big * zb, X[3], false);

  const lab = (i, a, b, colA) => {
    const yb = Y + 88 * Z / 2 + 17;
    rkLabel(c, a, X[i], yb, colA || '#9C9CAC');
    rkLabel(c, b, X[i], yb + 14, '#66667A');
  };
  const r = 'r' + spec.world;
  lab(0, r + ' · 실물', '게임에서 이 크기다', spec.col);
  lab(1, r + ' ×' + zr + ' · 최근접', 'DPR 1 이면 이 픽셀뿐');
  lab(2, 'r' + spec.bake + ' · 굽는 크기 1:1', '아틀라스 원본(칸 ' + big + '²)');
  lab(3, 'r' + spec.bake + ' ×' + zb + ' · 최근접', '엔진이 실제로 가진 픽셀');
}

/// 6-2 확대 — 재화 둘을 실물 · 굽는 크기 · 최근접 확대로 나란히.
function rkZoomPanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  // 판이 좁으면 배수를 줄인다 — 라벨이 **실제 배수**를 적으므로 거짓말이 안 된다.
  const Z = W >= 1120 ? 4 : W >= 860 ? 3 : 2;
  const G = 44;
  const w2 = Math.max(...RK_ZOOM_SPECS.map(s =>
    s.real * Math.max(1, Math.floor(88 * Z / s.real))));
  const w3 = Math.max(...RK_ZOOM_SPECS.map(s => s.big));
  const w4 = 88 * Z;
  const gw = 28 + G + w2 + G + w3 + G + w4;
  const x0 = Math.max(8, (W - gw) / 2);
  const X = [x0 + 14, x0 + 28 + G + w2 / 2,
    x0 + 28 + G + w2 + G + w3 / 2, x0 + gw - w4 / 2];
  const blk = 88 * Z;
  [30 + blk / 2, H - 62 - blk / 2].forEach((Y, i) => {
    const spec = RK_ZOOM_SPECS[i];
    rkZoomRow(c, spec, X, Y, Z, t);
    rkLabel(c, spec.name, Math.max(46, x0 * 0.5), Y - 7, spec.col);
    rkLabel(c, '굽는 반지름 ' + spec.bake, Math.max(46, x0 * 0.5), Y + 9,
      '#66667A');
  });
  c.strokeStyle = 'rgba(180,180,200,.10)';
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(16, H / 2 - 8);
  c.lineTo(W - 16, H / 2 - 8);
  c.stroke();
  rkLabel(c, '확대는 최근접이다 — 부드럽게 늘리면 없는 계조가 생겨 「있는 것처럼」 보인다. 굽는 칸 한 장을 줄여 실물 칸을 만든다(엔진이 하는 그대로)',
    W / 2, H - 10, '#5A5A68');
}

/* ══════════════════════════════════════════════════════════════════════════
   4 · 만들 것 — 채굴 무기 셋(4-1) · 순간 버프 넷(4-2)

   설계 근거는 `docs/design/채굴-파밍.md` 의 「채굴 무기 셋 — 광맥만 노린다」
   와 「몹이 떨구는 것 넷 — 재화가 아니다」다. 옛 채굴 페이지(mockup-mine)의
   그림은 폐기됐고 여기가 새 정본이다.
   ══════════════════════════════════════════════════════════════════════════ */

/// 채굴 무기의 찬 색 — 「찬 색 · 안 터진다 · 타격감은 맞는 쪽에」(4-1 표).
/// ⭐ 셋이 **한 색**을 쓴다 — 셋을 가르는 축은 색이 아니라 **어떻게 닿나**다.
///   색으로도 갈리면 「이어진다/한 발씩/터진다」가 안 읽히고 색만 남는다.
const RK_MINE_INK = '#5FD9FF';

/// 채굴 빔 — 3겹 가산 획(넓고 옅게 → 좁고 밝게). 2-1(rkHitPanel)의 그 문법.
function rkMineBeam(c, x0, y0, x1, y1) {
  c.save();
  c.globalCompositeOperation = 'lighter';
  for (const [w, al] of [[5, 0.14], [2.4, 0.34], [1, 0.85]]) {
    c.strokeStyle = A(RK_MINE_INK, al);
    c.lineWidth = w;
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.stroke();
  }
  c.restore();
}

/// 날아가는 탄 하나 — 빛나는 심 + 짧은 꼬리. **터지지 않는다.**
function rkMineShell(c, bx, by, dx, dy, r) {
  c.save();
  c.globalCompositeOperation = 'lighter';
  c.strokeStyle = A(RK_MINE_INK, 0.4);
  c.lineWidth = r * 0.8;
  c.beginPath();
  c.moveTo(bx - dx * r * 5, by - dy * r * 5);
  c.lineTo(bx, by);
  c.stroke();
  c.fillStyle = A(RK_MINE_INK, 0.5);
  c.beginPath();
  c.arc(bx, by, r * 1.9, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = A('#FFFFFF', 0.9);
  c.beginPath();
  c.arc(bx, by, r, 0, Math.PI * 2);
  c.fill();
  c.restore();
}

/// 명중 한 방 — 짧은 흰 심 + **바깥 법선 쪽**으로만 튀는 파편(rkImpact 의
/// 그 규칙 — 아무 데로나 튀면 「부딪혔다」가 아니라 「폭발했다」가 된다).
/// [k] 0~1 진행, [th] 바깥 법선 각.
function rkMineHit(c, hx, hy, th, k, seed) {
  const ev = (1 - k) * (1 - k);
  c.save();
  c.globalCompositeOperation = 'lighter';
  const g = c.createRadialGradient(hx, hy, 0, hx, hy, 16);
  g.addColorStop(0, A('#FFFFFF', 0.8 * ev));
  g.addColorStop(0.4, A(RK_MINE_INK, 0.5 * ev));
  g.addColorStop(1, A(RK_MINE_INK, 0));
  c.fillStyle = g;
  c.beginPath();
  c.arc(hx, hy, 16, 0, Math.PI * 2);
  c.fill();
  for (let i = 0; i < 4; i++) {
    const ang = th + (hash(seed * 7.1 + i * 3.3) - 0.5) * 1.5;
    const d = 6 + 20 * k * (0.6 + 0.7 * hash(seed * 4.7 + i));
    c.fillStyle = A('#E8F8FF', 0.7 * ev);
    c.beginPath();
    c.arc(hx + Math.cos(ang) * d, hy + Math.sin(ang) * d,
      1.8 * (1 - k * 0.5), 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

/// 4-1 채굴 무기 셋 — 빔 · 포 · 탄. **가르는 축은 「어떻게 닿나」다.**
///
/// ⭐⭐ 셋 다 **적을 안 때린다** — 강제 슬롯 하나가 전투력을 안 주는 것이
///   이 무기의 존재 조건이다(설계 ⭐⭐). 그리고 **겉돌면서 캔다** — 이
///   게임은 멈추면 죽으므로 셋 다 원거리 자동 조준이고 플레이어는 계속 돈다.
/// ⚠️ 포·탄의 조준은 **발사 순간에 굳는다** — 운석은 안 움직이니 유도가
///   필요 없고, 유도하면 빔과 리듬만 다른 같은 무기가 된다.
function rkMinePanel(cv, t) {
  const [c, W, H] = rkFit(cv);
  rkSky(c, W, H, t);
  const col = W / 3, cy = H * 0.42;

  // ── ① 빔 — 이어진다. 조준이 유지된다 ─────────────────────────────────
  {
    const cx = col * 0.5, R = 34, seed = 4.1;
    const pa = t * 0.55;
    const px = cx + Math.cos(pa) * col * 0.30;
    const py = cy + Math.sin(pa) * 76;
    rkStone(c, cx, cy, R, seed, t, RK_PLAIN, false);
    const th = Math.atan2(py - cy, px - cx);
    const [hx, hy] = rkStoneHit(cx, cy, R, seed, t, th);
    rkMineBeam(c, px, py, hx, hy);
    rkImpact(c, hx, hy, Math.cos(th), Math.sin(th), 4, 'frost', t, seed);
    rkHero(c, px, py, 16, t);
    rkLabel(c, '채굴빔 — 이어진다', cx, H * 0.72, '#E8E8F0');
    rkLabel(c, '조준이 유지된다 · 겉돌아도 안 끊긴다', cx, H * 0.72 + 16, '#6A6A78');
  }

  // ── ② 포 — 한 발씩. 날아가는 동안은 빈다 ─────────────────────────────
  {
    const cx = col * 1.5, R = 34, seed = 7.3;
    /// 플레이어 궤도 — 시각의 함수라 발사 시점의 자리를 **같은 식**으로
    /// 되짚을 수 있다(루프 이음매 없음).
    const orb = (tt) => [cx + Math.cos(tt * 0.55 + 2.1) * col * 0.30,
                         cy + Math.sin(tt * 0.55 + 2.1) * 76];
    const [px, py] = orb(t);
    const CY = 1.7, FLY = 0.40;
    const u = (t % CY) / CY;
    const t0 = t - u * CY;                     // 이번 발의 발사 시각
    const [sx, sy] = orb(t0);
    const th0 = Math.atan2(sy - cy, sx - cx);
    const [hx, hy] = rkStoneHit(cx, cy, R, seed, t0, th0);
    // 반동 — 명중 순간 몸이 밀렸다 **한 번에** 돌아온다(2-2 kick 의 문법).
    let kick = 0;
    const dku = (u - FLY) / 0.10;
    if (dku >= 0 && dku < 1) kick = (1 - dku) * (1 - dku);
    c.save();
    c.translate(-Math.cos(th0) * R * 0.07 * kick,
                -Math.sin(th0) * R * 0.07 * kick);
    rkStone(c, cx, cy, R, seed, t, RK_PLAIN, false);
    c.restore();
    if (u < FLY) {
      // 한 발 — 하늘에는 이것 하나뿐이다. 빔이 없다.
      const k = u / FLY;
      const bx = sx + (hx - sx) * k, by = sy + (hy - sy) * k;
      const L = Math.hypot(hx - sx, hy - sy) || 1;
      rkMineShell(c, bx, by, (hx - sx) / L, (hy - sy) / L, 2.6);
    } else if (u < FLY + 0.16) {
      rkMineHit(c, hx, hy, th0, (u - FLY) / 0.16, seed);
    }
    rkHero(c, px, py, 16, t);
    rkLabel(c, '채굴포 — 한 발씩', cx, H * 0.72, '#E8E8F0');
    rkLabel(c, '날아가는 동안은 빈다 — 다음 발은 명중 뒤에', cx, H * 0.72 + 16, '#6A6A78');
  }

  // ── ③ 탄 — 터진다. 뭉친 광맥을 한 번에 ───────────────────────────────
  {
    const cx = col * 2.5, seed = 11.7;
    // 뭉친 광맥 — 소형 셋이 붙어 있다. 셋째 무기의 존재 이유가 이 배치다.
    const CL = [[-30, -12, 17, 11.7], [24, -20, 15, 12.9], [4, 22, 14, 14.3]];
    const orb = (tt) => [cx + Math.cos(tt * 0.5 + 4.2) * col * 0.32,
                         cy + Math.sin(tt * 0.5 + 4.2) * 80];
    const [px, py] = orb(t);
    const CY = 2.3, FLY = 0.34;
    const u = (t % CY) / CY;
    const t0 = t - u * CY;
    const [sx, sy] = orb(t0);
    const ex = cx, ey = cy - 2;                // 폭심 — 뭉친 셋의 가운데
    // 반동 — **셋이 같은 순간에** 폭심 반대쪽으로 밀린다. 하나씩 밀리면
    // 한 방이 아니라 세 방이다(「한 사건에서 나온 것은 같은 순간에」).
    let kick = 0;
    const dku = (u - FLY) / 0.12;
    if (dku >= 0 && dku < 1) kick = (1 - dku) * (1 - dku);
    CL.forEach(([ox, oy, r0, sd]) => {
      let dx = cx + ox - ex, dy = cy + oy - ey;
      const L = Math.hypot(dx, dy) || 1;
      dx /= L;
      dy /= L;
      c.save();
      c.translate(dx * 3.4 * kick, dy * 3.4 * kick);
      rkStone(c, cx + ox, cy + oy, r0, sd, t + sd, RK_PLAIN, false);
      c.restore();
    });
    if (u < FLY) {
      // 곡사 — 위로 떴다 내려앉는다. 포와 달리 「던진 것」이다.
      const k = u / FLY;
      const bx = sx + (ex - sx) * k;
      const by = sy + (ey - sy) * k - Math.sin(Math.PI * k) * 34;
      const L = Math.hypot(ex - sx, ey - sy) || 1;
      rkMineShell(c, bx, by, (ex - sx) / L, (ey - sy) / L, 3.2);
    } else if (u < FLY + 0.24) {
      // ⭐ 터짐은 **찬 고리 하나**다 — 불덩이(면)를 채우면 채굴이 전투의
      //   말을 쓰게 된다. 「안 터진다」의 탄쪽 해석: 닿음이 넓을 뿐,
      //   화력의 그림을 안 그린다.
      const k = (u - FLY) / 0.24, ev = 1 - k;
      const rr = 14 + 78 * (1 - (1 - k) * (1 - k));
      c.save();
      c.globalCompositeOperation = 'lighter';
      c.strokeStyle = A(RK_MINE_INK, 0.75 * ev * ev);
      c.lineWidth = 3.4 * (1 - k * 0.6);
      c.beginPath();
      c.ellipse(ex, ey, rr, rr * 0.8, 0, 0, Math.PI * 2);
      c.stroke();
      if (k < 0.3) {
        const fk = 1 - k / 0.3;
        const g = c.createRadialGradient(ex, ey, 0, ex, ey, 22);
        g.addColorStop(0, A('#FFFFFF', 0.7 * fk));
        g.addColorStop(1, A(RK_MINE_INK, 0));
        c.fillStyle = g;
        c.beginPath();
        c.arc(ex, ey, 22, 0, Math.PI * 2);
        c.fill();
      }
      c.restore();
    }
    rkHero(c, px, py, 16, t);
    rkLabel(c, '채굴탄 — 터진다', cx, H * 0.72, '#E8E8F0');
    rkLabel(c, '뭉친 광맥을 한 번에 · 터짐은 찬 고리 하나', cx, H * 0.72 + 16, '#6A6A78');
  }

  c.strokeStyle = 'rgba(180,180,200,.10)';
  c.lineWidth = 1;
  [col, col * 2].forEach(gx => {
    c.beginPath();
    c.moveTo(gx, 16);
    c.lineTo(gx, H - 16);
    c.stroke();
  });
  rkLabel(c, '셋 다 적을 안 때린다 — 강제 슬롯 하나가 전투력을 안 준다 · 자동 조준이라 겉돌면서 캔다',
    W / 2, H - 10, '#5A5A68');
}
