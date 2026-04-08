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

function LetterPreview({ formData, language, translations, signatureUrl }) {
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

      {/* DATE BLOCK - RIGHT ALIGNED WITH PROPER SPACING */}
      <div className="section date-section">
        {translations.date}: {formatDate(formData.date)}
      </div>

      {/* CONTENT BLOCK - WITH LEFT/RIGHT MARGINS */}
      <div className="content">
        {/* TO BLOCK - BOLD CONTENT */}
        <div className="section to-section">
          <div>{translations.toPrefix}</div>
          {formData.to && <div><strong>{formData.to}</strong></div>}
          {formData.bankName && <div>{formData.bankName}</div>}
          {formData.branchName && <div>{formData.branchName}</div>}
        </div>

        {/* SUBJECT BLOCK - BOLD */}
        <div className="section subject-section">
          {translations.subjectPrefix} {formData.subject || '___'}
        </div>

        {/* GREETING BLOCK */}
        <div className="section greeting-section">
          {translations.greeting}
        </div>

        {/* DESCRIPTION BLOCK - CENTER ALIGNED */}
        <div 
          className="section body-section" 
          style={{ 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
        >
          {formData.description || ''}
        </div>

        {/* THANK YOU BLOCK - CENTER ALIGNED */}
        <div className="section ending-section">
          <div>{translations.thanks}</div>
        </div>
      </div>

      {/* FOOTER BLOCK - FIXED AT BOTTOM RIGHT, BALANCED */}
      <div className="footer-section">
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          {translations.forCompany} {COMPANY.name}{language === 'en' ? ',' : ''}
        </div>
        <div style={{ fontSize: '14px' }}>
          {translations.authorizedSignatory}
        </div>
        
        {/* Signature and Stamp Image - BELOW TEXT */}
        {signatureUrl && (
          <img 
            src={signatureUrl} 
            alt="Signature & Stamp" 
            className="signature-stamp-image"
          />
        )}
      </div>
    </div>
  );
}

export default LetterPreview;
