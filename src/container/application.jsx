import React, { Component } from 'react'
// import FormComponent from 'component/form-component'
// import InputComponent from 'component/input-component'
import PlayListSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from '../component/search-input-component'
import ListComponent from '../component/list-component'

const KEY = 'GendLgYFSUEiNXWLyZAm'
const SECRET = 'GIQfagAeoNHfGjyBqzLvUSPNWcfLkJCV'
const search = ''
let URL = 'https://api.discogs.com/database/search?q=michael jason' + search + '&key=' + KEY + '&secret=' + SECRET

class Application extends Component {
    constructor () {
        super()

        this.state = {
            playlists: [],
            albums: []
        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response.rows })
            })
    }

    onSubmit = (event) => {
        console.log(event)
    }

    handleItemAddOnClick = (event) => {
        console.log('Ajout', event)
    }

    handleItemDeleteOnClick = (event) => {
        console.log('Delete', event)
    }

    handleOnChange = (e) => {
        this.setState({ search: e.target.value })
        URL = 'https://api.discogs.com/database/search?q=' + e.target.value + '&key=' + KEY + '&secret=' + SECRET
    }

    handleAddOnClick = (e) => {
        fetch(URL, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ albums: response })
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
                            <SearchInputComponent type='text' id='seach' name='q' label='Search' onChange={this.handleOnChange} />

                            <button className='btn btn-outline-success my-2 my-sm-0 m-10' onClick={this.handleAddOnClick}>Search</button>
                        </div>
                    </nav>
                </header>
                <main role='main'>
                    <div id='myCarousel' class='carousel slide ' data-ride='carousel'>

                        <div className='container marketing row'>
                            <div className='col-md-1' />
                            <div className=' col-md-5'>
                                <iframe width='560' height='315' src='https://www.youtube.com/embed/LchJqvP38y4' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen className='embed-responsive-item' />
                            </div>
                            <div className='col-md-2' />
                            <div className='mx-auto w-30 col-md-3'>

                                <ListComponent items={this.state.albums} onItemAddClick={this.handleAddOnClick} onItemDeleteClick={this.handleItemDeleteOnClick} />
                            </div>
                            <div className='col-md-1' />
                        </div>
                    </div>
                </main>
            </>

        )
    }

    render () {
        console.log(this.state.albums)
        return (
            this.renderForm()
        )
    }
}

export default Application
