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
  
  // Ensure colors are preserved in PDF output
  clone.style.webkitPrintColorAdjust = 'exact';
  clone.style.printColorAdjust = 'exact';
  
  // Add signature and stamp images if available
  if (signatureUrl || stampUrl) {
    const footerSection = clone.querySelector('.footer-section');
    if (footerSection) {
      // Remove any existing images
      const existingImgs = footerSection.querySelectorAll('img');
      existingImgs.forEach(img => img.remove());
      
      // Create container for right-aligned footer
      const footerContainer = document.createElement('div');
      footerContainer.style.textAlign = 'right';
      footerContainer.style.display = 'flex';
      footerContainer.style.flexDirection = 'column';
      footerContainer.style.alignItems = 'flex-end';
      footerContainer.style.gap = '5px';
      
      // Add stamp first (appears to the left)
      if (stampUrl) {
        const stampImg = document.createElement('img');
        stampImg.src = stampUrl;
        stampImg.alt = 'Company Stamp';
        stampImg.className = 'stamp-image';
        stampImg.style.display = 'inline-block';
        stampImg.style.width = '100px';
        stampImg.style.maxHeight = '100px';
        stampImg.style.objectFit = 'contain';
        stampImg.style.mixBlendMode = 'multiply';
        stampImg.style.marginRight = '15px';
        footerContainer.appendChild(stampImg);
      }
      
      // Add signature image (DIRECTLY above text, 5px gap)
      if (signatureUrl) {
        const sigImg = document.createElement('img');
        sigImg.src = signatureUrl;
        sigImg.alt = 'Signature';
        sigImg.className = 'signature-stamp-image';
        sigImg.style.display = 'block';
        sigImg.style.marginBottom = '5px';
        sigImg.style.width = '120px';
        sigImg.style.maxHeight = '80px';
        sigImg.style.objectFit = 'contain';
        sigImg.style.mixBlendMode = 'multiply';
        footerContainer.appendChild(sigImg);
      }
      
      // Add footer text
      const footerText1 = footerSection.querySelector('div:first-child');
      const footerText2 = footerSection.querySelector('div:last-child');
      
      if (footerText1) footerContainer.appendChild(footerText1);
      if (footerText2) footerContainer.appendChild(footerText2);
      
      // Clear footer and add new container
      footerSection.innerHTML = '';
      footerSection.appendChild(footerContainer);
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
