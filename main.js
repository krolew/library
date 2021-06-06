const body = document.querySelector("body")
const button = document.querySelector("button")
const form = document.querySelector("form")
const btnCancel = document.querySelector(".btn-cancel");
const btnAdd = document.querySelector(".btn-add");
const container = document.querySelector(".container")
const table = document.querySelector("table")
const errorText = document.querySelectorAll("small");
let myLibrary = [];
if(getLibraryFromLocalStorage()!== null){
    let libraryArr = getLibraryFromLocalStorage()
    if(libraryArr.length !== 0){
        libraryArr.forEach((book) =>{
            addBookToLibrary(book.title, book.author, book.pages, book.isRead)
            createTableRow(book.title, book.author, book.pages, book.isRead)
        })
        deleteBook();
        changeCheckbox();
    }
}
//checkbox save when user changed it and reaload
function changeCheckbox(){
    const checkboxes = document.querySelectorAll(".isReadBox");
    checkboxes.forEach((checkbox)=>{
        checkbox.addEventListener("change", ()=>{
            let dataSetTitle = checkbox.dataset.title;
            let dataSetAuthor = checkbox.dataset.author;
            let dataSetPages = checkbox.dataset.pages;
            myLibrary.forEach((book)=>{
                if(book.pages === dataSetPages && book.author === dataSetAuthor && book.title == dataSetTitle){
                    book.isRead = checkbox.checked
                    addLibraryToLocalStorage();
                }
            })
        })
    })
}

function addBookToLibrary(title, author, pages, isRead){
    let book = {
        title: title,
        author: author,
        pages: pages,
        isRead: isRead
    }
    myLibrary.push(book);
}
function addLibraryToLocalStorage(){
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
}
function removeLibraryFromLocalStorage(){
    localStorage.removeItem("myLibrary");
}
function getLibraryFromLocalStorage(){
    return JSON.parse(localStorage.getItem("myLibrary"))
}
// clear all inputs of form
function clearInput(){
    document.querySelectorAll("input").forEach((inputValue)=>{
        inputValue.value = "";
    })
}
//change display elements
function changeDisplay(){
    form.style.display = "none";
    container.style.display = "flex";
    button.style.display = "block";
}
//Create a row of book
function createTableRow(title, author, pages, isRead){
    const tr = document.createElement("tr");
    const td0 = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    td0.textContent = title;
    td1.textContent = author;
    td2.textContent = pages;
    if(isRead){
        td3.innerHTML = `<input type="checkbox" data-title="${title}" data-author="${author}" data-pages="${pages}" class="isReadBox"  checked> `
    }else{
        td3.innerHTML = `<input type="checkbox" data-title="${title}" data-author="${author}" data-pages="${pages}" class="isReadBox" > `
    }
    td4.innerHTML = `<i class ="fa fa-trash" data-title="${title}" data-author="${author}" data-pages="${pages}" ></i>`
    tr.append(td0, td1, td2, td3, td4);
    table.append(tr);

}
// Cancel Form
btnCancel.addEventListener("click", ()=>{
   form.style.display = "none"
   button.style.display = "block";
   container.style.display = "flex"
   errorText[0].innerText = ""
   errorText[1].innerText = ""
   errorText[2].innerText = ""
   clearInput();
})
// Add book
let isRead = document.querySelector("#checkBox");
btnAdd.addEventListener("click", (e)=>{
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let isRead = document.querySelector(".formCheckBox").checked;
    const errorText = document.querySelectorAll("small");
    if(title.trim() === ""){
        errorText[0].innerText = "Fill the input"
    }else{
        errorText[0].innerText = ""
    }
    if(author.trim() === ""){
        errorText[1].innerText = "Fill the input"
    }else{
        errorText[1].innerText = ""
    }
    if(pages.trim() === "" || Number(pages)<0){
        errorText[2].innerText = "Fill the input with number"
    }else{
        errorText[2].innerText = ""
    }

    if(author.trim() !=="" && pages.trim()!== "" && title.trim() !== "" && pages >0)
    {
        addBookToLibrary(title, author, pages, isRead);
        clearInput();
        changeDisplay();
        createTableRow(title, author, pages, isRead)
        deleteBook();
        addLibraryToLocalStorage();
        changeCheckbox();
    }
})


// Delete book
function deleteBook(){
    const deleteIcons = document.querySelectorAll("i")
    deleteIcons.forEach((deleteIcon)=>{
        deleteIcon.addEventListener("click", ()=>{
            let dataSetTitle = deleteIcon.dataset.title;
            let dataSetAuthor = deleteIcon.dataset.author;
            let dataSetPages = deleteIcon.dataset.pages;
            deleteIcon.parentNode.parentNode.style.
            display = "none"
            myLibrary.forEach((book, index)=>{
                if(book.title == dataSetTitle &&  book.author == dataSetAuthor && book.pages == dataSetPages) {
                    myLibrary.splice(index,1);
                }
            })
            removeLibraryFromLocalStorage();
            addLibraryToLocalStorage();
        })
    })
}

//Show form
button.addEventListener("click",()=>{
   form.style.display = "flex";
   button.style.display = "none";
   container.style.display = "none";
})
