"use client";

import { useRecurringStore } from "../../store/useRecurringStore";
import { generateRecurringDates } from "../../utils/recurrenceHelpers";
import Calendar from "react-calendar";
import "../../customCalendar.css";

const ordinalMap: Record<string, string> = {
  first: "1st",
  second: "2nd",
  third: "3rd",
  fourth: "4th",
  last: "Last",
};

export default function CalendarPreview() {
  const {
    frequency,
    interval,
    startDate,
    endDate,
    daysOfWeek,
    skipDates,
    ordinal,
    ordinalDay,
  } = useRecurringStore();

  const recurringDates = generateRecurringDates({
    startDate,
    endDate,
    frequency,
    interval,
    daysOfWeek,
    skipDates,
    ordinal,
    ordinalDay,
  });

  const formatFrequency = () => {
    switch (frequency) {
      case "daily":
        return `Every ${interval} day(s)`;
      case "weekly":
        return `Every ${interval} week(s) on ${
          daysOfWeek.length ? daysOfWeek.join(", ") : "N/A"
        }`;
      case "monthly":
        return ordinal && ordinalDay
          ? `Every ${interval} month(s) on the ${ordinalMap[ordinal]} ${ordinalDay}`
          : `Every ${interval} month(s)`;
      case "yearly":
        return `Every ${interval} year(s)`;
      default:
        return "";
    }
  };

  const isSameDay = (date1: Date, date2: Date) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-6">
      {/* Calendar Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200 max-w-sm w-full">
        <h3 className="text-xl font-bold text-blue-700 mb-4">Calendar</h3>
        <Calendar
          tileClassName={({ date }) =>
            recurringDates.some((d) => isSameDay(d, date)) ? "highlight" : ""
          }
          className="w-full"
        />
      </div>

      {/* Details Section */}
      <div className="flex-1 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-200">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          Calendar Preview
        </h2>

        <div className="space-y-2 text-sm text-blue-900">
          <p>
            <span className="font-semibold text-blue-950">Frequency:</span>{" "}
            <span className="text-blue-700 font-medium">
              {formatFrequency()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-blue-950">Start Date:</span>{" "}
            <span className="text-green-700 font-medium">
              {startDate.toDateString()}
            </span>
          </p>
          <p>
            <span className="font-semibold text-blue-950">End Date:</span>{" "}
            <span className="text-red-600 font-medium">
              {endDate ? endDate.toDateString() : "Not set"}
            </span>
          </p>

          {frequency === "weekly" && (
            <p>
              <span className="font-semibold text-blue-950">
                Selected Days:
              </span>{" "}
              <span className="text-indigo-700 font-medium">
                {daysOfWeek.length > 0 ? daysOfWeek.join(", ") : "None"}
              </span>
            </p>
          )}

          {skipDates && skipDates.length > 0 && (
            <p>
              <span className="font-semibold text-blue-950">
                Skipped Dates:
              </span>{" "}
              <span className="text-orange-600 font-medium">
                {skipDates.map((d) => new Date(d).toDateString()).join(", ")}
              </span>
            </p>
          )}
        </div>

        <hr className="my-5 border-blue-300" />

        <h3 className="font-semibold text-blue-900 mb-2">Generated Dates</h3>

        {recurringDates.length > 0 ? (
          <ul className="list-disc list-inside text-sm max-h-52 overflow-y-auto space-y-1 text-blue-900">
            {recurringDates.map((date, idx) => {
              const full = date.toLocaleDateString("en-GB");
              const [day, month, year] = full.split("/");
              return (
                <li key={idx} className="text-blue-700 font-medium">
                  {`${day}-${month}-${year}`}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-sm text-blue-500 italic">
            No dates generated with current settings.
          </p>
        )}
      </div>
    </div>
  );
}
