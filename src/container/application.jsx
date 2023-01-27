import React, { Component } from 'react'
// import FormComponent from 'component/form-component'
import MusicData from '../music-data'
import PlayListSelectComponent from 'component/playlist-select-component'
import SearchInputComponent from '../component/search-input-component'
import ListComponent from '../component/list-component'
import YouTube from 'react-youtube'

// const KEY = 'GendLgYFSUEiNXWLyZAm'
// const SECRET = 'GIQfagAeoNHfGjyBqzLvUSPNWcfLkJCV'
const TOKEN = 'ZDSywGmthFbqZYsyJiWrxCYQdXNCtDBNAPopheIC'
const musicData = new MusicData(TOKEN)
// const search = ''

class Application extends Component {
    constructor () {
        super()

        this.state = {
            playlists: [],
            albums: [],
            videos: [],
            videoId: '',
            searchedValue: '',
            selectedItem: null

        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response.rows })
            })
    }

    handleItemReadClick = (event) => {
        musicData.getMaster(event.target.id, this.handleItemMasterOnClick(event))
    }

    handleSelectItemChange = (event) => {
        this.setState({ selectedItem: event.target.id })
    }

    updateListComponent = (data) => {
        this.setState({ albums: data.results })
    }

    handleItemMasterOnClick = (event) => (master) => {
        this.setState({ videoId: master.videos[0].uri.substring(master.videos[0].uri.indexOf('v=') + 2, master.videos[0].uri.length) })
    }

    handleOnSearchChange = (e) => {
        this.setState({ searchedValue: e.target.value })
    }

    handleSearchOnClick = (e) => {
        musicData.search({ query: document.getElementById('search').value, perPage: 10 }, this.updateListComponent)
    }

    handleItemOnClick = (event) => {
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

    handleItemToggleClick = (event) => {
        // Le <button> déclenche l'événement et se trouve à l'intérieur du <li> qui contient l'attribut id
        const icon_id = event.target.id
        const playlist_id = document.getElementById('categorie').value

        fetch('/playlists/' + playlist_id + '/tracks/', { method: 'POST' })
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
                            <PlayListSelectComponent options={this.state.playlists} onChange={this.handleSelectItemChange} />
                            <SearchInputComponent type='text' id='search' value={this.state.searchedValue} label='search' onChange={this.handleOnSearchChange} />

                            <button className='btn btn-outline-success my-2 my-sm-0 m-10' onClick={this.handleSearchOnClick}>Search</button>
                        </div>
                    </nav>
                </header>
                <main role='main'>
                    <div id='myCarousel' className='carousel slide ' data-ride='carousel'>

                        <div className='container marketing row'>
                            <div className='col-md-1' />
                            <div className=' col-md-5'>
                                <YouTube videoId={this.state.videoId} />;
                            </div>
                            <div className='col-md-2' />
                            <div className='mx-auto w-30 col-md-3'>
                                <ListComponent items={this.state.albums} onItemReadClick={this.handleItemReadClick} onItemToggleClick={this.handleItemToggleClick} />
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
