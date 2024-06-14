// Api.dart

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:pfe_trial/Pages/user_page.dart';
import 'package:pfe_trial/Pages/home.dart';
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:pfe_trial/screens/error_screen.dart';
import 'package:pfe_trial/screens/success_screen.dart';
import 'package:pfe_trial/utils/constants.dart';
import 'package:pfe_trial/utils/utils.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Api {
  // Function to handle student sign-in
  void signInUser(
      {required BuildContext context,
      required String username,
      required String password}) async {
    try {
      // Obtain the UserProvider instance
      var userProvider = Provider.of<UserProvider>(context, listen: false);
      final navigator = Navigator.of(context);

      // Send a POST request to the login endpoint
      http.Response res = await http.post(
        Uri.parse('${Constants.uri}/login'), // Use the correct endpoint
        body: jsonEncode({
          'cin':
              password, // Ensure the field names match your backend expectations
          'adresseEmailAcademique': username,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      // Handle the HTTP response
      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            // Persist the token in shared preferences
            SharedPreferences prefs = await SharedPreferences.getInstance();
            userProvider.setToken(res.body);
            await prefs.setString(
                'x_auth_token', jsonDecode(res.body)['token']);
            // Navigate to the user page
            navigator.pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const Home()),
                (route) => false);
          });
    } catch (e) {
      // Show an error message in case of an exception
      showSnackBar(context, e.toString());
    }
  }

  void checkIn(
      {required BuildContext context,
      required String sessionId,
      required String cin}) async {
    try {
      final navigator = Navigator.of(context);

      http.Response res = await http.post(
        Uri.parse('${Constants.uri}/verify-attendance'),
        body: jsonEncode({
          'sessionId': sessionId,
          'studentId': cin,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            navigator.pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const SuccessScreen()),
                (route) => false);
          });
    } catch (e) {
      showSnackBar(context, e.toString());
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const ErrorScreen()),
          (route) => false);
    }
  }

  // Define the fetchStudentDetails method
  // fetchStudentDetails(cin, String token) {}

  // Define the fetchStudentDetails method
  Future<Map<String, dynamic>> fetchStudentDetails(
      String cin, String token) async {
    try {
      final response = await http.get(
        Uri.parse('${Constants.uri}/students/Cin/$cin'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization': 'Bearer $token',
        },
      );

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        if (data is List) {
          return data.isNotEmpty ? data[0] as Map<String, dynamic> : {};
        } else if (data is Map) {
          return data as Map<String, dynamic>;
        } else {
          throw Exception('Unexpected response format');
        }
      } else {
        throw Exception('Failed to fetch student details');
      }
    } catch (e) {
      throw Exception('Error fetching student details: $e');
    }
  }
}
