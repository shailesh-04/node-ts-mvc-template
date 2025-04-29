import env from "@config/env";
import app from "@config/app";
import color from "@services/color";
app.listen(env.PORT, () => {
    color(["\n════════════════════════════════════", "brightMagenta", "bold"]);
    color(["🚀 Server Status: Running", "brightGreen", "bold"]);
    color(["🌍 Access it at: ", "cyan", "bold"], [`http://localhost:${env.PORT}`, "brightCyan", "underline"]);
    color(["⚡ Press Ctrl+C to stop the server", "yellow", "bold"]);
});