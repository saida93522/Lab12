//database table that will store objects using sequelize
//model structure for this database
module.exports = (sequelize, DataTypes) => {

    // sequelize will map student info to database table 
    var Student = sequelize.define('Student', { //student object
        // type of data student table will store..ie columns
        name: {
            type: DataTypes.STRING,
            allowNull: false // null values not allowed
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false, // null values not allowed
            unique: true, //no duplicates
            // validate: {
            //     is: /^[a-z]{2}\d{4}[a-z]{2}$/
            // }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false, // null values not allowed
            defaultValue: false
        }
    }) //end of Student


    //create student table in db
    Student.sync({ force: false }).then(() => { // overwrites old db tables evertime app restarts if force is set true, also returns promise
        console.log('synced student table');
    })
    return Student //module scope

}//end of module