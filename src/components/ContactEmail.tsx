import * as React from 'react'

interface ContactEmailProps {
	email: string
	message: string
	randomCode: string
}

export const ContactEmail: React.FC<Readonly<ContactEmailProps>> = ({
	email,
	message,
	randomCode,
}) => (
	<div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
		<div
			style={{
				maxWidth: '600px',
				margin: '0 auto',
				padding: '20px',
				border: '1px solid #eee',
				borderRadius: '8px',
				backgroundColor: '#f9f9f9',
			}}
		>
			<h1 style={{ fontSize: '24px', color: '#007bff', marginBottom: '20px' }}>
				New Contact Form Submission [{randomCode}]
			</h1>
			<div style={{ marginBottom: '20px' }}>
				<p>
					<strong>From:</strong> {email}
				</p>
				<p>
					<strong>Message:</strong>
				</p>
				<p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
			</div>
			<div
				style={{
					fontSize: '12px',
					color: '#777',
					borderTop: '1px solid #eee',
					paddingTop: '10px',
					marginTop: '20px',
				}}
			>
				<p>This email was sent from your portfolio contact form.</p>
			</div>
		</div>
	</div>
)

export default ContactEmail
