import TodoItem from "./TodoItem";

const TodoItems = ({ todoItems, onDeleteClick, onToggleComplete }) => {
  // Separate completed and active items
  const activeItems = todoItems.filter(item => !item.completed);
  const completedItems = todoItems.filter(item => item.completed);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Active Items */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Active Tasks ({activeItems.length})</h2>
        <div className="space-y-2">
          {activeItems.map((item) => (
            <TodoItem
              key={item.id}
              id={item.id}
              todoDate={item.dueDate}
              todoName={item.name}
              completed={item.completed}
              onDeleteClick={onDeleteClick}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>

      {/* Completed Items */}
      {completedItems.length > 0 && (
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Completed Tasks ({completedItems.length})</h2>
          <div className="space-y-2 opacity-75">
            {completedItems.map((item) => (
              <TodoItem
                key={item.id}
                id={item.id}
                todoDate={item.dueDate}
                todoName={item.name}
                completed={item.completed}
                onDeleteClick={onDeleteClick}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItems;
