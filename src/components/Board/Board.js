import React, { Component } from 'react';
import Score from '../Score/Score'
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
        shuffledCards: [],
        flippedCards: [],
        numberFlippedCards: 0,
        score: 0,
        msg: ' '
    }

    shuffle = (array) => {
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

    componentDidMount() {
        const shuffledCards = this.shuffle(this.state.cards);
        this.setState({shuffledCards: shuffledCards});
    }

    cardHandler = (id) => {

        // get clicked card info
        const clickedCardIndex = this.getCardIndex(id, this.state.shuffledCards, 'id');
        const clickedCard = {
            ...this.state.shuffledCards[clickedCardIndex]
        };

        this.setState({msg: ''});

        if (clickedCard.status !== 'flipped') {
            const flippedCardArr =  [...this.state.flippedCards];

            this.setState({flippedCards: flippedCardArr}, () => {

                if (this.state.numberFlippedCards < 2) {

                    // set clicked card status
                    clickedCard.status = 'active';

                    // create temp array from card
                    const cards = [...this.state.shuffledCards];

                    // add new card status to temp array
                    cards[clickedCardIndex] = clickedCard;

                    // update cards
                    this.setState (
                        {shuffledCards: cards},
                    );

                    // add clicked card to compare array
                    flippedCardArr.push(clickedCard);

                    this.setState({numberFlippedCards: this.state.numberFlippedCards + 1}, () => {
                        // if two cards have been flipped
                        if (this.state.numberFlippedCards === 2) {
                            // if cards match
                            if (this.state.flippedCards[0].val === this.state.flippedCards[1].val) {
                                this.setState({
                                    score: this.state.score + 1,
                                    msg: 'Match!'
                                });

                                const update = () => {
                                    // reset flipped cards status
                                    const flippedCards = [...this.state.flippedCards];

                                    flippedCards.map((card) => {
                                        card.status = 'flipped';
                                    });

                                    this.setState({
                                        flippedCards: flippedCards
                                    });

                                    // update shuffled cards with reset status
                                    const updatedShuffledCards = this.state.shuffledCards.map(
                                        obj => this.state.flippedCards.find(o => o.id === obj.id) || obj
                                    );

                                    this.setState({
                                        shuffledCards: updatedShuffledCards,
                                        flippedCards: [],
                                        numberFlippedCards: 0
                                    });
                                }

                                setTimeout(update, 2000);
                            }

                            // if cards don't match
                            else {
                                // update score
                                this.setState({
                                    score: this.state.score - 1,
                                    msg: 'No match!',
                                });

                                const update = () => {
                                    // reset flipped cards status
                                    const flippedCards = [...this.state.flippedCards];

                                    flippedCards.map((card) => {
                                        card.status = '';
                                    });

                                    this.setState({
                                        flippedCards: flippedCards
                                    });

                                    // update shuffled cards with reset status
                                    const updatedShuffledCards = this.state.shuffledCards.map(
                                        obj => this.state.flippedCards.find(o => o.id === obj.id) || obj
                                    );

                                    this.setState({
                                        shuffledCards: updatedShuffledCards,                                        flippedCards: [],
                                        numberFlippedCards: 0
                                    });
                                }

                                setTimeout(update, 2000);
                            }
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <div>
                <Score
                    score = {this.state.score}
                    msg = {this.state.msg}
                />
                <div className="board">
                    {this.state.shuffledCards.map((card) => {
                        return (
                            <Card
                                click={() => this.cardHandler(card.id)}
                                val = {card.val}
                                status = {card.status}
                                key = {card.id}
                            />
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Board;
