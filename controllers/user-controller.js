//user-controllers
const { User } = require('../models');

const userController = {
    //get all Users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: "thoughts",
            select: "-_v",
        })
        .select('-_v')
        .sort({_id: -1})
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },


    //get One Byid
    getUserById({params }, res) {
        User.findOne({_id: params.id })
        .populate({
            path: "thoughts",
            select: "-_v",
        })
        .select('-_v')
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: '⛔No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    },

    //create a user
    createUser ({ body }, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    //delete a user
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: '⛔No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    },

    //update a user
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id:params.id}, body, {new:true})
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: '⛔No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    },

    //add a friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $addToSet: {friends:params.friendsId}},
            { new: true}
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    //deleted a friend
    deleteFriend({ params}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: {friends:params.friendsId}},
            { new: true}
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({message: '⛔No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });

    },

};

module.exports = userController;