module.exports = (sequelize, DataTypes) => {
    const eventComment = sequelize.define("eventComment", {
        commentDesc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "Text can not be empty or null!" }
            }
        }
    }, {
        timestamps: false
    });
    return eventComment;
};