const database = require('./dataBase');
const Level = require('./models/Level');

const dataMapper = {
    getAllLevels: (callback) => {
        const query = {
            text: `SELECT * FROM "level";`
        }

        database.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }

            const rows = result.rows;
            const levels = rows.map((row) => {
                //return row;
                return new Level(row);
            })
            //console.log('return row : ', levels);
            console.log('new Level(row) : ', levels)

            return callback(null, levels);

            /*   for (let row of rows) {
                  const monLevel = new Level(row);
                  console.log("une ligne de monLevel : ", monLevel);
              } */
            //console.log("Rows level ", rows);

        })
    },

    getOneLevel(id, callback) {
        const query = {
            text: `SELECT * FROM "level" WHERE "id" = $1;`,
            values: [id]
        }

        database.query(query, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            // dans result, je veux récupérer row (s'il existe), et dans row 
            // je veux récupérer le premier élément (s'il existe), 
            // si un des trucs n'existe pas, levelObj vaudra undefined
            const levelObj = result?.row?.[0];

            if (levelObj) {
                const levelInstance = new Level(levelObj);
                return callback(null, levelInstance);
            }
            else {
                return callback(null, null);
            }
        });
    }
}


module.exports = dataMapper;