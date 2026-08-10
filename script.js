const menu=document.querySelector('.menu-toggle'),links=document.querySelector('.nav-links');menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)});

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.product-card').forEach(card=>{card.style.display=f==='all'||card.dataset.category===f?'block':'none'})}));

document.querySelectorAll('.enquire').forEach(btn=>btn.addEventListener('click',()=>{const product=btn.dataset.product;document.querySelector('#message')?.focus();const msg=`Hello Static Safety Solutions, I am interested in ${product}. Please share details, availability and a quotation.`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank')}));

const form=document.querySelector('#enquiryForm');form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const msg=`Hello Static Safety Solutions,%0A%0AName: ${d.get('name')}%0ACompany: ${d.get('company')||'Not provided'}%0APhone: ${d.get('phone')}%0ARequirement: ${d.get('message')}`;window.open(`https://wa.me/?text=${msg}`,'_blank')});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
