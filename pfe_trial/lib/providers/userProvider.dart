import 'package:flutter/material.dart';
import 'package:pfe_trial/Models/userModel.dart';

class UserProvider extends ChangeNotifier {
  User _user = User(id: '', username: '', password: '', token: '');

  User get user => _user;

  void setUser(String user) {
    _user = User.fromJson(user);
    notifyListeners();
  }

  void setUserFromModel(User user) {
    _user = user;
    notifyListeners();
  }
}
