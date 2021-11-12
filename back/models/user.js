const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true,
        },
        email: String,
        bio: String,
        birthDate: Date,
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
