class Thing{
    #name;
    #price;
    #store;
    #quantity;
    #isBought;
    static elementCounter = 0;
    #id;
    
    constructor(name,quantity,price,store,isBought){
        this.setName(name);
        this.setQuantity(quantity);
        this.setPrice(price);
        this.setStore(store);
        this.setIsBought(isBought);
        this.setId(Thing.elementCounter++)
  
    }
    getName(){
        return this.#name;
    }
    setName(name){
        this.#name=name;
    }
    getPrice(){
        return this.#price;
    }
    setPrice(price){
        this.#price=price;
    }
    getStore(){
        return this.#store;
    }
    setStore(store){
        this.#store=store;
    }
    getQuantity(){
        return this.#quantity;
    }
    setQuantity(quantity){
        this.#quantity=quantity;
    }
    getIsBought(){
        return this.#isBought;
    }
    setIsBought(isBought){
        this.#isBought=isBought;
    }
    getId(){
        return this.#id;
    }
    setId(id){
        this.#id=id;
    }
    toTr() {

        return "<tr class=\"element" + (this.getIsBought() ? " selected-element" : "") + "\"><td>" + this.getName()+ "</td><td>" + this.getQuantity() + "</td><td>" + (this.getPrice()==""?"-":this.getPrice()) + " Ft</td><td>" + this.getStore() + "</td></tr>";
    }
    
    toDiv(){
        
        return "<div class=\"element-div center "+this.getId()+"\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" fill=\"currentColor\" class=\"bi bi-circle circle\" viewBox=\"0 0 16 16\"><path d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"/></svg><div class=\"name-div\"><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-warning "+this.getId()+" btn-set-element\" data-bs-toggle=\"modal\" data-bs-target=\".set\">Szerkesztés</button></div></div>";
    }
    toString() {
        return this.getName()+" "+this.getPrice()+" "+this.getStore()+" "+this.getQuantity()+" "+this.getId()+" "+this.getIsBought();
    }
}
