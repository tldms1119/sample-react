import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { Card, Row, Col, Form, Input, Button, Checkbox } from "antd";
import { authApprove, authReject, saveConfig } from '../store'

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const AuthForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onChangeInput = e => {
    if(e.target.name === 'username') setUsername(e.target.value);
    if(e.target.name === 'password') setPassword(e.target.value);
  }

  const onSubmit = async () => {
    try {
      //let url = "http://" + inputData.ipAddress + ":" + inputData.port + "/login/" + inputData.shopNo + "/" + inputData.deviceNo;
      let url = "https://d197dcff-f109-462b-bc92-9f6b2909bfc7.mock.pstmn.io" + "/login/" + username + "/" + password;
      const res = await axios.get(url);
      const token = res.data.token;

      let url2 = "https://d197dcff-f109-462b-bc92-9f6b2909bfc7.mock.pstmn.io" + "/init";
      const res2 = await axios.get(url2, {headers: {'X-ACCESS-TOKEN': res.data.token}});

      dispatch(saveConfig(res2.data));
      localStorage.setItem('config', JSON.stringify(res2.data));

      dispatch(authApprove(token));
      localStorage.setItem('authStatus', true);
      localStorage.setItem('token', res.data.token);
    } catch (error) {
        // error 처리 필요
        dispatch(authReject());
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Row gutter={24}>
        <Col span={8}></Col>
        <Col span={8}>
          <Card title="Authentication" bordered={false}>
            <Form {...layout} name="basic" initialValues={{ remember: false }} onFinish={onSubmit} onFinishFailed={onFinishFailed}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  name="username"
                  onChange={onChangeInput}
                  value={username}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  name="password"
                  onChange={onChangeInput}
                  value={password}
                />
              </Form.Item>
              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}></Col>
      </Row>
    </div>
  );
};

export default AuthForm;
