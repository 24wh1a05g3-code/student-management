
const request = require("supertest");
const app = require("../server");

describe("Student Management API Tests", () => {

    // Test Case 1: Get all students
    test("Should return all students", async () => {
        const response = await request(app)
            .get("/students");

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty("name");
    });

    // Test Case 2: Add a new student
    test("Should add a new student", async () => {
        const response = await request(app)
            .post("/students")
            .send({
                name: "Anil",
                branch: "CSE"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("Anil");
        expect(response.body.branch).toBe("CSE");
    });

});
