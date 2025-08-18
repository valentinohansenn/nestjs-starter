import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';

// Define Role type based on how it's used in the codebase
type Role = string;

// Combining all decorators related to authentication into a single decorator
export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

function ApiBearerAuth(): ClassDecorator | MethodDecorator | PropertyDecorator {
  throw new Error('Function not implemented.');
}

function ApiUnauthorizedResponse(arg0: {
  description: string;
}): ClassDecorator | MethodDecorator | PropertyDecorator {
  throw new Error('Function not implemented.');
}
