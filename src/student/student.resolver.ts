import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { StudentService } from "./Student.service";
import { StudentType } from "./Student.type";

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  students() {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  student(@Args("id") id: string) {
    return this.studentService.getStudent(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args("createStudentInput") createStudentInput: CreateStudentInput
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
