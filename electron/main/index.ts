import { electronAppInit } from "./window";
import { setupEiocInstance } from "./server";

async function bootstrap() {
  electronAppInit();
  await setupEiocInstance();
}
bootstrap();
