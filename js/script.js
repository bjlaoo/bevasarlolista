//read json
var selectedList;
var storeslist = [];
var lists = [];
var page = 0;
var index;
var mainTableElements;
var toDelStores = [];
var toDelElements = [];
var toDelList = [];
var pages;
let flag = false;
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiNJapIQl7q_HAmumYSdBI1cIyBP3SCsE",
    authDomain: "wrud-5ced6.firebaseapp.com",
    databaseURL: "https://wrud-5ced6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wrud-5ced6",
    storageBucket: "wrud-5ced6.appspot.com",
    messagingSenderId: "197962461246",
    appId: "1:197962461246:web:c9f34f9268b20c8c28a16f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"
const db = getDatabase();
const dbRef = ref(db);
get(child(dbRef, 'data')).then((snapshot) => {
    if (snapshot.exists()) {

        let x = snapshot.val();
        for (let i = 0; i < x.lists.length; i++) {
            let tmplist = new elementlist(x.lists[i].name);
            if (x.lists[i].elements != undefined) {
                for (let j = 0; j < x.lists[i].elements.length; j++) {
                    tmplist.addElement(new element(x.lists[i].elements[j].name, x.lists[i].elements[j].quantity, x.lists[i].elements[j].price, x.lists[i].elements[j].store, x.lists[i].elements[j].isBought));
                }
            }
            lists.push(tmplist)
        }
        for (let i = 0; i < x.stores.length; i++) {
            storeslist.push(new store(x.stores[i].name, x.stores[i].address, x.stores[i].opening));
        }

        selectedList = getNotallgreen();
        mainTableElements = selectedList.getElements();
        console.log(lists)
        console.log(storeslist)
        write();

        //add list
        document.querySelector(".btn-add-list").addEventListener("click", function () {
            document.querySelector(".list-input-name").classList.remove("is-invalid");
            if (document.querySelector(".list-input-name").value == "") {
                document.querySelector(".list-input-name").classList.add("is-invalid");
            }
            else {
                lists.push(new elementlist(document.querySelector(".list-input-name").value))
                $(".modal").modal("hide");
                document.querySelector(".list-input-name").value = "";
                write();
            }
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
                    mainTableElements = selectedList.getElements();
                }

            }
            if (selectedList === null) {
                selectedList = new elementlist("Üres lista");
                lists.push(selectedList);
                for (let i = 0; i < lists.length; i++) {
                    if (lists[i] != null) {
                        selectedList = lists[i];
                        mainTableElements = selectedList.getElements();
                    }
                }
            }
            write();
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
        //add store
        document.querySelector(".btn-add-store").addEventListener("click", function () {
            storeslist.push(new store(document.querySelector(".store-input-name").value, document.querySelector(".store-input-address").value, document.querySelector(".store-input-opening").value));

            write();
        })
        //del store
        document.querySelector(".btn-del-store").addEventListener("click", function () {

            for (let i = 0; i < toDelStores.length; i++) {
                for (let j = 0; j < storeslist.length; j++) {
                    if (storeslist[j] != null) {
                        if (toDelStores[i] == storeslist[j].getId()) {
                            storeslist[j] = null;
                        }
                    }


                }

            }

            write();
        })
        //del store writeout
        document.querySelector(".del-button-store").addEventListener("click", function () {
            let selectedStores = document.querySelectorAll(".selected-todel-element");
            let p = document.querySelector(".del-stores");
            p.innerHTML = "";

            for (let i = 0; i < selectedStores.length; i++) {
                for (let j = 0; j < storeslist.length; j++) {
                    if (storeslist[j] != null) {
                        if (selectedStores[i].classList[1] == storeslist[j].getId()) {
                            if (i != selectedStores.length - 1) {
                                p.innerHTML += storeslist[j].getName() + ", ";
                            }
                            else {
                                p.innerHTML += storeslist[j].getName();
                            }
                        }
                    }
                }
            }

        })
        document.querySelector(".btn-set-store-confirmation").addEventListener("click", function () {
            //asdf
            document.querySelector(".store-set-name").classList.remove("is-invalid");
            if (document.querySelector(".store-set-name").value == "") {
                document.querySelector(".store-set-name").classList.add("is-invalid");
            }
            else {
                storeslist[index].setName(document.querySelector(".store-set-name").value);

            }
            //majd ha mind megvan
            $(".modal").modal("hide");
            write();
            storeslist[index].setName(document.querySelector(".store-set-name").value);
            storeslist[index].setAddress(document.querySelector(".store-set-address").value);
            storeslist[index].setOpening(document.querySelector(".store-set-opening").value);
            write();
            editStores = document.querySelectorAll(".btn-set-stores");
            for (let i = 0; i < editElements.length; i++) {
                editElements[i].addEventListener("click", function () {
                    for (let j = 0; j < storeslist.length; j++) {
                        if (editElements[i].classList[2] == storeslist[j].getId()) {
                            index = j;
                        }
                    }
                    document.querySelector(".store-set-name-label").innerHTML = storeslist[index].getName();
                    document.querySelector(".store-set-quantity-label").innerHTML = storeslist[index].getAddress();
                    document.querySelector(".store-set-price-label").innerHTML = storeslist[index].getOpening();

                    storeslist[index].setName(document.querySelector(".store-set-name").value = storeslist[index].getName());
                    storeslist[index].setAddress(document.querySelector(".store-set-quantity").value = storeslist[index].getAddress());
                    storeslist[index].setOpening(document.querySelector(".store-set-price").value = storeslist[index].getOpening());
                })
            }

        })


        document.querySelector(".btn-set-confirmation").addEventListener("click", function () {
            //asdf
            document.querySelector(".element-set-name").classList.remove("is-invalid");
            document.querySelector(".element-set-quantity").classList.remove("is-invalid");
            if (document.querySelector(".element-set-name").value == "") {
                document.querySelector(".element-set-name").classList.add("is-invalid");
            }
            else {
                selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value);
            }

            if (document.querySelector(".element-set-quantity").value == "") {
                document.querySelector(".element-set-quantity").classList.add("is-invalid");
            }
            else {
                selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value);

            }
            if (!(document.querySelector(".element-set-quantity").value == "") && !(document.querySelector(".element-set-name").value == "")) {
                $(".modal").modal("hide");
            }

            selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value);


            if (document.querySelector(".element-set-store").options[document.querySelector(".element-set-store").selectedIndex].text == document.querySelector(".element-set-store").options[0].text) {
                selectedList.getElements()[index].setStore("Nincs bolt");
            }
            else {
                selectedList.getElements()[index].setStore(document.querySelector(".element-set-store").options[document.querySelector(".element-set-store").selectedIndex].text);
            }

            write();
            let editElements = document.querySelectorAll(".btn-set-element");
            for (let i = 0; i < editElements.length; i++) {
                editElements[i].addEventListener("click", function () {
                    for (let j = 0; j < selectedList.getElements().length; j++) {
                        if (editElements[i].classList[2] == selectedList.getElements()[j].getId()) {
                            index = j;
                        }
                    }
                    document.querySelector(".element-set-name-label").innerHTML = selectedList.getElements()[index].getName();
                    document.querySelector(".element-set-quantity-label").innerHTML = selectedList.getElements()[index].getQuantity();
                    document.querySelector(".element-set-price-label").innerHTML = selectedList.getElements()[index].getPrice() + " (optional)";
                    document.querySelector(".element-set-store").value = selectedList.getElements()[index].getStore();

                    selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value = selectedList.getElements()[index].getName());
                    selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value = selectedList.getElements()[index].getQuantity());
                    selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value = selectedList.getElements()[index].getPrice());
                    selectedList.getElements()[index].setStore(document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text);
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
            document.querySelector(".element-input-name").classList.remove("is-invalid");
            document.querySelector(".element-input-quantity").classList.remove("is-invalid");
            if (document.querySelector(".element-input-name").value == "") {
                document.querySelector(".element-input-name").classList.add("is-invalid");
            }
            if (document.querySelector(".element-input-quantity").value == "") {
                document.querySelector(".element-input-quantity").classList.add("is-invalid");
            }
            if (!(document.querySelector(".element-input-quantity").value == "") && !(document.querySelector(".element-input-name").value == "")) {
                alert("xd")
                if (document.querySelector(".element-set-store").options[document.querySelector(".element-set-store").selectedIndex].text == document.querySelector(".element-set-store").options[0].text) {
                    selectedList.addElement(new element(document.querySelector(".element-input-name").value, document.querySelector(".element-input-quantity").value, document.querySelector(".element-input-price").value, "Nincs bolt", false));
                }
                else {
                    selectedList.addElement(new element(document.querySelector(".element-input-name").value, document.querySelector(".element-input-quantity").value, document.querySelector(".element-input-price").value, document.querySelector(".element-input-store").options[document.querySelector(".element-input-store").selectedIndex].text, false));
                }
                alert(selectedList.getElements())
                $(".modal").modal("hide");
                write();
            }
            write();
        })
        page = document.querySelectorAll(".page");

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


        document.querySelector(".filter").addEventListener("change", function () {
            mainTableElements = [];
            if (document.querySelector(".filter").options[document.querySelector(".filter").selectedIndex].text == document.querySelector(".filter").options[0].text) {
                mainTableElements = selectedList.getElements();
            }
            else {
                for (let i = 0; i < selectedList.getElements().length; i++) {
                    if (document.querySelector(".filter").options[document.querySelector(".filter").selectedIndex].text == selectedList.getElements()[i].getStore()) {
                        mainTableElements.push(selectedList.getElements()[i]);
                    }

                }
            }
            writeTable();
        })
        //sort by name ascending
        document.querySelector(".sort-by-name-asc").addEventListener("click", function () {
            let temp;
            for (let i = 0; i < mainTableElements.length; i++) {
                for (let j = i + 1; j < mainTableElements.length; j++) {
                    if (mainTableElements[i].getName() > mainTableElements[j].getName()) {
                        console.log(mainTableElements[i]);
                        temp = mainTableElements[i];
                        mainTableElements[i] = mainTableElements[j];
                        mainTableElements[j] = temp;
                    }
                }
            }
            write();
        })
        //sort by name descending

        document.querySelector(".sort-by-name-desc").addEventListener("click", function () {
            let temp;
            for (let i = 0; i < mainTableElements.length; i++) {
                for (let j = i + 1; j < mainTableElements.length; j++) {
                    if (mainTableElements[i].getName() < mainTableElements[j].getName()) {
                        console.log(mainTableElements[i]);
                        temp = mainTableElements[i];
                        mainTableElements[i] = mainTableElements[j];
                        mainTableElements[j] = temp;
                    }
                }
            }
            write();
        })

        //sort by price ascending
        document.querySelector(".sort-by-price-asc").addEventListener("click", function () {
            let temp;
            for (let i = 0; i < mainTableElements.length; i++) {
                for (let j = i + 1; j < mainTableElements.length; j++) {
                    if (mainTableElements[i].getPrice() > mainTableElements[j].getPrice()) {
                        console.log(mainTableElements[i]);
                        temp = mainTableElements[i];
                        mainTableElements[i] = mainTableElements[j];
                        mainTableElements[j] = temp;
                    }
                }
            }
            write();
        })
        //sort by price descending
        document.querySelector(".sort-by-price-desc").addEventListener("click", function () {
            let temp;
            for (let i = 0; i < mainTableElements.length; i++) {
                for (let j = i + 1; j < mainTableElements.length; j++) {
                    if (mainTableElements[i].getPrice() < mainTableElements[j].getPrice()) {
                        console.log(mainTableElements[i]);
                        temp = mainTableElements[i];
                        mainTableElements[i] = mainTableElements[j];
                        mainTableElements[j] = temp;
                    }
                }
            }
            write();
        })

    }
})
//functions
function getNotallgreen() {
    flag = false;
    index = 0;
    while (index < lists.length && !flag) {
        for (let j = 0; j < lists[index].getElements().length; j++) {
            if (!lists[index].getElements()[j].getIsBought()) {
                flag = true;
            }
        }
        if (flag) {
            selectedList = lists[index];
        }
        index++;
    }
    return selectedList;

}
function clearDivs() {
    document.querySelector(".elements-list-out").innerHTML = "";
    document.querySelector(".store-table").innerHTML = "";
    document.querySelector(".lists").innerHTML = "";
    document.querySelector(".element-div-container").innerHTML = "";
    document.querySelector(".dropdown-menu").innerHTML = "";
    let formSelect = document.querySelectorAll(".form-select");
    for (let i = 0; i < formSelect.length; i++) {
        formSelect[i].innerHTML = "";

    }
}
function writeTable() {
    let sum = 0;
    for (let i = 0; i < mainTableElements.length; i++) {
        if (mainTableElements[i] != null) {
            sum += (mainTableElements[i].getQuantity() * mainTableElements[i].getPrice());
        }
    }
    document.querySelector(".sum").innerHTML = sum + " Ft";
    document.querySelector(".elements-list-out").innerHTML = "";
    for (let i = 0; i < mainTableElements.length; i++) {
        if (mainTableElements[i] != null) {
            document.querySelector(".elements-list-out").innerHTML += mainTableElements[i].toTr();
        }
    }
    //selectelements
    let elements = document.querySelectorAll(".element");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            if (elements[i].classList.contains("selected-element")) {
                elements[i].classList.remove("selected-element");
                selectedList.getElements()[i].setIsBought(false);
            } else {
                elements[i].classList.add("selected-element");
                selectedList.getElements()[i].setIsBought(true);
            }
        });
    }
}
function write() {
    clearDivs();
    for (let i = 0; i < mainTableElements.length; i++) {
        if (mainTableElements[i] != null) {
            document.querySelector(".elements-list-out").innerHTML += mainTableElements[i].toTr();
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
    let listdivs = document.querySelectorAll(".list");
    let circlePlacesList = document.querySelectorAll(".circle-list");

    for (let i = 0; i < listdivs.length; i++) {

        listdivs[i].addEventListener("click", function (event) {
            if (event.target === listdivs[i]) {
                if (listdivs[i].classList.contains("selected-list") || listdivs[i].classList.contains("plus")) {
                    listdivs[i].classList.remove("selected-list");
                    toDelList.splice(listdivs[i].classList[2], 1);
                    circlePlacesList[i - 1].innerHTML = "";
                    circlePlacesList[i - 1].innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-circle circle-list\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg>";
                } else {
                    listdivs[i].classList.add("selected-list");
                    toDelList.push(listdivs[i].classList[2]);
                    circlePlacesList[i - 1].innerHTML = "";
                    circlePlacesList[i - 1].innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle circle-list\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/><path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/></svg>";
                }
            }
        });

    }
    //selectelements
    let elements = document.querySelectorAll(".element");
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener("click", function () {
            if (elements[i].classList.contains("selected-element")) {
                elements[i].classList.remove("selected-element");
                selectedList.getElements()[i].setIsBought(false);
                write();
            } else {
                elements[i].classList.add("selected-element");
                selectedList.getElements()[i].setIsBought(true);
                write();
            }
        });

    }

    //selectelement-div
    let elementsDiv = document.querySelectorAll(".element-div");
    let circlePlaces = document.querySelectorAll(".circle");
    for (let i = 0; i < elementsDiv.length; i++) {
        elementsDiv[i].addEventListener("click", function (event) {
            if (event.target == elementsDiv[i]) {
                if (elementsDiv[i].classList.contains("selected-div")) {
                    elementsDiv[i].classList.remove("selected-div");
                    circlePlaces[i].innerHTML = "";
                    circlePlaces[i].innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-circle circle\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg>";
                    toDelElements.splice(elementsDiv[i].classList[2], 1);
                } else {
                    elementsDiv[i].classList.add("selected-div");
                    circlePlaces[i].innerHTML = "";
                    circlePlaces[i].innerHTML += "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-x-circle circle\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/><path d=\"M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708\"/></svg>";
                    toDelElements.push(elementsDiv[i].classList[2]);
                }
            }
        });
    }

    //select input
    let formSelect = document.querySelectorAll(".form-select");

    for (let i = 0; i < formSelect.length; i++) {
        for (let j = 0; j < storeslist.length; j++) {
            if (storeslist[j] != null) {
                formSelect[i].innerHTML += "<option>" + storeslist[j].getName() + "</option>";
            }
        }
    }
    //store writeout
    const TableElementCount = 10;
    let storeslistLength = 0;
    storeslist.splice(0, 1);
    for (let i = 0; i < storeslist.length; i++) {
        if (storeslist[i] != null) {
            storeslistLength++;
        }
    }

    let tableNumber = Math.ceil(storeslistLength / TableElementCount);
    let div = document.querySelector(".store-table");
    div.innerHTML = "";
    let storeindex = 0;

    for (let i = 0; i < tableNumber; i++) {
        div.innerHTML += "<table class=\"table page-" + i + " page\"><tr><td>" + (i + 1) + "/" + tableNumber + "</td></tr><tr><th>Név</th><th>Cím</th><th>Nyitvatartás</th><th></th></tr></table>";

        let table = document.querySelector(".page-" + i)

        for (let j = 0; j < TableElementCount; j++) {
            if (storeindex < storeslist.length) {

                while (storeslist[storeindex] == null && storeindex < storeslist.length) {
                    storeindex++;


                }
                if (storeslist[storeindex] != null) {

                    table.innerHTML += storeslist[storeindex].toTr();
                    storeindex++;
                }
            }

        }
    }
    storeslist.splice(0, 0, new store("Kérjük válasszon egyet!", "", ""));
    //edit store
    let editStores = document.querySelectorAll(".btn-set-store");
    for (let i = 0; i < editStores.length; i++) {

        editStores[i].addEventListener("click", function () {

            for (let j = 0; j < storeslist.length; j++) {
                if (storeslist[j] != null) {
                    if (editStores[i].classList[2] == storeslist[j].getId()) {
                        index = j;
                    }
                }
            }

            document.querySelector(".store-set-name-label").innerHTML = storeslist[index].getName();
            document.querySelector(".store-set-address-label").innerHTML = storeslist[index].getAddress();
            document.querySelector(".store-set-opening-label").innerHTML = storeslist[index].getOpening();

            storeslist[index].setName(document.querySelector(".store-set-name").value = storeslist[index].getName());
            storeslist[index].setAddress(document.querySelector(".store-set-address").value = storeslist[index].getAddress());
            storeslist[index].setOpening(document.querySelector(".store-set-opening").value = storeslist[index].getOpening());
        })
    }


    let stores = document.querySelectorAll(".store");
    for (let i = 0; i < stores.length; i++) {
        stores[i].addEventListener("click", function (event) {
            // Check if the clicked element is the button
            if (event.target.tagName.toLowerCase() === 'button') {
                // Do nothing if the clicked element is a button
                return;
            }

            // Your selection logic
            if (stores[i].classList.contains("selected-todel-element")) {
                stores[i].classList.remove("selected-todel-element");
                toDelStores.splice(stores[i].classList[1], 1);
            } else {
                stores[i].classList.add("selected-todel-element");
                toDelStores.push(stores[i].classList[1]);
            }
        });
    }



    //page (storepage)
    pages = document.querySelectorAll(".page");
    for (let i = 1; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    page = 0;

    let openBtns = document.querySelectorAll(".btn-open");
    let n;
    for (let i = 0; i < openBtns.length; i++) {
        openBtns[i].addEventListener("click", function () {
            n = openBtns[i].classList[2];
            selectedList = lists[n];
            mainTableElements = selectedList.getElements();
            write();
            load(document.querySelector(".starting-container"));
        });
    }
    let openDrpdwns = document.querySelectorAll(".open");
    for (let i = 0; i < openDrpdwns.length; i++) {
        openDrpdwns[i].addEventListener("click", function () {
            n = openDrpdwns[i].classList[2];
            selectedList = lists[n];
            mainTableElements = selectedList.getElements();

            write();
            load(document.querySelector(".starting-container"));
        });
    }

    //becsült összeg
    let sum = 0;
    for (let i = 0; i < mainTableElements.length; i++) {
        if (mainTableElements[i] != null) {
            sum += (mainTableElements[i].getQuantity() * mainTableElements[i].getPrice());
        }
    }
    document.querySelector(".sum").innerHTML = sum + " Ft";

    //list rename
    let listName = document.querySelectorAll(".list-name");
    for (let i = 0; i < listName.length; i++) {
        listName[i].innerHTML = selectedList.getName() + "<sup><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"10\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\"><path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/><path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z\"/></svg></sup>";
        listName[i].addEventListener("click", function () {

            let originalText = selectedList.getName();
            document.querySelectorAll(".list-rename")[i].innerHTML = '<div class="input-group mb-3"><input type="text" class="form-control" required placeholder="' + selectedList.getName() + '" aria-label="Recipients username" aria-describedby="button-addon2"> <button class="btn btn-primary btn-rename" type="button" id="button-addon2">Átnevezés</button></div>';


            let inputElement = document.querySelectorAll(".list-rename")[i].querySelector('input');
            inputElement.focus();
            document.querySelector(".btn-rename").addEventListener("click", function () {
                document.querySelector(".list-input-name").classList.remove("is-invalid");
                if (inputElement.value == "") {
                    inputElement.classList.add("is-invalid");
                }
                else {
                    $(".modal").modal("hide");
                    document.querySelector(".list-input-name").value = "";
                    selectedList.setName(inputElement.value);
                    document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                    write();
                }

            })
            $(document).off("keydown");
            $(document).on("keydown", function (event) {
                switch (event.keyCode) {
                    case 13: // Enter key
                        document.querySelector(".list-input-name").classList.remove("is-invalid");
                        if (inputElement.value == "") {
                            inputElement.classList.add("is-invalid");
                        }
                        else {
                            $(".modal").modal("hide");
                            document.querySelector(".list-input-name").value = "";
                            selectedList.setName(inputElement.value);
                            document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                            write();
                        }
                        break;
                    case 27: // Escape key
                        document.querySelectorAll(".list-rename")[i].innerHTML = '<p class="list-name"><sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';
                        write();
                        break;
                }
            });

        });
    }

    //edit element
    let editElements = document.querySelectorAll(".btn-set-element");
    for (let i = 0; i < editElements.length; i++) {

        editElements[i].addEventListener("click", function () {
            for (let j = 0; j < selectedList.getElements().length; j++) {
                if (selectedList.getElements()[j] != null) {
                    if (editElements[i].classList[2] == selectedList.getElements()[j].getId()) {
                        index = j;
                    }
                }
            }
            console.log(selectedList.getElements()[index].getName() + " " + index)
            document.querySelector(".element-set-name-label").innerHTML = selectedList.getElements()[index].getName();
            document.querySelector(".element-set-quantity-label").innerHTML = selectedList.getElements()[index].getQuantity();
            document.querySelector(".element-set-price-label").innerHTML = selectedList.getElements()[index].getPrice() + " (optional)";
            document.querySelector(".element-set-store").value = selectedList.getElements()[index].getStore();
            
  

            selectedList.getElements()[index].setName(document.querySelector(".element-set-name").value = selectedList.getElements()[index].getName());
            selectedList.getElements()[index].setQuantity(document.querySelector(".element-set-quantity").value = selectedList.getElements()[index].getQuantity());
            selectedList.getElements()[index].setPrice(document.querySelector(".element-set-price").value = selectedList.getElements()[index].getPrice());
        })
    }

    //feltöltés
    remove(ref(db, "data"), {
    })
        .catch((error) => {
            console.log(error);
        })
    let listIndex = 0;
    let elementIndex;
    for (let i = 0; i < lists.length; i++) {
        if (lists[i] !== null) {
            set(ref(db, "data/lists/" + listIndex), {
                name: lists[i].getName(),
                elements: elements
            });
            elementIndex = 0;
            for (let j = 0; j < lists[i].getElements().length; j++) {
                if (lists[i].getElements()[j] != null) {
                    set(ref(db, "data/lists/" + listIndex + "/elements/" + elementIndex), {
                        name: lists[i].getElements()[j].getName(),
                        quantity: lists[i].getElements()[j].getQuantity(),
                        price: lists[i].getElements()[j].getPrice(),
                        store: lists[i].getElements()[j].getStore(),
                        isBought: lists[i].getElements()[j].getIsBought()

                    });
                    elementIndex++;
                }
            }
            listIndex++;
        }
    }
    let storeIndex = 0;
    for (let i = 0; i < storeslist.length; i++) {
        if (storeslist[i] !== null) {
            set(ref(db, "data/stores/" + storeIndex), {
                name: storeslist[i].getName(),
                address: storeslist[i].getAddress(),
                opening: storeslist[i].getOpening()

            });
            storeIndex++;
        }
    }



}





