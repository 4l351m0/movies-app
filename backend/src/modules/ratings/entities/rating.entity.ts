import { Movie } from "@modules/movies/entities/movie.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ratings')
export class Rating {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('int')
	value: number;

	@ManyToOne(
		() => Movie, movie => movie.ratings, 
		{ onDelete: 'CASCADE' }
	)
	movie: Movie;

	@Column({ name: 'movieId' })
	movieId: string;
}
