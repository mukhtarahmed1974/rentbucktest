const calculatedExpenses = (expenseData) => {
  let totalExpense = 0;

  expenseData.forEach(user => {
    totalExpense += +(user.expense);
  });

  let equalShare = totalExpense / expenseData.length;

  expenseData.forEach(user => {
    let remaining = user.expense - equalShare;
    user.remaining = (remaining <= 0) ? Math.abs(Number(remaining.toFixed(0))) : 0
  });

  return expenseData;
};

module.exports = calculatedExpenses;