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

function* zip(...iterables: Iterable<any>[]) {
    const inputs = iterables.map(iterator => iterator[Symbol.iterator] ? iterator[Symbol.iterator]() : null);

    if (inputs.some(v => v === null)) {
        throw new Error('ArgumentException: At least one argument is not iterable');
    }

    let done = false;
    while (!done) {
        const result = [];
        for (const iterator of inputs) {
            const value = iterator?.next();
            if (value?.done) {
                done = true;
                break;
            }
            result.push(value?.value);
        }
        if (!done) {
            yield result;
        }
    }
}

export const get = async (table: string) => {
    const [rows] = await conn?.execute('SELECT * FROM ' + table);
    return JSON.parse(JSON.stringify(rows));
}

export const update = async (table: string, id: string, keys: any, values: any) => {
    console.log(keys);
    let query = 'UPDATE ' + table + ' SET ';
    for (const [key, value] of zip(keys, values)) {

        if (isNaN(parseInt(value)) || value == '')
            query += key + " = '" + value + "', ";
        else
            query += key + ' = ' + value + ', ';
    }
    query = query.substring(0, query.length - 2) + ' WHERE ' + table + '_ID = ' + id;
    console.log(query);

    const [rows] = await conn?.execute(query);
    return JSON.parse(JSON.stringify(rows));
}

export const insert = async (table: string, data: any) => {
    let query = 'INSERT INTO ' + table + ' VALUES (';
    for (const value of data)
        if (isNaN(parseInt(value)) || value == '')
            query += "'" + value + "', ";
        else
            query += value + ', ';
    query = query.substring(0, query.length - 2) + ')';

    const [rows] = await conn?.execute(query);
    return JSON.parse(JSON.stringify(rows));
}

export const remove = async (table: string, id: string) => {
    const [rows] = await conn?.execute('DELETE FROM ' + table + ' WHERE ' + table + '_ID = ' + id);
    return JSON.parse(JSON.stringify(rows));
}