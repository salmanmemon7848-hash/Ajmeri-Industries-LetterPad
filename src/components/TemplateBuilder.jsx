import { useState, useEffect } from 'react';

function TemplateBuilder({ onSave, onCancel, editingTemplate }) {
  const [templateName, setTemplateName] = useState('');
  const [fields, setFields] = useState([]);
  const [content, setContent] = useState([]);

  // Load template data when editing
  useEffect(() => {
    if (editingTemplate) {
      setTemplateName(editingTemplate.template_name || '');
      setFields(editingTemplate.fields || []);
      setContent(editingTemplate.content || []);
    } else {
      setTemplateName('');
      setFields([]);
      setContent([]);
    }
  }, [editingTemplate]);

  const addField = () => {
    setFields([
      ...fields,
      { key: `field_${fields.length + 1}`, label: '', type: 'text', required: true }
    ]);
  };

  const updateField = (index, key, value) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const addContentBlock = (type) => {
    setContent([
      ...content,
      { type, value: type === 'text' || type === 'paragraph' || type === 'subject' ? '' : '' }
    ]);
  };

  const updateContentBlock = (index, value) => {
    const updatedContent = [...content];
    updatedContent[index] = { ...updatedContent[index], value };
    setContent(updatedContent);
  };

  const removeContentBlock = (index) => {
    setContent(content.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!templateName.trim()) {
      alert('Please enter a template name');
      return;
    }

    const template = {
      template_name: templateName,
      fields,
      content
    };

    onSave(template);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingTemplate ? 'Edit Template' : 'Create New Template'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Template Name */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Template Name</label>
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="e.g., Bank Letter, Official Letter, etc."
        />
      </div>

      {/* Form Fields */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Form Fields</h3>
          <button
            onClick={addField}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            + Add Field
          </button>
        </div>

        {fields.map((field, index) => (
          <div key={index} className="border rounded-lg p-4 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(index, 'label', e.target.value)}
                placeholder="Field Label"
                className="px-3 py-2 border rounded"
              />
              <select
                value={field.type}
                onChange={(e) => updateField(index, 'type', e.target.value)}
                className="px-3 py-2 border rounded"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="textarea">Textarea</option>
              </select>
              <div className="flex gap-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.required}
                    onChange={(e) => updateField(index, 'required', e.target.checked)}
                    className="mr-2"
                  />
                  Required
                </label>
                <button
                  onClick={() => removeField(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Blocks */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Letter Content</h3>
          <div className="flex gap-2">
            <button
              onClick={() => addContentBlock('text')}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              + Text
            </button>
            <button
              onClick={() => addContentBlock('paragraph')}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              + Paragraph
            </button>
            <button
              onClick={() => addContentBlock('subject')}
              className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
            >
              + Subject
            </button>
          </div>
        </div>

        {content.map((block, index) => (
          <div key={index} className="border rounded-lg p-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-600 uppercase">
                {block.type}
              </span>
              <button
                onClick={() => removeContentBlock(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
            {(block.type === 'text' || block.type === 'paragraph' || block.type === 'subject') && (
              <textarea
                value={block.value}
                onChange={(e) => updateContentBlock(index, e.target.value)}
                className="w-full px-3 py-2 border rounded"
                rows={3}
                placeholder="Use {{field_key}} for dynamic values"
              />
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          Save Template
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TemplateBuilder;
