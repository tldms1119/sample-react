import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import { Layout, Menu, Button } from 'antd';
import {
  SettingOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";
import NewTFF from "./routes/NewTFF";
import Setting from "./routes/Setting";
import { authReject } from "./store";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const authStatus = useSelector((state) => state.authStatus);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const onCollapse = collapsed => {
    setCollapsed(collapsed);
    console.log("collapsed: " + collapsed);
  };
  
  return (

    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>New TFF</span>
            {authStatus && <Link to="/"/> }
            {!authStatus && <Link to="/setting"/> }
          </Menu.Item>
          <Menu.Item key="2">
            <SettingOutlined />
            <span>Setting</span>
            <Link to="/setting"/>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div style={{textAlign: "right"}}><Button style={{marginRight: "20px"}} type="primary" ghost onClick={() => dispatch(authReject())}>Logout</Button></div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
            <Route exact path="/" component={authStatus ? NewTFF : Setting} />
            <Route path="/setting" component={Setting} />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
