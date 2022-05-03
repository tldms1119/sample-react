import React from "react";
import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import AuthForm from "../Component/AuthForm";
import Configuration from "../Component/Configuration";

const Setting = () => {
  const authStatus = useSelector((state) => state.authStatus);
  return (
    <div>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Setting</Breadcrumb.Item>
      </Breadcrumb>
      {!authStatus && <AuthForm/>}
      {authStatus && <Configuration/>}
    </div>
  );
};

export default Setting;
