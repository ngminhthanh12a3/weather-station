import { Bullet } from '@ant-design/plots';
import { Card } from 'antd';

export default ({ sensorData = {} }) => {
  const data = [
    //------------------------
    {
      title: '            CO2',
      ranges: [1000, 5000],
      measures: [sensorData['C02']],
      limit: [5000],
      metric: 'ppm',
      safe: sensorData['C02'] < 1000,
    },
    //------------------------
    {
      title: '           CH20',
      ranges: [46, 2000],
      measures: [sensorData['CH20']],
      limit: [2000],
      metric: 'µg/m3',
      safe: sensorData['CH20'] < 46,
    },
    //------------------------
    {
      title: '           TVOC',
      ranges: [200, 5000],
      measures: [sensorData['TVOC']],
      limit: [5000],
      metric: 'µg/m3',
      safe: sensorData['TVOC'] < 200,
    },
    //------------------------
    {
      title: '          PM2.5',
      ranges: [50, 999],
      measures: [sensorData['PM2.5']],
      limit: [999],
      metric: 'µg/m3',
      safe: sensorData['PM2.5'] < 50,
    },
    //------------------------
    {
      title: '           PM10',
      ranges: [150, 1000],
      measures: [sensorData['PM10']],
      limit: [1000],
      metric: 'µg/m3',
      safe: sensorData['PM10'] < 150,
    },
    //--------------------
    {
      title: 'Temperature',
      ranges: [100],
      measures: [sensorData['Temperature']],
      limit: [100],
      metric: '℃',
    },
    //----------------------
    {
      title: '     Humidity',
      ranges: [100],
      measures: [sensorData['Humidity']],
      limit: [100],
      metric: '%',
    },
    //------------------------
    {
      title: '           Noise',
      ranges: [75, 120],
      measures: [Math.round(sensorData['Noise'])],
      limit: [120],
      metric: 'dB',
      safe: sensorData['Noise'] < 75,
      // 自定义 legend
      legend: {
        custom: true,
        position: 'bottom',
        items: [
          {
            value: 'Danger',
            name: 'Danger',
            marker: {
              symbol: 'square',
              style: {
                fill: '#FFbcb8',
                r: 5,
              },
            },
          },
          {
            value: 'Safe',
            name: 'Safe',
            marker: {
              symbol: 'square',
              style: {
                fill: '#bfeec8',
                r: 5,
              },
            },
          },
          {
            value: 'Actual Value',
            name: 'Actual Value',
            marker: {
              symbol: 'square',
              style: {
                fill: '#5B8FF9',
                r: 5,
              },
            },
          },
          {
            value: 'Limit',
            name: 'Limit',
            marker: {
              symbol: 'line',
              style: {
                stroke: '#3D76DD',
                r: 5,
              },
            },
          },
        ],
      },
    },
  ]; // @TODO 差一张垂直方向的缩略图

  const config = {
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'limit',
    xField: 'title',
    // color: {
    //   // measure: '#5B8FF9',
    //   range: ['#bfeec8', '#FFbcb8'],
    //   target: '#3D76DD',
    // },
    xAxis: {
      line: null,
    },
    yAxis: false,
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
  };
  return (
    <Card
      bodyStyle={{
        textAlign: 'center',
      }}
      bordered={false}
    >
      {data.map((datu) => {
        let measureColor = '#5B8FF9';
        if (datu.safe === true) measureColor = '#95de64';
        if (datu.safe === false) measureColor = '#ff7875';
        return (
          <Bullet
            {...config}
            data={[datu]}
            legend={datu.legend}
            style={{ height: '60px' }}
            label={{
              measure: {
                formatter: (datum) => {
                  return datum.measures + ' ' + datu.metric;
                },
              },
            }}
            color={{ measure: measureColor, range: ['#bfeec8', '#FFbcb8'], target: '#3D76DD' }}
          />
        );
      })}
    </Card>
  );
};
