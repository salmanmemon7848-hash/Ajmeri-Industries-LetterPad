import { useState } from 'react';
import LetterForm from './components/LetterForm';
import LetterPreview from './components/LetterPreview';
import SignatureStampManager from './components/SignatureStampManager';

import { generateLetterPDF, downloadPDF } from './utils/pdfGenerator';
import { COMPANY } from './config/company';
import { translations } from './config/translations';

function App() {
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    to: '',
    subject: '',
    description: '',
    bankName: '',
    branchName: ''
  });
  const [signatureUrl, setSignatureUrl] = useState(null);
  const [stampUrl, setStampUrl] = useState(null);

  const handleFormChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleGeneratePDF = async () => {
    if (!formData.to || !formData.subject || !formData.description) {
      alert(t.fillRequiredFields);
      return;
    }

    try {
      const pdfBytes = await generateLetterPDF(
        formData,
        signatureUrl,
        stampUrl,
        language
      );
      
      const filename = `Letter_${formData.subject.replace(/\s+/g, '_').substring(0, 30)}_${new Date().toISOString().split('T')[0]}.pdf`;
      downloadPDF(pdfBytes, filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const handleShareWhatsApp = async () => {
    if (!formData.to || !formData.subject || !formData.description) {
      alert(t.fillRequiredFieldsFirst);
      return;
    }

    try {
      const pdfBytes = await generateLetterPDF(
        formData,
        signatureUrl,
        stampUrl,
        language
      );
      
      // Download PDF first
      const filename = `Letter_${formData.subject.replace(/\s+/g, '_').substring(0, 30)}.pdf`;
      downloadPDF(pdfBytes, filename);
      
      // Open WhatsApp with message
      const message = `Letter from ${COMPANY.name} - ${formData.subject}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share. Please download the PDF and share manually.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-900 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-serif">{COMPANY.name} LetterPad</h1>
              <p className="text-sm opacity-80 mt-1">Simple Professional Letter Generator</p>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">Language:</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white text-gray-800 font-semibold border-2 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                style={{ minWidth: '120px' }}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{t.writeLetter}</h2>
            <LetterForm
              formData={formData}
              onChange={handleFormChange}
              translations={t}
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGeneratePDF}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {t.generateLetter}
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                {t.shareWhatsApp}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{t.preview}</h2>
            <div className="overflow-auto max-h-[800px]">
              <LetterPreview
                formData={formData}
                language={language}
                translations={t}
                signatureUrl={signatureUrl}
                stampUrl={stampUrl}
              />
            </div>
          </div>
        </div>

        {/* Signature & Stamp Upload */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SignatureStampManager onUpload={setSignatureUrl} />
          
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-12">
        <p className="text-sm">© 2026 {COMPANY.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
