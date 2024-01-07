let windowWidth = window.matchMedia("(max-width: 600px)")
const main=document.querySelector(".main-page");
//functions
function clear() {
    let sections = document.querySelectorAll('section');
    for(let i=0;i<sections.length;i++){
        sections[i].style.display = "none";
    };
}
function load(page){
    clear();
    page.style.display="block";
}

clear();
//oldalak betöltése
main.addEventListener("click",function(){
    load(document.querySelector(".starting-container"));   
})
document.querySelector(".lists-page").addEventListener("click",function(){
    load(document.querySelector(".list-container"));
})
document.addEventListener("DOMContentLoaded", function() {
    load(document.querySelector(".starting-container"));
});

