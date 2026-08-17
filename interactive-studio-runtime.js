(() => {
  'use strict';

  const host = document.getElementById('studioHost');
  const boot = document.getElementById('bootCard');
  if (!host) return;

  let appDoc = null;
  let addonMode = 'edit';
  let currentFrame = null;
  let currentRuntime = null;
  let frameObserver = null;
  let internalModeChange = false;

  const q = (sel, root = appDoc) => root?.querySelector(sel) || null;
  const qa = (sel, root = appDoc) => root ? [...root.querySelectorAll(sel)] : [];

  function injectAppStyles() {
    if (!appDoc || appDoc.getElementById('studioLessonAddonStyles')) return;
    const style = appDoc.createElement('style');
    style.id = 'studioLessonAddonStyles';
    style.textContent = `
      .mode-switch .lesson-mode-button{display:inline-flex;align-items:center;gap:6px}
      .mode-switch .lesson-mode-button::before{content:"◆";font-size:8px;color:#f59e0b}
      body.studio-lesson-active .mode-switch .lesson-mode-button.is-active{background:#fff7e6;color:#9a5600;box-shadow:inset 0 0 0 1px #f4c46d}
      body.studio-lesson-active .canvas-hint{visibility:hidden!important}
      body.studio-lesson-active .inspector>.inspector-head,
      body.studio-lesson-active .inspector>.empty-inspector,
      body.studio-lesson-active .inspector>.property-form,
      body.studio-lesson-active .inspector>.inspector-footer{display:none!important}
      #lessonInspector{display:none;height:100%;min-height:0;flex-direction:column;background:#fff;color:#162033}
      body.studio-lesson-active #lessonInspector{display:flex}
      .lesson-panel-head{padding:18px 18px 13px;border-bottom:1px solid #e6e9ef;background:linear-gradient(180deg,#fffaf0,#fff)}
      .lesson-panel-head .lesson-eyebrow{margin:0 0 5px;color:#a86000;font-size:10px;font-weight:900;letter-spacing:.16em}
      .lesson-panel-head h2{margin:0;font-size:17px;letter-spacing:-.02em}
      .lesson-panel-head p{margin:7px 0 0;color:#778196;font-size:11px;line-height:1.5}
      .lesson-panel-body{min-height:0;overflow:auto;padding:14px 16px 22px}
      .lesson-step-status{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding:10px 12px;border-radius:10px;background:#15213a;color:#fff}
      .lesson-step-status strong{font-size:12px}.lesson-step-status span{font-size:10px;color:#cbd6e8}
      .lesson-controls{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:15px}
      .lesson-controls button,.lesson-timeline button{border:1px solid #dfe4ec;background:#fff;color:#243047;border-radius:8px;cursor:pointer;font:inherit}
      .lesson-controls button{height:34px;font-size:11px;font-weight:800}
      .lesson-controls button:hover,.lesson-timeline button:hover{background:#f7f9fc}
      .lesson-section-title{margin:15px 0 8px;color:#7b8496;font-size:10px;font-weight:900;letter-spacing:.12em}
      .lesson-timeline{display:grid;gap:6px}
      .lesson-timeline button{display:grid;grid-template-columns:26px 1fr auto;align-items:center;gap:8px;min-height:39px;padding:7px 9px;text-align:left}
      .lesson-timeline button .step-no{display:grid;place-items:center;width:24px;height:24px;border-radius:7px;background:#eef2f7;color:#667085;font-size:10px;font-weight:900}
      .lesson-timeline button .step-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;font-weight:800}
      .lesson-timeline button .step-count{color:#9aa3b2;font-size:9px}
      .lesson-timeline button.is-current{border-color:#f1b44c;background:#fff8e8}
      .lesson-timeline button.is-current .step-no{background:#f59e0b;color:#fff}
      .lesson-timeline button.is-past{background:#fafbfc}
      .lesson-meta{display:grid;gap:7px;margin-top:13px;padding:10px 11px;border:1px solid #e6e9ef;border-radius:9px;background:#fbfcfe;color:#657087;font-size:10px;line-height:1.5}
      .lesson-meta b{color:#29364d}
      .lesson-warning{margin-top:11px;padding:9px 10px;border-radius:9px;background:#fff2f2;color:#9b3e3e;font-size:10px;line-height:1.5}
      @media(max-width:900px){.lesson-panel-head{padding:14px}.lesson-panel-body{padding:12px}.lesson-controls{grid-template-columns:repeat(3,1fr)}}
    `;
    appDoc.head.appendChild(style);
  }

  function buildLessonPanel() {
    const inspector = q('#inspector');
    if (!inspector || q('#lessonInspector')) return;
    const panel = appDoc.createElement('section');
    panel.id = 'lessonInspector';
    panel.setAttribute('aria-label', '授業インタラクション');
    panel.innerHTML = `
      <div class="lesson-panel-head">
        <p class="lesson-eyebrow">INTERACTIVE LESSON</p>
        <h2>授業進行</h2>
        <p>安全な data-step / data-action をStudio側で実行します。</p>
      </div>
      <div class="lesson-panel-body">
        <div class="lesson-step-status"><strong id="lessonStepName">STEP 0</strong><span id="lessonStepCounter">0 / 0</span></div>
        <div class="lesson-controls">
          <button type="button" id="lessonPrevStep">◀ 戻る</button>
          <button type="button" id="lessonResetStep">↶ RESET</button>
          <button type="button" id="lessonNextStep">次へ ▶</button>
        </div>
        <p class="lesson-section-title">STEP TIMELINE</p>
        <div class="lesson-timeline" id="lessonTimeline"></div>
        <div class="lesson-meta" id="lessonMeta">
          <span><b>Space</b> 次のStep</span>
          <span><b>Shift + Space</b> 前のStep</span>
          <span><b>← / →</b> 前後のスライド</span>
          <span><b>R</b> このスライドをリセット</span>
        </div>
        <div class="lesson-warning" id="lessonWarning" hidden></div>
      </div>`;
    inspector.appendChild(panel);
    q('#lessonPrevStep').addEventListener('click', () => currentRuntime?.go(currentRuntime.step - 1));
    q('#lessonNextStep').addEventListener('click', () => currentRuntime?.go(currentRuntime.step + 1));
    q('#lessonResetStep').addEventListener('click', () => currentRuntime?.go(0));
  }

  function addModeButton() {
    const switcher = q('.mode-switch');
    const edit = q('#editModeBtn');
    const preview = q('#previewModeBtn');
    if (!switcher || !edit || !preview) return false;
    let lesson = q('#lessonModeBtn');
    if (!lesson) {
      lesson = appDoc.createElement('button');
      lesson.id = 'lessonModeBtn';
      lesson.className = 'lesson-mode-button';
      lesson.type = 'button';
      lesson.textContent = 'LESSON';
      lesson.title = '段階表示・音声を使う授業モード';
      switcher.insertBefore(lesson, preview);
      lesson.addEventListener('click', () => setMode('lesson'));
      edit.addEventListener('click', () => { if (!internalModeChange) setMode('edit', true); });
      preview.addEventListener('click', () => { if (!internalModeChange) setMode('preview', true); });
    }
    return true;
  }

  function setMode(mode, appAlreadyHandled = false) {
    if (!appDoc) return;
    addonMode = mode;
    const edit = q('#editModeBtn');
    const preview = q('#previewModeBtn');
    const lesson = q('#lessonModeBtn');

    if (mode === 'lesson' && !appAlreadyHandled) {
      internalModeChange = true;
      try { if (typeof preview?.onclick === 'function') preview.onclick(); }
      finally { internalModeChange = false; }
    }

    appDoc.body.classList.toggle('studio-lesson-active', mode === 'lesson');
    edit?.classList.toggle('is-active', mode === 'edit');
    preview?.classList.toggle('is-active', mode === 'preview');
    lesson?.classList.toggle('is-active', mode === 'lesson');

    if (mode === 'lesson') {
      bindCurrentSlideFrame(true);
      const status = q('#statusText');
      if (status) status.textContent = 'LESSONモード · Spaceで次の段階';
    } else {
      currentRuntime?.deactivate();
      currentRuntime = null;
      renderLessonPanelEmpty();
    }
  }

  function findSlideRoot(doc) {
    return doc?.querySelector('[data-slide], .slide, section') || doc?.body?.firstElementChild || null;
  }

  function ensureFrameRuntimeStyles(doc) {
    if (!doc?.head || doc.getElementById('studioLessonRuntimeStyles')) return;
    const style = doc.createElement('style');
    style.id = 'studioLessonRuntimeStyles';
    style.textContent = `
      .studio-runtime-hidden{display:none!important}
      .studio-runtime-highlight{background:linear-gradient(transparent 56%,rgba(255,209,102,.84) 56%)!important;border-radius:4px}
      [data-action="speak"].studio-runtime-ready{cursor:pointer!important}
      [data-action="speak"].studio-runtime-ready:focus{outline:3px solid rgba(21,126,251,.45)!important;outline-offset:3px}
      .studio-runtime-flash{animation:studioLessonFlash .28s ease}
      @keyframes studioLessonFlash{50%{filter:brightness(1.035)}}
    `;
    doc.head.appendChild(style);
  }

  function createLessonRuntime(frame) {
    const doc = frame?.contentDocument;
    const root = findSlideRoot(doc);
    if (!doc || !root) return null;
    ensureFrameRuntimeStyles(doc);

    const nodes = [...root.querySelectorAll('[data-step]')];
    const actionNodes = [...root.querySelectorAll('[data-action]')];
    const steps = nodes.map(el => Number.parseInt(el.dataset.step, 10)).filter(Number.isFinite);
    const maxStep = steps.length ? Math.max(0, ...steps) : 0;
    const labels = new Map([[0, root.dataset.step0Label || 'QUESTION']]);
    nodes.forEach(el => {
      const s = Number.parseInt(el.dataset.step, 10);
      if (Number.isFinite(s) && el.dataset.stepLabel && !labels.has(s)) labels.set(s, el.dataset.stepLabel);
    });
    for (let i = 0; i <= maxStep; i++) if (!labels.has(i)) labels.set(i, `STEP ${i}`);

    const originals = new Map();
    actionNodes.forEach(el => {
      const action = (el.dataset.action || '').toLowerCase();
      if ((action === 'replace' || action === 'hide' || action === 'highlight') && el.dataset.target) {
        let target = null;
        try { target = root.querySelector(el.dataset.target) || doc.querySelector(el.dataset.target); } catch { target = null; }
        if (target && !originals.has(target)) originals.set(target, { html: target.innerHTML });
      }
    });

    const runtime = {
      doc, root, frame, nodes, actionNodes, maxStep, labels, step: 0, active: true,
      go(next) {
        this.step = Math.max(0, Math.min(this.maxStep, Number(next) || 0));
        this.render();
      },
      render() {
        if (!this.active) return;
        const step = this.step;
        const exclusiveScopes = [...root.querySelectorAll('[data-step-scope="exclusive"]')];
        const inExclusive = new Set();
        exclusiveScopes.forEach(scope => {
          [...scope.querySelectorAll('[data-step]')].forEach(el => {
            inExclusive.add(el);
            const s = Number.parseInt(el.dataset.step, 10);
            el.classList.toggle('studio-runtime-hidden', s !== step);
          });
        });

        nodes.forEach(el => {
          if (inExclusive.has(el)) return;
          const s = Number.parseInt(el.dataset.step, 10);
          if (!Number.isFinite(s)) return;
          const action = (el.dataset.action || 'reveal').toLowerCase();
          const isController = Boolean(el.dataset.target);
          if (isController) {
            el.classList.add('studio-runtime-hidden');
            return;
          }
          if (action === 'reveal') el.classList.toggle('studio-runtime-hidden', step < s);
          else if (action === 'hide') el.classList.toggle('studio-runtime-hidden', step >= s);
          else if (action === 'highlight') el.classList.toggle('studio-runtime-highlight', step >= s);
          else if (action === 'speak') el.classList.toggle('studio-runtime-hidden', step < s);
        });

        actionNodes.forEach(controller => {
          const action = (controller.dataset.action || '').toLowerCase();
          const s = Number.parseInt(controller.dataset.step || '0', 10) || 0;
          if (!controller.dataset.target) return;
          let target = null;
          try { target = root.querySelector(controller.dataset.target) || doc.querySelector(controller.dataset.target); } catch { target = null; }
          if (!target) return;
          if (action === 'hide') target.classList.toggle('studio-runtime-hidden', step >= s);
          if (action === 'highlight') target.classList.toggle('studio-runtime-highlight', step >= s);
          if (action === 'replace') {
            const original = originals.get(target);
            if (step >= s) {
              if (controller.dataset.value != null) target.textContent = controller.dataset.value;
              else if (controller.dataset.html != null) target.innerHTML = controller.dataset.html;
              else target.innerHTML = controller.innerHTML;
            } else if (original) target.innerHTML = original.html;
          }
        });

        [...root.querySelectorAll('[data-audience="teacher"]')].forEach(el => el.classList.add('studio-runtime-hidden'));
        [...root.querySelectorAll('[data-action="speak"]')].forEach(el => el.classList.add('studio-runtime-ready'));
        const progress = root.querySelector('[data-lesson-progress]');
        if (progress) progress.textContent = `${labels.get(step) || `STEP ${step}`} · ${step} / ${this.maxStep}`;
        root.classList.remove('studio-runtime-flash');
        void root.offsetWidth;
        root.classList.add('studio-runtime-flash');
        renderLessonPanel(this);
      },
      deactivate() {
        this.active = false;
        root.querySelectorAll('.studio-runtime-hidden').forEach(el => el.classList.remove('studio-runtime-hidden'));
        root.querySelectorAll('.studio-runtime-highlight').forEach(el => el.classList.remove('studio-runtime-highlight'));
        root.querySelectorAll('.studio-runtime-ready').forEach(el => el.classList.remove('studio-runtime-ready'));
        originals.forEach((original, target) => { if (target?.isConnected) target.innerHTML = original.html; });
      }
    };

    function speak(el) {
      const text = el.dataset.speak || el.getAttribute('aria-label') || el.textContent || '';
      if (!text.trim() || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.lang = el.dataset.speakLang || 'en-US';
      const rate = Number(el.dataset.speakRate || '0.9');
      utterance.rate = Number.isFinite(rate) ? Math.max(.5, Math.min(1.5, rate)) : .9;
      window.speechSynthesis.speak(utterance);
    }

    function handleClick(event) {
      if (addonMode !== 'lesson' || !runtime.active) return;
      const actionable = event.target.closest?.('[data-action]');
      if (actionable) {
        const action = (actionable.dataset.action || '').toLowerCase();
        if (action === 'speak') { event.preventDefault(); event.stopPropagation(); speak(actionable); return; }
        if (action === 'reset') { event.preventDefault(); event.stopPropagation(); runtime.go(0); return; }
      }
      if (event.target.closest?.('a,button,input,textarea,select,[contenteditable="true"]')) return;
      event.preventDefault();
      runtime.go(runtime.step + 1);
    }

    doc.addEventListener('click', handleClick, true);
    doc.addEventListener('keydown', handleKeydown, true);
    runtime.render();
    return runtime;
  }

  function renderLessonPanel(runtime) {
    if (!appDoc || addonMode !== 'lesson') return;
    const name = q('#lessonStepName');
    const counter = q('#lessonStepCounter');
    const timeline = q('#lessonTimeline');
    const warning = q('#lessonWarning');
    if (!name || !counter || !timeline) return;
    name.textContent = runtime.labels.get(runtime.step) || `STEP ${runtime.step}`;
    counter.textContent = `${runtime.step} / ${runtime.maxStep}`;
    timeline.innerHTML = '';
    for (let i = 0; i <= runtime.maxStep; i++) {
      const count = runtime.nodes.filter(el => Number.parseInt(el.dataset.step, 10) === i).length;
      const btn = appDoc.createElement('button');
      btn.type = 'button';
      btn.className = i === runtime.step ? 'is-current' : i < runtime.step ? 'is-past' : '';
      btn.innerHTML = `<span class="step-no">${i}</span><span class="step-label"></span><span class="step-count">${count}</span>`;
      btn.querySelector('.step-label').textContent = runtime.labels.get(i) || `STEP ${i}`;
      btn.addEventListener('click', () => runtime.go(i));
      timeline.appendChild(btn);
    }
    if (warning) {
      const hasActions = runtime.actionNodes.length > 0;
      warning.hidden = hasActions;
      warning.textContent = 'このスライドには data-action がありません。通常スライドとして表示されます。';
    }
  }

  function renderLessonPanelEmpty() {
    if (!appDoc) return;
    const timeline = q('#lessonTimeline');
    if (timeline) timeline.innerHTML = '';
  }

  function handleKeydown(event) {
    if (addonMode !== 'lesson') return;
    const target = event.target;
    if (target?.matches?.('input,textarea,select,[contenteditable="true"]')) return;
    if (event.code === 'Space') {
      event.preventDefault();
      currentRuntime?.go(currentRuntime.step + (event.shiftKey ? -1 : 1));
    } else if (event.key === 'r' || event.key === 'R') {
      event.preventDefault();
      currentRuntime?.go(0);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveSlide(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveSlide(-1);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      q('#editModeBtn')?.click();
    }
  }

  function moveSlide(delta) {
    const rows = qa('.slide-item');
    if (!rows.length) return;
    const current = rows.findIndex(row => row.classList.contains('is-active'));
    const next = Math.max(0, Math.min(rows.length - 1, current + delta));
    if (next !== current) {
      rows[next].click();
      setTimeout(() => bindCurrentSlideFrame(true), 50);
    }
  }

  function bindCurrentSlideFrame(force = false) {
    if (!appDoc) return;
    const frame = q('#slideFrame');
    if (!frame) return;
    if (currentFrame !== frame) {
      currentFrame = frame;
      frame.addEventListener('load', () => {
        if (addonMode === 'lesson') setTimeout(() => activateCurrentFrame(), 0);
      });
    }
    if (force || addonMode === 'lesson') activateCurrentFrame();
  }

  function activateCurrentFrame() {
    if (addonMode !== 'lesson' || !currentFrame?.contentDocument) return;
    const doc = currentFrame.contentDocument;
    if (!findSlideRoot(doc)) return;
    currentRuntime?.deactivate();
    currentRuntime = createLessonRuntime(currentFrame);
  }

  function observeFrameReplacement() {
    frameObserver?.disconnect();
    const wrap = q('#canvasWrap');
    if (!wrap) return;
    frameObserver = new MutationObserver(() => {
      const frame = q('#slideFrame');
      if (frame && frame !== currentFrame) {
        currentFrame = frame;
        frame.addEventListener('load', () => { if (addonMode === 'lesson') activateCurrentFrame(); });
        if (addonMode === 'lesson') setTimeout(activateCurrentFrame, 0);
      }
    });
    frameObserver.observe(wrap, { childList: true, subtree: true });
  }

  function attach() {
    try { appDoc = host.contentDocument; } catch { appDoc = null; }
    if (!appDoc) return;
    injectAppStyles();
    buildLessonPanel();
    addModeButton();
    observeFrameReplacement();
    bindCurrentSlideFrame(false);
    appDoc.addEventListener('keydown', handleKeydown, true);
    appDoc.addEventListener('click', event => {
      if (event.target.closest?.('.slide-item') && addonMode === 'lesson') setTimeout(() => bindCurrentSlideFrame(true), 40);
    }, true);
    boot?.classList.add('is-ready');
  }

  host.addEventListener('load', () => setTimeout(attach, 50));
})();
