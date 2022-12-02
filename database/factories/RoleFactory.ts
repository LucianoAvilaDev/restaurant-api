import Role from 'App/Models/Role'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PermissionFactory from './PermissionFactory'

export default Factory.define(Role, ({ faker }) => {
  return {
    name: faker.lorem.word(20),
  }
})
  .relation('permissions', () => PermissionFactory)
  .build()
