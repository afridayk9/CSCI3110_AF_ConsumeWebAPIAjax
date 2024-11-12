"use strict";

import { BookRepository } from "./bookRepository.js";
import { DOMCreator } from "./DOMCreator.js";

const bookRepo = new BookRepository("https://localhost:7129/api/book");
const domCreator = new DOMCreator();

const urlSections = window.location.href.split("/");
const bookId = urlSections[5];
try {
    const book = await bookRepo.read(bookId);
    console.log(book);

    domCreator.setElementText("#bookId", book.id);
    domCreator.setElementText("#bookTitle", book.title);
    domCreator.setElementText("#bookEdition", book.edition);
    domCreator.setElementText("#bookPublicationYear", book.publicationYear);
}
catch (error) {
    console.log(error);
    window.location.replace("/book/index");
}
