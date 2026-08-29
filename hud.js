// ══════════════════════════════════════════════════════════════════════════
// HUD — SF HUD 공용 키트                                        (docs/vfx/hud.js)
//
// ── 왜 이 파일이 있나 ─────────────────────────────────────────────────────
// 인트로 · 홈 · 강화 · 상점 · 도감 · 출격일지 여섯 화면을 「짙은 남색 바탕 +
// 시안 얇은 선 + 각진 프레임」 SF HUD 로 다시 그리는 작업 중, 이 파일은
// **여섯이 같이 쓰는 부품통**이다. 이 파일을 만든 손은 인트로·홈 둘만 그리고
// (`mockup-hud-intro.html` · `mockup-hud-home.html`), 나머지 넷은 다른 손이
// 이 키트 위에 얹는다 — 그래서 부품은 **범용**이어야 하고, 그 두 장에서만
// 통하는 값(문구·배치)은 여기 두지 않는다.
//
// ── 규약 ──────────────────────────────────────────────────────────────────
// ⚠️⚠️ **`vfx.js`(5만 줄+)는 읽기만 한다.** 새 그림을 그 파일에 얹지 않는다 —
//   `vfx-levelcard.js` 가 세운 선례를 그대로 따른다: 새 파일을 만들고
//   HTML 에서 `vfx.js` **뒤에** 싣는다.
// ⚠️⚠️ **최상위 이름을 전부 `hud`/`HUD` 로 격리한다.** `vfx.js` 가 5만 줄이라
//   흔한 이름(`ease`·`clamp`·`ring`…)은 이미 다른 뜻으로 쓰이고 있을 가능성이
//   높다 — 실제로 `vfx.js` 안에도 **같은 이름의 최상위 `function` 이 두 번
//   선언돼 뒤엣것이 앞엣것을 조용히 덮는 자리**가 있다(`lbStars`, 15096행의
//   캔버스 성표와 16024행의 별점 문자열이 이름이 같다). 이 파일은 그 함정을
//   피하려고 `lbStars` 류의 전역을 아예 안 빌리고 배경은 직접 그린다.
// ⚠️⚠️ **`A()`/`c.fillStyle`/`c.strokeStyle` 는 `#RRGGBB` 만 받는다.** 캔버스는
//   잘못된 색 문자열을 예외 없이 조용히 무시한다 — 면이 안 보이면 밝기가
//   아니라 칠 문자열부터 검산한다. 이 파일의 색은 전부 6자리 16진수다.
// ⚠️⚠️ **루프 애니메이션은 위상 파생값을 따로 그리지 마라.** 주기 끝(u=1)과
//   시작(u=0)이 **같은 값**이라야 이음매가 안 끊긴다 — 이 저장소가 같은
//   원인으로 네 번 반려된 이력이 있다. 이 파일의 모든 반복 요소는 둘 중
//   하나다: ① `t*속도` 를 그대로 각도에 먹이는 **연속 회전**(사인/코사인은
//   원래 이음매가 없다), ② `hudOpenLoop` 처럼 **창 함수가 구간 밖에서 0 으로
//   수렴**해 u=0 과 u=1 이 둘 다 0 인 것. 「누적기」·「지난 프레임과의 차이」로
//   위상을 만들지 않는다 — 그 값은 프레임이 스킵되면 실제 시간과 어긋난다.
//
// ── 기존 것 재사용 (새로 안 그린 것) ──────────────────────────────────────
// `vfx.js` 를 먼저 읽고 겹치는 것은 그대로 불렀다:
//   `celGauge`  부채꼴 게이지 — [hudDial] 이 그대로 감싼다
//   `celHoop`   3단 계조 링 — 큰 반경의 「아우라」 자리에 그대로 쓴다
//   `celStroke` 3중 발광 획 — 브래킷 모서리 · 스윕선에 그대로 쓴다
//   `gHalo`·`gFlare` 중심 발광 — 리액터 코어에 그대로 쓴다
//   `arcPts`    호 위의 점열 — 브래킷·톱니 좌표를 여기서 뽑는다
//   `toneOf("frost")` = `[#123A5E,#4FC3F7,#E8F8FF]` — 딥네이비/하늘색/거의
//     흰빛. **새 팔레트를 만들지 않고 이 삼색을 그대로 빌린다** — SF HUD
//     냉광이 원하는 계조와 정확히 같다.
//   `lbText`    외곽선 있는 채움 글자
//   `A`·`TAU`·`hash`·`jagPoly`·`fillPoly` — 그대로.
// 겹치지 않아 새로 그린 것: 눈금 고리 · 점선 궤도 · 막대/파형 그래프 ·
//   모서리 브래킷을 사각 패널에 두르는 조립 · 각진 버튼/탭 CSS · 스캔라인·
//   격자 배경 · 여는 연출 시퀀서 · 부팅 문구 타임라인 · 공용 허브 레일.
//
// ── 나중에 더해진 것 — ⑨절 (2026-08-27, 나머지 넉 장을 그린 손) ──────────
// 강화 · 상점 · 도감 · 출격일지는 전부 **격자 한 판이 무대를 채우는 화면**이라
// 인트로·홈이 안 겪은 세 가지가 한꺼번에 필요했다:
//   ① **창을 한 번에 세우는 것** — 별밭 · 브래킷 · 귀퉁이 판독값 · 대각선을
//      화면마다 다시 적으면 넷이 넷 언어가 된다 ⇒ [hudChrome] 하나로 굳혔다.
//   ② **귀퉁이 판독값의 눕힌 판**([hudCornerBar]) — 홈의 두 줄 블록이 설
//      자리가 격자 화면엔 없다. 요소는 같고 자리만 다르다.
//   ③ **칸 · 머리줄 · 띠 · 오른쪽 창의 CSS** — 도감 칸 · 상점 칸 · 게이트 칸이
//      한 뼈(`.hudcell`)를 쓰고, 격자를 자르는 띠도 하나(`.hudhead`)다.
// ⚠️ 홈은 이 절이 생기기 전에 그려져 `hhStars`·`hhCornerCluster` 로 같은 그림을
//   제 파일 안에 들고 있다 — 홈을 다시 만질 손이 생기면 그때 ⑨절로 합친다.
"use strict";

// ── 팔레트 ──────────────────────────────────────────────────────────────
// 구조색(냉광) = 시안의 frost 톤을 빌린다. 선택/주 버튼 색은 **사이트 전역
// 규약을 그대로 쓴다** — 「색은 주 버튼 하나뿐」(`vfx.css`:root 의
// --gold/--amber). 두 계가 안 섞이는 이유: 냉광은 「기계가 늘 켜 두는 것」,
// 금빛은 「지금 누를 수 있는 단 하나」다 — 팔레트가 다르면 그 구분이 안
// 그려도 저절로 읽힌다.
const HUDK = "frost";                  // toneOf(HUDK) = [딥네이비, 하늘색, 거의흰빛]
const HUDINK = "#D8F2FF";              // 본문 글자 — 살짝 푸른 흰빛
const HUDDIM = "#6E93AD";              // 보조 글자
const HUDFAINT = "#3A5468";            // 가장 옅은 구조선(격자·비활성 눈금)
const HUDBASE = "#050B14";             // 패널 바탕 — 순검정보다 밝아 「유리판」으로 읽힌다
const HUDLINE = "#4FC3F7";             // 구조선 본색(=frost[1])
const HUDGLOW = "#E8F8FF";             // 구조선 하이라이트(=frost[2])
const HUDSEL = "#FFD27A";              // = --gold, 이 화면에서 「지금 누를 수 있는 것」
const HUDACC = "#FF8A3D";              // = --amber, 라벨/킥커 — 기존 관례 그대로
const HUDWARN = "#FF6A5A";             // 경고/부족 — HURT(#FF3B5C)와 안 겹치는 붉은끼

// ── 창의 치수 — CSS 와 캔버스가 **같은 수**를 봐야 한다 ──────────────────
// 홈이 `mockup-hud-home.html` 의 CSS 안에서 58 · 26 을 직접 적어 두고
// `mockup-hud-home.js` 가 같은 수를 또 적는 방식을 썼는데(`HH_RAILW` 등),
// 화면이 여섯이 되면 그 쌍이 열두 벌이 된다. ⇒ 정본을 여기 하나 둔다 —
// ⑨절의 `.hudrail.side` 와 [hudChrome] 이 둘 다 이 상수를 읽는다.
const HUD_RAILW = 58;                  // 좌측 허브 레일의 폭
const HUD_TOPBARH = 26;                // 창틀(`.topbar`)이 먹는 높이

/// 캔버스에서 자주 쓰는 세 톤을 한 번에 — `toneOf(HUDK)` 를 매번 안 풀어써도 되게.
function hudTone() { return toneOf(HUDK); }

// ── 수식 도구 ─────────────────────────────────────────────────────────────
function hudCl(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
function hudEase(v) { const u = hudCl(v); return u * u * (3 - 2 * u); }
/// 주기 함수 하나에서 나는 종 모양 펄스(0..1). `phase=0`이면 u=.5에서 정점,
/// `phase=.5`면 u=0(=1, 주기의 이음매)에서 정점 — **이음매를 가리는 플래시**는
/// 이 두 번째 꼴로 쓴다. cos 기반이라 u=0/u=1 값이 항상 같다(=이음매 안전).
function hudBump(u, p, phase) {
  return Math.pow(0.5 - 0.5 * Math.cos(TAU * (u - (phase || 0))), p == null ? 6 : p);
}

// ══════════════════════════════════════════════════════════════════════════
// ① 배경 결 — 격자 · 스캔라인 · 비네트                               (CSS)
// ══════════════════════════════════════════════════════════════════════════
// **캔버스가 아니라 CSS 로 깐다.** 이 저장소의 오랜 병목은 GPU 채우기다
// (「화려함의 비용은 개수가 아니라 픽셀 면적」) — 화면 전체를 매 프레임
// 캔버스로 덮으면 그 값을 그대로 문다. `repeating-linear-gradient` 배경은
// GPU 합성 레이어로 붙어 비용이 훨씬 싸다. `mockup-ui.html` 의 `.ovworld`
// (「캔버스 없이 CSS 로만」)와 같은 결정이다.

const HUDCSS = `
.hudscreen{position:relative;background:${HUDBASE}}
/* 격자 — 아주 옅게. 진하면 「계기판」이 아니라 「모눈종이」로 읽힌다. */
.hudgrid{position:absolute;inset:0;z-index:1;pointer-events:none;
  background-image:
    linear-gradient(${HUDFAINT}22 1px,transparent 1px),
    linear-gradient(90deg,${HUDFAINT}22 1px,transparent 1px);
  background-size:28px 28px;
  -webkit-mask-image:radial-gradient(120% 90% at 50% 46%,#000 55%,transparent 100%);
          mask-image:radial-gradient(120% 90% at 50% 46%,#000 55%,transparent 100%)}
/* 스캔라인 — 가는 수평 결 + 위에서 아래로 도는 밝은 띠 하나. 띠의 이동은
   background-position 을 배경 타일 높이(정확히 6px)만큼 옮기는 것이라
   애니메이션이 저절로 이음매 없이 돈다(한 바퀴 돈 자리가 시작과 픽셀
   단위로 같다) — JS 로 위상을 셀 필요가 없는 자리는 CSS 에 맡긴다. */
.hudscan{position:absolute;inset:0;z-index:6;pointer-events:none;mix-blend-mode:screen;
  background:repeating-linear-gradient(180deg,${HUDLINE}00 0,${HUDLINE}00 5px,${HUDLINE}14 6px);
  animation:hudscanmove 5s linear infinite}
@keyframes hudscanmove{from{background-position:0 0}to{background-position:0 240px}}
/* 비네트 — 가장자리를 죽여 안쪽 판독값에 시선이 남게. */
.hudvig{position:absolute;inset:0;z-index:7;pointer-events:none;
  background:radial-gradient(120% 85% at 50% 46%,transparent 58%,#02050966 100%)}

/* ── 패널 — 모서리 하나를 크게 자른 각진 틀 + 이중 테 ─────────────────── */
.hudpanel{position:relative;background:linear-gradient(160deg,${HUDBASE} 0%,#081422 100%);
  border:1px solid ${HUDLINE}55;
  box-shadow:inset 0 0 0 1px ${HUDLINE}18,inset 0 1px 0 ${HUDGLOW}22;
  clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.hudpanel>.hd{display:flex;align-items:center;gap:8px;padding:7px 12px 6px 16px;
  border-bottom:1px solid ${HUDLINE}33;font-size:9.5px;letter-spacing:.22em;
  text-transform:uppercase;color:${HUDDIM}}
.hudpanel>.hd b{color:${HUDINK};font-weight:600;letter-spacing:.16em}
.hudpanel>.bd{padding:10px 14px 12px 16px}
/* 모서리 브래킷 — 잘리지 않은 세 모서리(우상·좌하·우하)에만 세운다. 잘린
   모서리(좌상)는 이미 각으로 「틀」임을 말하고 있어 거기까지 브래킷을
   더하면 그 모서리만 두 겹으로 진해진다. hudPanels() 가 자동으로 붙인다. */
.hudpanel .hc{position:absolute;width:10px;height:10px;pointer-events:none;
  border-color:${HUDLINE}CC}
.hudpanel .hc.tr{top:-1px;right:-1px;border-top:1.5px solid;border-right:1.5px solid}
.hudpanel .hc.bl{bottom:-1px;left:-1px;border-bottom:1.5px solid;border-left:1.5px solid}
.hudpanel .hc.br{bottom:-1px;right:-1px;border-bottom:1.5px solid;border-right:1.5px solid}
.hudpanel.on{border-color:${HUDSEL}77;box-shadow:inset 0 0 0 1px ${HUDSEL}22,0 0 26px -10px ${HUDSEL}99}
.hudpanel.on .hc{border-color:${HUDSEL}CC}

/* ── 버튼 — 한 모서리만 자른다(기존 .cut 문법과 같은 각). 냉광 = 보통,
   금빛 = 이 화면의 그 하나뿐인 주 버튼. ─────────────────────────────── */
.hudbtn{position:relative;display:inline-flex;align-items:center;justify-content:center;
  gap:6px;height:38px;padding:0 16px;font:inherit;font-size:12px;font-weight:600;
  letter-spacing:.08em;color:${HUDINK};cursor:pointer;
  background:linear-gradient(180deg,#0C2032 0%,#081422 100%);
  border:1px solid ${HUDLINE}66;
  box-shadow:inset 0 1px 0 ${HUDGLOW}22;
  clip-path:polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px));
  transition:background-color .12s,border-color .12s}
.hudbtn:hover,.hudbtn.hover{border-color:${HUDLINE}CC;background:linear-gradient(180deg,#12314A 0%,#0B1D2E 100%)}
.hudbtn.sel,.hudbtn.on{color:#241505;border-color:${HUDSEL};
  background:linear-gradient(180deg,#FFE3A8 0%,${HUDSEL} 62%,#E3B15C 100%);
  box-shadow:inset 0 1px 0 #FFF5DC99,0 0 20px -6px ${HUDSEL}CC}
.hudbtn.ghost{background:transparent}
.hudbtn.lock{color:${HUDFAINT};border-color:${HUDFAINT}55;cursor:default;
  background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}
.hudbtn.lock:hover{border-color:${HUDFAINT}55;background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}
.hudbtn .k{font-size:9px;letter-spacing:.14em;opacity:.72}

/* ── 탭 — 가로로 늘어선 갈래. 현재 칸만 냉광 밑줄 + 밝은 글자. ─────────── */
.hudtabs{display:flex;gap:2px}
.hudtab{position:relative;padding:8px 13px 9px;font-size:11px;letter-spacing:.06em;
  color:${HUDDIM};cursor:pointer;border-bottom:2px solid transparent}
.hudtab.on{color:${HUDINK};border-bottom-color:${HUDLINE};text-shadow:0 0 12px ${HUDLINE}88}
.hudtab .soon{margin-left:5px;font-size:8.5px;letter-spacing:.1em;color:${HUDACC}88}

/* ── 칩 — 인라인 데이터 판독값. ────────────────────────────────────────── */
.hudchip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;font-size:10.5px;
  font-variant-numeric:tabular-nums;color:${HUDINK};background:${HUDLINE}14;
  border:1px solid ${HUDLINE}3D;
  clip-path:polygon(6px 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%,0 6px)}
.hudchip b{color:${HUDGLOW};font-weight:700}

/* ── 허브 레일 — lbRail() 과 같은 자리 · 각진 냉광 스킨만 새로 입힌다. ── */
.hudrail{display:flex;flex-direction:column;gap:0}
.hudrail .r{display:flex;flex-direction:column;align-items:center;gap:2px;
  padding:4px 2px 4px;position:relative;color:${HUDDIM};
  border:1px solid transparent}
.hudrail .r.on{color:${HUDINK};border-color:${HUDLINE}55;background:${HUDLINE}12;
  box-shadow:inset 0 0 12px -4px ${HUDLINE}AA}
.hudrail .r.on::before{content:"";position:absolute;left:3px;top:3px;width:4px;height:4px;
  background:${HUDLINE};box-shadow:0 0 6px 1px ${HUDLINE}}
.hudrail .r .nm{font-size:8.5px;letter-spacing:.06em}
.hudrail .r.soon .nm{opacity:.4}

/* ── ⑨ 격자 화면의 뼈 — 강화 · 상점 · 도감 · 출격일지 넷이 같이 쓴다 ───────
   홈은 「가운데가 무대」인 화면이라 배치를 제 페이지 <style> 이 들었지만,
   나머지 넷은 전부 **격자 한 판이 무대를 채우는 화면**이라 뼈가 같다 —
   레일(58) + 무대, 무대 안은 띠 · 머리줄 · 칸. 같은 뼈를 네 번 베끼면
   반드시 갈라지므로 여기 한 벌만 둔다. */
.hudrail.side{width:${HUD_RAILW}px;flex:0 0 ${HUD_RAILW}px;justify-content:center;padding:0 0 0 2px}
.hudui{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column}
.hudmid{flex:1 1 auto;display:flex;align-items:stretch;min-height:0}
/* ⚠️⚠️ 위·아래 여백은 장식이 아니라 **자리**다 — [hudCornerBar] 네 개가
   정확히 거기 선다. 좁히면 귀퉁이 판독값이 격자 밑에 깔려 그린 것이 안
   보인다(첫 판에서 실제로 그랬다 — 지갑 띠가 위 두 개를 통째로 덮었다).
   위 54 = 창틀 26 + 판독값 띠(가운데 42, 위아래 ±10) + 여유 2.
   아래 24 = 판독값 띠(가운데 H-14) 가 딱 드는 높이. */
.hudstage{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column;
  padding:54px 20px 24px 10px}
.hudbody{flex:1 1 auto;min-height:0;display:flex;gap:10px}
.hudcol{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column}

/* 나가는 문 — 창틀 왼쪽 끝. 「독립 화면」은 이것이 있어야 방이 안 갇힌다. */
.hudback{display:inline-flex;align-items:center;gap:4px;color:${HUDDIM};
  text-decoration:none;cursor:pointer}
.hudback:hover{color:${HUDINK}}

/* 띠 — 「지금 무엇을 갖고 있나」 한 줄(지갑 · 분수). */
.hudstrip{display:flex;align-items:center;gap:12px;flex:0 0 auto;font-size:10px;
  font-variant-numeric:tabular-nums;color:${HUDINK};
  padding:4px 10px;margin-bottom:7px;background:${HUDLINE}12;border:1px solid ${HUDLINE}2E;
  clip-path:polygon(7px 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%,0 7px)}
.hudstrip .one{display:flex;align-items:center;gap:4px}
.hudstrip .one.zero{color:${HUDFAINT}}
.hudstrip .lb{font-size:8.5px;letter-spacing:.2em;color:${HUDDIM}}
.hudstrip .rt{margin-left:auto;color:${HUDDIM}}

/* 격자 머리줄 — 등급 띠 · 묶음 띠. 격자의 한 줄을 통째로 먹는다. */
.hudhead{grid-column:1/-1;display:flex;align-items:baseline;gap:7px;
  font-size:8.5px;letter-spacing:.2em;color:${HUDDIM};
  border-bottom:1px solid ${HUDLINE}2E;padding-bottom:3px;margin-top:3px}
.hudhead b{font-size:10px;letter-spacing:.1em;color:${HUDINK};font-weight:600}
.hudhead .ct{margin-left:auto;letter-spacing:0}

/* 칸 — 도감 칸 · 상점 칸 · 게이트 칸이 **한 뼈**다. 모서리 둘을 깎는다. */
.hudcell{position:relative;display:flex;flex-direction:column;align-items:center;
  gap:3px;padding:6px 4px 5px;min-width:0;cursor:pointer;
  background:${HUDBASE}B8;border:1px solid ${HUDLINE}2E;
  clip-path:polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))}
.hudcell canvas{display:block}
.hudcell .n{font-size:8.5px;color:${HUDINK};letter-spacing:-.01em;text-align:center;line-height:1.2}
.hudcell .s{font-size:8px;color:${HUDDIM};font-variant-numeric:tabular-nums}
.hudcell .v{display:flex;align-items:center;gap:3px;font-size:9px;color:${HUDLINE};
  font-variant-numeric:tabular-nums}
.hudcell .v em{font-style:normal;color:${HUDDIM};font-size:8px;margin:0 1px}
.hudcell .why{font-size:7px;color:${HUDDIM};text-align:center;line-height:1.25}
.hudcell:hover{border-color:${HUDLINE}8A}
.hudcell.on{border-color:${HUDSEL};background:${HUDSEL}14}
.hudcell.on .n{color:${HUDSEL}}
.hudcell.on .v{color:${HUDSEL}}
.hudcell.own{opacity:.5;cursor:default}
.hudcell.own:hover{border-color:${HUDLINE}2E}
.hudcell.lock{opacity:.44;cursor:default}
.hudcell.lock:hover{border-color:${HUDLINE}2E}
.hudcell.lock .v{color:${HUDFAINT}}
.hudcell.poor .v,.hudcell.poor .why{color:${HUDWARN}}
/* 잠긴 칸의 실루엣 — 엔진 _kLockedFilter 와 같은 수(채도 0 · 밝기 절반).
   ⚠️ 이 문자열은 템플릿 리터럴 안이라 역따옴표를 못 쓴다(코드 인용은 맨글자로). */
.hudcell.dim canvas{filter:saturate(0) brightness(.52)}
.hudcell.void{border-style:dashed;border-color:${HUDFAINT}55;background:${HUDBASE}66;cursor:default}
.hudcell.void .n{color:${HUDFAINT}}
.hudcell .lk{position:absolute;top:2px;right:5px;font-size:6.5px;letter-spacing:.08em;color:${HUDACC}}

/* 오른쪽 창 — 눌린 칸이 무엇인지 말하는 자리. **비어도 자리를 남긴다.** */
.hudside{width:176px;flex:0 0 176px;display:flex;flex-direction:column;min-height:0;
  background:${HUDBASE}C4;border:1px solid ${HUDLINE}2E;padding:7px 9px 8px;
  clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
.hudside .ttl{font-size:11.5px;font-weight:600;color:${HUDINK}}
.hudside .ttl i{font-style:normal;font-size:8px;letter-spacing:.18em;color:${HUDDIM};margin-left:5px}
.hudkv{display:flex;gap:6px;margin-top:5px;font-size:9px;line-height:1.45;color:${HUDDIM}}
.hudkv b{flex:0 0 20px;font-size:8px;font-weight:400;color:${HUDLINE}AA}
.hudkv span{color:#8FB4CC}

/* 넘치는 격자 — 「아래로 더 있다」를 말한다(자르고 끝내지 않는다). */
.hudscrollbox{position:relative;flex:1 1 auto;min-height:0;overflow:hidden}
.hudfade{position:absolute;left:0;right:0;bottom:0;height:28px;display:flex;
  align-items:flex-end;justify-content:center;padding-bottom:1px;
  font-size:7.5px;letter-spacing:.06em;color:${HUDDIM};
  background:linear-gradient(180deg,${HUDBASE}00,${HUDBASE}F0 72%)}

/* ── ⑩ 기르는 화면의 뼈 — 줄 · ± · 눈금 막대 ────────────────────────────
   ⚠️⚠️ **⑨(격자)와 다른 문법이다.** 격자는 「카드를 고른다」라 낱칸이 서고,
   여기는 「±를 여러 번 눌러 눈금을 채운다」라 **한 축이 한 줄**이다. 둘을 한
   뼈로 묶으려 하면 칸이 줄 흉내를 내다가 상점으로 되돌아간다 — 강화가 상점
   문법으로 읽힌 원인이 정확히 그 자리였다(2026-08-27 사용자 반려). */
.hudgrow{flex:1 1 auto;min-width:0;min-height:0;display:flex;flex-direction:column;gap:3px}
.hudrow{display:flex;align-items:center;gap:8px;flex:1 1 0;min-height:0;padding:0 8px 0 9px;
  background:${HUDBASE}A8;border:1px solid ${HUDLINE}26;
  clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))}
.hudrow:hover{border-color:${HUDLINE}7A;background:${HUDLINE}0E}
.hudrow .nm{flex:0 0 74px;min-width:0;line-height:1.14}
.hudrow .nm b{display:block;font-size:10px;font-weight:600;color:${HUDINK};letter-spacing:-.01em}
/* 막힌 줄의 「어디서 캔다」 — 이름 밑에 붙는다. 줄 높이를 안 늘리는 자리가
   여기뿐이고, **못 누르는 이유가 못 누르는 것의 이름 옆**에 있어야 읽힌다. */
.hudrow .nm i{display:block;font-style:normal;font-size:7px;color:${HUDWARN};line-height:1.2}
.hudrow .lv{flex:0 0 54px;font-size:9px;font-variant-numeric:tabular-nums;color:${HUDDIM}}
.hudrow .lv b{color:${HUDINK};font-weight:600}
.hudrow .lv em{font-style:normal;color:${HUDSEL};font-weight:600}
.hudrow .sc{flex:0 0 auto}
.hudrow .sc canvas{display:block}
.hudrow .cost{flex:0 0 52px;display:flex;align-items:center;justify-content:flex-end;gap:2px;
  font-size:9px;font-variant-numeric:tabular-nums;color:${HUDLINE}}
.hudrow .cost em{font-style:normal;color:${HUDDIM};font-size:8px;margin:0 1px}
.hudrow.poor .cost{color:${HUDWARN}}
.hudrow .st{flex:0 0 auto;display:flex;gap:4px}
/* − 와 + — **이 화면의 손짓 전부**가 이 둘이다. 각진 냉광 사각.
   ⚠️ 금빛을 안 준다: 금빛은 「이번에 내가 얹은 것」의 색이라 손잡이에 주면
   누르기 전부터 얹은 것처럼 보인다. */
.hudstep{width:20px;height:20px;display:flex;align-items:center;justify-content:center;
  font:inherit;font-size:12px;line-height:1;color:${HUDINK};cursor:pointer;
  -webkit-user-select:none;user-select:none;
  background:linear-gradient(180deg,#0C2032 0%,#081422 100%);border:1px solid ${HUDLINE}66;
  clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))}
.hudstep:hover{border-color:${HUDLINE}CC;background:linear-gradient(180deg,#12314A 0%,#0B1D2E 100%)}
.hudstep.off{color:${HUDFAINT};border-color:${HUDFAINT}44;cursor:default;
  background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}
.hudstep.off:hover{border-color:${HUDFAINT}44;background:linear-gradient(180deg,#0A1420 0%,#070E17 100%)}

/* 지갑 띠의 **줄어든 몫** — 「위에 모여 있고 줄어드는 게 보인다」의 그 자리.
   남는 수를 큰 자리에 적고, 이번에 뺀 만큼을 금빛으로 옆에 붙인다. */
.hudstrip .one i{font-style:normal;font-size:8px;color:${HUDSEL};margin-left:1px}

/* 미리보기 창 — 「사기 전에 무엇인지 본다」. 한 번에 하나만 뜬다. */
.hudpop{position:absolute;inset:0;z-index:9;display:flex;align-items:center;
  justify-content:center;background:#02050999}
.hudpop .bx{width:62%;background:${HUDBASE}F2;border:1px solid ${HUDLINE}6B;
  box-shadow:0 0 34px -12px ${HUDLINE};
  clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.hudpop .pv{height:92px;border-bottom:1px solid ${HUDLINE}2E;background:#02060C}
.hudpop .pv canvas{width:100%;height:100%;display:block}
.hudpop .bd{padding:8px 14px 11px}
.hudpop .nm{font-size:13px;font-weight:600;color:${HUDINK}}
.hudpop .ds{font-size:10px;color:${HUDDIM};margin-top:4px;line-height:1.5}
.hudpop .rw{display:flex;align-items:center;gap:9px;margin-top:9px}
.hudpop .rw .px{display:flex;align-items:center;gap:4px;font-size:11px;color:${HUDINK};
  font-variant-numeric:tabular-nums}
/* 전면 팝업 — 안쪽이 제 격자를 드는 팝업은 62% 로는 못 선다. */
.hudpop.full .bx{position:absolute;inset:10px;width:auto;display:flex;flex-direction:column}
.hudpop.full .bx>.bd{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;padding:7px 12px 10px}

/* ── ⑪ 챙겨 가는 화면의 뼈 — 자리 하나 · 묶음 한 줄 · 캐릭터 칩 ─────────────
   편성표 화면과 출격준비 화면이 **똑같은 한 줄**을 그린다(일반 1 ┃ 스킬 5 ┃ 채굴
   1   성좌 3). 두 장에 같은 줄을 두 번 적으면 반드시 갈라지므로 뼈는 하나다.

   ⚠️⚠️ **⑨의 .hudcell 과 다른 물건이다.** 칸(.hudcell)은 「고를 후보」라
     늘 무언가 들어 있고, 자리(.hudslot)는 **「이미 든 것」**이라 **비어 있는
     것이 정상 상태**다. 그래서 이 뼈가 지는 짐은 하나 더 있다 —
     **비어 있음 · 잠김 · 살 수 있음 셋이 서로 달라야 한다.** 셋을 밝기로만
     가르면 「어두운 칸」 하나로 뭉쳐 읽힌다 ⇒ **속을 다르게** 한다:
       비어 있음 = 점선 테 + 가운데 ＋      (여기 넣을 수 있다)
       잠김     = 실선 옅은 테 + 빗금 + 자물쇠 (여긴 못 넣는다)
       살 수 있음 = 점선 테 + 값            (돈으로 열린다)
   ⚠️ 금빛을 안 쓴다 — 자리는 「지금 누를 수 있는 단 하나」가 아니다. */
.hudslot{position:relative;flex:0 0 auto;display:flex;flex-direction:column;
  align-items:center;justify-content:center;gap:2px;
  background:${HUDBASE}C4;border:1px solid ${HUDLINE}4A;
  clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))}
.hudslot canvas{display:block}
.hudslot .n{font-size:7.5px;line-height:1.15;color:${HUDINK};text-align:center;
  letter-spacing:-.02em;max-width:100%;overflow:hidden}
.hudslot .n i{display:block;font-style:normal;font-size:6.5px;color:${HUDDIM}}
.hudslot.void{border-style:dashed;border-color:${HUDFAINT}88;background:${HUDBASE}55}
.hudslot.void .pl{font-size:13px;line-height:1;color:${HUDFAINT}}
/* 잠김의 빗금 — 「막혀 있다」를 속으로 말한다. 테만 옅게 하면 빈 것과 안 갈린다. */
.hudslot.lock{border-color:${HUDFAINT}66;background:
  repeating-linear-gradient(135deg,${HUDFAINT}22 0,${HUDFAINT}22 1px,transparent 1px,transparent 6px),
  ${HUDBASE}88}
.hudslot.lock .lk,.hudslot.buy .lk{position:absolute;top:1px;right:3px;font-size:6px;
  letter-spacing:.06em;color:${HUDACC}CC}
.hudslot.lock .lk{color:${HUDFAINT}}
.hudslot.buy{border-style:dashed;border-color:${HUDACC}88;background:${HUDACC}0E}
.hudslot.buy .px{display:flex;align-items:center;gap:2px;font-size:8px;color:${HUDACC};
  font-variant-numeric:tabular-nums}
.hudslot.on{border-color:${HUDSEL};background:${HUDSEL}14}
.hudslot.on .n{color:${HUDSEL}}

/* 묶음 한 줄 — 자리들 + 사이의 세로 획 + 밑의 묶음 이름.
   ⚠️ 묶음 이름은 **자리마다가 아니라 묶음마다** 붙는다(사용자 손그림 그대로) —
     자리마다 붙이면 스킬 다섯의 이름 다섯과 겹쳐 줄이 두 배로 시끄러워진다. */
.hudslots{display:flex;align-items:flex-start;gap:12px;flex:0 0 auto}
.hudslots .gp{display:flex;flex-direction:column;gap:2px}
.hudslots .gp .in{display:flex;gap:3px}
.hudslots .gp .gl{font-size:7.5px;letter-spacing:.1em;color:${HUDDIM};text-align:center}
.hudslots .gp .gl i{display:none}
.hudslots .sep{align-self:stretch;width:1px;flex:0 0 1px;margin:0 3px;background:${HUDLINE}3D}
.hudslots .rt{margin-left:auto}

/* 묶음 판 — **묶음이 낱칸보다 먼저 읽혀야 하는 장**이 켠다.
   ⚠️⚠️ 자리 사이 틈만으로 묶음을 가르는 것은 **칸이 작을 때만 되는 수**다:
     묶음을 가르는 것은 틈의 절대 길이가 아니라 **칸에 대한 비율**이라, 30px 칸의
     12px 틈(0.40)은 보이는데 같은 틈이 60px 칸에서는 0.15 로 사라진다. 사라지는
     순간 칸들이 **균일 격자** 하나로 뭉치고, 균일 격자는 곧 도감이다.
   ⇒ 칸이 큰 장은 묶음을 **판으로 감싸고 이름을 판 머리에 올린다.** 판이
     생김새로 이미 갈라 주므로 이름은 확인이지 판독이 아니게 된다.
   ⚠️ 판을 켜면 세로 획(.sep)은 **끈다** — 판 테와 겹쳐 두 겹으로 시끄럽다. */
.hudslots.pane{align-items:stretch;gap:8px}
.hudslots.pane>.sep{display:none}
.hudslots.pane .gp{gap:0;padding:2px 6px 5px;background:${HUDBASE}8C;
  border:1px solid ${HUDLINE}2B;
  clip-path:polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))}
/* 이름이 **판 머리로 올라간다** — 밑에 두면 판 밖의 잔글로 읽혀 판이 이름을
   안 가진 상자가 된다. order 하나로 옮겨 칸 짓는 차례는 안 건드린다. */
.hudslots.pane .gp .gl{order:-1;text-align:left;padding:0 0 3px 1px;
  display:flex;align-items:baseline;gap:5px;white-space:nowrap}
.hudslots.pane .gp .gl i{display:inline;font-style:normal;letter-spacing:.02em;
  color:${HUDFAINT}}
/* ⭐ **일반은 하나뿐인데 제일 중요하다** — 캐릭터의 정체이고 늘 나가는 것이다.
   판 왼쪽에 세로 획을 세우고 테를 올려 「기둥」으로 세운다. 금빛은 안 쓴다
   (그 색은 이 화면에서 「지금 누를 수 있는 단 하나」가 이미 쥐고 있다). */
.hudslots.pane .gp.lead{border-color:${HUDLINE}6E;background:${HUDLINE}12;
  box-shadow:inset 3px 0 0 -1px ${HUDLINE}AA}
.hudslots.pane .gp.lead .gl{color:${HUDINK}}
/* 채굴도구는 **싸우는 물건이 아니다.** 무기 판과 같은 밝기로 서면 「여섯 번째
   스킬」로 읽힌다 ⇒ 테를 구조선 색에서 빼고 바탕을 비운다. */
.hudslots.pane .gp.aux{border-color:${HUDFAINT}7A;background:transparent}
.hudslots.pane .gp.aux .gl{color:${HUDFAINT}}

/* 캐릭터 칩 — 로스터 한 칸. 홈(.hh-ros)이 같은 그림을 제 페이지에 들고
   있는데, 그것은 ⑪절이 생기기 전에 그려져서다. 편성표·출격준비 둘이 같이 쓰는
   쪽은 여기다 — 홈을 다시 만질 손이 생기면 그때 합친다(⑨절과 같은 사정). */
.hudchars{display:flex;align-items:center;gap:3px;min-width:0}
.hudchar{position:relative;flex:0 0 auto;display:flex;flex-direction:column;align-items:center;
  gap:1px;padding:2px 1px;cursor:pointer;border:1px solid transparent}
.hudchar canvas,.hudchar .noart{display:block}
.hudchar .noart{display:flex;align-items:center;justify-content:center;box-sizing:border-box;
  font-size:6.5px;color:${HUDFAINT};border:1px dashed ${HUDFAINT}}
.hudchar .nm{font-size:6.5px;letter-spacing:-.02em;color:${HUDDIM};white-space:nowrap}
.hudchar.on{border-color:${HUDSEL}66;background:${HUDSEL}14}
.hudchar.on .nm{color:${HUDSEL}}
.hudchar.lock{opacity:.5;cursor:default}
.hudchar.more{cursor:default;color:${HUDDIM};font-size:8px;line-height:1.3;text-align:center}

/* 작은 버튼 — 줄 안에 앉는 [편집]·[삭제]. 38px 짜리 .hudbtn 은 편성표 카드
   머리줄(20px)에 안 든다. 각·색은 그대로고 치수만 줄인다. */
.hudbtn.sm{height:20px;padding:0 9px;font-size:9.5px;gap:4px;
  clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px))}
`;

/// CSS 를 한 번만 심는다 — 페이지가 이 파일을 두 번 싣는 사고를 대비한다
/// (`nav.js` 가 같은 이유로 `window.__navDrawn` 가드를 쓰는 것과 같은 자리).
function hudInjectCSS() {
  if (typeof document === "undefined" || !document.createElement) return;
  if (window.__hudCSS) return;
  window.__hudCSS = 1;
  const st = document.createElement("style");
  st.textContent = HUDCSS;
  // ⚠️ 스모크 스텁의 `document` 에는 `head` 가 없다 — `&&` 로 조용히 건너뛴다.
  document.head && document.head.appendChild(st);
}
hudInjectCSS();

/// `.hudpanel` 마다 모서리 브래킷 셋(우상·좌하·우하)을 붙인다. 저자는
/// `<div class="hudpanel">` 만 쓰면 되고, 브래킷을 손으로 3개씩 안 적어도 된다.
function hudPanels() {
  if (typeof document === "undefined" || !document.querySelectorAll) return;
  document.querySelectorAll(".hudpanel").forEach((p) => {
    if (p.__hudDeco) return; p.__hudDeco = 1;
    for (const cls of ["tr", "bl", "br"]) {
      const i = document.createElement("i");
      i.className = "hc " + cls;
      p.appendChild(i);
    }
  });
}
hudPanels();

// ══════════════════════════════════════════════════════════════════════════
// ② 원형 요소 — 눈금 고리 · 레이더/리액터 · 게이지 · 궤도                (canvas)
// ══════════════════════════════════════════════════════════════════════════

/// 옅은 뼈대 링 하나(글로 없이 — celHoop 은 3단 계조라 여러 겹 겹치면
/// 너무 무거워진다). `dash` 를 주면 점선 궤도의 재료가 된다.
function hudRing(c, x, y, r, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  c.save();
  if (o.dash) c.setLineDash(o.dash);
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.5 : o.alpha);
  c.lineWidth = o.w || 1;
  c.beginPath(); c.arc(x, y, r, o.a0 || 0, o.a1 == null ? TAU : o.a1); c.stroke();
  c.restore();
}

/// 원 둘레의 눈금 — 시계 문자반 문법. `big` 배수마다 더 길고 밝은 눈금.
function hudTicks(c, x, y, r, n, opt) {
  if (!(r > 0) || !(n > 0)) return;
  const o = opt || {};
  const len = o.len || 5, bigLen = o.bigLen || len * 1.8, every = o.every || 5;
  for (let i = 0; i < n; i++) {
    const big = every > 0 && i % every === 0;
    const L = big ? bigLen : len;
    const a = (i / n) * TAU;
    const x0 = x + Math.cos(a) * r, y0 = y + Math.sin(a) * r;
    const x1 = x + Math.cos(a) * (r + L), y1 = y + Math.sin(a) * (r + L);
    c.strokeStyle = A(o.color || HUDLINE, (big ? 0.85 : 0.4) * (o.alpha == null ? 1 : o.alpha));
    c.lineWidth = big ? 1.6 : 1;
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  }
}

/// 레이더/리액터 — **참조 이미지의 큰 동심원 구조**. 겹치는 링 여러 겹 +
/// 눈금 고리 + 크로스헤어 + 회전 스윕(연속 회전이라 이음매가 없다) + 중심 발광.
/// opt: {rings:[반경비...], sweep:bool, sweepSpeed, cross:bool, core:0..1}
function hudRadar(c, x, y, r, t, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  const rings = o.rings || [1, 0.74, 0.5, 0.28];
  rings.forEach((k, i) => hudRing(c, x, y, r * k, { alpha: 0.30 - i * 0.03, w: 1 }));
  hudTicks(c, x, y, r * 1.06, o.ticks || 48, { len: 4, bigLen: 9, every: 6, alpha: 0.6 });
  if (o.cross !== false) {
    hudRing(c, x, y, r * 0.74, { dash: [1, 5], alpha: 0.35, w: 1 });
    c.strokeStyle = A(HUDLINE, 0.18); c.lineWidth = 1;
    c.beginPath(); c.moveTo(x - r * 1.02, y); c.lineTo(x + r * 1.02, y);
    c.moveTo(x, y - r * 1.02); c.lineTo(x, y + r * 1.02); c.stroke();
  }
  if (o.sweep !== false) {
    const a = t * (o.sweepSpeed || 0.7);
    const g = c.createLinearGradient(x, y, x + Math.cos(a) * r, y + Math.sin(a) * r);
    g.addColorStop(0, A(HUDGLOW, 0.55)); g.addColorStop(1, A(HUDGLOW, 0));
    c.save(); c.beginPath(); c.arc(x, y, r, 0, TAU); c.clip();
    c.fillStyle = g;
    c.beginPath(); c.moveTo(x, y);
    c.arc(x, y, r, a - 0.5, a); c.closePath(); c.fill();
    c.restore();
    c.strokeStyle = A(HUDGLOW, 0.8); c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); c.stroke();
  }
  if (o.core !== 0) gHalo(c, x, y, r * 0.30, HUDK, o.core == null ? 0.8 : o.core);
}

/// 부채꼴 게이지 — `celGauge` 를 감싼다. 배경 링(못 채운 부분) + 진행 호 +
/// 가운데 퍼센트 숫자(옵션). 참조 이미지의 「60%」·「30%」 다이얼과 같은 자리.
function hudDial(c, x, y, r, pct, opt) {
  if (!(r > 0)) return;
  const o = opt || {};
  hudRing(c, x, y, r, { w: o.w || 4, alpha: 0.18 });
  celGauge(c, x, y, r, hudCl(pct), o.w || 4, HUDK, 0.95);
  if (o.label !== false) {
    c.textAlign = "center"; c.textBaseline = "middle";
    c.font = hudFont(700, o.fs || r * 0.44);
    c.fillStyle = HUDINK;
    c.fillText(Math.round(pct * 100) + "%", x, y);
    c.textAlign = "left"; c.textBaseline = "alphabetic";
  }
}

/// 점선 궤도 — 타원 하나 + 그 위를 도는 점 n개(연속 회전이라 이음매가 없다).
function hudOrbit(c, x, y, rx, ry, t, opt) {
  if (!(rx > 0) || !(ry > 0)) return;
  const o = opt || {};
  c.save(); c.setLineDash(o.dash || [2, 6]);
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.4 : o.alpha);
  c.lineWidth = o.w || 1;
  c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, TAU); c.stroke();
  c.restore();
  const n = o.dots == null ? 1 : o.dots;
  for (let i = 0; i < n; i++) {
    const a = t * (o.speed || 0.5) + (i / n) * TAU;
    const px = x + Math.cos(a) * rx, py = y + Math.sin(a) * ry;
    gHalo(c, px, py, o.dotR || 3.2, HUDK, 0.9);
  }
}

/// 아주 작은 맥동 표식 — 항로도·읽음 표시에 쓰는 점 하나.
function hudBlip(c, x, y, r, t, opt) {
  const o = opt || {};
  const p = 0.7 + 0.3 * Math.sin(t * (o.speed || 3));
  gHalo(c, x, y, r * p, HUDK, o.alpha == null ? 0.9 : o.alpha);
}

// ══════════════════════════════════════════════════════════════════════════
// ③ 막대 · 파형 — 데이터 판독 결                                     (canvas)
// ══════════════════════════════════════════════════════════════════════════

/// 세로 막대 그래프. `vals` 는 0..1 배열이거나 `(i,n,t)=>0..1` 함수 —
/// 함수를 주면 절차적으로 「살아 움직이는」 판독값이 된다(진짜 데이터가
/// 없는 장식용 자리가 이 kit 을 쓰는 대부분이므로 함수 쪽이 기본값에 가깝다).
/// ⚠️ **난수 대신 `hash`** — 매 프레임 값이 다시 뽑히면 막대가 지지직댄다.
/// 정수 초 단위로만 갱신하고 그 사이는 이전 값에서 다음 값으로 부드럽게 간다.
function hudBars(c, x, y, w, h, vals, opt) {
  const o = opt || {}, n = o.n || (Array.isArray(vals) ? vals.length : 16);
  const gap = o.gap == null ? 2 : o.gap, bw = (w - gap * (n - 1)) / n;
  const t = o.t || 0;
  for (let i = 0; i < n; i++) {
    let v;
    if (Array.isArray(vals)) v = vals[i] || 0;
    else {
      const seed = i * 3.71, step = Math.floor(t * 1.4), f = (t * 1.4) % 1;
      const a = hash(seed + step), b = hash(seed + step + 1);
      v = vals ? vals(i, n, t) : (0.15 + 0.75 * (a + (b - a) * hudEase(f)));
    }
    v = hudCl(v);
    const bx = x + i * (bw + gap), bh = Math.max(1, h * v);
    c.fillStyle = A(o.color || HUDLINE, 0.20);
    c.fillRect(bx, y, bw, h);
    c.fillStyle = A(o.color || HUDLINE, o.alpha == null ? 0.85 : o.alpha);
    c.fillRect(bx, y + (h - bh), bw, bh);
  }
}

/// 파형(스파크라인) — 사인 성분 셋을 더한 연속 함수라 이음매 걱정이 없다
/// (모듈로 위상이 아니라 `t` 를 그대로 먹인다).
function hudWave(c, x, y, w, h, t, opt) {
  const o = opt || {}, n = o.n || 48, amp = h * 0.42, sp = o.speed || 1;
  c.beginPath();
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const v = Math.sin(u * 11 + t * sp) * 0.5
      + Math.sin(u * 23 - t * sp * 1.7 + 1.3) * 0.3
      + Math.sin(u * 5 + t * sp * 0.6 + 2.1) * 0.2;
    const py = y + h / 2 - v * amp;
    i ? c.lineTo(x + u * w, py) : c.moveTo(x + u * w, py);
  }
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.85 : o.alpha);
  c.lineWidth = o.w || 1.4; c.lineJoin = "round"; c.stroke();
}

// ══════════════════════════════════════════════════════════════════════════
// ④ 브래킷 — 사각을 두르는 뷰파인더 프레임                            (canvas)
// ══════════════════════════════════════════════════════════════════════════
// `.hudpanel` 은 CSS 로 두르지만, **배경 캔버스 위에 직접 그리는** 큰 초점
// 프레임(캐릭터·리액터를 둘러싸는 것 같은)은 좌표가 캔버스 픽셀이라 CSS 로
// 못 맞춘다 — 그 자리를 위한 canvas 버전. `celStroke` 의 발광 획을 그대로 쓴다.
function hudBracket(c, x, y, w, h, len, opt) {
  const o = opt || {}, L = len || Math.min(w, h) * 0.16, wid = o.w || 2.4;
  const corners = o.only || ["tl", "tr", "bl", "br"];
  const map = {
    tl: [[x, y + L], [x, y], [x + L, y]],
    tr: [[x + w - L, y], [x + w, y], [x + w, y + L]],
    bl: [[x, y + h - L], [x, y + h], [x + L, y + h]],
    br: [[x + w - L, y + h], [x + w, y + h], [x + w, y + h - L]],
  };
  corners.forEach((k) => { if (map[k]) celStroke(c, map[k], wid, HUDK, o.alpha == null ? 1 : o.alpha); });
}

// ══════════════════════════════════════════════════════════════════════════
// ⑤ 글자 — 판독값용 모노스페이스                                     (canvas)
// ══════════════════════════════════════════════════════════════════════════
// `LBFONT` 는 UI 본문 서체(둥근 고딕)라 데이터 판독값에는 자간이 안 맞는다.
// 여기는 **표 숫자가 나란해야** 하는 자리라 모노스페이스를 쓴다 — 다른
// 목적이라 다른 함수다(사본이 아니다).
function hudFont(w, s) {
  return `${w} ${s}px "SF Mono",ui-monospace,Menlo,Consolas,monospace`;
}

/// 라벨 + 값 한 줄 판독값 — 「WR/RT 735.37.36」 류.
function hudReadout(c, x, y, label, value, opt) {
  const o = opt || {};
  c.textAlign = o.align || "left"; c.textBaseline = "alphabetic";
  c.font = hudFont(500, o.fs || 8.5); c.fillStyle = A(HUDDIM, o.alpha == null ? 1 : o.alpha);
  lbText(c, label, x, y);
  c.font = hudFont(700, (o.fs || 8.5) + 1.5); c.fillStyle = A(HUDINK, o.alpha == null ? 1 : o.alpha);
  lbText(c, value, x, y + (o.gap == null ? 12 : o.gap));
  c.textAlign = "left";
}

// ══════════════════════════════════════════════════════════════════════════
// ⑥ 등장 애니메이션 — 선이 그어지고 → 면이 차고 → 내용이 뜬다        (수식)
// ══════════════════════════════════════════════════════════════════════════
// 화면 전환 한 번(진입)에는 [u] 를 **단조 증가**(`Math.min(1,(t-t0)/dur)`)로
// 넘긴다 — u=1 에 닿으면 계속 1 이니 되풀이될 일이 없어 이음매를 신경 안
// 써도 된다. 이 시안처럼 실제 화면전환 이벤트가 없어 **되풀이해서 보여줘야**
// 할 때만 [u] 에 `(t%period)/period` 를 넘긴다 — 그 경우를 위해 이 함수
// 자체가 **열림→유지→닫힘→(꺼짐)** 을 한 창 안에 다 넣어서, u=0 과 u=1
// 양끝이 항상 「꺼짐(0)」으로 같다. 그래서 반복 호출도 안전하다.
function hudOpenLoop(u, opt) {
  const o = opt || {};
  const o0 = o.o0 == null ? 0.04 : o.o0, oDur = o.oDur == null ? 0.16 : o.oDur;
  const hold = o.hold == null ? 0.66 : o.hold, cDur = o.cDur == null ? 0.10 : o.cDur;
  const o1 = o0 + oDur, c0 = hold, c1 = c0 + cDur;
  let k = 0, closing = 0;
  if (u < o0) k = 0;
  else if (u < o1) k = (u - o0) / oDur;
  else if (u < c0) k = 1;
  else if (u < c1) { k = 1; closing = (u - c0) / cDur; }
  else k = 0;
  const stage = (a, b) => hudEase(hudCl((k - a) / (b - a)));
  const openFall = 1 - hudEase(closing);
  return {
    line: stage(0, 0.40) * openFall,
    fill: stage(0.30, 0.75) * (1 - hudEase(Math.min(1, closing * 1.2))),
    content: stage(0.65, 1.0) * (1 - hudEase(Math.min(1, closing * 1.5))),
    k, closing,
  };
}

/// 타임라인 구간표에서 지금 [u] 가 속한 구간을 찾는다 — 부팅 문구·퍼센트처럼
/// 「구간마다 다른 문구 + 그 안에서 선형 보간되는 수치」에 공용으로 쓴다.
/// segs: [{start,end,label,pFrom,pTo}]. 못 찾으면 마지막 구간이 붙든 것으로.
function hudPhaseAt(u, segs) {
  for (const s of segs) {
    if (u >= s.start && u < s.end) {
      const k = hudEase((u - s.start) / (s.end - s.start));
      const pct = s.pFrom == null ? null : s.pFrom + (s.pTo - s.pFrom) * k;
      return { label: s.label, pct, k };
    }
  }
  const last = segs[segs.length - 1];
  return { label: last ? last.label : "", pct: last && last.pTo, k: 1 };
}

// ══════════════════════════════════════════════════════════════════════════
// ⑦ 허브 레일 — 여섯 화면이 공유하는 좌측 탭 여섯 칸                (DOM+canvas)
// ══════════════════════════════════════════════════════════════════════════
// **정본은 하나다.** 탭 목록·아이콘은 `vfx.js` 의 `LBRAIL`/`FLWGLYPH` 를
// 그대로 읽는다(사본을 만들면 반드시 갈라진다 — 이 저장소가 이미 겪은 병).
// 이 함수가 새로 하는 일은 **둘레만** — `lbRail()` 은 무채색 목록이고, 이건
// 냉광 각진 칸으로 감싼다. 아이콘 그리는 함수(FLWGLYPH)는 그대로다.
///
/// tabs 를 생략하면 `LBRAIL` 전체를 쓴다 — **여섯 장 전부가 그렇게 쓴다.**
/// 2026-08-27 에 여섯째 칸(강화)이 서면서 「레일에 없는 화면」이 없어졌다.
/// 인자를 남겨 두는 것은 앞으로 **다른 구성**을 보여야 할 장이 생길 때뿐이다.
function hudRail(hostId, cur, tabs) {
  const host = $(hostId); if (!host) return;
  const list = tabs || (typeof LBRAIL !== "undefined" ? LBRAIL : []);
  list.forEach(([k, nm, soon]) => {
    const on = k === cur;
    const d = document.createElement("div");
    d.className = "r" + (on ? " on" : "") + (soon ? " soon" : "");
    const cv = document.createElement("canvas");
    cv.style.width = "22px"; cv.style.height = "22px";
    d.appendChild(cv);
    d.insertAdjacentHTML("beforeend", `<div class="nm">${nm}</div>`);
    host.appendChild(d);
    mk(cv, [22, 22], function hudRailGlyph(c) {
      if (typeof FLWGLYPH !== "undefined" && FLWGLYPH[k]) FLWGLYPH[k](c, 22, on ? 1 : (soon ? 2 : 0));
    }, { clear: true });
  });
}

// ══════════════════════════════════════════════════════════════════════════
// ⑧ 밀도 확장 — 접속 노드 · 꺾인 인출선 · 세그먼트 고리 · 미세 라벨   (canvas)
// ══════════════════════════════════════════════════════════════════════════
// 인트로 · 홈 두 장뿐이던 시절엔 여섯 부품(①~⑦)으로 충분했다. 「참조는
// 화면 하나에 요소가 수십 개인데 우리는 원 하나 + 패널 여섯」이 밝혀진 뒤
// (홈 재작업, 2026-08-24) 다시 보니 부족한 건 부품 자체다 — 참조의 밀도는
// 링을 더 겹치는 것 말고도 **접속점이 있는 회로형 선** · **세그먼트로 나뉜
// 고리** · **구석마다 다른 판독값**이 만든다. 이 절은 그 셋을 채운다.

/// 작은 접속 노드 — 회로도에서 선이 꺾이거나 끝나는 자리에 찍는 점.
/// 중심 발광(`gHalo`) + 그 둘레의 옅은 고리 하나로, 「전선의 단자」로 읽힌다.
/// ⚠️ 이 키트는 통틀어 단일 색계(frost)다 — `gHalo` 는 색 문자열이 아니라
/// **톤 이름**(`toneOf` 키)을 받으므로, `hudRing`/`hudTag` 류의 `#RRGGBB`
/// 옵션과 헷갈리지 않도록 여기서는 색 옵션을 아예 받지 않는다.
function hudNode(c, x, y, r, opt) {
  const o = opt || {};
  const rr = r > 0 ? r : 1.6;
  hudRing(c, x, y, rr * 2, { alpha: (o.alpha == null ? 0.8 : o.alpha) * 0.45, w: 1 });
  gHalo(c, x, y, rr, HUDK, o.alpha == null ? 0.85 : o.alpha);
}

/// 꺾은 다각선 위의 한 점 — 누적 길이 기준 보간(`u`=0..1). `hudLeader` 가
/// 그린 회로형 선을 따라 흐르는 빛 입자가 꺾이는 자리에서도 속도가 안
/// 튀도록 길이 기준으로 보간한다(각도 기준이면 짧은 구간에서 빨라 보인다).
function hudPolyPoint(pts, u) {
  if (!pts || !pts.length) return [0, 0];
  if (pts.length === 1) return pts[0];
  const segLen = []; let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segLen.push(d); total += d;
  }
  const want = hudCl(u) * total; let acc = 0;
  for (let i = 0; i < segLen.length; i++) {
    const last = i === segLen.length - 1;
    if (want <= acc + segLen[i] || last) {
      const k = segLen[i] > 0 ? hudCl((want - acc) / segLen[i]) : 0;
      const a = pts[i], b = pts[i + 1];
      return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    }
    acc += segLen[i];
  }
  return pts[pts.length - 1];
}

/// 꺾인 인출선 — 참조 이미지의 「중앙 허브에서 각 패널로 뻗는, 한 번
/// 꺾이고 끝에 노드가 박힌 선」. `bend`(0..1)가 꺾이는 자리의 비율,
/// `vertical`이면 세로 구간을 먼저 뺀다(기본은 가로가 먼저 — HSTAT
/// 지시선과 같은 문법). 반환값은 꺾인 지점을 포함한 점열이라, 호출부가
/// [hudPolyPoint] 에 그대로 넘겨 흐르는 빛을 얹을 수 있다.
function hudLeader(c, x0, y0, x1, y1, opt) {
  const o = opt || {};
  const bend = o.bend == null ? 0.5 : o.bend;
  const kx = o.vertical ? x0 : x0 + (x1 - x0) * bend;
  const ky = o.vertical ? y0 + (y1 - y0) * bend : y0;
  const pts = [[x0, y0], [kx, ky], [x1, y1]];
  c.save();
  c.strokeStyle = A(o.color || HUDLINE, o.alpha == null ? 0.35 : o.alpha);
  c.lineWidth = o.w || 1; c.lineJoin = "round";
  c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke();
  c.restore();
  if (o.node !== false) {
    const a = o.alpha == null ? 0.35 : o.alpha;
    hudNode(c, kx, ky, o.nodeR || 1.5, { alpha: a * 1.3 });
    hudNode(c, x1, y1, (o.nodeR || 1.5) * 1.4, { alpha: a * 1.7 });
  }
  return pts;
}

/// 세그먼트 고리 — 참조 이미지의 「사방으로 나뉜 큰 고리」(부챗살로 잘게
/// 나뉜 원). 링 하나 위에 짧은 방사 눈금 n개를 얹는다 — `hudTicks`(원의
/// 둘레를 도는 눈금)와 다르게 이건 **고리 자체를 자르는 나비스**처럼
/// 안팎으로 짧게 튀어나온다.
function hudSectorRing(c, x, y, r, n, opt) {
  if (!(r > 0) || !(n > 0)) return;
  const o = opt || {};
  const alpha = o.alpha == null ? 0.24 : o.alpha;
  hudRing(c, x, y, r, { color: o.color, alpha, w: o.w || 1 });
  const spoke = o.spoke == null ? r * 0.09 : o.spoke;
  c.strokeStyle = A(o.color || HUDLINE, Math.min(1, alpha * 1.6));
  c.lineWidth = o.w || 1;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + (o.rot || 0);
    const x0 = x + Math.cos(a) * (r - spoke), y0 = y + Math.sin(a) * (r - spoke);
    const x1 = x + Math.cos(a) * (r + spoke), y1 = y + Math.sin(a) * (r + spoke);
    c.beginPath(); c.moveTo(x0, y0); c.lineTo(x1, y1); c.stroke();
  }
}

/// 각진 사각 하나 — `.hudcell` 의 캔버스 판(모서리 둘을 깎는다). 칠·획은
/// 부르는 쪽이 정한다(면만 필요한 자리와 테만 필요한 자리가 둘 다 있다).
function hudBox(c, x, y, w, h, cut) {
  const k = cut == null ? 7 : cut;
  c.beginPath();
  c.moveTo(x, y); c.lineTo(x + w - k, y); c.lineTo(x + w, y + k);
  c.lineTo(x + w, y + h); c.lineTo(x + k, y + h); c.lineTo(x, y + h - k);
  c.closePath();
}

/// 아주 작은 배경 판독값 라벨 — 「SECTOR 07」·「[24]」류의 채움 장식. 항상
/// 옅은 알파로 그린다 — 이 라벨이 읽혀야 하는 자리라면 [hudReadout] 을 쓴다.
function hudTag(c, x, y, text, opt) {
  const o = opt || {};
  c.save();
  c.textAlign = o.align || "left"; c.textBaseline = "alphabetic";
  c.font = hudFont(o.w || 600, o.fs || 7.5);
  c.fillStyle = A(o.color || HUDDIM, o.alpha == null ? 0.55 : o.alpha);
  lbText(c, text, x, y);
  c.restore();
}

// ══════════════════════════════════════════════════════════════════════════
// ⑨ 화면 껍질 — 여섯 장이 같은 창을 쓴다                              (canvas)
// ══════════════════════════════════════════════════════════════════════════
// 홈이 세운 창(별밭 → 뷰파인더 브래킷 → 귀퉁이 판독값 넷 → 가로지르는
// 대각선)을 **함수 하나**로 굳힌다. 홈은 이 절이 생기기 전에 그려져 제
// 파일 안에 같은 그림을 들고 있고(`hhStars`·`hhCornerCluster`), 나머지 넷은
// 여기를 부른다 — 창을 화면마다 다시 정하면 여섯이 여섯 언어가 된다.
//
// ⚠️ 이 절의 반복 요소는 전부 **연속 회전**(`t*속도`)이거나 `hash` 로 뽑은
//   정지값이다. 위상 파생값·누적기가 없으니 이음매를 걱정할 자리가 없다.

/// 결정론 별밭 — 난수 0건 관례(`hash` 만 쓴다).
/// ⚠️ 반지름 0.7~2.0 · 알파 .16~.42 는 홈이 **실측으로** 정한 값이다(첫 값은
///   스크린샷에서 가장 밝은 별조차 배경과 안 갈렸다). 여기서 다시 낮추지 마라.
function hudStars(c, W, H, n, seed) {
  const N = n == null ? 42 : n, s = seed || 0;
  for (let i = 0; i < N; i++) {
    const x = hash(s + i * 12.9 + 41) * W, y = hash(s + i * 7.1 + 44) * H;
    const r = 0.7 + hash(s + i * 3.3 + 47) * 1.3;
    c.fillStyle = A("#CFE8FF", 0.16 + hash(s + i * 5.7 + 49) * 0.26);
    c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill();
  }
}

/// 결정론 미세 판독값 숫자 — 「SECTOR 07」의 07 자리.
function hudNum(seed, digits) {
  const d = digits || 2;
  return String(Math.floor(hash(seed) * Math.pow(10, d))).padStart(d, "0");
}

/// 귀퉁이 판독값 **띠** — 홈의 두 줄 블록(`hhCornerCluster`)과 **같은 세
/// 요소**(눈금 고리 · SECTOR 라벨 · 막대/파형)를 한 줄로 눕힌 것.
///
/// ⚠️ 왜 눕히나: 홈은 가운데가 캐릭터 하나라 귀퉁이에 68px 짜리 덩어리가 설
///   자리가 있지만, 격자가 무대를 채우는 넉 장은 그 자리가 곧 칸이다. 두
///   줄을 고집하면 판독값이 격자 밑에 깔려 **그린 것이 안 보인다**(홈이
///   실측으로 겪은 그 자리와 같은 병). 요소가 같으니 같은 말이고 자리만 다르다.
/// ⚠️ 알파를 중앙부보다 한 단 높게 잡는 것도 홈과 같은 이유다 — `.hudvig`
///   비네트가 가장 세게 어둡히는 자리가 정확히 여기다.
///
/// (x,y) 는 띠가 시작하는 **귀퉁이 쪽 끝**이고, `sx` 가 +1 이면 오른쪽으로
/// -1 이면 왼쪽으로 자란다. 띠는 y 를 가운데로 위아래 ±8px 안에 든다.
function hudCornerBar(c, x, y, sx, seed, t, style) {
  const r = 8, rx = x + sx * (r + 2);
  if (style === 0) {
    hudTicks(c, rx, y, r, 12, { len: 2, bigLen: 4.5, every: 4, alpha: 0.72 });
    hudRing(c, rx, y, r * 0.55, { dash: [1, 3], alpha: 0.55, w: 1 });
  } else {
    hudRing(c, rx, y, r, { alpha: 0.48, w: 1.2 });
    hudOrbit(c, rx, y, r * 1.2, r * 0.6, t * sx, { speed: 0.35, dots: 1, alpha: 0.52, dotR: 1.5 });
  }
  const align = sx > 0 ? "left" : "right";
  hudTag(c, x + sx * 24, y + 3, "SECTOR " + hudNum(seed, 2) + " · [" + hudNum(seed + 5, 3) + "]",
    { align, alpha: 0.62 });
  const gw = 40, gh = 12, gy = y - gh / 2;
  const gx = sx > 0 ? x + 104 : x - 104 - gw;
  if (style === 0) hudBars(c, gx, gy, gw, gh, null, { t: t * 0.6 + seed, n: 7, alpha: 0.44 });
  else hudWave(c, gx, gy, gw, gh, t * 0.7 + seed, { speed: 0.9, alpha: 0.46 });
}

/// 화면 한 장의 껍질 — **부르는 쪽이 배경 캔버스 맨 처음에 한 번 부른다.**
/// opt: {rail, top, bottom, stars, seed}. 반환값은 안쪽 사각(브래킷이 두른
/// 자리)이라, 화면마다 다른 제 장식을 그 안에서 파생시키면 된다.
function hudChrome(c, W, H, t, opt) {
  const o = opt || {};
  const rail = o.rail == null ? HUD_RAILW : o.rail;
  const top = o.top == null ? HUD_TOPBARH : o.top;
  const bot = o.bottom || 0;
  const seed = o.seed || 0;
  c.fillStyle = HUDBASE; c.fillRect(0, 0, W, H);
  hudStars(c, W, H, o.stars, seed);
  const bx = rail + 6, by = top + 2, bw = W - rail - 12, bh = H - top - bot - 6;
  hudBracket(c, bx, by, bw, bh, 16, { w: 1.7, alpha: 0.70 });
  // 귀퉁이 넷 — 위·아래 여백(`.hudstage` 의 padding)이 정확히 이 띠의 자리다.
  // ⚠️ `top + 16` 은 창틀 글자(y≈10~26)와 안 겹치는 첫 값이고, `.hudstage` 의
  //   위 여백 54 와 한 벌이다 — 한쪽만 고치면 띠가 다시 격자 밑에 깔린다.
  const yT = top + 16, yB = H - bot - 14;
  hudCornerBar(c, rail + 16, yT, 1, seed + 4, t, 0);
  hudCornerBar(c, W - 16, yT, -1, seed + 12, t, 1);
  hudCornerBar(c, rail + 16, yB, 1, seed + 21, t, 1);
  hudCornerBar(c, W - 16, yB, -1, seed + 33, t, 0);
  // 프레임을 가로지르는 긴 선 하나 — 장식 중에서도 가장 옅게(0.07) 맨 뒤에.
  c.save(); c.strokeStyle = A(HUDLINE, 0.07); c.lineWidth = 1;
  c.beginPath(); c.moveTo(rail + 8, H - bot - 8); c.lineTo(W - 8, top + 4); c.stroke();
  c.restore();
  return { x: bx, y: by, w: bw, h: bh, cx: bx + bw / 2, cy: by + bh / 2 };
}

// ══════════════════════════════════════════════════════════════════════════
// ⑩ 기르는 화면의 부품 — 눈금 막대 · 받침                             (canvas)
// ══════════════════════════════════════════════════════════════════════════
// ⑨ 는 「고른다」의 부품이고 이 절은 **「채운다」의 부품**이다. 2026-08-27
// 사용자 반려(「강화가 상점에서 사는 UI 다」)의 답이 여기 둘에 걸려 있다 —
// 「기른다」의 정체가 **눈금이 차는 것이 보이는 것**과 **되돌릴 수 있는 것**이라,
// 눈금을 그리는 자리와 대상을 올려놓는 자리가 부품으로 서야 화면이 갈린다.

/// 눈금 막대 — **상한이 큰 축 하나를 한 줄에 담는다.**
///
/// ⚠️⚠️ **칸 아흔아홉 개는 못 그린다.** 참조(레이싱 강화 화면)는 상한이 10 이라
///   눈금이 그대로 열 칸으로 서지만, 라서의 상한은 99([kStatLevelMax])다 —
///   208px 폭에 99칸을 그으면 칸 하나가 2.1px 이라 눈금이 아니라 **결**이 되고,
///   숫자만 남기면 이 화면의 정체(「차는 것이 보인다」)가 통째로 죽는다.
///
/// ⭐ **그래서 눈의 크기를 5 로 잡고, 그 위에 「대의 경계」만 키를 키운다.**
///   라서의 99 는 고른 99 가 아니다 — Lv1~20 일반 · Lv21~70 색 · Lv71~99
///   색+유니크로 **드는 재료가 갈리는** 99 라(지갑 띠의 「대 셋」 한 줄),
///   눈이 실제로 외워야 하는 자리는 그 경계 둘뿐이다. 참조의 평평한 열 칸에는
///   없던 정보고, 99 를 접는 근거이기도 하다.
///
/// ⚠️ 눈금은 **채운 면 위에도** 그린다 — 밑에 깔면 찬 만큼이 민 면이 되어
///   「얼마나 찼나」는 보여도 「몇 눈 올랐나」가 안 보인다.
///
/// o: {lv, add, max, bands:[…], tick, blocked}
///   `add` = 이번에 얹었지만 **아직 확정 안 한** 단(금빛). `blocked` 면 찬
///   면의 앞머리가 경고색이다 — 「여기서 멈춘다」가 막대 자체에도 선다.
function hudScale(c, x, y, w, h, o) {
  if (!(w > 0) || !(h > 0)) return;
  const opt = o || {};
  const max = opt.max || 1, tick = opt.tick || 5;
  const lv = hudCl((opt.lv || 0) / max), nx = hudCl(((opt.lv || 0) + (opt.add || 0)) / max);
  const px = (u) => x + w * u;
  // 바탕 — **빈 자리는 거의 검다.** 안 그러면 찬 면과 대비가 안 서서 「막대에
  // 눈금이 그어져 있다」로만 읽히고 「얼마나 찼나」가 안 보인다(첫 판이 그랬다).
  c.fillStyle = "#02060C"; c.fillRect(x, y, w, h);
  // 찬 면 → 이번에 얹은 면. 얹은 쪽이 뒤에 서야 앞머리가 금빛으로 남는다.
  if (nx > lv) {
    c.fillStyle = A(HUDSEL, 0.70); c.fillRect(px(lv), y, px(nx) - px(lv), h);
  }
  c.fillStyle = A(HUDLINE, 0.58); c.fillRect(x, y, px(lv) - x, h);
  // 찬 면의 윗날 — 한 줄. 면이 「유리판에 찬 액체」로 읽히는 자리다.
  c.fillStyle = A(HUDGLOW, 0.30); c.fillRect(x, y, px(nx) - x, 1);
  // 눈 — 5레벨마다. 찬 면 위에서는 어둡게(획이 그대로면 면을 갉아 먹는다).
  for (let v = tick; v < max; v += tick) {
    const u = v / max, tx = Math.round(px(u)) + 0.5;
    const on = u <= nx;
    c.strokeStyle = A(on ? HUDBASE : HUDLINE, on ? 0.34 : 0.26);
    c.lineWidth = 1;
    c.beginPath(); c.moveTo(tx, y + h * 0.52); c.lineTo(tx, y + h); c.stroke();
  }
  // 대의 경계 — 키가 다르다. **재료가 갈리는 자리**라 눈금과 같은 급이 아니다.
  (opt.bands || []).forEach((v) => {
    if (!(v > 0) || v >= max) return;
    const tx = Math.round(px(v / max)) + 0.5;
    c.strokeStyle = A(v / max <= nx ? HUDGLOW : HUDLINE, 0.78);
    c.lineWidth = 1.2;
    c.beginPath(); c.moveTo(tx, y - 1); c.lineTo(tx, y + h + 1); c.stroke();
  });
  // 앞머리 — 지금 어디까지 왔나. 막힌 축이면 경고색이다.
  const cap = Math.round(px(nx)) + 0.5;
  c.strokeStyle = nx > lv ? HUDSEL : (opt.blocked ? HUDWARN : HUDGLOW);
  c.lineWidth = 1.6;
  c.beginPath(); c.moveTo(cap, y - 1); c.lineTo(cap, y + h + 1); c.stroke();
  // 테 — 맨 나중에. 면과 눈금이 테를 넘지 않게 덮는다.
  c.strokeStyle = A(HUDLINE, 0.34); c.lineWidth = 1;
  c.strokeRect(x + 0.5, y + 0.5, w - 1, h - 1);
}

/// 받침 — **기르는 대상을 올려놓는 무대.**
///
/// ⭐ 참조가 자동차를 받침 위에 세우는 것과 같은 자리다. 받침이 없으면 도형이
///   화면에 **떠 있는 장식**으로 읽히고, 있으면 「내놓고 보는 물건」이 된다 —
///   「사는 곳」과 「기르는 곳」이 갈리는 몫의 절반이 이 한 겹에 있다.
///
/// ⚠️⚠️ **앞테는 굵게, 뒷테는 거의 안 그린다.** 첫 판은 타원을 통째로 한 획에
///   둘렀는데, 그러면 뒷테가 물건을 **가로질러** 지나가 받침이 아니라 **북**으로
///   읽혔다(실측 캡처에서 그랬다). 원근으로 놓인 판은 앞테가 물건 앞을 지나고
///   뒷테는 물건에 가린다 — 그 한 겹이 「위에 올려놓았다」의 전부다.
/// ⚠️ 눈금도 앞쪽(아래) 반원에만 세운다 — 한 바퀴 다 세우면 받침이 아니라
///   또 하나의 고리가 되어 배경의 세그먼트 고리와 안 갈린다.
function hudPedestal(c, cx, y, w, opt) {
  if (!(w > 0)) return;
  const o = opt || {};
  const rx = w / 2, ry = Math.max(3, w * (o.flat == null ? 0.12 : o.flat));
  const a = o.alpha == null ? 0.55 : o.alpha;
  // 판의 면 — 위가 밝고 아래로 사라진다. 면이 있어야 「선」이 아니라 「판」이다.
  const g = c.createLinearGradient(0, y - ry, 0, y + ry);
  g.addColorStop(0, A(HUDLINE, a * 0.22));
  g.addColorStop(1, A(HUDLINE, a * 0.03));
  c.fillStyle = g;
  c.beginPath(); c.ellipse(cx, y, rx, ry, 0, 0, TAU); c.fill();
  if (o.pool !== false) gHalo(c, cx, y - ry * 0.35, rx * 0.50, HUDK, 0.13);
  c.save();
  // 뒷테 — 물건 뒤로 지나가므로 점선에 아주 옅게.
  c.setLineDash([2, 4]); c.strokeStyle = A(HUDLINE, a * 0.26); c.lineWidth = 1;
  c.beginPath(); c.ellipse(cx, y, rx, ry, 0, Math.PI, TAU); c.stroke();
  c.restore();
  // 앞테 — 굵게. 이 한 획이 물건의 **밑동 앞**을 지난다.
  c.strokeStyle = A(HUDLINE, a * 0.95); c.lineWidth = 1.6;
  c.beginPath(); c.ellipse(cx, y, rx, ry, 0, 0, Math.PI); c.stroke();
  const n = o.ticks || 16;
  for (let i = 0; i <= n; i++) {
    const ang = Math.PI * (i / n);
    const tx = cx + Math.cos(ang) * rx, ty = y + Math.sin(ang) * ry;
    const big = i % 4 === 0;
    c.strokeStyle = A(HUDLINE, a * (big ? 0.85 : 0.34)); c.lineWidth = 1;
    c.beginPath(); c.moveTo(tx, ty); c.lineTo(tx, ty + (big ? 4 : 2)); c.stroke();
  }
  // 양끝 두 획 — 「올려놓았다」를 못박는다.
  [-1, 1].forEach((s) => {
    const ex = cx + s * rx;
    celStroke(c, [[ex - s * 11, y], [ex, y], [ex, y + ry * 0.95]], 1.6, HUDK, a * 0.9);
  });
}

// ══════════════════════════════════════════════════════════════════════════
// ⑪ 챙겨 가는 화면의 부품 — 자리 한 줄 · 캐릭터 줄               (DOM+canvas)
// ══════════════════════════════════════════════════════════════════════════
// ⑨ 는 「고른다」의 부품, ⑩ 은 「채운다」의 부품이고 이 절은 **「들고 나간다」**
// 의 부품이다. 편성표 화면과 출격준비 화면이 정확히 같은 한 줄을 그리는데(일반 1 ┃
// 스킬 5 ┃ 채굴 1   성좌 3), 그 줄은 **엔진 상수 셋이 정한 길이**라 어느 한
// 장이 제 손으로 다시 세면 조용히 갈라진다:
//   `kSlotCapMax`=6(일반 1 + 스킬 5) · 채굴 1 · `kConstellationSlots`=3.
//
// ⚠️ 이 절의 그림에는 되풀이가 없다 — 자리는 **정지 상태**이고, 자리마다의
//   문양은 부르는 쪽이 넘긴 그리기 함수가 그대로 진다.

/// 자리 하나. `it` = {nm, sub, glyph, state, px}
///   state: ""(찬 것) · "void"(비어 있음) · "lock"(잠김) · "buy"(살 수 있음) · "on"(고른 것)
///   `nm` 을 안 주면 문양만 선다 — 편성표 목록의 좁은 줄이 그 쪽이다.
/// opt: {size 자리의 한 변, art 문양의 지름, name 이름을 적나, h 이름칸의 세로}
/// ⚠️ 이름을 적는 자리는 **세로를 여기서 못박는다.** 이름이 한 줄인 칸과 두 줄인
///   칸이 섞이면 밑선이 어긋나 한 묶음이 계단으로 읽힌다.
function hudSlot(it, opt) {
  const o = opt || {}, S = o.size || 26, A2 = o.art || Math.round(S * 0.62);
  const d = document.createElement("div");
  d.className = "hudslot" + (it.state ? " " + it.state : "");
  d.style.width = S + "px";
  d.style.height = (o.name ? (o.h || Math.round(S * 1.33)) : S) + "px";
  if (it.state === "void") {
    d.insertAdjacentHTML("beforeend", `<div class="pl">+</div>`);
  } else if (it.state === "lock") {
    d.insertAdjacentHTML("beforeend", `<div class="lk">잠김</div>`);
  } else {
    // ⚠️ 갓 만든 노드에 `querySelector` 를 안 쓴다 — 스모크 스텁의 가짜 DOM 이
    //   그것을 null 로 돌려줘 장 전체가 「LOAD FAIL」로 죽는다(상점 장이 겪었다).
    if (it.glyph) {
      const cv = document.createElement("canvas");
      cv.style.width = A2 + "px"; cv.style.height = A2 + "px";
      d.appendChild(cv);
      mk(cv, [A2 * 2, A2 * 2], function hudSlotGlyph(c, t, dt, W) { it.glyph(c, W); }, { clear: true });
    }
    if (it.state === "buy") d.insertAdjacentHTML("beforeend",
      `<div class="lk">연다</div><div class="px">${it.px || ""}</div>`);
  }
  if (o.name && it.nm) d.insertAdjacentHTML("beforeend",
    `<div class="n">${it.nm}${it.sub ? `<i>${it.sub}</i>` : ""}</div>`);
  return d;
}

/// 「일반 1 ┃ 스킬 5 ┃ 채굴 1   성좌 3」 한 줄을 통째로 짓는다.
/// groups: [{lb 묶음 이름, ct 이름 곁의 잔글(판을 켠 장에서만 선다),
///           items:[…], sep 앞에 세로획을 세우나, right 오른쪽으로 미나,
///           tone "lead"(기둥) · "aux"(안 싸우는 것), size·art·h 이 묶음만의 치수}]
/// opt: [hudSlot] 의 것 + {pane 묶음을 판으로 감싸나}
/// ⚠️ 묶음마다 치수를 달리 줄 수 있는 것이 **균일 격자를 깨는 손잡이**다 —
///   개수가 다른 목록이 아니라 **성격이 다른 물건** 다섯이므로, 다 같은 크기로
///   서면 「도감 한 쪽」이 된다.
function hudSlotRow(host, groups, opt) {
  if (!host) return;
  const o = opt || {};
  const row = document.createElement("div");
  row.className = "hudslots" + (o.pane ? " pane" : "");
  groups.forEach((g) => {
    if (g.sep) { const s = document.createElement("div"); s.className = "sep"; row.appendChild(s); }
    const gp = document.createElement("div");
    gp.className = "gp" + (g.right ? " rt" : "") + (g.tone ? " " + g.tone : "");
    const go = g.size
      ? { ...o, size: g.size, art: g.art || Math.round(g.size * 0.62), h: g.h || o.h }
      : o;
    const inn = document.createElement("div"); inn.className = "in";
    g.items.forEach((it) => inn.appendChild(hudSlot(it, go)));
    gp.appendChild(inn);
    gp.insertAdjacentHTML("beforeend",
      `<div class="gl">${g.lb || "&nbsp;"}${g.ct ? `<i>${g.ct}</i>` : ""}</div>`);
    row.appendChild(gp);
  });
  host.appendChild(row);
  return row;
}

/// 캐릭터 줄 — 로스터 한 벌. `list` 의 한 칸은 {key, nm, own, art, draw}
/// (`draw` 는 `ELEM.*` 같은 몸 그리기 함수, 없으면 「그림 대기」 칸이 선다).
/// `onPick` 을 주면 보유한 칸이 눌린다 — 누른 값을 그대로 돌려준다.
function hudChars(host, list, cur, opt, onPick) {
  if (!host) return;
  const o = opt || {}, S = o.size || 34;
  list.forEach((r) => {
    const b = document.createElement("div");
    b.className = "hudchar" + (r.own === false ? " lock" : "") + (r.key === cur ? " on" : "");
    b.dataset.key = r.key;
    let cv = null;
    if (!r.draw) {
      const q = document.createElement("div");
      q.className = "noart";
      q.style.width = S + "px"; q.style.height = S + "px";
      q.textContent = r.own === false ? "잠김" : "그림";
      b.appendChild(q);
    } else {
      cv = document.createElement("canvas");
      cv.style.width = S + "px"; cv.style.height = S + "px";
      b.appendChild(cv);
    }
    b.insertAdjacentHTML("beforeend", `<div class="nm">${r.nm}</div>`);
    host.appendChild(b);
    if (cv) mk(cv, [S * 2.4, S * 2.4], function hudCharGlyph(c, t, dt, W, H, st) {
      c.save(); if (r.own === false) c.globalAlpha = 0.42;
      r.draw(c, t, dt, W, H, st); c.restore();
    }, { clear: true });
    if (onPick && r.own !== false) b.addEventListener("click", () => {
      host.querySelectorAll(".hudchar").forEach((x) => x.classList.toggle("on", x.dataset.key === r.key));
      onPick(r);
    });
  });
}

/// 채굴 도구 셋의 자리표 — 빔은 이어진 한 줄, 포는 낱알 하나, 탄은 폭심과
/// 여섯 가닥. `kind`: "beam" · "cannon" · "bomb".
///
/// ⚠️ **여기 있는 이유** — 이 셋만 `ICON` 에 자리가 없다. 편성표와 출격준비 두
///   화면이 같은 자리에 같은 것을 세워야 하는데, 한쪽에서 자리표를 지어내면
///   두 화면이 다른 얼굴을 낸다.
/// ⚠️ **문양의 정본이 아니다** — 도감 시안이 진짜 문양을 내는 날 이 함수는
///   걷힌다. 지금 이것이 셋을 가르는 유일한 축(줄 · 낱알 · 터짐)이라
///   모양을 바꾸지 마라: 세 자리표가 서로 안 갈리면 고르는 자리가 죽는다.
function hudMineGlyph(c, W, kind) {
  const cx = W / 2, cy = W / 2;
  c.save();
  c.strokeStyle = HUDLINE; c.fillStyle = HUDLINE;
  c.lineWidth = Math.max(1.4, W * 0.085); c.lineCap = "round";
  if (kind === "cannon") {
    c.beginPath(); c.arc(cx, cy, W * 0.18, 0, TAU); c.fill();
  } else if (kind === "bomb") {
    c.beginPath(); c.arc(cx, cy, W * 0.11, 0, TAU); c.fill();
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3 + Math.PI / 12;
      c.beginPath();
      c.moveTo(cx + Math.cos(a) * W * 0.20, cy + Math.sin(a) * W * 0.20);
      c.lineTo(cx + Math.cos(a) * W * 0.38, cy + Math.sin(a) * W * 0.38);
      c.stroke();
    }
  } else {
    c.beginPath(); c.moveTo(W * 0.10, cy); c.lineTo(W * 0.90, cy); c.stroke();
  }
  c.restore();
}
