// all invite buttons
const inviteBtn = document.querySelectorAll(".invite-link");

// enables Popper-Bootstrap popper
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
var popoverList = popoverTriggerList.map(function (element) {
    return new bootstrap.Popover(element, {
        trigger: 'focus'
      });
});

// copies invite code to clipboard, displays in popover
const copyLink = (event) => {
    event.preventDefault();
    // Get the invite link
    const inviteLink = event.currentTarget.getAttribute('id');
    // Copy the text inside the text field
    navigator.clipboard.writeText(`${window.location.origin}/api/new-picnic/join/${inviteLink}`);
};

inviteBtn.forEach(button => button.addEventListener('click', copyLink));