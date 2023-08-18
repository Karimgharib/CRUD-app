import express from "express";
import Mysql from "mysql";
import cors from "cors";

const app = express();

const db = Mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Y1012Jqkhkp",
  database: "new_schema",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("this is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [values], (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  db.query(q, [...values, bookId], (err, data) => {
    err ? res.json(err) : res.json(data);
  });
});

app.listen("8800", () => {
  console.log("backend connected");
});
