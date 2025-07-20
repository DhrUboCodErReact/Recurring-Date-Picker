"use client";

import { useRecurringStore } from "../../store/useRecurringStore";
import { useState } from "react";

export default function SkipDatesSelector() {
  const { skipDates, setSkipDates } = useRecurringStore();
  const [newSkipDate, setNewSkipDate] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const addSkipDate = () => {
    if (newSkipDate && !skipDates.includes(newSkipDate)) {
      setSkipDates([...skipDates, newSkipDate]);
      setNewSkipDate("");
    }
  };

  const removeSkipDate = (date: string) => {
    setSkipDates(skipDates.filter((d) => d !== date));
  };

  return (
    <div className="mb-6 p-6 rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 via-gray-700 to-slate-100 border border-gray-300">
      <label className="block mb-3 text-xl font-bold text-gray-700">
        {" "}
        Skip Specific Dates
      </label>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="date"
          value={newSkipDate}
          onChange={(e) => setNewSkipDate(e.target.value)}
          min={today}
          className="border border-gray-300 rounded-md px-3 py-2 w-full text-gray-800 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
        />
        <button
          type="button"
          onClick={addSkipDate}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow"
        >
          Add
        </button>
      </div>

      {skipDates.length > 0 && (
        <ul className="space-y-2 text-sm text-gray-800 max-h-40 overflow-y-auto pr-1">
          {skipDates.map((date) => (
            <li
              key={date}
              className="flex justify-between items-center bg-white border border-gray-200 px-4 py-2 rounded-md shadow-sm"
            >
              <span className="font-medium">
                {new Date(date).toDateString()}
              </span>
              <button
                onClick={() => removeSkipDate(date)}
                className="text-red-600 hover:text-red-800 font-semibold"
                aria-label={`Remove skip date ${date}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
