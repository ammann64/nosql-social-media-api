const {User, Thought} = require('../models/');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.userId});

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID'});
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);
            const username = req.body.username;
            if (username) {
                user = User.findOneAndUpdate(
                    { username: username}, { $addToSet: { thoughts: thought._id } }
                    );
            }
            else {
                return res.status(404).json({ message: 'Invalid username!' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateThought (req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, {thoughtText: req.body.thoughtText, username: req.body.username}
                );
            res.status(200).json({ message: "Sucessfully updated user!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought (req, res) {
        try {
            const thought = await Thought.findByIdAndDelete(req.params.thoughtId)

            res.status(200).json({ message: "Successfully deleted a user!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction (req, res) {
        try {
            const thought = Thought.findByIdAndUpdate(
                req.params.thoughtId, { $addToSet: { reactions: {reactionBody: req.body.reactionBody, username: req.body.username} } }
                );
            
            res.status(200).json({ message: 'Successfully added a reaction!'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async removeReaction (req, res) {
        try {
            const thought = User.findByIdAndUpdate(
                req.params.thoughtId, { $pull: { reactions: req.body.reactionId } }
            );

            res.status(200).json({ message: 'Successfully removed a friend!'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}