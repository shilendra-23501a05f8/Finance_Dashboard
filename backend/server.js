require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://finance-dashboard-f757g9plb-shilendras-projects.vercel.app/login"
    ],
    credentials: true
}));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
