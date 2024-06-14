import 'package:flutter/material.dart';

class UserProvider extends ChangeNotifier {
  String? _token;

  String? get token => _token;

  // Method to set the token
  void setToken(String token) {
    _token = token;
    notifyListeners();
  }

  // Method to clear the token (e.g., on logout)
  void clearToken() {
    _token = null;
    notifyListeners();
  }
}
