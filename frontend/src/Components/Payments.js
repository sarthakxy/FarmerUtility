import React, { useEffect } from 'react';

const Payments = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => console.log('Razorpay script loaded successfully.');
        script.onerror = () => console.error('Failed to load Razorpay script.');
        document.body.appendChild(script);
    }, []);

    const handlePayment = () => {
        if (!window.Razorpay) {
            console.error('Razorpay SDK not loaded.');
            alert('Payment gateway could not be initialized. Try reloading the page.');
            return;
        }

        const options = {
            key: 'rzp_test_YourKeyIdHere', // Replace with Razorpay test key
            amount: 50000, // Amount in paise (e.g., ₹500.00)
            currency: 'INR',
            name: 'Farmer Utility',
            description: 'Test Transaction',
            image: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
            handler: (response) => {
                console.log('Payment successful:', response);
                alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            },
            prefill: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div>
            <h2>Track your payments securely with Razorpay.</h2>
            <button onClick={handlePayment}>Pay Now</button>
        </div>
    );
};

export default Payments;
