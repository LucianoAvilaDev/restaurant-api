import { validator } from '@ioc:Adonis/Core/Validator'
import { cpf } from 'cpf-cnpj-validator';


validator.rule('cpfValidation', (value, _, options) => {

  const isValid: boolean = cpf.isValid(value)

  if (isValid) {
    return
  }

  options.errorReporter.report(
    options.pointer,
    'cpfValidation',
    'cpf validation failed',
    options.arrayExpressionPointer
  )

})
