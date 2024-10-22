import * as depthLimit from 'graphql-depth-limit';

import { ApolloDriver } from '@nestjs/apollo';
import { ComplexityPlugin } from '@/plugins/complexity.plugin';
import { CustomPlayGround } from '@/constants/playground';
import { FormatError } from '@/utils/format-gql-error';
import { GqlModuleAsyncOptions } from '@nestjs/graphql';
import Modules from '@Modules/index';

export const GraphQlConfig: GqlModuleAsyncOptions = {
  driver: ApolloDriver, // Specifies the ApolloDriver for GraphQL

  // Factory method to configure the GraphQL module
  useFactory: () => ({
    autoSchemaFile: true, // Automatically generate the GraphQL schema based on the code
    include: Modules, // Include modules to be part of the GraphQL schema
    path: '/graphql', // The URL path for the GraphQL endpoint
    validationRules: [depthLimit(5)], // Apply a depth limit of 5 to prevent deep/nested queries for security

    buildSchemaOptions: {
      dateScalarMode: 'timestamp', // Use timestamp format for Date types in GraphQL
      numberScalarMode: 'integer', // Use integer format for number types
      noDuplicatedFields: true, // Prevent the schema from having duplicate fields
    },

    introspection: true, // Allow introspection queries (can be disabled in production for security)
    sortSchema: true, // Sort schema fields alphabetically for consistency
    playground: CustomPlayGround, // Custom settings for the GraphQL Playground
    plugins: [new ComplexityPlugin()], // Apply a custom plugin to manage query complexity

    // Context function to pass custom request/response objects to resolvers
    context: ({ req, res }) => {
      req.requestStartTime = performance.now(); // Store the request start time for potential performance tracking

      return { req, res }; // Return request and response objects to be used in resolvers
    },

    formatError: FormatError, // Custom error formatting to standardize the error response format
  }),
};
