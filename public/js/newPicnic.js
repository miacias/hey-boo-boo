const createBtn = document.querySelector('.create-picnic');
const joinBtn = document.querySelector('.join-picnic');

const createPicnic = (event) => {
    event.preventDefault();
    const newPicnic = {
        newName: document.querySelector('#new-picnic-name').value.trim(),
        newAddress: document.querySelector('#new-picnic-address').value.trim(),
        newDate: document.querySelector('#new-picnic-date').value.trim(),
        newTime: document.querySelector('#new-picnic-time').value.trim(),
        newPassword: document.querySelector('#new-picnic-password').value.trim(),
        passCheck: document.querySelector('#new-picnic-password-check').value.trim()
    }
    if (newPicnic.newPassword.length < 8) {
        
        return;
    }
};

const joinPicnic = (event) => {
    event.preventDefault();

};

createBtn.addEventListener('click', createPicnic);
joinBtn.addEventListener('click', joinPicnic);