const { getSummary } = require("../services/dashboardService");

exports.summary = async (req, res) => {
    const data = await getSummary();
    res.json(data);
};