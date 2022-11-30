import { Group, test } from '@japa/runner'

test.group('Users update', (group: Group) => {

  group.tap((test) => test.tags(['@user_store']))

  const url: string = '/api/users/3'



})
