const sqlite3 = require('sqlite3').verbose();
const PersonRowMapper = require('./personRowMapper');
const uuidv4 = require('uuid/v4');

const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;

const db = new sqlite3.Database(':memory:');

const init = async () => {
  // INITIALIZE SQLITE
  db.serialize(() => {
    db.run("CREATE TABLE person (id TEXT, firstName TEXT, lastName TEXT, status TEXT, description TEXT, tags TEXT, keywords TEXT)");
    insert({
        "id": uuidv4(),
      "firstName": "Loïc",
      "lastName": "Ortola",
      "status": "SAFE",
      "description": "Il va bien. Il Dormait comme un bébé, n'a même pas senti la tornade passer.",
      "tags": [
        "tout-va-bien",
        "st-martin",
        "homme",
        "chauve",
        "tatouage"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Nicolas",
      "lastName": "Raymond",
      "status": "SAFE",
      "description": "Il a attrapé un rhume, mais au final tout va bien aussi.",
      "tags": [
        "tout-va-bien",
        "st-martin",
        "homme",
        "jeune",
        "lunettes"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Nicolas",
      "lastName": "Blin",
      "status": "SAFE",
      "description": "Quelques épines du à une chute de JavaScript devant sa maison, mais lui et sa famille vont bien.",
      "tags": [
        "tout-va-bien",
        "st-martin",
        "homme",
        "jeune"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Florian",
      "lastName": "Adonis",
      "status": "SAFE",
      "description": "N'a pas dormi depuis longtemps, mais est en parfaite santé en dehors de cela.",
      "tags": [
        "tout-va-bien",
        "st-martin",
        "homme",
        "jeune",
        "mince",
        "musclé"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Philippe",
      "lastName": "Clopeau",
      "status": "DEAD",
      "description": "N'a pas survécu à la chute vertigineuse de toutes ses responsabilités après l'accident. Pourtant, la France lui avait bien dit que tout était préparé pour éviter la catastrophe.",
      "tags": [
        "décédé",
        "st-martin",
        "homme",
        "souriant",
        "mince",
        "radio-amateur",
        "grand-gourou"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Gael",
      "lastName": "Musquet",
      "status": "DANGER",
      "description": "Est actuellement hospitalisé suite à la chute de son antenne décamétrique sur la tête après le cataclysme. Son pronostic vital est engagé.",
      "tags": [
        "en-danger",
        "st-martin",
        "homme",
        "souriant",
        "mince",
        "radio-amateur",
        "grand-gourou",
        "aime-les-tesla"
      ]
    });
    insert({
        "id": uuidv4(),
      "firstName": "Quentin",
      "lastName": "Laudereau",
      "status": "DANGER",
      "description": "A tenté de sauver de nombreux groupes en perdition, est épuisé et se repose actuellement à l'hopital Sainte ANFR.",
      "tags": [
        "blessé",
          "tout-va-bien",
        "st-martin",
        "homme",
        "souriant",
        "barbu"
      ]
    });
  });
};

const find = async (limit, offset, search) => {
    // TODO wrap in db.serialize
      let p = new Promise((resolve, reject) => {
          let results = [];

          let whereClauses = [];
          let values = [];
          if (search && search.length >= 1) {
              whereClauses.push("keywords LIKE ?");
              values.push('%' + _normalizeStr(search) + '%');
          }

          let whereClause = "";
          if (whereClauses.length > 0) {
              whereClause = " WHERE ";
              for (let i = 0; i < whereClauses.length; i++) {
                  whereClause += whereClauses[i];
                  if (i < whereClauses.length - 1) {
                      whereClause += ' ';
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

          let stmt = db.prepare(query);

          stmt.each(values, (err, row) => {
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

const _capitalize = (phrase) => {
  return phrase
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
};

const _normalizeStr = (phrase) => {
  return phrase.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
};

const _normalize = (map, table) => {
  for (let i in table) {
    map[_normalizeStr(table[i])] = true;
  }
  return map;
};

const _getKeywords = (person) => {
  let keywordsMap = {};
  _normalize(keywordsMap, person.description.split(' '));
  _normalize(keywordsMap, person.firstName.split(' '));
  _normalize(keywordsMap, person.lastName.split(' '));
  _normalize(keywordsMap, person.tags);
  return Object.keys(keywordsMap);
};

const insert = async (reqBody) => {
  // TODO wrap in db.serialize
  if (!reqBody.id) {
      reqBody.id = uuidv4();
  }
  let params = [reqBody.id, _capitalize(reqBody.firstName), _capitalize(reqBody.lastName), reqBody.status, reqBody.description, JSON.stringify(reqBody.tags), JSON.stringify(_getKeywords(reqBody))];
  let stmt = db.prepare("INSERT INTO person VALUES (?, ?, ?, ?, ?, ?, ?)");

  let p = new Promise((resolve, reject) => {
    stmt.run(params, () => {
      resolve();
    });
  });
  return await p;
};

module.exports = {
  init,
  find,
  insert
};