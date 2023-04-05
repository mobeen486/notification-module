import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../models/notifications/create-notification.dto';
import { Repository } from 'typeorm';
import admin = require('firebase-admin');
import { Notification } from '../models/notifications/notification.entity';
import { UpdateNotificationDto } from '../models/notifications/update-notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  @Post()
  async create(@Body() notification: CreateNotificationDto) {
    const savedNotification = await this.notificationRepository.save(
      notification,
    );

    // Send notification to Firebase
    await admin.messaging().send({
      notification: {
        title: savedNotification.title,
        body: savedNotification.body,
      },
      topic: `user-${savedNotification.userId}`,
    });

    return savedNotification;
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
