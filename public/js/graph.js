var elements = [] //graph elements

async function getData() {
    const response = await axios.get("http://localhost:3000/data")
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
            'label': 'data(id)',
            'padding': '30px',
            'font-weight': 'bold',
          }
        },

        {
          selector: 'edge',
          style: {
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#9dbaea',
            'target-arrow-color': '#9dbaea',
            'curve-style': 'bezier',
          }
        }
        
    ],

    layout: {
        name: 'dagre',
        nodeSep: 50,
        edgeSep: 30,
        padding: 30,
        acyclicer: 'greedy',
    },

    zoom: 1,
    pan: { x: 0, y: 0 },
});

cy.on('tap', 'node', function(){
  try { // your browser may block popups
    window.replace( this.data('href') );
  } catch(e){ // fall back on url change
    window.location.href = this.data('href');
  }
});

cy.on('mouseover', 'node', function() {
  console.log(this.data('id'))
})