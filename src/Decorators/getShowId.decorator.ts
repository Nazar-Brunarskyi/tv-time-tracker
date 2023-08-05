import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetShowId = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.params.showId;
  },
);
