const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const DB_PATH = "./db.json";

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  fs.readFile(DB_PATH, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Server error" });
    }

    const db = JSON.parse(data);
    const user = db.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Simple token (for demo only)
      return res.json({ token: "dummy-token-123" });
    } else {
      return res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
