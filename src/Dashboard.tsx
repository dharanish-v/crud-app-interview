import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "./reduxHooks";
import { edit } from "./slices/formSlice";
import { request } from "./utils/axios-util";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    request({ url: "/posts", method: "GET" }).then(setPosts);
    return () => {};
  }, []);

  return (
    <Grid container spacing={2}>
      {posts.map((post: any, index: any) => {
        return (
          <Grid key={post.id} item xs={4}>
            <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
              <div
                onClick={() => {
                  dispatch(edit(post));
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.body}
                  </Typography>
                </CardContent>
              </div>
              <DeleteOutlinedIcon
                onClick={() =>
                  request({ url: "/posts/" + post.id, method: "DELETE" })
                }
              />
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Dashboard;
