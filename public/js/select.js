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
//   fetch(`/api/goog/token/${id}`, {
//     // body:JSON.stringify(data),
//     method: "GET",
//     redirect:'follow',
//     // headers: {
//     //   'Accept': `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8`,
//     //   "Accept-Encoding": "gzip, deflate, br",
//     //   "Accept-Language": "en-US,en",
//     //   'Connection': "keep-alive",
//     //   'Cookie':
//     //     "connect.sid=s%3AdEhOawFhHDoEZufGfaev3O-FqMP_tq5o.BPNgl8bOu4JH7AoAQDOkfxfIfio55kdU1roY2IDyBbc",
//     //   'Host': "localhost:3001",
//     // //   "sec-ch-ua": "Brave";v="111", "Not(A:Brand";v="8", "Chromium";v="111",
//     //   "sec-ch-ua-mobile": "?0",
//     //   "sec-ch-ua-platform": "Windows",
//     //   "Sec-Fetch-Dest": "document",
//     //   "Sec-Fetch-Mode": "navigate",
//     //   "Sec-Fetch-Site": "none",
//     //   "Sec-Fetch-User": "?1",
//     //   "Sec-GPC": "1",
//     //   "Upgrade-Insecure-Requests": "1",
//     //   "User-Agent": `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36`,
//     //   "content-type": "application/json",
//     // },
//   }).then((res) => {
//     console.log(res.url);
//     const win = window.open(res.url, '_blank');
//   win.focus();
//   });
});
