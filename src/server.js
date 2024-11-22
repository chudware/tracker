const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/employees", (req, res) => {
  fs.readFile(
    path.join(__dirname, "api", "employees.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).json({ error: "Error reading file" });
      }

      let employees = [];
      if (data) {
        employees = JSON.parse(data);
      }

      employees.push(req.body);

      fs.writeFile(
        path.join(__dirname, "api", "employees.json"),
        JSON.stringify(employees, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            return res.status(500).json({ error: "Error writing file" });
          }

          res.json({ message: "Employee data saved successfully" });
        }
      );
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
