import { useState, useEffect } from 'react';
import type { Chore, TeamMember, RecurrenceType } from '../types';
import { formatDate } from '../utils/dateUtils';

const PRESET_CHORES = [
  { title: 'Cooking', icon: '🍳' },
  { title: 'Cleaning', icon: '🧹' },
  { title: 'Writing Newsletter', icon: '📝' },
  { title: 'Grocery Shopping', icon: '🛒' },
  { title: 'Laundry', icon: '🧺' },
];

interface ChoreModalProps {
  isOpen: boolean;
  chore: Chore | null;
  selectedDate: Date | null;
  teamMembers: TeamMember[];
  onClose: () => void;
  onSave: (chore: Omit<Chore, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Chore>) => void;
  onDelete: (id: string) => void;
}

export function ChoreModal({
  isOpen,
  chore,
  selectedDate,
  teamMembers,
  onClose,
  onSave,
  onUpdate,
  onDelete,
}: ChoreModalProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [recurrence, setRecurrence] = useState<RecurrenceType>('none');

  useEffect(() => {
    if (chore) {
      setTitle(chore.title);
      setDate(chore.date);
      setAssigneeId(chore.assigneeId);
      setRecurrence(chore.recurrence);
    } else if (selectedDate) {
      setTitle('');
      setDate(formatDate(selectedDate));
      setAssigneeId(teamMembers[0]?.id || '');
      setRecurrence('none');
    }
  }, [chore, selectedDate, teamMembers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !assigneeId) return;

    if (chore) {
      onUpdate(chore.id, { title, date, assigneeId, recurrence });
    } else {
      onSave({
        title: title.trim(),
        date,
        assigneeId,
        recurrence,
        completed: false,
      });
    }
    onClose();
  };

  const handleDelete = () => {
    if (chore) {
      onDelete(chore.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50" onClick={onClose} />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {chore ? 'Edit Chore' : 'Add New Chore'}
          </h2>

          {!chore && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quick Add
              </label>
              <div className="flex flex-wrap gap-2">
                {PRESET_CHORES.map((preset) => (
                  <button
                    key={preset.title}
                    type="button"
                    onClick={() => setTitle(preset.title)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                      title === preset.title
                        ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {preset.icon} {preset.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter chore title"
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Assignee
              </label>
              <select
                id="assignee"
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {teamMembers.length === 0 ? (
                  <option value="">No team members</option>
                ) : (
                  teamMembers.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label htmlFor="recurrence" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Recurrence
              </label>
              <select
                id="recurrence"
                value={recurrence}
                onChange={(e) => setRecurrence(e.target.value as RecurrenceType)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="none">No repeat</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <div>
                {chore && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || !assigneeId}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {chore ? 'Save' : 'Add Chore'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
