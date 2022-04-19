import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { Role } from '../enums/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayloadDto) {
    const { sub: _id } = payload;

    const user = await this.usersService.findById(_id);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.hasAdmin) user.roles = [Role.Admin];
    else user.roles = [Role.User];

    return user;
  }
}
