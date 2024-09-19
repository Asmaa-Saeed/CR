// get total
// create new product
// save new product in the local storage
// clear input
///////////////////////////////////////////
//read
//count
//delete
//update
//search
//clean data
///////////////////////////////////////////
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const create = document.getElementById("create");
const searchTitle = document.getElementById("searchTitle");
const searchCategory = document.getElementById("searchCategory");
let mood = "create";
let temp;
title.focus();
// console.log(title, price, taxes, ads, discount, total, count, category, create, searchTitle, searchCategory)

document.addEventListener("DOMContentLoaded", ()=> {
  
  const moon = document.querySelector(".moon");
  const sun = document.querySelector(".sun");
  const body = document.body;
  

  const lightState = localStorage.getItem("lightState");
  if(lightState){
    body.classList.add(lightState);
  }
  
  sun.addEventListener("click", () => {
    sun.classList.add("light-on");
    sun.style.display = "none ";
    body.classList.remove("light-off");
    moon.style.display = "block";
    localStorage.setItem("lightState", "light-on" )
  });
  moon.addEventListener("click", () => {
    moon.classList.remove("light-on");
    moon.style.display = "none";
    body.classList.add("light-off");
    sun.style.display = "block";
    localStorage.setItem("lightState", "light-off" )
  });
});



function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "red";
  } else {
    total.innerHTML = "";
    total.style.background = "cornflowerblue";
  }
}
getTotal();

// create product

// when we reload the page the data is still found
let dataPro;
if (localStorage.getItem("product") !== null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

create.onclick = function () {

  
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }
  

    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
      clearInput();
    }
     else {
      dataPro[temp] = newPro;
      mood = "create";
      create.innerHTML = "Create";
      count.style.display = "block";
    }
  
    localStorage.setItem("product", JSON.stringify(dataPro));
    console.log(newPro);
    showData();
  } 



/// clear input
function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  const deleteBtn = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    deleteBtn.innerHTML = `  <td><button onclick="deleteAll()">Delete All (${dataPro.length})</button></td>`;
  } else {
    deleteBtn.innerHTML = ` `;
  }
}

showData();

// delete data
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}

// delete all function
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// update function

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  create.innerHTML = "Update";
  mood = "update";
  temp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// search mode
let searchMode = "title";

function getSearchMode(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder =  `Search By ${searchMode}`;
  search.focus();
  search.value = '';
  showData();
}

function searchData(value) {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
  if (searchMode == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
      }
  }else {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
                </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}


//clean data
