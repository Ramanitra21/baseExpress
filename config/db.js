const mysql = require('mysql2/promise');

// Configuration de la connexion à la base de données
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'liftbag',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fonction générique pour exécuter des requêtes SQL
const execute = async (sql, values = []) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.execute(sql, values);
        return rows;
    } catch (error) {
        console.error('Erreur lors de l\'exécution de la requête SQL :', error.message);
        throw error;
    } finally {
        if (connection) connection.release();
    }
};

// Création des tables avec gestion des relations
const createTables = async () => {
    try {
        // Table des utilisateurs
        await execute(`
            CREATE TABLE IF NOT EXISTS utilisateurs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nom VARCHAR(255) NOT NULL,
                prenom VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                mot_de_passe VARCHAR(255) NOT NULL
            );
        `);

        // Table des annonces
        await execute(`
            CREATE TABLE IF NOT EXISTS annonces (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_utilisateur INT NOT NULL,
                lieu_depart VARCHAR(255) NOT NULL,
                lieu_arrivee VARCHAR(255) NOT NULL,
                date_transport DATE NOT NULL,
                poids_disponible FLOAT NOT NULL,
                tarif_par_kilo FLOAT NOT NULL,
                FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        // Table des demandes
        await execute(`
            CREATE TABLE IF NOT EXISTS demandes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_annonce INT NOT NULL,
                id_utilisateur_expediteur INT NOT NULL,
                poids_colis FLOAT NOT NULL,
                description_colis TEXT,
                statut ENUM('en attente', 'acceptée', 'refusée', 'livrée') DEFAULT 'en attente',
                FOREIGN KEY (id_annonce) REFERENCES annonces(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (id_utilisateur_expediteur) REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        // Table des transactions
        await execute(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_demande INT NOT NULL,
                montant FLOAT NOT NULL,
                date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (id_demande) REFERENCES demandes(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        // Table des avis
        await execute(`
            CREATE TABLE IF NOT EXISTS avis (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_utilisateur INT NOT NULL,
                id_transaction INT NOT NULL,
                note INT CHECK (note BETWEEN 1 AND 5),
                commentaire TEXT,
                FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY (id_transaction) REFERENCES transactions(id) ON DELETE CASCADE ON UPDATE CASCADE
            );
        `);

        console.log('Toutes les tables ont été créées avec succès.');
    } catch (error) {
        console.error('Erreur lors de la création des tables :', error.message);
        throw error;
    }
};

// Exportation des fonctions
module.exports = { execute, createTables };
