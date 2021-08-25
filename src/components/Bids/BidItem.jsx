import React from 'react';
import {Link} from 'react-router-dom';
import OneCardItemList from '../CardsList/OneCardItemList';

const BidItem = (props) => {
    return (
        <div className="cardDiv" key={props.card._id}>
            <OneCardItemList card={props.card.pokemonTCGId} link={"/profile/cards/" + props.card._id}/>
                <div>
            <p>Average price: {props.card.pokemonTCGId.cardmarket.prices.averageSellPrice}</p>
            <Link to={"/cards/" + props.card._id}>Bid Details</Link>
            </div>
        </div>
    )
}

export default BidItem
