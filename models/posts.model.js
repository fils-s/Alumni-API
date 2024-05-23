module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        postDesc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Description can not be empty or null!" } }
        },
        picture: {
            type: DataTypes.BLOB('long'), // <- image file
            allowNull: true 
          }
    }, {
        timestamps: false
    });
    return Post;
};