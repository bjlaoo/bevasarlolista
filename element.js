class element{
    #name;
    #price;
    #store;
    #quantity;
    constructor(name,quantity,price,store){
        this.setName(name);
        this.setQuantity(quantity);
        this.setPrice(price);
        this.setStore(store);
  
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
    toDiv(){
        return "<div class=\"list center\"><div><p>"+this.getName()+"</p><button type=\"button\" class=\"btn btn-warning\" data-bs-toggle=\"modal\" data-bs-target=\".set\">Szerkesztés</button></div></div>"
    }
    toString() {
        return this.getName()+" "+this.getPrice()+" "+this.getStore()+" "+this.getQuantity();
    }
}