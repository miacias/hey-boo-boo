const foodBtn = document.querySelector('#add-food-btn');


//grab new food name from input for server to add a new food
const createFood = async (event) => {
    event.preventDefault();

    // let url = window.location.href;
    // let currentPicnicId = url.slice(-36);

    const inputItem = document.querySelector('#new-food-name');
    const newItem = {
        name: inputItem.value.trim()
    }

    if (!newItem) {
        alert('You must enter an item name to add it. Please try again.')
    } else {
        // console.log(newItem);
        const response = await fetch('/api/edit-picnic/add-food', {
            body: {
                name: JSON.stringify(newItem),
            },
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            // console.log(response.ok);
            location.reload();
        } else {
            alert('Error: Please try again.');
        }
    };
};


foodBtn.addEventListener("click", createFood);
