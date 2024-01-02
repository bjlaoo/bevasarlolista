lists=document.querySelector(".lists");
function clear(){
    alert("adéfj")
    containers=document.getElementsByClassName(".page");
    for(let i=0;i<containers.length;i++){
        
        containers[i].style.diplay="none";
    }
}

lists.addEventListener("click",function(){
    clear();
    document.querySelector(".listContainer").style.display="block";
});