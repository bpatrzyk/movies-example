import knex from 'knex';
import pg from 'pg';
import { config } from '../config/db';

// See https://github.com/knex/knex/issues/927
pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);

export const db = knex(config);
