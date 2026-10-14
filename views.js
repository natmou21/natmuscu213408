/* Muscu – écrans (construction du HTML). L'état de l'interface est dans MU.ui. */
(function (M) {
  'use strict';

  var esc = M.esc, norm = M.norm, fmt = M.fmt;

  var ui = M.ui = {
    tab: 'home',        // 'home' | 'workouts' | 'library' | 'settings'
    workoutId: null,
    reorder: false,
    lib: { cat: null, muscle: null, q: '' },
    stack: [],          // couches : { t:'picker'|'detail'|'form'|'hist', ... }
    menu: null,
    modal: null,
    fresh: null,
    ringAnim: true
  };

  /* ---------------- Icônes ---------------- */

  var I = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.7V20h13V9.7"/></svg>',
    list: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/></svg>',
    sliders: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M19 7h1M4 17h1M11 17h9"/><circle cx="16" cy="7" r="2.2"/><circle cx="8" cy="17" r="2.2"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><path d="M8 5.2v13.6a.6.6 0 0 0 .9.5l11-6.8a.6.6 0 0 0 0-1L8.9 4.7a.6.6 0 0 0-.9.5z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 14.5l6-6 6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9.5l6 6 6-6"/></svg>',
    grip: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14M5 12h14M5 16h14"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6l6 6-6 6"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true" class="fill"><circle cx="5.5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18.5" cy="12" r="1.7"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
  };
  M.ICON = I;

  /* ---------------- Aides ---------------- */

  function mapPair(pri, sec, cls) {
    return '<figure>' + M.bodySVG(pri, sec, 'front', { cls: cls }) + '<figcaption>Face</figcaption></figure>' +
      '<figure>' + M.bodySVG(pri, sec, 'back', { cls: cls }) + '<figcaption>Dos</figcaption></figure>';
  }
  function legend() {
    return '<div class="legend"><span><i class="dot p"></i>Principal</span><span><i class="dot s"></i>Secondaire</span></div>';
  }
  function barHTML(left, title, right) {
    return '<div class="bar">' + left + '<h2 class="bar-title">' + esc(title) + '</h2><div class="bar-right">' + (right || '') + '</div></div>';
  }
  function backBtn(label, action) {
    return '<button class="back" data-a="' + action + '">' + I.chev + '<span>' + esc(label) + '</span></button>';
  }
  function iconBtn(action, icon, label, extra) {
    return '<button class="icon-btn" data-a="' + action + '" aria-label="' + esc(label) + '"' + (extra || '') + '>' + icon + '</button>';
  }
  function timerSpan() {
    var a = M.data.active;
    return '<span class="timer" data-timer>' + (a ? M.fmtClock(Date.now() - a.startedAt) : '0:00') + '</span>';
  }
  function topLayer() { return ui.stack[ui.stack.length - 1] || null; }
  M.pickerBelow = function (idx) {
    for (var i = idx - 1; i >= 0; i--) if (ui.stack[i].t === 'picker') return ui.stack[i];
    return null;
  };

  /* ================================================================== */
  /* Accueil                                                            */
  /* ================================================================== */

  function greeting() {
    var h = new Date().getHours();
    return h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir';
  }
  function longDate() {
    var s = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function weekData() {
    var start = M.weekStart(Date.now());
    var days = [0, 0, 0, 0, 0, 0, 0], count = 0, vol = 0;
    M.data.history.forEach(function (h) {
      if (h.endedAt < start || h.endedAt >= start + 7 * 86400000) return;
      count++;
      vol += M.sessionStats(h).vol;
      var idx = Math.round((M.dayStart(h.endedAt) - start) / 86400000);
      if (idx >= 0 && idx < 7) days[idx]++;
    });
    var today = Math.round((M.dayStart(Date.now()) - start) / 86400000);
    return { days: days, count: count, vol: vol, today: today };
  }

  function ringSVG(count, goal) {
    var p = Math.min(1, count / goal);
    return '<div class="ring' + (ui.ringAnim ? ' anim' : '') + '" style="--p:' + p.toFixed(3) + '">' +
      '<svg viewBox="0 0 100 100" aria-hidden="true"><circle class="ring-bg" cx="50" cy="50" r="40"/>' +
      '<circle class="ring-fg" cx="50" cy="50" r="40" transform="rotate(-90 50 50)"/></svg>' +
      '<div class="ring-txt"><b>' + count + '</b><span>sur ' + goal + '</span></div></div>';
  }

  /* Muscles d'une séance terminée : ceux enregistrés à l'époque, sinon ceux de l'exercice actuel. */
  function snapMuscles(h) {
    return h.items.map(function (i) {
      var e = M.EX[i.exerciseId];
      return {
        primary: i.primary.length ? i.primary : (e ? e.primary : []),
        secondary: i.secondary.length ? i.secondary : (e ? e.secondary : [])
      };
    });
  }

  function heroHTML(h) {
    var st = M.sessionStats(h);
    var m = M.musclesOf(snapMuscles(h));
    return '<section class="hero' + (ui.ringAnim ? ' anim' : '') + '">' +
      '<p class="hero-when">' + esc(M.relDay(h.endedAt)) + '</p>' +
      '<h3 class="hero-name">' + esc(h.name) + '</h3>' +
      '<div class="hero-body">' +
      '<div class="hero-stats">' +
      '<div><b>' + M.fmtDuration(st.ms) + '</b><span>Durée</span></div>' +
      '<div><b>' + st.done + '/' + st.planned + '</b><span>Séries</span></div>' +
      '<div><b>' + M.fmtVolume(st.vol) + '</b><span>Volume</span></div></div>' +
      '<div class="maps small">' + mapPair(m.pri, m.sec, '') + '</div></div>' +
      '<div class="hero-btns">' +
      '<button class="btn light" data-a="histRedo" data-h="' + h.id + '">' + I.play + 'Refaire la séance</button>' +
      '<button class="btn ghost-light" data-a="hist" data-h="' + h.id + '">Détails</button></div>' +
      '</section>';
  }

  function emptyHero() {
    return '<section class="hero hero-empty' + (ui.ringAnim ? ' anim' : '') + '">' +
      '<h3 class="hero-name">Lance ta première séance</h3>' +
      '<p class="hero-text">Coche tes séries pendant l\'entraînement : ta dernière séance apparaîtra ici avec les muscles travaillés.</p>' +
      '<div class="hero-btns"><button class="btn light" data-a="pickStart">' + I.play + 'Démarrer une séance</button></div>' +
      '</section>';
  }

  function homeScreen() {
    var d = M.data, wk = weekData(), out = '';
    out += '<div class="lt home-lt"><div><p class="lt-date">' + esc(longDate()) + '</p><h1>' + greeting() + '</h1></div></div>';

    if (d.active) {
      var aw = M.getWorkout(d.active.workoutId);
      var doneCount = Object.keys(d.active.done).reduce(function (n, k) { return n + d.active.done[k].length; }, 0);
      out += '<button class="live-card" data-a="openActive"><span class="live-dot"></span>' +
        '<span class="live-main"><b>Séance en cours</b><small>' + esc(aw ? aw.name : '') + ', ' + doneCount + ' série' + (doneCount > 1 ? 's' : '') + ' cochée' + (doneCount > 1 ? 's' : '') + '</small></span>' +
        timerSpan() + '</button>';
    }

    out += '<h2 class="sec">Dernière séance</h2>';
    out += d.history.length ? heroHTML(d.history[0]) : emptyHero();

    out += '<h2 class="sec">Cette semaine</h2><section class="card week">' +
      '<div class="week-top">' + ringSVG(wk.count, d.settings.goal) +
      '<div class="week-text"><b>' + (wk.count >= d.settings.goal ? 'Objectif atteint' : wk.count + ' séance' + (wk.count > 1 ? 's' : '') + ' faite' + (wk.count > 1 ? 's' : '')) + '</b>' +
      '<span>' + M.fmtVolume(wk.vol) + ' soulevés</span>' +
      '<button class="link" data-a="tab" data-tab="settings">Objectif : ' + d.settings.goal + ' par semaine</button></div></div>' +
      '<div class="strip">' + ['L', 'M', 'M', 'J', 'V', 'S', 'D'].map(function (l, i) {
        return '<div class="day' + (wk.days[i] ? ' on' : '') + (i === wk.today ? ' today' : '') + '"><span class="day-dot">' +
          (wk.days[i] ? I.check : '') + '</span><small>' + l + '</small></div>';
      }).join('') + '</div></section>';

    out += '<div class="sec"><h2>Mes séances</h2><button class="link" data-a="goList">Tout voir</button></div>';
    if (!d.workouts.length) {
      out += '<section class="card empty-card"><p>Aucune séance pour l\'instant.</p><button class="btn block" data-a="new">Créer une séance</button></section>';
    } else {
      out += '<div class="group">' + d.workouts.slice(0, 4).map(function (w) { return workoutRow(w, true); }).join('') + '</div>';
    }

    if (d.history.length) {
      out += '<h2 class="sec">Historique</h2><div class="group">' + d.history.slice(0, 8).map(function (h) {
        var st = M.sessionStats(h);
        return '<button class="row" data-a="hist" data-h="' + h.id + '"><span class="row-main"><span class="row-name">' + esc(h.name) + '</span>' +
          '<span class="row-sub">' + esc(M.relDay(h.endedAt)) + ', ' + M.fmtDuration(st.ms) + '</span></span>' +
          '<span class="row-val">' + M.fmtVolume(st.vol) + '</span><span class="chev">' + I.chev + '</span></button>';
      }).join('') + '</div>';
    }
    return '<div class="content">' + out + '</div>';
  }

  function workoutSubtitle(w) {
    if (!w.items.length) return 'Aucun exercice';
    var set = {};
    w.items.forEach(function (i) {
      var e = M.EX[i.exerciseId];
      if (e) e.primary.forEach(function (m) { set[m] = true; });
    });
    var names = M.MUSCLES.filter(function (m) { return set[m.id]; }).slice(0, 3).map(function (m) { return m.name; });
    var count = w.items.length === 1 ? '1 exercice' : w.items.length + ' exercices';
    return count + (names.length ? ', ' + names.join(', ') : '');
  }

  function workoutRow(w, compact) {
    var running = M.data.active && M.data.active.workoutId === w.id;
    return '<div class="wrow">' +
      '<button class="wrow-main" data-a="openWorkout" data-w="' + w.id + '">' +
      '<span class="row-name">' + esc(w.name) + '</span><span class="row-sub">' + esc(workoutSubtitle(w)) + '</span></button>' +
      (compact ? '' : '<button class="more" data-a="wmenu" data-w="' + w.id + '" aria-label="Options de la séance">' + I.more + '</button>') +
      '<button class="play' + (running ? ' on' : '') + '" data-a="startW" data-w="' + w.id + '" aria-label="' + (running ? 'Reprendre la séance' : 'Démarrer la séance') + '"' +
      (w.items.length ? '' : ' disabled') + '>' + I.play + '</button></div>';
  }

  /* ================================================================== */
  /* Séances                                                            */
  /* ================================================================== */

  function listScreen() {
    var d = M.data;
    var body = d.workouts.length
      ? '<div class="group">' + d.workouts.map(function (w) { return workoutRow(w, false); }).join('') + '</div>'
      : '<div class="empty"><b>Aucune séance</b>Crée ta première séance, puis ajoute tes exercices.<div><button class="btn" data-a="new">Créer une séance</button></div></div>';
    return '<div class="content"><div class="lt"><h1>Séances</h1><div class="acts">' + iconBtn('new', I.plus, 'Nouvelle séance') + '</div></div>' + body + '</div>';
  }

  function tile(label, it, field, dec, inc) {
    var val;
    if (field === 'weight') {
      val = '<input class="val" type="text" inputmode="decimal" autocomplete="off" data-a="weight" data-item="' + it.id + '" value="' + fmt(it.weight) + '" aria-label="Poids en kilogrammes">';
    } else {
      val = '<b class="val">' + it[field] + '</b>';
    }
    return '<div class="tile"><span class="lbl">' + label + '</span>' + val +
      '<div class="steps">' +
      '<button data-a="step" data-item="' + it.id + '" data-f="' + field + '" data-d="-1"' + (dec ? '' : ' disabled') + ' aria-label="Diminuer">−</button>' +
      '<button data-a="step" data-item="' + it.id + '" data-f="' + field + '" data-d="1"' + (inc ? '' : ' disabled') + ' aria-label="Augmenter">+</button>' +
      '</div></div>';
  }

  function itemCard(it, live) {
    var e = M.EX[it.exerciseId];
    var title = e ? e.name : 'Exercice supprimé';
    var sub = e ? M.muscleNames(e.primary) : '';
    var chips = '';
    if (live) {
      var done = M.data.active.done[it.id] || [];
      chips = '<div class="sets" role="group" aria-label="Séries réalisées">';
      for (var i = 0; i < it.sets; i++) {
        var on = done.indexOf(i) !== -1;
        chips += '<button class="setchip' + (on ? ' on' : '') + '" data-a="setdone" data-item="' + it.id + '" data-i="' + i + '" aria-pressed="' + on + '" aria-label="Série ' + (i + 1) + '">' +
          (on ? I.check : (i + 1)) + '</button>';
      }
      chips += '</div>';
    }
    return '<article class="card exc' + (live && (M.data.active.done[it.id] || []).length >= it.sets ? ' complete' : '') + '">' +
      '<div class="ex-head">' +
      '<button class="ex-title" data-a="info" data-ex="' + esc(it.exerciseId) + '"' + (e ? '' : ' disabled') + '><b>' + esc(title) + '</b><small>' + esc(sub) + '</small></button>' +
      '<button class="more" data-a="imenu" data-item="' + it.id + '" aria-label="Options de l\'exercice">' + I.more + '</button></div>' +
      chips +
      '<div class="tiles">' +
      tile('Séries', it, 'sets', it.sets > 1, it.sets < 20) +
      tile('Répétitions', it, 'reps', it.reps > 1, it.reps < 100) +
      tile('Poids (kg)', it, 'weight', it.weight > 0, true) +
      '</div></article>';
  }

  function reorderList(w) {
    return '<div class="rlist" data-rlist>' + w.items.map(function (it, i) {
      var e = M.EX[it.exerciseId];
      return '<div class="rrow" data-item="' + it.id + '">' +
        '<button class="handle" data-a="drag" aria-label="Glisser pour déplacer">' + I.grip + '</button>' +
        '<div class="rtitle"><b>' + esc(e ? e.name : 'Exercice supprimé') + '</b><small>' + it.sets + ' × ' + it.reps + (it.weight ? ' à ' + fmt(it.weight) + ' kg' : '') + '</small></div>' +
        '<div class="rbtns">' +
        '<button data-a="move" data-item="' + it.id + '" data-d="-1"' + (i === 0 ? ' disabled' : '') + ' aria-label="Monter">' + I.up + '</button>' +
        '<button data-a="move" data-item="' + it.id + '" data-d="1"' + (i === w.items.length - 1 ? ' disabled' : '') + ' aria-label="Descendre">' + I.down + '</button>' +
        '</div></div>';
    }).join('') + '</div>';
  }

  function summaryHTML(w) {
    var m = M.musclesOf(w.items.map(function (i) { return i.exerciseId; }));
    var s = M.templateStats(w);
    return '<section class="card summary">' +
      '<div class="stats">' +
      '<div><b id="st-n">' + s.n + '</b><span>Exercices</span></div>' +
      '<div><b id="st-sets">' + s.sets + '</b><span>Séries</span></div>' +
      '<div><b id="st-vol">' + M.fmtVolume(s.vol) + '</b><span>Volume</span></div></div>' +
      '<div class="maps">' + mapPair(m.pri, m.sec, '') + '</div>' + legend() + '</section>';
  }

  function workoutScreen(w) {
    var live = M.data.active && M.data.active.workoutId === w.id;
    var inner;
    if (!w.items.length) {
      inner = '<div class="empty"><b>Aucun exercice</b>Ajoute des exercices pour construire ta séance.<div><button class="btn" data-a="addEx">Ajouter un exercice</button></div></div>';
    } else if (ui.reorder) {
      inner = '<div class="sec"><h2>Réorganiser</h2><button class="link strong" data-a="reorderToggle">OK</button></div>' +
        '<p class="hint">Glisse une ligne par sa poignée, ou utilise les flèches.</p>' + reorderList(w);
    } else {
      inner = summaryHTML(w) +
        '<div class="sec"><h2>Exercices</h2>' + (w.items.length > 1 ? '<button class="link" data-a="reorderToggle">Réorganiser</button>' : '') + '</div>' +
        w.items.map(function (it) { return itemCard(it, live); }).join('') +
        '<button class="btn tonal block" data-a="addEx">' + I.plus + 'Ajouter un exercice</button>';
    }

    var foot = '';
    if (w.items.length && !ui.reorder) {
      foot = live
        ? '<div class="foot foot-live"><div class="foot-time"><span>Durée</span>' + timerSpan() + '</div><button class="btn danger-fill" data-a="finish">Terminer la séance</button></div>'
        : '<div class="foot"><button class="btn block" data-a="startW" data-w="' + w.id + '">' + I.play + 'Démarrer la séance</button></div>';
    }
    return {
      html: barHTML(backBtn('Séances', 'backList'), w.name, iconBtn('wmenu', I.more, 'Options de la séance', ' data-w="' + w.id + '"') + iconBtn('addEx', I.plus, 'Ajouter un exercice')) +
        '<div class="content">' + inner + '</div>',
      foot: foot
    };
  }

  /* ================================================================== */
  /* Exercices (bibliothèque et sélecteur)                              */
  /* ================================================================== */

  function chipsHTML(ctx) {
    var cats = '<div class="chips" data-chips="cat"><button class="chip' + (!ctx.cat ? ' on' : '') + '" data-a="chip" data-c="">Tous</button>' +
      M.CATEGORIES.map(function (c) {
        return '<button class="chip' + (ctx.cat === c.id ? ' on' : '') + '" data-a="chip" data-c="' + c.id + '">' + esc(c.name) + '</button>';
      }).join('') + '</div>';
    var mus = '';
    if (ctx.cat) {
      mus = '<div class="chips sub" data-chips="muscle"><button class="chip small' + (!ctx.muscle ? ' on' : '') + '" data-a="mchip" data-m="">Tous</button>' +
        M.CAT[ctx.cat].muscles.map(function (id) {
          return '<button class="chip small' + (ctx.muscle === id ? ' on' : '') + '" data-a="mchip" data-m="' + id + '">' + esc(M.MUSCLE[id].name) + '</button>';
        }).join('') + '</div>';
    }
    return cats + mus;
  }

  function rowHTML(e, ctx, mode) {
    var btn = '';
    if (mode === 'add') {
      var done = ctx.added && ctx.added.has(e.id);
      btn = '<button class="add' + (done ? ' done' : '') + '" data-a="pick" data-ex="' + esc(e.id) + '"' + (done ? ' disabled' : '') + ' aria-label="Ajouter à la séance">' + (done ? I.check : I.plus) + '</button>';
    } else if (mode === 'replace') {
      btn = '<button class="pill" data-a="pick" data-ex="' + esc(e.id) + '">Choisir</button>';
    }
    return '<div class="row" data-a="open" data-ex="' + esc(e.id) + '" role="button" tabindex="0">' +
      '<div class="row-main"><span class="row-name">' + esc(e.name) + (e.custom ? ' <i class="tag">Perso</i>' : '') + '</span>' +
      '<span class="row-sub">' + esc(e.equipment) + ', ' + esc(M.muscleNames(e.primary)) + '</span></div>' +
      btn + '<span class="chev">' + I.chev + '</span></div>';
  }

  function listInner(ctx, mode) {
    var q = norm(ctx.q.trim());
    function match(e) {
      return !q || norm(e.name).indexOf(q) !== -1 || norm(e.equipment).indexOf(q) !== -1 || norm(M.muscleNames(e.primary)).indexOf(q) !== -1;
    }
    var sections = [];
    if (ctx.cat) {
      var cat = M.CAT[ctx.cat];
      var inCat = M.ALL.filter(function (e) { return e.category === ctx.cat && match(e); });
      var muscles = ctx.muscle ? [ctx.muscle] : cat.muscles;
      muscles.forEach(function (id) {
        var list = inCat.filter(function (e) { return e.primary.indexOf(id) !== -1; });
        if (list.length) sections.push({ name: M.MUSCLE[id].name, list: list });
      });
      if (!ctx.muscle) {
        var other = inCat.filter(function (e) { return !e.primary.some(function (m) { return cat.muscles.indexOf(m) !== -1; }); });
        if (other.length) sections.push({ name: 'Autres', list: other });
      }
    } else {
      M.MUSCLES.forEach(function (m) {
        var list = M.ALL.filter(function (e) { return e.primary.indexOf(m.id) !== -1 && match(e); });
        if (list.length) sections.push({ name: m.name, list: list });
      });
    }
    if (!sections.length) {
      return '<div class="empty small"><b>Aucun exercice trouvé</b>' + (q ? 'Tu peux le créer toi-même.' : '') +
        '<div><button class="btn tonal" data-a="newEx" data-name="' + esc(ctx.q.trim()) + '">' + I.plus + 'Créer un exercice' + (ctx.q.trim() ? ' « ' + esc(ctx.q.trim()) + ' »' : '') + '</button></div></div>';
    }
    return sections.map(function (s) {
      return '<h2 class="sec sm">' + esc(s.name) + '</h2><div class="group">' + s.list.map(function (e) { return rowHTML(e, ctx, mode); }).join('') + '</div>';
    }).join('');
  }

  function libScreen(ctx, mode) {
    var head, top;
    if (mode === 'browse') {
      head = '';
      top = '<div class="lt"><h1>Exercices</h1><div class="acts">' + iconBtn('newEx', I.plus, 'Créer un exercice') + '</div></div>';
    } else {
      head = barHTML('<button class="text-btn" data-a="closePicker">' + (mode === 'add' ? 'Terminé' : 'Annuler') + '</button>',
        mode === 'add' ? 'Ajouter des exercices' : 'Remplacer par', iconBtn('newEx', I.plus, 'Créer un exercice'));
      top = '';
    }
    return head + '<div class="content' + (mode === 'browse' ? '' : ' pad-top') + '">' + top +
      '<input class="search" type="search" data-a="search" placeholder="Rechercher un exercice" value="' + esc(ctx.q) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Rechercher un exercice">' +
      '<div class="chips-wrap">' + chipsHTML(ctx) + '</div>' +
      '<div class="lib-list">' + listInner(ctx, mode) + '</div></div>';
  }

  /* ---------------- Fiche exercice ---------------- */

  function muscleCard(title, ids, cls) {
    return '<section class="card"><h3>' + title + '</h3>' +
      ids.map(function (id) {
        var m = M.MUSCLE[id];
        return '<button class="mrow" data-a="side" data-side="' + m.side + '"><i class="dot ' + cls + '"></i>' + esc(m.name) +
          '<span class="where">Vue ' + (m.side === 'front' ? 'de face' : 'de dos') + '</span></button>';
      }).join('') + '</section>';
  }

  function detailLayer(d, idx) {
    var e = M.EX[d.exId];
    if (!e) return { html: '<div class="content"><div class="empty"><b>Exercice introuvable</b></div></div>', foot: '' };
    var pri = new Set(e.primary), sec = new Set(e.secondary);
    var p = M.pickerBelow(idx);
    var foot = '';
    if (p) {
      var done = p.mode === 'add' && p.added.has(e.id);
      var label = p.mode === 'add' ? (done ? 'Déjà ajouté' : 'Ajouter à la séance') : 'Remplacer par cet exercice';
      foot = '<div class="foot"><button class="btn block" data-a="detailAction"' + (done ? ' disabled' : '') + '>' + label + '</button></div>';
    }
    var catName = M.CAT[e.category] ? M.CAT[e.category].name : '';
    var html = barHTML(backBtn('Retour', 'closeLayer'), e.name, e.custom ? iconBtn('exmenu', I.more, 'Options', ' data-ex="' + esc(e.id) + '"') : '') +
      '<div class="content">' +
      '<div class="tags"><span class="pillbox">' + esc(e.equipment) + '</span>' + (catName ? '<span class="pillbox neutral">' + esc(catName) + '</span>' : '') +
      (e.custom ? '<span class="pillbox neutral">Créé par toi</span>' : '') + '</div>' +
      '<section class="card"><div class="seg">' +
      '<button data-a="side" data-side="front" class="' + (d.side === 'front' ? 'on' : '') + '">Face</button>' +
      '<button data-a="side" data-side="back" class="' + (d.side === 'back' ? 'on' : '') + '">Dos</button></div>' +
      M.bodySVG(pri, sec, d.side, { cls: 'big-map' }) + legend() + '</section>' +
      muscleCard('Muscles principaux', e.primary, 'p') +
      (e.secondary.length ? muscleCard('Muscles secondaires', e.secondary, 's') : '') +
      (e.tip ? '<section class="card"><h3>Conseil d\'exécution</h3><p class="tip">' + esc(e.tip) + '</p></section>' : '') +
      '</div>';
    return { html: html, foot: foot };
  }

  /* ---------------- Création / modification d'un exercice ---------------- */

  M.newForm = function (opts) {
    opts = opts || {};
    var base = opts.edit;
    return {
      t: 'form',
      editId: base ? base.id : null,
      name: base ? base.name : (opts.name || ''),
      cat: base ? base.category : null,
      equipment: base ? base.equipment : 'Machine',
      primary: base ? base.primary.slice() : [],
      secondary: base ? base.secondary.slice() : [],
      tip: base ? base.tip : '',
      side: base && base.primary[0] ? M.MUSCLE[base.primary[0]].side : 'front'
    };
  };

  M.formCat = function (f) {
    return f.cat || (f.primary[0] ? M.CAT_OF[f.primary[0]] : null);
  };

  M.formError = function (f) {
    var name = f.name.trim();
    if (!name) return 'Donne un nom à ton exercice.';
    var key = norm(name);
    var dup = M.ALL.some(function (e) { return e.id !== f.editId && norm(e.name) === key; });
    if (dup) return 'Un exercice porte déjà ce nom.';
    if (!f.primary.length) return 'Choisis au moins un muscle principal.';
    return '';
  };

  function formLayer(f) {
    var cat = M.formCat(f);
    var err = M.formError(f);
    var pri = new Set(f.primary), sec = new Set(f.secondary);
    var catChips = M.CATEGORIES.map(function (c) {
      return '<button class="chip' + (cat === c.id ? ' on' : '') + '" data-a="fcat" data-c="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');
    var eqChips = M.EQUIPMENTS.map(function (q) {
      return '<button class="chip' + (f.equipment === q ? ' on' : '') + '" data-a="feq" data-q="' + esc(q) + '">' + esc(q) + '</button>';
    }).join('');
    var mus = M.MUSCLES.map(function (m) {
      var st = pri.has(m.id) ? 'p' : sec.has(m.id) ? 's' : '';
      return '<button class="mc ' + st + '" data-a="mtoggle" data-m="' + m.id + '"><i class="dot ' + (st || 'n') + '"></i>' + esc(m.name) + '</button>';
    }).join('');
    var html = barHTML('<button class="text-btn" data-a="closeLayer">Annuler</button>', f.editId ? 'Modifier l\'exercice' : 'Nouvel exercice', '') +
      '<div class="content">' +
      '<section class="card fld"><label for="f-name">Nom</label>' +
      '<input id="f-name" data-a="fname" type="text" maxlength="60" placeholder="Ex. Presse inclinée à un bras" value="' + esc(f.name) + '" autocomplete="off" enterkeyhint="done"></section>' +
      '<h2 class="sec sm">Catégorie</h2><div class="chips wrap">' + catChips + '</div>' +
      '<h2 class="sec sm">Matériel</h2><div class="chips wrap">' + eqChips + '</div>' +
      '<h2 class="sec sm">Muscles travaillés</h2>' +
      '<section class="card"><p class="hint left">Touche un muscle sur le schéma : une fois pour principal, deux fois pour secondaire, trois fois pour l\'enlever.</p>' +
      '<div class="seg">' +
      '<button data-a="fside" data-side="front" class="' + (f.side === 'front' ? 'on' : '') + '">Face</button>' +
      '<button data-a="fside" data-side="back" class="' + (f.side === 'back' ? 'on' : '') + '">Dos</button></div>' +
      M.bodySVG(pri, sec, f.side, { cls: 'big-map', editable: true }) + legend() +
      '<div class="mcs">' + mus + '</div></section>' +
      '<h2 class="sec sm">Conseil d\'exécution (facultatif)</h2>' +
      '<section class="card fld"><textarea id="f-tip" data-a="ftip" rows="4" maxlength="600" placeholder="Position, amplitude, respiration…">' + esc(f.tip) + '</textarea></section>' +
      '<p class="form-err" id="f-err" role="status">' + esc(err) + '</p>' +
      '</div>';
    var foot = '<div class="foot"><button class="btn block" id="f-save" data-a="fsave"' + (err ? ' disabled' : '') + '>' + (f.editId ? 'Enregistrer' : 'Créer l\'exercice') + '</button></div>';
    return { html: html, foot: foot };
  }

  /* ---------------- Détail d'une séance de l'historique ---------------- */

  function histLayer(l) {
    var h = M.data.history.find(function (x) { return x.id === l.hid; });
    if (!h) return { html: '<div class="content"><div class="empty"><b>Séance introuvable</b></div></div>', foot: '' };
    var st = M.sessionStats(h);
    var m = M.musclesOf(snapMuscles(h));
    var date = new Date(h.endedAt).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    date = date.charAt(0).toUpperCase() + date.slice(1) + ', ' + new Date(h.startedAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var html = barHTML(backBtn('Retour', 'closeLayer'), h.name, iconBtn('hmenu', I.more, 'Options', ' data-h="' + h.id + '"')) +
      '<div class="content"><section class="hero flat"><p class="hero-when">' + esc(date) + '</p><h3 class="hero-name">' + esc(h.name) + '</h3>' +
      '<div class="hero-body"><div class="hero-stats">' +
      '<div><b>' + M.fmtDuration(st.ms) + '</b><span>Durée</span></div>' +
      '<div><b>' + st.done + '/' + st.planned + '</b><span>Séries</span></div>' +
      '<div><b>' + M.fmtVolume(st.vol) + '</b><span>Volume</span></div></div>' +
      '<div class="maps small">' + mapPair(m.pri, m.sec, '') + '</div></div></section>' +
      '<h2 class="sec">Exercices</h2><div class="group">' + h.items.map(function (i) {
        var e = M.EX[i.exerciseId];
        var name = e ? e.name : (i.name || 'Exercice supprimé');
        return '<div class="row static"><div class="row-main"><span class="row-name">' + esc(name) + '</span>' +
          '<span class="row-sub">' + i.sets + ' × ' + i.reps + (i.weight ? ' à ' + fmt(i.weight) + ' kg' : '') + '</span></div>' +
          '<span class="row-val' + (i.done >= i.sets ? ' ok' : '') + '">' + i.done + '/' + i.sets + '</span></div>';
      }).join('') + '</div></div>';
    var foot = '<div class="foot"><button class="btn block" data-a="histRedo" data-h="' + h.id + '">' + I.play + 'Refaire cette séance</button></div>';
    return { html: html, foot: foot };
  }

  /* ================================================================== */
  /* Réglages                                                           */
  /* ================================================================== */

  function seg(items, current, action, attr) {
    return '<div class="seg">' + items.map(function (it) {
      return '<button data-a="' + action + '" data-' + attr + '="' + it[0] + '" class="' + (String(current) === String(it[0]) ? 'on' : '') + '">' + esc(it[1]) + '</button>';
    }).join('') + '</div>';
  }

  function settingsScreen() {
    var s = M.data.settings;
    return '<div class="content"><div class="lt"><h1>Réglages</h1></div>' +
      '<h2 class="sec sm">Apparence</h2><section class="card">' +
      seg([['auto', 'Auto'], ['light', 'Clair'], ['dark', 'Sombre']], s.theme, 'theme', 't') +
      '<p class="hint left">Auto suit le réglage de ton iPhone.</p></section>' +
      '<h2 class="sec sm">Objectif de la semaine</h2><section class="card setrow">' +
      '<div><b>' + s.goal + ' séance' + (s.goal > 1 ? 's' : '') + ' par semaine</b><small>Utilisé par l\'anneau de l\'accueil</small></div>' +
      '<div class="mini-steps"><button data-a="goal" data-d="-1"' + (s.goal <= 1 ? ' disabled' : '') + ' aria-label="Diminuer">−</button><button data-a="goal" data-d="1"' + (s.goal >= 7 ? ' disabled' : '') + ' aria-label="Augmenter">+</button></div></section>' +
      '<h2 class="sec sm">Pas du poids</h2><section class="card">' +
      seg([[1, '1 kg'], [2, '2 kg'], [2.5, '2,5 kg'], [5, '5 kg']], s.step, 'wstep', 'v') +
      '<p class="hint left">Valeur ajoutée ou retirée à chaque appui sur + ou −.</p></section>' +
      '<h2 class="sec sm">Mes données</h2><div class="group">' +
      '<button class="row" data-a="tab" data-tab="library"><span class="row-main"><span class="row-name">Mes exercices créés</span><span class="row-sub">' + M.data.custom.length + ' exercice' + (M.data.custom.length > 1 ? 's' : '') + '</span></span><span class="chev">' + I.chev + '</span></button>' +
      '<button class="row" data-a="backupCopy"><span class="row-main"><span class="row-name">Copier ma sauvegarde</span><span class="row-sub">Séances, exercices créés et historique</span></span><span class="chev">' + I.chev + '</span></button>' +
      '<button class="row" data-a="backupRestore"><span class="row-main"><span class="row-name">Restaurer une sauvegarde</span><span class="row-sub">Colle un texte copié plus tôt</span></span><span class="chev">' + I.chev + '</span></button>' +
      '<button class="row danger" data-a="clearHistory"><span class="row-main"><span class="row-name">Effacer l\'historique</span><span class="row-sub">Les séances et les exercices sont conservés</span></span></button></div>' +
      '<p class="foot-note">Muscu ' + M.VERSION + '. Tes données restent sur cet appareil, rien n\'est envoyé sur Internet.</p></div>';
  }

  /* ================================================================== */
  /* Éléments communs                                                   */
  /* ================================================================== */

  function tabbar() {
    function tab(id, icon, label) {
      return '<button class="tab' + (ui.tab === id ? ' active' : '') + '" data-a="tab" data-tab="' + id + '">' + icon + '<span>' + label + '</span></button>';
    }
    return '<nav class="tabbar">' + tab('home', I.home, 'Accueil') + tab('workouts', I.list, 'Séances') + tab('library', I.dumbbell, 'Exercices') + tab('settings', I.sliders, 'Réglages') + '</nav>';
  }

  function miniBar() {
    var a = M.data.active;
    if (!a) return '';
    if (ui.tab === 'workouts' && ui.workoutId === a.workoutId) return '';
    var w = M.getWorkout(a.workoutId);
    return '<button class="minibar" data-a="openActive"><span class="live-dot"></span><span class="mini-name">' + esc(w ? w.name : 'Séance en cours') + '</span>' + timerSpan() + '</button>';
  }

  function menuHTML(m) {
    return '<div class="scrim" data-a="closeMenu"></div>' +
      '<div class="sheet' + (ui.fresh === 'menu' ? ' enter' : '') + '" role="menu">' +
      '<div class="sheet-box"><div class="sheet-title">' + esc(m.title) + '</div><div class="sheet-scroll">' +
      m.actions.map(function (a, i) {
        return '<button class="sheet-btn' + (a.danger ? ' danger' : '') + '" data-a="menuAct" data-i="' + i + '">' + esc(a.label) + '</button>';
      }).join('') + '</div></div>' +
      '<button class="sheet-btn cancel" data-a="closeMenu">Annuler</button></div>';
  }

  function modalHTML(m) {
    var field = '';
    if (m.input) {
      field = m.input.multiline
        ? '<textarea id="modalInput" rows="7" placeholder="' + esc(m.input.placeholder || '') + '"' + (m.input.readonly ? ' readonly' : '') + ' spellcheck="false" autocapitalize="off">' + esc(m.input.value || '') + '</textarea>'
        : '<input id="modalInput" type="text" value="' + esc(m.input.value || '') + '" placeholder="' + esc(m.input.placeholder || '') + '" autocomplete="off" enterkeyhint="done" maxlength="80">';
    }
    return '<div class="scrim" data-a="' + (m.noCancel ? 'modalOk' : 'closeModal') + '"></div>' +
      '<div class="dialog' + (ui.fresh === 'modal' ? ' enter' : '') + '" role="dialog" aria-modal="true">' +
      '<h3>' + esc(m.title) + '</h3>' + (m.message ? '<p>' + esc(m.message) + '</p>' : '') + field +
      '<div class="dlg-btns">' + (m.noCancel ? '' : '<button data-a="closeModal">Annuler</button>') +
      '<button class="primary' + (m.danger ? ' danger' : '') + '" data-a="modalOk">' + esc(m.okLabel || 'OK') + '</button></div></div>';
  }

  /* ================================================================== */
  /* Rendu                                                              */
  /* ================================================================== */

  function baseHTML() {
    var key, inner = '', foot = '';
    if (ui.tab === 'home') { key = 'home'; inner = homeScreen(); }
    else if (ui.tab === 'workouts') {
      var w = ui.workoutId ? M.getWorkout(ui.workoutId) : null;
      if (w) { var ws = workoutScreen(w); key = 'workout:' + w.id + (ui.reorder ? ':r' : ''); inner = ws.html; foot = ws.foot; }
      else { ui.workoutId = null; ui.reorder = false; key = 'list'; inner = listScreen(); }
    } else if (ui.tab === 'library') { key = 'lib'; inner = libScreen(ui.lib, 'browse'); }
    else { key = 'settings'; inner = settingsScreen(); }
    var hasMini = !!miniBar();
    return '<div class="screen with-tabs' + (foot ? ' has-foot' : '') + (hasMini ? ' has-mini' : '') + '" data-key="' + key + '">' + inner + '</div>' + foot;
  }

  function layerHTML(l, idx) {
    var r, key = 'layer:' + idx + ':' + l.t;
    if (l.t === 'picker') { r = { html: libScreen(l, l.mode), foot: '' }; }
    else if (l.t === 'detail') { r = detailLayer(l, idx); key += ':' + l.exId; }
    else if (l.t === 'form') { r = formLayer(l); }
    else { r = histLayer(l); key += ':' + l.hid; }
    var enter = ui.fresh === 'layer' && idx === ui.stack.length - 1;
    return '<div class="layer' + (enter ? ' enter' : '') + '"><div class="screen' + (r.foot ? ' has-foot' : '') + '" data-key="' + key + '">' + r.html + '</div>' + r.foot + '</div>';
  }

  M.html = function () {
    var html = baseHTML() + miniBar() + tabbar();
    ui.stack.forEach(function (l, i) { html += layerHTML(l, i); });
    if (ui.menu) html += menuHTML(ui.menu);
    if (ui.modal) html += modalHTML(ui.modal);
    return html;
  };

  /* Mises à jour partielles (sans tout redessiner : le clavier reste ouvert) */
  M.refreshLib = function (screen, ctx, mode) {
    screen.querySelector('.chips-wrap').innerHTML = chipsHTML(ctx);
    screen.querySelector('.lib-list').innerHTML = listInner(ctx, mode);
  };
  M.refreshStats = function (w) {
    var s = M.templateStats(w);
    var n = document.getElementById('st-n'), se = document.getElementById('st-sets'), v = document.getElementById('st-vol');
    if (n) n.textContent = s.n;
    if (se) se.textContent = s.sets;
    if (v) v.textContent = M.fmtVolume(s.vol);
  };
  M.topLayer = topLayer;

})(window.MU = window.MU || {});
