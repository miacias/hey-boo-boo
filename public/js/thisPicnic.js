const foodBtn = document.querySelector('#add-food-btn');


//grab new food name from input for server to add a new food
const createFood = async (event) => {
    event.preventDefault();

    const inputItem = document.querySelector('#new-food-name');
    const newFood = {
        name: inputItem.value.trim()
    }

    if (!newFood) {
        alert('You must enter an item name to add it. Please try again.')
    } else {
        // console.log(newFood);
        const response = await fetch('/api/edit-picnic/add-food', {
            body: JSON.stringify(newFood),
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
