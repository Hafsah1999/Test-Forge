const { Schema, model } = require('../connection');

const mySchema = new Schema({
    name: { type: String, required: true },
    email: String,
    password: String,
    avatar: {type : String, default: 'avatar_placeholder.png'},
    role: { type: String, default: 'user' },
    created: { type: Date, default: Date.now }
});

module.exports = model('user', mySchema);   