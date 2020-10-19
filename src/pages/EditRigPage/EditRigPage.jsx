import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditRigPage extends Component {
  state = {
    invalidForm: false,
    formData: this.props.location.state.rig,
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdateRig(this.state.formData);
  };

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value,
    };
    this.setState({
      formData,
      invalidForm: !this.formRef.current.checkValidity(),
    });
  };

  render() {
    return (
      <>
        <h1>Edit Rig</h1>
        <form
          ref={this.formRef}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label>Rig's Name (required)</label>
            <input
              className="form-control"
              name="name"
              value={this.state.formData.name}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Does Rig Have An FX Loop? (true/false)</label>
            <input
              className="form-control"
              name="hasFXLoop"
              value={this.state.formData.hasFXLoop}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            SAVE Rig
          </button>
          &nbsp;&nbsp;
          <Link to="/rigs">CANCEL</Link>
        </form>
      </>
    );
  }
}

export default EditRigPage;
