import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentResolver } from "./Student.resolver";
import { StudentService } from "./Student.service";
import { Student } from "./student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
