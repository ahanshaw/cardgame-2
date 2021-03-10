import React, { Component } from 'react';
import Card from '../Card/Card';

import './Board.scss';

class Board extends Component {

    state = {
        cards: [
            {id: '1', val: 'A', status: ''},
            {id: '2', val: 'A', status: ''},
            {id: '3', val: 'B', status: ''},
            {id: '4', val: 'B', status: ''},
            {id: '5', val: 'C', status: ''},
            {id: '6', val: 'C', status: ''},
            {id: '7', val: 'D', status: ''},
            {id: '8', val: 'D', status: ''},
            {id: '9', val: 'E', status: ''},
            {id: '10', val: 'E', status: ''},
            {id: '11', val: 'F', status: ''},
            {id: '12', val: 'F', status: ''},
            {id: '13', val: 'G', status: ''},
            {id: '14', val: 'G', status: ''},
            {id: '15', val: 'H', status: ''},
            {id: '16', val: 'H', status: ''},
            {id: '17', val: 'I', status: ''},
            {id: '18', val: 'I', status: ''},
            {id: '19', val: 'J', status: ''},
            {id: '20', val: 'J', status: ''}
        ],
        numberFlippedCards: 0
    }

    shuffleCards = (array) => {
        let i = array.length - 1;
        for (; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    getCardIndex = (value, arr, prop)  => {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
        return -1;
    }

    cardFlipHandler = (id) => {
        if (this.state.numberFlippedCards < 2) {
            // get clicked card index
            const clickedCardIndex = this.getCardIndex(id, this.state.cards, 'id');

            // select clicked card from array
            const clickedCard = {
                ...this.state.cards[clickedCardIndex]
            };

            // set clicked card status
            clickedCard.status = 'flipped';

            // create temp array from card
            const cards = [...this.state.cards];

            // add new card status to temp array
            cards[clickedCardIndex] = clickedCard;

            // update cards
            this.setState (
                {cards: cards},
            );

            // update number of flipped cards
            this.setState (
                {numberFlippedCards: this.state.numberFlippedCards + 1},
            );
        }

        else {
            console.log('stop flipping!');
        }
    }

    render() {
        const shuffledCards = this.shuffleCards(this.state.cards);
        return (
            <div className="board">
                {shuffledCards.map((card) => {
                    return (
                        <Card
                            click={() => this.cardFlipHandler(card.id)}
                            card = {card.val}
                            key = {card.id}
                        />
                    )
                })}
            </div>
        );
    }
}

export default Board;
