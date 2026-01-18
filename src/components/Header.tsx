import { getMonthName } from '../utils/dateUtils';

interface HeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onAddChore: () => void;
}

export function Header({ currentDate, onPrevMonth, onNextMonth, onToday, onAddChore }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Office Chore Manager</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={onAddChore}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Chore
          </button>
          <button
            onClick={onToday}
            className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Today
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-900 min-w-[180px] text-center">
              {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
            </span>
            <button
              onClick={onNextMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
