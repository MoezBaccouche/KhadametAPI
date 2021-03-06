import { SkillForProfileDto } from 'src/skills/DTOs/skillForProfile.dto';
import { SkillRating } from 'src/skillRatings/skillRatings.interface';

export class ProfessionalForProfileDto {
  constructor(
    public id: string,
    public name: string,
    public picture: string,
    public address: string,
    public phone: string,
    public email: string,
    public age: number,
    public reviews: SkillRating[],
    public playerId: string,
    public skills?: SkillForProfileDto[],
  ) {}
}
