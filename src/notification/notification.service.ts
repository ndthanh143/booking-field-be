import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/services/base.service';
import { Repository } from 'typeorm';
import { GetNotificationsQuery } from './dtos/notification-query.dto';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService extends BaseService<Notification, unknown> {
  constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>) {
    super(notificationRepository);
  }

  findAllNotifications(query: GetNotificationsQuery, userId: number) {
    return this.findAndCount(query, {
      where: {
        ...(userId && {
          user: {
            id: userId,
          },
        }),
      },
    });
  }

  findById(id: number) {
    return this.findOne({
      where: {
        id,
      },
    });
  }
}
