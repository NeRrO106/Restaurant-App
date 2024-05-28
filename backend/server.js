const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));

const db = mysql.createConnection({
    host: 'db-restaurant-test.cr84eusa0dx2.eu-north-1.rds.amazonaws.com',
    user: 'admin',
    password: 'andreicosma1234',
    database: 'restaurant'
});

db.connect(err => {
    if(err){
        console.error('Database connection failed: ', err.stack);
    }
    console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/register', async(req, res) =>{
    const{ username, password, email} = req.body;
    if(!username || !password || !email){
        return res.status(400).send('Datele sunt necesare la inregistrare');
    }
    try{
        const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE name = ?', [username]);
        if (existingUsers.length > 0) return res.status(400).send('Numele deja exista, incearca altul.');

        const [existingUserWithEmail] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if(existingUserWithEmail.length > 0) return res.status(400).send('Deja exista cineva care foloseste acest email');

        const hashedPassword = await bcrypt.hash(password, 10);
        const role = 'customer';

        await db.promise().query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [username, email, hashedPassword, role]);
        res.status(201).send('User registered successfully');

    } catch (error) {
        console.error('Error occurred during registration:', error);
        res.status(500).send('Server error');
    }
});

app.post('/login', (req, res) =>{
    const { username , password } = req.body;
    if(!username || !password){
        return res.status(400).send('Username and password are required');
    }

    db.query('SELECT * FROM users WHERE name = ?', [username], (err, results) =>{
        if(err){
            return res.status(500).send('Server error');
        }
        if(results.length === 0){
            return res.status(401).send('Invalid user');
        }
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) =>{
            if(err){
                return res.status(500).send('Server error');
            }
            if(!result){
                return res.status(401).send('Invalid password');
            }
            res.send("Login successful");
        })
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
