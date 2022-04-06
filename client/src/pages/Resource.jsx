import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { resourceListAction } from "../actions/resourceAction";
import { LoadingOverlay, NativeSelect } from "@mantine/core";
import { viewCourseNameAction } from "../actions/courseAction";
import { Hash } from "tabler-icons-react";
import { ResourceList } from "../components/ResourceList";
import { usePrevious } from "../hooks/usePrevious";

const Resource = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const courseNames = useSelector(state => state.courseNames);
  const { courseInfo } = courseNames;

  useEffect(() => {
    !userInfo || (!courseInfo && navigate("/", { replace: true }));
  }, []);

  const [course, setCourse] = useState(courseInfo[0].id);
  const prevCourse = usePrevious(course);

  const resourceList = useSelector(state => state.resourceList);
  const { loading, error, resources } = resourceList;

  useEffect(() => {
    if (course.length !== 0 && prevCourse !== course)
      dispatch(resourceListAction(course));
  }, [course, dispatch, prevCourse]);

  const data = courseInfo.map(v => ({
    value: v.id,
    label: v.courseName,
  }));

  return (
    <>
      <Wrapper>
        <Header>
          <Title>Resources</Title>
          <NativeSelect
            label="Select your enrolled Course"
            placeholder="Select a course"
            data={data}
            value={course}
            onChange={e => setCourse(e.currentTarget.value)}
            icon={<Hash size={14} />}
          />
        </Header>
        {loading && resources.length === 0 && <LoadingOverlay visible={true} />}
        <Container>
          {resources.length !== 0 && <ResourceList data={resources} />}
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center
  height: 100vh;
  width: 100%;
  padding: 120px;
  position: relative;
`;
const Header = styled.div`
  flex: 0.16;
`;
const Title = styled.h1``;
const Container = styled.div`
  flex: 0.84;

  background-color: f1f1f1;
`;

export default Resource;
