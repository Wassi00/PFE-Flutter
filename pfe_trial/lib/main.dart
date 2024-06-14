import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:pfe_trial/Pages/home.dart';
import 'package:pfe_trial/Pages/login.dart';
import 'package:pfe_trial/Pages/qr_scanner.dart';
import 'package:pfe_trial/Pages/user_page.dart';
import 'package:pfe_trial/Pages/Absence.dart';
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:provider/provider.dart';

void main() async {
  try {
    await dotenv.load(fileName: ".env");
  } catch (e) {
    print("Error loading .env file: $e");
  }

  runApp(MultiProvider(
    providers: [ChangeNotifierProvider(create: (_) => UserProvider())],
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.blue),
      home: Login(),
      routes: {
        '/home': (context) => const Home(),
        '/user': (context) => const UserPage(),
        '/login': (context) => Login(),
        '/qr': (context) {
          final args = ModalRoute.of(context)!.settings.arguments
              as Map<String, dynamic>;
          return QRScannerPage(
            sessionId: args['sessionId'],
            cin: args['cin'],
          );
        },
        '/absences': (context) => AbsencePage(
              absenceRecords:
                  ModalRoute.of(context)!.settings.arguments as List<dynamic>,
            ),
      },
    );
  }
}
