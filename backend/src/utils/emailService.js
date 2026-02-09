import nodemailer from "nodemailer";

// Create reusable transporter
const createTransporter = () => {
    // In development, use ethereal email (fake SMTP service for testing)
    if (process.env.NODE_ENV === "development" && !process.env.EMAIL_USER) {
        console.log("⚠️  Email service: Using ethereal (test) email");
        return null; // Will be created on demand using ethereal
    }

    // Production email configuration
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST || "smtp.gmail.com",
        port: parseInt(process.env.EMAIL_PORT || "587"),
        secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

// Send verification email
export const sendVerificationEmail = async (user, token) => {
    try {
        let transporter = createTransporter();

        // If no transporter (dev mode), create ethereal test account
        if (!transporter) {
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

        const mailOptions = {
            from: `"FocusFlow" <${process.env.EMAIL_FROM || "noreply@focusflow.app"}>`,
            to: user.email,
            subject: "Verify Your Email - FocusFlow",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
                        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #38bdf8, #818cf8); padding: 40px 20px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #1a202c; font-size: 22px; margin-bottom: 20px; }
                        .content p { color: #4a5568; margin-bottom: 20px; font-size: 16px; }
                        .button { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #38bdf8, #60a5fa); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; }
                        .button:hover { opacity: 0.9; }
                        .footer { background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
                        .footer p { color: #718096; font-size: 14px; margin: 5px 0; }
                        .code { background: #f7fafc; padding: 12px 16px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #2d3748; margin: 20px 0; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎯 FocusFlow</h1>
                        </div>
                        <div class="content">
                            <h2>Welcome ${user.firstName || user.username}!</h2>
                            <p>Thank you for signing up for FocusFlow. To complete your registration, please verify your email address by clicking the button below:</p>
                            <div style="text-align: center;">
                                <a href="${verificationUrl}" class="button">Verify Email Address</a>
                            </div>
                            <p>Or copy and paste this link into your browser:</p>
                            <div class="code">${verificationUrl}</div>
                            <p><strong>This link will expire in 24 hours.</strong></p>
                            <p>If you didn't create an account with FocusFlow, please ignore this email.</p>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} FocusFlow. All rights reserved.</p>
                            <p>Focus better. Work smarter. Live mindfully.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Welcome to FocusFlow!
                
                Thank you for signing up. Please verify your email address by visiting:
                ${verificationUrl}
                
                This link will expire in 24 hours.
                
                If you didn't create an account, please ignore this email.
                
                © ${new Date().getFullYear()} FocusFlow
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        // Log preview URL for development
        if (process.env.NODE_ENV === "development") {
            console.log("📧 Verification email preview:", nodemailer.getTestMessageUrl(info));
        }

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email sending error:", error);
        return { success: false, error: error.message };
    }
};

// Send password reset email
export const sendPasswordResetEmail = async (user, token) => {
    try {
        let transporter = createTransporter();

        if (!transporter) {
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransporter({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });
        }

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

        const mailOptions = {
            from: `"FocusFlow" <${process.env.EMAIL_FROM || "noreply@focusflow.app"}>`,
            to: user.email,
            subject: "Password Reset Request - FocusFlow",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
                        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #f59e0b, #ef4444); padding: 40px 20px; text-align: center; }
                        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
                        .content { padding: 40px 30px; }
                        .content h2 { color: #1a202c; font-size: 22px; margin-bottom: 20px; }
                        .content p { color: #4a5568; margin-bottom: 20px; font-size: 16px; }
                        .button { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #f59e0b, #f97316); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; margin: 20px 0; }
                        .button:hover { opacity: 0.9; }
                        .footer { background: #f7fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; }
                        .footer p { color: #718096; font-size: 14px; margin: 5px 0; }
                        .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
                        .code { background: #f7fafc; padding: 12px 16px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 14px; color: #2d3748; margin: 20px 0; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 FocusFlow</h1>
                        </div>
                        <div class="content">
                            <h2>Password Reset Request</h2>
                            <p>Hi ${user.firstName || user.username},</p>
                            <p>We received a request to reset the password for your FocusFlow account. Click the button below to reset it:</p>
                            <div style="text-align: center;">
                                <a href="${resetUrl}" class="button">Reset Password</a>
                            </div>
                            <p>Or copy and paste this link into your browser:</p>
                            <div class="code">${resetUrl}</div>
                            <div class="warning">
                                <strong>⚠️ Security Notice:</strong><br>
                                This link will expire in 1 hour for your security.<br>
                                If you didn't request a password reset, please ignore this email and your password will remain unchanged.
                            </div>
                        </div>
                        <div class="footer">
                            <p>© ${new Date().getFullYear()} FocusFlow. All rights reserved.</p>
                            <p>Focus better. Work smarter. Live mindfully.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
                Password Reset Request
                
                Hi ${user.firstName || user.username},
                
                We received a request to reset your FocusFlow password. Visit:
                ${resetUrl}
                
                This link will expire in 1 hour.
                
                If you didn't request this, please ignore this email.
                
                © ${new Date().getFullYear()} FocusFlow
            `,
        };

        const info = await transporter.sendMail(mailOptions);

        if (process.env.NODE_ENV === "development") {
            console.log("📧 Password reset email preview:", nodemailer.getTestMessageUrl(info));
        }

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Email sending error:", error);
        return { success: false, error: error.message };
    }
};
