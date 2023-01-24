import React, { Component } from 'react'
// import ListComponent from 'component/music-item-component'
import FormComponent from 'component/form-component'
import InputComponent from 'component/input-component'
import SelectCategoryComponent from 'component/select-category-component'

class Application extends Component {
    constructor () {
        super()

        this.state = {
            playlists: undefined,
            categories: undefined
        }
    }

    componentDidMount () {
        fetch('http://localhost:8080/playlists', { method: 'GET' })
            .then(response => response.json())
            .then(response => {
                this.setState({ playlists: response })
            })
    }

    renderForm () {
        return (
            <nav>
                <FormComponent action='/albums'>
                    <SelectCategoryComponent options={[]} label='Music ' name='music' id='music_id' />
                    <InputComponent label='Search' type='text' name='searchAlbum' />
                </FormComponent>
            </nav>
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
