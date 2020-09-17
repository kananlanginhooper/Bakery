class Customer {

    id;
    Order = false;
    Remote = false;
    OrderPlaced = false;
    OrderIssue = false;
    OrderConfirmed = false;

    constructor(id) {
        this.id = id;
    }

}

export default Customer;
