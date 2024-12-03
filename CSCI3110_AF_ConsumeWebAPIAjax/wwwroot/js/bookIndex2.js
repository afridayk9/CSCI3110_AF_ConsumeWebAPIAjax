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


const createBookModalDOM = document.querySelector("#createBookModal");
const createBookModal = new bootstrap.Modal(createBookModalDOM);

const createBookForm = document.querySelector("#createBookForm");
    createBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
   
    await submitWithAjax(createBookForm);    
});

async function submitWithAjax(createBookForm) {
    
    const formData = new FormData(createBookForm);     
    const result = await bookRepo.create(formData);  

    
    console.log(result);

    bookTableBody.appendChild(createBookTR(result));

    createBookModal.hide();
}

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
    td.appendChild(domCreator.createButton(`/book/edit/${id}`, "Edit", "warning"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(domCreator.createButton(`/book/details/${id}`, "Details", "info"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(domCreator.createButton(`/book/delete/${id}`, "Delete", "danger"));
    return td;
}