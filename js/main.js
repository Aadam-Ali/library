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
popupForm.style.display = 'none';

const closePopupBtn = document.querySelector('.js-close-popup');
closePopupBtn.addEventListener('click', closePopup);

function openPopup() {
    popupForm.style.display = 'block';
};


function addBook() {
    title = document.getElementById('title').value
    author = document.getElementById('author').value
    pages = document.getElementById('pages').value
    readStatus = document.getElementById('read-status').checked

    if (title == '' || author == '' || pages == ''){return}
    
    let newBook = new book(title, author, pages, readStatus)
    myLibrary.push(newBook);
    storeLibrary();
    populateContainer();
};


function storeLibrary() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};


function createBook(e) {
    const container = document.querySelector('.container');
    const bookContainer = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn =  document.createElement('button');

    bookContainer.classList.add('book-container');
    bookContainer.setAttribute('id', myLibrary.indexOf(e));

    titleDiv.textContent = e.title;
    titleDiv.classList.add('title');
    bookContainer.appendChild(titleDiv);

    authorDiv.textContent = e.author;
    authorDiv.classList.add('author');
    bookContainer.appendChild(authorDiv);

    pagesDiv.textContent = e.pages;
    pagesDiv.classList.add('pages');
    bookContainer.appendChild(pagesDiv);

    readBtn.classList.add('read-button');
    bookContainer.appendChild(readBtn);

    if (e.readStatus === false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#dd7777';
    } else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#77dd77';
    }

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-button');
    bookContainer.appendChild(removeBtn);

    container.appendChild(bookContainer);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(e), 1);
        storeLibrary();
        populateContainer();
    });

    readBtn.addEventListener('click', () => { 
        e.readStatus = !e.readStatus;
        storeLibrary(); 
        populateContainer();
    }); 

};


function closePopup() {
    popupForm.style.display = 'none';
};


function populateContainer() {
    const container = document.querySelector('.container');
    container.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    };
};


function retrieveLibrary () {
    if(!localStorage.myLibrary) {
        populateContainer();
    } else {
        let books = localStorage.getItem('myLibrary');
        books = JSON.parse(books);
        myLibrary = books;
        populateContainer();
    };
};

retrieveLibrary();