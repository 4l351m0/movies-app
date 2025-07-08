import { Rating } from "@modules/ratings/entities/rating.entity";
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieActor } from "./movie-actor.entity";

@Entity('movies')
export class Movie {
	@ApiProperty({ example: 'uuid', description: 'Movie unique identifier' })
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ApiProperty({ example: 'The Avengers', description: 'Title of the movie' })
	@Column({ unique: true })
	title: string;

	@ApiProperty({ example: 2012, description: 'Release year of the movie' })
	@Column('int')
	releaseYear: number;

	@ApiProperty({ example: "Earth's mightiest heroes must come together to stop Loki.", description: 'Synopsis of the movie' })
	@Column('text')
	synopsis: string;

	@ApiProperty({ example: 'Action', description: 'Main genre of the movie', required: false })
	@Column({ nullable: true })
	genre?: string;

	@ApiProperty({ example: 143, description: 'Duration of the movie in minutes', required: false })
	@Column({ nullable: true })
	duration?: number;

	@ApiProperty({ example: ['Action', 'Adventure', 'Sci-Fi'], description: 'Genres of the movie', required: false, type: [String] })
	@Column('text', { array: true, nullable: true })
	genres?: string[];

	@ApiProperty({ type: () => [Rating], required: false })
	@OneToMany(() => Rating, rating => rating.movie)
	ratings: Rating[];

	@ApiProperty({ type: () => [MovieActor], required: false })
	@OneToMany(() => MovieActor, movieActor => movieActor.movie)
	movieActors: MovieActor[];

	@ApiProperty({ example: 'https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg', description: 'Poster image URL of the movie', required: false })
	@Column({ nullable: true })
	poster?: string;
}