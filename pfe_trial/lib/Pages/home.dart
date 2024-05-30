import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Home"),
        centerTitle: true,
        automaticallyImplyLeading: false,
      ),
      body: SafeArea(
        child: Card(
          margin: const EdgeInsets.only(top: 30.0),
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Icon(Icons.new_label_rounded),
                const Text("7issa jdida bb"),
                ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, "/qr"),
                    child: const Text("scan code"))
              ],
            ),
          ),
        ),
      ),
    );
  }
}
