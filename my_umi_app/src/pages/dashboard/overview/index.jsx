import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Typography, Tooltip, Tag, notification } from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useModel, history } from 'umi';
import UpdateForm from './components/UpdateForm';
import { addRule, updateRule, removeRule } from './service';
import { API_SET_BROKER_REQUEST_URL, API_SEND_CUSTOM_BROKER_REQUEST_URL } from '@/constants';
import { API_Inits, requestToAPI } from '@/handlers';

const { Text } = Typography;
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields, currentRow) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({ ...currentRow, ...fields });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const StatusesType = {
  ON: 'primary',
  OFF: '',
};
const VOL_WARNING_TYPE = {
  'Device OFF': '',
  Warning: 'warning',
  Normal: 'success',
};
const WIFI_DYNAMO_ENUM = {
  DEACTIVE: {
    text: 'OFFLINE',
    status: 'Default',
  },
  ACTIVE: {
    text: 'ONLINE',
    status: 'Success',
  },
};

const TEMPERATURE_WARN_TEXT_TYPE = {
  NORMAL: 'success',
  OVERHEAT: 'warning',
  MUTATION: 'danger',
};

const SetStatusState = async (entity, status_title) => {
  const currentDeviceWifiStatus = entity['wifi_status'];
  if (currentDeviceWifiStatus !== 'ACTIVE') {
    message.error('Device is Offline');
  } else {
    const { devID } = entity;
    const status = entity[status_title];
    const setStatus = status === 'ON' ? 'OFF' : 'ON';
    const { success } = await requestToAPI(
      API_SET_BROKER_REQUEST_URL,
      API_Inits({
        body: { topicKey: status_title, message: setStatus, devID },
      }),
    );
    message.success(success);
  }
};

const ResetDevice = async (record) => {
  const currentDeviceWifiStatus = record['wifi_status'];
  if (currentDeviceWifiStatus !== 'ACTIVE') {
    message.error('Device is Offline');
  } else {
    const currentSelectDevice = record['devID'];
    const reset_topic = `devID/${currentSelectDevice}/reset`;
    const {
      type = 'info',
      message = 'Fail API',
      description = 'Error Request',
    } = await requestToAPI(
      API_SEND_CUSTOM_BROKER_REQUEST_URL,
      API_Inits({ body: { custom_topic: reset_topic, custom_message: 'rs' } }),
    );

    // const messageType = message[type];
    // messageType(messageText);
    notification[type]({ message, description });
  }
};

const expandedRow_Column = [
  {
    title: 'Temperature Warning',
    dataIndex: 'temperature_warning',
    key: 'temperature_warning',
    render: (dom) => {
      return <Text type={TEMPERATURE_WARN_TEXT_TYPE[dom]}>{dom}</Text>;
    },
  },
  {
    title: 'Relay Warning 1',
    dataIndex: 'relay_warning1',
    key: 'relay_warning1',
    render: (dom) => {
      const type = dom.includes('UNAVAILABLE');
      const textType = type ? 'danger' : 'success';
      return <Text type={textType}>{dom}</Text>;
    },
  },
  {
    title: 'Relay Warning 2',
    dataIndex: 'relay_warning2',
    key: 'relay_warning1',
    render: (dom) => {
      const type = dom.includes('UNAVAILABLE');
      const textType = type ? 'danger' : 'success';
      return <Text type={textType}>{dom}</Text>;
    },
  },
  {
    title: 'Voltage warning 1',
    dataIndex: 'voltage_warning1',
    key: 'voltage_warning1',
    render: (dom) => {
      return <Text type={VOL_WARNING_TYPE[dom]}>{dom}</Text>;
    },
  },
  {
    title: 'Voltage warning 2',
    dataIndex: 'voltage_warning2',
    key: 'voltage_warning2',
    render: (dom) => {
      return <Text type={VOL_WARNING_TYPE[dom]}>{dom}</Text>;
    },
  },
];
const expandedRowRender = (record) => {
  // console.log(record, index, indent, expanded);
  return (
    <ProTable
      columns={expandedRow_Column}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={[record]}
      request={() => {
        return;
      }}
      pagination={false}
    />
  );
};

const TableList = () => {
  const { TableactionRef } = useModel('deviceInfo');
  const { rule } = useModel('deviceInfoList');
  const { setCurrentSelectDevice, currentSelectDevice } = useModel('currentSelectDevice');
  /** 新建窗口的弹窗 */
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const ProDescriptions_TableactionRef = useRef();
  /** 国际化配置 */

  const columns = [
    {
      title: 'devID',
      dataIndex: 'devID',
      tip: 'Click the devID number to view detail of the device',
      render: (dom, entity) => {
        return (
          <Tag>
            <a
              onClick={() => {
                setCurrentRow(entity);
                setShowDetail(true);
                // fix error
                setCurrentSelectDevice(dom);
              }}
            >
              {dom}
            </a>
          </Tag>
        );
      },
    },
    {
      title: 'Wifi Status',
      dataIndex: 'wifi_status',
      filters: true,
      onFilter: true,
      valueEnum: WIFI_DYNAMO_ENUM,
    },
    {
      title: 'Temperature',
      dataIndex: 'temperature',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      // renderText: (val) => `${val}` + ' &#8451',
      render: (dom, entity) => {
        const { temperature_warning } = entity;

        return (
          <>
            <Tooltip title={temperature_warning}>
              <Text type={TEMPERATURE_WARN_TEXT_TYPE[temperature_warning]}>{dom} </Text>℃
            </Tooltip>
          </>
        );
      },
    },
    {
      title: 'Relay 1',
      dataIndex: 'status1',
      hideInForm: true,
      filters: true,
      hideInSearch: true,
      onFilter: true,
      render: (dom, entity) => {
        const { status1 } = entity;
        return (
          <Button
            onClick={() => {
              SetStatusState(entity, 'status1');
            }}
            type={StatusesType[status1]}
          >
            {dom}
          </Button>
        );
      },
    },
    {
      title: 'Relay 2',
      dataIndex: 'status2',
      hideInForm: true,
      hideInSearch: true,
      filters: true,
      onFilter: true,
      render: (dom, entity) => {
        const { status2 } = entity;
        return (
          <Button
            onClick={() => {
              SetStatusState(entity, 'status2');
            }}
            type={StatusesType[status2]}
          >
            {dom}
          </Button>
        );
      },
    },
    {
      title: 'Current 1',
      dataIndex: 'current1',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val} (A)`,
    },
    {
      title: 'Current 2',
      dataIndex: 'current2',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      renderText: (val) => `${val} (A)`,
    },
    {
      title: 'Voltage 1',
      dataIndex: 'voltage1',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      // renderText: (val) => `${val}` + ' &#8451',
      render: (dom, entity) => {
        const { voltage_warning1 } = entity;
        return (
          <Tooltip title={voltage_warning1}>
            <Text type={VOL_WARNING_TYPE[voltage_warning1]}>{dom}</Text> (V)
          </Tooltip>
        );
      },
    },
    {
      title: 'Voltage 2',
      dataIndex: 'voltage2',

      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      render: (dom, entity) => {
        const { voltage_warning2 } = entity;
        return (
          <Tooltip title={voltage_warning2}>
            <Text type={VOL_WARNING_TYPE[voltage_warning2]}>{dom}</Text> (V)
          </Tooltip>
        );
      },
    },
    {
      title: 'Dynamo Status',
      dataIndex: 'dynamo_status',
      key: 'dynamo_status',
      valueEnum: WIFI_DYNAMO_ENUM,
      filters: true,
      onFilter: true,
    },
    {
      title: 'Functions',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="reset"
          onClick={() => {
            ResetDevice(record);
          }}
        >
          Reset
        </a>,
        <a
          key="monitor"
          onClick={() => {
            setCurrentSelectDevice(record.devID);
            const monitorPath = '/dashboard/monitor';
            history.push(monitorPath);
          }}
        >
          Monitor
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="Device Infomation"
        actionRef={TableactionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => []}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        scroll={{ x: 1300 }}
        expandable={{ expandedRowRender }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          // pageSize: 5,
          // onChange: (page) => console.log(page),
          showSizeChanger: true,
        }}
        columnsState={{ onChange: (column) => console.log(column) }}
        onDataSourceChange={(dataSource) => {
          const newCurrentRowData = dataSource.find((data) => data.devID == currentSelectDevice);
          setCurrentRow(newCurrentRowData);
          ProDescriptions_TableactionRef.current?.reload();
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
              Item &nbsp;&nbsp;
            </div>
          }
        ></FooterToolbar>
      )}
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value, currentRow);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (TableactionRef.current) {
              TableactionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        // width="80%"
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={true}
      >
        {currentRow?.devID && (
          <ProDescriptions
            actionRef={ProDescriptions_TableactionRef}
            column={1}
            title={`Device ${currentRow?.devID}`}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.devID,
            }}
            columns={[...columns, ...expandedRow_Column]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
