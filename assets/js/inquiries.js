
(function () {
  'use strict';

  const base = 'https://github.com/jungsuplee-hub/sori-profile';
  const api = 'https://api.github.com/repos/jungsuplee-hub/sori-profile/issues?state=all&sort=created&direction=desc&per_page=100';
  const cacheKey = 'sori-public-inquiries-v1';
  const cacheDuration = 3 * 60 * 1000;
  const board = document.getElementById('inquiry-items');
  const count = document.getElementById('inquiry-counter');
  const more = document.getElementById('inquiry-more');
  const form = document.getElementById('inquiry-write');
  if (!board || !form) return;

  const translations = {
    ko: {
      nav: '문의', contact: '연락하기', title: '프로젝트에 대해<br>궁금한 점이 있으신가요?',
      lead: '행사 기획, 프로젝트 수행 경험, 협업에 관한 질문이나 제안을 남겨 주세요.',
      boardTitle: '공개 문의 게시판', composeTitle: '문의 작성하기', composeLead: '내용을 작성하면 GitHub의 최종 등록 화면으로 이동합니다.',
      category: '문의 유형', general: '일반 문의', collaboration: '협업 제안', project: '프로젝트 관련', other: '기타',
      subject: '제목', subjectPlaceholder: '문의 제목을 입력해 주세요', content: '문의 내용', contentPlaceholder: '궁금한 점이나 제안 내용을 작성해 주세요',
      submit: 'GitHub에서 문의 등록 ↗', notice: '공개 게시판입니다. 전화번호, 이메일, 개인정보나 기밀 사항은 작성하지 마세요. 등록 및 답글 작성에는 GitHub 로그인이 필요합니다.',
      noticeError: '제목과 문의 내용을 모두 입력해 주세요.',
      all: '전체', open: '진행 중', closed: '종료', loading: '문의 목록을 불러오는 중입니다.',
      empty: '아직 등록된 문의가 없습니다.', emptyLead: '첫 번째 문의를 남겨 주세요.',
      loadError: '문의 목록을 가져오지 못했습니다.', loadErrorLead: '잠시 후 새로고침하거나 GitHub에서 목록을 확인해 주세요.',
      viewGithub: 'GitHub에서 전체 문의 보기 ↗', more: '문의 더 보기', count: '건', comments: '답글',
      contactBoard: '공개 문의 남기기 ↗', companyPhone: '스피언스 대표전화 (개인 연락처 아님)', phoneNote: '회사 대표번호는 기업 공개정보 기준이며 개인 연락처가 아닙니다.',
      emailNote: '개인 이메일 주소는 확인되지 않아 표시하지 않았습니다.',
      source: '번호 출처', contactDescription: '프로젝트와 협업에 관해 궁금한 사항이 있다면 공개 문의 게시판을 이용해 주세요.'
    },
    en: {
      nav: 'Inquiries', contact: 'Get in touch', title: 'Have a question<br>about a project?',
      lead: 'Send a question or collaboration proposal about events, projects or professional experience.',
      boardTitle: 'Public inquiry board', composeTitle: 'Write an inquiry', composeLead: 'Fill in the details, then complete your submission on GitHub.',
      category: 'Inquiry type', general: 'General question', collaboration: 'Collaboration proposal', project: 'Project question', other: 'Other',
      subject: 'Subject', subjectPlaceholder: 'Enter a subject', content: 'Your message', contentPlaceholder: 'Describe your question or proposal',
      submit: 'Continue on GitHub ↗', notice: 'This is a public board. Do not enter email addresses, phone numbers, personal details or confidential information. A GitHub account is required to post and reply.',
      noticeError: 'Please enter a subject and a message.',
      all: 'All', open: 'Open', closed: 'Closed', loading: 'Loading inquiries…',
      empty: 'No inquiries yet.', emptyLead: 'Be the first to post a question.',
      loadError: 'Unable to load inquiries.', loadErrorLead: 'Try refreshing or view them directly on GitHub.',
      viewGithub: 'View all on GitHub ↗', more: 'Load more', count: ' inquiries', comments: 'replies',
      contactBoard: 'Post a public inquiry ↗', companyPhone: 'SPEAENCE main office (not a personal number)', phoneNote: 'This business number is from public company records, not a direct personal contact.',
      emailNote: 'No verified personal email address is available for publication.',
      source: 'Number source', contactDescription: 'For questions about projects or collaboration, please use the public inquiry board.'
    }
  };
  const i18n = key => translations[document.documentElement.lang === 'en' ? 'en' : 'ko'][key] || key;
  let inquiries = [], filter = 'all', visible = 5, state = 'loading';
  function setLanguage() {
    document.querySelectorAll('[data-inquiry-i18n]').forEach(function (node) {
      const key = node.dataset.inquiryI18n;
      if (key === 'title') node.innerHTML = i18n(key);
      else node.textContent = i18n(key);
    });
    document.querySelectorAll('[data-inquiry-placeholder]').forEach(function (node) {
      node.placeholder = i18n(node.dataset.inquiryPlaceholder);
    });
    document.querySelectorAll('#inquiry-category option').forEach(function (node) {
      node.textContent = i18n(node.value);
    });
    document.querySelectorAll('[data-inquiry-tab]').forEach(function (button) {
      button.textContent = i18n(button.dataset.inquiryTab);
    });
    render();
  }
  function make(tag, cls, txt) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (txt !== undefined) node.textContent = txt;
    return node;
  }
  function emptyMessage(heading, detail) {
    const message = make('div', 'inquiry-empty');
    message.append(make('strong', '', i18n(heading)), make('span', '', i18n(detail)));
    board.replaceChildren(message);
  }
  function render() {
    count.textContent = inquiries.length + i18n('count');
    document.querySelectorAll('[data-inquiry-tab]').forEach(function(button) {
      button.setAttribute('aria-pressed', String(filter === button.dataset.inquiryTab));
    });
    more.hidden = true;
    if (state === 'loading') return emptyMessage('loading', 'loading');
    if (state === 'error') return emptyMessage('loadError', 'loadErrorLead');
    const filtered = inquiries.filter(item => filter === 'all' || item.state === filter);
    if (!filtered.length) return emptyMessage('empty', 'emptyLead');
    board.replaceChildren();
    filtered.slice(0, visible).forEach(function (item) {
      const link = make('a', 'inquiry-item');
      link.href = item.html_url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const head = make('div', 'inquiry-item-head');
      head.append(make('span', 'inquiry-state ' + (item.state === 'closed' ? 'closed' : ''), i18n(item.state)));
      const date = new Date(item.created_at);
      const dateText = Number.isFinite(date.getTime()) ? date.toLocaleDateString(document.documentElement.lang === 'en' ? 'en-US' : 'ko-KR') : '';
      head.append(make('span', 'inquiry-item-meta', dateText));
      link.append(head, make('strong', '', item.title));
      const body = (item.body || '').replace(/<!--[^]*?-->/g, '').replace(/[#*_`>|]/g, ' ').trim();
      if (body) link.append(make('p', '', body.slice(0, 220)));
      link.append(make('div', 'inquiry-item-meta', '#' + item.number + ' · ' + item.comments + ' ' + i18n('comments')));
      board.append(link);
    });
    more.hidden = filtered.length <= visible;
  }
  async function load() {
    let cached = null;
    try {
      const saved = JSON.parse(sessionStorage.getItem(cacheKey) || 'null');
      if (saved && Array.isArray(saved.items)) cached = saved;
    } catch (_) {}
    if (cached && Date.now() - cached.savedAt < cacheDuration) {
      inquiries = cached.items; state = 'ready'; render(); return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    try {
      const response = await fetch(api, {headers: {'Accept': 'application/vnd.github+json'}, signal: controller.signal});
      if (!response.ok) throw new Error('GitHub request failed ' + response.status);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Unexpected GitHub response');
      inquiries = data.filter(item => !item.pull_request
        && /^\[(문의|Inquiry)\]\s*/i.test(item.title || '')
        && Number.isSafeInteger(item.number)
        && typeof item.html_url === 'string'
        && item.html_url.startsWith(base + '/issues/')
        && typeof item.title === 'string'
        && (item.state === 'open' || item.state === 'closed'))
        .map(item => ({
          number: item.number, title: item.title, body: typeof item.body === 'string' ? item.body : '',
          html_url: item.html_url, state: item.state, created_at: item.created_at,
          comments: Number.isInteger(item.comments) ? item.comments : 0
        }));
      state = 'ready';
      try { sessionStorage.setItem(cacheKey, JSON.stringify({savedAt: Date.now(), items: inquiries})); } catch (_) {}
    } catch (_) {
      if (cached) { inquiries = cached.items; state = 'ready'; }
      else { inquiries = []; state = 'error'; }
    } finally { clearTimeout(timeout); render(); }
  }
  document.querySelectorAll('[data-inquiry-tab]').forEach(function (button) {
    button.addEventListener('click', function () { filter = button.dataset.inquiryTab; visible = 5; render(); });
  });
  more.addEventListener('click', function () { visible += 5; render(); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const subject = form.elements.namedItem('inquiry-subject').value.trim();
    const body = form.elements.namedItem('inquiry-body').value.trim();
    const err = document.getElementById('inquiry-form-error');
    if (!subject || !body) {
      err.textContent = i18n('noticeError');
      return;
    }
    err.textContent = '';
    const url = new URL(base + '/issues/new');
    url.searchParams.set('template', 'inquiry.yml');
    url.searchParams.set('title', (document.documentElement.lang === 'en' ? '[Inquiry] ' : '[문의] ') + subject.slice(0, 100));
    url.searchParams.set('category', form.elements.namedItem('inquiry-category').value);
    url.searchParams.set('inquiry-details', body.slice(0, 6000));
    window.location.assign(url.toString());
  });
  const observer = new MutationObserver(function (changes) {
    if (changes.some(change => change.attributeName === 'lang')) setLanguage();
  });
  observer.observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  setLanguage();
  load();
})();
