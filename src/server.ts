import { createApp } from "./app";
import { env } from "./env";

createApp().listen(env.PORT, () => {
  console.log(`seaps-reports em http://localhost:${env.PORT}`);
});
