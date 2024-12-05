import React, { useEffect, useState } from 'react';

function Payments() {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        fetch('/api/payments')
            .then(response => response.json())
            .then(data => setPayments(data))
            .catch(error => console.error('Error fetching payments:', error));
    }, []);

    return (
        <div className="payments">
            <h2>Payment Tracker</h2>
            <table>
                <thead>
                    <tr>
                        <th>Crop</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Outstanding</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id}>
                            <td>{payment.crop}</td>
                            <td>${payment.amount}</td>
                            <td>{payment.status}</td>
                            <td>${payment.outstanding}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Payments;
