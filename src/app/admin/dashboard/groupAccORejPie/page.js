"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GroupStatusPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Group Status Distribution'
    },
    series: [{
      name: 'Groups',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch group status data
    fetch('/api/groupsPie')
      .then(response => response.json())
      .then(data => {
        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Groups',
            data: [
              { name: 'Accepted', y: data.accepted },
              { name: 'Rejected', y: data.rejected },
              { name: 'Neither Accepted nor Rejected', y: data.neither }
            ]
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default GroupStatusPieChart;
