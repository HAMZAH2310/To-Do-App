import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface EditTodoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  todo: { id: number; name: string } | null;
  onUpdate: (id: number, name: string) => Promise<void>;
}

export function EditTodoDialog({
  open,
  onOpenChange,
  todo,
  onUpdate,
}: EditTodoDialogProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && todo) {
      setName(todo.name);
    }
  }, [todo, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo) return;
    if (!name.trim()) {
      toast.error('Nama tidak boleh kosong');
      return;
    }

    setLoading(true);
    try {
      await onUpdate(todo.id, name.trim());
      toast.success('Berhasil diperbarui');
      onOpenChange(false);
    } catch {
      toast.error('Gagal mengupdate');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setName('');
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Aktivitas</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Nama aktivitas..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            autoFocus
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}