import React, { Component } from 'react'
// import FormComponent from 'component/form-component'
import MusicData from '../music-data'
import PlayListSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from '../component/search-input-component'
import ListComponent from '../component/list-component'



// const KEY = 'GendLgYFSUEiNXWLyZAm'
/// const SECRET = 'GIQfagAeoNHfGjyBqzLvUSPNWcfLkJCV'
const TOKEN = 'ZDSywGmthFbqZYsyJiWrxCYQdXNCtDBNAPopheIC'
// const search = ''
let URL = 'https://api.discogs.com/database/search?q'

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
                this.setState({ playlists: response.rows, musicData: new MusicData(TOKEN) })
            })
    }

    onSubmit = (event) => {
        console.log(event)
    }

    handleItemReadClick = (event) => {
        (new MusicData(TOKEN)).getMaster(event.target.id, this.handleItemMasterOnClick)
    }

    updateListComponent = (data) => {
        this.setState({ albums: data.results })
    }

    handleItemMasterOnClick = (master) => {
        console.log('Delete', master)
    }

    handleSearchOnClick = (e) => {
        URL += (new MusicData(TOKEN)).search(e.target.value, this.updateListComponent)
        fetch(URL, { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ albums: response })
            })
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
        return (
          
            <>
                <header>
                    <nav className='navbar navbar-expand-md navbar-dark fixed-top bg-dark'>
                        <a className='navbar-brand' href='#'>Music</a>
                        <div className='collapse navbar-collapse' id='navbarCollapse'>
                            <PlayListSelectComponent options={this.state.playlists} />
                            <SearchInputComponent type='text' id='seach' name='q' label='Search' />

                            <button className='btn btn-outline-success my-2 my-sm-0 m-10' onClick={this.handleSearchOnClick}>Search</button>
                        </div>
                    </nav>
                </header>
                <main role='main'>
                    <div id='myCarousel' className='carousel slide ' data-ride='carousel'>

                        <div className='container marketing row'>
                            <div className='col-md-1' />
                            <div className=' col-md-5'>
                                <iframe width='560' height='315' src='https://www.youtube.com/embed/LchJqvP38y4' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen className='embed-responsive-item' />
                            </div>
                            <div className='col-md-2' />
                            <div className='mx-auto w-30 col-md-3'>
                                <ListComponent items={this.state.albums} onItemReadClick={this.handleItemReadClick} />

                            </div>
                            <div className='col-md-1' />
                        </div>
                    </div>
                </main>
            </>

        )
    }

    render () {
        // console.log(this.state.albums)
        return (
            this.renderForm()
        )
    }
}

export default Application
