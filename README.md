# 🌾 FarmStay — Complete Farmhouse Booking Website

A fully functional, multi-page farmhouse booking website with user authentication, listings, detailed views, online booking, payment processing (Card, UPI, Cash), reviews, and Google Sheets integration.

---

## 📁 File Structure

```
farmstay/
├── index.html              ← Main HTML (all pages via JS routing)
├── css/
│   ├── main.css            ← All styles, layout, components
│   └── animations.css      ← Transitions and keyframe animations
├── js/
│   ├── data.js             ← Farmhouse data, reviews, testimonials
│   ├── auth.js             ← Signup, login, session management
│   ├── app.js              ← Page routing, card rendering, listings, filters
│   ├── booking.js          ← Booking flow, payment validation, summary
│   └── sheets.js           ← Google Sheets webhook integration
└── README.md
```

---

## 🚀 Features

### 👤 Authentication
- **Sign Up**: Full name, email, phone, password with validation
- **Sign In**: Email/password with error handling
- **Session persistence** via localStorage
- **Instant Google Sheets logging** of every signup

### 🏡 Farmhouse Listings
- **8 curated farmhouses** across Hyderabad, Wayanad, Coorg, Ooty, Lonavala, Alibaug, Pune
- **Filter by**: Location, Max Price, Min Rating, Amenities
- **Sort by**: Featured, Price (low-high, high-low), Top Rated
- **Search** from hero section

### 📋 Farmhouse Detail Page
- Full description, photo gallery, amenities
- Guest reviews with ratings and tags
- Sticky booking card with price summary

### 📅 Booking System
- **Date selection** (check-in / check-out)
- **Guest count** selector
- **Live price calculator** with GST (18%)
- **Special requests** field

### 💳 Payment Methods
1. **Card** — Name, card number (formatted), expiry, CVV
2. **UPI / Online** — GPay, PhonePe, Paytm, NetBanking + UPI ID
3. **Cash on Arrival** — 20% advance via card

### ⭐ Reviews
- Star rating (1–5) with labels
- Written review (min 20 chars)
- Tag selection (Clean, Great Host, etc.)

### 📊 My Bookings
- View all past and upcoming bookings
- Write reviews for completed stays

---

## 🔧 Google Sheets Setup

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Copy the Apps Script code from `js/sheets.js` (top comment block)
4. In the script, replace `YOUR_SPREADSHEET_ID` with your Google Sheet ID
5. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copy the **Web App URL**
7. Open `js/sheets.js` and replace:
   ```js
   const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### Spreadsheet Columns

**Sheet "Users":** Timestamp | First Name | Last Name | Email | Phone | Event

**Sheet "Bookings":** Timestamp | Email | Name | Farm | Check-in | Check-out | Guests | Total | Payment | Status

**Sheet "Reviews":** Timestamp | Email | Name | Farm | Rating | Review | Tags

---

## 🌐 How to Run

Simply open `index.html` in any modern browser. No build step required.

For production, serve with any static file server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## 🎨 Design

- **Aesthetic**: Organic luxury / editorial natural
- **Fonts**: Cormorant Garamond (display) + DM Sans (body)
- **Colors**: Earth tones — warm browns, sage greens, gold accents
- **Mobile responsive** (breakpoints at 900px, 640px)

---

## 📝 Notes

- User data stored in `localStorage` (for demo; use a backend DB for production)
- Passwords are base64-encoded (use bcrypt + server-side auth in production)
- Payment UI is a realistic demo (connect Razorpay/Stripe for live payments)
- Google Sheets uses `no-cors` mode — ensure CORS is handled in Apps Script

---

Built with ❤️ for rural India 🌾
