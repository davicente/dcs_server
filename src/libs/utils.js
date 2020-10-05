const mkdirp = require("mkdirp");

exports.createFolder = async foldername => {
    try {
        await mkdirp(foldername);
        const logger = require("./logger").getLogger();
        logger.info("The folder " + foldername + " was created");
    } catch (error) {
        console.log(error);
        throw error;
    }
};