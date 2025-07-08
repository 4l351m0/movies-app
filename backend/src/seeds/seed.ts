import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { Actor } from '../modules/actors/entities/actor.entity';
import { MovieActor } from '../modules/movies/entities/movie-actor.entity';
import { Movie } from '../modules/movies/entities/movie.entity';
import { Rating } from '../modules/ratings/entities/rating.entity';

async function bootstrap() {
	const app = await NestFactory.createApplicationContext(AppModule);

	Logger.log('Initializing database seeding...', 'SeedScript');

	const movieRepo = app.get<Repository<Movie>>(getRepositoryToken(Movie));
	const actorRepo = app.get<Repository<Actor>>(getRepositoryToken(Actor));
	const ratingRepo = app.get<Repository<Rating>>(getRepositoryToken(Rating));
	const movieActorRepo = app.get<Repository<MovieActor>>(getRepositoryToken(MovieActor));

	await movieRepo.manager.connection.query(
		'TRUNCATE TABLE "ratings", "movie_actors", "movies", "actors" RESTART IDENTITY CASCADE;'
	);
	Logger.log('Cleaned tables with TRUNCATE CASCADE', 'SeedScript');

	const actorsData = [
		{ firstName: 'Robert', lastName: 'Downey Jr.', birthDate: '1965-04-04' },
		{ firstName: 'Scarlett', lastName: 'Johansson', birthDate: '1984-11-22' },
		{ firstName: 'Chris', lastName: 'Evans', birthDate: '1981-06-13' },
		{ firstName: 'Samuel', lastName: 'Jackson', birthDate: '1948-12-21' },
		{ firstName: 'Morgan', lastName: 'Freeman', birthDate: '1937-06-01' },
		{ firstName: 'Leonardo', lastName: 'DiCaprio', birthDate: '1974-11-11' },
		{ firstName: 'Tom', lastName: 'Hanks', birthDate: '1956-07-09' },
		{ firstName: 'Emma', lastName: 'Stone', birthDate: '1988-11-06' },
		{ firstName: 'Jennifer', lastName: 'Lawrence', birthDate: '1990-08-15' },
		{ firstName: 'Brad', lastName: 'Pitt', birthDate: '1963-12-18' },
		{ firstName: 'Angelina', lastName: 'Jolie', birthDate: '1975-06-04' },
		{ firstName: 'Will', lastName: 'Smith', birthDate: '1968-09-25' },
		{ firstName: 'Natalie', lastName: 'Portman', birthDate: '1981-06-09' },
		{ firstName: 'Christian', lastName: 'Bale', birthDate: '1974-01-30' },
		{ firstName: 'Matt', lastName: 'Damon', birthDate: '1970-10-08' },
		{ firstName: 'Anne', lastName: 'Hathaway', birthDate: '1982-11-12' },
		{ firstName: 'Denzel', lastName: 'Washington', birthDate: '1954-12-28' },
		{ firstName: 'Meryl', lastName: 'Streep', birthDate: '1949-06-22' },
		{ firstName: 'Hugh', lastName: 'Jackman', birthDate: '1968-10-12' },
		{ firstName: 'Keanu', lastName: 'Reeves', birthDate: '1964-09-02' },
		{ firstName: 'Joaquin', lastName: 'Phoenix', birthDate: '1974-10-28' },
		{ firstName: 'Gal', lastName: 'Gadot', birthDate: '1985-04-30' },
		{ firstName: 'Ryan', lastName: 'Gosling', birthDate: '1980-11-12' },
		{ firstName: 'Charlize', lastName: 'Theron', birthDate: '1975-08-07' },
		{ firstName: 'Benedict', lastName: 'Cumberbatch', birthDate: '1976-07-19' },
		{ firstName: 'Chris', lastName: 'Hemsworth', birthDate: '1983-08-11' },
		{ firstName: 'Mark', lastName: 'Ruffalo', birthDate: '1967-11-22' },
		{ firstName: 'Zoe', lastName: 'Saldana', birthDate: '1978-06-19' },
		{ firstName: 'Vin', lastName: 'Diesel', birthDate: '1967-07-18' },
		{ firstName: 'Paul', lastName: 'Walker', birthDate: '1973-09-12' },
		{ firstName: 'Michelle', lastName: 'Rodriguez', birthDate: '1978-07-12' },
		{ firstName: 'Jason', lastName: 'Statham', birthDate: '1967-07-26' },
		{ firstName: 'Tom', lastName: 'Cruise', birthDate: '1962-07-03' },
		{ firstName: 'Emily', lastName: 'Blunt', birthDate: '1983-02-23' },
		{ firstName: 'Harrison', lastName: 'Ford', birthDate: '1942-07-13' },
		{ firstName: 'Sigourney', lastName: 'Weaver', birthDate: '1949-10-08' },
		{ firstName: 'Kate', lastName: 'Winslet', birthDate: '1975-10-05' },
		{ firstName: 'Idris', lastName: 'Elba', birthDate: '1972-09-06' },
		{ firstName: 'Daniel', lastName: 'Craig', birthDate: '1968-03-02' },
		{ firstName: 'Rami', lastName: 'Malek', birthDate: '1981-05-12' },
		{ firstName: 'Taron', lastName: 'Egerton', birthDate: '1989-11-10' },
		{ firstName: 'Pedro', lastName: 'Pascal', birthDate: '1975-04-02' },
		{ firstName: 'Oscar', lastName: 'Isaac', birthDate: '1979-03-09' },
	];
	const actors = await actorRepo.save(actorsData);
	Logger.log(`${actors.length} Actores created`, 'SeedScript');

	const moviesData = [
		{ title: 'The Avengers', releaseYear: 2012, synopsis: "Earth's mightiest heroes must come together to stop Loki." },
		{ title: 'Inception', releaseYear: 2010, synopsis: 'A thief who steals corporate secrets through dream-sharing technology.' },
		{ title: 'Forrest Gump', releaseYear: 1994, synopsis: 'The presidencies of Kennedy and Johnson, the Vietnam War, and more, through the eyes of Forrest.' },
		{ title: 'The Shawshank Redemption', releaseYear: 1994, synopsis: 'Two imprisoned men bond over a number of years.' },
		{ title: 'The Dark Knight', releaseYear: 2008, synopsis: 'Batman faces the Joker, a criminal mastermind.' },
		{ title: 'La La Land', releaseYear: 2016, synopsis: 'A jazz pianist falls for an aspiring actress in Los Angeles.' },
		{ title: 'The Matrix', releaseYear: 1999, synopsis: 'A computer hacker learns about the true nature of his reality.' },
		{ title: 'Fight Club', releaseYear: 1999, synopsis: 'An insomniac office worker and a soap maker form an underground club.' },
		{ title: 'Interstellar', releaseYear: 2014, synopsis: 'A team of explorers travel through a wormhole in space.' },
		{ title: 'Gladiator', releaseYear: 2000, synopsis: 'A former Roman General sets out to exact vengeance.' },
		{ title: 'Joker', releaseYear: 2019, synopsis: 'A mentally troubled comedian embarks on a downward spiral.' },
		{ title: 'Wonder Woman', releaseYear: 2017, synopsis: 'Diana, princess of the Amazons, discovers her full powers.' },
		{ title: 'Blade Runner 2049', releaseYear: 2017, synopsis: 'A young blade runner discovers a secret that could plunge society into chaos.' },
		{ title: 'Mad Max: Fury Road', releaseYear: 2015, synopsis: 'In a post-apocalyptic wasteland, Max teams up with Furiosa.' },
		{ title: 'Doctor Strange', releaseYear: 2016, synopsis: 'A neurosurgeon discovers the world of magic and alternate dimensions.' },
		{ title: 'Thor: Ragnarok', releaseYear: 2017, synopsis: 'Thor must escape the alien planet Sakaar in time to save Asgard.' },
		{ title: 'Fast & Furious 7', releaseYear: 2015, synopsis: 'Deckard Shaw seeks revenge against Dominic Toretto and his family.' },
		{ title: 'Mission: Impossible – Fallout', releaseYear: 2018, synopsis: 'Ethan Hunt and his IMF team must prevent a global catastrophe.' },
		{ title: 'Edge of Tomorrow', releaseYear: 2014, synopsis: 'A soldier relives the same day over and over in a war with aliens.' },
		{ title: 'Avatar', releaseYear: 2009, synopsis: 'A paraplegic Marine dispatched to the moon Pandora.' },
		{ title: 'Skyfall', releaseYear: 2012, synopsis: 'James Bond investigates an attack on MI6.' },
	];
	const movies = await movieRepo.save(moviesData);
	Logger.log(`${movies.length} Movies added`, 'SeedScript');

	function getRandomActors(actors: Actor[], min = 2, max = 5) {
		const count = min + Math.floor(Math.random() * (max - min + 1));
		const shuffled = actors.slice().sort(() => 0.5 - Math.random());
		return shuffled.slice(0, count);
	}

	const movieActorsData: MovieActor[] = [];
	for (const movie of movies) {
		const selectedActors = getRandomActors(actors);
		for (const actor of selectedActors) {
			const ma = new MovieActor();
			ma.movie = movie;
			ma.actor = actor;
			movieActorsData.push(ma);
		}
	}
	await movieActorRepo.save(movieActorsData);
	Logger.log(`${movieActorsData.length} Actors were added into movies`, 'SeedScript');

	let totalRatings = 0;
	for (const movie of movies) {
		const ratings = Array.from({ length: 5 + Math.floor(Math.random() * 6) }).map(() => ({
			value: 1 + Math.floor(Math.random() * 5),
			movie,
		}));
		await ratingRepo.save(ratings);
		totalRatings += ratings.length;
	}
	Logger.log(`${totalRatings} Ratings Inserted`, 'SeedScript');

	await app.close();
	Logger.log('Seed database executed properly', 'SeedScript');
}

bootstrap().catch((err) => {
	Logger.error('Error while executing seed script:', err, 'SeedScript');
	process.exit(1);
}); 