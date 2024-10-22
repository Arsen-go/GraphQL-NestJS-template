import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

import { GraphQLError } from 'graphql';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    const maxComplexity = 500; // this is not final value yet, all are being tested now, then limits will be set

    return {
      async didResolveOperation({ contextValue, request, document, schema }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });

        contextValue.complexity = complexity;

        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
      },
    };
  }
}
