import {  ProFormCascader} from '@ant-design/pro-components';
const {SHOW_PARENT} = ProFormCascader
export default  ({options=[]}) => {
    const onChange = (newValue) => {
    // console.log('onChange ', newValue);
  };
    
    
    return <ProFormCascader
    width="lg"
  name="chose_nodes"
  label="Chose nodes"
  fieldProps={{
    onChange,
    multiple:true,
    maxTagCount:"responsive",
    showCheckedStrategy:SHOW_PARENT,
    options: options,
  }}
/>
}