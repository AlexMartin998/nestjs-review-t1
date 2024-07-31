import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiResponseMetadata } from '@nestjs/swagger';

export function ApiDocumentation(
  ...statuses: (number | ApiResponseMetadata)[]
): MethodDecorator {
  const responses = statuses.filter(
    (status) => typeof status !== 'number',
  ) as ApiResponseMetadata[];
  const statusCodes = statuses.filter(
    (status) => typeof status === 'number',
  ) as number[];
  // const ApiBodyReq = ApiBody({ type: (responses[0] as any).body });

  const apiResponses = responses.map((response) => {
    const { description, type } = response;
    return ApiResponse({ ...response, description, type });
  });

  const apiStatuses = statusCodes.map((status) => {
    return ApiResponse({ status });
  });

  return applyDecorators(...apiResponses, ...apiStatuses);
}
