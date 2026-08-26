# 이펙트 텍스처 출처

여기 있는 PNG 18장은 전부 **CC0**(퍼블릭 도메인에 준함 — 상업 이용 자유,
출처 표기 의무 없음)다. 출처 표기 의무는 없지만 CC0라도 어디서 왔는지
기록이 없으면 나중에 재발급·재편집이 필요할 때 못 찾는다.

## Kenney 알갱이 9장

`kenney_circle` · `kenney_fire` · `kenney_flame` · `kenney_light` ·
`kenney_magic` · `kenney_smoke` · `kenney_spark` · `kenney_star` ·
`kenney_twirl`

- 출처: [Kenney.nl](https://kenney.nl/) — "Particle Pack"
- 라이선스: CC0
- 원본은 실제 알파 채널을 갖는다(그레이스케일 RGB가 알파와 거의 같이
  움직인다) — `game/fx_texture_load.dart`가 그대로 쓴다.

## 마스크 5장

`mask_beam_vertical` · `mask_crystal_flower` · `mask_crystal_mandala` ·
`mask_glow_soft` · `mask_ring_double`

- 출처: [OpenGameArt](https://opengameart.org/) — jellyfish0, "Masks for
  particles"
- 라이선스: CC0
- 원본은 알파 채널이 없거나(RGB만) 있어도 항상 255(불투명 그레이스케일)다 —
  휘도를 알파로 펴서 쓴다(`render/atlas/fx_tex_prep.dart`).

## 노이즈 4장

`noise_grainy` · `noise_spokes` · `noise_streak` · `noise_vein`

- 출처: [OpenGameArt](https://opengameart.org/) — Screaming Brain Studios,
  "700+ Noise Textures"
- 라이선스: CC0
- 마스크 5장과 같은 이유로 휘도를 알파로 편다 — 알파 채널은 있지만 항상
  255다.
