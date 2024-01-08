class element{
    #name;
    #price;
    #store;
    #quantity
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
    toTr() {
        return "<tr class=\"element\"><td>"+this.getName()+"</td><td>"+this.getQuantity()+"</td><td>"+this.getPrice()+"</td><td>"+this.getStore()+"</td></tr>";
    }
    toString() {
        return this.getName()+" "+this.getPrice()+" "+this.getStore()+" "+this.getQuantity();
    }
}