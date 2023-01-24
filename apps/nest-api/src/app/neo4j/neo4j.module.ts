// based on: https://github.com/adam-cowley/twitch-project
// also see: https://medium.com/neo4j/building-a-modern-web-application-with-neo4j-and-nestjs-b51ffd8268fa

import { Module, DynamicModule } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Neo4jConfig } from './neo4j-config.interface';
import { NEO4J_CONFIG, NEO4J_DRIVER } from './neo4j.constants';
import { createDriver } from './neo4j.util';

@Module({})
export class Neo4jModule {
  static forRoot(config: Neo4jConfig): DynamicModule {
    return {
      module: Neo4jModule,
      global: true,
      providers: [
        {
          provide: NEO4J_CONFIG,
          useValue: config,
        },
        {
          provide: NEO4J_DRIVER,
          inject: [ NEO4J_CONFIG ],
          useFactory: async (config: Neo4jConfig) => createDriver(config),
        },
        Neo4jService,
      ],
      exports: [
        Neo4jService,
      ]
    }
  }

  static forMock() {

  }
}
