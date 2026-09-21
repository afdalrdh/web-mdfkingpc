import PDFDocument from 'pdfkit';

export interface InvoiceData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  deviceModel?: string | null;
  problemDescription?: string | null;
  price: number;
  paymentStatus: string;
  createdAt: Date | string;
  invoiceUrl?: string | null;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Header Banner / Brand
      doc
        .fillColor('#1E293B')
        .fontSize(22)
        .font('Helvetica-Bold')
        .text('mdfkingpc', 40, 40);

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#64748B')
        .text('Made For KING PC - Servis & Solusi IT Bandung', 40, 68)
        .text('Jl. Ir. H. Juanda No. 154, Dago, Bandung | WA: +62 812-3456-7890', 40, 82)
        .text('Email: support@mdfkingpc.com | Web: www.mdfkingpc.com', 40, 96);

      doc
        .strokeColor('#CBD5E1')
        .lineWidth(1)
        .moveTo(40, 115)
        .lineTo(555, 115)
        .stroke();

      // Invoice Info Header
      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#0F172A')
        .text('INVOICE / BUKTI PEMBAYARAN', 40, 130);

      const formattedDate = new Date(data.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      doc
        .fontSize(10)
        .font('Helvetica')
        .fillColor('#334155')
        .text(`No. Invoice : INV-${data.orderId}`, 40, 155)
        .text(`Tanggal     : ${formattedDate}`, 40, 170)
        .text(`Status      : ${data.paymentStatus.toUpperCase()} (LUNAS)`, 40, 185);

      // Customer Details Box
      doc
        .rect(340, 130, 215, 70)
        .fillAndStroke('#F8FAFC', '#E2E8F0');

      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#0F172A')
        .text('Tagihan Kepada:', 350, 138);

      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#334155')
        .text(`Nama    : ${data.customerName}`, 350, 154)
        .text(`Kontak  : ${data.customerPhone}`, 350, 168)
        .text(`Email   : ${data.customerEmail}`, 350, 182);

      // Table Header
      const tableTop = 225;
      doc
        .rect(40, tableTop, 515, 25)
        .fill('#0284C7');

      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#FFFFFF')
        .text('Rincian Layanan / Perbaikan', 50, tableTop + 7)
        .text('Jumlah (Rp)', 440, tableTop + 7, { width: 100, align: 'right' });

      // Table Content
      const itemTop = tableTop + 35;
      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#0F172A')
        .text(data.serviceName, 50, itemTop);

      let subTextY = itemTop + 16;
      if (data.deviceModel) {
        doc
          .fontSize(9)
          .font('Helvetica')
          .fillColor('#64748B')
          .text(`Perangkat: ${data.deviceModel}`, 50, subTextY);
        subTextY += 14;
      }

      if (data.problemDescription) {
        doc
          .fontSize(9)
          .font('Helvetica')
          .fillColor('#64748B')
          .text(`Catatan Kerusakan: ${data.problemDescription}`, 50, subTextY, { width: 360 });
        subTextY += 24;
      }

      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(data.price);

      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#0F172A')
        .text(formattedPrice, 440, itemTop, { width: 100, align: 'right' });

      // Divider line
      const totalY = Math.max(subTextY + 10, tableTop + 90);
      doc
        .strokeColor('#E2E8F0')
        .lineWidth(1)
        .moveTo(40, totalY)
        .lineTo(555, totalY)
        .stroke();

      // Total Section
      doc
        .rect(340, totalY + 10, 215, 30)
        .fill('#F0F9FF');

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#0369A1')
        .text('TOTAL BAYAR:', 350, totalY + 18)
        .text(formattedPrice, 440, totalY + 18, { width: 100, align: 'right' });

      // Garansi & Footer Note
      const footerY = totalY + 70;
      doc
        .rect(40, footerY, 515, 45)
        .fillAndStroke('#FEF3C7', '#FDE68A');

      doc
        .fontSize(9)
        .font('Helvetica-Bold')
        .fillColor('#92400E')
        .text('KETENTUAN GARANSI & CATATAN:', 50, footerY + 8);

      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#78350F')
        .text('1. Layanan servis mdfkingpc dilindungi Garansi Resmi 30 Hari sejak tanggal konfirmasi pembayaran.', 50, footerY + 20)
        .text('2. Harap simpan bukti invoice digital ini sebagai klaim garansi.', 50, footerY + 31);

      // Thank you & Stamp
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .fillColor('#0F172A')
        .text('Terima kasih telah memilih mdfkingpc!', 40, footerY + 65, { align: 'center' });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
