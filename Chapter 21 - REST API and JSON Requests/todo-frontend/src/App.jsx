import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { addItemToServer, deleteItemFromServer, getItemsFromServer, markItemCompletedOnServer } from "./services/itemsService";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    getItemsFromServer().then(initialItems => {
      setTodoItems(initialItems);
    });
  }, []);

  const handleNewItem = async (itemName, itemDueDate) => {
    if (!itemName.trim()) return;
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const item = await addItemToServer(itemName, itemDueDate)
    const newTodoItems = [
      ...todoItems,
      { ...item, completed: false },
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id);
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleToggleComplete = async (id) => {
    const itemToUpdate = todoItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    const updatedItem = { 
      ...itemToUpdate, 
      completed: !itemToUpdate.completed 
    };
    
    const success = await markItemCompletedOnServer(id, updatedItem);
    if (success) {
      const newTodoItems = todoItems.map(item =>
        item.id === id ? updatedItem : item
      );
      setTodoItems(newTodoItems);
    }
  };

  
  // const handleToggleComplete = async (id) => {
  //   const itemToUpdate = todoItems.find(item => item.id === id);
  //   if (!itemToUpdate) return;

  //   const updatedItem = { 
  //     ...itemToUpdate, 
  //     completed: true 
  //   };
    
  //   const success = await updateItemInServer(id, updatedItem);
  //   if (success) {
  //     const newTodoItems = todoItems.map(item =>
  //       item.id === id ? updatedItem : item
  //     );
  //     setTodoItems(newTodoItems);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <AppName />
        </div>
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
          onToggleComplete={handleToggleComplete}
        />
      </div>
    </div>
  );
}

export default App;
