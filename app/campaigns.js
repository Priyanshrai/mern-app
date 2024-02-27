"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from 'react-loader-spinner'; // Ensure this is installed

const CampaignsDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [engagementData, setEngagementData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#85144b'];

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Loader type="Bars" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  // Improved Tooltip Component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p>{`${label}: ${payload[0].value.toFixed(2)}%`}</p>
          {/* You can add more details here */}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="container-fluid">
      <h2 className="text-center mt-3">Campaigns Dashboard</h2>
      <div className="row mt-3">
        <div className="col-md-6">
          <h3 className="text-center">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
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
