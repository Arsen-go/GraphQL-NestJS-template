import { GraphQLFormattedError } from 'graphql/error';

export const FormatError = (
  formattedError: GraphQLFormattedError,
  error: any,
) => {
  if (
    error?.message === 'INVALID_GLOBAL_OAUTH_TOKEN' ||
    error?.message === 'GLOBAL_OAUTH_TOKEN_EXPIRED'
  ) {
    return {
      message: 'JWT expired. Please, refresh your token.',
      response: {
        statusCode: 498,
        message: error.message,
        error: error,
      },
    };
  }

  return {
    message:
      error.originalError?.response?.message?.message ?? formattedError.message,
    status: error.originalError?.status,
    name: error.originalError?.name,
    path: formattedError.path,
    apiCallWithParams: error.source?.body,
    extensions: formattedError.extensions,
  };
};
