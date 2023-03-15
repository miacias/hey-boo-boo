const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');


async function handleSignup(event) {
  event.preventDefault();
  // collects user data
  const userNameValue = document.querySelector('#username-signup').value.trim();
  const passwordValue = document.querySelector('#password-signup').value.trim();
  const emailValue = document.querySelector('#email-signup').value.trim();

  const newUser = {
    username: userNameValue,
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
  if (response.ok) {
    await document.location.replace('/');
  } else {
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