import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import config from "./config";

const databaseConfig: TypeOrmModuleOptions = {
	type: config.DATABASE.TYPE,
	host: config.DATABASE.HOST,
	port: config.DATABASE.PORT,
	username: config.DATABASE.USER,
	password: config.DATABASE.PASSWORD,
	database: config.DATABASE.NAME,
	entities: [
		join(__dirname, '../**/*.entity.{ts,js}'),
	],
	synchronize: config.NODE_ENV !== 'production',
	logging: config.NODE_ENV !== 'production',
}

export default databaseConfig;