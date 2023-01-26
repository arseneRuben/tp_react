import React, { Component } from 'react'
// import ListComponent from 'component/music-item-component'
// import FormComponent from 'component/form-component'
// import InputComponent from 'component/input-component'
import PlayListSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from '../component/search-input-component'

function buildHeader (method, body) {
    return {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

class Application extends Component {
    constructor () {
        super()

        this.state = {
            playlists: [],
        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response.rows })
            })
    }

    onSubmit = (search) => {
        console.log(search)
    }

    handleItemOnClick = (event) => {
        // Le <span> déclenche l'événement et se trouve à l'intérieur du <li> qui contient l'attribut id
        const id = event.target.parentElement.id

        fetch('http://localhost:8080/users/' + id, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                this.setState({
                    formValues: responseObject,
                    showForm: true
                })
            })
    }

    handleItemDeleteOnClick = (event) => {
        // Le <button> déclenche l'événement et se trouve à l'intérieur du <li> qui contient l'attribut id
        const id = event.target.parentElement.id

        fetch('http://localhost:8080/users/' + id, { method: 'DELETE' })
            .then(response => response.json())
            .then(response => {
                this.setState({ users: response })
            })
    }

    handleAddOnClick = () => {
        this.setState({
            formValues: {},
            showForm: true
        })
    }


    renderForm () {
        // console.log(this.state.playlists)
        return (
            /* <nav>
                <FormComponent action='/albums'>
                    <SelectCategoryComponent options={[]} label='Music ' name='music' id='music_id' />
                    <InputComponent label='Search' type='text' name='searchAlbum' />
                </FormComponent>

            </nav> */
            <>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
                        <a className='navbar-brand' href='#'>Music</a>
                        <div className='collapse navbar-collapse' id='navbarCollapse'>
                            <PlayListSelectComponent options={this.state.playlists} />
                            <form action={onSubmit} method='post' className='d-flex form-inline mt-2 mt-md-0'>
                                <SearchInputComponent type='text' id='seach' name='criteria' label='Search' />
                                <button className='btn btn-outline-success my-2 my-sm-0 m-10' type='submit'>Search</button>
                            </form>
                        </div>
                    </nav>
                </header>
                <main role='main'>
                    <div id='myCarousel' class='carousel slide ' data-ride='carousel'>

                        <div class='container marketing row'>
                            <div className='col-md-1' />
                            <div className=' col-md-5'>
                                <iframe width='560' height='315' src='https://www.youtube.com/embed/LchJqvP38y4' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowfullscreen className='embed-responsive-item' />
                            </div>
                            <div className='col-md-2' />
                            <div className='mx-auto w-30 col-md-3'>
                                <ul className='list-group'>
                                    <li className='list-group-item active'> text1</li>
                                    <li className='list-group-item '> Lorem ipsum dolor sit.</li>
                                    <li className='list-group-item '> Lorem ipsum dolor sit.</li>
                                    <li className='list-group-item '> Lorem ipsum dolor sit.</li>
                                </ul>
                            </div>
                            <div className='col-md-1' />
                        </div>
                    </div>
                </main>
            </>

        )
    }

    render () {
        console.log(JSON.stringify(this.state.playlists))
        return (
            this.renderForm()
        )
    }
}

export default Application
