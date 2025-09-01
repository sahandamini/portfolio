import * as React from 'react'

interface ContactEmailProps {
	email: string
	message: string
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
	email,
	message,
}) => (
	<html>
		<head>
			<style>{`
        body {
          font-family: sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #eee;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        .header {
          font-size: 24px;
          color: #007bff;
          margin-bottom: 20px;
        }
        .content {
          margin-bottom: 20px;
        }
        .footer {
          font-size: 12px;
          color: #777;
          border-top: 1px solid #eee;
          padding-top: 10px;
          margin-top: 20px;
        }
        .message-content {
          white-space: pre-wrap; /* This will preserve line breaks */
        }
      `}</style>
		</head>
		<body>
			<div className="container">
				<h1 className="header">New Contact Form Submission</h1>
				<div className="content">
					<p>
						<strong>From:</strong> {email}
					</p>
					<p>
						<strong>Message:</strong>
					</p>
					<p className="message-content">{message}</p>
				</div>
				<div className="footer">
					<p>This email was sent from your portfolio contact form.</p>
				</div>
			</div>
		</body>
	</html>
)

export default ContactEmail
