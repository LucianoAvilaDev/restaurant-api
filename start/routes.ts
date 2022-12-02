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
    .middleware({ '*': ['auth', 'can:manage_clients'] })

  Route.resource('users', 'UsersController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_users'] })

  Route.resource('meal-types', 'MealTypesController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_meals'] })

  Route.resource('meals', 'MealsController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_meals'] })

  Route.resource('orders', 'OrdersController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_orders'] })

  Route.resource('order-items', 'OrderItemsController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_orders'] })

  Route.resource('roles', 'RolesController')
    .apiOnly()
    .middleware({ '*': ['auth', 'can:manage_roles'] })

  Route.resource('permissions', 'PermissionsController')
    .apiOnly()
    .only(['show', 'index'])
    .middleware({ '*': ['auth', 'can:manage_roles'] })

  Route.resource('tables', 'TablesController')
    .apiOnly()
    .middleware({ '*': ['auth'] })


  Route.get('user-permissions', 'invoke/UsersInvokes/GetUserPermissionsController')
    .middleware(['auth', 'can:manage_users'])

  Route.get('available-tables', 'invoke/TablesInvokes/GetAvailableTablesController')
    .middleware('auth')

  Route.put('book-table/:id', 'invoke/TablesInvokes/BookTableController')
    .middleware('auth')

  Route.put('release-table/:id', 'invoke/TablesInvokes/ReleaseTableController')
    .middleware('auth')

  Route.put('close-order/:id', 'invoke/OrdersInvokes/CloseOrderController')
    .middleware(['auth', 'can:manage_orders'])

  Route.put('open-order/:id', 'invoke/OrdersInvokes/OpenOrderController')
    .middleware(['auth', 'can:manage_orders'])


}).prefix('api')






