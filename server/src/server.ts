import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { hourStringToMinutes } from './parser/hour-string-to-minutes';
import { minutesToHourString } from './parser/minutes-to-hour-string';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  log: ['query']
});


//app.use(express.urlencoded({ extended: true }));

// HTTP methods / API RESTful / HTTP Codes

app.get('/', (_request, response) => {
  return response.send('NAOOOOO oi ola expo!!!');
});

app.get('/games', async (_request, response) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    });

    return response.json(games);
  } catch {
    return response.status(500).json({ msg: 'erro' })
  }
});

app.post('/games/:id/ads', async (request, response) => {
  const {
    gameId,
    name,
    yearsPlaying,
    discord,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = request.body;
  const { id } = request.params;

  try {
    const ad = await prisma.ad.create({
      data: {
        gameId: id,
        name,
        yearsPlaying,
        discord,
        weekDays: weekDays.join(','),
        hourStart: hourStringToMinutes(hourStart),
        hourEnd: hourStringToMinutes(hourEnd),
        useVoiceChannel,
      }
    })

    return response.status(201).json(ad);
  } catch {
    return response.status(500).json({ msg: 'erro' })
  }
});

app.get('/games/:id/ads', async (request, response) => {
  const { id } = request.params;

  try {
    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
        createdAt: true,
      },
      where: {
        gameId: id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return response.json(ads.map(ad => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: minutesToHourString(ad.hourStart),
      hourEnd: minutesToHourString(ad.hourEnd),
    })))
  } catch {
    return response.status(500).json({ msg: 'erro' })
  }
})


app.get('/games/:id/discord', async (request, response) => {
  const { id } = request.params;

  try {
    const ad = await prisma.ad.findUniqueOrThrow({
      select: {
        discord: true,
      },
      where: {
        id
      }
    })
    return response.json({ discord: ad.discord })
  } catch {
    return response.status(500).json({ msg: 'erro' })
  }
})

app.listen(3333);

