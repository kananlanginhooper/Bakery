import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Copyright from '../src/Copyright';
import {BreadSelectionCustomer} from '../components/breadselectionCustomer'
import BaseClass from "../context/baseclass";


class Customer extends BaseClass{
    // static async getInitialProps ({query}) {
    //     this.customerID = query.customerID;
    // }

    customerID;
    constructor(props) {
        super(props);
    }

    Mode = 'Order';
    componentDidMount() {
        this.CallMount();
        // For dynamic routing, which doesn't work on AWS Amplify...
        // const path = window.location.pathname;
        // this.customerID = path.split('/')[2];

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        this.customerID = urlParams.get('customerID');

        // addEventListener("storage",(e) => {
        //     debugger; // customerID.js
        //     this.ReloadState();
        // });
  }

    render() {
        let state = this.state;
        let customer = state.customers.filter(data => data.id.toString() === this.customerID);

        if(customer.length) {
            const ThisCustomer = customer[0];
            if (ThisCustomer.OrderPlaced) {
                this.Mode = 'Waiting';
            }
            if (ThisCustomer.OrderIssue) {
                this.Mode = 'OrderIssue';
            }
            if (ThisCustomer.OrderConfirmed) {
                this.Mode = 'Confirmed';
            }
        }
        if(!this.isMounted){
            return (<div> </div>);
        }else if(this.Mode === 'Order'){
            return (
                <Container maxWidth="sm">
                    <Box my={4}>

                        <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                        <div className="Bounding">
                            <h1 className="StartLink">
                                Today's Available Breads!
                            </h1>

                            Click to Order:

                            <BreadSelectionCustomer mode={this.Mode} />

                        </div>
                        <Copyright/>
                        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-alignCenter">
                            You are customer Number: {this.customerID}
                        </p>

                    </Box>
                </Container>
            );
        }else if(this.Mode === 'Waiting'){
            return (
                <Container maxWidth="sm">
                    <Box my={4}>

                        <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                        <div className="Bounding">
                            <h1 className="StartLink">
                                Your order is being confirmed!
                            </h1>

                            Please wait.

                        </div>
                        <Copyright/>
                        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-alignCenter">
                            You are customer Number: {this.customerID}
                        </p>

                    </Box>
                </Container>
            );
        }else if(this.Mode === 'OrderIssue'){
            return (
                <Container maxWidth="sm">
                    <Box my={4}>

                        <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                        <div className="Bounding">
                            <h1 className="StartLink">
                                There is a problem with your order.
                            </h1>

                            Click to Order:

                            <BreadSelectionCustomer mode={this.Mode} />

                        </div>
                        <Copyright/>
                        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-alignCenter">
                            You are customer Number: {this.customerID}
                        </p>

                    </Box>
                </Container>
            );
        }else if(this.Mode === 'Confirmed'){
            return (
                <Container maxWidth="sm">
                    <Box my={4}>

                        <img className='MainLogo' src='/KananHooperBakeryLogo_526_306.png'/>

                        <div className="Bounding">
                            <h1 className="StartLink">
                                Your order is complete!
                            </h1>

                            This is what we shipped you:

                            <BreadSelectionCustomer mode={this.Mode} />

                        </div>
                        <Copyright/>
                        <p className="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-alignCenter">
                            You are customer Number: {this.customerID}
                        </p>

                    </Box>
                </Container>
            );
        }


    }
}

export default Customer;


