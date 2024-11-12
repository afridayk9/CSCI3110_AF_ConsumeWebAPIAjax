"use strict";

import { BookRepository } from "./bookRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const bookRepo = new BookRepository("https://localhost:7129/api/book");
const domCreator = new DOMCreator();

const bookTableBody = document.querySelector("#bookTableBody");
bookTableBody.appendChild(domCreator.createImageTR("/images/ajax-loader.gif", "Loading image"));

let books = await bookRepo.readAll();
domCreator.removeChildren(bookTableBody);
books.forEach((book) => {
    bookTableBody.appendChild(createBookTR(book));
    console.log(book);
});

function createBookTR(book) {
    const tr = document.createElement("tr");
    tr.appendChild(domCreator.createTextTD(book.id));
    tr.appendChild(domCreator.createTextTD(book.title));
    tr.appendChild(domCreator.createTextTD(book.edition));
    tr.appendChild(domCreator.createTextTD(book.publicationYear));
    tr.appendChild(createTDWithLinks(book.id))
    return tr;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    td.appendChild(domCreator.createTextLink(`/book/edit/${id}`, "Edit"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(domCreator.createTextLink(`/book/details/${id}`, "Details"));
    td.appendChild(document.createTextNode(" | "));
    td.appendChild(domCreator.createTextLink(`/book/delete/${id}`, "Delete"));
    return td;
}
