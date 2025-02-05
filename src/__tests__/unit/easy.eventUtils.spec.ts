import { Event } from '../../types';
import { getFilteredEvents } from '../../utils/eventUtils';

describe('getFilteredEvents', () => {
  it("검색어 '이벤트 2'에 맞는 이벤트만 반환한다", () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
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
        title: '이벤트 2',
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
    const result = getFilteredEvents(events, '이벤트 2', new Date('2025-02-05'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('주간 뷰에서 2024-07-01 주의 이벤트만 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-06-29',
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
        title: '이벤트 2',
        date: '2024-07-01',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('월간 뷰에서 2024년 7월의 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2024-06-29',
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
        title: '이벤트 2',
        date: '2024-07-01',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const result = getFilteredEvents(events, '', new Date('2024-07-01'), 'month');
    expect(result).toEqual([events[1]]);
  });

  it("검색어 '이벤트'와 주간 뷰 필터링을 동시에 적용한다", () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
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
        title: '이벤트 2',
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
    const result = getFilteredEvents(events, '이벤트', new Date('2025-02-05'), 'week');
    expect(result).toEqual(events);
  });

  it('검색어가 없을 때 모든 이벤트를 반환한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
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
        title: '이벤트 2',
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
    const result = getFilteredEvents(events, '', new Date('2025-02-05'), 'week');
    expect(result).toEqual(events);
  });

  it('검색어가 대소문자를 구분하지 않고 작동한다', () => {
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
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const result = getFilteredEvents(events, 'TEST EVENT 2', new Date('2025-02-05'), 'week');
    expect(result).toEqual([events[1]]);
  });

  it('월의 경계에 있는 이벤트를 올바르게 필터링한다', () => {
    const events: Event[] = [
      {
        id: '1',
        title: '이벤트 1',
        date: '2025-01-31',
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
        title: '이벤트 2',
        date: '2025-02-01',
        startTime: '09:00',
        endTime: '10:00',
        description: 'Test Description 2',
        location: 'Test Location 2',
        category: 'Test Category 2',
        repeat: { type: 'none', interval: 0 },
        notificationTime: 10,
      },
    ];
    const result = getFilteredEvents(events, '', new Date('2025-02-01'), 'month');
    expect(result).toEqual([events[1]]);
  });

  it('빈 이벤트 리스트에 대해 빈 배열을 반환한다', () => {
    const result = getFilteredEvents([], '', new Date('2025-02-05'), 'week');
    expect(result).toEqual([]);
  });
});
