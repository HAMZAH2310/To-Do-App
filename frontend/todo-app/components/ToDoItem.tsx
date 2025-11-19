import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trash2, Edit, Loader2 } from 'lucide-react';
import { EditTodoDialog } from './EditDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { toast } from 'sonner';

interface TodoItemProps {
  todo: { id: number; name: string };
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
      toast.success('Aktivitas berhasil dihapus');
      setIsDeleteOpen(false);
    } catch {
      toast.error('Gagal menghapus');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card className="p-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between gap-4">
          {/* Nama Todo */}
          <h3 className="text-lg font-medium text-gray-900 flex-1 truncate">
            {todo.name}
          </h3>

          {/* Tombol Aksi */}
          <div className="flex gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsEditOpen(true)}
              className="h-9 w-9 hover:bg-blue-50 hover:text-blue-600"
            >
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteOpen(true)}
              className="h-9 w-9 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <EditTodoDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        todo={todo}
        onUpdate={onUpdate}
      />
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Aktivitas?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus "<span className="font-medium">{todo.name}</span>"? 
              Tindakan ini tidak dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}