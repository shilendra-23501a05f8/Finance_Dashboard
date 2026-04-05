const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://finance-dashboard-f757g9plb-shilendras-projects.vercel.app"
    ],
    credentials: true
}));

app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

module.exports = app;
