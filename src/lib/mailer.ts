import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
const SMTP_USER = process.env.SMTP_USER || '';
const SMTP_PASS = process.env.SMTP_PASS || '';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'admin@mdfkingpc.com';

function createTransporter() {
  if (SMTP_USER && SMTP_PASS) {
    return nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });
  }
  return null;
}

export async function sendOrderConfirmationEmail(order: {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  price: number;
  deviceModel?: string | null;
  problemDescription?: string | null;
}) {
  const transporter = createTransporter();

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(order.price);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; borderRadius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">mdfkingpc</h2>
        <p style="margin: 5px 0 0; color: #38bdf8; font-size: 14px;">Made For KING PC - Konfirmasi Pemesanan</p>
      </div>
      <div style="padding: 24px; color: #334155; line-height: 1.6;">
        <h3 style="color: #0f172a; margin-top: 0;">Halo, ${order.customerName}!</h3>
        <p>Terima kasih telah melakukan pemesanan servis di <strong>mdfkingpc</strong>. Pesanan Anda telah berhasil tercatat di sistem kami.</p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px;"><strong>ID Pesanan:</strong> ORD-${order.id}</p>
          <p style="margin: 0 0 8px;"><strong>Layanan:</strong> ${order.serviceName}</p>
          <p style="margin: 0 0 8px;"><strong>Perangkat:</strong> ${order.deviceModel || '-'}</p>
          <p style="margin: 0 0 8px;"><strong>Estimasi Biaya:</strong> ${formattedPrice}</p>
          <p style="margin: 0;"><strong>Status Pembayaran:</strong> <span style="color: #d97706; font-weight: bold;">MENUNGGU KONFIRMASI (PENDING)</span></p>
        </div>

        <p>Tim teknisi kami akan segera memproses dan memeriksa perangkat/pesanan Anda. Silakan selesaikan pembayaran dan unggah bukti pembayaran jika belum dilakukan.</p>
        
        <p style="margin-top: 30px; font-size: 13px; color: #64748b; text-align: center;">
          Ada pertanyaan? Hubungi Customer Support kami via WhatsApp: <strong>+62 812-3456-7890</strong>
        </p>
      </div>
      <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} mdfkingpc Bandung. All rights reserved.
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('[Nodemailer Simulation] Order Confirmation Email created for:', order.customerEmail);
    return { success: true, simulated: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"mdfkingpc Service" <${SMTP_USER || NOTIFICATION_EMAIL}>`,
      to: order.customerEmail,
      subject: `[mdfkingpc] Konfirmasi Pesanan ORD-${order.id}`,
      html: htmlContent,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer error sending order confirmation:', error);
    return { success: false, error };
  }
}

export async function sendInvoiceEmail(
  order: {
    id: string;
    customerName: string;
    customerEmail: string;
    serviceName: string;
    price: number;
    invoiceUrl?: string | null;
  },
  pdfBuffer?: Buffer
) {
  const transporter = createTransporter();

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(order.price);

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; borderRadius: 8px; overflow: hidden;">
      <div style="background-color: #0f172a; color: #ffffff; padding: 20px; text-align: center;">
        <h2 style="margin: 0;">mdfkingpc</h2>
        <p style="margin: 5px 0 0; color: #22c55e; font-size: 14px;">Pembayaran Terkonfirmasi & Invoice Resmi</p>
      </div>
      <div style="padding: 24px; color: #334155; line-height: 1.6;">
        <h3 style="color: #0f172a; margin-top: 0;">Halo, ${order.customerName}!</h3>
        <p>Pembayaran untuk pesanan <strong>ORD-${order.id}</strong> telah berhasil dikonfirmasi oleh tim admin mdfkingpc.</p>
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px;"><strong>No. Invoice:</strong> INV-${order.id}</p>
          <p style="margin: 0 0 8px;"><strong>Layanan:</strong> ${order.serviceName}</p>
          <p style="margin: 0 0 8px;"><strong>Total Lunas:</strong> ${formattedPrice}</p>
          <p style="margin: 0;"><strong>Status:</strong> <span style="color: #16a34a; font-weight: bold;">CONFIRMED / LUNAS</span></p>
        </div>

        <p>Terlampir invoice PDF resmi pembayaran Anda. Invoice ini berfungsi sebagai bukti pembayaran sah dan dokumen klaim <strong>Garansi 30 Hari mdfkingpc</strong>.</p>
        
        ${
          order.invoiceUrl
            ? `<p style="text-align: center; margin: 25px 0;">
                <a href="${order.invoiceUrl}" target="_blank" style="background-color: #0284c7; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Unduh Invoice PDF</a>
               </p>`
            : ''
        }

        <p style="margin-top: 30px; font-size: 13px; color: #64748b; text-align: center;">
          Terima kasih atas kepercayaan Anda kepada mdfkingpc Bandung!
        </p>
      </div>
      <div style="background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #94a3b8;">
        &copy; ${new Date().getFullYear()} mdfkingpc Bandung. All rights reserved.
      </div>
    </div>
  `;

  if (!transporter) {
    console.log('[Nodemailer Simulation] Invoice Email created for:', order.customerEmail);
    return { success: true, simulated: true };
  }

  try {
    const attachments = pdfBuffer
      ? [
          {
            filename: `Invoice-INV-${order.id}.pdf`,
            content: pdfBuffer,
            contentType: 'application/pdf',
          },
        ]
      : [];

    const info = await transporter.sendMail({
      from: `"mdfkingpc Billing" <${SMTP_USER || NOTIFICATION_EMAIL}>`,
      to: order.customerEmail,
      subject: `[mdfkingpc] Invoice & Konfirmasi Pembayaran INV-${order.id}`,
      html: htmlContent,
      attachments,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer error sending invoice:', error);
    return { success: false, error };
  }
}
