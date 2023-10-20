const myLibrary = [];

const Library = (() => {
  // console.log(myLibrary)
  const dialog = document.querySelector("dialog");
  const showButton = document.getElementById("add-book-btn");
  const closeButton = document.querySelector("#submit-btn");

  // "Show the dialog" button opens the dialog modally
  showButton.addEventListener("click", () => {
    dialog.showModal();
  });
  let checkedValue;
  function check(obj) {
    if (obj.checked) {
      checkedValue = "Finished";
    } else {
      checkedValue = "Unfinished";
    }
  }
  // "Close" button closes the dialog
  closeButton.addEventListener("click", (event) => {
    event.preventDefault();
    // first get the nodeList
    let nodeListValues = document.querySelectorAll("#add-book-form input");
    // turn nodeList into array, use reduce to clean it into an object
    let formValues = Array.from(nodeListValues).reduce(
      (acc, input) => ({ ...acc, [input.id]: input.value }),
      {}
    );
    let newId = myLibrary.length;
    let test = new Book(
      newId,
      formValues.bookTitle,
      formValues.bookAuthor,
      formValues.bookPages,
      "Unfinished"
    );
    test.addBookToLibrary();
    console.log(formValues);
    displayAllBooks();
    console.log(myLibrary);
    dialog.close();
  });
  displayAllBooks = () => {
    const container = document.getElementById("library");
    container.innerHTML = ""; // Clear existing books
    for (let book of myLibrary) {
      const content = document.createElement("li");
      content.classList.add("book");
      for (let prop in book) {
        if (prop != "id") {
          const contentItem = document.createElement("div");
          contentItem.classList.add("book-attribute");
          contentItem.textContent = book[prop];
          content.appendChild(contentItem);
        }
      }
      const buttons = document.createElement("div");
      buttons.classList.add("buttons");
      book.removeBookFromLibrary(buttons, book);
      book.editBook(buttons, book);
      content.appendChild(buttons);
      container.appendChild(content);
    }
  };
  return { displayAllBooks };
})();

// This new version refactors code with classes.
class Book {
  constructor(id, title, author, numOfPages, isRead) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
  }
  addBookToLibrary() {
    myLibrary.push(this);
  }
  getId() {
    return myLibrary.indexOf(myLibrary[this.id]);
  }
  removeBookFromLibrary(content, book) {
    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("deleteBookBtn");
    deleteBookBtn.textContent = "X";
    const self = this;
    deleteBookBtn.addEventListener("click", function (e) {
      let index = self.getId(book);
      myLibrary.splice(index, 1);
      console.log(myLibrary);
      displayAllBooks();
    });
    content.appendChild(deleteBookBtn);
  }
  editBook(content, book) {
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-book-btn");
    editBtn.textContent = "Change status";
    const self = this;
    let id = self.getId(book);
    editBtn.addEventListener("click", function () {
      book.isRead == "Finished"
        ? (book.isRead = "Unfinished")
        : (book.isRead = "Finished");
      console.log(book.isRead);
      displayAllBooks();
    });
    content.appendChild(editBtn);
  }
}

// Temporary manual creation of objects
const berserk = new Book(0, "Berserk Vol. 1", "Kentaro Miura", 224, "Finished");
const monster = new Book(1, "Monster Vol. 1", "Naoki Urusawa", 426, "Finished");
berserk.addBookToLibrary();
monster.addBookToLibrary();

Library.displayAllBooks();
