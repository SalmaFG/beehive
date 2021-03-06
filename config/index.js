module.exports = {
    dbUrl: process.env.BEEHIVE_DB_URI || 'mongodb://@ds127962.mlab.com:27962/beehive',
    dbOpts: {
        user: process.env.BEEHIVE_DB_USER || 'beehiveAdmin',
        pass: process.env.BEEHIVE_DB_PASS || 'bHive2017'
    },
    sessionSecret: 'jwkhf!WCRWCwadnq#@RAGEQcqc3rvq#Rqwrvq',
    cookieExpiry: 2592000000,
    S3BucketName: 'beehive-img',
    projectPopulate: [{ path: 'images', model: 'Image' },
    { path: 'package', model: 'Package' }],
    s3BasePath: "https://s3-us-west-2.amazonaws.com",
    testDir: '/home/salma/Desktop/'
};