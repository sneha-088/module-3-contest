// const form = document.querySelector('form'); 
const search = document.querySelector('.search-btn');
const results = document.querySelector('#results');
const input = document.querySelector("#search");
const bookResult = document.querySelector(".bookResult");
search.addEventListener('click', () => {
let addsearchresult = [];
localStorage.getItem("SearchHistory") ? showdata = JSON.parse(localStorage.getItem("SearchHistory")) : [];
localStorage.getItem("SearchHistory") ? addsearchresult = JSON.parse(localStorage.getItem("SearchHistory")) : [];
 const date = new Date();
 const history = {
     time : date.toTimeString(),
     date : date.toDateString(),
     name : input.value
    };
  const data = {
    
  }
  //   event.preventDefault();
  const userinput = input.value;
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
          bookResult.innerHTML = `<div class="myBookResult">Book Result For ${input.value}</div>`
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

      addsearchresult.push(history);
      localStorage.setItem("ShowHistory",JSON.stringify(showdata));
      localStorage.setItem("SearchHistory",JSON.stringify(addsearchresult));
    })
    .catch(error => console.error(error));
});
