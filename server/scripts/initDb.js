const sequelize = require('../config/database');
const Professeur = require('../models/professeur');
const Etudiant = require('../models/etudiant');
const Formation = require('../models/formation');
const Module = require('../models/Module');

const initDatabase = async () => {
  await sequelize.sync({ force: true });

  const formations = [
    { Code: 'F001', intitule: 'Génie Informatique', departement: 'Informatique' },
    { Code: 'F002', intitule: 'Génie Mécanique', departement: 'Mécanique' },
  ];

  const modules = [
    { code: 'M001', formationCode: 'F001', intitule: 'Programmation', departement: 'Informatique' },
    { code: 'M002', formationCode: 'F001', intitule: 'Bases de Données', departement: 'Informatique' },
    { code: 'M003', formationCode: 'F002', intitule: 'Thermodynamique', departement: 'Mécanique' },
    { code: 'M004', formationCode: 'F002', intitule: 'Mécanique des Fluides', departement: 'Mécanique' },
  ];

  const professeurs = [
    {
      Cin: 'P001',
      nom: 'El Idrissi',
      prenom: 'Ahmed',
      specialite: 'Intelligence Artificielle',
      departement: 'Informatique',
      dateDeNaissance: '1975-01-01',
      lieuDeNaissance: 'Casablanca',
      adresseEmailAcademique: 'ahmed.elidrissi@univ.ac.ma',
      diplome: 'Doctorat en Informatique',
      specialite: 'Intelligence Artificielle',
    },
    {
      Cin: 'P002',
      nom: 'Bennani',
      prenom: 'Fatima',
      specialite: 'Mécanique des Fluides',
      departement: 'Mécanique',
      dateDeNaissance: '1980-02-15',
      lieuDeNaissance: 'Rabat',
      adresseEmailAcademique: 'fatima.bennani@univ.ac.ma',
      diplome: 'Doctorat en Mécanique',
      specialite: 'Mécanique des Fluides',
    },
  ];

  const etudiants = [
    {
      Cin: 'E001',
      Cne: 'CNE001',
      nom: 'Amrani',
      prenom: 'Youssef',
      dateDeNaissance: '1995-05-20',
      lieuDeNaissance: 'Marrakech',
      adresseEmailAcademique: 'youssef.amrani@etu.ac.ma',
      formationCode: 'F001',
    },
    {
      Cin: 'E002',
      Cne: 'CNE002',
      nom: 'Belkacem',
      prenom: 'Sara',
      dateDeNaissance: '1996-07-25',
      lieuDeNaissance: 'Fès',
      adresseEmailAcademique: 'sara.belkacem@etu.ac.ma',
      formationCode: 'F002',
    },
  ];

  await Formation.bulkCreate(formations);
  await Module.bulkCreate(modules);
  await Professeur.bulkCreate(professeurs);
  await Etudiant.bulkCreate(etudiants);

  console.log('Database initialized with sample data');
  process.exit();
};

initDatabase().catch(error => {
  console.error('Error initializing database:', error);
  process.exit(1);
});
