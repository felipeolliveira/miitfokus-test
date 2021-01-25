import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';

import logo from '../assets/todo-logo.svg';
import Actions from '../components/Actions';
import TaskItem from '../components/TaskItem';
import api from '../services/api';
import {
    Completed, Created, InputSection, Late, Progress, StatusSection, Tasks, TodoContainer
} from './styles';

interface TaskDTO {
  id: string;
  name: string;
  description: string;
  status: string;
  due_date?: Date;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskDTO[]>([]);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setinputDescription] = useState("");
  const [errorInputs, setErrorInputs] = useState(false);

  const [status, setStatus] = useState("");

  const loadTasks = useCallback(async () => {
    const { data } = await api.get("/");
    setTasks(data);
  }, []);

  const postTask = useCallback(
    async (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
      });

      const validInputs = await schema.isValid({
        title: inputTitle,
        description: inputDescription,
      });

      setErrorInputs(!validInputs);

      if (validInputs) {
        const { data } = await api.post("/", {
          name: inputTitle,
          description: inputDescription,
          status: "criada",
          due_date: new Date(),
        });

        setTasks([...tasks, data]);
        setInputTitle("");
        setinputDescription("");
      }
    },
    [inputDescription, inputTitle, tasks]
  );

  const deleteTask = useCallback(
    async (id: string, status: string) => {
      await api.delete(`/${id}?status=${status}`);
      loadTasks();
    },
    [loadTasks]
  );

  const updateTask = useCallback(
    async (id: string, updateData: TaskDTO): Promise<void> => {
      await api.put(`/${id}`, updateData);
      loadTasks();
    },
    [loadTasks]
  );

  const updateStatusTasks = useCallback(
    async (statusOut: string, statusIn: string): Promise<void> => {
      await api.patch(`/update-status?${statusOut}`, {
        statusIn,
      });
      loadTasks();
    },
    [loadTasks]
  );

  useEffect(() => {
    async function LoadTaskList() {
      await loadTasks();
    }

    LoadTaskList();
  }, [loadTasks]);

  return (
    <TodoContainer>
      <InputSection errorInputs={errorInputs}>
        <header>
          <img src={logo} alt="logo" />
        </header>
        <form name="todo">
          <input
            type="text"
            placeholder="Adicione um título"
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />
          <textarea
            placeholder="Descreva o que fazer"
            rows={3}
            value={inputDescription}
            onChange={(e) => {
              setinputDescription(e.target.value);
            }}
          />
          <p>Insira as informações acima para adicionar um novo item</p>
          <button type="button" onClick={postTask}>
            Adicionar
          </button>
        </form>
        <Actions deleteTask={deleteTask} />
      </InputSection>

      <StatusSection>
        <Created>
          <div className="task-group">
            <h2>Criadas</h2>
            <div>
              <select
                name="status"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option selected value="criada">
                  criada
                </option>
                <option value="em progresso">em progresso</option>
                <option value="atrasada">atrasada</option>
                <option value="completa">completa</option>
              </select>
              <button onClick={() => updateStatusTasks("criada", status)}>
                Alterar status
              </button>
            </div>
            <button onClick={() => deleteTask("delete-by-status", "criada")}>
              Excluir todas abaixo
            </button>
          </div>
          <Tasks>
            {tasks &&
              tasks.map(
                (task) =>
                  task.status === "criada" && (
                    <TaskItem
                      key={task.id}
                      data={task}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  )
              )}
          </Tasks>
        </Created>

        <Progress>
          <div className="task-group">
            <h2>Em Progresso</h2>
            <div>
              <select
                name="status"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="criada">criada</option>
                <option selected value="em progresso">
                  em progresso
                </option>
                <option value="atrasada">atrasada</option>
                <option value="completa">completa</option>
              </select>
              <button onClick={() => updateStatusTasks("criada", status)}>
                Alterar status
              </button>
            </div>
            <button
              onClick={() => deleteTask("delete-by-status", "em progresso")}
            >
              Excluir todas abaixo
            </button>
          </div>
          <Tasks>
            {tasks &&
              tasks.map(
                (task) =>
                  task.status === "em progresso" && (
                    <TaskItem
                      key={task.id}
                      data={task}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  )
              )}
          </Tasks>
        </Progress>

        <Late>
          <div className="task-group">
            <h2>Atrasadas</h2>
            <div>
              <select
                name="status"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="criada">criada</option>
                <option value="em progresso">em progresso</option>
                <option selected value="atrasada">
                  atrasada
                </option>
                <option value="completa">completa</option>
              </select>
              <button onClick={() => updateStatusTasks("criada", status)}>
                Alterar status
              </button>
            </div>
            <button onClick={() => deleteTask("delete-by-status", "atrasada")}>
              Excluir todas abaixo
            </button>
          </div>
          <Tasks>
            {tasks &&
              tasks.map(
                (task) =>
                  task.status === "atrasada" && (
                    <TaskItem
                      key={task.id}
                      data={task}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                    />
                  )
              )}
          </Tasks>
        </Late>

        <Completed>
          <div className="task-group">
            <h2>Completas</h2>
            <div>
              <select
                name="status"
                id="status"
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="criada">criada</option>
                <option value="em progresso">em progresso</option>
                <option value="atrasada">atrasada</option>
                <option selected value="completa">
                  completa
                </option>
              </select>
              <button onClick={() => updateStatusTasks("criada", status)}>
                Alterar status
              </button>
            </div>
            <button onClick={() => deleteTask("delete-by-status", "completa")}>
              Excluir todas abaixo
            </button>
          </div>
          <Tasks>
            {tasks &&
              tasks.map(
                (task) =>
                  task.status === "completa" && (
                    <TaskItem key={task.id} data={task} />
                  )
              )}
          </Tasks>
        </Completed>
      </StatusSection>
    </TodoContainer>
  );
};

export default Home;
