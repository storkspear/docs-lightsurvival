// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-home.js — 화면 2 「홈(캐릭터)」
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HH`/`hh` 로 격리한다.
//
// ── 세 번째 판 — 「밀도」가 판정 기준이다 ────────────────────────────────
// 첫 판은 기존 로비의 「좌우 스탯」 골격에 냉광만 입힌 것이었고, 둘째 판은
// 참조의 「중앙 허브 + 방사형 패널」 구조는 가져왔지만 **양이 10분의 1**
// 이었다(원 하나 + 패널 여섯). 참조 넉 장을 세어 보면 화면 하나에 동심원
// 고리가 대여섯 겹, 허브에서 뻗는 회로형 선이 예닐곱 가닥, 귀퉁이마다
// 다른 판독값 블록, 곳곳에 흩어진 미세 라벨이 있다 — 그 개수를 이 판이
// 채운다. 세부는 이 파일 안의 각 절 주석에 실제 개수로 적어 뒀다.
//
// ── 위계 — 밀도가 소음이 되지 않게 ──────────────────────────────────────
// 늘어난 요소는 전부 **장식**이고, 장식은 전부 **어둡다**(알파 0.15~0.55).
// 밝고 커야 하는 것은 셋뿐이다: ① 캐릭터(허브를 뚫고 선다) ② HSTAT
// 여섯 줄(실제로 읽어야 하는 스탯) ③ 편성 버튼(유일한 금빛). 이 셋은
// 전부 **맨 나중에** 그려 장식 위에 얹는다 — 그림 순서 자체가 위계다.
//
// ── 중심 정렬 ────────────────────────────────────────────────────────────
// ⚠️⚠️ 직전 판의 실측 버그(고리 중심과 패널 무게중심이 어긋남)가 다시
// 나지 않도록, **모든** 새 장식도 `hhLayout()` 이 낸 `(cx,cy)` 하나에서만
// 각도·반지름으로 파생한다. 귀퉁이 블록만 예외인데, 그건 성격이 달라서다
// (허브를 도는 것이 아니라 화면 네 귀퉁이에 박히는 것) — 그래도 좌표는
// `HH_RAILW`·`HH_TOPBARH`·`HH_ROSTERH`·`W`·`H` 에서 수식으로 뽑지 손으로
// 안 박는다(캔버스 크기가 바뀌어도 따라간다).
//
// 계승한 것은 값뿐이다: 좌측 허브 레일 5칸, 스탯 6줄의 데이터(`HSTAT`),
// 재화를 안 거는 것, `ELEM.*` 캐릭터 그리기 함수 — 전부 **이미 있는 자산을
// 다시 안 만들려는 것**이지 「기존 화면이 이랬으니 이 화면도 이래야 한다」가
// 아니다. 배치·장식·연출은 이번에 전부 새로 짰다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 보유 캐릭터 로스터 ───────────────────────────────────────────────────
// key 는 `ELEM.*` 의 그리기 함수 키와 **그대로** 같다(2차 목록을 안 만든다).
const HHROSTER = [
  { key: "gold", nm: "무속성", own: true },
  { key: "ice", nm: "빙 氷", own: true },
  { key: "fire", nm: "염 炎", own: true },
  { key: "bolt", nm: "뇌 雷", own: true },
  { key: "poison", nm: "독 毒", own: true },
  { key: "gale", nm: "풍 風", own: true },
  { key: "shade", nm: "암 影", own: false },
  { key: "whiteMani", nm: "백광 白光", own: false },
  { key: "numb", nm: "마 痲", own: false, art: false },
  { key: "blast", nm: "플라즈마 漿", own: false, art: false },
];
let HHMAIN = "fire";   // 지금 로비에 세운 「메인」 — 클릭이 이 값을 바꾼다.
// ⚠️ 첫 화면 기본값을 `fire`로 골랐다 — `gold`(무속성)는 설계상 일부러
// 무채색으로 죽여 둔 상태라(「빛이 색을 입는다」 규약, TONE.gold 명도 .50/.70)
// 캐릭터가 화면의 주인공으로 서야 하는 이 화면의 첫인상 스크린샷으로는
// 안 맞는다. 로스터에서 아무 속성이나 누르면 그 즉시 바뀐다 — 기본값은
// 취향일 뿐 규칙이 아니다.

/// ELEM 에서 그리기 함수를 찾는다. `gold` 는 발현형(goldMani)을 보여준다.
function hhDraw(key) { return key === "gold" ? ELEM.goldMani : ELEM[key]; }

// ── 단일 중심 — 이 화면의 모든 좌표가 갈라져 나오는 자리 ─────────────────
// HH_RAILW·HH_ROSTERH·HH_TOPBARH 는 `mockup-hud-home.html` 의 CSS 상수와
// **한 벌**이다(`.hh-mid`·`#hh-rail`·`.hh-bottom`). `hhLayout()` 하나가
// (cx,cy)·허브 반지름·패널 타원 반지름을 전부 내고, 이 파일의 모든 그림은
// 그 반환값 아니면 `W,H` 자체에서만 좌표를 뽑는다 — 상수를 눈대중으로
// 다시 곱하지 않는다.
const HH_RAILW = 58, HH_ROSTERH = 74, HH_TOPBARH = 26, HH_PANEL_W = 88, HH_PANEL_H = 36;
function hhLayout(W, H) {
  const cx = HH_RAILW + (W - HH_RAILW) / 2;      // `.hh-stage` 의 flex 가운데와 같은 값
  const cy = (H - HH_ROSTERH) / 2;               // `.hh-mid` 의 flex 가운데와 같은 값
  const margin = 8, hw = HH_PANEL_W / 2, hh = HH_PANEL_H / 2;
  const Ry = cy - HH_TOPBARH - hh - margin;      // 위쪽(창틀) 이 더 좁은 쪽이라 이게 상한이다
  const Rx = Math.min((cx - HH_RAILW) - hw - margin, 300);
  return { cx, cy, hubR: 70, Rx, Ry };
}
const HHPOS = [-90, -30, 30, 90, 150, 210];   // 60° 씩 여섯 — 좌우 두 줄이 아니라 고르게 흩는다
// 허브 고리와 패널 사이의 빈 부채꼴 여섯 자리(위 여섯의 정확히 사이) —
// 참조의 「[24] [45]」류 흩어진 미세 판독값을 여기 채운다.
const HH_GAPDEG = [-60, 0, 60, 120, 180, 240];

/// 3자리까지 세어 오르는 정수 카운트업 — 단조 증가(`Math.min(1,t/dur)`)라
/// 되풀이가 없다. 루프가 아니므로 이음매를 걱정할 자리가 아니다.
function hhCountUp(target, t, dur) {
  const p = hudEase(Math.min(1, t / (dur || 1.1)));
  return Math.round(target * p);
}
/// 값 문자열에서 앞쪽 숫자만 뽑아 카운트업하고 나머지 꼬리(단위)는 그대로 둔다.
function hhCountStr(v, t) {
  const m = String(v).match(/^([\d,]+)(.*)$/);
  if (!m) return v;
  const n = parseInt(m[1].replace(/,/g, ""), 10);
  return hhCountUp(n, t).toLocaleString("en-US") + m[2];
}
/// 결정론적 미세 판독값 숫자 — 난수 0건 관례(`hash` 만 쓴다).
function hhNum(seed, digits) {
  return String(Math.floor(hash(seed) * Math.pow(10, digits))).padStart(digits, "0");
}

/// 패널 하나 — 각진 틀 + 라벨 + 카운트업 값 + 작은 레벨 다이얼. 이 여섯
/// 개는 **실제로 읽어야 하는** 것이라 장식과 달리 알파를 낮추지 않는다.
function hhPanel(c, x, y, w, h, label, valueStr, lv, lvMax, tAbs, alpha) {
  c.save(); c.globalAlpha = alpha;
  const cut = 7;
  c.beginPath();
  c.moveTo(x + cut, y); c.lineTo(x + w, y); c.lineTo(x + w, y + h - cut);
  c.lineTo(x + w - cut, y + h); c.lineTo(x, y + h); c.lineTo(x, y + cut); c.closePath();
  c.fillStyle = A(HUDBASE, 0.92); c.fill();
  c.strokeStyle = A(HUDLINE, 0.55); c.lineWidth = 1; c.stroke();
  c.textAlign = "left"; c.font = hudFont(600, 8); c.fillStyle = A(HUDDIM, 1);
  lbText(c, label, x + 8, y + 12);
  c.font = hudFont(700, 15); c.fillStyle = HUDINK;
  lbText(c, hhCountStr(valueStr, tAbs), x + 8, y + h - 9);
  hudDial(c, x + w - 15, y + h / 2 + 2, 10, hudCl((lv || 0) / (lvMax || 99)), { w: 2, label: false });
  c.restore();
}

// ── 귀퉁이 데이터 블록 — 화면 네 귀퉁이에 박히는 순수 장식 ───────────────
// 허브를 도는 것이 아니라 **화면 자체의 귀퉁이**에 붙는 계기다(참조 세 장
// 전부 이 자리에 서로 다른 위젯을 하나씩 둔다). 넷이 똑같으면 「복사한
// 장식」으로 읽히므로 `style` 로 두 벌(원형 눈금+막대 / 궤도 고리+파형)을
// 돌려쓴다. 반환하는 (rx,ry) 는 허브에서 여기로 뻗는 인출선의 도착점이다.
// ⚠️ 귀퉁이는 `.hudvig` 비네트(가장자리를 죽이는 CSS 레이어, `hud.js` ①절)가
// 가장 세게 어둡히는 자리다 — 실측(헤드리스 캡처 후 픽셀 대조)해 보니
// 중앙부와 같은 알파를 줬더니 귀퉁이 블록이 사실상 안 보였다. 그래서
// 이 함수의 알파는 중앙 허브보다 한 단 높게 잡는다 — 비네트를 뚫고
// 나와야 「장식」이 아니라 「보이는 밀도」가 된다.
function hhCornerCluster(c, x, y, sx, sy, seed, tAbs, style) {
  const rx = x + sx * 15, ry = y + sy * 15, rr = 12;
  if (style === 0) {
    hudTicks(c, rx, ry, rr, 16, { len: 2.4, bigLen: 5.5, every: 4, alpha: 0.72 });
    hudRing(c, rx, ry, rr * 0.6, { dash: [1, 3], alpha: 0.55, w: 1 });
  } else {
    hudRing(c, rx, ry, rr, { alpha: 0.48, w: 1.2 });
    hudOrbit(c, rx, ry, rr * 1.15, rr * 0.62, tAbs * (sx * sy) * 0.6, { speed: 0.35, dots: 1, alpha: 0.52, dotR: 1.6 });
  }
  const align = sx > 0 ? "left" : "right", tx = x + sx * 33;
  hudTag(c, tx, y + sy * 2, "SECTOR " + hhNum(seed, 2), { align, alpha: 0.64 });
  hudTag(c, tx, y + sy * 14, "[" + hhNum(seed + 5, 3) + "]", { align, alpha: 0.46 });
  const gw = 44, gh = 13, gx = sx > 0 ? tx : tx - gw, gy = sy > 0 ? y + 21 : y - 21 - gh;
  if (style === 0) hudBars(c, gx, gy, gw, gh, null, { t: tAbs * 0.6 + seed, n: 7, alpha: 0.44 });
  else hudWave(c, gx, gy, gw, gh, tAbs * 0.7 + seed, { speed: 0.9, alpha: 0.46 });
  return { rx, ry };
}

/// 결정론적 별 몇 점 — 배경의 아주 옅은 결(참조 넉 장 전부 별 입자가
/// 깔려 있다). 난수 0건 관례라 `hash` 로만 뽑는다.
/// ⚠️ 실측(헤드리스 캡처 후 픽셀 대조) — 최초 값(반지름 0.5~1.4, 알파
/// .04~.13)은 스크린샷에서 **가장 밝은 별조차 배경과 거의 안 갈렸다**(대비
/// 델타 한 자릿수). 반지름·알파를 둘 다 올려 낱개 점으로 실제로 읽히게 한다
/// — 그래도 고리·라벨보다는 한참 아래(가장 옅은 장식보다도 옅게 유지).
const HH_STAR_N = 42;
function hhStars(c, W, H) {
  for (let i = 0; i < HH_STAR_N; i++) {
    const x = hash(i * 12.9 + 41) * W, y = hash(i * 7.1 + 44) * H;
    const r = 0.7 + hash(i * 3.3 + 47) * 1.3;
    c.fillStyle = A("#CFE8FF", 0.16 + hash(i * 5.7 + 49) * 0.26);
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
}

// ── 배경 — 큰 허브 + 흩어진 연결선·귀퉁이 블록·미세 라벨 + HSTAT 여섯 ───
// 그림 순서 자체가 위계다: 별 → 귀퉁이 장식 → 허브 → 허브발 인출선 → 틈새
// 라벨(전부 장식, 낮은 알파) 순으로 **먼저** 깔고, 실제로 읽어야 하는
// HSTAT 인출선+패널은 **맨 나중에** 그려 장식 위에 얹는다.
{ const bg = $("hh-bg");
  if (bg) mk(bg, [788, 364], function hhBg(c, tAbs, dt, W, H) {
    c.fillStyle = HUDBASE; c.fillRect(0, 0, W, H);
    hhStars(c, W, H);
    const L = hhLayout(W, H), cx = L.cx, cy = L.cy, hubR = L.hubR;
    const lvMax = typeof kStatLevelMax !== "undefined" ? kStatLevelMax : 99;

    // ① 뷰파인더 브래킷 — 레일·톱바·로스터에 안 가리는 「안쪽 사각」의
    // 네 귀퉁이(참조 넉 장 전부의 바깥 프레임과 같은 자리). 좌표는 전부
    // 레일 폭·톱바 높이·로스터 높이에서 뽑는다.
    hudBracket(c, HH_RAILW + 6, HH_TOPBARH + 4, W - HH_RAILW - 12, H - HH_TOPBARH - HH_ROSTERH - 8, 16,
      { w: 1.7, alpha: 0.70 });

    // ② 귀퉁이 데이터 블록 넷 — 서로 다른 위젯(원형 눈금+막대 / 궤도 고리
    // +파형)을 번갈아 쓴다. 이 좌표 넷만 허브 중심이 아니라 화면 자체의
    // 귀퉁이에서 파생한다(성격이 다른 것이라 예외다) — 그래도 손으로 박은
    // 상수가 아니라 W·H·레일폭·톱바높이·로스터높이의 수식이다.
    // ⚠️ 브래킷과 안 겹치게 26/22px 더 안쪽에 앉힌다 — 실측(헤드리스
    // 캡처)해 보니 처음엔 둘이 거의 같은 자리라 브래킷의 작은 L 이 블록의
    // 눈금·고리에 파묻혀 안 보였다. 바깥 테두리(브래킷)와 안쪽 판독값
    // (블록)이 한 자리를 다투면 밀도가 아니라 뭉갬이 된다.
    const cTL = hhCornerCluster(c, HH_RAILW + 26, HH_TOPBARH + 22, 1, 1, 4, tAbs, 0);
    const cTR = hhCornerCluster(c, W - 26, HH_TOPBARH + 22, -1, 1, 12, tAbs, 1);
    const cBL = hhCornerCluster(c, HH_RAILW + 26, H - HH_ROSTERH - 22, 1, -1, 21, tAbs, 1);
    const cBR = hhCornerCluster(c, W - 26, H - HH_ROSTERH - 22, -1, -1, 33, tAbs, 0);
    // 귀퉁이를 가로지르는 옅은 대각선 하나 — 참조가 흔히 보이는 「프레임을
    // 가로지르는 긴 선」. 아주 옅어서(0.07) 장식 중에서도 가장 뒤에 깐다.
    c.save(); c.strokeStyle = A(HUDLINE, 0.07); c.lineWidth = 1;
    c.beginPath(); c.moveTo(HH_RAILW + 8, H - HH_ROSTERH - 8); c.lineTo(W - 8, HH_TOPBARH + 6); c.stroke();
    c.restore();

    // ③ 허브 — 캐릭터(hh-hero, CSS 210px 반지름 105 ≈ hubR*1.5) 가 이
    // 고리 묶음보다 커서 살짝 넘치는 것은 일부러다 — 「고리 안에 작게 든
    // 것」이 아니라 「주인공이 고리를 뚫고 나온 것」으로 읽혀야 한다.
    // ⚠️ 그래서 반지름을 **전부 hubR 이상**으로 잡는다 — 실측(헤드리스
    // 캡처)해 보니 첫 시도는 안쪽 두 겹(0.62·0.46)이 캐릭터 몸에 완전히
    // 덮여 그린 게 안 보였다. 캐릭터를 뚫는 게 목적이면 고리는 뚫려
    // **나오는 자리**(hubR 밖)에 있어야 실제로 밀도로 보인다. 일곱 겹을
    // hubR~hubR*1.41 의 좁은 띠에 촘촘히 쌓아 참조의 「빽빽한 옷깃」처럼
    // 보이게 한다.
    hudRing(c, cx, cy, hubR, { alpha: 0.34, w: 1.6 });                                 // 고리 1 — 굵은 외곽
    hudTicks(c, cx, cy, hubR * 1.06, 60, { len: 4, bigLen: 9, every: 5 });             // 눈금 고리 — 정지
    hudRing(c, cx, cy, hubR * 1.13, { alpha: 0.22, w: 1, dash: [1, 5] });              // 고리 2 — 점선
    c.save(); c.translate(cx, cy); c.rotate(tAbs * 0.12);
    hudTicks(c, 0, 0, hubR * 1.20, 24, { len: 3, bigLen: 3, every: 999, alpha: 0.5 }); // 눈금 고리 — 정회전
    c.restore();
    hudSectorRing(c, cx, cy, hubR * 1.27, 16, { alpha: 0.22 });                        // 고리 3 — 부챗살 세그먼트
    c.save(); c.translate(cx, cy); c.rotate(-tAbs * 0.07);
    hudTicks(c, 0, 0, hubR * 1.34, 16, { len: 6, bigLen: 6, every: 999, alpha: 0.16 }); // 눈금 고리 — 역회전(성긴)
    c.restore();
    hudRing(c, cx, cy, hubR * 1.41, { alpha: 0.14, w: 1, dash: [3, 3] });              // 고리 4 — 가는 점선
    // 십자 레티클 — 참조의 크로스헤어. 위 고리띠 바로 밖에서 짧게만 그어
    // 「조준경」이 아니라 「계기의 눈금선」으로 읽히게 한다.
    c.strokeStyle = A(HUDLINE, 0.14); c.lineWidth = 1;
    c.beginPath();
    c.moveTo(cx - hubR * 1.50, cy); c.lineTo(cx - hubR * 1.42, cy);
    c.moveTo(cx + hubR * 1.42, cy); c.lineTo(cx + hubR * 1.50, cy);
    c.moveTo(cx, cy - hubR * 1.50); c.lineTo(cx, cy - hubR * 1.42);
    c.moveTo(cx, cy + hubR * 1.42); c.lineTo(cx, cy + hubR * 1.50);
    c.stroke();
    gHalo(c, cx, cy, hubR * 0.5, HUDK, 0.30 + 0.10 * Math.sin(tAbs * 1.6));
    // 궤도 둘 — 허브~패널 사이 빈 띠를 옆으로 눌린 궤도로 채운다(참조의
    // 「사방으로 층층이 겹친 고리」). 반지름은 L.Ry 안에서만 잡아 패널
    // 자리를 침범하지 않는다. 둘째 궤도는 이심률·회전 방향을 반대로 줘서
    // 「복사한 고리」로 안 보이게 한다 — ry 가 hubR 보다 작아 캐릭터 위아래를
    // 살짝 파고드는 것도 일부러다(참조의 「몸 뒤로 숨었다 나오는 궤도」).
    hudOrbit(c, cx, cy, Math.min(L.Rx, hubR * 2.6), hubR * 1.35, tAbs, { speed: 0.10, alpha: 0.14, dots: 2, dotR: 2.2 });
    hudOrbit(c, cx, cy, hubR * 1.70, hubR * 0.95, -tAbs, { speed: 0.16, alpha: 0.12, dots: 3, dotR: 1.6 });

    // ④ 허브 → 귀퉁이 인출선 둘 — 대각으로 교차해 참조의 「프레임을
    // 가로지르는 굵은 선」느낌을 허브 쪽에서도 만든다. 시작점은 허브 고리
    // 가장자리에서, 그 귀퉁이를 향한 각도로 계산한다(손으로 안 박는다).
    [[cTL, false], [cBR, true]].forEach(([pt, vertical]) => {
      const a = Math.atan2(pt.ry - cy, pt.rx - cx);
      const x0 = cx + Math.cos(a) * hubR * 1.05, y0 = cy + Math.sin(a) * hubR * 1.05;
      hudLeader(c, x0, y0, pt.rx, pt.ry, { alpha: 0.15, bend: 0.6, vertical, w: 1, nodeR: 1.3 });
    });

    // ⑤ 허브 고리띠 바로 밖, 여섯 패널과의 틈새에 미세 판독값을 심는다
    // (참조의 「[24] [45]」류). HH_GAPDEG 는 HHPOS 를 30° 어긋낸 것이고
    // 반지름(hubR*1.62)은 고리띠(~1.41)·크로스헤어(~1.50) 바깥이라
    // 겹치지 않는다 — 그러면서도 패널 사각(HH_PANEL_W/H) 바깥이다.
    HH_GAPDEG.forEach((deg, i) => {
      const a = deg * Math.PI / 180, gr = hubR * 1.62;
      hudTag(c, cx + Math.cos(a) * gr, cy + Math.sin(a) * gr, "[" + hhNum(60 + i, 2) + "]",
        { align: "center", alpha: 0.30 });
    });

    // ⑥ 여섯 연결선 + HSTAT 패널 — **맨 나중에** 그려 위 장식 전부의 위에
    // 얹는다. 좌표는 전부 `cx,cy,L.Rx,L.Ry` 에서만 파생한다(패널마다 다른
    // 상수를 쓰지 않는다 — 그게 지난 판의 어긋남 원인이었다). 연결선은
    // 이제 한 번 꺾이고 끝에 접속 노드가 박힌다(참조 문법) — 흐르는 빛은
    // 꺾인 자리도 속도가 안 튀도록 길이 기준(`hudPolyPoint`)으로 얹는다.
    HHPOS.forEach((aDeg, i) => {
      const rad = aDeg * Math.PI / 180;
      const ex = cx + Math.cos(rad) * L.Rx, ey = cy + Math.sin(rad) * L.Ry;
      const x0 = cx + Math.cos(rad) * hubR, y0 = cy + Math.sin(rad) * hubR;
      const pts = hudLeader(c, x0, y0, ex, ey, {
        alpha: 0.42, w: 1.1, bend: 0.62, vertical: Math.abs(ey - cy) > Math.abs(ex - cx) * 0.6, nodeR: 1.6,
      });
      const uu = (tAbs * 0.35 + i * 0.31) % 1;
      const fade = hudEase(Math.min(1, uu / 0.15)) * hudEase(Math.min(1, (1 - uu) / 0.15));
      if (fade > 0.02) { const p = hudPolyPoint(pts, uu); gHalo(c, p[0], p[1], 2.6, HUDK, fade); }

      const s = (typeof HSTAT !== "undefined") && HSTAT[i];
      if (s) hhPanel(c, ex - HH_PANEL_W / 2, ey - HH_PANEL_H / 2, HH_PANEL_W, HH_PANEL_H, s.k, s.v, s.lv, lvMax, tAbs, 1);
    });
  }, { clear: true });
}

// ── 캐릭터 — 실제 몸 그리기 함수를 그대로 부른다(사본 없음). 허브 안에
//    서서 화면의 주인공이 되도록 이전 판보다 크게 세운다. ─────────────────
{ const hero = $("hh-hero");
  if (hero) mk(hero, [320, 320], function hhHero(c, t, dt, W, H, st) {
    const fn = hhDraw(HHMAIN) || ELEM.goldMani;
    fn(c, t, dt, W, H, st);
  }, { clear: true });
}

// ── 로스터 — 클릭하면 실제로 메인이 바뀐다. ──────────────────────────────
{ const host = $("hh-roster");
  if (host) HHROSTER.forEach((r) => {
    const b = document.createElement("div");
    b.className = "hh-ros" + (r.own ? "" : " lock") + (r.key === HHMAIN ? " sel" : "");
    b.dataset.key = r.key;
    let cv = null;
    if (r.art === false) {
      const lockEl = document.createElement("div");
      lockEl.className = "hh-rosart lockonly"; lockEl.textContent = "잠김";
      b.appendChild(lockEl);
    } else {
      cv = document.createElement("canvas"); cv.className = "hh-roscv";
      b.appendChild(cv);
    }
    const nmEl = document.createElement("div"); nmEl.className = "nm"; nmEl.textContent = r.nm;
    b.appendChild(nmEl);
    host.appendChild(b);
    if (cv) mk(cv, [96, 96], function hhRosterGlyph(c, t, dt, W, H, st) {
      c.save();
      if (!r.own) c.globalAlpha = 0.42;
      (hhDraw(r.key) || ELEM.goldMani)(c, t, dt, W, H, st);
      c.restore();
    }, { clear: true });
    if (r.own) b.addEventListener("click", () => {
      HHMAIN = r.key;
      host.querySelectorAll(".hh-ros").forEach((x) => x.classList.toggle("sel", x.dataset.key === r.key));
      const nm = $("hh-mainname"); if (nm) nm.textContent = r.nm;
    });
  });
}

// ── 설정 톱니 · 레일 ─────────────────────────────────────────────────────
{ const h = $("hh-set");
  if (h) { const cv = document.createElement("canvas");
    cv.style.width = "18px"; cv.style.height = "18px"; h.appendChild(cv);
    mk(cv, [18, 18], function hhGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true }); } }
hudRail("hh-rail", "home");
