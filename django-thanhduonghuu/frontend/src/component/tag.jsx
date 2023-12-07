import React, { useEffect, useMemo, useState } from "react";
import { getListTag } from "../axios/tag";
import Box from "@mui/material/Box";
import { convertDate } from "../utils/converDate";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Tag = () => {
  const [listTag, setListTag] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const data = await getListTag();
        setListTag(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const columns = useMemo(() => {
    return [
      { field: "id", headerName: "ID", flex: 1 },
      { field: "name", headerName: "Name", flex: 1 },
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
    ];
  }, []);

  return (
    <Box>
      <Stack flexDirection="row" justifyContent="start">
        <Button
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          Lesson
        </Button>
      </Stack>
      <Typography variant="h1">Tag Page</Typography>
      <DataGrid
        rows={listTag}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
};

export default Tag;
