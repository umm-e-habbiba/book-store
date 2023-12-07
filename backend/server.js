const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')


const SECRET_KEY = 'secretkey'


const app = express()


const dbURI = 'mongodb+srv://fahadshelby2001:7xYLOMkj0GdCtsDB@cluster0.hwzanxb.mongodb.net/UserDB?retryWrites=true&w=majority'
mongoose
.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then(() => {
    
    app.listen(3001, () => {
        console.log('server is connected to port 3001 and connected to mongoDB')
    })
})

.catch((error) => {
    console.log('Unable to connect to server and MongoDB')
})

//cors
app.use(bodyparser.json())
app.use(cors())


//Routes
app.post('/register', async (req, res) => {

    try {
        const { email, username, password } = req.body
        const hashedpassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, username, password: hashedpassword })
        await newUser.save()
        res.status(201).json({ message: 'User created succesfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' })
    }

})

app.get('/register', async (req, res) => {
    
    try {
        const users = await User.find()
        res.status(201).json(users)
        
    } catch (error) {
        res.status(500).json({ error: 'Unable to get User'})
    }

})



app.post('/login', async (req, res) => {

    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid Credentials' })
        }

        const token = jwt.sign({userId: user._id}, SECRET_KEY, { expiresIn: '1hr'})
        res.json({ message: 'Login Succesful'})

    } catch (error) {
        res.status(500).json({ error: 'Error Logging In'})
    }

})




