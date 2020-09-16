import styles from './breadselectionCustomer.module.css'
import BreadList from '../src/BreadDefault'
import {Bread} from '../classes/Bread'
import Customer from '../classes/Customer'
import React from "react";
import BaseClass from "../context/baseclass";
import Button from "@material-ui/core/Button";
import Router, { withRouter } from 'next/router'

function ShowBread(props) {
    return <div className={styles.BreadBox}>
        <div className={styles.left} onClick={props.funHandleSquare}>
            Square {props.BreadName} <br />
            <img className={styles.SmallBreadImage} src={props.BreadImageSquare} />
            {props.PanSelected
                ? <img className={styles.BakingToday} src={props.OverlayImg} />
                : ''
            }
        </div>
        <div className={styles.left}  onClick={props.funHandleRound}>
            Round {props.BreadName} <br />
            <img className={styles.SmallBreadImage} src={props.BreadImgRound} />
            {props.RoundSelected
                ? <img className={styles.BakingToday} src={props.OverlayImg} />
                : ''
            }
        </div>
    </div>;
}

export class BreadSelectionCustomer extends BaseClass{

    Mode;
    constructor(props) {
        super(props);
        this.Mode = props.mode;
    }

    customerID;
    componentDidMount() {
        this.CallMount();
        // For dynamic routing, which doesn't work on AWS Amplify...
        // const path = window.location.pathname;
        // this.customerID = path.split('/')[2];

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.customerID = urlParams.get('customerID');

        addEventListener("storage",(e) => {
            debugger; // BreadSelectionCustomer.js
            this.ReloadState();
        });
    }

    funHandleSquare(BreadName) {
        this.funHandle(BreadName, 'Square');
    }
    funHandleRound(BreadName) {
        this.funHandle(BreadName, 'Round');
    }
    funHandle(BreadName, type) {
        let state = this.state;
        let customer = state.customers.filter(data => data.id.toString() === this.customerID);

        if(!customer.length) debugger

        const ThisCustomer = customer[0];

        if(!ThisCustomer.Order) debugger

        const BreadType = ThisCustomer.Order.filter(bread => bread.BreadName === BreadName)[0];

        if(type === 'Round'){
            BreadType.RoundSelected = !BreadType.RoundSelected; // toggle selection of bread
            if(BreadType.RoundSelected && BreadType.PanSelected) BreadType.PanSelected = false
        }else{
            BreadType.PanSelected = !BreadType.PanSelected; // toggle selection of bread
            if(BreadType.RoundSelected && BreadType.PanSelected) BreadType.RoundSelected = false
        }

        this.SaveToStateAndLocalstorage(state)
    }

    SelectedBread(){
        let state = this.state;
        let customer = state.customers.filter(data => data.id.toString() === this.customerID);
        const ThisCustomer = customer[0];
        ThisCustomer.OrderPlaced = true;
        this.SaveToStateAndLocalstorage(state)

        const src = '/customer?customerID='+this.customerID;
        Router.reload();
    }

    Void(){}

    render() {

        let AvailableBread;
        let ThisCustomer;
        if(this.customerID) {
            let state = this.state;
            const customer = state.customers.filter(data => data.id.toString() === this.customerID);
            ThisCustomer = customer[0];
            AvailableBread = ThisCustomer.Order.filter(data => data.Selected)
        }else{
            AvailableBread = this.state.context.TodaysBreadList.filter(data => data.Selected)
        }

        let BreadDivs = [];
        if(this.Mode === 'Confirmed'){
            BreadDivs = AvailableBread.map((bread) =>
                <ShowBread key={bread.BreadName}
                           BreadName={bread.BreadName}
                           BreadImage={bread.BreadImage_Square}
                           BreadImageSquare={bread.BreadImage_Square}
                           BreadImgRound={bread.BreadImage_Round}
                           RoundSelected={bread.DeliverRound}
                           PanSelected={bread.DeliverPan}
                           OverlayImg='/Delivered.png'
                />
            );
        }else if(this.Mode === 'OrderIssue' ){
            BreadDivs = AvailableBread.map((bread) =>
                <ShowBread key={bread.BreadName}
                           BreadName={bread.BreadName}
                           BreadImage={bread.BreadImage_Square}
                           BreadImageSquare={bread.BreadImage_Square}
                           BreadImgRound={bread.BreadImage_Round}
                           RoundSelected={bread.RoundSelected}
                           PanSelected={bread.PanSelected}
                           OverlayImg='/Ordered.png'
                />
            );
        }else{
            BreadDivs = AvailableBread.map((bread) =>
                <ShowBread key={bread.BreadName}
                           BreadName={bread.BreadName}
                           BreadImage={bread.BreadImage_Square}
                           BreadImageSquare={bread.BreadImage_Square}
                           BreadImgRound={bread.BreadImage_Round}
                           RoundSelected={bread.RoundSelected}
                           PanSelected={bread.PanSelected}
                           funHandleSquare={() => this.funHandleSquare(bread.BreadName)}
                           funHandleRound={() => this.funHandleRound(bread.BreadName)}
                           OverlayImg='/Ordered.png'
                />
            );
        }

        if(ThisCustomer && ThisCustomer.OrderIssue) {
            return (
                <div className={styles.BreadDiv}>
                    {BreadDivs}
                    {AvailableBread.filter(Bread => (Bread.RoundSelected || Bread.PanSelected)).length > 0
                        ? <Button className={styles.ContinueButton} variant="contained"
                                  onClick={this.SelectedBread.bind(this)}>Update Order</Button>
                        : ''
                    }
                </div>
            );
        }else if(ThisCustomer && ThisCustomer.OrderConfirmed) {
            return (
                <div className={styles.BreadDiv}>
                    {BreadDivs}
                </div>
            );
        }else {
            return (
                <div className={styles.BreadDiv}>
                    {BreadDivs}
                    {AvailableBread.filter(Bread => (Bread.RoundSelected || Bread.PanSelected)).length > 0
                        ? <Button className={styles.ContinueButton} variant="contained"
                                  onClick={this.SelectedBread.bind(this)}>Order Selected Items</Button>
                        : ''
                    }
                </div>
            );
        }
    }
}
