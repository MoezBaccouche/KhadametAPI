import { Injectable, Param, Get } from '@nestjs/common';
import { ProfessionalSkill } from './professionalSkills.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessionalSkillsService {
  constructor(
    @InjectModel('ProfessionalSkills')
    private readonly professionalSkillModel: Model<ProfessionalSkill>,
  ) {}

  async findAll(): Promise<ProfessionalSkill[]> {
    return await this.professionalSkillModel.find();
  }

  async findOne(id: string): Promise<ProfessionalSkill> {
    return await this.professionalSkillModel.findOne({ _id: id });
  }

  async create(
    professionalSkill: ProfessionalSkill,
  ): Promise<ProfessionalSkill> {
    const newProfessionalSkill = new this.professionalSkillModel(
      professionalSkill,
    );
    return await newProfessionalSkill.save();
  }

  async createMany(
    professionalSkills: ProfessionalSkill[],
    professionalId: string,
  ): Promise<ProfessionalSkill[]> {
    professionalSkills.map(skill => {
      skill.professionalId = professionalId;
      skill.skillId = skill.id;
    });

    return await this.professionalSkillModel.insertMany(professionalSkills);
  }

  async delete(id: string): Promise<ProfessionalSkill> {
    return await this.professionalSkillModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    professionalSkill: ProfessionalSkill,
  ): Promise<ProfessionalSkill> {
    return await this.professionalSkillModel.findByIdAndUpdate(
      id,
      professionalSkill,
      {
        new: true,
      },
    );
  }

  async findBySkill(skillId: string): Promise<ProfessionalSkill[]> {
    return await this.professionalSkillModel.find({ skillId });
  }

  async findByProfessional(
    professionalId: string,
  ): Promise<ProfessionalSkill[]> {
    return await this.professionalSkillModel.find({ professionalId });
  }

  async updateProfessionalSkills(
    professionalSkills: ProfessionalSkill[],
    professionalId: string,
  ): Promise<ProfessionalSkill[]> {
    await this.professionalSkillModel.deleteMany({
      professionalId,
    });

    professionalSkills.map(skill => {
      console.log('SKILL', skill);
      skill.professionalId = professionalId;
      skill.skillId = skill.id;
    });

    return await this.professionalSkillModel.insertMany(professionalSkills);
  }
}
