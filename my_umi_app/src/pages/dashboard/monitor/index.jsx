import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Card, Col, Empty, Row, Space } from 'antd';
import { DeviceSelect, EMChartData, ResetButton, SensorBullet } from './components';
import { Suspense, useState } from 'react';

export default () => {
  const { currentDeviceInfo, currentSelectDevice } = useModel('currentSelectDevice');
  const renderQuerry = currentSelectDevice != -1;
  const [currentTabKey, setCurrentTabKey] = useState('');
  const activeKey = currentTabKey || (currentSelectDevice && 'C02');

  /**
   *
   * @param {string} key key
   */
  const handleTabChange = (key) => {
    setCurrentTabKey(key);
  };

  return (
    <GridContent>
      <Row
        style={{
          marginBottom: 24,
        }}
      >
        <Space>
          <DeviceSelect />
          {renderQuerry && <ResetButton currentSelectDevice={currentSelectDevice} />}
        </Space>
      </Row>
      {renderQuerry ? (
        <GridContent>
          <Suspense fallback={null}>
            <EMChartData activeKey={activeKey} handleTabChange={handleTabChange} />
          </Suspense>
        </GridContent>
      ) : (
        <Card>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Card>
      )}
    </GridContent>
  );
};
