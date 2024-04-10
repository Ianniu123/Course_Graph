<h1>Carleton Course Graph</h1>

<ul>
  <li>Used Cytoscape JS to create a graph representation of all the courses at Carleton</li>
  <li>Incoming edges indicate a prerequisite course</li>
  <li>Users are able to add reviews to the course, and ratings (1-5) will be generated using a DistilBERT model.</li>
  <li>An accuracy of approximately 80% was achieved on test data</li>
  <li>Model is hosted on Hugging Face Inferecence Point</li>
</ul>

<h4>Link to model:</h4>
<ul>
  <li>https://huggingface.co/Ianniu/my_model</li>
  <li>https://arxiv.org/pdf/1910.01108.pdf</li>
</ul>
  
<h4>Link to data:</h4>
<ul>
  <li>https://huggingface.co/datasets/kkotkar1/course-reviews</li>
</ul>

<h4>Possible Improvements:</h4>
<ul>
  <li>better UI</li>
  <li>spend more time on fine-tuning the model (only 1 epoch was run to train this model)</li>
  <li>more complex model</li>
</ul>
