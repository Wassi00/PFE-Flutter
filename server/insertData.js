const AttendanceSession = require("./models/attendanceSession");
const StudentAttendance = require("./models/studentAttendance");
const Admin = require("./models/admin");
const Class = require("./models/class");
const ClassProfessor = require("./models/classProfessor");
const ClassStudent = require("./models/classStudent");
const Department = require("./models/department");
const Etudiant = require("./models/etudiant");
const Formation = require("./models/formation");
const Module = require("./models/module");
const Professeur = require("./models/professeur");
const sequelize = require("./config/database");

// Insert data
(async () => {
  const transaction = await sequelize.transaction();
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0;", { transaction });
    //  // Truncate tables to remove existing data
    // await sequelize.query('TRUNCATE TABLE admin;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    // await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });
    //  await sequelize.query('TRUNCATE TABLE student_attendance;', { transaction });

    // Insert data into Admin table
    // await Admin.bulkCreate([
    //   {
    //     Cin: "KL67890",
    //     poste: "Administrateur Système",
    //     emailAcademique: "admin@example.com",
    //     department: "Informatique",
    //   },
    //   {
    //     Cin: "MN78901",
    //     poste: "Responsable des Affaires Estudiantines",
    //     emailAcademique: "rae@example.com",
    //     specialite: "Gestion des étudiants",
    //   },
    //   {
    //     Cin: "OP89012",
    //     poste: "Responsable des Ressources Humaines",
    //     emailAcademique: "rrh@example.com",
    //     specialite: "Administration",
    //   },
    //   {
    //     Cin: "QR90123",
    //     poste: "Directeur des Études",
    //     emailAcademique: "directeur@example.com",
    //     specialite: "Gestion académique",
    //   },
    //   {
    //     Cin: "ST01234",
    //     poste: "Administrateur Réseau",
    //     emailAcademique: "adminreseau@example.com",
    //     specialite: "Réseaux et télécommunications",
    //   },
    // ]);

    // Insert data into AttendanceSession table
    await AttendanceSession.bulkCreate(
      [
        {
          id: 1,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527384329",
          createdAt: new Date("2024-06-04 18:56:24"),
          updatedAt: new Date("2024-06-04 18:56:24"),
        },
        {
          id: 2,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527472706",
          createdAt: new Date("2024-06-04 18:57:52"),
          updatedAt: new Date("2024-06-04 18:57:52"),
        },
        {
          id: 3,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527635284",
          createdAt: new Date("2024-06-04 19:00:35"),
          updatedAt: new Date("2024-06-04 19:00:35"),
        },
        {
          id: 4,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527806844",
          createdAt: new Date("2024-06-04 19:03:26"),
          updatedAt: new Date("2024-06-04 19:03:26"),
        },
        {
          id: 5,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527895942",
          createdAt: new Date("2024-06-04 19:04:55"),
          updatedAt: new Date("2024-06-04 19:04:55"),
        },
        {
          id: 6,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527928096",
          createdAt: new Date("2024-06-04 19:05:28"),
          updatedAt: new Date("2024-06-04 19:05:28"),
        },
        {
          id: 7,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527949925",
          createdAt: new Date("2024-06-04 19:05:49"),
          updatedAt: new Date("2024-06-04 19:05:49"),
        },
        {
          id: 8,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717527975068",
          createdAt: new Date("2024-06-04 19:06:15"),
          updatedAt: new Date("2024-06-04 19:06:15"),
        },
        {
          id: 9,
          classCode: "CP-B",
          professorCin: "667788990",
          moduleCode: "CIV101-M1",
          sessionId: "1717582136813",
          createdAt: new Date("2024-06-05 10:08:56"),
          updatedAt: new Date("2024-06-05 10:08:56"),
        },
        {
          id: 10,
          classCode: "CP-B",
          professorCin: "667788990",
          moduleCode: "CIV101-M1",
          sessionId: "1717843536119",
          createdAt: new Date("2024-06-08 10:45:37"),
          updatedAt: new Date("2024-06-08 10:45:37"),
        },
        {
          id: 11,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717937352778",
          createdAt: new Date("2024-06-09 12:49:12"),
          updatedAt: new Date("2024-06-09 12:49:12"),
        },
        {
          id: 12,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717970810355",
          createdAt: new Date("2024-06-09 22:06:50"),
          updatedAt: new Date("2024-06-09 22:06:50"),
        },
        {
          id: 13,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1717974237843",
          createdAt: new Date("2024-06-09 23:03:57"),
          updatedAt: new Date("2024-06-09 23:03:57"),
        },
        {
          id: 14,
          classCode: "Section A",
          professorCin: "987654321",
          moduleCode: "SGBD",
          sessionId: "1718038527277",
          createdAt: new Date("2024-06-10 16:55:27"),
          updatedAt: new Date("2024-06-10 16:55:27"),
        },
        {
          id: 15,
          classCode: "Section A",
          professorCin: "987654321",
          moduleCode: "SGBD",
          sessionId: "1718038659121",
          createdAt: new Date("2024-06-10 16:57:39"),
          updatedAt: new Date("2024-06-10 16:57:39"),
        },
        {
          id: 16,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1718039003326",
          createdAt: new Date("2024-06-10 17:03:23"),
          updatedAt: new Date("2024-06-10 17:03:23"),
        },
        {
          id: 17,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1718039194346",
          createdAt: new Date("2024-06-10 17:06:34"),
          updatedAt: new Date("2024-06-10 17:06:34"),
        },
        {
          id: 18,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1718110173150",
          createdAt: new Date("2024-06-11 12:49:33"),
          updatedAt: new Date("2024-06-11 12:49:33"),
        },
        {
          id: 19,
          classCode: "CP-A",
          professorCin: "123456789",
          moduleCode: "INF101-M2",
          sessionId: "1718319408241",
          createdAt: new Date("2024-06-13 22:56:48"),
          updatedAt: new Date("2024-06-13 22:56:48"),
        },
      ],
      { transaction }
    );

    // Insert data into Class table
    await Class.bulkCreate(
      [
        {
          code: "CP-A",
          name: "Class préparatoire section A",
          formationCode: "INF101",
        },
        {
          code: "CP-B",
          name: "Classe Préparatoire section B",
          formationCode: "CIV101",
        },
        {
          code: "Section A",
          name: "Licence info A",
          formationCode: "Lst INFO",
        },
      ],
      { transaction }
    );

    // Insert data into ClassProfessor table
    await ClassProfessor.bulkCreate(
      [
        {
          id: 49,
          classCode: "CP-A",
          moduleCode: "INF101-M1",
          professorCin: "987654321",
        },
        {
          id: 50,
          classCode: "CP-A",
          moduleCode: "INF101-M2",
          professorCin: "123456789",
        },
        {
          id: 60,
          classCode: "CP-B",
          moduleCode: "CIV101-M1",
          professorCin: "667788990",
        },
        {
          id: 61,
          classCode: "CP-B",
          moduleCode: "CIV101-M2",
          professorCin: "554433221",
        },
        {
          id: 62,
          classCode: "Section A",
          moduleCode: "SGBD",
          professorCin: "987654321",
        },
      ],
      { transaction }
    );

    // Insert data into ClassStudent table
    await ClassStudent.bulkCreate(
      [
        { id: 24, classCode: "CP-A", studentCin: "AB12345" },
        { id: 28, classCode: "CP-B", studentCin: "EF34567" },
      ],
      { transaction }
    );

    // Insert data into Department table
    await Department.bulkCreate(
      [
        { code: "BIO", intitule: "Biologie" },
        { code: "CHM", intitule: "Chimie" },
        { code: "CIV", intitule: "Civil" },
        { code: "ELC", intitule: "Électrique" },
        { code: "INF", intitule: "Informatique" },
        { code: "MEC", intitule: "Mécanique" },
        { code: "MTH", intitule: "Mathématiques" },
        { code: "PHY", intitule: "Physique" },
      ],
      { transaction }
    );

    // Insert data into Etudiant table
    await Etudiant.bulkCreate(
      [
        {
          Cin: "AB12345",
          Cne: "123456789",
          prenom: "Ahmed",
          nom: "Benbrahim",
          dateDeNaissance: "1995-05-15",
          lieuDeNaissance: "Casablanca",
          adresseEmailAcademique: "ahmed.benbrahim@uni.ac.ma",
          formationCode: "INF101",
          createdAt: "2024-06-01 10:45:13",
          updatedAt: "2024-06-03 08:48:59",
        },
        {
          Cin: "CD23456",
          Cne: "234567890",
          prenom: "Fatima",
          nom: "El Boujdaoui",
          dateDeNaissance: "1997-09-25",
          lieuDeNaissance: "Rabat",
          adresseEmailAcademique: "fatima.elboujdaoui@example.com",
          formationCode: "ELC101",
          createdAt: "2024-06-01 10:45:13",
          updatedAt: "2024-06-01 10:45:13",
        },
        {
          Cin: "EF34567",
          Cne: "345678901",
          prenom: "Mehdi",
          nom: "Kadiri",
          dateDeNaissance: "1996-07-08",
          lieuDeNaissance: "Tangier",
          adresseEmailAcademique: "mehdi.kadiri@example.com",
          formationCode: "CIV101",
          createdAt: "2024-06-01 10:45:13",
          updatedAt: "2024-06-01 10:45:13",
        },
        {
          Cin: "GH45678",
          Cne: "456789012",
          prenom: "Nadia",
          nom: "Saidi",
          dateDeNaissance: "1998-03-12",
          lieuDeNaissance: "Fes",
          adresseEmailAcademique: "nadia.saidi@example.com",
          formationCode: "INF101",
          createdAt: "2024-06-01 10:45:13",
          updatedAt: "2024-06-01 10:45:13",
        },
      ],
      { transaction }
    );

    // Insert data into Formation table
    await Formation.bulkCreate(
      [
        {
          Code: "CHM101",
          intitulé: "Introduction à la Chimie",
          department: "CHM",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "CIV101",
          intitulé: "Introduction au Génie Civil",
          departement: "CIV",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "ELC101",
          intitulé: "Introduction à l'Électrique",
          departement: "ELC",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "INF101",
          intitulé: "Introduction à l'Informatique",
          departement: "INF",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "INFO-M3",
          intitulé: "Master Informatique",
          departement: "INF",
          createdAt: "2024-06-01 18:13:15",
          updatedAt: "2024-06-13 22:39:55",
        },
        {
          Code: "Lst INFO",
          intitulé: "License informatique",
          departement: "INF",
          createdAt: "2024-06-10 16:41:24",
          updatedAt: "2024-06-10 16:41:24",
        },
        {
          Code: "MEC101",
          intitulé: "Introduction à la Mécanique",
          departement: "MEC",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "MTH101",
          intitulé: "Introduction aux Mathématiques",
          departement: "MTH",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
        {
          Code: "PHY101",
          intitulé: "Introduction à la Physique",
          departement: "PHY",
          createdAt: "2024-06-01 11:27:49",
          updatedAt: "2024-06-01 11:27:49",
        },
      ],
      { transaction }
    );

    // Insert data into Module table
    await Module.bulkCreate(
      [
        {
          code: "CHM101-M1",
          intitule: "Chimie organique",
          departement: "CHM",
          semester: "S1",
          formationCode: "CHM101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "CHM101-M2",
          intitule: "Chimie inorganique",
          departement: "CHM",
          semester: "S2",
          formationCode: "CHM101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "CIV101-M1",
          intitule: "Analyse structurale new",
          departement: "CIV",
          semester: "S1",
          formationCode: "CIV101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 19:00:01",
        },
        {
          code: "CIV101-M2",
          intitule: "Mécanique des fluides",
          departement: "CIV",
          semester: "S2",
          formationCode: "CIV101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "ELC101-M1",
          intitule: "Théorie des circuits",
          departement: "ELC",
          semester: "S1",
          formationCode: "ELC101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "ELC101-M2",
          intitule: "Électromagnétisme",
          departement: "ELC",
          semester: "S2",
          formationCode: "ELC101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "INF101-M1",
          intitule: "Programmation en C",
          departement: "INF",
          semester: "S1",
          formationCode: "INF101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 15:30:47",
        },
        {
          code: "INF101-M2",
          intitule: "Structures de données",
          departement: "INF",
          semester: "S2",
          formationCode: "INF101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "MEC101-M1",
          intitule: "Statique",
          departement: "MEC",
          semester: "S1",
          formationCode: "MEC101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "MEC101-M2",
          intitule: "Dynamique",
          departement: "MEC",
          semester: "S2",
          formationCode: "MEC101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "MTH101-M1",
          intitule: "Calcul I",
          departement: "MTH",
          semester: "S1",
          formationCode: "MTH101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "MTH101-M2",
          intitule: "Calcul II + stats",
          departement: "MTH",
          semester: "S5",
          formationCode: "MTH101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 18:36:16",
        },
        {
          code: "PHY101-M1",
          intitule: "Mécanique classique",
          departement: "PHY",
          semester: "S1",
          formationCode: "PHY101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "PHY101-M2",
          intitule: "Mécanique quantique",
          departement: "PHY",
          semester: "S2",
          formationCode: "PHY101",
          createdAt: "2024-06-01 11:30:00",
          updatedAt: "2024-06-01 11:30:00",
        },
        {
          code: "SGBD",
          intitule: "Système de gestion des bases de données",
          departement: "INF",
          semester: "S5",
          formationCode: "Lst INFO",
          createdAt: "2024-06-10 16:42:15",
          updatedAt: "2024-06-10 16:42:15",
        },
      ],
      { transaction }
    );

    // Insert data into Professeur table
    await Professeur.bulkCreate(
      [
        {
          Cin: "112233445",
          nom: "Ouazzani",
          prenom: "Mohamed",
          spécialité: "Systèmes de Puissance",
          departement: "ELC",
          date_de_naissance: "1975-03-25 00:00:00",
          lieu_de_naissance: "Marrakech",
          adresse_email_academique: "mohamed.ouazzani@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "123456789",
          nom: "El Amrani",
          prenom: "Ahmed",
          spécialité: "Algorithmes",
          departement: "INF",
          date_de_naissance: "1970-01-15 00:00:00",
          lieu_de_naissance: "Casablanca",
          adresse_email_academique: "ahmed.elamrani@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "443322110",
          nom: "El Idrissi",
          prenom: "Leila",
          spécialité: "Dynamique des Fluides",
          departement: "MEC",
          date_de_naissance: "1985-06-15 00:00:00",
          lieu_de_naissance: "Agadir",
          adresse_email_academique: "leila.elidrissi@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "554433221",
          nom: "El Youssoufi",
          prenom: "Sara",
          spécialité: "Génie Environnemental",
          departement: "CIV",
          date_de_naissance: "1981-08-25 00:00:00",
          lieu_de_naissance: "Meknès",
          adresse_email_academique: "sara.elyoussoufi@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "556677889",
          nom: "Alaoui",
          prenom: "Khadija",
          spécialité: "Systèmes de Contrôle",
          departement: "ELC",
          date_de_naissance: "1982-04-30 00:00:00",
          lieu_de_naissance: "Fès",
          adresse_email_academique: "khadija.alaoui@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "667788990",
          nom: "Fassi",
          prenom: "Omar",
          spécialité: "Génie Structurel",
          departement: "CIV",
          date_de_naissance: "1973-07-20 00:00:00",
          lieu_de_naissance: "Oujda",
          adresse_email_academique: "omar.fassi@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "776655443",
          nom: "Tazi",
          prenom: "Karim",
          spécialité: "Électronique",
          departement: "ELC",
          date_de_naissance: "1976-09-30 00:00:00",
          lieu_de_naissance: "Tétouan",
          adresse_email_academique: "karim.tazi@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "987654321",
          nom: "Benkirane",
          prenom: "Fatima",
          spécialité: "Apprentissage Automatique",
          departement: "INF",
          date_de_naissance: "1980-02-20 00:00:00",
          lieu_de_naissance: "Rabat",
          adresse_email_academique: "fatima.benkirane@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
        {
          Cin: "998877665",
          nom: "Hassani",
          prenom: "Reda",
          spécialité: "Thermodynamique",
          departement: "MEC",
          date_de_naissance: "1978-05-10 00:00:00",
          lieu_de_naissance: "Tanger",
          adresse_email_academique: "reda.hassani@univ.ma",
          diplome: "PhD",
          createdAt: "2024-06-01 11:32:16",
          updatedAt: "2024-06-01 11:32:16",
        },
      ],
      { transaction }
    );

    // Insert data into StudentAttendance table
    await StudentAttendance.bulkCreate(
      [
        {
          id: 1,
          sessionId: "1717527975068",
          studentId: "AB12345",
          verified: 0,
          createdAt: "2024-06-04 19:06:15",
          updatedAt: "2024-06-04 19:06:15",
        },
        {
          id: 2,
          sessionId: "1717582136813",
          studentId: "EF34567",
          verified: 1,
          createdAt: "2024-06-05 10:08:57",
          updatedAt: "2024-06-05 10:11:39",
        },
        {
          id: 3,
          sessionId: "1717843536119",
          studentId: "EF34567",
          verified: 1,
          createdAt: "2024-06-08 10:45:44",
          updatedAt: "2024-06-08 10:48:36",
        },
        {
          id: 4,
          sessionId: "1717937352778",
          studentId: "AB12345",
          verified: 0,
          createdAt: "2024-06-09 12:49:14",
          updatedAt: "2024-06-09 12:49:14",
        },
        {
          id: 5,
          sessionId: "1717970810355",
          studentId: "AB12345",
          verified: 0,
          createdAt: "2024-06-09 22:06:51",
          updatedAt: "2024-06-09 22:06:51",
        },
        {
          id: 6,
          sessionId: "1717974237843",
          studentId: "AB12345",
          verified: 0,
          createdAt: "2024-06-09 23:03:58",
          updatedAt: "2024-06-09 23:03:58",
        },
        {
          id: 9,
          sessionId: "1718039003326",
          studentId: "AB12345",
          verified: 1,
          createdAt: "2024-06-10 17:03:23",
          updatedAt: "2024-06-10 17:03:35",
        },
        {
          id: 10,
          sessionId: "1718039194346",
          studentId: "AB12345",
          verified: 0,
          createdAt: "2024-06-10 17:06:34",
          updatedAt: "2024-06-10 17:06:34",
        },
        {
          id: 11,
          sessionId: "1718110173150",
          studentId: "AB12345",
          verified: 1,
          createdAt: "2024-06-11 12:49:33",
          updatedAt: "2024-06-11 12:49:47",
        },
        {
          id: 12,
          sessionId: "1718319408241",
          studentId: "AB12345",
          verified: 1,
          createdAt: "2024-06-13 22:56:48",
          updatedAt: "2024-06-13 22:57:17",
        },
      ],
      { transaction }
    );

    await transaction.commit();

    console.log("Data inserted successfully.");
  } catch (error) {
    await transaction.rollback();
    console.error("Error inserting data:", error);
  } finally {
    // Ensure to close the connection after insertion
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1;");
    await sequelize.close();
  }
})();
