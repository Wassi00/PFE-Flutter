import 'package:flutter/material.dart';
import 'package:pfe_trial/Services/Api.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:http/http.dart' as http;

class QRScannerPage extends StatefulWidget {
  @override
  _QRScannerPageState createState() => _QRScannerPageState();
}

class _QRScannerPageState extends State<QRScannerPage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  late QRViewController controller;
  late String scannedData = '';
  bool isCameraOpen = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: const Text('QR Scanner'),
          actions: [
            IconButton(
                onPressed: () => Navigator.pushNamed(context, '/user'),
                icon: const Icon(Icons.person_3_rounded))
          ],
          automaticallyImplyLeading: false),
      body: Column(
        children: <Widget>[
          if (isCameraOpen)
            Expanded(
              flex: 4,
              child: QRView(
                key: qrKey,
                onQRViewCreated: _onQRViewCreated,
              ),
            ),
          Expanded(
            flex: 1,
            child: Center(
              child: Text('Scanned Data: $scannedData'),
            ),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                isCameraOpen = !isCameraOpen;
              });
            },
            child: Text(isCameraOpen ? 'Close Scanner' : 'Open Scanner'),
          ),
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) async {
      setState(() {
        scannedData = scanData.code!;
      });
      // Send scanned data to your server
      await sendScannedData(scannedData);
    });
  }

  Future<void> sendScannedData(String data) async {
    try {
      // Replace 'your-server-url' with your actual server URL
      final verif = Api();

      verif.checkIn(context: context, username: "wass", password: "wass");
    } catch (error) {
      // Handle network or other errors
      print('Error sending scanned data: $error');
    }
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
