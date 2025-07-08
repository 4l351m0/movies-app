import * as dotenv from 'dotenv';

dotenv.config();

const config = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PORT: process.env.PORT || 3000,
	JWT_SECRET: process.env.JWT_SECRET,
	API_SECRET: process.env.API_SECRET,
	DATABASE: {
		TYPE: process.env.DATABASE_TYPE as 'postgres',
		HOST: process.env.DATABASE_HOST,
		PORT: parseInt(process.env.DATABASE_PORT || '5432'),
		USER: process.env.DATABASE_USER,
		PASSWORD: process.env.DATABASE_PASSWORD,
		NAME: process.env.DATABASE_NAME,
	}
}

export default config;