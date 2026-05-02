require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { gotScraping } = require("got-scraping");

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: "*",
    // origin: ["https://asgfilter.vercel.app"],
  })
);

app.get("/", (req, res) => {
  res.send("Express server running");
});

app.get("/api/venues", async (req, res) => {
  try {
    const response = await gotScraping({
      url: `https://activesg.gov.sg/api/trpc/programme.getProgrammeVenues?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D`,
      responseType: "json",
    });
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/sportslist", async (req, res) => {
  try {
    const response = await gotScraping({
      url: `https://activesg.gov.sg/api/trpc/activity.listForProgrammes?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D`,
      responseType: "json",
    });
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/activity", async (req, res) => {
  const { sport } = req.query;
  try {
    const response = await gotScraping({
      url: `https://activesg.gov.sg/api/trpc/programme.listV2?input=%7B%22json%22%3A%7B%22searchQuery%22%3A%22${sport}%22%2C%22venueId%22%3Anull%2C%22minAgeFilter%22%3Anull%2C%22maxAgeFilter%22%3Anull%2C%22sexFilter%22%3Anull%2C%22postalCode%22%3Anull%2C%22firstSessionFromDate%22%3Anull%2C%22lastSessionTillDate%22%3Anull%2C%22limit%22%3A10%2C%22cursor%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22cursor%22%3A%5B%22undefined%22%5D%7D%7D%7D`,
      responseType: "json",
    });
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/capacity", async (req, res) => {
  try {
    console.log("Fetching capacity data using gotScraping...");
    const response = await gotScraping({
      url: `https://activesg.gov.sg/api/trpc/pass.getFacilityCapacities?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D`,
      responseType: "json",
    });

    console.log("Response status:", response.statusCode);
    res.status(200).json(response.body);
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});

module.exports = app;