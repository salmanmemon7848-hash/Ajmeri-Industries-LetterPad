import { COMPANY } from '../config/company';

function Letterhead() {
  return (
    <div className="header" style={{ marginBottom: '0', position: 'relative' }}>
      {/* LEFT VERTICAL GOLD BAR - Full height of letter */}
      <div style={{
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '4px',
        background: '#C9A84C',
        zIndex: 10
      }}></div>

      {/* TOP ROW: GST Left, Mobile Right */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        padding: '8px 15px 5px',
        background: '#1B2A4A'
      }}>
        <div style={{ 
          fontSize: '10px',
          color: '#FFFFFF',
          fontFamily: "'Segoe UI', Arial, sans-serif",
          fontWeight: '500'
        }}>
          GST No. {COMPANY.gstNo}
        </div>
        <div style={{ 
          fontSize: '10px',
          color: '#FFFFFF',
          fontFamily: "'Segoe UI', Arial, sans-serif",
          fontWeight: '500'
        }}>
          Mob. No. {COMPANY.mobile}
        </div>
      </div>

      {/* COMPANY NAME - Centered, Large, Bold */}
      <div style={{ 
        background: '#1B2A4A',
        padding: '15px 15px 20px',
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* White inner glow line at bottom of header */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'rgba(255, 255, 255, 0.3)'
        }}></div>

        <div style={{ 
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#FFFFFF',
          letterSpacing: '4px',
          fontFamily: "'Times New Roman', Georgia, serif",
          textTransform: 'uppercase'
        }}>
          ★ {COMPANY.name} ★
        </div>

        {/* Gold accent line below company name */}
        <div style={{
          width: '80px',
          height: '2px',
          background: '#C9A84C',
          margin: '10px auto 0'
        }}></div>
      </div>

      {/* THIN GOLD ACCENT LINE */}
      <div style={{
        height: '2px',
        background: '#C9A84C'
      }}></div>

      {/* ADDRESS BAR - Light background, centered */}
      <div style={{ 
        background: '#F1F3F7',
        padding: '8px 15px',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: '11px',
          color: '#1A1A1A',
          fontFamily: "'Segoe UI', Arial, sans-serif",
          letterSpacing: '0.5px'
        }}>
          📍 {COMPANY.address}
        </div>
      </div>

      {/* DOCUMENT REFERENCE STRIP */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        padding: '6px 15px',
        borderBottom: '1px solid #E0E0E0',
        borderTop: '1px solid #E0E0E0',
        background: '#FAFAFA'
      }}>
        <div style={{ 
          fontSize: '10px',
          color: '#666',
          fontFamily: "'Segoe UI', Arial, sans-serif"
        }}>
          Ref. No: _______________
        </div>
        <div style={{ 
          fontSize: '10px',
          color: '#666',
          fontFamily: "'Segoe UI', Arial, sans-serif"
        }}>
          Date: _______________
        </div>
      </div>
    </div>
  );
}

export default Letterhead;
