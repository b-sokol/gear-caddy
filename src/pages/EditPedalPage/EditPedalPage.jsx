import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EditPedalPage extends Component {
  state = {
    invalidForm: false,
    formData: this.props.location.state.pedal,
  };

  formRef = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdatePedal(this.state.formData);
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
        <h1>Edit Pedal</h1>
        <form
          ref={this.formRef}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group">
            <label>Pedal's Make (required)</label>
            <input
              className="form-control"
              name="make"
              value={this.state.formData.make}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pedal's Model (required)</label>
            <input
              className="form-control"
              name="model"
              value={this.state.formData.model}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pedal's Type (required)</label>
            <input
              className="form-control"
              name="type"
              value={this.state.formData.type}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pedal's Serial number</label>
            <input
              className="form-control"
              name="serial"
              value={this.state.formData.serial}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Pedal's Year</label>
            <input
              className="form-control"
              name="year"
              value={this.state.formData.year}
              onChange={this.handleChange}
            />
          </div>
          {/* <div className="form-group">
            <label>Does Pedal Have An FX Loop? (true/false)</label>
            <input
              className="form-control"
              name="hasFXLoop"
              value={this.state.formData.hasFXLoop}
              onChange={this.handleChange}
            />
          </div> */}
          <button
            type="submit"
            className="btn"
            disabled={this.state.invalidForm}
          >
            SAVE Pedal
          </button>
          &nbsp;&nbsp;
          <Link to="/">CANCEL</Link>
        </form>
      </>
    );
  }
}

export default EditPedalPage;
