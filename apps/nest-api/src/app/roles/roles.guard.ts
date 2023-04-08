import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
} from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(
		@Inject(AuthService) private authService: AuthService,
		@Inject(UserService) private userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const request = context.switchToHttp().getRequest();
		const authHeader = request.headers.authorization;

		try {
			const token = await this.authService.verifyToken(authHeader);
			const user = await this.userService.getUserById(token.id);
			return user.isAdmin;
		} catch (e) {
			throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
		}
	}
}