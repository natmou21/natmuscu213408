/* Muscu – suivi de séances de musculation (application web, sans dépendance). */
(function () {
  'use strict';

  var $app = document.getElementById('app');

  /* ------------------------------------------------------------------ */
  /* Utilitaires                                                         */
  /* ------------------------------------------------------------------ */

  var MUSCLE = {};
  MUSCLES.forEach(function (m) { MUSCLE[m.id] = m; });
  var EX = {};
  EXERCISES.forEach(function (e) { EX[e.id] = e; });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function norm(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }
  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }
  function fmt(n) {
    return String(Math.round(n * 100) / 100).replace('.', ',');
  }
  function muscleNames(ids) {
    return ids.map(function (i) { return MUSCLE[i].name; }).join(', ');
  }
  function clampInt(v, min, max, fallback) {
    var n = Math.round(Number(v));
    if (!isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  }
  function safeId(v) {
    return typeof v === 'string' && /^[\w-]{1,40}$/.test(v) ? v : uid();
  }
  function sideOf(exId) {
    var e = EX[exId];
    return e && e.primary[0] ? MUSCLE[e.primary[0]].side : 'front';
  }

  /* ------------------------------------------------------------------ */
  /* Données (enregistrées sur l'appareil)                               */
  /* ------------------------------------------------------------------ */

  var KEY = 'muscu.v1';

  function sanitize(d) {
    if (!d || !Array.isArray(d.workouts)) return null;
    var out = { workouts: [] };
    d.workouts.forEach(function (w) {
      if (!w || typeof w.name !== 'string' || !Array.isArray(w.items)) return;
      out.workouts.push({
        id: safeId(w.id),
        name: w.name.slice(0, 80) || 'Séance',
        createdAt: Number(w.createdAt) || Date.now(),
        items: w.items
          .filter(function (i) { return i && typeof i.exerciseId === 'string'; })
          .map(function (i) {
            return {
              id: safeId(i.id),
              exerciseId: i.exerciseId,
              sets: clampInt(i.sets, 1, 20, 3),
              reps: clampInt(i.reps, 1, 100, 10),
              weight: Math.max(0, Number(i.weight) || 0)
            };
          })
      });
    });
    return out;
  }

  function load() {
    try {
      var d = sanitize(JSON.parse(localStorage.getItem(KEY)));
      if (d) return d;
    } catch (e) { /* données absentes ou illisibles */ }
    return { workouts: [] };
  }

  var data = load();

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) { /* stockage indisponible */ }
  }

  function curW() {
    return data.workouts.find(function (w) { return w.id === ui.workoutId; });
  }

  /* ------------------------------------------------------------------ */
  /* État de l'interface                                                 */
  /* ------------------------------------------------------------------ */

  var ui = {
    tab: 'workouts',          // 'workouts' | 'library'
    workoutId: null,
    lib: { muscle: null, q: '' },
    picker: null,             // { mode:'add'|'replace', wid, itemId, muscle, q, added:Set }
    detail: null,             // { exId, side, action:null|'add'|'replace' }
    menu: null,               // { title, actions:[{label, danger, fn}] }
    modal: null,              // { title, message, input, okLabel, danger, noCancel, onOk }
    fresh: null               // couche qui vient d'apparaître (pour l'animation)
  };

  /* ------------------------------------------------------------------ */
  /* Schéma du corps (SVG)                                               */
  /* ------------------------------------------------------------------ */

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

  function shape(p, cls) {
    var spots = p.m ? [[p.x, p.a], [200 - p.x, -p.a]] : [[p.x, p.a]];
    return spots.map(function (s) {
      var cx = s[0], a = s[1];
      var rot = a ? ' transform="rotate(' + a + ' ' + cx + ' ' + p.y + ')"' : '';
      if (p.c == null) {
        return '<ellipse class="' + cls + '" cx="' + cx + '" cy="' + p.y + '" rx="' + p.w / 2 + '" ry="' + p.h / 2 + '"' + rot + '/>';
      }
      return '<rect class="' + cls + '" x="' + (cx - p.w / 2) + '" y="' + (p.y - p.h / 2) + '" width="' + p.w + '" height="' + p.h + '" rx="' + p.c + '"' + rot + '/>';
    }).join('');
  }

  function bodySVG(primary, secondary, side, cls) {
    var layout = side === 'front' ? FRONT : BACK;
    var layers = [];
    MUSCLES.forEach(function (m) {
      var lv = primary.has(m.id) ? 2 : secondary.has(m.id) ? 1 : 0;
      (layout[m.id] || []).forEach(function (p) { layers.push({ p: p, lv: lv }); });
    });
    layers.sort(function (a, b) { return a.lv - b.lv; });
    return '<svg class="body ' + (cls || '') + '" viewBox="0 0 200 420" role="img" aria-label="Schéma du corps, vue ' +
      (side === 'front' ? 'de face' : 'de dos') + '">' +
      SIL.map(function (p) { return shape(p, 'sil'); }).join('') +
      layers.map(function (l) { return shape(l.p, 'lv' + l.lv); }).join('') +
      '</svg>';
  }

  /* ------------------------------------------------------------------ */
  /* Icônes                                                              */
  /* ------------------------------------------------------------------ */

  var ICON = {
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></svg>'
  };

  /* ------------------------------------------------------------------ */
  /* Vue : liste des séances                                             */
  /* ------------------------------------------------------------------ */

  function workoutSubtitle(w) {
    if (!w.items.length) return 'Aucun exercice';
    var set = {};
    w.items.forEach(function (i) {
      var e = EX[i.exerciseId];
      if (e) e.primary.forEach(function (m) { set[m] = true; });
    });
    var names = MUSCLES.filter(function (m) { return set[m.id]; }).slice(0, 3).map(function (m) { return m.name; });
    var count = w.items.length === 1 ? '1 exercice' : w.items.length + ' exercices';
    return [count].concat(names).join(' · ');
  }

  function listScreen() {
    var body;
    if (!data.workouts.length) {
      body = '<div class="empty"><b>Aucune séance</b>Crée ta première séance, puis ajoute tes exercices.' +
        '<div><button class="cta" data-a="new">Créer une séance</button></div></div>';
    } else {
      body = data.workouts.map(function (w) {
        return '<div class="wcard">' +
          '<button class="main" data-a="openWorkout" data-w="' + w.id + '">' +
          '<span class="name">' + esc(w.name) + '</span>' +
          '<span class="sub">' + esc(workoutSubtitle(w)) + '</span></button>' +
          '<button class="more" data-a="wmenu" data-w="' + w.id + '" aria-label="Options de la séance">⋯</button>' +
          '</div>';
      }).join('');
    }
    return '<div class="content">' +
      '<div class="titlebar"><h1>Mes séances</h1><div class="acts">' +
      '<button class="icon-btn" data-a="backup" aria-label="Sauvegarde">⋯</button>' +
      '<button class="icon-btn" data-a="new" aria-label="Nouvelle séance">+</button></div></div>' +
      body + '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Vue : une séance                                                    */
  /* ------------------------------------------------------------------ */

  function statsOf(w) {
    var sets = 0, vol = 0;
    w.items.forEach(function (i) { sets += i.sets; vol += i.sets * i.reps * i.weight; });
    return { n: w.items.length, sets: sets, vol: Math.round(vol).toLocaleString('fr-FR') + ' kg' };
  }

  function summaryHTML(w) {
    var pri = new Set(), sec = new Set();
    w.items.forEach(function (i) {
      var e = EX[i.exerciseId];
      if (e) e.primary.forEach(function (m) { pri.add(m); });
    });
    w.items.forEach(function (i) {
      var e = EX[i.exerciseId];
      if (e) e.secondary.forEach(function (m) { if (!pri.has(m)) sec.add(m); });
    });
    var s = statsOf(w);
    return '<section class="card">' +
      '<div class="stats">' +
      '<div><b id="st-n">' + s.n + '</b><span>Exercices</span></div>' +
      '<div><b id="st-sets">' + s.sets + '</b><span>Séries</span></div>' +
      '<div><b id="st-vol">' + s.vol + '</b><span>Volume</span></div></div>' +
      '<div class="maps">' +
      '<figure>' + bodySVG(pri, sec, 'front') + '<figcaption>Face</figcaption></figure>' +
      '<figure>' + bodySVG(pri, sec, 'back') + '<figcaption>Dos</figcaption></figure></div>' +
      '<div class="legend"><span><i class="dot p"></i>Principal</span><span><i class="dot s"></i>Secondaire</span></div>' +
      '</section>';
  }

  function tile(label, it, field, dec, inc) {
    var val;
    if (field === 'weight') {
      val = '<input class="val" type="text" inputmode="decimal" autocomplete="off" data-a="weight" data-item="' + it.id +
        '" value="' + fmt(it.weight) + '" aria-label="Poids en kilogrammes">';
    } else {
      val = '<b class="val">' + it[field] + '</b>';
    }
    return '<div class="tile"><span class="lbl">' + label + '</span>' + val +
      '<div class="steps">' +
      '<button data-a="step" data-item="' + it.id + '" data-f="' + field + '" data-d="-1"' + (dec ? '' : ' disabled') + ' aria-label="Diminuer">−</button>' +
      '<button data-a="step" data-item="' + it.id + '" data-f="' + field + '" data-d="1"' + (inc ? '' : ' disabled') + ' aria-label="Augmenter">+</button>' +
      '</div></div>';
  }

  function itemCard(it) {
    var e = EX[it.exerciseId];
    var title = e ? e.name : 'Exercice inconnu';
    var sub = e ? muscleNames(e.primary) : '';
    return '<article class="card">' +
      '<div class="ex-head">' +
      '<button class="ex-title" data-a="info" data-ex="' + esc(it.exerciseId) + '"' + (e ? '' : ' disabled') + '>' +
      '<b>' + esc(title) + '</b><small>' + esc(sub) + '</small></button>' +
      '<button class="more" data-a="imenu" data-item="' + it.id + '" aria-label="Options de l\'exercice">⋯</button></div>' +
      '<div class="tiles">' +
      tile('Séries', it, 'sets', it.sets > 1, it.sets < 20) +
      tile('Répétitions', it, 'reps', it.reps > 1, it.reps < 100) +
      tile('Poids (kg)', it, 'weight', it.weight > 0, true) +
      '</div></article>';
  }

  function workoutScreen(w) {
    var inner;
    if (!w.items.length) {
      inner = '<div class="empty"><b>Aucun exercice</b>Ajoute des exercices pour construire ta séance.' +
        '<div><button class="cta" data-a="addEx">Ajouter un exercice</button></div></div>';
    } else {
      inner = summaryHTML(w) +
        '<h2 class="sec">Exercices</h2>' +
        w.items.map(itemCard).join('') +
        '<button class="cta ghost wide" data-a="addEx">+ Ajouter un exercice</button>';
    }
    return '<div class="bar">' +
      '<button class="back" data-a="backList">‹ Séances</button>' +
      '<h2 class="bar-title">' + esc(w.name) + '</h2>' +
      '<div class="bar-right"><button class="icon-btn" data-a="wmenu" data-w="' + w.id + '" aria-label="Options de la séance">⋯</button>' +
      '<button class="icon-btn" data-a="addEx" aria-label="Ajouter un exercice">+</button></div></div>' +
      '<div class="content">' + inner + '</div>';
  }

  /* ------------------------------------------------------------------ */
  /* Vue : bibliothèque d'exercices (onglet ou sélecteur)                */
  /* ------------------------------------------------------------------ */

  function chipsInner(ctx) {
    return '<button class="chip' + (!ctx.muscle ? ' on' : '') + '" data-a="chip" data-m="">Tous</button>' +
      MUSCLES.map(function (m) {
        return '<button class="chip' + (ctx.muscle === m.id ? ' on' : '') + '" data-a="chip" data-m="' + m.id + '">' + esc(m.name) + '</button>';
      }).join('');
  }

  function rowHTML(e, ctx, mode) {
    var btn = '';
    if (mode === 'add') {
      var done = ctx.added && ctx.added.has(e.id);
      btn = '<button class="add' + (done ? ' done' : '') + '" data-a="pick" data-ex="' + e.id + '"' + (done ? ' disabled' : '') +
        ' aria-label="Ajouter à la séance">' + (done ? '✓' : '+') + '</button>';
    } else if (mode === 'replace') {
      btn = '<button class="pill" data-a="pick" data-ex="' + e.id + '">Choisir</button>';
    }
    return '<div class="row" data-a="open" data-ex="' + e.id + '">' +
      '<div class="row-main"><span class="row-name">' + esc(e.name) + '</span>' +
      '<span class="row-sub">' + esc(e.equipment) + ' · ' + esc(muscleNames(e.primary)) + '</span></div>' +
      btn + '<span class="chev" aria-hidden="true">›</span></div>';
  }

  function listInner(ctx, mode) {
    var q = norm(ctx.q.trim());
    var muscles = ctx.muscle ? [MUSCLE[ctx.muscle]] : MUSCLES;
    var out = '', count = 0;
    muscles.forEach(function (m) {
      var list = EXERCISES.filter(function (e) {
        return e.primary.indexOf(m.id) !== -1 && (!q || norm(e.name).indexOf(q) !== -1 || norm(e.equipment).indexOf(q) !== -1);
      });
      if (!list.length) return;
      count += list.length;
      out += '<h2 class="sec">' + esc(m.name) + '</h2><div class="group">' +
        list.map(function (e) { return rowHTML(e, ctx, mode); }).join('') + '</div>';
    });
    return count ? out : '<p class="empty">Aucun exercice trouvé.</p>';
  }

  function libScreen(ctx, mode) {
    var head;
    if (mode === 'browse') {
      head = '<div class="titlebar"><h1>Exercices</h1></div>';
    } else {
      head = '<div class="bar"><button class="text-btn" data-a="closePicker">' + (mode === 'add' ? 'Terminé' : 'Annuler') + '</button>' +
        '<h2 class="bar-title">' + (mode === 'add' ? 'Ajouter des exercices' : 'Remplacer par…') + '</h2><span></span></div>';
    }
    var top = mode === 'browse' ? head + '<div class="content">' : head + '<div class="content" style="padding-top:12px">';
    return top +
      '<input class="search" type="search" data-a="search" placeholder="Rechercher un exercice" value="' + esc(ctx.q) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Rechercher un exercice">' +
      '<div class="chips">' + chipsInner(ctx) + '</div>' +
      '<div class="lib-list">' + listInner(ctx, mode) + '</div></div>';
  }

  /* ------------------------------------------------------------------ */
  /* Vue : fiche exercice                                                */
  /* ------------------------------------------------------------------ */

  function muscleCard(title, ids, cls) {
    return '<section class="card"><h3>' + title + '</h3>' +
      ids.map(function (id) {
        var m = MUSCLE[id];
        return '<button class="mrow" data-a="side" data-side="' + m.side + '"><i class="dot ' + cls + '"></i>' + esc(m.name) +
          '<span class="where">Vue ' + (m.side === 'front' ? 'de face' : 'de dos') + '</span></button>';
      }).join('') + '</section>';
  }

  function detailHTML(d) {
    var e = EX[d.exId];
    var pri = new Set(e.primary), sec = new Set(e.secondary);
    var p = ui.picker;
    var foot = '';
    if (d.action && p) {
      var done = p.mode === 'add' && p.added.has(e.id);
      var label = p.mode === 'add' ? (done ? 'Déjà ajouté ✓' : 'Ajouter à la séance') : 'Remplacer par cet exercice';
      foot = '<div class="foot"><button class="cta" data-a="detailAction"' + (done ? ' disabled' : '') + '>' + label + '</button></div>';
    }
    var screen = '<div class="screen' + (foot ? ' has-foot' : '') + '" data-key="detail:' + e.id + '">' +
      '<div class="bar"><button class="back" data-a="closeDetail">‹ Retour</button>' +
      '<h2 class="bar-title">' + esc(e.name) + '</h2><span></span></div>' +
      '<div class="content">' +
      '<span class="pillbox">' + esc(e.equipment) + '</span>' +
      '<section class="card">' +
      '<div class="seg">' +
      '<button data-a="side" data-side="front" class="' + (d.side === 'front' ? 'on' : '') + '">Face</button>' +
      '<button data-a="side" data-side="back" class="' + (d.side === 'back' ? 'on' : '') + '">Dos</button></div>' +
      bodySVG(pri, sec, d.side, 'big-map') +
      '<div class="legend"><span><i class="dot p"></i>Principal</span><span><i class="dot s"></i>Secondaire</span></div>' +
      '</section>' +
      muscleCard('Muscles principaux', e.primary, 'p') +
      (e.secondary.length ? muscleCard('Muscles secondaires', e.secondary, 's') : '') +
      '<section class="card"><h3>Conseil d\'exécution</h3><p class="tip">' + esc(e.tip) + '</p></section>' +
      '</div></div>' + foot;
    return screen;
  }

  /* ------------------------------------------------------------------ */
  /* Menu et boîtes de dialogue                                          */
  /* ------------------------------------------------------------------ */

  function menuHTML(m) {
    return '<div class="scrim" data-a="closeMenu"></div>' +
      '<div class="sheet' + (ui.fresh === 'menu' ? ' enter' : '') + '">' +
      '<div class="sheet-box"><div class="sheet-title">' + esc(m.title) + '</div>' +
      m.actions.map(function (a, i) {
        return '<button class="sheet-btn' + (a.danger ? ' danger' : '') + '" data-a="menuAct" data-i="' + i + '">' + esc(a.label) + '</button>';
      }).join('') + '</div>' +
      '<button class="sheet-btn cancel" data-a="closeMenu">Annuler</button></div>';
  }

  function modalHTML(m) {
    var field = '';
    if (m.input) {
      field = m.input.multiline
        ? '<textarea id="modalInput" rows="7" placeholder="' + esc(m.input.placeholder || '') + '"' + (m.input.readonly ? ' readonly' : '') +
          ' spellcheck="false" autocapitalize="off">' + esc(m.input.value || '') + '</textarea>'
        : '<input id="modalInput" type="text" value="' + esc(m.input.value || '') + '" placeholder="' + esc(m.input.placeholder || '') +
          '" autocomplete="off" enterkeyhint="done" maxlength="80">';
    }
    return '<div class="scrim" data-a="' + (m.noCancel ? 'modalOk' : 'closeModal') + '"></div>' +
      '<div class="dialog' + (ui.fresh === 'modal' ? ' enter' : '') + '" role="dialog" aria-modal="true">' +
      '<h3>' + esc(m.title) + '</h3>' + (m.message ? '<p>' + esc(m.message) + '</p>' : '') + field +
      '<div class="dlg-btns">' +
      (m.noCancel ? '' : '<button data-a="closeModal">Annuler</button>') +
      '<button class="primary' + (m.danger ? ' danger' : '') + '" data-a="modalOk">' + esc(m.okLabel || 'OK') + '</button></div></div>';
  }

  function askText(title, value, placeholder, okLabel, onOk) {
    ui.modal = { title: title, input: { value: value, placeholder: placeholder }, okLabel: okLabel, onOk: onOk };
    ui.fresh = 'modal';
  }
  function confirmBox(title, message, okLabel, onOk) {
    ui.modal = { title: title, message: message, okLabel: okLabel, danger: true, onOk: onOk };
    ui.fresh = 'modal';
  }
  function info(title, message) {
    ui.modal = { title: title, message: message, okLabel: 'OK', noCancel: true, onOk: function () {} };
    ui.fresh = 'modal';
  }
  function openMenu(title, actions) {
    ui.menu = { title: title, actions: actions };
    ui.fresh = 'menu';
  }

  /* ------------------------------------------------------------------ */
  /* Rendu                                                               */
  /* ------------------------------------------------------------------ */

  function tabbar() {
    return '<nav class="tabbar">' +
      '<button class="tab' + (ui.tab === 'workouts' ? ' active' : '') + '" data-a="tab" data-tab="workouts">' + ICON.list + 'Séances</button>' +
      '<button class="tab' + (ui.tab === 'library' ? ' active' : '') + '" data-a="tab" data-tab="library">' + ICON.dumbbell + 'Exercices</button>' +
      '</nav>';
  }

  function baseHTML() {
    var key, inner;
    if (ui.tab === 'workouts') {
      var w = ui.workoutId ? curW() : null;
      if (w) { key = 'workout:' + w.id; inner = workoutScreen(w); }
      else { ui.workoutId = null; key = 'list'; inner = listScreen(); }
    } else {
      key = 'lib';
      inner = libScreen(ui.lib, 'browse');
    }
    return '<div class="screen with-tabs" data-key="' + key + '">' + inner + '</div>' + tabbar();
  }

  function render() {
    var scrolls = {};
    $app.querySelectorAll('.screen[data-key]').forEach(function (s) { scrolls[s.dataset.key] = s.scrollTop; });

    var html = baseHTML();
    if (ui.picker) {
      html += '<div class="layer' + (ui.fresh === 'picker' ? ' enter' : '') + '">' +
        '<div class="screen" data-key="picker">' + libScreen(ui.picker, ui.picker.mode) + '</div></div>';
    }
    if (ui.detail) {
      html += '<div class="layer' + (ui.fresh === 'detail' ? ' enter' : '') + '">' + detailHTML(ui.detail) + '</div>';
    }
    if (ui.menu) html += menuHTML(ui.menu);
    if (ui.modal) html += modalHTML(ui.modal);

    $app.innerHTML = html;

    $app.querySelectorAll('.screen[data-key]').forEach(function (s) {
      if (scrolls[s.dataset.key]) s.scrollTop = scrolls[s.dataset.key];
    });

    if (ui.fresh === 'modal') {
      var mi = document.getElementById('modalInput');
      if (mi && !mi.readOnly) { mi.focus(); if (mi.select && mi.tagName === 'INPUT') mi.select(); }
    }
    ui.fresh = null;
  }

  function updateStats(w) {
    var s = statsOf(w);
    var n = document.getElementById('st-n'), se = document.getElementById('st-sets'), v = document.getElementById('st-vol');
    if (n) n.textContent = s.n;
    if (se) se.textContent = s.sets;
    if (v) v.textContent = s.vol;
  }

  function refreshLib(screen) {
    var key = screen.dataset.key;
    var ctx = key === 'picker' ? ui.picker : ui.lib;
    var mode = key === 'picker' ? ui.picker.mode : 'browse';
    screen.querySelector('.chips').innerHTML = chipsInner(ctx);
    screen.querySelector('.lib-list').innerHTML = listInner(ctx, mode);
  }

  /* ------------------------------------------------------------------ */
  /* Actions sur les données                                             */
  /* ------------------------------------------------------------------ */

  function addItem(wid, exId) {
    var w = data.workouts.find(function (x) { return x.id === wid; });
    if (!w || !EX[exId]) return;
    w.items.push({ id: uid(), exerciseId: exId, sets: 3, reps: 10, weight: 0 });
    save();
  }

  function replaceItem(wid, itemId, exId) {
    var w = data.workouts.find(function (x) { return x.id === wid; });
    var it = w && w.items.find(function (i) { return i.id === itemId; });
    if (it && EX[exId]) { it.exerciseId = exId; save(); }
  }

  function moveItem(w, itemId, delta) {
    var i = w.items.findIndex(function (x) { return x.id === itemId; });
    var j = i + delta;
    if (i < 0 || j < 0 || j >= w.items.length) return;
    var tmp = w.items[i]; w.items[i] = w.items[j]; w.items[j] = tmp;
    save();
  }

  function openDetail(exId, action) {
    if (!EX[exId]) return;
    ui.detail = { exId: exId, side: sideOf(exId), action: action || null };
    ui.fresh = 'detail';
  }

  function openPicker(mode, wid, itemId) {
    ui.picker = { mode: mode, wid: wid, itemId: itemId || null, muscle: null, q: '', added: new Set() };
    ui.fresh = 'picker';
  }

  function workoutMenu(w) {
    openMenu(w.name, [
      { label: 'Renommer', fn: function () {
        askText('Renommer la séance', w.name, 'Nom de la séance', 'Enregistrer', function (v) {
          v = v.trim();
          if (v) { w.name = v; save(); }
        });
      } },
      { label: 'Dupliquer', fn: function () {
        var copy = {
          id: uid(), name: (w.name + ' (copie)').slice(0, 80), createdAt: Date.now(),
          items: w.items.map(function (i) { return { id: uid(), exerciseId: i.exerciseId, sets: i.sets, reps: i.reps, weight: i.weight }; })
        };
        data.workouts.unshift(copy);
        save();
      } },
      { label: 'Supprimer la séance', danger: true, fn: function () {
        confirmBox('Supprimer « ' + w.name + ' » ?', 'Cette action est définitive.', 'Supprimer', function () {
          data.workouts = data.workouts.filter(function (x) { return x.id !== w.id; });
          if (ui.workoutId === w.id) ui.workoutId = null;
          save();
        });
      } }
    ]);
  }

  function itemMenu(w, it) {
    var e = EX[it.exerciseId];
    var idx = w.items.indexOf(it);
    var actions = [];
    if (e) actions.push({ label: 'Voir les muscles', fn: function () { openDetail(it.exerciseId, null); } });
    actions.push({ label: 'Remplacer l\'exercice', fn: function () { openPicker('replace', w.id, it.id); } });
    if (idx > 0) actions.push({ label: 'Monter', fn: function () { moveItem(w, it.id, -1); } });
    if (idx < w.items.length - 1) actions.push({ label: 'Descendre', fn: function () { moveItem(w, it.id, 1); } });
    actions.push({ label: 'Supprimer l\'exercice', danger: true, fn: function () {
      w.items = w.items.filter(function (x) { return x.id !== it.id; });
      save();
    } });
    openMenu(e ? e.name : 'Exercice', actions);
  }

  function backupMenu() {
    openMenu('Sauvegarde de mes séances', [
      { label: 'Copier ma sauvegarde', fn: function () {
        var json = JSON.stringify(data);
        var done = function () { info('Sauvegarde copiée', 'Colle-la dans une note ou un message pour la conserver. Tu pourras la restaurer ici.'); render(); };
        var fallback = function () {
          ui.modal = { title: 'Ma sauvegarde', message: 'Copie tout ce texte et garde-le.', input: { value: json, multiline: true, readonly: true }, okLabel: 'Fermer', noCancel: true, onOk: function () {} };
          ui.fresh = 'modal';
          render();
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json).then(done, fallback);
        } else {
          fallback();
        }
      } },
      { label: 'Restaurer une sauvegarde', fn: function () {
        ui.modal = {
          title: 'Restaurer', message: 'Colle ici ta sauvegarde. Elle remplacera les séances actuelles.',
          input: { value: '', multiline: true, placeholder: 'Colle la sauvegarde ici' }, okLabel: 'Restaurer',
          onOk: function (text) {
            var parsed = null;
            try { parsed = sanitize(JSON.parse(text)); } catch (e) { /* texte invalide */ }
            if (!parsed) { info('Sauvegarde illisible', 'Le texte collé n\'est pas une sauvegarde valide.'); return; }
            data = parsed;
            ui.workoutId = null;
            save();
            info('Sauvegarde restaurée', parsed.workouts.length + ' séance(s) retrouvée(s).');
          }
        };
        ui.fresh = 'modal';
      } }
    ]);
  }

  /* ------------------------------------------------------------------ */
  /* Événements                                                          */
  /* ------------------------------------------------------------------ */

  document.addEventListener('click', function (ev) {
    var ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA') && !ev.target.closest('input, textarea')) ae.blur();

    var el = ev.target.closest('[data-a]');
    if (!el) return;
    var a = el.dataset.a, d = el.dataset;
    var w, it;

    switch (a) {
      case 'tab':
        ui.tab = d.tab;
        break;

      case 'new':
        askText('Nouvelle séance', '', 'Ex. Pectoraux / Triceps', 'Créer', function (name) {
          var wk = { id: uid(), name: name.trim() || 'Séance ' + (data.workouts.length + 1), createdAt: Date.now(), items: [] };
          data.workouts.unshift(wk);
          save();
          ui.tab = 'workouts';
          ui.workoutId = wk.id;
        });
        break;

      case 'openWorkout': ui.workoutId = d.w; break;
      case 'backList': ui.workoutId = null; break;

      case 'wmenu':
        w = data.workouts.find(function (x) { return x.id === d.w; });
        if (w) workoutMenu(w);
        break;

      case 'imenu':
        w = curW();
        it = w && w.items.find(function (x) { return x.id === d.item; });
        if (it) itemMenu(w, it);
        break;

      case 'backup': backupMenu(); break;

      case 'addEx':
        if (curW()) openPicker('add', ui.workoutId);
        break;

      case 'closePicker':
        ui.picker = null;
        ui.detail = null;
        break;

      case 'chip': {
        var scr = el.closest('.screen');
        var ctx = scr.dataset.key === 'picker' ? ui.picker : ui.lib;
        ctx.muscle = d.m || null;
        refreshLib(scr);
        return;
      }

      case 'open':
        openDetail(d.ex, ui.picker ? ui.picker.mode : null);
        break;

      case 'info':
        openDetail(d.ex, null);
        break;

      case 'pick':
        if (!ui.picker) return;
        if (ui.picker.mode === 'add') {
          addItem(ui.picker.wid, d.ex);
          ui.picker.added.add(d.ex);
        } else {
          replaceItem(ui.picker.wid, ui.picker.itemId, d.ex);
          ui.picker = null;
          ui.detail = null;
        }
        break;

      case 'detailAction':
        if (!ui.picker || !ui.detail) return;
        if (ui.picker.mode === 'add') {
          if (!ui.picker.added.has(ui.detail.exId)) {
            addItem(ui.picker.wid, ui.detail.exId);
            ui.picker.added.add(ui.detail.exId);
          }
          ui.detail = null;
        } else {
          replaceItem(ui.picker.wid, ui.picker.itemId, ui.detail.exId);
          ui.picker = null;
          ui.detail = null;
        }
        break;

      case 'closeDetail': ui.detail = null; break;

      case 'side':
        if (ui.detail) ui.detail.side = d.side;
        break;

      case 'step': {
        w = curW();
        it = w && w.items.find(function (x) { return x.id === d.item; });
        if (!it) return;
        var delta = Number(d.d);
        if (d.f === 'weight') {
          it.weight = Math.max(0, Math.round((it.weight + delta * 2.5) * 100) / 100);
        } else if (d.f === 'sets') {
          it.sets = clampInt(it.sets + delta, 1, 20, it.sets);
        } else if (d.f === 'reps') {
          it.reps = clampInt(it.reps + delta, 1, 100, it.reps);
        }
        save();
        break;
      }

      case 'menuAct': {
        var m = ui.menu;
        ui.menu = null;
        if (m && m.actions[Number(d.i)]) m.actions[Number(d.i)].fn();
        break;
      }
      case 'closeMenu': ui.menu = null; break;

      case 'modalOk': {
        var modal = ui.modal;
        var input = document.getElementById('modalInput');
        var value = input ? input.value : '';
        ui.modal = null;
        if (modal && modal.onOk) modal.onOk(value);
        break;
      }
      case 'closeModal': ui.modal = null; break;

      default:
        return; // champs de saisie : pas de nouveau rendu
    }
    render();
  });

  document.addEventListener('input', function (ev) {
    var t = ev.target;
    if (t.matches && t.matches('[data-a="search"]')) {
      var scr = t.closest('.screen');
      var ctx = scr.dataset.key === 'picker' ? ui.picker : ui.lib;
      ctx.q = t.value;
      refreshLib(scr);
    }
  });

  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (!(t.matches && t.matches('[data-a="weight"]'))) return;
    var w = curW();
    var it = w && w.items.find(function (x) { return x.id === t.dataset.item; });
    if (!it) return;
    var v = parseFloat(String(t.value).replace(',', '.').replace(/[^\d.]/g, ''));
    it.weight = isFinite(v) ? Math.max(0, Math.min(1000, Math.round(v * 100) / 100)) : 0;
    t.value = fmt(it.weight);
    save();
    updateStats(w);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var t = ev.target;
    if (t.id === 'modalInput' && t.tagName === 'INPUT') {
      var ok = document.querySelector('[data-a="modalOk"]');
      if (ok) ok.click();
    } else if (t.matches && t.matches('[data-a="weight"], [data-a="search"]')) {
      t.blur();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Démarrage                                                           */
  /* ------------------------------------------------------------------ */

  render();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* hors-ligne indisponible */ });
    });
  }
})();
