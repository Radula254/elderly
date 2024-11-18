"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GroupsMembersChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Groups and Number of Members'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Number of Members'
      },
      allowDecimals: false, 
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Members',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch groups data
    fetch('/api/groupsSparkMem')
      .then(response => response.json())
      .then(data => {
        const categories = data.map(group => group.name);
        const membersData = data.map(group => group.membersCount);

        setChartOptions(prevOptions => ({
          ...prevOptions,
          xAxis: {
            categories
          },
          series: [{
            name: 'Members',
            data: membersData
          }]
        }));
      });
  }, []);

  return (
    <div className="pt-10 pb-20">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default GroupsMembersChart;
