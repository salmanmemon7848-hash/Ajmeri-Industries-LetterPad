import html2pdf from 'html2pdf.js';
import { COMPANY } from '../config/company';
import { translations } from '../config/translations';

// Format date for display
function formatDate(dateString) {
  if (!dateString) return '___';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function generateLetterPDF(formData, signatureUrl, stampUrl, language = 'en') {
  const t = translations[language];
  
  // Get the letter content element
  const element = document.getElementById('letter-content');
  
  if (!element) {
    throw new Error('Letter content not found');
  }

  // Clone the element to modify for PDF
  const clone = element.cloneNode(true);
  
  // Add signature and stamp images if available
  if (signatureUrl || stampUrl) {
    const placeholder = clone.querySelector('.signature-stamp-placeholder');
    if (placeholder) {
      placeholder.innerHTML = '';
      placeholder.style.position = 'relative';
      placeholder.style.height = '80px';
      placeholder.style.marginTop = '20px';
      
      if (signatureUrl) {
        const sigImg = document.createElement('img');
        sigImg.src = signatureUrl;
        sigImg.style.position = 'absolute';
        sigImg.style.right = '60px';
        sigImg.style.top = '0';
        sigImg.style.height = '60px';
        sigImg.style.width = 'auto';
        placeholder.appendChild(sigImg);
      }
      
      if (stampUrl) {
        const stampImg = document.createElement('img');
        stampImg.src = stampUrl;
        stampImg.style.position = 'absolute';
        stampImg.style.right = '0';
        stampImg.style.top = '0';
        stampImg.style.height = '80px';
        stampImg.style.width = '80px';
        placeholder.appendChild(stampImg);
      }
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
