import { API_SEND_CUSTOM_BROKER_REQUEST_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';
import ProForm, {
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, notification } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import { useModel } from 'umi';

export default () => {
  const { OTA_FIELDS } = useModel('OTA_Fields');
  const [type, setType] = useState('Reset');
  const [topic, setTopic] = useState('');
  const [mess, setMess] = useState('');
  const [devID, setDevID] = useState(null);

  const [deviceType, setDeviceType] = useState('ESP32');
  const [OTAType, setOTAType] = useState('Local');

  useEffect(() => OnDevIDChange(devID), [type, topic, devID, deviceType, OTAType]);

  return (
    <PageContainer>
      <Card>
        <ProFormRadio.Group
          style={{
            margin: 16,
          }}
          radioType="button"
          fieldProps={{
            value: type,
            onChange: (e) => setType(e.target.value),
          }}
          options={[
            // 'Custom',
            'Reset',
            'OTA',
          ]}
          label={'Broker Request Type'}
        />
        <ProForm
          submitter={{ searchConfig: { submitText: 'Send Broker Request' } }}
          onFinish={onFinish}
        >
          <ProFormDigit
            name="devID"
            label="devID"
            width="lg"
            fieldProps={{ onChange: (devID) => setDevID(devID) }}
            rules={[{ required: true, message: 'Please enter devID' }]}
          />
          <ProForm.Group>
            <ProFormText
              name="topic"
              width="md"
              disabled
              label="Topic"
              fieldProps={{ value: topic, placeholder: 'Please enter devID' }}
            />
            <ProFormText
              name="message"
              width="md"
              label="Message"
              disabled
              fieldProps={{
                onChange: (event) => console.log(event.target.value),
                value: mess,
              }}
            />
            {type === 'OTA' && (
              <ProFormSelect
                name="Device type"
                width="md"
                label="Device type"
                options={[
                  { value: 'ESP32', label: 'ESP32' },
                  { value: 'STM32', label: 'STM32' },
                ]}
                rules={[{ required: true, message: 'Please enter Device type' }]}
                fieldProps={{ onChange: (value) => setDeviceType(value) }}
                initialValue={deviceType}
              />
            )}
            {type === 'OTA' && (
              <ProFormSelect
                name="OTA type"
                width="md"
                label="OTA type"
                options={[
                  { value: 'Local', label: 'Local' },
                  { value: 'Global', label: 'Global' },
                ]}
                rules={[{ required: true, message: 'Please enter OTA type' }]}
                fieldProps={{ onChange: (value) => setOTAType(value) }}
                initialValue={OTAType}
              />
            )}
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageContainer>
  );
  async function OnDevIDChange(devID) {
    // console.log(event);
    switch (type) {
      case 'Reset':
        setTopic(`devID/${devID}/reset`);
        setMess('rs');
        break;
      case 'OTA':
        setTopic(`firmware_version/${deviceType}_${OTAType}/${devID}`);

        const selectedField = OTA_FIELDS.find(
          (field) => field.OTA_DEVICE_TYPE == deviceType && field.OTA_FILETYPE == OTAType,
        );

        const { OTA_CURRENT_VERSION = 0, OTA_FILE_FRAME_LENGTH = 0 } = selectedField;
        const deviceIsSTM32 = deviceType.includes('STM');
        const custom_message = deviceIsSTM32
          ? OTA_FILE_FRAME_LENGTH.toString()
          : OTA_CURRENT_VERSION.toString();
        setMess(custom_message);
        break;
      default:
        break;
    }
  }

  async function onFinish() {
    const {
      type = 'info',
      message = 'Fail API',
      description = 'Error Request',
    } = await requestToAPI(
      API_SEND_CUSTOM_BROKER_REQUEST_URL,
      API_Inits({ body: { custom_topic: topic, custom_message: mess } }),
    );

    // const messageType = message[type];
    // messageType(messageText);
    notification[type]({ message, description, duration: 0 });
    return true;
  }
};
