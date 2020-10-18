import React, { Component } from 'react';
import pedalService from '../../utils/pedalService';

class AddRigPage extends Component {
  state = {
    invalidForm: true,
    formData: {
      name: '',
      hasFXLoop: 'false',
    },
  };



  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleAddRig(this.state.formData);
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
        <h1>Add Rig</h1>
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
              value={this.state.formData.make}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Does Rig Have An FX Loop?</label>
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
            ADD Rig
          </button>
        </form>
      </>
    );
  }
}

export default AddRigPage;
