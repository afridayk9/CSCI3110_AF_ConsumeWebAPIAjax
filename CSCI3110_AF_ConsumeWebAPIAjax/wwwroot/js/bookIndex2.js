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

function convertFormDataToObject(formData) {
    const obj = {};
    for (const [key, value] of formData.entries()) {
        if (key === "__RequestVerificationToken") continue;
        obj[key] = value;
    }
    return obj;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    td.appendChild(domCreator.createSmallButtonLink(`/book/edit/${id}`, "Edit", "warning"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(domCreator.createSmallButtonLink(`/book/details/${id}`, "Details", "info"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(domCreator.createSmallButtonLink(`/book/delete/${id}`, "Delete", "danger"));
    return td;
}