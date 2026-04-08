import Letterhead from './Letterhead';
import { COMPANY } from '../config/company';

function formatDate(dateString) {
  if (!dateString) return '___';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function LetterPreview({ formData, language, translations }) {
  if (!formData.to && !formData.subject && !formData.description) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>Fill in the form to preview your letter</p>
      </div>
    );
  }

  return (
    <div id="letter-content" className="letter-page" style={{ fontFamily: language === 'hi' ? "'Noto Sans Devanagari', 'Mangal', 'Times New Roman', serif" : "'Times New Roman', Georgia, serif" }}>
      {/* HEADER BLOCK */}
      <Letterhead />

      {/* DATE BLOCK - SEPARATE DIV */}
      <div className="section date-section" style={{ textAlign: 'right', marginBottom: '20px' }}>
        {translations.date}: {formatDate(formData.date)}
      </div>

      {/* TO BLOCK - SEPARATE DIV */}
      <div className="section to-section" style={{ marginBottom: '15px', whiteSpace: 'pre-line' }}>
        <div>{translations.toPrefix}</div>
        {formData.to && <div>{formData.to}</div>}
        {formData.bankName && <div>{formData.bankName}</div>}
        {formData.branchName && <div>{formData.branchName}</div>}
      </div>

      {/* SUBJECT BLOCK - SEPARATE DIV */}
      <div className="section subject-section" style={{ fontWeight: 'bold', margin: '15px 0' }}>
        {translations.subjectPrefix} {formData.subject || '___'}
      </div>

      {/* GREETING BLOCK - SEPARATE DIV */}
      <div className="section greeting-section" style={{ marginBottom: '10px' }}>
        {translations.greeting}
      </div>

      {/* BODY BLOCK - SEPARATE DIV (MOST IMPORTANT) */}
      <div 
        className="section body-section" 
        style={{ 
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          lineHeight: '1.6',
          marginBottom: '15px',
          textAlign: 'justify'
        }}
      >
        {formData.description || ''}
      </div>

      {/* ENDING BLOCK - SEPARATE DIV */}
      <div className="section ending-section" style={{ marginTop: '20px', marginBottom: '10px' }}>
        <div>{translations.thanks}</div>
        <div>{translations.asterisk}</div>
      </div>

      {/* FOOTER BLOCK - BOTTOM RIGHT */}
      <div className="footer-section" style={{ 
        marginTop: '40px',
        textAlign: 'right',
        position: 'relative'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          {translations.forCompany} {COMPANY.name}{language === 'en' ? ',' : ''}
        </div>
        <div style={{ fontSize: '14px', marginBottom: '60px' }}>
          {translations.authorizedSignatory}
        </div>
        
        {/* Signature and Stamp placeholder for preview */}
        <div className="signature-stamp-placeholder" style={{ 
          marginTop: '20px',
          fontSize: '12px',
          color: '#999'
        }}>
          [Signature & Stamp will appear here in PDF]
        </div>
      </div>
    </div>
  );
}

export default LetterPreview;
