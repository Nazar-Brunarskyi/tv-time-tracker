import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './schemas/test.schema';
import * as mongoose from 'mongoose'
import { CreateTestDto } from './DTO/create-test.dto';

@Injectable()
export class TestService {
  constructor(
    @InjectModel(Test.name)
    private testModel: mongoose.Model<Test>
  ) { }

  create(
    { title, description }: CreateTestDto,
  ) {
    const newTest = new this.testModel({
      title,
      description,
    })

    return newTest.save();
  }
}
