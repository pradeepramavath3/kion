// ============================================
// FarmStay — Google Sheets Integration
// ============================================
//
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com
// 2. Create a new Apps Script project
// 3. Paste the Apps Script code below into the editor
// 4. Deploy as Web App (Execute as: Me, Access: Anyone)
// 5. Copy the Web App URL and set it as SHEETS_WEBHOOK_URL below
//
// ============================================
// GOOGLE APPS SCRIPT CODE (paste into script.google.com):
// ============================================
//
// function doPost(e) {
//   var sheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID').getActiveSheet();
//   var data = JSON.parse(e.postData.contents);
//
//   if (data.type === 'signup') {
//     sheet.appendRow([
//       new Date().toISOString(),
//       data.firstName,
//       data.lastName,
//       data.email,
//       data.phone,
//       'New Signup'
//     ]);
//   }
//
//   if (data.type === 'booking') {
//     var bookSheet = SpreadsheetApp.openById('YOUR_SPREADSHEET_ID')
//                    .getSheetByName('Bookings') || sheet;
//     bookSheet.appendRow([
//       new Date().toISOString(),
//       data.userEmail,
//       data.userName,
//       data.farmName,
//       data.checkIn,
//       data.checkOut,
//       data.guests,
//       data.total,
//       data.paymentMethod,
//       'Confirmed'
//     ]);
//   }
//
//   return ContentService
//     .createTextOutput(JSON.stringify({ result: 'success' }))
//     .setMimeType(ContentService.MimeType.JSON);
// }
//
// ============================================

// ⚠️ Replace this with your deployed Google Apps Script Web App URL
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

/**
 * Save new user signup data to Google Sheets
 * @param {Object} user - The user object with signup details
 */
async function saveUserToSheets(user) {
  const payload = {
    type: 'signup',
    firstName: user.firstName,
    lastName:  user.lastName,
    email:     user.email,
    phone:     user.phone,
    createdAt: user.createdAt
  };

  try {
    const response = await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode:   'no-cors', // Google Apps Script requires no-cors
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('[FarmStay] User signup saved to Sheets.');
  } catch (err) {
    // Silently fail — local signup is already complete
    console.warn('[FarmStay] Could not reach Google Sheets webhook:', err.message);
  }
}

/**
 * Save a confirmed booking to Google Sheets
 * @param {Object} booking - The booking object
 * @param {Object} user    - Current user
 * @param {Object} farm    - Farmhouse details
 */
async function saveBookingToSheets(booking, user, farm) {
  const payload = {
    type:          'booking',
    userEmail:     user.email,
    userName:      `${user.firstName} ${user.lastName}`,
    userPhone:     user.phone,
    farmName:      farm.name,
    farmLocation:  farm.location,
    checkIn:       booking.checkIn,
    checkOut:      booking.checkOut,
    guests:        booking.guests,
    nights:        booking.nights,
    subtotal:      booking.subtotal,
    taxes:         booking.taxes,
    total:         booking.total,
    paymentMethod: booking.paymentMethod,
    bookedAt:      booking.bookedAt
  };

  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('[FarmStay] Booking saved to Sheets.');
  } catch (err) {
    console.warn('[FarmStay] Could not save booking to Sheets:', err.message);
  }
}

/**
 * Save a new review to Google Sheets
 */
async function saveReviewToSheets(review, user, farm) {
  const payload = {
    type:      'review',
    userEmail: user.email,
    userName:  `${user.firstName} ${user.lastName}`,
    farmName:  farm.name,
    rating:    review.rating,
    text:      review.text,
    tags:      review.tags.join(', '),
    date:      new Date().toISOString()
  };

  try {
    await fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('[FarmStay] Review saved to Sheets.');
  } catch (err) {
    console.warn('[FarmStay] Could not save review to Sheets:', err.message);
  }
}

// ============================================
// SPREADSHEET COLUMN SETUP
// ============================================
// 
// Sheet 1 "Users":
// Timestamp | First Name | Last Name | Email | Phone | Event
//
// Sheet 2 "Bookings":
// Timestamp | User Email | User Name | Farm | Check-in | Check-out
// | Guests | Total (₹) | Payment | Status
//
// Sheet 3 "Reviews":
// Timestamp | User Email | User Name | Farm | Rating | Review | Tags | Date
//
// ============================================
