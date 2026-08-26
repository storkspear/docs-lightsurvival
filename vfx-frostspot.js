// ══════════════════════════════════════════════════════════════════════════
// FS — 서리결정: **자리에 박고 그 자리에서 터진다**            (2026-08-23)
//
// ── 무엇을 고치는 그림인가 ────────────────────────────────────────────────
// 사용자가 실기에서 잡아낸 것: 「실제 스킬은 캐릭터가 바라보는 방향으로 존나
//   빠르게 발사하고 **거기서 스킬이 굳어져 있음.** 그러고 **다음 발사 때까지
//   안 사라지다가** 또 발사하고 **또 그냥 가만히 있음.**」
// 원인 두 자리:
//   ① 엔진 `lib/game/fx/w_chain_cel.dart` `_chain()` 의 세 번째 갈래 —
//      「허공으로 간 사슬은 안 줄고 안 밀린다」 ⇒ `_hp = cd; first = 0;`
//      **끝내는 처리가 없다.** 다음 주기가 상태를 갈아엎을 때까지 박제된다.
//   ② 시안 확정본 `SCspine` 은 가짜 적(`SCFOE`)을 **항상 다섯** 세워 둔다.
//      `SCcontact` 가 늘 표적을 찾으므로 **「빗나감」이 한 번도 안 나온다.**
//      옮길 원본이 없어서 엔진에도 없다.
//
// ── ⭐⭐ 사용자가 낸 답 — 「빗나감」이라는 상태를 **없앤다** ────────────────
// 사용자 원문: 「서리결정 빗나갔을 때 **적을 타겟으로 해서** 그런데, **발사할
//   타겟 지점을 위치**하고 **그곳에서 터진다**고 하면 빗나가는 걸 저렇게 처리할
//   필요가 없을 거 같은데 어떻게 생각해? **타겟 지점에서 그냥 터지면 되잖아.**
//   그리고 **그 위치를 지나가는 적이 있으면 지금 판정처럼 맞는 걸로**」
//
// ⇒ 사라지는 연출을 만드는 것이 아니라 **빗나갈 수 없게** 설계를 바꾼다.
//   **항상 도착지가 있고 항상 거기서 터진다.** 적은 그 자리를 지나가면 맞는다.
//
//   ① 자리를 고른다 → ② 사슬이 그 자리로 날아간다 → ③ 자리에 박힌다
//   → ④ 그 자리에서 마디가 갈린다(탕탕탕) → ⑤ 얼음 폭발
//
//   ③~⑤가 전부 **「그 자리」**에서 일어난다. 적을 따라가지 않는다.
//   적이 죽어도, 피해도, 애초에 없어도 **그 자리에서 계속 진행된다.**
//
// ⭐ **이 레포에 이 설계를 뒷받침하는 규약이 이미 있다.** `lib/sim/world_step.dart`
//   의 「실명」 절(실명은 명중률이 아니라 **조준각**을 튼다) 원문:
//     「확률 회피는 이 게임에서 **두 번 버려진 설계**이고, 「빗나갔다」가 화면에
//      안 보이면 **피해가 덜 들어온 것과 구별이 안 된다.** 각을 틀면 탄이
//      **옆으로 지나가는 것이 보인다.**」
//   ⇒ 지점 폭발은 **실패가 화면에 남는다.** 빈 자리를 열한 번 내리치고 거기서
//     터지는 것이 보이므로, 지우지도 박제하지도 않는다. 같은 규약의 연장이다.
//
// ── ⚠️ 「자리를 어떻게 고르나」는 시안이 안 정한다 ─────────────────────────
// 이 게임은 **조준이 곧 이동 방향**이라(`world_step.dart` 의
// `aimBlind(player.faceX, player.faceY)`) 플레이어가 따로 조준하지 않는다.
// 자리 선정은 **엔진의 몫**이다. ⇒ 이 시안은 **「자리가 정해졌다」를 전제**하고
// 그 뒤만 그린다. 표적 선정 규칙을 여기서 지어내지 않았다.
// ⇒ 다만 **자리가 눈에 보여야** 「저기를 노린다」가 읽히므로 [FSmark] 를 그린다.
//   ⚠️ 그건 **판정 안내선이 아니라 연출**이다 — 부채꼴·점선·반경 원을 안 그린다.
//     바닥에 **서리가 먼저 돋는 것**이고, 사슬이 닿으면 그 자국에 흡수된다.
//
// ── 왜 별도 파일인가 ──────────────────────────────────────────────────────
// `vfx.js` 는 50,761줄이고 같은 사이클에 여러 손이 같이 쓴다(같은 날 그 파일에서
// 정규식 하나가 31,000줄을 날렸다). `vfx-poison.js`·`vfx-flamelv.js` 의 전례대로
// 새 그림은 여기에 만들고 `vfx.js` 는 **읽기만** 한다. 페이지가 `vfx.js` **뒤**에
// 이 파일을 부르므로 `FX`·`TONE`·`tile`·`IB*`·`SC*` 가 전부 보인다.
// ⚠️ 최상위 이름을 전부 `FS` 로 격리한다(확인: `FS` 로 시작하는 최상위 이름은
//   vfx/nav/char-page/chapter/rock/vfx-poison/vfx-flamelv/vfx-flamenat 에 **0건**).
// ⚠️⚠️ **확정본 `SCspine` 과 그 상수는 한 글자도 안 건드린다.**
//   `SCN`·`SCRAD`·`SCBOOM`·`SCPER`·`SCFLY`·`SCHIT`·`SCFOE`·`SCBR`·`SCGAPM`·
//   `SCMUZ`·`SCKB`·`SCFRZ`·`SCTICK` 은 **읽기만** 한다. 갈아야 하는 것만
//   `FS*` 로 복제해 갖는다.
//
// ── ⚠️ 게이트가 이 파일을 안 돈다 (실측) ──────────────────────────────────
// `tools/mockup_lint.js` 의 런타임 검사와 `tools/mockup_smoke.js` 는 둘 다
// **`docs/vfx/vfx.js` 하나만** 읽는다.
//   ⇒ 자체 검증: `cat docs/vfx/vfx.js docs/vfx/vfx-frostspot.js > /tmp/z.js &&
//                 node tools/mockup_smoke.js /tmp/z.js`
//   ⇒ 린트 ⑪(제목의 「N종」 ↔ 실제 칸 수)이 이 파일의 칸을 **0으로** 세므로
//     새 `<h2>` 에는 **「N종」을 안 쓴다**.
//
// ── ⭐ 한 주기에 **세 경우가 다 나온다** ──────────────────────────────────
// 갈림이 없는 확정 설계라 칸은 **하나**다. 대신 한 주기 `FSPER=8.4초` 를 셋으로
// 갈라 같은 함수가 세 결말을 다 보여 준다(자리·적 배치만 다르다):
//   [0.0 ~ 2.8] ① **자리에 서 있던 놈**이 열한 대를 다 맞는다
//   [2.8 ~ 5.6] ② **지나가던 놈이 세 대만 맞고 빠져나간다** — 남은 여덟 대는
//                  **빈 자리**를 치고, 폭발도 33.5(반경 32)로 **아슬하게** 피한다
//   [5.6 ~ 8.4] ③ **처음부터 아무도 없다** — 열한 대가 다 빈 자리를 치는데,
//                  그래도 **그 자리에서 터져** 26 떨어진 놈 하나가 언다
// ⇒ ②③이 곧 옛 「빗나감」인데, **그림이 하나도 안 달라진다.** 사슬은 늘 자리에
//   박히고 늘 거기서 갈리고 늘 거기서 터진다. 달라지는 것은 **맞은 놈이 있느냐**
//   뿐이고 그건 **번쩍임·성에·넉백**으로만 갈린다.
//
// ── ⚠️ 난수 0건 ──────────────────────────────────────────────────────────
// `Math.random` 을 부르는 확정본 도구(`emit`·`hitFoe`·`IBpushFrag`)를 **하나도
// 안 쓴다.** 부스러기·조각은 여기서 `hash()` 표로 직접 그린다. ⇒ 주기 끝과
// 처음이 **같은 스케줄 하나**에서 나온다(이 저장소가 같은 원인으로 네 번 반려).
// ══════════════════════════════════════════════════════════════════════════

// ── 무대 ──────────────────────────────────────────────────────────────────
/// 한 발이 차지하는 시간(s) · 한 주기(s) = 세 발.
/// ⚠️ 확정본 `SCPER`(2.6)보다 0.2 길다 — 발사 전 **예고 0.14** 와 뒤끝 정리
///   램프([FSTH0]~[FSTH1])가 들어갈 자리다. 사건의 박자(비행·연타·폭발)는
///   확정본과 **한 값도 안 다르다**.
const FSSLOT = 2.8, FSPER = FSSLOT*3;
/// 자리가 먼저 보이는 시간(s). 사슬은 이만큼 늦게 나간다.
const FSTELE = .14;
/// 던지는 속도(238 단위/s). ⚠️ 확정본은 **거리와 무관한 상수 시간**(`SCFLY=.30`)
///   인데, 자리마다 거리가 달라지면 그 식은 **먼 자리를 더 빠르게** 던진다.
///   ⇒ 속도를 고정하고 시간이 거리를 따르게 했다. 82.46 에서 정확히 .30 초가
///     되도록 잡은 값이라 **확정본과 눈금이 맞는다**(아래 [FSfly]).
const FSSPD = 287;
/// 세 자리(238 칸 기준). **엔진이 고르는 값의 대역**이지 규칙이 아니다.
///   ① [-40,-72] 거리 82.46 → 비행 .301초
///   ② [ 52,-58] 거리 77.90 → 비행 .285초
///   ③ [ 10,-100] 거리 100.50 → 비행 .364초
const FSSPOT = [[-40,-72],[52,-58],[10,-100]];
/// 갈리는 자리에 **몸이 걸리는가** — 자리 중심에서 적 겉면까지의 거리 문턱.
/// 확정본 `SCcontact` 의 선 판정(`RAD*1.05 + f.r`)을 **점 판정**으로 옮긴 것이다:
/// 이제 사슬은 선을 따라 첫 적을 찾지 않고 **한 점에 박혀** 있으므로,
/// 물리는 「그 점이 몸에 닿아 있나」 하나로 줄어든다.
const FSBITE = 1.05;
/// 뒤끝 정리 램프(슬롯 안 시각, s). 성에·언 몸·넉백·자국이 **다음 발 전에
/// 완전히 사라진다.** 폭발 그림이 끝나는 시각은 늦어도 2.399초다.
/// ⚠️ 확정본은 주기가 넘어갈 때 상태를 **툭 끊어** 되돌린다(`f.pv=0` 대입).
///   그 자리가 화면에서는 **보이는 이음매**라 램프로 바꿨다.
const FSTH0 = 2.42, FSTH1 = 2.80;
/// 마디가 **몸에서 빠져나오는 동안** 알파가 오르는 거리(× 마디 반지름).
/// ⚠️⚠️ 이게 없으면 **주기 처음에 마디가 툭 나타난다.** 확정본은 머리를
///   `6*SC` 에서 출발시키는데 그 자리가 이미 총구 밖(`SCMUZ=-4`)이라 알파 1
///   짜리 결정 하나가 **없다가 있다**. 영웅 실루엣은 골이 0.52R 까지 파여
///   늘 가려 주지 않는다. ⇒ 출발점을 **총구 그 자리**로 내리고 몸을 벗어난
///   만큼만 진해지게 했다. 주기 처음에 **그려지는 것이 하나도 없다.**
const FSEMG = 1.6;
/// 둘레 장식(마름모·반짝이)이 켜지는 데 걸리는 시간(s).
/// ⚠️ 확정본은 `if(live)` 라 발사와 함께 **툭** 켜진다. 이 칸은 한 주기가
///   **완전한 고리**라야 하므로 켜고 끄기를 양 끝이 0 인 램프로 바꿨다.
const FSAMBIN = .12;

// ── 자리 표식 ─────────────────────────────────────────────────────────────
/// 표식이 **사슬에 흡수되는** 시간(s). 도착하면 이만큼에 걸쳐 사라지고
/// 그 자리를 확정본의 탄착 마디가 이어받는다.
const FSMKOUT = .20;
/// 바닥에 눕는 정도(세로 눌림) · 반지름(× 마디 반지름) · 돋는 서리 조각 수.
const FSMKSQ = .50, FSMKR = 2.60, FSMKN = 6;

// ── 갈릴 때 튀는 조각 (확정본 `emit` 대신 — 난수 0) ───────────────────────
/// 한 대에 튀는 조각 수(맞았을 때 / 빈 자리를 쳤을 때) · 수명(s) ·
/// 속도(238/s) · 중력(238/s²) · 뒤로 퍼지는 각(rad).
const FSCN = 3, FSCN0 = 2, FSCL = .34, FSCV = 46, FSCVR = 52, FSCG = 210, FSCS = 2.1;
/// 폭발이 흩는 조각 수 · 수명(s) · 속도(238/s).
const FSBN = 9, FSBL = .52, FSBV = 96, FSBVR = 84;
/// 빈 자리를 쳤을 때 탄착 마디의 세기(맞았을 때 = 1). **탕 ↔ 텅**이 여기서 갈린다.
const FSDRY = .52;

// ── 적 다섯 — **움직인다** ────────────────────────────────────────────────
// ⚠️ 확정본 `SCFOE` 는 붙박이 다섯이라 「지나가는 적」을 못 보여 준다. 여기서는
//   자리마다 셋을 다 보이게 배치를 다시 짰다. 길은 전부 **주기의 정수배 사인**
//   이라 주기 끝과 처음이 같은 값이다(난수 0 · 이음매 0).
// [x, y, r, 진폭, 방향x, 방향y, 각속도배수, 기준슬롯|null, 위상]
//   각속도 = 배수 × 2π/FSPER 라 **주기당 정수 바퀴**다(이음매 0).
//   기준슬롯이 있으면 그 발의 **도착 시각에 진폭 0**(= 정확히 그 자리에 선다).
const FSFOE = [
  // ① 자리 ①에 서 있는 놈. 자리 중심에서 14.14 → 겉면까지 3.14 ≤ 7.56 → **갈린다**
  [-50,-82,11,  0,  0 ,  0 , 0, null, 0],
  // ② 자리 ②를 **지나가는 놈**. 두 번째 발이 도착하는 그 순간 정확히 자리에 있다.
  //    걸리는 창 = 54·|sin| ≤ 16.56 → ±0.208초 ⇒ 연타 **0·1 만 맞고 2부터 빈다.**
  //    ⚠️ 진폭 38 로는 **폭발을 못 벗어난다** — 폭발 판정은 중심거리가 아니라
  //      **겉면까지**라(`d - f.r > SCBR`) 유효 반경이 32+9 = **41** 이다.
  //      54 라야 빙결 시각에 43.6(겉면 34.6) 으로 **밖에 선다.**
  [ 52,-58, 9, 54, .94, -.34, 2,    1, 0],
  // ③ 자리 ①에서 28.2 · 자리 ③에서 23.3 — **둘 다 반경 32 안**이라 두 번 언다.
  //    겉면까지는 19.2 / 14.3 이라 **한 번도 안 갈린다**(경계가 읽힌다).
  [-14,-90, 9,  7, -.90, -.44, 1, null, 0],
  // ④ 자리 ①에서 31.24 → **언다**. 겉면까지 21.24 → 안 갈린다.
  [-64,-52,10,  0,  0 ,  0 , 0, null, 0],
  // ⑤ 어느 자리에서도 멀다 — 세 번 다 **아무 일도 안 일어나는** 대조군.
  [ 74,-96, 9, 12, -.80,  .60, 1, null, 0]];

/// 자리까지의 거리 → 비행 시간(s). 총구(`SCMUZ`)에서 재므로 확정본과 같은 눈금이다.
/// 자리 ①(82.46)에서 `.3013` — 확정본 `SCFLY`(.30)와 **0.4% 차이**다.
const FSfly = (d,r0)=>(d-r0)/FSSPD;

/// 뒤끝 정리 램프 — 1 → 0. 끝이 평평한 매끈 계단이라 미분이 양 끝에서 0 이다.
function FSz(s){
  const v=(s-FSTH0)/(FSTH1-FSTH0);
  return v<=0?1:(v>=1?0:1-v*v*(3-2*v));
}

/// 적 [i] 가 시각 [tau] 에 서 있는 자리(238 단위). **길은 전부 사인 하나**다.
function FSfoeAt(i,tau,arr){
  const F=FSFOE[i], A=F[3];
  if(!A)return [F[0],F[1]];
  const w=F[6]*TAU/FSPER;                       // 주기당 정수 바퀴 → 이음매 0
  const ph=(F[7]===null)?tau:(tau-(FSSLOT*F[7]+arr[F[7]]));
  const o=A*Math.sin(w*ph+F[8]);
  return [F[0]+F[4]*o,F[1]+F[5]*o];
}

// ── ⭐ 스케줄 하나 — 그리기와 검산이 **같은 함수**를 본다 ─────────────────
// ⚠️⚠️ 그리기 쪽과 검산 쪽에 식을 따로 두면 그날로 갈라진다. 그리는 값을
//   여기서만 만들고 `FSDBG` 로도 같은 함수를 내보낸다(1ms 훑기가 실제 코드
//   경로를 잰다).
// 인자는 **전부 px 로 환산된 뒤**(×SC) 들어온다.
function FSsched(tau,CD,GAP,R0,N){
  const k=Math.min(2,Math.floor(tau/FSSLOT));   // 몇 번째 발인가
  const s=tau-k*FSSLOT;                         // 슬롯 안 시각
  const FLY=FSfly(CD,R0);
  const TA=FSTELE+FLY;                          // 도착 시각(슬롯 안)
  const q=s-TA;                                 // 도착 뒤 경과
  const o={k,s,FLY,TA,q,hp:0,gone:0,mark:0,amb:0,z:FSz(s),boom:-1};
  // ① 자리 표식 — 예고에 돋고, 도착하면 사슬에 흡수된다
  o.mark=(q<0)?Math.min(1,s/FSTELE):Math.max(0,1-q/FSMKOUT);
  // ② 사슬 — 총구에서 자리까지. 가속(1.55승)은 확정본 그대로다
  if(s<FSTELE){o.hp=R0;o.amb=0;return o;}
  if(q<0){o.hp=R0+(CD-R0)*Math.pow((s-FSTELE)/FLY,1.55);
          o.amb=Math.min(1,(s-FSTELE)/FSAMBIN);return o;}
  // ③ 자리에 박혀 갈린다 — 확정본과 **한 값도 안 다르다**
  o.hp=CD+GAP*(q/SCHIT);
  o.gone=Math.min(N,Math.floor(q/SCHIT)+1);
  o.amb=Math.min(1,(s-FSTELE)/FSAMBIN)*
        Math.max(0,Math.min(1,(TA+N*SCHIT+.30-s)/.30));
  // ④ 얼음 폭발 — 마지막 마디가 부서진 뒤. 넉백 → (0.22초) → 빙결
  if(q>=(N-1)*SCHIT)o.boom=q-(N-1)*SCHIT;
  return o;
}

// ══════════════════════════════════════════════════════════════════════════
Object.assign(FX,{
/// 서리결정 — **자리에 박고 그 자리에서 터진다.**
FSspot(c,t,dt,W,H,st){const cx=W/2,cy=H/2,SC=Math.min(W,H)/238;
  const N=SCN[LV-1], RAD=SCRAD[LV-1]*SC, GAP=RAD*SCGAPM, BOOM=SCBOOM[LV-1];
  const BR=SCBR*SC, R0=SCMUZ*SC, GLW=6*SC, EMG=RAD*FSEMG;
  const BITE=RAD*FSBITE;
  if(!st.F){                                    // 적 다섯 — `mgInit` 과 같은 모양
    st.F=FSFOE.map(v=>({hx:v[0]*SC,hy:v[1]*SC,ox:0,oy:0,r:v[2]*SC,
      hit:0,kx:0,ky:0,burn:0,pv:0,frz:0,fx:0,fy:0,mk:0}));
    // 자리마다 거리·각·도착 시각. **한 번만** 잰다.
    st.SP=FSSPOT.map(p=>{const d=Math.hypot(p[0],p[1])*SC;
      return {x:p[0]*SC,y:p[1]*SC,d,a:Math.atan2(p[1],p[0]),
              ta:FSTELE+FSfly(d,R0)};});
    st.arr=st.SP.map(p=>p.ta);}
  const SP=st.SP;

  const u=saw(t,FSPER),pu=(st.pu===undefined?u:st.pu);st.pu=u;
  const tau=u*FSPER;
  const P=SP[Math.min(2,Math.floor(tau/FSSLOT))];
  const S=FSsched(tau,P.d,GAP,R0,N);
  const ca=Math.cos(P.a), sa=Math.sin(P.a), z=S.z;
  const sx=cx+P.x, sy=cy+P.y;                   // 자리 — 화면 좌표
  // 슬롯이 바뀌었다 — 앞 발의 셈을 되돌린다. ⚠️ 이때 `z` 는 이미 0 이라
  //   **화면에서는 아무것도 안 바뀐다**(램프가 먼저 다 지웠다).
  if(st.k!==S.k){st.k=S.k;st.n=0;st.im=[];st.ch=[];st.bp=0;st.tgt=null;
    for(const f of st.F){f.pv=0;f.frz=0;f.kx=0;f.ky=0;f.mk=0;f.hit=0;}}
  // ⭐ **주기에 못 박은 시각.** 확정본이 절대 시각 `t` 로 돌리는 두 층(영웅
  //   호흡 · 적 실루엣 요동)을 그대로 두면 그림이 주기마다 달라진다. 한 칸이
  //   **완전한 고리**라야 세 경우를 같은 조건으로 견준다.
  //   sin(tp·2) 는 주기당 2바퀴 · sin(th·2.2) 는 2바퀴 — 둘 다 정수다.
  const tp=tau*TAU/FSPER, th=tau*(TAU*2/2.2)/FSPER;

  // ── 적 — 길을 따라 걷고, 언 놈은 선다 ───────────────────────────────────
  const wob=TAU*2*tau/FSPER;                    // 주기당 두 번 (확정본 1.35 rad/s ≈ 1.496)
  for(let i=0;i<st.F.length;i++){const f=st.F[i];
    const p=FSfoeAt(i,tau,st.arr);
    const px=p[0]*SC, py=p[1]*SC;
    if(f.frz){                                  // 언 놈은 **그 자리에 붙든다**
      // 램프가 풀리는 동안 제 길로 돌아간다 — 얼었던 자리에서 툭 튀지 않는다.
      f.hx=f.fx*z+px*(1-z); f.hy=f.fy*z+py*(1-z);
      const d=Math.pow(.02,dt);f.kx*=d;f.ky*=d;}
    else{f.hx=px;f.hy=py;
      const d=Math.pow(.86,dt*60);f.kx*=d;f.ky*=d;}
    const hold=f.frz?z:0;
    f.ox=f.hx+(1-hold)*Math.sin(wob+f.hx*.07)*3.2*SC;
    f.oy=f.hy+(1-hold)*Math.cos(wob+f.hy*.05)*2.4*SC;
    // 상태 표식은 **대입**이다(누적이 아니다) — 램프가 정확히 0 을 만든다.
    f.pv=(f.frz?2.4:Math.min(1,f.mk/N)*2.4)*z;
    // 연타 번쩍이 뭉치는 것을 푼다(확정본 머리 주석 ㉡: 기본 감쇠 dt*5 는
    // 연타 간격 0.125 보다 길어 열한 번이 한 번의 긴 번쩍으로 뭉친다).
    // ⚠️⚠️ **갈리는 놈만** 더 떨군다 — 확정본이 못 박은 자리다: 「다른 적까지
    //   떨구면 폭발의 넉백 번쩍이 같이 짧아져 두 사건이 붙어 보인다」.
    //   처음엔 다섯 다 13.3 을 먹였다가 이 주석을 다시 읽고 되돌렸다.
    f.hit=Math.max(0,f.hit-dt*(f===st.tgt?13.3:5));}

  // ── 갈린다 — **자리에 걸린 놈이 있으면 그 놈이, 없으면 아무도 안** ──────
  while(st.n<S.gone){
    // 자리 중심에서 겉면까지가 제일 가까운 놈 하나. 확정본의 「처음 맞은 적」이
    // 선 판정에서 **점 판정**으로 옮겨온 자리다.
    let best=null,bd=1e9;
    for(const f of st.F){const d=Math.hypot(f.hx-P.x,f.hy-P.y)-f.r;
      if(d<=BITE&&d<bd){bd=d;best=f;}}
    if(best){best.hit=1;best.kx+=ca*2.6*SC;best.ky+=sa*2.6*SC;best.mk++;st.tgt=best;}
    st.im.push({l:0,s:hash(st.n*7.3+LV)*40,h:best?1:0});
    // 조각 — 뒤로 튄다. 맞았으면 셋, 빈 자리면 둘. **난수 0**(전부 `hash` 표)
    const cn=best?FSCN:FSCN0;
    for(let j=0;j<cn;j++)st.ch.push({b:S.q,x:P.x,y:P.y,
      a:P.a+Math.PI+(hash(st.n*5.1+j*2.7)-.5)*FSCS,
      v:(FSCV+FSCVR*hash(st.n*3.3+j*1.9))*SC,
      r:(1.5+1.3*hash(st.n*8.7+j*4.1))*SC,m:FSCL,g:FSCG*SC,h:best?1:0});
    st.n++;}

  // ── 얼음 폭발 — L4·L5. **자리에서** 터진다. 넉백 → (0.22초) → 빙결 ──────
  if(BOOM&&S.boom>=0){
    if(!st.bp){st.bp=1;                         // ① 넉백 — 자리에서 밀어낸다
      for(const f of st.F){const dx=f.hx-P.x,dy=f.hy-P.y,d=Math.hypot(dx,dy)||1;
        if(d-f.r>SCBR)continue;
        f.hit=1;f.kx+=dx/d*12*SC;f.ky+=dy/d*12*SC;}
      for(let j=0;j<FSBN;j++)st.ch.push({b:S.boom,x:P.x,y:P.y,
        a:hash(j*3.7+LV)*TAU,v:(FSBV+FSBVR*hash(j*6.1))*SC,
        r:(2.0+1.8*hash(j*4.9))*SC,m:FSBL,g:70*SC,h:1,bo:1});}
    if(S.boom>=SCFRZ&&st.bp===1){st.bp=2;       // ② 빙결 — **그러고 나서** 언다
      for(const f of st.F){if(Math.hypot(f.hx-P.x,f.hy-P.y)-f.r>SCBR)continue;
        f.frz=1;f.fx=f.hx;f.fy=f.hy;}}}
  if(z<=0)for(const f of st.F)f.frz=0;           // 램프가 끝나면 녹는다

  for(let i=st.im.length-1;i>=0;i--){const q=st.im[i];q.l+=dt;
    if(q.l>=SCTICK)st.im.splice(i,1);}

  // ══ 그리기 ═══════════════════════════════════════════════════════════════
  // ① **자리 표식** — 바닥에 서리가 먼저 돋는다. ⚠️ 판정 안내선이 아니다:
  //   부채꼴도 점선도 반경 원도 아니고, **각진 서리 자국**이 눌려 누워 있다.
  if(S.mark>.01){const m=S.mark, br=1+.07*Math.sin(tp*3);
    // ⚠️ 첫 굽기에서 **거의 안 보였다**(알파 .34/.58) — 「저기를 노린다」가
    //   안 읽히면 이 연출은 있으나 마나다. 두 겹으로 깔고 알파를 올렸다.
    IBroot(c,sx,sy,RAD*FSMKR*(.85+.35*m),"frost",.62*m,.42);
    IBrim(c,jagPoly(sx,sy,RAD*FSMKR*br*(.62+.38*m),9,4.3,1.05,FSMKSQ),
      "frost",.95*m,1.7*SC);
    IBrim(c,jagPoly(sx,sy,RAD*FSMKR*br*(.34+.20*m),9,8.9,1.02,FSMKSQ),
      "frost",.62*m,1.1*SC);
    for(let i=0;i<FSMKN;i++){const a0=i/FSMKN*TAU+1.1;
      const d=RAD*FSMKR*(.58+.34*hash(i*3.1));
      IBshard(c,sx+Math.cos(a0)*d,sy+Math.sin(a0)*d*FSMKSQ,
        (1.7+1.6*hash(i*5.3))*SC*m,a0+.6,"frost",.88*m,.5);}}

  // ④ 갈린 자리에 쌓이는 지면 파편 · ③ 자란 자리의 흰 발광 (확정본 그대로)
  if(st.n>0&&z>.01){
    IBroot(c,sx,sy+RAD*.2,RAD*(1.6+.10*st.n),"frost",.62*(st.n<N?1:.5)*z,.32);
    shards(c,sx,sy+RAD*.5,Math.max(1,RAD*(1.0+.16*st.n)),
      Math.min(9,3+st.n),LV*3.1,.45*z,"frost");}
  // 총구의 흰 발광 — 나가는 동안만. 켜고 끄기는 램프(`amb`)를 탄다.
  if(S.amb>.01)IBroot(c,cx+ca*GLW,cy+sa*GLW,RAD*1.5,"frost",.40*S.amb,.34);

  mgMarks(c,tp,cx,cy,st.F,"frost","frost",SC);

  // ㉣ 누적 성에 — **맞은 수만큼** 그 몸에 박힌다. 맞은 놈이 없으면 하나도 없다.
  if(z>.01)for(const f of st.F){if(!f.mk)continue;
    const bx=cx+f.ox+f.kx,by=cy+f.oy+f.ky;
    for(let i=0;i<f.mk;i++){const a0=P.a+(i%2?1:-1)*(.55+i*.30);
      const d=f.r*(.86+.12*hash(i*5.1));
      IBshard(c,bx+Math.cos(a0)*d,by+Math.sin(a0)*d,
        RAD*(.42+.10*hash(i*3.3)),a0+1.1,"frost",.92*z,.46);}}

  // ── ① 사슬 — 묶인 마디. 앞에서부터 줄어든다 (확정본 그대로) ─────────────
  let py=null,pxx=0,pr=0,pa=1,minA=1;
  const LFT=[],RGT=[];
  for(let i=st.n;i<N;i++){
    const d=S.hp-i*GAP; if(d<SCMUZ*SC)continue;  // 아직 몸에서 안 나왔다
    const head=(i===st.n);
    const x=cx+ca*d, y=cy+sa*d, r=RAD*(head?1.12:1);
    const a=Math.min(1,(d-SCMUZ*SC)/EMG);        // 몸을 벗어난 만큼만 진해진다
    if(a<=.01)continue;
    minA=Math.min(minA,a);
    dep(c,y,cy,(cc,dz)=>{
      const Q=[];for(let q=0;q<7;q++){const a0=q/7*TAU+i*.9;
        const rr=r*(.80+.34*hash(i*4.7+q*3.1));
        Q.push([x+Math.cos(a0)*rr,y+Math.sin(a0)*rr*1.22]);}
      IBcrys(cc,Q,"frost",dz*a*(head?1:.88),i*4.7+LV,
        {mos:2,thru:.92,w:1.15*SC,grain:P.a});});
    if(py!==null){                               // ㉠ 이음매 — 묶인 자리.
      // 확정본은 위쪽 고정이라 가로선 하나였다(`[cx±mr, my]`). 축이 돌면
      // **진행축의 법선** (-sa, ca) 위에 놓이는 이 식이 정확히 그 자리로 온다.
      const my=(y+py)*.5,mx=(x+pxx)*.5,mr=Math.min(r,pr)*.92,ma=Math.min(a,pa);
      dep(c,my,cy,(cc,dz)=>{
        IBline(cc,[[mx+sa*mr,my-ca*mr],[mx-sa*mr,my+ca*mr]],
          1.0*SC,"frost",.68*dz*ma,0);});}
    LFT.push([x+sa*r,y-ca*r]);RGT.push([x-sa*r,y+ca*r]);
    py=y;pxx=x;pr=r;pa=a;}
  if(LFT.length>1)front((cc)=>{                  // 사슬을 옆에서 훑는 끈 둘
    IBline(cc,LFT,.7*SC,"frost",.34*minA,0);
    IBline(cc,RGT,.7*SC,"frost",.34*minA,0);});

  // 둘레의 마름모·반짝이 — **개수는 확정본과 같은 다섯**. 위상을 전부 주기에
  // 못 박았다(마름모는 회전 대칭이 π, 반짝이는 π/2 라 각각 π · 3π 로 맞춘다).
  if(S.amb>.01){const uu=tau/FSPER;
    for(let i=0;i<5;i++){const ph=tp+i*1.7;
      IBshard(c,cx+(hash(i*2.3)-.5)*RAD*5.2,
        cy-S.hp*(.18+.62*hash(i*6.1))-Math.abs(Math.sin(ph))*6*SC,
        (1.6+1.5*hash(i*5.1))*SC,ph*.5+i,"frost",.72*S.amb);}
    for(let i=0;i<5;i++){const ph=(uu*3+i*.37)%1;
      IBspark(c,cx+(hash(i*3.7)-.5)*RAD*4.6,cy-S.hp*hash(i*8.1),
        (2.0+1.4*hash(i*6.3))*SC,"frost",(.32+.62*Math.sin(ph*Math.PI))*S.amb,
        uu*Math.PI*3+i);}}

  // ── ㉢ 탄착 마디 — **탕 ↔ 텅.** 맞은 대는 진하고, 빈 자리를 친 대는 옅다 ──
  for(const q of st.im){const v=q.l/SCTICK,a=(1-v)*(q.h?1:FSDRY);
    IBrim(c,jagPoly(sx,sy,RAD*(1.0+2.2*v),9,q.s,1.08,.84),"frost",a*.88,
      1.5*SC*(1-v*.55));}

  // ── 조각 — 갈릴 때·터질 때 튄다. **난수 0**(자리·시각이 전부 표에서 나온다) ──
  for(const g of st.ch){
    const base=g.bo?S.boom:S.q, ts=base-g.b;
    if(ts<=0||ts>=g.m)continue;
    const w=ts/g.m;
    IBshard(c,sx+Math.cos(g.a)*g.v*ts, sy+Math.sin(g.a)*g.v*ts+.5*g.g*ts*ts,
      g.r*(1-.45*w),g.a+1.1,"frost",
      Math.min(1,w*9)*(1-w)*(g.h?.92:.62),.5);}

  // ── 얼음 폭발 — 퍼지는 테(넉백) → 오므라드는 테(빙결) (확정본 그대로) ────
  if(S.boom>=0&&BOOM){
    if(S.boom<SCFRZ){const v=Math.min(1,S.boom/SCKB);
      IBrim(c,jagPoly(sx,sy,BR*(.28+.80*v),11,5.7,1.10,.86),"frost",
        (1-v*.72),2.4*SC*(1-v*.55));
      IBroot(c,sx,sy,BR*(.5+.5*v),"frost",.55*(1-v),.40);}
    else{const v=Math.min(1,(S.boom-SCFRZ)/.30);
      IBrim(c,jagPoly(sx,sy,BR*(1.06-.44*v),11,9.1,1.04,.86),"frost",
        (1-v)*.95,2.6*SC*(1-v));
      // 언 놈마다 육각 눈송이 도장 — 「멈췄다」를 못 박는다
      if(v<1)for(const f of st.F){if(!f.frz)continue;
        IBflake(c,cx+f.ox+f.kx,cy+f.oy+f.ky,f.r*(1.05+.25*v),tp*.06,
          "frost",(1-v)*.85*z,1.0*SC,.9);}}}

  hero(c,th,cx,cy);
},
});

// ── 검산용 창구 — 그리기와 **같은 함수**를 내보낸다 ───────────────────────
window.FSDBG={sched:FSsched,z:FSz,foeAt:FSfoeAt,fly:FSfly,
  K:{FSSLOT,FSPER,FSTELE,FSSPD,FSSPOT,FSBITE,FSTH0,FSTH1,FSEMG,FSAMBIN,
     FSMKOUT,FSMKSQ,FSMKR,FSMKN,FSCN,FSCN0,FSCL,FSCV,FSCVR,FSCG,FSCS,
     FSBN,FSBL,FSBV,FSBVR,FSDRY,FSFOE}};

// ── 마운트 — **칸은 하나다** ──────────────────────────────────────────────
// ⚠️ 갈림이 없는 확정 설계라 고를 것이 없다. 세 경우는 한 주기 안에 다 든다.
// ⚠️ 호스트가 없는 장에서는 조용히 건너뛴다 — 채택되면 이 절을 걷고 빙 氷
//   캐릭터 장으로 옮긴다(「옮겼으면 고르기에서 지워야지」가 이 사이클의 고정 실패다).
{const H=document.getElementById("pkfspot");
 if(H)tile(H,FX,"FSspot","자리에 박고 그 자리에서 터진다","",
   "사슬이 <b>고른 자리</b>로 날아가 <b>거기에 박히고</b>, <b>그 자리에서</b> 열한 마디가 갈린 뒤 <b>그 자리에서</b> 터진다 — 적을 안 따라간다. "+
   "<b>그 자리를 지나가는 적은 맞고</b>, 피하거나 없으면 <b>빈 자리를 치고 그대로 터진다</b>. 한 주기(<b>8.4초</b>)에 세 경우가 다 나온다",
   236,236,undefined,5);}
