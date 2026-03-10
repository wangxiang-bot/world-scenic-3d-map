import './style.css';

const BASE_URL = import.meta.env.BASE_URL || '/';

function withBase(path = '') {
  return `${BASE_URL}${String(path).replace(/^\/+/, '')}`;
}

const CATEGORY_META = {
  Cultural: { label: '文化遗产', color: '#ff9a62', accent: '#ffc49b' },
  Natural: { label: '自然遗产', color: '#58d7ff', accent: '#92e9ff' },
  Mixed: { label: '混合遗产', color: '#d4f26b', accent: '#ecffab' },
};

const CATEGORY_OPTIONS = [
  { value: 'All', label: '全部景点' },
  { value: 'Natural', label: '自然遗产' },
  { value: 'Cultural', label: '文化遗产' },
  { value: 'Mixed', label: '混合遗产' },
];

const REGION_LABELS = {
  Africa: '非洲',
  'Arab States': '阿拉伯国家',
  'Asia and the Pacific': '亚洲及太平洋',
  'Europe and North America': '欧洲与北美',
  'Latin America and the Caribbean': '拉丁美洲与加勒比',
};

const FEATURED_MARKERS = {
  '1': { src: withBase('markers/galapagos.svg'), scale: 10.7, altitude: 0.015 },
  '252': { src: withBase('markers/taj-mahal.svg'), scale: 10.4, altitude: 0.014 },
  '274': { src: withBase('markers/machu-picchu.svg'), scale: 10.5, altitude: 0.015 },
  '307': { src: withBase('markers/statue-of-liberty.svg'), scale: 10.2, altitude: 0.015 },
  '326': { src: withBase('markers/petra.svg'), scale: 10.3, altitude: 0.015 },
  '437': { src: withBase('markers/mount-taishan.svg'), scale: 10.7, altitude: 0.016 },
  '438': { src: withBase('markers/great-wall.svg'), scale: 11.2, altitude: 0.016 },
  '547': { src: withBase('markers/mount-huangshan.svg'), scale: 10.8, altitude: 0.016 },
  '637': { src: withBase('markers/jiuzhaigou.svg'), scale: 10.7, altitude: 0.015 },
  '668': { src: withBase('markers/angkor.svg'), scale: 10.4, altitude: 0.015 },
};

const SEARCH_FIELD_ALIASES = {
  country: ['country', '国家', '国家地区', 'nation'],
  region: ['region', '地区', '大洲', '洲'],
  year: ['year', '年份', '入选时间', '入选年', '时间'],
  category: ['category', '分类', '类型', '遗产类型'],
};

function svgDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg.replace(/\s{2,}/g, ' ').trim())}`;
}

const GENERIC_MARKER_ASSETS = {
  peak: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#ffd571" d="M88 24c7 0 13 6 13 13s-6 13-13 13-13-6-13-13 6-13 13-13Z"/>
        <path fill="#356677" d="M10 110 44 60 56 75 74 36 118 110Z"/>
        <path fill="#5a93a1" d="M16 110 43 70 58 84 72 52 101 110Z"/>
        <path fill="#eef6ff" d="M67 50 74 36 81 49 76 54Z"/>
        <path fill="#7fbe95" d="M26 110h74v8H26z"/>
      </svg>
    `),
    scale: 7.9,
    altitude: 0.011,
  },
  forest: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#2d6f57" d="M32 111V87l-13 12 8-22-10-2 15-17-8-2 15-18 15 20-8 2 14 17-10 2 8 22-12-12v24z"/>
        <path fill="#428666" d="M64 111V78l-17 16 10-27-12-2 19-23-11-3 19-24 19 27-11 3 18 23-12 2 10 27-16-16v33z"/>
        <path fill="#59a27a" d="M95 111V90l-11 10 7-18-9-2 13-15-7-2 14-17 14 19-7 2 12 15-9 2 7 18-10-10v21z"/>
        <path fill="#7ecf97" d="M18 111h92v8H18z"/>
      </svg>
    `),
    scale: 7.2,
    altitude: 0.01,
  },
  water: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#5fd4ff" d="M30 91c7-8 13-10 19-10 7 0 11 3 16 6 4 3 7 5 12 5 4 0 9-1 18-10v15c-7 8-13 10-18 10-6 0-10-2-14-5-5-4-9-6-14-6-5 0-10 2-19 10z"/>
        <path fill="#3298d0" d="M20 103c8-7 14-9 20-9 8 0 12 3 17 6 4 3 7 5 12 5 5 0 11-2 21-10v15c-8 7-15 9-21 9-7 0-11-2-16-5-5-4-9-6-14-6-6 0-11 2-19 10z"/>
        <path fill="#87db84" d="M66 80c8-17 17-24 28-30-2 13-2 21 4 30Z"/>
        <path fill="#ffd571" d="M99 30c7 0 13 6 13 13s-6 13-13 13-13-6-13-13 6-13 13-13Z"/>
      </svg>
    `),
    scale: 7.3,
    altitude: 0.009,
  },
  cave: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#8b674f" d="M18 111c0-40 18-74 46-74 28 0 46 34 46 74z"/>
        <path fill="#654b3c" d="M33 111c0-28 12-49 31-49 19 0 31 21 31 49z"/>
        <path fill="#201711" d="M47 111c0-17 7-31 17-31s17 14 17 31z"/>
        <path fill="#c9975f" d="m32 71 8-23 7 17 14-26 13 27 10-18 11 23z"/>
        <path fill="#6bbd8a" d="M20 111h88v8H20z"/>
      </svg>
    `),
    scale: 7.2,
    altitude: 0.01,
  },
  temple: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#f4aa62" d="M18 94h92l-8 12H26z"/>
        <path fill="#f2c16e" d="M26 78h76l-8 12H34z"/>
        <path fill="#f9d993" d="M36 63h56l-7 10H43z"/>
        <path fill="#84523b" d="M46 73h8v28h-8zm14 0h8v28h-8zm14 0h8v28h-8z"/>
        <path fill="#fff1b6" d="M64 28 90 54H38z"/>
        <path fill="#f08b58" d="M57 18h14v16H57z"/>
      </svg>
    `),
    scale: 7.3,
    altitude: 0.011,
  },
  fortress: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#c8926d" d="M22 111V67h18v10h11V51h26v26h11V67h18v44z"/>
        <path fill="#e4b083" d="M18 67h26V44h8v23h24V44h8v23h26v9H18z"/>
        <path fill="#f6cb9a" d="M54 34h20v17H54z"/>
        <path fill="#7f5a45" d="M58 81h12v30H58zm-24 0h8v18h-8zm52 0h8v18h-8z"/>
      </svg>
    `),
    scale: 7.5,
    altitude: 0.011,
  },
  city: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#7ec8ff" d="M24 111V61l16 9V39l20 9V27l18 11v20l14-7v60z"/>
        <path fill="#4ba6e4" d="M39 111V53l13 7v51zm30 0V40l12 8v63zm22 0V58l11-5v58z"/>
        <path fill="#e7f8ff" d="M39 70h5v5h-5zm0 12h5v5h-5zm16-25h5v5h-5zm0 12h5v5h-5zm20-18h5v5h-5zm0 12h5v5h-5zm16 3h5v5h-5zm0 12h5v5h-5z"/>
        <path fill="#ffd571" d="M24 111h80v8H24z"/>
      </svg>
    `),
    scale: 7.2,
    altitude: 0.009,
  },
  ruins: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#d6a77f" d="M26 111V69h14v42zm22 0V61h14v50zm22 0V73h14v38zm20 0V78h12v33z"/>
        <path fill="#f5cc9f" d="M20 69h24l-4-10h10l8 10h26l-4-12h12l7 12h11v8H20zm17-18 11-14 12 14-6 6H43zm38-2 12-15 13 15-7 6H82z"/>
        <path fill="#8f6a51" d="M18 111h92v8H18z"/>
      </svg>
    `),
    scale: 7.1,
    altitude: 0.01,
  },
  bridge: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#4ca5e2" d="M18 111c10-7 18-9 25-9 8 0 13 2 18 5 4 2 7 4 13 4 8 0 14-3 25-11v14c-10 8-18 10-26 10-8 0-13-2-18-5-4-2-7-4-12-4-7 0-14 3-25 11z"/>
        <path fill="#e8b57f" d="M20 86h88v8H20z"/>
        <path fill="#c98e68" d="M29 86c0-19 16-34 35-34s35 15 35 34h-9c0-14-11-25-26-25S38 72 38 86zm-11 0h9c0-8 6-14 14-14v-9c-13 0-23 10-23 23zm83-23v9c8 0 14 6 14 14h9c0-13-10-23-23-23z"/>
        <path fill="#8c6349" d="M24 86h6v25h-6zm74 0h6v25h-6z"/>
      </svg>
    `),
    scale: 7.9,
    altitude: 0.01,
  },
  monument: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#ffd571" d="M64 16 72 32H56z"/>
        <path fill="#f8b56b" d="M50 34h28l-5 52H55z"/>
        <path fill="#e28756" d="M44 86h40v12H44zm-10 12h60v13H34z"/>
        <path fill="#fff5c3" d="M58 44h12v32H58z"/>
      </svg>
    `),
    scale: 7,
    altitude: 0.009,
  },
  mixed: {
    src: svgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
        <path fill="#d4f26b" d="M86 24c7 0 12 5 12 12s-5 12-12 12-12-5-12-12 5-12 12-12Z"/>
        <path fill="#407361" d="M14 111 45 68 59 83 77 42 114 111Z"/>
        <path fill="#6cad8f" d="M24 111 47 79 59 91 75 60 98 111Z"/>
        <path fill="#f8c46a" d="M45 84h30l-4 9H49z"/>
        <path fill="#ffe3a4" d="M51 72h18l-3 7H54z"/>
        <path fill="#a65d3d" d="M56 79h5v20h-5zm10 0h5v20h-5z"/>
      </svg>
    `),
    scale: 7.5,
    altitude: 0.011,
  },
};

const FALLBACK_MARKERS = {
  Cultural: 'monument',
  Natural: 'peak',
  Mixed: 'mixed',
};

const SCREEN_SPACE_SCALE = 0.0046;
const VISIBLE_SITE_LIMIT = 260;

const MARKER_RULES = [
  { key: 'bridge', patterns: [/bridge/i, /viaduct/i, /桥/, /大桥/] },
  { key: 'temple', patterns: [/temple/i, /church/i, /cathedral/i, /mosque/i, /monastery/i, /abbey/i, /sanctuary/i, /pagoda/i, /stupa/i, /寺/, /庙/, /教堂/, /清真寺/, /修道院/, /佛塔/, /神殿/] },
  { key: 'fortress', patterns: [/castle/i, /fort/i, /fortress/i, /palace/i, /citadel/i, /城堡/, /宫殿/, /要塞/, /皇宫/, /王宫/] },
  { key: 'city', patterns: [/historic centre/i, /historic center/i, /old town/i, /old city/i, /historic city/i, /city of/i, /古城/, /老城/, /历史中心/, /城区/, /历史城镇/, /城镇/] },
  { key: 'ruins', patterns: [/archaeolog/i, /ruin/i, /rock art/i, /carving/i, /tomb/i, /mound/i, /necropolis/i, /遗址/, /考古/, /遗迹/, /岩画/, /石刻/, /古墓/, /壁画/, /土丘/] },
  { key: 'cave', patterns: [/cave/i, /grotto/i, /karst/i, /cavern/i, /洞/, /窟/, /穴/, /喀斯特/, /岩洞/] },
  { key: 'water', patterns: [/reef/i, /coast/i, /delta/i, /bay/i, /lake/i, /river/i, /island/i, /wetland/i, /falls/i, /waterfall/i, /glacier/i, /archipelago/i, /海/, /湖/, /河/, /岛/, /湾/, /海岸/, /礁/, /瀑布/, /冰川/, /群岛/] },
  { key: 'forest', patterns: [/forest/i, /woods/i, /rainforest/i, /jungle/i, /beech/i, /woodland/i, /林/, /森林/, /雨林/] },
  { key: 'peak', patterns: [/mount/i, /mountain/i, /volcano/i, /alps/i, /peak/i, /range/i, /valley/i, /canyon/i, /山/, /峰/, /岭/, /谷/, /火山/, /高地/, /峡谷/, /山脉/] },
  { key: 'mixed', patterns: [/landscape/i, /景观/] },
];

const countryNames = new Intl.DisplayNames(['zh-CN'], { type: 'region' });
const initialView = { lat: 20, lng: 85, altitude: 2.15 };

document.querySelector('#app').innerHTML = `
  <div class="page-shell">
    <header class="topbar panel">
      <div class="title-stack">
        <h1>世界景点三维地图</h1>
        <p class="title-meta">made by wangxiang&shike</p>
        <div class="category-row" id="category-row"></div>
      </div>
      <div class="search-stack">
        <label class="search-box" for="search-input">
          <input id="search-input" type="search" placeholder="搜索遗产 / 国家 / 地区 / 年份，例如 国家:中国 年份:1987" />
        </label>
        <div class="search-suggestions is-hidden" id="search-suggestions"></div>
        <p class="search-hint">支持按国家、地区、年份、分类搜索，例如：地区:非洲 分类:自然遗产</p>
      </div>
    </header>

    <main class="app-shell">
      <section class="globe-panel panel">
        <div class="globe-stage" id="globe-stage"></div>
        <aside class="side-panel media-panel is-hidden" id="media-panel"></aside>
        <aside class="side-panel detail-panel is-hidden" id="detail-panel"></aside>
      </section>
    </main>
    <div class="image-lightbox is-hidden" id="image-lightbox">
      <img id="image-lightbox-image" alt="" />
    </div>
  </div>
`;

const globeStageEl = document.querySelector('#globe-stage');
const mediaPanelEl = document.querySelector('#media-panel');
const detailPanelEl = document.querySelector('#detail-panel');
const imageLightboxEl = document.querySelector('#image-lightbox');
const imageLightboxImageEl = document.querySelector('#image-lightbox-image');
const searchInputEl = document.querySelector('#search-input');
const searchSuggestionsEl = document.querySelector('#search-suggestions');
const categoryRowEl = document.querySelector('#category-row');

const state = {
  sites: [],
  searchQuery: '',
  searchFocused: false,
  activeCategory: 'All',
  selectedSiteId: null,
  selectedDetail: null,
  detailLoading: false,
};

let globe;
let THREE_NS;
let textureLoader;
let detailIndex = null;
let detailIndexPromise = null;
let lastMarkerClickAt = 0;
let refreshTimer = 0;
let lastAutoFocusKey = '';
const markerTextures = new Map();
const markerTexturePromises = new Map();

function safeLower(text) {
  return stripMarkup(text).toLocaleLowerCase();
}

function stripMarkup(text = '') {
  return String(text).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeSvg(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function shortenText(text, maxLength) {
  const chars = Array.from(stripMarkup(text));
  if (chars.length <= maxLength) return chars.join('');
  return `${chars.slice(0, maxLength - 1).join('')}…`;
}

function normalizeSearchFieldKey(rawKey) {
  const key = safeLower(rawKey).replace(/\s+/g, '');
  for (const [field, aliases] of Object.entries(SEARCH_FIELD_ALIASES)) {
    if (aliases.some((alias) => safeLower(alias) === key)) {
      return field;
    }
  }
  return null;
}

function parseSearchQuery(query) {
  const filters = {
    country: [],
    region: [],
    year: [],
    category: [],
    text: [],
  };

  const tokens = query
    .trim()
    .split(/\s+/)
    .map((token) => token.replace(/：/g, ':'))
    .filter(Boolean);

  for (const token of tokens) {
    const separatorIndex = token.indexOf(':');
    if (separatorIndex > 0) {
      const field = normalizeSearchFieldKey(token.slice(0, separatorIndex));
      const value = token.slice(separatorIndex + 1);
      if (field && value) {
        filters[field].push(safeLower(value));
        continue;
      }
    }

    filters.text.push(safeLower(token));
  }

  if (filters.text.length === 1 && /^\d{4}$/.test(filters.text[0])) {
    filters.year.push(filters.text.pop());
  }

  return filters;
}

function getCountryLabel(rawCountries = [], isoCodes = []) {
  if (isoCodes.length) {
    return isoCodes
      .map((code, index) => {
        try {
          return countryNames.of(code) || rawCountries[index] || code;
        } catch {
          return rawCountries[index] || code;
        }
      })
      .join(' / ');
  }

  return rawCountries.join(' / ') || '未注明国家';
}

function inferMarkerKey(rawSite, category) {
  const text = `${rawSite.name || ''} ${rawSite.nameEn || ''}`;

  for (const rule of MARKER_RULES) {
    if (rule.patterns.some((pattern) => pattern.test(text))) {
      return rule.key;
    }
  }

  return FALLBACK_MARKERS[category] || 'monument';
}

function resolveMarkerAsset(rawSite, category) {
  const id = String(rawSite.id);
  if (FEATURED_MARKERS[id]) {
    return {
      key: `featured-${id}`,
      featured: true,
      ...FEATURED_MARKERS[id],
    };
  }

  const key = inferMarkerKey(rawSite, category);
  return {
    key,
    featured: false,
    ...GENERIC_MARKER_ASSETS[key],
  };
}

function normalizeSite(rawSite) {
  const category = CATEGORY_META[rawSite.category] ? rawSite.category : 'Mixed';
  const countryLabel = getCountryLabel(rawSite.countries, rawSite.isoCodes);
  const markerAsset = resolveMarkerAsset(rawSite, category);
  const cleanName = stripMarkup(rawSite.name || rawSite.nameEn || '未命名遗产');
  const cleanNameEn = stripMarkup(rawSite.nameEn || rawSite.name || '');
  const regionLabel = REGION_LABELS[rawSite.region] || rawSite.region || '全球';

  return {
    ...rawSite,
    id: String(rawSite.id),
    category,
    cleanName,
    cleanNameEn,
    countryLabel,
    regionLabel,
    markerAsset,
    link: `https://whc.unesco.org/en/list/${rawSite.id}`,
    searchText: safeLower(
      [
        cleanName,
        cleanNameEn,
        countryLabel,
        regionLabel,
        rawSite.region,
        rawSite.year,
        rawSite.criteria,
        CATEGORY_META[category].label,
        category,
        ...(rawSite.countries || []),
      ].join(' '),
    ),
  };
}

function getFilteredSites() {
  const filters = parseSearchQuery(state.searchQuery);

  return state.sites.filter((site) => {
    if (state.activeCategory !== 'All' && site.category !== state.activeCategory) {
      return false;
    }

    const categoryText = safeLower(`${site.category} ${CATEGORY_META[site.category].label}`);
    const yearText = safeLower(site.year);
    const countryText = safeLower(site.countryLabel);
    const regionText = safeLower(`${site.regionLabel} ${site.region || ''}`);

    return (
      filters.country.every((token) => countryText.includes(token)) &&
      filters.region.every((token) => regionText.includes(token)) &&
      filters.year.every((token) => yearText.includes(token)) &&
      filters.category.every((token) => categoryText.includes(token)) &&
      filters.text.every((token) => site.searchText.includes(token))
    );
  });
}

function getSelectedSite(filteredSites = getFilteredSites()) {
  return filteredSites.find((site) => site.id === state.selectedSiteId) ?? null;
}

function formatArea(areaHectares) {
  if (!areaHectares || Number.isNaN(areaHectares)) return '未提供面积';
  return `${Math.round(areaHectares).toLocaleString('zh-CN')} 公顷`;
}

function getFilterSummary(filteredSites) {
  const fragments = [];

  if (state.activeCategory !== 'All') {
    fragments.push(CATEGORY_META[state.activeCategory].label);
  }

  if (state.searchQuery.trim()) {
    fragments.push(`搜索：${state.searchQuery.trim()}`);
  }

  if (!fragments.length) {
    fragments.push('显示全部遗产');
  }

  fragments.push(`当前 ${filteredSites.length.toLocaleString('zh-CN')} / ${state.sites.length.toLocaleString('zh-CN')} 项`);
  return fragments;
}

function syncCategoryButtons() {
  categoryRowEl.querySelectorAll('[data-category]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.category === state.activeCategory);
  });
}

function renderCategoryButtons() {
  categoryRowEl.innerHTML = CATEGORY_OPTIONS.map((option) => {
    const count =
      option.value === 'All'
        ? state.sites.length
        : state.sites.filter((site) => site.category === option.value).length;

    return `
      <button class="category-chip${option.value === state.activeCategory ? ' is-active' : ''}" type="button" data-category="${option.value}">
        <span>${option.label}</span>
        <small>${count.toLocaleString('zh-CN')}</small>
      </button>
    `;
  }).join('');

  categoryRowEl.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeCategory = button.dataset.category;
      clearSelection();
      syncCategoryButtons();
    });
  });
}

function createPanelPlaceholder(title, body, footer = '') {
  return `
    <div class="panel-shell panel-placeholder">
      <div class="panel-kicker">${escapeHtml(title)}</div>
      <h2>${escapeHtml(body.title)}</h2>
      <p>${escapeHtml(body.description)}</p>
      ${footer ? `<div class="panel-footnote">${escapeHtml(footer)}</div>` : ''}
    </div>
  `;
}

function getSuggestionSites(filteredSites) {
  const query = state.searchQuery.trim();
  if (!query) return [];

  const filters = parseSearchQuery(query);
  const plainText = filters.text.join(' ').trim();

  return [...filteredSites]
    .map((site) => {
      let score = 0;
      const name = safeLower(site.cleanName);
      const country = safeLower(site.countryLabel);
      const region = safeLower(site.regionLabel);

      if (plainText) {
        if (name === plainText) score += 40;
        else if (name.startsWith(plainText)) score += 28;
        else if (name.includes(plainText)) score += 18;
        if (country.includes(plainText)) score += 8;
        if (region.includes(plainText)) score += 6;
        if (safeLower(site.year).includes(plainText)) score += 4;
      } else {
        score += 1;
      }

      if (state.activeCategory !== 'All') score += 1;
      return { site, score };
    })
    .sort((first, second) => second.score - first.score || first.site.cleanName.localeCompare(second.site.cleanName, 'zh-CN'))
    .slice(0, 50)
    .map((item) => item.site);
}

function renderSearchSuggestions(filteredSites) {
  const shouldShow = Boolean(state.searchQuery.trim()) && (state.searchFocused || document.activeElement === searchInputEl);
  const suggestions = shouldShow ? getSuggestionSites(filteredSites) : [];

  searchSuggestionsEl.classList.toggle('is-hidden', suggestions.length === 0);
  if (!suggestions.length) {
    searchSuggestionsEl.innerHTML = '';
    return;
  }

  searchSuggestionsEl.innerHTML = suggestions.map((site) => `
    <button class="search-suggestion" type="button" data-site-id="${site.id}">
      <span class="suggestion-title">${escapeHtml(site.cleanName)}</span>
      <span class="suggestion-meta">${escapeHtml(site.countryLabel)} · ${escapeHtml(site.year || '未注明')} · ${escapeHtml(CATEGORY_META[site.category].label)}</span>
    </button>
  `).join('');

  searchSuggestionsEl.querySelectorAll('[data-site-id]').forEach((button) => {
    button.addEventListener('mousedown', (event) => {
      event.preventDefault();
    });

    button.addEventListener('click', () => {
      hideSearchSuggestions(true);
      selectSite(button.dataset.siteId);
    });
  });
}

function clearSelection() {
  state.selectedSiteId = null;
  state.selectedDetail = null;
  state.detailLoading = false;
  render();
}

function hideSearchSuggestions(blurInput = false) {
  state.searchFocused = false;
  searchSuggestionsEl.classList.add('is-hidden');
  searchSuggestionsEl.innerHTML = '';

  if (blurInput && document.activeElement === searchInputEl) {
    searchInputEl.blur();
  }
}

function openImageLightbox(src, alt = '') {
  if (!src) return;
  imageLightboxImageEl.src = src;
  imageLightboxImageEl.alt = alt;
  imageLightboxEl.classList.remove('is-hidden');
  document.body.classList.add('is-lightbox-open');
}

function closeImageLightbox() {
  imageLightboxEl.classList.add('is-hidden');
  imageLightboxImageEl.removeAttribute('src');
  imageLightboxImageEl.alt = '';
  document.body.classList.remove('is-lightbox-open');
}

function getOfficialImageUrl(detail) {
  return /^https?:\/\//i.test(detail?.imageUrl || '') ? detail.imageUrl : '';
}

function renderMediaPanel(filteredSites) {
  const selectedSite = getSelectedSite(filteredSites);
  mediaPanelEl.classList.toggle('is-hidden', !selectedSite);

  if (!selectedSite) {
    mediaPanelEl.innerHTML = '';
    return;
  }

  const detail = state.selectedDetail;
  const officialImageUrl = getOfficialImageUrl(detail);
  const primaryCaption = stripMarkup(detail?.imageCaption || `${selectedSite.cleanName} 官方图片`);

  mediaPanelEl.innerHTML = `
    <div class="panel-shell">
      <div class="panel-head">
        <div>
          <div class="panel-kicker">景点图片</div>
          <h2>${escapeHtml(selectedSite.cleanName)}</h2>
        </div>
        <div class="panel-head-actions">
          ${officialImageUrl ? `<a class="panel-link" href="${officialImageUrl}" target="_blank" rel="noreferrer">官方图片</a>` : ''}
          <a class="panel-link" href="${selectedSite.link}" target="_blank" rel="noreferrer">官方详情</a>
        </div>
      </div>
      <div class="media-grid">
        ${
          officialImageUrl
            ? `
              <figure class="media-card">
                <img id="media-primary-image" src="${officialImageUrl}" alt="${escapeHtml(selectedSite.cleanName)} 图片" loading="lazy" referrerpolicy="no-referrer" />
                <figcaption data-role="primary-caption">${escapeHtml(primaryCaption)}</figcaption>
              </figure>
            `
            : `
              <div class="media-empty">
                <div class="panel-kicker">暂无官方图片</div>
                <p>当前遗产点没有可直接展示的 UNESCO 官方图片，可以通过右上角按钮进入官网查看。</p>
              </div>
            `
        }
      </div>
    </div>
  `;

  const primaryImageEl = mediaPanelEl.querySelector('#media-primary-image');
  primaryImageEl?.addEventListener('click', () => {
    openImageLightbox(officialImageUrl, `${selectedSite.cleanName} 图片`);
  });
  primaryImageEl?.addEventListener('error', () => {
    const mediaGridEl = mediaPanelEl.querySelector('.media-grid');
    if (!mediaGridEl) return;
    mediaGridEl.innerHTML = `
      <div class="media-empty">
        <div class="panel-kicker">官方图片加载失败</div>
        <p>这个景点的官方图片当前无法直接显示，可以通过右上角按钮打开 UNESCO 官网图片或详情页。</p>
      </div>
    `;
  });
}

function renderDetailPanel(filteredSites) {
  const selectedSite = getSelectedSite(filteredSites);
  detailPanelEl.classList.toggle('is-hidden', !selectedSite);

  if (!selectedSite) {
    detailPanelEl.innerHTML = '';
    return;
  }

  const detail = state.selectedDetail;
  const meta = CATEGORY_META[selectedSite.category];
  const officialImageUrl = getOfficialImageUrl(detail);
  const mobileMediaMarkup = officialImageUrl
    ? `
      <figure class="detail-mobile-media">
        <img id="detail-mobile-image" src="${officialImageUrl}" alt="${escapeHtml(selectedSite.cleanName)} 图片" loading="lazy" referrerpolicy="no-referrer" />
      </figure>
    `
    : `
      <div class="detail-mobile-media is-empty">
        <span>暂无图片</span>
      </div>
    `;

  detailPanelEl.innerHTML = `
    <div class="panel-shell">
      <div class="panel-head">
        <div class="detail-head-content">
          <span class="detail-category" style="--detail-color: ${meta.color};">${meta.label}</span>
          <div class="detail-title-copy">
            <h2>${escapeHtml(selectedSite.cleanName)}</h2>
            <p class="detail-region">${escapeHtml(selectedSite.regionLabel)}</p>
          </div>
        </div>
        ${mobileMediaMarkup}
        <button class="panel-action" type="button" id="clear-selection">返回总览</button>
      </div>
      <p class="detail-summary">
        ${state.detailLoading && !detail ? '正在加载详细介绍...' : escapeHtml(detail?.summary || '暂无详细摘要。')}
      </p>
      <div class="detail-facts">
        <article>
          <span>所在国家</span>
          <strong>${escapeHtml(selectedSite.countryLabel)}</strong>
        </article>
        <article>
          <span>列入年份</span>
          <strong>${escapeHtml(selectedSite.year || '未注明')}</strong>
        </article>
        <article>
          <span>评定标准</span>
          <strong>${escapeHtml(selectedSite.criteria || '未注明')}</strong>
        </article>
        <article>
          <span>面积信息</span>
          <strong>${escapeHtml(formatArea(detail?.areaHectares))}</strong>
        </article>
      </div>
      <div class="tag-row">
        <span>${escapeHtml(selectedSite.countryLabel)}</span>
        <span>${escapeHtml(selectedSite.regionLabel)}</span>
        ${selectedSite.danger ? '<span>濒危遗产</span>' : ''}
        ${selectedSite.transboundary ? '<span>跨境遗产</span>' : ''}
        ${selectedSite.componentsCount > 1 ? `<span>${selectedSite.componentsCount} 个组成部分</span>` : ''}
      </div>
      <div class="detail-actions">
        ${officialImageUrl ? `<a class="detail-link" href="${officialImageUrl}" target="_blank" rel="noreferrer">打开官方图片</a>` : ''}
        <a class="detail-link" href="${selectedSite.link}" target="_blank" rel="noreferrer">查看 UNESCO 官方详情</a>
      </div>
    </div>
  `;

  detailPanelEl.querySelector('#clear-selection')?.addEventListener('click', clearSelection);
  detailPanelEl.querySelector('#detail-mobile-image')?.addEventListener('click', () => {
    openImageLightbox(officialImageUrl, `${selectedSite.cleanName} 图片`);
  });
  detailPanelEl.querySelector('#detail-mobile-image')?.addEventListener('error', () => {
    const mobileMediaEl = detailPanelEl.querySelector('.detail-mobile-media');
    if (!mobileMediaEl) return;
    mobileMediaEl.classList.add('is-empty');
    mobileMediaEl.innerHTML = '<span>图片暂不可用</span>';
  });
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function getAngularDistance(latA, lngA, latB, lngB) {
  const latARad = toRadians(latA);
  const latBRad = toRadians(latB);
  const deltaLng = toRadians(lngA - lngB);
  const cosine =
    Math.sin(latARad) * Math.sin(latBRad) +
    Math.cos(latARad) * Math.cos(latBRad) * Math.cos(deltaLng);

  return Math.acos(Math.min(1, Math.max(-1, cosine))) * (180 / Math.PI);
}

function getRenderableSites(filteredSites) {
  if (!globe || filteredSites.length <= VISIBLE_SITE_LIMIT) return filteredSites;

  const pov = globe.pointOfView();
  const baseAngle = Math.acos(1 / Math.max(1.001, pov.altitude + 1)) * (180 / Math.PI);
  const maxAngle = Math.min(baseAngle + 10, 98);
  const selectedSite = getSelectedSite(filteredSites);
  const visibleSites = filteredSites.filter((site) => {
    const distance = getAngularDistance(site.lat, site.lng, pov.lat, pov.lng);
    return distance <= maxAngle || site.id === selectedSite?.id;
  });

  if (selectedSite && !visibleSites.some((site) => site.id === selectedSite.id)) {
    visibleSites.push(selectedSite);
  }

  return visibleSites;
}

function getTexture(src) {
  return markerTextures.get(src) ?? null;
}

async function loadTexture(src) {
  if (markerTextures.has(src)) {
    return markerTextures.get(src);
  }

  if (!markerTexturePromises.has(src)) {
    markerTexturePromises.set(
      src,
      textureLoader.loadAsync(src).then((texture) => {
        texture.colorSpace = THREE_NS.SRGBColorSpace;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        markerTextures.set(src, texture);
        return texture;
      }).catch((error) => {
        markerTexturePromises.delete(src);
        throw error;
      }),
    );
  }

  return markerTexturePromises.get(src);
}

async function preloadMarkerTextures(sites) {
  const sources = new Set([
    GENERIC_MARKER_ASSETS.monument.src,
    ...sites.map((site) => site.markerAsset.src),
  ]);

  await Promise.all(Array.from(sources).map((src) => loadTexture(src)));
}

function getSpriteScale(site) {
  const baseScale = site.id === state.selectedSiteId ? site.markerAsset.scale * 1.08 : site.markerAsset.scale;
  return baseScale * SCREEN_SPACE_SCALE;
}

function getSpriteAltitude(site) {
  return site.id === state.selectedSiteId ? 0.02 : site.markerAsset.altitude;
}

function createMarkerSprite(site) {
  const sprite = new THREE_NS.Sprite(
      new THREE_NS.SpriteMaterial({
        map: getTexture(site.markerAsset.src) || getTexture(GENERIC_MARKER_ASSETS.monument.src),
        transparent: true,
        depthWrite: false,
        alphaTest: 0.04,
        opacity: site.markerAsset.featured ? 0.98 : 0.92,
        sizeAttenuation: false,
      }),
  );

  sprite.center.set(0.5, 0.02);
  sprite.renderOrder = site.markerAsset.featured ? 9 : 7;
  updateMarkerSprite(sprite, site);
  return sprite;
}

function updateMarkerSprite(sprite, site) {
  const coords = globe.getCoords(site.lat, site.lng, getSpriteAltitude(site));
  const scale = getSpriteScale(site);
  const texture = getTexture(site.markerAsset.src) || getTexture(GENERIC_MARKER_ASSETS.monument.src);

  sprite.position.set(coords.x, coords.y, coords.z);
  sprite.scale.set(scale, scale, 1);
  sprite.material.map = texture;
  sprite.material.opacity = site.id === state.selectedSiteId ? 1 : site.markerAsset.featured ? 0.98 : 0.9;
  sprite.material.needsUpdate = true;
  sprite.visible = true;
}

function renderMarkers(filteredSites) {
  if (!globe) return;

  const selectedSite = getSelectedSite(filteredSites);
  const renderableSites = getRenderableSites(filteredSites);

  globe
    .customLayerData([...renderableSites])
    .ringsData(selectedSite ? [selectedSite] : [])
    .ringColor(() =>
      selectedSite ? [CATEGORY_META[selectedSite.category].accent, 'rgba(255,255,255,0)'] : ['transparent']
    )
    .ringMaxRadius(5.8)
    .ringPropagationSpeed(2.15)
    .ringRepeatPeriod(1100);
}

function maybeFocusSingleMatch(filteredSites) {
  const query = state.searchQuery.trim();
  if (!query || state.selectedSiteId || filteredSites.length !== 1) {
    lastAutoFocusKey = '';
    return;
  }

  const matchKey = `${query}|${filteredSites[0].id}|${state.activeCategory}`;
  if (matchKey === lastAutoFocusKey) return;

  lastAutoFocusKey = matchKey;
  focusSite(filteredSites[0], 850);
}

function render() {
  const filteredSites = getFilteredSites();

  if (state.selectedSiteId && !filteredSites.some((site) => site.id === state.selectedSiteId)) {
    state.selectedSiteId = null;
    state.selectedDetail = null;
    state.detailLoading = false;
  }

  syncCategoryButtons();
  maybeFocusSingleMatch(filteredSites);
  renderSearchSuggestions(filteredSites);
  renderMediaPanel(filteredSites);
  renderDetailPanel(filteredSites);
  renderMarkers(filteredSites);
}

function focusSite(site, duration = 1100) {
  if (!globe || !site) return;

  globe.pointOfView(
    {
      lat: site.lat,
      lng: site.lng,
      altitude: site.markerAsset.featured ? 1.16 : 1.08,
    },
    duration,
  );

  scheduleMarkerRefresh(duration + 60);
}

async function warmDetailIndex() {
  if (detailIndex) return detailIndex;

  if (!detailIndexPromise) {
    detailIndexPromise = fetch(withBase('data/unesco-site-details.json'))
      .then((response) => {
        if (!response.ok) throw new Error('遗产详情数据加载失败');
        return response.json();
      })
      .then((data) => {
        detailIndex = data;
        return data;
      })
      .catch((error) => {
        detailIndexPromise = null;
        throw error;
      });
  }

  return detailIndexPromise;
}

function scheduleDetailWarmup() {
  const job = () => {
    warmDetailIndex().catch((error) => {
      console.error(error);
    });
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(job, { timeout: 3000 });
    return;
  }

  window.setTimeout(job, 1800);
}

async function loadSiteDetail(siteId) {
  const index = await warmDetailIndex();
  return index?.[siteId] ?? null;
}

async function selectSite(siteId) {
  const site = state.sites.find((item) => item.id === siteId);
  if (!site) return;

  lastMarkerClickAt = Date.now();
  state.selectedSiteId = siteId;
  state.selectedDetail = null;
  state.detailLoading = true;
  render();
  focusSite(site);

  try {
    const detail = await loadSiteDetail(siteId);
    if (state.selectedSiteId !== siteId) return;

    state.selectedDetail = detail;
    state.detailLoading = false;
    render();
  } catch (error) {
    console.error(error);
    if (state.selectedSiteId === siteId) {
      state.detailLoading = false;
      render();
    }
  }
}

async function loadCountries() {
  const response = await fetch(withBase('assets/countries.geojson'));
  if (!response.ok) throw new Error('国家边界数据加载失败');
  return response.json();
}

async function loadSites() {
  const response = await fetch(withBase('data/unesco-sites-lite.json'));
  if (!response.ok) throw new Error('世界遗产轻量数据加载失败');

  const rawSites = await response.json();
  state.sites = rawSites
    .map((rawSite) => normalizeSite(rawSite))
    .sort((first, second) => first.cleanName.localeCompare(second.cleanName, 'zh-CN'));
}

function updateGlobeSize() {
  if (!globe) return;

  const { width, height } = globeStageEl.getBoundingClientRect();
  globe.width(width).height(height);
}

function scheduleMarkerRefresh(delay = 100) {
  if (refreshTimer) {
    window.clearTimeout(refreshTimer);
  }

  refreshTimer = window.setTimeout(() => {
    refreshTimer = 0;
    renderMarkers(getFilteredSites());
  }, delay);
}

async function initGlobe() {
  const [{ default: Globe }, THREE] = await Promise.all([import('globe.gl'), import('three')]);

  THREE_NS = THREE;
  textureLoader = new THREE.TextureLoader();

  globe = new Globe(globeStageEl, {
    animateIn: true,
    waitForGlobeReady: true,
    rendererConfig: { antialias: true, alpha: true },
  })
    .width(globeStageEl.clientWidth)
    .height(globeStageEl.clientHeight)
    .backgroundImageUrl(withBase('assets/night-sky.png'))
    .globeImageUrl(withBase('assets/earth-blue-marble.jpg'))
    .bumpImageUrl(withBase('assets/earth-topology.png'))
    .showAtmosphere(true)
    .atmosphereColor('#7ce3ff')
    .atmosphereAltitude(0.18)
    .polygonCapColor(() => 'rgba(66, 128, 169, 0.10)')
    .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
    .polygonStrokeColor(() => 'rgba(151, 210, 255, 0.16)')
    .polygonAltitude(0.003)
    .polygonsTransitionDuration(250)
    .customLayerData([])
    .customThreeObject((site) => createMarkerSprite(site))
    .customThreeObjectUpdate((sprite, site) => updateMarkerSprite(sprite, site))
    .showPointerCursor(false)
    .onCustomLayerClick((site) => {
      selectSite(site.id);
    })
    .onCustomLayerHover((site) => {
      globeStageEl.classList.toggle('is-pointed', Boolean(site));
    })
    .onGlobeClick(() => {
      if (Date.now() - lastMarkerClickAt < 250) return;
      clearSelection();
    });

  const globeMaterial = globe.globeMaterial();
  globeMaterial.bumpScale = 18;
  globeMaterial.shininess = 10;
  globeMaterial.specular = new THREE.Color('#1d3c56');

  const controls = globe.controls();
  controls.autoRotate = false;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.08;
  controls.rotateSpeed = 0.85;
  controls.zoomSpeed = 0.9;
  controls.minDistance = 130;
  controls.maxDistance = 460;
  controls.addEventListener('change', () => scheduleMarkerRefresh(120));

  globe.pointOfView(initialView);

  const renderer = globe.renderer();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const ambientLight = new THREE.AmbientLight('#e0f3ff', 1.8);
  const keyLight = new THREE.DirectionalLight('#ffffff', 2.4);
  keyLight.position.set(1, 1, 1);

  const rimLight = new THREE.DirectionalLight('#6ed8ff', 1.2);
  rimLight.position.set(-1.4, -0.4, 0.8);

  globe.lights([ambientLight, keyLight, rimLight]);

  try {
    const countries = await loadCountries();
    globe.polygonsData(countries.features);
  } catch (error) {
    console.error(error);
  }
}

searchInputEl.addEventListener('input', (event) => {
  state.searchQuery = event.target.value;
  clearSelection();
});

searchInputEl.addEventListener('focus', () => {
  state.searchFocused = true;
  render();
});

searchInputEl.addEventListener('blur', () => {
  window.setTimeout(() => {
    state.searchFocused = false;
    render();
  }, 120);
});

searchInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && searchInputEl.value) {
    searchInputEl.value = '';
    state.searchQuery = '';
    clearSelection();
    hideSearchSuggestions(true);
  }
});

globeStageEl.addEventListener('pointerdown', () => {
  globeStageEl.classList.add('is-dragging');
});

window.addEventListener('pointerup', () => {
  globeStageEl.classList.remove('is-dragging');
});

window.addEventListener('resize', () => {
  updateGlobeSize();
  scheduleMarkerRefresh(50);
});

imageLightboxEl.addEventListener('click', closeImageLightbox);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !imageLightboxEl.classList.contains('is-hidden')) {
    closeImageLightbox();
  }
});

Promise.all([loadSites(), initGlobe()])
  .then(async () => {
    renderCategoryButtons();
    await preloadMarkerTextures(state.sites);
    render();
    scheduleDetailWarmup();
  })
  .catch((error) => {
    console.error(error);
    detailPanelEl.classList.remove('is-hidden');
    detailPanelEl.innerHTML = `
      <div class="panel-shell panel-placeholder">
        <div class="panel-kicker">初始化失败</div>
        <h2>无法加载三维地图</h2>
        <p>请稍后刷新页面重试。</p>
      </div>
    `;
  });
