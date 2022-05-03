import React, { useRef, useCallback } from 'react';
import { Card, Row, Col, Input, Button,Form, InputNumber } from 'antd';
import ReactToPrint from 'react-to-print';
import ReceiptPrint from './ReceiptPrint';
import "../App.css";
import { useSelector } from "react-redux";

function isEmpty(param) {
    return Object.keys(param).length === 0;
}


class ComponentToPrint extends React.Component {

    render() {
        return (
            <ReceiptPrint props={this.props}/>
        );
    }
}


  


const Total = ({reset}) =>{
    const { rexissxRes } = useSelector((state) => state);
    const componentRef = useRef();

    const handleAfterPrint = useCallback(() => reset()); 

    return (
        
        <>
        {isEmpty(rexissxRes) &&
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <Card title="Total" bordered={false} style={{ marginTop: 20 }}>
                            <Input.Group size="large">
                                <Row gutter={24}>
                                    <Col span={6}>
                                        <Form.Item label="Purchase" colon={false}>
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="V.A.T" colon={false}>
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Refund" colon={false}>
                                            <Input disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Issue</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Card>
                    </Col>
                </Row>
            </div>
        }

        {!isEmpty(rexissxRes) &&
            <>
            <div>
                <Row gutter={24}>
                    <Col span={24}>
                        <Card title="Total" bordered={false} style={{ marginTop: 20 }}>
                            <Input.Group size="large">
                                <Row gutter={24}>
                                    <Col span={6}>
                                        <Form.Item label="Purchase" colon={false}>
                                            <InputNumber
                                                defaultValue={rexissxRes.taxFreeForm.totPurchsAmt}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                readOnly
                                                style={{width: '100%'}}
                                            /> 
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="V.A.T" colon={false}>
                                            <InputNumber
                                                defaultValue={rexissxRes.taxFreeForm.totVat}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                readOnly
                                                style={{width: '100%'}}
                                            /> 
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item label="Refund" colon={false}>
                                            <InputNumber
                                                defaultValue={rexissxRes.taxFreeForm.rfndAmt}
                                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                readOnly
                                                style={{width: '100%'}}
                                            /> 
                                        </Form.Item>
                                    </Col>
                                    <Col span={6}>
                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">Issue</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Input.Group>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div style={{ display: "none" }}>
                <ReactToPrint
                    trigger={() => <Button type="primary" id="printBt">Print</Button>}
                    content={() => componentRef.current}
                    onAfterPrint={handleAfterPrint}
                />
                <ComponentToPrint ref={componentRef} props={rexissxRes} />
            </div> 
            </>
        }
        </>
    );
}

export default Total;