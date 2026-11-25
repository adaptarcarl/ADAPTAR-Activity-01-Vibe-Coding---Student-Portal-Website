// Campusly is a static demo. Profile edits are saved only in this browser using localStorage.
const pages = ['dashboard','schedule','grades','announcements','profile'];
const navLinks = document.querySelectorAll('.nav-link');
const pageCrumb = document.getElementById('pageCrumb');
const sidebar = document.getElementById('sidebar');
const toast = document.getElementById('toast');

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(()=>toast.classList.remove('show'),2600);
}
function navigate(page){
  if(!pages.includes(page)) return;
  document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.id===`page-${page}`));
  navLinks.forEach(el=>el.classList.toggle('active',el.dataset.page===page));
  pageCrumb.textContent = page === 'profile' ? 'My profile' : page.charAt(0).toUpperCase()+page.slice(1);
  sidebar.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}
navLinks.forEach(link=>link.addEventListener('click',()=>navigate(link.dataset.page)));
document.querySelectorAll('[data-go]').forEach(btn=>btn.addEventListener('click',()=>navigate(btn.dataset.go)));
document.getElementById('menuToggle').addEventListener('click',()=>sidebar.classList.toggle('open'));
document.getElementById('noticeBtn').addEventListener('click',()=>{navigate('announcements');showToast('You’re all caught up on campus updates.');});

// Display the current date automatically.
const date = new Date();
document.getElementById('todayLabel').textContent = date.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'}).toUpperCase();

// Load the locally saved profile, if available.
const profileForm = document.getElementById('profileForm');
const savedProfile = JSON.parse(localStorage.getItem('campuslyProfile') || 'null');
if(savedProfile){
  document.getElementById('fullName').value = savedProfile.name || '';
  document.getElementById('email').value = savedProfile.email || '';
  document.getElementById('phone').value = savedProfile.phone || '';
  updateProfileName(savedProfile.name);
}
function updateProfileName(name){
  const cleanName = (name || 'Student').trim();
  document.getElementById('profileDisplayName').textContent = cleanName;
  document.getElementById('sideName').textContent = cleanName;
  document.getElementById('welcomeName').textContent = cleanName.split(' ')[0];
}
profileForm.addEventListener('submit',(event)=>{
  event.preventDefault();
  const profile = {
    name:document.getElementById('fullName').value.trim(),
    email:document.getElementById('email').value.trim(),
    phone:document.getElementById('phone').value.trim()
  };
  localStorage.setItem('campuslyProfile',JSON.stringify(profile));
  updateProfileName(profile.name);
  document.getElementById('saveMessage').textContent = 'Saved locally ✓';
  showToast('Your profile changes have been saved on this device.');
});
