"use strict";

import { BookRepository } from "./bookRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const bookRepo = new BookRepository("https://localhost:7129/api/pet");
const domCreator = new DOMCreator();

const bookHeading = document.querySelector("#bookHeading");
domCreator.removeChildren(bookHeading);
bookHeading.appendChild(
    domCreator.createImg("/images/ajax-loader.gif", "Loading image"));

const urlSections = window.location.href.split("/");
const bookId = urlSections[5];

await populateBookData();
const formBookEdit = document.querySelector("#formBookEdit");
formBookEdit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(formBookEdit);
    try {
        await bookRepo.update(formData);
        window.location.replace("/book/index/");
    }
    catch (error) {
        console.log(error);
    }
});

async function populateBookData() {

    try {
        const book = await bookRepo.read(bookId);
        console.log(book);
        domCreator.setElementValue("#Id", book.id);
        domCreator.setElementValue("#Title", book.title);
        domCreator.setElementValue("#Edition", book.edition);
        domCreator.setElementValue("#PublicationYear", book.publicationYear);

        domCreator.removeChildren(bookHeading);
        petHeading.appendChild(document.createTextNode("Book"));
    }
    catch (error) {
        console.log(error);
        window.location.replace("/pet/index");
    }
}

        ///