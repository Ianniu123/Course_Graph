<h1>Carleton Course Graph</h1>

<ul>
<li>Used Cytoscape JS to create a graph representation of all the courses at Carleton</li><br>
<li>Incoming edges indicate a prerequisite course</li><br>
<li>Users are able to add reviews to the course, and ratings (1-5) will be generated using a DistilBERT model.</li><br>
<li>An accuracy of approximately 80% was achieved on test data</li><br>
<li>Model is hosted on Hugging Face Inferecence Point</li><br>
</ul>

Link to model:
  -https://huggingface.co/Ianniu/my_model
  -https://arxiv.org/pdf/1910.01108.pdf
  
Link to data:
  -https://huggingface.co/datasets/kkotkar1/course-reviews

Possible Improvements:
  -better UI
  -spend more time on fine-tuning the model (only 1 epoch was run to train this model)
  -more complex model
  -
