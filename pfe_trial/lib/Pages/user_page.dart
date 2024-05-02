import 'package:flutter/material.dart';
import 'package:pfe_trial/providers/userProvider.dart';
import 'package:provider/provider.dart';

class UserPage extends StatelessWidget {
  const UserPage({super.key});

  @override
  Widget build(BuildContext context) {
    final user = Provider.of<UserProvider>(context).user;
    return Scaffold(
      appBar: AppBar(
        title: const Text("User Data"),
        centerTitle: true,
        leading: IconButton(
          onPressed: () => Navigator.pushNamed(context, '/home'),
          icon: const Icon(Icons.home_filled),
        ),
      ),
      body: SafeArea(
          child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              user.username ?? 'Username not available',
              style: const TextStyle(fontSize: 18),
            ),
            Text(
              user.password ?? 'Password not available',
              style: const TextStyle(fontSize: 18),
            ),
          ],
        ),
      )),
    );
  }
}
