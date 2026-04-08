function TemplateManager({ templates, activeTemplate, onSelect, onCreateNew, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-wrap gap-3 items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Select Template</h3>
        <button
          onClick={onCreateNew}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition font-semibold text-sm"
        >
          + Create New Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {templates.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">
            <p>No templates yet. Create your first template!</p>
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 rounded-lg border-2 transition text-left ${
                activeTemplate?.id === template.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <button
                  onClick={() => onSelect(template)}
                  className="flex-1 text-left"
                >
                  <div className="font-semibold text-gray-800">{template.template_name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {template.fields?.length || 0} fields
                  </div>
                </button>
                
                <div className="flex gap-2 ml-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(template);
                    }}
                    className="text-blue-600 hover:text-blue-800 p-1"
                    title="Edit Template"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(template.id);
                    }}
                    className="text-red-600 hover:text-red-800 p-1"
                    title="Delete Template"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TemplateManager;
