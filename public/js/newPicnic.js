const createBtn = document.querySelector('.create-picnic');
const joinBtn = document.querySelector('.join-picnic');

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
    // verifies user typed password correctly and completed form
    if (
        newPicnic.password === newPicnic.passCheck
        && newPicnic.event_name
        && newPicnic.address
        && newPicnic.start_time
        && newPicnic.password
        && newPicnic.passCheck
    ) {
        // send data to server
        const response = await fetch('/api/new-picnic/create', {
            body: JSON.stringify(newPicnic),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/my-picnics');
        } else {
            alert('Failed to create event. Please try again.');
        }
    } else {
        alert('Issue: Form is missing fields or passwords do not match.');
    };
    // const modal = document.querySelector('.modal-container');
    // const closeModal = document.querySelector('.close-pass-check');
    // if (newPicnic.newPassword.length < 8) {
    //     // document.querySelector('.modal').showModal();
    //     modal.style.visibility = 'visible';
    //     closeModal.addEventListener('click', () => {
    //         closeModal.style.visibility = 'hidden';
    //     });
    //     window.addEventListener('click', (event) => {
    //         if (event.target == modal) {
    //             modal.style.visibility = 'hidden';
    //         }
    //     })
    //     return;
    // } else {
    //     modal.style.visibility = 'hidden';
    // }
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
    if (picnicData.id && picnicData.password) {
        // send data to server
        const response = await fetch('/api/new-picnic/join', {
            body: JSON.stringify(picnicData),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/my-picnics');
        } else {
            alert('Failed to join event. Please try again.');
        }
    };
};

createBtn.addEventListener("click", createPicnic);
joinBtn.addEventListener("click", joinPicnic);