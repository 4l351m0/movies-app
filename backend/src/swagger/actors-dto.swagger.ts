import { ApiProperty } from '@nestjs/swagger';

export const CreateActorFirstNameSwagger = () => ApiProperty({ description: "Actor's First Name", example: 'John' });
export const CreateActorLastNameSwagger = () => ApiProperty({ description: "Actor's Last Name", example: 'Doe' });
export const CreateActorBirthDateSwagger = () => ApiProperty({ description: "Actor's Birth Date", example: '1989-07-09', required: false }); 