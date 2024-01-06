let lists=[];
//majd jsonből kell kiszedni, amit majd firebaseből kell kiszedni.
lists.push(new list("lista"))
big_list = [
    ["alma", 3, 22, "abc"],
    ["banán", 4, 33, "cba"],
    ["cherry", 5, 25, "def"],
    ["date", 2, 18, "ghi"],
    ["elderberry", 7, 30, "jkl"],
    ["fig", 6, 28, "mno"],
    ["grapefruit", 8, 40, "pqr"],
    ["honeydew", 3, 25, "stu"],
    ["kiwi", 4, 33, "vwx"],
    ["lemon", 5, 22, "yz"],
    ["mango", 2, 18, "123"],
    ["nectarine", 7, 30, "456"],
    ["orange", 6, 28, "789"],
    ["pear", 8, 40, "012"],
    ["quince", 3, 25, "345"],
    ["raspberry", 4, 33, "678"],
    ["strawberry", 5, 22, "901"],
    ["tangerine", 2, 18, "234"],
    ["ugli fruit", 7, 30, "567"],
    ["watermelon", 6, 28, "890"]
]
for(let i=0;i<big_list.length;i++){
    lists[0].addThing(new element(big_list[i][0],big_list[i][1],big_list[i][2],big_list[i][3]));
}


document.querySelector("p").innerHTML+=lists[0];//teszt
selectedList=lists[0];//majd le kell szűrni
tbody=document.querySelector("tbody");
things=selectedList.getThings();
tbody.innerHTML+="<tr>"
for(let i=0;i<things.length;i++){
    tbody.innerHTML+=things[i].toTd();
}
tbody.innerHTML+="</tr>"


//list rename
let listName = document.querySelector(".list-name");
listName.innerHTML=selectedList.getName()+"<sup><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"10\" fill=\"currentColor\" class=\"bi bi-pencil-square\" viewBox=\"0 0 16 16\"><path d=\"M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z\"/><path fill-rule=\"evenodd\" d=\"M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z\"/></svg></sup>";
listName.addEventListener("click", function() {
    let originalText=selectedList.getName();
    listName.innerHTML = '<input type="text" class="list-name form-control" placeholder="' + selectedList.getName() + '">';
    
    listName.focus();
    let inputElement = listName.querySelector('input');
    inputElement.focus();

    $(document).on("keydown", function(event) {
        switch (event.keyCode) {
            case 13: // Enter key
                selectedList.setName(inputElement.value);
                listName.innerHTML= '<p class="list-name">'+selectedList.getName()+'<sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>'
                break;
            case 27: // Escape key
                console.log("Escape key pressed");
                listName.innerHTML= '<p class="list-name">'+originalText+'<sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>'
                break;
        }
    });
});

listName.addEventListener("blur",function(){
    alert("xd")
    listName.innerHTML = '<p class="list-name">' + selectedList.getName() + '<sup><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/></svg></sup></p>';

})
