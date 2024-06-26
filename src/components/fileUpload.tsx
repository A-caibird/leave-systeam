import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';

const props: UploadProps = {
    multiple:true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    },
    defaultFileList: [
        {
            uid: '1',
            name: 'xxx.png',
            status: 'uploading',
            url: 'http://www.baidu.com/xxx.png',
            percent: 33,
        },
        {
            uid: '2',
            name: 'yyy.png',
            status: 'done',
            url: 'http://www.baidu.com/yyy.png',
        },
        {
            uid: '3',
            name: 'zzz.png',
            status: 'error',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/zzz.png',
        },
    ],
};

const FileUpload: React.FC = () => (
    <Upload {...props} className={"dark:bg-black"}>
        <Button icon={<UploadOutlined />}>上传附件</Button>
    </Upload>
);

export default FileUpload;
