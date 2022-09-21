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
    }
}

module.exports = dataMapper;