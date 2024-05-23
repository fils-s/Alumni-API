module.exports = (sequelize, DataTypes) => {
    const postComment = sequelize.define("postComment", {
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
    return postComment;
};