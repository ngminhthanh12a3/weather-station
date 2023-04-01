import { GridContent } from '@ant-design/pro-layout';
import { useModel } from 'umi';
import { Card, Col, Empty, Row, Space } from 'antd';
import { DeviceSelect, ResetButton, SensorBullet } from './components';

export default () => {
  const { currentDeviceInfo, currentSelectDevice } = useModel('currentSelectDevice');
  const renderQuerry = currentSelectDevice != -1;
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
        <>
          <Row gutter={24}>
            <Col
              xl={24}
              lg={24}
              sm={24}
              xs={24}
              style={{
                marginBottom: 24,
              }}
            >
              <SensorBullet sensorData={currentDeviceInfo} />
            </Col>
          </Row>
        </>
      ) : (
        <Card>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Card>
      )}
    </GridContent>
  );
};
