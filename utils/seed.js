const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { thoughtTexts, reactionBodies, getRandomArrItem, getRandomArrItems, getRandomEmail, getRandomUsername, getRandomDate } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    // console.log('connected');
    //Drop the collections if they already exist
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    //Create usernames for use in collections
    const usernames = [];
    for (let i = 0; i < 15; i++) {
        usernames.push(getRandomUsername());
    }
    //Create emails for use in user collection
    const emails = [];
    for (let i = 0; i < usernames.length; i++) {
        emails.push(getRandomEmail(usernames[i]));
    }

    const reactions = []
    for (let i = 0; i < 50; i++) {
        let reactionBody = getRandomArrItem(reactionBodies);
        let username = getRandomArrItem(usernames);

        reactions.push({
            reactionBody,
            username,
        });
    }

    let thoughts = [];  //Creates an empty array to store the thought documents

    //Add thoughts to the thoughts array using helper functions to create properties
    for (let i = 0; i < 25; i++) {
        let thoughtText = getRandomArrItem(thoughtTexts);
        let username = getRandomArrItem(usernames);
        let reactions = [];

        thoughts.push({
            thoughtText,
            username,
            reactions
        });
    }
    //Adds each reaction to a random thought
    for (let i = 0; i < reactions.length; i++) {
        thought = getRandomArrItem(thoughts);
        thought.reactions.push(reactions[i]);
    }

    await Thought.collection.insertMany(thoughts);

    const users = [];
    for (let i = 0; i < usernames.length; i++) {
        let username = usernames[i];
        let email = emails[i];
        let thoughtObjects = await Thought.find({ username: username }).
        exec();
        thoughts = thoughtObjects.map((thought) => thought._id);

        users.push({
            username,
            email,
            thoughts
        });
    }
    
    await User.collection.insertMany(users);
    for (let i = 0; i < users.length; i++) {
        currentUsername = usernames[i];
        // console.log(currentUsername);
        let user = await User.findOne({ username: currentUsername}).exec();
        // console.log(user.name);
        let friendCount = Math.floor(Math.random() * 5);
        let friendNames = getRandomArrItems(friendCount, usernames);
        friendNames.map((friendName) => {
            while (friendName == user.name) {
                friendName = getRandomArrItem(usernames);
            }
        });
        let friends = [];
        for (x = 0; x < friendCount; x++) {
            let friendName = friendNames[x];
            let friendObject = await User.findOne({ username: friendName}).exec();
            console.log(friendObject);
            console.log(friendObject._id);
            let friend = friendObject._id;
            friends.push(friend);
        }
        user.friends = friends;
        await user.save();
    }
});