/* Muscu – socle : utilitaires, catalogue, stockage des données.
   Les données restent dans le navigateur de l'appareil (localStorage, clé « muscu.v1 »).
   Cette clé et le format existant ne changent pas : les séances créées avec la version 1 sont reprises telles quelles. */
(function (M) {
  'use strict';

  M.VERSION = '2.0';

  /* ---------------- Utilitaires ---------------- */

  M.esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  M.norm = function (s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  };
  M.uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  };
  M.fmt = function (n) {
    return String(Math.round(n * 100) / 100).replace('.', ',');
  };
  M.clampInt = function (v, min, max, fallback) {
    var n = Math.round(Number(v));
    if (!isFinite(n)) return fallback;
    return Math.min(max, Math.max(min, n));
  };
  M.safeId = function (v) {
    return typeof v === 'string' && /^[\w-]{1,48}$/.test(v) ? v : M.uid();
  };

  /* ---------------- Dates et durées ---------------- */

  M.dayStart = function (ts) {
    var d = new Date(ts);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };
  /* Début de la semaine (lundi). */
  M.weekStart = function (ts) {
    var d = new Date(M.dayStart(ts));
    var wd = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - wd);
    return d.getTime();
  };
  M.relDay = function (ts) {
    var diff = Math.round((M.dayStart(Date.now()) - M.dayStart(ts)) / 86400000);
    if (diff <= 0) return "Aujourd'hui";
    if (diff === 1) return 'Hier';
    if (diff < 7) return 'Il y a ' + diff + ' jours';
    return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };
  M.fmtDuration = function (ms) {
    var min = Math.max(1, Math.round(ms / 60000));
    if (min < 60) return min + ' min';
    var h = Math.floor(min / 60), m = min % 60;
    return h + ' h ' + (m < 10 ? '0' : '') + m;
  };
  M.fmtClock = function (ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    var mm = (h && m < 10 ? '0' : '') + m;
    return (h ? h + ':' : '') + mm + ':' + (sec < 10 ? '0' : '') + sec;
  };
  M.fmtVolume = function (kg) {
    return Math.round(kg).toLocaleString('fr-FR') + ' kg';
  };

  /* ---------------- Catalogue (intégré + exercices perso) ---------------- */

  M.MUSCLES = MUSCLES;
  M.CATEGORIES = CATEGORIES;
  M.EQUIPMENTS = EQUIPMENTS;
  M.MUSCLE = {};
  MUSCLES.forEach(function (m) { M.MUSCLE[m.id] = m; });
  M.CAT = {};
  M.CAT_OF = {};
  CATEGORIES.forEach(function (c) {
    M.CAT[c.id] = c;
    c.muscles.forEach(function (m) { M.CAT_OF[m] = c.id; });
  });

  M.EX = {};
  M.ALL = [];

  M.rebuild = function () {
    var custom = M.data.custom.map(function (c) {
      return {
        id: c.id, name: c.name, primary: c.primary, secondary: c.secondary, equipment: c.equipment,
        category: c.category, tip: c.tip, custom: true
      };
    });
    M.ALL = EXERCISES.concat(custom);
    M.EX = {};
    M.ALL.forEach(function (e) { M.EX[e.id] = e; });
  };

  M.muscleNames = function (ids) {
    return ids.map(function (i) { return M.MUSCLE[i] ? M.MUSCLE[i].name : ''; }).filter(Boolean).join(', ');
  };
  M.sideOf = function (exId) {
    var e = M.EX[exId];
    return e && e.primary[0] && M.MUSCLE[e.primary[0]] ? M.MUSCLE[e.primary[0]].side : 'front';
  };

  /* ---------------- Stockage ---------------- */

  var KEY = 'muscu.v1';
  var BACKUP_KEY = 'muscu.v1.avant-v2';
  var THEMES = ['auto', 'light', 'dark'];
  var STEPS = [1, 2, 2.5, 5];

  function validMuscles(list) {
    var seen = {};
    return (Array.isArray(list) ? list : []).filter(function (m) {
      if (typeof m !== 'string' || !M.MUSCLE[m] || seen[m]) return false;
      seen[m] = true;
      return true;
    });
  }

  function sanitizeCustom(c) {
    if (!c || typeof c.name !== 'string' || !c.name.trim()) return null;
    var primary = validMuscles(c.primary);
    if (!primary.length) return null;
    var secondary = validMuscles(c.secondary).filter(function (m) { return primary.indexOf(m) === -1; });
    var cat = M.CAT[c.category] ? c.category : M.CAT_OF[primary[0]];
    return {
      id: M.safeId(c.id),
      name: c.name.trim().slice(0, 60),
      category: cat,
      equipment: EQUIPMENTS.indexOf(c.equipment) !== -1 ? c.equipment : 'Autre',
      primary: primary,
      secondary: secondary,
      tip: typeof c.tip === 'string' ? c.tip.slice(0, 600) : ''
    };
  }

  function sanitizeHistory(h) {
    if (!h || !Array.isArray(h.items)) return null;
    var started = Number(h.startedAt) || Date.now();
    return {
      id: M.safeId(h.id),
      workoutId: typeof h.workoutId === 'string' ? h.workoutId : null,
      name: typeof h.name === 'string' && h.name ? h.name.slice(0, 80) : 'Séance',
      startedAt: started,
      endedAt: Math.max(started, Number(h.endedAt) || started),
      items: h.items.filter(function (i) { return i && typeof i.exerciseId === 'string'; }).map(function (i) {
        var sets = M.clampInt(i.sets, 1, 20, 3);
        return {
          exerciseId: i.exerciseId,
          name: typeof i.name === 'string' ? i.name.slice(0, 80) : '',
          primary: validMuscles(i.primary),
          secondary: validMuscles(i.secondary),
          sets: sets,
          reps: M.clampInt(i.reps, 1, 100, 10),
          weight: Math.max(0, Number(i.weight) || 0),
          done: M.clampInt(i.done, 0, sets, 0)
        };
      })
    };
  }

  M.sanitize = function (d) {
    if (!d || typeof d !== 'object' || !Array.isArray(d.workouts)) return null;
    var out = { version: 2, workouts: [], custom: [], history: [], active: null, settings: {} };

    d.workouts.forEach(function (w) {
      if (!w || typeof w.name !== 'string' || !Array.isArray(w.items)) return;
      out.workouts.push({
        id: M.safeId(w.id),
        name: w.name.slice(0, 80) || 'Séance',
        createdAt: Number(w.createdAt) || Date.now(),
        items: w.items
          .filter(function (i) { return i && typeof i.exerciseId === 'string'; })
          .map(function (i) {
            return {
              id: M.safeId(i.id),
              exerciseId: i.exerciseId,
              sets: M.clampInt(i.sets, 1, 20, 3),
              reps: M.clampInt(i.reps, 1, 100, 10),
              weight: Math.max(0, Math.min(1000, Number(i.weight) || 0))
            };
          })
      });
    });

    (Array.isArray(d.custom) ? d.custom : []).forEach(function (c) {
      var s = sanitizeCustom(c);
      if (s) out.custom.push(s);
    });

    (Array.isArray(d.history) ? d.history : []).forEach(function (h) {
      var s = sanitizeHistory(h);
      if (s) out.history.push(s);
    });
    out.history.sort(function (a, b) { return b.endedAt - a.endedAt; });
    out.history = out.history.slice(0, 200);

    var a = d.active;
    if (a && typeof a.workoutId === 'string' && out.workouts.some(function (w) { return w.id === a.workoutId; })) {
      var done = {};
      if (a.done && typeof a.done === 'object') {
        Object.keys(a.done).forEach(function (k) {
          if (Array.isArray(a.done[k])) done[k] = a.done[k].filter(function (n) { return Number.isInteger(n) && n >= 0 && n < 20; });
        });
      }
      out.active = { workoutId: a.workoutId, startedAt: Number(a.startedAt) || Date.now(), done: done };
    }

    var s = d.settings || {};
    out.settings = {
      theme: THEMES.indexOf(s.theme) !== -1 ? s.theme : 'auto',
      goal: M.clampInt(s.goal, 1, 7, 3),
      step: STEPS.indexOf(Number(s.step)) !== -1 ? Number(s.step) : 2.5
    };
    return out;
  };

  function emptyData() { return M.sanitize({ workouts: [] }); }

  M.load = function () {
    var raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { /* stockage indisponible */ }
    if (!raw) return emptyData();
    try {
      var parsed = JSON.parse(raw);
      var clean = M.sanitize(parsed);
      if (clean) {
        // Données de la version 1 : on garde une copie de sécurité avant de les enregistrer au nouveau format.
        if (!parsed.version) {
          try { if (!localStorage.getItem(BACKUP_KEY)) localStorage.setItem(BACKUP_KEY, raw); } catch (e) { /* ignore */ }
        }
        return clean;
      }
    } catch (e) { /* données illisibles */ }
    return emptyData();
  };

  M.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(M.data)); } catch (e) { /* stockage indisponible */ }
  };

  M.data = M.load();
  M.rebuild();

  /* ---------------- Calculs ---------------- */

  M.templateStats = function (w) {
    var sets = 0, vol = 0;
    w.items.forEach(function (i) { sets += i.sets; vol += i.sets * i.reps * i.weight; });
    return { n: w.items.length, sets: sets, vol: vol };
  };

  M.sessionStats = function (h) {
    var done = 0, planned = 0, vol = 0;
    h.items.forEach(function (i) {
      planned += i.sets;
      done += i.done;
      vol += i.done * i.reps * i.weight;
    });
    return { n: h.items.length, done: done, planned: planned, vol: vol, ms: h.endedAt - h.startedAt };
  };

  /* Muscles principaux et secondaires d'une liste d'exercices (séance ou historique). */
  M.musclesOf = function (exIds) {
    var pri = new Set(), sec = new Set();
    exIds.forEach(function (x) {
      var e = x && typeof x === 'object' ? x : M.EX[x];
      if (e) e.primary.forEach(function (m) { pri.add(m); });
    });
    exIds.forEach(function (x) {
      var e = x && typeof x === 'object' ? x : M.EX[x];
      if (e) e.secondary.forEach(function (m) { if (!pri.has(m)) sec.add(m); });
    });
    return { pri: pri, sec: sec };
  };

  M.getWorkout = function (id) {
    return M.data.workouts.find(function (w) { return w.id === id; });
  };

})(window.MU = window.MU || {});
