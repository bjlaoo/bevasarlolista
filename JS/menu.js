//functions
function clear() {
    const sections = document.querySelectorAll('section');
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
document.querySelector(".main-page").addEventListener("click",function(){
    load(document.querySelector(".startingContainer"));
})
document.querySelector(".lists-page").addEventListener("click",function(){
    load(document.querySelector(".listContainer"));
})
document.addEventListener("DOMContentLoaded", function() {
    load(document.querySelector(".startingContainer"));
});
