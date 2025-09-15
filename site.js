// js/site.js
async function loadPart(id, url) {
  try {
    const res = await fetch(url, {cache: "no-cache"});
    if (!res.ok) throw new Error(res.statusText);
    document.getElementById(id).innerHTML = await res.text();
    if (id === 'site-header') afterHeaderLoaded();
  } catch (err) {
    console.error('Failed to load', url, err);
  }
}

function afterHeaderLoaded() {
  // highlight active link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-header a').forEach(a=>{
    if (a.getAttribute('href') === path) a.classList.add('active');
  });

  // mobile toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', ()=> nav.classList.toggle('mobile-open'));
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  loadPart('site-header','header.html');
  loadPart('site-footer','footer.html');
});
