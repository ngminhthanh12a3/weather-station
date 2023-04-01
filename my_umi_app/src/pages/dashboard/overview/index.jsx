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
import numeral from 'numeral';

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

const expandedRow_Column = [];
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
      title: 'Dynamo Status',
      dataIndex: 'dynamo_status',
      key: 'dynamo_status',
      valueEnum: WIFI_DYNAMO_ENUM,
      filters: true,
      onFilter: true,
    },

    //
    {
      title: 'C02',
      dataIndex: 'C02',
      key: 'C02',
      renderText: (dom) => {
        return dom + ' ppm';
      },
      hideInSearch: true,
    },
    {
      title: 'CH20',
      dataIndex: 'CH20',
      key: 'CH20',
      renderText: (dom) => {
        return dom + ' ug/m³';
      },
      hideInSearch: true,
    },
    {
      title: 'TVOC',
      dataIndex: 'TVOC',
      key: 'TVOC',
      renderText: (dom) => {
        return dom + ' ug/m³';
      },
      hideInSearch: true,
    },
    {
      title: 'PM2.5',
      dataIndex: 'PM2.5',
      key: 'PM2.5',
      renderText: (dom) => {
        return dom + ' ug/m³';
      },
      hideInSearch: true,
    },
    {
      title: 'PM10',
      dataIndex: 'PM10',
      key: 'PM10',
      renderText: (dom) => {
        return dom + ' ug/m³';
      },
      hideInSearch: true,
    },
    {
      title: 'Temperature',
      dataIndex: 'Temperature',
      key: 'Temperature',
      renderText: (dom) => {
        return dom + ' ℃';
      },
      hideInSearch: true,
    },
    {
      title: 'Humidity',
      dataIndex: 'Humidity',
      key: 'Humidity',
      renderText: (dom) => {
        return dom + ' %';
      },
      hideInSearch: true,
    },
    {
      title: 'Noise',
      dataIndex: 'Noise',
      key: 'Noise',
      renderText: (dom) => {
        return numeral(dom).format('0.00') + ' dB';
      },
      hideInSearch: true,
    },
    //
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
        // <a
        //   key="monitor"
        //   onClick={() => {
        //     setCurrentSelectDevice(record.devID);
        //     const monitorPath = '/dashboard/monitor';
        //     history.push(monitorPath);
        //   }}
        // >
        //   Monitor
        // </a>,
      ],
      hideInSearch: true,
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
        // expandable={{ expandedRowRender }}
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
