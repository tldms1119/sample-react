import React from "react";
import { Card, Row, Col, Form, Input, Button } from "antd";

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    }
};
const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
};

const Configuration = () => {
  let config = JSON.parse(localStorage.getItem("config"));

  const onFinish = values => {
    // onSubmit();
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={4}></Col>
        <Col span={16}>
          <Card title="Configuration" bordered={false}>
            <Form
            {...layout}
            name="basic"
            className="ant-advanced-search-form"
            onFinish={onFinish} onFinishFailed={onFinishFailed}
            initialValues = {{ 
              shopNo: config.shop_info.shop_no, 
              shopNm: config.shop_info.shop_nm,
              deviceNo: '00001',
              issuingServer: config.server_info.issuing_server.host,
              merchantServer: config.server_info.merchant_api_server.host,
              goodsNo: config.products[0].goods_no,
              goodsNm: config.products[0].goods_nm
            }}>
              <Row gutter={24}>
                <Col span={12} key={0}>
                  <Form.Item
                    label="Shop No."
                    name="shopNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input shop No.!",
                      },
                    ]}
                  >
                    <Input name="shopNo"/>
                  </Form.Item>
                  <Form.Item
                    label="Shop Name"
                    name="shopNm"
                    rules={[
                      {
                        required: true,
                        message: "Please input shop Name!",
                      },
                    ]}
                  >
                    <Input name="shopNm"/>
                  </Form.Item>
                  <Form.Item
                    label="Device No."
                    name="deviceNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input Device No.!",
                      },
                    ]}
                  >
                    <Input name="deviceNo"/>
                  </Form.Item>
                  <Form.Item
                    label="Issuing Server"
                    name="issuingServer"
                    rules={[
                      {
                        required: true,
                        message: "Please input Issuing Server Address!",
                      },
                    ]}
                  >
                    <Input name="issuingServer"/>
                  </Form.Item>
                </Col>
                <Col span={12} key={1}>
                  <Form.Item
                    label="Merchant Server"
                    name="merchantServer"
                    rules={[
                      {
                        required: true,
                        message: "Please input merchant server!",
                      },
                    ]}
                  >
                    <Input name="merchantServer"/>
                  </Form.Item>
                  <Form.Item
                      label="Goods No."
                      name="goodsNo"
                      rules={[
                        {
                          required: true,
                          message: "Please input goods No.!",
                        },
                      ]}
                    >
                    <Input name="goodsNo"/>
                  </Form.Item>
                  <Form.Item
                      label="Goods Name"
                      name="goodsNm"
                      rules={[
                        {
                          required: true,
                          message: "Please input Goods Name!",
                        },
                      ]}
                    >
                    <Input name="goodsNm"/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}></Col>
                <Col span={6}>
                  <Form.Item {...tailLayout}>
                    <Button
                      type="error"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Initialize
                    </Button>
                  </Form.Item>         
                </Col>
                <Col span={6}>
                  <Form.Item {...tailLayout}>
                  <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Change
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default Configuration;
