import styles from './breadselection.module.css'
import BreadList, {Bread} from '../src/BreadDefault'
import React from "react";
import BaseClass from "../context/baseclass";
import { interpret } from "xstate";
import Button from "@material-ui/core/Button";
import Router, { withRouter } from 'next/router'

const Sign = ({ Status }) => {
    if(Status === 'Closed') {
        return (
            <div className="">
                <img className="swingimage signSquare" src='https://images-na.ssl-images-amazon.com/images/I/61tUX9WcdxL._AC_SX569_.jpg'/>
            </div>
        );
    }else if(Status === 'OpenSoon') {
        return (
            <div className="">
                <img className="swingimage sign" src='https://images-na.ssl-images-amazon.com/images/I/51e0Ysd5gkL._AC_SY450_.jpg'/>
            </div>
        );
    }else{
        return (
            <div className="">
                <img className="swingimage sign" src='https://images-na.ssl-images-amazon.com/images/I/518vou-GWWL._AC_.jpg'/>
            </div>
        );
    }
}

export default Sign;
