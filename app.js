const express = require("express");
const urlRoute = require("./routes/url");
require("./conn");
const URL = require("./models/url");
const app = express();

app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortid", async (req, res) => {
  const shortId = req.params.shortid;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
