import Vue from 'vue';
import _isEmpty from 'lodash/isEmpty';

const roomsArray = [
    'Студия',
    'Однокомнатная квартира',
    'Двухкомнатная квартира',
    'Трехкомнатная квартира',
    'Четырехкомнатная квартира'
];

Vue.filter('splitThousands', function (number, separator = ' ') {
    if (!number) return '';
    let tmp = number.toString().split('.');
    let value = tmp[0].replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    if (Number(tmp[1])) {
        value += `.${tmp[1]}`;
    }
    return value;
});

Vue.filter('roomsNumberToString', function (num, isLowerCase = false) {
    return isLowerCase ? roomsArray[num].toLowerCase() : roomsArray[num];
});

Vue.filter('roundToMillions', function (price, acc = 1) {
    if (price) {
        return +(Number(price) / 1000000).toFixed(acc);
    } else {
        return 0;
    }
});

Vue.filter('plural', function (number, postfixes) {
    if (!number) return '';
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return postfixes[2];
    }
    n %= 10;
    if (n === 1) {
        return postfixes[0];
    }
    if (n >= 2 && n <= 4) {
        return postfixes[1];
    }
    return postfixes[2];
});

Vue.filter('prettyPhone', function (phone) {
    return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
});

Vue.filter('bytesToSize', function (bytes) {
    if (!bytes && bytes === 0) return '';
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
});

Vue.filter('monthByNumber', function (num, isCase = false) {
    const months = {
        0: 'Январь',
        1: 'Февраль',
        2: 'Март',
        3: 'Апрель',
        4: 'Май',
        5: 'Июнь',
        6: 'Июль',
        7: 'Август',
        8: 'Сентябрь',
        9: 'Октябрь',
        10: 'Ноябрь',
        11: 'Декабрь'
    };

    const casedMonths = {
        0: 'Января',
        1: 'Февраля',
        2: 'Марта',
        3: 'Апреля',
        4: 'Мая',
        5: 'Июня',
        6: 'Июля',
        7: 'Августа',
        8: 'Сентября',
        9: 'Октября',
        10: 'Ноября',
        11: 'Декабря'
    };

    if (isCase) {
        return casedMonths[num];
    } else {
        return months[num];
    }
});

Vue.filter('getHours', function (dateString) {
    if (!dateString) return '';

    const dateParse = dateString.split(':');
    const date = new Date();
    date.setHours(Number(dateParse[0]), Number(dateParse[1]));
    return `${date.getHours()}`;
});

Vue.filter('timeFormatter', function (time) {
    if (!time) return '';

    let arr = time.split(':');

    return `${arr[0]}:${arr[1]}`;
});
