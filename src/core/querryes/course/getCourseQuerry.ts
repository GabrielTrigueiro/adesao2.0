import { CourseService } from "core/api/course/courseService";

export const fetchCourses = async () => {
  return await CourseService.getAllCourses();
};
