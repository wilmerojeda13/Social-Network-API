const { Schema, model,} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                '✅Use a valid E-mail adress',
            ],

        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id:false,
    }
);

// Creating the friendCount function that retrieves the length of the user's
userSchema.virtual('friendCount').get(function() {
    return this.friends.lenght;
});

// Creating User module
const User = model('User', userSchema);

module.exports = User;

