const createBtn = document.querySelector('.create-picnic');
const joinBtn = document.querySelector('.join-picnic');


// collects user data and sends to server to create a new picnic
const createPicnic = async (event) => {
    event.preventDefault();
    const newPicnic = {
        newName: document.querySelector('#new-picnic-name').value.trim(),
        newAddress: document.querySelector('#new-picnic-address').value.trim(),
        newDate: document.querySelector('#new-picnic-date').value.trim(),
        newTime: document.querySelector('#new-picnic-time').value.trim(),
        newPassword: document.querySelector('#new-picnic-password').value.trim(),
        passCheck: document.querySelector('#new-picnic-password-check').value.trim()
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
    const response = await fetch('/api/new-picnic/create', {
        body: JSON.stringify(newPicnic),
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/my-picnics');
        // document.location.replace(`${/*the new picnic name*/}`);
    } else {
        alert('Failed to create event. Please try again.');
    }
};

// collects user data and sends to server to join an existing picnic
const joinPicnic = (event) => {
    event.preventDefault();

};

// autocomplete for addresses
window.onload = function () {
    // var input = document.getElementById('new-picnic-address');
    let input = document.getElementById('pac-input');
    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
        types: ["street_address"],
    };
    let autocomplete = new google.maps.places.Autocomplete(input, options);
    // listens to form
    google.maps.event.addEventListener(autocomplete, 'place_changed', function () {
        const near_place = autocomplete.getPlace();
    })
}

createBtn.addEventListener('click', createPicnic);
joinBtn.addEventListener('click', joinPicnic);