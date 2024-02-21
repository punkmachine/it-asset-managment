export enum TimeFormatDict {
  StandardTime = 'standardTime',
  FullTime = 'fullTime',
  FullDateLongMonth = 'fullDateLongMonth',
  FullDateNumeric = 'fullDateNumeric',
}

export const TimeFormats = {
  [TimeFormatDict.StandardTime]: {
    minute: 'numeric',
    hour: 'numeric',
  },
  [TimeFormatDict.FullTime]: {
    minute: 'numeric',
    hour: 'numeric',
    second: 'numeric',
  },
  [TimeFormatDict.FullDateLongMonth]: {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  [TimeFormatDict.FullDateNumeric]: {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  },
} as const;

function getFormatDate(date: string, format: TimeFormatDict) {
  const result = new Date(date);

  return new Intl.DateTimeFormat('ru-RU', TimeFormats[format]).format(result);
}

export { getFormatDate };
