import DefaultModal from "app/components/modals/defaultModal/defaultModal";
import GenericTextField from "app/components/genericTextField/GenericTextField";
import useCourseHook from "core/hooks/courseHook";
import { TCourse, TVideo, TVideos } from "core/models/course";
import React, { useState } from "react";
import { reorder } from "./helpers";
import { DropResult } from "react-beautiful-dnd";
import { CourseService } from "core/api/course/courseService";
import DefaultDialog from "app/components/defaultDialog/defaultDialog";
import CourseModalBody from "./courseModalBody";

let initialVideo: TVideo = {
  name: "",
  url: "",
  sequence: 0,
};

let initialCourse: TCourse = {
  description: "",
  videos: [],
};

const CourseRegisterModal = () => {
  const { isOpen, onOpen, onClose } = useCourseHook();

  const [tempCourse, setTempCourse] = useState<TVideos>([]);
  const [tempVideo, setTempVideo] = useState<TVideo>(initialVideo);
  const [confirmDialogState, setConfirmDialogState] = useState(false);
  const [cancelDialogState, setCancelDialogState] = useState(false);
  const [course, setCourse] = useState<TCourse>({
    description: "",
    videos: [],
  });

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescription = event.target.value;
    setCourse((prevCourse) => ({
      ...prevCourse,
      description: newDescription,
    }));
  };

  const handleRegister = () => {
    setCourse({
      ...course,
      videos: tempCourse,
    });
    setConfirmDialogState(true);
  };

  const handleClose = () => {
    onClose();
    setTempCourse([]);
    setTempVideo(initialVideo);
    setCancelDialogState(false);
    setConfirmDialogState(false);
    setCourse(initialCourse);
  };

  const handleSubmit = async () => {
    if (course) {
      await CourseService.registerNewCourse(course).then(() => {
        handleClose();
        window.location.reload();
      });
    }
  };

  const handleFieldChange =
    (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setTempVideo({
        ...tempVideo,
        [fieldName]: event.target.value,
      });
    };

  const validateVideo = (): boolean => {
    if (tempVideo.name !== "" && tempVideo.url !== "") {
      return true;
    }
    return false;
  };

  const addVideo = () => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(embed\/|v\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

    if (youtubeRegex.test(tempVideo.url)) {
      setTempCourse((prevVideos) => [
        ...prevVideos,
        {
          ...tempVideo,
          sequence: tempCourse.length + 1,
        },
      ]);
      setTempVideo(initialVideo);
    } else {
      alert("Url do vídeo é inválida");
    }
  };

  const removeVideoBySequence = (sequence: number) => {
    setTempCourse((prevVideos) =>
      prevVideos.filter((video) => video.sequence !== sequence)
    );
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;

    const newItems = reorder(tempCourse, source.index, destination.index);

    const updatedItems = newItems.map((item, index) => ({
      ...item,
      sequence: index + 1,
    }));

    setTempCourse(updatedItems);
  };

  let dialogBody = (
    <GenericTextField<string>
      label="Nome do curso"
      value={course.description}
      name="description"
      props={{
        onChange: handleDescriptionChange,
        variant: "standard",
        sx: {
          marginTop: "auto",
          marginBottom: -2,
        },
      }}
    />
  );

  return (
    <>
      <DefaultModal
        title="Montar curso"
        isOpen={isOpen}
        onClose={() => setCancelDialogState(true)}
        onOpen={onOpen}
        children={
          <CourseModalBody
            tempVideo={tempVideo}
            handleFieldChange={handleFieldChange}
            validateVideo={validateVideo}
            addVideo={addVideo}
            tempCourse={tempCourse}
            removeVideoBySequence={removeVideoBySequence}
            onDragEnd={onDragEnd}
            setCancelDialogState={setCancelDialogState}
            handleRegister={handleRegister}
          />
        }
      />
      <DefaultDialog
        title="Finalizar registro"
        body={dialogBody}
        isOpen={confirmDialogState}
        confirmAction={handleSubmit}
        onCloseAction={() => setConfirmDialogState(false)}
        disabled={course.description === ""}
      />
      <DefaultDialog
        title="Cancelar registro"
        isOpen={cancelDialogState}
        confirmAction={handleClose}
        onCloseAction={() => setCancelDialogState(false)}
        disabled={false}
      />
    </>
  );
};

export default CourseRegisterModal;
