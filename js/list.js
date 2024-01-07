class list{
    #name;
    #things=[];
    constructor(name){
        this.setName(name)
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name=name;
    }
    addThing(thing){
        this.#things.push(thing);
    }
    getThings(){
        return this.#things;
    }
    toString() {
        let text="";
        text+=this.getName()+": <br>";
        for(let i=0;i<this.getThings().length;i++){
            text+=this.#things[0];
        }
        return text;
    }
}