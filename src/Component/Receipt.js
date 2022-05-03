import React, { useState, useEffect, useRef, useContext } from "react";
import { Card, Row, Col, Input, Checkbox, Form, Table, Button, Popconfirm, Select } from "antd";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import NumberFormat from "react-number-format";
import axios from "axios";
import { useSelector } from "react-redux";

function Receipt({receiptForm, reset}) {
    const { config } = useSelector((state) => state);
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(dataSource.length);
    const [interlock, setInterlock] = useState(true);
    const [receiptNo, setReceiptNo] = useState('');

	const listRefresh = () => {
		setDataSource([]);
	}

    const columns = [
        { title: "No.", dataIndex: "no", key: "no" },
        { 
			title: "Receipt", 
			dataIndex: "recptNo", 
			key: "recptNo"
		},
        { 
			title: "Product", 
			dataIndex: "goodsNm", 
			key: "goodsNm",
			render: (text, record) => {
				if(interlock) {
					return text;
				} else {
					return (
						<Select defaultValue={text} style={{ width: '100%', marginBottom: 0 }} onChange={(value, key) => handleChange(key, record.key)}>
							{config.products.map(product =>(
								<Select.Option key={product.goods_no} value={product.goods_nm} >
									{product.goods_nm}
								</Select.Option>))}
						</Select>
					)
				}
			} 
		},
        { 
			title: "Qty", 
			dataIndex: "purchsQty", 
			key: "purchsQty",
			editable: interlock ? false: true,
			onCell: record => ({
				record,
				editable: interlock ? false: true,
				dataIndex: "purchsQty", 
				title: "Qty",
				handleSave: handleSave
			})
		},
        { 
			title: "Gross Amount", 
			dataIndex: "purchsAmt", 
			key: "purchsAmt",
			editable: interlock ? false: true,
			onCell: record => ({
				record,
				editable: interlock ? false: true,
				dataIndex: "purchsAmt",
				title: "Gross Amount",
				handleSave: handleSave
			}),
			render: (text, record) => {
				if(!parseInt(text)){
					return text;
				} else {
					return(
						<NumberFormat
							value={text}
							displayType="text"
							thousandSeparator={true}
						/>
					)

				}
			}
		},
        {
            title: "Delete",
            dataIndex: "",
            key: "x",
            render: (text, record) => (
                <Popconfirm
                    title="삭제하시겠습니까?"
                    onConfirm={() => handleDelete(record.key)}
                >
                    <a href="return false;">
                        <DeleteOutlined />
                    </a>
                </Popconfirm>
            ),
		},
	];
	
	const handleChange = (option, key) => {
		let index = dataSource.findIndex(item => item.key === key);
		let selected = dataSource[index];
		let tmpDataSource = [...dataSource];
		tmpDataSource[index] = {...selected, goodsNo: option.key, goodsNm: option.value};
		setDataSource(tmpDataSource);
		receiptForm.setFieldsValue({receiptList : [...tmpDataSource]});
	}

	const handleAdd = () => {
        let tmpCount = count + 1;
		const newData = {
			key: tmpCount,
			no: tmpCount,
			recptNo: '',
			goodsNo: config.products[0].goods_no,
			goodsNm: config.products[0].goods_nm,
			purchsQty: 'Input Quantity',
			purchsAmt: 'Input Amount',
		};
        setCount(count + 1);
        setDataSource([...dataSource, newData]);
	};

	const handleDelete = (key) => {
		const dataSourceTmp = [...dataSource];
		receiptForm.setFieldsValue({receiptList : dataSourceTmp.filter((item) => item.key !== key)});
		setDataSource(dataSourceTmp.filter((item) => item.key !== key));
	};


	const { Search } = Input;
	const handleCheckboxClick = () => {
        setDataSource([]);
        setCount(0);
        setReceiptNo('');
		setInterlock(!interlock);
	};

	const handleSearch = async (receiptNo) => {
        if(!receiptNo) return;
		try {
            //let url = config.server_info.merchant_api_server.host + "/" + receiptNo + "?storecode=" + config.shop_info.shop_no;
            let url = "/receipt/" + receiptNo + "?storecode=" + config.shop_info.shop_no;
            const res = await axios.get(url, {headers: {"TRS-Authorization": config.server_info.merchant_api_server.auth_key}});
            let resData = res.data.purchasedetails;
            const newArray = [];
            const tmpCount = count + 1;
            resData.forEach((item, index) => {
                let data = {
                    key: tmpCount + index,
                    no: tmpCount + index,
                    recptNo: receiptNo,
                    goodsNm: item.prdnm,
                    purchsQty: item.prdcnt,
                    purchsAmt: item.grossamount,
					purchsDate: res.data.receiptdatetime,
					goodsAddInfo: item.prdcode,
					priceAmt : item.unitgrossamount,
					vat: item.indvat
                }
                newArray.push(data);
			});
			receiptForm.setFieldsValue({receiptList : [...dataSource, ...newArray]});
            setCount(count + resData.length);
			setDataSource([...dataSource, ...newArray]);
			setReceiptNo('');
		} catch (error) {
            // TODO
            console.log(error);
        }
	};

	const handleSave = row => {
		const newData = [...dataSource];
		const index = newData.findIndex(item => row.key === item.key);
		const item = newData[index];
		newData.splice(index, 1, { ...item, ...row });
		setDataSource(newData);
		receiptForm.setFieldsValue({receiptList : [...newData]});
	};

	const EditableContext = React.createContext();

	const EditableRow = ({ index, ...props }) => {
		const [form] = Form.useForm();
		return (
			<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
			</Form>
		);
	};

	const EditableCell = ({ title, editable, children, dataIndex, record, handleSave, ...restProps}) => {
		const [editing, setEditing] = useState(false);
		const inputRef = useRef();
		const form = useContext(EditableContext);

		useEffect(() => {
			if (editing) {
				inputRef.current.focus();
			}
		}, [editing]);

		const save = async (e, valueName) => {
			try {
				const values = await form.validateFields(); // => issue 버튼 누른 후에 receiptForm 검사하면 좋을 듯!
				toggleEdit();
				handleSave({ ...record, [valueName]: values.temp });
			} catch (errInfo) {
				console.log("Save failed:", errInfo);
			}
		};

		let childNode = children;

		const toggleEdit = () => {
			setEditing(!editing);
			form.setFieldsValue({
				[dataIndex]: record[dataIndex]
			});
		};

		if (editable) {
			childNode = editing ? (
			<Form.Item
				style={{margin: 0}}
				name="temp"
				rules={[
				{
					required: true,
					message: `${title} is required.`
				}
				]}
			>
				<Input ref={inputRef} onPressEnter={(e) => save(e, dataIndex)} onBlur={(e) => save(e, dataIndex)} placeholder={`input ${title}`}/>
			</Form.Item>
			) : (
			<div
				style={{paddingRight: 24}}
				onClick={toggleEdit}
			>
				{children}
			</div>
			);
		}

		return <td {...restProps}>{childNode}</td>;
	};

	const components = {
		body: {
		  row: EditableRow,
		  cell: EditableCell
		}
	};

	return (
		<div>
			<div style={{display: 'none'}}>
				<Button id="tableReset" onClick={listRefresh} >Reset</Button>
			</div>
			<Row gutter={24}>
				<Col span={24}>
					<Card title="Receipt" bordered={false} style={{ marginTop: 20 }}>
						<Form.Item label="RECEIPT NO." colon={false}>
							<Row gutter={8}>
								<Col span={12}>
									<Search
										placeholder=""
										enterButton="Search"
										size="middle"
                                        onSearch={(value) => handleSearch(value)}
                                        onChange={(e) => {setReceiptNo(e.target.value)}}
                                        value={receiptNo}
                                        disabled={!interlock}
									/>
								</Col>
								<Col span={12}>
									<Checkbox onClick={handleCheckboxClick} checked={!interlock}>POS interlock</Checkbox>
								</Col>
							</Row>
						</Form.Item>
					</Card>
				</Col>
			</Row>

			<Card>
				<Row gutter={24}>
					<Col span={24}>
						<Table
							components={components}
							columns={columns}
							dataSource={dataSource}
							pagination={false}
							scroll={{ y: 240 }}
						/>
						<Form.Item 
							name="receiptList" 
							rules={[
								{
									required: dataSource.length < 1 ? true : false,
									message: `Receipt Information is required.`
								}
								]}>
							<Input style={{display:"none"}}/>
						</Form.Item>
					</Col>
				</Row>
			</Card>
			<Card>
				<Row>
					<Col span={24} style={{ textAlign: "right" }}>
						{!interlock && <Button type="primary" onClick={handleAdd}>
							Add Row
						</Button>}
					</Col>
				</Row>
			</Card>
		</div>
	);
}

export default Receipt;
