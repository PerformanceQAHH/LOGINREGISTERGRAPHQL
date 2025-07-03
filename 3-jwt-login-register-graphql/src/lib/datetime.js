"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Datetime = void 0;
class Datetime {
    getCurrentDateTime(dateSeparateSymbol = '-') {
        const dateTime = new Date();
        let dateDay = this.formatWithTwoDigits(String(dateTime.getDate()));
        let month = this.formatWithTwoDigits(String(dateTime.getMonth() + 1));
        let hour = this.formatWithTwoDigits(String(dateTime.getHours()));
        let minutes = this.formatWithTwoDigits(String(dateTime.getMinutes()));
        let seconds = this.formatWithTwoDigits(String(dateTime.getSeconds()));
        return `${dateTime.getFullYear()}${dateSeparateSymbol}${month}${dateSeparateSymbol}${dateDay} ${hour}:${minutes}:${seconds}`;
    }
    formatWithTwoDigits(value) {
        if (+value < 10) {
            return `0${value}`;
        }
        return String(value);
    }
    addDays(days, date, customDate = '') {
        let date_ = new Date(date);
        if (customDate !== '') {
            date_ = new Date(customDate);
        }
        date_.setDate(date_.getDate() + days);
        return date;
    }
}
exports.Datetime = Datetime;
