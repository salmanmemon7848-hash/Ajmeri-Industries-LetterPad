import html2pdf from 'html2pdf.js';
import { COMPANY } from '../config/company';
import { translations } from '../config/translations';

export async function generateLetterPDF(formData, signatureUrl, stampUrl, language = 'en') {
  const t = translations[language];
  
  // Get the letter content element
  const element = document.getElementById('letter-content');
  
  if (!element) {
    throw new Error('Letter content not found');
  }

  // Clone the element to modify for PDF
  const clone = element.cloneNode(true);
  
  // Add signature and stamp image if available
  if (signatureUrl) {
    const footerSection = clone.querySelector('.footer-section');
    if (footerSection) {
      // Remove any existing signature image
      const existingImg = footerSection.querySelector('img');
      if (existingImg) {
        existingImg.remove();
      }
      
      // Create new signature image
      const sigImg = document.createElement('img');
      sigImg.src = signatureUrl;
      sigImg.alt = 'Signature & Stamp';
      sigImg.style.position = 'absolute';
      sigImg.style.bottom = '30px';
      sigImg.style.right = '40px';
      sigImg.style.width = '120px';
      sigImg.style.maxHeight = '80px';
      sigImg.style.objectFit = 'contain';
      footerSection.appendChild(sigImg);
    }
  }

  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.appendChild(clone);
  document.body.appendChild(container);

  // Configure html2pdf options
  const options = {
    margin: 0,
    filename: `Letter_${formData.subject.replace(/\s+/g, '_').substring(0, 30)}_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  try {
    // Generate PDF
    const pdfBlob = await html2pdf().set(options).from(clone).outputPdf('blob');
    
    // Clean up temporary container
    document.body.removeChild(container);
    
    return pdfBlob;
  } catch (error) {
    // Clean up on error
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    throw error;
  }
}

export function downloadPDF(pdfBlob, filename) {
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename || `Letter_${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
