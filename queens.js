const w = 40;
const pad = 30;
const qo = (w - 24) / 2;
const xo = w / 2;
const gap = 1;
const colors = [
  "#bba3e2",
  "#ffc992",
  "#96beff",
  "#b3dfa0",
  "#dfdfdf",
  "#dfa0bf",
  "#a3d2d8",
  "#ff7b60",
  "#e6f388",
  "#b9b29e",
  "#62efea",
  "#ff93f3",
  "#8acc6d",
  "#729aec",
  "#c387e0",
  "#ffe04b",
];
const colorErr = "#cb112d";

function generateQueensDiagram(lines) {
  const n = lines.length;
  const gw = n * w + (n + 1) * gap;
  const tw = gw + 2 * pad;
  let res = `<svg class="queen" width="${tw}" height="${tw}" viewBox="0 0 ${tw} ${tw}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <g id="q"><path d="M23.25 7C23.25 7.69 22.69 8.25 22 8.25C21.89 8.25 21.78 8.21 21.68 8.18L19 17.99H5L2.32 8.18C2.21 8.21 2.11 8.25 2 8.25C1.31 8.25 0.75 7.69 0.75 7C0.75 6.31 1.31 5.75 2 5.75C2.69 5.75 3.25 6.31 3.25 7C3.25 7.31 3.13 7.59 2.94 7.8L9 13L11.65 4.18C11.14 4.03 10.75 3.57 10.75 3C10.75 2.31 11.31 1.75 12 1.75C12.69 1.75 13.25 2.31 13.25 3C13.25 3.56 12.87 4.02 12.35 4.18L15 13L21.06 7.8C20.87 7.58 20.75 7.31 20.75 7C20.75 6.31 21.31 5.75 22 5.75C22.69 5.75 23.25 6.31 23.25 7ZM19 19H5C4.45 19 4 19.45 4 20C4 20.55 4.45 21 5 21H19C19.55 21 20 20.55 20 20C20 19.45 19.55 19 19 19Z"></path></g>
    <g id="x"><path d="M -3 -3 L 3 3 Z M -3 3 L 3 -3 Z"></path></g>
  </defs>
  <rect x="${pad}" y="${pad}" width="${gw}" height="${gw}" rx="4" />`;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const color = lines[r].charCodeAt(c * 2) - 97;
      const x = gap + c * (w + gap);
      const y = gap + r * (w + gap);
      res += `<rect x="${pad + x}" y="${pad + y}" width="${w}" height="${w}" fill="${colors[color]}" />`;
      if (lines[r][c * 2 + 1] === "q") {
        res += `<use x="${pad + x + qo}" y="${pad + y + qo}" href="#q" fill="#000" />`;
      } else if (lines[r][c * 2 + 1] === "Q") {
        res += `<use x="${pad + x + qo}" y="${pad + y + qo}" href="#q" fill="${colorErr}" />`;
      } else if (lines[r][c * 2 + 1] === "x") {
        res += `<use x="${pad + x + xo}" y="${pad + y + xo}" href="#x" stroke="#000" />`;
      } else if (lines[r][c * 2 + 1] === "X") {
        res += `<use x="${pad + x + xo}" y="${pad + y + xo}" href="#x" stroke="${colorErr}" />`;
      }

      if (c > 0 && lines[r][c * 2] !== lines[r][c * 2 - 2]) {
        res += `<line x1="${pad + x - .5}" y1="${pad + y}" x2="${pad + x - .5}" y2="${pad + y + w}" stroke="#000" stroke-width="2" stroke-linecap="round"/>`;
      }
      if (r > 0 && lines[r][c * 2] !== lines[r - 1][c * 2]) {
        res += `<line x1="${pad + x}" y1="${pad + y - .5}" x2="${pad + x + w}" y2="${pad + y - .5}" stroke="#000" stroke-width="2" stroke-linecap="round"/>`;
      }
    }
  }
  res += `<rect x="${pad}" y="${pad}" width="${gw}" height="${gw}" rx="4" fill="none" stroke="#000" stroke-width="3" />`;
  for (let i = 0; i < n; i++) {
    res += `<text x="${pad + gap + i * (w + gap) + w / 2}" y="${pad + (w + gap) * n + w / 2}" text-anchor="middle" alignment-baseline="middle">${String.fromCharCode(97 + i)}</text>`;
    res += `<text x="${pad / 2}" y="${pad + gap + i * (w + gap) + w / 2}" text-anchor="middle" alignment-baseline="middle">${n - i}</text>`;
  }
  res += "</svg>";
  return res;
}

module.exports = function (registry) {
  registry.block(function () {
    const self = this;
    self.named("queens");
    self.onContext("paragraph");
    self.process(function (parent, reader) {
      const lines = reader.getLines();
      const content = generateQueensDiagram(lines);
      const html = `<div class="queens">${content}</div>`;
      return self.createBlock(parent, "pass", html);
    });
  });
};