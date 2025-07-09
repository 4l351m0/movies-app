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
		{ title: 'The Avengers', releaseYear: 2012, synopsis: "Earth's mightiest heroes must come together to stop Loki.", duration: 143, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg' },
		{ title: 'Inception', releaseYear: 2010, synopsis: 'A thief who steals corporate secrets through dream-sharing technology.', duration: 148, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/51s+z1p1ZTL._AC_.jpg' },
		{ title: 'Forrest Gump', releaseYear: 1994, synopsis: 'The presidencies of Kennedy and Johnson, the Vietnam War, and more, through the eyes of Forrest.', duration: 142, genre: 'Drama', poster: 'https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/2920525/5964222/MOVAJ2095__61756.1679606794.jpg?c=2' },
		{ title: 'The Shawshank Redemption', releaseYear: 1994, synopsis: 'Two imprisoned men bond over a number of years.', duration: 142, genre: 'Drama', poster: 'https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg' },
		{ title: 'The Dark Knight', releaseYear: 2008, synopsis: 'Batman faces the Joker, a criminal mastermind.', duration: 152, genre: 'Action', poster: 'https://static.posters.cz/image/750webp/184446.webp' },
		{ title: 'La La Land', releaseYear: 2016, synopsis: 'A jazz pianist falls for an aspiring actress in Los Angeles.', duration: 128, genre: 'Comedy', poster: 'https://m.media-amazon.com/images/I/81r+LNwq2-L._AC_SY679_.jpg' },
		{ title: 'The Matrix', releaseYear: 1999, synopsis: 'A computer hacker learns about the true nature of his reality.', duration: 136, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg' },
		{ title: 'Fight Club', releaseYear: 1999, synopsis: 'An insomniac office worker and a soap maker form an underground club.', duration: 139, genre: 'Drama', poster: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg' },
		{ title: 'Interstellar', releaseYear: 2014, synopsis: 'A team of explorers travel through a wormhole in space.', duration: 169, genre: 'Adventure', poster: 'https://m.media-amazon.com/images/I/71n58Yhj2GL._AC_SY679_.jpg' },
		{ title: 'Gladiator', releaseYear: 2000, synopsis: 'A former Roman General sets out to exact vengeance.', duration: 155, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/51A2Q+5QJPL._AC_.jpg' },
		{ title: 'Joker', releaseYear: 2019, synopsis: 'A mentally troubled comedian embarks on a downward spiral.', duration: 122, genre: 'Crime', poster: 'https://m.media-amazon.com/images/I/71Kk5p2PHTL._AC_SY679_.jpg' },
		{ title: 'Wonder Woman', releaseYear: 2017, synopsis: 'Diana, princess of the Amazons, discovers her full powers.', duration: 141, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81QSR1HhJ-L._AC_SY679_.jpg' },
		{ title: 'Blade Runner 2049', releaseYear: 2017, synopsis: 'A young blade runner discovers a secret that could plunge society into chaos.', duration: 164, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81GqtNbs+PL._AC_SY679_.jpg' },
		{ title: 'Mad Max: Fury Road', releaseYear: 2015, synopsis: 'In a post-apocalyptic wasteland, Max teams up with Furiosa.', duration: 120, genre: 'Action', poster: 'https://www.movieposters.com/cdn/shop/files/mad-max-fury-road_e4sycaf2_480x.progressive.jpg?v=1706563087' },
		{ title: 'Doctor Strange', releaseYear: 2016, synopsis: 'A neurosurgeon discovers the world of magic and alternate dimensions.', duration: 115, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/814mye5CwKL._AC_SL1111_.jpg' },
		{ title: 'Thor: Ragnarok', releaseYear: 2017, synopsis: 'Thor must escape the alien planet Sakaar in time to save Asgard.', duration: 130, genre: 'Action', poster: 'https://i.ebayimg.com/images/g/J9sAAOSwqrli~NpH/s-l1600.jpg' },
		{ title: 'Fast & Furious 7', releaseYear: 2015, synopsis: 'Deckard Shaw seeks revenge against Dominic Toretto and his family.', duration: 137, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg' },
		{ title: 'Mission: Impossible – Fallout', releaseYear: 2018, synopsis: 'Ethan Hunt and his IMF team must prevent a global catastrophe.', duration: 147, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg' },
		{ title: 'Edge of Tomorrow', releaseYear: 2014, synopsis: 'A soldier relives the same day over and over in a war with aliens.', duration: 113, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg' },
		{ title: 'Avatar', releaseYear: 2009, synopsis: 'A paraplegic Marine dispatched to the moon Pandora.', duration: 162, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg' },
		{ title: 'Skyfall', releaseYear: 2012, synopsis: 'James Bond investigates an attack on MI6.', duration: 143, genre: 'Action', poster: 'https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg' },
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