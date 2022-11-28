import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {

  Route.post('login', 'AuthController.Login')

  Route.post('logout', 'AuthController.Logout')
    .middleware('auth')

  Route.resource('clients', 'ClientsController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('users', 'UsersController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('meal-types', 'MealTypesController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('meals', 'MealsController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('orders', 'OrdersController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('order-items', 'OrderItemsController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('roles', 'RolesController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.resource('permissions', 'PermissionsController')
    .apiOnly()
    .only(['show', 'index'])
    .middleware({ '*': ['auth'] })

  Route.resource('tables', 'TablesController')
    .apiOnly()
    .middleware({ '*': ['auth'] })

  Route.get('user-permissions', 'UserPermissionsController')
    .middleware([
      'auth',
      'can:manage_userd,manage_people'
    ])

}).prefix('api')




