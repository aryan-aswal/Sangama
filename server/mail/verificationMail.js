const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification - Sangama</title>
		<style>
			body {
				background-color: #f0f0f0;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.6;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 20px auto;
				padding: 20px;
				background-color: #ffffff;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
				border-radius: 10px;
				text-align: center;
			}
	
			.logo {
				max-width: 150px;
				margin-bottom: 20px;
			}
	
			.header {
				font-size: 22px;
				font-weight: bold;
				color: #1a73e8;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
				color: #555555;
			}
	
			.otp {
				font-size: 24px;
				font-weight: bold;
				color: #e53935;
				margin: 20px 0;
			}
	
			.cta {
				display: inline-block;
				padding: 12px 25px;
				background-color: #1a73e8;
				color: #ffffff;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.footer {
				margin-top: 30px;
				font-size: 12px;
				color: #888888;
			}
	
			a {
				color: #1a73e8;
				text-decoration: none;
			}
		</style>
	</head>
	
	<body>
		<div class="container">
			<img class="logo" src="https://your-sangama-logo-url.com/logo.png" alt="Sangama Logo">
			<div class="header">Verify Your Email with Sangama</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Welcome to Sangama! To complete your registration, please use the following OTP (One-Time Password) to verify your account:</p>
				<div class="otp">${otp}</div>
				<p>This OTP is valid for <strong>5 minutes</strong>. If you did not request this verification, please ignore this email.</p>
			</div>
			<a href="https://sangama.com" class="cta">Visit Sangama</a>
			<div class="support">Need help? Contact us at <a href="mailto:support@sangama.com">support@sangama.com</a>.</div>
			<div class="footer">© 2024 Sangama. All rights reserved.</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;
