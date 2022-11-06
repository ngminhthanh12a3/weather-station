import numeral from 'numeral';
import getBitFromFormatData from './getBitFromFormatData';
export default (formatCurrent) => {
  const currentReal = getBitFromFormatData(formatCurrent, 0xff, 0);
  const currenFloating = getBitFromFormatData(formatCurrent, 0xff, 8);
  const deformatCurrent = currentReal + currenFloating / 100;
  
  // fix round error
  const rounded_DeformatCurrent = numeral(deformatCurrent).format("0.00")
  return rounded_DeformatCurrent;
};
