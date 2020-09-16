import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import {BreadSelection} from '../components/breadselection'
import BaseClass from "../context/baseclass";
import Grid from '@material-ui/core/Grid';
import styles from "../components/breadselection.module.css";
import Draggable from 'react-draggable';
import CustomerOrderScreen from '../components/CustomerOrderScreen'
import Customer from '../classes/Customer'
import AnalyzeOrders from '../classes/AnalyzeOrders'
import Router from "next/router";
import theme from '../src/theme';


class Bakery extends BaseClass{

    constructor(props) {
        super(props);
    }

    NewCustomer(Remote) {
        let state = this.state;
        // state.customers = [];
        const NextCustomerNumber = state.customers.length;
        const customerClass = new Customer(NextCustomerNumber)
        customerClass.Remote = Remote;

        if(!customerClass.Order){
            customerClass.Order = this.state.context.TodaysBreadList;
        }

        state.customers.push(customerClass);
        this.SaveToStateAndLocalstorage(state);

        if(Remote){
            const url = '/customer/'+NextCustomerNumber;
            const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
            if (newWindow) newWindow.opener = null
        }
    }
    AddCustomer() {
        this.NewCustomer(false);
    }

    AddCustomerNew() {
        this.NewCustomer(true);
    }

    handleStart(e, ui){
        if(isNaN(ui.node.zIndex)){
            ui.node.zIndex = 10;
        }else {
            ui.node.zIndex += 10;
        }
    }

    componentDidMount() {
        this.CallMount();
        addEventListener("storage",(e) => {
            debugger; // bakery.js
            this.ReloadState();
            if(this.state.state === 'Process'){
                this.CloseOutDay();
            }
        });
    }


    CloseOutDay(){
        const Analyze = new AnalyzeOrders(this.state.context.TodaysBreadList, this.state.customers);

        const [customersAfterChanges, AllConflictsResolved, BakingSolution, MatchCount, PanCount] = Analyze.run();
        let state = this.state;

        debugger;
        if(AllConflictsResolved){
            state.state = 'Complete';
            customersAfterChanges.forEach(customer => {
                customer.OrderIssue = false;
                customer.OrderConfirmed = true;
            });
            state.customers = customersAfterChanges;
            state.BakingSolution = BakingSolution;
        }else {
            state.state = 'Process';
            state.customers = customersAfterChanges;
        }
        this.SaveToStateAndLocalstorage(state);

    }

    GoHome(){
        Router.push('/');
    }

    render() {

        debugger
        const Customers = [];

        let OrdersWaiting = 0;

        if(this.state.customers && this.state.customers.entries()){
            for (const [index, value] of this.state.customers.entries()) {
                if(!value.Remote) {
                    Customers.push(<Draggable onStart={this.handleStart} key={value.id}>
                        <div><CustomerOrderScreen customerID={value.id}/></div>
                    </Draggable>)
                }
                if(value.OrderPlaced){
                    OrdersWaiting++;
                }

            }
        }

        let S = 's';
        if(OrdersWaiting === 1){
            S = '';
        }

        const state = this.state.state;

        if(state === 'Complete'){
            let BakingSolutionDivs = [];
            BakingSolutionDivs = this.state.BakingSolution.map((bread) =>
                <span key={bread.BreadName}>
                    {bread.BreadName} in a {bread.BakingPan ? 'Pan' : 'Round' }
                </span>
            );

            return (
                <Grid container spacing={1} className='FrameBackground' >
                    <Grid item xs={8}>
                        <Box bgcolor="#f5eade" className='FullHeight'>
                            {Customers}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box bgcolor="#f5eade" p={2} className='AdminPanel'>
                            <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                            <div className="Bounding">
                                <h1 className="StartLink">
                                    YAY!  We shipped {OrdersWaiting} order{S}!
                                </h1>

                                We are baking:
                                <br />
                                {BakingSolutionDivs}
                                <br />
                                <br />
                                <Button variant="contained" onClick={this.GoHome}>Start Over</Button>
                                {/*<Button variant="contained" onClick={this.CloseOutDay.bind(this)}>Stop taking orders and process</Button>*/}
                            </div>
                            <Copyright/>

                        </Box>
                    </Grid>
                </Grid>
            );
        }else{
            return (
                <Grid container spacing={1} className='FrameBackground' >
                    <Grid item xs={8}>
                        <Box bgcolor="#f5eade">
                            <Button className='AddCustomerBtn' variant="contained" onClick={this.AddCustomer.bind(this)}>Add Customer In This Window</Button>
                            {/*<Button className='AddCustomerBtnNew' variant="contained" onClick={this.AddCustomerNew.bind(this)}>Add Customer In New Window</Button>*/}
                            {Customers}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box bgcolor="#f5eade" p={2} className='AdminPanel'>
                            <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                            <div className="Bounding">
                                <h1 className="StartLink">
                                    Ready for Orders: {OrdersWaiting} order{S} waiting.
                                </h1>

                                <Button variant="contained" onClick={this.CloseOutDay.bind(this)}>Stop taking orders and process</Button>

                            </div>
                            <Copyright/>
                        </Box>
                    </Grid>
                </Grid>
            );
        }
    }
}

export default Bakery;


