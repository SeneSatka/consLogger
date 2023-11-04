import { createWriteStream, mkdir, mkdirSync, readdirSync } from "fs";
import { readdir } from "fs/promises";

export type Color = string | { r: number; g: number; b: number };
type logText = {
  headerText?: "[Log]" | string;
  headerTextColor?: Color;
  textColor?: Color;
};
type errorText = {
  headerText?: "[Error]" | string;
  headerTextColor?: Color;
  textColor?: Color;
};
type warnText = {
  headerText?: "[Warn]" | string;
  headerTextColor?: Color;
  textColor?: Color;
};

export interface consLoggerType {
  time?: boolean;
  date?: boolean;
  logText?: logText;
  dailyLog?: boolean;
  errorText?: errorText;
  warnText?: warnText;
  path?: string;
}
interface loggerConsole {
  log: (text: string) => any;
  error: (text: string) => any;
  warn: (text: string) => any;
  createCustom: (name: string, text: string, textColor?: Color) => any;
  [key: string]: (...porps: any) => any;
}
const darkedColor = 0;
class consLogger {
  private isOpenTime: boolean = false;
  private isOpenDate: boolean = false;
  private isDailyLog: boolean = false;
  private path: string = "logs";
  logText: logText = {
    headerText: "[Log]:",
    headerTextColor: colorDarker(hexToRgb("#54fc21"), darkedColor),
    textColor: hexToRgb("#54fc21"),
  };
  errorText: errorText = {
    headerText: "[Error]:",
    headerTextColor: colorDarker(hexToRgb("#fa2a2a"), darkedColor),
    textColor: hexToRgb("#fa2a2a"),
  };
  warnText: warnText = {
    headerText: "[Warn]:",
    headerTextColor: colorDarker(hexToRgb("#faf62a"), darkedColor),
    textColor: hexToRgb("#faf62a"),
  };

  constructor(options?: consLoggerType) {
    this.isOpenTime = options?.time ?? false;
    this.isOpenDate = options?.date ?? false;
    this.isDailyLog = options?.dailyLog ?? false;

    if (options) {
      if (options.logText) {
        if (options.logText.headerText)
          this.logText.headerText = options.logText.headerText;
        if (options.logText.headerTextColor)
          this.logText.headerTextColor = options.logText.headerTextColor;
        if (options.logText.textColor)
          this.logText.textColor = options.logText.textColor;
      }
      if (options.errorText) {
        if (options.errorText.headerText)
          this.errorText.headerText = options.errorText.headerText;
        if (options.errorText.headerTextColor)
          this.errorText.headerTextColor = options.errorText.headerTextColor;
        if (options.errorText.textColor)
          this.errorText.textColor = options.errorText.textColor;
      }
      if (options.warnText) {
        if (options.warnText.headerText)
          this.warnText.headerText = options.warnText.headerText;
        if (options.warnText.headerTextColor)
          this.warnText.headerTextColor = options.warnText.headerTextColor;
        if (options.warnText.textColor)
          this.warnText.textColor = options.warnText.textColor;
      }
    }
    if (options?.path) {
      this.path = options?.path.startsWith("./")
        ? options?.path.slice(2)
        : options?.path.startsWith("/")
        ? options?.path.slice(1)
        : options?.path.endsWith("/")
        ? options?.path.slice(-1)
        : options?.path;
    } else this.path = "\\\\path//";

    const consoleLog = console.log;
    console.log = (data: any) => {
      if (this.path !== "\\\\path//") {
        if (!readdirSync(process.cwd()).includes(this.path))
          mkdirSync(process.cwd() + "/" + this.path);
        const logFile = createWriteStream(
          process.cwd() +
            "/" +
            this.path +
            `/${
              this.isDailyLog
                ? new Date(Date.now()).toLocaleDateString()
                : "consLogger"
            }.log`,
          {
            flags: "a",
          }
        );
        logFile.write(data.toString().replace(/\x1b.*?m/g, "") + "\n");
        logFile.close();
      }
      consoleLog(data);
    };
  }
  private getTimeText() {
    return this.isOpenTime
      ? colorize(`[${new Date(Date.now()).toLocaleTimeString()}]`, "#faae2a")
      : "";
  }
  private getDateText() {
    return this.isOpenDate
      ? colorize(`[${new Date(Date.now()).toLocaleDateString()}]`, "#fa812a")
      : "";
  }
  private getBeforeHeader() {
    return this.getDateText() + this.getTimeText();
  }

  console: loggerConsole = {
    log: (text: string) => {
      const logText = this.logText;

      if (
        (typeof logText.headerTextColor === "string" ||
          typeof logText.headerTextColor == "object") &&
        (typeof logText.textColor === "string" ||
          typeof logText.textColor === "object")
      )
        console.log(
          this.getBeforeHeader() +
            colorize(logText.headerText, logText.headerTextColor) +
            " " +
            colorize(text, logText.textColor)
        );
    },
    error: (text: string) => {
      const errorText = this.errorText;

      if (
        (typeof errorText.headerTextColor === "string" ||
          typeof errorText.headerTextColor == "object") &&
        (typeof errorText.textColor === "string" ||
          typeof errorText.textColor === "object")
      )
        console.log(
          this.getBeforeHeader() +
            colorize(errorText.headerText, errorText.headerTextColor) +
            " " +
            colorize(text, errorText.textColor)
        );
    },
    warn: (text: string) => {
      const warnText = this.warnText;

      if (
        (typeof warnText.headerTextColor === "string" ||
          typeof warnText.headerTextColor == "object") &&
        (typeof warnText.textColor === "string" ||
          typeof warnText.textColor === "object")
      )
        console.log(
          this.getBeforeHeader() +
            colorize(warnText.headerText, warnText.headerTextColor) +
            " " +
            colorize(text, warnText.textColor)
        );
    },
    createCustom: (name: string, text: string, textColor?: Color) => {
      Object.defineProperty(this.console, name, {
        value: (_text: string) => {
          console.log(
            this.getBeforeHeader() +
              colorize(text, textColor ?? "fff") +
              colorize(" " + _text, textColor ?? "fff")
          );
        },
        writable: true,
        configurable: true,
      });
    },
  };
}
const rgbToHex = ({
  r,
  g,
  b,
}: {
  r: number | string;
  g: number | string;
  b: number | string;
}): string => {
  const toHex = (c: number) => c.toString(16);
  let _r = toHex(typeof r == "string" ? parseInt(r) : r),
    _g = toHex(typeof g == "string" ? parseInt(g) : g),
    _b = toHex(typeof b == "string" ? parseInt(b) : b);
  return `${_r.length == 1 ? "0" + _r : _r}${_g.length == 1 ? "0" + _g : _g}${
    _b.length == 1 ? "0" + _b : _b
  }`;
};
const colorDarker = (
  { r, g, b }: { r: number; g: number; b: number },
  amount?: number
) => {
  r -= amount ?? 100;
  g -= amount ?? 100;
  b -= amount ?? 100;

  if (r < 0) r = 0;
  if (g < 0) g = 0;
  if (b < 0) b = 0;

  return { r, g, b };
};
const rgbToAnsi = ({
  r,
  g,
  b,
}: {
  r: number | string;
  g: number | string;
  b: number | string;
}) => {
  return `\x1b[38;2;${r};${g};${b}m`;
};
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  if (hex.startsWith("#")) hex = hex.slice(1);
  if (hex.length === 3)
    hex = `${hex.at(0)?.repeat(2)}${hex.at(1)?.repeat(2)}${hex
      .at(2)
      ?.repeat(2)}`;
  hex = hex.toLowerCase();
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
};
const colorize = (
  text: any,
  data: string | { r: number | string; g: number | string; b: number | string }
) => {
  let coloredText: string;
  if (typeof data === "object" && typeof data !== "string") {
    coloredText = `${rgbToAnsi(data)}${text}\x1b[0m`;
  } else if (typeof data === "string") {
    coloredText = `${rgbToAnsi(hexToRgb(data))}${text}\x1b[0m`;
  } else throw Error("data type error");
  return coloredText;
};
const colorizer = {
  red: (text: any) => colorize(text, "f00"),
  green: (text: any) => colorize(text, "0f0"),
  blue: (text: any) => colorize(text, "00f"),
  orange: (text: any) => colorize(text, "ffa500"),
  yellow: (text: any) => colorize(text, "ff0"),
  cyan: (text: any) => colorize(text, "0ff"),
  gray: (text: any) => colorize(text, "808080"),
  white: (text: any) => colorize(text, "fff"),
  black: (text: any) => colorize(text, "000"),
  hex: (text: any, hexcode: string) => colorize(text, hexcode),
};
export {
  consLogger,
  hexToRgb,
  rgbToHex,
  rgbToAnsi,
  colorizer,
  colorize,
  colorDarker,
};
