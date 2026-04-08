import { COMPANY } from '../config/company';

function Letterhead() {
  return (
    <div style={{ borderBottom: '3px double #333', paddingBottom: '15px', marginBottom: '20px' }}>
      {/* Top Row: GST Left, Mobile Right */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        fontSize: '14px',
        fontFamily: "'Times New Roman', Georgia, serif"
      }}>
        <div style={{ textAlign: 'left' }}>
          <span style={{ fontWeight: 'bold' }}>GST NO. - </span>
          <span>{COMPANY.gstNo}</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontWeight: 'bold' }}>MOB NO. - </span>
          <span>{COMPANY.mobile}</span>
        </div>
      </div>
      
      {/* Company Name - Centered */}
      <div style={{ 
        textAlign: 'center', 
        margin: '15px 0 10px 0'
      }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: 'bold', 
          fontFamily: "'Times New Roman', Georgia, serif",
          letterSpacing: '2px',
          margin: '0'
        }}>
          {COMPANY.name}
        </h1>
      </div>
      
      {/* Address - Centered */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '10px',
        fontSize: '16px',
        fontFamily: "'Times New Roman', Georgia, serif",
        color: '#333'
      }}>
        <p style={{ margin: '0' }}>
          {COMPANY.address}
        </p>
      </div>
    </div>
  );
}

export default Letterhead;
