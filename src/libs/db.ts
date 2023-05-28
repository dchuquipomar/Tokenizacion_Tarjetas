var redis = require("redis");
import config from "../config.json"


export const dbConnection = async() => {
    try {
        const redisOptions = {
            socket: {
                host: config["DB_URL"],
                port: config["DB_PORT"]
            },
            password: config["DB_PASSWORD"]
        }

        var client = redis.createClient(redisOptions);
        await client.connect();
        return client;
    } catch (error) {
        throw new Error('Error bd')
    }
}

