const mongoose = require("mongoose");

const Connection = async (username, password, app) => {
    const URL = `mongodb+srv://${username}:${password}@backenddb.o18xq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`;

    try {
        await mongoose.connect(URL);
        console.log("Connected to database!");

        if (app) {
            app.listen(3000, () => {
                console.log("Server is running on port 3000");
            });
        } else {
            console.error("Express app is undefined.");
        }
    } catch (error) {
        console.log("Connection failed!", error);
    }
}

module.exports = Connection;
