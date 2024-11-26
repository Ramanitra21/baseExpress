const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tester',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const execute = async (sql, value) => {
    let connection ;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, value);
        return rows;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête SQL :', error);
        throw error;
    }finally {
        if (connection) {
          connection.release();
        }
    }
}

const createTable = async () => {
    try {
        await execute(`
            CREATE TABLE IF NOT EXISTS utilisateurs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nom VARCHAR(255) NOT NULL,
            prenom VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            mot_de_passe VARCHAR(255) NOT NULL );
        `)
        console.log('Tables créées avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création des tables :', error);
    }
}

module.exports = {execute, createTable};
