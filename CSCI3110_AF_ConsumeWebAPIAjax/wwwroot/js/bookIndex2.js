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

const deleteBookModalDOM = document.querySelector("#deleteBookModal");
const deleteBookModal = new bootstrap.Modal(deleteBookModalDOM);

deleteBookFormHandler();

const deleteBookForm = document.querySelector("#deleteBookForm");
deleteBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitWithAjax(deleteBookForm);
});

const createBookForm = document.querySelector("#createBookForm");
createBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await submitWithAjax(createBookForm);
});

async function submitWithAjax(form) {
    const formData = new FormData(form);
    const url = form.getAttribute("action");
    const method = form.getAttribute("method");
    const response = await fetch(url, {
        method: method,
        body: formData
    });
    if (!response.ok) {
        throw new Error("There was an HTTP error: " + response.status);
    }
    const result = await response.json();
    console.log(result);

    if (form === createBookForm) {
        bookTableBody.appendChild(createBookTR(result));
        createBookModal.hide();
    } else if (form === deleteBookForm) {
        const row = document.querySelector(`tr[data-id="${result.id}"]`);
        row.remove();
        deleteBookModal.hide();
    }
}

async function setupDeleteButtons() {
    let allDeleteButtonList = document.querySelectorAll('.dangerBtn');
    let allDeleteButtons = Array.from(allDeleteButtonList);
    allDeleteButtons.forEach(btn => {
        btn.addEventListener("click", async (e) => {
            const bookId = btn.getAttribute("data-id");
            const book = await bookRepo.read(bookId);
            document.querySelector("#deleteBookForm #Id").value = book.id;
            document.querySelector("#deleteBookForm #Title").value = book.title;
            document.querySelector("#deleteBookForm #Edition").value = book.edition;
            document.querySelector("#deleteBookForm #PublicationYear").value = book.publicationYear;
            deleteBookModal.show();
        });
    });
}

async function deleteBookFormHandler() {
    const deleteBookForm = document.querySelector("#deleteBookForm");
    deleteBookForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(deleteBookForm);
        const bookId = formData.get("Id");
        console.log("Book ID to delete:", bookId);
        await bookRepo.deleteBook(bookId);
        deleteBookModal.hide();
        const row = document.querySelector(`tr[data-id="${bookId}"]`);
        if (row) {
            row.remove();
        }
    });
}

function createBookTR(book) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-id", book.id);
    tr.appendChild(domCreator.createTextTD(book.id));
    tr.appendChild(domCreator.createTextTD(book.title));
    tr.appendChild(domCreator.createTextTD(book.edition));
    tr.appendChild(domCreator.createTextTD(book.publicationYear));
    tr.appendChild(createTDWithLinks(book.id));
    setupDeleteButtons();
    return tr;
}

function createTDWithLinks(id) {
    const td = document.createElement("td");
    const deleteButton = domCreator.createButton("#", "Delete", "danger", id);
    deleteButton.setAttribute("data-id", id);
    td.appendChild(domCreator.createButton(`/book/edit/${id}`, "Edit", "warning"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(domCreator.createButton(`/book/details/${id}`, "Details", "info"));
    td.appendChild(document.createTextNode("  "));
    td.appendChild(deleteButton);
    return td;
}

setupDeleteButtons();