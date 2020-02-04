import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Auth from '../../lib/auth'

class AnimalShow extends React.Component {
  state = { animal: null }
  async componentDidMount() {
    const animalId = this.props.match.params.id
    try {
      const res = await axios.get(`/api/animals/${animalId}`)
      this.setState({ animal: res.data })
    } catch (err) {
      this.props.history.push('/notfound')
    }
  }

  // handleDelete = async () => {
  //   const animalId = this.props.match.params.id

  //   try {
  //     await axios.delete(`api/animals/${animalId}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}` }
  //     })
  //     this.props.history.push('/animals')
  //   } catch (err) {
  //     console.log(err.response)
  //   }
  // }

  // isOwner = () => Auth.getPayload().sub === this.state.animal.user._id // Subject is the user id

  render() {
    // console.log(this.isOwner)
    const { animal } = this.state
    if (!animal) return null
    return (
      <section className="section">
        <div className="container">
          <h2 className="title">{animal.name}</h2>
          <hr />
          <div className="columns">
            <div className="column is-half">
              <figure className="image">
                <img src={animal.image} alt={animal.name} />
              </figure>
            </div>
            <div className="column is-half">
              <h4 className="title is-4">Origin</h4>
              <hr />
              <p>{animal.habitat}</p>
              <hr />
              {this.isOwner() && 
              <>
              <Link to={`/animals/${animal._id}/edit`} className="button is-warning">Edit Animal</Link>
              <hr />
              <button onClick={this.handleDelete} className="button is-danger">Delete Animal</button>
              </>
              }
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default AnimalShow