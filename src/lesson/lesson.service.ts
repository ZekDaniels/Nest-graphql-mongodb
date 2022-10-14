import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Lesson } from "./lesson.entity";
import { v4 as uuid } from "uuid";
import { CreateLessonInput } from "./lesson.input";
import { AssignStudentToLessonInput } from "./assign-student-to-lesson.input";

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private lessonRepository: Repository<Lesson>
  ) {}

  async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;

    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students: [],
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentToLesson(
    assignStudentToLessonInput: AssignStudentToLessonInput
  ): Promise<Lesson> {
    const { lessonId, studentsIds } = assignStudentToLessonInput;
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    lesson.students = [...lesson.students, ...studentsIds];

    return this.lessonRepository.save(lesson);
  }
}
