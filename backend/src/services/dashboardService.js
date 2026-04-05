const Record = require("../models/Record");

exports.getSummary = async () => {
    const records = await Record.find();

    let income = 0,
        expense = 0;

    records.forEach((r) => {
        if (r.type === "income") income += r.amount;
        else expense += r.amount;
    });

    return {
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense,
    };
};