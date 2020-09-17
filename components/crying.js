import styles from './breadselection.module.css'
import BreadList, {Bread} from '../src/BreadDefault'
import React from "react";
import BaseClass from "../context/baseclass";
import { interpret } from "xstate";
import Button from "@material-ui/core/Button";
import Router, { withRouter } from 'next/router'

const Crying = () => {
    return (
        <div className="">
            <img className="cryingImage" src='https://media1.giphy.com/media/IzcFv6WJ4310bDeGjo/giphy.gif'/>
        </div>
    );
}

export default Crying;
