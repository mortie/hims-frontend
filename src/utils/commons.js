import moment from "moment";

/**
 *
 * @param {Date} birthdate
 * @returns the age in 1y, 1m, 1w or 1d
 */
export const calculateAge = (birthdate) => {
  //console.log(birthdate);
  let difference = moment.duration(moment().diff(birthdate));

  if (difference.years() >= 1) {
    return `${difference.years()}y`;
  }

  if (difference.months() >= 1) {
    return `${difference.months()}m`;
  }

  if (difference.weeks() >= 1) {
    return `${difference.weeks()}w`;
  }

  return `${difference.days()}d`;
};
