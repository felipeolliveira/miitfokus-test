import styled, { css } from 'styled-components';

import colors from '../../styles/colors';

interface Completed {
  completed?: boolean;
}

export const Container = styled.li<Completed>`
  padding: 20px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  > form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      button {
        opacity: 1 !important;
      }
    }

    button {
      background: transparent;
    }

    .update-task {
      flex: 1;
      display: flex;
      justify-content: flex-start;

      margin-left: 20px;
      font-size: 16px;

      input,
      textarea {
        width: 100%;
        background-color: ${colors.background};
        padding: 5px;
        color: ${colors.black};
        border-radius: 5px;
        border: none;
      }

      input {
        font-weight: 700;
      }

      textarea {
        resize: none;
        font-weight: 400;
        margin-top: 10px;
      }

      select {
        margin-top: 5px;
      }

      .update-buttons {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 0 10px;

        button {
          color: ${colors.green};
        }

        button + button {
          color: ${colors.red};
        }
      }
    }

    .description-task {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      font-size: 16px;

      strong {
        color: ${colors.black};
        font-weight: 700;
      }

      p {
        color: ${colors.black};
        font-weight: 400;
        margin-top: 10px;
      }

      ${({ completed }) =>
        completed &&
        css`
          label,
          p {
            color: ${colors.grey};
          }
        `}

      footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        span {
          color: ${colors.grey};
          margin-right: 10px;
        }

        button {
          color: ${colors.grey};
          opacity: 0;
          transition: all 200ms;

          & + button {
            margin-left: 10px;
          }
        }
        .delete:hover {
          color: ${colors.red};
        }
        .edit:hover {
          color: ${colors.blue};
        }
      }
    }
  }
`;
