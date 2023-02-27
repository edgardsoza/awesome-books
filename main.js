document.addEventListener('DOMContentLoaded', () => {

const submit = document.querySelector('.btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookslist = document.querySelector('.book-list');
const id = Date.now();

let listbook = [];

//Adding Books

function addBooks(title, author) {
    const books = {
        id,
        title,
        author,
     };

     listbook.push(books);
    localStorage.setItem('listbook', JSON.stringify(listbook));
    displayBooks(books.id, books.title,books.author);
};

function removeBooks(id) {
    listbook = listbook.filter((book) => {
        if(book.id === id) {
            return false;
        }
        return true;
    });
}

submit.addEventListener('click', () => {
    addBooks(title.value, author.value);

    // clear input
    id = '';
    title.value = '';
    author.value = '';
});

const myBook = JSON.parse(localStorage.getItem('listbook'));
if (myBook) {
    listbook = myBook;
}
listbook.forEach((book) => {
  displayBooks(book.id, book.title, book.author);
});

function displayBooks(id, title, author) {
    const items = document.createElement('li');
    items.style.listStyleType = 'none';
    items.innerHTML = `
      <p>Title:-  ${title}</p>
       <p> Author:-  ${author}</p>
       `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.id = id;
    const bookLine = document.createElement('hr');
    items.append(removeBtn, bookLine);
   
    removeBtn.addEventListener('click', () => {
        removeBooks(id);
        localStorage.setItem('listbook', JSON.stringify(listbook));
        items.remove();
    });
    bookslist.appendChild(items);
};

console.log(myBook);
})