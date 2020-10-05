require("dotenv").config();
require("../src/libs/logger").initializeLogger();
const assert = require("chai").assert;


describe("Initial unit test", () => {
    describe("Checking unit tests running", () => {
        it("Simple unit test", async () => {
            assert.isTrue(true);
        });
    });
});