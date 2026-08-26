// ══════════════════════════════════════════════════════════════════════════
// ITM — 얼음운석이 떨구는 **물건 넷**                             (2026-08-24)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 사용자 지시 원문(2026-08-24): 「얼음운석을 부수고 나온 **아이템 디자인도
//   아예 개편**해줘. 정말 게임 속 '**아이템**'처럼 해주고, 실제 **아이템을
//   먹었을 때 캐릭터에 입혀지는 효과까지 확장** 작업해줘. 지금은 **아이템을
//   먹었다의 느낌이 '거의' 없어**(있긴 하나 미비한 수준)」
//
// ⚠️⚠️ **이 장은 설계가 남겨 둔 판정 하나를 닫는다.**
//   `docs/design/채굴-파밍.md` 1-3 이 이렇게 적어 두었다:
//     「시안 1-3 의 **실물**(`rkItem` — 자석·신발·망원경·확성기) ↔ 4-2 의
//      **그릇**(원 + 속 문양), 어느 쪽이 떨어지는 실물인가는 **남은 판정**이다」
//   엔진은 **그릇** 쪽을 골라 이식했고(`mine_view.dart` 의 `_vessel`), 그것이
//   지금 화면에 있는 납작한 원이다. 사용자가 「정말 아이템처럼」이라고 한 것이
//   **그 판정에 대한 답**이다 ⇒ **실물이 정본이다.**
//
// ⭐ 그리고 그 실패는 `rkItem` 자신이 이미 예언해 두었다:
//     「**평평한 실루엣 하나만 칠하면 UI 아이콘이 된다.** 물건이 되려면
//      두께가 보여야 하고, 두께는 광원 반대쪽으로 민 판 한 장이다」
//   그릇은 정확히 그 「평평한 실루엣 하나」였다.
//
// ── ⭐⭐ 층이 셋이고, 셋 다 **같은 물건**을 보여야 한다 ────────────────────
//
// | 층 | 무엇을 | 왜 |
// |---|---|---|
// | ① 바닥 | 물건이 **떠 있다** — 두께 · 3단 계조 · 접지 판 | 「저기 자석이 있다」 |
// | ② 먹는 순간 | 그 물건이 **부서져** 흩어졌다가 **몸으로 모인다** | 「그것이 내게 들어왔다」 |
// | ③ 걸려 있는 동안 | 그 물건의 **작은 것이 몸을 돈다** | 「나는 지금 자석을 차고 있다」 |
//
// ⭐ 셋이 **같은 그림**인 것이 요점이다. 그릇 시절에는 ①만 물건 비슷했고
//   ②는 색 고리, ③은 실선 호였다 — **셋이 서로 남남이라** 먹어도 무엇을
//   먹었는지가 이어지지 않았다. 같은 실루엣이 세 번 나오면 그때서야
//   「자석을 주웠고 · 자석이 들어왔고 · 자석을 차고 있다」가 한 줄이 된다.
//
// ── ⚠️ 0.3초에 갈려야 한다 ────────────────────────────────────────────────
// 달려가면서 읽으므로 **실루엣이 먼저** 갈리고 색이 거든다. 그릇은 넷이 **같은
// 원**이라 판독을 전부 속 문양(지름 20px 남짓)에 걸었다 — 뛰면서는 못 읽는다.
// 실물 넷은 말굽 · 부츠 · 사선 통 · 나팔이라 **바깥선만으로** 갈린다.
//
// ── 색 규약 ───────────────────────────────────────────────────────────────
// 몸은 넷 다 **강철빛 한 벌**이다(`RK_IT`). 물건마다 몸 색을 달리하면 화면에
// 색 덩어리가 넷 늘어 적·운석·암흑물질과 경쟁한다 — `rkItem` 의 그 경고
// (「순백으로 두면 **UI 아이콘**으로 보인다. 이 게임의 물건은 어두운 우주에
// 떠 있는 **금속 덩이**다」). 종을 가르는 색([ITM_HUE])은 **후광 · 접지 판 ·
// 정체 디테일**에만 쓴다 — 멀리서는 색이, 가까이서는 꼴이 말한다.
//
// ⚠️ 난수 0건 — `hash()` 만 쓴다(이 저장소 규약).
// ⚠️ 최상위 이름을 전부 `ITM` 으로 격리했다(확인: `ITM` 으로 시작하는 최상위
//   이름은 `docs/vfx/*.js` 전체에 **0건**, 2026-08-24 실측).
// ══════════════════════════════════════════════════════════════════════════

/// 전역 광원 — `rock.js` 의 `RK_LA=.70` 을 그대로 쓴다. 앞날이 밀리는 쪽이다.
const ITM_LX = Math.cos(0.70), ITM_LY = Math.sin(0.70);

/// 몸의 3단 — 그늘 · 몸 · 앞날(`rkItem` 의 `RK_IT` 그대로).
const ITM_IT = ["#0C1024", "#4A5878", "#C6D2F0"];
/// 두께(옆면) — 몸보다 한 단 어둡다. 이 한 장이 「그림」을 「물건」으로 만든다.
const ITM_SIDE = "#070A18";

/// 종을 가르는 색 — 엔진 `kPickupRingArgb` 와 **같은 차례 · 같은 값**이다
/// (자석 · 이속 · 사거리 · 범위).
const ITM_HUE = ["#E8F0FF", "#4ADEB4", "#8F86FF", "#FFAC7A"];

/// 종 넷 — [꼴 이름, 물건 이름, 효과 이름, 창(초)].
/// ⚠️ 자석은 효과 이름이 비어 있다 — 물건 이름이 곧 효과 이름이라 덧붙일 말이
///   없다(`rock.js` 의 `RK_ITEM` 과 같은 근거).
const ITMLIST = [
  ["magnet", "자석", "", 3.0],
  ["boot", "신발", "이속", 5.0],
  ["scope", "망원경", "사거리", 6.0],
  ["horn", "확성기", "범위", 6.0],
];

/// **폭 맞춤** — 넷이 같은 `r` 에서 같은 폭으로 보이게 하는 배수
/// (`rkItem` 의 `RK_IT_NORM`). 실루엣이 다르면 외접 폭도 다르므로 꼴마다
/// 맞춰 넣는다. **크기는 등급을 말해야 하고 넷은 같은 등급이다.**
const ITM_NORM = { magnet: 0.96, boot: 1.18, scope: 1.06, horn: 0.94 };

/// 종 이름 → 차례(색·슬롯을 뽑는 열쇠).
const ITMidx = (k) => ITMLIST.findIndex((e) => e[0] === k);

// ── 면 만들기 — 물건은 **면의 목록**이다 ──────────────────────────────────
//
// ⭐⭐ **왜 다각형 하나가 아니라 면 여럿인가.** 시안 `rkItem` 은 실루엣 하나를
//   칠하고 그 위에 「광원 쪽으로 민 사본」을 **클립해서** 얹어 계조를 냈다.
//   캔버스에서는 되지만 엔진의 정점 배처에는 **클립이 없다**(삼각형만 안다).
//   ⇒ 물건을 처음부터 **면의 목록**으로 지어 두면, 계조가 「면마다 한 색」이
//     되어 클립이 필요 없어진다. 그리고 그것이 이 게임이 운석·재화에 쓰는
//     바로 그 문법이다 — **면 안은 한 색 · 경계가 딱 떨어짐.**
// ⚠️ 그래서 이 파일의 꼴은 시안이자 **이식 설계서**다. 엔진은 이 면 목록을
//   그대로 삼각형으로 편다.

/// 중심선 [path] 를 폭 [w] 의 띠로 편다 — 마디마다 사각 면 하나.
/// 말굽처럼 **오목한** 꼴은 다각형 하나로는 못 칠한다(스스로를 가른다).
/// 띠로 지으면 마디가 전부 볼록이라 그 함정이 사라진다.
function ITMribbon(path, w) {
  const F = [];
  for (let i = 0; i < path.length - 1; i++) {
    const [x0, y0] = path[i], [x1, y1] = path[i + 1];
    const dx = x1 - x0, dy = y1 - y0;
    const L = Math.hypot(dx, dy) || 1;
    const nx = (-dy / L) * (w / 2), ny = (dx / L) * (w / 2);
    F.push([[x0 + nx, y0 + ny], [x1 + nx, y1 + ny],
      [x1 - nx, y1 - ny], [x0 - nx, y0 - ny]]);
  }
  return F;
}

/// 볼록 다각형 [P] 를 무게중심 부채로 편다 — 마디마다 삼각 면 하나.
function ITMfan(P) {
  let cx = 0, cy = 0;
  for (const p of P) { cx += p[0]; cy += p[1]; }
  cx /= P.length; cy /= P.length;
  const F = [];
  for (let i = 0; i < P.length; i++) {
    F.push([[cx, cy], P[i], P[(i + 1) % P.length]]);
  }
  return F;
}

/// 네 귀 [a,b,c,d] 의 사각을 길이 방향으로 [n] 토막 낸다 — 통·나팔이 쓴다.
/// 토막을 내야 **한 면 한 색**의 계조가 길이를 따라 흐른다.
function ITMslab(a, b, c, d, n) {
  const lerp = (p, q, u) => [p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u];
  const F = [];
  for (let i = 0; i < n; i++) {
    const u0 = i / n, u1 = (i + 1) / n;
    F.push([lerp(a, b, u0), lerp(a, b, u1), lerp(d, c, u1), lerp(d, c, u0)]);
  }
  return F;
}

/// 물건 [kind] 의 면 목록 — 반지름 [r] 기준. 폭 맞춤([ITM_NORM])이 이미 곱해져
/// 나온다. 돌려주는 것은 `{ f: 면들, a: 정체 디테일들 }` 이고, 디테일은
/// **종 색**으로 칠해진다(아래 [ITMdraw]).
///
/// ⭐ **정체 디테일이 그 물건을 그 물건으로 만든다** — 시안 `rkItem` 이 항마다
///   한 줄로 못 박아 둔 그것이다: 자석은 **두 극**, 신발은 **밑창**,
///   망원경은 **렌즈**, 확성기는 **나팔 입**.
function ITMshape(kind, r) {
  const z = (ITM_NORM[kind] || 1) * r;
  if (kind === "magnet") {
    // 말굽 — **입이 아래로.** 위로 열면 자석이 아니라 **컵**으로 읽힌다.
    const R = z * 0.52, W = z * 0.32, legY = z * 0.62, topY = -z * 0.1;
    const path = [[-R, legY]];
    for (let i = 0; i <= 14; i++) {
      const th = Math.PI - (Math.PI * i) / 14;
      path.push([Math.cos(th) * R, topY - Math.sin(th) * R * 0.9]);
    }
    path.push([R, legY]);
    // 극 — 두 다리 끝의 토막. **자석을 자석으로 만드는 것은 이 둘**이다.
    const pole = (sg) => [[sg * R - W / 2, legY - z * 0.26],
      [sg * R + W / 2, legY - z * 0.26], [sg * R + W / 2, legY],
      [sg * R - W / 2, legY]];
    return { f: ITMribbon(path, W), a: [pole(-1), pole(1)] };
  }
  if (kind === "boot") {
    // 옆에서 본 부츠 — **가로로 길고 바닥이 평평하다.** 뒤축이 각졌다.
    const P = [[-z * 0.42, -z * 0.55], [-z * 0.1, -z * 0.55],
      [-z * 0.02, -z * 0.05], [z * 0.62, z * 0.12], [z * 0.72, z * 0.4],
      [-z * 0.42, z * 0.4]];
    // 밑창 — 한 줄로 굵게. 신발을 신발로 만드는 것은 이것이다.
    const sole = [[-z * 0.46, z * 0.4], [z * 0.76, z * 0.4],
      [z * 0.76, z * 0.58], [-z * 0.46, z * 0.58]];
    return { f: ITMfan(P), a: [sole] };
  }
  if (kind === "scope") {
    // 망원경 — **↗ 사선 · 굵기가 거의 균일 · 렌즈가 앞에.**
    const L = z * 1.3, W = z * 0.34, ca = Math.cos(-0.62), sa = Math.sin(-0.62);
    const rot = (p) => [p[0] * ca - p[1] * sa, p[0] * sa + p[1] * ca];
    const a = rot([-L / 2, -W / 2]), b = rot([L / 2, -W * 0.7]);
    const c = rot([L / 2, W * 0.7]), d = rot([-L / 2, W / 2]);
    // 렌즈 — 앞쪽 끝의 밝은 판. 「보는 것」이라는 표시다.
    const lens = [rot([L / 2 - z * 0.07, -W * 0.7]), rot([L / 2, -W * 0.7]),
      rot([L / 2, W * 0.7]), rot([L / 2 - z * 0.07, W * 0.7])];
    return { f: ITMslab(a, b, c, d, 5), a: [lens] };
  }
  // 확성기 — **↘ 사선 · 한쪽만 크게 벌어진다 · 손잡이.**
  const L = z * 1.15, ca = Math.cos(0.5), sa = Math.sin(0.5);
  const rot = (p) => [p[0] * ca - p[1] * sa, p[0] * sa + p[1] * ca];
  const a = rot([-L * 0.5, -z * 0.16]), b = rot([L * 0.42, -z * 0.62]);
  const c = rot([L * 0.42, z * 0.62]), d = rot([-L * 0.5, z * 0.16]);
  // 나팔 입 — 벌어진 쪽의 테. 「퍼진다」가 여기서 읽힌다.
  const mouth = [rot([L * 0.42 - z * 0.09, -z * 0.62]), rot([L * 0.42, -z * 0.62]),
    rot([L * 0.42, z * 0.62]), rot([L * 0.42 - z * 0.09, z * 0.62])];
  const grip = [rot([-L * 0.5, -z * 0.1]), rot([-L * 0.74, -z * 0.05]),
    rot([-L * 0.74, z * 0.18]), rot([-L * 0.5, z * 0.12])];
  return { f: ITMslab(a, b, c, d, 5), a: [mouth, grip] };
}

// ── 칠하기 — 면마다 한 색, 계조는 **광원 축의 위치**가 정한다 ──────────────
//
// ⭐ 평평한 물건이라 면의 **법선**은 넷 다 같다 — 계조를 법선에서 뽑으면 전부
//   같은 색이 되어 계조가 사라진다. 그래서 시안 `rkItem` 이 한 것처럼
//   **광원 축에 투영한 자리**로 뽑는다(저쪽은 「사본을 밀어 클립」으로 같은
//   일을 했다). 물건 전체의 투영 범위를 0~1 로 펴고 세 칸으로 끊는다.

/// 3단 문턱 — 그늘 40% · 몸 22% · 앞날 38%. 앞날이 넓어야 「금속」으로 읽힌다.
const ITM_STEP = [0.40, 0.62];

/// 면 [F] 들의 광원 축 투영 범위 `[min, max]`.
function ITMspan(F) {
  let lo = 1e9, hi = -1e9;
  for (const p of F) for (const q of p) {
    const d = q[0] * ITM_LX + q[1] * ITM_LY;
    if (d < lo) lo = d;
    if (d > hi) hi = d;
  }
  return [lo, hi];
}

/// 면 하나의 계조 칸(0 그늘 · 1 몸 · 2 앞날).
function ITMrung(P, lo, hi) {
  let d = 0;
  for (const q of P) d += q[0] * ITM_LX + q[1] * ITM_LY;
  const u = (d / P.length - lo) / (hi - lo || 1);
  return u < ITM_STEP[0] ? 0 : u < ITM_STEP[1] ? 1 : 2;
}

/// 물건 하나를 `(x, y)` 에 반지름 [r] 로 — [kind] 는 `magnet`·`boot`·`scope`·`horn`.
///
/// 차례는 시안 `rkItem` 의 `lay()` 와 같다: **옆면(두께) → 몸(3단) → 정체
/// 디테일**. [al] 은 통짜 투명도(먹는 순간이 쓴다), [sc] 는 통짜 배율.
function ITMdraw(c, x, y, r, kind, al = 1, sc = 1) {
  const S = ITMshape(kind, r * sc);
  const [lo, hi] = ITMspan(S.f);
  const hue = ITM_HUE[ITMidx(kind)];
  const put = (P, col) => fillPoly(c, P.map((p) => [x + p[0], y + p[1]]), col);
  // ① 옆면 — 광원 **반대쪽**으로 민 한 장. 물건의 두께다.
  const dp = r * sc * 0.13;
  for (const P of S.f) {
    put(P.map((p) => [p[0] - ITM_LX * dp, p[1] - ITM_LY * dp]), A(ITM_SIDE, al));
  }
  for (const P of S.a) {
    put(P.map((p) => [p[0] - ITM_LX * dp, p[1] - ITM_LY * dp]), A(ITM_SIDE, al));
  }
  // ② 몸 — 면마다 한 색.
  for (const P of S.f) put(P, A(ITM_IT[ITMrung(P, lo, hi)], al));
  // ③ 정체 디테일 — **종 색**이 여기 한 번 든다. 멀리서는 후광이, 가까이서는
  //    이 한 뼘이 「무엇인가」를 말한다.
  for (const P of S.a) {
    put(P, A(hue, al * 0.95));
    // 디테일의 앞날 — 얇은 밝은 띠 하나. 금속이 반짝이는 자리다.
    const t = P.map((p) => [p[0] + ITM_LX * r * sc * 0.05,
      p[1] + ITM_LY * r * sc * 0.05]);
    put(t, A(ITM_IT[2], al * 0.5));
  }
}

/// 접지 판 — 물건이 **떠 있다**는 것을 말하는 유일한 그림.
/// ⚠️ 이것이 없으면 물건이 화면에 **붙어 있는 스티커**로 읽힌다(빙벽 담당이
///   같은 함정을 「뻘하게 스티커가 나오듯」으로 적어 두었다).
function ITMplate(c, x, y, r, kind, ph) {
  const hue = ITM_HUE[ITMidx(kind)];
  const b = 0.5 + 0.5 * Math.sin(ph * TAU);
  gAdd(c, (cc) => {
    // 후광 — 줍는 것은 빛을 낸다(재화와 같은 축).
    const g = cc.createRadialGradient(x, y, 0, x, y, r * 2.0);
    g.addColorStop(0, A(hue, 0.20 + 0.10 * b));
    g.addColorStop(1, A(hue, 0));
    cc.fillStyle = g;
    cc.beginPath();
    cc.arc(x, y, r * 2.0, 0, TAU);
    cc.fill();
  });
  // 바닥 고리 — 눌린 타원. 「여기가 바닥이다」.
  c.strokeStyle = A(hue, 0.5 + 0.2 * b);
  c.lineWidth = Math.max(1, r * 0.07);
  c.beginPath();
  c.ellipse(x, y + r * 0.95, r * (0.78 + 0.06 * b), r * 0.24, 0, 0, TAU);
  c.stroke();
}

/// 바닥에 놓인 물건 한 벌 — 판 + 부유 + 몸. [ph] 는 0~1 위상 **하나**고
/// 부유·맥동이 **전부 여기서** 나온다(주기 끝과 처음이 같아야 한다는 그 규약).
function ITMrest(c, x, y, r, kind, ph) {
  ITMplate(c, x, y, r, kind, ph);
  const bob = Math.sin(ph * TAU) * r * 0.10;
  ITMdraw(c, x, y - r * 0.15 + bob, r, kind);
}

// ── 크기 — 캐릭터 대비 몇이 「확실히 작은 소품」인가 ────────────────────────
//
// ⚠️⚠️ 사용자 판정(2026-08-24): 「아이템이 캐릭터 대비 너무 큼」. 바닥 픽업의
//   월드 반지름(엔진 `kPickupWorldRadius`)이 캐릭터 몸 반지름(`kBodyRadiusBase`
//   =16)과 **거의 같았다**(17) — 몸통만 한 물건이 바닥에 떨어져 있었으니
//   커 보이는 게 당연했다. 눈대중이 아니라 `rock.js`의 `RK_R_HERO`·`RK_WSC`와
//   같은 수법으로 **캐릭터와 같은 자**로 재고 고른다.
//
// ⚠️ `hero()`는 몸 반지름이 **17**(s=1)이라 엔진의 16과 다르다 — 배율을 그냥
//   1로 두면 캐릭터만 6% 크게 그려져 비교가 어긋난다.
const ITMSZ_R_HERO = 16;
/// 판의 픽셀 ÷ 월드. 이 하나로 캐릭터와 물건이 같은 자로 그려진다.
const ITMSZ_WSC = 2.1;
/// 월드 반지름 [r]로 캐릭터를 그린다(`rock.js`의 `rkHero`와 같다).
function ITMSZhero(c, x, y, r, t) {
  hero(c, t, x, y, "gold", (r * ITMSZ_WSC) / 17);
}
function ITMSZlabel(c, s, x, y, col) {
  c.fillStyle = col || "#8B8B99";
  c.font = "10.5px -apple-system,sans-serif";
  c.textAlign = "center";
  c.fillText(s, x, y);
}
/// 후보 반지름 — 몸 반지름의 절반~2/3 을 눈으로 잰다. 옛 값 17 도 대조로 남긴다.
const ITMSZ_CANDS = [17, 11, 10, 9, 8];
// ⚠️ **바닥 표현 그대로 재야 한다** — 물건 실루엣([ITMdraw])만 놓고 비교하면
//   작아 보인다. 실제로 큰 것은 [ITMplate]의 후광(반지름 `r*2.0`)과 접지
//   판이다 — 이것들이 실루엣보다 훨씬 넓게 퍼져 「덩치」를 만든다. 그래서
//   [ITMrest](바닥 한 벌 그대로)로 재고, NORM 이 제일 큰 **신발**(1.18)로
//   최악의 경우를 본다.
/// 실측으로 고른 값 — 몸 반지름의 62.5%(절반~2/3 구간의 가운데), 신발
/// (NORM 최대)로 대조해도 확실히 작은 소품으로 읽힌다.
const ITMSZ_PICK = 10;
const ITMcellSize = (c, t, dt, W, H) => {
  const cy = 150, heroX = W * 0.10;
  ITMSZhero(c, heroX, cy, ITMSZ_R_HERO, t);
  ITMSZlabel(c, "캐릭터 r16", heroX, cy + ITMSZ_R_HERO * ITMSZ_WSC + 22, "#9494A2");
  const n = ITMSZ_CANDS.length;
  ITMSZ_CANDS.forEach((r, i) => {
    const x = W * 0.32 + (W * 0.62) * (i / (n - 1));
    ITMrest(c, x, cy, r * ITMSZ_WSC, "boot", (t / 2.4 + i * 0.2) % 1);
    ITMSZlabel(c, "r" + r + (r === 17 ? " (현재)" : r === ITMSZ_PICK ? " (채택)" : ""),
      x, cy + r * ITMSZ_WSC * 1.1 + 22, r === 17 ? "#FF8A6A" : r === ITMSZ_PICK ? "#4ADEB4" : "#9494A2");
  });
  ITMSZlabel(c,
    "캐릭터와 같은 자로 그렸다 — 후광·접지 판까지 실제 바닥 그대로. 왼쪽이 옛 17(현재), 오른쪽으로 갈수록 후보. NORM 최대인 신발로 최악을 본다",
    W / 2, 268, "#5A5A68");
  // 둘째 줄 — 채택한 r10 을 넷 다에 대고 본다. 신발만으론 확성기·자석처럼
  // 뭉툭한 꼴도 작아 보이는지 알 수 없다.
  const cy2 = 360;
  ITMSZhero(c, heroX, cy2, ITMSZ_R_HERO, t + 1.7);
  ITMSZlabel(c, "캐릭터 r16", heroX, cy2 + ITMSZ_R_HERO * ITMSZ_WSC + 22, "#9494A2");
  ITMLIST.forEach(([k, nm], i) => {
    const x = W * 0.32 + (W * 0.62) * (i / 3);
    ITMrest(c, x, cy2, ITMSZ_PICK * ITMSZ_WSC, k, (t / 2.4 + i * 0.25) % 1);
    ITMSZlabel(c, nm + " r" + ITMSZ_PICK, x, cy2 + ITMSZ_PICK * ITMSZ_WSC * 1.1 + 22, "#4ADEB4");
  });
  ITMSZlabel(c, "채택한 r" + ITMSZ_PICK + " — 넷 다 캐릭터보다 확실히 작은 소품으로 읽힌다",
    W / 2, H - 12, "#5A5A68");
};

// ── ② 먹는 순간 — **부서져 흩어졌다가 몸으로 모인다** ─────────────────────
//
// ⚠️⚠️ 여기가 2026-08-22 에 한 번 실패한 자리다. 그때 만든 것은 「퍼지는 고리
//   한 겹 + 짧은 살 여섯」이었는데, 먹는 자리가 **플레이어 몸 위**라 그 몸이
//   내는 빛에 통째로 먹혔다. 사용자 판정이 다시 「미비한 수준」인 까닭이 그것이다.
//
// ⭐⭐ **고쳐야 할 것은 밝기가 아니라 「무엇이 일어났는가」다.** 고리는 아무
//   물건도 안 그린다 — 색만 다른 고리가 넷이면 넷을 못 가른다. 그래서 이 안은
//   **먹은 그 물건의 면들이 실제로 흩어진다.** 화면에 도는 것이 자석 조각이면
//   「자석을 먹었다」가 글자 없이 읽힌다.
//
// 박자 넷(수명 [ITM_POP] 안의 몫):
//   0.00~0.16 **정지** — 물건이 한 번 크게 부푼다(예비 동작)
//   0.16~0.52 **흩어짐** — 면이 제 자리에서 바깥으로 · 돌면서 · 옅어지며
//   0.30~0.62 **각인** — 물건의 **커다란 잔상**이 한 번 떴다 사라진다
//   0.52~1.00 **모임** — 조각이 궤도 반지름으로 **빨려 들어와** ③이 된다

/// 먹는 순간의 수명(초) — 엔진 `kPickupPopSec` 이 따라간다.
const ITM_POP = 0.62;

/// 걸려 있는 것이 도는 반지름(몸 반지름 배수) — ②의 끝과 ③의 처음이 **같은
/// 자리**여야 「들어왔다」가 이어진다.
const ITM_ORBIT = 1.72;

/// 먹는 순간. [u] 는 0~1, `(x,y)` 는 밟은 자리 = 몸의 자리.
function ITMpop(c, x, y, r, kind, u) {
  const hue = ITM_HUE[ITMidx(kind)];
  const S = ITMshape(kind, r);
  const [lo, hi] = ITMspan(S.f);
  // ① 예비 — 부푼다. 터지기 전에 숨을 들이켠다.
  if (u < 0.16) {
    const k = u / 0.16;
    ITMdraw(c, x, y, r, kind, 1, 1 + 0.28 * k * k);
    return;
  }
  // ② 각인 — 물건의 큰 잔상. **글자 없는 이름표**다.
  if (u > 0.30 && u < 0.62) {
    const k = (u - 0.30) / 0.32;
    gAdd(c, (cc) => ITMdraw(cc, x, y, r, kind, 0.30 * (1 - k), 1.5 + 1.7 * k));
  }
  // ③ 흩어졌다 모임 — 면마다 제 방향으로 나갔다가 궤도로 빨려 든다.
  const orb = r * ITM_ORBIT;
  const all = S.f.concat(S.a);
  all.forEach((P, i) => {
    let cx = 0, cy = 0;
    for (const q of P) { cx += q[0]; cy += q[1]; }
    cx /= P.length; cy /= P.length;
    const ang = Math.atan2(cy, cx) + (hash(i * 3.7) - 0.5) * 0.9;
    const spin = (hash(i * 9.1) - 0.5) * 5.0;
    // 나감(0.16~0.52) → 들어옴(0.52~1.00). 두 구간이 **같은 값**에서 만나
    // 튀지 않는다 — 0.52 에서 out=1, back=0 이라 자리가 이어진다.
    let d, al, sc;
    if (u < 0.52) {
      const k = (u - 0.16) / 0.36;
      d = r * 2.3 * (1 - (1 - k) * (1 - k));
      al = 1;
      sc = 1;
    } else {
      const k = (u - 0.52) / 0.48;
      d = r * 2.3 + (orb - r * 2.3) * k * k;
      al = 1 - k * 0.35;
      sc = 1 - 0.45 * k;
    }
    const px = x + Math.cos(ang) * d, py = y + Math.sin(ang) * d;
    const rot = spin * (u - 0.16);
    const ca = Math.cos(rot), sa = Math.sin(rot);
    fillPoly(c, P.map((q) => {
      const ox = (q[0] - cx) * sc, oy = (q[1] - cy) * sc;
      return [px + ox * ca - oy * sa, py + ox * sa + oy * ca];
    }), A(ITM_IT[ITMrung(P, lo, hi)], al));
  });
  // ④ 충격 고리 — 조각만으로는 「지금」이 안 선다. 한 겹이면 족하다.
  if (u < 0.46) {
    const k = u / 0.46;
    gAdd(c, (cc) => {
      cc.strokeStyle = A(hue, 0.75 * (1 - k) * (1 - k));
      cc.lineWidth = Math.max(1, r * 0.34 * (1 - k));
      cc.beginPath();
      cc.arc(x, y, r * (0.6 + 3.2 * (1 - (1 - k) * (1 - k))), 0, TAU);
      cc.stroke();
    });
  }
}

// ── ③ 걸려 있는 동안 — **몸에 입혀진다** ──────────────────────────────────
//
// ⭐⭐ 사용자가 콕 집은 자리다: 「실제 아이템을 먹었을 때 **캐릭터에 입혀지는
//   효과까지 확장**」. 그릇 시절에 있던 것은 몸 둘레의 **실선 호** 하나였고,
//   그것은 굵기 1.5px 의 가산 선이라 **플레이어 제 빛에 먹혀** 사실상 안 보였다.
//
// 입히는 것은 둘이다 — 둘 다 있어야 한다:
//   ⓐ **차고 있는 물건** — 그 물건의 작은 것이 몸을 돈다. 「무엇을」 이 여기 있다
//   ⓑ **몸이 달라진 꼴** — 종마다 다른 몸 치장. 「그래서 뭐가」 가 여기 있다
//
// ⚠️ **넷이 동시에 걸린다**(`pickup_buffs.dart` — 시계가 넷이고 서로 안 막는다).
//   그래서 물건마다 **제 사분면**을 준다: 자리가 종에서 나오므로 하나가 꺼져도
//   남은 것이 **자리를 안 옮긴다**. 균등 분배로 하면 하나 꺼질 때마다 셋이
//   미끄러져 「무언가 바뀌었다」가 잘못 읽힌다.
//
// ⚠️ 남은 창은 **꼬리 길이**로 낸다 — 제 사분면 안에서만 자라고 줄어드니
//   넷이 겹쳐도 서로 안 밟는다. 꺼져 가는 것이 보이면 「하나 더 주우러 가자」가
//   생긴다는 것이 이 층을 지은 이유의 절반이다.

/// 남은 창이 이만큼 아래로 내려가면 깜박인다(초) — 「곧 꺼진다」.
const ITM_BLINK = 1.2;

/// 걸려 있는 물건 하나. [left] 는 남은 초, [span] 은 창 전체(초),
/// [t] 는 시계(도는 각이 여기서 나온다).
function ITMworn(c, x, y, br, kind, left, span, t) {
  if (left <= 0) return;
  const i = ITMidx(kind);
  const hue = ITM_HUE[i];
  const u = Math.min(1, left / span);
  const orb = br * ITM_ORBIT;
  // 제 사분면 — 자리가 **종**에서 나온다(위 ⚠️).
  const base = (i * TAU) / 4 - Math.PI / 2;
  const ang = base + t * 1.05;
  // 꼬리 — 제 사분면(90°) 안에서 남은 만큼. 도는 놈 **뒤로** 끌린다.
  const sweep = (TAU / 4) * u;
  gAdd(c, (cc) => {
    const n = Math.max(1, Math.ceil(10 * u));
    for (let s = 0; s < n; s++) {
      const k = s / n;
      cc.strokeStyle = A(hue, 0.55 * (1 - k));
      cc.lineWidth = Math.max(1, br * 0.14 * (1 - k * 0.6));
      cc.beginPath();
      cc.arc(x, y, orb, ang - sweep * k, ang - sweep * ((s + 1) / n), true);
      cc.stroke();
    }
  });
  // 곧 꺼진다 — 깜박임. **끝날 때 값이 0 으로 수렴**하므로 주기가 안 튄다.
  let al = 1;
  if (left < ITM_BLINK) {
    const k = left / ITM_BLINK;
    al = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos(left * TAU * 3.2)) * k + 0.0;
    al *= 0.35 + 0.65 * k;
  }
  const px = x + Math.cos(ang) * orb, py = y + Math.sin(ang) * orb;
  ITMdraw(c, px, py, br * 0.40, kind, al);
}

/// 몸이 달라진 꼴 — 종마다 하나씩. **몸에 붙어 다니는 그림**이다.
/// [vx],[vy] 는 몸이 가는 쪽(신발이 쓴다).
function ITMdress(c, x, y, br, kind, left, span, t, vx = 1, vy = 0) {
  if (left <= 0) return;
  const hue = ITM_HUE[ITMidx(kind)];
  const u = Math.min(1, left / span);
  const fade = Math.min(1, left / 0.6);
  gAdd(c, (cc) => {
    if (kind === "magnet") {
      // 끌어당김 — 밖에서 안으로 오는 **갈매기 여덟**. 자석이 하는 일 그대로다.
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * TAU + t * 0.5;
        // 하나의 톱니에서 파생 — 주기 끝과 처음이 같다.
        const k = (t * 1.4 + i * 0.125) % 1;
        const d = br * (3.4 - 2.0 * k);
        const al = 0.55 * Math.sin(k * Math.PI) * fade;
        const ca = Math.cos(a), sa = Math.sin(a);
        const w = br * 0.30;
        cc.strokeStyle = A(hue, al);
        cc.lineWidth = Math.max(1, br * 0.10);
        cc.beginPath();
        cc.moveTo(x + ca * d - sa * w, y + sa * d + ca * w);
        cc.lineTo(x + ca * (d - br * 0.34), y + sa * (d - br * 0.34));
        cc.lineTo(x + ca * d + sa * w, y + sa * d - ca * w);
        cc.stroke();
      }
    } else if (kind === "boot") {
      // 질주 — 가는 쪽 **뒤로** 깔리는 줄 다섯. 「개빨라진다」의 그림이다.
      const L = Math.hypot(vx, vy) || 1;
      const dx = vx / L, dy = vy / L;
      for (let i = 0; i < 5; i++) {
        const k = (t * 2.6 + i * 0.2) % 1;
        const off = (i - 2) * br * 0.38;
        const al = 0.6 * Math.sin(k * Math.PI) * fade;
        const s0 = br * (0.9 + k * 1.9), s1 = s0 + br * 0.85;
        cc.strokeStyle = A(hue, al);
        cc.lineWidth = Math.max(1, br * 0.13);
        cc.beginPath();
        cc.moveTo(x - dx * s0 - dy * off, y - dy * s0 + dx * off);
        cc.lineTo(x - dx * s1 - dy * off, y - dy * s1 + dx * off);
        cc.stroke();
      }
    } else if (kind === "scope") {
      // 사거리 — **커진 몸 반지름을 그린다.** 이 버프는 몸·히트박스·빛이
      // 같이 크는 것이 스펙 불변식인데, 그 사실이 화면에 한 번도 안 나왔다.
      // 눈금 있는 고리 하나면 「내가 이만큼 커졌다」가 그 자리에서 읽힌다.
      cc.strokeStyle = A(hue, 0.42 * fade);
      cc.lineWidth = Math.max(1, br * 0.09);
      cc.beginPath();
      cc.arc(x, y, br, 0, TAU);
      cc.stroke();
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * TAU + t * 0.22;
        const ca = Math.cos(a), sa = Math.sin(a);
        cc.strokeStyle = A(hue, 0.6 * fade);
        cc.lineWidth = Math.max(1, br * 0.08);
        cc.beginPath();
        cc.moveTo(x + ca * br * 0.88, y + sa * br * 0.88);
        cc.lineTo(x + ca * br * 1.1, y + sa * br * 1.1);
        cc.stroke();
      }
    } else {
      // 범위 — 밖으로 **번져 나가는 테 셋**. 폭발이 넓어진다는 말의 그림이다.
      for (let i = 0; i < 3; i++) {
        const k = (t * 0.85 + i / 3) % 1;
        const al = 0.5 * Math.sin(k * Math.PI) * fade;
        cc.strokeStyle = A(hue, al);
        cc.lineWidth = Math.max(1, br * 0.16 * (1 - k));
        cc.beginPath();
        cc.arc(x, y, br * (0.7 + 3.0 * k), 0, TAU);
        cc.stroke();
      }
    }
  });
  // 남은 창이 0 에 가까우면 치장도 같이 걷힌다 — `u` 는 여기서만 쓴다.
  void u;
}

// ── 후보 — 「먹는 순간」다시 설계(아직 미채택) ─────────────────────────────
//
// ⚠️⚠️ 사용자 판정(2026-08-24): 위 ②·③(부서져 흩어졌다가 궤도로 모이는
//   [ITMpop] · 몸을 도는 [ITMworn] + 몸 치장 [ITMdress]) 컨셉 **자체가**
//   「전혀 맘에 안 든다」. 미세조정이 아니라 다시 설계해야 한다는 뜻이라,
//   같은 컨셉을 다듬는 대신 **완전히 다른 접근 셋**을 나란히 둔다.
//
// ⚠️ 물건의 실루엣([ITMshape])은 그대로 쓴다 — 바뀌는 것은 「먹는 순간」과
//   「걸려 있는 동안」의 **연출**뿐, 자석·신발·망원경·확성기라는 정체는
//   손대지 않는다.
//
// ⚠️ 아직 **아무것도 채택되지 않았다.** 엔진(`lib/game/mine_item*.dart`)은
//   위 ②·③ 그대로다 — 여기는 비교를 위한 시안일 뿐이다.
//
// | 후보 | 먹는 순간 | 걸려 있는 동안 | 성격 |
// |---|---|---|---|
// | A 흡수형 | 통째로 줄며 그 자리서 스미고, 섬광 한 번 | 궤도 없이 머리 위 작은 것 하나 | 가장 즉각적·최소 |
// | B 각인형 | 물건은 그 자리서 스러지고, 심볼이 동시에 태어난다 | 심볼이 안 돌고 은은히 유지, 링이 창을 깎는다 | 조용히 남는다 |
// | C 절제된 궤도 | 부서지지 않고 통째로 궤도 자리까지 짧게 날아간다 | 지금처럼 몸을 돈다(②만 갈아 끼움) | 지금 언어를 다듬는다 |

/// 후보 공통 — 몸에서 번지는 짧은 섬광 한 번. 부서진 조각 없이 「됐다」를
/// 알리는 유일한 신호라 후보 A·C 가 같이 쓴다.
function ITMXflash(c, x, y, r, hue, a) {
  if (a <= 0) return;
  gAdd(c, (cc) => {
    const g = cc.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, A("#FFFFFF", 0.85 * a));
    g.addColorStop(0.35, A(hue, 0.55 * a));
    g.addColorStop(1, A(hue, 0));
    cc.fillStyle = g;
    cc.beginPath();
    cc.arc(x, y, r, 0, TAU);
    cc.fill();
  });
}

// ── 후보 A — 흡수형 ─────────────────────────────────────────────────────────
//
// 부서짐도 궤도도 없다. 물건이 **통째로** 줄어들며 제자리에서 스미고(밟는
// 순간 이미 몸과 겹쳐 있으므로 날아갈 거리가 없다), 몸에 짧은 섬광 한 번으로
// 끝난다. 걸려 있는 동안도 크게 돌지 않는다 — 머리 위에 작은 것 하나뿐이다.

/// [u] 는 0~1, `(x,y)` 는 밟은 자리 = 몸의 자리(둘이 같다).
function ITMXApop(c, x, y, r, kind, u) {
  const hue = ITM_HUE[ITMidx(kind)];
  if (u < 0.62) {
    const k = u / 0.62;
    const ek = 1 - (1 - k) * (1 - k);
    ITMdraw(c, x, y - r * 0.15 * (1 - ek), r, kind, 1 - 0.4 * ek, 1 - 0.85 * ek);
  }
  if (u > 0.45) {
    const fk = (u - 0.45) / 0.55;
    ITMXflash(c, x, y, r * (0.8 + 2.4 * fk), hue, 1 - fk);
  }
}

/// 걸려 있는 동안 — 궤도 없이, 머리 위 고정 자리에 작은 것 하나.
function ITMXAworn(c, x, y, br, kind, left, span, t) {
  if (left <= 0) return;
  const mx = x, my = y - br * 1.55 + Math.sin(t * 2.0) * br * 0.05;
  let al = 1;
  if (left < ITM_BLINK) {
    const k = left / ITM_BLINK;
    al = 0.4 + 0.6 * (0.5 + 0.5 * Math.cos(left * TAU * 3.2)) * k;
  }
  ITMdraw(c, mx, my, br * 0.30, kind, al);
}

// ── 후보 B — 각인형 ─────────────────────────────────────────────────────────
//
// 물건은 날아가지 않고 제자리서 위로 흘러가며 스러진다. 동시에 머리 위에서
// 그 물건의 **정체 심볼**(종 색 글로우를 두른 작은 것)이 태어나, 창이 도는
// 내내 은은히 떠 있는다 — 큰 것이 계속 도는 대신 「지금 자석을 갖고 있다」를
// 조용히 말한다. 남은 창은 심볼을 감싼 얇은 링이 시계 방향으로 깎여 잰다.

function ITMXBmark(c, x, y, s, kind, al) {
  if (al <= 0) return;
  const hue = ITM_HUE[ITMidx(kind)];
  gAdd(c, (cc) => {
    const g = cc.createRadialGradient(x, y, 0, x, y, s * 1.9);
    g.addColorStop(0, A(hue, 0.32 * al));
    g.addColorStop(1, A(hue, 0));
    cc.fillStyle = g;
    cc.beginPath();
    cc.arc(x, y, s * 1.9, 0, TAU);
    cc.fill();
  });
  ITMdraw(c, x, y, s, kind, al);
}

function ITMXBpop(c, x, y, r, br, kind, u) {
  // 물건 — 날아가지 않고 제자리서 위로 흘러가며 스러진다.
  const fall = Math.max(0, 1 - u / 0.7);
  if (fall > 0) ITMdraw(c, x, y - r * 0.15 - br * 0.5 * (1 - fall), r, kind, fall);
  // 심볼 — 머리 위에서 동시에 태어난다. 겹치는 구간엔 둘 다 보인다.
  const rise = Math.min(1, u / 0.55);
  ITMXBmark(c, x, y - br * 1.7, br * 0.34, kind, rise);
}

function ITMXBworn(c, x, y, br, kind, left, span, t) {
  if (left <= 0) return;
  const hue = ITM_HUE[ITMidx(kind)];
  const mx = x, my = y - br * 1.7 + Math.sin(t * 1.6) * br * 0.06;
  const u = Math.min(1, left / span);
  let al = 1;
  if (left < ITM_BLINK) {
    const k = left / ITM_BLINK;
    al = 0.35 + 0.65 * (0.5 + 0.5 * Math.cos(left * TAU * 3.2)) * k;
  }
  // 남은 창 — 심볼을 감싼 얇은 링이 시계 방향으로 깎여 나간다(값 표시).
  gAdd(c, (cc) => {
    cc.strokeStyle = A(hue, 0.55 * al);
    cc.lineWidth = Math.max(1, br * 0.05);
    cc.beginPath();
    cc.arc(mx, my, br * 0.5, -Math.PI / 2, -Math.PI / 2 + TAU * u);
    cc.stroke();
  });
  ITMXBmark(c, mx, my, br * 0.34, kind, al);
}

// ── 후보 C — 절제된 궤도 ─────────────────────────────────────────────────────
//
// 「몸을 도는 작은 것」은 남긴다 — 걸려 있는 동안은 지금의 [ITMworn]·
// [ITMdress] 그대로다. 갈아 끼우는 것은 **먹는 순간 하나뿐**이다: 부서지지
// 않고 물건이 통째로, 도착할 궤도 자리까지 짧게(부서짐형의 절반 이하 시간)
// 날아가 제 창을 시작한다.

function ITMXCpop(c, x, y, r, br, kind, u) {
  const hue = ITM_HUE[ITMidx(kind)];
  const i = ITMidx(kind);
  const base = (i * TAU) / 4 - Math.PI / 2;
  const orb = br * ITM_ORBIT;
  const tx = x + Math.cos(base) * orb, ty = y + Math.sin(base) * orb;
  const ek = 1 - (1 - u) * (1 - u);
  const px = x + (tx - x) * ek, py = y + (ty - y) * ek;
  const endR = br * 0.40;
  const shrink = 1 - endR / r;
  // 꼬리 — 부서짐 대신 짧은 궤적 잔상 셋.
  for (let j = 1; j <= 3; j++) {
    const tk = Math.max(0, ek - j * 0.09);
    if (tk <= 0) continue;
    const gx = x + (tx - x) * tk, gy = y + (ty - y) * tk;
    ITMdraw(c, gx, gy, r, kind, 0.13 * (4 - j), 1 - shrink * tk);
  }
  ITMdraw(c, px, py, r, kind, 1, 1 - shrink * ek);
  if (u > 0.72) {
    const fk = (u - 0.72) / 0.28;
    ITMXflash(c, tx, ty, endR * (1 + 2.2 * fk), hue, 0.65 * (1 - fk));
  }
}

// ── 칸들 ──────────────────────────────────────────────────────────────────

/// 바닥에 놓인 물건 하나 — 칸 하나에 크게.
const ITMcellRest = (kind) => (c, t, dt, W, H) => {
  const x = W / 2, y = H / 2, r = Math.min(W, H) * 0.20;
  // ⚠️ 위상 **하나**에서 부유·맥동이 다 나온다. 주기 2.4초.
  ITMrest(c, x, y, r, kind, (t / 2.4) % 1);
};

/// 넷을 한 칸에 나란히 — **0.3초 판독**을 보는 자리.
const ITMcellRead = (c, t, dt, W, H) => {
  const r = Math.min(W, H) * 0.115;
  ITMLIST.forEach(([k], i) => {
    const x = W * (0.16 + 0.228 * i), y = H / 2;
    ITMrest(c, x, y, r, k, (t / 2.4 + i * 0.25) % 1);
  });
};

/// 먹는 순간 — 한 바퀴가 「놓여 있다 → 먹는다 → 차고 있다 → 놓여 있다」다.
/// ⚠️ **주기 끝과 처음이 같은 스케줄 하나**에서 전부 파생한다: `u=1` 의 그림과
///   `u=0` 의 그림이 **글자 그대로 같은 호출**(물건이 제자리에 놓여 있음)이다.
const ITMcellPop = (kind) => (c, t, dt, W, H) => {
  const P = 3.4;
  const u = (t / P) % 1;
  const x = W / 2, y = H / 2, r = Math.min(W, H) * 0.155;
  const span = ITMLIST[ITMidx(kind)][3];
  // 0.00~0.30 놓여 있다 · 0.30~0.48 먹는다 · 0.48~0.86 차고 있다 · 0.86~1 되돌아온다
  if (u < 0.30) {
    ITMrest(c, x, y, r, kind, (t / 2.4) % 1);
    hero(c, t, x + W * 0.30, y);
    return;
  }
  if (u < 0.48) {
    const k = (u - 0.30) / 0.18;
    hero(c, t, x, y);
    ITMpop(c, x, y, r, kind, k);
    return;
  }
  if (u < 0.86) {
    const k = (u - 0.48) / 0.38;
    const left = span * (1 - k);
    hero(c, t, x, y);
    ITMdress(c, x, y, 30, kind, left, span, t);
    ITMworn(c, x, y, 30, kind, left, span, t);
    return;
  }
  // 되돌아온다 — 물건이 다시 놓이고 몸이 오른쪽으로 물러난다. `u=1` 에서
  // 첫 가지와 **같은 그림**이 되어 이음매가 없다.
  const k = (u - 0.86) / 0.14;
  ITMrest(c, x, y, r, kind, (t / 2.4) % 1);
  hero(c, t, x + W * 0.30 * k, y);
};

/// 후보 한 바퀴의 공통 뼈대 — 「놓여 있다 → 먹는다 → 차고 있다(압축) →
/// 되돌아온다」. [pop]·[worn] 만 후보마다 갈아 끼운다. 경계 [pk](먹는
/// 구간의 폭)만 후보마다 다르다 — 즉각적일수록 좁다.
function ITMXcell(kind, pk, pop, worn) {
  return (c, t, dt, W, H) => {
    const P = 3.0;
    const u = (t / P) % 1;
    const x = W / 2, y = H / 2, r = Math.min(W, H) * 0.155;
    const span = ITMLIST[ITMidx(kind)][3];
    const restEnd = 0.32, popEnd = restEnd + pk, wornEnd = 0.88;
    if (u < restEnd) {
      ITMrest(c, x, y, r, kind, (t / 2.4) % 1);
      hero(c, t, x + W * 0.30, y);
      return;
    }
    if (u < popEnd) {
      hero(c, t, x, y);
      pop(c, x, y, r, kind, (u - restEnd) / pk);
      return;
    }
    if (u < wornEnd) {
      const k = (u - popEnd) / (wornEnd - popEnd);
      const left = span * (1 - k);
      hero(c, t, x, y);
      worn(c, x, y, 30, kind, left, span, t);
      return;
    }
    const k = (u - wornEnd) / (1 - wornEnd);
    ITMrest(c, x, y, r, kind, (t / 2.4) % 1);
    hero(c, t, x + W * 0.30 * k, y);
  };
}
/// 후보 A — 흡수형(먹는 구간 0.08 = 0.24초, 셋 중 가장 짧다).
const ITMXcellA = (kind) => ITMXcell(kind, 0.08, ITMXApop, ITMXAworn);
/// 후보 B — 각인형(스미고 태어나는 것이 A보다 느긋해 0.15 = 0.45초).
const ITMXcellB = (kind) => ITMXcell(kind, 0.15,
  (c, x, y, r, kind2, k) => ITMXBpop(c, x, y, r, 30, kind2, k),
  (c, x, y, br, kind2, left, span, t) => ITMXBworn(c, x, y, br, kind2, left, span, t));
/// 후보 C — 절제된 궤도(먹는 구간 0.07 = 0.21초 · 걸려 있는 동안은 지금 그대로).
const ITMXcellC = (kind) => ITMXcell(kind, 0.07,
  (c, x, y, r, kind2, k) => ITMXCpop(c, x, y, r, 30, kind2, k),
  (c, x, y, br, kind2, left, span, t) => {
    ITMdress(c, x, y, br, kind2, left, span, t);
    ITMworn(c, x, y, br, kind2, left, span, t);
  });

/// 걸려 있는 동안 — 한 종. 한 바퀴가 그 종의 **창 전체**다.
const ITMcellWorn = (kind) => (c, t, dt, W, H) => {
  const span = ITMLIST[ITMidx(kind)][3];
  const x = W / 2, y = H / 2;
  // ⚠️ 톱니 하나가 창을 굴린다 — `u=1` 에서 남은 창이 0 이라 그림이 없고,
  //   `u=0` 도 없다(막 걸린 순간은 0.02 뒤부터). 그래서 이음매가 없다.
  const u = (t / (span + 0.9)) % 1;
  const left = Math.max(0, span * (1 - u * (span + 0.9) / span));
  hero(c, t, x, y);
  ITMdress(c, x, y, 30, kind, left, span, t);
  ITMworn(c, x, y, 30, kind, left, span, t);
};

/// **넷이 한꺼번에** — 겹쳐도 안 뭉개지는지 보는 자리.
/// ⚠️ 창이 셋(3 · 5 · 6 · 6초)이라 실제로 **하나씩 꺼진다** — 꺼질 때 남은
///   것이 자리를 안 옮기는가가 이 칸이 답하는 질문이다.
const ITMcellStack = (c, t, dt, W, H) => {
  const x = W / 2, y = H / 2;
  const P = 8.0;
  const u = (t / P) % 1;
  hero(c, t, x, y);
  ITMLIST.forEach(([k, , , span]) => {
    // 넷이 **같은 순간에** 걸리고 각자의 창으로 꺼진다.
    const left = Math.max(0, span - u * P);
    ITMdress(c, x, y, 30, k, left, span, t);
  });
  ITMLIST.forEach(([k, , , span]) => {
    const left = Math.max(0, span - u * P);
    ITMworn(c, x, y, 30, k, left, span, t);
  });
};

Object.assign(FX, {
  ITMsize: ITMcellSize,
  ITMrestMagnet: ITMcellRest("magnet"),
  ITMrestBoot: ITMcellRest("boot"),
  ITMrestScope: ITMcellRest("scope"),
  ITMrestHorn: ITMcellRest("horn"),
  ITMread: ITMcellRead,
  ITMpopMagnet: ITMcellPop("magnet"),
  ITMpopBoot: ITMcellPop("boot"),
  ITMpopScope: ITMcellPop("scope"),
  ITMpopHorn: ITMcellPop("horn"),
  ITMwornMagnet: ITMcellWorn("magnet"),
  ITMwornBoot: ITMcellWorn("boot"),
  ITMwornScope: ITMcellWorn("scope"),
  ITMwornHorn: ITMcellWorn("horn"),
  ITMstack: ITMcellStack,
  ITMcandAMagnet: ITMXcellA("magnet"),
  ITMcandABoot: ITMXcellA("boot"),
  ITMcandAScope: ITMXcellA("scope"),
  ITMcandAHorn: ITMXcellA("horn"),
  ITMcandBMagnet: ITMXcellB("magnet"),
  ITMcandBBoot: ITMXcellB("boot"),
  ITMcandBScope: ITMXcellB("scope"),
  ITMcandBHorn: ITMXcellB("horn"),
  ITMcandCMagnet: ITMXcellC("magnet"),
  ITMcandCBoot: ITMXcellC("boot"),
  ITMcandCScope: ITMXcellC("scope"),
  ITMcandCHorn: ITMXcellC("horn"),
});

// ── 마운트 ────────────────────────────────────────────────────────────────
// ⚠️ 호스트가 없는 페이지에서는 조용히 넘어간다(이 파일은 한 장만 쓰지만
//   규약은 규약이다).
{
  const HSZ = MOUNT("itemsize");
  if (HSZ) tile(HSZ, FX, "ITMsize", "캐릭터 대비", "", "옛 17(현재) 대 후보 반지름들, 그리고 채택한 값을 넷 다에 — 캐릭터와 같은 자", 760, 0, 460);
  const H1 = MOUNT("itemrest");
  if (H1) {
    [["ITMrestMagnet", "자석", "말굽 · 입이 아래로 · 두 극이 종 색"],
      ["ITMrestBoot", "신발", "가로로 길고 바닥이 평평 · 밑창이 종 색"],
      ["ITMrestScope", "망원경", "↗ 사선 · 굵기 균일 · 렌즈가 종 색"],
      ["ITMrestHorn", "확성기", "↘ 사선 · 한쪽만 벌어짐 · 나팔 입이 종 색"]]
      .forEach(([k, nm, ds]) => tile(H1, FX, k, nm, "", ds, 238));
  }
  const H2 = MOUNT("itemread");
  if (H2) {
    [["ITMread", "넷을 나란히", "실루엣만으로 갈리는가 — 속 문양을 안 읽고"]]
      .forEach(([k, nm, ds]) => tile(H2, FX, k, nm, "", ds, 238, 480));
  }
  const H3 = MOUNT("itempop");
  if (H3) {
    [["ITMpopMagnet", "자석 · 먹는 순간", "부풀고 → 부서져 흩어지고 → 궤도로 빨려 든다"],
      ["ITMpopBoot", "신발 · 먹는 순간", "잔상이 한 번 크게 뜬다 — 글자 없는 이름표"],
      ["ITMpopScope", "망원경 · 먹는 순간", "조각이 그 물건의 면이라 무엇을 먹었는지 읽힌다"],
      ["ITMpopHorn", "확성기 · 먹는 순간", "충격 고리 한 겹이 「지금」을 세운다"]]
      .forEach(([k, nm, ds]) => tile(H3, FX, k, nm, "", ds, 238));
  }
  const H4 = MOUNT("itemworn");
  if (H4) {
    [["ITMwornMagnet", "자석 · 걸려 있는 동안", "밖에서 안으로 오는 갈매기 여덟"],
      ["ITMwornBoot", "신발 · 걸려 있는 동안", "가는 쪽 뒤로 깔리는 줄 다섯"],
      ["ITMwornScope", "망원경 · 걸려 있는 동안", "커진 몸 반지름을 눈금 고리로 그린다"],
      ["ITMwornHorn", "확성기 · 걸려 있는 동안", "밖으로 번져 나가는 테 셋"]]
      .forEach(([k, nm, ds]) => tile(H4, FX, k, nm, "", ds, 238));
  }
  const H5 = MOUNT("itemstack");
  if (H5) {
    [["ITMstack", "넷이 한꺼번에", "각자의 창으로 하나씩 꺼진다 — 남은 것이 자리를 안 옮긴다"]]
      .forEach(([k, nm, ds]) => tile(H5, FX, k, nm, "", ds, 238, 480));
  }
  const HCA = MOUNT("itemcandA");
  if (HCA) {
    [["ITMcandAMagnet", "자석 · 후보 A", "통째로 줄며 스미고, 섬광 한 번 — 궤도 없이 머리 위 작은 것 하나"],
      ["ITMcandABoot", "신발 · 후보 A", "부서짐도 궤도도 없다 — 셋 중 가장 즉각적"],
      ["ITMcandAScope", "망원경 · 후보 A", "0.24초 만에 끝난다"],
      ["ITMcandAHorn", "확성기 · 후보 A", "머리 위 표식은 깜박이다 조용히 꺼진다"]]
      .forEach(([k, nm, ds]) => tile(HCA, FX, k, nm, "", ds, 238));
  }
  const HCB = MOUNT("itemcandB");
  if (HCB) {
    [["ITMcandBMagnet", "자석 · 후보 B", "물건은 제자리서 스러지고, 머리 위에 심볼이 태어난다"],
      ["ITMcandBBoot", "신발 · 후보 B", "심볼은 안 돌고 은은히 유지 — 큰 궤도 아이템이 없다"],
      ["ITMcandBScope", "망원경 · 후보 B", "남은 창은 심볼을 감싼 링이 깎여 잰다"],
      ["ITMcandBHorn", "확성기 · 후보 B", "심볼이 깜박이다 사라진다"]]
      .forEach(([k, nm, ds]) => tile(HCB, FX, k, nm, "", ds, 238));
  }
  const HCC = MOUNT("itemcandC");
  if (HCC) {
    [["ITMcandCMagnet", "자석 · 후보 C", "부서지지 않고 통째로 궤도 자리까지 짧게 날아간다"],
      ["ITMcandCBoot", "신발 · 후보 C", "0.21초 — 부서짐형의 삼분의 일"],
      ["ITMcandCScope", "망원경 · 후보 C", "걸려 있는 동안은 지금과 같다 — ②만 갈아 끼웠다"],
      ["ITMcandCHorn", "확성기 · 후보 C", "도착 자리에서 옅은 섬광 한 번"]]
      .forEach(([k, nm, ds]) => tile(HCC, FX, k, nm, "", ds, 238));
  }
}
