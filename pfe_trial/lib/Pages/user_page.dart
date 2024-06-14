import 'package:flutter/material.dart';
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:provider/provider.dart';
import 'package:pfe_trial/services/api.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class UserPage extends StatelessWidget {
  const UserPage({Key? key}) : super(key: key);

  Future<Map<String, dynamic>> fetchStudentDetails(BuildContext context) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final token = userProvider.token;

    // Decoding the token to get the CIN
    final payload = json.decode(
        ascii.decode(base64.decode(base64.normalize(token!.split(".")[1]))));
    final cin = payload['id'];

    final Api api = Api();
    return await api.fetchStudentDetails(cin, token);
  }

  void logout(BuildContext context) {
    // Access the UserProvider and delete the token
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    userProvider.setToken("");

    // Navigate to the login page
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Image.asset(
              'assets/img/logo.png',
              width: 50,
              height: 50,
            ),
            const Text(
              "Informations de l'utilisateur",
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
              onPressed: () => Navigator.pushNamed(context, '/home'),
              icon: const Icon(Icons.home))
        ],
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: fetchStudentDetails(context),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text('No student details found'));
          } else {
            final user = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      color: Colors.blue[100],
                      elevation: 4.0,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'CIN: ${user['Cin']}',
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'Nom: ${user['nom']}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'Prénom: ${user['prenom']}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              'CNE: ${user['Cne']}',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    Card(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      color: Colors.blue[100],
                      elevation: 4.0,
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              'Formation suivie',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              user['formationCode'] ?? '',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 20),
                            const Text(
                              'Email Académique',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              user['adresseEmailAcademique'] ?? '',
                              style: const TextStyle(
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () => logout(context),
                      style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.blue[100]),
                      child: const Padding(
                        padding: EdgeInsets.all(16.0),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Icon(Icons.logout_outlined),
                            Text('Déconnexion'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }
        },
      ),
    );
  }
}
