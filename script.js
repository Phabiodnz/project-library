//Universal Constants
const myLibrary = [];
const libraryContainer = document.querySelector(".library-container");

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

        const bookTitle = document.createElement("p");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;
        bookDiv.appendChild(bookTitle);

        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = book.author;
        bookDiv.appendChild(bookAuthor);

        const bookPages = document.createElement("p");
        bookPages.classList.add("book-pages");
        bookPages.textContent = `${book.pages} pages`;
        bookDiv.appendChild(bookPages);

        const bookStatus = document.createElement("p");
        bookStatus.classList.add("book-status");
        bookStatus.textContent = book.status;
        bookDiv.appendChild(bookStatus);

        const bookId = document.createElement("p");
        bookId.classList.add("book-id");
        bookId.textContent = `ID: ${book.id}`;
        bookDiv.appendChild(bookId);

        libraryContainer.appendChild(bookDiv);
    });
}

const book1 = new Book("The Silent Ocean", "Maria Lopes", 250, "read");
const book2 = new Book("Into the Code", "Arthur Mendes", 180, "not read yet");
const book3 = new Book("Echoes of Tomorrow", "Lívia Souza", 320, "not read yet");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayLibrary();