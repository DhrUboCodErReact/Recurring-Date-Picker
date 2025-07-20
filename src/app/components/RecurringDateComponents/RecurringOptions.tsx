"use client";

import { useRecurringStore } from "../../store/useRecurringStore";

export default function RecurringOptions() {
  const { frequency, setFrequency } = useRecurringStore();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "daily" | "weekly" | "monthly" | "yearly";
    setFrequency(value);
  };

  return (
    <div className="mb-6 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-green-100 via-emerald-100 to-green-200 border border-green-300">
      <label
        htmlFor="recurring-select"
        className="block mb-2 text-xl font-bold text-gray-700 tracking-wide"
      >
        Repeat Frequency
      </label>
      <select
        id="recurring-select"
        aria-label="Recurring Frequency"
        value={frequency}
        onChange={handleChange}
        className="w-full p-3 rounded-lg bg-white text-gray-900 font-semibold shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
}
