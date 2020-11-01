const mongoose = require('mongoose');

module.exports = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@discordbot.aaoij.mongodb.net/discordbot`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    return mongoose
}