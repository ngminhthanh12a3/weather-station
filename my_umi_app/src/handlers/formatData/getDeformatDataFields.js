import getCurrentFromFormatData from './getCurrentFromFormatData';
import getStatusFromFormatData from './getStatusFromFormatData';
import getTemperatureFromFormatData from './getTemperatureFromFormatData';
// import getVoltageFromFormatData from './getVoltageFromFormatData';
export default (formatJSON) => {
  let current1 = getCurrentFromFormatData(formatJSON['current1']);
  let current2 = getCurrentFromFormatData(formatJSON['current2']);
  let voltage1 = formatJSON['voltage1'];
  let voltage2 = formatJSON['voltage2'];
  let {
    dynamo_status,
    relay_warning1,
    relay_warning2,
    status1,
    status2,
    wifi_status,
    voltage_warning1,
    voltage_warning2,
  } = getStatusFromFormatData(formatJSON['status']);
  const { temperature, temperature_warning } = getTemperatureFromFormatData(
    formatJSON['temperature'],
    formatJSON['temperature_warning'],
  );

  // fix error
  // if (voltage1 >= 10 && voltage1 <= 25) voltage1 -= 10;
  // if (voltage2 >= 10 && voltage2 <= 25) voltage2 -= 10;

  // if (voltage1 < 15) voltage_warning1 = 'Device OFF';
  // if (voltage2 < 15) voltage_warning2 = 'Device OFF';

  // if(voltage_warning1 === 'Device OFF')
  // if(voltage_warning2 === 'Device OFF')
  if(status1 === 'OFF')
  {
    voltage_warning1 = 'Device OFF'
    voltage1 = 0;
    current1 = 0;
  }
  if(status2 === 'OFF')
  {
    voltage_warning2 = 'Device OFF'
    voltage2 = 0;
    current2 = 0;
  }

  //getVoltageFromFormatData(formatJSON['voltage1']);
  // getVoltageFromFormatData(formatJSON['voltage2']);
  return {
    current1,
    current2,
    dynamo_status,
    relay_warning1,
    relay_warning2,
    status1,
    status2,
    wifi_status,
    voltage_warning1,
    voltage_warning2,
    temperature,
    temperature_warning,
    voltage1,
    voltage2,
  };
};
