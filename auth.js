// ============================================
// FarmStay — Authentication Module
// ============================================

let currentUser = null;

function initAuth() {
  const saved = localStorage.getItem('farmstay_user');
  if (saved) {
    currentUser = JSON.parse(saved);
    updateNavForUser();
  }
}

function signupUser() {
  const firstName = document.getElementById('signupFirst').value.trim();
  const lastName  = document.getElementById('signupLast').value.trim();
  const email     = document.getElementById('signupEmail').value.trim();
  const phone     = document.getElementById('signupPhone').value.trim();
  const password  = document.getElementById('signupPassword').value;
  const confirm   = document.getElementById('signupConfirm').value;
  const agreed    = document.getElementById('agreeTerms').checked;

  if (!firstName || !lastName) return showToast('Please enter your full name.', 'error');
  if (!isValidEmail(email))    return showToast('Please enter a valid email address.', 'error');
  if (!phone)                  return showToast('Please enter your phone number.', 'error');
  if (password.length < 8)    return showToast('Password must be at least 8 characters.', 'error');
  if (password !== confirm)    return showToast('Passwords do not match.', 'error');
  if (!agreed)                 return showToast('Please agree to the Terms & Privacy Policy.', 'error');

  // Check if email already registered locally
  const users = JSON.parse(localStorage.getItem('farmstay_users') || '[]');
  if (users.find(u => u.email === email)) {
    return showToast('An account with this email already exists.', 'error');
  }

  const newUser = {
    id: Date.now(),
    firstName, lastName,
    email, phone,
    password: btoa(password), // simple obfuscation
    createdAt: new Date().toISOString(),
    bookings: []
  };

  users.push(newUser);
  localStorage.setItem('farmstay_users', JSON.stringify(users));

  // Save to Google Sheets
  saveUserToSheets(newUser);

  // Log in immediately
  loginWithUser(newUser);
  closeModal();
  showToast(`Welcome to FarmStay, ${firstName}! 🌾`, 'success');
}

function loginUser() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if (!isValidEmail(email)) return showToast('Please enter a valid email.', 'error');
  if (!password)            return showToast('Please enter your password.', 'error');

  const users = JSON.parse(localStorage.getItem('farmstay_users') || '[]');
  const user  = users.find(u => u.email === email && u.password === btoa(password));

  if (!user) {
    return showToast('Incorrect email or password.', 'error');
  }

  loginWithUser(user);
  closeModal();
  showToast(`Welcome back, ${user.firstName}! 🌾`, 'success');
}

function loginWithUser(user) {
  currentUser = user;
  localStorage.setItem('farmstay_user', JSON.stringify(user));
  updateNavForUser();
}

function logout() {
  currentUser = null;
  localStorage.removeItem('farmstay_user');
  document.getElementById('navUser').classList.add('hidden');
  document.getElementById('navAuth').classList.remove('hidden');
  showPage('home');
  showToast('You have been signed out.', '');
}

function updateNavForUser() {
  document.getElementById('navUser').classList.remove('hidden');
  document.getElementById('navAuth').classList.add('hidden');
  document.getElementById('userGreeting').textContent = `Hi, ${currentUser.firstName} 👋`;
}

function requireAuth(callback) {
  if (!currentUser) {
    showToast('Please sign in to continue.', 'error');
    openModal('login');
    return false;
  }
  if (callback) callback();
  return true;
}

// ---- Helpers ----
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function openModal(tab) {
  document.getElementById('modalOverlay').classList.remove('hidden');
  switchTab(tab || 'login');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.add('hidden');
  clearAuthForms();
}

function closeModalOnBg(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function clearAuthForms() {
  ['loginEmail','loginPassword','signupFirst','signupLast','signupEmail',
   'signupPhone','signupPassword','signupConfirm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const cb = document.getElementById('agreeTerms');
  if (cb) cb.checked = false;
}

function switchTab(tab) {
  document.getElementById('form-login').classList.toggle('hidden', tab !== 'login');
  document.getElementById('form-signup').classList.toggle('hidden', tab !== 'signup');
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}

// Allow pressing Enter in auth forms
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const overlay = document.getElementById('modalOverlay');
    if (!overlay.classList.contains('hidden')) {
      if (!document.getElementById('form-login').classList.contains('hidden')) loginUser();
      else signupUser();
    }
  }
});
