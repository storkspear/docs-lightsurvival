// ══════════════════════════════════════════════════════════════════════════
// mockup-hud-roster.js — 「캐릭터 열여덟을 어떻게 고르나」 안 셋
//
// `vfx.js` · `hud.js` 뒤에 실린다. 최상위 이름은 `HR`/`hr` 로 격리한다.
//
// ── 이 장이 답하는 질문 ──────────────────────────────────────────────────
// 「캐릭터가 더 늘어나면 다 안 보일 텐데」(2026-08-27 사용자 판정).
// 홈 아래 로스터는 **한 줄에 열여덟**이고(칸 46 × 18 = 828px) 편성 팝업의
// 캐릭터 줄도 같은 병을 앞두고 있다 — **한 답이 두 화면을 고친다.**
// 그래서 이 장은 고르는 손짓을 셋으로 갈라 **셋 다 실제로 돌게** 세운다:
//   A 몸 양옆에 ‹ ›     — 줄을 걷고 위치만 점으로 남긴다   ⭐ **채택**
//   B 아래 줄을 쪽으로   — 줄을 그대로 두고 여섯씩 자른다
//   C 캐릭터 화면        — 홈에서 걷고, 엔진에 **이미 있는 화면**이 맡는다
//                         (`lib/ui/character_screen.dart`, 시안이 없어 임시)
//
// ── ⭐ 판정 — **A 로 확정**(2026-08-27 사용자) ───────────────────────────
// ⚠️⚠️ **B·C 를 지우지 않는다.** 이 파일이 답한 질문은 「셋 중 무엇인가」이고
//   그 답의 근거가 아래 세 안이 **나란히 도는 것** 자체다(장의 「셋을 견줌」 표가
//   그것을 읽어 쓴다). 셋 중 둘을 지우면 표가 근거 없는 주장이 되고, 다음에
//   같은 질문이 다시 처음부터 시작된다. **고른 것이 A 라고 적는 것**으로 족하다.
// ⚠️ 그래서 A 만 손보고 B·C 는 배치 계약(`hrStats`)만 같이 탄다 — 안 고른 안이
//   옛 자리에 서 있으면 견줌이 거짓이 된다.
//
// ── ⚠️ 이 파일이 새로 안 그리는 것 ───────────────────────────────────────
// 몸 · 창 · 칸 · 칩 · 자리는 전부 있는 것을 그대로 쓴다:
//   `ELEM.elemBody`  열여덟이 한 함수다 — **톤만 갈아 끼운다**(홈과 같은 답)
//   `hudChrome`      창 한 벌(별밭 · 브래킷 · 귀퉁이 판독값 · 대각선)
//   `.hudcell`·`.hudchar`·`.hudstrip`·`.hudside`·`.hudstep`   `hud.js` 의 뼈
// 새로 정한 것은 **잠김 셋의 속**뿐이고, 그것도 `hud.js` ⑪절이 자리에서
// 이미 내린 판정(＋ · 값 · 빗금)을 칸과 칩으로 옮긴 것이다.
//
// ⚠️⚠️ **되풀이 그림에 위상 파생값이 없다.** 이 파일의 움직이는 것은 둘뿐이고
//   둘 다 **연속 회전**이다 — `hrHub` 의 역회전 눈금(`-t*0.07`)과 궤도의
//   `t*speed`. 사인/코사인은 원래 이음매가 없어 u=0 과 u=1 을 맞출 자리가
//   아예 안 생긴다. 누적기·「지난 프레임과의 차이」를 쓰지 않는다.
// ⚠️ 캔버스 색은 `hud.js` 의 상수(`HUDLINE` 류 #RRGGBB)만 쓴다 — 캔버스는
//   잘못된 색 문자열을 예외 없이 조용히 무시한다.
// ══════════════════════════════════════════════════════════════════════════
"use strict";

// ── 열여덟 — **엔진 도감이 정본이다** ────────────────────────────────────
// `lib/data/characters.dart` 의 `kCharacterDefs`: 기본 6 + 특수 12
// (쌍 열 10 + 암 + 백광). 차례도 거기 그대로다.
//
// ⚠️⚠️ **쌍 열의 이름을 손으로 적지 않는다** — 정본은 `vfx.js` 의 `FVNAME`
//   이고 엔진이 그것을 옮겨 들었다(`data/elements.dart` 의
//   `kElementPairNames`). 여기서는 앞머리만 잘라 쓴다.
// ⚠️ **한자를 안 쓴다** — 사용자 확정(「게임 내에서 한문 절대 금지」). 기본
//   여섯의 이름은 엔진 `SkillElement.label` 그대로이고 거기에 한자가 없다.
//   홈 시안(`mockup-hud-home.js` 의 `HHROSTER`)도 2026-08-27 에 걷어내 두 장의
//   글자가 같다. 편성 팝업은 아직 달고 있다.
// ⚠️⚠️ **id 와 톤 이름이 다르다** — 저장본의 id 는 `ice`·`fire`·`bolt`·`poison`
//   인데 `TONE` 의 키는 `frost`·`ember`·`volt`·`toxin` 이다. 한 칸으로 접으면
//   그 넷이 `TONE` 에서 안 잡혀 **몸이 통째로 안 그려진다**(스모크가 그
//   자리에서 여덟 칸을 잡았다). 홈도 같은 이유로 두 칸을 든다.
// ⚠️ 넷째 칸은 **고유가 실제로 찬 칸 수**다(`kSkillElementIds` 의 길이) —
//   칸은 늘 열둘이고 모자란 만큼이 자물쇠로 뜬다.
const HRBASIC = [
  ["gold", "gold", "무속성", 7],
  ["ice", "frost", "빙", 8],
  ["fire", "ember", "염", 7],
  ["bolt", "volt", "뇌", 5],
  ["poison", "toxin", "독", 8],
  ["gale", "gale", "풍", 8],
];
/// 쌍을 이루는 다섯 — 기본 여섯에서 **무속성을 뺀** 것의 [HRBASIC] 인덱스.
/// 쌍이 C(5,2) = 10 이다(엔진 `_kPairElements` 와 같은 차례).
const HRPAIRELEM = [1, 2, 3, 4, 5];
/// 쌍 → `TONE`/`FVNAME` 의 키. **엔진의 `fusionTone` 과 같은 표**여야 두
/// 화면의 색이 안 갈린다(`game/fx/body_fuse.dart`).
const HRPAIRTONE = {
  "1,2": "aqua", "1,3": "magnet", "1,4": "plague", "1,5": "snow",
  "2,3": "blast", "2,4": "smoke", "2,5": "fstorm",
  "3,4": "numb", "3,5": "thunder", "4,5": "murk",
};

// ── 엔진 상수 — 손으로 다시 세지 않는다 ─────────────────────────────────
const HR_SLOTS = 12;        // kCharacterSkillSlots — 고유 칸
const HR_OWNMIN = 3;        // kCharacterOwnMin — 출격 조건(내 속성)
const HR_SHARED = 8;        // 공유 풀에 실제로 찬 것
const HR_SHAREDMAX = 13;    // kSharedSkillSlots
const HR_PBASE = 88000;     // kCharacterPriceBase
const HR_PSTEP = 22000;     // kCharacterPriceStep
const HR_PPER = 2;          // kCharacterPricePerStep — 두 칸마다 한 계단

/// 쌍 이름 — `FVNAME` 의 **앞마디**. 표가 없으면 조합 표기로 물러선다.
function hrPairName(tone, pair) {
  const full = (typeof FVNAME !== "undefined") && FVNAME[tone];
  return full ? String(full).split(" · ")[0] : pair;
}

/// 열여덟. **손으로 적은 것은 여섯뿐이고 열둘은 접어서 만든다** — 엔진
/// `kCharacterDefs` 가 하는 그대로다.
const HRROSTER = (function hrBuild() {
  const out = HRBASIC.map(function (r) {
    return {
      key: r[0], tone: r[1], nm: r[2], tier: "기본",
      owned: true, own12: r[3], hasBasic: true, pair: null, px: null,
    };
  });
  const sp = [];
  for (let i = 0; i < HRPAIRELEM.length; i++) {
    for (let j = i + 1; j < HRPAIRELEM.length; j++) {
      const a = HRBASIC[HRPAIRELEM[i]], b = HRBASIC[HRPAIRELEM[j]];
      const tone = HRPAIRTONE[HRPAIRELEM[i] + "," + HRPAIRELEM[j]];
      const pair = a[2] + "+" + b[2];
      sp.push({
        key: "fuse_" + tone, tone, nm: hrPairName(tone, pair), tier: "특수",
        // ⚠️ 쌍 열의 고유 풀은 **0종**이다 — 특수는 아직 한 칸도 안 찼다.
        owned: false, own12: 0, hasBasic: false, pair, px: 0,
      });
    }
  }
  // 암 — 고유가 암전 하나(마법)라 총구가 빈다. 백광 — 속성이 아니라 상태다.
  sp.push({ key: "shade", tone: "shadeA", nm: "암", tier: "특수",
    owned: false, own12: 1, hasBasic: false, pair: null, px: 0 });
  sp.push({ key: "white", tone: "white", nm: "백광", tier: "특수",
    owned: false, own12: 0, hasBasic: false, pair: null, px: 0 });
  // 값 — 상점 차례대로 두 칸마다 한 계단(`shopCharacters`).
  sp.forEach(function (r, i) { r.px = HR_PBASE + HR_PSTEP * Math.floor(i / HR_PPER); });
  return out.concat(sp);
})();

/// **이 캐릭터로 나갈 수 있나** — `characterFieldable` 그대로: 총구(일반
/// 계열)가 있고 고유가 [HR_OWNMIN] 이상.
function hrReady(r) { return r.hasBasic && r.own12 >= HR_OWNMIN; }
/// 칸/칩의 상태 — ""(열림) · "buy"(안 샀다) · "wip"(못 나간다).
/// ⚠️ **셋이 서로 다른 사건이다.** 안 산 것은 돈으로 열리고, 못 나가는 것은
///   파는 물건이 아니다 — 밝기로만 가르면 둘이 「어두운 칸」으로 뭉친다.
function hrState(r) { return hrReady(r) ? (r.owned ? "" : "buy") : "wip"; }
/// 못 나가는 까닭 한 줄 — `characterNotFieldableWhy` 와 같은 두 문장이다.
/// 같은 캐릭터가 화면마다 다른 이유를 대면 안 된다.
function hrWhy(r) {
  return r.hasBasic
    ? "고유 " + r.own12 + " — 내 속성 " + HR_OWNMIN + " 을 못 채웁니다"
    : "일반 스킬 0 — 총구가 빕니다";
}
/// 열린 칸이 다는 잔글.
function hrNote(r) {
  const st = hrState(r);
  return st === "wip" ? "준비 중" : st === "buy" ? "상점에서" : "고유 " + r.own12;
}
const HR_OWNED = HRROSTER.filter(function (r) { return hrState(r) === ""; }).length;
const HR_LOCKED = HRROSTER.length - HR_OWNED;

// ── 몸 — 열여덟이 한 함수다 ──────────────────────────────────────────────
/// ⭐ `elemBody` 의 `bare` 갈래(광휘 + 각진 별 코어 3겹, **둘레 모티프 없음**)에
///   **톤만 갈아 끼운다.** 엔진도 같은 방식으로 세운다(`ui/home_char.dart`).
/// ⚠️ 속성마다 다른 몸 함수를 부르지 마라 — 가운데 몸과 칸 그림이 두 벌로
///   갈려 반드시 어긋난다.
/// ⚠️ **잠김은 여기서 안 어둡힌다** — CSS 필터 한 곳이 든다(엔진
///   `_kLockedFilter` 와 같은 수). 두 곳에서 어둡히면 두 배로 어두워진다.
function hrBody(get) {
  return function hrBodyDraw(c, t, dt, W, H, st) {
    ELEM.elemBody(c, t, dt, W, H, st, get().tone, 1);
  };
}
// ── 세 안의 몸 크기 — **판이 얼마나 떨어지나가 여기서 나온다** ────────────
// ⚠️⚠️ 손으로 세 군데(`hrFig` 호출 · `hrBgHub` 호출 · CSS)에 적혀 있으면
//   반드시 갈린다. 판까지의 거리가 이 수의 배수라(`HH_RXF`) 갈리는 순간
//   **몸만 크고 판은 옛 자리**가 된다. ⇒ 한 곳에서 낸다.
// ⚠️ 홈이 몸과 허브를 `156 : 52` = **3 : 1** 로 묶어 뒀다(`HH_HEROPX` 머리말의
//   「몸은 허브와 한 벌」). 아래 셋도 그 비를 지킨다 — 안 B 는 아래 줄이
//   무대를 68 잘라 가므로 한 단 작고, 안 C 는 로스터가 통째로 없어 한 단 크다.
const HRA_FIGPX = 123, HRB_FIGPX = 108, HRC_FIGPX = 141;   // = 허브 41 · 36 · 47 의 3배
/// 몸 하나를 호스트에 세운다. 캔버스 내부 해상도는 표시 크기의 두 배다(선명도).
function hrFig(hostId, px, get) {
  const h = $(hostId); if (!h) return null;
  const cv = document.createElement("canvas");
  cv.style.width = px + "px"; cv.style.height = px + "px";
  h.appendChild(cv);
  mk(cv, [px * 2, px * 2], hrBody(get), { clear: true });
  return h;
}

// ── 배경 — 공용 창 + 홈의 허브를 이 장의 크기로 ──────────────────────────
// ⚠️ `.hudstage` 의 여백(위 54 · 아래 24)과 **한 벌이다** — 몸이 그 안에서
//   가운데 서므로 허브 중심도 같은 수식에서 나와야 한다. 한쪽만 고치면 고리와
//   몸이 어긋난다(홈이 실측으로 겪은 그 자리).
const HR_PADT = 54, HR_PADB = 24;
/// 무대의 가로 가운데 — 레일(58) + 왼쪽 여백 10, 오른쪽 여백 20.
function hrCx(W) { return HUD_RAILW + 10 + (W - HUD_RAILW - 30) / 2; }
/// 무대의 세로 가운데. `cut` 은 아래에서 먼저 떼어 가는 몫(안 B 의 로스터 줄).
function hrCy(H, cut) { return (HR_PADT + (H - HR_PADB - (cut || 0))) / 2; }

/// 허브 — 홈이 세운 다섯 겹을 그대로 줄인다.
/// ⚠️ 반지름을 **전부 R 이상**으로 잡는다: R 안쪽에 그린 겹은 몸에 완전히
///   덮여 안 보인다. 몸이 고리를 **뚫고 나오는** 것이 이 그림의 전부다.
function hrHub(c, cx, cy, R, t) {
  hudRing(c, cx, cy, R, { alpha: 0.34, w: 1.6 });
  hudTicks(c, cx, cy, R * 1.07, 60, { len: 4, bigLen: 9, every: 5 });
  hudRing(c, cx, cy, R * 1.14, { alpha: 0.22, w: 1, dash: [1, 5] });
  hudSectorRing(c, cx, cy, R * 1.21, 16, { alpha: 0.22 });
  c.save(); c.translate(cx, cy); c.rotate(-t * 0.07);
  hudTicks(c, 0, 0, R * 1.28, 16, { len: 6, bigLen: 6, every: 999, alpha: 0.16 });
  c.restore();
  gHalo(c, cx, cy, R * 0.5, HUDK, 0.30 + 0.10 * Math.sin(t * 1.6));
  hudOrbit(c, cx, cy, R * 2.30, R * 1.35, t, { speed: 0.10, alpha: 0.14, dots: 2, dotR: 2.2 });
  hudOrbit(c, cx, cy, R * 1.70, R * 0.95, -t, { speed: 0.16, alpha: 0.12, dots: 3, dotR: 1.6 });
}

// ── 여섯 판 — **이 세 안은 전부 홈이다** ─────────────────────────────────
// ⚠️⚠️ 판을 빼면 셋이 「홈의 변형」이 아니라 **다른 화면**으로 읽혀 견줄 수가
//   없다 — 셋에서 갈리는 것은 **아래 줄 하나**여야 한다. 그래서 스탯 여섯은
//   홈이 세운 자리(극 ±90° 를 비운 좌우 셋씩) 그대로 선다. 값은 `HSTAT` 을
//   그대로 읽는다 — 사본을 만들면 두 화면의 숫자가 갈린다.
// ⚠️ 인출선은 **공용 `hudLeader`** 다(강화 · 상점 · 도감 · 일지 넉 장이 쓰는
//   그것). 홈만 제 사선 갈래를 따로 드는데, 그 함수는 그 파일 안에 있다.
//
// ⚠️⚠️ **판이 캐릭터에서 얼마나 떨어지나는 여기서 안 정한다 — 홈이 정한다.**
//   2026-08-27 사용자 판정: 「능력치를 캐릭터 주변으로 땡기라고 했잖아. 지금은
//   화면의 끝에 다 가 있는데」. 그때 두 장이 **같은 뜻의 수식을 두 벌** 갖고
//   있었다(홈은 `(cx − 레일) − 판폭/2 − 여백`, 여기는 `(cx − 레일 − 10) −
//   판폭/2 − 여백`) — 둘 다 「들어가는 데까지 민다」라 판이 창틀에 붙었고,
//   한쪽을 고쳐도 다른 쪽이 안 따라온다.
//   ⇒ 이제 `mockup-hud-home.js` 의 `HH_RXF`·`HH_RYF`(둘 다 **몸 크기의 배수**)를
//     읽어 쓴다. 이 장의 몸은 홈보다 작으므로(123 대 156) 같은 배수가 **비례해
//     줄어든 거리**를 낸다 — 그것이 「같은 배치의 작은 판」이다.
//   ⚠️ 그 파일은 `mockup-hud-roster.html` 이 이 파일 **앞에** 싣는다. 못 읽으면
//     조용히 옛 자리로 돌아가지 말고 **눈에 띄게 틀려야** 하므로 예비값을
//     안 둔다 — 아래 [hrStats] 가 그대로 참조한다.
const HR_SPREAD = 50;
const HR_POS = [-HR_SPREAD, 0, HR_SPREAD, 180 + HR_SPREAD, 180, 180 - HR_SPREAD];
/// 여섯이 세로로 벌어지는 몫의 최대치 — 극이 비어 있어 창틀에 닿는 것은 세로
/// 반지름 자체가 아니라 **제일 위 판이 실제로 올라가는 몫**이다.
const HR_SINMAX = Math.max.apply(null, HR_POS.map(function (d) {
  return Math.abs(Math.sin(d * Math.PI / 180));
}));
const HR_PW = 88, HR_PH = 36;

/// 판 하나 — 각진 틀 + 라벨 + 값 + 작은 레벨 다이얼.
function hrPanel(c, x, y, label, val, lv) {
  const cut = 7, w = HR_PW, h = HR_PH;
  c.beginPath();
  c.moveTo(x + cut, y); c.lineTo(x + w, y); c.lineTo(x + w, y + h - cut);
  c.lineTo(x + w - cut, y + h); c.lineTo(x, y + h); c.lineTo(x, y + cut); c.closePath();
  c.fillStyle = A(HUDBASE, 0.92); c.fill();
  c.strokeStyle = A(HUDLINE, 0.55); c.lineWidth = 1; c.stroke();
  c.textAlign = "left"; c.font = hudFont(600, 8); c.fillStyle = A(HUDDIM, 1);
  lbText(c, label, x + 8, y + 12);
  c.font = hudFont(700, 15); c.fillStyle = HUDINK;
  lbText(c, val, x + 8, y + h - 9);
  const lvMax = typeof kStatLevelMax !== "undefined" ? kStatLevelMax : 99;
  hudDial(c, x + w - 15, y + h / 2 + 2, 10, hudCl((lv || 0) / lvMax), { w: 2, label: false });
}

/// 여섯 판 + 인출선. 좌표는 전부 (cx,cy)·**몸 크기**에서 파생한다 — 판마다 다른
/// 상수를 쓰지 않는다(자리가 갈리는 것은 늘 거기서 시작한다).
/// ⭐ `hero` 는 이 장에 선 몸의 표시 크기다. 배수는 홈이 든다(위 머리말).
/// ⚠️ 창틀은 **상한**으로만 쓴다 — 목표가 아니다. 좁은 판에서 넘치지만 않으면 된다.
function hrStats(c, cx, cy, R, t, hero) {
  const margin = 8, hw = HR_PW / 2, hh = HR_PH / 2;
  const Ry = Math.min(hero * HH_RYF, (cy - HR_PADT - hh) / HR_SINMAX);
  const Rx = Math.min(hero * HH_RXF, (cx - HUD_RAILW - 10) - hw - margin);
  HR_POS.forEach(function (deg, i) {
    const rad = deg * Math.PI / 180;
    const ex = cx + Math.cos(rad) * Rx, ey = cy + Math.sin(rad) * Ry;
    const x0 = cx + Math.cos(rad) * R * 1.05, y0 = cy + Math.sin(rad) * R * 1.05;
    const pts = hudLeader(c, x0, y0, ex, ey, { bend: 0.42, alpha: 0.34, w: 1.1, nodeR: 1.5 });
    // 흐르는 빛 — **창 함수가 양끝에서 0 으로 수렴**하므로 u=0 과 u=1 이 둘 다
    // 0 이다(이음매 안전). 길이 기준(`hudPolyPoint`)으로 얹어 꺾이는 자리에서
    // 속도가 안 튄다.
    const uu = (t * 0.35 + i * 0.31) % 1;
    const fade = hudEase(Math.min(1, uu / 0.15)) * hudEase(Math.min(1, (1 - uu) / 0.15));
    if (fade > 0.02) { const p = hudPolyPoint(pts, uu); gHalo(c, p[0], p[1], 2.6, HUDK, fade); }
    const s = (typeof HSTAT !== "undefined") && HSTAT[i];
    if (s) hrPanel(c, ex - hw, ey - hh, s.k, s.v, s.lv);
  });
}

/// 홈 계열 세 장의 배경 — 창 + 허브 + 판 여섯.
/// ⚠️ `hero` 는 그 장의 몸 크기다(`hrFig` 에 넘기는 수와 **같아야** 한다) —
///   판이 얼마나 떨어지나가 몸에서 나오므로, 여기와 저기가 갈리면 판만 딴
///   크기의 화면에 선다.
function hrBgHub(seed, R, cut, hero) {
  return function hrBgHubDraw(c, tAbs, dt, W, H) {
    hudChrome(c, W, H, tAbs, { seed });
    const cx = hrCx(W), cy = hrCy(H, cut);
    hrHub(c, cx, cy, R, tAbs);
    // ⚠️ **맨 나중에** 그린다 — 실제로 읽어야 하는 것이 장식 위에 얹혀야 한다.
    hrStats(c, cx, cy, R, tAbs, hero);
  };
}
/// 캐릭터 화면의 배경 — 격자가 무대를 채우므로 허브를 안 세운다. 표식은
/// **열여덟로 나뉜 고리** 하나다(편성표 장이 셋으로 나눈 고리를 쓰는 것과
/// 같은 자리 — 그 화면의 수가 배경에서 한 번 더 말해진다).
function hrBgGrid(seed) {
  return function hrBgGridDraw(c, tAbs, dt, W, H) {
    const box = hudChrome(c, W, H, tAbs, { seed });
    const r = Math.min(box.w, box.h) * 0.46;
    c.save(); c.translate(box.cx, box.cy); c.rotate(tAbs * 0.04);
    hudSectorRing(c, 0, 0, r, HRROSTER.length, { alpha: 0.09, spoke: r * 0.10, w: 1.2 });
    c.restore();
    hudRing(c, box.cx, box.cy, r * 1.28, { dash: [3, 9], alpha: 0.06, w: 1 });
  };
}

// ── 칩 한 칸 — `.hudchar` 뼈 + 잠김 셋의 속 ──────────────────────────────
// ⚠️ **갓 만든 노드에 `querySelector` 를 안 쓴다** — 스모크 스텁의 가짜 DOM 이
//   그것을 null 로 돌려줘 장 전체가 「LOAD FAIL」로 죽는다(상점 장이 겪었다).
//   참조는 만드는 자리에서 그대로 들고 간다.
function hrChip(host, r, opt) {
  if (!host) return null;
  const o = opt || {}, S = o.size || 36, st = hrState(r);
  const b = document.createElement("div");
  b.className = "hudchar" + (st ? " " + st : "") + (r.key === o.cur ? " on" : "");
  b.dataset.key = r.key;
  const cv = document.createElement("canvas");
  cv.style.width = S + "px"; cv.style.height = S + "px";
  b.appendChild(cv);
  // 자물쇠 배지는 **빈 칸**이다 — 그림은 CSS 가 그린다(이모지는 색을 안 탄다).
  b.insertAdjacentHTML("beforeend", `<div class="nm">${r.nm}</div>`
    + (st ? `<div class="lk"></div>` : "")
    + (st === "buy" ? `<div class="px">${r.px}</div>` : ""));
  host.appendChild(b);
  mk(cv, [S * 2, S * 2], hrBody(function () { return r; }), { clear: true });
  return b;
}

// ── 칸 한 개 — `.hudcell` 뼈. 캐릭터 화면과 견본이 **같은 함수**를 쓴다 ────
// 견본이 제 손으로 그리면 「이 상태가 화면에서 어떻게 보이나」를 거짓으로
// 말하게 된다(편성표 장이 같은 자리에서 같은 판정을 내렸다).
function hrCell(host, r, opt) {
  if (!host) return null;
  const o = opt || {};
  const st = o.state != null ? o.state : hrState(r);
  const d = document.createElement("div");
  d.className = "hudcell" + (st ? " " + st : "") + (o.on ? " on" : "");
  d.dataset.key = r.key;
  const cv = document.createElement("canvas");
  cv.style.width = "34px"; cv.style.height = "34px";
  d.appendChild(cv);
  d.insertAdjacentHTML("beforeend", `<div class="n">${r.nm}</div>`);
  if (st === "buy") {
    // 값 — **천 단위 콤마를 안 찍는다**(상점 격자의 값 알약과 같은 규약).
    const v = document.createElement("div"); v.className = "v";
    const cur = document.createElement("canvas");
    cur.style.width = "9px"; cur.style.height = "9px";
    v.appendChild(cur);
    v.insertAdjacentHTML("beforeend", `<span>${r.px}</span>`);
    d.appendChild(v);
    mk(cur, [18, 18], function hrCellCur(c, t, dt, W) { CURGLYPH.matter(c, W, false); }, { clear: true });
  } else {
    d.insertAdjacentHTML("beforeend",
      `<div class="why">${o.note != null ? o.note : hrNote(r)}</div>`);
  }
  if (st) d.insertAdjacentHTML("beforeend", `<div class="lk"></div>`);
  host.appendChild(d);
  mk(cv, [68, 68], hrBody(function () { return r; }), { clear: true });
  return d;
}

// ── 고유 열두 칸 — 찬 칸과 **칸 자물쇠** ─────────────────────────────────
// ⚠️ 칸의 **이름은 안 적는다.** 열여덟 × 열둘의 이름표를 시안이 손으로 들면
//   도감이 하나 더 생기고, 스킬이 오갈 때마다 이 장만 옛말을 한다. 엔진 화면은
//   `skillNameOf` 로 이름을 낸다 — 여기서 말하는 것은 **몇 칸이 찼나**다.
function hrSlotGrid(host) {
  const cells = [];
  if (!host) return cells;
  for (let i = 0; i < HR_SLOTS; i++) {
    const e = document.createElement("i");
    host.appendChild(e);
    cells.push(e);
  }
  return cells;
}
function hrSlotSet(cells, n) {
  cells.forEach(function (e, i) { e.className = i < n ? "" : "lk"; });
}

// ══════════════════════════════════════════════════════════════════════════
// 안 A — 몸 양옆에 ‹ ›, 아래는 위치만
// ══════════════════════════════════════════════════════════════════════════
// ⭐ **화살표는 열여덟을 다 돈다.** 가진 여섯만 돌게 하면 안 산 열둘을 화살표로
//   영영 못 만나 「저건 뭐지」가 안 생긴다 — 살 이유가 화면에서 사라진다.
// ⭐ 대신 값을 **점 줄**이 절반 갚는다: 열여덟이 다 서고, 누르면 바로 간다.
//   ⚠️ 밝기가 아니라 **모양**으로 가른다(원 = 내 것 · 사각 빗금 = 아직 아닌
//     것). 8px 에서 밝기 차이는 안 읽히고 모양 차이는 읽힌다.
let HRA_I = 0;
{
  const bg = $("hra-bg");
  if (bg) mk(bg, [788, 364], hrBgHub(7, 41, 0, HRA_FIGPX), { clear: true });
  hrFig("hra-fig", HRA_FIGPX, function () { return HRROSTER[HRA_I]; });
  const fig = $("hra-fig"), nm = $("hra-nm"), why = $("hra-why");
  const dots = $("hra-dots"), cnt = $("hra-cnt");
  const dotEls = [];
  HRROSTER.forEach(function (r, i) {
    const d = document.createElement("div");
    d.className = "hr-dot" + (hrState(r) ? " lk" : "");
    d.title = r.nm;
    if (dots) dots.appendChild(d);
    d.addEventListener("click", function () { HRA_I = i; hraPaint(); });
    dotEls.push(d);
  });
  const hraPaint = function () {
    const r = HRROSTER[HRA_I], st = hrState(r);
    if (fig) fig.classList.toggle("lk", !!st);
    if (nm) { nm.textContent = r.nm; nm.classList.toggle("lk", !!st); }
    if (why) {
      why.innerHTML = st === "wip"
        ? `<b>🔒 준비 중</b> · ${hrWhy(r)}`
        : st === "buy"
          ? `<b>🔒 상점에서</b> · ${r.px}`
          : `${r.tier} · 고유 ${r.own12} / ${HR_SLOTS}`;
    }
    dotEls.forEach(function (d, i) { d.classList.toggle("on", i === HRA_I); });
    if (cnt) cnt.textContent = (HRA_I + 1) + " / " + HRROSTER.length
      + " · 보유 " + HR_OWNED + " · 🔒 " + HR_LOCKED;
  };
  const step = function (d) {
    HRA_I = (HRA_I + d + HRROSTER.length) % HRROSTER.length;
    hraPaint();
  };
  const p = $("hra-prev"), n = $("hra-next");
  if (p) p.addEventListener("click", function () { step(-1); });
  if (n) n.addEventListener("click", function () { step(1); });
  hraPaint();
  hudRail("hra-rail", "home");
}

// ══════════════════════════════════════════════════════════════════════════
// 안 B — 아래 줄을 그대로 두고 여섯씩 쪽으로
// ══════════════════════════════════════════════════════════════════════════
// ⚠️⚠️ **쪽을 다시 짓지 않는다.** 넘길 때마다 칸을 새로 만들면 캔버스가 매번
//   등록돼(`mk`) 떨어진 칸이 쌓인다 ⇒ 세 쪽을 **한 번에 다 짓고** 보이는
//   쪽만 켠다. 그래서 이 장은 어느 순간에도 **열여덟을 다 그리고 있다.**
const HR_PER = 6;
let HRB_PG = 0, HRB_KEY = HRROSTER[0].key;
{
  const bg = $("hrb-bg");
  // 로스터 줄(62) + 그 위 틈(6) 만큼 무대가 위로 올라간다.
  if (bg) mk(bg, [788, 364], hrBgHub(19, 36, 68, HRB_FIGPX), { clear: true });
  hrFig("hrb-fig", HRB_FIGPX, function () {
    return HRROSTER.find(function (r) { return r.key === HRB_KEY; }) || HRROSTER[0];
  });
  const nm = $("hrb-nm"), host = $("hrb-pages"), pgn = $("hrb-pgn");
  const pages = [], chips = [];
  const nPage = Math.ceil(HRROSTER.length / HR_PER);
  for (let p = 0; p < nPage; p++) {
    const pg = document.createElement("div");
    pg.className = "hr-page" + (p === 0 ? " on" : "");
    if (host) host.appendChild(pg);
    pages.push(pg);
    HRROSTER.slice(p * HR_PER, p * HR_PER + HR_PER).forEach(function (r) {
      const b = hrChip(pg, r, { size: 36, cur: HRB_KEY });
      if (b) {
        chips.push(b);
        if (!hrState(r)) b.addEventListener("click", function () {
          HRB_KEY = r.key; hrbPaint();
        });
      }
    });
  }
  const hrbPaint = function () {
    pages.forEach(function (pg, i) { pg.classList.toggle("on", i === HRB_PG); });
    chips.forEach(function (b) { b.classList.toggle("on", b.dataset.key === HRB_KEY); });
    const r = HRROSTER.find(function (x) { return x.key === HRB_KEY; }) || HRROSTER[0];
    if (nm) nm.textContent = r.nm;
    // 「지금 몇 쪽인가」와 「뒤에 잠긴 것이 몇인가」 — 둘 다 늘 보여야 한다.
    const lock = HRROSTER.slice((HRB_PG + 1) * HR_PER)
      .filter(function (x) { return hrState(x); }).length;
    if (pgn) pgn.innerHTML = `<b>${HRB_PG + 1} / ${nPage} 쪽</b>`
      + `보유 ${HR_OWNED} / ${HRROSTER.length}<br>뒤에 🔒 ${lock}`;
  };
  const step = function (d) { HRB_PG = (HRB_PG + d + nPage) % nPage; hrbPaint(); };
  const p = $("hrb-prev"), n = $("hrb-next");
  if (p) p.addEventListener("click", function () { step(-1); });
  if (n) n.addEventListener("click", function () { step(1); });
  hrbPaint();
  hudRail("hrb-rail", "home");
}

// ══════════════════════════════════════════════════════════════════════════
// 안 C-1 — 홈에서 줄을 통째로 걷는다
// ══════════════════════════════════════════════════════════════════════════
// 남는 것은 지금 캐릭터 하나와 문 하나다. 로스터 74px 이 통째로 비어 몸이
// 커진다 — 이 화면의 요구 첫째(「캐릭터가 크게 서고」)와 같은 방향이다.
{
  const bg = $("hrc-bg");
  if (bg) mk(bg, [788, 364], hrBgHub(31, 47, 0, HRC_FIGPX), { clear: true });
  hrFig("hrc-fig", HRC_FIGPX, function () { return HRROSTER[0]; });
  const nm = $("hrc-nm"), cnt = $("hrc-cnt");
  if (nm) nm.textContent = HRROSTER[0].nm;
  if (cnt) cnt.textContent = "보유 " + HR_OWNED + " / " + HRROSTER.length;
  hudRail("hrc-rail", "home");
}

// ══════════════════════════════════════════════════════════════════════════
// 안 C-2 — 캐릭터 화면(`lib/ui/character_screen.dart` 의 시안)
// ══════════════════════════════════════════════════════════════════════════
// ⭐ **기본 여섯이 한 줄, 특수 열둘이 두 줄.** 엔진은 3열인데 여기는 6열이다 —
//   가로 무대(788)에서 6열이면 열여덟이 **세 줄에 다 서고 굴릴 자리가 없다.**
//   「다 안 보인다」가 이 장의 물음이므로, 다 보이는 것이 답의 절반이다.
// ⭐ **금빛과 냉광이 다른 말을 한다**: 금빛 = 지금 쓰는 캐릭터, 냉광 테 =
//   지금 보고 있는 칸. 엔진도 값이 둘이다(`characterId` ↔ `_shown`) — 잠긴
//   칸도 **눌러서 볼 수는 있어야** 하기 때문이다(숨는 칸이 없다는 규칙).
let HRD_KEY = "fuse_aqua";     // 보고 있는 칸 — 잠김을 처음부터 보여 준다
const HRD_PICK = "gold";       // 지금 쓰는 캐릭터 — `kDefaultCharacterId`
{
  const bg = $("hrd-bg");
  if (bg) mk(bg, [788, 364], hrBgGrid(43), { clear: true });
  const wal = $("hrd-wal"), grid = $("hrd-grid"), side = $("hrd-side");
  if (wal) wal.insertAdjacentHTML("beforeend",
    `<span class="one"><span class="lb">보유</span><b>${HR_OWNED}</b> / ${HRROSTER.length}</span>`
    + `<span class="one"><span class="lb">특수</span>0 / ${HRROSTER.length - HRBASIC.length}</span>`
    + `<span class="one"><span class="lb">잠김</span>${HR_LOCKED}</span>`
    + `<span class="rt">여기서 팔지 않습니다 — 얼마인지까지만 말합니다</span>`);

  // 격자 — 머리줄 둘이 격자의 한 줄을 통째로 먹는다(`.hudhead`).
  const cells = [];
  const head = function (title, ct) {
    if (!grid) return;
    const h = document.createElement("div");
    h.className = "hudhead";
    h.insertAdjacentHTML("beforeend", `<b>${title}</b><span class="ct">${ct}</span>`);
    grid.appendChild(h);
  };
  const basic = HRROSTER.filter(function (r) { return r.tier === "기본"; });
  const special = HRROSTER.filter(function (r) { return r.tier === "특수"; });
  head("기본", basic.length + " · 처음부터 열려 있습니다");
  basic.forEach(function (r) { cells.push(hrCell(grid, r, { on: r.key === HRD_PICK })); });
  // ⚠️ **오늘은 한 칸도 안 판다** — 열둘 다 고유 0~1 종에 일반 0 종이라 사도
  //   못 나간다. 「상점에서 산다」를 그대로 두면 화면이 없는 물건을 가리킨다.
  head("특수", "0 / " + special.length + " · 고유 스킬이 차면 상점에 섭니다");
  special.forEach(function (r) { cells.push(hrCell(grid, r, {})); });

  // 오른쪽 기둥 — 보고 있는 칸이 무엇인지 말하는 자리. **비어도 자리를 남긴다.**
  const ttl = document.createElement("div"); ttl.className = "ttl";
  const pair = document.createElement("div"); pair.className = "hr-pair";
  const sect = document.createElement("div"); sect.className = "hr-sect";
  const sl = document.createElement("div"); sl.className = "hr-sl";
  const note = document.createElement("div"); note.className = "hr-note";
  const act = document.createElement("div"); act.className = "hr-act";
  const btn = document.createElement("div"); btn.className = "hudbtn";
  const rs = document.createElement("div"); rs.className = "rs";
  act.appendChild(btn); act.appendChild(rs);
  if (side) [ttl, pair, sect, sl, note, act].forEach(function (e) { side.appendChild(e); });
  const slots = hrSlotGrid(sl);
  sect.textContent = "고유 " + HR_SLOTS + "칸";

  const hrdPaint = function () {
    const r = HRROSTER.find(function (x) { return x.key === HRD_KEY; }) || HRROSTER[0];
    const st = hrState(r);
    cells.forEach(function (d) {
      if (!d) return;
      d.classList.toggle("look", d.dataset.key === HRD_KEY);
    });
    ttl.innerHTML = `<b>${r.nm}</b><i>${r.tier}</i>`;
    pair.textContent = r.pair ? r.pair : (r.tier === "기본" ? "기본 속성 하나" : "짝이 없는 한 칸");
    hrSlotSet(slots, r.own12);
    // ⚠️ 수 뒤에 조사를 붙이지 않는다 — 「12 은」·「0 이」처럼 받침이 어긋난다.
    //   낱말 뒤에만 붙인다(엔진의 `objectParticle` 이 지키는 그 규칙과 같은 결).
    note.innerHTML = `찬 칸 <b>${r.own12}</b> / ${HR_SLOTS}`
      + ` · 나머지 <b>${HR_SLOTS - r.own12}</b> 칸은 기획 예정입니다<br>`
      + `공유 ${HR_SHARED} / ${HR_SHAREDMAX} 칸은 누구로 들어가도 같습니다`;
    // 버튼 — 열린 칸만 금빛이다. 잠긴 칸은 **왜 잠겼는지**를 밑에 단다.
    // ⚠️ 못 나가는 것에는 **값을 안 적는다** — 파는 물건이 아니라 아직 안 선
    //   물건이다. 값이 붙으면 「모으면 살 수 있다」로 읽힌다.
    if (st === "wip") {
      btn.className = "hudbtn lock"; btn.textContent = "🔒 준 비 중";
      rs.textContent = hrWhy(r);
    } else if (st === "buy") {
      btn.className = "hudbtn lock"; btn.textContent = "🔒 상 점 에 서";
      rs.textContent = "값 " + r.px + " · 모으면 열립니다";
    } else {
      btn.className = "hudbtn sel"; btn.textContent = "이 걸 로";
      rs.textContent = r.key === HRD_PICK ? "지금 이 캐릭터입니다" : "누르면 이 캐릭터로 나갑니다";
    }
  };
  cells.forEach(function (d) {
    if (!d) return;
    d.addEventListener("click", function () { HRD_KEY = d.dataset.key; hrdPaint(); });
  });
  hrdPaint();
  hudRail("hrd-rail", "home");
}

// ── 잠김 셋의 견본 — 화면과 **같은 함수**가 짓는다 ───────────────────────
{
  const h = $("hr-samps");
  if (h) {
    const put = function (build, cap) {
      const w = document.createElement("div"); w.className = "hr-samp";
      h.appendChild(w);
      build(w);
      w.insertAdjacentHTML("beforeend", `<div class="sc">${cap}</div>`);
    };
    // ① 안 샀다 — 값이 붙는다. 오늘 이 상태인 캐릭터는 없으므로 **정수의 값**을
    //   빌려 「그날이 오면 이렇게 선다」를 그린다.
    put(function (w) {
      hrCell(w, HRROSTER.find(function (r) { return r.key === "fuse_aqua"; }), { state: "buy" });
    }, "<b>안 샀다</b> — 주황 점선 + 값. 돈으로 열립니다. "
      + "⚠️ 오늘 이 상태인 캐릭터는 <b>없습니다</b>");
    // ② 못 나간다 — 값을 안 단다.
    put(function (w) {
      hrCell(w, HRROSTER.find(function (r) { return r.key === "fuse_aqua"; }), {});
    }, "<b>못 나간다</b> — 빗금 + 자물쇠 + 「준비 중」. "
      + "파는 물건이 아니라 <b>아직 안 선 물건</b>입니다");
    // ③ 칸 자물쇠 — 오른쪽 기둥의 한 칸. 표본은 **빙**(고유 8 · 자물쇠 4)이다.
    put(function (w) {
      const g = document.createElement("div"); g.className = "hr-sl";
      w.appendChild(g);
      hrSlotSet(hrSlotGrid(g), HRBASIC[1][3]);
    }, "<b>칸 자물쇠</b> — 고유 열두 칸 중 아직 스킬이 없는 칸. "
      + "표본은 <b>빙</b>(찬 것 여덟 · 자물쇠 넷)입니다");
  }
}

// ── 설정 톱니 셋 ─────────────────────────────────────────────────────────
["hra-set", "hrb-set", "hrc-set"].forEach(function (id) {
  const h = $(id); if (!h) return;
  const cv = document.createElement("canvas");
  cv.style.width = "18px"; cv.style.height = "18px";
  h.appendChild(cv);
  mk(cv, [18, 18], function hrGear(c, t, dt, W) { FLWGLYPH.gear(c, W, 0); }, { clear: true });
});
hudPanels();
