const myLibrary = [];

// Book constructor
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

// Add book to myLibrary array
function addBookToLibrary(title, author, pages, readOrNot) {
   const book = new Book(title, author, pages, readOrNot);

   myLibrary.push(book);
};

addBookToLibrary("Yep", "Me", 100, true);

addBookToLibrary("Yep2", "me2", 200, false);

addBookToLibrary("Yep3", "me3", 300, true);

// Load book to DOM
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

    const newArticleEdit = document.createElement("button");
    newArticleEdit.className = "article__edit";

    const svgEdit = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
    `;

    newArticleEdit.insertAdjacentHTML("beforeend", svgEdit);

    newArticleOptions.append(newArticleEdit);

    // Edit book event listener
    newArticleEdit.addEventListener("click", () => {
        const index = findBook(book.id);
        if (index > -1) {
            editBook(index);
            editDialog.showModal();
        }
    });

    const newArticleDelete = document.createElement("button");
    newArticleDelete.className = "article__delete";

    // Inline SVG as a string
    const svgDelete= `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/></svg>
    `;

    // Add the SVG to the button
    newArticleDelete.insertAdjacentHTML("beforeend", svgDelete);

    newArticleOptions.append(newArticleDelete);


    // Delete book event listener
    newArticleDelete.addEventListener("click", () => {
        const index = findBook(book.id);
        if (index > -1) {
            removeBook(index);
            document.getElementById(book.id).remove();
        }
    });

    newArticle.append(newArticleOptions);

    const booksContainer = document.querySelector(".books__container");
    booksContainer.append(newArticle);
};

function loadAllBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        loadBook(myLibrary[i]);
    }
};

// Load books on page load
window.addEventListener("load", (event) => {
    loadAllBooks();
});

function findBook(id) {
    return (myLibrary.findIndex(obj => obj.id == id));
};

// Remove book function
function removeBook(index) {
    if (index > -1) {
        myLibrary.splice(index, 1);
    };
};

// Edit book function
function editBook(index) {
    if (index > -1) {
        const dialogEditContainer = document.querySelector(".article__container.edit");

        const dialogTitle = document.querySelector(".article__title.edit");
        dialogTitle.textContent = myLibrary[index].title;

        const dialogInfo = document.querySelector(".dialog__info");

        dialogInfo.innerHTML = "";

        const dialogAuthor = document.createElement("li");
        dialogAuthor.textContent = myLibrary[index].author;
        dialogInfo.append(dialogAuthor);

        const dialogPages = document.createElement("li");
        dialogPages.textContent = myLibrary[index].pages + " pages";
        dialogInfo.append(dialogPages);

        const oldReadButton = dialogEditContainer.querySelector(".dialog__read");
        if (oldReadButton) oldReadButton.remove();

        const dialogReadOrNot = document.createElement("button");
        dialogReadOrNot.className = "dialog__read";
        if (myLibrary[index].readOrNot === true) {
            dialogReadOrNot.textContent = "READ";
        } else {
            dialogReadOrNot.textContent = "NOT READ";
        }
        dialogEditContainer.append(dialogReadOrNot);

        dialogReadOrNot.addEventListener("click", () => {
            applyEdit(index);
            if (myLibrary[index].readOrNot === true) {
                dialogReadOrNot.textContent = "READ";
            } else {
                dialogReadOrNot.textContent = "NOT READ";
            }
        });
    };
};

// Dialog popup to add a book
const addDialog = document.querySelector(".add__dialog");
const addButton = document.querySelector("#add__button");
const closeAddDialog = document.querySelector("#close__add__dialog");

addButton.addEventListener("click", () => {
    addDialog.showModal();
});

closeAddDialog.addEventListener("click", () => {
    addDialog.close();
});

// Dialog popup to edit a book
const editDialog = document.querySelector(".edit__dialog");
const closeEditDialog = document.querySelector("#close__edit__dialog");

closeEditDialog.addEventListener("click", () => {

    editDialog.close();
});

function applyEdit(index) {
    if (myLibrary[index].readOrNot === true) {
        myLibrary[index].readOrNot = false;
    } else {
        myLibrary[index].readOrNot = true;
    };
};

// Form submission handling
const form = document.getElementById("addForm")
form.addEventListener('submit', (event) => {
    event.preventDefault();

    formHandler();

    addDialog.close();
});

// Form value handling function
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
