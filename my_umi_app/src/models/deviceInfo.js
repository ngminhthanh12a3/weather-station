import { useModel } from 'umi';
import { API_DEVICE_INFO_LOAD_URL, API_URL } from '@/constants';
import { API_Inits, getDeformatAnalysisData, getDeformatData, requestToAPI } from '@/handlers';
import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

export default () => {
  // const { updateDeviceinfoAnalysis } = useModel('deviceInfoAnalysis');
  const [deviceInfo, setDeviceInfo] = useState({});
  const TableactionRef = useRef();
  const DeviceKey = Object.keys(deviceInfo) || [];
  const updateDeviceInfo = (message) => {
    setDeviceInfo((prevDeviceInfo) => ({ ...prevDeviceInfo, ...message }));
  };
  const socket = io(API_URL, {
    withCredentials: true,
  });
  useEffect(async () => {
    const firstFormatDeviceInfo = await requestToAPI(
      API_DEVICE_INFO_LOAD_URL,
      API_Inits({ method: 'GET' }),
    );
    const firstDeformatDeviceInfo = getDeformatData(firstFormatDeviceInfo);
    // console.log(firstDeformatDeviceInfo);
    setDeviceInfo(firstDeformatDeviceInfo);

    socket.on('encryptDT', (deformatMessage) => {
      const formatMessage = getDeformatData(deformatMessage);
      updateDeviceInfo(formatMessage);
      TableactionRef.current?.reload();
    });
    socket.on('notification', (noti_message) => {
      const { type, message, description } = noti_message;
      notification[type]({
        message,
        description,
        // placement: 'bottomRight',
      });
    });
    TableactionRef.current?.reload();
  }, []);
  return { deviceInfo, updateDeviceInfo, DeviceKey, socket, TableactionRef };
};
