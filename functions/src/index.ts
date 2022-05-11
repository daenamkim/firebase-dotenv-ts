import * as functions from "firebase-functions";
import { config } from "./config";

export const endpointWithNoSecret = functions
  .https
  .onRequest((_, response) => {
  const result = {
    secret: process.env.SECRET,
    outside: config.WORK,
    inside: process.env.WORK,
  }
  response.send(result);
});

export const endpointWithSecret = functions
  .runWith({ secrets: ["SECRET"] })
  .https
  .onRequest((_, response) => {
  const result = {
    secret: process.env.SECRET,
    outside: config.WORK,
    inside: process.env.WORK,
  }
  response.send(result);
});
