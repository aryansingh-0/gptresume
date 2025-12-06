// emails/EmailVerification.js
module.exports = function EmailVerification(verificationUrl) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Email Verification</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
      <table role="presentation" style="width:100%; border-collapse:collapse; background-color:#f4f4f4; padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" style="width:600px; background:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding:40px; text-align:center;">
              
              <tr>
                <td style="font-size:24px; font-weight:bold; color:#333;">
                  Welcome to Gpt Resume
                </td>
              </tr>
              
              <tr>
                <td style="padding:20px 0; font-size:16px; color:#555;">
                  Thank you for signing up! Please confirm your email address by clicking the button below.
                </td>
              </tr>

              <tr>
                <td style="padding:30px 0;">
                  <a href="${verificationUrl}" target="_blank" 
                    style="background-color:#4CAF50; color:#fff; text-decoration:none; 
                           padding:14px 28px; border-radius:6px; font-size:16px; font-weight:bold; display:inline-block;">
                    Verify Email
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding:20px 0; font-size:14px; color:#777;">
                  Or copy and paste this link into your browser:
                  <br />
                  <a href="${verificationUrl}" target="_blank" style="color:#4CAF50; word-break:break-all;">
                    ${verificationUrl}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="padding-top:30px; font-size:12px; color:#999;">
                  This link will expire in 1 hour. If you didn’t create this account, you can safely ignore this email.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
