import { COMPANY } from '../config/company';

function Letterhead() {
  return (
    <div className="border-b-2 border-black pb-4 mb-6">
      {/* Top Row: GST and Mobile */}
      <div className="flex justify-between items-center mb-4 text-sm">
        <div className="font-serif">
          <span className="font-semibold">GST NO. - </span>
          <span>{COMPANY.gstNo}</span>
        </div>
        <div className="font-serif">
          <span className="font-semibold">MOB NO. - </span>
          <span>{COMPANY.mobile}</span>
        </div>
      </div>
      
      {/* Company Name */}
      <div className="text-center my-6">
        <h1 className="text-4xl md:text-5xl font-bold font-serif tracking-wide">
          {COMPANY.name}
        </h1>
      </div>
      
      {/* Address */}
      <div className="text-center mb-4">
        <p className="text-base font-serif text-gray-800">
          {COMPANY.address}
        </p>
      </div>
    </div>
  );
}

export default Letterhead;
