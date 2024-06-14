import React, { Fragment, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface dataProgress {
  title: string;
  value: string;
  colorBar: any;
  colorText: any;
  height?: number;
}
const Progress = ({
  title,
  value,
  colorBar,
  colorText,
  height,
}: dataProgress) => {
  const [sizeWindow, setSizeWindow] = useState(1900);
  useEffect(() => {
    const getSizeWindow = () => {
      setSizeWindow(window.screen.availWidth);
    };
    getSizeWindow();
  }, []);

  const options = {
    chart: {
      type: 'pie',
      height: `${sizeWindow > 1900 ? '180' : '160'}`,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      plotBackgroundColor: 'rgba(255, 255, 255, 0)',
      borderWidth: 0,
      plotShadow: false,
      plotBorderWidth: 0,
    },
    plotOptions: {
      pie: {
        size: `${sizeWindow > 1900 ? '120%' : '140%'}`
      }
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: '',
    },
    subtitle: {
      text: `<div style='font-size: ${sizeWindow > 1900 ? '25px' : '20px'}; font-weight: bold; color: ${colorText}'>${value.replace('.', ',')}%</div> <span style='font-size: ${sizeWindow > 1900 ? '14px' : '12px'}; font-weight: bold;'>${title}</span>`,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        textAlign: 'center',
      },
      x: 0,
      y: 8,
      useHTML: true,
    },
    series: [
      {
        enableMouseTracking: false,
        innerSize: '75%',
        dataLabels: {
          enabled: false,
        },
        data: [
          {
            y: parseFloat(value),
            color: colorBar,
          },
          {
            y: 100 - parseFloat(value),
            color: '#ddd',
          },
        ],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: height,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            yAxis: {
              labels: {
                align: 'left',
                x: 0,
                y: -5,
              },
              title: {
                text: null,
              },
            },
            subtitle: {
              text: `<div style='font-size: 12px;font-weight: bold; color: ${colorText}'>${value.replace('.', ',')}%</div> <span style='font-size: 10px; font-weight: bold;'>${title}</span>`,
            },
            credits: {
              enabled: false,
            },
          },
        },
      ],
    },
  };

  return (
    <Fragment>
      <div className="w-full">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </Fragment>
  );
};

export default Progress;
