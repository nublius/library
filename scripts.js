const myLibrary = [];

function Book(title, author, pages, readOrNot) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor.");
    };
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readOrNot = readOrNot;
    this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, readOrNot) {
   const book = new Book(title, author, pages, readOrNot);

   myLibrary.push(book);
};

addBookToLibrary("Yep", "Me", 100, true);

addBookToLibrary("Yep2", "me2", 200, false);

addBookToLibrary("Yep3", "me3", 300, true);

function loadBook(book) {
    const newArticle = document.createElement("div");
    newArticle.className = "article__container";
    newArticle.id = book.id;

    const newArticleInfo = document.createElement("div");
    newArticleInfo.className = "article__info";
    newArticle.append(newArticleInfo);

    const newArticleTitle = document.createElement("h2");
    newArticleTitle.className = "article__title";
    newArticleTitle.textContent = book.title;
    newArticleInfo.append(newArticleTitle);

    const newArticleList = document.createElement("ul");

    const newArticleAuthor = document.createElement("li");
    newArticleAuthor.textContent = "by " + book.author;
    newArticleList.append(newArticleAuthor);

    const newArticlePageCount = document.createElement("li");
    newArticlePageCount.textContent = book.pages + " pages";
    newArticleList.append(newArticlePageCount);

    const newArticleReadOrNot = document.createElement("li");
    if (book.readOrNot == true) {
        newArticleReadOrNot.textContent = "Read";
    } else {
        newArticleReadOrNot.textContent = "Not read";
    }
    newArticleList.append(newArticleReadOrNot);

    newArticleInfo.append(newArticleList);

    const newArticleOptions = document.createElement("div");
    newArticleOptions.className = "article__options";

    const newArticleDelete = document.createElement("button");
    newArticleDelete.className = "article__delete";

    // Inline SVG as a string
    const svgIcon = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>
    `;

    // Add the SVG to the button
    newArticleDelete.insertAdjacentHTML("beforeend", svgIcon);

    newArticleOptions.append(newArticleDelete);


    newArticleDelete.addEventListener("click", () => {
        const index = findBook(book.id);
        if (index > -1) {
            removeBook(index);
            document.getElementById(book.id).remove();
        }
    })

    newArticle.append(newArticleOptions);

    const booksContainer = document.querySelector(".books__container");
    booksContainer.append(newArticle);
};

function loadAllBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        loadBook(myLibrary[i]);
    }
};

window.addEventListener("load", (event) => {
    loadAllBooks();
});

function findBook(id) {
    return (myLibrary.findIndex(obj => obj.id == id));
};

function removeBook(index) {
    if (index > -1) {
        myLibrary.splice(index, 1);
    };
};

const addDialog = document.querySelector("dialog");
const addButton = document.querySelector("#add__button");
const closeDialog = document.querySelector("#close__dialog");

addButton.addEventListener("click", () => {
    addDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    addDialog.close();
});

// Form submission handling

const form = document.getElementById("addForm")
form.addEventListener('submit', (event) => {
    event.preventDefault();

    formHandler();

    addDialog.close();
});

function formHandler() {
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    let readOrNot = false;
    
    if(form.readOrNot.checked) {
        readOrNot = true;
    } else {
        readOrNot = false;
    }
    
    addBookToLibrary(title, author, pages, readOrNot);

    loadBook(myLibrary[myLibrary.length - 1]);
};
