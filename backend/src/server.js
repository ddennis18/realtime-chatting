import express from "express";

const PORT = 5000;
const app = express();

//simple 404 middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
})

//simple error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server Running on PORT:${PORT}`);
});
