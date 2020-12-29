# Events

The Toolbox web applciation accepts server sent events from the Toolbox. Events can be either data or configuration.

## Configuration

Configuration events are used to create visual cards (like a plot) and associate future data with the card. Each card should be uniquely named (as should each data source). Creating a card uses the following data object.

```javascript
{ `<name>`: {
    type: "plot",
    data: {
      input0_name: [],
      input1_name: [],
      input2_name: [],
      input3_name: []
    }
    //additional per card options
  }
}
```


## Data

Data (like cards) should always be uniquely name and always consists of two values. The values must be a fundamental type such as a number of string. For brevity, the `type` is assumed to be data if no type is provided.

```javascript
{
  `<name>`: [x, y]
}
```

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