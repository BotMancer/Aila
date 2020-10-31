const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect('mongodb+srv://Aila:MH05toia@discordbot.aaoij.mongodb.net/discordbot', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose
}