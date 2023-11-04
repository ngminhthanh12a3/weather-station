import { Line, RingProgress } from '@ant-design/plots';
import { Card, Col, Row, Tabs, Typography } from 'antd';
import numeral from 'numeral';
import { useModel } from 'umi';
import styles from '../index.less';
import NumberInfo from './NumberInfo';
import SensorBullet from './SensorBullet';

const { Text } = Typography;

const { TabPane } = Tabs;

const CustomTab = ({ data, currentTabKey: currentKey }) => {
  const { enumString, dataEnum, data: devData } = data;

  const devDataEnum =
    enumString === 'Noise' ? numeral(devData[enumString]).format('0.00') : devData[enumString];
  const status =
    devDataEnum < dataEnum.safeZone[0] || devDataEnum > dataEnum.safeZone[1] ? 'Danger' : 'Normal';
  const percent = devDataEnum / (dataEnum.range[1] - dataEnum.range[0]);
  return (
    <Row gutter={8} style={{ width: 150, margin: '8px 0' }}>
      <Col span={12}>
        <NumberInfo
          title={dataEnum.title}
          subTitle={<Text type={status === 'Danger' ? 'danger' : 'success'}>{status}</Text>}
          gap={2}
          total={`${dataEnum.unit}`}
          theme={currentKey !== enumString ? 'light' : undefined}
        />
      </Col>
      <Col span={12} style={{ paddingTop: 36 }}>
        <RingProgress
          forceFit
          height={60}
          width={60}
          percent={percent}
          statistic={{
            content: {
              formatter: () => devDataEnum,
            },
          }}
          animation={false}
        />
      </Col>
    </Row>
  );
};

export default ({ activeKey, handleTabChange }) => {
  const { sensorEnum } = useModel('deviceInfo');
  const { currentDeviceInfo, currentChartData } = useModel('currentSelectDevice');
  return (
    <Card className={styles.offlineCard} bordered={false} style={{ marginTop: 32 }}>
      <Tabs activeKey={activeKey} onChange={handleTabChange}>
        {Object.keys(sensorEnum).map((_enum) => {
          return (
            <TabPane
              key={_enum}
              tab={
                <CustomTab
                  data={{ dataEnum: sensorEnum[_enum], data: currentDeviceInfo, enumString: _enum }}
                  currentTabKey={activeKey}
                />
              }
            >
              <div style={{ padding: '0 24px' }}>
                {/* <Line
                  forceFit
                  height={400}
                  data={currentChartData[_enum] || []}
                  responsive
                  xField="date"
                  yField="value"
                  seriesField="type"
                  interactions={[
                    {
                      type: 'slider',
                      cfg: {},
                    },
                  ]}
                  legend={{
                    position: 'top-center',
                  }}
                  animation={false}
                /> */}
                <SensorBullet sensorData={currentDeviceInfo} />
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};
