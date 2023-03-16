// Google Maps API handles address input autocompletion
function initAutocomplete() {
    // user form input
    const input = document.getElementById("new-picnic-address");
    // filters by street addresses
    const options = {
        fields: ["formatted_address", "geometry", "name"],
        strictBounds: false,
    };
    // initializes with user input and pre-set options
    const autocomplete = new google.maps.places.Autocomplete(
        input,
        options
    );
};