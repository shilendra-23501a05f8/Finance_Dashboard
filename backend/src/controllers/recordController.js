const Record = require("../models/Record");

exports.createRecord = async (req, res) => {
    const record = await Record.create(req.body);
    res.json(record);
};

exports.getRecords = async (req, res) => {
    const filters = req.query;
    const records = await Record.find(filters);
    res.json(records);
};

exports.updateRecord = async (req, res) => {
    const record = await Record.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(record);
};

exports.deleteRecord = async (req, res) => {
    await Record.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
};