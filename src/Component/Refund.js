import React, { useState } from 'react';
import { Card, Row, Col, Input, Select, Form} from 'antd';

const Refund = () => {
    const [ meth, setMeth ] = useState();
    function handleMethChange(value){
        setMeth(value);
    }
    /* function handleChange(value) {
        console.log(`selected ${value}`);
    } */
    const { Option } = Select;
    return (
        <Card title="Refund" bordered={false}>
            {/* <Form.Item label="REFUND SERVICE" name="refundService" colon={false}>
                <Select defaultValue="Post Tax Refund" style={{ width: '100%' }} onChange={handleChange}>
                    <Option value="Post Tax Refund">Post Tax Refund</Option>
                    <Option value="Immediate Post Tax Refund">Immediate Post Tax Refund</Option>
                </Select>
            </Form.Item> */}
            <Form.Item label="REFUND METHOD" name="refundMethod" colon={false}>
                <Select defaultValue="Not Assign" style={{ width: '100%' }} onChange={handleMethChange}>
                    <Option value="Not Assign">Not Assign</Option>
                    {/* <Option value="Credit Card">Credit Card</Option> */}
                    <Option value="Alipay">Alipay</Option>
                </Select>
            </Form.Item>


            {meth === "Credit Card" && (
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="CREDIT CARD"
            >
                <Form.Item label="CARD TYPE" colon={false}>
                    <Select defaultValue="Card Type" style={{ width: '100%' }} /* onChange={handleChange} */>
                        <Option value="VISA">VISA</Option>
                        <Option value="MASTER">MASTER</Option>
                        <Option value="UION PAY">UION PAY</Option>
                    </Select>
                </Form.Item>
                <Row gutter={24}>
                    <Col span={12}>
                        <Card
                            title="CARD NO. *"
                            bordered={false}
                            size="small"
                            headStyle={{ border: 0, padding: 2 }}
                            bodyStyle={{ padding: 2 }}
                        >
                            <Input />
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            title="CONTACT"
                            bordered={false}
                            size="small"
                            headStyle={{ border: 0, padding: 2 }}
                            bodyStyle={{ padding: 2 }}
                        >
                            <Input />
                        </Card>
                    </Col>
                </Row>
            </Card>
        )}
        {meth === "Alipay" && (
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="ALIPAY"
            >
                <Row gutter={24}>
                    <Col span={24}>
                        <Card
                            title="BARCODE NO. *"
                            bordered={false}
                            size="small"
                            headStyle={{ border: 0, padding: 2 }}
                            bodyStyle={{ padding: 2 }}
                        >
                            <Form.Item 
                                name="alipayBcode"
                                rules={[
                                    {
                                        required: meth === "Alipay" ? true : false,
                                        message: `Alipay barcode is required.`
                                    }
                                    ]}>
                                <Input />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
            </Card>
            )}
        </Card>
    );
};

export default Refund;