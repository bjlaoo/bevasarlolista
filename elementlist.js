class elementlist{
    #name;
    #elements=[];
    constructor(name){
        this.setName(name)
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name=name;
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
        return "<div class=\"list center\"><div><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-open\">Megnyitás</button></div></div>"
    }
}