<h1>Carleton Course Graph</h1>

Used Cytoscape JS to create a graph representation of all the courses at Carleton<br>
Incoming edges indicate a prerequisite course<br>
Users are able to add reviews to the course, and ratings (1-5) will be generated using a DistilBERT model.<br>
An accuracy of approximately 80% was achieved on test data<br>
Model is hosted on Hugging Face Inferecence Point<br>

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
