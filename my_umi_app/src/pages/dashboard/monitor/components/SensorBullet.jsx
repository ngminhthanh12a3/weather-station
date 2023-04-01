import { Bullet } from '@ant-design/plots';
import { Card } from 'antd';

export default ({ sensorData = {} }) => {
  console.log(typeof sensorData, Object.keys(sensorData), sensorData['C02']);
  const data = [
    {
      title: 'CO2',
      ranges: [1000, 5000],
      measures: [sensorData['C02']],
      limit: [5000],
    },
    {
      title: 'CH20',
      ranges: [46, 2000],
      measures: [sensorData['CH20']],
      limit: [2000],
    },
    {
      title: 'TVOC',
      ranges: [200, 5000],
      measures: [sensorData['TVOC']],
      limit: [5000],
    },
    {
      title: 'PM2.5',
      ranges: [50, 999],
      measures: [sensorData['PM2.5']],
      limit: [999],
    },
    {
      title: 'PM10',
      ranges: [150, 1000],
      measures: [sensorData['PM10']],
      limit: [1000],
    },
    {
      title: 'Temperature',
      ranges: [100],
      measures: [sensorData['Temperature']],
      limit: [100],
    },
    {
      title: 'Humidity',
      ranges: [100],
      measures: [sensorData['Humidity']],
      limit: [100],
    },
    {
      title: 'Noise',
      ranges: [75, 120],
      measures: [sensorData['Noise']],
      limit: [120],
    },
  ]; // @TODO 差一张垂直方向的缩略图

  const config = {
    data: data.reverse(),
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'limit',
    xField: 'title',
    color: {
      range: ['#bfeec8', '#FFbcb8'],
      measure: '#5B8FF9',
      target: '#3D76DD',
    },
    xAxis: {
      line: null,
    },
    yAxis: {
      label: false,
      line: {
        lineWidth: 5000,
      },
    },
    label: {
      measure: {
        position: 'middle',
        style: {
          fill: '#fff',
        },
      },
    },
    // 自定义 legend
    legend: {
      custom: true,
      position: 'bottom',
      items: [
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
  };
  return (
    <Card
      bodyStyle={{
        textAlign: 'center',
      }}
      bordered={false}
    >
      <Bullet {...config} />
    </Card>
  );
};
