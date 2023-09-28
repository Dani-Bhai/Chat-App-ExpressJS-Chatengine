const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;


  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      {headers: {'Private-Key': 'f5d68e6e-7548-472d-84b1-81956f40abcb'}}
      
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;


  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": "30bb113e-4b07-409c-a592-15bdba35316e",
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);
