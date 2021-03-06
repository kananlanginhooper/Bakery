import React from "react";
import BreadList from '../src/BreadDefault'

class BaseClass extends React.Component{

    isMounted = false;

    constructor(props) {
        super(props);
        this.StartRestart();
    }

    StartRestart(){
        const context = { TodaysBreadList: BreadList() };
        const statestate = 'selectBread';
        const state = {
            customers: [],
            context: context,
            state: statestate,
            BakingSolution: {}
        };
        this.state = state;
        this.SaveToStateAndLocalstorage(state)
    }

    SaveToStateAndLocalstorage(state){
        if(this.isMounted){

            this.setState({ customers: state.customers } );
            localStorage.setItem('customers', JSON.stringify(state.customers));

            this.setState({ state: state.state } );
            localStorage.setItem('state', state.state);

            this.setState({ context: state.context } );
            localStorage.setItem('context', JSON.stringify(state.context));

            this.setState({ BakingSolution: state.BakingSolution } );
            localStorage.setItem('BakingSolution', JSON.stringify(state.BakingSolution));
        }
    }

    ReloadState(){
        if(this.isMounted) {
            const context = localStorage.getItem('context');
            const state = localStorage.getItem('state');
            const customers = localStorage.getItem('customers');
            const BakingSolution = localStorage.getItem('BakingSolution');

            if (context) {
                this.setState({context: JSON.parse(context)});
            }
            if (state) {
                this.setState({state: state});
            }

            if (customers) {
                this.setState({customers: JSON.parse(customers)});
            }

            if (BakingSolution) {
                this.setState({BakingSolution: JSON.parse(BakingSolution)});
            }
        }
    }

    CallMount(){
        this.isMounted = true;
        this.ReloadState();
    }

    componentDidMount() {
        this.CallMount();
    }

}

export default BaseClass;


