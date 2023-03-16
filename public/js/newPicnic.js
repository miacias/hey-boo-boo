// const createBtn = document.querySelector('.create-picnic');
const createBtn = document.querySelector('.create-picnic');
const joinBtn = document.querySelector('.join-picnic');

// collects user data and sends to server to create a new picnic
const createPicnic = async (event) => {
    event.preventDefault();
    // defines document form elements
    const formElements = document.querySelector('.new-picnic-form').elements;
    const [newName, newAddress, newTime, newPassword, passCheck] = formElements;
    // collects user data
    const newPicnic = {
        event_name: newName.value.trim(),
        address: newAddress.value.trim(),
        start_time: newTime.value.trim(),
        password: newPassword.value.trim(),
        passCheck: passCheck.value.trim()
    };
    // verifies user typed password correctly
    if (newPicnic.password === newPicnic.passCheck) {
        const response = await fetch('/api/new-picnic/create', {
            body: JSON.stringify(newPicnic),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            await document.location.replace('/my-picnics');
        } else {
            alert('Failed to create event. Please try again.');
        }

    } else {
        alert('Passwords must match.');
    }
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
const joinPicnic = (event) => {
    event.preventDefault();

};

createBtn.addEventListener("click", createPicnic);
joinBtn.addEventListener("click", joinPicnic);