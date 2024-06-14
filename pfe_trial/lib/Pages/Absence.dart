import 'package:flutter/material.dart';

class AbsencePage extends StatelessWidget {
  final List<dynamic>? absenceRecords; // Make the absenceRecords nullable

  const AbsencePage({Key? key, required this.absenceRecords}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Absences'),
      ),
      body: absenceRecords == null // Check if absenceRecords is null
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : absenceRecords!.isEmpty // Check if absenceRecords list is empty
              ? const Center(
                  child: Text('Aucune Abscence notée.'),
                )
              : ListView.builder(
                  itemCount: absenceRecords!.length,
                  itemBuilder: (context, index) {
                    // Extract absence record details
                    final record = absenceRecords![index];
                    final moduleCode = record['moduleCode'] ?? 'Unknown';
                    final sessionId = record['sessionId'] ?? 'Unknown';
                    final professor = record['Professeur'] ?? 'Unknown';
                    final time =
                        record['createdAt'].toString().substring(0, 10) ??
                            'Unknown';

                    return Card(
                      margin: const EdgeInsets.symmetric(
                          vertical: 8.0, horizontal: 16.0),
                      elevation: 4.0,
                      color: Colors.blue[100],
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Module: $moduleCode',
                                style: const TextStyle(
                                  fontSize: 18.0,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8.0),
                              Text(
                                'Session ID: $sessionId',
                                style: const TextStyle(
                                  fontSize: 16.0,
                                ),
                              ),
                              const SizedBox(height: 4.0),
                              Text(
                                'Professeur: $professor',
                                style: const TextStyle(
                                  fontSize: 16.0,
                                ),
                              ),
                              const SizedBox(height: 4.0),
                              Text(
                                'Date: $time',
                                style: const TextStyle(
                                  fontSize: 16.0,
                                ),
                              ),
                            ]),
                      ),
                    );
                  },
                ),
    );
  }
}
