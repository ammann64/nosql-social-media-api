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
            const thought = await Thought.findOne({ _id: req.params.thoughtId});

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
            console.log(thought._id);
            user = User.findOneAndUpdate(
            { username: username}, { $addToSet: { thoughts: thought._id } }
            );
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async updateThought (req, res) {
        try {
            thoughtText = req.body.thoughtText;
            username = req.body.username;
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId, {thoughtText: thoughtText, username: username},
                {new: true}
                );
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async deleteThought (req, res) {
        try {
            thoughtId = req.params.thoughtId
            const thought = await Thought.findByIdAndDelete(thoughtId);

            res.status(200).json({ message: "Successfully deleted a thought!"});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addReaction (req, res) {
        try {
            const thought = Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId }, { $addToSet: { reactions: {reactionBody: req.body.reactionBody, username: req.body.username} } },
                {runValidators: true, new: true}
            );
            
            res.status(200).json({ message: 'Successfully added a reaction'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    async removeReaction (req, res) {
        try {
            const thought = User.findByIdAndUpdate(
                { _id: req.params.thoughtId }, { $pull: { reactions: req.body.reactionId } },
                {runValidators: true, new: true}
            );

            res.status(200).json({ message: 'Successfully removed a reaction'});
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    }
}