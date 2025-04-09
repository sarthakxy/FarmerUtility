import React from 'react';
import Payments from '../Components/Payments'; // Import the Payments component
import './PaymentTrackerPage.css';


const PaymentTrackerPage = () => {
    return (
        <div>
            <h1>Payment Tracker</h1>
            <Payments /> {/* Render Payments component */}
        </div>
    );
};

export default PaymentTrackerPage;
