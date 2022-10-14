import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { StudentService } from "src/student/Student.service";
import { AssignStudentToLessonInput } from "./assign-student-to-lesson.input";
import { Lesson } from "./lesson.entity";
import { CreateLessonInput } from "./lesson.input";
import { LessonService } from "./lesson.service";
import { LessonType } from "./lesson.type";

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService, private studentService: StudentService) {}

  @Query((returns) => LessonType)
  lesson(@Args("id") id: string) {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  lessons() {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args("createLessonInput") createLessonInput: CreateLessonInput
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignStudentToLesson(
    @Args("assignStudentToLessonInput")
    assignStudentToLessonInput: AssignStudentToLessonInput
  ) {
    return this.lessonService.assignStudentToLesson(assignStudentToLessonInput);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson);
    
    return this.studentService.getManyStudents(lesson.students) 
  }
}
