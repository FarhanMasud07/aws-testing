const mongoose = require('mongoose');

class Server {
    port
    app;

    constructor(port, app) {
        this.port = port;
        this.app = app;
    }

    core() {
        mongoose.connect(`mongodb+srv://Farhan26:Sherlock1234@farhan01.yzaff.mongodb.net/graphql_node?retryWrites=true&w=majority`,
            {useNewUrlParser: true, useUnifiedTopology: true}
        )
            .then(() => {
                this.app.listen(3000, (error) => {
                    if (error) console.log(error);
                    else console.log(`http://localhost:3000`);
                });
            })
            .catch(error => {
                console.log(error);
            });

    }
}

module.exports = Server;
