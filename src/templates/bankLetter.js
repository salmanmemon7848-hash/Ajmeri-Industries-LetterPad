export const bankLetterTemplate = {
  id: 'bank-letter-default',
  template_name: 'Bank Guarantee Letter',
  fields: [
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'bankName', label: 'Bank Name', type: 'text', required: true },
    { key: 'branchName', label: 'Branch Name', type: 'text', required: true },
    { key: 'district', label: 'District', type: 'text', required: true },
    { key: 'totalAmount', label: 'Total Bank Guarantee Amount (₹)', type: 'number', required: true },
    { key: 'submittedAmount', label: 'Submitted Amount (₹)', type: 'number', required: true },
    { key: 'duration', label: 'Duration (months)', type: 'number', required: true },
    { key: 'millingYearOld', label: 'Milling Year (Old)', type: 'text', required: true },
    { key: 'millingYearNew', label: 'Milling Year (New)', type: 'text', required: true }
  ],
  content: [
    { type: 'date', align: 'left' },
    { type: 'newline' },
    { type: 'text', value: 'To,' },
    { type: 'text', value: 'The Branch Manager,' },
    { type: 'dynamic', key: 'bankName' },
    { type: 'dynamic', key: 'branchName' },
    { type: 'dynamic', key: 'district' },
    { type: 'newline' },
    { 
      type: 'subject', 
      value: 'Submission of Bank Guarantee for Milling Year {{millingYearOld}} to {{millingYearNew}}' 
    },
    { type: 'newline' },
    { type: 'text', value: 'Respected Sir/Madam,' },
    { type: 'newline' },
    { 
      type: 'paragraph', 
      value: 'We, AJMERI INDUSTRIES, Paragaondih, Tahsil Bindranavagarh, Distt. Gariaband, are submitting a Bank Guarantee of ₹{{submittedAmount}} (Total: ₹{{totalAmount}}) for a duration of {{duration}} months for the milling year {{millingYearOld}} to {{millingYearNew}}.' 
    },
    { type: 'newline' },
    { 
      type: 'paragraph', 
      value: 'This bank guarantee is being submitted as per the requirements and regulations for the aforementioned milling year. We request you to kindly acknowledge the receipt of the same and update your records accordingly.' 
    },
    { type: 'newline' },
    { 
      type: 'paragraph', 
      value: 'We assure you of our continued cooperation and compliance with all necessary formalities. Should you require any additional information or documentation, please do not hesitate to contact us.' 
    },
    { type: 'newline' },
    { type: 'text', value: 'Thanking you,' },
    { type: 'newline' },
    { type: 'text', value: 'Yours faithfully,' },
    { type: 'signature' }
  ]
};
