import { Badge, Card, Col, Typography } from 'antd';
const { Text } = Typography;
export default ({ text, voltage, warning, xl, lg, sm, xs }) => {
  const textFields = { 'Device OFF': '#595959', Warning: '#faad14', Normal: '#52c41a' };
  // warning = voltage < 15 ? 'Device OFF' : voltage >= 180 ? 'Normal' : 'Warning';
  // warning = voltage < 15 ? 'Device OFF' : warning;
  const color = textFields[warning];
  return (
    <Col xl={xl} lg={lg} sm={sm} xs={xs} style={{ marginBottom: 24 }}>
      <Card title={<Badge color={color} text={text} />}>
        <Text style={{ color: color }}>{warning}</Text>
      </Card>
    </Col>
  );
};
