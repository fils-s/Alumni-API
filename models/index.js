const { dbConfig } = require('../utils/config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect
    ,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection do DB has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
})();

const db = {};
db.sequelize = sequelize;

//export USER model
db.user = require("./users.model.js")(sequelize, DataTypes);

//export POST model
db.post = require("./posts.model.js")(sequelize, DataTypes);

//export POST COMMENT model
db.postComment = require("./pcomments.model.js")(sequelize, DataTypes);

//export EVENT model
db.event = require("./events.model.js")(sequelize, DataTypes);

//export EVENT COMMENT model
db.eventComment = require("./ecomments.model.js")(sequelize, DataTypes);

//export ACADEMIC PATH model
db.aPath = require("./apaths.model.js")(sequelize, DataTypes);

//export PROFESSIONAL PATH model
db.pPath = require("./ppaths.model.js")(sequelize, DataTypes);




//RELATIONSHIPS

// 1:N - 1 user, N posts
db.post.belongsTo(db.user, {foreignKey: "userID"});
db.user.hasMany(db.post, {foreignKey: "userID"});

// 1:N - 1 post, N comments
// if a post is deleted, delete all comments associated with it
db.post.hasMany(db.comment, { onDelete: 'CASCADE' });
db.comment.belongsTo(db.post);

// 1:N - 1 user, N events
db.event.belongsTo(db.user, {foreignKey: "userID"});
db.user.hasMany(db.event, {foreignKey: "userID"});

// 1:N - 1 event, N comments
// if a event is deleted, delete all comments associated with it
db.event.hasMany(db.comment, { onDelete: 'CASCADE' });
db.comment.belongsTo(db.event);

// 1:N - 1 user, N academic paths
db.aPath.belongsTo(db.user, {foreignKey: "userID"});
db.user.hasMany(db.aPath, {foreignKey: "aPathID"});

// 1:N - 1 user, N professional paths
db.pPath.belongsTo(db.user, {foreignKey: "userID"});
db.user.hasMany(db.pPath, {foreignKey: "pPathID"});



// // optionally: SYNC
// (async () => {
//     try {
//         // await sequelize.sync({ force: true });
//         //await sequelize.sync({ alter: true });
//         // await sequelize.sync();
//         console.log('DB is successfully synchronized')
//     } catch (error) {
//         console.log(error)
//     }
// })();

module.exports = db;
