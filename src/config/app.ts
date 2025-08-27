import { config } from "dotenv";
import Server from "#config/server.js";
import { testConnection } from "#config/mysql.js";

class App {
    constructor() {
        config();
        this.run();
    }
    private async run() {
        try {
            await testConnection();
            const app = new Server();
            app.startServer(process.env.PORT || 3000);
        } catch (error) {
            console.log(error);
        }
    }
}

export default App;