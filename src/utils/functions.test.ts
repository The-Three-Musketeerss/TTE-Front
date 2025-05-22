import { describe, it, expect } from "vitest";
import { decodeJwt } from "./functions";

describe("decodeJwt", () => {
  it("decodes a valid JWT payload", () => {
    const payload = { sub: "1234567890", name: "John Doe", admin: true };
    const base64Url = btoa(JSON.stringify(payload))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const token = `header.${base64Url}.signature`;

    const result = decodeJwt(token);

    expect(result).toEqual(payload);
  });

  it("throws an error with invalid token structure", () => {
    const invalidToken = "invalid.token";

    expect(() => decodeJwt(invalidToken)).toThrow();
  });
});
