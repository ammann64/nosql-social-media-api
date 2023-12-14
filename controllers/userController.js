const {User, Thought} = require('../models/');
const { findByIdAndUpdate } = require('../models/Thought');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
                .populate('thoughts')
                .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(
                req.params.userId, {username: req.body.username, email: req.body.email}
                );
            res.status(200).json({ message: "Sucessfully updated user!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findByIdAndDelete(req.params.userId)
            // console.log(user);
            // thoughts = await Thought.find({ username: user.username });
            // if (thoughts) {
                // console.log(thoughts);
                // console.log(user.username);
            //     query = Thought.deleteMany({ username: user.username });
            // }

            res.status(200).json({ message: "Successfully deleted a user!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            let friendId = req.params.friendId;
            const user = User.findByIdAndUpdate(
                req.params.userId, { $addToSet: { friends: friendId } }
                );
            
            res.status(200).json({ message: 'Successfully added a friend!'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async removeFriend(req, res) {
        try {
            let friendId = req.params.friendId;
            const user = User.findByIdAndUpdate(
                req.params.userId, { $pull: { friends: friendId } }
            );

            res.status(200).json({ message: 'Successfully removed a friend!'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}