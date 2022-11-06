import { useModel } from 'umi';

export default () => {
  const { deviceInfo } = useModel('deviceInfo');
  const rule = async (params, options) => {
    const { current, pageSize } = params;
    let dataSource = [];
    for (const device in deviceInfo) {
      dataSource.push({ key: device, devID: device, ...deviceInfo[device] });
    }
    const { devID, wifi_status, dynamo_status } = params;
    // console.log(devID, wifi_status, dynamo_status, dataSource);
    if (devID) dataSource = (await dataSource.find((data) => data.devID == devID)) || [];

    if (wifi_status)
      dataSource = (await dataSource.filter((data) => data.wifi_status === wifi_status)) || [];
    if (dynamo_status)
      dataSource = (await dataSource.filter((data) => data.dynamo_status === dynamo_status)) || [];

    return { data: dataSource, success: true, total: dataSource.length, pageSize, current };
  };
  return { rule };
};
