"use strict";

const form = document.getElementById("validationForm");

const mobileInput = document.getElementById("mobile");
const panInput = document.getElementById("pan");
const aadhaarInput = document.getElementById("aadhaar");

const mobileError = document.getElementById("mobileError");
const panError = document.getElementById("panError");
const aadhaarError = document.getElementById("aadhaarError");

const successMessage = document.getElementById("successMessage");

// Indian mobile number
// First digit must be 6, 7, 8 or 9
const mobileRegex = /^[6-9][0-9]{9}$/;

// PAN structure
// 5 letters + 4 digits + 1 letter
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// Aadhaar must contain exactly 12 digits
const aadhaarRegex = /^[0-9]{12}$/;

/* =====================================================
   UTILITY FUNCTIONS
===================================================== */

function setValid(input, errorElement) {

    input.classList.remove("invalid");

    input.classList.add("valid");

    errorElement.textContent = "";
}

function setInvalid(input, errorElement, message) {

    input.classList.remove("valid");

    input.classList.add("invalid");

    errorElement.textContent = message;
}

function clearValidation(input, errorElement) {

    input.classList.remove("valid");
    input.classList.remove("invalid");

    errorElement.textContent = "";
}

function validateMobile() {

    let mobile = mobileInput.value.trim();

    // Empty check
    if (mobile === "") {

        setInvalid(
            mobileInput,
            mobileError,
            "Mobile number is required."
        );
        return false;
    }

    // Only digits
    if (!/^[0-9]+$/.test(mobile)) {

        setInvalid(
            mobileInput,
            mobileError,
            "Mobile number must contain only digits."
        );
        return false;
    }

    // Exactly 10 digits
    if (mobile.length !== 10) {

        setInvalid(
            mobileInput,
            mobileError,
            "Mobile number must contain exactly 10 digits."
        );
        return false;
    }

    // First digit 6-9
    if (!/^[6-9]/.test(mobile)) {

        setInvalid(
            mobileInput,
            mobileError,
            "Mobile number must start with 6, 7, 8 or 9."
        );
        return false;
    }

    // Reject same digit repeated 10 times
    if (/^(\d)\1{9}$/.test(mobile)) {

        setInvalid(
            mobileInput,
            mobileError,
            "This is not a valid mobile number."
        );
        return false;
    }

    // Valid
    setValid(mobileInput, mobileError);
    return true;
}

function validatePAN() {

    // Convert automatically to uppercase
    panInput.value = panInput.value.toUpperCase();

    let pan = panInput.value.trim();

    // Empty
    if (pan === "") {

        setInvalid(
            panInput,
            panError,
            "PAN number is required."
        );
        return false;
    }

    // Exactly 10 characters
    if (pan.length !== 10) {

        setInvalid(
            panInput,
            panError,
            "PAN must contain exactly 10 characters."
        );
        return false;
    }

    // Basic PAN structure
    if (!panRegex.test(pan)) {

        setInvalid(
            panInput,
            panError,
            "Format must be ABCDE1234F."
        );
        return false;
    }

    // First 5 characters must be letters
    if (!/^[A-Z]{5}/.test(pan)) {

        setInvalid(
            panInput,
            panError,
            "First 5 characters must be letters."
        );
        return false;
    }

    // Characters 6-9 must be digits
    if (!/^[A-Z]{5}[0-9]{4}/.test(pan)) {

        setInvalid(
            panInput,
            panError,
            "Characters 6-9 must be digits."
        );
        return false;
    }

    // Last character must be a letter
    if (!/[A-Z]$/.test(pan)) {

        setInvalid(
            panInput,
            panError,
            "Last character must be a letter."
        );
        return false;
    }

    setValid(panInput, panError);
    return true;
}

/* =====================================================
   AADHAAR VERHOEFF CHECKSUM
===================================================== */

const multiplicationTable = [

    [0,1,2,3,4,5,6,7,8,9],

    [1,2,3,4,0,6,7,8,9,5],

    [2,3,4,0,1,7,8,9,5,6],

    [3,4,0,1,2,8,9,5,6,7],

    [4,0,1,2,3,9,5,6,7,8],

    [5,9,8,7,6,0,4,3,2,1],

    [6,5,9,8,7,1,0,4,3,2],

    [7,6,5,9,8,2,1,0,4,3],

    [8,7,6,5,9,3,2,1,0,4],

    [9,8,7,6,5,4,3,2,1,0]
];

const permutationTable = [

    [0,1,2,3,4,5,6,7,8,9],

    [1,5,7,6,2,8,3,0,9,4],

    [5,8,0,3,7,9,6,1,4,2],

    [8,9,1,6,0,4,3,5,2,7],

    [9,4,5,3,1,2,6,8,7,0],

    [4,2,8,6,5,7,3,9,0,1],

    [2,7,9,3,8,0,6,4,1,5],

    [7,0,4,6,9,1,3,2,5,8]
];

const inverseTable = [
    0,4,3,2,1,5,6,7,8,9
];

function validateVerhoeff(number) {

    let checksum = 0;

    let digits = number
        .split("")
        .reverse()
        .map(Number);


    for (let i = 0; i < digits.length; i++) {

        checksum =
            multiplicationTable[checksum]
            [permutationTable[i % 8][digits[i]]];
    }
    return checksum === 0;
}

function validateAadhaar() {

    let aadhaar = aadhaarInput.value.trim();

    // Empty
    if (aadhaar === "") {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "Aadhaar number is required."
        );
        return false;
    }
    // Only digits
    if (!/^[0-9]+$/.test(aadhaar)) {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "Aadhaar must contain only digits."
        );
        return false;
    }
    // Exactly 12 digits
    if (aadhaar.length !== 12) {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "Aadhaar must contain exactly 12 digits."
        );
        return false;
    }
    // Aadhaar cannot start with 0 or 1
    if (/^[01]/.test(aadhaar)) {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "Aadhaar cannot start with 0 or 1."
        );
        return false;
    }

    // Reject all same digits
    if (/^(\d)\1{11}$/.test(aadhaar)) {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "This is not a valid Aadhaar number."
        );
        return false;
    }

    // Verhoeff checksum
    if (!validateVerhoeff(aadhaar)) {

        setInvalid(
            aadhaarInput,
            aadhaarError,
            "Invalid Aadhaar checksum."
        );
        return false;
    }

    setValid(aadhaarInput, aadhaarError);
    return true;
}

// Mobile: allow only digits
mobileInput.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 10);

    validateMobile();

    successMessage.textContent = "";
});

// PAN: allow only letters and numbers
panInput.addEventListener("input", function () {

    this.value = this.value
        .replace(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 10);

    validatePAN();

    successMessage.textContent = "";
});

// Aadhaar: allow only digits
aadhaarInput.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .slice(0, 12);

    validateAadhaar();

    successMessage.textContent = "";
});

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const mobileValid = validateMobile();

    const panValid = validatePAN();

    const aadhaarValid = validateAadhaar();

    // Stop if any field is invalid
    if (!mobileValid || !panValid || !aadhaarValid) {

        successMessage.textContent = "";
        return;
    }

    // Everything is valid
    successMessage.textContent =
        "✓ All details passed validation successfully.";
});