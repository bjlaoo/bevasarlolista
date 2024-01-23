class store{
    #name;
    #address;
    #opening;
    static elementCounter = 0;
    #id;
    constructor(name,address,opening){
        this.setName(name);
        this.setAddress(address);
        this.setOpening(opening);
        this.setId(store.elementCounter++)
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name=name;
    }


    getOpening(){
        return this.#opening;
    }
    setOpening(opening){
        this.#opening=opening;
    }
    getAddress(){
        return this.#address;
    }
    setAddress(address){
        this.#address=address;
    }
    getId(){
        return this.#id;
    }
    setId(id){
        this.#id=id;
    }
    toString(){
        return this.getName()+" "+this.getOpening()+" "+this.getAddress()+" "+this.getId();

    }

    toTr() {
        return "<tr class=\"store "+this.getId()+"\"><td>"+this.getName()+" "+this.getId()+"</td><td>"+this.getAddress()+"</td><td>"+this.getOpening()+"</td><td><button type=\"button\" class=\"btn btn-warning store-edit store-btn\" data-bs-toggle=\"modal\" data-bs-target=\".set-store\">Szerkesztés</button></td></tr>";
    }
}