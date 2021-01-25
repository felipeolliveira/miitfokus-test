import styled, { css } from 'styled-components';

import colors from '../styles/colors';

interface InputSectionDTO {
  errorInputs: boolean;
}

export const TodoContainer = styled.div`
  height: 100vh;
  padding-top: 50px;

  h2 {
    font-size: 28px;
    font-weight: 700;
    color: ${colors.orange};
  }

  button {
    background-color: transparent;
  }

  select {
    border: none;
    background-color: ${colors.white};
    padding: 5px;
    border-radius: 50px;
    font-size: 14px;
  }
`;

export const InputSection = styled.section<InputSectionDTO>`
  height: auto;
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: center;

  min-height: 300px;
  padding: 10px 30px;

  header {
    h1 {
      font-size: 42px;
      text-transform: uppercase;
      font-weight: 700;
      color: ${colors.orange};
    }

    p {
      font-size: 16px;
      font-weight: 400;
      color: ${colors.white};

      margin-top: 15px;
    }
  }

  > form {
    display: flex;
    flex-direction: column;
    margin-left: 50px;

    input,
    textarea {
      resize: none;
      width: 50vw;
      min-width: 200px;
      max-width: 540px;
      padding: 10px 20px;
      border-radius: 5px;
      border: 2px solid ${colors.white};
    }

    textarea {
      margin-top: 30px;
    }

    p {
      display: none;
      text-align: center;
      margin-top: 5px;
      font-size: 12px;
      color: ${colors.orange};
    }

    ${({ errorInputs }) =>
      errorInputs &&
      css`
        input,
        textarea {
          border-color: ${colors.orange};
        }

        p {
          display: block;
        }
      `}

    button {
      width: 50%;
      background-color: ${colors.orange};
      padding: 15px;
      border-radius: 5px;
      margin-top: 15px;

      align-self: center;

      text-transform: uppercase;
      color: ${colors.white};
      font-size: 16px;

      transition: all 200ms;

      &:hover {
        background-color: ${colors.orangeDark};
      }
    }
  }
`;

export const StatusSection = styled.section`
  height: 60%;
  margin-top: 30px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr;
  grid-template-areas: "created progress-area late completed";

  .task-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > div {
      margin-top: 10px;
    }

    button {
      width: 200px;
      padding: 5px;
      border-radius: 5px;
      color: ${colors.grey};
      transition: all 200ms;

      &:hover {
        text-decoration: underline;
        color: ${colors.red};
      }
    }
  }
`;

export const Created = styled.div`
  grid-area: created;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  padding: 10px;
`;
export const Progress = styled.div`
  grid-area: progress-area;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  padding: 10px;
`;
export const Late = styled.div`
  grid-area: late;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;

  padding: 10px;
`;

export const Completed = styled.section`
  grid-area: completed;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;

  padding: 10px;
  p,
  label {
    text-decoration: line-through;
  }
`;

export const Tasks = styled.ul`
  width: 100%;
  max-width: 600px;
  list-style: none;
  margin-top: 30px;
  border-radius: 5px;
  background-color: ${colors.white};
  padding: 0px 20px;
`;
