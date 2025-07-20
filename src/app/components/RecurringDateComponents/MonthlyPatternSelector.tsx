// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'

// import { useRecurringStore } from '../store/useRecurringStore'

// const ordinals: readonly string[] = ['first', 'second', 'third', 'fourth', 'last']
// const days: readonly string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// export default function MonthlyPatternSelector() {
//   const {
//     frequency,
//     ordinal,
//     ordinalDay,
//     setOrdinal,
//     setOrdinalDay,
//   } = useRecurringStore()

//   if (frequency !== 'monthly') return null

//   return (
//     <div className="flex flex-col gap-2 text-sm">
//       <label className="font-semibold">Repeat pattern:</label>
//       <div className="flex gap-2">
//         <select
//           value={ordinal ?? ''}
//           onChange={(e) => setOrdinal(e.target.value as any)}
//           className="border rounded px-2 py-1 bg-white dark:bg-gray-800"
//         >
//           <option value="">Select Ordinal</option>
//           {ordinals.map((ord) => (
//             <option key={ord} value={ord}>{ord.charAt(0).toUpperCase() + ord.slice(1)}</option>
//           ))}
//         </select>
//         <select
//           value={ordinalDay ?? ''}
//           onChange={(e) => setOrdinalDay(e.target.value)}
//           className="border rounded px-2 py-1 bg-white dark:bg-gray-800"
//         >
//           <option value="">Select Day</option>
//           {days.map((day) => (
//             <option key={day} value={day}>{day}</option>
//           ))}
//         </select>
//       </div>
//       {(ordinal && ordinalDay) && (
//         <p className="text-xs text-gray-600">
//           Pattern: <strong>{ordinal} {ordinalDay} of every month</strong>
//         </p>
//       )}
//     </div>
//   )
// }
