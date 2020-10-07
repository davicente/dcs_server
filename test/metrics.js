const assert = require("chai").assert;
const expect = require("chai").expect;
const sinon = require("sinon");

const constants = require("../src/libs/constants");
require("./initializeTests");

const metricsController = require("../src/controller/metrics/metrics");

describe("Metrics Controller", () => {
    describe("Add and get metrics", () => {
        it("Get not used metric", () => {
            const metricSum = metricsController.getMetricSum("NotUsed");
            assert.equal(metricSum, 0);
        });

        it("Add one value to metric", () => {
            const metricName = "oneValue";
            metricsController.addMetric(metricName, 7);
            const metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 7);
        });

        it("Trying to add not a number", () => {
            const metricName = "notANumber";
            try {
                metricsController.addMetric(metricName, "Not a number");
            } catch (error) {
                assert.equal(error, constants.NOT_NUMBER_ERROR);
            }
        });

        it("Add float value to be rounded below to metric", () => {
            const metricName = "floatValueBelow";
            metricsController.addMetric(metricName, 7.45);
            const metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 7);
        });

        it("Add float value to be rounded above to metric", () => {
            const metricName = "floatValueAbove";
            metricsController.addMetric(metricName, 7.51);
            const metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 8);
        });

        it("Add value to be rounded to 0 to existing metric", () => {
            const metricName = "existingMetric";
            metricsController.addMetric(metricName, 9);
            let metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 9);
            metricsController.addMetric(metricName, 0.499);
            metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 9);
        });

        it("Add several values to metric and sum value is incremented", () => {
            const metricName = "severalValues";
            metricsController.addMetric(metricName, 7);
            let metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 7);
            metricsController.addMetric(metricName, 3);
            metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 10);
            metricsController.addMetric(metricName, 10);
            metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 20);
        });

        it("Add values to different metrics and sum values are incremented correctly", () => {
            const metricName1 = "severalValues1";
            const metricName2 = "severalValues2";
            const metricName3 = "severalValues3";
            metricsController.addMetric(metricName1, 7);
            let metricSum = metricsController.getMetricSum(metricName1);
            assert.equal(metricSum, 7);
            metricsController.addMetric(metricName2, 3);
            metricSum = metricsController.getMetricSum(metricName2);
            assert.equal(metricSum, 3);
            metricsController.addMetric(metricName3, 10);
            metricSum = metricsController.getMetricSum(metricName3);
            assert.equal(metricSum, 10);
            metricsController.addMetric(metricName1, 8.2);
            metricSum = metricsController.getMetricSum(metricName1);
            assert.equal(metricSum, 15);
            metricsController.addMetric(metricName2, 15.99);
            metricSum = metricsController.getMetricSum(metricName2);
            assert.equal(metricSum, 19);
            metricsController.addMetric(metricName3, 0.9);
            metricSum = metricsController.getMetricSum(metricName3);
            assert.equal(metricSum, 11);
        });
    });

    describe("Cleaning old metrics", () => {
        it("Check metric sum after expired", done => {
            process.env.SECONDS_TO_REMOVE_METRIC = 2;
            const metricName = "MetricAfterExpired";
            metricsController.addMetric(metricName, 7.8);
            let metricSum = metricsController.getMetricSum(metricName);
            assert.equal(metricSum, 8);
            setTimeout(() => {
                metricSum = metricsController.getMetricSum(metricName);
                assert.equal(metricSum, 0);
                done();
            }, 2200);
        });

        it("Check metric sum after one out of two expired", done => {
            process.env.SECONDS_TO_REMOVE_METRIC = 2;
            const metricName = "TwoMetricsOneExpired";
            metricsController.addMetric(metricName, 7.8);
            setTimeout(() => {
                metricsController.addMetric(metricName, 13.3);
                let metricSum = metricsController.getMetricSum(metricName);
                assert.equal(metricSum, 21);
                setTimeout(() => {
                    let metricSum = metricsController.getMetricSum(metricName);
                    assert.equal(metricSum, 13);
                    done();
                }, 1000);
            }, 1500);
        });
    });
});