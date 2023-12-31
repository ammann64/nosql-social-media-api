const dayjs = require('dayjs');

const names = [
    'Aaron',
    'Alexander',
    'Austin',
    'Aaran',
    'Aaryn',
    'Abdul',
    'Smith',
    'Jones',
    'Johnathon',
    'Johnson',
    'Jahn',
    'Schmidt',
    'Connor',
    'Conner',
    'Konnor',
    'Conrad',
    'Konrad',
    'Jack',
    'Jackson',
    'Jaclyn',
    'Jacklynn',
    'Zack',
    'Zeke',
    'Zachariah',
    'Zechariah',
    'Zeek',
    'Zac',
    'Timothy',
    'Bryce',
    'Bryson',
    'Frank',
    'Clark',
    'Parker',
    'Ziyaan',
    'Sean',
    'Shawn',
    'Kevin',
    'Francine',
    'Sarah',
    'Zeph',
    'Zennon',
    'Lennon',
    'Kennan',
    'Keith',
    'Zeith',
    'Zhong',
    'Schaan',
    'Xander',
    'Zuriel',
    'Mark',
    'Marcus',
    'Courtney',
    'Gillian',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Farish',
    'Nathaniel',
    'Xavier',
    'Zubair',
    'Hank',
    'Larry',
    'Mitchell',
    'Paul',
    'Ralph',
    'Raphael',
    'Gabriel',
    'Grom',
    'Jarod',
    'Keeth',
    'Harrison',
    'Johnathy',
    'Zishan',
    'Zidane',
];

const thoughtTexts = [
    'I am hungry',
    'I am thirsty',
    'I am bored',
    'Game of Thrones is a cool show',
    'No good movies out recently...',
    'Aliens are real',
    'Space is so cool',
    'Why is it so cold outside',
    'Just got a new car!',
    'I love playing games',
    'Nothing like a good book',
    'I am so tired',
    'Just had a really good burger!',
    'Why is it so hot outside',
    'Just had the best night of sleep ever',
    'Have not had coffee yet don\'t talk to me',
    'I love pizza',
    'Dr Pepper is the best soda',
    'Android phones are a much better choice than apple ones',
    'Just lost my airpods...',
    'Why can\'t Siri understand me?',
    'I am really bad at directions',
    'Just dropped my phone in water...',
    'I lost my wallet!',
    'My dog is so cute',
    'My cat is so cute',
    'My bird is so loud',
    'There are mosquitos everywhere!!!',
    'Swimming is the best',
    'It is Christmas time!!!',
    'It is finally summer, end of school!',
    'Keep forgetting to check my email',
    'Forgot the password to my email...'
];

const reactionBodies = [
    'That\'s good!',
    'That sucks...',
    'Wow!',
    'Uh oh!',
    'Great!',
    'That\'s awful!',
    'Okay?',
    'That\'s great!',
    'Oh no...',
    'Okay.',
    'Okay...',
    'Great...'
];

const emailDomains = [
    'gmail.com',
    'bing.com',
    'hotmail.com',
    'aol.com',
    'yahoo.com',
    'mail.com',
    'outlook.com'
]

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomArrItems = (num, arr) => {
    const results = [];
    for (let n = 0; n < num; n++) {
        results.push(getRandomArrItem(arr));
    }
    return results;
}
const getRandomNumber = () => Math.floor(Math.random() * 100);

const getRandomUsername = () => `${getRandomArrItem(names)}${getRandomNumber()}`;

const getRandomEmail = (username) => `${username}@${getRandomArrItem(emailDomains)}`;


module.exports = {thoughtTexts, reactionBodies, getRandomArrItem, getRandomArrItems, getRandomEmail, getRandomUsername};