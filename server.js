require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    // origin: ["https://asgfilter.vercel.app"],
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Express on Vercel");
});

app.get("/api/venues", async (req, res) => {
  try {
    const response = await fetch(
      `https://activesg.gov.sg/api/trpc/programme.getProgrammeVenues?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.get("/api/sportslist", async (req, res) => {
  try {
    const response = await fetch(
      `https://activesg.gov.sg/api/trpc/activity.listForProgrammes?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
app.get("/api/activity", async (req, res) => {
  const { sport } = req.query;
  try {
    const response = await fetch(
      `https://activesg.gov.sg/api/trpc/programme.listV2?input=%7B%22json%22%3A%7B%22searchQuery%22%3A%22${sport}%22%2C%22venueId%22%3Anull%2C%22minAgeFilter%22%3Anull%2C%22maxAgeFilter%22%3Anull%2C%22sexFilter%22%3Anull%2C%22postalCode%22%3Anull%2C%22firstSessionFromDate%22%3Anull%2C%22lastSessionTillDate%22%3Anull%2C%22limit%22%3A10%2C%22cursor%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22cursor%22%3A%5B%22undefined%22%5D%7D%7D%7D`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

// Export the Express API
module.exports = app;
