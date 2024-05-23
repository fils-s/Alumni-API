module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("Event", {
        eventDesc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Description can not be empty or null!" } }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: { notNull: { msg: "Event Date can not be empty or null!" } }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: { msg: "Address can not be empty or null!" } }
        },
        picture: {
            type: DataTypes.BLOB('long'), // <- image file
            allowNull: true 
          },
        xpGained: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { 
                xpValidation: function (val){
                    if(0>typeof(val)||typeof(val)>100){
                        throw new Error('XP Value must be between 0 and 100!');
                    }
                }
            }
        },
    }, {
        timestamps: false
    });
    return Event;
};