import { Controller, Post, Body } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './DTO/create-test.dto';

@Controller('test')
export class TestController {
  constructor(
    private testService: TestService,
  ) { }

  @Post()
  create(
    @Body() createTestDto: CreateTestDto
  ) {
    return this.testService.create(createTestDto)
  }
}
