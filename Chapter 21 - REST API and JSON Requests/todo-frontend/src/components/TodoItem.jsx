function TodoItem({id, todoName, todoDate, completed, onDeleteClick, onToggleComplete }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 mb-3 group ${completed ? 'border-l-4 border-green-500 bg-green-50' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onToggleComplete(id)}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
              ${completed 
                ? 'border-green-500 bg-green-500 text-white' 
                : 'border-gray-300 hover:border-blue-500'}`}
          >
            {completed && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div>
            <h3 className={`font-medium ${completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {todoName}
            </h3>
            <p className="text-sm text-gray-500">
              {todoDate ? new Date(todoDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }) : 'No due date'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            completed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {completed ? 'Completed' : 'Active'}
          </span>
          <button
            type="button"
            onClick={() => onDeleteClick(id)}
            className="opacity-0 group-hover:opacity-100 px-3 py-1 text-sm text-red-600 hover:text-white hover:bg-red-500 rounded-md border border-red-300 hover:border-red-500 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
