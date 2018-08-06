import React, { Component } from 'react';

class UpdateProduct extends Component {
	constructor(props){
		super(props);
		this.state = {
			updatedProduct: {
				title: '',
				description: '',
				price: 0,
				availability: 0
			}
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput(key, e) {
		var state = Object.assign({}, this.state.updatedProduct);
		state[key] = e.target.value;
		this.setState({updatedProduct: state});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.onUpdate(this.state.updatedProduct);
	}

	render() {
		const divStyle ={

		}

		return(
			<div style={{marginTop: '10px'}}>
				<h2> Update product </h2>
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

export default UpdateProduct;