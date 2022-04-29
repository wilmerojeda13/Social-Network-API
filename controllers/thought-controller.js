const {User, Thought} = require('../models');

const thoughtController = {
    //get all thought
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-_v')
        .then((dbThoughtData) => res.json(dbThoughtData))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    // get one id
    getThoughtById({ params}, res) {
        Thought.findOne({_id: params.id})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: '⛔Not thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //create thought user
    createThought({ body}, res) {
        console.log(body);
        Thought.create(body)
        .then((thoughtData) => {
            return User.findOneAndUpdate(
                { _id: body.userId},
                { $push: {thoughts: thoughtData._id}},
                { new: true}
            );
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: '⛔Not thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //update thought by id
    updateThought({ params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: '⛔Not thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Delete a Thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({ _id: params.id})
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: '⛔Not thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    
    //add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true }
        )
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: '⛔Not thought with this ID'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete a reaction 
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId} } },
            { new: true }
        )
    }

};

module.exports = thoughtController;
