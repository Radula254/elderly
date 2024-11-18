"use client";
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AcceptedRejectedCaregiversPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Accepted vs Rejected Caregivers'
    },
    series: [{
      name: 'Caregivers',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch caregivers data
    fetch('/api/caregiversStatusPie')
      .then(response => response.json())
      .then(data => {
        const chartData = [
          { name: 'Accepted', y: data.accepted },
          { name: 'Rejected', y: data.rejected }
        ];

        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Caregivers',
            data: chartData
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AcceptedRejectedCaregiversPieChart;
