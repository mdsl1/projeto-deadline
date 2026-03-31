db = db.getSiblingDB("deadline_db");

db.createCollection("atividades");
db.createCollection("disciplinas");

console.log("Banco de dados inicializado com sucesso!");