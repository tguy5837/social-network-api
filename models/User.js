const { Schema, model } = require("mongoose");
const Thought = require('./Thought');

const emailValidate = (email) => {
    const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regex.test(email);
};

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "You need to provide a username!",
            trim: true,
        },
        email: {
            type: String,
            required: "You need to provide a username!",
            unique: true,
            validate: [emailValidate, "Please provide a valid email address."],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: Thought
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// get total friend count for this user
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;