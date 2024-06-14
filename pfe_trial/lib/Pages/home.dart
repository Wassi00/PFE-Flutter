import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:provider/provider.dart';
import 'package:pfe_trial/Pages/Absence.dart';
import 'package:pfe_trial/utils/constants.dart';
import 'package:pfe_trial/utils/utils.dart';
import 'dart:convert';

class Home extends StatefulWidget {
  const Home({Key? key}) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  List<dynamic> attendanceSessions = [];
  List<dynamic> absenceRecords = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    // Fetch attendance sessions when the widget initializes
    fetchAttendanceSessions();
    // Fetch absences records
    fetchAbsenceRecords();
  }

  // Function to fetch attendance sessions from the database
  Future<void> fetchAttendanceSessions() async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final token = userProvider.token;

    if (token == null) {
      print('Token is null');
      return;
    }

    // Decoding the token
    final payload = json.decode(
        ascii.decode(base64.decode(base64.normalize(token.split(".")[1]))));

    // Extract student information from the payload
    final user = {
      'Cin': payload['id'],
      // Add more fields as needed
    };

    if (user['Cin'] == null) {
      print('User CIN is null');
      return;
    }

    try {
      final response = await http.post(
        Uri.parse('${Constants.uri}/attendance-sessions'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode({'cin': user['Cin']}),
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        setState(() {
          attendanceSessions = responseData['attendanceSessions'] ?? [];
          isLoading = false;
        });

        fetchAbsenceRecords();
      } else {
        print('Failed to fetch attendance sessions: ${response.statusCode}');
        showSnackBar(context, 'Failed to fetch attendance sessions');
      }
    } catch (error) {
      print('Error fetching attendance sessions: $error');
      showSnackBar(context, error.toString());
    }
  }

  // Function to fetch absence records from the database
  Future<void> fetchAbsenceRecords() async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final token = userProvider.token;

    if (token == null) {
      print('Token is null');
      return;
    }

    // Decoding the token
    final payload = json.decode(
        ascii.decode(base64.decode(base64.normalize(token.split(".")[1]))));

    // Extract student information from the payload
    final user = {
      'Cin': payload['id'],
      // Add more fields as needed
    };

    if (user['Cin'] == null) {
      print('User CIN is null');
      return;
    }

    try {
      final response = await http.get(
        Uri.parse('${Constants.uri}/absences/${user['Cin']}'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final responseData = json.decode(response.body);
        setState(() {
          absenceRecords = responseData;
        });
        print(absenceRecords);
      } else {
        print('Failed to fetch absence records: ${response.statusCode}');
        showSnackBar(context, 'Failed to fetch absence records');
      }
    } catch (error) {
      print('Error fetching absence records: $error');
      showSnackBar(context, error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    final token = userProvider.token;

    final payload = json.decode(
        ascii.decode(base64.decode(base64.normalize(token!.split(".")[1]))));

    final user = {
      'Cin': payload['id'],
    };

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
            const Text("Accueil"),
          ],
        ),
        centerTitle: true,
        automaticallyImplyLeading: false,
        actions: [
          IconButton(
            onPressed: fetchAttendanceSessions,
            icon: const Icon(Icons.refresh),
          ),
          IconButton(
            onPressed: () => Navigator.pushNamed(context, '/user'),
            icon: const Icon(Icons.person),
          ),
        ],
      ),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : SafeArea(
              child: Column(
                children: [
                  Expanded(
                    flex: 7,
                    child: attendanceSessions.isEmpty
                        ? Center(
                            child: Card(
                              margin: const EdgeInsets.symmetric(
                                  vertical: 8.0, horizontal: 16.0),
                              color: Colors.blue[100],
                              elevation: 4.0,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: const Padding(
                                padding: EdgeInsets.all(16.0),
                                child: Text(
                                  'Pas de session de présence disponible!',
                                  style: TextStyle(
                                    fontSize: 18.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          )
                        : ListView.builder(
                            itemCount: attendanceSessions.length,
                            itemBuilder: (context, index) {
                              final session = attendanceSessions[index];
                              final sessionTitle =
                                  session['moduleCode'] ?? 'No Title';
                              final sessionId = session['sessionId'] ?? 'No ID';

                              return Card(
                                margin: const EdgeInsets.symmetric(
                                    vertical: 10, horizontal: 20),
                                color: Colors.blue[100],
                                child: Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      const Icon(Icons.new_label),
                                      Text(sessionTitle),
                                      ElevatedButton(
                                        onPressed: () => Navigator.pushNamed(
                                          context,
                                          '/qr',
                                          arguments: {
                                            'sessionId': sessionId,
                                            'cin': user['Cin'],
                                          },
                                        ),
                                        child: const Text("Scanner le Code"),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                  ),
                  Expanded(
                    flex: 3,
                    child: Column(
                      children: [
                        Text(
                          'Nombre des Absences: ${absenceRecords.length}',
                          style: const TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(
                            height:
                                20), // Adjust the space between the count and the button
                        ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => AbsencePage(
                                      absenceRecords: absenceRecords),
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blue[100]),
                            child: const Padding(
                              padding: EdgeInsets.all(16.0),
                              child: Text('Visualiser les Absences'),
                            )),
                      ],
                    ),
                  ),
                ],
              ),
            ),
    );
  }
}
