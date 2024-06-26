import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Card from "../components/Card";
const Container = styled.div`
  flex: 2;
`;

export const Recomendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};
