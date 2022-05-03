import React, { useState } from "react";
import { Breadcrumb, Row, Col, Form } from "antd";
import Traveler from "../Component/Traveler";
import Refund from "../Component/Refund";
import Receipt from "../Component/Receipt";
import Total from "../Component/Total";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { saveRexissxRes, saveTraveler } from '../store'
import { LoadingOutlined } from '@ant-design/icons';

const NewTFF = () => {
  const dispatch = useDispatch();
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const config = useSelector(state => state.config);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("newTFF form data => ", values);

    const moment = require('moment');
    let currentTime = moment().format("YYYYMMDDHHmmss");

    let taxFreeForm = makeTaxFreeForm(values, config, currentTime);
    if(taxFreeForm.customer){
      dispatch(saveTraveler(taxFreeForm.customer));
    }

    const bodyParam = {
      "agentInfo" : {
        "shopNo" : config.shop_info.shop_no,
        "deviceNo" : config.shop_info.device_no,
        "deviceTypeCcd" : config.shop_info.device_type_ccd
      }, 
      "taxFreeForm" : taxFreeForm
    }

    try {
      //let url = config.server_info.issuing_server.host + "/" ;
      // package.json 맨아래 추가 필요(CROSS_ORIGIN 문제) : ,"proxy": "http://개발서버주소:24000"
      setShowLoadingBar(true);
      let issueUrl = "/rexissx/api/v1/forms/issue";
      const res = await axios.post(issueUrl, bodyParam, {headers: {"OT-X-MSG-SEQ": "OTFS_PC_WEB_" + currentTime, "OT-X-SYSTEM-ID": "TRS_MERCH_WEB", "ApiKeyCode" : "1234567890"}});
      console.log("issue resposne => ", res.data);
      let docId = res.data.taxFreeForm.docId;

      let queryUrl = "/rexissx/api/v1/forms/" + docId + "?shopNo=" + config.shop_info.shop_no + "&deviceNo=" + config.shop_info.device_no + "&deviceTypeCcd=" + config.shop_info.device_type_ccd;
      const queryRes = await axios.get(queryUrl, {headers: {"OT-X-MSG-SEQ": "OTFS_PC_WEB" + currentTime, "OT-X-SYSTEM-ID": "TRS_MERCH_WEB", "ApiKeyCode" : "1234567890"}});
      console.log("query resposne => ", queryRes.data);
      dispatch(saveRexissxRes(queryRes.data));
      setShowLoadingBar(false);

      document.getElementById('printBt').click();

    } catch (error) {
        // error 처리 필요
        console.log(error);
        setShowLoadingBar(false);
        alert(error.message);
    }
  }

  function reset(){
    form.resetFields();
    dispatch(saveRexissxRes({}));
    document.getElementById('tableReset').click();
  }
  
  return (
    <div>
        <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        <LoadingOutlined style={{position: 'fixed', zIndex: '99999', fontSize: '30px', top: '50%', left: '50%'}} hidden={showLoadingBar ? false : true}/>
        <Form onFinish={onFinish} form={form}>
          <Row gutter={24}>
            <Col span={12}>
              <Traveler travelerForm={form}/>
            </Col>
            <Col span={12}>
              <Refund />
            </Col>
          </Row>
          <Receipt receiptForm={form} reset={reset}/>
          <Total reset={reset}/>
        </Form>
    </div>
  );
};

const makeTaxFreeForm = (values, config, currentTime) => {

  // 0. recptList 객체 필드
  let receiptList = [];
  let tmpReceipt = {};
  let tmpDocGoods = {};
  let prevRecptNo = '';
  
  // 1. TaxFreeForm 객체 필드
  let purchsDate = currentTime;
  let totPurchsQty = 0;
  let totPurchsAmt = 0;
  let totNetAmt = 0;
  let totVat = 0;
  let isSalesYn = values.receiptList[0].recptNo ? true : false;

  values.receiptList.forEach((item, index) => {
    if(isSalesYn){  // 판매관리시스템 연동 시
      if(prevRecptNo !== item.recptNo) {
        if(index !== 0) {
          receiptList.push({...tmpReceipt});
        } else {
          purchsDate = item.purchsDate;
        }
        if(purchsDate > item.purchsDate) purchsDate = item.purchsDate ;
        tmpReceipt = {
          "recptNo": item.recptNo,
          "recptIssueDate": item.purchsDate,
          "purchsPayMethCcd":"M",
          "docGoodsList": []
        };
        prevRecptNo = item.recptNo;
      } 

      tmpDocGoods = {
        "goodsNm": item.goodsNm,
        "purchsQty":item.purchsQty,
        "purchsAmt":item.purchsAmt,
        "netAmt":item.purchsAmt - item.vat,
        "vat":item.vat,
        "ict":0,
        "edt":0,
        "strd":0,
        "priceAmt":item.priceAmt,
        "priceVat":Math.round(item.priceAmt/11),
        "priceNetAmt":item.priceAmt - Math.round(item.priceAmt/11),
        "goodsNo": '',
        "goodsAddInfo":item.goodsAddInfo
      }
      tmpReceipt.docGoodsList.push({...tmpDocGoods});
    } else {  // 판매관리시스템 미연동 시
      if(index === 0){
        tmpReceipt = {
          "recptNo": "WEB" + currentTime,
          "recptIssueDate": currentTime,
          "purchsPayMethCcd":"M",
          "docGoodsList": []
        };
      }

      tmpDocGoods = {
        "goodsNm": item.goodsNm,
        "purchsQty":item.purchsQty,
        "purchsAmt":item.purchsAmt,
        "netAmt":item.purchsAmt - Math.round(item.purchsAmt/11),
        "vat":Math.round(item.purchsAmt/11),
        "ict":0,
        "edt":0,
        "strd":0,
        "priceAmt":Math.round(item.purchsAmt/item.purchsQty),
        "priceVat":Math.round(Math.round(item.purchsAmt/item.purchsQty)/11),
        "priceNetAmt":Math.round(item.purchsAmt/item.purchsQty) - Math.round(Math.round(item.purchsAmt/item.purchsQty)/11),
        "goodsNo": item.goodsNo,
        "goodsAddInfo":item.goodsNo
      }
      tmpReceipt.docGoodsList.push({...tmpDocGoods});
    }

    totPurchsQty += parseInt(tmpDocGoods.purchsQty);
    totPurchsAmt += parseInt(tmpDocGoods.purchsAmt);
    totVat += parseInt(tmpDocGoods.vat);
    totNetAmt += parseInt(tmpDocGoods.netAmt);

    // 마지막 목록이면 영수증 리스트에 추가
    if(index === values.receiptList.length-1) {
      if(!isSalesYn) {
        // 판매관리시스템 미연동시 부가세 보정(마지막 물품일 경우, 개별 부가가치세 = 총 부가가치세 - 이전 부가가치세 합계)
        let totPurchsVat = Math.round(totPurchsAmt/11);
        totVat -= parseInt(tmpDocGoods.vat);
        tmpDocGoods.vat = totPurchsVat - totVat;
        totVat = totPurchsVat;
      }
      receiptList.push({...tmpReceipt});
    }
  });

  let rfndSvcNo = values.refundMethod === 'Alipay' ? config.shop_info.rfnd_svc_no.reserved : config.shop_info.rfnd_svc_no.standard

  let taxFreeForm = {
    "rfndSvcNo" : rfndSvcNo,
    "purchsDate" : purchsDate,
    "docCcyCcd" : 'KRW',
    "totPurchsQty" : totPurchsQty,
    "totPurchsAmt" : totPurchsAmt,
    "totNetAmt" : totNetAmt,
    "totVat" : totVat,
    "totIct" : 0, "totEdt": 0, "totStrd" : 0,
    "recptList": receiptList
  };

  if(values.passport){
    let customer = {
      "passportNo": values.passport,
      "passportNltyCd": values.passportNltyCd,
      "passportLastNm": values.lastName,
      "passportFirstNm": values.firstName,
      "birthYmd": values.birthYmd,
      "genderCcd": values.genderCcd
    };
    taxFreeForm = {...taxFreeForm, customer};
  }

  if(values.refundMethod === 'Alipay'){
    let payInfo = {
      "payMethCcd" : "EC",
      "eCashTypeCcd" : "AP",
      "eCashBcode": values.alipayBcode
    };
    taxFreeForm = {...taxFreeForm, payInfo};
  }

  console.log(taxFreeForm);

  return taxFreeForm;
}

export default NewTFF;
