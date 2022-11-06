import { useModel } from 'umi';

export default () => {
  const { devicelistOBJ } = useModel('OTA_Devicelist');
  const { OTA_FIELDS } = useModel('OTA_Fields');

  const TreeSelectOTAData = () => {
    const data = OTA_FIELDS.map((field) => {
      const { OTA_DEVICE_TYPE, OTA_FILETYPE } = field;
      const label = `${OTA_DEVICE_TYPE}_${OTA_FILETYPE}`;
      return {
        label,
        value: label,
        children: [],
      };
    });

    //
    for (const info of devicelistOBJ.data) {
      const { devicetype, ota_type, devID } = info;
      const label = `${devicetype}_${ota_type}`;

      const dataChildren = data.find((value) => {
        return value.label === label;
      }) || { children: [] };

      dataChildren.children.push({ label: devID, value: devID });
    }

    return data;
  };

  return { TreeSelectOTAData };
};
