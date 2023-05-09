import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/auth/Schemas/User.schema";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx
      .switchToHttp()
      .getRequest();

      return request.user;
  }
)