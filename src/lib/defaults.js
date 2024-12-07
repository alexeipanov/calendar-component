import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';

dayjs.extend(utc);
dayjs.extend(localeData);

class Week {
  _date;

  constructor(date = dayjs()) {
    this._date = date;
  }

  get firstDay() {
    return this.date.localeData().firstDayOfWeek();
  }

  get days() {
    return new Array(7)
      .fill()
      .map((day, index) => ({ date: this.date.day(index + this.firstDay).startOf('day') }));
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }
}

class Years {
  constructor(start, length) {
    this.years = new Array(length)
      .fill()
      .map((year, index) => start.add(index, 'year').startOf('year'));
  }
}

export { Week, Years };
