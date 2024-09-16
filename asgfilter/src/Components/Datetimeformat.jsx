import { format, parseISO } from "date-fns";
import { enGB } from "date-fns/locale";

// convert the time from ISO format to a more readable format
function Datetimeformat({ dateTime, dateTimeFormat }) {
  // sometimes, there is no dateTime, so it will throw an error. in that case, return an empty string
  if (!dateTime) {
    return "";
  } else {
    let localtime = format(parseISO(dateTime), dateTimeFormat, {
      locale: enGB,
    });
    return localtime;
  }
}

export default Datetimeformat;
