import { Metadata } from '@grpc/grpc-js';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rpc = context.switchToRpc();
    const metadata: Metadata = rpc.getContext();
    const authorization = metadata.get('authorization');
    if (!authorization && authorization.length === 0) {
      return false;
    }
    return authorization[0] === 'Bearer 1234';
  }
}
