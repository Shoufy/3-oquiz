const dotenv = require('dotenv');
//Ne pas oublier de mettre les fichiers de config dotenv
// Bonne pratique mettre le dotenv.config tout en haut des fichiers à charger
dotenv.config();

/* const Answer = require('./models/Answer');
const User = require('./models/User');
const Question = require('./models/Question'); */
const dataMapper = require('./dataMapper');

/* 
const maReponse = new Answer({
    id: '1',
    description: 'Ma Description',
    question_id: 2
})
console.log('Ma reponse : ', maReponse);

const monUser = new User({
    id: 2,
    email: 'sophie@sophie.com',
    password: 'mdpsophie',
    firstname: 'Sophie',
    lastname: 'DUCK'
})
console.log('Mon user : ', monUser.fullName);

const maQuestion = new Question({
    id: 1,
    question: "Quand a eu lieu la chute du mur de Berlin",
    anecdote: "Allemagne",
    wiki: null,
    level_id: 1,
    answer_id: 1,
    quiz_id: 1,    
})
console.log("Ma question : ", maQuestion); */


dataMapper.getAllLevels((err, levels) => {
    console.log("getAllLevels callback : ", {err, levels})
});