import request from "supertest";
import app from "../index.js";

describe("Health Check", () => {
    it("should return 200 and health status", async () => {
        const response = await request(app).get("/health").expect(200);

        expect(response.body).toHaveProperty("status", "OK");
        expect(response.body).toHaveProperty(
            "message",
            "FocusFlow API is running"
        );
        expect(response.body).toHaveProperty("timestamp");
        expect(response.body).toHaveProperty("environment");
    });
});
