import { Button, Typography, Box, IconButton } from "@mui/material";
import GenericTextField from "app/components/genericTextField/GenericTextField";
import DraggableList from "app/components/draggableList/draggableList";
import { ModalBody, InfosArea, VideosArea, FooterArea } from "./styles";
import { TVideo, TVideos } from "core/models/course";
import { DropResult } from "react-beautiful-dnd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import React from "react";

interface ICourseModalBodyProps {
  tempVideo: TVideo;
  tempCourse: TVideos;
  validateVideo: () => boolean;
  addVideo: () => void;
  removeVideoBySequence: (sequence: number) => void;
  handleRegister: () => void;
  handleFieldChange: (
    fieldName: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDragEnd: ({ destination, source }: DropResult) => void;
  setCancelDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}

const CourseModalBody = (props: ICourseModalBodyProps) => {
  return (
    <ModalBody>
      <InfosArea>
        <GenericTextField<string>
          label="Título da aula"
          name="name"
          value={props.tempVideo.name}
          props={{
            onChange: props.handleFieldChange("name"),
            sx: { width: "40%" },
          }}
        />
        <GenericTextField<string>
          label="Url"
          name="url"
          value={props.tempVideo.url}
          props={{
            onChange: props.handleFieldChange("url"),
            sx: { flex: 1 },
          }}
        />
        <IconButton
          disabled={!props.validateVideo()}
          size="small"
          sx={{ marginTop: 1, color: (theme) => theme.palette.primary.main }}
          onClick={props.addVideo}
        >
          <AddTaskIcon
            sx={{
              fontSize: "1.7pc",
            }}
          />
        </IconButton>
      </InfosArea>

      <Typography fontSize={"1.5pc"} fontWeight="bold" textAlign={"center"}>
        Sequência das aulas
      </Typography>
      <VideosArea>
        {props.tempCourse.length === 0 ? (
          <Typography
            sx={{
              margin: "auto",
              color: (theme) => theme.palette.primary.dark,
            }}
          >
            Adicione algum vídeo...
          </Typography>
        ) : (
          <Box sx={{ flex: 1 }}>
            <DraggableList
              remove={props.removeVideoBySequence}
              items={props.tempCourse}
              onDragEnd={props.onDragEnd}
            />
          </Box>
        )}
      </VideosArea>

      <FooterArea>
        <Button
          onClick={() => props.setCancelDialogState(true)}
          size="small"
          variant="contained"
        >
          Cancelar
        </Button>
        <Button
          disabled={props.tempCourse.length === 0}
          onClick={props.handleRegister}
          size="small"
          variant="contained"
        >
          Criar curso
        </Button>
      </FooterArea>
    </ModalBody>
  );
};

export default CourseModalBody;
