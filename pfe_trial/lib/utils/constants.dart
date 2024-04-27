import 'package:flutter_dotenv/flutter_dotenv.dart';

class Constants {
  static String uri = dotenv.env['ENDPOINT']!;
}
