import React , {useState} from "react";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import {createTable} from "../utils/api";

function CreateTable(){
    const history=useHistory();
    const [table, setTable]= useState({table_name: "", capacity:""});
    const [error, setError] = useState(null);

    function changeHandler({target: {name, value, type}}){
        setTable((prevState)=>({
            ...prevState,
            [name]: type === "number" ? parseInt(value) : value
        }));
    }

    function submitHandler(event){
        event.preventDefault();
        try{
          createTable(table)
          .then(history.push(`/dashboard`))
        }catch(error){
          setError(error);
        }
    }
    function onCancel(){
        history.goBack();
    }
    
    return (
        <div>
          <ErrorAlert error={error} />
          <form onSubmit={submitHandler} >
          <fieldset>
              <div className="form-group">
                <label htmlFor="table_name">Table Name</label>
                <input
                  type="text"
                  minLength="2"
                  id="table_name"
                  name="table_name"
                  className="form-control"
                  value={table.table_name}
                  required={true}
                  placeholder="Table Name"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="capacity">Table Capacity</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  className="form-control"
                  value={table.capacity}
                  required={true}
                  placeholder="some number"
                  onChange={changeHandler}
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
          </fieldset>
          </form>
        </div>
    );
}

export default CreateTable;