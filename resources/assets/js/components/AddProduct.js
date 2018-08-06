import React, { Component } from 'react';

class AddProduct extends Component {

	constructor(props) {
		super(props);
		this.state = {
			newProduct: {
				title: '',
				description: '',
				price: 0,
				availability: 0
			}
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(key, e) {
		var state = Object.assign({}, this.state.newProduct);
		state[key] = e.target.value;
		this.setState({newProduct: state});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onAdd(this.state.newProduct);
	}

	render() {
		const divStyle ={

		}

		return(
			<div style={{marginTop: '10px'}}>
				<h2> Add new product </h2>
				<div style={divStyle}>
				<form onSubmit={this.handleSubmit}>
					<label style={{padding: '3px'}}> Title:
						<input type="text" onChange={(e) => this.handleInput('title',e)} />
					</label>
					<label style={{padding: '3px'}}> Description:
						<input type="text" onChange={(e) => this.handleInput('description',e)} />
					</label>
					<label style={{padding: '3px'}}> Price:
						<input type="text" onChange={(e) => this.handleInput('price',e)} />
					</label>
					<label style={{padding: '3px'}}> Availability:
						<input type="number" onChange={(e) => this.handleInput('availability',e)} />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
		)
	}
}

export default AddProduct;