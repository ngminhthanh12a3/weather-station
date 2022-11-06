const getStatusFromFormatData = require("./getStatusFromFormatData");
const getTemperatureFromFormatData = require("./getTemperatureFromFormatData");

module.exports = (FormatJSON) => {
    let {
    dynamo_status = "",
    relay_warning1 = "",
    relay_warning2 = "",
    status1 = "",
    status2 = "",
    wifi_status = "",
    voltage_warning1 = "",
    voltage_warning2 = "",
  } = getStatusFromFormatData(FormatJSON['status']);

  const {  temperature_warning="" } = getTemperatureFromFormatData(
    FormatJSON['temperature'],
    FormatJSON['temperature_warning'],
  );
  // fix errors
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

  return {
          dynamo_status,
          relay_warning1,
          relay_warning2,
          status1,
          status2,
          wifi_status,
          voltage_warning1,
          voltage_warning2,
          temperature_warning
  };
  
}