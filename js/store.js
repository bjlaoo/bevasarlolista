class store{
    #name;
    #address;
    #opening;
    constructor(name,address,opening){
        this.setName(name);
        this.setAddress(address);
        this.setOpening(opening);
  
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

    toTr() {
        return "<tr class=\"store\"><td>"+this.getName()+"</td><td>"+this.getAddress()+"</td><td>"+this.getOpening()+"</td><td><button type=\"button\" class=\"btn btn-warning store-edit store-btn\" data-bs-toggle=\"modal\" data-bs-target=\".set-store\">Szerkesztés</button></td></tr>";
    }
}