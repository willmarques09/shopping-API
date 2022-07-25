import path from 'path';
import { getCustomRepository } from 'typeorm';

import EtherealMail from '../../config/mail/etherealMail';
import AppError from '../../errors';
import { UserRepository } from '../../repositories/UsersRepositoty';
import UsersTokenRepository from '../../repositories/UsersTokenRepositoty';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async create({ email }: IRequest) {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRespository = getCustomRepository(UsersTokenRepository);

    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = userTokenRespository.create({ user_id: user.id });

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
