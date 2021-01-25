import React, { useCallback, useState } from 'react';
import { FiCheckCircle, FiEdit3, FiXCircle } from 'react-icons/fi';

import { Container } from './styles';

interface TaskDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  due_date?: Date;
  created_at?: string;
}

interface TaskData {
  data: TaskDTO;
  deleteTask?: { (id: string, status: string): Promise<void> };
  updateTask?: { (id: string, updateData: TaskDTO): Promise<void> };
  completed?: boolean;
}

const TaskItem: React.FC<TaskData> = ({
  data,
  completed,
  deleteTask,
  updateTask,
}) => {
  const [updateField, setUpdateField] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(data.name);
  const [updateStatus, setUpdateStatus] = useState(data.status);
  const [updatedDescription, setUpdatedDescription] = useState(
    data.description
  );

  const parseDate = useCallback((date: string): string => {
    const dateObj = new Date(date);

    const day = dateObj.getUTCDate();
    const month = dateObj.getUTCMonth() + 1;
    const year = dateObj.getUTCFullYear();
    const hour = dateObj.getUTCHours();
    const minutes = dateObj.getUTCMinutes();

    return `${day}/${month
      .toString()
      .padStart(2, "0")}/${year} - ${hour
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }, []);

  return (
    <Container completed={completed}>
      {completed ? (
        <form>
          <div className="description-task">
            <strong>{data.name}</strong>
            <p>{data.description}</p>
          </div>
        </form>
      ) : (
        <form>
          {updateField ? (
            <div className="update-task">
              <div>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                />
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                />
                <select
                  name="status"
                  id="status"
                  defaultValue={updatedDescription}
                  onChange={(e) => setUpdateStatus(e.target.value)}
                >
                  <option value="criada">criada</option>
                  <option value="em progresso">em progresso</option>
                  <option value="atrasada">atrasada</option>
                  <option value="completa">completa</option>
                </select>
              </div>
              <div className="update-buttons">
                <button
                  type="button"
                  onClick={() => {
                    if (updateTask) {
                      updateTask(data.id, {
                        id: data.id,
                        description: updatedDescription,
                        name: updateTitle,
                        status: updateStatus,
                      });
                      setUpdateField(false);
                    }
                  }}
                >
                  <FiCheckCircle size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUpdateField(false);
                    setUpdateTitle(data.name);
                    setUpdatedDescription(data.description);
                  }}
                >
                  <FiXCircle size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="description-task">
              <strong>{data.name}</strong>
              <p>{data.description}</p>

              <footer>
                <span>{data.created_at && parseDate(data.created_at)}</span>
                <div>
                  <button
                    className="delete"
                    type="button"
                    onClick={() => deleteTask && deleteTask(data.id, "")}
                  >
                    <FiXCircle size={20} />
                  </button>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => setUpdateField(true)}
                  >
                    <FiEdit3 size={20} />
                  </button>
                </div>
              </footer>
            </div>
          )}
        </form>
      )}
    </Container>
  );
};

export default TaskItem;
