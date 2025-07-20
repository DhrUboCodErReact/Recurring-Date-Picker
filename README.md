# 🗓️ Recurring Date Picker

A **reusable**, **customizable** React component for selecting recurring date patterns — inspired by **TickTick** and **Google Calendar**.

![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)
![TailwindCSS](https://img.shields.io/badge/Style-TailwindCSS-06B6D4)
![Next.js](https://img.shields.io/badge/Framework-Next.js-black)
![Zustand](https://img.shields.io/badge/State-Zustand-yellowgreen)
![License](https://img.shields.io/github/license/DhrUboCodErReact/recurring-date-picker)

---

## 🔗 Live Demo

> **Coming Soon** – Stay tuned for the deployment link!

---

## ✨ Features

- 📅 Select recurring patterns: **Daily**, **Weekly**, **Monthly**
- 📆 Pick **start** and **end** dates
- ✅ Choose specific **weekdays** for recurrence
- 🚫 Exclude specific **skip dates**
- 🔍 Preview selected recurring dates on a calendar
- 💡 Real-time state sync & updates
- ⚙️ Fully typed with **TypeScript**
- 🎨 Styled using **Tailwind CSS**
- 🧠 State managed via **Zustand**

---

## 📦 Tech Stack

| Tech               | Description                        |
|--------------------|------------------------------------|
| **React**          | UI library                         |
| **Next.js**        | App framework                      |
| **TypeScript**     | Type-safe coding                   |
| **Tailwind CSS**   | Utility-first CSS                  |
| **Zustand**        | Lightweight global state management|
| **React Calendar** | Recurring calendar view            |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/DhrUboCodErReact/recurring-date-picker.git
cd recurring-date-picker
```

### 2.  Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```bash
recurring-date-picker/
├── src/
│   ├── app/
│   │   └── page.tsx                     # 🟢 Main Next.js page (entry point)
│   │
│   ├── components/
│   │   ├── RecurringDatePicker.tsx     # ✅ Main wrapper component (core UI & logic)
│   │   └── RecurringDateComponents/    # 🔧 Subcomponents used inside RecurringDatePicker
│   │       ├── RecurringOptions.tsx        # Selector for Daily / Weekly / Monthly
│   │       ├── DateRangePicker.tsx         # Start and end date input
│   │       ├── WeeklyDaysSelector.tsx      # Checkboxes for weekdays (Mon–Sun)
│   │       ├── SkipDatesSelector.tsx       # Input to skip specific dates
│   │       └── CalendarPreview.tsx         # Visual preview of generated recurring dates
│   │
│   ├── store/
│   │   └── useRecurringStore.ts         # Zustand store for shared state
│   │
│   ├── utils/
│   │   └── recurrenceHelpers.ts         # 🧠 Core logic for generating recurrence dates
│   │
│   └── tests/
│       └── recurrenceHelpers.test.ts    # ✅ Unit tests for recurrence logic
│
├── public/                              # Static assets (e.g., favicons, images)
│
├── README.md                            # Project documentation
├── tailwind.config.ts                   # Tailwind CSS configuration
├── tsconfig.json                        # TypeScript configuration
├── jest.config.ts                       # Jest configuration for testing
└── package.json                         # Project dependencies and scripts
```


---

## 🧠 Component Breakdown

### ✅ `RecurringDatePicker.tsx`
- Main orchestrator
- Combines all subcomponents
- Binds everything using Zustand store

---

### 🔁 `RecurringOptions.tsx`
- **Dropdown/radio button** interface
- Lets user pick: `Daily`, `Weekly`, or `Monthly` recurrence pattern

---

### 📅 `DateRangePicker.tsx`
- Two date pickers:
  - `Start Date`
  - `End Date`
- Controlled via Zustand

---

### 📆 `WeeklyDaysSelector.tsx`
- Displays weekdays (`S M T W T F S`) as toggle buttons
- Active in **Weekly** mode only
- Updates selected weekdays in global store

---

### ❌ `SkipDatesSelector.tsx`
- Allows user to pick one or more dates to **exclude**
- Dates are pushed into `skipDates[]`
- A calendar-based UI for intuitive UX

---

### 👀 `CalendarPreview.tsx`
- Renders a real-time preview of recurring dates
- Excludes skipped dates
- Useful for visual feedback before saving the schedule

---

## 🔗 Logic

### 🧠 `generateRecurringDates.ts`
- Pure function
- Inputs:
  - `recurrenceType` (daily/weekly/monthly)
  - `dateRange` (`startDate`, `endDate`)
  - `weekDays` (if weekly)
  - `skipDates`
- Output:
  - Array of all valid recurring dates

---

## ⚙️ State Management (Zustand Store)

### `useRecurringStore.ts`
Stores:
- `recurrenceType`
- `startDate`, `endDate`
- `weekDays[]`
- `skipDates[]`
- `generatedDates[]`

Provides:
- `setRecurrenceType`
- `setDateRange`
- `toggleWeekday`
- `addSkipDate`
- `generateDates()`

---

## 🧪 Testing

Located in `__tests__/RecurringDateComponents/`

- ✅ All components tested using `Jest` and `@testing-library/react`
- 🧪 Tested for:
  - Rendering correctness
  - Zustand store updates
  - UI interactions (e.g., button clicks, date changes)
- ✅ Mocked Zustand store where required

---



