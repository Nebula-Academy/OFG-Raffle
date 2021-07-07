# react-multi-bar-slider
Slider component with multiple bars for React.

[Demo repo](https://github.com/rafaelklaessen/react-multi-bar-slider-demo)

![Multi slider screenshot](https://github.com/rafaelklaessen/react-multi-bar-slider/raw/master/screenshots/screenshot.png "Screenshot of the multi slider demo")

## Install
`yarn add react-multi-bar-slider` or `npm install --save react-multi-bar-slider`

## Usage
See the [demo repo](https://github.com/rafaelklaessen/react-multi-bar-slider-demo).

### Basic example
```javascript
import MultiSlider, { Progress } from 'react-multi-bar-slider';

export default class App extends Component {
  state = {
    progress: 10
  };

  handleSlide = newProgress => this.setState({ progress: newProgress });

  render() {
    return (
      <MultiSlider onSlide={this.handleSlide}>
        <Progress color="green" progress={this.state.progress} />
        <Progress color="purple" progress={45} />
      </MultiSlider>
    );
  }
}
```

### Advanced example
```javascript
import MultiSlider, { Progress, Dot } from 'react-multi-bar-slider';

export default class App extends Component {
  state = {
    progress: 10
  };

  handleSlide = newProgress => this.setState({ progress: newProgress });

  render() {
    return (
      <MultiSlider
        width={600}
        height={20}
        slidableZoneSize={40}
        backgroundColor="bisque"
        equalColor="blue"
        style={{ marginBottom: 40 }}
        onSlide={this.handleSlide}
        onDragStart={progress => console.log(`Started dragging: ${progress}%`)}
        onDragStop={progress => console.log(`Stopped dragging: ${progress}%`)}
        roundedCorners
        reversed
      />
        <Progress color="green" progress={this.state.progress}>
          <Dot color="grey" />
        </Progress>
        <Progress color="purple" progress={45}>
          <Dot color="grey" />
        </Progress>
      </MultiSlider>
    );
  }
}
```

## Props
`*` = Required

### `MultiSlider`
Prop | Description | Type | Default
---- | ----------- | ---- | -------
`width` | Width of the slider | `number` or `string` | `100%`
`height` | Height of the slider | `number` or `string` | `14px`
`slidableZoneSize` | Size of the zone in which sliders can be dragged | `number` or `string` | `7px`,
`backgroundColor` | Background color of the slider | `string` | `#EEEEEE`
`equalColor` | Color of all bars when their values are equal | `string` |
`style` | Custom style for the slider <br> *Signature:* <br> `function(props: object) => object` | `object` or `function` | `{}`
`onSlide` | Callback that is fired when the progress was set <br> *Signature:* <br> `function(progress: number) => void` | `function` |
`onDragStart` | Callback function that is fired when the slider has begun to move <br> *Signature:* <br> `function(progress: number) => void` | `function` |
`onDragStop`| Callback function that is fired when the slide has stopped moving <br> *Signature:* <br> `function(progress: number) => void` | `function` |
`roundedCorners` | When set to `true`, the slider has rounded corners | `bool` | `false`
`reversed` | When set to `true`, the slider is reversed | `bool` | `false`
`readOnly` | When set to `true`, the slider can't be updated | `bool` | `false`
`children*` |  The progress bars that are shown in the slider (or any other children) | `node` |

All other props (not documented here) will be passed on to the root element.

### `Progress`
Prop | Description | Type | Default
----- | ----------- | ---- | -------
`color*` | Color of the progress bar | `string` |
`progress*` | Progress of the progress bar | `number` |
`style` | Custom style for the progress bar <br> *Signature:* <br> `function(props: object) => object` | `object` or `function` |
`children` | The slider dot (or any other children) | `node` |

All other props (not documented here) will be passed on to the root element.

### `Dot`
Prop | Description | Type | Default
----- | ----------- | ---- | -------
`width` | Width of the dot | `number` or `string` | `50` when the dot has an icon, `28` if not
`height` | Height of the dot | `number` or `string` | `50` when the dot has an icon, `28` if not
`color` | Color of the dot | `string` |
`icon` | URL of the image to use as dot icon | `string` |
`style` | Custom style for the dot <br> *Signature:* <br> `function(props: object) => object` | `object` or `function` |
`iconStyle` | Custom style for the dot icon <br> *Signature:* <br> `function(props: object) => object` | `object` or `function` |
`children` | Children of the dot | `node` |

All other props (not documented here) will be passed on to the root element.

#### How custom styles work
When a function is passed to a `style` prop rather than an object, it is expected to return an object.
The style function will be called with all props that that component has (except for the `style` and `children` props and any internal callbacks). The return value of the function will be used as style (see the [demo repo](https://github.com/rafaelklaessen/react-multi-bar-slider-demo) for an example).
