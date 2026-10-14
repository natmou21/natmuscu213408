/* Muscu – actions, événements et démarrage. */
(function (M) {
  'use strict';

  var ui = M.ui;
  var $app = document.getElementById('app');
  var $toast = document.getElementById('toast');

  /* ------------------------------------------------------------------ */
  /* Thème                                                               */
  /* ------------------------------------------------------------------ */

  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function applyTheme() {
    var t = M.data.settings.theme, root = document.documentElement;
    if (t === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', t);
    var dark = t === 'dark' || (t === 'auto' && mq && mq.matches);
    Array.prototype.forEach.call(document.querySelectorAll('meta[name="theme-color"]'), function (m) { m.remove(); });
    var meta = document.createElement('meta');
    meta.name = 'theme-color';
    meta.content = dark ? '#000000' : '#f2f2f7';
    document.head.appendChild(meta);
  }
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (M.data.settings.theme === 'auto') applyTheme(); });

  /* ------------------------------------------------------------------ */
  /* Messages, menus, boîtes de dialogue                                 */
  /* ------------------------------------------------------------------ */

  var toastTimer = null;
  function toast(msg) {
    if (!$toast) return;
    $toast.textContent = msg;
    $toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { $toast.classList.remove('show'); }, 2200);
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

  function tick() {
    var a = M.data.active;
    var txt = a ? M.fmtClock(Date.now() - a.startedAt) : '0:00';
    Array.prototype.forEach.call(document.querySelectorAll('[data-timer]'), function (el) { el.textContent = txt; });
  }

  function render() {
    var scrolls = {};
    Array.prototype.forEach.call($app.querySelectorAll('.screen[data-key]'), function (s) { scrolls[s.dataset.key] = s.scrollTop; });
    $app.innerHTML = M.html();
    Array.prototype.forEach.call($app.querySelectorAll('.screen[data-key]'), function (s) {
      if (scrolls[s.dataset.key]) s.scrollTop = scrolls[s.dataset.key];
    });
    if (ui.fresh === 'modal') {
      var mi = document.getElementById('modalInput');
      if (mi && !mi.readOnly) { mi.focus(); if (mi.tagName === 'INPUT' && mi.select) mi.select(); }
    }
    ui.fresh = null;
    ui.ringAnim = false;
    tick();
  }
  setInterval(tick, 1000);
  document.addEventListener('visibilitychange', tick);

  /* ------------------------------------------------------------------ */
  /* Données : actions                                                   */
  /* ------------------------------------------------------------------ */

  function findItem(w, id) { return w && w.items.find(function (i) { return i.id === id; }); }

  function addItem(wid, exId) {
    var w = M.getWorkout(wid);
    if (!w || !M.EX[exId]) return;
    w.items.push({ id: M.uid(), exerciseId: exId, sets: 3, reps: 10, weight: 0 });
    M.save();
  }
  function replaceItem(wid, itemId, exId) {
    var it = findItem(M.getWorkout(wid), itemId);
    if (it && M.EX[exId]) { it.exerciseId = exId; M.save(); }
  }
  function moveItem(w, itemId, delta) {
    var i = w.items.findIndex(function (x) { return x.id === itemId; });
    var j = i + delta;
    if (i < 0 || j < 0 || j >= w.items.length) return;
    var tmp = w.items[i]; w.items[i] = w.items[j]; w.items[j] = tmp;
    M.save();
  }

  function openWorkoutScreen(wid) {
    ui.tab = 'workouts';
    ui.workoutId = wid;
    ui.reorder = false;
    ui.stack = [];
  }

  function openDetail(exId) {
    if (!M.EX[exId]) return;
    ui.stack.push({ t: 'detail', exId: exId, side: M.sideOf(exId) });
    ui.fresh = 'layer';
  }
  function openPicker(mode, wid, itemId) {
    ui.stack.push({ t: 'picker', mode: mode, wid: wid, itemId: itemId || null, cat: null, muscle: null, q: '', added: new Set() });
    ui.fresh = 'layer';
  }
  function popPicker() {
    for (var i = ui.stack.length - 1; i >= 0; i--) {
      if (ui.stack[i].t === 'picker') { ui.stack = ui.stack.slice(0, i); return; }
    }
  }

  /* ---- Séances ---- */

  function removeWorkout(w) {
    M.data.workouts = M.data.workouts.filter(function (x) { return x.id !== w.id; });
    if (M.data.active && M.data.active.workoutId === w.id) M.data.active = null;
    if (ui.workoutId === w.id) { ui.workoutId = null; ui.reorder = false; }
    M.save();
  }

  function workoutMenu(w) {
    var actions = [
      { label: 'Renommer', fn: function () {
        askText('Renommer la séance', w.name, 'Nom de la séance', 'Enregistrer', function (v) {
          v = v.trim();
          if (v) { w.name = v; M.save(); }
        });
      } },
      { label: 'Dupliquer', fn: function () {
        M.data.workouts.unshift({
          id: M.uid(), name: (w.name + ' (copie)').slice(0, 80), createdAt: Date.now(),
          items: w.items.map(function (i) { return { id: M.uid(), exerciseId: i.exerciseId, sets: i.sets, reps: i.reps, weight: i.weight }; })
        });
        M.save();
        toast('Séance dupliquée');
      } }
    ];
    if (M.data.active && M.data.active.workoutId === w.id) {
      actions.push({ label: 'Abandonner la séance en cours', danger: true, fn: function () {
        confirmBox('Abandonner la séance ?', 'Les séries cochées ne seront pas enregistrées dans l\'historique.', 'Abandonner', function () {
          M.data.active = null; M.save();
        });
      } });
    }
    actions.push({ label: 'Supprimer la séance', danger: true, fn: function () {
      confirmBox('Supprimer « ' + w.name + ' » ?', 'Cette action est définitive. Ton historique est conservé.', 'Supprimer', function () { removeWorkout(w); });
    } });
    openMenu(w.name, actions);
  }

  function itemMenu(w, it) {
    var e = M.EX[it.exerciseId];
    var idx = w.items.indexOf(it);
    var actions = [];
    if (e) actions.push({ label: 'Voir les muscles', fn: function () { openDetail(it.exerciseId); } });
    actions.push({ label: 'Remplacer l\'exercice', fn: function () { openPicker('replace', w.id, it.id); } });
    if (idx > 0) actions.push({ label: 'Monter', fn: function () { moveItem(w, it.id, -1); } });
    if (idx < w.items.length - 1) actions.push({ label: 'Descendre', fn: function () { moveItem(w, it.id, 1); } });
    actions.push({ label: 'Supprimer l\'exercice', danger: true, fn: function () {
      w.items = w.items.filter(function (x) { return x.id !== it.id; });
      if (M.data.active && M.data.active.done) delete M.data.active.done[it.id];
      M.save();
    } });
    openMenu(e ? e.name : 'Exercice', actions);
  }

  /* ---- Séance en cours et historique ---- */

  function startSession(wid) {
    var w = M.getWorkout(wid);
    if (!w || !w.items.length) return;
    var a = M.data.active;
    if (a && a.workoutId === wid) { openWorkoutScreen(wid); return; }
    function go() {
      M.data.active = { workoutId: wid, startedAt: Date.now(), done: {} };
      M.save();
      openWorkoutScreen(wid);
      toast('Séance démarrée');
    }
    if (a) {
      confirmBox('Une séance est déjà en cours', 'La démarrer ici abandonne la séance en cours.', 'Remplacer', go);
      return;
    }
    go();
  }

  function sessionSummary() {
    var a = M.data.active, w = M.getWorkout(a.workoutId);
    var done = 0, planned = 0;
    w.items.forEach(function (it) {
      planned += it.sets;
      done += (a.done[it.id] || []).filter(function (i) { return i < it.sets; }).length;
    });
    return { done: done, planned: planned, ms: Date.now() - a.startedAt };
  }

  function finishSession() {
    var a = M.data.active, w = a && M.getWorkout(a.workoutId);
    if (!a || !w) return;
    var h = {
      id: M.uid(), workoutId: w.id, name: w.name, startedAt: a.startedAt, endedAt: Date.now(),
      items: w.items.map(function (it) {
        var e = M.EX[it.exerciseId];
        return {
          exerciseId: it.exerciseId, name: e ? e.name : '', primary: e ? e.primary.slice() : [], secondary: e ? e.secondary.slice() : [],
          sets: it.sets, reps: it.reps, weight: it.weight,
          done: (a.done[it.id] || []).filter(function (i) { return i < it.sets; }).length
        };
      })
    };
    M.data.history.unshift(h);
    M.data.history = M.data.history.slice(0, 200);
    M.data.active = null;
    M.save();
    ui.tab = 'home';
    ui.workoutId = null;
    ui.reorder = false;
    ui.ringAnim = true;
    toast('Séance enregistrée');
  }

  function redoFromHistory(hid) {
    var h = M.data.history.find(function (x) { return x.id === hid; });
    if (!h) return;
    var w = h.workoutId && M.getWorkout(h.workoutId);
    if (!w) {
      var items = h.items.filter(function (i) { return M.EX[i.exerciseId]; }).map(function (i) {
        return { id: M.uid(), exerciseId: i.exerciseId, sets: i.sets, reps: i.reps, weight: i.weight };
      });
      if (!items.length) { info('Séance impossible à refaire', 'Les exercices de cette séance n\'existent plus.'); return; }
      w = { id: M.uid(), name: h.name, createdAt: Date.now(), items: items };
      M.data.workouts.unshift(w);
      M.save();
    }
    ui.stack = [];
    startSession(w.id);
  }

  function pickAndStart() {
    var list = M.data.workouts.filter(function (w) { return w.items.length; });
    if (!list.length) {
      info('Aucune séance prête', M.data.workouts.length ? 'Ajoute d\'abord des exercices à une séance.' : 'Crée une séance et ajoute des exercices pour la démarrer.');
      return;
    }
    if (list.length === 1) { startSession(list[0].id); return; }
    openMenu('Quelle séance ?', list.map(function (w) {
      return { label: w.name, fn: function () { startSession(w.id); } };
    }));
  }

  /* ---- Exercices créés ---- */

  function saveForm(f) {
    if (M.formError(f)) return;
    var cat = M.formCat(f);
    var secondary = f.secondary.filter(function (m) { return f.primary.indexOf(m) === -1; });
    var obj = { id: f.editId || ('perso-' + M.uid()), name: f.name.trim(), category: cat, equipment: f.equipment, primary: f.primary.slice(), secondary: secondary, tip: f.tip.trim() };
    var below = M.pickerBelow(ui.stack.length - 1);
    if (f.editId) {
      var i = M.data.custom.findIndex(function (c) { return c.id === f.editId; });
      if (i >= 0) M.data.custom[i] = obj;
    } else {
      M.data.custom.push(obj);
    }
    M.rebuild();
    M.save();
    ui.stack.pop();
    if (f.editId) { toast('Exercice modifié'); return; }
    if (below && below.mode === 'add') {
      addItem(below.wid, obj.id);
      below.added.add(obj.id);
      toast('Exercice créé et ajouté à la séance');
    } else if (below && below.mode === 'replace') {
      replaceItem(below.wid, below.itemId, obj.id);
      ui.stack = [];
      toast('Exercice créé et remplacé');
    } else {
      toast('Exercice créé');
    }
  }

  function deleteCustom(exId) {
    var e = M.EX[exId];
    if (!e || !e.custom) return;
    var used = M.data.workouts.reduce(function (n, w) { return n + w.items.filter(function (i) { return i.exerciseId === exId; }).length; }, 0);
    confirmBox('Supprimer « ' + e.name + ' » ?',
      used ? 'Il sera aussi retiré de ' + used + ' emplacement' + (used > 1 ? 's' : '') + ' dans tes séances. Ton historique est conservé.' : 'Cette action est définitive.',
      'Supprimer', function () {
        M.data.custom = M.data.custom.filter(function (c) { return c.id !== exId; });
        M.data.workouts.forEach(function (w) {
          w.items = w.items.filter(function (i) {
            if (i.exerciseId === exId && M.data.active && M.data.active.done) delete M.data.active.done[i.id];
            return i.exerciseId !== exId;
          });
        });
        M.rebuild();
        M.save();
        ui.stack = ui.stack.filter(function (l) { return !(l.t === 'detail' && l.exId === exId); });
        toast('Exercice supprimé');
      });
  }

  /* ---- Sauvegarde ---- */

  function backupMenuCopy() {
    var json = JSON.stringify(M.data);
    function done() { info('Sauvegarde copiée', 'Colle-la dans une note ou un message pour la conserver. Tu pourras la restaurer ici.'); render(); }
    function fallback() {
      ui.modal = { title: 'Ma sauvegarde', message: 'Copie tout ce texte et garde-le.', input: { value: json, multiline: true, readonly: true }, okLabel: 'Fermer', noCancel: true, onOk: function () {} };
      ui.fresh = 'modal';
      render();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(json).then(done, fallback);
    else fallback();
  }

  function backupRestore() {
    ui.modal = {
      title: 'Restaurer', message: 'Colle ici ta sauvegarde. Elle remplacera les données actuelles.',
      input: { value: '', multiline: true, placeholder: 'Colle la sauvegarde ici' }, okLabel: 'Restaurer',
      onOk: function (text) {
        var parsed = null;
        try { parsed = M.sanitize(JSON.parse(text)); } catch (e) { /* texte invalide */ }
        if (!parsed) { info('Sauvegarde illisible', 'Le texte collé n\'est pas une sauvegarde valide.'); return; }
        M.data = parsed;
        M.rebuild();
        ui.workoutId = null;
        ui.stack = [];
        M.save();
        applyTheme();
        info('Sauvegarde restaurée', parsed.workouts.length + ' séance(s), ' + parsed.custom.length + ' exercice(s) créé(s), ' + parsed.history.length + ' séance(s) dans l\'historique.');
      }
    };
    ui.fresh = 'modal';
  }

  /* ------------------------------------------------------------------ */
  /* Contextes de la bibliothèque                                        */
  /* ------------------------------------------------------------------ */

  function libContext(el) {
    var scr = el.closest('.screen');
    var key = scr ? scr.dataset.key : '';
    if (key.indexOf('layer:') === 0) {
      var idx = Number(key.split(':')[1]);
      return { screen: scr, ctx: ui.stack[idx], mode: ui.stack[idx].mode };
    }
    return { screen: scr, ctx: ui.lib, mode: 'browse' };
  }

  /* ------------------------------------------------------------------ */
  /* Clics                                                               */
  /* ------------------------------------------------------------------ */

  document.addEventListener('click', function (ev) {
    var ae = document.activeElement;
    if (ae && (ae.tagName === 'INPUT' || ae.tagName === 'TEXTAREA') && !ev.target.closest('input, textarea')) ae.blur();

    var el = ev.target.closest('[data-a]');
    if (!el) return;
    var a = el.dataset.a, d = el.dataset;
    var w, it, top = M.topLayer(), lc;

    switch (a) {
      case 'tab':
        if (d.tab === 'workouts' && ui.tab === 'workouts') { ui.workoutId = null; ui.reorder = false; }
        if (d.tab === 'home') ui.ringAnim = true;
        ui.tab = d.tab;
        break;
      case 'goList': ui.tab = 'workouts'; ui.workoutId = null; ui.reorder = false; break;

      case 'new':
        askText('Nouvelle séance', '', 'Ex. Pectoraux / Triceps', 'Créer', function (name) {
          var wk = { id: M.uid(), name: name.trim() || 'Séance ' + (M.data.workouts.length + 1), createdAt: Date.now(), items: [] };
          M.data.workouts.unshift(wk);
          M.save();
          openWorkoutScreen(wk.id);
        });
        break;
      case 'openWorkout': openWorkoutScreen(d.w); break;
      case 'backList': ui.workoutId = null; ui.reorder = false; break;
      case 'wmenu':
        w = M.getWorkout(d.w);
        if (w) workoutMenu(w);
        break;
      case 'imenu':
        w = M.getWorkout(ui.workoutId);
        it = findItem(w, d.item);
        if (it) itemMenu(w, it);
        break;

      case 'startW': startSession(d.w); break;
      case 'pickStart': pickAndStart(); break;
      case 'openActive':
        if (M.data.active) openWorkoutScreen(M.data.active.workoutId);
        break;
      case 'finish': {
        if (!M.data.active || !M.getWorkout(M.data.active.workoutId)) break;
        var s = sessionSummary();
        ui.modal = {
          title: 'Terminer la séance ?',
          message: s.done + ' série' + (s.done > 1 ? 's' : '') + ' cochée' + (s.done > 1 ? 's' : '') + ' sur ' + s.planned + ', durée ' + M.fmtDuration(s.ms) + '.',
          okLabel: 'Terminer', onOk: finishSession
        };
        ui.fresh = 'modal';
        break;
      }
      case 'setdone': {
        var act = M.data.active;
        if (!act) break;
        var arr = act.done[d.item] || (act.done[d.item] = []);
        var n = Number(d.i), pos = arr.indexOf(n);
        if (pos === -1) arr.push(n); else arr.splice(pos, 1);
        M.save();
        break;
      }

      case 'reorderToggle': ui.reorder = !ui.reorder; break;
      case 'move':
        w = M.getWorkout(ui.workoutId);
        if (w) moveItem(w, d.item, Number(d.d));
        break;
      case 'drag': return; // géré par les événements pointeur

      case 'addEx':
        if (M.getWorkout(ui.workoutId)) openPicker('add', ui.workoutId);
        break;
      case 'closePicker': popPicker(); break;
      case 'closeLayer': ui.stack.pop(); break;

      case 'chip':
        lc = libContext(el);
        lc.ctx.cat = d.c || null;
        lc.ctx.muscle = null;
        M.refreshLib(lc.screen, lc.ctx, lc.mode);
        return;
      case 'mchip':
        lc = libContext(el);
        lc.ctx.muscle = d.m || null;
        M.refreshLib(lc.screen, lc.ctx, lc.mode);
        return;

      case 'open':
      case 'info':
        openDetail(d.ex);
        break;

      case 'pick': {
        var p = top && top.t === 'picker' ? top : null;
        if (!p) return;
        if (p.mode === 'add') {
          addItem(p.wid, d.ex);
          p.added.add(d.ex);
        } else {
          replaceItem(p.wid, p.itemId, d.ex);
          ui.stack = [];
        }
        break;
      }
      case 'detailAction': {
        var pk = M.pickerBelow(ui.stack.length - 1);
        if (!pk || !top || top.t !== 'detail') return;
        if (pk.mode === 'add') {
          if (!pk.added.has(top.exId)) { addItem(pk.wid, top.exId); pk.added.add(top.exId); }
          ui.stack.pop();
        } else {
          replaceItem(pk.wid, pk.itemId, top.exId);
          ui.stack = [];
        }
        break;
      }
      case 'side':
        if (top && top.t === 'detail') top.side = d.side;
        break;

      case 'exmenu': {
        var ex = M.EX[d.ex];
        if (!ex || !ex.custom) break;
        openMenu(ex.name, [
          { label: 'Modifier', fn: function () {
            var c = M.data.custom.find(function (x) { return x.id === ex.id; });
            if (c) { ui.stack.push(M.newForm({ edit: c })); ui.fresh = 'layer'; }
          } },
          { label: 'Supprimer', danger: true, fn: function () { deleteCustom(ex.id); } }
        ]);
        break;
      }

      /* Création d'exercice */
      case 'newEx':
        ui.stack.push(M.newForm({ name: d.name || '' }));
        ui.fresh = 'layer';
        break;
      case 'fcat': if (top && top.t === 'form') top.cat = d.c; break;
      case 'feq': if (top && top.t === 'form') top.equipment = d.q; break;
      case 'fside': if (top && top.t === 'form') top.side = d.side; break;
      case 'mtoggle': {
        if (!top || top.t !== 'form') return;
        var id = d.m, pi = top.primary.indexOf(id), si = top.secondary.indexOf(id), state;
        if (pi !== -1) { top.primary.splice(pi, 1); top.secondary.push(id); state = 'secondaire'; }
        else if (si !== -1) { top.secondary.splice(si, 1); state = 'non travaillé'; }
        else { top.primary.push(id); state = 'principal'; }
        toast(M.MUSCLE[id].name + ' : ' + state);
        break;
      }
      case 'fsave':
        if (top && top.t === 'form') saveForm(top);
        break;

      /* Historique */
      case 'hist':
        ui.stack.push({ t: 'hist', hid: d.h });
        ui.fresh = 'layer';
        break;
      case 'histRedo': redoFromHistory(d.h); break;
      case 'hmenu':
        openMenu('Cette séance', [{ label: 'Supprimer de l\'historique', danger: true, fn: function () {
          confirmBox('Supprimer cette séance de l\'historique ?', 'Cette action est définitive.', 'Supprimer', function () {
            M.data.history = M.data.history.filter(function (x) { return x.id !== d.h; });
            ui.stack = [];
            M.save();
          });
        } }]);
        break;

      /* Pas de poids, étapes */
      case 'step': {
        w = M.getWorkout(ui.workoutId);
        it = findItem(w, d.item);
        if (!it) return;
        var delta = Number(d.d);
        if (d.f === 'weight') {
          it.weight = Math.max(0, Math.min(1000, Math.round((it.weight + delta * M.data.settings.step) * 100) / 100));
        } else if (d.f === 'sets') {
          it.sets = M.clampInt(it.sets + delta, 1, 20, it.sets);
          var dn = M.data.active && M.data.active.done[it.id];
          if (dn) M.data.active.done[it.id] = dn.filter(function (i) { return i < it.sets; });
        } else if (d.f === 'reps') {
          it.reps = M.clampInt(it.reps + delta, 1, 100, it.reps);
        }
        M.save();
        break;
      }

      /* Réglages */
      case 'theme': M.data.settings.theme = d.t; M.save(); applyTheme(); break;
      case 'goal': M.data.settings.goal = M.clampInt(M.data.settings.goal + Number(d.d), 1, 7, 3); M.save(); break;
      case 'wstep': M.data.settings.step = Number(d.v); M.save(); break;
      case 'backupCopy': backupMenuCopy(); return;
      case 'backupRestore': backupRestore(); break;
      case 'clearHistory':
        confirmBox('Effacer l\'historique ?', 'Tes séances et tes exercices sont conservés. Seul l\'historique des séances terminées est supprimé.', 'Effacer', function () {
          M.data.history = [];
          M.save();
          toast('Historique effacé');
        });
        break;

      /* Menus et boîtes de dialogue */
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

  /* ------------------------------------------------------------------ */
  /* Saisie                                                              */
  /* ------------------------------------------------------------------ */

  function updateFormValidity(f) {
    var err = M.formError(f);
    var btn = document.getElementById('f-save'), msg = document.getElementById('f-err');
    if (btn) btn.disabled = !!err;
    if (msg) msg.textContent = err;
  }

  document.addEventListener('input', function (ev) {
    var t = ev.target;
    if (!t.matches) return;
    var top = M.topLayer();
    if (t.matches('[data-a="search"]')) {
      var lc = libContext(t);
      lc.ctx.q = t.value;
      M.refreshLib(lc.screen, lc.ctx, lc.mode);
    } else if (t.matches('[data-a="fname"]') && top && top.t === 'form') {
      top.name = t.value;
      updateFormValidity(top);
    } else if (t.matches('[data-a="ftip"]') && top && top.t === 'form') {
      top.tip = t.value;
    }
  });

  document.addEventListener('change', function (ev) {
    var t = ev.target;
    if (!(t.matches && t.matches('[data-a="weight"]'))) return;
    var w = M.getWorkout(ui.workoutId);
    var it = findItem(w, t.dataset.item);
    if (!it) return;
    var v = parseFloat(String(t.value).replace(',', '.').replace(/[^\d.]/g, ''));
    it.weight = isFinite(v) ? Math.max(0, Math.min(1000, Math.round(v * 100) / 100)) : 0;
    t.value = M.fmt(it.weight);
    M.save();
    M.refreshStats(w);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter') return;
    var t = ev.target;
    if (t.id === 'modalInput' && t.tagName === 'INPUT') {
      var ok = document.querySelector('[data-a="modalOk"]');
      if (ok) ok.click();
    } else if (t.matches && t.matches('[data-a="weight"], [data-a="search"], [data-a="fname"]')) {
      t.blur();
    } else if (t.matches && t.matches('.row[role="button"]')) {
      t.click();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Glisser pour réorganiser                                            */
  /* ------------------------------------------------------------------ */

  document.addEventListener('pointerdown', function (ev) {
    var handle = ev.target.closest && ev.target.closest('[data-a="drag"]');
    if (!handle) return;
    var row = handle.closest('.rrow'), list = row && row.parentNode;
    if (!list) return;
    ev.preventDefault();
    var startY = ev.clientY;
    row.classList.add('dragging');
    if (handle.setPointerCapture) { try { handle.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ } }

    function swapIfNeeded() {
      var moved = true, guard = 0;
      while (moved && guard++ < 50) {
        moved = false;
        var r = row.getBoundingClientRect(), mid = r.top + r.height / 2;
        var next = row.nextElementSibling, prev = row.previousElementSibling, before = row.offsetTop;
        if (next) {
          var nr = next.getBoundingClientRect();
          if (mid > nr.top + nr.height / 2) { list.insertBefore(next, row); startY += row.offsetTop - before; moved = true; continue; }
        }
        if (prev) {
          var pr = prev.getBoundingClientRect();
          if (mid < pr.top + pr.height / 2) { list.insertBefore(row, prev); startY += row.offsetTop - before; moved = true; }
        }
        row.style.transform = 'translateY(' + (lastY - startY) + 'px)';
      }
    }
    var lastY = startY;
    function move(e) {
      lastY = e.clientY;
      row.style.transform = 'translateY(' + (lastY - startY) + 'px)';
      swapIfNeeded();
    }
    function end() {
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', end);
      handle.removeEventListener('pointercancel', end);
      row.classList.remove('dragging');
      row.style.transform = '';
      var w = M.getWorkout(ui.workoutId);
      if (w) {
        var order = Array.prototype.map.call(list.children, function (r) { return r.dataset.item; });
        var byId = {};
        w.items.forEach(function (i) { byId[i.id] = i; });
        var next = order.map(function (id) { return byId[id]; }).filter(Boolean);
        if (next.length === w.items.length) { w.items = next; M.save(); }
      }
      render();
    }
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', end);
    handle.addEventListener('pointercancel', end);
  });

  /* ------------------------------------------------------------------ */
  /* Démarrage                                                           */
  /* ------------------------------------------------------------------ */

  applyTheme();
  render();

  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    var hadController = !!navigator.serviceWorker.controller;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* hors connexion indisponible */ });
    });
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (hadController) toast('Mise à jour installée. Elle sera active à la prochaine ouverture.');
    });
  }

})(window.MU);
