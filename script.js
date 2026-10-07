// ===== CUSTOM CURSOR + CONTROL PANEL (themes + draggable) =====
(function () {
  ['cc-cursor','cc-ring','cc-style','cc-panel'].forEach(id =>
    document.getElementById(id)?.remove()
  );
  document.body.classList.remove('cc-hover','cc-down');

  // ---------- EMOJI CATEGORIES ----------
  const CATEGORIES = {
    '😀 Smileys': [
      '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃',
      '😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙',
      '🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫',
      '🤔','🤐','🤨','😐','😑','😶','😏','😒','🙄','😬',
      '🤥','😌','😔','😪','🤤','😴','😷','🤒','🤕','🤢',
      '🤮','🤧','🥵','🥶','🥴','😵','🤯','🤠','🥳','🥸',
      '😎','🤓','🧐','😕','😟','🙁','😮','😯','😲','😳',
      '🥺','😦','😧','😨','😰','😥','😢','😭','😱','😖',
      '😣','😞','😓','😩','😫','🥱','😤','😡','😠','🤬',
      '😈','👿','💀','☠️','💩','🤡','👹','👺','👻','👽',
      '👾','🤖','😺','😸','😹','😻','😼','😽','🙀','😿','😾'
    ],
    '🎃 Halloween': [
      '🎃','👻','💀','☠️','🕷️','🕸️','🦇','🧙','🧙‍♂️','🧙‍♀️',
      '🧛','🧛‍♂️','🧛‍♀️','🧟','🧟‍♂️','🧟‍♀️','🪦','🕯️','🩸','🦴',
      '😱','😈','👿','🤡','👹','👺','👽','👾','🖤','🕰️'
    ],
    '🐱 Animals': [
      '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
      '🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐒','🐔',
      '🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺',
      '🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🦂',
      '🐢','🐍','🦎','🦖','🦕','🐙','🦑','🦐','🦞','🦀',
      '🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆',
      '🦓','🦍','🐘','🦏','🦛','🐪','🐫','🦒','🦘','🐃'
    ],
    '🍔 Food': [
      '🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐',
      '🍈','🍒','🍑','🥭','🍍','🥥','🥝','🍅','🍆','🥑',
      '🥦','🥬','🥒','🌶️','🌽','🥕','🧄','🧅','🥔','🍠',
      '🍞','🥐','🥖','🥨','🧀','🥚','🍳','🧈','🥞','🧇',
      '🥓','🥩','🍗','🍖','🌭','🍔','🍟','🍕','🥪','🥙',
      '🌮','🌯','🥗','🥘','🍝','🍜','🍲','🍛','🍣','🍱',
      '🥟','🍤','🍙','🍚','🍘','🍥','🥠','🍢','🍡','🍧',
      '🍨','🍦','🥧','🧁','🍰','🎂','🍮','🍭','🍬','🍫',
      '🍿','🍩','🍪','🌰','🥜','🍯','🥛','🍼','☕','🍵'
    ],
    '⭐ Symbols': [
      '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
      '❣️','💕','💞','💓','💗','💖','💘','💝','💟','☮️',
      '✝️','☪️','🕉️','☸️','✡️','🔯','🕎','☯️','☦️','🛐',
      '⛎','♈','♉','♊','♋','♌','♍','♎','♏','♐',
      '♑','♒','♓','🆔','⚛️','🉑','☢️','☣️','📴','📳',
      '🈶','🈚','🈸','🈺','🈷️','✴️','🆚','💮','🉐','㊙️',
      '㊗️','🈴','🈵','🈹','🈲','🅰️','🅱️','🆎','🆑','🅾️',
      '🆘','❌','⭕','🛑','⛔','📛','🚫','💯','💢','♨️'
    ]
  };

  const PINNED = ['🎃'];
  function getEmojis(catName) {
    const list = CATEGORIES[catName] || [];
    const extra = PINNED.filter(e => !list.includes(e));
    return [...extra, ...list];
  }

  // ---------- THEMES ----------
  const THEMES = {
    'Midnight':  { accent:'#ff3b6b', panelBg:'#14161c', panelBrd:'#2a2e38', text:'#e6e8ee', inputBg:'#1e2129', hoverBg:'#2f3541', radius:'12px', font:"12px/1.4 system-ui, sans-serif" },
    'Pumpkin':   { accent:'#ff7518', panelBg:'#1a0f04', panelBrd:'#3d2208', text:'#ffe6c7', inputBg:'#2a1806', hoverBg:'#3d2208', radius:'14px', font:"12px/1.4 system-ui, sans-serif" },
    'Candy':     { accent:'#ff5fbf', panelBg:'#1e0e2a', panelBrd:'#3d1e52', text:'#ffe0f5', inputBg:'#2c1440', hoverBg:'#3d1e52', radius:'18px', font:"12px/1.4 'Comic Sans MS', system-ui, sans-serif" },
    'Forest':    { accent:'#4ade80', panelBg:'#0f1a14', panelBrd:'#1e3a29', text:'#dff5e6', inputBg:'#16261e', hoverBg:'#1e3a29', radius:'10px', font:"12px/1.4 system-ui, sans-serif" },
    'Ocean':     { accent:'#38bdf8', panelBg:'#0a1622', panelBrd:'#14304a', text:'#dff1ff', inputBg:'#0f2030', hoverBg:'#14304a', radius:'12px', font:"12px/1.4 system-ui, sans-serif" },
    'Cyberpunk': { accent:'#f0ff2b', panelBg:'#0a001a', panelBrd:'#ff00e5', text:'#f0ff2b', inputBg:'#1a0033', hoverBg:'#330066', radius:'4px',  font:"12px/1.4 'Courier New', monospace" },
    'Matrix':    { accent:'#00ff41', panelBg:'#000000', panelBrd:'#00ff41', text:'#00ff41', inputBg:'#001a00', hoverBg:'#003300', radius:'2px',  font:"12px/1.4 'Courier New', monospace" },
    'Light':     { accent:'#e11d48', panelBg:'#ffffff', panelBrd:'#e5e7eb', text:'#111827', inputBg:'#f3f4f6', hoverBg:'#e5e7eb', radius:'12px', font:"12px/1.4 system-ui, sans-serif" }
  };

  // ---------- STYLE ----------
  const style = document.createElement('style');
  style.id = 'cc-style';
  style.textContent = `
    * { cursor: none !important; }
    #cc-cursor, #cc-ring {
      position: fixed; top: 0; left: 0;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 2147483647;
    }
    #cc-cursor {
      width: 10px; height: 10px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; line-height: 1;
      transition: width .15s, height .15s, background .15s;
    }
    #cc-ring {
      width: 34px; height: 34px;
      border: 2px solid;
      border-radius: 50%;
      z-index: 2147483646;
      transition: width .2s, height .2s, border-color .2s;
    }
    body.cc-hover #cc-cursor { width: 16px; height: 16px; }
    body.cc-hover #cc-ring   { width: 52px; height: 52px; }
    body.cc-down  #cc-cursor { width: 6px;  height: 6px; }
    body.cc-down  #cc-ring   { width: 24px; height: 24px; }

    #cc-panel {
      position: fixed; top: 16px; right: 16px;
      width: 300px;
      padding: 14px; z-index: 2147483647;
      border-style: solid; border-width: 1px;
      box-shadow: 0 12px 40px rgba(0,0,0,.5);
      cursor: auto !important; user-select: none;
      max-height: 90vh; overflow-y: auto;
      transition: opacity .15s, background .2s, border-color .2s;
    }
    #cc-panel.hidden {
      opacity: 0;
      transform: translateX(20px);
      pointer-events: none;
    }
    #cc-panel * { cursor: auto !important; }
    #cc-panel h3 {
      margin: 0 0 10px; font-size: 13px;
      display: flex; justify-content: space-between; align-items: center;
      cursor: grab !important;
      padding: 4px 6px;
      margin: -4px -6px 6px;
      border-radius: 6px;
    }
    #cc-panel h3.dragging { cursor: grabbing !important; }
    #cc-panel h3 span { cursor: pointer !important; opacity: .6; }
    #cc-panel h3 span:hover { opacity: 1; }
    #cc-panel label {
      display: flex; justify-content: space-between; align-items: center;
      margin: 8px 0; gap: 8px;
    }
    #cc-panel input[type="color"] { width: 32px; height: 24px; padding: 0; border: none; background: none; }
    #cc-panel input[type="range"] { flex: 1; }
    #cc-panel input[type="text"], #cc-panel select {
      flex: 1;
      border-width: 1px; border-style: solid;
      padding: 4px 6px; font: inherit;
      border-radius: 6px;
    }
    #cc-panel .val { width: 34px; text-align: right; opacity: .7; }
    #cc-panel button {
      width: 100%; margin-top: 10px; padding: 8px;
      border: none; font: inherit; font-weight: 600;
      cursor: pointer !important;
    }
    #cc-panel button:hover { filter: brightness(1.1); }
    #cc-panel.collapsed .body { display: none; }

    #cc-tabs {
      display: flex; gap: 4px;
      margin: 6px 0 4px;
      overflow-x: auto; padding-bottom: 2px;
    }
    #cc-tabs button {
      all: unset;
      flex: 0 0 auto;
      padding: 4px 8px; font-size: 11px;
      border-width: 1px; border-style: solid;
      cursor: pointer !important;
      margin: 0; white-space: nowrap;
      border-radius: 6px;
    }
    #cc-tabs button:hover { filter: brightness(1.2); }

    #cc-emoji-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 2px;
      max-height: 180px; overflow-y: auto;
      border-width: 1px; border-style: solid;
      padding: 4px; margin-top: 4px;
      border-radius: 8px;
    }
    #cc-emoji-grid button {
      all: unset;
      width: 100%; aspect-ratio: 1;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px; border-radius: 4px;
      cursor: pointer !important;
      margin: 0; padding: 0; text-align: center;
    }
    #cc-emoji-grid button:hover { filter: brightness(1.3); }
  `;
  document.head.appendChild(style);

  // ---------- CURSOR ELEMENTS ----------
  const dot  = document.createElement('div'); dot.id  = 'cc-cursor';
  const ring = document.createElement('div'); ring.id = 'cc-ring';
  document.body.append(dot, ring);

  // ---------- STATE ----------
  const state = {
    color:'#ff3b6b', dotSize:10, ringSize:34, trail:0.18,
    shape:'dot', emoji:'🎃', blend:'normal', showRing:true,
    category: Object.keys(CATEGORIES)[0],
    theme: 'Midnight'
  };

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my;

  function apply() {
    dot.style.background   = state.color;
    dot.style.width        = state.dotSize + 'px';
    dot.style.height       = state.dotSize + 'px';
    dot.style.borderRadius = state.shape === 'crosshair' ? '0' : '50%';
    dot.style.mixBlendMode = state.blend;

    ring.style.width        = state.ringSize + 'px';
    ring.style.height       = state.ringSize + 'px';
    ring.style.borderColor  = state.color;
    ring.style.display      = state.showRing ? 'block' : 'none';
    ring.style.mixBlendMode = state.blend;

    if (state.shape === 'ring') {
      dot.style.background = 'transparent';
      dot.textContent = '';
    } else if (state.shape === 'crosshair') {
      dot.style.background = state.color;
      dot.style.width  = '2px';
      dot.style.height = state.ringSize + 'px';
      dot.textContent = '';
    } else if (state.shape === 'emoji') {
      dot.textContent = state.emoji;
      dot.style.background = 'transparent';
      dot.style.width  = 'auto';
      dot.style.height = 'auto';
      dot.style.fontSize = (state.dotSize * 2.4) + 'px';
    } else {
      dot.textContent = '';
    }
  }

  function pickTextOn(hex) {
    const c = hex.replace('#','');
    const r = parseInt(c.substr(0,2),16);
    const g = parseInt(c.substr(2,2),16);
    const b = parseInt(c.substr(4,2),16);
    return (r*0.299 + g*0.587 + b*0.114) > 150 ? '#000' : '#fff';
  }

  function applyTheme(name) {
    const t = THEMES[name] || THEMES['Midnight'];
    state.theme = name;

    panel.style.background   = t.panelBg;
    panel.style.borderColor  = t.panelBrd;
    panel.style.color        = t.text;
    panel.style.font         = t.font;
    panel.style.borderRadius = t.radius;

    resetBtn.style.background   = t.accent;
    resetBtn.style.color        = pickTextOn(t.accent);
    resetBtn.style.borderRadius = t.radius;

    tabs.querySelectorAll('button').forEach(b => {
      const active = b.classList.contains('active');
      b.style.background   = active ? t.accent : t.inputBg;
      b.style.color        = active ? pickTextOn(t.accent) : t.text;
      b.style.borderColor  = active ? t.accent : t.panelBrd;
      b.style.borderRadius = t.radius;
    });

    grid.style.background   = t.inputBg;
    grid.style.borderColor  = t.panelBrd;
    grid.style.borderRadius = t.radius;
    grid.querySelectorAll('button').forEach(b => {
      const sel = b.classList.contains('selected');
      b.style.background = sel ? t.accent : 'transparent';
    });

    [colorIn, shapeIn, emojiIn, dotIn, ringIn, trailIn, blendIn, themeIn].forEach(el => {
      el.style.background  = t.inputBg;
      el.style.color       = t.text;
      el.style.borderColor = t.panelBrd;
    });

    if (!state._customColor) {
      state.color = t.accent;
      colorIn.value = t.accent;
      apply();
    }
  }

  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  addEventListener('mousedown', () => document.body.classList.add('cc-down'));
  addEventListener('mouseup',   () => document.body.classList.remove('cc-down'));

  const clickable = 'a, button, input, select, textarea, [role="button"], [onclick], label';
  document.addEventListener('mouseover', e => {
    if (e.target.closest?.(clickable)) document.body.classList.add('cc-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest?.(clickable)) document.body.classList.remove('cc-hover');
  });

  (function loop() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * state.trail;
    ry += (my - ry) * state.trail;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  // ---------- BUILD PANEL ----------
  const panel = document.createElement('div');
  panel.id = 'cc-panel';

  const h3 = document.createElement('h3');
  h3.textContent = '🎯 Cursor Studio ';
  h3.title = 'Drag to move';
  const toggle = document.createElement('span');
  toggle.id = 'cc-toggle';
  toggle.textContent = '—';
  h3.appendChild(toggle);
  panel.appendChild(h3);

  const body = document.createElement('div');
  body.className = 'body';
  panel.appendChild(body);

  function makeRow(labelText, inputEl) {
    const lab = document.createElement('label');
    lab.append(document.createTextNode(labelText + ' '), inputEl);
    body.appendChild(lab);
    return lab;
  }

  const themeIn = document.createElement('select');
  Object.keys(THEMES).forEach(v => {
    const o = document.createElement('option');
    o.value = v; o.textContent = v;
    themeIn.appendChild(o);
  });
  themeIn.value = state.theme;
  makeRow('Theme', themeIn);

  const colorIn = document.createElement('input');
  colorIn.type = 'color'; colorIn.value = state.color;
  makeRow('Color', colorIn);

  const shapeIn = document.createElement('select');
  ['dot','ring','crosshair','emoji'].forEach(v => {
    const o = document.createElement('option');
    o.value = v;
    o.textContent = { dot:'Dot + Ring', ring:'Ring only', crosshair:'Crosshair', emoji:'Emoji' }[v];
    shapeIn.appendChild(o);
  });
  makeRow('Shape', shapeIn);

  const emojiWrap = document.createElement('div');
  emojiWrap.style.display = 'none';

  const emojiIn = document.createElement('input');
  emojiIn.type = 'text'; emojiIn.maxLength = 4; emojiIn.value = state.emoji;
  emojiIn.style.width = '60px'; emojiIn.style.flex = '0 0 auto';
  const emojiLab = document.createElement('label');
  emojiLab.append(document.createTextNode('Emoji '), emojiIn);
  emojiWrap.appendChild(emojiLab);

  const tabs = document.createElement('div');
  tabs.id = 'cc-tabs';
  emojiWrap.appendChild(tabs);

  const grid = document.createElement('div');
  grid.id = 'cc-emoji-grid';
  emojiWrap.appendChild(grid);

  const emojiButtons = new Map();

  function renderGrid() {
    grid.replaceChildren();
    emojiButtons.clear();
    getEmojis(state.category).forEach(em => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = em;
      if (em === state.emoji) b.classList.add('selected');
      b.onclick = () => {
        state.emoji = em;
        emojiIn.value = em;
        emojiButtons.forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
        apply();
        applyTheme(state.theme);
      };
      emojiButtons.set(em, b);
      grid.appendChild(b);
    });
  }

  function renderTabs() {
    tabs.replaceChildren();
    Object.keys(CATEGORIES).forEach(name => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = name;
      if (name === state.category) b.classList.add('active');
      b.onclick = () => {
        state.category = name;
        renderTabs();
        renderGrid();
        applyTheme(state.theme);
      };
      tabs.appendChild(b);
    });
  }

  renderTabs();
  renderGrid();
  body.appendChild(emojiWrap);

  const dotIn = document.createElement('input');
  dotIn.type = 'range'; dotIn.min = 2; dotIn.max = 40; dotIn.value = state.dotSize;
  const dotV = document.createElement('span'); dotV.className = 'val'; dotV.textContent = state.dotSize;
  const dotRow = makeRow('Dot', dotIn); dotRow.appendChild(dotV);

  const ringIn = document.createElement('input');
  ringIn.type = 'range'; ringIn.min = 0; ringIn.max = 120; ringIn.value = state.ringSize;
  const ringV = document.createElement('span'); ringV.className = 'val'; ringV.textContent = state.ringSize;
  const ringRow = makeRow('Ring', ringIn); ringRow.appendChild(ringV);

  const trailIn = document.createElement('input');
  trailIn.type = 'range'; trailIn.min = 0.03; trailIn.max = 0.6; trailIn.step = 0.01; trailIn.value = state.trail;
  const trailV = document.createElement('span'); trailV.className = 'val'; trailV.textContent = state.trail;
  const trailRow = makeRow('Trail', trailIn); trailRow.appendChild(trailV);

  const showRingIn = document.createElement('input');
  showRingIn.type = 'checkbox'; showRingIn.checked = true;
  makeRow('Ring on', showRingIn);

  const blendIn = document.createElement('select');
  ['normal','difference','screen','exclusion'].forEach(v => {
    const o = document.createElement('option');
    o.value = v; o.textContent = v;
    blendIn.appendChild(o);
  });
  makeRow('Blend', blendIn);

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  body.appendChild(resetBtn);

  const hint = document.createElement('div');
  hint.style.cssText = 'opacity:.5;font-size:10px;margin-top:8px;text-align:center';
  hint.textContent = 'Drag the title bar • AltGr = hide/show';
  body.appendChild(hint);

  document.body.appendChild(panel);

  // ---------- DRAG TO MOVE ----------
  (function makeDraggable() {
    let dragging = false;
    let offsetX = 0, offsetY = 0;

    h3.addEventListener('mousedown', (e) => {
      // Don't drag when clicking the collapse "—"
      if (e.target === toggle) return;
      e.preventDefault();

      // Freeze current position based on bounding rect (handles right/top anchoring)
      const rect = panel.getBoundingClientRect();
      panel.style.left   = rect.left + 'px';
      panel.style.top    = rect.top + 'px';
      panel.style.right  = 'auto';
      panel.style.bottom = 'auto';

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      dragging = true;
      h3.classList.add('dragging');

      document.addEventListener('mousemove', onMove, true);
      document.addEventListener('mouseup',   onUp,   true);
    });

    function onMove(e) {
      if (!dragging) return;
      e.preventDefault();

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Keep panel on-screen
      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      x = Math.max(4, Math.min(innerWidth  - w - 4, x));
      y = Math.max(4, Math.min(innerHeight - h - 4, y));

      panel.style.left = x + 'px';
      panel.style.top  = y + 'px';
    }

    function onUp() {
      dragging = false;
      h3.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('mouseup',   onUp,   true);
    }
  })();

  // ---------- WIRE UP ----------
  themeIn.onchange  = e => applyTheme(e.target.value);
  colorIn.oninput   = e => { state.color = e.target.value; state._customColor = true; apply(); };
  dotIn.oninput     = e => { state.dotSize = +e.target.value; dotV.textContent = state.dotSize; apply(); };
  ringIn.oninput    = e => { state.ringSize = +e.target.value; ringV.textContent = state.ringSize; apply(); };
  trailIn.oninput   = e => { state.trail = +e.target.value; trailV.textContent = state.trail; };
  showRingIn.onchange = e => { state.showRing = e.target.checked; apply(); };
  blendIn.onchange  = e => { state.blend = e.target.value; apply(); };
  shapeIn.onchange  = e => {
    state.shape = e.target.value;
    emojiWrap.style.display = state.shape === 'emoji' ? 'block' : 'none';
    apply();
  };
  emojiIn.oninput   = e => {
    state.emoji = e.target.value || '🎃';
    emojiButtons.forEach((b, em) => b.classList.toggle('selected', em === state.emoji));
    apply();
    applyTheme(state.theme);
  };
  toggle.onclick    = () => panel.classList.toggle('collapsed');
  resetBtn.onclick  = () => {
    Object.assign(state, {
      color:'#ff3b6b', dotSize:10, ringSize:34, trail:0.18,
      shape:'dot', emoji:'🎃', blend:'normal', showRing:true,
      category: Object.keys(CATEGORIES)[0],
      theme: 'Midnight',
      _customColor: false
    });
    themeIn.value = state.theme;
    colorIn.value = state.color;
    dotIn.value = state.dotSize;  dotV.textContent = state.dotSize;
    ringIn.value = state.ringSize; ringV.textContent = state.ringSize;
    trailIn.value = state.trail;  trailV.textContent = state.trail;
    shapeIn.value = state.shape; blendIn.value = state.blend;
    showRingIn.checked = true;
    emojiIn.value = state.emoji;
    emojiWrap.style.display = 'none';
    renderTabs(); renderGrid();
    apply();
    applyTheme(state.theme);
  };

  // ---------- ALTGR TOGGLE ----------
  function onKey(e) {
    const isAltGr = e.key === 'AltGraph' ||
                    (e.ctrlKey && e.altKey && !e.metaKey && !e.shiftKey) ||
                    (e.getModifierState && e.getModifierState('AltGraph'));
    if (!isAltGr) return;
    e.preventDefault(); e.stopPropagation();
    panel.classList.toggle('hidden');
  }
  window.addEventListener('keydown', onKey, true);

  apply();
  applyTheme(state.theme);

  window.removeCustomCursor = () => {
    window.removeEventListener('keydown', onKey, true);
    dot.remove(); ring.remove(); style.remove(); panel.remove();
    document.body.classList.remove('cc-hover','cc-down');
    delete window.removeCustomCursor;
    console.log('Custom cursor removed.');
  };

  console.log('✅ Cursor Studio loaded. Drag the title bar to move. AltGr = toggle.');
})();
