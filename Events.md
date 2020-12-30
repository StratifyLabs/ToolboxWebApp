# Events

The Toolbox web applciation accepts server sent events from the Toolbox. Events can be either data or configuration.

## Configuration

Configuration events are used to create visual cards (like a plot) and associate future data with the card. Each card should be uniquely named (as should each data source). Creating a card uses the following data object.

```json
{ "<name": {
    "type": "<type",
    "data": {
      "<data name>": [],
      "<data name>": [],
      "<data name>": [],
      "<data name>": []
    }
    //additional per card options
  }
}
```

## Data

Data (like configuration) should always be uniquely named. The data format depends on the configuration type.


```json
{
  "<name>": <data>
}
```

The data value will be a JSON value that depends on the configuration types.


- `plot`: `[<x>, <y>]`
- `hist`: `[<x>, <y>]` (`x` is ignored)
- `logic`: `[<x>, <y>]`
- `terminal`: `<text>`





## Example

Create a plot:

```javascript
{
  type: "plot",
  name: "temperature",
  inputs: {
    t0: [],
    t1: [],
    t2: [],
    t3: [],
  }
}
```

Then send some data to plot:

```javascript
{ t0: [0, 22] }
{ t1: [0, 23] }
{ t2: [0, 21] }
{ t3: [0, 20] }
{ t0: [1, 22] }
{ t1: [1, 23] }
{ t2: [1, 21] }
{ t3: [1, 20] }

//each line is independent
//so you don't need to send a value for every x
{ t0: [2, 22] }
{ t3: [2, 20] }

{ t1: [3, 22] }
{ t2: [3, 20] }
```

Multiple data points may be sent as an array:

```javascript
[
  { t0: [4, 22], t1: [5,25] }, //unique keys in one object is OK
  { t0: [5, 23] }
]
```