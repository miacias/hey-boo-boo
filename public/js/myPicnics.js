const inviteBtn = document.querySelector(".invite-link");

const copyLink = () => {
    // Get the invite link
    const inviteLink = inviteBtn.id;

    // Copy the text inside the text field
    navigator.clipboard.writeText(inviteLink);

    // Alert the copied text
    alert("Copied the text: " + inviteLink);
};

inviteBtn.addEventListener('click', copyLink);