import React from 'react'
import { Component } from 'react'

export default class Movie extends Component {
    render() {
        const {id, title, description, rating} = this.props
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <p>Rating: {this.props.rating}</p>
                <button onClick={() => this.props.onDelete(id)}>Delete</button>
                <hr />
            </div>
        )
    }
}