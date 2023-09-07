const mongoose = require("mongoose");
const env = process.env;

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}.mongodb.net/${env.DB_NAME}?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("MongoDB: Connection successfull");
    } catch (err) {
        throw new Error("MongoDB: Connection not successfull", err);
    }
};

module.exports = connect;
