import { gotScraping } from "got-scraping";

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Route the request based on the URL path
  const url = req.url;

  try {
    if (url.startsWith("/api/venues")) {
      const response = await gotScraping({
        url: "https://activesg.gov.sg/api/trpc/programme.getProgrammeVenues?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D",
        responseType: "json",
      });
      return res.status(200).json(response.body);
    }

    if (url.startsWith("/api/sportslist")) {
      const response = await gotScraping({
        url: "https://activesg.gov.sg/api/trpc/activity.listForProgrammes?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D",
        responseType: "json",
      });
      return res.status(200).json(response.body);
    }

    if (url.startsWith("/api/activity")) {
      // Extract query parameters manually from the Vercel request
      const urlObj = new URL(req.url, `http://${req.headers.host}`);
      const sport = urlObj.searchParams.get("sport");

      const response = await gotScraping({
        url: `https://activesg.gov.sg/api/trpc/programme.listV2?input=%7B%22json%22%3A%7B%22searchQuery%22%3A%22${sport}%22%2C%22venueId%22%3Anull%2C%22minAgeFilter%22%3Anull%2C%22maxAgeFilter%22%3Anull%2C%22sexFilter%22%3Anull%2C%22postalCode%22%3Anull%2C%22firstSessionFromDate%22%3Anull%2C%22lastSessionTillDate%22%3Anull%2C%22limit%22%3A10%2C%22cursor%22%3Anull%7D%2C%22meta%22%3A%7B%22values%22%3A%7B%22cursor%22%3A%5B%22undefined%22%5D%7D%7D%7D`,
        responseType: "json",
      });
      return res.status(200).json(response.body);
    }

    if (url.startsWith("/api/capacity")) {
      const response = await gotScraping({
        url: "https://activesg.gov.sg/api/trpc/pass.getFacilityCapacities?input=%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D",
        responseType: "json",
      });
      return res.status(200).json(response.body);
    }

    // Default catch-all
    return res.status(200).json({ message: "Vercel serverless endpoint functioning correctly." });

  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}