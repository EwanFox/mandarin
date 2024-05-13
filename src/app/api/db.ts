import { Connection } from 'mysql2';
import mysql from 'mysql2/promise'

const pool = await mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: parseInt(process.env.MYSQL_PORT || ''),
    password: process.env.MYSQL_PASSWORD,
    database: 'ewanfoxc_mandarin_project',
    waitForConnections: true
});

export default pool;