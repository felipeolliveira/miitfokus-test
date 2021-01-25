import styled from 'styled-components';

import colors from '../../styles/colors';

export const Container = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 80px;

  .search {
    width: 100%;
    display: flex;

    input {
      flex: 1;
      padding: 10px;
      border-radius: 5px;
    }

    button {
      margin-left: 15px;
      border-radius: 5px;
      padding: 0 20px;
      border: 2px solid ${colors.orange};
      color: ${colors.orange};
      transition: all 200ms;

      &:hover {
        color: ${colors.white};
        background-color: ${colors.orange};
      }
    }
  }

  .actions {
    button {
      padding: 10px;
      border-radius: 5px;
      color: ${colors.grey};
      border: 2px solid ${colors.grey};
      margin-top: 20px;
      transition: all 200ms;

      &:hover {
        border: 2px solid ${colors.red};
        background-color: ${colors.red};
        color: ${colors.white};
      }

      & + button {
        margin-left: 10px;

        &:hover {
          border: 2px solid ${colors.green};
          background-color: ${colors.green};
          color: ${colors.white};
        }
      }
    }
  }
`;
