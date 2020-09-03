const weekDays = [
  'Ponedjeljak',
  'Utorak',
  'Srijeda',
  'Četvrtak',
  'Petak',
  'Subota',
  'Nedjelja',
];

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

export { weekDays, workHoursTemplate };
