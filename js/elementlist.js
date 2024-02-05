
class Elementlist{
    #name;
    static elementCounter = 0;
    #id;
    #elements=[];
    constructor(name){
        this.setName(name);
        this.setId(Elementlist.elementCounter++);
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name=name;
    }
    getId(){
        return this.#id;
    }
    setId(id){
        this.#id=id;
    }
    addElement(element){
        this.#elements.push(element);
    }
    getElements(){
        return this.#elements;
    }
    toString() {
        let text="";
        text+=this.getName()+": ";
        for(let i=0;i<this.getElements().length;i++){
            text+=" "+this.#elements[0];
        }
        return text;
    }
    toDropdown(){
        return '<a class="dropdown-item open '+this.getId()+'" href="#">'+this.getName()+'</a>'
    }
    toDiv(){
        return "<div class=\"list center "+this.getId()+"\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" fill=\"currentColor\" class=\"bi bi-circle circle-list\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg><div class=\"name-div\"><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-open "+this.getId()+"\">Megnyitás</button></div></div>"
    }
}
