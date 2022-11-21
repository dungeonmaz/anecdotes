import React, { Component } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import PersonCard from './PersonCard'
import { API_URL } from '../../index'

const variants = {
  enter: () => {
    return {
      opacity: 0,
      y: -100,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    y: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export class Cards extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      direction: 0,
    }
  }

  likePerson() {
    this.setState({ direction: -1 })
    this.updateAnecdoteData(1)
    this.fetchAnecdoteData()
  }

  dislikePerson() {
    this.setState({ direction: 1 })
    this.updateAnecdoteData(-1)
    this.fetchAnecdoteData()
  }

  fetchAnecdoteData() {
    axios.get(API_URL + 'anecdotes/random', {
      headers: {
        "content-type": "application/json"
      },
      params: {
        prevId: this.state.data._id
      }
    })
      .then(res => {
        this.setState({ data: res.data })
      })
      .catch(e => console.log(e))
  }

  updateAnecdoteData(n) {
    if (this.props.user) {
      axios.post(API_URL + 'anecdotes/update/' + this.state.data._id, {
        username: this.state.data.username,
        text: this.state.data.text,
        rating: this.state.data.rating + n,
      })
    } else {
      alert("You are not registered")
      return
    }
  }

  componentDidMount() {
    this.fetchAnecdoteData()
  }


  render() {
    return (
      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <AnimatePresence initial={false} custom={this.state.direction}>
          <motion.div key={this.state.data._id} variants={variants} // Придумать нормальный id
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2 }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                this.dislikePerson()
              } else if (swipe > swipeConfidenceThreshold) {
                this.likePerson()
              }
            }}>
            <PersonCard data={this.state.data} likePerson={this.likePerson.bind(this)} dislikePerson={this.dislikePerson.bind(this)} />
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }
}

export default Cards