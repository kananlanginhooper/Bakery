import React from 'react';
import styles from './CustomerOrderScreen.module.css'

class CustomerOrderScreen extends React.Component {

    render() {
        const src = '/customer/'+this.props.customerID;
        return (
            <div>
                <img className={styles.iPhoneBackground} src='iPhoneFrame.png'/>

                <iframe className={styles.iPhone} src={src} />
            </div>
        );
    }
}

export default CustomerOrderScreen;
