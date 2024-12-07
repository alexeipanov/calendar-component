import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(localeData);

const DATE_FORMAT = 'DD-MM-YYYY';

class CalendarDay {
  constructor(date, index) {
    this.events = [];
    this.date = date.date(index);
    this.isCurrentMonth = date.month() === this.date.month();
  }

  get month() {
    return this.date.month();
  }

  get hasEvents() {
    return this.events.length > 0;
  }
}

export default class Calendar {
  constructor(date = dayjs(), events = []) {
    this.month = date;
    this.events = events;
  }

  combineMaps(...maps) {
    let combined = [];
    for (const map of maps) {
      combined = [ ...combined, ...Array.from(map)];
    }

    return new Map(combined);
  }

  get daysInMonth() {
    return this.month.daysInMonth();
  }

  get monthMap() {
    let diff = 0;
    let month = new Map();
    let daysBeforeWeekEnd = new Map();
    let daysAfterWeekStart = new Map();

    new Array(this.daysInMonth)
      .fill()
      .map((day, index) => new CalendarDay(this.month, index + 1))
      .forEach((day) => {
        month.set(day.date.format(DATE_FORMAT), day);

      });

    let [, firstDay] = Array.from(month).at(0);
    let [, lastDay] = Array.from(month).at(-1);

    diff = firstDay.date.day() - dayjs().localeData().firstDayOfWeek();
    if (diff < 0) {
      diff = diff + 7;
    }

    new Array(diff)
      .fill()
      .map((day, index) => new CalendarDay(this.month, ++index - diff))
      .forEach((day) => {
        daysAfterWeekStart.set(day.date.format(DATE_FORMAT), day);
      });

    diff = lastDay.date.day() - dayjs().localeData().firstDayOfWeek();
    if (diff < 0) {
      diff = diff + 7;
    }

    new Array(6 - diff)
      .fill()
      .map((day, index) => new CalendarDay(this.month, ++index + lastDay.date.date()))
      .forEach((day) => {
        daysBeforeWeekEnd.set(day.date.format(DATE_FORMAT), day);
      });

    return this.combineMaps(daysAfterWeekStart, month, daysBeforeWeekEnd);
  }

  get firstDay() {
    return Object.values(this.monthMap).at(0);
  }

  get lastDay() {
    return Object.values(this.monthMap).at(-1);
  }

  get eventsMap() {
    let map = this.monthMap;
    this.events.forEach((event) => {
      let key = dayjs(event.startAt).format(DATE_FORMAT);
      map.get(key)?.events.push(event);
    });

    return map;
  }

  nextMonth() {
    this.month = this.month.add(1, 'month');
  }

  previousMonth() {
    this.month = this.month.subtract(1, 'month');
  }

  setYear(year) {
    this.month = this.month.year(year.year());
  }
}
