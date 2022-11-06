import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProForm} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import { useModel } from 'umi';
import {TreeSelectOTARequest} from "./components"
import { API_Inits, requestToAPI } from '@/handlers';
const waitTime = (time = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};
export default () => {
    const {TreeSelectOTAData} = useModel("TreeSelectOTA")
    const options =  TreeSelectOTAData()
    
    const onFinish = async (values) => {

        await waitTime(2000);
        // console.log(values);
        message.success('Submitted successfully');
        return true;
    }
    return (<ModalForm title="Send OTA Request" trigger={<Button type="primary">
          <PlusOutlined />
          Send OTA Request
        </Button>} autoFocusFirstInput modalProps={{
            onCancel: () => {
                // console.log('run')
                },
        }} 
        submitTimeout={2000} 
        onFinish={onFinish}>
        <ProForm.Group style={{ width: "100%" }}>
            <TreeSelectOTARequest options={options}/>
        </ProForm.Group>
    </ModalForm>);
};