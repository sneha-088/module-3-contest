let items = JSON.parse(localStorage.getItem("SearchHistory"));

console.log(items);
let container = document.querySelector('.searchresult');
console.log(container);
let id =  document.querySelector(`id`);
for (let i = 0; i < items.length; i++) {
container.innerHTML += `<div class="useritem">
                        <div class="item">
                        <div class="id">
                            ${i+1}
                        </div>
                        <div class="bookname">
                            ${items[i].name}
                        </div>
                        </div>
                        <div class="userinput">
                        ${items[i].date}${items[i].time}
                        </div>
</div>
`
   
}
let useritem = [];
document.querySelectorAll('.useritem')?useritem = document.querySelectorAll('.useritem'):useritem=[];
useritem.forEach((element)=>{
   element.addEventListener("click",()=>{
    const input = element.querySelector(".bookname").innerText
    const results = document.querySelector('#results');
    const userinput = input;
    console.log(userinput);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${userinput}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        results.innerHTML = '';
        if (data.totalItems === 0) {
          results.innerHTML = '<p>No results found.</p>';
        } else {
          data.items.forEach(item => {
            const title = item.volumeInfo.title;
            const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown author';
            const description = item.volumeInfo.description ? item.volumeInfo.description.slice(0, 200) + '...' : 'No description available.';
            const image = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/128x192?text=No+image';
            const link = item.volumeInfo.infoLink;
            results.innerHTML += `
              <div class="book">
                <a href="${link}" target="_blank"><img src="${image}" alt="${title}"></a>
                <h2 class="title">${title}</h2>
                <p class="author">By ${author}</p>
                <p class="discription">${description}</p>
              </div>
            `;
          });
        }
  
      //   addsearchresult.push(history);
      //   localStorage.setItem("ShowHistory",JSON.stringify(showdata));
        // localStorage.setItem("SearchHistory",JSON.stringify(addsearchresult));
      })
      .catch(error => console.error(error));
   })
})

