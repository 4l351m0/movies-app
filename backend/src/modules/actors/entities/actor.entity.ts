import { MovieActor } from "@modules/movies/entities/movie-actor.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('actors')
export class Actor {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'first_name' })
	firstName: string;

	@Column({ name: 'last_name' })
	lastName: string;

	@Column({ nullable: true })
	birthDate: Date;

	@OneToMany(() => MovieActor, movieActor => movieActor.actor)
	movieActors: MovieActor[];
}
