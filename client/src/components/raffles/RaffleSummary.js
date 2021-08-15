import './RaffleSummary.css'
import React from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

const list = [
    { name: 'item1' },
    { name: 'item2' },
    { name: 'item3' },
    { name: 'item4' },
    { name: 'item5' },
    { name: 'item6' },
    { name: 'item7' },
    { name: 'item8' },
    { name: 'item9' }
];

// One item component
// selected prop will be passed
const MenuItem = ({ text, selected }) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list, selected) =>
    list.map(el => {
        const { name } = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });


const Arrow = ({ text, className }) => {
    return (
        <div
            className={className}
        >{text}</div>
    );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';



class RaffleSummary extends React.Component {
    constructor(props) {
        super(props);
        // call it again if items count changes
        this.menuItems = Menu(list, selected);
    }

    state = {
        selected
    };

    onSelect = key => {
        this.setState({ selected: key });
    }


    render() {
        const { selected } = this.state;
        // Create menu from items
        const menu = this.menuItems;

        return (
            <div className='RaffleSummary'>
                <div className='Scroll-menu'>
                    <ScrollMenu 
                        data={menu}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={selected}
                        onSelect={this.onSelect}
                    />
                </div>

                <div className='raffle-summary-container'>

                    <label>RAFFLE TITLE
                        <input className='rafbutton' onClick={this.raftitle} />
                    </label>
                    <label>RAFFLE DESCRIPTION
                        <input className='rafbutton' onClick={this.rafdescription} />
                    </label>
                    <label>TOTAL TICKETS
                        <input className='rafbutton' onClick={this.total} />
                    </label>
                    <label>TICKET PRICE
                        <input className='rafbutton' onClick={this.price} />
                    </label>
                    <label>TICKETS SOLD
                        <input className='rafbutton' onClick={this.sold} />
                    </label>

                </div>


            </div>
        );
    }
}




export default RaffleSummary;