const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const fileUpload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(fileUpload());
const PORT = process.env.PORT || 8000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let material = [
  {
    id: "1",
    name: "testing-1",
    num: 11,
  },
  {
    id: "2",
    name: "testing-2",
    num: 12,
  },
  {
    id: "3",
    name: "testing-3",
    num: 13,
  },
];

app.get("/", (req, res) => {
  res.send("WORKING FINE");
});

app.get("/api/v1/test", (req, res) => {
  res.send("Testing");
});

app.get("/api/v1/testApi", (req, res) => {
  res.send({ id: "1", name: "test-1", num: 1 });
});

app.get("/api/v1/testArray", (req, res) => {
  res.send(material);
});

app.get("/api/v1/testId/:id", (req, res) => {
  const Id = material.find((test) => test.id === req.params.id);
  res.send(Id);
});

app.post("/api/v1/testPost", (req, res) => {
  console.log(req.body);
  material.push(req.body);
  res.send(true);
});

app.get("/api/v1/testQuery", (req, res) => {
  let location = req.query.location;
  let device = req.query.device;
  res.send({ location, device });
});

app.post("/api/v1/testUpload", (req, res) => {
  const file = req.files.file;
  let path = __dirname + "/images/" + Date.now() + ".jpg";
  console.log(path);
  file.mv(path, (err) => {
    res.send(true);
  });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
