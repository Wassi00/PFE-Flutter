// login.dart

import 'package:flutter/material.dart';
import 'package:pfe_trial/Components/button.dart';
import 'package:pfe_trial/Components/text_field.dart';
import 'package:pfe_trial/services/api.dart';

class Login extends StatelessWidget {
  Login({super.key});

  // text editing controllers
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  final Api authentication = Api();

  // sign user in method
  void signUserIn(context) {
    authentication.signInUser(
        context: context,
        username: usernameController.text,
        password: passwordController.text);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              const SizedBox(height: 50),

              // logo
              Image.asset(
                'assets/img/logo.png',
                width: 200,
                height: 200,
              ),

              const SizedBox(height: 25),

              // username textfield
              MyTextField(
                controller: usernameController,
                hintText: 'Email Academique',
                obscureText: false,
              ),

              const SizedBox(height: 10),

              // password textfield
              MyTextField(
                controller: passwordController,
                hintText: 'Cin',
                obscureText: false,
              ),

              const SizedBox(height: 10),

              // sign in button
              MyButton(onTap: () => signUserIn(context), text: "Login"),
            ],
          ),
        ),
      ),
      resizeToAvoidBottomInset: false,
    );
  }
}
