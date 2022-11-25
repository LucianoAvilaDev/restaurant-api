/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('login', 'AuthController.login')

Route.resource('clients', 'ClientsController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('users', 'UsersController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('meal-types', 'MealTypesController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('meals', 'MealsController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('orders', 'OrdersController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('order-items', 'OrderItemsController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('roles', 'RolesController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })

Route.resource('permissions', 'PermissionsController')
  .apiOnly()
  .only(['show'])
  .middleware({ '*': ['auth'] })

Route.resource('tables', 'TablesController')
  .apiOnly()
  .except(['create'])
  .middleware({ '*': ['auth'] })


