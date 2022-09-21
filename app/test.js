const Answer = require('./models/Answer');

const maReponse = new Answer({
    id: '1',
    description: 'Ma Description',
    question_id: 2
})

console.log('Ma reponse : ', maReponse);