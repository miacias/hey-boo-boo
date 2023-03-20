const foodBtn = document.querySelector('#add-food-btn');


//grab new food name from input for server to add a new food
const createFood = async (event) => {
    event.preventDefault();
    // food name
    const inputItem = document.querySelector('#new-food-name');
    // picnicUser ID
    const picnicUId = inputItem.dataset.myPicnicUserId;
    // combined data
    const addFoodData = {
        name: inputItem.value.trim(),
        picnicUserId: picnicUId
    };
    // verifies user data
    if (!addFoodData.name) {
        alert('Food name required. Please try again.');
    } else {
        const response = await fetch('/api/edit-picnic/add-food', {
            body: JSON.stringify(addFoodData),
            method: 'POST',
            headers: { 'content-type': 'application/json' }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Error. Please try again.');
        }
    };
    // refreshes page to show updated values
    location.reload();
};


foodBtn.addEventListener("click", createFood);