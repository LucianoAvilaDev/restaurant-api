import TestUtils from '@ioc:Adonis/Core/TestUtils'
import { apiClient, assert, runFailedTests, specReporter } from '@japa/preset-adonis'
import type { Config } from '@japa/runner'

export const plugins: Required<Config>['plugins'] = [assert(), runFailedTests(), apiClient()]

export const reporters: Required<Config>['reporters'] = [specReporter()]

export const runnerHooks: Pick<Required<Config>, 'setup' | 'teardown'> = {
  setup: [
    () => TestUtils.ace().loadCommands(),
    () => TestUtils.db().migrate(),
    () => TestUtils.db().seed()
  ],
  teardown: [],
}

export const configureSuite: Required<Config>['configureSuite'] = (suite) => {
  if (suite.name === 'functional') {
    suite.setup(() => TestUtils.httpServer().start())
  }
}
