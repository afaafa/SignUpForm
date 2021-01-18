const fnameEl = document.querySelector('#fname');
const lnameEl = document.querySelector('#lname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#password');

const form =  document.querySelector('#formKontak');


const isRequired = value => value === '' ? false : true;

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const checkFname = () => {
    let valid = false;
    const fname = fnameEl.value.trim();

    if (!isRequired(fname)) {
        showError(fnameEl, 'First Name cannot be empty');
    } else {
        valid = true;
    }
    return valid;
};

const checkLname = () => {
    let valid = false;
    const lname = lnameEl.value.trim();

    if (!isRequired(lname)) {
        showError(lnameEl, 'Last Name cannot be empty');
    } else {
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be empty');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Look like this is not an email');
    }else {
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be empty');
    } else {
        valid = true;
    }
    return valid;
};

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isFnameValid = checkFname(),
        isLnameValid = checkLname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword();

    let isFormValid = isFnameValid &&
        isLnameValid && isEmailValid && isPasswordValid;

    if (isFormValid) {
        
    }
});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'fname':
            checkFname();
            break;
        case 'lname':
            checkLname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
    }
}));