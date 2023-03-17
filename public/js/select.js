console.log("connected");

const add = document.querySelector(".addme");

add.addEventListener("click", (event) => {
  console.log(event.target);
  const id = event.target.getAttribute("data");
  console.log(id);
  console.log("clicked");
  const data = { id };
  console.log(data);
  
  window.open(`${window.location.origin}/api/goog/token/${id}`)
});
