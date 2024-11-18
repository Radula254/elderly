"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const UsersCaregiversPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Caregivers vs Non-Caregivers'
    },
    series: [{
      name: 'Users',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch caregivers data
    fetch('/api/caregiverPie')
      .then(response => response.json())
      .then(data => {
        const chartData = [
          { name: 'Caregivers', y: data.caregivers },
          { name: 'Non-Caregivers', y: data.nonCaregivers }
        ];

        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Users',
            data: chartData
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default UsersCaregiversPieChart;
