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

  // void getUser(BuildContext context) async {
  //   User? user = await Api.getLogin();
  //   Navigator.push(
  //       context,
  //       MaterialPageRoute(
  //         builder: (context) => UserPage(
  //           user: user,
  //         ),
  //       ));
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 50),

              // logo
              Image.asset(
                'assets/img/logo.jpeg',
                width: 100,
              ),

              const SizedBox(height: 50),

              // welcome back, you've been missed!
              Text(
                'Welcome back you\'ve been missed!',
                style: TextStyle(
                  color: Colors.grey[700],
                  fontSize: 16,
                ),
              ),

              const SizedBox(height: 25),

              // username textfield
              MyTextField(
                controller: usernameController,
                hintText: 'Username',
                obscureText: false,
              ),

              const SizedBox(height: 10),

              // password textfield
              MyTextField(
                controller: passwordController,
                hintText: 'Password',
                obscureText: true,
              ),

              const SizedBox(height: 10),

              // sign in button
              MyButton(onTap: () => signUserIn(context), text: "Sign In"),

              const SizedBox(height: 50),

              // MyButton(onTap: () => getUser(context), text: "Get user"),
            ],
          ),
        ),
      ),
    );
  }
}
