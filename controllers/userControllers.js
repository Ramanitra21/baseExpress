const UserModel = require('../models/UserModels');

const userModel = new UserModel;

exports.createUser = async (req, res) => {
    try {
       const {nom, prenom, email, mot_de_passe} = req.body
       if(!nom || !prenom || !email || !mot_de_passe){
        res.json({
            message : 'Donnée incomplet'
        })
       }
       const result = await userModel.createUser(nom, prenom, email, mot_de_passe);
       if(result.success === true){
        res.json({
            message : "Utilisateur cree avec succer"
        })
       }else{
        res.json({
            message : "Erreur lors de la creation utilisateur"
        })
       }
    } catch (error) {
        console.error(error);
    }
};


exports.getUsers = async (req, res) => {
    try {
       const result = await userModel.getUser();
       if(result.success === true){
        res.json({
            users : result.result
        })
       }else{
        res.json({
            message : result.message
        })
       }
    } catch (error) {
        console.error(error);
    }
};