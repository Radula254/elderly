"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GroupsPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Group Memberships'
    },
    series: [{
      name: 'Memberships',
      data: []
    }]
  });

  useEffect(() => {
    fetch('/api/allGroups')
      .then(response => response.json())
      .then(data => {
        const formattedData = data.map(group => ({
          name: group.name,
          y: group.members.length
        }));
        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Memberships',
            data: formattedData
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default GroupsPieChart;
