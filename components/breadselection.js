import styles from './breadselection.module.css'
import BreadList, {Bread} from '../src/BreadDefault'
import React from "react";
import BaseClass from "../context/baseclass";
import { interpret } from "xstate";
import Button from "@material-ui/core/Button";
import Router, { withRouter } from 'next/router'

function ShowBread(props) {
    // Correct! There is no need to specify the key here:
    return <div className={styles.BreadBox} onClick={props.funHandleClick}>
        {props.BreadName} <br />
        <img className={styles.SmallBreadImage} src={props.BreadImage} />
        {props.BreadSelected
            ? <img className={styles.BakingToday} src='BakingToday.png' />
            : ''
        }
    </div>;
}

export class BreadSelection extends BaseClass{

    constructor(props) {
        super(props);
    }

    handleClick(BreadName) {
        let state = this.state;
        const ThisBread = state.context.TodaysBreadList.filter(Bread => Bread.BreadName === BreadName)[0];
        ThisBread.Selected = !ThisBread.Selected; // toggle selection of bread
        this.SaveToStateAndLocalstorage(state)
    }

    SelectedBread(){
        Router.push({ pathname: '/bakery', state: { pattern: '' } });
    }

    render() {
        let BreadDivs = [];
        BreadDivs = this.state.context.TodaysBreadList.map((bread) =>
            <ShowBread key={bread.BreadName}
                       BreadName={bread.BreadName}
                       BreadImage={bread.BreadImage_Square}
                       BreadImageSquare={bread.BreadImage_Square}
                       BreadImgRound={bread.BreadImage_Round}
                       BreadSelected={bread.Selected}
                       funHandleClick={() => this.handleClick(bread.BreadName)} />
        );
        const SelectedBreads = this.state.context.TodaysBreadList.filter(Bread => Bread.Selected).length;

        return (
            <div className={styles.BreadDiv}>
                {BreadDivs}
                {this.state.context.TodaysBreadList.filter(Bread => Bread.Selected).length > 0
                    ? <Button className={styles.ContinueButton} variant="contained" onClick={this.SelectedBread}>Open for the day</Button>
                    : ''
                }
            </div>
        );
    }
}
