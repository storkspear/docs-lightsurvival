// ── 캐릭터 낱장이 같이 쓰는 한 장 — **열여덟 장의 틀** ─────────────────────
//
// ⭐⭐ 한 장이 답하는 물음은 셋이다: **어떻게 생겼나**(몸) · **누구에게 세고
//   누구에게 약한가**(상성) · **열두 칸에 무엇을 들고 있나**(스킬). 그중
//   **속성을 안 타는 것 전부**가 이 파일에 있다 — 그리기 · 격자 · 띠 ·
//   자물쇠 · 빈 칸 채우기 · 안 구운 키 가드.
//
// ⭐ 그래서 각 장의 js 에 남는 것은 **넷뿐**이다:
//     ① 몸 키 두 개(`["preIce","ice"]` 같은)  ② 색  ③ 표 두 개  ④ 자물쇠 「왜」
//   ⚠️ **「몇 종이 남았다」는 안 적는다** — 12 − (즉시+추가) 에서 [charFill] 이
//     계산한다. 손으로 적으면 표를 고친 날 문구만 옛말로 남는다.
//
// ⚠️⚠️ **`vfx.js` 뒤에 실린다.** `$`·`tile`·`lvTable`·`mk`·`box`·`A`·`ELEM`·
//   `ELEMS`·`FX`·`S`·`LVD` 를 그쪽에서 가져다 쓰고 **사본을 안 만든다** —
//   사본을 두면 언젠가 갈라진다(`chapter.js` 머리가 같은 규약을 적어 뒀다).
// ⚠️⚠️ **최상위 이름을 전부 `char` 로 격리한다.** 23,000줄 뒤에 실리는 파일이라
//   `const` 가 하나만 겹쳐도 **스크립트가 통째로 죽는다.** 넣기 전에
//   `vfx.js`·`chapter.js`·`nav.js`·`rock.js` 에 같은 이름이 없는지 확인했다
//   (2026-08-21: 아홉 이름 전부 0건. `charCodeAt`·`charger` 는 부분 일치라 무관).
//
// ⚠️ **CSS 도 `char-` 다**(`vfx.css` 의 `.char-band`·`.char-lv`·`.char-lock`·
//   `.char-lockt`). 전에는 `ci-`(char **ice**)였는데, 열여덟 장이 쓰는 클래스에
//   한 속성의 약자가 박혀 있으면 다음 장에서 「무속성인데 왜 ice 인가」가 된다.

// ── 등급 — **색이 아니라 글자다** ────────────────────────────────────────
//
// 차례는 등급이다(`lib/data/skill_rank.dart`: 기초 → 변주 → 연계, 그 차례가
// 곧 해금 순서). 같은 등급 안에서는 계열 순(`lib/data/skill_element.dart`).
// ⚠️ 계열 색이 이미 여덟이라 아홉째 축에 색을 주면 화면에서 두 축이 색으로
//   싸운다 — 그래서 `.rk` 는 회색 글자다(`vfx.css` 의 `.char-lv`).
const charRk = (t, r) => t + ' · <span class="rk">' + r + "</span>";

/// 열두까지의 우리말 수 — 「세 종이 남았다」의 그 「세」.
/// ⚠️ 0 은 「없다」가 아니라 **빈 문자열**이다: 남은 칸이 0 이면 [charFill] 이
///   한 칸도 안 그리므로 이 값이 화면에 나갈 길 자체가 없다.
const charNUM = ["", "한", "두", "세", "네", "다섯", "여섯",
  "일곱", "여덟", "아홉", "열", "열한", "열두"];

/// 칸 그림을 찾을 **레지스트리 한 벌** — 기본은 `FX`, 필요하면 더 얹는다.
///
/// ⚠️ **`FX` 하나로는 안 된다.** 창작 마법 열 종은 `MGFX` 에 따로 서 있고
///   (`vfx.js` 의 「`FX` 에 안 넣는 이유」 주석: `tile` 이 `reg===FX` 일 때만
///   `WTONE` 으로 물들이기 때문), 무속성의 **공명이 그중 하나**다
///   (`MGFX.mgNovaChime`). `FX` 만 뒤지면 그 줄이 조용히 사라진다.
/// ⚠️ **사본이 아니다** — 함수를 복사하는 것이 아니라 **찾아보는 표**를 한 번
///   합칠 뿐이고, 두 레지스트리가 다 찬 뒤(페이지 스크립트 시점)에 만든다.
const charReg = (...regs) => Object.assign({}, FX, ...regs.filter(Boolean));

/// **속성 결계 한 줄** — 여덟 장이 같이 쓴다 (2026-08-22 편입).
///
/// ⭐⭐ 사용자 판정: 「결계 방어를 **결계가 입힌다는 느낌이 아니라 아예 속성의
///   방어 스킬로 편입**」 — 그래서 결계:염 은 염의 스킬, 결계:빙 은 빙의
///   스킬이 된다. 원장 = `docs/design/속성-개선-백로그.md` 「방어 계열 판정」.
///   ⚠️ `ward`(무 원본)만은 **무속성에 그대로 둔다** — 엔진에 있는 유일한 것이고
///     나머지 여덟이 그것의 변주다.
///
/// ⚠️⚠️ **문구를 손으로 안 적는다.** 여덟은 **시안에만 있어서**(엔진 방어는
///   7종뿐) 옮겨 놓지 않으면 없어지는 것들이고, 그 다섯 줄의 정본은 `vfx.js` 의
///   [WLTBL] + [WLtxt] 다. 사본을 두면 그 날로 갈린다.
/// ⚠️ **칸 키가 「방어 › 속성 입힘 가능」 격자와 다르다.** 저쪽(`#tintguard`)의
///   `WDward*`·`GDground3/4` 는 **확정된 그림 한 장**이라 레벨을 안 읽는다 —
///   성장표 다섯 칸이 통째로 같아진다. 레벨을 읽는 것은 [WLFX] 쪽(`WLward*`)
///   이고, 캐릭터 장은 다섯 칸이 갈려야 하므로 이쪽을 건다.
/// ⚠️ **등급은 `lib/data/skill_rank.dart` 에 아직 없다**(엔진 편입이 마지막).
///   같은 처지의 속성 방어(풍벽 · 역풍 · 파동정지)가 전부 **변주**라 그 자리로
///   본다 — **판정이 나면 이 한 줄만 고치면 여덟 장이 같이 따라온다.**
function charWard(key) {
  if (typeof WLTBL === "undefined" || typeof WLtxt === "undefined") return null;
  const R = WLTBL.find((x) => x.key === key);
  if (!R) { console.warn("결계 — WLTBL 에 없는 키:", key); return null; }
  return [key, R.nm, charRk("방어", "變 변주"), WLtxt(R)];
}

/// **원본 성장표(`LVW`)에 이미 선 스킬 한 줄** — 이름 · 계열 · 다섯 줄을 전부
/// 그 표에서 읽어 온다(무속성의 사슬이 이 길로 온다).
///
/// ⚠️ `LVT` 는 **L2 부터**다 — 앞에 한 칸을 끼워야 「칸마다 한 줄」이 된다.
///   L1 문구는 `LVT1` 에 있는 넷만 제 말이 있고, 나머지는 계열 격자의 캡션이
///   그 자리다(`GUARD`/`PHYS`/`MAGIC` 의 넷째 칸). 둘 다 없으면 「기준 디자인」.
function charLvw(key, rank, cap) {
  if (typeof LVW === "undefined" || typeof LVT === "undefined") return null;
  const w = LVW.find((x) => x[0] === key);
  if (!w) { console.warn("성장표 — LVW 에 없는 키:", key); return null; }
  const l1 = (typeof LVT1 !== "undefined" && LVT1[key]) || cap || "기준 디자인";
  return [key, w[1], charRk(w[2], rank), [l1].concat(LVT[key] || [])];
}

/// 안 구운 칸 키를 **콘솔에 밝힌다.**
///
/// ⚠️ [lvTable] 은 `reg[key]` 가 없으면 그 줄을 **조용히 건너뛴다** — 이 레포가
///   그렇게 빈 칸을 낸 적이 있다. 예외가 아니라 **침묵**이라 눈으로는 못 본다.
/// ⚠️ **칸 키가 엔진 id 와 다른 것이 많다**(빙에서 다섯: 서릿발 `SDspineD` ·
///   서리결정 `SCspine` · 결빙 `POportal` · 빙벽 `WLwall1/2/4`, 무속성에서
///   하나: 공명 `mgNovaChime`). 지어내면 그 줄이 통째로 사라진다.
///
/// ⭐ `dec` 는 **「시안이 아직 안 그렸다」고 선언한 키**의 지도다(키 → 왜).
///   선언한 것은 사고가 아니므로 경고에서 빼되, **거꾸로도 본다**: 선언해 뒀는데
///   레지스트리에 실제로 있으면 그 선언이 낡은 것이라 그것도 콘솔에 밝힌다.
///   (정본은 `tools/mockup_sheet.js` 의 `NOMOCK` 이다 — 지금은 역풍 하나.)
function charMISS(label, reg, dec, ...tables) {
  const R = reg || FX, D = dec || {};
  const rows = [].concat(...tables.filter(Array.isArray));
  const miss = rows.filter((r) => typeof R[r[0]] !== "function" && !D[r[0]]);
  if (miss.length)
    console.warn(label + " — 그림 레지스트리에 없는 칸 키:", miss.map((r) => r[0]).join(" "));
  const stale = Object.keys(D).filter((k) => typeof R[k] === "function");
  if (stale.length)
    console.warn(label + " — 「그림 없음」 선언이 낡았다(이미 있다):", stale.join(" "));
  return miss;
}

/// 몸 — **그림도 캡션도 `ELEMS` 에서 읽어 온다.**
///
/// ⭐ 그림은 하나도 새로 안 그린다. 정본은 「속성 · 몸」(`mockup.html`)이고
///   여기서는 **같은 함수**(`ELEM.*`)를 그대로 부른다.
/// ⚠️ 없는 키는 **조용히 넘어가지 않는다** — 짝(발현 전 · 발현)이 없는 속성이
///   있을 수 있고, 그때 빈 격자만 뜨면 「왜 안 나오나」로 시간이 간다.
function charBody(host, keys) {
  const H = (typeof host === "string") ? document.getElementById(host) : host;
  if (!H || typeof ELEMS === "undefined") return 0;
  let n = 0;
  for (const k of keys) {
    const w = ELEMS.find((x) => x[0] === k);
    if (w) { tile(H, ELEM, w[0], w[1], w[2], w[3], S); n++; }
    else console.warn("몸 — ELEMS 에 없는 키:", k);
  }
  return n;
}

/// 해금 띠 — **선이 어디서 갈리나**를 격자 안에서 말한다. 한 줄을 통째로 먹는다.
function charBand(host, t, d) {
  const b = document.createElement("div");
  b.className = "char-band";
  b.insertAdjacentHTML("beforeend", `<b>${t}</b><span>${d}</span>`);
  host.appendChild(b);
  return b;
}

/// 그림이 **없는** 줄 — 자리를 지키고 그 사실을 말한다.
///
/// ⭐⭐ 엔진에는 서 있는데 시안이 아직 안 그린 스킬이 있다(지금은 **역풍**
///   하나 — `tools/mockup_sheet.js` 의 `NOMOCK`, 근거는 `lib/data/magic_guard.dart`
///   의 「시안에 타일이 없다」). [lvTable] 에 그대로 넘기면 그 줄이 **조용히**
///   사라져 열두 칸이 열한 칸이 된다 — 빠진 것이 화면에서 안 보이는 그 침묵이
///   이 레포가 네 번 당한 사고다. ⇒ **없는 것은 없다고 그린다.**
/// ⭐ 그림 자리에 **지어낸 그림을 넣지 않는다**(같은 규율: `mockup_sheet.js` 의
///   「여기 남는 것은 「시안이 아직 안 그린 것」이라 지어내면 대조가 거짓이 된다」).
///   빈 사각 다섯이 서고 성장표 문구는 그대로 뜬다 — **말은 있는데 그림이 없다**가
///   한 줄로 읽힌다.
function charNoArt(host, r, why, color) {
  const [key, nm, sub, txt] = r;
  const b = document.createElement("div");
  b.className = "lvblock char-noart";
  b.insertAdjacentHTML("beforeend",
    `<div class="hd"><b>${nm}</b><span>${sub || ""}</span></div>`);
  const cells = document.createElement("div");
  cells.className = "cells";
  const N = Array.isArray(txt) ? txt.length : 5;
  cells.style.setProperty("--n", N);
  for (let L = 1; L <= N; L++)
    cells.insertAdjacentHTML("beforeend",
      `<div class="cell"><div class="na">그림 없음</div><div class="lb">` +
      `<div style="font-size:10px;font-weight:700;letter-spacing:.06em;` +
      `color:${L === 1 ? "#9494A2" : (color || "#FFA83C")}">L${L}</div>` +
      `<div style="font-size:9px;color:#9494A2;line-height:1.3;margin-top:2px;` +
      `min-height:3.6em">${(Array.isArray(txt) ? txt[L - 1] : "") || ""}</div></div></div>`);
  b.appendChild(cells);
  b.insertAdjacentHTML("beforeend",
    `<div class="na-why">시안에 칸이 없다 — <b>${key}</b> · ${why || ""}</div>`);
  host.appendChild(b);
  return 1;
}

/// 성장표 한 벌 — **[lvTable] 호출 규약을 여기 한 곳에 가둔다.**
///
/// ⚠️ [lvTable] 은 같은 호스트에 **덧붙인다.** 그래서 띠 → 표 → 띠 → 표 순으로
///   부르면 격자 차례가 그대로 선다([charDeck] 이 그 차례를 쥔다).
/// ⚠️ `name` 은 스모크 `--only=` 가 무는 이름이라 **장마다 다르게 준다** —
///   한 이름으로 묶으면 여섯 장이 한 덩어리가 되어 한 장만 골라 돌 수가 없다.
/// ⚠️ **줄마다 한 번씩 부른다.** 한꺼번에 넘기면 그림 없는 줄이 [lvTable] 안에서
///   조용히 빠져 **차례가 밀린다** — 줄 단위로 부르면 없는 줄 자리에 [charNoArt]
///   를 그대로 끼울 수 있다. [lvTable] 은 호스트마다 껍데기를 하나만 만들므로
///   (`h.__lv` 메모) 여러 번 불러도 붙는 모양은 한 번 부른 것과 같다.
function charTable(host, rows, color, name, reg, dec) {
  const R = reg || FX, D = dec || {};
  let made = 0;
  for (const r of (rows || [])) {
    if (typeof R[r[0]] === "function")
      made += lvTable({
        host: host, rows: [r], color: color, reg: R,
        tone: "wtone", name: name || "CHcell",
      });
    else if (D[r[0]]) made += charNoArt(host, r, D[r[0]], color);
  }
  return made;
}

// ── 자물쇠 — **잠김 그림이 없어서 여기서 만든다** ──────────────────────────
//
// ⭐ **속성 색을 안 쓴다.** 열여덟 캐릭터가 같은 이 그림을 쓰는데 빙의 하늘색을
//   입히면 다음 장에서 「염인데 왜 파랗나」가 된다. 빈 칸은 속성의 일이 아니라
//   **틀의 일**이라 회백이 맞다.
// ⭐ **안 움직인다.** `t` 를 한 번도 안 읽으므로 주기가 없고, 따라서 주기 끝과
//   처음이 어긋날 자리가 아예 없다. 빈 칸이 눈길을 끌면 채워진 칸이 진다.
// ⚠️ 색은 **`#RRGGBB` 만** 쓴다 — 캔버스는 잘못된 `fillStyle` 을 조용히
//   무시해서, 면이 안 보이면 밝기가 아니라 **칠 실패**다. 투명도는 [A] 로 낸다.
function charLock(c, t, dt, W, H) {
  const S0 = Math.min(W, H), cx = W / 2, ink = "#9EA0AE";
  const bw = S0 * .50, bh = S0 * .36, bx = cx - bw / 2, by = H / 2 - S0 * .02, r = S0 * .045;
  c.save(); c.lineCap = "round"; c.lineJoin = "round";
  // 고리 — 위 반원 + 몸통에 물리는 다리 둘.
  c.strokeStyle = A(ink, .62); c.lineWidth = S0 * .075;
  const sr = S0 * .155, sy = by - S0 * .055;
  c.beginPath(); c.arc(cx, sy, sr, Math.PI, 0);
  c.lineTo(cx + sr, by + S0 * .01);
  c.moveTo(cx - sr, sy); c.lineTo(cx - sr, by + S0 * .01);
  c.stroke();
  // 몸통 — 안이 비면 자물쇠가 아니라 고리로 읽힌다. 옅게 채운다.
  c.beginPath(); c.roundRect(bx, by, bw, bh, r);
  c.fillStyle = A(ink, .13); c.fill();
  c.strokeStyle = A(ink, .52); c.lineWidth = S0 * .030; c.stroke();
  // 열쇠 구멍 — 칸 바탕색으로 뚫는다.
  c.fillStyle = "#0C0C12";
  c.beginPath(); c.arc(cx, by + bh * .40, S0 * .035, 0, Math.PI * 2); c.fill();
  c.beginPath(); c.moveTo(cx - S0 * .020, by + bh * .44); c.lineTo(cx + S0 * .020, by + bh * .44);
  c.lineTo(cx + S0 * .011, by + bh * .74); c.lineTo(cx - S0 * .011, by + bh * .74);
  c.closePath(); c.fill();
  c.restore();
}

/// 빈 칸 — **열둘에서 서 있는 것을 뺀 만큼.** 손으로 안 적는다.
///
/// 그림 자리는 성장표 칸과 **같은 폭**(다섯 중 한 칸)이라 열둘이 한 격자로 읽힌다.
/// ⚠️ 문구의 앞머리(「열두째 칸까지 **N 종**이 남았고」)는 **계산**이고, 그 뒤의
///   「왜」는 **장마다 다르다** — 빙은 기초가 둘뿐이라 「적어도 하나는 기초」가
///   붙지만 무속성은 기초가 다섯이라 그 말이 거짓이 된다. 그래서 `why` 는 인자다.
/// ⚠️ [cap] 이 오면 **그 띠 하나**를 채운다(기본 12 = 두 띠 합).
function charFill(host, now, later, o, cap) {
  o = o || {};
  const left = (cap || 12) - ((now || []).length + (later || []).length);
  for (let i = 0; i < left; i++) {
    const b = document.createElement("div");
    b.className = "lvblock char-lock";
    b.insertAdjacentHTML("beforeend",
      `<div class="hd"><b>기획 예정</b><span>빈 칸 · <span class="rk">등급 미정</span></span></div>`);
    const cells = document.createElement("div");
    cells.className = "cells"; cells.style.setProperty("--n", 5);
    const cell = document.createElement("div"); cell.className = "cell";
    const cv = document.createElement("canvas");
    box(cv, { width: "100%", height: "auto", display: "block", aspectRatio: "1", background: "#0C0C12" });
    cell.appendChild(cv);
    cell.insertAdjacentHTML("beforeend", `<div class="lb"><div class="lk">잠김</div></div>`);
    cells.appendChild(cell);
    cells.insertAdjacentHTML("beforeend",
      `<div class="cell char-lockt"><div class="lb">아직 안 정했다 — 열두째 칸까지 ` +
      `<b>${charNUM[left]} 종</b>이 남았고, ${o.why || ""}</div></div>`);
    b.appendChild(cells); host.appendChild(b);
    mk(cv, [LVD, LVD], charLock);
  }
  return left;
}

/// 스킬 열두 칸 한 벌 — **띠 → 표 → 띠 → 표 → 자물쇠.**
///
/// ⭐ 차례를 여기 한 곳에 가둔다. 여섯 장이 각자 이 다섯 줄을 적으면 그것이
///   곧 사본 여섯이고, 띠 문구를 고치는 날 다섯 장만 고쳐진다.
/// ⚠️ **「추가 여섯」 띠는 표가 비어도 선다.** 무속성처럼 여섯이 전부 즉시인
///   캐릭터는 그 띠 아래가 통째로 자물쇠 여섯인데, 그게 곧 「추가 여섯이
///   아직 한 칸도 안 정해졌다」의 그림이다 — 띠를 빼면 그 사실이 안 보인다.
///
/// ```
/// charDeck({host:"cnskill", label:"무속성", color:"#DCDCE8", name:"CNcell",
///           reg:charReg(MGFX), now:CN_NOW, later:CN_LATER, why:"…"});
/// ```
/// ⚠️ 시안이 아직 안 그린 칸이 있으면 `noart:{backwind:"왜"}` 로 **선언**한다 —
///   선언한 줄은 [charNoArt] 가 빈 사각 다섯으로 그려 자리를 지키고, 선언 안 한
///   키는 그대로 [charMISS] 가 사고로 잡는다.
function charDeck(o) {
  const H = (typeof o.host === "string") ? document.getElementById(o.host) : o.host;
  if (!H) return 0;
  const now = o.now || [], later = o.later || [], reg = o.reg || FX;
  // `noart` — **시안이 아직 안 그린 칸**의 선언(키 → 왜). 안 적힌 키가 없으면
  //   [charMISS] 가 여느 때처럼 사고로 잡는다.
  const dec = o.noart || {};
  charMISS(o.label || "캐릭터", reg, dec, now, later);
  const bands = o.bands || [
    ["즉시 여섯", "캐릭터를 사면 그 자리에서 열린다"],
    ["추가 여섯", "상점 추가 구매 또는 숙련도 해금"]];
  // ⚠️⚠️ **자물쇠는 띠마다 채운다** (2026-08-23 사용자 판정: 「즉시 여섯에
  //   구현 5개만 있다고. 자물쇠 한 칸 넣어야 더 구현해야 된다는 걸 알 거 아니야」).
  //   그전까지는 두 띠를 다 그린 **뒤에** 남은 수를 맨 끝에 몰아 붙였다 — 그러면
  //   즉시 여섯이 다섯만 차 있어도 그 자리가 **비어 보이지 않고**, 「여기 하나가
  //   더 필요하다」가 화면에서 사라진다. ⇒ **띠마다 여섯을 채운다.**
  charBand(H, bands[0][0], bands[0][1]);
  charTable(H, now, o.color, o.name, reg, dec);
  const n0 = charFill(H, now, [], o, 6);
  charBand(H, bands[1][0], bands[1][1]);
  charTable(H, later, o.color, o.name, reg, dec);
  const n1 = charFill(H, later, [], o, 6);
  return n0 + n1;
}
