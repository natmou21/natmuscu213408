/* Muscu – schéma du corps (SVG). En mode « modifiable », chaque muscle est cliquable. */
(function (M) {
  'use strict';

  function P(x, y, w, h, a, c, m) {
    return { x: x, y: y, w: w, h: h, a: a || 0, c: c == null ? null : c, m: m === undefined ? true : m };
  }

  var SIL = [
    P(100, 28, 36, 42, 0, null, false),
    P(100, 58, 18, 18, 0, 6, false),
    P(100, 130, 88, 130, 0, 34, false),
    P(100, 208, 76, 44, 0, 20, false),
    P(50, 118, 24, 80, 4, 12),
    P(40, 187, 20, 76, 3, 10),
    P(36, 236, 16, 22),
    P(78, 292, 38, 142, 0, 19),
    P(78, 380, 28, 80, 0, 14)
  ];

  var FRONT = {
    chest: [P(80, 98, 40, 34, 8)],
    frontDelts: [P(63, 84, 20, 26)],
    sideDelts: [P(54, 88, 14, 28)],
    biceps: [P(51, 112, 18, 40, 4)],
    forearms: [P(40, 185, 15, 64, 3)],
    abs: [P(100, 142, 32, 78, 0, 10, false)],
    obliques: [P(72, 150, 13, 56, -6)],
    traps: [P(100, 72, 44, 16, 0, null, false)],
    quads: [P(77, 283, 32, 94)],
    adductors: [P(91, 275, 10, 56)],
    calves: [P(78, 380, 22, 50)]
  };

  var BACK = {
    traps: [P(100, 88, 56, 38, 0, null, false)],
    upperBack: [P(100, 120, 42, 26, 0, 12, false)],
    lats: [P(76, 140, 26, 64, -8)],
    lowerBack: [P(100, 180, 34, 32, 0, 12, false)],
    rearDelts: [P(63, 84, 20, 26)],
    sideDelts: [P(54, 88, 14, 28)],
    triceps: [P(50, 116, 18, 44, 4)],
    forearms: [P(40, 185, 15, 64, 3)],
    glutes: [P(84, 212, 36, 38)],
    hamstrings: [P(78, 285, 34, 92)],
    calves: [P(78, 380, 24, 50)]
  };

  function shape(p, cls, attrs) {
    var spots = p.m ? [[p.x, p.a], [200 - p.x, -p.a]] : [[p.x, p.a]];
    return spots.map(function (s) {
      var cx = s[0], a = s[1];
      var rot = a ? ' transform="rotate(' + a + ' ' + cx + ' ' + p.y + ')"' : '';
      if (p.c == null) {
        return '<ellipse class="' + cls + '"' + attrs + ' cx="' + cx + '" cy="' + p.y + '" rx="' + p.w / 2 + '" ry="' + p.h / 2 + '"' + rot + '/>';
      }
      return '<rect class="' + cls + '"' + attrs + ' x="' + (cx - p.w / 2) + '" y="' + (p.y - p.h / 2) + '" width="' + p.w + '" height="' + p.h + '" rx="' + p.c + '"' + rot + '/>';
    }).join('');
  }

  /* primary / secondary : Set d'identifiants de muscles. opts : { cls, editable } */
  M.bodySVG = function (primary, secondary, side, opts) {
    opts = opts || {};
    var layout = side === 'front' ? FRONT : BACK;
    var layers = [];
    M.MUSCLES.forEach(function (m) {
      var lv = primary.has(m.id) ? 2 : secondary.has(m.id) ? 1 : 0;
      (layout[m.id] || []).forEach(function (p) { layers.push({ p: p, lv: lv, id: m.id }); });
    });
    layers.sort(function (a, b) { return a.lv - b.lv; });
    var label = 'Schéma du corps, vue ' + (side === 'front' ? 'de face' : 'de dos');
    return '<svg class="body ' + (opts.cls || '') + (opts.editable ? ' ed' : '') + '" viewBox="0 0 200 420" role="img" aria-label="' + label + '">' +
      SIL.map(function (p) { return shape(p, 'sil', ''); }).join('') +
      layers.map(function (l) {
        var attrs = opts.editable ? ' data-a="mtoggle" data-m="' + l.id + '"' : '';
        return shape(l.p, 'lv' + l.lv, attrs);
      }).join('') +
      '</svg>';
  };

})(window.MU = window.MU || {});
