import React from "react";
import styled from 'styled-components'

const Container = styled.div`
    width: 400px;
    border: 1px solid rgb(250, 250, 250);
    border-radius: 10px;
`

type propType = {
  title: string,
  detail: string,
}

const InfoBox = ({ title, detail }: propType): JSX.Element => (
  <Container>
    <p>{title}</p>
    <p>{detail}</p>
  </Container>
)

export default InfoBox;