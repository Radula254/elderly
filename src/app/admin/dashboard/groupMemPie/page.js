"use client"
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const GroupMembersPieChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Distribution of Members Across Groups'
    },
    series: [{
      name: 'Members',
      data: []
    }]
  });

  useEffect(() => {
    // Fetch group members data
    fetch('/api/groupsPieMem')
      .then(response => response.json())
      .then(data => {
        const chartData = data.map(group => ({
          name: group.name,
          y: group.memberCount
        }));

        setChartOptions(prevOptions => ({
          ...prevOptions,
          series: [{
            name: 'Members',
            data: chartData
          }]
        }));
      });
  }, []);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default GroupMembersPieChart;
