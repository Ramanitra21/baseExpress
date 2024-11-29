const AnnonceModel = require('../models/AnnonceModel');

const annonceModel = new AnnonceModel;

exports.createAnnonces = async (req, res) => {
    try {
       const {lieu_depart, lieu_arrivee, date_transport, poids_disponible, tarif_par_kilo} = req.body
       const {id_utilisateur} = req.params
       if(!lieu_depart || !lieu_arrivee || !date_transport || !poids_disponible  || !tarif_par_kilo  || !id_utilisateur){
        res.json({
            message : 'Donnée incomplet'
        })
       }
       const result = await annonceModel.createAnnonces(id_utilisateur, lieu_depart, lieu_arrivee, date_transport, poids_disponible, tarif_par_kilo);
       if(result.success === true){
        res.json({
            message : "Annonces cree avec succer"
        })
       }else{
        res.json({
            message : "Erreur lors de la creation de l'annonce",
            error : result.message
        })
       }
    } catch (error) {
        console.error(error);
    }
};