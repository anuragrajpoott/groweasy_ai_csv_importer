require("dotenv").config();

const express = require("express");
const cors = require("cors");


const importRoutes = require("./routes/import.routes");



const app = express();

app.use(cors());

app.use("/api/import", importRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});