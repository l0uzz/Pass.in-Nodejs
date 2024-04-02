import fastify from "fastify";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const app = fastify();

const prima = new PrismaClient({
  log: ['query'],
});

// API REST

app.get('/', () => {
  
})

app.post('/events', async (request , reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable() ,
    maximumAttendees: z.number().int().positive().nullable(),
  })
  const data = createEventSchema.parse(request.body)

 const event = await prima.event.create({
    data: { 
      title: data.title,
      details: data.details,
      maximumAttendees: data.maximumAttendees, 
      slug: new Date().toISOString(), 
    },
  })

  return reply.status(201).send({eventId: event.id})
})

app.put('/', () => {
  
})

app.delete('/', () => {
  
})

app.listen({port: 3333}).then(() => {
  console.log("HTTP SERVER RUNNING!")
})