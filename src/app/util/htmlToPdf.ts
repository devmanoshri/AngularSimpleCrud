import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = (pdfName: string) => {
  const elementToPrint: any = document.getElementById('contentToConvert');

  html2canvas(elementToPrint, { scale: 2 }).then((canvas) => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'A4',
      compress: true,
    });
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);

    pdf.setProperties({
      title: 'HTML to PDF',
      subject: 'Angular simple CRUD',
      author: 'Manoshri',
    });

    pdf.setFontSize(12);
    pdf.save(pdfName + '.pdf');
  });
};
