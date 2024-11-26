"use strict";

export class DOMCreator {

    const createBookModalDOM = document.querySelector("#createBookModal");
    const crateBookModal = new bootstrap.Modal(createBookModalDOM);

    const createBookForm = document.querySelector("#createBookForm");
    createBookForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    // Submit the form data. This form data wil be processed based on
    // the action and the method defined in the form.
    await submitWithAjax(createBookForm);
    // Submit the form data but pretend we are submitting to an API
    
    });

    async function submitWithAjax(createBookForm) {
        const url = createBookForm.getAttribute('action');
        const method = createBookForm.getAttribute('method');
        const formData = new FormData(createBookForm);

        const response = await fetch(url, {
            method: method, body: formData
        });
        if (response.ok == false) {
            throw new Error("There was an HTTP error!");
        }
        const result = await response.json();
        if (result === "fail") {
            return;
        }
        console.log(result);
        createBookModal.hide();
    }


    createTextTD(text) {
        const td = document.createElement("td");
        td.appendChild(document.createTextNode(text));
        return td;
    }

    createImageTR(src, alt) {
        const tr = document.createElement("tr");
        const td = this.createImageTD(src, alt);
        td.setAttribute("colspan", "4");
        tr.appendChild(td);
        return tr;
    }

    createImageTD(src, alt) {
        const td = document.createElement("td");
        const img = this.createImg(src, alt);
        td.appendChild(img);
        return td;
    }

    createImg(src, alt) {
        const img = document.createElement("img");
        img.setAttribute("src", src);
        img.setAttribute("alt", alt);
        return img;
    }

    createTextLink(url, text) {
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.appendChild(document.createTextNode(text));
        return a;
    }

    removeChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    setElementText(elementId, text) {
        const element = document.querySelector(elementId);
        element.appendChild(document.createTextNode(text));
    }

    setElementValue(elementId, value) {
        const element = document.querySelector(elementId);
        element.value = value;
    }

    createSmallButtonLink(url, text, btnType = "primary") {
        const a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("class", `btn btn-${btnType} btn-sm`)
        a.appendChild(document.createTextNode(text));
        return a;
    }

    
}
