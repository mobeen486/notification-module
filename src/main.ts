import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeApp } from "firebase/app";


async function bootstrap() {
  const firebaseConfig = {
    apiKey: 'AIzaSyCjoK3fRvnFpV9XsasJObTEqz7AC2fwck8',
    authDomain: 'persib-notification.firebaseapp.com',
    projectId: 'persib-notification',
    storageBucket: 'persib-notification.appspot.com',
    messagingSenderId: '584751728916',
    appId: '1:584751728916:web:e35b9304d2ad7a7cd01a01',
    measurementId: 'G-MM2C1B328B',
  };

  const app2 = initializeApp(firebaseConfig);
  // console.log(app2);
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
