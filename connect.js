const { default: mongoose } = require("mongoose");

const Connect = () => {
    try {
        mongoose.connect(`${process.env.MONGO_URL}`)

        mongoose.connection.on('connected', function () {
            console.log('Connected to Database');
        });
        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ');
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

    } catch (error) {
        console.error("Some Unexpected Error Occured\nMore Info - ", error)
    }

}

module.exports = { Connect }