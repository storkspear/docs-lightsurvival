// ── 캐릭터 장 「섬화」(특수) — **여섯 장과 같은 틀, 다른 처지** ───────
//
// ⭐⭐ 틀은 `char-page.js` 가 쥔다. 기본 여섯 장이 쓰는 그 틀을 **한 줄도 안
//   고치고** 그대로 쓴다 — 다른 점은 전부 **인자**로 낸다(`bands` · `why` · 색).
//
// ⚠️⚠️ **`vfx.js` · `char-page.js` 뒤에 실린다.** 이름을 `CZ_` 로 격리한다
//   (2026-08-22 확인: `CZ_*` · 호스트 `czbody`·`czskill` 전부 0건).
//   ⚠️ `CP_` 는 독 장이 쓰고 있어 못 쓴다 — 「plasma」의 머리글자를 피한 이유다.
//
// ⭐⭐ **왜 이 장이 있나.** 2026-08-22 판정으로 결계가 속성마다 제 방어 스킬이
//   됐고(원장 = `docs/design/속성-개선-백로그.md` 「방어 계열 판정」), 그 여덟
//   중 하나가 **결계 · 섬화(방패 · 자홍)**이다. 갈 곳이 없으면 **판정과
//   함께 사라진다.** 엔진 배선은 안 한다 — 사용자 판정: 「**특수는 어차피 새로
//   만들 거야 신경 안 써도 돼**」.
//
// ⚠️⚠️ **이름을 새로 안 지었다.** 정본은 `vfx.js` 의 `FVNAME` 이고
//   `blast:"섬화 · 염+뇌"` 가 그 값이다. ⚠️ 잠깐 「플라즈마」가
//   `numb`(폭마 · 뇌+독)로 적힐 뻔한 이력이 있다 — **쌍이 다르다.**
//   `lib/data/characters.dart` 에는 이 이름표가 **없다**(쌍을 코드로 접어서
//   만든다). 코드만 보고 「그런 속성 없다」로 읽으면 틀린다.

// ── 몸 — **[charBody] 를 못 쓴다** ────────────────────────────────────────
//
// ⚠️ [charBody] 는 `ELEMS` 를 뒤지는데 **특수 열 쌍은 거기 없다** — `ELEMS` 는
//   무속성 · 여섯 속성 · 백광까지고, 특수 쌍은 `FVSET`/`FVFIX` 쪽에 산다.
// ⭐ **그림은 하나도 새로 안 그린다.** `FVSET.blast` 에 안이 이미 서 있고
//   확정본은 `FVFIX.blast = {base:5, mani:6}` 이다 — 그 두 안을 그대로 부른다.
//   여기서 하는 일은 [fvBody] 를 [tile] 이 받는 모양으로 감싸는 것뿐이다.
//   (폭마 장이 판 자리와 **같은 자리**다.)
const CZ_BODY = {
  blastBase(c, t, dt, W, H, st) { fvBody(c, t, dt, W, H, st, "blast", (FVFIX.blast.base || 1) - 1); },
  blastMani(c, t, dt, W, H, st) { fvBody(c, t, dt, W, H, st, "blast", (FVFIX.blast.mani || 1) - 1); },
};
/// 확정 안의 캡션 — `FVSET` 원문이다. 「속성 · 몸」 장의 칸과 **같은 문자열**이
/// 나와야 하므로 손으로 안 적는다.
const CZ_CAP = (p) => {
  const v = (typeof FVSET !== "undefined" && FVSET.blast) ? FVSET.blast[(FVFIX.blast[p] || 1) - 1] : null;
  return v ? v[0] : "";
};
{
  const H = document.getElementById("czbody");
  if (H && typeof FVNAME !== "undefined" && typeof FVSET !== "undefined" && FVSET.blast) {
    const nm = FVNAME.blast.split(" ·")[0];          // "섬화 · 염+뇌" → "섬화"
    tile(H, CZ_BODY, "blastBase", nm + " · 발현 전", "BLAST", CZ_CAP("base"), S);
    tile(H, CZ_BODY, "blastMani", nm + " · 발현", "BLAST", CZ_CAP("mani"), S);
  } else console.warn("플라즈마 — FVNAME/FVSET.blast 를 못 읽었다");
}

// ── 정체 한 줄 · 시너지 — **표에서 읽어 온다** ────────────────────────────
//
// ⚠️ `FVWHY`·`FVSYN` 이 정본이다. 시안이 같은 말을 두 번 적으면 반드시 갈라진다.
{
  const H = document.getElementById("czwhy");
  if (H && typeof FVWHY !== "undefined" && FVWHY.blast) {
    const b = (s) => String(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    const syn = (typeof FVSYN !== "undefined" && FVSYN.blast) ? FVSYN.blast : null;
    H.innerHTML = "<b>" + FVNAME.blast + "</b> — " + b(FVWHY.blast) +
      (syn ? "<br><b>시너지</b> — <b>" + syn[0] + " 계열</b>에 " + syn[1] +
        " · <span style=\"color:#5A5A68\">" + syn[2] + "</span>" : "") +
      "<br>⚠️ <b>이 줄은 <code>vfx.js</code> 의 <code>FVNAME</code> · " +
      "<code>FVWHY</code> · <code>FVSYN</code> 에서 읽어 온 것</b>이다 — " +
      "이 장이 이름을 새로 짓지 않는다.";
  }
}

// ── 열두 칸 ───────────────────────────────────────────────────────────────
//
// ⚠️ 줄을 손으로 안 적는다 — [charWard] 가 `vfx.js` 의 `WLTBL`/`WLtxt` 에서
//   이름·부제·다섯 줄을 그대로 읽어 온다. **여덟 장이 그 한 함수를 쓴다.**
// ⚠️ `reg` 에 `WLFX` 를 얹어야 한다 — 안 얹으면 이 장이 **한 줄도 안 뜨고**,
//   예외가 아니라 **침묵**이라 눈으로는 못 본다.
const CZ_NOW = [charWard("WLwardPlasma")].filter(Boolean);

// ⚠️ **비어 있다.** 하나뿐이라 뒤 띠 아래는 통째로 자물쇠다.
const CZ_LATER = [];

charDeck({
  host: "czskill", label: "플라즈마(특수)", color: "#E14CFF", name: "CZcell",
  reg: charReg(WLFX),
  now: CZ_NOW, later: CZ_LATER,
  bands: [
    ["살려 둔 한 칸", "결계 · 섬화 — 특수 열 중 <b>유일하게</b> 자기 껍질을 받은 칸이다"],
    ["나머지", "특수 속성은 <b>출시 범위 밖</b>이라 아직 한 칸도 안 정해졌다"],
  ],
  why: "다만 <b>지금 채울 차례가 아니다</b> — 특수 속성은 " +
    "<b>출시 범위 밖</b>이고 <b>상점 해금 대상</b>이라, 기본 여섯의 빈 칸을 " +
    "다 메운 뒤에 오는 일이다(사용자: 「특수는 어차피 새로 만들 거야」). " +
    "이 장이 지금 하는 일은 <b>한 종을 잃지 않게 보관하는 것</b> 하나다.",
});
