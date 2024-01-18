class element{
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
        this.setId(element.elementCounter++)
  
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

        return "<tr class=\"element" + (this.getIsBought() ? " selected-element" : "") + "\"><td>" + this.getName()+ "</td><td>" + this.getQuantity() + "</td><td>" + this.getPrice() + "</td><td>" + this.getStore() + "</td></tr>";
    }
    
    toDiv(){
        
        return "<div class=\"element-div center "+this.getId()+"\"><div><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-warning "+this.getId()+" btn-set-element\" data-bs-toggle=\"modal\" data-bs-target=\".set\">Szerkesztés</button></div></div>";
    }
    toString() {
        return this.getName()+" "+this.getPrice()+" "+this.getStore()+" "+this.getQuantity()+" "+this.getId()+"<br>";
    }
}
