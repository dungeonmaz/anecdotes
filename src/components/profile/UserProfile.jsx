import React, { Component } from 'react'
import axios from 'axios'
const API_URL = "http://aboba"

export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: this.props.userId,
            username: this.props.username,
            userImage: this.props.userImage,
            userDescription: this.props.userDescription,
        }
    }

    fetchUserData = (id) => {
        axios.get(API_URL + 'userApi/getUserData' + id, {
            headers: {
                "content-type": "application/json"
            }
        })
        .then(res=>console.log(res))
        .catch(e=>console.log(e))
    }

    render() {
        return (
            <div>
                User
            </div>
        )
    }
}

export default UserProfile