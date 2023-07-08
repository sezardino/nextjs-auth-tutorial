import { ConfigService } from '@nestjs/config';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserInput } from './input/user.input';
import { User } from './users/models/user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  async signUp(@Args('input') input: UserInput) {
    return this.authService.signUp(input);
  }

  @Mutation(() => User)
  async signIn(
    @Args('input') input: UserInput,
    @Context() context: GraphQLExecutionContext,
  ) {
    const { token, user } = await this.authService.login(input);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    // @ts-ignore
    context.res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return user;
  }
}
