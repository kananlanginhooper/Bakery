import styles from './breadselection.module.css'
import BreadList, {Bread} from '../src/BreadDefault'
import React from "react";
import BaseClass from "../context/baseclass";
import { interpret } from "xstate";
import Button from "@material-ui/core/Button";
import Router, { withRouter } from 'next/router'

const Sign = ({ Open }) => {
    if(!Open) {
        return (
            <div className="">
                <img className="swingimage" src='https://www.safetysign.com/images/source/large-images/R5335.png'/>
            </div>
        );
    }else{
        return (
            <div className="">
                <img className="swingimage" src='https://images-na.ssl-images-amazon.com/images/I/518vou-GWWL._AC_.jpg'/>
            </div>
        );
    }
}

export default Sign;
