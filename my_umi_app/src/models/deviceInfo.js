import { useModel } from 'umi';
import { API_DEVICE_CHART_LOAD_URL, API_DEVICE_INFO_LOAD_URL, API_URL } from '@/constants';
import { API_Inits, getDeformatAnalysisData, getDeformatData, requestToAPI } from '@/handlers';
import { notification } from 'antd';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useRequest } from 'ahooks';

const sensorEnum = {
  C02: {
    safeZone: [400, 1000],
    title: 'C02',
    unit: 'ppm',
    range: [400, 5000],
  },
  CH20: { safeZone: [0, 46], title: 'CH20', unit: 'µg/m3', range: [0, 2000] },
  TVOC: { safeZone: [0, 200], title: 'TVOC', unit: 'µg/m3', range: [0, 5000] },
  'PM2.5': { safeZone: [0, 50], title: 'PM2.5', unit: 'µg/m3', range: [0, 999] },
  PM10: { safeZone: [0, 150], title: 'PM10', unit: 'µg/m3', range: [0, 1000] },
  Temperature: { safeZone: [25, 38], title: 'Temperature', unit: '°C', range: [-40, 100] },
  Humidity: { safeZone: [30, 50], title: 'Humidity', unit: '%', range: [0, 100] },
  Noise: {
    safeZone: [0, 70],
    title: 'Noise',
    unit: 'dB',
    range: [0, 120],
  },
};

export default () => {
  // const { updateDeviceinfoAnalysis } = useModel('deviceInfoAnalysis');
  const [deviceInfo, setDeviceInfo] = useState({});
  const [deviceChartData, setDeviceChartData] = useState({});
  // const { data: deviceChartData = {}, mutate: setDeviceChartData } = useRequest(
  //   '/api/device_chart_load',
  //   { onError: () => console.log('chart load error'), onSuccess: (data) => console.log(data),defaultParams:[{}] },
  // );
  const TableactionRef = useRef();
  const DeviceKey = Object.keys(deviceInfo) || [];
  const updateDeviceInfo = (message) => {
    setDeviceInfo((prevDeviceInfo) => ({ ...prevDeviceInfo, ...message }));
  };
  const socket = io(API_URL, {
    withCredentials: true,
  });
  useEffect(async () => {
    const firstDeviceInfo = await requestToAPI(
      API_DEVICE_INFO_LOAD_URL,
      API_Inits({ method: 'GET' }),
    );
    // const firstDeformatDeviceInfo = getDeformatData(firstFormatDeviceInfo);
    // console.log(firstDeformatDeviceInfo);
    setDeviceInfo(firstDeviceInfo);

    const firstDeviceChartData = await requestToAPI(
      API_DEVICE_CHART_LOAD_URL,
      API_Inits({ method: 'GET' }),
    );
    // setDeviceChartData(firstDeviceChartData);
    console.log(firstDeviceChartData);
    socket.on('encryptDT', (Message) => {
      // const formatMessage = getDeformatData(Message);
      updateDeviceInfo(Message);
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
  return {
    deviceInfo,
    updateDeviceInfo,
    DeviceKey,
    socket,
    TableactionRef,
    sensorEnum,
    deviceChartData,
  };
};
