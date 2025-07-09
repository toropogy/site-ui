// site-ui/common.js
document.addEventListener('DOMContentLoaded', () => {
  const base = 'https://toropogy.github.io/site-ui/';
  const headerURL = base + 'header.html';
  const footerURL = base + 'footer.html';
  const menuURL   = base + 'menu.json';

  // ヘッダー読み込み＆セットアップ
  fetch(headerURL)
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      initCategoryMenu();
      initScrollBehavior();
    })
    .catch(console.error);

  // フッター読み込み
  fetch(footerURL)
    .then(r => r.text())
    .then(html => document.body.insertAdjacentHTML('beforeend', html))
    .catch(console.error);

  // カテゴリードロップダウン
  function initCategoryMenu() {
    fetch(menuURL)
      .then(r => r.json())
      .then(menu => {
        const list = document.getElementById('category-list');
        menu.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${item.url}">${item.label}</a>`;
          list.appendChild(li);
        });
      })
      .catch(console.error);

    document.addEventListener('click', e => {
      const toggle = document.getElementById('category-toggle');
      const menuEl = document.getElementById('category-list');
      if (!menuEl) return;
      if (e.target === toggle) {
        menuEl.classList.toggle('hidden');
      } else if (!menuEl.contains(e.target)) {
        menuEl.classList.add('hidden');
      }
    });
  }

  // スクロールによる AppBar 隠蔽 ＆ 表示
  function initScrollBehavior() {
    let lastY = window.scrollY;
    const header = document.querySelector('.appbar');
    if (!header) return;
    header.style.transition = 'transform 0.3s ease';

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.style.transform = y < lastY
        ? 'translateY(0)'
        : 'translateY(-100%)';
      lastY = y;
    }, { passive: true });
  }
});
async function loadMenuItems() {
  try {
    const res = await fetch('/menu2.json');
    const items = await res.json();
    const menuList = document.getElementById('menu-list');
    if (!menuList) return;

    items.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.label;
      li.appendChild(a);
      menuList.appendChild(li);
    });
  } catch (e) {
    console.error('メニュー読み込み失敗:', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadMenuItems();

  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
});
