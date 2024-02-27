const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const campaignData = [
  {
    id: 1,
    name: "Summer Campaign",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    budget: 10000,
    roi: "15%",
    targetAudience: "Young Adults",
    channels: ["Social Media", "Email"],
    clicks: 1200,
    impressions: 30000
  },
  {
    id: 2,
    name: "Winter Campaign",
    startDate: "2024-12-01",
    endDate: "2025-02-28",
    budget: 15000,
    roi: "20%",
    targetAudience: "Families",
    channels: ["TV", "Online Ads"],
    clicks: 1500,
    impressions: 40000
  },
  {
    id: 3,
    name: "Autumn Sale",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    budget: 12000,
    roi: "18%",
    targetAudience: "Shoppers",
    channels: ["Online Ads", "Billboards"],
    clicks: 1800,
    impressions: 35000
  },
  {
    id: 4,
    name: "Spring Festival",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    budget: 8000,
    roi: "22%",
    targetAudience: "Festival Goers",
    channels: ["Social Media", "Radio"],
    clicks: 2000,
    impressions: 45000
  },
  {
    id: 5,
    name: "Back to School",
    startDate: "2024-07-15",
    endDate: "2024-09-15",
    budget: 9500,
    roi: "25%",
    targetAudience: "Parents and Students",
    channels: ["Email", "TV"],
    clicks: 1600,
    impressions: 25000
  }
];


// Middleware
app.use(express.json());

// CORS Middleware for development (allow all origins)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// API endpoint to get campaign data
app.get('/api/campaigns', (req, res) => {
  res.json(campaignData);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
