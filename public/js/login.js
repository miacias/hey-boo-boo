// JS file for both login and signup functionality.

const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');

// allows new users to sign up
async function handleSignup(event) {
  event.preventDefault();
  // collects user data
  const firstNameValue = document.querySelector('#registerFirstName').value.trim();
  const lastNameValue = document.querySelector('#registerLastName').value.trim();
  const emailValue = document.querySelector('#registerEmail').value.trim();
  const passwordValue = document.querySelector('#registerPassword').value.trim();
  const repeatPassword = document.querySelector('#registerRepeatPassword').value.trim();
  // organizes user data
  const newUser = {
    firstName: firstNameValue,
    lastName: lastNameValue,
    email: emailValue,
    password: passwordValue,
  };
  const response = await fetch('/api/users/signup', {
    body: JSON.stringify(newUser),
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
  // security against user incorrectly typing new password
  if (passwordValue != repeatPassword) {
    alert("The passwords must match!")
    signupForm.reset();
  }
  if (response.ok) {
    document.location.replace('/');
  }
  else {
    alert('Failed to sign up. Please try again.');
  }
  signupForm.reset();
}

// allows user to log in
async function handleLogin(event) {
  event.preventDefault();
  // collects user data
  const emailValue = document.querySelector('#email-login').value.trim();
  const passwordValue = document.querySelector('#password-login').value.trim();
  // organizes user data
  const loginUser = {
    email: emailValue,
    password: passwordValue,
  };
  const response = await fetch('/api/users/login', {
    body: JSON.stringify(loginUser),
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  });
  if (response.ok) {
    await document.location.replace('/');
  } else {
    alert('Failed to log in. Please try again.');
  }
  loginForm.reset();
}

signupForm.addEventListener('submit', handleSignup);
loginForm.addEventListener('submit', handleLogin);