// ============================================
// FarmStay — App Core (Routing & Rendering)
// ============================================

let currentFarmhouse = null;
let filteredFarmhouses = [...FARMHOUSES];
let currentRating = 0;

// ---- PAGE ROUTING ----
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById(`page-${name}`);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (name === 'listings')  renderListings();
  if (name === 'bookings')  renderMyBookings();
}

// ---- INIT ----
window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  renderFeatured();
  renderTestimonials();
  updatePriceLabel();

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
  });
});

// ---- HERO SEARCH ----
function doHeroSearch() {
  const q = document.getElementById('heroSearch').value.trim().toLowerCase();
  showPage('listings');
  if (q) {
    filteredFarmhouses = FARMHOUSES.filter(f =>
      f.name.toLowerCase().includes(q) ||
      f.location.toLowerCase().includes(q) ||
      f.area.toLowerCase().includes(q)
    );
    renderListings(true);
  }
}

// ---- FEATURED ----
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  const featured = FARMHOUSES.filter(f => f.featured).slice(0, 4);
  grid.innerHTML = featured.map(f => farmCard(f)).join('');
}

// ---- TESTIMONIALS ----
function renderTestimonials() {
  const row = document.getElementById('testimonialRow');
  row.innerHTML = TESTIMONIALS.map(t => `
    <div class="testimonial-card">
      <div class="t-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div>
      <p class="t-text">"${t.text}"</p>
      <div class="t-author">
        <div class="t-avatar">${t.name[0]}</div>
        <div>
          <div class="t-name">${t.name}</div>
          <div class="t-loc">${t.location} · ${t.farm}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ---- FARM CARD TEMPLATE ----
function farmCard(f) {
  const stars = renderStars(f.rating);
  const tags = f.amenities.slice(0, 3).map(a => `<span class="amenity-tag">${a}</span>`).join('');
  const badge = f.badge ? `<div class="farm-card-badge">${f.badge}</div>` : '';
  return `
    <div class="farm-card" onclick="openDetail(${f.id})">
      <div class="farm-card-img">
        <img src="${f.image}" alt="${f.name}" loading="lazy" />
        ${badge}
      </div>
      <div class="farm-card-body">
        <div class="farm-card-location">📍 ${f.location}</div>
        <div class="farm-card-name">${f.name}</div>
        <div class="farm-card-desc">${f.description}</div>
        <div class="farm-card-amenities">${tags}</div>
        <div class="farm-card-footer">
          <div class="farm-price">
            <strong>₹${f.price.toLocaleString('en-IN')}</strong>
            <span>/ night</span>
          </div>
          <div class="farm-rating">
            <span class="star-filled">★</span> ${f.rating} (${f.reviews})
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

// ---- LISTINGS PAGE ----
function renderListings(useFiltered = false) {
  if (!useFiltered) filteredFarmhouses = [...FARMHOUSES];
  const grid  = document.getElementById('listingsGrid');
  const count = document.getElementById('listingsCount');
  if (!grid) return;
  count.textContent = `${filteredFarmhouses.length} farmhouse${filteredFarmhouses.length !== 1 ? 's' : ''} found`;
  if (filteredFarmhouses.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
      <span class="empty-icon">🌾</span>
      <h3>No farmhouses found</h3>
      <p>Try adjusting your filters</p>
    </div>`;
    return;
  }
  grid.innerHTML = filteredFarmhouses.map(f => farmCard(f)).join('');
}

function applyFilters() {
  const loc     = document.getElementById('filterLocation').value;
  const maxPx   = parseInt(document.getElementById('filterPrice').value);
  const minRat  = parseFloat(document.getElementById('filterRating').value);
  const sort    = document.getElementById('sortOrder').value;
  const checked = [...document.querySelectorAll('.amenity-checks input:checked')].map(c => c.value);

  filteredFarmhouses = FARMHOUSES.filter(f => {
    if (loc && f.location !== loc) return false;
    if (f.price > maxPx) return false;
    if (f.rating < minRat) return false;
    if (checked.length && !checked.every(a => f.amenities.includes(a))) return false;
    return true;
  });

  if (sort === 'price-low')  filteredFarmhouses.sort((a,b) => a.price - b.price);
  if (sort === 'price-high') filteredFarmhouses.sort((a,b) => b.price - a.price);
  if (sort === 'rating')     filteredFarmhouses.sort((a,b) => b.rating - a.rating);

  renderListings(true);
}

function updatePriceLabel() {
  const val = document.getElementById('filterPrice').value;
  document.getElementById('priceLabel').textContent = `₹${parseInt(val).toLocaleString('en-IN')}`;
}

function resetFilters() {
  document.getElementById('filterLocation').value = '';
  document.getElementById('filterPrice').value    = 20000;
  document.getElementById('filterRating').value   = 0;
  document.querySelectorAll('.amenity-checks input').forEach(c => c.checked = false);
  document.getElementById('sortOrder').value      = 'featured';
  updatePriceLabel();
  applyFilters();
}

// ---- DETAIL PAGE ----
function openDetail(id) {
  const f = FARMHOUSES.find(x => x.id === id);
  if (!f) return;
  currentFarmhouse = f;

  const reviews = SAMPLE_REVIEWS[id] || [];
  const stars   = renderStars(f.rating);

  const photoGrid = f.images.slice(1).map(img =>
    `<img src="${img}" alt="${f.name}" loading="lazy" />`
  ).join('');

  const amenitiesHtml = f.amenities.map(a =>
    `<span class="amenity-pill">${a}</span>`
  ).join('');

  const reviewsHtml = reviews.length
    ? reviews.map(r => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">${r.author}</span>
            <span class="review-date">${r.date}</span>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
          <p class="review-text">${r.text}</p>
          <div class="review-tags-row">${r.tags.map(t=>`<span class="review-tag">${t}</span>`).join('')}</div>
        </div>
      `).join('')
    : '<p style="color:var(--text-muted);font-size:0.9rem;">No reviews yet. Be the first to review!</p>';

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-hero">
      <img src="${f.image}" alt="${f.name}" />
      <div class="detail-hero-overlay"></div>
      <div class="detail-hero-info">
        <div>
          <div class="detail-title">${f.name}</div>
          <div class="detail-location">📍 ${f.area}</div>
        </div>
        <div class="detail-price-badge">
          <strong>₹${f.price.toLocaleString('en-IN')}</strong>
          <span>per night</span>
        </div>
      </div>
    </div>

    <div class="detail-body">
      <div class="detail-main">
        <button class="back-btn" onclick="history.back(); showPage('listings')">← Back to listings</button>

        <div class="detail-section">
          <h3>About this property</h3>
          <p class="detail-desc">${f.description}</p>
        </div>

        <div class="detail-section">
          <h3>What's included</h3>
          <div class="amenities-list">${amenitiesHtml}</div>
        </div>

        <div class="detail-section">
          <h3>More Photos</h3>
          <div class="detail-photos">${photoGrid}</div>
        </div>

        <div class="detail-section">
          <h3>Guest Reviews
            <span style="font-size:0.9rem;font-weight:400;color:var(--text-muted);margin-left:10px;">
              ${stars} ${f.rating} · ${f.reviews} reviews
            </span>
          </h3>
          <div class="reviews-list">${reviewsHtml}</div>
        </div>
      </div>

      <div class="detail-sidebar">
        <div class="detail-booking-card">
          <h3>Book your stay</h3>
          <div class="summary-row">
            <span class="summary-label">Rate</span>
            <span class="summary-val">₹${f.price.toLocaleString('en-IN')} / night</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Max Guests</span>
            <span class="summary-val">${f.maxGuests} people</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Bedrooms</span>
            <span class="summary-val">${f.bedrooms} bed · ${f.bathrooms} bath</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Rating</span>
            <span class="summary-val">★ ${f.rating} (${f.reviews} reviews)</span>
          </div>
          <br/>
          <button class="btn-solid-large btn-full" onclick="startBooking(${f.id})">Reserve Now</button>
          <p style="text-align:center;font-size:0.78rem;color:var(--text-muted);margin-top:10px;">You won't be charged yet</p>
        </div>
      </div>
    </div>
  `;

  showPage('detail');
}

// ---- TOAST ----
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type}`;
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 3500);
}

// ---- MY BOOKINGS ----
function renderMyBookings() {
  if (!requireAuth()) return;
  const container = document.getElementById('bookingsContainer');
  const users     = JSON.parse(localStorage.getItem('farmstay_users') || '[]');
  const user      = users.find(u => u.id === currentUser.id);
  const bookings  = user?.bookings || [];

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🌾</span>
        <h3>No bookings yet</h3>
        <p>Your farmhouse adventures will appear here</p>
        <br/>
        <button class="btn-solid" onclick="showPage('listings')">Browse Farmhouses</button>
      </div>`;
    return;
  }

  container.innerHTML = bookings.reverse().map(b => {
    const f = FARMHOUSES.find(x => x.id === b.farmId);
    if (!f) return '';
    const isCompleted = new Date(b.checkOut) < new Date();
    const status = isCompleted ? 'completed' : 'confirmed';
    return `
      <div class="booking-item">
        <img src="${f.image}" alt="${f.name}" />
        <div class="booking-info">
          <h3>${f.name}</h3>
          <p>📍 ${f.location}</p>
          <p>📅 ${b.checkIn} → ${b.checkOut} · ${b.guests} guest(s)</p>
          <p>💳 ${b.paymentMethod} · ₹${b.total.toLocaleString('en-IN')}</p>
          <span class="booking-status status-${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </div>
        <div class="booking-actions">
          <button class="btn-outline" onclick="openDetail(${f.id})">View Property</button>
          ${isCompleted ? `<button class="btn-solid" onclick="openReview(${f.id}, ${b.id})">Write Review</button>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

// ---- REVIEW ----
function openReview(farmId, bookingId) {
  currentFarmhouse = FARMHOUSES.find(f => f.id === farmId);
  currentRating    = 0;
  document.getElementById('reviewFarmInfo').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:28px;padding:16px;background:var(--earth-cream);border-radius:var(--radius-md);">
      <img src="${currentFarmhouse.image}" style="width:80px;height:60px;object-fit:cover;border-radius:var(--radius-sm);" />
      <div>
        <div style="font-family:var(--font-display);font-size:1.1rem;">${currentFarmhouse.name}</div>
        <div style="font-size:0.82rem;color:var(--text-muted);">${currentFarmhouse.location}</div>
      </div>
    </div>
  `;
  resetStars();
  document.getElementById('reviewText').value = '';
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('selected'));
  showPage('review');
}

function setRating(n) {
  currentRating = n;
  const stars = document.querySelectorAll('#starInput span');
  stars.forEach((s, i) => s.classList.toggle('active', i < n));
  const labels = ['','Poor','Fair','Good','Very Good','Excellent'];
  document.getElementById('ratingLabel').textContent = labels[n];
}

function resetStars() {
  currentRating = 0;
  document.querySelectorAll('#starInput span').forEach(s => {
    s.classList.remove('active');
    s.textContent = '☆';
  });
  document.getElementById('ratingLabel').textContent = 'Click to rate';
}

function toggleTag(el) {
  el.classList.toggle('selected');
}

function submitReview() {
  if (!requireAuth()) return;
  if (!currentRating) return showToast('Please select a rating.', 'error');
  const text = document.getElementById('reviewText').value.trim();
  if (text.length < 20) return showToast('Please write at least 20 characters.', 'error');

  const tags = [...document.querySelectorAll('.tag.selected')].map(t => t.textContent);

  // Add to local review data
  if (!SAMPLE_REVIEWS[currentFarmhouse.id]) SAMPLE_REVIEWS[currentFarmhouse.id] = [];
  SAMPLE_REVIEWS[currentFarmhouse.id].unshift({
    author: `${currentUser.firstName} ${currentUser.lastName[0]}.`,
    date: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
    rating: currentRating,
    text, tags
  });

  showToast('Thank you for your review! 🌾', 'success');
  showPage('bookings');
}
