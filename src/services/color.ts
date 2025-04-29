function color(...messages: Array<any>): void {
    const styles: Record<string, string> = {
        reset: "\u001b[0m",
        bold: "\u001b[1m",
        dim: "\u001b[2m",
        italic: "\u001b[3m",
        underline: "\u001b[4m",
        blink: "\u001b[5m",
        inverse: "\u001b[7m",
        hidden: "\u001b[8m",
        strikethrough: "\u001b[9m",
        black: "\u001b[30m",
        red: "\u001b[31m",
        green: "\u001b[32m",
        yellow: "\u001b[33m",
        blue: "\u001b[34m",
        magenta: "\u001b[35m",
        cyan: "\u001b[36m",
        white: "\u001b[37m",
        brightBlack: "\u001b[90m",
        brightRed: "\u001b[91m",
        brightGreen: "\u001b[92m",
        brightYellow: "\u001b[93m",
        brightBlue: "\u001b[94m",
        brightMagenta: "\u001b[95m",
        brightCyan: "\u001b[96m",
        brightWhite: "\u001b[97m",
        bgBlack: "\u001b[40m",
        bgRed: "\u001b[41m",
        bgGreen: "\u001b[42m",
        bgYellow: "\u001b[43m",
        bgBlue: "\u001b[44m",
        bgMagenta: "\u001b[45m",
        bgCyan: "\u001b[46m",
        bgWhite: "\u001b[47m",
        bgBrightBlack: "\u001b[100m",
        bgBrightRed: "\u001b[101m",
        bgBrightGreen: "\u001b[102m",
        bgBrightYellow: "\u001b[103m",
        bgBrightBlue: "\u001b[104m",
        bgBrightMagenta: "\u001b[105m",
        bgBrightCyan: "\u001b[106m",
        bgBrightWhite: "\u001b[107m",
    };

    const formattedMessages = messages.map((message) => {
        if (!Array.isArray(message) || message.length < 1) {
            return message; // Handle invalid input
        }

        const [text, color, stylesArray] = message;
        let output = "";

        if (color && styles[color]) {
            output += styles[color];
        }

        if (Array.isArray(stylesArray)) {
            stylesArray.forEach((style) => {
                if (styles[style]) {
                    output += styles[style];
                }
            });
        } else if (styles[stylesArray]) {
            output += styles[stylesArray];
        }

        output += text + styles.reset;
        return output;
    });
    console.log(formattedMessages.join(" "));
}
export const catchErr = (err: any, path: string): void => {
    color(
        ["══════════ERROR══════════", "red", ["underline", "bold"]],
        ["\n\n" + err, "yellow", ""],
        ['\n path: '+path+"  ",'blue',["inverse"]]
    );
}
export default color;