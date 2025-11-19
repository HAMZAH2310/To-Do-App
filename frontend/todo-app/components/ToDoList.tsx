// src/components/TodoList.tsx
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: { id: number; name: string }[];
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {

  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}