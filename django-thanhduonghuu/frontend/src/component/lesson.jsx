import React, { useEffect, useMemo, useState } from "react";
import {
  deleteLesson,
  getListLesson,
  updateLessonDetail,
} from "../axios/lesson";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { convertDate } from "../utils/converDate";
import { useNavigate } from "react-router-dom";
import { store } from "../zustand/store";
import Dialog from "./dialog/dialog";
import { useFormik } from "formik";

const Lesson = () => {
  const navigate = useNavigate();
  const updateListLesson = store((state) => state.updateListLesson);
  const listLesson = store((state) => state.listLesson);
  const lesson = store((state) => state.lesson) || null;
  const updateLesson = store((state) => state.updateLesson);

  const [dialog, setDialog] = useState(false);

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      subject: lesson ? lesson.subject : "",
    },
    onSubmit: async () => {
      const subject = values.subject.trim();

      try {
        if (subject) {
          if (lesson) {
            const { id, tags, ...other } = lesson;
            await updateLessonDetail(lesson.id, { ...other, subject });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    enableReinitialize: true,
  });

  const handleDelete = async (id) => {
    try {
      await deleteLesson(id);
      const list = [...listLesson];
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list.splice(index, 1);
      }
      updateListLesson(list);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", width: 70 },
      { field: "subject", headerName: "Subject", width: 150 },
      // {
      //   field: "image",
      //   headerName: "Image",
      //   width: 200,
      //   renderCell(params) {
      //     const array = params.row.image.split("http://127.0.0.1:8000/");
      //     const linkImage = "http://127.0.0.1:8000/static/" + array[1];
      //     return (
      //       <Box
      //         component="img"
      //         sx={{
      //           height: 233,
      //           width: 350,
      //           maxHeight: { xs: 233, md: 167 },
      //           maxWidth: { xs: 350, md: 250 },
      //         }}
      //         alt="The house from the offer."
      //         src={linkImage}
      //       />
      //     );
      //   },
      // },
      { field: "content", headerName: "Content", flex: 1 },
      {
        field: "created_date",
        headerName: "Create",
        flex: 1,
        renderCell(params) {
          return convertDate(params.row.created_date);
        },
      },
      {
        field: "updated_date",
        headerName: "Update",
        flex: 1,
        renderCell(params) {
          return convertDate(params.row.updated_date);
        },
      },
      {
        field: "action",
        headerName: "Action",
        flex: 1,
        renderCell(params) {
          return (
            <Stack flexDirection="row" alignItems="center" gap={2}>
              <Button
                color="error"
                variant="contained"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </Button>
              {/* <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  updateLesson(params.row);
                  setDialog(true);
                }}
              >
                View
              </Button> */}
            </Stack>
          );
        },
      },
    ];
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await getListLesson();
        updateListLesson(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [updateListLesson]);

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="end" gap={2}>
        <Button
          variant="contained"
          onClick={() => setDialog(true)}
          color="success"
        >
          Add
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/tags");
          }}
        >
          Tag
        </Button>
      </Stack>
      <Typography variant="h1">Lesson Page</Typography>
      <DataGrid
        rows={listLesson}
        columns={columns}
        disableSelectionOnClick
        disableRowSelectionOnClick
        hideFooter
      />
      {/* <Dialog
        open={!!dialog}
        onClose={() => setDialog(false)}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Subject"
          variant="outlined"
          value={values.subject}
          onChange={handleChange}
          name="subject"
        />
      </Dialog> */}
    </Box>
  );
};

export default Lesson;
