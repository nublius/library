const myLibrary = [];

function Book() {

};

function Book() {
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
}