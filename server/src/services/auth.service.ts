import { UserRepository } from '../repositories/user.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { AuthenticationError, ConflictError } from '../utils/errors';
import { IUser } from '../models/User.model';

interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  user: Partial<IUser>;
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await hashPassword(dto.password);
    const user = await this.userRepository.create({
      ...dto,
      passwordHash,
      roles: ['member'],
    });

    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    });

    const { passwordHash: _pw, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isValidPassword = await comparePassword(dto.password, user.passwordHash);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    const accessToken = generateToken({
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      roles: user.roles,
    });

    const { passwordHash: _pw, ...userWithoutPassword } = user.toObject();
    return { user: userWithoutPassword, accessToken, refreshToken };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Avoid leaking if email exists
      return;
    }

    // TODO: integrate email service
    // For now, log
    // eslint-disable-next-line no-console
    console.log(`Password reset requested for ${email}`);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // TODO: verify reset token
    // eslint-disable-next-line no-console
    console.log(`Password reset with token ${token}`);
    const passwordHash = await hashPassword(newPassword);
    // TODO: Update user password using token context
    void passwordHash;
  }
}
