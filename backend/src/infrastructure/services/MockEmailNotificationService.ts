import { INotificationService, NotificationPayload } from "../../domain/services/INotificationService";

export class MockEmailNotificationService implements INotificationService {
  async sendNotification(payload: NotificationPayload): Promise<void> {
    console.log("--------------------------------------------------");
    console.log("📧 [MOCK EMAIL SERVICE] Enviando notificación...");
    console.log(`📩 Para: ${payload.to}`);
    console.log(`📌 Asunto: ${payload.subject}`);
    console.log(`📝 Mensaje: ${payload.message}`);
    console.log("--------------------------------------------------");
  }
}