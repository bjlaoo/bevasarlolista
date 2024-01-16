
class elementlist{
    #name;
    static elementCounter = 0;
    #id;
    #elements=[];
    constructor(name){
        this.setName(name)
        this.setId(elementlist.elementCounter++)
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
        text+=this.getName()+": <br>";
        for(let i=0;i<this.getElements().length;i++){
            text+=this.#elements[0];
        }
        return text;
    }
    toDiv(){
        return "<div class=\"list center "+this.getId()+"\"><div><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-open "+this.getId()+"\">Megnyitás</button></div></div>"
    }
}
