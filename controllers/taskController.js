var Task = require('../models/Task');

//Todo
var getTodo = function (req, res, next) {
    var userId = req.params.userId;
    Task.find({ assiginee: userId, reporter: userId }, 'title due_date priority status', (err, todos) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else
            return res.status(200).json({ status: 'success', todos })
    })
}

//Assigned
var getAssigned = function (req, res, next) {
    var userId = req.params.userId;
    console.log(userId)
    Task.find({ assiginee: userId, reporter: { $ne: userId } }, 'title due_date reporter priority status', (err, assigned) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else
            return res.status(200).json({ status: 'success', assigned })
    }).populate('reporter', '-password -admin -supervise')
}

//Create Task
var createTask = function (req, res, next) {
    const task = new Task()
    const assiginee = req.body.assiginee

    var prop = Object.getOwnPropertyNames(req.body)
    prop.forEach(ele => {
        task[ele] = req.body[ele]
    })

    task.save((err, task) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else {
            res.status(201).json({ status: 'success', task })
        }
    })
}

//Start the Task
var statusEnum = { "todo": "TO_DO", "inprogress": "IN_PROGRESS", "completed": "COMPLETED" }
Object.freeze(statusEnum)
var startTask = function (req, res, next) {
    var id = req.params.id;
    Task.findByIdAndUpdate(id, req.body, { new: true }, (err, task) => {
        if (err)
            res.status(500).json({ status: 'failed', err })
        else
            res.status(200).json({ status: "success", task })
    })

    Task.findById(id, (err, task) => {
        status = req.body.status;
        if (err) throw err;
        if (task) {
            if (task.status === null) {
                Task.findByIdAndUpdate(id, statusEnum)
            }
        }
    })
}

module.exports = {
    getTodo: getTodo,
    getAssigned: getAssigned,
    createTask: createTask,
    startTask: startTask
}