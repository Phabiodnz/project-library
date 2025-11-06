const libraryContainer = document.querySelector(".library-container");
const myLibrary = [];

function Book(title,author,pages,status){
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = crypto.randomUUID();

    this.bookInfo = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages (${this.situation})`;
    };
}

function addBookToLibrary(book) {
    if (!(book instanceof Book)) {
        throw new Error("Only Book instances can be added to the library");
    }
    myLibrary.push(book);
}

function displayLibrary(){
    myLibrary.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book-card");

        // title
        const bookTitle = document.createElement("p");
        bookTitle.classList.add("book-title");
        bookTitle.textContent = book.title;
        bookDiv.appendChild(bookTitle);

        // author
        const bookAuthor = document.createElement("p");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent = book.author;
        bookDiv.appendChild(bookAuthor);

        // pages
        const bookPages = document.createElement("p");
        bookPages.classList.add("book-pages");
        bookPages.textContent = book.pages;
        bookDiv.appendChild(bookPages);

        // status
        const bookStatus = document.createElement("p");
        bookStatus.classList.add("book-status");
        bookStatus.textContent = book.situation;
        bookDiv.appendChild(bookStatus);

        // id
        const bookId = document.createElement("p");
        bookId.classList.add("book-id");
        bookId.textContent = book.id;
        bookDiv.appendChild(bookId);

        libraryContainer.appendChild(bookDiv);
    });
}

const book1 = new Book("The Silent Ocean", "Maria Lopes", 250, "reading");
const book2 = new Book("Into the Code", "Arthur Mendes", 180, "finished");
const book3 = new Book("Echoes of Tomorrow", "Lívia Souza", 320, "not read yet");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

displayLibrary();