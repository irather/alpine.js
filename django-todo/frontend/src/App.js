import React, { useState, useEffect } from "react";
import CustomModal from "./components/CustomModal";
import axios from "axios";

function App() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [activeItem, setActiveItem] = useState({ title: "", description: "", completed: false });
  const [taskList, setTaskList] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = () => {
    axios
      .get(process.env.REACT_APP_API_URL)
      .then((res) => setTaskList(res.data))
      .catch((err) => console.log(err));
  };

  const displayCompleted = (status) => {
    setViewCompleted(status);
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span onClick={() => displayCompleted(true)} className={viewCompleted ? "active" : ""}>
          Completed
        </span>
        <span onClick={() => displayCompleted(false)} className={viewCompleted ? "" : "active"}>
          Incompleted
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = taskList.filter((item) => item.completed === viewCompleted);
    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} title={item.description}>
          {item.title}
        </span>
        <span>
          <button onClick={() => editItem(item)} className="btn btn-secondary mr-2">
            Edit
          </button>
          <button onClick={() => handleDelete(item)} className="btn btn-danger">
            Delete
          </button>
        </span>
      </li>
    ));
  };

  const toggle = () => {
    setModal(!modal);
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = (item) => {
    toggle();
    alert("save" + JSON.stringify(item));
    if (item.id) {
      axios.put(`${apiUrl}/${item.id}/`, item).then((res) => refreshList());
      return;
    }
    axios.post(apiUrl, item).then((res) => refreshList());
  };

  const handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
    axios.delete(`${apiUrl}/${item.id}/`).then((res) => refreshList());
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    setModal(!modal);
  };

  const editItem = (item) => {
    setActiveItem(item);
    setModal(!modal);
  };

  return (
    <main className="content">
      <h1 className="text-success text-uppercase text-center my-4">Task Manager</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-info">
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>
      {modal && <CustomModal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} />}
    </main>
  );
}

export default App;
