
-- events
insert into events (
    id, title, description, start_at, end_at, location, author, source,
    created_at, updated_at
  )
  values (
    '123', 'title1', 'description1', 1482247800000, 1482258600000,
    'varnalab', 'script', 'test', 1482192000000, 1482192000000
  ) ;


insert into events (
    id, title, description, start_at, end_at,
    created_at, updated_at
  )
  values (
    '124', 'title2', 'description2', 1482334200000, 1482345000000,
    1482278400000, 1482278400000
  ) ;


insert into events (
    id, title, description, start_at,
    created_at, updated_at
  )
  values (
    '125', 'title3', 'description3', 1482420600000,
    1482364800000, 1482364800000
  ) ;
