const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("../services/mail-service");
const tokenService = require("../services/token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User with such email is already registered.");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      // Використовується EtherealMail для роботи.
      email,
      `${process.env.API_URL}/draw-together/activate/${activationLink}`
    );

    const userDto = new UserDto(user); // Огранічуєм поля моделі. Вибираєм тільки id, isActivated, email.

    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
