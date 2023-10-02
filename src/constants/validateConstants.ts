const current_time = new Date(Date.now());

export const PASSWORD_MIN_CHAR = 6;

export const REQUEST_VALIDATE = {
  CONTENT: {
    MAIN_POINT_EMPTY: 'Mainpoint is required',
    IS_ACCEPTED_EMPTY: 'Your approval is empty',
    DATE_OF_ABSENCE_BEGIN_EMPTY: 'The beginning Date Of Absence is required',
    DATE_OF_ABSENCE_END_EMPTY: 'The finish Date Of Absence is required',
    REASON_EMPTY: 'Reason cannot left empty',
    IS_ACCEPTED_INVALID: 'Your approval is illegal',
    IS_ACCEPTED_EXISTED: 'This request were either approved or rejected, you cannot take action!',
    PENDING_REQUEST_PROHIBIT: `You are not allowed to pending the request because it's waiting to approve or it
    has already handled`,
  },
  DATE: {
    CURRENT_TIME: current_time,
    INVALID_DATE: 'The date that user entered is invalid',
    INVALID_PAST_REQUESTED_DATE: 'The date that user entered was in the past and no longer available',
    UNSUITABLE_END_DATE: 'The begin absent day is later than the end absent day',
  },
};

export const isDateInvalidOrNot = function (dateString: string) {
  if (!isValidDate(dateString)) {
    return {
      parsedDate: null,
      getTime: null,
    };
  }

  const [date, hourMinutes] = dateString.split(' ');
  const [hour, minute] = hourMinutes.split(':');
  const [year, month, day] = date.split('/');

  const parsedDate = new Date(+year, +month - 1, +day, +hour, +minute);
  const getTime = parsedDate.getTime();

  return {
    parsedDate: parsedDate,
    getTime: getTime,
  };
};

function isValidDate(dateString: string) {
  // First check for the pattern
  if (!/^\d{4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{2}$/.test(dateString)) return false;

  // Parse the date parts to integers
  const parts = dateString.split('/');
  const day = parseInt(parts[2], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[0], 10);

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
}

export const MAIN_POINT_MIN_CHAR = 20;
export const REASON_MIN_CHAR = 50;
export const REASON_MAX_CHAR = 1000;
export const MAX_DAY_LATE = 5 * 60 * 1000 * 60 * 24;
