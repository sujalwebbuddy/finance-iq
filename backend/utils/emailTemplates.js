'use strict';

const generatePasswordResetEmail = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Reset Your FinanceIQ Password</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%); padding: 40px 20px;">
        <tr>
          <td align="center">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
              <!-- Header with Logo -->
              <tr>
                <td style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 48px 40px; text-align: center; position: relative; overflow: hidden;">
                  <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                  <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255, 255, 255, 0.08); border-radius: 50%;"></div>
                  <div style="position: relative; z-index: 1;">
                    <div style="width: 64px; height: 64px; background: rgba(255, 255, 255, 0.2); border-radius: 16px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                      <span style="font-size: 32px; color: white;">🔐</span>
                    </div>
                    <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.5px; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                      FinanceIQ
                    </h1>
                    <p style="color: rgba(255, 255, 255, 0.95); font-size: 16px; margin: 0; font-weight: 500;">
                      Smart Financial Management
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Main Content -->
              <tr>
                <td style="padding: 48px 40px;">
                  <div style="text-align: center; margin-bottom: 32px;">
                    <h2 style="color: #1f2937; font-size: 28px; font-weight: 700; margin: 0 0 12px 0; letter-spacing: -0.5px;">
                      Reset Your Password
                    </h2>
                    <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #16a34a, #15803d); border-radius: 2px; margin: 0 auto;"></div>
                  </div>

                  <p style="color: #4b5563; font-size: 18px; line-height: 1.7; margin: 0 0 20px 0; text-align: center;">
                    Hi there! 👋
                  </p>

                  <p style="color: #6b7280; font-size: 16px; line-height: 1.7; margin: 0 0 32px 0;">
                    We received a request to reset your FinanceIQ password. No worries - it happens to the best of us! Click the button below to securely create a new password for your account.
                  </p>

                  <!-- CTA Button -->
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td align="center" style="padding: 8px 0 32px;">
                        <a href="${resetUrl}"
                           style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 12px; display: inline-block; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px 0 rgba(22, 163, 74, 0.35), 0 2px 4px 0 rgba(22, 163, 74, 0.2); transition: all 0.3s ease; letter-spacing: 0.3px;">
                          🔑 Reset My Password
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Security Notice -->
                  <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin: 32px 0;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="40" valign="top" style="padding-right: 16px;">
                          <div style="width: 40px; height: 40px; background: rgba(146, 64, 14, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                            <span style="font-size: 20px;">⏰</span>
                          </div>
                        </td>
                        <td valign="top">
                          <p style="color: #92400e; font-weight: 700; font-size: 15px; margin: 0 0 6px 0;">
                            This link expires in 10 minutes
                          </p>
                          <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                            For your security, this password reset link will expire in 10 minutes. If you didn't request this reset, you can safely ignore this email.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <!-- Alternative Link -->
                  <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; margin: 32px 0;">
                    <p style="color: #374151; font-size: 14px; font-weight: 600; margin: 0 0 12px 0; display: flex; align-items: center;">
                      <span style="margin-right: 8px;">🔗</span>
                      Having trouble with the button?
                    </p>
                    <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0; word-break: break-all;">
                      Copy and paste this link into your browser:<br>
                      <a href="${resetUrl}" style="color: #16a34a; text-decoration: none; font-weight: 600; word-break: break-all;">${resetUrl}</a>
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); padding: 32px 40px; border-top: 1px solid #e5e7eb;">
                  <div style="text-align: center;">
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px 0; font-weight: 500;">
                      💬 Need help? Contact our support team
                    </p>
                    <p style="color: #9ca3af; font-size: 12px; line-height: 1.6; margin: 0;">
                      This email was sent by FinanceIQ. If you no longer wish to receive these emails, you can update your preferences in your account settings.
                    </p>
                    <div style="margin-top: 24px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
                      <p style="color: #9ca3af; font-size: 11px; margin: 0;">
                        © ${new Date().getFullYear()} FinanceIQ. All rights reserved.
                      </p>
                    </div>
                  </div>
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

module.exports = {
  generatePasswordResetEmail,
};
