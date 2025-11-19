import { useState, useEffect } from 'react';
import { TodoList } from '../components/TodoList';
import { TodoStats } from '../components/TodoStats';
import { AddTodoDialog } from '../components/AddTodoDialog';
import { Button } from '../components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { Toaster } from '../components/ui/sonner';
import { toast } from 'sonner';
import { todoService } from './services/todoService';

export interface Todo {
  id: number;
  name: string;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getAll();
        setTodos(data);
      } catch {
        toast.error('Gagal memuat aktivitas. Pastikan backend Go berjalan!');
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (name: string) => {
    try {
      const newTodo = await todoService.create(name);
      setTodos(prev => [newTodo, ...prev]);
      toast.success('Aktivitas berhasil ditambahkan!');
      setIsAddOpen(false);
    } catch {
      toast.error('Gagal menambah aktivitas');
    }
  };

  const updateTodo = async (id: number, name: string) => {
    try {
      const updated = await todoService.update(id, name);
      setTodos(prev => prev.map(t => t.id === id ? updated : t));
      toast.success('Aktivitas berhasil diperbarui!');
    } catch {
      toast.error('Gagal memperbarui aktivitas');
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await todoService.delete(id);
      setTodos(prev => prev.filter(t => t.id !== id));
      toast.success('Aktivitas berhasil dihapus!');
    } catch {
      toast.error('Gagal menghapus aktivitas');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-xl text-gray-700">Memuat aktivitas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Todo App
          </h1>
          <p className="text-gray-600 mt-3 text-lg">
            Kelola tugasmu dengan simpel dan elegan
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          className="w-full mb-8 h-14 rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all font-semibold text-lg"
          size="lg"
        >
          <Plus className="mr-3 h-6 w-6" />
          Tambah Aktivitas Baru
        </Button>

        <TodoStats todos={todos} />

        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />

        {todos.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-3">
              Belum ada aktivitas
            </h3>
            <p className="text-gray-500">
              Tekan tombol di atas untuk menambah tugas pertamamu
            </p>
          </div>
        )}

        <AddTodoDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          onAdd={addTodo}
        />

        <Toaster />
      </div>
    </div>
  );
}