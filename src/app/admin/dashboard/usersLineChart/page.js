"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const UsersLineChart = () => {
  const [chartOptions, setChartOptions] = useState({
    title: {
      text: 'Users Over Time'
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Date'
      }
    },
    yAxis: {
      title: {
        text: 'Number of Registered Users (x10^7)'
      }
    },
    series: [{
      name: 'Users',
      data: [],
      marker: {
        enabled: true
      }
    }],
    plotOptions: {
      series: {
        marker: {
          enabled: true
        }
      }
    },
    tooltip: {
      xDateFormat: '%b %Y',
      shared: true
    }
  });

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        let cumulativeUsers = 0;
        const formattedData = data.map(user => {
          cumulativeUsers += 1; 
          return [new Date(user.createdAt).getTime(), cumulativeUsers];
        });
        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Users',
            data: formattedData
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions}/>;
};

export default UsersLineChart;
