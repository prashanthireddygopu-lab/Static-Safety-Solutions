const menu=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');
menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

let activeFilter='all';
const cards=[...document.querySelectorAll('.product-card')];
function applyFilters(){const q=(document.querySelector('#productSearch')?.value||'').trim().toLowerCase();cards.forEach(card=>{const categoryOK=activeFilter==='all'||card.dataset.category===activeFilter;const searchOK=!q||card.dataset.name.includes(q);card.classList.toggle('no-match',!(categoryOK&&searchOK));});}
document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;applyFilters()}));
document.querySelector('#productSearch')?.addEventListener('input',applyFilters);

document.querySelectorAll('.enquire').forEach(btn=>btn.addEventListener('click',()=>{const product=btn.dataset.product;const msg=`Hello Static Safety Solutions, I am interested in ${product}. Please share details, availability and a quotation.`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank','noopener')}));
const form=document.querySelector('#enquiryForm');form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Static Safety Solutions,\n\nName: ${d.get('name')}\nCompany: ${d.get('company')||'Not provided'}\nPhone: ${d.get('phone')}\nRequirement: ${d.get('message')}`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank','noopener')});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
applyFilters();