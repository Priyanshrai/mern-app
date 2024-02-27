"use client";
// At the beginning of your file, ensure these imports:
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Bars } from 'react-loader-spinner';
import './CampaignsDashboard.css'; // Assuming you have a CSS file for additional styles

const CampaignsDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderColor, setLoaderColor] = useState('#00BFFF');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const campaignsResponse = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(campaignsResponse.data);
        const engagementData = campaignsResponse.data.map(campaign => ({
          name: campaign.name,
          engagementRate: Math.random() * 100,
          reach: Math.floor(Math.random() * 10000),
        }));
        setEngagementData(engagementData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const colors = ['#00BFFF', '#ff4500', '#32CD32', '#FFD700', '#FF69B4'];
    const intervalId = setInterval(() => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      setLoaderColor(color);
    }, 1000); // Change color every second

    return () => clearInterval(intervalId);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85144b'];

  if (loading) {
    return (
      <div className="loader-container">
        <Bars color={loaderColor} height={80} width={80} />
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">Campaigns Dashboard</h2>
      <div className="row mt-3">
        <div className="col-md-6">
          <h3 className="text-center">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={500}>
            <PieChart>
              <Pie
                dataKey="budget"
                isAnimationActive={true}
                data={campaigns}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label={(entry) => entry.name}
              >
                {campaigns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Engagement Rates</h3>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
  dataKey="name"
  height={60} // Increase height to accommodate multi-line labels
  tick={({ payload, x, y, width, height, viewBox }) => {
    const words = payload.value.split(' '); // Split the name into words
    return (
      <g transform={`translate(${x},${y})`}>
        {words.map((word, index) => (
          <text
            x={0}
            y={index * 20} // Adjust spacing between lines
            dy={16} // Adjust vertical position
            textAnchor="end" // Adjust based on your layout/design
            fill="#666" // Text color
            transform="rotate(-35)" // Optional: Rotate labels if needed
          >
            {word}
          </text>
        ))}
      </g>
    );
  }}
/>
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="engagementRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-center">Recent Activities</h3>
        <ul className="list-group mx-auto" style={{ maxWidth: '800px' }}>
          {campaigns.map((campaign, index) => (
            <li key={campaign.id} className="list-group-item">
              <strong>{campaign.name}</strong> - Launched on {new Date().toLocaleDateString()} - Budget: ${campaign.budget} - Reach: {engagementData[index]?.reach} - Engagement Rate: {engagementData[index]?.engagementRate.toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignsDashboard;
