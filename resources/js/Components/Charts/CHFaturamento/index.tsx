import React, { Fragment, useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from "moment";

type Props = {
  data: any;
  resize?: any;
};

const CHFaturamento = ({ data }: Props) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const colors = Highcharts.getOptions().colors;

  const diasemana = data.map((value: any) => moment(value?.dtvenda).format("DD"));
  const mesano = moment(data[0]?.dtvenda).format("MM/YYYY");
  const margem = data.map((value: any) => parseFloat(value?.margem));
  const meta = data.map((value: any) => parseFloat(value?.valmeta));
  const vendas = data.sort((a:any, b:any) => a.id > b.id ? 1 : -1).map((value: any) => parseFloat(value?.valvenda));

  Highcharts.setOptions({
    lang: {
      decimalPoint: ',',
      thousandsSep: '.',
    },
  });

  const options = {
    chart: {
      marginRight: 0,
      inverted: width > 640 ? false : true,
      height: width > 640 ? "385px" : "400px"
    },
    title: {
      text: `<h1 style='font-size: ${width > 1900 ? '20px' : '14px'}'>Gráfico de Evolução de Vendas (${mesano})</h1>`,
      align: 'left',
    },
    // subtitle: {
    //     text: 'Fonte: Grupo Solar - Lojas',
    //     align: 'left'
    // },
    xAxis: [
      {
        categories: diasemana,
        crosshair: true,
      },
    ],
    plotOptions: {
      series: {
        maxPointWidth: 50,
      },
    },
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value}%',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        // softMax: 6000,
        title: {
          text: '',
          style: {
            color: '#6e6d6d',
          },
          enabled: false,
        },
        labels: {
          format: '{value}',
          style: {
            color: '#6e6d6d',
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: '',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        labels: {
          format: '{value}%',
          style: {
            color: colors && colors[0],
          },
          enabled: false,
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'horizontal',
      align: 'left',
      x: 10,
      // verticalAlign: 'top',
      y: 5,
      floating: false,
      backgroundColor: 'rgba(255,255,255,0.25)',
    },
    series: [
      {
        name: 'Vendas',
        type: 'column',
        yAxis: 1,
        data: vendas,
        color: '#00BFFF',
        tooltip: {
          valuePrefix: 'R$ ',
          valueDecimals: 2,
          shared: true,
        },
      },
      {
        name: '% Margem',
        type: 'spline',
        yAxis: 2,
        data: margem,
        color: '#46C646',
        marker: {
          enabled: true,
        },
        // dashStyle: 'shortdot',
        tooltip: {
          valueDecimals: 2,
          valueSuffix: '%',
        },
      },
      {
        name: 'Meta',
        type: 'line',
        yAxis: 1,
        data: meta,
        color: '#F93F17',
        tooltip: {
          thousandsSep: ',',
          valuePrefix: 'R$ ',
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div className="w-[99%]">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default CHFaturamento;
