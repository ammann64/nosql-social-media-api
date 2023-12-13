const dayjs = require('dayjs');

function formatDate(date) {
    dateFormatted = dayjs(date).format('DD-MM-YYYY');
    return dateFormatted;
}

module.exports = formatDate