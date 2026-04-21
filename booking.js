// ============================================
// FarmStay — Booking Module
// ============================================

let activePayment = 'card';
let selectedUpiProvider = '';

function startBooking(farmId) {
  if (!requireAuth()) return;

  const f = FARMHOUSES.find(x => x.id === farmId);
  if (!f) return;
  currentFarmhouse = f;

  // Set min date for check-in (today)
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('checkIn').min  = today;
  document.getElementById('checkOut').min = today;
  document.getElementById('checkIn').value  = '';
  document.getElementById('checkOut').value = '';
  document.getElementById('guestCount').value = '2';
  document.getElementById('specialRequests').value = '';

  // Clear payment inputs
  ['cardName','cardNumber','cardExpiry','cardCvv','upiId','advanceCard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });

  // Reset payment tab
  switchPayment('card', document.querySelector('.pay-tab'));

  renderBookingSummary();
  renderBookingSummaryTop();
  showPage('booking');
}

function renderBookingSummaryTop() {
  document.getElementById('bookingSummaryTop').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;background:var(--earth-cream);
      border-radius:var(--radius-md);padding:16px;margin-bottom:24px;">
      <img src="${currentFarmhouse.image}" 
        style="width:100px;height:70px;object-fit:cover;border-radius:var(--radius-sm);" />
      <div>
        <div style="font-family:var(--font-display);font-size:1.15rem;">${currentFarmhouse.name}</div>
        <div style="font-size:0.82rem;color:var(--text-muted);">📍 ${currentFarmhouse.location}</div>
        <div style="font-size:0.82rem;color:var(--text-muted);">★ ${currentFarmhouse.rating} · ${currentFarmhouse.reviews} reviews</div>
      </div>
    </div>
  `;
}

function renderBookingSummary() {
  const checkIn  = document.getElementById('checkIn')?.value;
  const checkOut = document.getElementById('checkOut')?.value;
  const guests   = document.getElementById('guestCount')?.value || 1;
  const f        = currentFarmhouse;
  if (!f) return;

  let nights   = 0;
  let subtotal = 0;
  let taxes    = 0;
  let total    = 0;
  let datesRow = '';

  if (checkIn && checkOut) {
    const inD  = new Date(checkIn);
    const outD = new Date(checkOut);
    nights     = Math.max(0, Math.round((outD - inD) / (1000 * 60 * 60 * 24)));
    subtotal   = nights * f.price;
    taxes      = Math.round(subtotal * 0.18);
    total      = subtotal + taxes;
    datesRow   = `<div class="summary-row"><span class="summary-label">${nights} night(s)</span><span class="summary-val">₹${subtotal.toLocaleString('en-IN')}</span></div>`;
  }

  document.getElementById('bookingSummaryCard').innerHTML = `
    <img class="summary-img" src="${f.image}" alt="${f.name}" />
    <div class="summary-name">${f.name}</div>
    <div class="summary-loc">📍 ${f.location}</div>
    ${datesRow}
    ${taxes ? `<div class="summary-row"><span class="summary-label">GST (18%)</span><span class="summary-val">₹${taxes.toLocaleString('en-IN')}</span></div>` : ''}
    ${total ? `<div class="summary-row total"><span class="summary-label">Total</span><span class="summary-val">₹${total.toLocaleString('en-IN')}</span></div>` : ''}
    ${!checkIn || !checkOut ? '<p style="font-size:0.82rem;color:var(--text-muted);margin-top:12px;">Select dates to see total</p>' : ''}
    <p style="font-size:0.75rem;color:var(--text-muted);margin-top:14px;">🔒 Secure & encrypted payment</p>
  `;
}

function calculateTotal() {
  const checkIn  = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;

  if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
    showToast('Check-out must be after check-in.', 'error');
    document.getElementById('checkOut').value = '';
    return;
  }
  renderBookingSummary();
}

function switchPayment(type, btn) {
  activePayment = type;
  document.querySelectorAll('.pay-tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.payment-form').forEach(f => f.classList.add('hidden'));
  document.getElementById(`payment-${type}`)?.classList.remove('hidden');
}

function selectUpi(el, provider) {
  document.querySelectorAll('.upi-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  selectedUpiProvider = provider;
}

function formatCard(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}

function confirmBooking() {
  if (!requireAuth()) return;

  const checkIn  = document.getElementById('checkIn').value;
  const checkOut = document.getElementById('checkOut').value;
  const guests   = document.getElementById('guestCount').value;

  if (!checkIn || !checkOut) return showToast('Please select check-in and check-out dates.', 'error');
  if (new Date(checkOut) <= new Date(checkIn)) return showToast('Check-out must be after check-in.', 'error');

  // Payment validation
  if (!validatePayment()) return;

  const f        = currentFarmhouse;
  const nights   = Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const subtotal = nights * f.price;
  const taxes    = Math.round(subtotal * 0.18);
  const total    = subtotal + taxes;

  const booking = {
    id: Date.now(),
    farmId: f.id,
    farmName: f.name,
    checkIn, checkOut, guests,
    nights, subtotal, taxes, total,
    paymentMethod: getPaymentLabel(),
    specialRequests: document.getElementById('specialRequests').value,
    bookedAt: new Date().toISOString(),
    status: 'confirmed'
  };

  // Save to local storage
  saveBooking(booking);

  // Show success
  document.getElementById('successMsg').textContent =
    `${f.name} — ${checkIn} to ${checkOut} · ₹${total.toLocaleString('en-IN')} paid via ${booking.paymentMethod}. Confirmation sent to ${currentUser.email}.`;
  document.getElementById('successOverlay').classList.remove('hidden');
}

function validatePayment() {
  if (activePayment === 'card') {
    const name   = document.getElementById('cardName').value.trim();
    const number = document.getElementById('cardNumber').value.replace(/\s/g,'');
    const expiry = document.getElementById('cardExpiry').value.trim();
    const cvv    = document.getElementById('cardCvv').value.trim();
    if (!name)                   return showToast('Please enter cardholder name.', 'error'), false;
    if (number.length !== 16)    return showToast('Please enter a valid 16-digit card number.', 'error'), false;
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return showToast('Please enter expiry in MM/YY format.', 'error'), false;
    if (cvv.length !== 3)        return showToast('Please enter a valid 3-digit CVV.', 'error'), false;
  } else if (activePayment === 'upi') {
    const upiId = document.getElementById('upiId').value.trim();
    if (!upiId) return showToast('Please enter your UPI ID.', 'error'), false;
  } else if (activePayment === 'cash') {
    const card = document.getElementById('advanceCard').value.trim();
    if (!card) return showToast('Please enter a card for the 20% advance payment.', 'error'), false;
  }
  return true;
}

function getPaymentLabel() {
  if (activePayment === 'card') return 'Credit/Debit Card';
  if (activePayment === 'upi')  return selectedUpiProvider || 'UPI';
  return 'Cash on Arrival';
}

function saveBooking(booking) {
  const users = JSON.parse(localStorage.getItem('farmstay_users') || '[]');
  const idx   = users.findIndex(u => u.id === currentUser.id);
  if (idx === -1) return;
  if (!users[idx].bookings) users[idx].bookings = [];
  users[idx].bookings.push(booking);
  localStorage.setItem('farmstay_users', JSON.stringify(users));
  // Update session
  currentUser = users[idx];
  localStorage.setItem('farmstay_user', JSON.stringify(currentUser));
}

function closeSuccess() {
  document.getElementById('successOverlay').classList.add('hidden');
  showPage('bookings');
}
