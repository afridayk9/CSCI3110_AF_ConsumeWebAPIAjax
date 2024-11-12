"use strict";

import { BookRepository } from "./bookRepository.js";

const bookRepo = new BookRepository("https://localhost:7129/api/book");

const bookCreateForm = document.querySelector("#formCreateBook");
bookCreateForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(bookCreateForm);
    const result = await bookRepo.create(formData);
    console.log(result);
    window.location.replace("/book/index");
});
