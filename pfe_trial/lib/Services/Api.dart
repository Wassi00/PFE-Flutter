import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:pfe_trial/Pages/userPage.dart';
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:pfe_trial/utils/constants.dart';
import 'package:pfe_trial/utils/utils.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Api {
  void signInUser(
      {required BuildContext context,
      required String username,
      required String password}) async {
    try {
      var userProvider = Provider.of<UserProvider>(context, listen: false);
      final navigator = Navigator.of(context);

      http.Response res = await http.post(
        Uri.parse('${Constants.uri}/login'),
        body: jsonEncode({
          'username': username,
          'password': password,
        }),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      httpErrorHandle(
          response: res,
          context: context,
          onSuccess: () async {
            SharedPreferences prefs = await SharedPreferences.getInstance();
            userProvider.setUser(res.body);
            await prefs.setString(
                'x_auth_token', jsonDecode(res.body)['token']);
            navigator.pushAndRemoveUntil(
                MaterialPageRoute(builder: (context) => const UserPage()),
                (route) => false);
          });
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
