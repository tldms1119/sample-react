import React from "react";
import Barcode from "react-barcode";
import NumberFormat from "react-number-format";
import Moment from 'react-moment';

function convertDate(date) {
    var newDate = date.substring(0, 8) + ' ' + date.substring(8, 16);
    return newDate;
}

function ReceiptPrint({props}) {
    
    const agentInfo = props.props.agentInfo;
    const taxFreeForm = props.props.taxFreeForm;
    const customer = props.props.taxFreeForm.customer;
    const recptList = props.props.taxFreeForm.recptList;
    const vroInfo = props.props.vroInfo;
    const shopInfo = props.props.shopInfo;
    const payInfo = props.props.taxFreeForm.payInfo;

    return (
    <>
        <div>
            <table className="fontBold" border="0" width="270" height="100%" cellPadding="0" cellSpacing="0">
                <tbody>
                    <tr>
                        <td style={{ textAlign: 'center', fontSize: '10pt' }}>
                            &lt; 사후환급  &gt;<br />Standard Tax Free Form
                        </td>
                    </tr>
                     <tr>
                        <td>
                            <table className="fontBold" width='100%' border="0" width="270" height="100%" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <img width="120" style={{paddingBottom: '10px', verticalAlign: 'middle'}} src="http://dev.store.otfs.oniontech.com/images/nice_logo_black.png" />
                                        </td>
                                        <td align="left" style={{paddingLeft: '10px'}}>
                                            <div style={{ fontSize: '10pt', lineHeight: '5px', fontWeight: 'bold', textAlign: 'center', paddingTop: '14px', paddingBottom: '5px' }}>
                                                {vroInfo.vroNm}
                                            </div>
                                            <br />
                                            <span style={{ fontSize: '8pt', lineHeight: '10px' }}>{vroInfo.addr}</span><br />
                                            <span style={{ fontSize: '8pt', lineHeight: '10px' }}>BRN : {vroInfo.vroBsnmRegNo}</span><br />
                                            <span style={{ fontSize: '8pt', lineHeight: '10px' }}>{vroInfo.webSite}</span><br />
                                            <span style={{ fontSize: '8pt', lineHeight: '10px' }}>{vroInfo.email}</span><br />
                                            <span style={{ fontSize: '8pt', lineHeight: '10px' }}>Tel {vroInfo.telno}</span><br />
                                            <span style={{ fontSize: '8pt', lineHeight: '5px' }}>&nbsp;</span><br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colSpan="2">
                                            <span style={{ fontSize: '7.9pt' }}>국세청 인정서식</span><br />
                                            <span style={{ fontSize: '7.9pt' }}>Authorized by Korea National Tax Service</span><br />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td><hr /></td>
                    </tr>
                    <tr>
                        <td>
                            <Barcode value={taxFreeForm.docId} height={30} fontSize={15} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left', fontSize: '8pt' }}>단말기ID Terminal ID</td>
                                        <td style={{ textAlign: 'right', fontSize: '8pt' }}>{agentInfo.deviceNo}</td>
                                    </tr>
                                  </tbody>
                            </table>
                        </td>
                    </tr>
                     <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                 <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'left', fontSize: '8pt' }}>환급전표번호 TFF No.</td>
                                        <td style={{ textAlign: 'right', fontSize: '8pt' }}>{taxFreeForm.docId}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td><hr /></td>
                     </tr>
                      <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'left', fontSize: '8.9pt' }}>
                                            판매자/RETAILER
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'left', fontSize: '8pt' }}>{shopInfo.shopNm}</td>
                                        <td style={{ textAlign: 'right', fontSize: '8pt' }}>{shopInfo.bsnmRegNo}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'left', fontSize: '8pt'}}>{shopInfo.corpLegalOwner}</td>
                                        <td style={{ textAlign: 'right', fontSize: '8pt' }}>{shopInfo.bsnmRegNo}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'left', fontSize: '8pt'}}>{shopInfo.addr}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'left', fontSize: '8pt'}}>Tel {shopInfo.telno}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td><hr /></td>
                    </tr>
                    <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr style={{ verticalAlign: 'top' }}>
                                        <td style={{ textAlign: 'left', fontSize: '8.9pt' }}>Date of Sale</td>
                                        <td style={{ textAlign: 'right', fontSize: '8pt' }}>
                                            <Moment format="YYYY.MM.DD HH:mm:ss">
                                                {convertDate(taxFreeForm.purchsDate)}
                                            </Moment>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style={{ fontSize: '8pt' }}>물품구매내역/Description of Goods</span>
                            <br />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td width="33.3%" style={{ textAlign: 'left', fontSize: '8pt' }}>물품명/Item</td>
                                        <td width="33.3%" style={{ textAlign: 'center', fontSize: '8pt' }}>수량/Quantity</td>
                                        <td width="33.3%" style={{ textAlign: 'right', fontSize: '8pt' }}>판매가/Amount</td>
                                    </tr>
                                    {
                                        recptList.map((recpt, i) => {
                                            return (
                                                recpt.docGoodsList.map((goods, index) => {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <tr>
                                                                <td width="33.3%" style={{ textAlign: 'left', fontSize: '8pt' }}>{goods.goodsNm}</td>
                                                                <td width="33.3%" style={{ textAlign: 'center', fontSize: '8pt' }}>
                                                                    <NumberFormat
                                                                        value={goods.purchsQt}
                                                                        displayType={"text"}
                                                                        thousandSeparator={true}
                                                                    />
                                                                </td>
                                                                <td width="33.3%" style={{ textAlign: 'right', fontSize: '8pt' }}>
                                                                    <NumberFormat
                                                                        value={goods.purchsAmt}
                                                                        displayType={"text"}
                                                                        thousandSeparator={true}
                                                                    />
                                                                </td>
                                                            </tr>
                                                        </React.Fragment>
                                                    );
                                                })
                                            )
                                        })
                                    }
                                <tr>
                                    <td width="33.3%" style={{ textAlign: 'left', fontSize: '8pt' }}>총액</td>
                                    <td width="33.3%" style={{ textAlign: 'center', fontSize: '8pt' }}>Total Sales Amount</td>
                                    <td width="33.3%" style={{ textAlign: 'right', fontSize: '8pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totPurchsAmt}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr>
                    <td>
                        <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>부가세 V.A.T(10%)</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totVat}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>교육세 E.T</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totEdt}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>개소세 I.C.T</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totIct}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>농어촌특별세 S.T.R.D</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totStrd}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>합계 Tax Total</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.totVat+taxFreeForm.totIct+taxFreeForm.totEdt+taxFreeForm.totStrd}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr>
                    <td>
                        <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                     <td style={{ textAlign: 'left', fontSize: '8pt' }}>환급액 Refund Amount</td>
                                     <td style={{ textAlign: 'left' }}></td>
                                     <td style={{ textAlign: 'right', fontSize: '8pt' }}>
                                        <NumberFormat
                                            value={taxFreeForm.rfndAmt}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ textAlign: 'left', fontSize: '8pt' }}>반출유효기간 Export Expiry Date</td>
                                    <td style={{ textAlign: 'left' }}></td>
                                    <td style={{ textAlign: 'right', fontSize: '8pt' }}>
                                        <Moment format="YYYY.MM.DD">
                                           {convertDate(taxFreeForm.docEndDate)}
                                        </Moment>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr>
                    <td>
                        <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td colSpan="2">
                                        <span style={{ fontSize: '8.9pt' }}>
                                            구매자/Customer
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                            <tbody>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>Passport Name : </td>
                                                     <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>{customer && customer.passportLastNm}&nbsp;{customer && customer.passportFirstNm}</td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>Passport No. : </td>
                                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>{customer && customer.passportNo}</td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>Nationality : </td>
                                                    <td style={{ textAlign: 'right', fontSize: '6.5pt' }}>{customer && customer.passportNltyCd}</td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>Address : </td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>E-mail : </td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td style={{ textAlign: 'left', fontSize: '6.5pt' }}>Mobile No. : </td>
                                                </tr>
                                                <tr style={{ height: '7px' }}>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr>
                    <td>
                        <span style={{ fontSize: '8.9pt' }}>환급수단/Refund Option</span>
                    </td>
                </tr>
                <tr>
                    <td style={{ paddingLeft: '5px' }}>
                        <span style={{ fontSize: '6.5pt' }}>[&nbsp;&nbsp;] Credit Card No. (Master/Visa/JCB/CUP)</span>
                        <br />
                        <br />
                        <span style={{ fontSize: '6.5pt' }}>[&nbsp;&nbsp;] Alipay Phone No. (11 digits) 支付宝绑定手机号(11位)</span>
                    </td>
                </tr>
                <tr><td><br /></td></tr>
                <tr><td><hr /></td></tr>
                <tr>
                    <td style={{ paddingLeft: '5px' }}>
                        <span style={{ fontSize: '9pt' }}>I give consent to the use of my personal information.</span>
                        <br /><br />
                        <span style={{ fontSize: '9pt' }}>Customer Signature ___________________</span>
                        <br />
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                <tr className="hideField">
                    <td>
                        <span style={{fontSize:'8.9pt'}}>세관반출확인/CUSTOMS CHECK</span>
                    </td>
                    <td></td>
                </tr>
                <tr className="hideField">
                    <td style={{textAlign: 'center'}}>
                        <span style={{fontSize:'6.5pt'}}>Receive your Customs Stamp here</span><br /><br />
                    </td>
                    <td></td>
                </tr>
                <tr className="hideField">
                    <td style={{textAlign: 'center'}}>
                        {payInfo.payMethCcd === 'EC' ? 
                            <span style={{fontSize: '16pt'}}>
                                [&nbsp;&nbsp;&nbsp;&nbsp;
                                전자반출요망
                                &nbsp;&nbsp;&nbsp;&nbsp;]
                            </span> 
                        :
                            <span style={{fontSize: '16pt'}}>
                                [&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;]
                            </span> 
                        }
                    </td>
                    <td></td>
                </tr>
                <tr style={{height: '7px'}}>
                    <td></td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
                
                {payInfo.payMethCcd === 'EC' && 
                    <tr>
                        <td>
                            <table className="fontBold" width="100%" border="0" cellPadding="0" cellSpacing="0">
                                <tbody>
                                    <tr>
                                        <td style={{textAlign: "left", fontSize:"6.5pt"}}>Alipay ID</td>
                                        <td style={{textAlign: "right", fontSize:"6.5pt"}}>{payInfo.eCashLoginId}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>}

                <tr>
                    <td style={{ textAlign: 'right', fontSize: '5.9pt' }}>
                        <br />
                        <br />
                        <code>(For Tourist)</code>
                    </td>
                </tr>
                <tr>
                    <td><hr /></td>
                </tr>
            </tbody>
        </table>
        </div>
    </>
  );
}

export default ReceiptPrint;
