
// all invite buttons
const inviteBtn = document.querySelectorAll(".invite-link");


var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList =  popoverTriggerList.map(function (element) {
    return new bootstrap.Popover(element);
});


// const exampleEl = document.getElementById('example')
// const popover = new bootstrap.Popover(exampleEl, options)

// copies invite code to clipboard, displays in popover
const copyLink = (event) => {
    event.preventDefault();
    // Get the invite link
    const inviteLink = event.currentTarget.getAttribute('id');
    // Copy the text inside the text field
    navigator.clipboard.writeText(inviteLink);

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = inviteBtn.map(function (element) {
        return new bootstrap.Popover(element);
});

    // Alert the copied text
    // alert("Copied the text: " + inviteLink);
};

inviteBtn.forEach(button => button.addEventListener('click', copyLink));