const express = require("express");
const users = require("./MOCK_DATA.json");

const fs = require("fs");
const app = express();
const PORT = 8000;

//middleware = assume it as a plugin
app.use(express.urlencoded({ extended: false }));

//Routes
app.get("/users", (req, res) => {
  const html = `
  <ul>
  ${users
    .map(
      (user) => `
    <li>${user.first_name} ${user.last_name}</li>
    `
    )
    .join("")}
  </ul>
  `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    const id = body.id;

    const user = users.find((user) => user.id == id);

    user.first_name = body.first_name;
    user.last_name = body.last_name;
    user.email = body.email;
    user.job_title = body.job_title;
    user.gender = body.gender;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", user: user });
    });

    if (!user) {
      return res.json({ status: "failed" });
    }
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "Success ", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
