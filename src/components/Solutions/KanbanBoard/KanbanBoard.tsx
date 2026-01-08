import React, { ReactElement, useState } from 'react';

const KanbanBoard = (): ReactElement => {
  const [board, setBoard] = useState({
    backlog: [
      {
        title: 'Set up project',
        description: 'Initialize repo and basic structure',
      },
    ],
    inProgress: [],
    completed: [],
  });
  const colTitleMap = {
    backlog: 'Backlog',
    inProgress: 'In Progress',
    completed: 'Completed',
  };
  const [draggedCol, setDraggedCol] = useState('');
  const [ticket, setTicket] = useState<any | null>(null);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [creatingTicket, setCreatingTicket] = useState(false);
  const onDragStart = (draggedCol, ticket) => {
    setTicket(ticket);
    setDraggedCol(draggedCol);
  };
  const onDrop = (col) => {
    if (!draggedCol || draggedCol === col) return;
    setBoard({
      ...board,
      [col]: [...board[col], ticket],
      [draggedCol]: board[draggedCol].filter(
        (item) => item.title !== ticket?.title
      ),
    });
    setTicket(null);
    setDraggedCol('');
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onCreatingTicket = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };
  const onDelete = () => {
    setCreatingTicket(false);
  };
  const onCreate = () => {
    setBoard({ ...board, backlog: [...board.backlog, newTicket] });
    setNewTicket({ title: '', description: '' });
    setCreatingTicket(false);
  };
  return (
    <div className="kanban-board-wrapper">
      {Object.keys(board).map((col) => (
        <div
          key="col"
          onDragOver={onDragOver}
          onDrop={() => onDrop(col)}
          className="kanban-board-col"
        >
          <div className="center">
            <strong>{colTitleMap[col]}</strong>
          </div>
          {board[col].map((ticket) => (
            <div
              key="title"
              onDragStart={() => onDragStart(col, ticket)}
              className="kanban-board-ticket"
              draggable
            >
              <div>
                <strong>{ticket.title}</strong>
              </div>
              <div>{ticket.description}</div>
            </div>
          ))}
          {col === 'backlog' && (
            <>
              {creatingTicket ? (
                <div className="kanban-board-ticket">
                  <input
                    placeholder="Title"
                    name="title"
                    onChange={onCreatingTicket}
                  ></input>
                  <input
                    placeholder="Description"
                    name="description"
                    onChange={onCreatingTicket}
                  ></input>
                  <div>
                    <button
                      className="kanban-board-secondary-btn"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                    <button
                      className="kanban-board-primary-btn"
                      onClick={onCreate}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCreatingTicket(true)}
                  className="kanban-board-primary-btn"
                >
                  + Create Ticket
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
