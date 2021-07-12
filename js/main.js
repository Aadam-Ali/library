let myLibrary = [];

class Book {
  constructor(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

$(".js-new-book-button").click(openPopup)
$(".js-close-popup").click(closePopup)
$(".js-add-book-button").click(addBook)

function openPopup() {
  $(".js-popup").css("display", "block");
}

function closePopup() {
  $(".js-popup").css("display", "none");
}

function addBook() {
  let title = $("#title").val();
  let author = $("#author").val();
  let pages = $("#pages").val();
  let readStatus = $("#read-status").is(":checked")

  if (title == "" || author == "" || pages == "") {
    return;
  }

  let newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
  storeLibrary();
  renderPage();
}

function deleteBook() {
  console.log($(this).attr("id").replace("remove", ""))
  myLibrary.splice(myLibrary[$(this).attr("id").replace("remove", "")], 1);
  storeLibrary();
  renderPage();
}

function readBook() {
  console.log($(this).attr("id").replace("read", ""))
  myLibrary[$(this).attr("id").replace("read", "")].readStatus = !myLibrary[$(this).attr("id").replace("read", "")].readStatus
  storeLibrary();
  renderPage();
}

function storeLibrary() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function createBook(book) {
  const bookContainer = $(`<div id='${myLibrary.indexOf(book)}'class='book-container'></div>`)
  const readBtn = $(`<button id='read${myLibrary.indexOf(book)}' class='read-button'></button>`)

  $(`<div class="title">${book.title}</div>`).appendTo(bookContainer)
  $(`<div class="title">${book.author}</div>`).appendTo(bookContainer)
  $(`<div class="title">${book.pages}</div>`).appendTo(bookContainer)

  if (book.readStatus === false) {
    readBtn.text("Not Read");
    readBtn.css("background-color", "#f76c6c")
  } else {
    readBtn.text("Read");
    readBtn.css("background-color", "#53DE53")
  }

  readBtn.appendTo(bookContainer)
  $(`<button id='remove${myLibrary.indexOf(book)}' class='remove-button'>Remove</button>`).appendTo(bookContainer)

  $(bookContainer).appendTo(".container")
}

function renderPage() {
  $(".container").text("")
  for (let i = 0; i < myLibrary.length; i++) {
    createBook(myLibrary[i]);
  }

  $(".read-button").click(readBook)
  $(".remove-button").click(deleteBook)
}

function retrieveLibrary() {
  if (!localStorage.myLibrary) {
    renderPage();
  } else {
    let books = localStorage.getItem("myLibrary");
    books = JSON.parse(books);
    myLibrary = books;
    renderPage();
  }
}

retrieveLibrary();
