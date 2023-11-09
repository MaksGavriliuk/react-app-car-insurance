import React from 'react';
import {Input, QRCode, Space} from 'antd';

export function QR() {
    const [text, setText] = React.useState('https://ant.design/');
    return (
        <Space direction="vertical" align="center">
            <QRCode value={text || '-'}/>
            <Input
                placeholder="-"
                maxLength={60}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </Space>
    );
}
