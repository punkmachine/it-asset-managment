import User from '../models/user';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// const generateAccessToken = (id, role) => {
//   const payload = { id, role };

//   return jwt.sign(payload, 'secret-key', { expiresIn: "24h" } )
// }

class AuthController {
  async login(request, response) {
    try {
      // const { login, password } = request.body;

      // const user = await User.findOne({ login });
      // if (!user) {
      //   return response.status(404)
      //     .json({ message: `Пользователь ${login} не найден` })
      // }

      // const validPassword = bcrypt.compareSync(password, user.password);
      // if (!validPassword) {
      //   return response.status(400)
      //     .json({ message: 'Введен неверный пароль' });
      // }

      // const token = generateAccessToken(user._id, user.role);

      response.status(200).json({ token: 'aaa' });
    } catch (error) {
      response.status(500).json(error.message);
    }
  }
};

export default new AuthController();
