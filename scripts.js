const myLibrary = [];

function Book() {

};

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
    newArticlePageCount.textContent = book.pages;
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
    const deleteIcon = document.createElement("img");
    deleteIcon.className = "icon";
    deleteIcon.src = "images/delete.svg";
    newArticleDelete.append(deleteIcon);
    newArticleOptions.append(newArticleDelete);

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