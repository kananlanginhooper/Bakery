import {Bread, SimpleBread} from '../classes/Bread'

class AnalyzeOrders {

    customerData;
    todaysBreadList;
    AllConflictsResolved = true;
    arrBakingPermutations = [];

    constructor(TodaysBreadList, CustomerData) {
        this.customerData = CustomerData;
        this.todaysBreadList = TodaysBreadList;
    }

    run(){

        const BreadsToBakeToday = this.todaysBreadList.filter(data => data.Selected);
        const BreadCount = BreadsToBakeToday.length;

        // create all permutations of what we can bake
        for (let i = 0; i < (1 << BreadCount); i++) {
            const arrBakingPermutation = [];

            BreadsToBakeToday.forEach((bread, j) => {
                const breadBakingOption = new SimpleBread(bread.BreadName, Boolean(i & (1 << j)));
                arrBakingPermutation.push(breadBakingOption);
            });

            this.arrBakingPermutations.push(arrBakingPermutation);
        }

        // Loop through each type of bread that is for sale
        // setup Ordered Flags
        // find which breads we have a conflict on
        // this.todaysBreadList.filter(data => data.Selected).forEach(bread => {
        //     this.customerData.forEach(customer => {
        //         const OrderedForThisBread = customer.Order.filter(orderItem => orderItem.BreadName === bread.BreadName)[0];
        //
        //         if(OrderedForThisBread.RoundSelected){
        //             OrderedForThisBread.DeliverRound = true;
        //         }
        //         if(OrderedForThisBread.PanSelected){
        //             OrderedForThisBread.PanRound = true;
        //         }
        //
        //     });
        // });
        const arrPossibleResults = [];
        this.arrBakingPermutations.forEach(BakingOption => {
            const result = this.TryCombination(this.customerData, BakingOption)
            if(result[1]){
                arrPossibleResults.push(result);
            }
        });

        if(arrPossibleResults.length === 0) {
            return [this.customerData, false, false, 0, 0];
        }else if(arrPossibleResults.length === 1) {
            return arrPossibleResults[0];
        }else {
            // More that one valid combination, need to see which one bakes the most pans
            let TopResult = arrPossibleResults[0];
            let TopResultPanCount = 0;
            let TopResultMatchCount = 0;

            arrPossibleResults.forEach(result => {

                const customerData = result[0];
                const MatchCount = result[3];
                const PanCount = result[4];

                // // count Pans
                // const MapPans = customerData.map(Customer => {
                //     const CustomerData = Customer.Order.map(OrderItem =>{
                //         let ret = 0;
                //         if(OrderItem.DeliverPan) ret = 1;
                //         return ret;
                //     }).reduce((Total, Next) =>{
                //         return Total+Next;
                //     });
                //     return CustomerData;
                // });
                // const PanCount = MapPans.reduce((Total, Next) =>{
                //     return Total+Next;
                // });
                //
                // // count Matches to what was ordered
                // const MapMatches = customerData.map(Customer => {
                //     const CustomerData = Customer.Order.map(OrderItem =>{
                //         let ret = 0;
                //         if(OrderItem.DeliverPan && OrderItem.PanSelected ) ret = 1;
                //         if(OrderItem.DeliverRound && OrderItem.RoundSelected ) ret = 1;
                //         return ret;
                //     }).reduce((Total, Next) =>{
                //         return Total+Next;
                //     });
                //     return CustomerData;
                // });
                // const MatchCount = MapMatches.reduce((Total, Next) =>{
                //     return Total+Next;
                // });

                // Favor matches
                if(MatchCount>TopResultMatchCount){
                    TopResultMatchCount=MatchCount;
                    TopResultPanCount=PanCount;
                    TopResult = result;
                }else if(MatchCount===TopResultMatchCount && PanCount>TopResultPanCount){
                    // Pan count as a tie breaker
                    TopResultMatchCount=MatchCount;
                    TopResultPanCount=PanCount;
                    TopResult = result;
                }
            });

            return TopResult;

        }
    }

    TestAllConflictsResolved(customerData){
        // each customer must get at least one of what they ordered
        let AllCustomersOkay = true;
        customerData.forEach(customer => {
            if(!this.TestCustomerSingleItemFulfilled(customer)){
                AllCustomersOkay = false;
            }
        });
        return AllCustomersOkay;
    }

    TestCustomerSingleItemFulfilled(customerData){
        // each customer must get at least one of what they ordered
        let HaveOneGoodItem = false;
        customerData.Order.forEach(orderItem => {
            if(
                (orderItem.RoundSelected && orderItem.DeliverRound)
                ||
                (orderItem.PanSelected && orderItem.DeliverPan)
            ){
                HaveOneGoodItem = true;
            }
        });
        return HaveOneGoodItem;
    }

    TryCombination(customerData, BakingOption){
        // ALL breads
        let MatchCount = 0;
        let PanCount = 0;

        BakingOption.forEach(bread => {
            customerData.forEach(customer => {
                const OrderItem = customer.Order.filter(orderItem => (orderItem.BreadName === bread.BreadName))[0];
                if(OrderItem.RoundSelected){
                    OrderItem.DeliverPan = bread.BakingPan;
                    OrderItem.DeliverRound = !bread.BakingPan;
                    if(!bread.BakingPan) MatchCount++;
                }else if(OrderItem.PanSelected){
                    OrderItem.DeliverPan = bread.BakingPan;
                    OrderItem.DeliverRound = !bread.BakingPan;
                    if(bread.BakingPan) MatchCount++;
                }
                if(bread.BakingPan) PanCount++;
            });
        });

        return [
            customerData,
            this.TestAllConflictsResolved(customerData),
            BakingOption,
            MatchCount,
            PanCount
        ];

    }
}

export default AnalyzeOrders;
