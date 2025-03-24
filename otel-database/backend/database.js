const { Pool: PGPool } = require('pg');
const { v4: uuidv4 } = require('uuid');

function startPsql() {
  const pool = new PGPool({
    user: 'your_username',
    password: 'your_password',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'your_database',
  });
  return pool;
}

const getUsers = async ( pgPool ) => { 
    const queryText = 'SELECT user_id, first_name, last_name, email FROM users';
    return pgPool.query(queryText);
}

const addUser = ( pgPool, firstName, lastName, email ) => { 
    const userID = uuidv4();
    const queryText = 'INSERT INTO users (user_id, first_name, last_name, email) VALUES ($1, $2, $3, $4)';
    return pgPool.query(queryText, [userID, firstName, lastName, email]);
}

const removeUser = ( pgPool, userID ) => { 
    const queryText = `DELETE FROM users where user_id=\'${userID}\'`;
    return pgPool.query(queryText);
}

exports.startPsql = startPsql;
exports.getUsers = getUsers;
exports.addUser = addUser;
exports.removeUser = removeUser;