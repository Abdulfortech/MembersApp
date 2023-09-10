const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const members = require('./Members');

const app = express();

// init middleware

// handlebars middleware
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// home page
app.get('/', (req, res) => res.render('index', {
    title: 'MembersApp | Home'
}));
// members page
app.get('/members', (req, res) => res.render('members', {
    title: 'MembersApp | All Members',
    members
}));
// add member page
app.get('/members/add', (req, res) => res.render('add', {
    title: 'MembersApp | Add Member'
}));

// set a static folder
app.use(express.static(path.join(__dirname, 'public')));
// members api route
app.use('/api/members', require('./routes/api/members'));

// app.get('/', (req, res) => {
//     // res.send('<h1>Hello, I am learning express.js</h1>')
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));