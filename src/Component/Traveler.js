import React, { useState, useRef, useEffect, useReducer } from "react";
import { Card, Row, Col, Button, Modal, Input, Select, Radio, Form, message,} from "antd";
import { countries } from "../data/countries.js";
const { TextArea } = Input;

export const useMountEffect = (fun) => useEffect(fun, []);

const countryData = countries;

function Traveler({travelerForm}) {
	const { Option } = Select;

	function onBlur() {
		console.log("blur");
	}

	function onFocus() {
		console.log("focus");
	}

	function onSearch(val) {
		console.log("search:", val);
	}

	// Gneral Focus Hook
	const UseFocus = () => {
		const htmlElRef = useRef(null);
		const setFocus = () => {
			htmlElRef.current && htmlElRef.current.focus();
		};

		return [htmlElRef, setFocus];
	};

	const [input1Ref, setInput1Focus] = UseFocus();
	useMountEffect(setInput1Focus);

	const [cnt, setCnt] = useState(0);
	const mrzRecordParse = (e) => {
		var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
		if (cnt === 0) {
			if (check.test(e.target.value)) {
				handleOk();
				return message.error("This is an error message");
			}
		}

		if (cnt === 1) {
			var mrz = e.target.value;
			mrz = mrz.replace(/\n/g, "").replace(/\r/g, "");

			const passport = mrz.substring(44, 53);
			const name = parseName(mrz.substring(5, 44));
			const lastName = name.surname;
			const firstName = name.givenNames;
			const birthYmd = mrz.substring(57, 63);
			const genderCcd = mrz.substring(64, 65);
			const passportNltyCd = fixNationalityCd(mrz.substring(54, 57));

			dispatch({ name: "passport", value: passport });
			dispatch({ name: "lastName", value: lastName });
			dispatch({ name: "firstName", value: firstName });
			dispatch({ name: "birthYmd", value: birthYmd });
			dispatch({ name: "genderCcd", value: genderCcd });
			dispatch({ name: "passportNltyCd", value: passportNltyCd.natinality });
			travelerForm.setFieldsValue({passport, lastName, firstName, birthYmd, genderCcd, passportNltyCd: passportNltyCd.natinality});

			handleOk();
		}
		setCnt(cnt + 1);
	};

	function parseName(name) {
		const [surname, givenNames] = name.split("<<");
		return {
			surname,
			givenNames,
		};
	}

	function fixNationalityCd(nation) {
		var natinality = nation;
		if (natinality === "D<<") {
			natinality = "DEU";
		}

		return {
			natinality,
		};
	}

	function reducer(state, action) {
		return {
			...state,
			[action.name]: action.value,
		};
	}

	const [state, dispatch] = useReducer(reducer, {
		passport: "",
		firstName: "",
		lastName: "",
		passportNltyCd: "Country",
		birthYmd: "",
		genderCcd: "",
	});

	const { passport, firstName, lastName, passportNltyCd, birthYmd, genderCcd,} = state;
	const onChange = (e) => {
		dispatch(e.target);
	};

	const [form] = Form.useForm();
	const [visible, setVisible] = useState();
	const showModal = () => {
		setVisible(true);
		form.resetFields();
		setCnt(0);
	};

	const handleOk = (e) => {
		console.log(e);
		setVisible(false);
	};

	const handleCancel = (e) => {
		console.log(e);
		setVisible(false);
	};

	return (
		<Card
			title="Traveler"
			bordered={false}
			extra={
				<Button type="primary" onClick={showModal}>
					Passport Scan
				</Button>
			}
		>
			<Modal
				visible={visible}
				centered
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="OK" type="primary" onClick={handleOk}>
						OK
					</Button>,
				]}
			>
				Please scan your passport
				<Form name="control-hooks" form={form}>
					<Form.Item name="scanData">
						<TextArea
							/* style={{zIndex: -999}} */ autoFocus={true}
							onPressEnter={mrzRecordParse}
						/>
					</Form.Item>
				</Form>
			</Modal>

			<Row gutter={24}>
				<Col span={12}>
					<Card
						title="PASSPORT NO."
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="passport">
							<Input name="passport" value={passport} onChange={onChange} />
						</Form.Item>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title="COUNTRY"
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="passportNltyCd">
							<Select
								showSearch
								style={{ width: "100%" }}
								placeholder="Country"
								optionFilterProp="children"
								onChange={(e) => {dispatch({ name: "passportNltyCd", value: e }); }}
								onFocus={onFocus}
								onBlur={onBlur}
								onSearch={onSearch}
								filterOption={(input, option) =>
									option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
								}
								name="passportNltyCd"
								value={passportNltyCd}
							>
								{countryData.map((country, index) => (
									<Option value={country.label} key={index}>
										{country.label}
									</Option>
								))}
							</Select>
						</Form.Item>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Card
						title="FIRST NAME"
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="firstName">
							<Input name="firstName" value={firstName} onChange={onChange} />
						</Form.Item>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title="LAST NAME"
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="lastName">
							<Input name="lastName" value={lastName} onChange={onChange} />
						</Form.Item>
					</Card>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={12}>
					<Card
						title="DATE OF BIRTH"
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="birthYmd">
							<Input name="birthYmd" value={birthYmd} placeholder="BIRTH" onChange={onChange}/>
						</Form.Item>
					</Card>
				</Col>
				<Col span={12}>
					<Card
						title="GENDER"
						bordered={false}
						size="small"
						headStyle={{ border: 0, padding: 2 }}
						bodyStyle={{ padding: 2 }}
					>
						<Form.Item name="genderCcd">
							<Radio.Group onChange={onChange} name="genderCcd" value={genderCcd}>
								<Radio value={"M"}>M</Radio>
								<Radio value={"F"}>F</Radio>
							</Radio.Group>
						</Form.Item>
					</Card>
				</Col>
			</Row>
		</Card>
	);
}

export default Traveler;
