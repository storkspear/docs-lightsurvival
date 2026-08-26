// ── 관측소 2뎁스 — 장 안의 스테이지 ────────────────────────────────────────
//
// ⚠️⚠️ **첫 판을 갈아엎었다.** 「바깥 지도의 은하 형태가 안쪽 길 모양을 정한다」로
//   짰는데(타원 궤도 · 렌즈 띠 · 나선 팔) **읽히지 않았다** — 3장 나선에서
//   14개가 안쪽에 뭉쳐 3·4·5 가 겹치고 순서가 사라졌다. 예쁜 규칙이었지만
//   길의 첫 일은 **순서를 말하는 것**이고 그걸 못 하면 규칙이 아니라 장식이다.
//
// ⭐ 그래서 둘로 갈랐다:
//   · **길은 늘 같은 문법**(뱀처럼 접힌 줄) — 8개든 14개든 같은 속도로 읽힌다
//   · **은하는 배경**으로 크게 뜬다 — 「어느 은하 안인가」는 형태가 말하고,
//     「몇 번째로 가나」는 길이 말한다. 한 그림이 두 일을 하면 둘 다 흐려진다
// ⚠️⚠️ **이름을 `CH_`/`ch` 로 격리한다.** 이 파일은 `vfx.js`(23,000줄) 뒤에
//   실리는데, 최상위 `const` 가 하나만 겹쳐도 **스크립트가 통째로 죽는다**
//   (실제로 `TAU` → `DRIFT` 순으로 두 번 그렇게 빈 캔버스가 나왔다).
//   ⇒ 겹친 것만 고치면 다음에 또 난다. **전부** 접두어를 단다.
//
// ⚠️⚠️ **`TAU`·`hash`·`jagPoly` 는 여기서 안 만든다.** `vfx.js`(시안 정본)가 이미 갖고
//   있고, 사본을 두면 ① `const` 중복 선언으로 **스크립트가 통째로 죽고**
//   (실제로 그렇게 빈 캔버스가 나왔다) ② 살아나도 두 벌이 되어 언젠가 갈라진다.
//   ⇒ 이 파일은 `vfx.js` **뒤에** 실리고 그쪽 것을 쓴다.

// ── 시간 — **하나뿐이다** ─────────────────────────────────────────────────
// ⚠️ 움직이는 것들이 각자 제 시계를 들면 위상이 갈라져 「같은 화면인데 박자가
//   다른」 그림이 된다. 프레임마다 여기 한 번 쓰고 전부 이걸 읽는다.
let T_NOW = 0;

const INK = {
  now:  "#E8C879",                    // 지금 — 화면에서 유일한 금빛
  done: "rgba(206,208,224,.80)",      // 지나온 것
  open: "rgba(184,186,204,.46)",      // 열린 것 — 윤곽만
  lock: "rgba(150,150,175,.26)",      // 잠긴 것
  line: "rgba(160,162,186,.20)",
  lineDone: "rgba(206,208,224,.38)",
};

// ── 난이도 테마 — **팝업이 통째로 그 색을 입는다** ────────────────────────
//
// 사용자 확정: 쉬움 **하양** · 보통 **노랑**(지금 것) · 어려움 **빨강** ·
//   매우어려움 **보라**.
//   ⚠️ 말씀이 한 번 엇갈렸다(「보통은 노랑」과 「보통은 하양」). 넷 중 **쉬움**만
//     안 불렸으므로 그쪽을 하양으로 잡았다 — 넷에 넷이 맞는 유일한 배정이다.
//
// ⭐ **왜 색을 통째로 바꾸나** — 난이도는 「고른 것」이 아니라 **「지금 어떤
//   판에 들어가려는가」**다. 칩 하나만 물들면 그 사실이 칩 크기만큼만 크고,
//   팝업이 물들면 **화면 전체가 그 판의 온도**가 된다. 빨간 화면에서 출격을
//   누르는 것과 하얀 화면에서 누르는 것은 다른 각오다.
//
// ⚠️ 「색은 화면에 하나」 규약은 그대로다 — 테마 색이 **그 하나**로 바뀔 뿐이다.
const THEME = {
  // ⚠️ 쉬움 ↔ 보통을 **맞바꿨다**(2026-08-18 2차). 초록은 신호등·체력바에서
  //   온 **「안전」**의 색이라 쉬움에 붙는 것이 자연스럽고, 하양은 **「기준」**
  //   이라 앵커인 보통에 맞다. 첫 배정(쉬움=하양)은 「금빛을 빼자」는 판정만
  //   따랐지 **색의 뜻**은 안 따진 것이었다.
  // ⚠️ **밝기가 아니라 채도였다.** 「너무 어두운 초록」이라는 반려를 받고 재
  //   보니 띠 끝색의 명도는 오히려 **제일 높았다**(초록 L .053 vs 빨강 .028).
  //   탁해 보인 것은 `#164A2E` 가 **청록 쪽**이라 회색기가 돌아서다 — 빨강은
  //   어두워도 채도가 높아 선명하게 읽힌다.
  //   ⇒ 명도를 올리는 대신 **채도를 올리고 연두 쪽으로** 민다.
  "쉬움":     { key: "#5CF2A2", rgb: "92,242,162", g0: "#0C3A22", g1: "#1C8A50", ink: "#04180C", glow: 0 },
  // ⚠️⚠️ **금빛이 아니다.** 첫 판은 보통을 금빛(#E8C879)으로 뒀는데 걷었다
  //   (사용자: 「금색을 이미 쓰는 컬러가 있어서」). 금빛은 이 게임에서 **주
  //   버튼과 「지금 깨야 할 칸」의 색**이다 — 난이도가 그걸 빼앗으면 「출격」과
  //   「보통」이 같은 색이 되어 **색이 두 가지를 말하게 된다.**
  //   ⇒ 하양. 보통은 **앵커**(밴드를 재는 기준 한 칸)라 「기준」의 색이 맞다.
  "보통":     { key: "#E4E4EE", rgb: "228,228,238", g0: "#1E1E26", g1: "#3A3A48", ink: "#12121A", glow: 0 },
  // ⚠️ 빨강 첫 판(#E4705E)은 **연어색**이라 「어렵다」가 아니라 「따뜻하다」였다.
  //   채도를 올리고 명도를 낮춰 **피 쪽으로** 민다(사용자: 「좀 더 어려운
  //   느낌의 빨강」). 띠도 어둡게 깔아야 글자가 그 위에서 산다.
  "어려움":   { key: "#FF4A3D", rgb: "255,74,61",   g0: "#2E0C0A", g1: "#5C1410", ink: "#1A0403", glow: 0 },
  // ⚠️ 보라 첫 판(#B98ADF)은 **탁했다** — 라벤더라 「위험」이 아니라 「부드럽다」.
  //   사용자: 「좀 더 빛나는 보라, 밝은 보라」 ⇒ 자주(magenta) 쪽으로 채도를
  //   끌어올려 **형광**에 가깝게. 매우어려움은 화면에서 제일 튀어야 한다.
  // ⭐ **매우어려움만 빛을 뿜는다**(사용자: 「좀 더 빛나게? 살짝 밝은 빛을
  //   내뿜는 느낌으로」). 색을 더 밝히는 대신 **`glow`** 를 준다 — 색만 밝히면
  //   그냥 연보라가 되고, 발광은 **그 색이 광원**이라는 뜻이라 다르게 읽힌다.
  //   ⚠️ 넷 중 하나만 빛나야 한다. 둘이 빛나면 「제일 위험한 것」이 안 정해진다.
  "매우어려움": { key: "#CE7CFF", rgb: "206,124,255", g0: "#240C3A", g1: "#4E1682", ink: "#100320", glow: 1 },
};

// ── 배경 은하 — **알갱이로 그린다** ───────────────────────────────────────
//
// ⚠️⚠️ 첫 판은 방사 그라디언트 원 하나였다. 사용자 반려: 「그냥 면인데? 우주
//   같지가 않고」 — 맞다. 은하는 **셀 수 없이 많은 별**이고 그게 정체다.
//   면으로 그리면 「얼룩」이지 은하가 아니다.
//   ⭐ 로비 히어로의 구(`FVSET.gold[4]`)가 이미 같은 답을 갖고 있다 —
//     「잘게 부서져 있다 — 셀 수 없이 많은 알갱이가 껍질을 이룬다」.
//     같은 문법을 여기 쓴다: **낱알 수백**이 종에 따라 다른 자리에 앉는다.
//
// ⚠️ 자리는 `hash(i)` 로 뽑는 **결정적 난수**다 — 매 프레임 다시 굴리면
//   배경이 떨리고, 그러면 「멀리 있는 것」으로 안 읽힌다.
// ⚠️⚠️ **한 번 굽고 돌린다.** 알갱이 1,500개를 매 프레임 다시 그리면 관측소가
//   배터리를 먹는다 — 시안 스스로 그 경고를 적어 뒀다(「로비는 오래 켜 두는
//   화면이라 배터리·발열이 그대로 값이 된다」).
//   ⇒ 오프스크린에 한 번 그려 두고 매 프레임은 **`drawImage` + 회전**만 한다.
//     알갱이가 결정적 난수라 굽는 것이 가능하다(매번 같은 그림이니까).
const _baked = new Map();
function bakedGalaxy(kind, R, seed, dpr) {
  const key = kind + ":" + Math.round(R) + ":" + seed + ":" + dpr;
  if (_baked.has(key)) return _baked.get(key);
  // ⚠️ **화면 픽셀 배로 굽는다.** 등배로 구워 회전시키면 리샘플링으로
  //   알갱이가 뭉개진다. 화면이 dpr 2 면 2배로 굽고 반으로 그린다.
  const SS = Math.max(2, dpr);
  const S = Math.ceil(R * 2.6);
  const off = document.createElement("canvas");
  off.width = off.height = S * SS;
  const oc = off.getContext("2d");
  oc.scale(SS, SS);
  galaxyBg(oc, S / 2, S / 2, R, kind, seed);
  _baked.set(key, off);
  return off;
}

function galaxyBg(c, cx, cy, R, kind, seed) {
  const N = 1500;
  c.save(); c.translate(cx, cy); c.rotate((hash(seed) - .5) * .6);
  c.globalCompositeOperation = "lighter";

  for (let i = 0; i < N; i++) {
    const h1 = hash(i * 1.31 + seed), h2 = hash(i * 2.77 + seed), h3 = hash(i * 4.13 + seed);
    let x, y, dens;
    if (kind === "E") {
      // 타원 — 가운데가 빽빽하고 밖으로 갈수록 성기다. `pow` 가 그 밀도다.
      const rr = Math.pow(h1, 1.15) * R;
      const a = h2 * TAU;
      x = Math.cos(a) * rr; y = Math.sin(a) * rr * .62;
      dens = 1 - rr / R;
    } else if (kind === "S0") {
      // 렌즈 — **팔이 없는 것이 정체**다. 밝은 핵 + 아주 납작한 원반.
      const rr = Math.pow(h1, 1.05) * R * 1.20;
      const a = h2 * TAU;
      x = Math.cos(a) * rr;
      y = Math.sin(a) * rr * (.14 + .10 * h3);      // 눌린 원반
      dens = 1 - rr / (R * 1.15);
    } else {
      // 나선 — 알갱이가 **팔에 몰린다.** 팔에서 벗어난 흩뿌림도 조금 남겨야
      // 「팔만 그린 선」이 아니라 은하가 된다.
      const turn = 1.5, b = Math.log(3.4) / (turn * TAU);
      const armPick = h3 < .5 ? 0 : Math.PI;
      const t = Math.pow(h1, .62);
      const th = t * turn * TAU;
      const rad = R * .22 * Math.exp(b * th);
      const spread = (h2 - .5) * R * (.10 + .22 * t);   // 팔의 두께
      const a = th + armPick + (h2 - .5) * .55;
      x = Math.cos(a) * rad + spread * .5;
      y = (Math.sin(a) * rad) * .48 + spread * .28;
      dens = 1 - t * .8;
    }
    const al = (.05 + .34 * dens) * (.35 + .65 * h3);
    const sz = .5 + 1.5 * dens * h2;
    c.fillStyle = "rgba(" + (h3 > .82 ? "244,246,255" : "176,180,214") + "," + al + ")";
    c.beginPath(); c.arc(x, y, sz, 0, TAU); c.fill();
  }

  // 핵 — 알갱이가 못 내는 「가운데가 하얗게 탄다」만 그라디언트로.
  const cr = kind === "S0" ? R * .30 : (kind === "E" ? R * .42 : R * .26);
  const g = c.createRadialGradient(0, 0, 0, 0, 0, cr);
  g.addColorStop(0, "rgba(238,240,255,.42)");
  g.addColorStop(.5, "rgba(180,184,220,.16)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = g;
  c.save(); c.scale(1, kind === "S0" ? .34 : .72);
  c.beginPath(); c.arc(0, 0, cr, 0, TAU); c.fill(); c.restore();
  c.restore();
}

// ── 별밭 — **시안의 `CH_DRIFT` 문법 그대로** ────────────────────────────────
//
// ⚠️⚠️ 첫 판은 겹마다 **속도만** 다르고 크기·색은 같았다(사용자: 「그냥 이미지가
//   움직이는 것 같은데, 맵 시안 보면 좀 더 다채롭게 움직인다」).
//   ⭐ 시안이 그 실패를 이미 적어 뒀다(`vfx.js` 의 `CH_DRIFT` 머리):
//     「근층 알갱이는 속도에 비례해 **선으로 늘어난다** — **크기·밝기·속도가
//      함께** 변해야 깊이로 읽히고, **셋 중 하나만 바꾸면 「그냥 점이 다른
//      점」이 된다**」
//   ⇒ 넷을 한꺼번에 바꾼다: 깊이 · 크기 · 색(밝기) · 늘어남.
//
// 색은 시안 `MAPINK` 그대로 — 먼 별은 어둡고(starD) 가까운 별은 밝다(starL),
// 드문 흰 별(starX)은 화면당 두세 개까지.
//
// ⚠️⚠️ **「늘어남」은 걷었다.** 시안의 `CH_DRIFT` 는 **날아가는 카메라**의 문법이라
//   근층이 선으로 늘어나는데(심우주 항해), 관측소는 **서서 보는 곳**이다.
//   그대로 가져왔더니 화면에 짧은 대시(—)가 흩어져 「별밭」이 아니라
//   **「부스러기」**로 보였다. 늘어남은 **속도의 결과**인데 여기엔 속도가
//   없어야 한다.
//   ⇒ 시안이 말한 셋(크기·밝기·속도) 중 **크기와 밝기**만 살리고 속도는
//     아주 얕게 둔다. 「다채롭다」는 늘어남이 아니라 **낟알의 층**이 낸다.
//
// [깊이(속도), 개수, 반지름, 색, 알파]
const CH_DRIFT = [
  [.10, 110, 0.8, "#3F4763", .50],  // 아득한 먼지 — 촘촘·흐림·거의 정지
  [.28,  64, 1.0, "#4E5878", .70],
  [.60,  34, 1.4, "#6E7899", .88],
  [1.0,  14, 1.9, "#A9B3D0", 1  ],  // 가까운 별 — 굵고 밝고 조금 더 빠르다
];
// ⚠️ **아주 느리다.** 깊이 1.0 층이 초당 2.4px — 한 번에 화면을 가로지르는 데
//   6분이다. 관측소는 오래 켜 두는 화면이라 「흐른다」가 눈에 걸리면 못 쉰다.
const CH_DRIFT_SPEED = 2.4;

function starfield(c, W, H, seed) {
  let k = seed * 7.1;
  for (const [dep, n, r, col, al] of CH_DRIFT) {
    const sp = CH_DRIFT_SPEED * dep;
    c.fillStyle = col;
    for (let i = 0; i < n; i++) {
      k += 1;
      let x = (hash(k * 1.7) * W - T_NOW * sp) % W;
      if (x < 0) x += W;
      const y = hash(k * 3.3 + 9) * H;
      // ⭐ 층마다 **제 박자로** 숨 쉰다 — 다 같이 밝아지면 화면이 깜빡인다.
      const br = .78 + .22 * Math.sin(T_NOW * (.35 + dep * .5) + k);
      c.globalAlpha = al * (.55 + .45 * hash(k * 5.1)) * br;
      // 1px 급은 사각이 더 싸고 더 별답다(시안 `mapStar` 의 그 판정 그대로).
      c.fillRect(x - r * .5, y - r * .5, r, r);
    }
  }
  // 드문 흰 별 — **화면당 두세 개까지**(시안 규약). 여기서만 반짝인다.
  for (let i = 0; i < 3; i++) {
    k += 1;
    let x = (hash(k * 1.7) * W - T_NOW * CH_DRIFT_SPEED * .60) % W;
    if (x < 0) x += W;
    const tw = .45 + .55 * Math.pow(Math.max(0, Math.sin(T_NOW * 1.1 + i * 2.4)), 3);
    c.fillStyle = "#E6ECFA";
    c.globalAlpha = tw;
    c.fillRect(x - .5, hash(k * 3.3 + 9) * H - .5, 1.6, 1.6);
  }
  c.globalAlpha = 1;
}

// ── 길의 자리 — **뱀처럼 접는다** ──────────────────────────────────────────
// ⚠️ 한 줄에 몇 개를 둘지는 **줄이 고르게 갈리도록** 역산한다. 7개 고정으로
//   두면 8개짜리 장이 「7 + 1」이 되어 둘째 줄에 한 개만 외로 남는다.
function layout(N, x0, x1, y0, y1) {
  const rows = Math.max(1, Math.ceil(N / 7));
  const cols = Math.ceil(N / rows);
  const out = [];
  for (let i = 0; i < N; i++) {
    const r = Math.floor(i / cols);
    let c = i % cols;
    if (r % 2 === 1) c = cols - 1 - c;            // 되꺾기 — 길이 이어진다
    const px = cols === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * (c / (cols - 1));
    const py = rows === 1 ? (y0 + y1) / 2 : y0 + (y1 - y0) * (r / (rows - 1));
    out.push([px, py, r]);
  }
  return out;
}

// ⭐⭐ **노드의 색은 「그 스테이지를 깬 가장 어려운 난이도」다**(사용자 확정).
//
// ⚠️⚠️ 이것이 앞의 「색은 화면에 하나」 규약을 **고쳐 쓴다.** 첫 판은 금빛이
//   「지금 여기」였는데, 금빛이 이제 「보통으로 깼다」의 뜻이라 둘이 부딪힌다.
//   ⇒ **색과 형태로 축을 가른다**:
//     · **색** = 어느 난이도로 깼나 (하양·노랑·빨강·자주 / 못 깼으면 회백)
//     · **형태** = 지금 어디인가 (큰 고리 + 후광 / 윤곽 / 작은 고리)
//   두 축이 안 겹치므로 「빨간 노드 위에 지금 서 있다」가 한 번에 읽힌다.
//   ⇒ 규약은 「색은 화면에 하나」가 아니라 **「색의 뜻은 하나」**가 된다.
//
// ⭐⭐ **금빛의 자리가 정해졌다** — 「**지금 깨야 할 칸**」이다(사용자 확정).
//   난이도 넷에서 금빛을 뺀 것이 이 자리를 비우려던 것이었다: 금빛은 이
//   게임에서 늘 **「다음에 할 일」**의 색이고(주 버튼·출격), 지도에서도 같다.
//   ⇒ 색이 말하는 것 둘이 **안 겹친다**:
//     · 난이도 넷(하양·초록·빨강·자주) = **해낸 것**
//     · 금빛 = **해야 할 것**
//
// [best] 는 깬 난이도 이름(null = 아직). [st] 는 지금 어디인가.
function node(c, x, y, n, st, stars, best) {
  const th = best ? THEME[best] : null;
  // ⚠️ **아직 안 깬 「지금」 칸만 금빛**이다. 이미 깬 칸에 다시 서 있으면
  //   (더 높은 난이도에 도전 중) 색은 그 난이도 것이 남는다 — 「해낸 것」이
  //   「해야 할 것」에 지워지면 기록이 사라진다.
  const todo = st === 1 && !best;
  const col = todo ? INK.now
            : (th ? th.key : (st === 1 || st === 2 ? INK.done : INK.open));
  const rgb = todo ? "232,200,121" : (th ? th.rgb : "206,208,224");

  if (st === -1) {                                    // 잠김 — 작은 고리
    c.fillStyle = "rgba(10,8,14,.70)";
    c.beginPath(); c.arc(x, y, 7, 0, TAU); c.fill();
    c.strokeStyle = INK.lock; c.lineWidth = 1; c.stroke();
    return;
  }
  const R = st === 1 ? 16 : 12;
  if (st === 1) {                                     // 지금 — **후광이 형태다**
    // ⭐⭐ **광원이 퍼진다**(사용자 요청). 고른 칸에서 빛이 **발원**한다 —
    //   깬 칸이든 아니든 상관없이, **색만 그 칸의 것**이다(1장5·2장3은 금빛,
    //   3장9는 이미 쉬움으로 깼으니 하양).
    //
    // ⚠️⚠️ **위상 파생값을 따로 안 든다.** 링마다 `u` 하나를 뽑고 반경·알파를
    //   **거기서만** 파생한다 — 둘이 각자 주기를 가지면 한 바퀴마다 튄다.
    //   알파는 `sin(πu)` 라 양끝이 0 이다: 링이 **생기는 순간과 사라지는
    //   순간이 둘 다 투명**해야 주기의 이음매가 안 보인다.
    const RINGS = 3;
    for (let k = 0; k < RINGS; k++) {
      const u = (T_NOW * .55 + k / RINGS) % 1;
      const rr = R * (1.15 + 2.4 * u);
      const a = Math.sin(Math.PI * u) * .34;
      c.beginPath(); c.arc(x, y, rr, 0, TAU);
      c.strokeStyle = "rgba(" + rgb + "," + a + ")";
      c.lineWidth = 1.4 * (1 - u * .5);
      c.stroke();
    }
    // 그 아래 숨 쉬는 후광 — 링만 있으면 「신호」이지 「광원」이 아니다.
    const pu = .5 + .5 * Math.sin(T_NOW * 2.0);
    const hr = R * (2.6 + .5 * pu);
    const g = c.createRadialGradient(x, y, 0, x, y, hr);
    g.addColorStop(0, "rgba(" + rgb + "," + (.28 + .20 * pu) + ")");
    g.addColorStop(1, "rgba(" + rgb + ",0)");
    c.fillStyle = g; c.beginPath(); c.arc(x, y, hr, 0, TAU); c.fill();
  }
  // ⚠️ 배경 은하가 진해지면 노드가 묻힌다 — 바탕을 어둡게 깔아 글자를 띄운다.
  c.beginPath(); c.arc(x, y, R, 0, TAU);
  c.fillStyle = "rgba(10,8,14,.84)"; c.fill();
  // 매우어려움으로 깬 것만 빛난다 — 팝업의 그 규약 그대로
  if (th && th.glow) {
    // 명멸 — **아주 얕게**. 깜빡이면 「고장」이고, 숨 쉬면 「살아 있다」다.
    const br = 10 + 6 * (.5 + .5 * Math.sin(T_NOW * 1.4 + x * .01));
    c.save();
    c.shadowColor = "rgba(" + th.rgb + ",.80)"; c.shadowBlur = br;
    c.strokeStyle = col; c.lineWidth = 1.6; c.stroke();
    c.restore();
  }
  c.strokeStyle = col; c.lineWidth = st === 1 ? 1.9 : 1.2; c.stroke();
  // 지금 — 바깥에 링 하나 더. **색이 아니라 형태**로 「여기」를 말한다.
  if (st === 1) {
    c.beginPath(); c.arc(x, y, R + 5, 0, TAU);
    c.strokeStyle = "rgba(" + rgb + ",.44)";
    c.lineWidth = 1; c.stroke();
  }
  c.fillStyle = col;
  c.font = (st === 1 ? "600 13.5px" : "12px") + " -apple-system,sans-serif";
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillText(String(n), x, y + .5);
  if (best && stars > 0) {                            // ★ — 깬 것만
    c.font = "8px -apple-system,sans-serif";
    c.fillStyle = "rgba(" + th.rgb + ",.62)";
    c.fillText("★".repeat(stars), x, y + R + 8);
  }
}

// ⚠️⚠️ **백버퍼를 화면 픽셀에 맞춘다.** 캔버스가 852 인데 CSS 로 750 에
//   `scale(.88)` 까지 걸려 있고 화면이 dpr 2 라, 실제로는 **1500 화면 픽셀에
//   852 를 늘려 그리고 있었다**(1.76배). 1px 별이 1.76px 로 번져 배경이
//   통째로 뭉갰다(사용자: 「뒤에 배경이 뭔가 깨지는 듯한 느낌인데」).
//   ⇒ 백버퍼를 dpr 만큼 키우고 좌표계를 그만큼 확대한다. 그리는 코드는
//     852×393 그대로 쓰면 된다.
function fitDpr(cv) {
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  const W = +cv.dataset.w || cv.width, H = +cv.dataset.h || cv.height;
  cv.dataset.w = W; cv.dataset.h = H;
  cv.style.width = W + "px"; cv.style.height = H + "px";
  const want = Math.round(W * dpr);
  if (cv.width !== want) { cv.width = want; cv.height = Math.round(H * dpr); }
  const c = cv.getContext("2d");
  c.setTransform(dpr, 0, 0, dpr, 0, 0);
  return [c, W, H, dpr];
}

function chapter(cv, opt) {
  const [c, W, H, DPR] = fitDpr(cv);
  c.clearRect(0, 0, W, H);
  starfield(c, W, H, opt.seed);

  const L = 62, T = 34, B = 52;                 // 레일 · 위 띠 · 창틀
  const gx = L + (W - L) / 2, gy = T + (H - T - B) / 2;
  // 은하 — **아주 느리게** 돈다. 빠르면 「돌아간다」가 되어 지도가 못 쉰다.
  //   한 바퀴에 약 4분이라 눈에는 「떠 있다」로만 읽힌다.
  {
    const R = (H - T - B) * 1.32;
    const img = bakedGalaxy(opt.shape, R, opt.seed, DPR);
    const SS = Math.max(2, DPR);
    const w = img.width / SS, h = img.height / SS;
    c.save(); c.translate(gx, gy); c.rotate(T_NOW * 0.026);
    c.drawImage(img, -w / 2, -h / 2, w, h);
    c.restore();
  }

  const pts = layout(opt.count, L + 62, W - 62, T + 62, H - B - 46);

  // 길 — 노드보다 먼저. 지나온 구간만 밝고 실선이다.
  for (let i = 0; i < opt.count - 1; i++) {
    const [x0, y0, r0] = pts[i], [x1, y1, r1] = pts[i + 1];
    const passed = i + 1 < opt.at;
    c.strokeStyle = passed ? INK.lineDone : INK.line;
    c.lineWidth = 1.2; c.setLineDash(passed ? [] : [3, 4]);
    c.beginPath();
    if (r0 === r1) { c.moveTo(x0, y0); c.lineTo(x1, y1); }
    else {                                       // 줄이 바뀌는 자리 — 밖으로 돈다
      const bend = x0 > W / 2 ? 34 : -34;
      c.moveTo(x0, y0);
      c.quadraticCurveTo(x0 + bend, (y0 + y1) / 2, x1, y1);
    }
    c.stroke();
  }
  c.setLineDash([]);

  for (let i = 0; i < opt.count; i++) {
    const st = i + 1 < opt.at ? 2 : (i + 1 === opt.at ? 1 : (i + 1 === opt.at + 1 ? 0 : -1));
    // ⚠️ **지금 서 있는 칸도 깼을 수 있다** — 보통으로 깨고 어려움에 도전하는
    //   중이면 st 는 1(지금)이고 기록은 「보통 ★★」이다. 둘은 다른 축이다.
    const rec = opt.best ? opt.best[i] : null;
    node(c, pts[i][0], pts[i][1], i + 1, st, rec ? rec[1] : 0, rec ? rec[0] : null);
  }

  // ── 레일
  const rail = ["홈", "상점", "도감", "일지", "관측소"];
  c.textAlign = "center";
  rail.forEach((nm, i) => {
    const y = H / 2 - 84 + i * 42, on = i === 4;
    c.fillStyle = on ? "#EDEDF2" : "#6E6E7C";
    c.font = "9.5px -apple-system,sans-serif";
    c.fillText(nm, 31, y + 13);
    c.strokeStyle = on ? "rgba(237,237,242,.85)" : "rgba(180,180,200,.18)";
    c.lineWidth = on ? 1.6 : 1;
    c.beginPath(); c.arc(31, y, 6.5, 0, TAU); c.stroke();
  });

  // ── 위 — 뒤로 · 장 이름 · 진행
  c.textAlign = "left"; c.textBaseline = "alphabetic";
  c.fillStyle = "#8B8B99"; c.font = "11px -apple-system,sans-serif";
  c.fillText("‹ 관측소", L + 14, 22);
  c.fillStyle = "#E8E8F0"; c.font = "600 12.5px -apple-system,sans-serif";
  c.fillText(opt.title, L + 76, 22);
  c.textAlign = "right";
  c.fillStyle = "#8B8B99"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText((opt.at - 1) + " / " + opt.count + " 돌파", W - 16, 22);

  // ── 창틀 — **요약만**. 출격 버튼은 없다.
  //
  // ⚠️⚠️ 첫 판엔 가로로 꽉 찬 「출격」 띠가 있었는데 **걷어 냈다**(사용자:
  //   「저걸 누르고 간략 정보 팝업이 뜨고 거기서 출격을 누를 거니까」).
  //   ⭐ 그게 맞다 — 나가는 문이 **둘**이면 「어느 쪽이 진짜인가」가 생긴다.
  //     지도에서 고르는 것은 **장소**이고, 나가는 결정은 **팝업 하나**다.
  const by = H - B + 30;
  c.textAlign = "left";
  c.fillStyle = "#6E6E7C"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText("덱 · 성흔 ", L + 14, by);
  c.fillStyle = "#CED0E0"; c.font = "600 10.5px -apple-system,sans-serif";
  c.fillText("20 / 20", L + 62, by);
  c.fillStyle = "#6E6E7C"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText("—  성좌 3", L + 116, by);
  // 범례 — **테두리 색이 무엇을 뜻하는지.** 색이 뜻을 갖는 순간 범례는 의무다.
  c.font = "9px -apple-system,sans-serif";
  let lgx = L + 176;
  // 금빛 먼저 — **해야 할 것**이 앞이고, 그 뒤가 **해낸 것**이다.
  c.beginPath(); c.arc(lgx + 4, by - 3, 4, 0, TAU);
  c.strokeStyle = INK.now; c.lineWidth = 1.4; c.stroke();
  c.fillStyle = "#8B8B99"; c.fillText("여기부터", lgx + 12, by);
  lgx += 12 + c.measureText("여기부터").width + 20;
  c.fillStyle = "#5E5E6C"; c.fillText("깬 난이도", lgx, by);
  lgx += 44;
  ["쉬움", "보통", "어려움", "매우어려움"].forEach(nm => {
    const t = THEME[nm];
    c.beginPath(); c.arc(lgx + 4, by - 3, 4, 0, TAU);
    c.strokeStyle = t.key; c.lineWidth = 1.2; c.stroke();
    c.fillStyle = "#6E6E7C"; c.fillText(nm, lgx + 12, by);
    lgx += 12 + c.measureText(nm).width + 11;
  });
  // ⭐ 문은 버튼으로 — 11.5px 잿빛 글자였다가 **공용 버튼(회백)**이 됐다
  //   (2026-08-21 실기: 사용자가 이 문을 못 찾았다. 글자는 버튼으로 안
  //   읽힌다). 높이 52 = 회백(.gh)의 엄지 자 그대로.
  ghostBtn(c, W - 16 - 96, H - 60, 96, 52, "편집 ›");
}

// ── 공용 버튼(회백) — 창틀의 「편집 ›」 ─────────────────────────────────────
//
// 7부위의 정본은 UI 장(mockup-ui.html 「버튼의 해부」)이고, 여기는 그 회백
// (.ovbtn.gh)을 캔버스로 옮긴 것이다: 계조 3단(34/70%) · 위 1px 앞날(백 20%) ·
// 아래 3px 굽(흑 45%) · 깎기 11 · 글자 600 15px. 눌림·그림자는 시안 정지
// 한 컷이라 안 옮긴다.
function ghostBtn(c, x, y, w, h, label) {
  const cut = () => {
    c.beginPath();
    c.moveTo(x, y); c.lineTo(x + w - 11, y); c.lineTo(x + w, y + 11);
    c.lineTo(x + w, y + h); c.lineTo(x + 11, y + h); c.lineTo(x, y + h - 11);
    c.closePath();
  };
  c.save(); cut(); c.clip();
  c.fillStyle = "#272733"; c.fillRect(x, y, w, h * .34);
  c.fillStyle = "#1E1E27"; c.fillRect(x, y + h * .34, w, h * .36);
  c.fillStyle = "#15151C"; c.fillRect(x, y + h * .70, w, h * .30);
  c.fillStyle = "rgba(255,255,255,.20)"; c.fillRect(x, y, w, 1);
  c.fillStyle = "rgba(0,0,0,.45)"; c.fillRect(x, y + h - 3, w, 3);
  c.restore();
  c.strokeStyle = "rgba(180,180,200,.30)"; c.lineWidth = 1; cut(); c.stroke();
  c.textAlign = "center"; c.textBaseline = "middle";
  c.fillStyle = "#D6D6E2"; c.font = "600 15px -apple-system,sans-serif";
  c.fillText(label, x + w / 2, y + h / 2 + 1);
  c.textBaseline = "alphabetic"; c.textAlign = "left";
}

// ── 깬 기록 — **[가장 어려운 난이도, 그 난이도에서 받은 별]** ─────────────
//
// 사용자 확정: 「1장 1스테이지 **보통**이 최고 난이도 클리어면 (그 색), 별 3개.
//   1장 2스테이지 **매우어려움 별 2개**가 최고면 그 칸은 **보라 테두리에 별 2개**」
//
// ⭐ **쌍이다.** 색과 별이 **같은 판**에서 나와야 한다 — 쉬움에서 ★★★ 이고
//   매우어려움에서 ★ 인 사람의 칸에 「보라 + ★★★」을 적으면 **하지도 않은
//   일**이 화면에 뜬다. 더 어려운 쪽을 골랐으면 별도 그쪽 것이다.
//
// ⚠️ 그래서 별을 해시로 뽑던 첫 판을 걷었다 — 별은 꾸밈이 아니라 **기록**이다.
const BEST1 = [
  ["보통", 3], ["매우어려움", 2], ["어려움", 3], ["쉬움", 1], null,
  null, null, null, null, null, null, null];
const BEST2 = [["보통", 2], ["어려움", 3], null, null, null, null, null, null];
const BEST3 = [
  ["매우어려움", 3], ["어려움", 2], ["어려움", 3], ["보통", 1], ["매우어려움", 1],
  ["쉬움", 3], ["보통", 2], ["어려움", 2], ["쉬움", 1],
  null, null, null, null, null];


// ── 스테이지 팝업 — **나가는 문은 여기 하나다** ─────────────────────────────
//
// 사용자 확정: 「저 스테이지를 누르면 팝업이 뜨고, **난이도를 선택**할 수 있고,
//   **간단하게 캐릭터 상태를 파악**할 수 있는 거지 (어떤 스킬들을 선택한
//   상태인지, 캐릭터의 능력치 요약이라든지)」
//
// ⭐ 세 칸이다. 왼쪽이 **간다**(어디로·얼마나 세게), 오른쪽이 **누가 가나**
//   (덱·능력치). 그 둘을 본 뒤에 아래 출격을 누른다.
//
// ⚠️ **여기서 직접 고치지는 않는다 — 고치러 가는 문이 안에 있다**(2026-08-21):
//   「편집 ›」과 덱 아이콘 스무 칸. 편성 팝업이 이 팝업 **위에** 얹히고 닫으면
//   여기로 돌아온다 — 「팝업 안 팝업」을 막던 옛 판정의 근거(되돌아올 자리를
//   못 찾는다)가 얹힌 구조에선 성립하지 않는다. 규약은 본문 ⑮.
// ⭐ **난이도마다 제 기록이 붙는다**(사용자: 「난이도에서 이미 깬 것 같은 경우는
//   별 몇 개로 몇 초 만에 깼는지 정보도 보여 줘」).
//   그래야 칩이 「고르는 것」이 아니라 **「어디까지 해냈나」**가 된다 — 같은
//   스테이지를 쉬움으로 ★★★ 하고 보통은 ★★ 인 상태가 한눈에 보인다.
// ⚠️ `star` 0 = 아직 안 깼다. 그때는 아랫줄에 「아직」만 적는다 — 비워 두면
//   칩 높이가 들쭉날쭉해지고, 「못 깬다」로 읽힐 수도 있다.
const TIER = [
  { nm: "쉬움",     mul: "×0.6", on: 0, lock: 0, star: 3, best: "20:38" },
  { nm: "보통",     mul: "×1.0", on: 1, lock: 0, star: 2, best: "22:11" },
  { nm: "어려움",   mul: "×1.6", on: 0, lock: 0, star: 0, best: null },
  { nm: "매우어려움", mul: "×2.5", on: 0, lock: 1, star: 0, best: null },
];
// ── 덱 — **든 것을 낱개로 보여 준다** ─────────────────────────────────────
//
// ⚠️⚠️ 첫 판은 계열별 막대(「일반 8 · 마법 6 …」)였는데 갈아엎었다(사용자:
//   「덱 20/20 으로 표현하지 말고 **선택한 스킬들 작은 아이콘으로** 8/20
//   이런 식으로 해서 팝업 내에서 보여 줘」).
//   ⭐ 그게 맞다 — 계열 수는 **분류**이지 「내가 든 것」이 아니다. 이 팝업의
//     일은 「누가 가나」를 확인하는 것이고, 확인은 **낱개를 보는 것**이다.
//
// ⭐ 스무 칸은 **문이다**(2026-08-21) — 누르면 바뀌는 게 아니라 편성(덱 탭)이
//   열린다. 빈 칸도 눌린다 — 낱칸 20px 는 과녁으로 못 쓰고, 목적지가 하나라
//   격자 통째가 한 문이다.
//   [계열, 채움] — 채움은 스무 칸 중 든 것을 앞에서부터 채운 상태다.
const DECK = [
  "일반","일반","일반","일반","마법","마법","일반","마법",
  "방어","일반","마법","회복","일반","마법","방어","버프",
];
const DECK_CAP = 20;
// 계열 색 — 도감·상점과 같은 다섯. 아이콘을 안 그려도 **계열이 색으로** 읽힌다.
const TAGCOL = {
  "일반": "#FFD27A", "마법": "#96BEFF", "방어": "#A0DCC8",
  "회복": "#C8A0DC", "버프": "#DCC8A0",
};
// 능력치 요약 — 홈 콜아웃과 **같은 여섯**(축이 화면마다 다르면 못 외운다).
//
// ⭐ **[축, Lv, 값]** 셋이다(사용자: 「Lv 이 몇인지도 보여 주고 — 공격력 레벨,
//   마법력 레벨」). 값(+12.4%)만 적으면 **얼마나 더 올릴 수 있나**를 모른다 —
//   상점에서 사는 것은 값이 아니라 **레벨**이라, 레벨이 안 보이면 이 표와
//   상점이 다른 것을 말하게 된다.
const STATSUM = [
  ["공격력", 8, "+12.4%"], ["마법력", 6, "+38.8%"], ["치명타", 3, "9.3%"],
  ["체력", 9, "166"], ["방어력", 4, "3.6"], ["이동", 3, "+10.5%"],
];
const LV_CAP = 99;


// ── 캐릭터 — **발현체.** 홈의 그 히어로를 팝업 크기로 접은 것 ─────────────
//
// ⚠️⚠️ 첫 판의 왼쪽 칸은 숫자 여섯뿐이었다(사용자: 「능력치 쪽에 캐릭터
//   보여 주는 게 낫지 않나? 너무 텍스트만 있는데」).
//   ⭐ 그게 맞다 — 이 칸의 물음은 「내가 얼마나 세나」이고, 그 답을 **숫자로
//     읽기 전에 몸으로** 본다. 홈에서 키운 그 발현체가 여기 다시 나와야
//     「내가 간다」가 되고, 안 나오면 능력치는 남의 표가 된다.
//
// ⚠️ 홈의 여섯 축(구 반경·알갱이 수·반짝임·퍼짐·공전·색)을 여기서 다시 짜지
//   않는다 — 팝업은 **확인하는 자리**라 정지된 한 컷이면 된다. 다만 **몸(각진
//   별 3겹)의 크기는 홈과 같은 규약**으로 안 변한다: 1레벨과 만렙이 같은
//   사람이어야 한다.
// ⚠️ `jagPoly` 도 `vfx.js` 것을 쓴다 — 「뾰족한 실루엣」의 문법은 한 벌이어야
//   캐릭터가 로비와 여기서 같은 몸으로 보인다.
function jag(c, cx, cy, r, n, seed, spike) {
  fillPoly(c, jagPoly(cx, cy, r, n, seed, spike), c.fillStyle);
}

// [p] 는 발현 정도 0~1 (메타 평균 / 99).
function chHero(c, cx, cy, R, p) {
  const lit = .60 + .40 * p;                     // 밝기 바닥 — 1레벨도 칠흑은 아니다
  const sc = .52 + .48 * p;                      // 구 반경
  const tone = [                                 // 색 — 회백 → 흰빛
    "rgba(" + Math.round(47 + 22 * p) + "," + Math.round(47 + 22 * p) + "," + Math.round(57 + 27 * p) + ",",
    "rgba(" + Math.round(141 + 89 * p) + "," + Math.round(141 + 89 * p) + "," + Math.round(152 + 90 * p) + ",",
    "rgba(" + Math.round(166 + 89 * p) + "," + Math.round(166 + 89 * p) + "," + Math.round(170 + 85 * p) + ",",
  ];
  c.save();
  c.globalCompositeOperation = "lighter";
  const g = c.createRadialGradient(cx, cy, 0, cx, cy, R * 1.5 * sc);
  g.addColorStop(0, tone[1] + (.28 * lit) + ")");
  g.addColorStop(1, tone[1] + "0)");
  c.fillStyle = g;
  c.beginPath(); c.arc(cx, cy, R * 1.5 * sc, 0, TAU); c.fill();
  c.restore();

  // ── 껍질 알갱이 — **살아 있어야 한다** ─────────────────────────────────
  //
  // ⚠️⚠️ 첫 판은 정지 한 컷이었다(사용자: 「로비처럼 그 **구**가 살아 있듯이
  //   움직이잖아, 그 효과가 빠진 것 같네」). 로비 히어로의 여섯 축 중 **공전**과
  //   **반짝임**이 시간을 타는 둘인데 그 둘을 뺐던 것이다 — 구가 멈추면
  //   「발현체」가 아니라 **도형**이 된다.
  //
  // ⭐ 두 축을 되살린다. 로비와 같은 식이다:
  //   · **공전** — 껍질 전체가 **같은 속도로** 돈다(`spin`). 배율 하나가 곧
  //     「얼마나 빨리 도나」라 발현이 오를수록 빨라진다
  //   · **반짝임의 물결** — 위상이 **방위를 따라 밀려** 한 방향으로 지나간다
  //     (`- az * 1.7`). 낱개가 제멋대로 깜빡이면 「고장」이고, 물결이어야
  //     「빛이 훑고 지나간다」가 된다
  //
  // ⚠️ 반짝임의 **빈도**는 발현을 탄다(`tw`) — 1레벨은 드문드문, 만렙은 자주.
  const NP = Math.round(30 + 230 * p) * .34;
  const r0 = R * 1.04 * sc;
  const spin = T_NOW * .26 * (1.0 + .9 * p);       // 공전 — 만렙이 1.9배 빠르다
  const twSpeed = 2.6 * (.45 + .70 * p);           // 반짝임 빈도
  for (let i = 0; i < NP; i++) {
    const zz = 1 - 2 * hash(i * 1.7 + .31), sr = Math.sqrt(Math.max(0, 1 - zz * zz));
    const th = hash(i * 5.3) * TAU + spin;         // ⭐ 껍질 전체가 같은 속도로
    const x3 = sr * Math.cos(th), z3 = sr * Math.sin(th);
    const rad = r0 * (.93 + .12 * hash(i * 9.1));
    const dz = z3 * .5 + .5;
    // ⭐ 물결 — 위상이 방위(`az`)를 따라 밀린다
    const az = Math.atan2(z3, x3);
    const base = Math.max(0, Math.sin(twSpeed * T_NOW + i * 2.399 - az * 1.7));
    const tw = base * base * base;
    const al = Math.max(0, (.16 + .84 * tw) * (.42 + .58 * dz)) * lit;
    const sz = (.75 + .95 * hash(i * 7.3)) * (.68 + .5 * dz) * (1 + .7 * tw) * (R / 45);
    c.fillStyle = (tw > .55 ? tone[2] : tone[1]) + al + ")";
    c.beginPath(); c.arc(cx + x3 * rad, cy + zz * rad * .94, sz, 0, TAU); c.fill();
    // 유난히 밝은 몇은 **별처럼 튄다** — 퍼지는 범위도 발현을 탄다
    if (tw > .72) {
      const f = (tw - .72) / .28, fl = .45 + .73 * p;
      const fr = sz * 6 * f * fl;
      c.save(); c.globalCompositeOperation = "lighter";
      const g2 = c.createRadialGradient(cx + x3 * rad, cy + zz * rad * .94, 0,
                                        cx + x3 * rad, cy + zz * rad * .94, fr);
      g2.addColorStop(0, tone[2] + (.42 * f * dz * lit) + ")");
      g2.addColorStop(1, tone[1] + "0)");
      c.fillStyle = g2;
      c.beginPath(); c.arc(cx + x3 * rad, cy + zz * rad * .94, fr, 0, TAU); c.fill();
      c.restore();
    }
  }

  // 코어 — **크기 고정.** 어느 축도 안 탄다.
  c.fillStyle = tone[0] + ".95)"; jag(c, cx, cy, R * .40, 7, 3.2, 1.3);
  c.fillStyle = tone[1] + "1)";   jag(c, cx, cy, R * .30, 7, 3.6, 1.25);
  c.fillStyle = tone[2] + "1)";   jag(c, cx, cy, R * .16, 7, 4.2, 1.2);
}

// 발광 — [th.glow] 가 0 이면 아무 일도 안 한다(다른 셋은 그대로).
//
// ⚠️⚠️ **`shadowBlur` 한 번으론 안 번진다.** 캔버스의 그림자는 한 겹이라
//   테두리 바로 옆에서 뚝 끊긴다 — 「빛난다」가 아니라 「테두리가 두껍다」로
//   읽힌다(사용자: 「테두리 쪽에서도 빛이 나게 안 되나?」).
//   ⭐ **겹을 쌓는다.** 같은 획을 blur 를 키우며 세 번 그리면 안쪽은 진하고
//     밖은 옅게 번져 **광원**이 된다 — 은하 알갱이의 후광과 같은 수법이다.
function glowStroke(c, th, path, base) {
  // ⚠️⚠️ **`strokeStyle` 을 여기서 반드시 정한다.** 첫 판은 발광 없는 갈래에서
  //   그걸 빠뜨려 **직전에 쓰던 색**으로 그렸다 — 보통·어려움·쉬움의 테두리가
  //   통째로 사라졌다(사용자가 잡았다). 캔버스 상태는 전역이라, 상태를 안
  //   정하고 그리는 함수는 **부르는 자리에 따라 다른 그림**을 낸다.
  if (!th.glow) { c.strokeStyle = base; path(); c.stroke(); return; }
  const layers = [[26, .34], [14, .52], [6, .78]];
  for (const [blur, a] of layers) {
    c.save();
    c.shadowColor = "rgba(" + th.rgb + "," + a + ")";
    c.shadowBlur = blur * th.glow;
    c.strokeStyle = "rgba(" + th.rgb + "," + (a * .9) + ")";
    path(); c.stroke();
    c.restore();
  }
  c.strokeStyle = base; path(); c.stroke();
}
function glowOn(c, th, blur) {
  if (!th.glow) return;
  c.shadowColor = "rgba(" + th.rgb + ",.85)";
  c.shadowBlur = blur * th.glow;
}
function glowOff(c) { c.shadowBlur = 0; c.shadowColor = "transparent"; }

function popup(cv, opt) {
  chapter(cv, opt);                                 // 뒤에 지도를 깔고
  const [c, W, H] = fitDpr(cv);
  const TH = THEME[opt.tier];
  c.fillStyle = "rgba(5,3,8,.72)";                    // 어둠막
  c.fillRect(0, 0, W, H);

  // ⚠️ 팝업이 화면에 꽉 차면 **팝업으로 안 읽힌다** — 「위에 뜬 것」이 아니라
  //   「다음 화면」이 된다(사용자: 「위아래가 너무 100% 꽉 찬데 살짝 팝업처럼
  //   공간 만들어 줘」). 뒤가 보이는 만큼이 「돌아갈 데가 있다」는 뜻이다.
  const pw = 648, ph = 328, px = (W - pw) / 2, py = (H - ph) / 2;
  // 패널 — 모서리 깎기(셀 문법)
  const panel = () => {
    c.beginPath();
    c.moveTo(px, py); c.lineTo(px + pw - 13, py); c.lineTo(px + pw, py + 13);
    c.lineTo(px + pw, py + ph); c.lineTo(px + 13, py + ph); c.lineTo(px, py + ph - 13);
    c.closePath();
  };
  panel();
  c.fillStyle = "rgba(10,7,16,.97)"; c.fill();
  c.lineWidth = 1;
  glowStroke(c, TH, panel,
    TH.glow ? "rgba(" + TH.rgb + ",.92)" : "rgba(" + TH.rgb + ",.40)");

  // ── 머리 — 어디로 가나
  c.textAlign = "left"; c.textBaseline = "alphabetic";
  c.fillStyle = "#6E6E7C"; c.font = "9.5px -apple-system,sans-serif";
  c.fillText("착륙 예정 지점", px + 22, py + 24);
  c.fillStyle = "#E8E8F0"; c.font = "600 17px -apple-system,sans-serif";
  glowOn(c, TH, 10); c.fillText(opt.stage, px + 22, py + 45); glowOff(c);
  c.fillStyle = "#8B8B99"; c.font = "11px -apple-system,sans-serif";
  c.fillText(opt.blurb, px + 22, py + 63);
  c.textAlign = "right";
  c.fillStyle = "#6E6E7C"; c.font = "13px -apple-system,sans-serif";
  c.fillText("✕", px + pw - 20, py + 28);

  // ⚠️⚠️ **좌우를 바꿨다**(사용자 2차 판정). 첫 판은 왼쪽이 난이도였는데,
  //   난이도는 **칩 넷**이면 되는 것을 큰 버튼 넷으로 세워 화면의 절반을
  //   먹고 있었다. 왼쪽은 **먼저 읽는 자리**이고, 먼저 읽어야 하는 것은
  //   「내가 얼마나 세나」다 — 난이도는 그걸 보고 **고르는** 것이라 뒤다.
  //   ⇒ 왼쪽 = 능력치 · 오른쪽 = 덱 + 난이도(작게).
  const mid = px + 252;
  c.strokeStyle = "rgba(180,180,200,.14)"; c.lineWidth = 1;
  c.beginPath(); c.moveTo(mid, py + 78); c.lineTo(mid, py + ph - 58); c.stroke();

  // ── 왼쪽 — **캐릭터 + 능력치.** 숫자로 읽기 전에 몸으로 본다.
  const lx = px + 22, lw = mid - 24 - lx;
  chHero(c, lx + lw / 2, py + 112, 34, opt.bloom);
  c.textAlign = "center";
  c.fillStyle = "#8B8B99"; c.font = "10px -apple-system,sans-serif";
  c.fillText("발현  평균 Lv " + opt.avgLv, lx + lw / 2, py + 158);

  c.textAlign = "left";
  c.fillStyle = "#5E5E6C"; c.font = "9px -apple-system,sans-serif";
  c.fillText("능 력 치", lx, py + 178);
  STATSUM.forEach(([nm, lv, v], i) => {
    const cx2 = lx + (i % 2) * 114, cy2 = py + 196 + Math.floor(i / 2) * 30;
    // 축 이름 + Lv — 「상점에서 무엇을 더 살 수 있나」가 여기서 읽힌다
    c.fillStyle = "#6E6E7C"; c.font = "9px -apple-system,sans-serif";
    c.fillText(nm, cx2, cy2);
    c.fillStyle = "rgba(" + TH.rgb + ",.72)"; c.font = "9px -apple-system,sans-serif";
    const nw = c.measureText(nm).width;
    c.fillText("Lv " + lv, cx2 + nw + 6, cy2);
    c.fillStyle = "#4A4A58";
    c.fillText("/" + LV_CAP, cx2 + nw + 6 + c.measureText("Lv " + lv).width, cy2);
    // 값 — 그 레벨이 지금 내는 것
    c.fillStyle = "#CED0E0"; c.font = "600 13.5px -apple-system,sans-serif";
    c.fillText(v, cx2, cy2 + 15);
  });

  // ── 오른쪽 위 — 들고 가는 것
  const rx = mid + 24;
  c.fillStyle = "#5E5E6C"; c.font = "9px -apple-system,sans-serif";
  c.fillText("들 고  가 는  것", rx, py + 90);
  // ⭐ 편성으로 가는 문(2026-08-21 사용자: 「지금은 출격 페이지에서도 못
  //   세팅해」). 이 글자 + 아래 스무 칸 전부가 같은 문이다 — 누른 자리가
  //   첫 탭(덱)이 된다. 규약은 본문 ⑮.
  c.textAlign = "right";
  c.fillStyle = "#CED0E0"; c.font = "11.5px -apple-system,sans-serif";
  c.fillText("편집 ›", px + pw - 22, py + 90);
  c.textAlign = "left";
  c.fillStyle = "#CED0E0"; c.font = "600 12px -apple-system,sans-serif";
  c.fillText(DECK.length + " / " + DECK_CAP, rx, py + 106);
  // ⚠️ **다 안 찼으면 그 사실이 보여야 한다** — 빈 칸을 지우면 「스무 칸짜리」가
  //   화면에서 사라져 「덜 들었다」를 알 수가 없다.
  c.fillStyle = "#5E5E6C"; c.font = "9.5px -apple-system,sans-serif";
  c.fillText(DECK.length < DECK_CAP ? "빈 칸 " + (DECK_CAP - DECK.length) : "가득",
             rx + 44, py + 106);

  // 아이콘 격자 — 10열 × 2행. 낱개 하나가 스킬 하나다.
  const IS = 20, IG = 4;
  for (let i = 0; i < DECK_CAP; i++) {
    const gx2 = rx + (i % 10) * (IS + IG), gy2 = py + 116 + Math.floor(i / 10) * (IS + IG);
    const tag = DECK[i];
    if (!tag) {
      c.strokeStyle = "rgba(150,150,175,.22)"; c.lineWidth = 1;
      c.strokeRect(gx2 + .5, gy2 + .5, IS - 1, IS - 1);
      continue;
    }
    const col = TAGCOL[tag];
    c.fillStyle = "rgba(255,255,255,.04)"; c.fillRect(gx2, gy2, IS, IS);
    c.strokeStyle = col + "66"; c.lineWidth = 1;
    c.strokeRect(gx2 + .5, gy2 + .5, IS - 1, IS - 1);
    // 문양 자리 — 시안의 `drawOfferIcon` 이 들어올 칸이다. 여기서는 계열 색의
    // 각진 조각으로 대신한다(**아이콘을 지어내지 않는다**).
    c.fillStyle = col + "CC";
    c.beginPath();
    const mx = gx2 + IS / 2, my = gy2 + IS / 2, rr = 5.4;
    for (let k = 0; k < 7; k++) {
      const a = k / 7 * TAU, rv = rr * (k % 2 ? .58 : 1);
      k ? c.lineTo(mx + Math.cos(a) * rv, my + Math.sin(a) * rv * .92)
        : c.moveTo(mx + Math.cos(a) * rv, my + Math.sin(a) * rv * .92);
    }
    c.closePath(); c.fill();
  }

  // 계열 범례
  c.font = "9px -apple-system,sans-serif";
  let lgx = rx;
  Object.entries(TAGCOL).forEach(([nm, col]) => {
    c.fillStyle = col + "CC"; c.fillRect(lgx, py + 168, 6, 6);
    c.fillStyle = "#7A7A8C"; c.fillText(nm, lgx + 10, py + 174);
    lgx += 10 + c.measureText(nm).width + 12;
  });
  c.fillStyle = "#7A7A8C"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText("성좌 3 / 3   ·   궁극기  개안", rx, py + 192);

  // ── 오른쪽 아래 — 난이도. **칩 넷 한 줄**이다.
  //
  // ⚠️ 첫 판은 세로로 쌓은 큰 버튼 넷이었다(사용자: 「난이도 선택하는 버튼이
  //   너무 크다」). 넷 중 하나를 고르는 일에 화면의 절반을 쓸 이유가 없다 —
  //   **고른 것 하나만 금빛**이면 나머지는 작아도 읽힌다.
  c.fillStyle = "#5E5E6C"; c.font = "9px -apple-system,sans-serif";
  c.fillText("난 이 도", rx, py + 212);
  const CW = 71, CG = 6, CH = 38;
  TIER.forEach((t0, i) => {
    const t = Object.assign({}, t0, { on: t0.nm === opt.tier });
    const x = rx + i * (CW + CG), y = py + 220;
    const chip = () => {
      c.beginPath();
      c.roundRect ? c.roundRect(x, y, CW, CH, 7) : c.rect(x, y, CW, CH);
    };
    chip();
    c.fillStyle = t.on ? TH.key : "rgba(255,255,255,.02)";
    if (t.on) glowOn(c, TH, 16);
    c.fill();
    glowOff(c);
    c.lineWidth = 1;
    if (t.on) {
      glowStroke(c, TH, chip, TH.key);
    } else {
      c.strokeStyle = t.lock ? "rgba(150,150,175,.20)" : "rgba(180,180,200,.20)";
      chip(); c.stroke();
    }
    c.textAlign = "center";
    // 고른 칩은 바탕이 금빛이라 글자가 어둡다 — 「색은 화면에 하나」를 칩 안에서 지킨다
    const ink = t.on ? TH.ink : (t.lock ? "#4A4A58" : "#9C9CAC");
    c.fillStyle = ink;
    c.font = (t.on ? "600 10.5px" : "10.5px") + " -apple-system,sans-serif";
    c.fillText(t.nm, x + CW / 2, y + 14);
    // 아랫줄 — **제 기록**. ★는 고른 칩에서도 금빛이 아니다(바탕이 금빛이라).
    c.font = "8.5px -apple-system,sans-serif";
    if (t.lock) {
      c.fillStyle = "#3E3E4A";
      c.fillText("★★ 필요", x + CW / 2, y + 28);
    } else if (t.star > 0) {
      c.fillStyle = t.on ? TH.ink + "A0" : "rgba(" + TH.rgb + ",.60)";
      c.fillText("★".repeat(t.star), x + CW / 2, y + 26);
      c.fillStyle = t.on ? TH.ink + "90" : "#6E6E7C";
      c.font = "8px -apple-system,sans-serif";
      c.fillText(t.best, x + CW / 2, y + 34);
    } else {
      c.fillStyle = t.on ? TH.ink + "88" : "#5E5E6C";
      c.fillText("아직", x + CW / 2, y + 28);
    }
    c.textAlign = "left";
  });
  // 고른 것의 뜻만 한 줄 — 넷의 배수를 다 적으면 다시 표가 된다
  const sel = TIER.find(t => t.nm === opt.tier);
  c.fillStyle = "#6E6E7C"; c.font = "9.5px -apple-system,sans-serif";
  c.fillText("보상 " + sel.mul + "   ·   ★는 그 난이도에서 낸 최고 기록이다",
             rx, py + 272);

  // ── 출격 — **나가는 유일한 문**. 폭이 곧 무게다.
  const bx0 = px + 22, bx1 = px + pw - 22, byT = py + ph - 46, bh = 32;
  const g = c.createLinearGradient(bx0, 0, bx1, 0);
  g.addColorStop(0, TH.g0); g.addColorStop(1, TH.g1);
  const bar = () => {
    c.beginPath();
    c.moveTo(bx0, byT); c.lineTo(bx1 - 10, byT); c.lineTo(bx1, byT + 10);
    c.lineTo(bx1, byT + bh); c.lineTo(bx0 + 10, byT + bh); c.lineTo(bx0, byT + bh - 10);
    c.closePath();
  };
  c.fillStyle = g; bar(); c.fill();

  // ── ⭐⭐ 충전 게이지 — **누르면 지-잉 하고 찬다** ─────────────────────────
  //
  // 사용자 확정: 「출격 버튼을 누르면 **로딩되듯이** 버튼이 왼쪽에서 게이지가
  //   가득 차고 **소리가 나며** 진입」.
  //
  // ⭐ 왜 즉시 안 나가나 — 출격은 **20분을 거는 결정**이다. 한 박자를 두면
  //   ① 잘못 눌렀을 때 손을 뗄 수 있고 ② 「간다」가 사건이 된다.
  //   ⚠️ 대신 그 박자가 길면 **방해**다. 0.75초 — 손을 떼기엔 넉넉하고
  //     기다린다고 느끼기엔 짧은 자리다.
  const ch = cv._charge || 0;
  if (ch > 0) {
    c.save(); bar(); c.clip();
    // 찬 만큼 — 왼쪽에서 오른쪽으로
    const w = (bx1 - bx0) * ch;
    const gg = c.createLinearGradient(bx0, 0, bx0 + w, 0);
    gg.addColorStop(0, "rgba(" + TH.rgb + ",.30)");
    gg.addColorStop(1, "rgba(" + TH.rgb + ",.62)");
    c.fillStyle = gg; c.fillRect(bx0, byT, w, bh);
    // 앞끝 — **지금 어디까지 찼나**가 선 하나로 읽힌다
    c.fillStyle = "rgba(" + TH.rgb + ",.95)";
    c.fillRect(bx0 + w - 2, byT, 2, bh);
    c.restore();
  }

  c.lineWidth = 1;
  glowStroke(c, TH, bar,
    TH.glow ? "rgba(" + TH.rgb + ",.98)" : "rgba(" + TH.rgb + ",.52)");
  // 게이지가 다 차면 섬광 — 「들어간다」의 마침표
  if (ch >= 1) {
    c.save(); c.globalCompositeOperation = "lighter";
    c.fillStyle = "rgba(255,255,255," + (cv._flash || 0) * .5 + ")";
    bar(); c.fill(); c.restore();
  }
  // 눌리는 자리를 기억해 둔다 — 클릭 판정이 그림과 어긋나면 안 된다
  cv._bar = [bx0, byT, bx1 - bx0, bh];
  // ── 글자 — **바뀌는 것이 아니라 갈린다** ────────────────────────────────
  //
  // ⚠️⚠️ 첫 판은 `ch > 0 ? "진 입 중" : "출 격"` 한 줄이었다. 글자가 **툭**
  //   바뀌어 촌스러웠다(사용자). 상태가 둘이면 전환도 둘이어야 한다 —
  //   ⭐ **옛 글자는 위로 밀려 나가고 새 글자는 아래에서 올라온다.** 자리를
  //     물려주는 것이 보이면 「바뀌었다」가 아니라 **「넘어갔다」**가 된다.
  //
  // ⚠️ 겹치는 구간을 짧게 둔다(0.18) — 길면 두 글자가 나란히 떠 「겹쳤다」로
  //   읽힌다. 짧으면 하나가 나가고 하나가 드는 **한 동작**이 된다.
  const cxT = (bx0 + bx1) / 2 - 34;
  const SW = .18;
  const k = ch <= 0 ? 0 : Math.min(1, ch / SW);      // 0 = 출격 · 1 = 출격 중
  const ease = k * k * (3 - 2 * k);                  // smoothstep — 끝이 부드럽다
  c.textAlign = "center";
  c.save(); bar(); c.clip();                          // 띠 밖으로 안 새어 나간다
  glowOn(c, TH, 12);
  c.font = "600 14.5px -apple-system,sans-serif";
  if (ease < 1) {                                     // 나가는 글자 — 위로
    c.globalAlpha = 1 - ease;
    c.fillStyle = TH.key;
    c.fillText("출 격", cxT, byT + 21 - ease * 16);
  }
  if (ease > 0) {                                     // 드는 글자 — 아래에서
    c.globalAlpha = ease;
    c.fillStyle = TH.key;
    c.fillText("출 격 중", cxT, byT + 21 + (1 - ease) * 16);
  }
  c.globalAlpha = 1;
  glowOff(c);
  c.restore();

  // 오른쪽 꼬리표도 같이 갈린다 — 「보상 ×1.6」 자리에 진행률이 든다
  c.fillStyle = "#8B8B99"; c.font = "10.5px -apple-system,sans-serif";
  const cxS = (bx0 + bx1) / 2 + 52;
  c.save(); bar(); c.clip();
  if (ease < 1) {
    c.globalAlpha = 1 - ease;
    c.fillText(opt.tier + " · 보상 " + sel.mul, cxS, byT + 21 - ease * 16);
  }
  if (ease > 0) {
    c.globalAlpha = ease;
    c.fillText(Math.round(ch * 100) + "%", cxS, byT + 21 + (1 - ease) * 16);
  }
  c.globalAlpha = 1;
  c.restore();
}

const BASE = {
  shape: "E", count: 12, at: 5, seed: 3, best: BEST1,
  bloom: .34, avgLv: 24,
  title: "1장 · 스며드는 어둠",
  stage: "1-5 「얕은 여울」",
  blurb: "표류가 벽을 이룬다 — 서서 벨 수 있는 자리" };

// ── 프레임 루프 ───────────────────────────────────────────────────────────
//
// ⚠️ 움직이는 것은 **셋뿐**이다: 금빛 「여기부터」 맥박 · 매우어려움 명멸 ·
//   은하의 아주 느린 회전. 노드 번호·★·창틀·팝업 내용은 **확인하는 것**이라
//   움직이면 방해가 된다.
//
// ⚠️ `prefers-reduced-motion` 이면 한 컷만 그리고 멈춘다 — 움직임이 불편한
//   사람에게 로비는 오래 보는 화면이라 더 그렇다.
const REDUCED = window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function drawAll() {
  {
    const cv0 = document.getElementById("c0");
    if (cv0) chDepth1(cv0);
  }
  chapter(document.getElementById("c1"), {
    shape: "E", count: 12, at: 5, seed: 3, best: BEST1,
    title: "1장 · 스며드는 어둠" });
  chapter(document.getElementById("c2"), {
    shape: "S0", count: 8, at: 3, seed: 17, best: BEST2,
    title: "2장 · 갈라지는 어둠" });
  chapter(document.getElementById("c3"), {
    shape: "Sb", count: 14, at: 9, seed: 31, best: BEST3,
    title: "3장 · 덮쳐오는 어둠" });
  ["쉬움", "보통", "어려움", "매우어려움"].forEach((tier, i) => {
    const cv = document.getElementById("c" + (4 + i));
    if (cv) popup(cv, Object.assign({}, BASE, { tier }));
  });
}

if (REDUCED) {
  drawAll();
} else {
  const t0 = performance.now();
  (function frame(now) {
    T_NOW = (now - t0) / 1000;
    drawAll();
    requestAnimationFrame(frame);
  })(t0);
}

// ── 소리 — **「지-잉」** ────────────────────────────────────────────────────
//
// ⚠️ WebAudio 는 **사용자가 누르기 전엔 소리를 못 낸다**(자동재생 정책). 그래서
//   `AudioContext` 를 미리 안 만들고 **첫 클릭에** 만든다 — 미리 만들면
//   `suspended` 로 태어나 첫 소리가 통째로 사라진다.
let _ac = null;
function sndCharge(sec, rgbKey) {
  try {
    _ac = _ac || new (window.AudioContext || window.webkitAudioContext)();
    const t0 = _ac.currentTime;
    // 몸통 — 톱니가 **차오르는 소리**의 뼈대다(사인은 너무 곱고 사각은 거칠다)
    const o = _ac.createOscillator(), g = _ac.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(120, t0);
    o.frequency.exponentialRampToValueAtTime(520, t0 + sec);   // 지 —— 잉
    // ⚠️ 로우패스를 같이 열어야 「음이 올라간다」가 아니라 **「차오른다」**가 된다
    const lp = _ac.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(400, t0);
    lp.frequency.exponentialRampToValueAtTime(3600, t0 + sec);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(.14, t0 + sec * .25);
    g.gain.exponentialRampToValueAtTime(.20, t0 + sec);
    g.gain.exponentialRampToValueAtTime(.0001, t0 + sec + .18);
    o.connect(lp); lp.connect(g); g.connect(_ac.destination);
    o.start(t0); o.stop(t0 + sec + .2);
    // 마침 — 다 차는 순간의 「탁」. 이게 없으면 끝이 흐지부지하다.
    const o2 = _ac.createOscillator(), g2 = _ac.createGain();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(880, t0 + sec);
    o2.frequency.exponentialRampToValueAtTime(220, t0 + sec + .16);
    g2.gain.setValueAtTime(.22, t0 + sec);
    g2.gain.exponentialRampToValueAtTime(.0001, t0 + sec + .22);
    o2.connect(g2); g2.connect(_ac.destination);
    o2.start(t0 + sec); o2.stop(t0 + sec + .24);
  } catch (e) { /* 소리는 있으면 좋은 것이지 없으면 안 되는 것이 아니다 */ }
}

// ── 누르기 ────────────────────────────────────────────────────────────────
//
// ⚠️ 캔버스는 좌표가 **CSS 픽셀**로 온다 — 백버퍼(dpr 배)로 재면 두 배 어긋난다.
const CHARGE_SEC = .75;
function armSortie(cv) {
  cv.style.cursor = "pointer";
  cv.addEventListener("pointerdown", e => {
    const b = cv._bar;
    if (!b) return;
    const r = cv.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (x < b[0] || x > b[0] + b[2] || y < b[1] || y > b[1] + b[3]) return;
    if (cv._charging) return;
    cv._charging = true;
    cv._flash = 0;
    sndCharge(CHARGE_SEC);
    const t0 = performance.now();
    (function step(now) {
      const u = Math.min(1, (now - t0) / (CHARGE_SEC * 1000));
      cv._charge = u;
      if (u < 1) return requestAnimationFrame(step);
      // 섬광 — 짧게 터지고 사그라든다
      const f0 = performance.now();
      (function fade(n2) {
        const v = 1 - Math.min(1, (n2 - f0) / 420);
        cv._flash = v;
        if (v > 0) return requestAnimationFrame(fade);
        cv._charge = 0; cv._charging = false;      // 시안이라 되돌아온다
      })(f0);
    })(t0);
  });
}
["c4", "c5", "c6", "c7"].forEach(id => {
  const cv = document.getElementById(id);
  if (cv) armSortie(cv);
});

// ── 1뎁스 — **은하 지도.** 로비에서 가져왔다 ──────────────────────────────
//
// ⭐⭐ **그리는 코드를 새로 안 짰다.** `vfx.js` 의 `gxDraw`·`WGALAXY` 를 그대로
//   부른다 — 로비의 관측소가 바로 그것이고, 그 둘이 **한 벌이어야** 1뎁스에서
//   본 은하와 2뎁스 안쪽 배경이 같은 은하로 읽힌다.
//   ⚠️ 사본을 뜨면 언젠가 갈라진다(이미 `TAU`·`DRIFT` 로 두 번 겪었다).
//
// ⚠️ 1뎁스는 **장을 고르는 곳**이고 2뎁스는 **스테이지를 고르는 곳**이다.
//   그래서 창틀 문구가 다르다 — 위쪽은 「은하를 눌러 들어간다」, 아래쪽은
//   「스테이지를 눌러 들어간다」.
function chDepth1(cv) {
  const [c, W, H] = fitDpr(cv);
  c.clearRect(0, 0, W, H);
  starfield(c, W, H, 5);

  const L = 62, T = 34, B = 52;
  // ⚠️ `WGALAXY` 의 y 는 **.24~.52** — 단위 정사각의 **위쪽 28% 에만 산다.**
  //   그대로 창 높이에 곱하면 은하가 전부 위로 몰리고 아래 절반이 빈다(정본
  //   로비는 창이 세로로 길어 안 티났다). ⇒ **쓰는 만큼만 재서 띠 가운데로
  //   내린다.** 늘리지 않고 **옮기기만** 한다 — 늘리면 은하 사이 간격이 변해
  //   「형태가 곧 이름」인 배치가 흐트러진다.
  // ⚠️ 상수 43 을 박지 않는다. `WGALAXY` 가 바뀌면 같이 따라와야 한다.
  const ys = WGALAXY.map((p) => p.y);
  const mid = (Math.min(...ys) + Math.max(...ys)) / 2;
  const DOWN = (T + H - B) / 2 - (T + (H - T - B) * mid);
  const gx = (p) => L + (W - L) * ((p.x * 788 - 62) / (788 - 62));
  const gy = (p) => T + (H - T - B) * p.y + DOWN;

  // 은하들 — 정본 `WGALAXY` 의 자리·종·반경 그대로. 상태만 지금 진행에 맞춘다.
  //   st: 2 지나옴 · 1 고른 것 · 0 잠김 (`gxDraw` 의 규약)
  const ST = [2, 2, 1, 0, 0];
  WGALAXY.forEach((p, i) => gxDraw(c, gx(p), gy(p), p.r, p.k, ST[i], i * 13.7 + 3));

  // 이름표 — 캔버스가 아니라 글자다(정본도 DOM 으로 얹는다)
  c.textAlign = "center"; c.textBaseline = "alphabetic";
  const NM = ["1장 · 스며드는 어둠", "2장 · 갈라지는 어둠", "3장 · 덮쳐오는 어둠",
              "4장 잠김", "5장 잠김"];
  WGALAXY.forEach((p, i) => {
    const x = gx(p), y = gy(p) - p.r - 12;
    if (ST[i] === 1) {
      c.fillStyle = "#8B8B99"; c.font = "9px -apple-system,sans-serif";
      c.fillText("착륙 예정 지점", x, y - 13);
      c.fillStyle = "#E8E8F0"; c.font = "600 13px -apple-system,sans-serif";
    } else {
      c.fillStyle = ST[i] === 0 ? "#4A4A58" : "#8B8B99";
      c.font = "11px -apple-system,sans-serif";
    }
    c.fillText(NM[i], x, y);
  });

  // 레일
  const rail = ["홈", "상점", "도감", "일지", "관측소"];
  rail.forEach((nm, i) => {
    const y = H / 2 - 84 + i * 42, on = i === 4;
    c.fillStyle = on ? "#EDEDF2" : "#6E6E7C";
    c.font = "9.5px -apple-system,sans-serif";
    c.fillText(nm, 31, y + 13);
    c.strokeStyle = on ? "rgba(237,237,242,.85)" : "rgba(180,180,200,.18)";
    c.lineWidth = on ? 1.6 : 1;
    c.beginPath(); c.arc(31, y, 6.5, 0, TAU); c.stroke();
  });

  // 위 · 창틀
  c.textAlign = "left";
  c.fillStyle = "#8B8B99"; c.font = "10px -apple-system,sans-serif";
  c.fillText("● 관측 중", L + 14, 22);
  c.textAlign = "right";
  c.fillText("3 / 5 장", W - 16, 22);
  const by = H - B + 30;
  c.textAlign = "left";
  c.fillStyle = "#6E6E7C"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText("덱 · 성흔 ", L + 14, by);
  c.fillStyle = "#CED0E0"; c.font = "600 10.5px -apple-system,sans-serif";
  c.fillText("20 / 20", L + 62, by);
  c.fillStyle = "#6E6E7C"; c.font = "10.5px -apple-system,sans-serif";
  c.fillText("—  성좌 3", L + 116, by);
  c.textAlign = "center";
  c.fillStyle = "#5E5E6C";
  c.fillText("은하를 눌러 들어간다", W / 2 + 20, by);
  // ⭐ 1뎁스도 같은 문·같은 버튼 — 문법이 창마다 갈리면 못 외운다(2026-08-21).
  ghostBtn(c, W - 16 - 96, H - 60, 96, 52, "편집 ›");
  c.textAlign = "left";
}
