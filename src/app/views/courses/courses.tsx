import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Button, Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CollapseMenu from "app/components/collapseMenu/collapseMenu";
import { TCourse } from "core/models/course";
import { fetchCourses } from "core/querryes/course/getCourseQuerry";
import useCourseHook from "core/hooks/courseHook";
import { useAppSelector } from "core/hooks/reduxHooks";
import { verifyRole } from "core/utils/roles";
import CourseRegisterModal from "app/components/modals/course/registerCourse/courseRegisterModal";
import {
  ContentHeader,
  ContentTitle,
  PageContentContainer,
} from "app/components/styles";
import { CenterFocusStrong, Height } from "@mui/icons-material";

const Classes = () => {
  const basicUserInfo = useAppSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  const { onOpen } = useCourseHook();
  const [expanded, setExpanded] = useState<string | false>(false);
  const [courses, setCourses] = useState<TCourse[]>([]);

  const { isSuccess, data } = useQuery({
    queryKey: ["courses", courses],
    staleTime: 16000,
    queryFn: () => fetchCourses(),
  });

  const onChangePainel =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const getVideoIdfromUrl = (url: string) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  };

  const isValidYouTubeVideoId = (videoId: string | null) => {
    return videoId !== null && videoId.length === 11;
  };

  const renderYouTubeVideo = (videoUrl: string) => {
    const videoId = getVideoIdfromUrl(videoUrl);
    if (isValidYouTubeVideoId(videoId) && videoId) {
      return (
        <YouTube
          videoId={videoId}
          opts={{
            width: "340px",
            height: "250px",
          }}
        />
      );
    } else {
      return (
        <Skeleton
          variant="rectangular"
          sx={{ width: "200px", height: "150px" }}
        />
      );
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setCourses(data.content);
    }
  }, [courses, data, isSuccess]);

  if (!verifyRole(basicUserInfo?.roles, ["ROLE_ADMIN", "ROLE_COURSES"])) {
    navigate(-1);
  }

  return (
    <PageContentContainer>
      <ContentHeader>
        <ContentTitle>Cursos</ContentTitle>
        {verifyRole(basicUserInfo?.roles, [
          "ROLE_ADMIN",
          "ROLE_CRUD_COURSES",
        ]) ? (
          <Button onClick={onOpen} variant={"contained"}>
            + Cadastrar
          </Button>
        ) : null}
      </ContentHeader>
      {courses.map((course, index) => (
        <CollapseMenu
          id={String(index)}
          key={course.description}
          title={course.description}
          expanded={expanded}
          onChangePainel={onChangePainel}
          body={
            <Grid container gap={1}>
              {course.videos.map((video) => (
                <Grid key={video.url} item>
                  {renderYouTubeVideo(video.url)}
                </Grid>
              ))}
            </Grid>
          }
        />
      ))}
      <CourseRegisterModal />
    </PageContentContainer>
  );
};

export default Classes;
