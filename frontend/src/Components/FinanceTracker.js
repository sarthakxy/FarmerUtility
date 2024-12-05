import React, { useEffect, useState } from 'react';

const FinanceTracker = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Calculate total income and expenses based on transaction data
    const income = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const expenses = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'expense') {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
  }, [transactions]);

  return (
    <div>
      <h2>Finance Summary</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Net Profit: ${totalIncome - totalExpenses}</p>
    </div>
  );
};

export default FinanceTracker;