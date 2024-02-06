/* eslint-disable @typescript-eslint/no-unused-vars */
const ValidationColors = {
  Ok: 'green',
  Warning: 'yellow',
  Error: 'red',
  Empty: 'gray',
};

const ValidValues = {
  GpsOk: 'G',
  SatellitesError: 3,
  SatelliteWarning: 4,
};

export type ValidationProps = {
  value: string;
};

// TODO: Delete date and tinme validations
export function TimeValidation({ value }: ValidationProps) {
  // if (value === '') return ValidationColors.Empty;
  // const [hours, minutes] = value.split(':').map(Number);
  // const now = new Date();
  // if (now.getHours() === hours && now.getMinutes() === minutes)
  //   return ValidationColors.Ok;
  // return ValidationColors.Error;
  return ValidationColors.Ok;
}

export function DateValidation({ value }: ValidationProps) {
  // if (value === '') return ValidationColors.Empty;
  // const dateParts = value.split('/');
  // const year = parseInt(dateParts[2], 10);
  // const month = parseInt(dateParts[1], 10) - 1;
  // const day = parseInt(dateParts[0], 10);

  // const currentDate = new Date();

  // return year === currentDate.getFullYear() &&
  //   month === currentDate.getMonth() &&
  //   day === currentDate.getDate()
  //   ? ValidationColors.Ok
  //   : ValidationColors.Error;
  return ValidationColors.Ok;
}

export function GpsValidation({ value }: ValidationProps) {
  if (value === '') return ValidationColors.Empty;
  return value === ValidValues.GpsOk
    ? ValidationColors.Ok
    : ValidationColors.Error;
}

export function LatLngValidation({ value }: ValidationProps) {
  if (value === '') return ValidationColors.Empty;
  return ValidationColors.Ok;
}

export function SatelliteValidation({ value }: ValidationProps) {
  if (value === '') return ValidationColors.Empty;
  if (parseInt(value, 10) <= ValidValues.SatellitesError)
    return ValidationColors.Error;
  if (parseInt(value, 10) === ValidValues.SatelliteWarning)
    return ValidationColors.Warning;
  return ValidationColors.Ok;
}
