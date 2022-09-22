const dotenv = require('dotenv');
//Ne pas oublier de mettre les fichiers de config dotenv
// Bonne pratique mettre le dotenv.config tout en haut des fichiers à charger
dotenv.config();

/* const Answer = require('./models/Answer');
const User = require('./models/User');
const Question = require('./models/Question'); 
const dataMapper = require('./dataMapper'); 
const Tag = require('./models/Tag');
const User = require('./models/User');
const Tag = require('./models/Tag');
const Level = require('./models/Level');
*/
const Quiz = require('./models/Quiz');
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


/* dataMapper.getAllLevels((err, levels) => {
    console.log("getAllLevels callback : ", {err, levels})
});

dataMapper.getOneLevel(1, (err, level) => {
    console.log("getOneLevel callback : ", {err, level})
});
 
Tag.findAll((err, tags) => {
    console.log('findAll callback : ', {err, tags})
});

Tag.findOne(2, (err, tag) => {
    console.log('findOne callback : ', {err, tag})
});

const tagToCreate = new Tag({
    name: 'New Tag'
});
tagToCreate.create((err, createdTag) => {
    console.log("createdTag : ", createdTag);
    console.log("comparaison : ", tagToCreate === createdTag)
    console.log("tagToCreate id ", tagToCreate.id); 
    console.log("createdTag : ", createdTag);
    createdTag.name = "Updated Name";
    createdTag.update((err, updatedTag) => {
        console.log('updatedTag', updatedTag);
        console.log("tagToCreate === createdTag", tagToCreate === createdTag);
        console.log("createdTag === updatedTag", tagToCreate === updatedTag);
    
        updatedTag.delete((err, success) => {
            console.log("tag deleted ? ", success);
        })
    })
})*/

/* 
User.findAll((err, user) => {
    //console.log("findAll User : ", user)
});

User.findById(1, (err, user) => {
    //console.log("findById(1) User : ", user)
});

const insertUser = new User({
    email: "so@mail.com",
    password: "mdpso",
    firstname: "so",
    lastname: "du"
});
insertUser.insert((err, createdUser) => {
    if(err) {
        console.error('err ', err);
    }
    console.log("insert user : ", createdUser);
}); 

User.findById(5, (err, user) => {
    if (err) {
        return console.error('erreur findById 5', err);
    } else if (!user) {
        return console.error("user not found ");
    }
   
    user.firstname = "CHUCHU";
    user.update((errUpdate, userUpdate) => {
        if (errUpdate) {
            console.error("errUpdate : ", errUpdate);
        }
        console.log("updated user number 5", userUpdate);
    })
});

User.findById(8, (err, user) => {
    if (err) {
        return console.error('erreur findById 8', err);
    } else if (!user) {
        return console.error("user not found ");
    }
    user.delete((errDelete, userDelete) => {
        if (errDelete) {
            console.error('errdelete : ', errDelete);
        }
        console.log("user deleted !");
    })
})



Tag.findAll((err, result) => {
    if (err) {
        console.error('err question findall : ', err);
    }
    console.log("question find all : ", result);
})

Level.findOne(1, (err, result) => {
    if (err) {
        console.error('err level findOne : ', err);
    }
    console.log("level findOne : ", result);
})
*/

const createdQuiz = new Quiz({
    title: "le monde de Raichu",
    description: "le plus mignon du monde",
    user_id: 1
})
createdQuiz.create((err, result) => {
    if(err) {
        console.error('erreur ds creation d un quiz ', err)
    }
    console.log('creation quiz : ', result)
})
