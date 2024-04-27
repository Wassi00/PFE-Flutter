import 'package:flutter/material.dart';
import 'package:qr_code_scanner/qr_code_scanner.dart';
import 'package:http/http.dart' as http;

class QRScannerPage extends StatefulWidget {
  @override
  _QRScannerPageState createState() => _QRScannerPageState();
}

class _QRScannerPageState extends State<QRScannerPage> {
  final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
  late QRViewController controller;
  String scannedData = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('QR Scanner'),
      ),
      body: Column(
        children: <Widget>[
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
        ],
      ),
    );
  }

  void _onQRViewCreated(QRViewController controller) {
    this.controller = controller;
    controller.scannedDataStream.listen((scanData) async {
      setState(() {
        scannedData = scanData.code ?? 'No data found'; // Handling null case
      });
      // Send scanned data to your server
      // await sendScannedData(scannedData);
      print(scannedData);
    });
  }

  Future<void> sendScannedData(String data) async {
    try {
      // Replace 'your-server-url' with your actual server URL
      final response = await http.post(
        Uri.parse('http://your-server-url/scan'),
        body: {'data': data},
      );
      if (response.statusCode == 200) {
        // Scanned data sent successfully
        print('Scanned data sent successfully');
      } else {
        // Handle error
        print('Failed to send scanned data: ${response.statusCode}');
      }
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
