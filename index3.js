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
let clearSearch = document.querySelector(".search-btn");
clearSearch.addEventListener("click",()=>{
    window.localStorage.removeItem()
})
