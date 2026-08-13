(() => {
  "use strict";

  const STORAGE_KEY = "html-slide-studio-project-v1";
  const STYLE_PACK_DB = "html-slide-studio-style-packs-v1";
  const NOTEBOOK_PACK_ID = "notebooklm-slide-library-v6";
  const WIDTH = 1280;
  const HEIGHT = 720;
  const SVG_NS = "http://www.w3.org/2000/svg";
  const $ = id => document.getElementById(id);

  const els = {
    appShell: $("appShell"), brandHome: $("brandHome"), projectName: $("projectName"), saveState: $("saveState"),
    undoBtn: $("undoBtn"), redoBtn: $("redoBtn"), studioToolsBtn: $("studioToolsBtn"), overviewBtn: $("overviewBtn"), importBtn: $("importBtn"), assetBtn: $("assetBtn"),
    downloadHtmlBtn: $("downloadHtmlBtn"), exportBtn: $("exportBtn"), mobileNavBtn: $("mobileNavBtn"), mobileInspectorBtn: $("mobileInspectorBtn"),
    slidePanel: $("slidePanel"), inspector: $("inspector"), slidesTab: $("slidesTab"), layersTab: $("layersTab"), slideList: $("slideList"), layerList: $("layerList"),
    slideCount: $("slideCount"), addSlideBtn: $("addSlideBtn"), stage: $("stage"), editModeBtn: $("editModeBtn"), previewModeBtn: $("previewModeBtn"),
    selectionTools: $("selectionTools"), elementTag: $("elementTag"), duplicateElementBtn: $("duplicateElementBtn"), deleteElementBtn: $("deleteElementBtn"),
    slidePosition: $("slidePosition"), zoomOutBtn: $("zoomOutBtn"), zoomInBtn: $("zoomInBtn"), zoomValue: $("zoomValue"), canvasArea: $("canvasArea"),
    canvasWrap: $("canvasWrap"), slideFrame: $("slideFrame"), canvasHint: $("canvasHint"), overview: $("overview"), overviewGrid: $("overviewGrid"), closeOverviewBtn: $("closeOverviewBtn"),
    emptyInspector: $("emptyInspector"), propertyForm: $("propertyForm"), textSection: $("textSection"), textValue: $("textValue"), fontSize: $("fontSize"),
    elementFontFamily: $("elementFontFamily"), openFontStudioBtn: $("openFontStudioBtn"), fontWeight: $("fontWeight"), lineHeight: $("lineHeight"), textColor: $("textColor"), textColorHex: $("textColorHex"), posX: $("posX"), posY: $("posY"),
    sizeW: $("sizeW"), sizeH: $("sizeH"), fillColor: $("fillColor"), fillColorHex: $("fillColorHex"), clearFillBtn: $("clearFillBtn"),
    borderRadius: $("borderRadius"), padding: $("padding"), opacity: $("opacity"), imageSection: $("imageSection"), replaceImageBtn: $("replaceImageBtn"),
    objectFit: $("objectFit"), altText: $("altText"), closeInspectorBtn: $("closeInspectorBtn"), statusText: $("statusText"), activeElementStatus: $("activeElementStatus"),
    projectHash: $("projectHash"), importModal: $("importModal"), dropZone: $("dropZone"), chooseHtmlBtn: $("chooseHtmlBtn"), htmlInput: $("htmlInput"), applyHtmlBtn: $("applyHtmlBtn"),
    htmlFileInput: $("htmlFileInput"), imageFileInput: $("imageFileInput"), exportModal: $("exportModal"), exportTitle: $("exportTitle"), exportMessage: $("exportMessage"),
    exportProgress: $("exportProgress"), exportSlideNum: $("exportSlideNum"), exportElementNum: $("exportElementNum"), exportWarningNum: $("exportWarningNum"), exportWarning: $("exportWarning"),
    exportEngineBadge: $("exportEngineBadge"), downloadGeneratedBtn: $("downloadGeneratedBtn"), closeExportBtn: $("closeExportBtn"),
    studioModal: $("studioModal"), closeStudioModalBtn: $("closeStudioModalBtn"), styleSearch: $("styleSearch"), styleFilters: $("styleFilters"), styleGrid: $("styleGrid"), styleCountLabel: $("styleCountLabel"),
    activeStyleName: $("activeStyleName"), activeStyleDescription: $("activeStyleDescription"), activePalette: $("activePalette"), activeStylePreview: $("activeStylePreview"), applyStyleBtn: $("applyStyleBtn"), importStylePackBtn: $("importStylePackBtn"), saveMyStyleBtn: $("saveMyStyleBtn"), copyStyleYamlBtn: $("copyStyleYamlBtn"),
    packStatus: $("packStatus"), packStatusTitle: $("packStatusTitle"), packStatusText: $("packStatusText"), removeStylePackBtn: $("removeStylePackBtn"),
    headingFontSelect: $("headingFontSelect"), bodyFontSelect: $("bodyFontSelect"), latinFontSelect: $("latinFontSelect"), headingFontState: $("headingFontState"), bodyFontState: $("bodyFontState"), latinFontState: $("latinFontState"),
    fontPreviewHeading: $("fontPreviewHeading"), fontPreviewBody: $("fontPreviewBody"), fontPreviewLatin: $("fontPreviewLatin"), fontPresets: $("fontPresets"), uploadFontBtn: $("uploadFontBtn"), applyFontsBtn: $("applyFontsBtn"),
    imageSubject: $("imageSubject"), imageComposition: $("imageComposition"), imageRatio: $("imageRatio"), allowPeople: $("allowPeople"), buildImagePromptBtn: $("buildImagePromptBtn"), copyImagePromptBtn: $("copyImagePromptBtn"), imagePromptOutput: $("imagePromptOutput"), addGeneratedImageBtn: $("addGeneratedImageBtn"), imageStyleStrip: $("imageStyleStrip"),
    runQualityBtn: $("runQualityBtn"), qualitySummary: $("qualitySummary"), qualityResults: $("qualityResults"),
    outputModal: $("outputModal"), closeOutputModalBtn: $("closeOutputModalBtn"), exportHtmlChoice: $("exportHtmlChoice"), exportPngChoice: $("exportPngChoice"), exportPdfChoice: $("exportPdfChoice"), exportPptxChoice: $("exportPptxChoice"),
    fontFileInput: $("fontFileInput"), stylePackFileInput: $("stylePackFileInput"), scrim: $("scrim"), toastRegion: $("toastRegion")
  };

  const sampleStyles = `
html,body{margin:0;width:100%;height:100%;overflow:hidden;font-family:Inter,"Noto Sans JP","Yu Gothic",sans-serif;color:#f7fbff;background:#08132d}
*{box-sizing:border-box}.slide{position:relative;width:1280px;height:720px;overflow:hidden;background:linear-gradient(135deg,#08132d 0%,#101b42 60%,#11173b 100%)}
.glow{position:absolute;width:520px;height:520px;border-radius:50%;filter:blur(90px);opacity:.23;pointer-events:none}.glow.a{right:-130px;top:-190px;background:#6f73ff}.glow.b{left:250px;bottom:-420px;background:#20d8c0}
.eyebrow{position:absolute;left:82px;top:70px;color:#68dbc2;font-size:15px;font-weight:800;letter-spacing:.23em}.title{position:absolute;left:82px;top:129px;width:890px;margin:0;color:#fff;font-size:65px;line-height:1.17;font-weight:760;letter-spacing:-.045em}.title em{font-style:normal;background:linear-gradient(90deg,#6f7cff,#d98cff);-webkit-background-clip:text;color:transparent}
.subtitle{position:absolute;left:85px;top:345px;width:750px;margin:0;color:#b8c5dd;font-size:22px;line-height:1.55}.accent-line{position:absolute;left:84px;top:309px;width:390px;height:7px;border-radius:7px;background:linear-gradient(90deg,#63dec0,#8177ff,#df83e9)}
.badge{position:absolute;right:83px;bottom:70px;padding:13px 20px;border:1px solid rgba(255,255,255,.18);border-radius:12px;background:rgba(255,255,255,.07);color:#dce7fb;font-size:13px;font-weight:650}.page-no{position:absolute;left:84px;bottom:75px;color:#6d7993;font-size:12px;letter-spacing:.16em}
.section-title{position:absolute;left:76px;top:64px;margin:0;color:#fff;font-size:38px;font-weight:740;letter-spacing:-.035em}.kicker{position:absolute;left:78px;top:39px;color:#62d9b6;font-size:11px;font-weight:800;letter-spacing:.2em}.cards{position:absolute;left:76px;right:76px;top:166px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.card{height:360px;padding:31px;border:1px solid rgba(255,255,255,.11);border-radius:19px;background:linear-gradient(145deg,rgba(255,255,255,.10),rgba(255,255,255,.045));box-shadow:0 23px 50px rgba(0,0,0,.14)}.card .num{color:#65dac0;font-size:14px;font-weight:800;letter-spacing:.12em}.card h3{margin:31px 0 15px;color:#fff;font-size:24px;line-height:1.3}.card p{margin:0;color:#aebbd1;font-size:15px;line-height:1.8}.card strong{display:block;margin-top:30px;color:#cf99ff;font-size:27px}.footer-note{position:absolute;left:78px;bottom:46px;color:#6f7d99;font-size:11px}
.metric-label{position:absolute;left:95px;color:#c2cee1;font-size:17px;font-weight:650}.metric-value{position:absolute;right:94px;color:#69ddbf;font-size:19px;font-weight:800}.bar{position:absolute;left:95px;width:1088px;height:14px;border-radius:10px;background:#1d294d;overflow:hidden}.bar i{display:block;height:100%;border-radius:10px;background:linear-gradient(90deg,#5ad8bc,#7d7dff)}.note{position:absolute;left:95px;top:565px;width:990px;color:#75839e;font-size:13px;line-height:1.7}`;

  const sampleSlides = [
    `<div class="slide"><div class="glow a"></div><div class="glow b"></div><p class="eyebrow">AI × PRESENTATION / 2026</p><h1 class="title">生成AIで変わる、<br><em>資料づくりの新常識。</em></h1><div class="accent-line"></div><p class="subtitle">HTMLの表現力と、PowerPointの編集性。<br>企画から配布までを、ひとつの流れに。</p><span class="page-no">REPORT · 01 / 03</span><div class="badge">HTML → EDITABLE PPTX</div></div>`,
    `<div class="slide"><div class="glow a"></div><p class="kicker">THREE CHANGES</p><h2 class="section-title">資料作成は「書く」から「設計する」へ</h2><div class="cards"><article class="card"><span class="num">01 / SPEED</span><h3>たたき台を<br>すばやく形に</h3><p>構成・文章・デザインをHTMLでまとめ、最初の一枚までを短時間で作成。</p><strong>3.5× faster</strong></article><article class="card"><span class="num">02 / QUALITY</span><h3>表現の幅を<br>そのまま保つ</h3><p>レイアウト、配色、余白を見ながら、クリック操作で細部を整えます。</p><strong>Pixel-aware</strong></article><article class="card"><span class="num">03 / HANDOFF</span><h3>受け手が<br>あとから直せる</h3><p>文字や図形を編集可能なPowerPointとして出力し、チームへ渡せます。</p><strong>Fully editable</strong></article></div><p class="footer-note">HTML SLIDE STUDIO · LOCAL WORKFLOW</p></div>`,
    `<div class="slide"><div class="glow b"></div><p class="kicker">THE IMPACT</p><h2 class="section-title">導入で得られる効果</h2><span class="metric-label" style="top:174px">資料・文書作成のスピード</span><span class="metric-value" style="top:171px">+250%</span><div class="bar" style="top:211px"><i style="width:92%"></i></div><span class="metric-label" style="top:284px">問い合わせ対応の自動化率</span><span class="metric-value" style="top:281px;color:#ce8bff">65%</span><div class="bar" style="top:321px"><i style="width:65%;background:linear-gradient(90deg,#766df8,#cc83f4)"></i></div><span class="metric-label" style="top:394px">定型業務にかかる時間の削減</span><span class="metric-value" style="top:391px">−40%</span><div class="bar" style="top:431px"><i style="width:48%"></i></div><p class="note">効果は「時間短縮」だけではない。空いた時間を、人にしかできない判断・創造・対話へ振り向けることが本質的な価値。</p><p class="footer-note">HTML SLIDE STUDIO · REPORT 03 / 03</p></div>`
  ];

  const GOOGLE_FONT_LINK = "https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Klee+One:wght@400;600&family=Noto+Sans+JP:wght@300;400;500;600;700;800&family=Noto+Serif+JP:wght@400;500;600;700&family=Yusei+Magic&display=swap";
  const FONT_OPTIONS = [
    { label: "Noto Sans JP", family: "Noto Sans JP", source: "Google Fonts" },
    { label: "Noto Serif JP", family: "Noto Serif JP", source: "Google Fonts" },
    { label: "Klee One", family: "Klee One", source: "Google Fonts" },
    { label: "Yusei Magic", family: "Yusei Magic", source: "Google Fonts" },
    { label: "Caveat", family: "Caveat", source: "Google Fonts" },
    { label: "BIZ UDPゴシック", family: "BIZ UDPGothic", source: "端末フォント" },
    { label: "Yu Gothic UI", family: "Yu Gothic UI", source: "端末フォント" },
    { label: "Hiragino Sans", family: "Hiragino Sans", source: "端末フォント" },
    { label: "メイリオ", family: "Meiryo", source: "端末フォント" },
    { label: "Aptos", family: "Aptos", source: "PowerPoint標準" },
    { label: "Arial", family: "Arial", source: "標準" },
    { label: "Georgia", family: "Georgia", source: "標準" }
  ];
  const FONT_PRESETS = [
    { name: "教育・手書き", heading: "Yusei Magic", body: "Klee One", latin: "Caveat" },
    { name: "モダン", heading: "Noto Sans JP", body: "Noto Sans JP", latin: "Aptos" },
    { name: "編集誌", heading: "Noto Serif JP", body: "Noto Sans JP", latin: "Georgia" },
    { name: "学校標準", heading: "BIZ UDPGothic", body: "BIZ UDPGothic", latin: "Aptos" }
  ];
  const BUILTIN_THEMES = [
    { id:"midnight-gradient", name:"Midnight Gradient", category:"Modern", description:"深いネイビーに光を重ねた、力強く現代的なスタイル", palette:{bg:"#08132d",primary:"#6f73ff",accent:"#62d9b6",text:"#f7fbff",muted:"#aebbd1"}, headingFont:"Noto Sans JP", bodyFont:"Noto Sans JP", latinFont:"Aptos", radius:18, shadow:"soft", spacing:"generous", imageStyle:{mood:"cinematic and professional",composition:"editorial with generous negative space",illustration:"abstract light, subtle geometric depth",avoid:"3D cartoon, neon overload, logos, text in image"} },
    { id:"corporate-trust", name:"Corporate Trust", category:"Corporate", description:"クリーム、濃紺、金で信頼感を作る法人・研修向け", palette:{bg:"#fffaf0",primary:"#203246",accent:"#c9a85d",text:"#203246",muted:"#6f756f"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Georgia", radius:4, shadow:"minimal", spacing:"generous", imageStyle:{mood:"elegant Japanese corporate",composition:"structured and calm",illustration:"refined editorial diagrams, subtle paper texture",avoid:"SaaS dashboard, neon, playful 3D, logos, text in image"} },
    { id:"editorial-ivory", name:"Editorial Ivory", category:"Editorial", description:"アイボリーと銅色を使った知的なビジネス誌風", palette:{bg:"#faf7ef",primary:"#262725",accent:"#b96f4a",text:"#242522",muted:"#77766f"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Georgia", radius:2, shadow:"none", spacing:"generous", imageStyle:{mood:"premium editorial and intellectual",composition:"asymmetric magazine layout",illustration:"ink-like geometry and restrained copper accents",avoid:"generic templates, gradients, cartoon, logos, text in image"} },
    { id:"vermilion-focus", name:"Vermilion Focus", category:"Keynote", description:"ミッドナイトネイビーと朱橙で熱量を伝える", palette:{bg:"#101923",primary:"#e25f35",accent:"#f2a066",text:"#fff7ea",muted:"#b5bdc5"}, headingFont:"Noto Sans JP", bodyFont:"Noto Sans JP", latinFont:"Aptos", radius:7, shadow:"minimal", spacing:"balanced", imageStyle:{mood:"restrained cinematic keynote",composition:"strong two-field reading flow",illustration:"orange filament, precise rules, abstract evidence graphic",avoid:"casual character, rainbow, excessive glow, logos, text in image"} },
    { id:"quiet-research", name:"Quiet Research", category:"Editorial", description:"オフホワイトとくすみオレンジの静かな研究資料", palette:{bg:"#faf9f5",primary:"#191916",accent:"#d97757",text:"#191916",muted:"#77766e"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Georgia", radius:8, shadow:"none", spacing:"generous", imageStyle:{mood:"calm research lab and corporate seminar",composition:"precise editorial whitespace",illustration:"simple knowledge cards, thin rules, restrained orange",avoid:"photography, gradients, logos, decorative blobs, text in image"} },
    { id:"school-pastel", name:"School Pastel", category:"Education", description:"手書き文字と淡い紫・ピンクを、すっきり配置", palette:{bg:"#fffafc",primary:"#5a4772",accent:"#e9a7be",text:"#403847",muted:"#857b8d"}, headingFont:"Yusei Magic", bodyFont:"Klee One", latinFont:"Caveat", radius:16, shadow:"minimal", spacing:"generous", imageStyle:{mood:"warm, polished and approachable for teenagers",composition:"simple Nordic-inspired negative space",illustration:"flat hand-drawn geometric accents, no characters",avoid:"people, childish clipart, clutter, botanical motifs, AI 3D, text in image"} },
    { id:"nordic-classroom", name:"Nordic Classroom", category:"Education", description:"北欧配色を抑制し、授業用に読みやすく整えたスタイル", palette:{bg:"#f8f5ed",primary:"#3f5e5c",accent:"#e3a25f",text:"#2c3433",muted:"#6f7b78"}, headingFont:"Yusei Magic", bodyFont:"Klee One", latinFont:"Caveat", radius:12, shadow:"none", spacing:"generous", imageStyle:{mood:"soft Nordic educational editorial",composition:"simple geometric composition",illustration:"muted flat shapes and tactile paper",avoid:"people, plants, busy patterns, glossy 3D, logos, text in image"} },
    { id:"black-orange", name:"Black & Orange", category:"Modern", description:"黒とオレンジで視認性を高めたClaude風の洗練", palette:{bg:"#171714",primary:"#f4eee5",accent:"#d97757",text:"#f5f1e9",muted:"#b6aea2"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Georgia", radius:7, shadow:"minimal", spacing:"balanced", imageStyle:{mood:"precise, mature and editorial",composition:"clean black field with restrained orange",illustration:"thin-line abstract diagrams",avoid:"purple gradient, glass UI, clutter, logos, text in image"} },
    { id:"academic-blue", name:"Academic Blue", category:"Academic", description:"白地と青の規則性で、授業・研究発表を明快に", palette:{bg:"#f7f8fa",primary:"#1f2937",accent:"#2563eb",text:"#1f2937",muted:"#64748b"}, headingFont:"BIZ UDPGothic", bodyFont:"BIZ UDPGothic", latinFont:"Aptos", radius:6, shadow:"minimal", spacing:"balanced", imageStyle:{mood:"academic, modern, minimal and professional",composition:"clear instructional hierarchy",illustration:"precise arrows, grids and annotated diagrams",avoid:"decorative illustration, dark backgrounds, logos, text in image"} },
    { id:"lavender-calm", name:"Lavender Calm", category:"Soft", description:"ラベンダーを控えめに使った、優しく落ち着く案内資料", palette:{bg:"#fcfaff",primary:"#493f61",accent:"#a994d6",text:"#3f394c",muted:"#7e758d"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Caveat", radius:14, shadow:"soft", spacing:"generous", imageStyle:{mood:"calm, gentle and polished",composition:"simple centered or asymmetric editorial",illustration:"soft abstract paper cut shapes",avoid:"funeral mood, clutter, strong gradients, logos, text in image"} },
    { id:"mono-grid", name:"Mono Grid", category:"Minimal", description:"モノクロとグリッドで、内容を主役にする最小構成", palette:{bg:"#ffffff",primary:"#111111",accent:"#777777",text:"#171717",muted:"#6b6b6b"}, headingFont:"Noto Sans JP", bodyFont:"Noto Sans JP", latinFont:"Aptos", radius:0, shadow:"none", spacing:"generous", imageStyle:{mood:"strict Swiss minimalism",composition:"grid aligned with strong whitespace",illustration:"black line geometry only",avoid:"colorful decoration, shadows, rounded cards, logos, text in image"} },
    { id:"warm-seminar", name:"Warm Seminar", category:"Corporate", description:"温かい紙色とテラコッタで、説明会を親しみやすく", palette:{bg:"#fff8ef",primary:"#49352d",accent:"#c96f4c",text:"#3d302b",muted:"#826f67"}, headingFont:"Noto Serif JP", bodyFont:"Noto Sans JP", latinFont:"Georgia", radius:10, shadow:"minimal", spacing:"balanced", imageStyle:{mood:"warm premium seminar",composition:"clear editorial cards and diagrams",illustration:"soft ink and terracotta geometry",avoid:"cartoon, glossy 3D, neon, logos, text in image"} }
  ];

  let state = {
    projectName: "AI活用レポート",
    styles: sampleStyles,
    slides: sampleSlides.map((html, index) => ({ id: uid(), name: `スライド ${index + 1}`, html })),
    theme: clone(BUILTIN_THEMES[0]),
    fonts: { heading: BUILTIN_THEMES[0].headingFont, body: BUILTIN_THEMES[0].bodyFont, latin: BUILTIN_THEMES[0].latinFont },
    favorites: [],
    myStyles: [],
    importedThemes: [],
    notebookThemes: [],
    notebookPack: null,
    customFonts: [],
    current: 0,
    mode: "edit",
    zoomOffset: 0,
    selectedPath: null,
    selectedType: null
  };
  let history = [];
  let future = [];
  let saveTimer = null;
  let thumbnailTimer = null;
  let currentImageAction = "add";
  let dragState = null;
  let resizeObserver = null;
  let generatedPptxUrl = null;
  let activeStyleCategory = "すべて";
  let selectedThemeId = BUILTIN_THEMES[0].id;
  let notebookPreviewUrls = [];

  function uid() { return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`; }
  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function allThemes() { return [...BUILTIN_THEMES, ...(state.notebookThemes || []), ...(state.importedThemes || []), ...(state.myStyles || [])]; }
  function requestResult(request) { return new Promise((resolve,reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); }); }
  function transactionDone(transaction) { return new Promise((resolve,reject) => { transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error); transaction.onabort = () => reject(transaction.error || new Error("端末内保存を完了できませんでした")); }); }
  function openStylePackDb() {
    return new Promise((resolve,reject) => {
      const request = indexedDB.open(STYLE_PACK_DB, 1);
      request.onupgradeneeded = () => { const db = request.result; if (!db.objectStoreNames.contains("packs")) db.createObjectStore("packs", { keyPath:"id" }); if (!db.objectStoreNames.contains("images")) db.createObjectStore("images", { keyPath:"key" }); };
      request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
    });
  }
  function revokeNotebookPreviewUrls() { notebookPreviewUrls.forEach(url => URL.revokeObjectURL(url)); notebookPreviewUrls = []; }
  function setPackStatus(mode, pack = null) {
    els.packStatus.dataset.state = mode;
    if (mode === "loading") { els.packStatusTitle.textContent = "v6を検証・統合中…"; els.packStatusText.textContent = "画像、YAML、ID対応、PNG署名を端末内で確認しています。"; els.removeStylePackBtn.hidden = true; return; }
    if (mode === "ready" && pack) { els.packStatusTitle.textContent = `${pack.total}スタイルをローカル統合済み`; els.packStatusText.textContent = `実データ検証済みOriginal ${pack.verified}件 / 復元・未検証 ${pack.reconstructed}件。${pack.correction || "画像とYAMLはこの端末内だけで使用します。"}`; els.removeStylePackBtn.hidden = false; return; }
    els.packStatusTitle.textContent = "NotebookLM v6をローカル統合"; els.packStatusText.textContent = "v6 ZIPを読み込むと、画像160枚とYAMLをこの端末だけに保存します。外部送信はしません。"; els.removeStylePackBtn.hidden = true;
  }
  function yamlColor(yaml, patterns, fallback) { for (const pattern of patterns) { const match = yaml.match(pattern); if (match) return match[1].toLowerCase(); } return fallback; }
  function uniqueYamlColors(yaml) { return [...new Set((yaml.match(/#[0-9a-f]{6}\b/gi) || []).map(color => color.toLowerCase()))]; }
  function fontChoiceForStyle(record) {
    const value = `${record.name} ${record.category} ${record.bestAvailableYaml || ""}`.toLowerCase();
    if (/doodle|playful|friendly|character|creature|animal|learning|school|hand.?drawn|手書き|教育/.test(value)) return { heading:"Yusei Magic", body:"Klee One", latin:"Caveat" };
    if (/editorial|magazine|fashion|luxury|newspaper|book|academic|serif|高級|雑誌/.test(value)) return { heading:"Noto Serif JP", body:"Noto Sans JP", latin:"Georgia" };
    return { heading:"Noto Sans JP", body:"Noto Sans JP", latin:"Aptos" };
  }
  function paletteFallbackForStyle(record) {
    const value = `${record.name} ${record.category}`.toLowerCase();
    if (/neon multicolor/.test(value)) return { bg:"#0b0b0f", text:"#f8f7ff", accent:"#ff2bd6", muted:"#a6ff00" };
    if (/black data/.test(value)) return { bg:"#0d0f12", text:"#f7f7f2", accent:"#f2c94c", muted:"#9ca3af" };
    if (/white risk/.test(value)) return { bg:"#ffffff", text:"#111827", accent:"#ef4444", muted:"#6b7280" };
    if (/recruit blob/.test(value)) return { bg:"#f5f0ff", text:"#2f244a", accent:"#7857d9", muted:"#756b88" };
    if (/recruit objects/.test(value)) return { bg:"#f5f7fb", text:"#182034", accent:"#405de6", muted:"#6d7484" };
    if (/recruit line/.test(value)) return { bg:"#fffaf3", text:"#202020", accent:"#ef7c3d", muted:"#756f68" };
    return { bg:"#ffffff", text:"#1f2937", accent:"#2563eb", muted:"#6b7280" };
  }
  function notebookThemeFromRecord(record) {
    const yaml = String(record.bestAvailableYaml || record.reconstructedYaml || ""); const colors = uniqueYamlColors(yaml); const fonts = fontChoiceForStyle(record); const fallback = paletteFallbackForStyle(record); const nameKey = `${record.name} ${record.category}`.toLowerCase();
    const bg = yamlColor(yaml, [/(?:Background:\s*[\s\S]{0,100}?Primary|background)\s*:\s*["']?(#[0-9a-f]{6})/i, /background_color\s*:\s*["']?(#[0-9a-f]{6})/i], colors[0] || fallback.bg);
    const text = yamlColor(yaml, [/(?:Text:\s*[\s\S]{0,100}?Primary|text_primary)\s*:\s*["']?(#[0-9a-f]{6})/i, /text_color\s*:\s*["']?(#[0-9a-f]{6})/i], colors.find(color => color !== bg) || fallback.text);
    const accent = yamlColor(yaml, [/(?:Accent:\s*[\s\S]{0,100}?Primary|accent)\s*:\s*["']?(#[0-9a-f]{6})/i, /primary_color\s*:\s*["']?(#[0-9a-f]{6})/i], colors.find(color => color !== bg && color !== text) || fallback.accent);
    const muted = yamlColor(yaml, [/(?:Text:\s*[\s\S]{0,160}?Secondary|text_secondary)\s*:\s*["']?(#[0-9a-f]{6})/i], colors.find(color => ![bg,text,accent].includes(color)) || fallback.muted);
    const verified = record.originalYamlStatus === "verified_from_gallery_capture" && String(record.originalYaml || "").trim().length > 0;
    return { id:`notebook-v6-${record.id}`, packStyleId:record.id, name:`${record.id} ${record.name}`, category:record.category || "NotebookLM v6", source:"notebooklm-v6", verification:verified ? "verified" : "reconstructed", description:`${record.category || "デザイン"} · ${verified ? "検証済みOriginal YAML" : "復元YAML（Original未検証）"}`, palette:{ bg, primary:text, accent, text, muted }, headingFont:fonts.heading, bodyFont:fonts.body, latinFont:fonts.latin, radius:/square|swiss|grid|minimal|monochrome/.test(nameKey) ? 2 : /round|blob|neumo|ui|soft|character/.test(nameKey) ? 14 : 8, shadow:/neumo|isometric|3d|立体/.test(nameKey) ? "soft" : "minimal", spacing:/minimal|editorial|luxury|fashion|architecture/.test(nameKey) ? "generous" : "balanced", previewKey:`${NOTEBOOK_PACK_ID}:${record.id}`, sourceYaml:yaml, imageStyle:{ mood:`${record.name}の見本画像とYAMLに忠実な、${record.category}向けの一貫したビジュアル`, composition:"見本画像の情報階層、余白、視線誘導を優先した16:9のスライド構図", illustration:`Style reference: ${record.name}. Match the locally loaded preview image, palette and YAML specification.`, avoid:"generic template look, unrelated colors, logos, watermarks, text in image" } };
  }
  async function saveNotebookPack(pack, themes, imageRows) {
    const db = await openStylePackDb(); const transaction = db.transaction(["packs","images"], "readwrite"); const done = transactionDone(transaction);
    transaction.objectStore("packs").put({ id:NOTEBOOK_PACK_ID, ...pack, themes:themes.map(theme => { const saved = { ...theme }; delete saved.previewUrl; return saved; }) });
    imageRows.forEach(row => transaction.objectStore("images").put(row)); await done; db.close();
  }
  async function restoreNotebookPack() {
    try {
      const db = await openStylePackDb(); const transaction = db.transaction(["packs","images"], "readonly"); const done = transactionDone(transaction); const [pack, rows] = await Promise.all([requestResult(transaction.objectStore("packs").get(NOTEBOOK_PACK_ID)), requestResult(transaction.objectStore("images").getAll())]); await done;
      if (!pack) { db.close(); setPackStatus("empty"); return; }
      db.close(); const blobs = new Map(rows.filter(row => row.key.startsWith(`${NOTEBOOK_PACK_ID}:`)).map(row => [row.key,row.blob]));
      revokeNotebookPreviewUrls(); state.notebookThemes = pack.themes.map(theme => { const blob = blobs.get(theme.previewKey); const previewUrl = blob ? URL.createObjectURL(blob) : ""; if (previewUrl) notebookPreviewUrls.push(previewUrl); return { ...theme, previewUrl }; }); state.notebookPack = pack; setPackStatus("ready", pack); renderStyleLibrary();
    } catch { setPackStatus("empty"); }
  }
  async function deleteNotebookPack() {
    if (!confirm("この端末に保存したNotebookLM v6の画像・YAMLを削除しますか？\n作成中のスライドと適用済み配色は残ります。")) return;
    try {
      const db = await openStylePackDb(); const transaction = db.transaction(["packs","images"], "readwrite"); const done = transactionDone(transaction); transaction.objectStore("packs").delete(NOTEBOOK_PACK_ID); const imageStore = transaction.objectStore("images"); const range = IDBKeyRange.bound(`${NOTEBOOK_PACK_ID}:`, `${NOTEBOOK_PACK_ID}:\uffff`); imageStore.openCursor(range).onsuccess = event => { const cursor = event.target.result; if (cursor) { cursor.delete(); cursor.continue(); } }; await done; db.close();
      revokeNotebookPreviewUrls(); state.notebookThemes = []; state.notebookPack = null; if (String(selectedThemeId).startsWith("notebook-v6-")) selectedThemeId = state.theme.id; setPackStatus("empty"); renderStyleLibrary(); showToast("v6データをこの端末から削除しました");
    } catch { showToast("端末内データを削除できませんでした", true); }
  }
  async function importNotebookArchive(file) {
    if (!window.fflate?.unzipSync) throw new Error("ZIP読込エンジンを利用できません"); if (file.size > 150 * 1024 * 1024) throw new Error("150MB以下のv6 ZIPを選んでください"); setPackStatus("loading"); await tick();
    const files = window.fflate.unzipSync(new Uint8Array(await file.arrayBuffer())); const decoder = new TextDecoder("utf-8"); const dataFile = files["data/archive-data.json"], auditFile = files["AUDIT.json"]; if (!dataFile || !auditFile) throw new Error("v6のarchive-data.json / AUDIT.jsonが見つかりません");
    const records = JSON.parse(decoder.decode(dataFile)), audit = JSON.parse(decoder.decode(auditFile)); if (!Array.isArray(records) || records.length !== 160 || audit.auditVersion !== "6.0") throw new Error("監査済みv6（160件）ではありません");
    const themes = []; const imageRows = []; let verified = 0; let reconstructed = 0;
    for (const record of records) { const path = record.localImagePath || `images/${record.id}.png`, bytes = files[path]; if (!bytes || bytes.length < 8 || bytes[0] !== 137 || bytes[1] !== 80 || bytes[2] !== 78 || bytes[3] !== 71) throw new Error(`${record.id} のPNG見本を検証できません`); const theme = notebookThemeFromRecord(record); if (theme.verification === "verified") verified++; else reconstructed++; themes.push(theme); imageRows.push({ key:theme.previewKey, blob:new Blob([bytes], { type:"image/png" }) }); }
    if (verified + reconstructed !== 160 || verified < 154) throw new Error(`YAML状態が想定と異なります（検証済み${verified} / 復元${reconstructed}）`);
    const correction = audit.verifiedOriginalYaml === 155 && verified === 154 ? "監査表記155/5のうち、011のOriginal YAMLが空のため安全側へ再分類しています。" : "画像とYAMLはこの端末内だけで使用します。";
    const pack = { name:"NotebookLM Slide Style Library Offline Archive v6", total:themes.length, verified, reconstructed, correction, importedAt:new Date().toISOString(), audit:{ auditVersion:audit.auditVersion, reportedVerifiedOriginalYaml:audit.verifiedOriginalYaml, localImagesUnique:audit.localImagesUnique, knownMismatches:audit.knownMismatches } }; await saveNotebookPack(pack, themes, imageRows);
    revokeNotebookPreviewUrls(); state.notebookThemes = themes.map((theme,index) => { const previewUrl = URL.createObjectURL(imageRows[index].blob); notebookPreviewUrls.push(previewUrl); return { ...theme, previewUrl }; }); state.notebookPack = pack; activeStyleCategory = "v6・すべて"; selectedThemeId = themes[0].id; setPackStatus("ready", pack); renderStyleLibrary(); showToast("v6の160スタイルをこの端末へ統合しました"); setStatus("NotebookLM v6を統合");
  }
  function fontStack(family, fallback = "sans-serif") { return `"${String(family || "Noto Sans JP").replace(/"/g, "")}",${fallback}`; }
  function hexToRgba(hex, alpha = 1) { const h = normalizeHex(hex, "#000000").slice(1); return `rgba(${parseInt(h.slice(0,2),16)},${parseInt(h.slice(2,4),16)},${parseInt(h.slice(4,6),16)},${alpha})`; }
  function customFontCss() { return (state.customFonts || []).map(font => `@font-face{font-family:"${font.family.replace(/"/g, "")}";src:url("${font.data}") format("${font.format}");font-display:swap}`).join("\n"); }
  function buildThemeCss() {
    const theme = state.theme || BUILTIN_THEMES[0]; const p = theme.palette; const fonts = state.fonts || { heading:theme.headingFont, body:theme.bodyFont, latin:theme.latinFont };
    const shadow = theme.shadow === "soft" ? `0 18px 45px ${hexToRgba(p.primary,.16)}` : theme.shadow === "minimal" ? `0 8px 22px ${hexToRgba(p.primary,.10)}` : "none";
    return `
:root{--slide-bg:${p.bg};--slide-primary:${p.primary};--slide-accent:${p.accent};--slide-text:${p.text};--slide-muted:${p.muted};--heading-font:${fontStack(fonts.heading, "serif")};--body-font:${fontStack(fonts.body)};--latin-font:${fontStack(fonts.latin)};--theme-radius:${Number(theme.radius)||0}px;--theme-shadow:${shadow}}
html,body{font-family:var(--body-font)}
.slide,[data-slide]{background:var(--slide-bg)!important;color:var(--slide-text);font-family:var(--body-font)}
.slide h1,.slide h2,.slide h3,.slide h4,.slide h5,.slide h6,.slide .title,.slide .section-title{font-family:var(--heading-font);color:var(--slide-text)}
.slide p,.slide li,.slide blockquote,.slide table,.slide .subtitle,.slide .note{font-family:var(--body-font)}
.slide .latin,.slide [data-font-role="latin"],.slide .page-no,.slide .eyebrow,.slide .kicker{font-family:var(--latin-font)}
.slide .eyebrow,.slide .kicker,.slide .num{color:var(--slide-accent)}
.slide .subtitle,.slide .note,.slide .footer-note{color:var(--slide-muted)}
.slide .accent-line,.slide .bar i{background:var(--slide-accent)}
.slide .card{border-radius:var(--theme-radius);border-color:${hexToRgba(p.primary,.16)};box-shadow:var(--theme-shadow)}
`;
  }
  function currentThemeCss() { return `${customFontCss()}\n${buildThemeCss()}`; }
  function persistableState() {
    return { projectName:state.projectName, styles:state.styles, slides:state.slides, current:state.current, theme:state.theme, fonts:state.fonts, favorites:state.favorites, myStyles:state.myStyles, importedThemes:state.importedThemes };
  }
  function sanitizeImportedDocument(doc) {
    doc.querySelectorAll("script,noscript,iframe,object,embed,base,meta[http-equiv='refresh'],link[rel='stylesheet']").forEach(el => el.remove());
    doc.querySelectorAll("*").forEach(el => {
      Array.from(el.attributes).forEach(attr => {
        const name = attr.name.toLowerCase(); const value = attr.value.trim();
        if (name.startsWith("on") || name === "srcdoc" || (["href", "src", "xlink:href", "formaction"].includes(name) && /^(?:javascript|vbscript):|^data:text\/html/i.test(value))) el.removeAttribute(attr.name);
      });
    });
    return doc;
  }
  function sanitizeSlideHtml(html) {
    const doc = new DOMParser().parseFromString(`<!doctype html><body>${html}</body>`, "text/html"); sanitizeImportedDocument(doc); return doc.body.innerHTML;
  }
  function escapeHtml(value = "") { return value.replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch])); }
  function sanitizeFilename(value) { return (value || "slide-deck").trim().replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, "-").slice(0, 80) || "slide-deck"; }
  function hashText(text) { let h = 2166136261; for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); } return (h >>> 0).toString(16).padStart(8, "0").toUpperCase(); }
  function showToast(message, error = false) {
    const toast = document.createElement("div"); toast.className = `toast${error ? " is-error" : ""}`; toast.textContent = message; els.toastRegion.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; toast.style.transform = "translateY(5px)"; setTimeout(() => toast.remove(), 220); }, 2600);
  }
  function setStatus(message) { els.statusText.textContent = message; }
  function updateHash() { els.projectHash.textContent = hashText(JSON.stringify({ n: state.projectName, s: state.slides })).slice(0, 8); }
  function persistSoon() {
    els.saveState.innerHTML = "<i></i> 保存中…"; clearTimeout(saveTimer);
    saveTimer = setTimeout(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableState())); els.saveState.innerHTML = "<i></i> この端末に保存済み"; updateHash(); } catch { els.saveState.textContent = "保存容量を超えました"; } }, 300);
  }
  function restore() {
    if (new URLSearchParams(location.search).has("demo")) return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && Array.isArray(saved.slides) && saved.slides.length) {
        state.projectName = saved.projectName || state.projectName; state.styles = saved.styles || ""; state.slides = saved.slides; state.current = Math.min(saved.current || 0, saved.slides.length - 1);
        state.theme = saved.theme || state.theme; state.fonts = saved.fonts || { heading:state.theme.headingFont, body:state.theme.bodyFont, latin:state.theme.latinFont };
        state.favorites = saved.favorites || []; state.myStyles = saved.myStyles || []; state.importedThemes = saved.importedThemes || []; selectedThemeId = state.theme.id;
      }
    } catch { /* invalid local data: sample remains */ }
  }
  function pushHistory() {
    history.push(clone(persistableState()));
    if (history.length > 40) history.shift(); future = []; updateUndoRedo();
  }
  function applySnapshot(snapshot) {
    state.projectName = snapshot.projectName; state.styles = snapshot.styles; state.slides = snapshot.slides; state.current = Math.min(snapshot.current, state.slides.length - 1); state.selectedPath = null;
    state.theme = snapshot.theme || state.theme; state.fonts = snapshot.fonts || state.fonts; state.favorites = snapshot.favorites || []; state.myStyles = snapshot.myStyles || []; state.importedThemes = snapshot.importedThemes || []; selectedThemeId = state.theme.id;
    els.projectName.value = state.projectName; renderAll(); renderStyleLibrary(); populateFontControls(); renderImageStyle(); persistSoon();
  }
  function undo() { if (!history.length) return; future.push(clone(persistableState())); applySnapshot(history.pop()); updateUndoRedo(); }
  function redo() { if (!future.length) return; history.push(clone(persistableState())); applySnapshot(future.pop()); updateUndoRedo(); }
  function updateUndoRedo() { els.undoBtn.disabled = !history.length; els.redoBtn.disabled = !future.length; }

  function composeDocument(slideHtml, editor = false) {
    const editing = editor ? `<style>
      [data-studio-selectable]{cursor:pointer}.studio-selected{outline:3px solid #1687f8!important;outline-offset:3px;position:relative}.studio-selected::after{content:"";position:absolute;right:-7px;bottom:-7px;width:12px;height:12px;border:2px solid white;border-radius:2px;background:#1687f8;box-shadow:0 1px 4px rgba(0,0,0,.25);cursor:nwse-resize}.studio-hover{outline:2px solid rgba(22,135,248,.38);outline-offset:2px}
      body.studio-preview [data-studio-selectable]{cursor:default}body.studio-preview .studio-selected,body.studio-preview .studio-hover{outline:0!important}body.studio-preview .studio-selected::after{display:none}
    </style>` : "";
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=1280"><link href="${GOOGLE_FONT_LINK}" rel="stylesheet"><style>${state.styles}\n${currentThemeCss()}</style>${editing}</head><body>${slideHtml}</body></html>`;
  }

  function composeExportDocument() {
    const baseHref = escapeHtml(new URL(".", location.href).href); const safeStyles = `${state.styles}\n${currentThemeCss()}`.replace(/<\/style/gi, "<\\/style");
    const slides = state.slides.map((slide, index) => `<div class="studio-export-slot" data-export-index="${index}">${sanitizeSlideHtml(slide.html)}</div>`).join("");
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=1280"><base href="${baseHref}"><link href="${GOOGLE_FONT_LINK}" rel="stylesheet"><style>${safeStyles}</style><style>
      html,body{width:auto!important;height:auto!important;min-height:0!important;margin:0!important;overflow:visible!important;background:transparent!important}
      body{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:0!important}
      .studio-export-slot{position:relative!important;width:${WIDTH}px!important;height:${HEIGHT}px!important;min-width:${WIDTH}px!important;min-height:${HEIGHT}px!important;overflow:hidden!important;flex:0 0 ${HEIGHT}px!important}
      .studio-export-slot>:first-child{position:relative!important;width:${WIDTH}px!important;height:${HEIGHT}px!important;min-width:${WIDTH}px!important;min-height:${HEIGHT}px!important;overflow:hidden!important;margin:0!important}
    </style><script src="vendor/dom-to-pptx.bundle.js"></script></head><body>${slides}</body></html>`;
  }

  function analyzeCompatibility() {
    const warnings = []; const source = `${state.styles}\n${state.slides.map(slide => slide.html).join("\n")}`;
    if (/(?:matrix3d|perspective\s*\(|rotate[XY]\s*\()/i.test(source)) warnings.push("3D変形は2D表現へ近似されます");
    if (/<(?:video|audio|iframe|canvas)\b/i.test(source)) warnings.push("動画・音声・埋め込み要素は静止画化または省略されます");
    const doc = new DOMParser().parseFromString(`<body>${state.slides.map(slide => slide.html).join("")}</body>`, "text/html");
    if (Array.from(doc.images).some(img => img.getAttribute("src") && !/^(?:data:|blob:)/i.test(img.getAttribute("src")))) warnings.push("外部画像は配信元のCORS設定により省略される場合があります");
    const unavailable = [...new Set(Object.values(state.fonts || {}).filter(family => family && !document.fonts.check(`16px "${family}"`)))]; if (unavailable.length) warnings.push(`未読込フォント: ${unavailable.join(" / ")}`);
    return warnings;
  }

  function estimateExportElementCount() {
    return state.slides.reduce((total, slide) => { const doc = new DOMParser().parseFromString(`<body>${slide.html}</body>`, "text/html"); return total + doc.body.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,strong,em,small,div,article,section,img,svg,table,ul,ol,blockquote").length; }, 0);
  }

  function renderAll() {
    els.slideCount.textContent = state.slides.length; els.slidePosition.textContent = `${state.current + 1} / ${state.slides.length}`; els.projectName.value = state.projectName;
    renderSlideList(); renderCurrentSlide(); renderLayers(); if (!els.overview.hidden) renderOverview(); updateHash();
  }
  function renderSlideList() {
    els.slideList.innerHTML = "";
    state.slides.forEach((slide, index) => {
      const row = document.createElement("div"); row.className = `slide-item${index === state.current ? " is-active" : ""}`; row.dataset.index = index;
      const num = document.createElement("span"); num.className = "slide-number"; num.textContent = String(index + 1).padStart(2, "0");
      const shell = document.createElement("div"); shell.className = "thumb-shell";
      const frame = document.createElement("iframe"); frame.setAttribute("sandbox", "allow-same-origin"); frame.tabIndex = -1; frame.title = `${index + 1}枚目のサムネイル`; frame.srcdoc = composeDocument(slide.html);
      const menu = document.createElement("button"); menu.className = "slide-menu"; menu.type = "button"; menu.textContent = "⋯"; menu.title = "スライド操作"; menu.addEventListener("click", event => { event.stopPropagation(); openSlideMenu(index, menu); });
      shell.append(frame, menu); row.append(num, shell); row.addEventListener("click", () => selectSlide(index)); els.slideList.append(row);
    });
    requestAnimationFrame(updateThumbnailScales);
  }
  function updateThumbnailScales() {
    document.querySelectorAll(".thumb-shell").forEach(shell => shell.style.setProperty("--thumb-scale", shell.clientWidth / WIDTH));
    document.querySelectorAll(".overview-card").forEach(card => card.style.setProperty("--overview-scale", card.clientWidth / WIDTH));
  }
  function renderCurrentSlide() {
    state.selectedPath = null; state.selectedType = null; closeInspectorSelection();
    els.slideFrame.onload = () => { prepareFrame(); fitCanvas(); };
    els.slideFrame.srcdoc = composeDocument(state.slides[state.current].html, true);
  }
  function selectSlide(index) {
    state.current = Math.max(0, Math.min(index, state.slides.length - 1)); state.selectedPath = null; renderAll(); persistSoon(); closeMobilePanels();
  }
  function openSlideMenu(index, anchor) {
    const existing = document.querySelector(".slide-popover"); if (existing) existing.remove();
    const pop = document.createElement("div"); pop.className = "slide-popover"; pop.style.cssText = "position:fixed;z-index:100;display:grid;min-width:124px;padding:5px;border:1px solid #dfe3ea;border-radius:8px;background:#fff;box-shadow:0 10px 30px rgba(20,30,50,.18);font-size:10px";
    [["複製", () => duplicateSlide(index)], ["削除", () => deleteSlide(index)]].forEach(([label, fn]) => { const b = document.createElement("button"); b.textContent = label; b.style.cssText = "height:31px;padding:0 10px;border-radius:5px;background:transparent;text-align:left;cursor:pointer"; b.onmouseenter = () => b.style.background = "#f2f5f9"; b.onmouseleave = () => b.style.background = "transparent"; b.onclick = () => { pop.remove(); fn(); }; pop.appendChild(b); });
    const rect = anchor.getBoundingClientRect(); pop.style.left = `${Math.max(6, rect.right - 122)}px`; pop.style.top = `${rect.bottom + 4}px`; document.body.appendChild(pop);
    setTimeout(() => document.addEventListener("click", () => pop.remove(), { once: true }), 0);
  }
  function duplicateSlide(index) { pushHistory(); const copy = clone(state.slides[index]); copy.id = uid(); copy.name += " のコピー"; state.slides.splice(index + 1, 0, copy); state.current = index + 1; renderAll(); persistSoon(); }
  function deleteSlide(index) {
    if (state.slides.length === 1) return showToast("最後の1枚は削除できません", true);
    pushHistory(); state.slides.splice(index, 1); state.current = Math.min(state.current, state.slides.length - 1); renderAll(); persistSoon();
  }
  function addSlide() {
    pushHistory(); state.slides.push({ id: uid(), name: `スライド ${state.slides.length + 1}`, html: `<div class="slide" style="background:#f8fafc;color:#15213a"><p style="position:absolute;left:80px;top:64px;color:#2563eb;font-size:12px;font-weight:800;letter-spacing:.18em">NEW SLIDE</p><h2 style="position:absolute;left:80px;top:118px;margin:0;font-size:48px;letter-spacing:-.04em">新しいスライド</h2><p style="position:absolute;left:82px;top:205px;color:#6d7789;font-size:20px">要素をクリックして編集してください。</p><div style="position:absolute;left:80px;right:80px;bottom:70px;height:8px;border-radius:8px;background:linear-gradient(90deg,#2563eb,#62d9b6)"></div></div>` });
    state.current = state.slides.length - 1; renderAll(); persistSoon();
  }

  function prepareFrame() {
    const doc = els.slideFrame.contentDocument; if (!doc) return;
    doc.body.classList.toggle("studio-preview", state.mode === "preview");
    const root = findSlideRoot(doc);
    if (!root) return;
    makeElementsSelectable(root);
    doc.addEventListener("click", frameClick, true); doc.addEventListener("dblclick", frameDoubleClick, true); doc.addEventListener("pointerdown", framePointerDown, true);
    doc.addEventListener("keydown", event => { if ((event.key === "Backspace" || event.key === "Delete") && state.selectedPath && doc.activeElement?.getAttribute("contenteditable") !== "true") { event.preventDefault(); deleteSelectedElement(); } });
  }
  function findSlideRoot(doc) { return doc.querySelector("[data-slide], .slide, section") || doc.body.firstElementChild; }
  function makeElementsSelectable(root) {
    const candidates = root.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,strong,em,small,div,article,section,img,svg,table,ul,ol,blockquote");
    candidates.forEach(el => {
      if (el === root || el.closest("svg") && el.tagName.toLowerCase() !== "svg") return;
      if (["SPAN", "STRONG", "EM", "SMALL"].includes(el.tagName) && el.closest("h1,h2,h3,h4,h5,h6,p,blockquote,li")) return;
      const style = el.ownerDocument.defaultView.getComputedStyle(el); const rect = el.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden" || rect.width < 2 || rect.height < 2) return;
      el.setAttribute("data-studio-selectable", "1");
      el.addEventListener("mouseenter", () => { if (state.mode === "edit" && !el.classList.contains("studio-selected")) el.classList.add("studio-hover"); });
      el.addEventListener("mouseleave", () => el.classList.remove("studio-hover"));
    });
  }
  function closestSelectable(target) { return target?.closest?.("[data-studio-selectable]"); }
  function frameClick(event) {
    if (state.mode !== "edit") return; const target = closestSelectable(event.target); if (!target) { selectElement(null); return; }
    event.preventDefault(); event.stopPropagation(); selectElement(target);
  }
  function frameDoubleClick(event) {
    if (state.mode !== "edit") return; const target = closestSelectable(event.target); if (!target || target.tagName === "IMG" || target.tagName === "SVG") return;
    event.preventDefault(); event.stopPropagation(); selectElement(target); target.setAttribute("contenteditable", "true"); target.focus();
    const finish = () => { target.removeAttribute("contenteditable"); commitFrame("テキストを編集"); target.removeEventListener("blur", finish); };
    target.addEventListener("blur", finish); target.addEventListener("keydown", e => { if (e.key === "Escape") { e.preventDefault(); target.blur(); } });
  }
  function getPath(element, root) {
    const path = []; let node = element;
    while (node && node !== root) { const parent = node.parentElement; if (!parent) break; path.unshift(Array.from(parent.children).indexOf(node)); node = parent; }
    return path;
  }
  function resolvePath(path) {
    const doc = els.slideFrame.contentDocument; const root = findSlideRoot(doc); let node = root;
    for (const index of path || []) { node = node?.children[index]; if (!node) return null; }
    return node;
  }
  function selectElement(element) {
    const doc = els.slideFrame.contentDocument; doc?.querySelectorAll(".studio-selected").forEach(el => el.classList.remove("studio-selected"));
    if (!element) { state.selectedPath = null; state.selectedType = null; closeInspectorSelection(); return; }
    const root = findSlideRoot(doc); state.selectedPath = getPath(element, root); state.selectedType = classifyElement(element); element.classList.add("studio-selected"); element.classList.remove("studio-hover");
    els.selectionTools.hidden = false; els.elementTag.textContent = state.selectedType.toUpperCase(); els.activeElementStatus.textContent = `${state.selectedType} を選択中`; populateInspector(element); renderLayers();
    if (matchMedia("(max-width: 820px)").matches) openInspector();
  }
  function classifyElement(el) { if (el.tagName === "IMG") return "image"; if (el.tagName === "SVG") return "svg"; if (el.tagName === "TABLE") return "table"; const text = (el.textContent || "").trim(); return text && !el.querySelector("img,svg,table") ? "text" : "shape"; }
  function closeInspectorSelection() { els.selectionTools.hidden = true; els.emptyInspector.hidden = false; els.propertyForm.hidden = true; els.activeElementStatus.textContent = "未選択"; renderLayers(); }
  function populateInspector(el) {
    const win = el.ownerDocument.defaultView; const style = win.getComputedStyle(el); const rootRect = findSlideRoot(el.ownerDocument).getBoundingClientRect(); const rect = el.getBoundingClientRect(); const type = classifyElement(el); const isText = type === "text";
    els.emptyInspector.hidden = true; els.propertyForm.hidden = false; els.textSection.hidden = !isText; els.imageSection.hidden = type !== "image";
    if (isText) { els.textValue.value = el.textContent.trim(); ensureFontOption(els.elementFontFamily, cleanFont(style.fontFamily)); els.elementFontFamily.value = cleanFont(style.fontFamily); els.fontSize.value = Math.round(parseFloat(style.fontSize)); els.fontWeight.value = nearestWeight(style.fontWeight); els.lineHeight.value = numericLineHeight(style); const color = rgbToHex(style.color); setColorFields(els.textColor, els.textColorHex, color); updateAlignButtons(style.textAlign); }
    els.posX.value = Math.round(rect.left - rootRect.left); els.posY.value = Math.round(rect.top - rootRect.top); els.sizeW.value = Math.round(rect.width); els.sizeH.value = Math.round(rect.height);
    const fill = rgbaToHex(style.backgroundColor); setColorFields(els.fillColor, els.fillColorHex, fill || "#ffffff"); els.fillColorHex.dataset.empty = fill ? "0" : "1"; els.fillColorHex.value = fill || "transparent";
    els.borderRadius.value = Math.round(parseFloat(style.borderRadius) || 0); els.padding.value = Math.round(parseFloat(style.paddingTop) || 0); els.opacity.value = Math.round((parseFloat(style.opacity) || 1) * 100);
    if (type === "image") { els.objectFit.value = style.objectFit || "cover"; els.altText.value = el.alt || ""; }
  }
  function nearestWeight(value) { const n = parseInt(value, 10) || 400; return String([300,400,500,600,700,800].reduce((a,b) => Math.abs(b-n) < Math.abs(a-n) ? b : a)); }
  function numericLineHeight(style) { const value = parseFloat(style.lineHeight); const font = parseFloat(style.fontSize) || 16; return Number.isFinite(value) ? Math.round((value / font) * 10) / 10 : 1.2; }
  function rgbToHex(value) { const nums = value.match(/[\d.]+/g); if (!nums) return "#000000"; return `#${nums.slice(0,3).map(n => Math.max(0, Math.min(255, Math.round(+n))).toString(16).padStart(2,"0")).join("")}`; }
  function rgbaToHex(value) { const nums = value.match(/[\d.]+/g); if (!nums || (nums.length > 3 && +nums[3] === 0)) return null; return rgbToHex(value); }
  function normalizeHex(value, fallback = "#000000") { const clean = String(value || "").trim(); if (/^#[0-9a-f]{6}$/i.test(clean)) return clean.toLowerCase(); if (/^#[0-9a-f]{3}$/i.test(clean)) return `#${clean.slice(1).split("").map(c => c+c).join("")}`.toLowerCase(); return fallback; }
  function setColorFields(colorInput, textInput, value) { colorInput.value = normalizeHex(value); textInput.value = normalizeHex(value); }
  function updateAlignButtons(value) { document.querySelectorAll("[data-align]").forEach(btn => btn.classList.toggle("is-active", btn.dataset.align === value || (value === "start" && btn.dataset.align === "left"))); }

  function ensurePositioned(el) {
    const win = el.ownerDocument.defaultView; const root = findSlideRoot(el.ownerDocument); const rect = el.getBoundingClientRect(); const rootRect = root.getBoundingClientRect(); const style = win.getComputedStyle(el);
    if (style.position !== "absolute" && style.position !== "fixed") {
      el.style.position = "absolute"; el.style.left = `${rect.left - rootRect.left}px`; el.style.top = `${rect.top - rootRect.top}px`; el.style.width = `${rect.width}px`; el.style.height = `${rect.height}px`; el.style.margin = "0";
    }
  }
  function applyStyle(property, value, options = {}) {
    const el = resolvePath(state.selectedPath); if (!el) return; if (options.position) ensurePositioned(el); el.style[property] = value; scheduleCommit(); populateInspector(el);
  }
  function scheduleCommit() { clearTimeout(scheduleCommit.timer); scheduleCommit.timer = setTimeout(() => commitFrame("書式を変更"), 220); }
  function cleanEditorArtifacts(root) {
    root.querySelectorAll("[data-studio-selectable]").forEach(el => { el.removeAttribute("data-studio-selectable"); el.classList.remove("studio-selected", "studio-hover"); el.removeAttribute("contenteditable"); });
    root.classList.remove("studio-selected", "studio-hover"); return root.outerHTML;
  }
  function commitFrame(label = "編集") {
    const doc = els.slideFrame.contentDocument; const root = findSlideRoot(doc); if (!root) return;
    const path = state.selectedPath ? [...state.selectedPath] : null; const nextHtml = cleanEditorArtifacts(root.cloneNode(true));
    if (nextHtml === state.slides[state.current].html) { if (path) { const live = resolvePath(path); live?.classList.add("studio-selected"); } return; }
    pushHistory(); state.slides[state.current].html = nextHtml; setStatus(label); persistSoon(); renderSlideList(); renderLayers();
    if (!els.overview.hidden) renderOverview();
  }
  function framePointerDown(event) {
    if (state.mode !== "edit" || event.button !== 0) return; const selected = closestSelectable(event.target); if (!selected) return;
    if (!selected.classList.contains("studio-selected")) selectElement(selected);
    const rect = selected.getBoundingClientRect(); const nearResize = Math.abs(event.clientX - rect.right) < 15 && Math.abs(event.clientY - rect.bottom) < 15;
    if (selected.getAttribute("contenteditable") === "true") return;
    const rootRect = findSlideRoot(selected.ownerDocument).getBoundingClientRect();
    dragState = { el: selected, startX: event.clientX, startY: event.clientY, left: rect.left - rootRect.left, top: rect.top - rootRect.top, width: rect.width, height: rect.height, resize: nearResize, moved: false, prepared: false };
    event.preventDefault(); selected.setPointerCapture?.(event.pointerId); selected.ownerDocument.addEventListener("pointermove", framePointerMove, true); selected.ownerDocument.addEventListener("pointerup", framePointerUp, true);
  }
  function framePointerMove(event) {
    if (!dragState) return; const dx = event.clientX - dragState.startX; const dy = event.clientY - dragState.startY; if (Math.abs(dx) + Math.abs(dy) > 2) dragState.moved = true; if (!dragState.moved) return;
    if (!dragState.prepared) { ensurePositioned(dragState.el); dragState.prepared = true; }
    if (dragState.resize) { dragState.el.style.width = `${Math.max(12, dragState.width + dx)}px`; dragState.el.style.height = `${Math.max(12, dragState.height + dy)}px`; }
    else { dragState.el.style.left = `${dragState.left + dx}px`; dragState.el.style.top = `${dragState.top + dy}px`; }
    populateInspector(dragState.el); event.preventDefault();
  }
  function framePointerUp(event) {
    if (!dragState) return; const { el, moved } = dragState; dragState = null; el.ownerDocument.removeEventListener("pointermove", framePointerMove, true); el.ownerDocument.removeEventListener("pointerup", framePointerUp, true); if (moved) commitFrame("要素を移動"); event.preventDefault();
  }

  function renderLayers() {
    if (!els.layersTab.classList.contains("is-active")) return; const doc = els.slideFrame.contentDocument; const root = doc && findSlideRoot(doc); els.layerList.innerHTML = "";
    if (!root) return;
    root.querySelectorAll("[data-studio-selectable]").forEach(el => {
      const path = getPath(el, root); const type = classifyElement(el); const row = document.createElement("button"); row.className = `layer-row${JSON.stringify(path) === JSON.stringify(state.selectedPath) ? " is-active" : ""}`;
      const label = type === "text" ? (el.textContent || "テキスト").trim().slice(0, 22) : type === "image" ? (el.alt || "画像") : el.tagName.toLowerCase(); row.innerHTML = `<span class="layer-icon">${type === "text" ? "T" : type === "image" ? "▣" : "◇"}</span><span>${escapeHtml(label)}</span><em>${type}</em>`; row.onclick = () => selectElement(resolvePath(path)); els.layerList.appendChild(row);
    });
  }

  function fitCanvas() {
    const area = els.canvasArea.getBoundingClientRect(); const availableW = Math.max(260, area.width - 56); const availableH = Math.max(180, area.height - 82); const base = Math.min(availableW / WIDTH, availableH / HEIGHT); const scale = Math.max(.18, Math.min(1.35, base * Math.pow(1.16, state.zoomOffset)));
    els.canvasWrap.style.setProperty("--canvas-scale", scale); els.canvasWrap.style.width = `${WIDTH * scale}px`; els.canvasWrap.style.height = `${HEIGHT * scale}px`; els.zoomValue.textContent = state.zoomOffset === 0 ? "自動" : `${Math.round(scale * 100)}%`;
  }
  function toggleMode(mode) {
    state.mode = mode; els.editModeBtn.classList.toggle("is-active", mode === "edit"); els.previewModeBtn.classList.toggle("is-active", mode === "preview"); els.canvasArea.classList.toggle("is-preview", mode === "preview");
    const doc = els.slideFrame.contentDocument; doc?.body.classList.toggle("studio-preview", mode === "preview"); if (mode === "preview") selectElement(null); setStatus(mode === "preview" ? "プレビュー中" : "編集モード");
  }
  function renderOverview() {
    els.overviewGrid.innerHTML = ""; state.slides.forEach((slide, index) => { const item = document.createElement("div"); item.className = "overview-item"; const card = document.createElement("div"); card.className = "overview-card"; const frame = document.createElement("iframe"); frame.setAttribute("sandbox", "allow-same-origin"); frame.tabIndex = -1; frame.srcdoc = composeDocument(slide.html); card.appendChild(frame); item.append(card, Object.assign(document.createElement("p"), { textContent: `${String(index + 1).padStart(2,"0")}  ${slide.name}` })); item.onclick = () => { selectSlide(index); closeOverview(); }; els.overviewGrid.appendChild(item); }); requestAnimationFrame(updateThumbnailScales);
  }
  function openOverview() { renderOverview(); els.overview.hidden = false; els.canvasArea.hidden = true; }
  function closeOverview() { els.overview.hidden = true; els.canvasArea.hidden = false; fitCanvas(); }

  function renderImportedHtml(source) {
    const parser = new DOMParser(); const doc = sanitizeImportedDocument(parser.parseFromString(source, "text/html"));
    let roots = Array.from(doc.querySelectorAll("[data-slide], section.slide, .slide[data-slide-id]"));
    if (!roots.length) roots = Array.from(doc.querySelectorAll("body > section, body > .slide"));
    if (!roots.length && doc.body.firstElementChild) roots = [doc.body.firstElementChild];
    if (!roots.length) throw new Error("スライドとして読み込めるHTML要素が見つかりませんでした");
    const styleText = Array.from(doc.querySelectorAll("style")).map(style => style.textContent).join("\n");
    const slides = roots.map((root, index) => { const copy = root.cloneNode(true); copy.removeAttribute("data-slide"); if (!copy.classList.contains("slide")) copy.classList.add("slide"); normalizeImportedRoot(copy); return { id: uid(), name: root.getAttribute("data-title") || `スライド ${index + 1}`, html: copy.outerHTML }; });
    pushHistory(); state.styles = `${styleText}\nhtml,body{margin:0;width:100%;height:100%;overflow:hidden}\nbody{width:1280px;height:720px}\n.slide{width:1280px;height:720px;overflow:hidden}`; state.slides = slides; state.current = 0; state.selectedPath = null; renderAll(); persistSoon();
  }
  function normalizeImportedRoot(root) { root.style.width = root.style.width || "1280px"; root.style.height = root.style.height || "720px"; root.style.overflow = "hidden"; root.querySelectorAll("img").forEach(img => { if (img.src && !img.src.startsWith("data:") && !img.src.startsWith("blob:")) img.setAttribute("crossorigin", "anonymous"); }); }
  function handleHtmlFile(file) {
    if (!file || !/\.html?$/i.test(file.name)) return showToast("HTMLファイルを選んでください", true); const reader = new FileReader(); reader.onload = () => { els.htmlInput.value = String(reader.result || ""); setStatus(`${file.name} を読み込みました`); }; reader.onerror = () => showToast("ファイルを読み込めませんでした", true); reader.readAsText(file);
  }

  function openImagePicker(action = "add") { currentImageAction = action; els.imageFileInput.value = ""; els.imageFileInput.click(); }
  function handleImageFile(file) {
    if (!file || !file.type.startsWith("image/")) return; const reader = new FileReader(); reader.onload = () => {
      const data = String(reader.result); if (currentImageAction === "replace") { const el = resolvePath(state.selectedPath); if (el?.tagName === "IMG") { el.src = data; el.alt = file.name; commitFrame("画像を差し替え"); populateInspector(el); } }
      else addImageToSlide(data, file.name);
    }; reader.readAsDataURL(file);
  }
  function addImageToSlide(data, name) {
    const doc = els.slideFrame.contentDocument; const root = findSlideRoot(doc); if (!root) return; pushHistory(); const img = doc.createElement("img"); img.src = data; img.alt = name; img.style.cssText = "position:absolute;left:440px;top:230px;width:400px;height:260px;object-fit:cover;border-radius:16px;box-shadow:0 18px 36px rgba(15,23,42,.22)"; root.appendChild(img); makeElementsSelectable(root); state.selectedPath = getPath(img, root); state.slides[state.current].html = cleanEditorArtifacts(root.cloneNode(true)); renderCurrentSlide(); renderSlideList(); persistSoon(); setTimeout(() => { const el = resolvePath(state.selectedPath); if (el) selectElement(el); }, 80);
  }

  function duplicateSelectedElement() {
    const el = resolvePath(state.selectedPath); if (!el) return; const copy = el.cloneNode(true); ensurePositioned(el); copy.style.position = "absolute"; copy.style.left = `${(parseFloat(el.style.left) || el.offsetLeft) + 24}px`; copy.style.top = `${(parseFloat(el.style.top) || el.offsetTop) + 24}px`; el.parentElement.appendChild(copy); commitFrame("要素を複製"); renderCurrentSlide(); renderSlideList(); persistSoon();
  }
  function deleteSelectedElement() {
    const el = resolvePath(state.selectedPath); if (!el) return; el.remove(); state.selectedPath = null; commitFrame("要素を削除"); renderCurrentSlide(); renderSlideList(); persistSoon();
  }

  function exportHtml() {
    const sections = state.slides.map((slide, i) => `<!-- Slide ${i + 1}: ${slide.name} -->\n${slide.html}`).join("\n\n");
    const html = `<!doctype html>\n<html lang="ja">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${escapeHtml(state.projectName)}</title>\n<link href="${GOOGLE_FONT_LINK}" rel="stylesheet">\n<style>${state.styles}\n${currentThemeCss()}\nbody{display:grid;gap:32px;place-items:center;padding:32px;background:#e9edf3}.slide{position:relative}</style>\n</head>\n<body>\n${sections}\n</body>\n</html>`;
    downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), `${sanitizeFilename(state.projectName)}.html`); showToast("編集済みHTMLを保存しました");
  }
  function downloadBlob(blob, filename) { const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); }

  function prepareExportDialog(mode, warnings) {
    if (!els.exportModal.open) els.exportModal.showModal();
    els.exportEngineBadge.classList.toggle("is-fallback", mode === "fallback"); els.exportEngineBadge.innerHTML = mode === "fallback" ? "<i></i>COMPATIBILITY ENGINE" : "<i></i>HIGH-FIDELITY OSS";
    els.exportTitle.textContent = mode === "fallback" ? "互換モードで作成中" : "PowerPointを高精度変換中";
    els.exportMessage.textContent = mode === "fallback" ? "標準変換へ切り替え、編集可能な要素を組み立てています。" : "グラデーション・影・レイアウトを解析し、編集可能な要素へ変換しています。";
    els.exportProgress.style.width = mode === "fallback" ? "8%" : "5%"; els.exportSlideNum.textContent = "0"; els.exportElementNum.textContent = "0"; els.exportWarningNum.textContent = String(warnings.length);
    els.exportWarning.hidden = warnings.length === 0; els.exportWarning.textContent = warnings.join(" / "); delete els.downloadGeneratedBtn.dataset.bytes; delete els.downloadGeneratedBtn.dataset.engine; els.downloadGeneratedBtn.hidden = true; els.closeExportBtn.hidden = true;
  }

  function createHighFidelityFrame() {
    const frame = document.createElement("iframe"); frame.setAttribute("sandbox", "allow-same-origin allow-scripts"); frame.setAttribute("aria-hidden", "true"); frame.tabIndex = -1;
    frame.style.cssText = `position:fixed;left:-20000px;top:0;z-index:-1;width:${WIDTH}px;height:${Math.max(HEIGHT, HEIGHT * state.slides.length)}px;border:0;pointer-events:none`;
    const ready = new Promise((resolve, reject) => { frame.onload = resolve; frame.onerror = () => reject(new Error("高精度変換エンジンを読み込めませんでした")); });
    frame.srcdoc = composeExportDocument(); document.body.appendChild(frame); return { frame, ready };
  }

  async function exportPowerPoint() {
    const warnings = analyzeCompatibility();
    if (generatedPptxUrl) { URL.revokeObjectURL(generatedPptxUrl); generatedPptxUrl = null; }
    prepareExportDialog("high", warnings); setStatus("高精度PowerPointを作成中");
    let exportFrame = null;
    try {
      const created = createHighFidelityFrame(); exportFrame = created.frame; await created.ready; await exportFrame.contentDocument.fonts?.ready; await tick();
      const engine = exportFrame.contentWindow.domToPptx; const slides = Array.from(exportFrame.contentDocument.querySelectorAll(".studio-export-slot > :first-child"));
      if (!engine?.exportToPptx || slides.length !== state.slides.length) throw new Error("高精度変換エンジンを初期化できませんでした");
      els.exportSlideNum.textContent = String(state.slides.length); els.exportElementNum.textContent = String(estimateExportElementCount()); els.exportProgress.style.width = "28%";
      const pptxBlob = await engine.exportToPptx(slides, { fileName: `${sanitizeFilename(state.projectName)}.pptx`, skipDownload: true, svgAsVector: true, autoEmbedFonts: true, width: 13.333333, height: 7.5 });
      els.exportProgress.style.width = "94%"; generatedPptxUrl = URL.createObjectURL(pptxBlob); els.downloadGeneratedBtn.href = generatedPptxUrl; els.downloadGeneratedBtn.download = `${sanitizeFilename(state.projectName)}.pptx`; els.downloadGeneratedBtn.dataset.bytes = String(pptxBlob.size); els.downloadGeneratedBtn.dataset.engine = "dom-to-pptx"; els.downloadGeneratedBtn.hidden = false;
      els.exportProgress.style.width = "100%"; els.exportTitle.textContent = "高精度変換が完了しました"; els.exportMessage.textContent = warnings.length ? "変換前チェックの注意点を近似処理しました。ダウンロード後に該当箇所をご確認ください。" : "グラデーション・影・リッチテキスト・SVGをできる限り編集可能な状態で変換しました。"; els.closeExportBtn.hidden = false; setStatus("高精度PowerPointを作成しました");
    } catch (error) {
      console.warn("High-fidelity export failed; using compatibility engine.", error); exportFrame?.remove(); exportFrame = null; showToast("互換モードへ自動で切り替えました"); await exportPowerPointLegacy(true, warnings);
    } finally { exportFrame?.remove(); }
  }

  async function exportPowerPointLegacy(fallbackMode = false, warnings = []) {
    if (!window.PptxGenJS) { els.exportTitle.textContent = "変換機能を読み込めませんでした"; els.exportMessage.textContent = "ページを再読み込みして、もう一度お試しください。"; els.closeExportBtn.hidden = false; return showToast("PowerPoint変換機能を読み込めませんでした", true); }
    if (!fallbackMode && generatedPptxUrl) { URL.revokeObjectURL(generatedPptxUrl); generatedPptxUrl = null; }
    prepareExportDialog("fallback", warnings);
    try {
      const pptx = new window.PptxGenJS(); pptx.layout = "LAYOUT_WIDE"; pptx.author = "HTML Slide Studio"; pptx.subject = state.projectName; pptx.title = state.projectName; pptx.company = "HTML Slide Studio"; pptx.lang = "ja-JP"; pptx.theme = { headFontFace: state.fonts.heading || "Aptos", bodyFontFace: state.fonts.body || "Aptos", lang: "ja-JP" };
      let elementCount = 0;
      for (let i = 0; i < state.slides.length; i++) {
        const snapshot = await getSlideSnapshot(i); const slide = pptx.addSlide(); slide.background = { color: snapshot.background || "FFFFFF" };
        for (const item of snapshot.items) { try { await addPptxItem(pptx, slide, item); elementCount++; } catch (error) { console.warn("Skipped element", error); } }
        els.exportSlideNum.textContent = String(i + 1); els.exportElementNum.textContent = String(elementCount); els.exportProgress.style.width = `${10 + ((i + 1) / state.slides.length) * 75}%`; await tick();
      }
      els.exportMessage.textContent = "ファイルをまとめています。まもなくダウンロードが始まります。"; els.exportProgress.style.width = "92%";
      const pptxBlob = await pptx.write({ outputType: "blob", compression: true });
      generatedPptxUrl = URL.createObjectURL(pptxBlob); els.downloadGeneratedBtn.href = generatedPptxUrl; els.downloadGeneratedBtn.download = `${sanitizeFilename(state.projectName)}.pptx`; els.downloadGeneratedBtn.dataset.bytes = String(pptxBlob.size); els.downloadGeneratedBtn.dataset.engine = "pptxgenjs"; els.downloadGeneratedBtn.hidden = false;
      els.exportProgress.style.width = "100%"; els.exportTitle.textContent = "互換変換が完了しました"; els.exportMessage.textContent = "高精度変換が使えない環境でも、文字・図形・画像を編集できる標準形式で作成しました。"; els.closeExportBtn.hidden = false; setStatus("互換PowerPointを作成しました");
    } catch (error) { console.error(error); els.exportTitle.textContent = "書き出しに失敗しました"; els.exportMessage.textContent = "一部のHTML表現を変換できませんでした。HTMLを簡略化して再度お試しください。"; els.exportProgress.style.width = "0"; els.closeExportBtn.hidden = false; showToast("PowerPointを書き出せませんでした", true); }
  }
  async function getSlideSnapshot(index) {
    const frame = document.createElement("iframe"); frame.setAttribute("sandbox", "allow-same-origin"); frame.style.cssText = `position:fixed;left:-10000px;top:0;width:${WIDTH}px;height:${HEIGHT}px;border:0`; document.body.appendChild(frame);
    await new Promise(resolve => { frame.onload = resolve; frame.srcdoc = composeDocument(state.slides[index].html); }); await frame.contentDocument.fonts?.ready; await tick();
    const doc = frame.contentDocument; const root = findSlideRoot(doc); const rootRect = root.getBoundingClientRect(); const win = frame.contentWindow; const rootStyle = win.getComputedStyle(root); const bodyStyle = win.getComputedStyle(doc.body); const background = effectiveFill(rootStyle) || effectiveFill(bodyStyle) || "FFFFFF"; const items = [];
    const nodes = Array.from(root.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,strong,em,small,div,article,section,img,svg,table,ul,ol,blockquote,i"));
    nodes.forEach(el => {
      if (el.closest("svg") && el.tagName.toLowerCase() !== "svg") return; const rect = el.getBoundingClientRect(); const style = win.getComputedStyle(el); if (style.display === "none" || style.visibility === "hidden" || rect.width < 2 || rect.height < 2) return;
      if (["SPAN", "STRONG", "EM", "SMALL"].includes(el.tagName) && el.closest("h1,h2,h3,h4,h5,h6,p,blockquote,li")) return;
      const hasDirectText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()); const isLeafText = hasDirectText || (!el.children.length && (el.textContent || "").trim()); const tag = el.tagName.toLowerCase();
      const base = { tag, x: rect.left - rootRect.left, y: rect.top - rootRect.top, w: rect.width, h: rect.height, z: parseInt(style.zIndex,10) || 0, fill: effectiveFill(style), opacity: Math.round((parseFloat(style.opacity)||1)*100), radius: parseFloat(style.borderRadius)||0, borderColor: colorForPpt(style.borderColor), borderWidth: parseFloat(style.borderWidth)||0, shadow: parseShadow(style.boxShadow), transform: style.transform };
      if (tag === "img") items.push({ ...base, type: "image", src: el.src, alt: el.alt || "" });
      else if (tag === "svg") items.push({ ...base, type: "svg", data: svgToData(el) });
      else if (tag === "table") items.push({ ...base, type: "table", rows: Array.from(el.rows).map(row => Array.from(row.cells).map(cell => cell.innerText.trim())) });
      else if (isLeafText && (el.textContent || "").trim()) items.push({ ...base, type: "text", text: el.textContent.trim(), color: colorForPpt(style.color) || "222222", fontSize: parseFloat(style.fontSize)||16, fontFace: cleanFont(style.fontFamily), bold: parseInt(style.fontWeight,10)>=600, italic: style.fontStyle === "italic", align: normalizeAlign(style.textAlign), valign: normalizeValign(style.alignItems, style.verticalAlign), lineHeight: numericLineHeight(style), padding: parseFloat(style.paddingLeft)||0, letterSpacing: parseFloat(style.letterSpacing)||0, decoration: style.textDecorationLine });
      else if ((base.fill || base.borderWidth) && !el.querySelector("img,svg,table") && !isContainerDuplicate(el, root)) items.push({ ...base, type: "shape" });
    });
    frame.remove(); return { background, items: items.sort((a,b) => a.z-b.z) };
  }
  function isContainerDuplicate(el, root) { if (el === root) return true; const rect = el.getBoundingClientRect(); return rect.width > WIDTH*.96 && rect.height > HEIGHT*.96; }
  function colorForPpt(css) { if (!css || css === "transparent") return null; const nums = css.match(/[\d.]+/g); if (!nums || (nums.length > 3 && +nums[3] === 0)) return null; return nums.slice(0,3).map(n => Math.round(+n).toString(16).padStart(2,"0")).join("").toUpperCase(); }
  function effectiveFill(style) { const solid = colorForPpt(style.backgroundColor); if (solid) return solid; const gradientColor = style.backgroundImage?.match(/rgba?\([^)]*\)/)?.[0]; return gradientColor ? colorForPpt(gradientColor) : null; }
  function cleanFont(value) { return (value || "Arial").split(",")[0].replace(/["']/g, "").trim() || "Arial"; }
  function normalizeAlign(value) { return value === "center" ? "center" : value === "right" || value === "end" ? "right" : value === "justify" ? "justify" : "left"; }
  function normalizeValign(alignItems, verticalAlign) { if (alignItems === "center" || verticalAlign === "middle") return "mid"; if (alignItems === "flex-end" || verticalAlign === "bottom") return "bottom"; return "top"; }
  function parseShadow(value) { if (!value || value === "none") return undefined; const color = colorForPpt(value) || "777777"; const nums = value.match(/-?[\d.]+px/g)?.map(n => parseFloat(n)) || []; const x=nums[0]||0,y=nums[1]||0,blur=nums[2]||0; return { type:"outer", color, angle:(Math.atan2(y,x)*180/Math.PI+360)%360, blur:Math.min(20,blur*.75), distance:Math.min(12,Math.hypot(x,y)*.75), opacity:.22 };
  }
  function svgToData(svg) { const copy = svg.cloneNode(true); copy.setAttribute("xmlns", SVG_NS); const text = new XMLSerializer().serializeToString(copy); return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(text)))}`; }
  function pxToIn(value) { return Math.max(0, value / 96); }
  function pxToPt(value) { return Math.max(1, value * .75); }
  async function addPptxItem(pptx, slide, item) {
    const opts = { x:pxToIn(item.x), y:pxToIn(item.y), w:pxToIn(item.w), h:pxToIn(item.h) };
    if (item.type === "image") { const data = await imageToDataUrl(item.src); slide.addImage({ data, ...opts, altText:item.alt, rounding:item.radius > 1, transparency:Math.max(0,100-item.opacity) }); return; }
    if (item.type === "svg") { slide.addImage({ data:item.data, ...opts, transparency:Math.max(0,100-item.opacity) }); return; }
    if (item.type === "table") { slide.addTable(item.rows, { ...opts, border:{ type:"solid", color:item.borderColor||"D9DEE7", pt:Math.max(.5,item.borderWidth*.75) }, fill:item.fill||"FFFFFF", fontFace:"Arial", fontSize:12, color:"253047", margin:5 }); return; }
    const shapeType = item.radius > 3 ? pptx.ShapeType.roundRect : pptx.ShapeType.rect; const fill = item.fill ? { color:item.fill, transparency:Math.max(0,100-item.opacity) } : { color:"FFFFFF", transparency:100 };
    const line = item.borderWidth > 0 && item.borderColor ? { color:item.borderColor, width:Math.max(.5,item.borderWidth*.75), transparency:Math.max(0,100-item.opacity) } : { color:"FFFFFF", transparency:100 };
    if (item.type === "shape") { slide.addShape(shapeType, { ...opts, fill, line, shadow:item.shadow }); return; }
    slide.addText(item.text, { ...opts, shape:shapeType, fill, line, shadow:item.shadow, fontFace:item.fontFace, fontSize:pxToPt(item.fontSize), color:item.color, bold:item.bold, italic:item.italic, align:item.align, valign:item.valign, breakLine:false, margin:pxToPt(item.padding), paraSpaceAfterPt:0, lineSpacingMultiple:Math.max(.6,item.lineHeight), charSpacing:item.letterSpacing*.75, underline:item.decoration?.includes("underline") ? { color:item.color } : undefined, strike:item.decoration?.includes("line-through"), fit:"shrink", isTextBox:true, transparency:Math.max(0,100-item.opacity) });
  }
  async function imageToDataUrl(src) { if (src.startsWith("data:")) return src; const response = await fetch(src, { mode:"cors" }); const blob = await response.blob(); return await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload=()=>resolve(String(reader.result)); reader.onerror=reject; reader.readAsDataURL(blob); }); }
  function tick() { return new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0))); }

  function ensureFontOption(select, family) {
    if (!select || !family || Array.from(select.options).some(option => option.value === family)) return;
    select.appendChild(Object.assign(document.createElement("option"), { value:family, textContent:family }));
  }
  function populateFontSelect(select, value) {
    select.innerHTML = ""; FONT_OPTIONS.forEach(font => { const option = document.createElement("option"); option.value = font.family; option.textContent = `${font.label} — ${font.source}`; select.appendChild(option); });
    ensureFontOption(select, value); select.value = value;
  }
  function populateFontControls() {
    populateFontSelect(els.headingFontSelect, state.fonts.heading); populateFontSelect(els.bodyFontSelect, state.fonts.body); populateFontSelect(els.latinFontSelect, state.fonts.latin); populateFontSelect(els.elementFontFamily, state.fonts.body);
    els.fontPresets.innerHTML = ""; FONT_PRESETS.forEach(preset => { const button = document.createElement("button"); button.type = "button"; button.textContent = preset.name; button.addEventListener("click", () => { els.headingFontSelect.value = preset.heading; els.bodyFontSelect.value = preset.body; els.latinFontSelect.value = preset.latin; updateFontPreview(); }); els.fontPresets.appendChild(button); });
    updateFontPreview();
  }
  function updateFontPreview() {
    const heading = els.headingFontSelect.value || state.fonts.heading; const body = els.bodyFontSelect.value || state.fonts.body; const latin = els.latinFontSelect.value || state.fonts.latin;
    els.fontPreviewHeading.style.fontFamily = fontStack(heading, "serif"); els.fontPreviewBody.style.fontFamily = fontStack(body); els.fontPreviewLatin.style.fontFamily = fontStack(latin);
    [[els.headingFontState,heading],[els.bodyFontState,body],[els.latinFontState,latin]].forEach(([node,family]) => { const info = FONT_OPTIONS.find(font => font.family === family); node.textContent = info?.source || "追加フォント"; });
  }
  function openStudio(tab = "styles") { switchStudioTab(tab); renderStyleLibrary(); populateFontControls(); renderImageStyle(); if (!els.studioModal.open) els.studioModal.showModal(); }
  function switchStudioTab(tab) {
    document.querySelectorAll("[data-studio-tab]").forEach(button => button.classList.toggle("is-active", button.dataset.studioTab === tab));
    document.querySelectorAll("[data-studio-view]").forEach(view => view.classList.toggle("is-active", view.dataset.studioView === tab));
  }
  function themeById(id) { return allThemes().find(theme => theme.id === id) || state.theme || BUILTIN_THEMES[0]; }
  function renderStyleLibrary() {
    const hasNotebook = (state.notebookThemes || []).length > 0; const categories = ["すべて", ...(hasNotebook ? ["v6・すべて","v6・検証済み","v6・復元"] : []), ...new Set(allThemes().map(theme => theme.category)), "お気に入り", "My Styles"];
    els.styleFilters.innerHTML = ""; categories.forEach(category => { const button = document.createElement("button"); button.type = "button"; button.textContent = category; button.classList.toggle("is-active", activeStyleCategory === category); button.onclick = () => { activeStyleCategory = category; renderStyleLibrary(); }; els.styleFilters.appendChild(button); });
    const query = (els.styleSearch.value || "").trim().toLowerCase(); const myIds = new Set((state.myStyles || []).map(theme => theme.id));
    const themes = allThemes().filter(theme => {
      const notebookFilter = activeStyleCategory === "v6・すべて" ? theme.source === "notebooklm-v6" : activeStyleCategory === "v6・検証済み" ? theme.verification === "verified" : activeStyleCategory === "v6・復元" ? theme.verification === "reconstructed" : false;
      const categoryOk = activeStyleCategory === "すべて" || notebookFilter || theme.category === activeStyleCategory || (activeStyleCategory === "お気に入り" && state.favorites.includes(theme.id)) || (activeStyleCategory === "My Styles" && myIds.has(theme.id));
      return categoryOk && (!query || `${theme.name} ${theme.category} ${theme.description}`.toLowerCase().includes(query));
    });
    els.styleCountLabel.textContent = `${themes.length} / ${allThemes().length} styles`; els.styleGrid.innerHTML = "";
    themes.forEach(theme => {
      const card = document.createElement("button"); card.type = "button"; card.className = `style-card${selectedThemeId === theme.id ? " is-active" : ""}`;
      card.style.setProperty("--thumb-bg", theme.palette.bg); card.style.setProperty("--thumb-primary", theme.palette.primary); card.style.setProperty("--thumb-accent", theme.palette.accent); card.style.setProperty("--thumb-text", theme.palette.text); card.style.setProperty("--thumb-radius", `${Math.min(14,theme.radius || 0)}px`); card.style.setProperty("--thumb-heading", fontStack(theme.headingFont,"serif"));
      const sourceBadge = theme.source === "notebooklm-v6" ? `<span class="style-source-badge${theme.verification === "reconstructed" ? " is-reconstructed" : ""}">${theme.verification === "verified" ? "ORIGINAL ✓" : "RESTORED"}</span>` : ""; const preview = theme.previewUrl ? `<img src="${theme.previewUrl}" alt="" loading="lazy">` : "<i></i><b></b>";
      card.innerHTML = `<div class="style-thumb${theme.previewUrl ? " has-reference" : ""}">${sourceBadge}${preview}</div><div class="style-card-copy"><strong>${escapeHtml(theme.name)}</strong><span>${escapeHtml(theme.category)}</span><button type="button" aria-label="お気に入り">${state.favorites.includes(theme.id) ? "♥" : "♡"}</button></div>`;
      card.addEventListener("click", () => { selectedThemeId = theme.id; updateActiveThemeDetail(theme); renderStyleLibrary(); });
      const favorite = card.querySelector(".style-card-copy button"); favorite.classList.toggle("is-favorite", state.favorites.includes(theme.id)); favorite.addEventListener("click", event => { event.stopPropagation(); const index = state.favorites.indexOf(theme.id); if (index >= 0) state.favorites.splice(index,1); else state.favorites.push(theme.id); persistSoon(); renderStyleLibrary(); });
      els.styleGrid.appendChild(card);
    });
    updateActiveThemeDetail(themeById(selectedThemeId));
  }
  function updateActiveThemeDetail(theme) {
    els.activeStyleName.textContent = theme.name; els.activeStyleDescription.textContent = theme.description; els.activePalette.innerHTML = "";
    els.activeStylePreview.hidden = !theme.previewUrl; if (theme.previewUrl) { els.activeStylePreview.src = theme.previewUrl; els.activeStylePreview.alt = `${theme.name}のデザイン見本`; } else { els.activeStylePreview.removeAttribute("src"); els.activeStylePreview.alt = ""; }
    els.copyStyleYamlBtn.hidden = !theme.sourceYaml;
    [theme.palette.bg, theme.palette.primary, theme.palette.accent, theme.palette.text, theme.palette.muted].forEach(color => { const dot = document.createElement("i"); dot.style.background = color; dot.title = color; els.activePalette.appendChild(dot); });
  }
  function applySelectedTheme() {
    const next = themeById(selectedThemeId); pushHistory(); state.theme = clone(next); delete state.theme.previewUrl; delete state.theme.sourceYaml; delete state.theme.previewKey; renderAll(); persistSoon(); renderImageStyle(); showToast(`${next.name} をデッキ全体に適用しました`); setStatus("デザインシステムを更新");
  }
  function saveMyStyle() {
    const name = prompt("My Styleの名前", `${state.theme.name} Custom`); if (!name?.trim()) return;
    const theme = clone(state.theme); theme.id = `my-${Date.now().toString(36)}`; theme.name = name.trim(); theme.category = "My Styles"; theme.headingFont = state.fonts.heading; theme.bodyFont = state.fonts.body; theme.latinFont = state.fonts.latin; theme.description = `${state.theme.name}をもとに保存した独自スタイル`;
    state.myStyles.push(theme); selectedThemeId = theme.id; activeStyleCategory = "My Styles"; persistSoon(); renderStyleLibrary(); showToast("My Styleに保存しました");
  }
  function valueFromYaml(raw) { const text = String(raw || "").trim().replace(/^['"]|['"]$/g, ""); if (/^-?\d+(?:\.\d+)?$/.test(text)) return Number(text); if (/^(true|false)$/i.test(text)) return /^true$/i.test(text); return text; }
  function parseSimpleYaml(text) {
    const items = []; let current = {}; let section = ""; const lines = text.replace(/\t/g,"  ").split(/\r?\n/);
    const push = () => { if (Object.keys(current).length) items.push(current); current = {}; section = ""; };
    lines.forEach(line => { if (!line.trim() || /^\s*#/.test(line) || /^\s*styles:\s*$/.test(line)) return; if (/^---\s*$/.test(line)) return push(); const list = line.match(/^\s*-\s*(\w[\w-]*)\s*:\s*(.*)$/); if (list) { if (Object.keys(current).length) push(); current[list[1]] = valueFromYaml(list[2]); return; } const match = line.match(/^(\s*)([\w-]+)\s*:\s*(.*)$/); if (!match) return; const indent = match[1].length, key = match[2], value = match[3]; if (!value.trim()) { section = key; if (!current[section]) current[section] = {}; return; } if (indent > 0 && section) current[section][key] = valueFromYaml(value); else { section = ""; current[key] = valueFromYaml(value); } }); push(); return items;
  }
  function normalizeTheme(raw, index = 0) {
    const visual = raw.style && typeof raw.style === "object" ? { ...raw, ...raw.style } : raw; const palette = visual.palette && typeof visual.palette === "object" ? visual.palette : visual; const typography = visual.typography && typeof visual.typography === "object" ? visual.typography : {}; const image = visual.imageStyle || visual.image_style || {};
    const heading = typeof typography.heading === "object" ? typography.heading.family : typography.heading; const body = typeof typography.body === "object" ? typography.body.family : typography.body;
    return { id:String(visual.id || `imported-${Date.now().toString(36)}-${index}`).replace(/[^a-zA-Z0-9_-]/g,"-").toLowerCase(), name:visual.name || visual.title || `Imported Style ${index+1}`, category:visual.category || "Imported", description:visual.description || "読み込んだStyle Pack", palette:{ bg:palette.bg || palette.background || visual.background || visual.background_color || "#ffffff", primary:palette.primary || visual.primary || visual.primary_color || "#24324a", accent:palette.accent || visual.accent || visual.accent_color || "#d97757", text:palette.text || visual.text_color || "#1f2937", muted:palette.muted || visual.muted_color || "#6b7280" }, headingFont:visual.headingFont || visual.heading_font || heading || "Noto Sans JP", bodyFont:visual.bodyFont || visual.body_font || body || "Noto Sans JP", latinFont:visual.latinFont || visual.latin_font || "Aptos", radius:Number(visual.radius ?? visual.borderRadius ?? visual.border_radius ?? 8), shadow:visual.shadow || "minimal", spacing:visual.spacing || visual.whitespace || "balanced", imageStyle:{ mood:image.mood || visual.mood || "clean and professional", composition:image.composition || visual.composition || "editorial with negative space", illustration:image.illustration || visual.illustration || "minimal geometric", avoid:image.avoid || visual.avoid || "logos, watermarks, text in image" } };
  }
  async function handleStylePackFile(file) {
    if (!file) return; if (/\.zip$/i.test(file.name) || file.type === "application/zip") { try { await importNotebookArchive(file); } catch (error) { setPackStatus(state.notebookPack ? "ready" : "empty", state.notebookPack); showToast(`v6 ZIPを読み込めません: ${error.message}`, true); } return; }
    const reader = new FileReader(); reader.onload = () => { try { const text = String(reader.result || ""); let parsed; try { parsed = JSON.parse(text); } catch { parsed = parseSimpleYaml(text); } const rows = Array.isArray(parsed) ? parsed : Array.isArray(parsed.styles) ? parsed.styles : [parsed]; const themes = rows.filter(row => row && typeof row === "object").map(normalizeTheme); if (!themes.length) throw new Error("スタイルが見つかりません"); const used = new Set(allThemes().map(theme => theme.id)); themes.forEach((theme,index) => { while (used.has(theme.id)) theme.id = `${theme.id}-${index+1}`; used.add(theme.id); }); state.importedThemes.push(...themes); activeStyleCategory = "Imported"; selectedThemeId = themes[0].id; persistSoon(); renderStyleLibrary(); showToast(`${themes.length}件のStyle Packを読み込みました`); } catch (error) { showToast(`Style Packを読み込めません: ${error.message}`, true); } }; reader.readAsText(file);
  }
  async function handleFontFile(file) {
    if (!file) return; if (file.size > 8 * 1024 * 1024) return showToast("8MB以下のフォントを選んでください", true);
    const family = file.name.replace(/\.(ttf|otf|woff2?)$/i, "").replace(/[^\w\-\u3000-\u9fff ]/g, " ").trim() || `Custom Font ${state.customFonts.length+1}`; const ext = file.name.split(".").pop().toLowerCase(); const format = ext === "ttf" ? "truetype" : ext === "otf" ? "opentype" : ext;
    const data = await new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsDataURL(file); });
    try { const face = new FontFace(family, `url(${data})`); await face.load(); document.fonts.add(face); state.customFonts.push({ family,data,format }); if (!FONT_OPTIONS.some(font => font.family === family)) FONT_OPTIONS.unshift({ label:family, family, source:"追加フォント" }); populateFontControls(); els.headingFontSelect.value = family; updateFontPreview(); showToast(`${family} をこの制作セッションに追加しました`); } catch { showToast("フォントを読み込めませんでした", true); }
  }
  function applyFontSettings() {
    pushHistory(); state.fonts = { heading:els.headingFontSelect.value, body:els.bodyFontSelect.value, latin:els.latinFontSelect.value }; renderAll(); persistSoon(); showToast("フォント設定をデッキ全体に適用しました"); setStatus("フォント設定を更新");
  }
  function renderImageStyle() {
    const theme = state.theme; if (!theme) return; const values = [["Mood",theme.imageStyle.mood],["Composition",theme.imageStyle.composition],["Illustration",theme.imageStyle.illustration],["Avoid",theme.imageStyle.avoid]]; els.imageStyleStrip.innerHTML = ""; values.forEach(([label,value]) => { const chip = document.createElement("div"); chip.className = "image-style-chip"; chip.innerHTML = `<span>${escapeHtml(label)}</span><strong title="${escapeHtml(value)}">${escapeHtml(value)}</strong>`; els.imageStyleStrip.appendChild(chip); });
  }
  function buildImagePrompt() {
    const subject = els.imageSubject.value.trim(); if (!subject) return showToast("画像にしたい内容を入力してください", true); const theme = state.theme; const compositionMap = { "right-space":"Place the main visual on the right and keep generous clean space on the left for editable slide text.", "left-space":"Place the main visual on the left and keep generous clean space on the right for editable slide text.", center:"Use a balanced centered composition with clear visual hierarchy.", "wide-background":"Create a full-bleed presentation background with calm focal depth.", "transparent-object":"Create one isolated visual asset on a transparent background." };
    const people = els.allowPeople.checked ? "People may appear only when essential to the concept." : "Do not include people, faces, hands, or human silhouettes.";
    els.imagePromptOutput.value = `Create a high-quality presentation visual.\n\nSubject:\n${subject}\n\nCurrent slide design system:\n- Style: ${theme.name}\n- Mood: ${theme.imageStyle.mood}\n- Palette: ${theme.palette.bg}, ${theme.palette.primary}, ${theme.palette.accent}, ${theme.palette.text}\n- Visual language: ${theme.imageStyle.illustration}\n- Composition: ${theme.imageStyle.composition}\n- Output ratio: ${els.imageRatio.value}\n\nLayout direction:\n${compositionMap[els.imageComposition.value]}\n\nStrict requirements:\n- ${people}\n- No visible words, letters, numbers, logos, UI screens, watermarks, or signatures.\n- Keep the visual compatible with editable Japanese slide text placed separately.\n- Avoid: ${theme.imageStyle.avoid}.\n- Do not introduce a generic glossy AI 3D style unless explicitly requested.\n\nReturn only the finished image.`; showToast("現在のデザインに合わせて指示文を作成しました");
  }
  async function copyImagePrompt() { if (!els.imagePromptOutput.value.trim()) return showToast("先に指示文を作成してください", true); try { await navigator.clipboard.writeText(els.imagePromptOutput.value); showToast("画像生成の指示文をコピーしました"); } catch { els.imagePromptOutput.select(); document.execCommand("copy"); showToast("画像生成の指示文をコピーしました"); } }
  async function copySelectedStyleYaml() { const theme = themeById(selectedThemeId); if (!theme.sourceYaml) return; try { await navigator.clipboard.writeText(theme.sourceYaml); showToast(`${theme.name} のYAMLをコピーしました`); } catch { const area = document.createElement("textarea"); area.value = theme.sourceYaml; document.body.appendChild(area); area.select(); document.execCommand("copy"); area.remove(); showToast(`${theme.name} のYAMLをコピーしました`); } }
  function rectangleOverlap(a,b) { const x = Math.max(0, Math.min(a.right,b.right)-Math.max(a.left,b.left)); const y = Math.max(0, Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)); return x*y; }
  async function inspectSlideQuality(index) {
    const frame = document.createElement("iframe"); frame.setAttribute("sandbox","allow-same-origin"); frame.style.cssText = `position:fixed;left:-20000px;top:0;width:${WIDTH}px;height:${HEIGHT}px;border:0`; document.body.appendChild(frame); await new Promise(resolve => { frame.onload = resolve; frame.srcdoc = composeDocument(state.slides[index].html); }); await frame.contentDocument.fonts?.ready; await tick();
    const doc = frame.contentDocument, root = findSlideRoot(doc), rootRect = root.getBoundingClientRect(), issues = []; const win = frame.contentWindow; const textRects = [];
    root.querySelectorAll("*").forEach(el => { const style = win.getComputedStyle(el), rect = el.getBoundingClientRect(); if (style.display === "none" || style.visibility === "hidden" || rect.width < 2 || rect.height < 2) return; const directText = Array.from(el.childNodes).some(node => node.nodeType === 3 && node.textContent.trim()); if (directText) { const size = parseFloat(style.fontSize)||16; if (size < 13) issues.push({ type:"極小文字", message:`${Math.round(size)}px の文字があります` }); if (el.scrollWidth > el.clientWidth + 3 || el.scrollHeight > el.clientHeight + 3) issues.push({ type:"はみ出し", message:"テキストボックス内で文字が収まっていません" }); textRects.push({ el,rect }); } if (rect.left < rootRect.left-2 || rect.top < rootRect.top-2 || rect.right > rootRect.right+2 || rect.bottom > rootRect.bottom+2) issues.push({ type:"範囲外", message:"要素がセーフエリア外にはみ出しています" }); if (el.tagName === "IMG" && el.getAttribute("src") && !/^(data:|blob:)/i.test(el.getAttribute("src"))) issues.push({ type:"外部画像", message:"外部画像はPPTX変換で欠ける可能性があります" }); });
    for (let a=0;a<textRects.length;a++) for (let b=a+1;b<textRects.length;b++) { const area = rectangleOverlap(textRects[a].rect,textRects[b].rect); const smaller = Math.min(textRects[a].rect.width*textRects[a].rect.height,textRects[b].rect.width*textRects[b].rect.height); if (smaller > 0 && area/smaller > .35 && !textRects[a].el.contains(textRects[b].el) && !textRects[b].el.contains(textRects[a].el)) { issues.push({ type:"重なり", message:"文字要素どうしが重なっています" }); break; } }
    frame.remove(); const unique = []; const seen = new Set(); issues.forEach(issue => { const key = `${issue.type}:${issue.message}`; if (!seen.has(key)) { seen.add(key); unique.push(issue); } }); return unique;
  }
  async function runQualityCheck() {
    els.runQualityBtn.disabled = true; els.runQualityBtn.textContent = "検査中…"; els.qualityResults.innerHTML = ""; const results = [];
    for (let i=0;i<state.slides.length;i++) { const issues = await inspectSlideQuality(i); results.push({ index:i, issues }); els.runQualityBtn.textContent = `${i+1} / ${state.slides.length}`; }
    analyzeCompatibility().forEach(message => results[0].issues.push({ type:"変換注意", message })); const total = results.reduce((sum,result) => sum + result.issues.length,0); const score = Math.max(0,100-total*7); const stateText = total === 0 ? "書き出し準備が整っています" : `${total}件の確認項目があります`;
    els.qualitySummary.innerHTML = `<div class="quality-score"><strong>${score}</strong><span>/ 100</span></div><div><h4>${stateText}</h4><p>${total === 0 ? "文字・画像・変換互換性に大きな問題は見つかりませんでした。" : "ページ別の項目を確認し、必要な箇所だけ修正してください。"}</p></div>`;
    results.forEach(result => { if (!result.issues.length) { const item = document.createElement("div"); item.className = "quality-item is-good"; item.innerHTML = `<b>PAGE ${result.index+1}</b><span>問題なし</span><small>検査済み</small>`; els.qualityResults.appendChild(item); } else result.issues.forEach(issue => { const item = document.createElement("div"); item.className = "quality-item"; item.innerHTML = `<b>PAGE ${result.index+1}</b><span>${escapeHtml(issue.message)}</span><small>${escapeHtml(issue.type)}</small>`; els.qualityResults.appendChild(item); }); });
    els.runQualityBtn.disabled = false; els.runQualityBtn.textContent = "全ページを検査"; setStatus("品質検査が完了");
  }
  async function exportCurrentPng() {
    els.outputModal.close(); setStatus("PNGを作成中"); const slide = state.slides[state.current]; const css = `${state.styles}\n${currentThemeCss()}`.replace(/<\/style/gi,"<\\/style"); const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml" style="width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden"><style>${css}</style>${slide.html}</div></foreignObject></svg>`;
    try { const blob = new Blob([svg],{type:"image/svg+xml;charset=utf-8"}), url = URL.createObjectURL(blob), image = new Image(); await new Promise((resolve,reject) => { image.onload=resolve; image.onerror=reject; image.src=url; }); const canvas = document.createElement("canvas"); canvas.width=WIDTH*2; canvas.height=HEIGHT*2; const ctx=canvas.getContext("2d"); ctx.scale(2,2); ctx.drawImage(image,0,0,WIDTH,HEIGHT); URL.revokeObjectURL(url); const png = await new Promise(resolve => canvas.toBlob(resolve,"image/png")); downloadBlob(png,`${sanitizeFilename(state.projectName)}-${String(state.current+1).padStart(2,"0")}.png`); showToast("現在のスライドをPNGで保存しました"); setStatus("PNGを書き出しました"); } catch { showToast("外部画像やフォントの影響でPNG化できませんでした",true); setStatus("PNG書き出しに失敗"); }
  }
  function exportPrintPdf() {
    els.outputModal.close(); const win = window.open("","_blank"); if (!win) return showToast("印刷画面を開けませんでした。ポップアップを許可してください",true); const slides = state.slides.map(slide => `<div class="print-slide">${slide.html}</div>`).join("");
    win.document.write(`<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>${escapeHtml(state.projectName)}</title><link href="${GOOGLE_FONT_LINK}" rel="stylesheet"><style>${state.styles}\n${currentThemeCss()}\n@page{size:13.333in 7.5in;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#bbb}.print-slide{width:1280px;height:720px;overflow:hidden;page-break-after:always;break-after:page}.print-slide>.slide{position:relative;width:1280px;height:720px}@media print{html,body{background:#fff}.print-slide{transform:none}}</style></head><body>${slides}<script>setTimeout(()=>window.print(),900)<\/script></body></html>`); win.document.close(); setStatus("PDF印刷画面を開きました");
  }

  function bindInspector() {
    els.textValue.addEventListener("input", () => { const el = resolvePath(state.selectedPath); if (el) { el.textContent = els.textValue.value; scheduleCommit(); } });
    els.elementFontFamily.addEventListener("change", () => applyStyle("fontFamily", fontStack(els.elementFontFamily.value)));
    els.fontSize.addEventListener("input", () => applyStyle("fontSize", `${els.fontSize.value}px`)); els.fontWeight.addEventListener("change", () => applyStyle("fontWeight", els.fontWeight.value)); els.lineHeight.addEventListener("input", () => applyStyle("lineHeight", els.lineHeight.value));
    els.textColor.addEventListener("input", () => { els.textColorHex.value = els.textColor.value; applyStyle("color", els.textColor.value); }); els.textColorHex.addEventListener("change", () => { const value = normalizeHex(els.textColorHex.value); setColorFields(els.textColor, els.textColorHex, value); applyStyle("color", value); });
    document.querySelectorAll("[data-align]").forEach(btn => btn.addEventListener("click", () => { updateAlignButtons(btn.dataset.align); applyStyle("textAlign", btn.dataset.align); }));
    [[els.posX,"left"],[els.posY,"top"],[els.sizeW,"width"],[els.sizeH,"height"]].forEach(([input, prop]) => input.addEventListener("input", () => applyStyle(prop, `${input.value}px`, { position:true })));
    els.fillColor.addEventListener("input", () => { els.fillColorHex.value = els.fillColor.value; els.fillColorHex.dataset.empty="0"; applyStyle("backgroundColor", els.fillColor.value); }); els.fillColorHex.addEventListener("change", () => { const value=normalizeHex(els.fillColorHex.value,"#ffffff"); setColorFields(els.fillColor,els.fillColorHex,value); els.fillColorHex.dataset.empty="0"; applyStyle("backgroundColor",value); });
    els.clearFillBtn.addEventListener("click", () => { els.fillColorHex.value="transparent"; els.fillColorHex.dataset.empty="1"; applyStyle("backgroundColor","transparent"); });
    els.borderRadius.addEventListener("input", () => applyStyle("borderRadius", `${els.borderRadius.value}px`)); els.padding.addEventListener("input", () => applyStyle("padding", `${els.padding.value}px`)); els.opacity.addEventListener("input", () => applyStyle("opacity", String(+els.opacity.value/100)));
    els.objectFit.addEventListener("change", () => applyStyle("objectFit", els.objectFit.value)); els.altText.addEventListener("input", () => { const el=resolvePath(state.selectedPath); if(el?.tagName==="IMG"){el.alt=els.altText.value;scheduleCommit();} });
    document.querySelectorAll(".section-title").forEach(button => button.addEventListener("click", () => button.setAttribute("aria-expanded", button.getAttribute("aria-expanded") === "true" ? "false" : "true")));
  }

  function openMobilePanel(panel) { closeMobilePanels(); panel.classList.add("is-open"); els.scrim.hidden=false; }
  function openInspector() { openMobilePanel(els.inspector); }
  function closeMobilePanels() { els.slidePanel.classList.remove("is-open"); els.inspector.classList.remove("is-open"); els.scrim.hidden=true; }
  function bindEvents() {
    els.projectName.addEventListener("focus", () => els.projectName.dataset.before = state.projectName); els.projectName.addEventListener("change", () => { if (els.projectName.value !== state.projectName) { pushHistory(); state.projectName=els.projectName.value.trim()||"名称未設定"; persistSoon(); } });
    els.undoBtn.onclick=undo; els.redoBtn.onclick=redo; els.addSlideBtn.onclick=addSlide; els.editModeBtn.onclick=()=>toggleMode("edit"); els.previewModeBtn.onclick=()=>toggleMode("preview");
    els.zoomOutBtn.onclick=()=>{state.zoomOffset=Math.max(-5,state.zoomOffset-1);fitCanvas();}; els.zoomInBtn.onclick=()=>{state.zoomOffset=Math.min(5,state.zoomOffset+1);fitCanvas();};
    els.studioToolsBtn.onclick=()=>openStudio("styles"); els.openFontStudioBtn.onclick=()=>openStudio("fonts"); els.closeStudioModalBtn.onclick=()=>els.studioModal.close(); document.querySelectorAll("[data-studio-tab]").forEach(button=>button.onclick=()=>switchStudioTab(button.dataset.studioTab));
    els.styleSearch.addEventListener("input",renderStyleLibrary); els.applyStyleBtn.onclick=applySelectedTheme; els.saveMyStyleBtn.onclick=saveMyStyle; els.copyStyleYamlBtn.onclick=copySelectedStyleYaml; els.removeStylePackBtn.onclick=deleteNotebookPack; els.importStylePackBtn.onclick=()=>{els.stylePackFileInput.value="";els.stylePackFileInput.click();}; els.stylePackFileInput.onchange=()=>handleStylePackFile(els.stylePackFileInput.files[0]);
    [els.headingFontSelect,els.bodyFontSelect,els.latinFontSelect].forEach(select=>select.addEventListener("change",updateFontPreview)); els.uploadFontBtn.onclick=()=>{els.fontFileInput.value="";els.fontFileInput.click();}; els.fontFileInput.onchange=()=>handleFontFile(els.fontFileInput.files[0]); els.applyFontsBtn.onclick=applyFontSettings;
    els.buildImagePromptBtn.onclick=buildImagePrompt; els.copyImagePromptBtn.onclick=copyImagePrompt; els.addGeneratedImageBtn.onclick=()=>{els.studioModal.close();openImagePicker("add");}; els.runQualityBtn.onclick=runQualityCheck;
    els.overviewBtn.onclick=openOverview; els.closeOverviewBtn.onclick=closeOverview; els.importBtn.onclick=()=>els.importModal.showModal(); els.chooseHtmlBtn.onclick=()=>els.htmlFileInput.click(); els.dropZone.onclick=event=>{if(event.target===els.dropZone||!event.target.closest("button"))els.htmlFileInput.click();}; els.dropZone.onkeydown=event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();els.htmlFileInput.click();}};
    ["dragenter","dragover"].forEach(type=>els.dropZone.addEventListener(type,event=>{event.preventDefault();els.dropZone.classList.add("is-dragging");})); ["dragleave","drop"].forEach(type=>els.dropZone.addEventListener(type,event=>{event.preventDefault();els.dropZone.classList.remove("is-dragging");})); els.dropZone.addEventListener("drop",event=>handleHtmlFile(event.dataTransfer.files[0]));
    els.htmlFileInput.onchange=()=>handleHtmlFile(els.htmlFileInput.files[0]); els.applyHtmlBtn.onclick=()=>{try{if(!els.htmlInput.value.trim())throw new Error("HTMLを入力してください");renderImportedHtml(els.htmlInput.value);els.importModal.close();showToast(`${state.slides.length}枚のスライドを読み込みました`);}catch(error){showToast(error.message,true);}};
    els.assetBtn.onclick=()=>openImagePicker("add"); els.replaceImageBtn.onclick=()=>openImagePicker("replace"); els.imageFileInput.onchange=()=>handleImageFile(els.imageFileInput.files[0]); els.duplicateElementBtn.onclick=duplicateSelectedElement; els.deleteElementBtn.onclick=deleteSelectedElement;
    els.downloadHtmlBtn.onclick=()=>els.outputModal.showModal(); els.closeOutputModalBtn.onclick=()=>els.outputModal.close(); els.exportHtmlChoice.onclick=()=>{els.outputModal.close();exportHtml();}; els.exportPngChoice.onclick=exportCurrentPng; els.exportPdfChoice.onclick=exportPrintPdf; els.exportPptxChoice.onclick=()=>{els.outputModal.close();exportPowerPoint();}; els.exportBtn.onclick=exportPowerPoint; els.closeExportBtn.onclick=()=>els.exportModal.close(); els.downloadGeneratedBtn.onclick=()=>setStatus("PowerPointをダウンロードしました");
    els.slidesTab.onclick=()=>{els.slidesTab.classList.add("is-active");els.layersTab.classList.remove("is-active");els.slideList.hidden=false;els.layerList.hidden=true;}; els.layersTab.onclick=()=>{els.layersTab.classList.add("is-active");els.slidesTab.classList.remove("is-active");els.slideList.hidden=true;els.layerList.hidden=false;renderLayers();};
    els.mobileNavBtn.onclick=()=>openMobilePanel(els.slidePanel); els.mobileInspectorBtn.onclick=openInspector; els.closeInspectorBtn.onclick=closeMobilePanels; els.scrim.onclick=closeMobilePanels;
    els.brandHome.onclick=event=>{event.preventDefault();selectSlide(0);};
    document.addEventListener("keydown",event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="z"){event.preventDefault();if(event.shiftKey)redo();else undo();}if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="s"){event.preventDefault();exportHtml();}if(event.key==="Escape")closeMobilePanels();});
    window.addEventListener("resize",()=>{clearTimeout(thumbnailTimer);thumbnailTimer=setTimeout(()=>{fitCanvas();updateThumbnailScales();},80);});
    resizeObserver=new ResizeObserver(()=>{fitCanvas();updateThumbnailScales();}); resizeObserver.observe(els.stage); resizeObserver.observe(els.slideList);
  }

  function init() {
    restore(); populateFontControls(); bindInspector(); bindEvents(); setPackStatus("empty"); renderStyleLibrary(); renderImageStyle(); renderAll(); updateUndoRedo(); setStatus("準備完了"); restoreNotebookPack();
    if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        location.reload();
      });
      navigator.serviceWorker.register("sw.js?v=6").then(registration => registration.update()).catch(()=>{});
    }
  }
  init();
})();
