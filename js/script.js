//read json
var selectedList;
let index;
xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
    let x = JSON.parse(this.responseText);
    for (let i = 0; i < x.lists.length; i++) {
        let tmplist = new elementlist(x.lists[i].name);
        for (let j = 0; j < x.lists[i].elements.length; j++) {
            tmplist.addElement(new element(x.lists[i].elements[j].name, x.lists[i].elements[j].quantity, x.lists[i].elements[j].price, x.lists[i].elements[j].store, x.lists[i].elements[j].isBought));
        }
        lists.push(tmplist)
    }
    for (let i = 0; i < x.stores.length; i++) {
        storeslist.push(new store(x.stores[i].name, x.stores[i].address, x.stores[i].opening));
    }


    selectedList = lists[0];
    write();

    //add list
    document.querySelector(".btn-add-list").addEventListener("click", function () {
        lists.push(new elementlist(document.querySelector(".list-input-name").value));
        write();
    })
    //del list
    document.querySelector(".btn-del-list").addEventListener("click", function () {
        for (let i = 0; i < toDelList.length; i++) {
            lists[toDelList[i]] = null;
            selectedList = null;
        }

        for (let i = 0; i < lists.length; i++) {
            if (lists[i] != null) {
                selectedList = lists[i];
            }

        }
        if (selectedList === null) {
            selectedList = new elementlist("Üres lista");
            lists.push(selectedList);
            for (let i = 0; i < lists.length; i++) {
                if (lists[i] != null) {
                    selectedList = lists[i];
                }
            }
        }
        write(selectedList);
    })
    //del list writeout
    document.querySelector(".del-button-list").addEventListener("click", function () {
        let selectedLists = document.querySelectorAll(".selected-list");
        let p = document.querySelector(".del-lists");
        p.innerHTML = "";
        for (let i = 0; i < selectedLists.length; i++) {
            for (let j = 0; j < lists.length; j++) {
                if (lists[j] != null) {
                    if (selectedLists[i].classList[2] == lists[j].getId()) {
                        if (i != selectedLists.length - 1) {
                            p.innerHTML += lists[j].getName() + ", ";
                        }
                        else {
                            p.innerHTML += lists[j].getName();
                        }
                    }
                }

            }
        }
    })

    document.querySelector(".btn-set-confirmation").addEventListener("click", function () {
        selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value);
        selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value);
        selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value);
        selectedList.getElements()[index].setStore(document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text);
        write();
        editElements = document.querySelectorAll(".btn-set-element");
        for (let i = 0; i < editElements.length; i++) {
            editElements[i].addEventListener("click", function () {
                for (let j = 0; j < selectedList.getElements().length; j++) {
                    if (editElements[i].classList[2] == selectedList.getElements()[j].getId()) {
                        index = j;
                    }
                }
                document.querySelector(".element-set-name-label").innerHTML = selectedList.getElements()[index].getName();
                document.querySelector(".element-set-quantity-label").innerHTML = selectedList.getElements()[index].getQuantity();
                document.querySelector(".element-set-price-label").innerHTML = selectedList.getElements()[index].getPrice();
                document.querySelector(".element-set-store-selected").innerHTML = selectedList.getElements()[index].getStore();

                selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value = selectedList.getElements()[index].getName());
                selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value = selectedList.getElements()[index].getQuantity());
                selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value = selectedList.getElements()[index].getPrice());
                //selectedList.getElements()[index].setStore(document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text);
            })
        }

    })

    document.querySelector(".btn-del-element").addEventListener("click", function () {
        for (let i = 0; i < toDelElements.length; i++) {
            for (let j = 0; j < selectedList.getElements().length; j++) {

                if (selectedList.getElements()[j] != null) {
                    if (toDelElements[i] == selectedList.getElements()[j].getId()) {
                        selectedList.getElements()[j] = null;
                    }
                }


            }

        }
        write();
    })
    //del element writeout
    document.querySelector(".del-button-element").addEventListener("click", function () {
        let selectedElements = document.querySelectorAll(".selected-div");
        let p = document.querySelector(".del-elements");
        p.innerHTML = "";
        for (let i = 0; i < selectedElements.length; i++) {
            for (let j = 0; j < selectedList.getElements().length; j++) {

                if (selectedList.getElements()[j] != null) {
                    if (selectedElements[i].classList[2] == selectedList.getElements()[j].getId()) {
                        if (i != selectedElements.length - 1) {
                            p.innerHTML += selectedList.getElements()[j].getName() + ", ";
                        }
                        else {
                            p.innerHTML += selectedList.getElements()[j].getName();
                        }
                    }
                }
            }
        }
    })
    //add element
    document.querySelector(".btn-add-element").addEventListener("click", function () {
        selectedList.addElement(new element(document.querySelector(".element-input-name").value, document.querySelector(".element-input-quantity").value, document.querySelector(".element-input-price").value, document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text));
        document.querySelector(".element-input-name").value = '';
        document.querySelector(".element-input-quantity").value = '';
        document.querySelector(".element-input-price").value = '';
        write();
    })

}
xmlhttp.open("GET", "json/data.json");
xmlhttp.send();
//functions

function clearDivs() {
    document.querySelector("tbody").innerHTML = "";
    document.querySelector(".store-table").innerHTML = "";
    document.querySelector(".lists").innerHTML = "";
    document.querySelector(".element-div-container").innerHTML = "";
    document.querySelector(".dropdown-menu").innerHTML = "";
}

function write() {
    clearDivs();
    for (let i = 0; i < selectedList.getElements().length; i++) {
        if (selectedList.getElements()[i] != null) {
            document.querySelector(".elements-list-out").innerHTML += selectedList.getElements()[i].toTr();
        }
    }

    document.querySelector(".selected-list-dropdown").innerHTML = selectedList.getName();
    let dropdown = document.querySelector(".dropdown-menu");
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] != null) {
            dropdown.innerHTML += lists[i].toDropdown();
        }
    }

    let listdiv = document.querySelector(".lists");
    listdiv.innerHTML += "<div class=\"col-3 center list plus\" data-bs-toggle=\"modal\" data-bs-target=\".add-list\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" fill=\"currentColor\" class=\"bi bi-plus-circle\"viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\" /><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4\" /> </svg></div>"
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] != null) {
            listdiv.innerHTML += lists[i].toDiv();
        }
    }
    listdiv = document.querySelector(".element-div-container");
    listdiv.innerHTML += "<div class=\"col-3 center list plus\" data-bs-toggle=\"modal\" data-bs-target=\".add-element\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" fill=\"currentColor\" class=\"bi bi-plus-circle\"viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\" /><path d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4\" /> </svg></div>"
    for (let i = 0; i < selectedList.getElements().length; i++) {
        if (selectedList.getElements()[i] != null) {
            listdiv.innerHTML += selectedList.getElements()[i].toDiv();
        }
    }
    toDelList = [];
    listdivs = document.querySelectorAll(".list");
    circlePlacesList = document.querySelectorAll(".circle-list");

    for (let i = 0; i < listdivs.length; i++) {
        (function (index) {
            listdivs[index].addEventListener("click", function (event) {
                if (event.target === listdivs[index]) {
                    if (listdivs[index].classList.contains("selected-list") || listdivs[index].classList.contains("plus")) {
                        listdivs[index].classList.remove("selected-list");
                        toDelList.splice(listdivs[index].classList[2], 1);
                        circlePlacesList[index - 1].innerHTML = "";
                        circlePlacesList[index - 1].innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-circle circle-list\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg>";
                    } else {
                        listdivs[index].classList.add("selected-list");
                        toDelList.push(listdivs[index].classList[2]);
                        circlePlacesList[index - 1].innerHTML = "";
                        circlePlacesList[index - 1].innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle circle-list\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/><path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/></svg>";
                    }
                }
            });
        })(i);
    }
    //selectelements
    elements = document.querySelectorAll(".element");
    for (let i = 0; i < elements.length; i++) {
        (function (index) {
            elements[index].addEventListener("click", function () {
                if (elements[index].classList.contains("selected-element")) {
                    elements[index].classList.remove("selected-element");
                    selectedList.getElements()[index].setIsBought(false);
                } else {
                    elements[index].classList.add("selected-element");
                    selectedList.getElements()[index].setIsBought(true);
                }
            });
        })(i);
    }

    //selectelement-div
    toDelElements = [];
    elementsDiv = document.querySelectorAll(".element-div");
    circlePlaces = document.querySelectorAll(".circle");
    for (let i = 0; i < elementsDiv.length; i++) {
        (function (index) {
            elementsDiv[index].addEventListener("click", function (event) {
                if (event.target == elementsDiv[index]) {
                    if (elementsDiv[index].classList.contains("selected-div")) {
                        elementsDiv[index].classList.remove("selected-div");
                        circlePlaces[index].innerHTML = "";
                        circlePlaces[index].innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-circle circle\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg>";
                        toDelElements.splice(elementsDiv[index].classList[2], 1);
                    } else {
                        elementsDiv[index].classList.add("selected-div");
                        circlePlaces[index].innerHTML = "";
                        circlePlaces[index].innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle circle\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/><path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/></svg>";
                        toDelElements.push(elementsDiv[index].classList[2]);
                    }
                }
            });
        })(i);
    }

    //store writeout
    const TableElementCount = 10;
    let tableNumber = Math.ceil(storeslist.length / TableElementCount);
    let div = document.querySelector(".store-table");
    let storeindex = 0;
    for (let i = 0; i < tableNumber; i++) {
        div.innerHTML += "<tbody class=\"page-" + i + " page\"></tbody>";

        let tbody = document.querySelector(".page-" + i)
        for (let j = 0; j < TableElementCount; j++) {
            if (storeindex < storeslist.length) {
                tbody.innerHTML += storeslist[storeindex].toTr();
                storeindex++;
            }
        }
    }

    let toDelStores = document.querySelectorAll(".store");
    for (let i = 0; i < toDelStores.length; i++) {
        (function (index) {
            toDelStores[index].addEventListener("click", function (event) {
                if (!event.target.classList.contains("store-edit")) {
                    if (toDelStores[index].classList.contains("selected-todel-element")) {
                        toDelStores[index].classList.remove("selected-todel-element");
                    } else {
                        toDelStores[index].classList.add("selected-todel-element");
                    }
                }
            });
        })(i);
    }
    //page (storepage)
    let pages = document.querySelectorAll(".page");
    for (let i = 1; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    let page = 0;
    document.querySelector(".btn-left").addEventListener("click", function left() {
        if (page > 0) {
            document.querySelector(".page-" + page).style.display = "none";
            page--;
            document.querySelector(".page-" + page).style.display = "block";
        }
    });
    document.querySelector(".btn-right").addEventListener("click", function right() {
        if (page < pages.length - 1) {
            document.querySelector(".page-" + page).style.display = "none";
            page++;
            document.querySelector(".page-" + page).style.display = "block";
        }
    });
    openBtns = document.querySelectorAll(".btn-open");
    for (let i = 0; i < openBtns.length; i++) {
        openBtns[i].addEventListener("click", function () {
            n = openBtns[i].classList[2];
            selectedList = lists[n];
            write(selectedList);
            load(document.querySelector(".starting-container"));
        });
    }
    openDrpdwns = document.querySelectorAll(".open");
    for (let i = 0; i < openDrpdwns.length; i++) {
        openDrpdwns[i].addEventListener("click", function () {
            n = openDrpdwns[i].classList[2];
            selectedList = lists[n];
            write(selectedList);
            load(document.querySelector(".starting-container"));
        });
    }

    //becsült összeg
    sum = 0;
    for (let i = 0; i < selectedList.getElements().length; i++) {
        if (selectedList.getElements()[i] != null) {
            sum += (selectedList.getElements()[i].getQuantity() * selectedList.getElements()[i].getPrice());
        }
    }
    document.querySelector(".sum").innerHTML = sum + " Ft";

    //list rename
    let listName = document.querySelectorAll(".list-name");
    for (let i = 0; i < listName.length; i++) {
        listName[i].innerHTML = selectedList.getName() + "<sup><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"10\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\"><path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/><path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z\"/></svg></sup>";
        listName[i].addEventListener("click", function () {

            let originalText = selectedList.getName();
            document.querySelectorAll(".list-rename")[i].innerHTML = '<div class="input-group mb-3"><input type="text" class="form-control" placeholder="' + selectedList.getName() + '" aria-label="Recipients username" aria-describedby="button-addon2"> <button class="btn btn-primary btn-rename" type="button" id="button-addon2">Átnevezés</button></div>';


            let inputElement = document.querySelectorAll(".list-rename")[i].querySelector('input');
            inputElement.focus();
            document.querySelector(".btn-rename").addEventListener("click", function () {
                selectedList.setName(inputElement.value);
                document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                write(selectedList);
            })
            $(document).off("keydown");
            $(document).on("keydown", function (event) {
                switch (event.keyCode) {
                    case 13: // Enter key
                        selectedList.setName(inputElement.value);
                        document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                        write(selectedList);
                        break;
                    case 27: // Escape key
                        document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                        write(selectedList);
                        break;
                }
            });

        });
    }

    //edit element
    editElements = document.querySelectorAll(".btn-set-element");
    for (let i = 0; i < editElements.length; i++) {

        editElements[i].addEventListener("click", function () {

            for (let j = 0; j < selectedList.getElements().length; j++) {
                if (selectedList.getElements()[j] != null) {
                    if (editElements[i].classList[2] == selectedList.getElements()[j].getId()) {
                        index = j;
                    }
                }
            }
            document.querySelector(".element-set-name-label").innerHTML = selectedList.getElements()[index].getName();
            document.querySelector(".element-set-quantity-label").innerHTML = selectedList.getElements()[index].getQuantity();
            document.querySelector(".element-set-price-label").innerHTML = selectedList.getElements()[index].getPrice();
            document.querySelector(".element-set-store-selected").innerHTML = selectedList.getElements()[index].getStore();

            selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value = selectedList.getElements()[index].getName());
            selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value = selectedList.getElements()[index].getQuantity());
            selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value = selectedList.getElements()[index].getPrice());
            //selectedList.getElements()[index].setStore(document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text);
        })
    }
}

let lists = [];
let storeslist = [];



