// ── 캐릭터 장 「폭마」(특수) — **여섯 장과 같은 틀, 다른 처지** ────────────
//
// ⭐⭐ 틀은 `char-page.js` 가 쥔다(그리기 · 격자 · 띠 · 자물쇠 · 빈 칸 · 가드).
//   기본 여섯 장이 쓰는 그 틀을 **한 줄도 안 고치고** 그대로 쓴다 — 특수 장을
//   위해 [charDeck] 을 손보면 여섯 장이 같이 흔들린다. 다른 점은 전부
//   **인자**로 낸다(`bands` · `why` · 색).
//
// ⚠️⚠️ **`vfx.js` · `char-page.js` 뒤에 실린다.** 이름을 `CM_` 로 격리한다 —
//   23,000줄 뒤에 실리는 파일이라 최상위 `const` 가 하나만 겹쳐도 **스크립트가
//   통째로 죽는다**(2026-08-21 확인: `CM_NOW`·`CM_LATER`·`CM_BODY`·`CM_CAP` 넷 다
//   vfx/chapter/nav/rock/char-page 에서 0건).
//
// ⭐⭐ **왜 이 장이 있나.** 사용자 지시(2026-08-21): 「특수속성은 실제
//   소스코드에 녹이진 않을 거지만 **기폭 스킬을 살려둬야 되기 때문에** 미리
//   특수속성에 페이지 만들어서 넣어줘」. 같은 날 판정으로 기폭 `detonate` 가
//   독 毒 에서 나갔는데, 갈 곳이 없으면 **판정과 함께 스킬이 사라진다.**
//   ⇒ 이 장은 **보관소**다. 엔진 배선은 안 한다 — 특수 12종은 출시 범위 밖이고
//     상점 해금 대상이다(원장 = `docs/design/속성-개선-백로그.md` 독 절).
//
// ⚠️⚠️ **이름을 새로 짓지 않았다.** 「폭마 · 뇌+독」의 정본은 `vfx.js` 의
//   `FVNAME` 이고(특수 열 쌍의 이름이 거기 다 있다), `lib/data/characters.dart`
//   에는 **이 이름표가 없다** — 쌍을 코드로 접어서 만들기 때문이다. 코드만 보고
//   「그런 속성 없다」로 읽으면 틀린다(2026-08-21 에 실제로 그렇게 틀렸다).
//   ⇒ 아래 몸 칸은 이름·캡션·그림을 **전부 `FVNAME`/`FVSET`/`FVFIX` 에서 읽어
//     온다.** 여기에 사본을 두면 언젠가 갈라진다.
//   ⚠️ 잠깐 「플라즈마」로 적힐 뻔했는데 그건 `blast`(염+뇌)로 **다른 쌍**이다.

// ── 몸 — **[charBody] 를 못 쓴다** ────────────────────────────────────────
//
// ⚠️ [charBody] 는 `ELEMS` 를 뒤지는데 **특수 열 쌍은 거기 없다** — `ELEMS` 는
//   무속성 · 여섯 속성 · 백광까지고, 특수 속성은 `FVSET`/`FVFIX` 쪽에 산다
//   (「속성 · 몸」 장의 `#fuse` 격자가 `fvCell` 로 그 둘을 읽어 그린다).
// ⭐ **그림은 하나도 새로 안 그린다.** `FVSET.numb` 에 다섯 안이 이미 서 있고
//   확정본은 `FVFIX.numb = {base:5, mani:1}` 이다 — 그 두 안을 그대로 부른다.
//   여기서 하는 일은 [fvBody] 를 [tile] 이 받는 모양으로 감싸는 것뿐이다.
const CM_BODY={
  numbBase(c,t,dt,W,H,st){fvBody(c,t,dt,W,H,st,"numb",(FVFIX.numb.base||1)-1);},
  numbMani(c,t,dt,W,H,st){fvBody(c,t,dt,W,H,st,"numb",(FVFIX.numb.mani||1)-1);},
};
/// 확정 안의 캡션 — `FVSET` 원문이다. 「속성 · 몸」 장의 칸과 **같은 문자열**이
/// 나와야 하므로 손으로 안 적는다.
const CM_CAP=(p)=>{
  const v=(typeof FVSET!=="undefined"&&FVSET.numb)?FVSET.numb[(FVFIX.numb[p]||1)-1]:null;
  return v?v[0]:"";};
{const H=document.getElementById("cmbody");
 if(H&&typeof FVNAME!=="undefined"&&typeof FVSET!=="undefined"&&FVSET.numb){
   const nm=FVNAME.numb.split(" ·")[0];            // "폭마 · 뇌+독" → "폭마"
   // ⚠️ 둘째 칸은 **몸이 아니라 보관된 그림**이다 — 몸을 두 벌로 가르던 것이
   //   폐기돼 서는 것은 첫째 칸 하나뿐이고, 엔진 대조표도 이 칸을 「영구
   //   미제작」으로 적어 뒀다(`docs/design/시안-엔진-대조.md`). **지울 그림이
   //   아니라 안 쓰는 그림**이고, 이 장 자체가 보관소라 그대로 띄운다.
   tile(H,CM_BODY,"numbBase",nm+" · 몸","NUMB",CM_CAP("base"),S);
   tile(H,CM_BODY,"numbMani",nm+" · 안 쓰는 그림","NUMB",CM_CAP("mani"),S);
 }else console.warn("마 — FVNAME/FVSET.numb 를 못 읽었다");}

// ── 정체 한 줄 · 시너지 — **표에서 읽어 온다** ────────────────────────────
//
// ⚠️ `FVWHY`·`FVSYN` 이 정본이다. 시안이 같은 말을 두 번 적으면 반드시 갈라진다.
{const H=document.getElementById("cmwhy");
 if(H&&typeof FVWHY!=="undefined"&&FVWHY.numb){
   const b=(s)=>String(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
   const syn=(typeof FVSYN!=="undefined"&&FVSYN.numb)?FVSYN.numb:null;
   H.innerHTML="<b>"+FVNAME.numb+"</b> — "+b(FVWHY.numb)+
     (syn?"<br><b>시너지</b> — <b>"+syn[0]+" 계열</b>에 "+syn[1]+
       " · <span style=\"color:#5A5A68\">"+syn[2]+"</span>":"")+
     "<br>⚠️ <b>이 세 줄은 <code>vfx.js</code> 의 <code>FVNAME</code> · " +
     "<code>FVWHY</code> · <code>FVSYN</code> 에서 읽어 온 것</b>이다 — " +
     "이 장이 이름을 새로 짓지 않는다.";
 }}

// ── 열두 칸 ───────────────────────────────────────────────────────────────
//
// ⚠️ 칸 키가 엔진 id 와 다르다: 엔진 `detonate` ↔ 시안 `MGFX.mgNovaDetonate`
//   (창작 마법 열 종은 `tile` 의 물들임 규약 때문에 `FX` 밖에 산다). 그래서
//   `reg` 에 [charReg] 로 `MGFX` 를 얹는다 — 안 얹으면 이 장은 **한 줄도
//   안 뜨고**, 예외가 아니라 침묵이라 눈으로는 못 본다.
// ⚠️ **성장표 문구는 도감에서 옮긴 것이다** — 창작 금지. 출처는
//   `lib/data/magic_support.dart`(기폭). 독 장에 있던 그 다섯 줄 그대로다.
// ⭐ **등급·계열은 안 바뀐다.** 속성만 옮겼으므로 `skill_rank.dart` 기준
//   **보조 · 연계** 그대로다.
const CM_NOW=[
 ["mgNovaDetonate","기폭",charRk("보조","連 연계"),[
  "쌓인 겹을 태워 즉발로 바꾼다 — 혼자 쓰면 미지근하고 독 위에 얹으면 판이 뒤집힌다",
  "겹 상한 3 · 터지는 반경이 넓어진다",
  "터진 직후 잠깐 예민해져 다음 겹이 두 배로 쌓인다",
  "겹 상한 5 · 반경이 더 넓어진다",
  "각성 — 상한까지 찬 적은 터져도 첫 겹이 안 빈다"]]];

// ⚠️ **비어 있다.** 하나뿐이라 뒤 띠 아래는 통째로 자물쇠다.
const CM_LATER=[];

// ⚠️⚠️ **띠 문구가 기본 여섯 장과 다르다.** 거기서는 「즉시 여섯 / 추가 여섯」이
//   **캐릭터를 사면 열리는 것 ↔ 상점 추가 구매·숙련도 해금**을 가르는데, 특수
//   속성은 **캐릭터 자체가 아직 없다** — 열두 칸을 가를 선을 그을 자리가 아니다.
//   ⇒ [charDeck] 의 `bands` 인자로 이 장만 갈아 끼운다(틀은 안 고친다).
charDeck({
  host: "cmskill", label: "마(특수)", color: "#E040A0", name: "CMcell",
  reg: charReg(MGFX),
  now: CM_NOW, later: CM_LATER,
  bands: [
    ["살려 둔 한 칸", "독 毒 에서 옮겨 온 기폭 — 갈 곳이 없으면 판정과 함께 사라진다"],
    ["나머지", "특수 12종은 <b>출시 범위 밖</b>이라 아직 한 칸도 안 정해졌다"],
  ],
  why: "다만 <b>지금 채울 차례가 아니다</b> — 특수 열두 종은 " +
    "<b>출시 범위 밖</b>이고 <b>상점 해금 대상</b>이라, 기본 여섯의 빈 칸을 " +
    "다 메운 뒤에 오는 일이다. 이 장이 지금 하는 일은 " +
    "<b>기폭 한 종을 잃지 않게 보관하는 것</b> 하나다.",
});
