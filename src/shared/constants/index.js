const initialWeekDays = [
  'Nedjelja',
  'Ponedjeljak',
  'Utorak',
  'Srijeda',
  'Četvrtak',
  'Petak',
  'Subota',
];

const daysByMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const workHoursTemplate = {
  evenDays: {
    start: '08:00',
    pause: '11:00',
    end: '14:00',
  },
  oddDays: {
    start: '14:00',
    pause: '16:00',
    end: '19:00',
  },
};

const WORK_DAY_START = 8;
const WORK_DAY_END = 19;
const APPOINTMENT_DURATION = 0.5;

export {
  initialWeekDays,
  workHoursTemplate,
  WORK_DAY_START,
  WORK_DAY_END,
  APPOINTMENT_DURATION,
  daysByMonth,
};
