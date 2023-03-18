import * as cryptoJs from "crypto-js";
import * as process from "process";
import { RefreshTokenType } from "../utilities/enums";

const { v4: uuidv4 } = require("uuid");

export const makeid = function (length) {
  let result = "";
  let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const objectValidation = function (
  object: Object,
  validKeyNames: string[]
) {
  return validKeyNames.every({}.hasOwnProperty.bind(object));
};

export const generateUUID = function () {
  return uuidv4();
};

export const generateRandomNumber = function () {
  return Math.floor(1000 + Math.random() * 9999);
};

export const cryptoEncrypt = (text: string) => {
  return Buffer.from(
    cryptoJs.AES.encrypt(text, process.env.APPLICATION_SECRET_KEY).toString()
  ).toString("base64");
};

export const cryptoDecrypt = (text: string) => {
  const string = Buffer.from(text, "base64").toString("ascii");
  const bytes = cryptoJs.AES.decrypt(
    string,
    process.env.APPLICATION_SECRET_KEY
  );
  return bytes.toString(cryptoJs.enc.Utf8);
};

export const generateRefreshToken = () => {
  const _uuid = generateUUID();
  return cryptoEncrypt(_uuid);
};

export const makeArray = (relations: string | Array<string>) => {
  let data = [];
  if (typeof relations === "string") {
    data.push(relations);
  } else {
    data = [...relations];
  }
  return data;
};

export const makeRefreshToken = (type: RefreshTokenType) => {
  if (type === RefreshTokenType.UUID) {
    return generateUUID();
  } else {
    return generateRandomNumber();
  }
};
