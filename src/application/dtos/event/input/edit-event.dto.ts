import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsEmail,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class FoodOptionsDTO {
  @IsOptional()
  @IsBoolean()
  morning?: boolean;

  @IsOptional()
  @IsBoolean()
  noon?: boolean;

  @IsOptional()
  @IsBoolean()
  evening?: boolean;
}

export class SpecialParticipantDto {
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;
}

export class EditEventDTO {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(1000)
  description!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  location!: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  floor_details?: string;

  @IsDateString()
  @IsNotEmpty()
  date!: Date;

  @IsBoolean()
  @IsNotEmpty()
  is_paid!: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0.01)
  price?: number;

  @IsBoolean()
  @IsNotEmpty()
  food_available!: boolean;

  @IsOptional()
  @IsString()
  organizer_id!: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => FoodOptionsDTO)
  food_options?: FoodOptionsDTO;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10000)
  max_tickets!: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecialParticipantDto)
  guests?: SpecialParticipantDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecialParticipantDto)
  judges?: SpecialParticipantDto[];
}
