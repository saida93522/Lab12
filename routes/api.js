//API server routes
let express = require('express')
let db = require('../models') // fetches code index.js exports
let Student = db.Student

let router = express.Router() //matches requests to functions that can respond.


//route 1 fetches student
router.get('/student', function (req, res, next) {
    //TODO Sort the student table by present and then by StarID
    Student.findAll({ order: ['present', 'starID'] }).then(students => { //sorting order
        return res.json(students) // returns array of student object in JSON format
    }).catch(err => next(err))
})

//route 2 create student
router.post('/student', function (req, res, next) {
    Student.create(req.body).then((data) => { //re.body contains any JSON data that Vue client has sent in the request.
        return res.status(201).send('ok') //sending back 'ok' response to let user know it worked *curl command
    }).catch(err => {
        //handle user Errors
        if (err instanceof db.Sequelize.ValidationError) {
            let messages = err.errors.map(e => e.message)
            return res.status(400).json(messages) // 400 Bad Request
        } else {
            // if not user Error, pass to error handler in server.js 
            return next(err)
        }
    })
})
// edit student
router.patch('/student/:id', function (req, res, next) { // update student with matched Id
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update(updatedStudent, { where: { id: studentID } })  //SQLite query method
        .then((rowsModified) => { //Array
            let numOfRowsModified = rowsModified[0] //num of rows changed

            if (numOfRowsModified == 1) {
                return res.send('ok') //return message if worked
            }

            //else if there is no rows, return msg error 404 
            else {
                return res.status(404).json(['Error, Student with that id NOT FOUND'])
            }

        })
        //if there is not database connstraint problem
        .catch(err => {
            // if validation error
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map(e => e.message)
                return res.status(400).json(messages) //bad requests from user
            } else {
                // if not user, pass to error handler in server.js 
                return next(err)
            }


        })
})




//delete student
router.delete('/student/:id', function (req, res, next) {
    let studentID = req.params.id
    Student.destroy({ where: { id: studentID } }).then((rowsDel) => {
        if (rowsDel == 1) {
            return res.send('ok')
        } else {
            return res.status(404).json(['Not Found'])
        }
    }).catch(err => next(err)) //unexpected eeror
})

module.exports = router