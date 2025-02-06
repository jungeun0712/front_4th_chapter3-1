import { act, renderHook } from '@testing-library/react';

import { useSearch } from '../../hooks/useSearch.ts';
import { Event } from '../../types.ts';

const events: Event[] = [
  {
    id: '1',
    title: '팀 회의 TEST',
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
    title: '점심 약속',
    date: '2025-02-06',
    startTime: '10:30',
    endTime: '11:00',
    description: 'Test Description 2',
    location: 'Test Location 2',
    category: 'Test Category 2',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
  {
    id: '3',
    title: '프로젝트 마감',
    date: '2025-02-20',
    startTime: '11:30',
    endTime: '12:00',
    description: 'Description 3',
    location: 'Location 3',
    category: 'Category 3',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
  },
];

it('검색어가 비어있을 때 모든 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2025-02-05'), 'month'));
  act(() => {
    result.current.setSearchTerm('');
  });
  expect(result.current.filteredEvents).toEqual(events);
});

it('검색어에 맞는 이벤트만 필터링해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2025-02-05'), 'week'));
  act(() => {
    result.current.setSearchTerm('팀 회의');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);
});

it('검색어가 제목, 설명, 위치 중 하나라도 일치하면 해당 이벤트를 반환해야 한다', () => {
  const { result } = renderHook(() => useSearch(events, new Date('2025-02-05'), 'week'));
  act(() => {
    result.current.setSearchTerm('Test');
  });
  expect(result.current.filteredEvents).toEqual([events[0], events[1]]);
});

it('현재 뷰(주간/월간)에 해당하는 이벤트만 반환해야 한다', () => {
  const currentDate = new Date('2025-02-05');

  // 주간 뷰 테스트
  const { result: weekResult } = renderHook(() => useSearch(events, currentDate, 'week'));
  act(() => {
    weekResult.current.setSearchTerm('');
  });
  // 이번 주 이벤트만 포함
  expect(weekResult.current.filteredEvents).toEqual([events[0], events[1]]);

  // 월간 뷰 테스트
  const { result: monthResult } = renderHook(() => useSearch(events, currentDate, 'month'));
  act(() => {
    monthResult.current.setSearchTerm('');
  });
  // 2월의 모든 이벤트 포함
  expect(monthResult.current.filteredEvents).toEqual([events[0], events[1], events[2]]);
});

it("검색어를 '회의'에서 '점심'으로 변경하면 필터링된 결과가 즉시 업데이트되어야 한다", () => {
  const { result } = renderHook(() => useSearch(events, new Date('2025-02-05'), 'week'));
  act(() => {
    result.current.setSearchTerm('회의');
  });
  expect(result.current.filteredEvents).toEqual([events[0]]);

  act(() => {
    result.current.setSearchTerm('점심');
  });
  expect(result.current.filteredEvents).toEqual([events[1]]);
});
