import { HttpResponse } from "./httpResponse";

export class HttpHelper {
  static ok<T>(dto?: T): HttpResponse {
    return {
      statusCode: 200,
      body: dto,
    };
  }

  static created(): HttpResponse {
    return {
      statusCode: 201,
      body: undefined,
    };
  }

  static clientError(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: {
        error: error.message,
      },
    };
  }

  static unauthorized(error: Error): HttpResponse {
    return {
      statusCode: 401,
      body: {
        error: error.message,
      },
    };
  }

  static forbidden(error: Error): HttpResponse {
    return {
      statusCode: 403,
      body: {
        error: error.message,
      },
    };
  }

  static notFound(error: Error): HttpResponse {
    return {
      statusCode: 404,
      body: {
        error: error.message,
      },
    };
  }

  static conflict(error: Error): HttpResponse {
    return {
      statusCode: 409,
      body: {
        error: error.message,
      },
    };
  }

  static tooMany(error: Error): HttpResponse {
    return {
      statusCode: 429,
      body: {
        error: error.message,
      },
    };
  }

  static fail(error: Error) {
    console.log(error);

    return {
      statusCode: 500,
      body: {
        error: error.message,
      },
    };
  }
}
