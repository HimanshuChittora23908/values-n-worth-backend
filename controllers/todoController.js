const Todo = require('../models/todo');
const verifyRole = require('../middleware/auth');
const User = require('../models/user');

const getTodos = (req, res) => {
    const token = req.query.token;
    const isVerified = verifyRole(token);
    if (isVerified.error) {
        res.status(401).send("Unauthorised!");
        return;
    }
    const role = isVerified.data.role;
    const id = isVerified.data.user;
    if (role === "user") {
        const user = User.findById(id).then(user => {
            if (user) {
                Todo.find({
                    user: user.name
                })
                    .then(todos => {
                        const date = req.query.date;
                        const category = req.query.category;
                        const status = req.query.status;
                        const username = req.query.username;
                        if (username && username !== "Admin") {
                            todos = todos.filter(todo => todo.userName === username);
                        }
                        if (date && date === 'Today') {
                            todos = todos.filter(todo => new Date(todo.date).toDateString() === new Date().toDateString());
                        }
                        if (date && date === 'Tomorrow') {
                            todos = todos.filter(todo => new Date(todo.date).toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString());
                        }
                        if (date && date === 'Overdue') {
                            todos = todos.filter(todo => new Date(todo.date).toDateString() > new Date().toDateString());
                        }
                        if (date && date === 'Last 7 days') {
                            const data = todos.filter(todo => Math.ceil((new Date().getTime()) - new Date(todo.date).getTime() / (1000 * 3600 * 24)) <= 7);
                            todos = data;
                        }
                        if (date && date === 'Older than 7 days') {
                            const data = todos.filter(todo => Math.ceil((new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).getTime() - new Date(todo.date).getTime()) / (1000 * 60 * 60 * 24)) > 0);
                            todos = data;
                        }
                        if (category) {
                            todos = todos.filter(todo => todo.category === category);
                        }
                        if (date !== 'Today' && status) {
                            todos = todos.filter(todo => todo.status === status);
                        }
                        res.send(todos.reverse());
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    })
            }
            else {
                res.status(404).send("User not found");
            }
        })

    }
    else if (role === "admin") {
        const admin = User.findById({
            id: id
        }).then(admin => {
            if (admin) {
                Todo.find({})
                    .then(todos => {
                        res.send(todos);
                    })
                    .catch(err => {
                        res.status(500).send(err);
                    })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        )
    }
    else {
        res.status(401).send("Unauthorised!");
        return;
    }
}

const addTodo = (req, res) => {
    const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description,
        userName: req.body.userName,
        status: 'Pending',
        date: new Date(req.body.date).toISOString(),
        category: req.body.category
    });
    newTodo.save()
        .then(todo => { console.log(todo) })
        .catch(err => console.log(err));

    res.send('Todo added');
}

const updateTodo = (req, res) => {
    const id = req.query.id;
    const update = req.body.update;
    const token = req.query.token;
    const isVerified = verifyRole(token);
    if (isVerified.error) {
        res.status(401).send("Unauthorised!");
        return;
    }
    const role = isVerified.data.role;
    if (role === "user") {
        Todo.findById(id)
            .then(todo => {
                if (todo) {
                    todo.title = req.body.title;
                    todo.description = req.body.description;
                    todo.userName = req.body.userName;
                    todo.status = req.body.status;
                    todo.date = new Date(req.body.date).toISOString();
                    todo.category = req.body.category;
                    todo.save()
                        .then(result => {
                            res.send(result);
                        })
                        .catch(err => {
                            res.send(err);
                        })
                }
                else {
                    res.status(404).send("Todo not found");
                }
            }
            )
            .catch(err => {
                res.send(err);
            }
            );
    }
}

const deleteTodo = (req, res) => {
    const id = req.query.id;
    const token = req.query.token;
    const isVerified = verifyRole(token);
    if (isVerified.error) {
        res.status(401).send("Unauthorised!");
        return;
    }
    const role = isVerified.data.role;
    if (role === "user") {
        Todo.findByIdAndDelete(id).then(todo => {
            res.send(todo);
        }
        ).catch(err => {
            res.status(500).send(err);
        }
        );
    }
    else {
        res.status(401).send("Unauthorised!");
        return;
    }
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}