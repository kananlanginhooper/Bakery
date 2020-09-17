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
import Sign from "../components/sign"

class Start extends BaseClass{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container maxWidth="sm">
                <Box my={4}>

                    <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                    <div className="Bounding">
                        <Sign Status='OpenSoon' />
                        <h1 className="StartLink">
                            Select Breads to bake, so we can open!
                        </h1>

                        Bread types to be baked today, click to select:

                        <BreadSelection />

                    </div>
                    <Copyright/>
                </Box>
            </Container>
        );
    }
}

export default Start;


