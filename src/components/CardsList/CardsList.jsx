import React, { Component } from 'react';
import OneCardItemList from './OneCardItemList';
import apiHandler from '../../api/apiHandler';
import FormSale from '../OneUserCard/FormSale';

export class CardsList extends Component {
    state = {
        cards: null,
        searchName : ""
    }

    async componentDidMount() {
            const cards = await apiHandler.getAllUserCards();
            console.log(cards)

            const cardPromises = cards.map(card => {
                return apiHandler.getOneCardFromApi(card.pokemonTCGId)
            })
            console.log(cardPromises)

            const responses = await Promise.all(cardPromises);

            const populatedCards = cards.map((card, i) => {
                return {
                    ...card,
                    pokemonTCGId: responses[i].data
                }
            })
            this.setState({
                cards: populatedCards
            })
            
    }

    render() {
        if(this.state.cards === null) return <div>Loading...</div>
        console.log(this.state.cards)

        return (
            <div className="CardsList">
                <h2>ALL USER'S CARDS</h2>
                {this.state.cards.map(card => {
                    return (
                        <div>
                    <OneCardItemList card={card.pokemonTCGId} link={"/profile/cards/" + card._id}/>
                    <FormSale card={card}/>
                    </div>)
                })}
                
            </div>
        )
    }
}

export default CardsList
