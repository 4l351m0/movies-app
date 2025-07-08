import { Rating } from "@modules/ratings/entities/rating.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieActor } from "./movie-actor.entity";

@Entity('movies')
export class Movie {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	title: string;

	@Column('int')
	releaseYear: number;

	@Column('text')
	synopsis: string;

	@OneToMany(() => Rating, rating => rating.movie)
	ratings: Rating[];

	@OneToMany(() => MovieActor, movieActor => movieActor.movie)
	movieActors: MovieActor[]
}