import mysql from 'mysql2/promise';

let _conn: mysql.Connection | null = null;

const getConn = async () => {
    if (!_conn)
        _conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'cs127'
        });

    return _conn;
}

export const conn = await getConn();

export const getEmployees = async () => {
    const [rows] = await conn?.execute({ sql: 'SELECT * FROM Employee', rowsAsArray: true }, []);
    return rows;
}