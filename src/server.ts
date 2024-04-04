import fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { PrismaClient } from "@prisma/client";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeBadge } from "./routes/get-attendee-badge";
import { createCheckIn } from "./routes/check-in";


const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient({
  log: ['query'],
});

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeBadge)
app.register(createCheckIn)

app.listen({port: 3333}).then(() => {
  console.log("HTTP SERVER RUNNING!")
})