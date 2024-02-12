const { model, Schema } = require('mongoose');

const guildSchema = new Schema({
    guildID: String,
	guildName: String,
});

module.exports = model("guildSchema", guildSchema);