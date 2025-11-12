//Universal Variables/Constants
let myLibrary = [];
const libraryContainer = document.querySelector(".library-container");

//Book Constructor
function Book(title,author,pages,status){
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();
}

//Add Book Variables/Constants
const showBookFormBtn = document.getElementById("show-form-button");
const closeBookFormBtn = document.getElementById("close-form-button");
const dialog = document.getElementById("form-dialog-popup");
const form = document.querySelector("form");

//Open the dialog to add a new book
showBookFormBtn.addEventListener("click", () => {
  dialog.showModal();
});

//Closes the dialog 
closeBookFormBtn.addEventListener("click", () => {
    dialog.close();
})

//Form submition/creation of a new book object
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTitle = document.getElementById("new-book-title").value;
  const newAuthor = document.getElementById("new-book-author").value;
  const newPages = parseInt(document.getElementById("new-book-pages").value) || 0;
  const newStatus = document.getElementById("new-book-status").checked ? "READ" : "NOT READ";

  const newBook = new Book(newTitle, newAuthor, newPages, newStatus);
  addBookToLibrary(newBook);
  displayLibrary();
  form.reset();
});

//Adds a book to the library
function addBookToLibrary(book) {
    if (!(book instanceof Book)) {
        throw new Error("Only Book instances can be added to the library");
    }
    myLibrary.push(book);
}

// Creates a card for each book in the library
function displayLibrary() {
  libraryContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");
    bookDiv.dataset.id = book.id;

    // DELETE button
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "REMOVE";
    deleteBookBtn.classList.add("delete-book-button");
    bookDiv.appendChild(deleteBookBtn);

    deleteBookBtn.addEventListener("click", () => {
      myLibrary = myLibrary.filter(b => b.id !== book.id);
      displayLibrary();
    });

    // CHANGE STATUS button
    const markBookBtn = document.createElement("button");
    markBookBtn.textContent = "CHANGE STATUS";
    markBookBtn.classList.add("mark-book-button");
    bookDiv.appendChild(markBookBtn);

    markBookBtn.addEventListener("click", () => {
      book.status = book.status === "READ" ? "NOT READ" : "READ";
      displayLibrary();
    });

    // Card Elements
    const bookTitle = document.createElement("p");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("p");
    bookPages.classList.add("book-pages");
    bookPages.textContent = `${book.pages} pages`;

    const bookStatus = document.createElement("p");
    bookStatus.classList.add("book-status");
    bookStatus.textContent = book.status;

    const bookId = document.createElement("p");
    bookId.classList.add("book-id");
    bookId.textContent = `ID: ${book.id}`;

    bookDiv.append(bookTitle, bookAuthor, bookPages, bookStatus, bookId);

    // append everything
    libraryContainer.appendChild(bookDiv);
  });
}

const book1 = new Book("The Silent Ocean", "Maria Lopes", 250, "read");
const book2 = new Book("Into the Code", "Arthur Mendes", 180, "not read yet");
const book3 = new Book("Echoes of Tomorrow", "Lívia Souza", 320, "not read yet");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

console.log(book3.id)

displayLibrary();