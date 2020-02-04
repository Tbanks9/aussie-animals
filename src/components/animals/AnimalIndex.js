import React from 'react'
import axios from 'axios'
import AnimalCard from './AnimalCard'

class AnimalIndex extends React.Component {
  state = { animals: [] }
  async componentDidMount() {
    try {
      const res = await axios.get('/api/animals')
      this.setState({ animals: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-mobile is-multiline">
            {this.state.animals.map(animal => ( 
              <AnimalCard key={animal._id} {...animal}/>
            ))}
          </div>
        </div>
      </section>
    )
  }
}
export default AnimalIndex