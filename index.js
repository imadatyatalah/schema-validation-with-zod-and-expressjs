const express = require("express");
const { z } = require("zod");

const app = express();

app.use(express.json());

const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (err) {
    return res.status(400).send(err.errors);
  }
};

app.post("/login", validate(LoginSchema), (req, res) => {
  return res.json({ ...req.body });
});

app.listen(1337, () => console.log(`> Ready on http://localhost:${1337}`));
