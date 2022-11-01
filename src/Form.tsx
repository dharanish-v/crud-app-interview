import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { reset } from "./slices/formSlice";
import { request } from "./utils/axios-util";

type Inputs = {
  example: string;
  exampleRequired: string;
};

// {
//   "userId": 8,
//   "id": 79,
//   "title": "pariatur consequatur quia magnam autem omnis non amet",
//   "body": "libero accusantium et et facere incidunt sit dolorem\nnon excepturi qui quia sed laudantium\nquisquam molestiae ducimus est\nofficiis esse molestiae iste et quos"
// },

export default function Form() {
  const form = useAppSelector((state) => state.form.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("forma...", form);
  }, [form]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: form });

  const handleEdit = (data: any) => {
    request({
      url: "/posts/" + data.userId,
      method: "PATCH",
      body: JSON.stringify({
        id: data.id,
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
    });
  };

  const handleAdd = (data: any) => {
    request({
      url: "/posts",
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        body: data.body,
        userId: data.userId,
      }),
    });
  };

  return (
    <Container maxWidth="sm">
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("submited", data);
            data.editEnabled ? handleEdit(data) : handleAdd(data);
            dispatch(reset());
          },
          (err) => {
            console.log("Error", err);
          }
        )}
      >
        <Stack spacing={2}>
          <TextField
            {...register("userId", { required: "This is Required" })}
            type="number"
            id="userID"
            label="UserID"
            variant="outlined"
            error={!!errors?.userId}
            disabled={form.editEnabled}
          />
          <TextField
            {...register("title", { required: "This is Required" })}
            id="title"
            label="Title"
            variant="outlined"
            error={!!errors?.title}
          />
          <TextField
            {...register("body", { required: "This is Required" })}
            id="body"
            label="Body"
            variant="outlined"
            error={!!errors?.body}
          />
          <Button type="submit" variant="outlined">
            {form.editEnabled ? "Edit" : "Add"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
