"use strict";

import { BookRepository } from "./bookRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const bookRepo = new BookRepository("https://localhost:7129/api/book");
const domCreator = new DOMCreator();

const bookHeading = document.querySelector("#bookHeading");
domCreator.removeChildren(bookHeading);
bookHeading.appendChild(document.createTextNode("Loading..."));

const urlSections = window.location.href.split("/");
const bookId = urlSections[5];
await populateBookData();
const formBookDelete = document.querySelector("#formBookDelete");
formBookDelete.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formBookDelete);

    try {
        await bookRepo.deleteBook(formData.get("id"));
        window.location.replace("/book/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populateBookData() {
    try {
        const book = await bookRepo.read(bookId);
        domCreator.setElementText("#bookId", book.id);
        domCreator.setElementText("#bookTitle", book.title);
        domCreator.setElementText("#bookEdition", book.edition);
        domCreator.setElementText("#bookPublicationYear", book.publicationYear);
        domCreator.setElementValue("#id", book.id);

        domCreator.removeChildren(bookHeading);
        bookHeading.appendChild(document.createTextNode("Book"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/book/index");
    }
}