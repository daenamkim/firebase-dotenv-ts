import "mocha";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { config } from "../src/config"

chai.use(chaiHttp);

describe("Dotenv", () => {
  it("should get a variable from process.env in test", () => {
    expect(process.env.WORK).to.equal("work-local");
  });
  it("should get a variable from import in test", () => {
    expect(config.WORK).to.equal("work-local");
  });
  it("should get a secret from process.env in test", () => {
    expect(process.env.SECRET).to.equal("secret-local");
  });
  it("should get a secret from import in test", () => {
    expect(config.WORK).to.equal("work-local");
  });
  it("should return with secret", async () => {
    const res = await chai.request("http://localhost:5001").get("/dotenv/us-central1/endpointWithSecret");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      outside: "work-local",
      inside: "work-local",
      secret: "secret-local",
    });
  });
  it("should return with no secret", async () => {
    const res = await chai.request("http://localhost:5001").get("/dotenv/us-central1/endpointWithNoSecret");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      outside: "work-local",
      inside: "work-local",
      secret: undefined,
    });
  });
});
