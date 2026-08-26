/* ══════════════════════════════════════════════════════════════════════════
   운석 — 균열(fissure) B안. `rock.js`(패싯 크리스탈 방향)와 나란히 두고
   고르는 후보 시안이다. 정본이 되기 전까지는 `rock.js`/`rock_view.dart`/
   `rock_paint.dart`를 안 건드리고 여기서만 산다.

   재질 언어: 몸은 **진짜 입체**(다면체 — 면마다 법선·명암을 갖는다)다.
   판(plate)은 그 다면체의 면 자체이고, 균열은 인접한 두 면이 공유하는
   모서리 중 일부를 골라 빛낸 것이다 — 몸과 균열이 **같은 기하**에서
   나오므로 자전해도 서로 어긋나지 않는다(면을 따로 그리고 균열을 별도
   레이어로 얹으면 아무리 굵기·색을 맞춰도 "스티커"로 보인다 — 실제로
   2D 다각형을 잘라 쓰던 이전 시도가 그랬다).

   `rock.js`의 `rkStone`/`rkSolidFaces`/`rkBuildIco`가 이미 통과한 같은
   기계다 — 바퀴를 새로 만들지 않고 그 기법만 `rf` 접두로 옮겨 온다
   (다만 `rock.js` 자체는 참고만 하고 절대 고치지 않는다).

   `vfx.js`가 이미 실려 있다고 가정한다(A · hash · TAU · fillPoly ·
   ribbonPoly · celHoop · TONE · MOUNT). 이름은 전부 rf/RF_ 로 접두해
   `rk`/`RK_`(rock.js)와 안 겹치게 한다.
   ══════════════════════════════════════════════════════════════════════════ */

const RF_LA = 0.70, RF_LX = Math.cos(RF_LA), RF_LY = Math.sin(RF_LA);
/// 3차원 광원 — 화면 광원에 앞쪽 성분을 더한 것(`rock.js`의 `RK_L3`와
/// 같은 만듦새). 화면 y 는 아래가 +라 "왼쪽 위"가 (−x,−y)다.
const RF_L3 = (() => {
  const v = [-RF_LX, -RF_LY, 0.62], L = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / L, v[1] / L, v[2] / L];
})();

function rfFit(cv) {
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

// 돌 팔레트 — `rock.js`가 큰 본체(`rkStone`)에 쓰는 TONE3와 같은 값
// (조각용 RK_DARK/MID/LIT보다 한 단 밝다). 배경이 이미 거의 검어서
// (`RF_BG`) 조각용 팔레트를 그대로 쓰면 어두운 단이 배경에 먹혀 몸이
// 통째로 안 보인다 — 대비는 밝은 쪽에서 낸다(어두운 단을 더 내리지 않는다).
const RF_BG = '#0A0910';
const RF_DARK = '#16141F';
const RF_MID = '#3A3342';
const RF_LIT = '#7D7288';
const RF_HOT = '#C6BCD2';

// 등급 → 톤. 이름은 새로 짓지 않는다 — `lib/game/rock_view.dart`의
// `kRockGradeTones`가 직결하는 `vfx.js`의 TONE 키를 그대로 쓴다.
const RF_GRADES = [
  ['ember', '공격'],
  ['blast', '치명'],
  ['magnet', '생존'],
  ['murk', '중력'],
];
const rfTone = (k) =>
  (typeof TONE !== 'undefined' && TONE[k]) || ['#123A5E', '#4FC3F7', '#E8F8FF'];

// 발광 세기 톤별 보정 — 채널 구성이 다른 톤에 같은 알파를 쓰면 안 맞는다.
// ember(주 채널 R=255)·blast(R=225·B=255)는 상단 채널이 이미 포화에
// 가까워 기준 알파로도 금방 뜨겁게 뭉치고, murk(주 채널 G=196~255)도
// 마찬가지다. magnet 은 주 채널(B)이 mid 에서 232 뿐이고 R 은 110 으로
// 낮아 — 같은 알파로 찍으면 셋보다 확실히 덜 뜬다. 나머지 셋은 이미
// 맞는 밝기라 그대로 두고 magnet 만 올린다.
const RF_GLOW_GAIN = { ember: 1, blast: 1, magnet: 1.4, murk: 1 };

// 채도 보정 — magnet 은 밝기(RF_GLOW_GAIN)를 맞춰도 파랑이 아니라 흰빛으로
// 읽힌다. 원인은 흰 앞날(T[2] `#E4EAFF`)이 다른 톤의 T[2](크림·자홍끼 도는
// 흰색)와 달리 색상 신호가 거의 없어, 흰 코어·백색 스톱과 겹쳐 쌓이면
// 파랑(T[1])을 삼킨다. TONE 값 자체는 안 바꾸고(등급색은 새로 짓지 않는다),
// 흰 쪽 층의 비중만 줄여 상대적으로 T[1]이 도드라지게 한다.
const RF_CORE_TRIM = { ember: 1, blast: 1, magnet: 0.4, murk: 1 };

// ── 몸의 입체 — 정이십면체를 한 번 세분한 것(`lib/render/ice_topology.dart`의
// `IceTopology.build(1)`과 같은 만듦새: 모서리 중점을 새 정점으로 얹고 면
// 하나를 넷으로 가른다). 정점 12 → 42 · 면 20 → 80 · 모서리 30 → 120.
//
// ⚠️ 세분해도 균열이 잔털로 안 되돌아가는 이유는 세분 자체가 아니라 선별
// 규칙에 있다 — 균열은 여전히 "정점당 상한 2 + 사슬 성장"으로 고르고,
// 받아들이는 모서리 총수에도 예산(`RF_CRACK_BUDGET`, 아래 `rfRock`)을 둔다.
// 세분의 목적은 오직 정점 수를 늘려 `lump`(혹)·`spire`(봉우리)처럼 정점이
// 어느 정도 있어야 표현되는 손잡이를 쓰기 위함이다.
function rfBuildIco() {
  const g = (1 + Math.sqrt(5)) / 2;
  const V = [[0, 1, g], [0, 1, -g], [0, -1, g], [0, -1, -g],
    [1, g, 0], [1, -g, 0], [-1, g, 0], [-1, -g, 0],
    [g, 0, 1], [-g, 0, 1], [g, 0, -1], [-g, 0, -1]]
    .map((v) => {
      const L = Math.hypot(v[0], v[1], v[2]);
      return [v[0] / L, v[1] / L, v[2] / L];
    });
  const d2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;
  const F = [];
  for (let i = 0; i < 12; i++)
    for (let j = i + 1; j < 12; j++)
      for (let k = j + 1; k < 12; k++)
        if (d2(V[i], V[j]) < 1.2 && d2(V[j], V[k]) < 1.2 && d2(V[i], V[k]) < 1.2)
          F.push([i, j, k]);
  return { V, F };
}

// 세분 한 단계 — 모서리마다 중점을 정점으로 얹고 삼각형 하나를 넷으로
// 가른다. [parA]/[parB]는 새 정점의 부모 둘(원래 열둘은 −1) — 반지름을
// 정할 때 "부모 평균"으로 채우는 자리(`rfSolidFaces`)에 쓴다.
function rfSubdivide(base) {
  const V = base.V.map((v) => v.slice());
  const parA = new Array(V.length).fill(-1);
  const parB = new Array(V.length).fill(-1);
  const mid = new Map();
  const midOf = (a, b) => {
    const key = a < b ? a * 1000 + b : b * 1000 + a;
    if (mid.has(key)) return mid.get(key);
    const qx = (V[a][0] + V[b][0]) / 2, qy = (V[a][1] + V[b][1]) / 2, qz = (V[a][2] + V[b][2]) / 2;
    const L = Math.hypot(qx, qy, qz);
    V.push([qx / L, qy / L, qz / L]);
    parA.push(a); parB.push(b);
    const idx = V.length - 1;
    mid.set(key, idx);
    return idx;
  };
  const F = [];
  base.F.forEach((f) => {
    const ab = midOf(f[0], f[1]), bd = midOf(f[1], f[2]), da = midOf(f[2], f[0]);
    F.push([f[0], ab, da], [f[1], bd, ab], [f[2], da, bd], [ab, bd, da]);
  });
  return { V, F, parA, parB };
}

// 모서리 인접표 — 면 둘이 정점 둘을 공유하면 그 사이가 모서리다.
// [faceA, faceB, vtxA, vtxB] 넷을 한 데 담아, 나중에 V[vtxA]/V[vtxB]로
// 바로 화면 좌표를 얻는다(어느 면이 넣었든 같은 두 정점을 가리킨다).
function rfBuildEdges(F) {
  const E = [];
  const own = new Map();
  F.forEach((f, fi) => {
    for (let k = 0; k < 3; k++) {
      const a = f[k], b = f[(k + 1) % 3];
      const key = a < b ? a * 1000 + b : b * 1000 + a;
      if (own.has(key)) E.push([own.get(key), fi, a, b]);
      else own.set(key, fi);
    }
  });
  return E;
}

const RF_BASE = rfBuildIco();
const RF_SUB = rfSubdivide(RF_BASE);
const RF_ICO = {
  V: RF_SUB.V, F: RF_SUB.F, parA: RF_SUB.parA, parB: RF_SUB.parB,
  E: rfBuildEdges(RF_SUB.F),
};

// ── 몸의 꼴(form) — `lib/render/solid_form.dart`의 `IceForm`이 쓰는 손잡이
// 전부를 옮겨 왔다: 축 눌림(ax·ay·az) · 뿔(pole) · 고정 자름면(cut) 셋은
// 이미 있었고, 여기서 넷을 더한다.
//   · jit  — 울퉁불퉁함. 정본 진폭(`j = 0.56 + hash^1.4·0.62`)으로 다시
//     맞췄다 — 예전 값(0.86~1.14 범위)은 이름만 jit이지 진폭이 너무
//     좁아 "살짝 다르게 누른 공"을 못 벗어났다.
//   · extra — 씨앗마다 덧붙는 자름 `[기본, 흔들림, 깊이, 깊이흔들림]`.
//     돌이라 얕게 떨어져 나간다(깊이 0.58~0.82) — 얼음(0.34~0.68)보다 얕다.
//   · lump — 정점 잡아 빼기 `[문턱, 최소배, 흔들림]`. 돌은 잦고 완만한
//     혹(`kStoneLump` 방식) — 얹은 게 아니라 몸의 일부다.
//   · spire — 봉우리 `[개수, 세기, 날카로움]`. 혹이 울퉁불퉁이면 봉우리는
//     절벽이다 — 개수를 늘리면 오히려 둥글어지므로 "뾰족" 하나에만, 둘만
//     둔다(날카로움을 높여 가까운 정점만 솟게 한다).
// 다섯 꼴 다 `norm: true` — 돌은 크기가 곧 HP라 꼴이 크기를 흔들면 안
// 된다. 축 눌림·혹·자름이 다 걸리고 나면 같은 r이라도 화면 폭이 벌어져서
// (82 ↔ 135 사고) 마지막에 평균 반지름을 0.80r로 통일한다.
const RF_FORM = [
  { nm: '덩이', ax: 1.00, ay: 0.96, az: 0.98, jit: 1.05, pole: 0,
    cut: [], extra: [0, 2, 0.62, 0.20], lump: [0.55, 1.22, 0.45],
    shx: 0.00, shz: 0.00, norm: true },
  // 납작 — 위아래(ay)만 누르고 깊이(az)는 살려 둔다. 깊이까지 눌러 얇은
  // 판을 만들면 옆에서 볼 때 실루엣이 거의 사라져 "덩어리"로 안 읽힌다.
  { nm: '납작', ax: 1.22, ay: 0.64, az: 1.00, jit: 0.85, pole: 0,
    cut: [[0, 1, 0, 0.60], [0, -1, 0, 0.64]],
    extra: [1, 2, 0.58, 0.22], lump: [0.60, 1.16, 0.40],
    shx: 0.18, shz: -0.10, norm: true },
  { nm: '길쭉', ax: 0.72, ay: 1.26, az: 0.80, jit: 0.85, pole: 0.10,
    cut: [], extra: [1, 2, 0.60, 0.20], lump: [0.58, 1.20, 0.42],
    shx: 0.16, shz: 0.20, norm: true },
  // 모난 — 자른 면을 또렷하게 남기려면 정점 흔들기(jit)를 낮춰야 한다.
  // 흔들림이 크면 평면으로 눌러 붙인 정점도 이웃과 튀어 잘린 자리가
  // 안 보인다(`rock.js`의 "쪼갠" 꼴과 같은 이유) — 혹(lump)도 문턱을
  // 높여 드물게만 둬 큰 자름면을 해치지 않게 한다.
  { nm: '모난', ax: 1.04, ay: 0.94, az: 1.00, jit: 0.32, pole: 0,
    cut: [[0.55, 0.62, 0.42, 0.30], [-0.48, -0.30, 0.62, 0.34]],
    extra: [1, 1, 0.60, 0.18], lump: [0.75, 1.14, 0.30],
    shx: -0.20, shz: 0.14, norm: true },
  // 뾰족 — 봉우리(spire) 둘로 절벽을 세운다. 날카로움 7 — 낮추면 사방에서
  // 잡아 빼는 꼴이 되어 덩이가 통째로 부푼다(정본의 경고 그대로).
  { nm: '뾰족', ax: 0.86, ay: 1.00, az: 0.88, jit: 0.55, pole: 0.42,
    cut: [[0.5, -0.42, 0.56, 0.32]],
    extra: [1, 1, 0.62, 0.20], lump: [0.62, 1.18, 0.44],
    spire: [2, 1.5, 7],
    shx: 0.10, shz: -0.08, norm: true },
].map((F) => ({
  ...F,
  cut: F.cut.map(([nx, ny, nz, d]) => {
    const L = Math.hypot(nx, ny, nz) || 1;
    return [nx / L, ny / L, nz / L, d];
  }),
}));

/// 씨앗이 꼴을 고른다 — 등급(색)과는 무관한 축이라, 같은 등급이라도
/// 씨앗이 다르면 다른 꼴이 나온다.
function rfForm(seed) {
  return RF_FORM[Math.floor(hash(seed * 43.7) * RF_FORM.length) % RF_FORM.length];
}

/// 다면체를 이번 프레임의 자세로 세운다 — [spin]은 자전 위상, [tx,tz]는
/// 씨앗마다 고정된 자전축 기울기(이게 있어야 "제자리에서 팽이처럼" 안
/// 돌고 비스듬히 넘어가며 돈다). 정점마다 반지름·세 축을 흔들어 완전한
/// 정다면체(주사위 느낌)를 깨고, 씨앗이 고른 꼴(RF_FORM)로 비례 자체를
/// 바꿔 돌마다 체형이 다르게 한다.
function rfSolidFaces(r, seed, spin, tx, tz) {
  const TP = RF_ICO;
  const cs = Math.cos(spin), sn = Math.sin(spin);
  const cx = Math.cos(tx), sx = Math.sin(tx);
  const cz = Math.cos(tz), sz = Math.sin(tz);
  const FM = rfForm(seed);
  const ax = FM.ax * (0.92 + 0.16 * hash(seed * 3.1));
  const ay = FM.ay * (0.92 + 0.16 * hash(seed * 4.7));
  const az = FM.az * (0.92 + 0.16 * hash(seed * 6.3));

  // 정점 반지름 — 원래 열두 정점(원 정이십면체 꼭짓점)에서 울퉁불퉁함
  // (jit) · 혹(lump) · 봉우리(spire) · 뿔(pole)을 차례로 곱하고, 세분으로
  // 생긴 정점(12~41)은 부모 평균으로 채운다(`ice_solid.dart`의 ①·②와
  // 같은 순서). lump·spire가 "정점이 어느 정도 있어야" 표현되는 이유가
  // 여기다 — 원 열두 정점 각각의 당락이 그대로 실루엣의 혹·봉우리가 된다.
  const rd = new Array(TP.V.length);
  for (let i = 0; i < 12; i++) {
    const v = TP.V[i];
    const j = 0.56 + Math.pow(hash(seed * 7.3 + i * 2.1), 1.4) * 0.62;
    let b = 1 - (1 - j) * FM.jit;
    // 혹 — 문턱을 넘긴 정점만 잡아 뺀다. 얹은 게 아니라 몸의 일부.
    if (hash(seed * 71.3 + i * 5.7) > FM.lump[0]) {
      b *= FM.lump[1] + FM.lump[2] * hash(seed * 73.1 + i);
    }
    // 봉우리 — 방향 몇을 뽑아 그쪽 정점만 크게 잡아 뺀다(절벽). 날카로움
    // (지수)이 낮으면 덩이가 통째로 부풀고, 높아야 가까운 정점만 솟는다.
    if (FM.spire) {
      const cnt = FM.spire[0], gain = FM.spire[1], sharp = FM.spire[2];
      for (let k = 0; k < cnt; k++) {
        const a1 = hash(seed * 101.3 + k * 7.1) * TAU;
        const a2 = (hash(seed * 103.7 + k * 3.3) - 0.5) * 2.2;
        const cl = Math.cos(a2);
        const dot = v[0] * Math.sin(a1) * cl + v[1] * Math.sin(a2) + v[2] * Math.cos(a1) * cl;
        if (dot > 0) b *= 1 + gain * Math.pow(dot, sharp);
      }
    }
    const py = Math.abs(v[1]);
    rd[i] = b * (1 + FM.pole * py * py * py);
  }
  for (let i = 12; i < TP.V.length; i++) {
    rd[i] = (rd[TP.parA[i]] + rd[TP.parB[i]]) / 2 * 0.851 *
      (0.97 + 0.09 * hash(seed * 17.1 + i));
  }

  // 축 눌림 + 기울여 밀기(shear) — 세분된 정점 전부(42)에 적용한다.
  const P = TP.V.map((v, i) => {
    const k = rd[i] * r;
    const X = v[0] * k * ax, Y = v[1] * k * ay, Z = v[2] * k * az;
    return [X + Y * FM.shx, Y, Z + Y * FM.shz];
  });
  // 자른 면 — 고정으로 둔 것(cut) + 씨앗마다 덧붙는 것(extra). 평면 밖으로
  // 나간 정점을 평면 위로 눌러 붙인다. 돌은 얕게 떨어져 나간다 — extra의
  // 깊이(xc[2]±xc[3])를 0.58~0.82 사이로 둔 이유다.
  FM.cut.forEach((cu, ci) => {
    const d = cu[3] * r * (0.86 + 0.28 * hash(seed * 37.7 + ci));
    P.forEach((q) => {
      const u = q[0] * cu[0] + q[1] * cu[1] + q[2] * cu[2];
      if (u <= d) return;
      q[0] -= cu[0] * (u - d);
      q[1] -= cu[1] * (u - d);
      q[2] -= cu[2] * (u - d);
    });
  });
  {
    const xc = FM.extra;
    const extraN = xc[0] + Math.floor(hash(seed * 61.3) * xc[1]);
    for (let k = 0; k < extraN; k++) {
      const a1 = hash(seed * 83.1 + k * 3.3) * TAU;
      const a2 = (hash(seed * 89.7 + k * 2.1) - 0.5) * Math.PI;
      const cl = Math.cos(a2);
      const nx = Math.cos(a1) * cl, ny = Math.sin(a2), nz = Math.sin(a1) * cl;
      const d = (xc[2] + xc[3] * hash(seed * 97.1 + k)) * r;
      P.forEach((q) => {
        const u = q[0] * nx + q[1] * ny + q[2] * nz;
        if (u <= d) return;
        q[0] -= nx * (u - d);
        q[1] -= ny * (u - d);
        q[2] -= nz * (u - d);
      });
    }
  }

  // 덩치 맞추기 — 축 눌림·혹·자름이 다 걸리고 나면 같은 r이라도 꼴마다
  // 화면 폭이 벌어진다(82 ↔ 135 사고, `solid_form.dart`의 경고 그대로).
  // 평균 반지름을 0.80r로 통일해 크기는 손잡이 하나(r)에만 맡긴다 —
  // 돌은 크기가 곧 HP다.
  if (FM.norm) {
    let mean = 0;
    P.forEach((q) => { mean += Math.hypot(q[0], q[1], q[2]); });
    mean /= P.length;
    if (mean > 0) {
      const k = r * 0.80 / mean;
      P.forEach((q) => { q[0] *= k; q[1] *= k; q[2] *= k; });
    }
  }

  // 안전판 — 혹·봉우리·자름·기울여 밀기가 겹치면 드물게 한쪽으로 크게 튈
  // 수 있다. 정점별로 방향은 그대로 두고 길이만 상한(칸 폭 안에 넉넉히
  // 드는 1.42r)으로 죈다. ⚠️ 덩치 맞추기 **뒤에** 걸어야 한다 — 맞추기가
  // 평균을 끌어올리며 이미 큰 정점을 더 키울 수 있어서다.
  const cap = r * 1.42;
  P.forEach((q) => {
    const L = Math.hypot(q[0], q[1], q[2]);
    if (L > cap) {
      const s = cap / L;
      q[0] *= s; q[1] *= s; q[2] *= s;
    }
  });
  const V = P.map((q) => {
    const x1 = q[0] * cs + q[2] * sn, z1 = -q[0] * sn + q[2] * cs;
    const y2 = q[1] * cx - z1 * sx, z2 = q[1] * sx + z1 * cx;
    return [x1 * cz - y2 * sz, x1 * sz + y2 * cz, z2];
  });
  const FA = TP.F.map((f) => {
    const a = V[f[0]], b = V[f[1]], d = V[f[2]];
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const w = [d[0] - a[0], d[1] - a[1], d[2] - a[2]];
    let n = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2],
      u[0] * w[1] - u[1] * w[0]];
    const L = Math.hypot(n[0], n[1], n[2]) || 1;
    n = [n[0] / L, n[1] / L, n[2] / L];
    const ct = [(a[0] + b[0] + d[0]) / 3, (a[1] + b[1] + d[1]) / 3, (a[2] + b[2] + d[2]) / 3];
    if (n[0] * ct[0] + n[1] * ct[1] + n[2] * ct[2] < 0) n = [-n[0], -n[1], -n[2]];
    return { p: [a, b, d], n, ct };
  });
  return { V, FA, TP };
}

/// 균열답게 고쳐 쓴 셀 스트로크 — [celStroke](vfx.js)는 굵기가 선분 전체에
/// 상수이고 `lineCap='round'`라 끝이 뭉툭하다, 그대로 쓰면 발광하는
/// 고무줄밴드로 읽힌다. [ribbonPoly](vfx.js)의 sin 봉투는 양 끝을
/// 0으로 접어 뾰족하게 좁히므로, 스트로크 대신 그 봉투로 채운 다각형
/// 석 장(T0·T1·T2)을 겹쳐 같은 3단 계조 문법을 유지한다.
/// [key]가 magnet이면 흰 앞날(T2) 비중을 [RF_CORE_TRIM]만큼 줄인다 —
/// 다른 세 톤과 달리 magnet의 T2는 색상 신호가 거의 없어 그대로 두면
/// 파랑이 아니라 흰빛으로 뭉친다.
///
/// ⚠️ [w]는 예전 celStroke 와 같은 **전체** 굵기 규약이다. [ribbonPoly]는
/// 반대로 중심선에서 **한쪽으로** 미는 반폭을 받는다(좌우로 w 씩 밀어
/// 실제 전체 폭은 2w) — 그대로 넘기면 모든 층이 의도한 두 배로 그려진다.
/// 그래서 여기서 절반(hw)으로 바꿔 넘긴다.
///
/// ⚠️ [a]는 호출부에서 이미 [RF_GLOW_GAIN]이 곱해진 값이다 — magnet 은
/// gain 1.4 가 T0·T1·T2 셋 다에 걸려, trim 으로 흰 층을 줄여도 gain 이
/// 그 위에서 다시 흰 층을 밀어 올려 상쇄됐다. gain 은 「채도 있는
/// T1」을 세우자는 보정이라 T2(흰 앞날)에는 걸리면 안 된다 — 여기서
/// 나눠 걷어낸다.
function rfTaperStroke(c, pts, w, key, a = 1) {
  const T = rfTone(key);
  const trim = RF_CORE_TRIM[key] || 1;
  const gain = RF_GLOW_GAIN[key] || 1;
  const hw = w * 0.5;
  fillPoly(c, ribbonPoly(pts, hw, hw, 0), A(T[0], 0.92 * a));
  fillPoly(c, ribbonPoly(pts, hw * 0.60, hw * 0.60, 0), A(T[1], 0.96 * a));
  fillPoly(c, ribbonPoly(pts, hw * 0.24, hw * 0.24, 0), A(T[2], (a / gain) * trim));
}

/// 마디 사이 직선을 금으로 — 가운데를 살짝 옆으로 밀어 자로 그은 선이
/// 아니라 갈라진 자국으로 보이게 한다. 어디까지나 **살짝**이다 — 여기
/// pts 의 양 끝은 실제 다면체 모서리(공유 정점)라, 너무 크게 밀면
/// 균열이 자기 몸의 모서리에서 눈에 띄게 벗어나 보인다.
function rfCrackPath(seed, p0, p1, kinks) {
  const pts = [p0];
  const segs = kinks + 1;
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  for (let i = 1; i < segs; i++) {
    const u = i / segs;
    const off = (hash(seed + i * 7.3) - 0.5) * len * 0.10;
    pts.push([p0[0] + dx * u + nx * off, p0[1] + dy * u + ny * off]);
  }
  pts.push(p1);
  return pts;
}

/// 점(px,py)에서 선분(ax,ay)-(bx,by)까지 2D 최단거리. 균열 인접 물듦(①)이
/// "면 중심에서 가장 가까운 균열까지"를 잴 때 쓴다.
function rfPtSegDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const L2 = dx * dx + dy * dy;
  if (L2 < 1e-9) return Math.hypot(px - ax, py - ay);
  const u = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2));
  return Math.hypot(px - (ax + dx * u), py - (ay + dy * u));
}

/// 운석 한 알. [x,y]는 화면 좌표, [r]은 반지름, [seed]는 개체차(다면체
/// 뒤틀림·자전축·균열 선별이 여기서 갈린다), [t]는 초 단위 진행 시간,
/// [key]는 등급 톤 키.
function rfRock(c, x, y, r, seed, t, key) {
  const T = rfTone(key);
  const gain = RF_GLOW_GAIN[key] || 1;
  const trim = RF_CORE_TRIM[key] || 1;
  const bob = Math.sin(t * 0.7 + seed) * r * 0.05;
  const yy = y + bob;
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + seed);

  // 그림자 — 어두운 속 + 밝은 테. 부유하는 몸과 안 겹치게 흔들리지 않는다.
  const sh = r * 0.74;
  c.save();
  c.globalAlpha = 0.6;
  c.beginPath();
  c.ellipse(x, y + r * 1.1, sh, sh * 0.26, 0, 0, TAU);
  c.fillStyle = '#04040A';
  c.fill();
  c.restore();
  celHoop(c, x, y + r * 1.1, sh, 0.26, 0, Math.max(1.4, r * 0.05), key, 0.3);

  c.save();
  c.translate(x, yy);

  // 몸을 다면체로 세운다 — 판(plate) = 이 면(face) 자체, 균열 = 이 면들이
  // 공유하는 모서리 중 일부. 몸과 균열이 같은 V(회전 반영 정점)에서
  // 나오므로 자전해도 서로 어긋나지 않는다(따로 그린 2D 그물이 "스티커"로
  // 보이던 문제의 근본 해법).
  const spin = t * 0.18 + seed;
  const tx = 0.30 + 0.55 * hash(seed * 11.3);
  const tz = -0.55 + 1.10 * hash(seed * 13.7);
  const { V, FA, TP } = rfSolidFaces(r, seed, spin, tx, tz);

  const front = FA.map((f, i) => ({ f, i })).filter((o) => o.f.n[2] > 0);
  const isFront = new Array(FA.length).fill(false);
  front.forEach((o) => (isFront[o.i] = true));
  const TONE3 = [RF_DARK, RF_MID, RF_LIT];
  const lam = (f) => 0.14 + 0.86 * Math.max(0,
    f.n[0] * RF_L3[0] + f.n[1] * RF_L3[1] + f.n[2] * RF_L3[2]);
  const step = (f) => { const u = lam(f); return u > 0.62 ? 2 : u > 0.34 ? 1 : 0; };

  // ── 균열 선별 — 몸을 칠하기 전에 먼저 정한다. 아래 물듦(bleedMix)이 어느
  // 면이 어느 균열에 가까운지 알아야 하므로 앞당겼다 — 선별 규칙 자체는
  // 그대로다(`hash`는 순서와 무관한 순수 함수라 앞당겨도 결과가 안 바뀐다).
  //
  // ⚠️ 모서리를 하나하나 독립으로(hash > 0.45) 고르면 방사형 별이 된다 —
  // 이십면체 정점 하나가 앞면 내부 모서리를 2~5개씩 물고 있어서, 55%
  // 확률로 독립 채택하면 정점 하나에 3~5개가 동시에 뽑히는 경우가 흔하다
  // (별도 레이어도 세분도 아니라 "정점당 상한이 없다"는 선별 규칙 자체가
  // 원인 — 시뮬레이션으로 실측했다). 고쳐 쓴 규칙 둘:
  //   ① 정점마다 채택 가능한 균열 모서리 수를 RF_CRACK_VDEG_CAP(=2)로
  //     막는다 — 그래프 이론상 최대 차수를 2 이하로 제한하면 그 그래프는
  //     반드시 사슬(경로)이나 고리로만 쪼개진다(3방향 이상이 만나는
  //     분기점 자체가 생길 수 없다).
  //   ② 상한만으로는 "짧은 조각 여럿"이 되기 쉽다(정점 하나 걸러 새로
  //     끊기면 몸을 가로지르는 긴 금이 안 나온다). 그래서 후보를 독립으로
  //     흩뿌리지 않고 점수 높은 순으로 하나씩 심어 사슬을 키운다 — 심은
  //     자리에서 상한이 허락하는 한 이웃 모서리를 계속 이어 붙이고,
  //     더 이을 데가 없을 때만 다음 씨를 심는다. 그러면 "몸을 가로지르는
  //     긴 사슬 하나 + 짧게 끊긴 나머지"가 자연히 나온다(둘 다 짧은
  //     조각 여러 개가 대칭으로 흩어지는 것보다 실제 균열에 가깝다).
  const RF_CRACK_VDEG_CAP = 2;
  const RF_CRACK_THRESH = 0.32;
  // 균열 예산 — 세분(면 80)으로 모서리가 30 → 120으로 늘어난 만큼 후보
  // 풀(대략 4배)도 같이 커진다. 문턱과 정점당 상한만으로는 몸 전체에 사슬
  // 여럿이 자라 다시 철수세미가 된다(시뮬레이션 실측: 예산 없이 그대로
  // 두면 평균 채택 4.76개(면 20) → 18개(면 80)로 뛴다). 받아들일 모서리
  // 총수에 상한을 둬 "몸을 가로지르는 긴 사슬 하나 + 짧은 조각"이라는 면
  // 20장 시절의 밀도(평균 4~5개)를 면 80장에서도 그대로 지킨다.
  // ⚠️ 버그였다가 고침 — 후보를 `isFront`(지금 카메라를 보는 면)로 거르면
  // 자전마다 후보 집합 자체가 바뀌어 균열이 매 프레임 다시 뽑힌다("돌에
  // 박힌 특징"이 아니라 "지금 보이는 면 중에서 고른 것"이 되어 돌면 금이
  // 미끄러졌다). 선별은 **씨앗만으로 전체 모서리(120개) 위에서 한 번**
  // 하고, 화면에 그릴지는 아래(`crackEdges`)에서 그 프레임의 `isFront`로
  // 따로 가른다 — 균열은 고정, 노출만 자전을 따른다.
  // 예산 재조정 — 전체 120개 모서리에서 뽑고 화면엔 그중 앞을 보는 것만
  // 남기므로, 예전 값(4~6, 앞면 절반 위에서 뽑던 값)을 그대로 두면 동시에
  // 보이는 균열이 절반으로 준다. 자전 한 바퀴(72분할)를 씨앗별로 실측해
  // "동시에 보이는 개수" 평균이 예전과 같은 4~6대에 오는 예산을 찾았다
  // (등급 씨앗 4개 실측: 12~14면 평균 3.1~5.7개, 뒤로 완전히 숨는 위상
  // 비율도 대부분 0). 예전과 같은 폭(3칸)을 그대로 위로만 옮겼다.
  const RF_CRACK_BUDGET = 12 + Math.floor(hash(seed * 53.1) * 3); // 12~14(전체 모서리 기준)
  const crackScore = (ei) => hash(seed * 41.1 + ei * 5.3);
  const crackCand = [];
  TP.E.forEach(([a, b, va, vb], ei) => {
    if (crackScore(ei) > RF_CRACK_THRESH) crackCand.push({ va, vb, ei });
  });
  crackCand.sort((p, q) => crackScore(q.ei) - crackScore(p.ei)); // 점수 높은 순 — 강한 신호부터 심는다
  const byVert = new Map();
  crackCand.forEach((cnd, idx) => {
    if (!byVert.has(cnd.va)) byVert.set(cnd.va, []);
    if (!byVert.has(cnd.vb)) byVert.set(cnd.vb, []);
    byVert.get(cnd.va).push(idx);
    byVert.get(cnd.vb).push(idx);
  });
  const vertHits = new Array(TP.V.length).fill(0);
  const claimed = new Array(crackCand.length).fill(false);
  const isCrackEdge = new Array(TP.E.length).fill(false);
  let crackAccepted = 0;
  const otherEnd = (cnd, v) => (cnd.va === v ? cnd.vb : cnd.va);
  const claim = (idx) => {
    const cnd = crackCand[idx];
    claimed[idx] = true;
    isCrackEdge[cnd.ei] = true;
    vertHits[cnd.va]++; vertHits[cnd.vb]++;
    crackAccepted++;
  };
  const bestUnclaimedAt = (v) => {
    let best = -1, bestScore = -1;
    (byVert.get(v) || []).forEach((idx) => {
      if (claimed[idx]) return;
      const cnd = crackCand[idx];
      if (vertHits[cnd.va] >= RF_CRACK_VDEG_CAP || vertHits[cnd.vb] >= RF_CRACK_VDEG_CAP) return;
      const s = crackScore(cnd.ei);
      if (s > bestScore) { bestScore = s; best = idx; }
    });
    return best;
  };
  crackCand.forEach((seedCnd, seedIdx) => {
    if (crackAccepted >= RF_CRACK_BUDGET) return;
    if (claimed[seedIdx]) return;
    if (vertHits[seedCnd.va] >= RF_CRACK_VDEG_CAP || vertHits[seedCnd.vb] >= RF_CRACK_VDEG_CAP) return;
    claim(seedIdx);
    let head = seedCnd.vb, tail = seedCnd.va;
    for (let nxt; crackAccepted < RF_CRACK_BUDGET && (nxt = bestUnclaimedAt(head)) >= 0;) { claim(nxt); head = otherEnd(crackCand[nxt], head); }
    for (let nxt; crackAccepted < RF_CRACK_BUDGET && (nxt = bestUnclaimedAt(tail)) >= 0;) { claim(nxt); tail = otherEnd(crackCand[nxt], tail); }
  });
  // 화면에 그릴 균열 — 선별(위)은 전체 모서리 기준으로 이미 끝났다. 여기서
  // 이번 프레임에 양쪽 면이 다 앞을 보는 것만 골라 그린다. 뒤로 넘어간
  // 균열은 여기서 자연히 빠지고, 돌아 나오면 같은 `ei`가 다시 뽑힌다 —
  // 균열 자체(`isCrackEdge`)는 안 바뀌고 노출만 바뀐다.
  const crackEdges = [];
  TP.E.forEach(([a, b, va, vb], ei) => {
    if (isFront[a] && isFront[b] && isCrackEdge[ei]) crackEdges.push([va, vb, ei]);
  });

  // ① 균열이 옆 면을 물들인다 — 면 중심에서 채택된 균열까지 최단거리로
  // 물드는 정도를 정한다. 새 레이어가 아니라 면의 칠 색 자체를 등급색
  // 쪽으로 섞는다(아래 face-fill). 문턱 셋으로 끊은 이산 4단(없음·약·중·
  // 강) — 연속 그라디언트로 번지면 A안(패싯 크리스탈)처럼 몸 전체가 색
  // 덩어리로 읽힌다. 문턱보다 먼 면은 mixK=0이라 등급색이 전혀 안 섞여
  // 확실히 회색으로 남는다.
  // ⚠️ 물듦은 `crackEdges`(화면에 그리는 것, 앞면만)가 아니라 **선별된
  // 전체 균열**(`isCrackEdge`, 뒷면으로 넘어간 것도 포함)로 잰다 — 물듦은
  // 몸에 고정된 성질이라 시점에 따라 흔들리면 안 된다(안 그러면 인접한
  // 균열이 뒤로 넘어가는 순간 근처 면의 물듦이 프레임마다 깜빡인다).
  const crackSegsAll = [];
  TP.E.forEach(([a, b, va, vb], ei) => {
    if (isCrackEdge[ei]) crackSegsAll.push([va, vb]);
  });
  const crackSegs = crackSegsAll.map(([va, vb]) => [V[va][0], V[va][1], V[vb][0], V[vb][1]]);
  // ⚠️ T[1]은 톤마다 채도가 이미 높아(특히 blast #E14CFF) 같은 mixK라도
  // 체감 색 면적이 크게 뛴다 — 실측(줌 렌더)에서 blast만 유독 크게 번져
  // A안(패싯 크리스탈)에 가까워 보였다. 문턱을 좁히고 비율을 낮춰 "가까운
  // 몇 면만 강하게, 대부분은 회색" 쪽으로 다시 죈다.
  const RF_BLEED_R = [0.13, 0.24, 0.36]; // r 대비 거리 문턱(강/중/약 경계)
  const RF_BLEED_K = [0.32, 0.17, 0.08]; // 등급색 쪽으로 섞는 비율
  const bleedMix = (f) => {
    if (!crackSegs.length) return 0;
    let dmin = Infinity;
    for (let i = 0; i < crackSegs.length; i++) {
      const seg = crackSegs[i];
      const d = rfPtSegDist(f.ct[0], f.ct[1], seg[0], seg[1], seg[2], seg[3]);
      if (d < dmin) dmin = d;
    }
    const dn = dmin / r;
    if (dn < RF_BLEED_R[0]) return RF_BLEED_K[0];
    if (dn < RF_BLEED_R[1]) return RF_BLEED_K[1];
    if (dn < RF_BLEED_R[2]) return RF_BLEED_K[2];
    return 0;
  };

  // ① 몸 — 불투명한 세 단. 면마다 밝기를 아주 조금 흔든다(`rock.js`의
  // `_jitter`와 같은 이유) — 안 흔들면 이웃 면이 자꾸 같은 단으로 뭉쳐
  // "회색 종이"가 된다. 돌은 균질하지 않다. 균열에 가까운 면은 칠 색
  // 자체를 등급색 쪽으로 섞어 물들인다(bleedMix, 위) — 새 레이어가 아니라
  // 이 칠 하나를 바꾸는 것이다.
  // ⚠️ 이 이산 3단 셀 톤(과 ①의 4단 물듦)은 성능 제약이 아니라 미술
  // 언어다 — 면마다 한 색이라 로우폴리 셀 셰이딩으로 읽힌다. 그라디언트가
  // 이제 엔진에서도 되지만(정점별 색 보간 팬), 여기 몸 표면 자체에는 안
  // 쓴다 — 보간은 아래 빛·발광(바탕 물듦·핫스팟·후광·스파크) 쪽에만 쓴다.
  // ⚙️ 엔진 대응 — 이 forEach 통째로 엔진의 "일반" 배처(`VertexBatch.tri`
  // + `flush`) 한 벌이다. 안쪽에서 잠깐 켜는 `lighter` 구간(속에서 달아
  // 오른 바탕)만 "가산" 배처(`flushAdditive`)로 갈린다 — 실제 이식 때는
  // 면당 두 번(일반 1 + 가산 1) 쌓인다.
  // 속에서 달아오른 바탕 — 몸 전체를 톤으로 아주 얕게 물들이는 가산 그라디
  // 언트. 예전엔 원 하나(arc 0.9r)를 그리고 `clip(bodyPath)`로 몸 밖을
  // 잘라냈는데, 엔진 정점배처엔 클립이 없다 — 클립 대신 **면마다 자기
  // 삼각형 경로를 직접 채워** 같은 그라디언트 객체를 재사용한다(그라디언트는
  // 중심(0,0) 기준으로 한 번만 만들고 면마다 다시 만들지 않는다). 각 면은
  // 자기 삼각형 밖으로 안 새므로 클립 없이도 정확히 같은 결과다. 세게
  // 걸면 판 자체의 회색이 죽는다는 지적을 받은 적이 있어 세기·반경 둘 다
  // 낮게 잡는다.
  const ambGrad = c.createRadialGradient(0, 0, 0, 0, 0, r * 0.9);
  ambGrad.addColorStop(0, A(T[1], (0.05 + 0.02 * pulse) * gain));
  ambGrad.addColorStop(1, A(T[1], 0));
  front.forEach((o) => {
    const f = o.f;
    c.beginPath();
    c.moveTo(f.p[0][0], f.p[0][1]);
    c.lineTo(f.p[1][0], f.p[1][1]);
    c.lineTo(f.p[2][0], f.p[2][1]);
    c.closePath();
    const baseHex = TONE3[step(f)];
    const mixK = bleedMix(f);
    c.fillStyle = A(mixK > 0 ? mixHex(baseHex, T[1], mixK) : baseHex, 1);
    c.fill();
    const j = 0.86 + 0.28 * hash(seed * 83.9 + o.i * 1.7);
    c.fillStyle = A(j > 1 ? '#FFFFFF' : '#000000', Math.abs(j - 1) * 0.34);
    c.fill();
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = ambGrad;
    c.fill(); // 같은 경로(이 면의 삼각형)를 그라디언트로 다시 채운다 — 클립 불필요
    c.restore();

    // ② 결 — 면을 변 위 한 점→마주보는 꼭짓점 선으로 갈라 부 삼각형 둘로
    // 쪼개고, 그중 하나만 아주 옅게 덧칠한다(선을 긋는 게 아니라 실제
    // 다각형 분할 — 균열이 아니므로 발광이 아니라 그냥 칠이다). 대비가
    // 아주 낮고 기본 합성(가산 아님)이라 확대해야 겨우 보이고 실기 크기
    // (30~90px)에서는 사실상 안 보여야 한다. 균일한 그물이 아니라 면마다
    // 독립으로 각도·명암을 뽑아 자잘한 암석 결처럼 흩어지게 한다.
    const gSel = Math.floor(hash(seed * 163.1 + o.i * 3.3) * 3);
    const gT = 0.25 + 0.5 * hash(seed * 167.9 + o.i * 5.1);
    const vA = f.p[gSel], vB = f.p[(gSel + 1) % 3], vOpp = f.p[(gSel + 2) % 3];
    const gx = vA[0] + (vB[0] - vA[0]) * gT, gy = vA[1] + (vB[1] - vA[1]) * gT;
    const gDark = hash(seed * 173.3 + o.i * 2.1) > 0.5;
    c.beginPath();
    c.moveTo(vA[0], vA[1]);
    c.lineTo(gx, gy);
    c.lineTo(vOpp[0], vOpp[1]);
    c.closePath();
    c.fillStyle = A(gDark ? '#000000' : '#FFFFFF', 0.05 + 0.05 * hash(seed * 179.1 + o.i));
    c.fill();
  });

  // ② 모서리 — 균열로 안 뽑힌 경계(선별은 위에서 이미 끝났다) 중 톤이
  // 실제로 갈리거나 오목(패임)인 자리만 어둡게 골을 낸다. 나머지는 안
  // 건드린다 — 전부 그으면 그물망 시절의 실패로 되돌아간다.
  // ⚙️ 엔진 대응 — `ctx.stroke`/`lineWidth` 대신 `ribbonPoly`+`fillPoly`로
  // 폭을 가진 쿼드 띠 하나를 채운다(엔진엔 선이 없고 `quad()`만 있다).
  // "일반" 배처, 계단 없이 단일 알파.
  TP.E.forEach(([a, b, va, vb], ei) => {
    if (!isFront[a] || !isFront[b]) return; // 실루엣·뒷면 모서리는 여기서 안 다룬다
    if (isCrackEdge[ei]) return; // 균열로 뽑힌 모서리는 아래서 따로 그린다
    const fa = FA[a], fb = FA[b];
    // ④ 접촉 그늘(AO) — face b에서 이 모서리에 안 물린 꼭짓점(부리)이
    // face a의 평면보다 바깥(법선 방향)에 있으면 오목(패인 골)이고, 안쪽에
    // 있으면 볼록(솟은 능선)이다. 볼록은 이미 램버트로 빛을 받고 있으니
    // 손대지 않는다 — 오목만 살짝 어둡게 한다.
    const triB = TP.F[b];
    let apexB = -1;
    for (let k = 0; k < 3; k++) {
      if (triB[k] !== va && triB[k] !== vb) { apexB = triB[k]; break; }
    }
    const apex = V[apexB], base = V[va];
    const dn = (fa.n[0] * (apex[0] - base[0]) + fa.n[1] * (apex[1] - base[1]) +
      fa.n[2] * (apex[2] - base[2])) / r;
    let edgeA = step(fa) !== step(fb) ? 0.5 : 0;
    if (dn > 0.004) edgeA = Math.max(edgeA, 0.16 + 0.30 * Math.min(1, dn / 0.05));
    if (edgeA <= 0) return;
    const hw = Math.max(0.3, r * 0.006);
    fillPoly(c, ribbonPoly([V[va], V[vb]], hw, hw, 0), A('#04030A', edgeA));
  });

  crackEdges.forEach(([va, vb, ei]) => {
    const p0 = V[va], p1 = V[vb];
    const kinks = 1 + (hash(seed * 3.1 + ei * 2.7) > 0.5 ? 1 : 0);
    const pts = rfCrackPath(seed * 11.3 + ei * 4.1, p0, p1, kinks);
    const flick = 0.86 + 0.14 * Math.sin(t * 1.8 + hash(seed * 41 + ei) * TAU);
    const a = Math.min(1, (0.82 + 0.18 * pulse) * flick * gain);
    // 굵기 — 모서리 길이에 얹은 살짝의 편차(0.8~1.2배)로 "본단층 몇 +
    // 실금 몇"의 위계를 준다. 균일한 두께 하나로 다 그리면 그물망
    // 시절의 실패(고무줄/철수세미)로 되돌아간다.
    const wk = 0.8 + 0.4 * hash(seed * 7.9 + ei * 3.3);
    // ③ 틈 안쪽 깊이 — 어두운 벽(트렌치)을 빛(글로우·코어)보다 확실히
    // 넓게 남긴다. 밝기(아래 alpha)는 그대로 두고 폭만 벌려 벽이 빛에
    // 안 덮이게 한다 — 벽이 안 보이면 "표면의 선"으로 되돌아간다.
    const wTrench = Math.max(7.4, r * 0.94) * wk;
    fillPoly(c, ribbonPoly(pts, wTrench * 0.5, wTrench * 0.5, 0),
      A('#020208', Math.min(0.92, 0.66 + 0.26 * pulse)));
    c.save();
    c.globalCompositeOperation = 'lighter';
    rfTaperStroke(c, pts, Math.max(3.6, r * 0.34) * wk, key, a * 0.24);
    rfTaperStroke(c, pts, Math.max(2.4, r * 0.20) * wk, key, a * 0.44);
    c.restore();
    rfTaperStroke(c, pts, Math.max(1.7, r * 0.128) * wk, key, Math.min(1, a * 1.1));
  });

  // 접점 핫스팟 — 균열로 뽑힌 모서리가 둘 이상 모이는 정점만, 크고 강하게
  // 밝힌다. 다면체 정점은 인덱스가 그대로 좌표라(공간 군집 없이) 어디가
  // 진짜 접점인지 바로 안다.
  // ⚙️ 엔진 대응 — 캔버스 반지름 그라디언트를 그대로 쓴다. 정점배처에서는
  // 중심(밝다)→둘레(투명)로 색을 보간하는 부채꼴(`fanSeg`) 다발 하나와
  // 1:1 대응(중심 정점 = 그라디언트 0stop, 둘레 정점들 = 1stop) — "가산"
  // 배처, 연속(계단 아님).
  const hotVerts = [];
  vertHits.forEach((n, vi) => { if (n >= 2 && V[vi][2] > 0) hotVerts.push(vi); });
  hotVerts.forEach((vi) => {
    const p = V[vi];
    const hot = Math.min(1, (vertHits[vi] - 1) / 2);
    const rad = r * (0.07 + 0.05 * hot);
    c.save();
    c.globalCompositeOperation = 'lighter';
    const g = c.createRadialGradient(p[0], p[1], 0, p[0], p[1], rad);
    // ⚠️ gain 은 T[1](실제 채도 있는 색)에만 건다 — T[2]는 이미 흰색에
    // 가까워(magnet #E4EAFF 등) gain 으로 더 밀면 파랑이 아니라 그냥 더
    // 흰 뭉치가 된다. magnet 은 흰 코어·톤 코어 두 스톱을 trim 으로 더
    // 줄여 T[1] 띠가 상대적으로 도드라지게 한다.
    g.addColorStop(0, A('#FFFFFF', 0.12 * pulse * (0.85 + 0.35 * hot) * trim));
    g.addColorStop(0.30, A(T[2], 0.34 * pulse * (0.7 + 0.5 * hot) * trim));
    g.addColorStop(0.62, A(T[1], 0.30 * pulse * gain * (0.7 + 0.5 * hot)));
    g.addColorStop(1, A(T[1], 0));
    c.fillStyle = g;
    c.beginPath();
    c.arc(p[0], p[1], rad, 0, TAU);
    c.fill();
    c.restore();
  });

  // ③ 실루엣 — 그늘 쪽 모서리만 얇게 밝힌다(광원 쪽까지 두르면 "오려낸
  // 조각"이 된다). 톤 경계와 달리 여기는 앞면·뒷면이 갈리는 자리다.
  // ⚙️ 엔진 대응 — `stroke` 대신 `ribbonPoly`+`fillPoly` 쿼드 띠. "일반" 배처.
  TP.E.forEach(([a, b, va, vb]) => {
    if (!isFront[a] && !isFront[b]) return;
    if (isFront[a] === isFront[b]) return; // 실루엣이 아니다(둘 다 앞 또는 둘 다 뒤)
    const p0 = V[va], p1 = V[vb];
    const mx = (p0[0] + p1[0]) / 2, my = (p0[1] + p1[1]) / 2;
    const ml = Math.hypot(mx, my) || 1;
    const away = -(mx / ml * RF_LX + my / ml * RF_LY);
    if (away < 0.35) return;
    const hw = Math.max(0.35, r * 0.008);
    fillPoly(c, ribbonPoly([p0, p1], hw, hw, 0), A(RF_HOT, 0.10 + 0.22 * away));
  });

  // 새는 스파크(기포) — 흐르는 꼬리가 아니라 접점에서 짧게 태어났다
  // 스러지는 미광. 위치·알파를 전부 한 위상 [u] 하나에서 파생해 루프
  // 이음매가 안 튄다(양 끝에서 알파가 0으로 수렴해 자리 도약이 안 보인다).
  // 접점 여섯 곳 × 알갱이 셋 = 최대 18개까지 늘렸다(예전 4×2=8) — "기포처럼
  // 올라오는" 인상을 살리려면 서너 개로는 부족하다는 지적이 있었다. 여전히
  // 성기게 떠 있어야 기포지 빽빽하면 노이즈다 — sin 봉투가 각자 다른
  // 위상에서 태어났다 스러지므로 한순간에 다 같이 밝지는 않는다(실기
  // 크기에서 확인 완료: 뭉치지 않는다).
  // ⚙️ 엔진 대응 — `arc` 원 하나 + 반지름 그라디언트. 중심 정점(T[2],
  // 밝다) → 둘레 정점(투명)으로 보간하는 부채꼴 다발과 같다. "가산" 배처.
  // ⚠️ gain 은 T[1] 후광에만 건다 — T[2] 코어는 magnet 처럼 이미 흰색에
  // 가까운 톤에서 더 밀면 파랑이 아니라 흰빛만 세지므로 trim 으로 누른다.
  c.save();
  c.globalCompositeOperation = 'lighter';
  (hotVerts.length ? hotVerts.map((vi) => V[vi]) : [[0, 0]]).slice(0, 6)
    .forEach((v, vi) => {
      const baseAng = Math.atan2(v[1], v[0]);
      for (let k = 0; k < 3; k++) {
        const off = hash(seed * 13.1 + vi * 5.3 + k * 2.7);
        const ang = baseAng + (hash(seed * 19 + vi + k) - 0.5) * 0.7;
        const u = (t * 0.3 + off) % 1;
        const dist = r * (0.05 + 0.25 * u);
        const px = v[0] + Math.cos(ang) * dist, py = v[1] + Math.sin(ang) * dist;
        const sa = Math.sin(Math.PI * u);
        const rr = Math.max(0.5, r * 0.02 * (1 - u * 0.5)) * 2.6;
        const g = c.createRadialGradient(px, py, 0, px, py, rr);
        g.addColorStop(0, A(T[2], sa * 0.85 * trim));
        g.addColorStop(0.38, A(T[1], sa * 0.30 * gain));
        g.addColorStop(1, A(T[1], 0));
        c.beginPath();
        c.arc(px, py, rr, 0, TAU);
        c.fillStyle = g;
        c.fill();
      }
    });
  c.restore();

  // 몸 둘레로 번지는 빛 — 실루엣을 그대로 따라가는 도넛 하나에 반지름
  // 그라디언트를 채운다.
  // ⚠️ 예전엔 고정 반지름 원 두 장(arc 0.9r/1.4r)으로 고리를 냈다 — 꼴(FM)이
  // 실루엣을 원과 전혀 다르게 비틀어 놓는데(길쭉·납작·뾰족…) 후광만 원이면
  // 몸이 원 밖으로 삐져나오거나 원 안에 못 미쳐 "돌 + 별개의 원반"
  // (개기일식)으로 보였다. 안쪽 구멍을 원이 아니라 **실제 실루엣 그 자체**로
  // 뚫고, 바깥 테두리는 그 실루엣을 원점 기준 1.5배 부풀린 것으로 잡아
  // 후광이 길쭉하면 길쭉하게, 뾰족하면 뾰족하게 따라가게 한다.
  // ⚙️ 엔진 대응 — 캔버스 반지름 그라디언트는 그대로 쓰되(정점별 색 보간
  // 팬과 1:1 대응), **채우는 경로**를 원이 아니라 이 도넛 폴리곤으로 바꿨다
  // — 그라디언트 자체는 원점 기준 동심원이라 뾰족한 방향(실루엣이 멀리
  // 뻗은 곳)에서는 무늬가 약간 일찍 옅어질 수 있다(캔버스 그라디언트가
  // 방향별로 다른 반지름을 못 주는 한계) — 실제 엔진에서는 부채꼴마다
  // 그 방향의 실제 반지름에 맞춰 안쪽/바깥쪽 정점 색을 따로 줄 수 있어
  // 이 목업보다 더 정확한 결을 낼 수 있다. 두 서브패스(바깥 루프 정방향+
  // 안쪽 루프 역방향)를 한 path에 넣어 nonzero 규칙으로 구멍을 낸다 —
  // 원 두 장으로 고리를 내던 것과 같은 수법을 실루엣 폴리곤에 옮긴 것뿐.
  const silAdj = new Map();
  const silEdges = [];
  TP.E.forEach(([a, b, va, vb]) => {
    if (isFront[a] === isFront[b]) return; // 실루엣이 아니다
    silEdges.push([va, vb]);
    if (!silAdj.has(va)) silAdj.set(va, []);
    if (!silAdj.has(vb)) silAdj.set(vb, []);
    silAdj.get(va).push(vb);
    silAdj.get(vb).push(va);
  });
  const silUsed = new Set();
  const silKey = (p, q) => (p < q ? p + '_' + q : q + '_' + p);
  const silLoops = [];
  silEdges.forEach(([sa, sb]) => {
    const k0 = silKey(sa, sb);
    if (silUsed.has(k0)) return;
    silUsed.add(k0);
    const loop = [sa, sb];
    let cur = sb;
    let guard = 0;
    while (cur !== sa && guard++ < TP.V.length + 4) {
      const nbrs = silAdj.get(cur) || [];
      let nxt = -1;
      for (let i = 0; i < nbrs.length; i++) {
        const k = silKey(cur, nbrs[i]);
        if (silUsed.has(k)) continue;
        nxt = nbrs[i];
        silUsed.add(k);
        break;
      }
      if (nxt < 0) break;
      loop.push(nxt);
      cur = nxt;
    }
    if (loop.length >= 3) silLoops.push(loop);
  });
  if (silLoops.length) {
    // 그라디언트 스톱 반지름은 이번 씨앗의 실제 실루엣 크기에 맞춰 잡는다
    // (고정 r*0.9/1.4가 아니라) — 안쪽 스톱은 실루엣에서 원점에 가장 가까운
    // 정점보다 살짝 안쪽, 바깥 스톱은 가장 먼 정점의 1.5배(바깥 테두리와
    // 같은 배율)에 맞춰, 어떤 꼴이든 안쪽은 확실히 밝고 바깥은 확실히
    // 투명하게 접힌다.
    let silMinR = Infinity, silMaxR = 0;
    silLoops.forEach((loop) => loop.forEach((vi) => {
      const d = Math.hypot(V[vi][0], V[vi][1]);
      if (d < silMinR) silMinR = d;
      if (d > silMaxR) silMaxR = d;
    }));
    const kOut = 1.5;
    const hg = c.createRadialGradient(0, 0, silMinR * 0.85, 0, 0, silMaxR * kOut);
    hg.addColorStop(0, A(T[1], (0.12 + 0.07 * pulse) * gain));
    hg.addColorStop(1, A(T[1], 0));
    c.beginPath();
    silLoops.forEach((loop) => {
      loop.forEach((vi, i) => {
        const p = V[vi], px = p[0] * kOut, py = p[1] * kOut;
        if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
      });
      c.closePath();
      for (let i = loop.length - 1; i >= 0; i--) {
        const p = V[loop[i]];
        if (i === loop.length - 1) c.moveTo(p[0], p[1]); else c.lineTo(p[0], p[1]);
      }
      c.closePath();
    });
    c.save();
    c.globalCompositeOperation = 'lighter';
    c.fillStyle = hg;
    c.fill();
    c.restore();
  }

  c.restore(); // translate 끝
}

/// 배경 별 — 단층 정지 산포. 4층 시차(`rock.js`의 `rkSky`)까진 필요 없다,
/// 이 판은 재질 비교가 목적이라 우주에 떠 있다는 문맥만 있으면 된다.
function rfStars(c, w, h, n, seed) {
  for (let i = 0; i < n; i++) {
    const x = hash(seed + i * 3.7) * w;
    const y = hash(seed + i * 5.9 + 50) * h;
    const rr = 0.5 + 1.1 * hash(seed + i * 7.1 + 90);
    c.beginPath();
    c.arc(x, y, rr, 0, TAU);
    c.fillStyle = A('#8A93B4', 0.22 + 0.35 * hash(seed + i * 2.3 + 20));
    c.fill();
  }
}

function rfLabel(c, label, key, x, y) {
  const T = rfTone(key);
  c.textAlign = 'center';
  c.font = "600 13px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  c.fillStyle = A(T[1], 0.95);
  c.fillText(label, x, y);
  c.font = "400 10.5px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  c.fillStyle = A(RF_LIT, 0.8);
  c.fillText(key, x, y + 15);
}

function rfGradePanel(cv, t) {
  const [c, w, h] = rfFit(cv);
  c.clearRect(0, 0, w, h);
  c.fillStyle = RF_BG;
  c.fillRect(0, 0, w, h);
  rfStars(c, w, h, 70, 3.31);
  const n = RF_GRADES.length;
  const cellW = w / n;
  RF_GRADES.forEach(([key, label], i) => {
    const cx = cellW * i + cellW / 2;
    const cy = h * 0.44;
    const r = Math.min(cellW, h) * 0.30;
    rfRock(c, cx, cy, r, i * 7.31 + 1.7, t, key);
    rfLabel(c, label, key, cx, h * 0.88);
  });
}

let rfT0 = null;
function rfFrame(ms) {
  if (rfT0 === null) rfT0 = ms;
  const t = (ms - rfT0) / 1000;
  const cv = MOUNT('rf-grade');
  if (cv) rfGradePanel(cv, t);
  requestAnimationFrame(rfFrame);
}
requestAnimationFrame(rfFrame);
