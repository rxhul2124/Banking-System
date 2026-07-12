require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")
const https = require("https")

app.listen(4000, () => {
    console.log("Server is connected")
})

connectToDb()

// Self-pinging logic to keep Render backend awake (runs every 14 minutes)
const RENDER_URL = process.env.RENDER_EXTERNAL_URL;
if (RENDER_URL) {
    console.log(`Self-ping registered for Render URL: ${RENDER_URL}`);
    setInterval(() => {
        https.get(RENDER_URL, (res) => {
            console.log(`Self-ping response code: ${res.statusCode}`);
        }).on("error", (err) => {
            console.error("Error running self-ping:", err.message);
        });
    }, 840000); // 840,000 ms = 14 minutes
}
