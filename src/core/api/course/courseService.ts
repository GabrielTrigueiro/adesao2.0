import { COURSES } from "core/utils/constants";
import { axiosInstance } from "../axios/axiosInstance";
import { IPage, IResponseBody } from "core/models/utils";
import { TCourse } from "core/models/course";
import { AxiosError } from "axios";

const getAllCourses = async (): Promise<IPage<TCourse> | undefined> => {
  const response = await axiosInstance.get<IResponseBody<IPage<TCourse>>>(
    COURSES
  );
  return response.data.data;
};

const registerNewCourse = async (newCourse: TCourse): Promise<any> => {
  return await axiosInstance.post(COURSES, newCourse).then((response) => {
    if (response instanceof AxiosError) {
      return response;
    }
    return response;
  });
};

export const CourseService = {
  getAllCourses,
  registerNewCourse,
};
