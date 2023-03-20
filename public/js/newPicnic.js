// queries for form inputs
const createBtn = document.querySelector('.create-picnic');
const joinBtn = document.querySelector('#join-picnic');
const closeModals = document.querySelector(".close");

// displays modals
const showModal = async (modalId) => {
    let thisModal = document.querySelector(`#${modalId}`);
    $(thisModal).modal('show');
};

// // hides modals
// const hideModal = async (event) => {
//     event.preventDefault();
//     let thisModal = event.currentTarget;
//     $(thisModal).modal('hide');
// };

// collects user data and sends to server to create a new picnic
const createPicnic = async (event) => {
    event.preventDefault();
    // defines document form elements
    const formElements = document.querySelector('.create-picnic-form').elements;
    const [newName, newAddress, newTime, newPassword, passCheck] = formElements;
    // collects user data
    const newPicnic = {
        event_name: newName.value.trim(),
        address: newAddress.value.trim(),
        start_time: newTime.value.trim(),
        password: newPassword.value.trim(),
        passCheck: passCheck.value.trim()
    };
    // verifies user completed form
    if (!newPicnic.event_name
        || !newPicnic.address
        || !newPicnic.start_time
        || !newPicnic.password
        || !newPicnic.passCheck
    ) {
        const modalId = 'missing-modal';
        return showModal(modalId);
    }
    // verifies user typed password correctly
    if (newPicnic.password !== newPicnic.passCheck) {
        const modalId = 'password-modal';
        return showModal(modalId);
    }
    // sends data to server
    const response = await fetch('/api/new-picnic/create', {
        body: JSON.stringify(newPicnic),
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    if (response.ok) {
        return document.location.replace('/my-picnics');
    } else {
        const modalId = 'failed-create-modal';
        return showModal(modalId);
    }
};

// collects user data and sends to server to join an existing picnic
const joinPicnic = async (event) => {
    event.preventDefault();
    // defines document form elements
    const formElements = document.querySelector('.join-picnic-form').elements;
    const [joinCode, joinPassword] = formElements;
    // collects user data
    const picnicData = {
        id: joinCode.value.trim(),
        password: joinPassword.value.trim()
    };
    // verifies user completed form
    if (!picnicData.id || !picnicData.password) {
        const modalId = 'missing-modal';
        return showModal(modalId);
    }
    // send data to server
    const response = await fetch('/api/new-picnic/join', {
        body: JSON.stringify(picnicData),
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    if (response.ok) {
        document.location.replace('/my-picnics');
    } else {
        const modalId = 'join-modal';
        return showModal(modalId);
    }
};

// listens to forms
createBtn.addEventListener("click", createPicnic);
joinBtn.addEventListener("click", joinPicnic);