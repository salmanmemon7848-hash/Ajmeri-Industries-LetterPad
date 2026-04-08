function LetterForm({ formData, onChange, translations }) {
  return (
    <form className="space-y-4">
      {/* Date */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.date} <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.date || ''}
          onChange={(e) => onChange('date', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* To Section */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.to} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.to || ''}
          onChange={(e) => onChange('to', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={translations.toPlaceholder}
          required
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.subject} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.subject || ''}
          onChange={(e) => onChange('subject', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={translations.subjectPlaceholder}
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.description} <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-sans"
          rows={12}
          placeholder={translations.descriptionPlaceholder}
          required
          style={{ minHeight: '200px', resize: 'vertical' }}
        />
      </div>

      {/* Bank Name (Optional) */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.bankName} <span className="text-gray-400 font-normal">({translations.optional})</span>
        </label>
        <input
          type="text"
          value={formData.bankName || ''}
          onChange={(e) => onChange('bankName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={translations.bankNamePlaceholder}
        />
      </div>

      {/* Branch Name (Optional) */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          {translations.branchName} <span className="text-gray-400 font-normal">({translations.optional})</span>
        </label>
        <input
          type="text"
          value={formData.branchName || ''}
          onChange={(e) => onChange('branchName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={translations.branchNamePlaceholder}
        />
      </div>
    </form>
  );
}

export default LetterForm;
