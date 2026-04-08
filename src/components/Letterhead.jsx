import { COMPANY } from '../config/company';

function Letterhead() {
  return (
    <div className="header" style={{ textAlign: 'center', marginBottom: '20px' }}>
      {/* TOP LINE: GST Left, Mobile Right */}
      <div className="header-top" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '14px',
        padding: '0 10px',
        marginBottom: '10px'
      }}>
        <div style={{ textAlign: 'left', fontWeight: '600' }}>
          GST NO. - {COMPANY.gstNo}
        </div>
        <div style={{ textAlign: 'right', fontWeight: '600' }}>
          MOB NO. - {COMPANY.mobile}
        </div>
      </div>

      {/* COMPANY NAME - Center, Big, Bold */}
      <div className="company-name" style={{ 
        fontSize: '40px', 
        fontWeight: 'bold',
        marginTop: '10px',
        letterSpacing: '2px',
        fontFamily: "'Times New Roman', Georgia, serif"
      }}>
        {COMPANY.name}
      </div>

      {/* ADDRESS - Center, Smaller */}
      <div className="address" style={{ 
        fontSize: '16px',
        marginTop: '5px',
        fontFamily: "'Times New Roman', Georgia, serif",
        color: '#333'
      }}>
        {COMPANY.address}
      </div>

      {/* DIVIDER LINE */}
      <div className="divider" style={{ 
        borderTop: '1px solid black',
        marginTop: '10px'
      }}></div>
    </div>
  );
}

export default Letterhead;
