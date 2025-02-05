import { Event } from '../../types';
import { createNotificationMessage, getUpcomingEvents } from '../../utils/notificationUtils';

describe('getUpcomingEvents', () => {
  it('알림 시간이 정확히 도래한 이벤트를 반환한다', () => {
    const currentDate = new Date('2025-02-05T08:55:00');
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2025-02-05',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 1',
        location: 'Test Location 1',
        category: 'Test Category 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2025-02-05',
        startTime: '09:30',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, currentDate, notifiedEvents);
    expect(upcomingEvents).toEqual([events[0]]);
  });

  it('이미 알림이 간 이벤트는 제외한다', () => {
    const currentDate = new Date('2025-02-05T08:55:00');
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2025-02-04',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 1',
        location: 'Test Location 1',
        category: 'Test Category 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2025-02-05',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, currentDate, notifiedEvents);
    expect(upcomingEvents).toEqual([events[1]]);
  });

  it('알림 시간이 아직 도래하지 않은 이벤트는 반환하지 않는다', () => {
    const currentDate = new Date('2025-02-05T08:55:00');
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2025-02-04',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 1',
        location: 'Test Location 1',
        category: 'Test Category 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2025-02-05',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, currentDate, notifiedEvents);
    expect(upcomingEvents).toEqual([events[1]]);
  });

  it('알림 시간이 지난 이벤트는 반환하지 않는다', () => {
    const currentDate = new Date('2025-02-05T09:00:00');
    const events: Event[] = [
      {
        id: '1',
        title: 'Test Event 1',
        date: '2025-02-04',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 1',
        location: 'Test Location 1',
        category: 'Test Category 1',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
      {
        id: '2',
        title: 'Test Event 2',
        date: '2025-02-05',
        startTime: '09:10',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const notifiedEvents: string[] = [];
    const upcomingEvents = getUpcomingEvents(events, currentDate, notifiedEvents);
    expect(upcomingEvents).toEqual([events[1]]);
  });
});

describe('createNotificationMessage', () => {
  it('올바른 알림 메시지를 생성해야 한다', () => {
    const event: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2025-02-05',
      startTime: '09:00',
      endTime: '10:00',
      description: 'Test Description 1',
      location: 'Test Location 1',
      category: 'Test Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 10,
    };
    const result = createNotificationMessage(event);
    expect(result).toBe('10분 후 Test Event 1 일정이 시작됩니다.');
  });
});
