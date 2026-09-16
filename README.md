# 🇮🇳 Indian ID Validation Form

A web-based form that validates **Indian Mobile Number, PAN Card Number, and Aadhaar Number** using **HTML, CSS, and JavaScript**.

The project uses Regular Expressions, input restrictions, field-level error messages, and additional validation logic for stronger client-side validation.

---

## 📌 Features

- 📱 Indian mobile number validation
- 🇮🇳 Fixed `+91` country code
- 🪪 PAN card format validation
- 🆔 Aadhaar number validation
- 🔢 Aadhaar Verhoeff checksum validation
- 🚫 Prevents invalid characters
- 🔠 Automatically converts PAN to uppercase
- ⚠️ Field-level error messages
- 🟢 Valid input indication
- 🔴 Invalid input indication
- ⚡ Real-time validation while typing
- 📱 Responsive form design
- ❌ Prevents form submission if validation fails

---

## 🛠️ Technologies Used

- **HTML5** – Form structure
- **CSS3** – Styling and user interface
- **JavaScript** – Validation logic and Regular Expressions

---

## 📂 Project Structure

```text
Indian-ID-Validation/
│
├── index.html
├── style.css
├── script.js
└── README.md
🚀 How to Run
1. Clone the repository
git clone https://github.com/your-username/Indian-ID-Validation.git
2. Open the project folder
cd Indian-ID-Validation
3. Run the project

Open the index.html file in any modern web browser.

No server or database is required.

🔐 Validation Logic
1. Indian Mobile Number

The mobile number must:

Contain exactly 10 digits
Start with 6, 7, 8, or 9
Contain only numeric characters
Not contain the same digit repeated 10 times
Regex
/^[6-9][0-9]{9}$/
Examples
9876543210  → ✅ Valid
8123456789  → ✅ Valid

5123456789  → ❌ Invalid
987654321   → ❌ Invalid
98765432101 → ❌ Invalid
9999999999  → ❌ Invalid

The country code is displayed separately:

+91 | 9876543210

The user only enters the 10-digit mobile number.

🪪 2. PAN Card Number

The PAN validation checks the standard 10-character structure:

ABCDE1234F

Structure:

AAAAA DDDD A
  ↓    ↓   ↓
  5    4   1
letters digits letter
Regex
/^[A-Z]{5}[0-9]{4}[A-Z]$/
Examples
ABCDE1234F  → ✅ Valid format
abcde1234f  → ✅ Converted to uppercase

ABC1234567  → ❌ Invalid
ABCDE12345  → ❌ Invalid
ABCDE1234   → ❌ Invalid

The application automatically converts lowercase PAN input to uppercase.

🆔 3. Aadhaar Number

The Aadhaar validation performs multiple checks:

Must not be empty
Must contain only digits
Must contain exactly 12 digits
Must not start with 0 or 1
Rejects all-identical digits
Performs Verhoeff checksum validation
Basic Regex
/^[0-9]{12}$/

Regex alone is not sufficient for checksum validation, so additional JavaScript logic is used.

🔢 Aadhaar Verhoeff Checksum

The project implements the Verhoeff algorithm to check the mathematical checksum of the Aadhaar number.

Validation process:

12-digit Aadhaar
       ↓
Check numeric characters
       ↓
Check length
       ↓
Check first digit
       ↓
Reject repeated digits
       ↓
Verhoeff checksum
       ↓
   Valid / Invalid

This provides stronger format validation than simply checking whether the input contains 12 digits.

🎨 User Interface

The form provides visual feedback.

Valid Input
┌──────────────────────┐
│ 9876543210            │
└──────────────────────┘
        🟢
Invalid Input
┌──────────────────────┐
│ 1234567890            │
└──────────────────────┘
        🔴
Invalid mobile number
⚙️ Input Restrictions

The form prevents unnecessary characters from being entered.

Mobile

Only numbers are allowed:

.replace(/\D/g, "")
Aadhaar

Only numbers are allowed:

.replace(/\D/g, "")
PAN

Only letters and numbers are allowed:

.replace(/[^a-zA-Z0-9]/g, "")

PAN is automatically converted to uppercase:

.toUpperCase()
🧠 Validation Flow
                 USER INPUT
                     │
                     ▼
              Input Sanitization
                     │
                     ▼
              Required Check
                     │
                     ▼
                Length Check
                     │
                     ▼
                Regex Check
                     │
                     ▼
           Additional Validation
                     │
          ┌──────────┴──────────┐
          │                     │
       Valid                 Invalid
          │                     │
          ▼                     ▼
    Green Border          Red Border
          │                     │
          ▼                     ▼
     Continue              Error Message
          │
          ▼
     Form Accepted
📋 Example Test Cases
Input	Expected Result
9876543210	✅ Valid Mobile
5876543210	❌ Invalid Mobile
987654321	❌ Invalid Length
9999999999	❌ Repeated Number
ABCDE1234F	✅ Valid PAN Format
ABC1234567	❌ Invalid PAN
123456789	❌ Invalid Aadhaar Length
abcdefgh123	❌ Invalid Aadhaar
⚠️ Important Note

This project performs client-side validation.

Passing validation does not prove that:

A PAN number actually exists
An Aadhaar number actually exists
The number belongs to the person entering it
The PAN/Aadhaar is currently active

Actual identity verification requires appropriate authorized or official verification mechanisms.

🔒 Privacy

This project does not require a database or backend.

The entered information is processed locally in the browser by JavaScript.

For a real-world application handling sensitive identity information, additional security, privacy, and data-protection measures would be required.

🔮 Future Improvements

Possible improvements include:

Backend validation
OTP verification
API-based verification through authorized services
Better accessibility
CAPTCHA
Rate limiting
Secure backend integration
Unit testing
Automated testing using Jest
Improved responsive design
👨‍💻 Author

Your Name

GitHub: https://github.com/vedmistry1332-ctrl


