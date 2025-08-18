import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data as string] : user;
  },
);

// You can use the decorator in your controller like this:
// @Get()
// async findOne(@User() user: UserEntity) {
//   console.log(user);
// }

// Here is how to access a particular property via the @User()
// @Get()
// async findOne(@User('firstName') firstName: string) {
//   console.log(`Hello ${firstName}`);
// }
