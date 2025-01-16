import React, { useState } from "react";

function Create({ setAllToDoData, allToDoData }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: false,
  });

  const onchangeForm = (e) => {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    const newAllToDo = [...allToDoData, formData];
    setFormData({ title: "", description: "", status: false });
    setAllToDoData(newAllToDo);
  };

  return (
    <div
      style={{
        backgroundColor: "#DBAFA0",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "8px",
        color: "white",
      }}
    >
      <form onSubmit={onSubmitData}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label
              htmlFor="title"
              style={{
                marginRight: "10px",
                color: "black",
                fontWeight: "bold",
                flexBasis: "30%",
              }}
            >
              Title:
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              value={formData.title}
              required
              style={{
                flex: "1",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              onChange={onchangeForm}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label
              htmlFor="description"
              style={{
                marginRight: "10px",
                color: "black",
                fontWeight: "bold",
                flexBasis: "30%",
              }}
            >
              Description:
            </label>
            <textarea
              id="description"
              value={formData.description}
              style={{
                flex: "1",
                height: "80px",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
              placeholder="Enter description"
              onChange={onchangeForm}
            ></textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#5C5470",
                color: "white",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
