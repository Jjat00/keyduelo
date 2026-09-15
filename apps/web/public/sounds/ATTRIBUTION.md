# Créditos de los sonidos de teclado

Los archivos `cherry.wav`, `dsa.wav`, `kat.wav`, `mt3.wav`, `oem.wav`, `sa.wav`,
`xda.wav` y `sprites.json` provienen de **Kliq** — https://github.com/crafter-station/kliq
(diseño de sonido por Cris, Crafter Station), publicado bajo licencia MIT.

Cada `.wav` es un *audio sprite*: los samples de press (`down`) y release (`up`)
de cada tecla, convertidos a 24 kHz mono 16-bit y concatenados. `sprites.json`
guarda, por perfil y por tecla, el offset y la duración de cada segmento en
segundos: `{ "<set>": { "<key>": { "down": [offset, dur], "up": [offset, dur] } } }`.

Fueron generados con `Tools/make_web_sounds.py` del repo original a partir de
`Resources/Sounds/`. Para regenerarlos hay que clonar kliq y correr `make web-sounds`.

---

MIT License

Copyright (c) 2026 Crafter Station

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
