const db = require('../config/db')
class UserModel {
    async createUser(nom, prenom, email, mot_de_passe){
        try {
            const result = await db.execute('INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)', [nom, prenom, email, mot_de_passe]);
            if (typeof result === 'object' && result !== null) {
                return ({
                    success : true,
                    message: 'Utilisateur créé avec succès.'
                })
            } else {
                console.error('Erreur lors de l\'exécution de la requête SQL pour créer l\'utilisateur. Résultat inattendu :', result);
                return { success: false, message: 'Erreur lors de la création de l\'utilisateur.' };
            }
        } catch (error) {
            
        }
    }

    async getUser(){
        try {
            const result = await db.execute('SELECT * FROM utilisateurs');
            if(result.length >= 1){
                return {
                    success : true,
                    result
                }
            }else{
                return {
                    success : false,
                    message: 'Utilisateur créé avec succès.'
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

}

module.exports = UserModel
