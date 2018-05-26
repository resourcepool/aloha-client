const sqlite3 = require('sqlite3').verbose();
const PersonRowMapper = require('./personRowMapper');
const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const db = new sqlite3.Database(':memory:');

const init = async () => {
  // INITIALIZE SQLITE
  db.serialize(() => {
    db.run("CREATE TABLE person (id TEXT, firstName TEXT, lastName TEXT, status TEXT, description TEXT, tags TEXT)");
    db.run('INSERT INTO person VALUES ("1234", "Loic", "Ortola", "SAFE", "Coucou", "[]")');
    db.run('INSERT INTO person VALUES ("12344", "LOLO", "Ortolo", "SAFE", "Coucou", "[]")');
  });
};

const find = async (limit, offset, search) => {
  // TODO wrap in db.serialize
  let p = new Promise((resolve, reject) => {
    let results = [];

    let whereClauses = [];
    let values = [];
    if (search && search.length >= 1) {
      whereClauses.push("description LIKE ?");
      values.push('%' + search + '%');
    }


    let whereClause = "";
    if (whereClauses.length > 0) {
      whereClause = " WHERE ";
      for (let i = 0; i < whereClauses.length; i++) {
        whereClause += whereClauses[i];
        if (i < whereClauses.length - 1) {
          whereClause += ' AND ';
        }
      }
    }

    let limitStr = " LIMIT ";
    if (offset > DEFAULT_OFFSET) {
      limitStr += offset + ", " + limit;
    } else {
      limitStr += limit;
    }

    let query = "SELECT * FROM person" + whereClause + limitStr;
    console.log(query);

    let stmt = db.prepare(query);

    stmt.each(values, (err, row) => {
      console.log(err);
      results.push(PersonRowMapper.map(row));
    }, () => {
      resolve(results);
    });
  });

  let results = await p;

  let p2 = new Promise((resolve, reject) => {
    let stmt = db.prepare("SELECT COUNT(*) FROM person");
    stmt.run((err, count) => {
      resolve(count);
    });
  });

  let count = await p2;

  let wrapper = {
    "offset": offset,
    "limit": limit,
    "total": count || -1,
    "filter": search,
    "items": results
  };

  return wrapper;
};

const insert = async (reqBody) => {

  let params = [reqBody.id, reqBody.firstName, reqBody.lastName, reqBody.status, reqBody.description, reqBody.tags]
  let stmt  = db.prepare("INSERT INTO person VALUES (?, ?, ?, ?, ?, ?)");

  stmt.run(params, () => {
    console.log("INSERTED");
  })
};

module.exports = {
  init,
    find,
    insert
};