import React, { Component } from 'react';
import Games from '../Store/store';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

class GameCarousel extends Component {
    state = {
        activeIndex: 0
    }
    
    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {
        if (this.animating) return;
        const arrayLength = Games.length - 1;
        const newActiveIndex = this.state.activeIndex === arrayLength ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: newActiveIndex });
    }

    previous = () => {
        if (this.animating) return;
        const arrayLength = Games.length - 1;
        const newActiveIndex = this.state.activeIndex === 0 ? arrayLength : this.state.activeIndex + 1;
        this.setState({ activeIndex: newActiveIndex });
    }

    goToIndex = (index) => {
        if (this.animating) return;
        this.setState({ activeIndex: index });
    }
    render(){
        let key = 0;
        const slides = Games.map(game => {
            key++;
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={key}
                >
                    <img style={{width: 800, height: 'auto'}} src={game.img} />
                    <CarouselCaption 
                        captionHeader={game.title}
                        captionText={`Console: ${game.console}`}
                    />
                </CarouselItem>
            )
        })
        console.log(Games);
        return(
            <div>
                <Carousel
                    activeIndex={this.state.activeIndex}
                    next={this.next}
                    previous={this.previous}
                >
                    <CarouselIndicators 
                        items={Games}
                        activeIndex={this.state.activeIndex}
                        onClickHandler={this.goToIndex}
                    />
                    {slides}

                    <CarouselControl 
                        direction='prev'
                        directionText='Previous'
                        onClickHandler={this.previous}
                        style={{color: 'blue'}}
                    />
                    <CarouselControl 
                        direction='next'
                        directionText='Next'
                        onClickHandler={this.next}
                        style={{color: 'blue'}}
                    />
                </Carousel>
            </div>
        )
    }
}

export default GameCarousel;