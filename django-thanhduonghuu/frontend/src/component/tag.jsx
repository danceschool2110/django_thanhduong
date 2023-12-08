import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  createTag,
  deleteTag,
  getListTag,
  updateTagDetail,
} from "../axios/tag";
import Box from "@mui/material/Box";
import { convertDate } from "../utils/converDate";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Dialog from "./dialog/dialog";
import { store } from "../zustand/store";
import { useFormik } from "formik";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const Tag = () => {
  const listTag = store((state) => state.listTag);
  const tag = store((state) => state.tag) || null;

  const updateListTag = store((state) => state.updateListTag);
  const updateTag = store((state) => state.updateTag);

  const navigate = useNavigate();

  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getListTag();
        updateListTag(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [updateListTag]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await deleteTag(id);
        const list = [...listTag];
        const index = list.findIndex((item) => item.id === id);
        if (index !== -1) {
          list.splice(index, 1);
        }
        updateListTag(list);
      } catch (e) {
        console.log(e);
      }
    },
    [listTag, updateListTag]
  );

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", flex: 1 },
      { field: "name", headerName: "Name", flex: 1 },
      {
        field: "active",
        headerName: "Active",
        flex: 1,
        renderCell(params) {
          return params.row.active ? (
            <CheckCircleOutlineIcon color="success" />
          ) : null;
        },
      },
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
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  updateTag(params.row);
                  setDialog(true);
                }}
              >
                View
              </Button>
            </Stack>
          );
        },
      },
    ];
  }, [handleDelete, updateTag]);

  const { handleChange, handleSubmit, values, resetForm } = useFormik({
    initialValues: {
      name: tag ? tag.name : "",
      active: tag ? tag.active : true,
    },
    onSubmit: async () => {
      const name = values.name.trim();
      const active = values.active;
      const body = { name, active };
      if (name) {
        setLoading(true);
        try {
          const list = [...listTag];
          if (tag) {
            const { id } = tag;
            const data = await updateTagDetail(id, body);
            const index = list.findIndex((item) => item.id === id);
            if (index !== -1) {
              list.splice(index, 1, data);
            }
            updateListTag(list);
          } else {
            const data = await createTag(body);
            list.push(data);
            updateListTag(list);
          }
          setDialog(false);
          resetForm();
          updateTag(null);
        } catch (e) {
          console.log(e);
        }
        setLoading(false);
      }
    },
    enableReinitialize: true,
  });

  return (
    <Box>
      <Typography variant="h1">Tag Page</Typography>
      <Stack flexDirection="row" justifyContent="start" gap={2} marginY={2}>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Lesson
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            updateTag(null);
            setDialog(true);
          }}
          color="success"
        >
          Add
        </Button>
      </Stack>
      <DataGrid
        rows={listTag}
        columns={columns}
        disableSelectionOnClick
        disableRowSelectionOnClick
        hideFooter
      />
      <Dialog
        open={!!dialog}
        onClose={() => {
          setDialog(false);
          updateTag(null);
          resetForm();
        }}
        onSubmit={handleSubmit}
        loading={loading}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={values.name}
          onChange={handleChange}
          name="name"
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox checked={!!values.active} />}
          value={!!values.active}
          onChange={handleChange}
          label="Active"
          name="active"
        />
      </Dialog>
    </Box>
  );
};

export default Tag;
