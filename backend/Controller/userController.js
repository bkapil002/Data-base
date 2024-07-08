const bcrypt = require('bcryptjs');
const { readData, writeData } = require('../DATA/dataHandler');
const { v4: uuidv4 } = require('uuid');

const signup = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Name is required and should be a string.' });
    }
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Email is required and should be a string.' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Password is required and should be a string.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const users = readData();
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        date: new Date().toISOString()
    };

    if (users.some(user => user.email === email)) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    users.push(newUser);
    writeData(users);

    res.status(200).send('User registered successfully.');
}

const login = (req, res) => {
    const { email, password } = req.body;
    const users = readData();
    const user = users.find(user => user.email === email)

    if(!user){
        return  res.status(400).json({message : 'User is not found'})
    }

    const match = bcrypt.compareSync(password, user.password);
    if(!match){
        return res.status(400).json({message : 'invalid password'})
    }

    res.status(200).json({ message: 'Logged in successfully', user });
}

module.exports = { signup , login };
