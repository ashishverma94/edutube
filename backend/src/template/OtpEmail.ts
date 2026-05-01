const BRAND = {
  primary: "#02ae02",
  primaryDark: "#028a02",
  primaryBg: "#f0fff0",
  dark: "#0a0f0a",
  darkCard: "#0d1a0d",
  text: "#1a1a1a",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  border: "#e5e7eb",
  white: "#ffffff",
};

function otpDigits(otp: string): string {
  return otp
    .split("")
    .map(
      (digit) => `
      <td style="
        width: 48px;
        height: 56px;
        text-align: center;
        vertical-align: middle;
        background-color: ${BRAND.primaryBg};
        border: 2px solid ${BRAND.primary};
        border-radius: 12px;
        font-family: 'Courier New', Courier, monospace;
        font-size: 28px;
        font-weight: 900;
        color: ${BRAND.primaryDark};
        letter-spacing: 0;
        padding: 0;
      ">${digit}</td>
      <td style="width: 8px;"></td>`,
    )
    .join("");
}

// ─── Main template function ───────────────────────────────────────────────────
export function otpEmailTemplate(otp: string, name?: string): string {
  const displayName = name ? name.split(" ")[0] : "there";
  const year = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Your EduTube verification code</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f4f5;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color: #f4f4f5; padding: 40px 16px;">
    <tr>
      <td align="center">

        <!-- Email card — max 560px -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width: 560px; width: 100%;">

          <!-- ══ HEADER ══ -->
          <tr>
            <td style="
              background: linear-gradient(135deg, ${BRAND.dark} 0%, ${BRAND.darkCard} 100%);
              border-radius: 20px 20px 0 0;
              padding: 32px 40px 28px;
              text-align: center;
            ">
              <!-- Logo row -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/plypicker-e35d7.appspot.com/o/edutube%2Fedutube-logo.png?alt=media&token=03804ca8-220d-4610-8696-7abe425a1420"
                        alt="logo"
                        height="35"
                        style="
                          display: block;
                          margin: 10px auto;
                          border-radius: 10px;
                          box-shadow: 0 4px 12px rgba(2, 174, 5, 0.453), 
                                      0 -4px 12px rgba(2, 174, 5, 0.453),
                                      4px 0 12px rgba(2, 174, 5, 0.453),
                                      -4px 0 12px rgba(2, 174, 5, 0.453);
                        "
                      />
                  </td>
                  <td style="width: 10px;"></td>
                  <td style="
                    font-size: 22px;
                    font-weight: 900;
                    color: ${BRAND.white};
                    letter-spacing: -0.5px;
                    vertical-align: middle;
                    white-space: nowrap;
                  ">
                    Edu<span style="color: ${BRAND.primary};">Tube</span>
                  </td>
                </tr>
              </table>

              <!-- Tagline -->
              <p style="
                margin: 12px 0 0;
                font-size: 13px;
                color: rgba(255,255,255,0.4);
                letter-spacing: 0.05em;
              ">Watch together · Real-time sync · Collaborative notes</p>
            </td>
          </tr>

          <!-- ══ BODY ══ -->
          <tr>
            <td style="
              background-color: ${BRAND.white};
              padding: 40px 40px 32px;
            ">

              <!-- Greeting -->
              <p style="
                margin: 0 0 8px;
                font-size: 26px;
                font-weight: 800;
                color: ${BRAND.text};
                letter-spacing: -0.5px;
                line-height: 1.2;
              ">Hey ${displayName} 👋</p>

              <p style="
                margin: 0 0 32px;
                font-size: 15px;
                color: ${BRAND.textMuted};
                line-height: 1.6;
              ">
                Here's your one-time verification code to sign in to EduTube.
                Enter it in the app to continue.
              </p>

              <!-- ── OTP DIGITS ── -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                align="center" style="margin: 0 auto 12px;">
                <tr>
                  ${otpDigits(otp)}
                </tr>
              </table>

              <!-- Expiry note -->
              <p style="
                margin: 0 0 32px;
                font-size: 13px;
                color: ${BRAND.textLight};
                text-align: center;
              ">
                ⏱ This code expires in <strong style="color: ${BRAND.text};">10 minutes</strong>
              </p>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height: 1px; background-color: ${BRAND.border};"></td>
                </tr>
              </table>

              <!-- Security note -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0"
                style="margin: 24px 0 0; width: 100%;">
                <tr>
                  <!-- Shield icon cell -->
                  <td style="width: 36px; vertical-align: top; padding-top: 2px;">
                    <div style="
                      width: 32px;
                      height: 32px;
                      background-color: #fef3c7;
                      border-radius: 8px;
                      text-align: center;
                      line-height: 32px;
                      font-size: 16px;
                    ">🔒</div>
                  </td>
                  <td style="padding-left: 12px; vertical-align: top;">
                    <p style="
                      margin: 0 0 4px;
                      font-size: 13px;
                      font-weight: 700;
                      color: ${BRAND.text};
                    ">Didn't request this?</p>
                    <p style="
                      margin: 0;
                      font-size: 13px;
                      color: ${BRAND.textMuted};
                      line-height: 1.5;
                    ">
                      You can safely ignore this email. Someone may have entered
                      your address by mistake. Your account is not at risk.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ══ FEATURE STRIP ══ -->
          <tr>
            <td style="
              background-color: ${BRAND.primaryBg};
              border-top: 1px solid #dcffdc;
              padding: 20px 40px;
            ">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="text-align: center; width: 33%;">
                    <p style="margin: 0; font-size: 18px;">🎬</p>
                    <p style="margin: 4px 0 0; font-size: 11px; color: ${BRAND.primaryDark}; font-weight: 700;">Sync Playback</p>
                  </td>
                  <td style="text-align: center; width: 33%;">
                    <p style="margin: 0; font-size: 18px;">📝</p>
                    <p style="margin: 4px 0 0; font-size: 11px; color: ${BRAND.primaryDark}; font-weight: 700;">Live Notes</p>
                  </td>
                  <td style="text-align: center; width: 33%;">
                    <p style="margin: 0; font-size: 18px;">👥</p>
                    <p style="margin: 4px 0 0; font-size: 11px; color: ${BRAND.primaryDark}; font-weight: 700;">Watch Together</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ══ FOOTER ══ -->
          <tr>
            <td style="
              background-color: #f9fafb;
              border-top: 1px solid ${BRAND.border};
              border-radius: 0 0 20px 20px;
              padding: 24px 40px;
              text-align: center;
            ">
              <p style="
                margin: 0 0 8px;
                font-size: 12px;
                color: ${BRAND.textLight};
                line-height: 1.6;
              ">
                This email was sent to you because a sign-in was requested for your
                EduTube account. You're receiving this because you have an account
                or attempted to create one.
              </p>
              <p style="
                margin: 0;
                font-size: 12px;
                color: #d1d5db;
              ">
                © ${year} EduTube · All rights reserved
              </p>
            </td>
          </tr>

        </table>
        <!-- end card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}
