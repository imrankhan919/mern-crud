const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db_config");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Body-Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

// Root Dir.
// app.get("/", (req, res) => {
//   res.json({
//     msg: "WELCOME TO CRUP API",
//   });
// });

app.use("/api/todo", require("./routes/todoRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`);
});
