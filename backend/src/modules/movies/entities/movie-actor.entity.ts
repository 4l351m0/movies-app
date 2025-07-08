import { Actor } from "@modules/actors/entities/actor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Movie } from "./movie.entity";

@Entity('movie_actors')
@Unique(['movieId', 'actorId'])
export class MovieActor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	movieId: string;

	@Column()
	actorId: string;

	@ManyToOne(
		() => Movie, movie => movie.movieActors,
		{ onDelete: 'CASCADE' }
	)
	movie: import("./movie.entity").Movie;

	@ManyToOne(
		() => Actor, actor => actor.movieActors,
		{ onDelete: 'CASCADE' }
	)
	actor: Actor;

}