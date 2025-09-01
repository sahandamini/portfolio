import * as React from 'react';

interface ContactEmailProps {
  email: string;
  message: string;
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
        .message-content {
          white-space: pre-wrap; /* This will preserve line breaks */
        }
      `}</style>
    </head>
    <body>
      <p><strong>From:</strong> {email}</p>
      <p><strong>Message:</strong></p>
      <p className="message-content">{message}</p>
      <p><em>This email was sent from your portfolio contact form.</em></p>
    </body>
  </html>
);

export default ContactEmail;
