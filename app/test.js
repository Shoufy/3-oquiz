const Answer = require('./models/Answer');
const User = require('./models/User');

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
