import { EllipsisOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ProTable, FooterToolbar, PageContainer } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Space, Tag, Input, Tooltip, notification } from 'antd';
import React, { useRef } from 'react';
import request from 'umi-request';
import { useModel } from 'umi';
import { useState } from 'react';
import moment from 'moment';
import { API_Inits, requestToAPI } from '@/handlers';
import { API_SEND_CUSTOM_BROKER_REQUEST_URL } from '@/constants';

const TagColorType = {
  ESP32: 'processing',
  STM32: 'success',
};
const fakeDeviceData = {
  data: [],
  page: 1,
  success: true,
  total: 5,
};
const columns = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'devID',
    dataIndex: 'devID',
    tip: 'If the title is too long, it will automatically shrink',
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This is required',
        },
      ],
    },
  },

  {
    title: 'Version',
    dataIndex: 'version',
    sorter: (a, b) => {
      return b.version - a.version;
    },
  },

  {
    title: 'Uploaded Time',
    key: 'showTime',
    dataIndex: 'ota_upload_time',
    // valueType: 'dateTime',
    hideInSearch: true,

    sorter: (a, b) => {
      return a.ota_upload_time - b.ota_upload_time;
    },
    render: (_, record) => {
      const { ota_upload_time = 'Invalid date' } = record;

      const dateTime = moment(ota_upload_time).format('YYYY-MM-DD HH:mm:ss');
      const dateTimeFromNow = moment(ota_upload_time).fromNow();
      return (
        <Tooltip title={dateTime}>
          <span>{dateTimeFromNow}</span>
        </Tooltip>
      );
    },
  },
  {
    title: 'Devices type',
    dataIndex: 'devicetype',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      // all: { text: 'All', status: 'Default' },
      ESP32: {
        text: 'ESP32',
        // status: 'Default',
      },
      STM32: {
        text: 'STM32',
        // status: 'Processing',
      },
    },
    render: (_, record) => {
      const { devicetype } = record;
      return (
        <Space>
          <Tag color={TagColorType[devicetype]} key={record.file_name}>
            {devicetype}
          </Tag>
        </Space>
      );
    },
  },
  {
    title: 'OTA type',
    dataIndex: 'ota_type',
    filters: true,
    onFilter: true,
    hideInSearch: true,
    valueEnum: {
      Local: {
        text: 'Local',
        status: 'Default',
      },
      Global: {
        text: 'Global',
        status: 'Processing',
      },
    },
  },
];
// const menu = (
//   <Menu>
//     <Menu.Item key="1">1st item</Menu.Item>
//     <Menu.Item key="2">2nd item</Menu.Item>
//     <Menu.Item key="3">3rd item</Menu.Item>
//   </Menu>
// );
export default () => {
  // const actionRef = useRef();
  const { OTA_FIELDS } = useModel('OTA_Fields');
  const [selectedRowsState, setSelectedRows] = useState([]);
  const { handleProTableRequest, tableActionRef } = useModel('OTA_Devicelist') || {};
  const SendOTARequest = async () => {
    for await (const row of selectedRowsState) {
      const { devicetype = '', ota_type = '', devID = -1 } = row;

      const selectedField = OTA_FIELDS.find(
        (field) => field.OTA_DEVICE_TYPE == devicetype && field.OTA_FILETYPE == ota_type,
      );

      const { OTA_CURRENT_VERSION = 0, OTA_FILE_FRAME_LENGTH = 0 } = selectedField;
      const custom_topic = `firmware_version/${devicetype}_${ota_type}/${devID}`;
      const deviceIsSTM32 = devicetype.includes('STM');
      const custom_message = deviceIsSTM32
        ? OTA_FILE_FRAME_LENGTH.toString()
        : OTA_CURRENT_VERSION.toString();

      const {
        type = 'info',
        message = 'Fail API',
        description = 'Error Request',
      } = await requestToAPI(
        API_SEND_CUSTOM_BROKER_REQUEST_URL,
        API_Inits({ body: { custom_topic, custom_message } }),
      );

      notification[type]({ message, description, duration: 1 });
    }
  };
  return (
    <>
      <ProTable
        columns={columns}
        actionRef={tableActionRef}
        cardBordered
        request={handleProTableRequest}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },
        }}
        rowKey="key"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return Object.assign(Object.assign({}, values), {
                ota_upload_time: [values.startTime, values.endTime],
              });
            }
            return values;
          },
        }}
        pagination={{
          // pageSize: 5,
          // onChange: (page) => console.log(page),
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="OTA Upload State"
        // toolBarRender={() => [
        //   <Button key="button" icon={<PlusOutlined />} type="primary">
        //     New
        //   </Button>,
        //   <Dropdown key="menu" overlay={menu}>
        //     <Button>
        //       <EllipsisOutlined />
        //     </Button>
        //   </Dropdown>,
        // ]}

        rowSelection={{
          onChange: (_, selectedRows) => {
            // console.log(selectedRows)
            // const filesName = selectedRows.map((row) => row['file_name']);
            // setSelectedRows(filesName);
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              Chosen{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              devices &nbsp;&nbsp;
            </div>
          }
        >
          <Button onClick={SendOTARequest} type="primary">
            Send OTA Request
          </Button>
        </FooterToolbar>
      )}
    </>
  );
};
