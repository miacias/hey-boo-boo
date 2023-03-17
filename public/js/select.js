const add = document.querySelectorAll(".addme");

add.forEach((picnic)=>{
picnic.addEventListener("click", (event) => {
  console.log(event.currenTarget);
  const id = event.target.getAttribute("data");
  console.log(id);
  console.log("clicked");
  const data = { id };
  console.log(data);
  
  window.open(`${window.location.origin}/api/goog/token/${id}`)
});
})
  

// this file takes care of grabbing the picnic ID that persists throughout the oAuth Processs.
