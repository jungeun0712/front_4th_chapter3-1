import { Event } from '../../types';
import {
  convertEventToDateRange,
  findOverlappingEvents,
  isOverlapping,
  parseDateTime,
} from '../../utils/eventOverlap';

describe('parseDateTime', () => {
  it('2024-07-01 14:30을 정확한 Date 객체로 변환한다', () => {
    const result = parseDateTime('2024-07-01', '14:30');
    expect(result).toEqual(new Date('2024-07-01T14:30'));
  });

  it('잘못된 날짜 형식에 대해 Invalid Date를 반환한다', () => {
    const result = parseDateTime('2025-13-01', '21:30');
    expect(result).toEqual(new Date('Invalid Date'));
  });

  it('잘못된 시간 형식에 대해 Invalid Date를 반환한다', () => {
    const result = parseDateTime('2025-02-01', '25:30');
    expect(result).toEqual(new Date('Invalid Date'));
  });

  it('날짜 문자열이 비어있을 때 Invalid Date를 반환한다', () => {
    const result = parseDateTime('', '21:30');
    expect(result).toEqual(new Date('Invalid Date'));
  });
});

describe('convertEventToDateRange', () => {
  it('일반적인 이벤트를 올바른 시작 및 종료 시간을 가진 객체로 변환한다', () => {
    const event: Event = {
      id: '1',
      title: 'Test Event',
      date: '2025-02-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const result = convertEventToDateRange(event);
    expect(result).toEqual({
      start: new Date('2025-02-05T21:30'),
      end: new Date('2025-02-05T22:30'),
    });
  });

  it('잘못된 날짜 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: 'Test Event',
      date: '2025-13-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const result = convertEventToDateRange(event);
    expect(result).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });

  it('잘못된 시간 형식의 이벤트에 대해 Invalid Date를 반환한다', () => {
    const event: Event = {
      id: '1',
      title: 'Test Event',
      date: '2025-02-05',
      startTime: '25:30',
      endTime: '26:30',
      description: 'Test Description',
      location: 'Test Location',
      category: 'Test Category',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const result = convertEventToDateRange(event);
    expect(result).toEqual({
      start: new Date('Invalid Date'),
      end: new Date('Invalid Date'),
    });
  });
});

describe('isOverlapping', () => {
  it('두 이벤트가 겹치는 경우 true를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2025-02-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description 1',
      location: 'Test Location 1',
      category: 'Test Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2025-02-05',
      startTime: '22:00',
      endTime: '23:00',
      description: 'Test Description 2',
      location: 'Test Location 2',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const result = isOverlapping(event1, event2);
    expect(result).toBe(true);
  });

  it('두 이벤트가 겹치지 않는 경우 false를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2025-02-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description 1',
      location: 'Test Location 1',
      category: 'Test Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2025-02-05',
      startTime: '22:31',
      endTime: '23:00',
      description: 'Test Description 2',
      location: 'Test Location 2',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const result = isOverlapping(event1, event2);
    expect(result).toBe(false);
  });
});

describe('findOverlappingEvents', () => {
  it('새 이벤트와 겹치는 모든 이벤트를 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2025-02-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description 1',
      location: 'Test Location 1',
      category: 'Test Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2025-02-05',
      startTime: '22:00',
      endTime: '23:00',
      description: 'Test Description 2',
      location: 'Test Location 2',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const events = [event1, event2];
    const result = findOverlappingEvents(event1, events);
    expect(result).toEqual([event2]);
  });

  it('겹치는 이벤트가 없으면 빈 배열을 반환한다', () => {
    const event1: Event = {
      id: '1',
      title: 'Test Event 1',
      date: '2025-02-05',
      startTime: '21:30',
      endTime: '22:30',
      description: 'Test Description 1',
      location: 'Test Location 1',
      category: 'Test Category 1',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const event2: Event = {
      id: '2',
      title: 'Test Event 2',
      date: '2025-02-05',
      startTime: '22:31',
      endTime: '23:00',
      description: 'Test Description 2',
      location: 'Test Location 2',
      category: 'Test Category 2',
      repeat: { type: 'none', interval: 0 },
      notificationTime: 0,
    };
    const events = [event1, event2];
    const result = findOverlappingEvents(event1, events);
    expect(result).toEqual([]);
  });
});
