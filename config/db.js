const { Sequelize } =require('sequelize')
const db = {};
// selectionner la base de donnée à utiliser
const sequelize = new Sequelize("project_bdd","root",process.env.PMYSQL,{
    dialect: "mysql",
    host:"localhost",
    
});


module.exports = sequelize,db