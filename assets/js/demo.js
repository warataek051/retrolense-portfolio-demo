const DEMO_ACCOUNTS = {
  user: { email: 'user@retrolense.com', password: 'user123', role: 'user', name: 'Portfolio User' },
  admin: { email: 'admin@retrolense.com', password: 'admin123', role: 'admin', name: 'RetroLense Admin' }
};

function getSession(){ try { return JSON.parse(localStorage.getItem('retrolense_demo_session')); } catch(e){ return null; } }
function setSession(account){ localStorage.setItem('retrolense_demo_session', JSON.stringify({email:account.email,role:account.role,name:account.name})); }
function logout(){ localStorage.removeItem('retrolense_demo_session'); location.href='login.html'; }

const loginForm = document.querySelector('#login-form');
if(loginForm){
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('#login-email').value.trim().toLowerCase();
    const password = document.querySelector('#login-password').value;
    const account = Object.values(DEMO_ACCOUNTS).find(a => a.email === email && a.password === password);
    const error = document.querySelector('#login-error');
    if(!account){ error.hidden=false; return; }
    error.hidden=true; setSession(account);
    location.href = account.role === 'admin' ? 'admin.html' : 'index.html';
  });
}

document.querySelectorAll('[data-fill-account]').forEach(btn => btn.addEventListener('click', () => {
  const a=DEMO_ACCOUNTS[btn.dataset.fillAccount];
  document.querySelector('#login-email').value=a.email;
  document.querySelector('#login-password').value=a.password;
}));

document.querySelectorAll('.demo-form:not(#login-form)').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();alert('Portfolio Demo: หน้านี้แสดงเฉพาะ UX/UI และไม่มีการเชื่อมต่อฐานข้อมูลหรือระบบชำระเงินจริง');}));
document.querySelectorAll('.demo-action').forEach(b=>b.addEventListener('click',e=>{e.preventDefault();alert('Portfolio Demo: ปุ่มนี้เป็นตัวอย่างการแสดงผลเท่านั้น');}));

if(document.body.dataset.requireAdmin === 'true'){
  const s=getSession(); if(!s || s.role!=='admin') location.href='login.html';
}

document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click', logout));
