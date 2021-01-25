import React from 'react';

import { Container } from './styles';

interface ActionsDTO {
  deleteTask(id: string, status: string): void;
}

const Actions: React.FC<ActionsDTO> = ({ deleteTask }) => {
  return (
    <Container>
      <div className="actions">
        <button onClick={() => deleteTask("delete-all", "")}>
          Excluir todas as tarefas
        </button>
      </div>
    </Container>
  );
};

export default Actions;
