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

function LetterPreview({ formData, language, translations, signatureUrl, stampUrl }) {
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
      <div className="content" style={{ position: 'relative' }}>
        {/* WATERMARK - Subtle diagonal text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-30deg)',
          fontSize: '60px',
          fontWeight: 'bold',
          color: '#1B2A4A',
          opacity: 0.06,
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 0,
          fontFamily: "'Times New Roman', Georgia, serif"
        }}>
          {COMPANY.name}
        </div>

        {/* CORNER ACCENT MARKS - Premium stationery feel */}
        {/* Top-Left Corner */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '20px',
          height: '20px',
          borderTop: '2px solid #C9A84C',
          borderLeft: '2px solid #C9A84C',
          zIndex: 1
        }}></div>
        {/* Top-Right Corner */}
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          width: '20px',
          height: '20px',
          borderTop: '2px solid #C9A84C',
          borderRight: '2px solid #C9A84C',
          zIndex: 1
        }}></div>
        {/* Bottom-Left Corner */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '20px',
          height: '20px',
          borderBottom: '2px solid #C9A84C',
          borderLeft: '2px solid #C9A84C',
          zIndex: 1
        }}></div>
        {/* Bottom-Right Corner */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          width: '20px',
          height: '20px',
          borderBottom: '2px solid #C9A84C',
          borderRight: '2px solid #C9A84C',
          zIndex: 1
        }}></div>

        {/* TO BLOCK - BOLD CONTENT */}
        <div className="section to-section" style={{ position: 'relative', zIndex: 2 }}>
          <div>{translations.toPrefix}</div>
          {formData.to && <div><strong>{formData.to}</strong></div>}
          {formData.bankName && <div>{formData.bankName}</div>}
          {formData.branchName && <div>{formData.branchName}</div>}
        </div>

        {/* SUBJECT BLOCK - Bold, Underlined, Gold Label */}
        <div className="section subject-section" style={{ position: 'relative', zIndex: 2 }}>
          <span style={{ 
            color: '#C9A84C',
            fontWeight: 'bold',
            fontSize: '15px'
          }}>
            {translations.subjectPrefix}
          </span>{' '}
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '15px',
            textDecoration: 'underline',
            color: '#1A1A1A'
          }}>
            {formData.subject || '___'}
          </span>
        </div>

        {/* GREETING BLOCK */}
        <div className="section greeting-section" style={{ position: 'relative', zIndex: 2 }}>
          {translations.greeting}
        </div>

        {/* DESCRIPTION BLOCK - LEFT ALIGNED */}
        <div 
          className="section body-section" 
          style={{ 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            position: 'relative',
            zIndex: 2
          }}
        >
          {formData.description || ''}
        </div>

        {/* THANK YOU BLOCK */}
        <div className="section ending-section" style={{ position: 'relative', zIndex: 2 }}>
          <div>{translations.thanks}</div>
        </div>
      </div>

      {/* FOOTER BLOCK - RIGHT ALIGNED, Signature above text */}
      <div className="footer-section" style={{ 
        borderTop: '1px solid #C9A84C',
        background: '#F8F9FB',
        padding: '15px 20px 10px'
      }}>
        <div style={{ 
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '5px'
        }}>
          {/* Signature Image - DIRECTLY above text, max 5px gap */}
          {signatureUrl && (
            <img 
              src={signatureUrl} 
              alt="Signature" 
              className="signature-stamp-image"
              style={{ 
                display: 'block',
                marginBottom: '5px',
                width: '120px',
                maxHeight: '80px',
                objectFit: 'contain',
                mixBlendMode: 'multiply'
              }}
            />
          )}

          {/* Stamp Image - To the left of signature area */}
          {stampUrl && (
            <img 
              src={stampUrl} 
              alt="Company Stamp" 
              className="stamp-image"
              style={{ 
                display: 'inline-block',
                width: '100px',
                maxHeight: '100px',
                objectFit: 'contain',
                mixBlendMode: 'multiply',
                marginRight: '15px'
              }}
            />
          )}

          {/* Footer Text - RIGHT ALIGNED ALWAYS */}
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
            {translations.forCompany} {COMPANY.name}{language === 'en' ? ',' : ''}
          </div>
          <div style={{ fontSize: '13px', color: '#555' }}>
            {translations.authorizedSignatory}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LetterPreview;
