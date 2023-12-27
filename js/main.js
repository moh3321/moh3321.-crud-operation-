var ProductName = document.getElementById("ProductName");
var ProductPrice = document.getElementById("ProductPrice");
var ProductCat = document.getElementById("ProductCat");
var ProductDesc = document.getElementById("ProductDesc");
var myBody = document.getElementById("myBody");
var myBtn = document.getElementById("myBtn");
var searchInput = document.getElementById("searchInput");
var error = document.getElementById("error");

var ProductList;
var updateIndex;

if (localStorage.getItem("ProductList")) {
   ProductList = JSON.parse(localStorage.getItem("ProductList"));
   displayproduct(ProductList);
} else {
   ProductList = [];
}

function getProduct() {
   if (myBtn.innerHTML === "Add Product") {
      if (ProductNameValidation() && ProductPriceValidation() && ProductCatValidation() && ProductDescValidation()) {
         var Product = {
            name: ProductName.value,
            Price: ProductPrice.value,
            Cat: ProductCat.value,
            desc: ProductDesc.value
         };
         ProductList.push(Product);
      } else {
         console.log("Validation error");
         // You can add more detailed error handling or user feedback here
         return;
      }
   } else if (myBtn.innerHTML === "Update Product") {
      if (ProductNameValidation() && ProductPriceValidation() && ProductCatValidation() && ProductDescValidation()) {
         ProductList[updateIndex].name = ProductName.value;
         ProductList[updateIndex].Price = ProductPrice.value;
         ProductList[updateIndex].Cat = ProductCat.value;
         ProductList[updateIndex].desc = ProductDesc.value;
         myBtn.innerHTML = "Add Product";
      } else {
         console.log("Validation error");
         // You can add more detailed error handling or user feedback here
         return;
      }
   }
   saveToLocalstorage();
   clearInputs();
   displayproduct(ProductList);
}

function displayproduct(plist, searchTerm) {
   if (plist.length === 0) {
      myBody.innerHTML = `<tr>
         <td colspan="7">
            <div class="alert alert-danger">No match found </div>
         </td>
      </tr>`;
   } else {
      var cartoona = "";
      for (var i = 0; i < plist.length; i++) {
         cartoona += `
         <tr>
            <td>${i + 1}</td>
            <td>${searchTerm ? plist[i].name.toLowerCase().replace(searchTerm, `<span class="text-warning fw-bolder ">${searchTerm}</span>`) : plist[i].name}</td>
            <td>${plist[i].Price}</td>
            <td>${plist[i].Cat}</td>
            <td>${plist[i].desc}</td>
            <td><button onclick="updateproduct(${i})" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="deleteproduct(${i})" class="btn btn-outline-danger">Delete</button></td>
         </tr>`;
      }
      myBody.innerHTML = cartoona;
   }
}

// function to clear inputs
function clearInputs() {
   ProductName.value = "";
   ProductPrice.value = "";
   ProductCat.value = "";
   ProductDesc.value = "";
}

// function to delete Product
function deleteproduct(index) {
   ProductList.splice(index, 1);
   saveToLocalstorage();
   displayproduct(ProductList);
}

// function to save in local Storage
function saveToLocalstorage() {
   localStorage.setItem("ProductList", JSON.stringify(ProductList));
}

// function to update product
function updateproduct(index) {
   updateIndex = index;
   ProductName.value = ProductList[index].name;
   ProductPrice.value = ProductList[index].Price;
   ProductCat.value = ProductList[index].Cat;
   ProductDesc.value = ProductList[index].desc;
   myBtn.innerHTML = "Update Product";
}

// function to search
function searchProduct() {
   var term = searchInput.value.toLowerCase();
   var searchlist = [];
   for (var i = 0; i < ProductList.length; i++) {
      if (ProductList[i].name.toLowerCase().includes(term)) {
         searchlist.push(ProductList[i]);
      }
   }
   displayproduct(searchlist, term);
}

function ProductNameValidation() {
   var regex = /^[A-Za-z][a-zA-Z0-9\s]{0,249}$/;
   console.log(regex.test(ProductName.value));
   if (regex.test(ProductName.value)) {
      error.classList.replace("d-block", "d-none");
      ProductName.classList.add("is-valid");
      ProductName.classList.remove("is-invalid");
      return true;
   } else {
      error.classList.replace("d-none", "d-block");
      ProductName.classList.add("is-invalid");
      ProductName.classList.remove("is-valid");
      return false;
   }
}

function ProductPriceValidation() {
   var regex = /^(1000|10000|[1-9]\d{3})$/;
   console.log(regex.test(ProductPrice.value));
   if (regex.test(ProductPrice.value)) {
      error.classList.replace("d-block", "d-none");
      ProductPrice.classList.add("is-valid");
      ProductPrice.classList.remove("is-invalid");
      return true;
   } else {
      error.classList.replace("d-none", "d-block");
      ProductPrice.classList.add("is-invalid");
      ProductPrice.classList.remove("is-valid");
      return false;
   }
}

function ProductCatValidation() {
   var regex = /^(Mobile|Screen|Watch)$/i;
   console.log(regex.test(ProductCat.value));
   if (regex.test(ProductCat.value)) {
      error.classList.replace("d-block", "d-none");
      ProductCat.classList.add("is-valid");
      ProductCat.classList.remove("is-invalid");
      return true;
   } else {
      error.classList.replace("d-none", "d-block");
      ProductCat.classList.add("is-invalid");
      ProductCat.classList.remove("is-valid");
      return false;
   }
}

function ProductDescValidation() {
   var regex = /^[A-Za-z][a-zA-Z0-9\s]{0,249}$/;
   console.log(regex.test(ProductDesc.value));
   if (regex.test(ProductDesc.value)) {
      error.classList.replace("d-block", "d-none");
      ProductDesc.classList.add("is-valid");
      ProductDesc.classList.remove("is-invalid");
      return true;
   } else {
      error.classList.replace("d-none", "d-block");
      ProductDesc.classList.add("is-invalid");
      ProductDesc.classList.remove("is-valid");
      return false;
   }
}
