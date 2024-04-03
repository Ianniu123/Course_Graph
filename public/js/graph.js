var elements = [] //graph elements

async function getData() {
    const response = await axios.get("http://localhost:3000/graph")
    return response.data
}

elements = getData()
console.log(elements)

var cy = cytoscape({
    container: document.getElementById('cy'), // container to render in

    elements: elements,

    style: [
        {
          selector: 'node',
          style: {
            'background-color': '#11479e',
            'label': 'data(id)',
            'padding': '30px'
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier'
          }
        }
    ],

    layout: {
        name: 'dagre',
    },

    zoom: 1,
    pan: { x: 0, y: 0 },
});