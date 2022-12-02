import Mail from "@ioc:Adonis/Addons/Mail"
import { SmtpMailResponse } from "@ioc:Adonis/Addons/Mail"
import { MessageContract } from "@ioc:Adonis/Addons/Mail"

export default class {

  public static async run(params: {
    userEmail: string,
    msgLink: string
  }): Promise<SmtpMailResponse> {

    const { userEmail, msgLink } = params

    return await Mail.use('smtp').send((message: MessageContract) => {
      message.from(process.env.MAIL_ORIGIN ?? 'teste@email.com')
        .to(userEmail)
        .subject("Recuperação de Senha")
        .htmlView(`emails/recover_template`, {
          msgTitle: "Recuperação de Senha",
          msgBody: "Segue abaixo o link para sua redefinição de senha.",
          msgLink: msgLink
        })
    })

  }
}
