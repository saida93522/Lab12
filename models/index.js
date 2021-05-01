//This code will help Sequelize read model file and figure out where code is running on
//import all Sequelize models and make them available to the rest of the app

//setting up sequelize
let { Sequelize, DataTypes } = require("sequelize"); //sequelize library

//setting up database to connect to
let env = process.env.NODE_ENV || 'development' //determines development or production behavior,
let config = require(__dirname + '/../config.json')[env] //file path of env. config stores dev||pro

let db = {} //db object
let sequelize

/* note: production.use_env_variable = "DATABASE_URL"  */

//setting Heroku environment variables so that deployed apps can access them.
//set sequelize object
if (config.use_env_variable) { //
    //use postgres
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    //running locally, development mode, use SQLite
    sequelize = new Sequelize(config)
}

let studentModel = require('./student')(sequelize, DataTypes) //returns model.exports function in students
db[studentModel.name] = studentModel //obj/prob from student model

//connecting to a database and connect to Sequelize library
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
