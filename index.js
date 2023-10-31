"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fs = __importStar(require("fs"));
const md5 = require("md5");
let existingContent = [];
class FS {
    constructor(d) {
        this.directory = d;
    }
    store(filename, content) {
        storeData(filename, content);
        console.log("File " + filename + " created");
    }
    get(filename) {
        let y = "";
        Fs.readFile(filename + ".txt", function (err, data) {
            if (err) {
                return console.error(err);
            }
            y = data.toString();
            for (let i = 0; i < existingContent.length; i++) {
                if (y == existingContent[i].md5code) {
                    console.log(existingContent[i].content);
                    break;
                }
            }
        });
    }
}
function storeData(filename, content) {
    Fs.writeFile(filename + '.txt', md5(content), function (err) {
        if (err) {
            return console.error(err);
        }
    });
    if (existingContent.find(x => { x.content == content; }) == undefined) {
        fillArr(md5(content), content);
    }
    return existingContent;
}
function fillArr(m, c) {
    existingContent.push({ md5code: m, content: c });
    return existingContent;
}
let fs = new FS("/");
fs.store("filename1", "a very long string1");
fs.store("filename2", "a very long string1");
fs.store("filename3", "a very long string3");
let result1 = fs.get("filename1"); // gets 'a very long string1'
let result2 = fs.get("filename2"); // gets 'a very long string1'
let result3 = fs.get("filename3"); // gets 'a very long string3'
