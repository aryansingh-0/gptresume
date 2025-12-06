// emails/paymentSuccessTemplate.js
module.exports = function paymentSuccessTemplate(user,price, plan, credits) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
  </head>
  <body style="background-color:#f3f4f6; font-family: Arial, sans-serif; padding:20px;">

    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); padding:24px;">
      
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #e5e7eb; padding-bottom:16px; margin-bottom:24px;">
        <div>
          <h1 style="font-size:20px; font-weight:bold; color:#111827; margin:0;">Gpt Resume</h1>
          <p style="font-size:12px; color:#6b7280; margin:4px 0 0;">Digital Resume Tailoring</p>
        </div>
      </div>

      <!-- Invoice Info -->
      <div style="display:flex; justify-content:space-between; font-size:14px; color:#374151; margin-bottom:24px;">
        <div>
          <p style="margin:4px 0;"><strong>Invoice #:</strong> ${Date.now()}</p>
          <p style="margin:4px 0;"><strong>Issue Date:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
        <div style="text-align:right;">
          <p style="margin:4px 0;"><strong>Billed To:</strong> ${user.name}</p>
          <p style="margin:4px 0;">${user.email}</p>
        </div>
      </div>

      <!-- Table -->
      <table style="width:100%; border-collapse:collapse; margin-bottom:24px; font-size:14px; color:#374151;">
        <thead>
          <tr style="background-color:#f9fafb; text-align:left;">
            <th style="border:1px solid #d1d5db; padding:8px;">Description</th>
            <th style="border:1px solid #d1d5db; padding:8px; text-align:center;">Price</th>
            <th style="border:1px solid #d1d5db; padding:8px; text-align:center;">Credits</th>
            <th style="border:1px solid #d1d5db; padding:8px; text-align:center;">Total Credits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #d1d5db; padding:8px;">Credits Pack - ${price}</td>
            <td style="border:1px solid #d1d5db; padding:8px; text-align:center;">₹${credits}</td>
            <td style="border:1px solid #d1d5db; padding:8px; text-align:center;">${plan}</td>
            <td style="border:1px solid #d1d5db; padding:8px; text-align:center;">${(user.credits - plan)} + ${plan}</td>
          </tr>
        </tbody>
      </table>

      <!-- Total -->
      <div style="display:flex; justify-content:flex-end; margin-bottom:24px;">
        <div style="width:200px;">
          <div style="display:flex; justify-content:space-between; border-top:2px solid #111827; padding-top:8px; font-size:16px; font-weight:bold;">
            <span>Total Price:</span>
            <span>₹${(plan)}</span>
          </div>
          <div style="display:flex; justify-content:space-between;   padding-top:8px; font-size:16px; font-weight:bold;">
            <span>Total Credits:</span>
            <span>${(user.credits)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div style="font-size:14px; color:#374151;">
        <p style="margin:4px 0;">We’ve added <strong>${plan} credits</strong> to your account.</p>
        <p style="margin:4px 0;">You now have a total of <strong>${user.credits}</strong> credits available.</p>
        <p style="margin-top:16px;">Thank you for choosing <strong>Gpt Resume ✨</strong></p>
      </div>

      <!-- Footer -->
      <div style="border-top:1px solid #e5e7eb; margin-top:24px; padding-top:16px; font-size:12px; color:#6b7280; text-align:center;">
        <p style="margin:0;">Gpt Resume</p>
      </div>
    </div>
  </body>
  </html>
  `;
};
