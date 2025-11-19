import { Card } from './ui/card';
import { CheckCircle2, ListTodo } from 'lucide-react';

interface TodoStatsProps {
  todos: { id: number; name: string }[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

      <Card className="p-6 bg-linear-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-blue-100 text-sm font-medium">Total Aktivitas</span>
          <ListTodo className="h-7 w-7 text-blue-200" />
        </div>
        <div className="text-5xl font-bold">{total}</div>
        <p className="text-blue-100 text-sm mt-2 opacity-90">
          {total === 0 ? 'Belum ada tugas' : total === 1 ? '1 tugas aktif' : `${total} tugas aktif`}
        </p>
      </Card>

      <Card className="p-6 bg-linear-to-br from-purple-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all sm:col-span-2 lg:col-span-1">
        <div className="flex items-center gap-4">
          <CheckCircle2 className="h-12 w-12 text-white/90" />
          <div>
            <h3 className="text-xl font-bold">Semangat!</h3>
            <p className="text-white/90 text-sm mt-1">
              {total === 0 
                ? 'Mulai tambah tugas pertamamu' 
                : 'Kamu sedang produktif!'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}