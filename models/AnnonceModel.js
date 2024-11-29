const db = require('../config/db');

class AnnonceModel {
    async createAnnonces(id_utilisateur, lieu_depart, lieu_arrivee, date_transport, poids_disponible, tarif_par_kilo) {
        try {
            // Étape 1 : Vérifier si l'utilisateur existe
            const utilisateur = await db.execute(`
                SELECT id FROM utilisateurs WHERE id = ?;
            `, [id_utilisateur]);

            if (utilisateur.length === 0) {
                return {
                    success: false,
                    message: 'Annonce créée avec succès.'
                };
               
            }

            // Étape 2 : Insérer l'annonce
            await db.execute(`
                INSERT INTO annonces (id_utilisateur, lieu_depart, lieu_arrivee, date_transport, poids_disponible, tarif_par_kilo)
                VALUES (?, ?, ?, ?, ?, ?);
            `, [id_utilisateur,  lieu_depart, lieu_arrivee, date_transport, poids_disponible, tarif_par_kilo]);

            return {
                success: true,
                message: 'Annonce créée avec succès.'
            };
        } catch (error) {
            console.error('Erreur lors de la création de l\'annonce :', error);
            return {
                success: false,
                message: 'Une erreur est survenue lors de la création de l\'annonce.'
            };
        }
    }
}

module.exports = AnnonceModel;
