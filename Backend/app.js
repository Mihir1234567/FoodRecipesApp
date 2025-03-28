const { Client } = require("pg");
const express = require("express");
const path = require("path");
const multer = require("multer");
const cloudinaryUtil = require("./util/CloudinaryUtil");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: "5432",
  password: "1234",
  database: "recipes",
});
/* ---------------------------- Connect Database ---------------------------- */
con.connect().then(() => {
  console.log("Connected");
});

/* --------------------------------- storage -------------------------------- */

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

/* ------------------------------ multerObject ------------------------------ */
const upload = multer({ storage: storage }).single("image");

/* -------------------------------------------------------------------------- */
/*                                   Recipe                                   */
/* -------------------------------------------------------------------------- */

/* -------------------------------- AddRecipe ------------------------------- */
app.post("/addRecipe", upload, async (req, res) => {
  const cloudinaryResponse = await cloudinaryUtil.addFileToCloudinary(req.file);

  const { title, ingredients, instructions, time } = req.body;

  const coverImage = cloudinaryResponse.secure_url;

  const addQuery = `INSERT INTO recipes (title, ingredients, instructions, time, coverImage) VALUES($1,$2,$3,$4,$5)`;

  con.query(
    addQuery,
    [title, ingredients, instructions, time, coverImage],
    async (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

/* -------------------------------- GetRecipe ------------------------------- */
app.get("/", async (req, res) => {
  con.query(`SELECT * FROM recipes`, async (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result.rows);
    }
  });
});

/* ------------------------------ GetRecipeById ----------------------------- */
app.get("/:id", async (req, res) => {
  const id = req.params.id;
  con.query(`SELECT * FROM recipes WHERE id=$1`, [id], async (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result.rows);
    }
  });
});

/* ------------------------------ DeleteRecipe ------------------------------ */
app.delete("/deleteById/:id", async (req, res) => {
  const id = req.params.id;

  con.query(`DELETE FROM recipes WHERE id = $1`, [id], async (err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(result);
    }
  });
});

/* ------------------------------ UpdateRecipe ------------------------------ */
app.put("/updateRecipe/:id", upload, async (req, res) => {
  const id = req.params.id;

  const cloudinaryResponse = await cloudinaryUtil.addFileToCloudinary(req.file);

  const { title, ingredients, instructions, time } = req.body;

  const coverImage = cloudinaryResponse.secure_url;

  const updateQuery = `UPDATE recipes SET title=$1, ingredients=$2, instructions=$3, time=$4, coverImage=$5 WHERE id=$6`;

  con.query(
    updateQuery,
    [title, ingredients, instructions, time, coverImage, id],
    async (err, result) => {
      if (err) {
        res.send(err.message);
      } else {
        res.send(result);
      }
    }
  );
});

/* -------------------------------------------------------------------------- */
/*                                    User                                    */
/* -------------------------------------------------------------------------- */

/* --------------------------------- SignUp --------------------------------- */
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter both email and password.",
    });
  }
  try {
    const checkQuery = 'SELECT * FROM "user" WHERE email = $1';
    const result = await con.query(checkQuery, [email]);

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const signupQuery =
      'INSERT INTO "user" (email, password) VALUES ($1, $2) RETURNING *';
    const insertResult = await con.query(signupQuery, [email, hashedPassword]);

    return res.status(201).json({
      message: "User signed up successfully.",
      user: insertResult.rows[0],
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

/* ------------------------------ Server Start ------------------------------ */
const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server is running on Port Number:- ${PORT}`);
});
