import { http, HttpResponse } from 'msw';

import { Event } from '../types';
import { events } from './response/events.json' assert { type: 'json' };

// ! HARD
// ! 각 응답에 대한 MSW 핸들러를 작성해주세요. GET 요청은 이미 작성되어 있는 events json을 활용해주세요.
export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json({ events });
  }),

  http.post('/api/events', async ({ request }) => {
    const newEvent = (await request.json()) as Event;
    return HttpResponse.json(
      {
        ...newEvent,
        id: newEvent.id + 1,
      },
      { status: 201 }
    );
  }),

  http.put('/api/events/:id', async ({ params, request }) => {
    const { id } = params;
    const updatedEvent = (await request.json()) as Event;

    const updatedEventId = events.findIndex((event) => event.id === id);

    if (updatedEventId === -1) {
      return HttpResponse.json({ message: '이벤트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return HttpResponse.json({
      ...events[updatedEventId],
      ...updatedEvent,
    });
  }),

  http.delete('/api/events/:id', ({ params }) => {
    const { id } = params;
    const deletedEventId = events.findIndex((event) => event.id === id);

    if (deletedEventId === -1) {
      return HttpResponse.json({ message: '이벤트를 찾을 수 없습니다.' }, { status: 404 });
    }

    return HttpResponse.json({ status: 204 });
  }),
];
