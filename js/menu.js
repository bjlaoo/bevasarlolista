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
//loading pages
main.addEventListener("click",function(){
    load(document.querySelector(".starting-container"));   
})
document.querySelector(".lists-page").addEventListener("click",function(){
    load(document.querySelector(".list-container"));
})
document.querySelector(".stores-page").addEventListener("click",function(){
    load(document.querySelector(".stores-container"));
})
document.querySelector(".set-elements").addEventListener("click",function(){
    load(document.querySelector(".element-container"));
})
document.addEventListener("DOMContentLoaded", function() {
    load(document.querySelector(".starting-container"));
});
btns=document.querySelectorAll(".btn-open");

for(let i=0;i<btns.length;i++){
    btns[i].addEventListener("click",function(){
    load(document.querySelector(".starting-container"));   
    })
}