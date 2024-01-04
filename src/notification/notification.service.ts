import { Injectable } from '@nestjs/common';
import * as Firebase from 'firebase-admin';
import { FirebaseService } from '@server/firebase/firebase.service';
import { UserDeviceService } from '@server/user/user_device/user-device.service';
import { UserRole } from '@server/auth/enums/user-role.enum';
import { NotificationChannelService } from '@server/notification/channel/notification_channel.service';

@Injectable()
export class NotificationService {
  private firebase: Firebase.app.App;

  constructor(
    firebaseService: FirebaseService,
    protected userDeviceService: UserDeviceService,
    protected channels: NotificationChannelService,
  ) {
    this.firebase = firebaseService.app;
  }
  async test() {
    const userTokens = await this.userDeviceService.findByRole(UserRole.USER);
    const channels = await this.channels.findByRole(UserRole.USER);
    await this.firebase.messaging().sendEachForMulticast({
      notification: { title: 'Test', body: 'This is a test notification' },
      data: { channel: JSON.stringify(channels[0]) },
      tokens: userTokens.map(userToken => userToken.fcmToken),
    });
  }
}
