module.exports = ({relay_warning1, relay_warning2, voltage_warning1, voltage_warning2, temperature_warning}) => {
  const WARNINGS_JSON = {};

  //   filters

  //
  if(relay_warning1 !== 'RELAY AVAILABLE')
    WARNINGS_JSON['relay_warning1'] = relay_warning1;

  if(relay_warning2 !== 'RELAY AVAILABLE')
    WARNINGS_JSON['relay_warning2'] = relay_warning2;

  //
  if(voltage_warning1 == 'Warning')
    WARNINGS_JSON['voltage_warning1'] = voltage_warning1;

  if(voltage_warning2 == 'Warning')
    WARNINGS_JSON['voltage_warning2'] = voltage_warning2;

  //
  if(temperature_warning !== 'NORMAL')
    WARNINGS_JSON['temperature_warning'] = temperature_warning;

  return WARNINGS_JSON;
}