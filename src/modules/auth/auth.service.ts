import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { RefreshTokenDTO } from './dto/refresh.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async signIn(email: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByEmail(email);
    // Check if password matches
    if (!user) throw new UnauthorizedException();

    if (!(await bcrypt.compare(pass, user?.password))) {
      throw new UnauthorizedException();
    }

    user.lastLoggedAt = new Date();
    this.userRepository.save(user);

    // deleting all previous refresh tokens for the logged user
    await this.deleteRefreshTokensForUser(user);

    return {
      token: await this.generateAccessToken(user),
      refreshToken: await this.generateRefreshToken(user),
      user: user,
    };
  }

  /**
   * Reset password using old password
   * @param passwordData
   * @param userId
   */
  async resetPasswordUsingOldPassword(
    passwordData: ResetPasswordDto,
    userId: number,
  ) {
    const user = await this.usersService.findOne(userId);

    if (
      !user ||
      !(await bcrypt.compare(passwordData.oldPassword, user?.password))
    ) {
      throw new UnauthorizedException();
    }

    user.password = await bcrypt.hash(passwordData.newPassword, 10);
    user.isFirstLogin = false;
    await this.userRepository.save(user);
  }

  /**
   * Generating access token for a user
   * @param user
   * @returns {Promise<string>}
   */
  async generateAccessToken(user: User): Promise<string> {
    console.log(user);
    const payload = { sub: user.id, email: user.email };
    return await this.jwtService.signAsync(payload);
  }

  /**
   * Generating refresh token for a given user
   * @param user the user to generate the refresh token for
   * @returns {Promise<string>}
   */
  async generateRefreshToken(user: User): Promise<string> {
    const sevenDaysFromNow = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
    );

    // save refresh token to DB
    const refreshToken = await this.jwtService.signAsync(
      { sub: user.id },
      { expiresIn: '7d' },
    );

    const tokenEntity = this.refreshTokenRepository.create({
      token: refreshToken,
      expiryDate: sevenDaysFromNow,
    });

    tokenEntity.user = user;

    await this.refreshTokenRepository.save(tokenEntity);

    return refreshToken;
  }

  /**
   * Deleting all refresh tokens from a given user
   * @param user
   */
  async deleteRefreshTokensForUser(user: User) {
    await this.refreshTokenRepository
      .createQueryBuilder()
      .delete()
      .from(RefreshToken)
      .where('user_id = :userId', { userId: user.id })
      .execute();
  }

  /**
   * Generating a new access token for a user when he has a valid refresh token
   * @param data
   * @returns {Promise<RefreshResponseDto>}
   */
  async generateAccessTokenByRefreshToken(
    data: RefreshTokenDTO,
  ): Promise<RefreshResponseDto> {
    // check for the refresh token in DB
    let record = null;
    try {
      record = await this.refreshTokenRepository.findOneOrFail({
        where: { token: data.refreshToken },
        relations: ['user'],
      });
    } catch (error) {
      // not found - throw error
      throw new NotFoundException(`token does not exist in DB`);
    }

    // check that the token did not expire && that the token belong to the user
    if (new Date() > record.expiryDate || record.user.id !== data.userId) {
      // expired or not belong to the user - throw error
      throw new ForbiddenException(`Token is not valid`);
    }

    // delete the token
    this.deleteRefreshTokensForUser(record.user);

    // generate new token
    const newToken = await this.generateAccessToken(record.user);

    // generate new refresh token && save the refresh token to db
    const newRefreshToken = await this.generateRefreshToken(record.user);

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }
}
