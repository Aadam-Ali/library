let myLibrary = [];

function book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
};

const newBookBtn = document.querySelector('.js-new-book-button');
newBookBtn.addEventListener('click', openPopup);

const addBookBtn = document.querySelector('.js-add-book-button');
addBookBtn.addEventListener('click', addBook);

const popupForm = document.querySelector('.js-popup');
popupForm.style.display = 'none'

const closePopupBtn = document.querySelector('.js-close-popup')
closePopupBtn.addEventListener('click', closePopup)

function openPopup() {
    popupForm.style.display = 'block'
};



function addBook() {
    let newBook;
    title = document.getElementById('title').value
    author = document.getElementById('author').value
    pages = document.getElementById('pages').value
    readStatus = document.getElementById('read-status').value
    newBook = new book(title, author, pages, readStatus)
    myLibrary.push(newBook);
    storeLibrary()
    closePopup()
};

function closePopup() {
    popupForm.style.display = 'none'
}

function storeLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

function retrieveLibrary () {
    if (!localStorage.myLibrary) {

    } else {
        let books = localStorage.getItem('myLibrary');
        books = JSON.parse(books);
        myLibrary = books;
    };
};

retrieveLibrary();