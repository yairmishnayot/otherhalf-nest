import { User } from 'src/modules/user/entities/user.entity';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        token: data.token,
        refreshToken: data.refreshToken,
        user: plainToInstance(User, data.user),
      })),
    );
  }
}
