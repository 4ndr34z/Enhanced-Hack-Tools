//import React from "react";
import React, { useState } from "react";
import { Typography, message, Divider, Input, Card, Col, Row, Avatar, Tooltip, Button } from "antd";
import QueueAnim from "rc-queue-anim";
import { goTo } from "react-chrome-extension-router";
import ExploitDB from "./rss/ExploitDB";
import Cisco from "./rss/Cisco";

import {
	CopyOutlined,
	WifiOutlined,
	LinkOutlined,
	EyeOutlined, 
	GithubOutlined,
	createFromIconfontCN 
} from "@ant-design/icons";
import Clipboard from "react-clipboard.js";

const { Title, Paragraph } = Typography;
const { Meta } = Card;



export default (props) => {
	const [values, setValues] = useState({
		lolbas: "",
		gtfobins: "",
	});
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	return (
		<QueueAnim delay={300} duration={1500}>
			<Title
				variant='Title level={3}'
				style={{ fontWeight: "bold", margin: 15 }}
			>
				LOLBAS and GTFOBins
				
			</Title>
			
			<Row gutter={[32, 24]} style={{ padding: 15 }}>
				<Col span={12}>
			
					<Card
						style={{background: "#FFFFFF",
							boxShadow:
								"0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)",
						}}
						>
					
						<iframe id='gtfo' frameBorder='0' height='455' width='100%' src='https://gtfobins.github.io'></iframe>
					</Card>
					</Col>
				<Col span={12}>
				<Card
						style={{background: "#FFFFFF",
							boxShadow:
								"0 0px 3.6px rgba(0, 0, 0, 0.017),  0 0px 10px rgba(0, 0, 0, 0.025),  0 0px 24.1px rgba(0, 0, 0, 0.033),  0 0px 80px rgba(0, 0, 0, 0.05)",
						}}
						>
					<iframe frameBorder='0' height='455' width='100%' src='https://lolbas-project.github.io'></iframe>
					</Card>
					
				
				
				</Col>
				<Col span={12}>
					
				</Col>
			</Row>
			<div style={{ textAlign: "center" }}>
				<Paragraph>You have a suggestion about the feed ?</Paragraph>
				<Button icon={<GithubOutlined />} type='link'>
					<a
						href='https://github.com/LasCC/Hack-Tools/issues/new'
						rel='noreferrer noopener'
						target='_blank'
						style={{ marginLeft: 8 }}
					>
						Give us your feedback
					</a>
				</Button>
			</div>
		</QueueAnim>
	);
};
