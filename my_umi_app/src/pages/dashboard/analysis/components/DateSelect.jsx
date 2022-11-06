import { DatePicker, Select, Space, TimePicker } from 'antd';
import { useState } from 'react';
const { Option } = Select;

const PickerWithType = ({ type, onChange }) => {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
};

const onChange = (date, dateString) => {
  console.log(date, dateString);
};
export default () => {
  const [type, setType] = useState('time');
  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="time">Time</Option>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={onChange} />
    </Space>
  );
  // return <DatePicker onChange={onChange} />;
};
