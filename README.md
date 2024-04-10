Carleton Course Graph

Used Cytoscape JS to create a graph representation of all the courses at Carleton
Incoming edges indicate a prerequisite course
Users are able to add reviews to the course, and ratings (1-5) will be generated using a DistilBERT model.
An accuracy of approximately 80% was achieved on test data
Model is hosted on Hugging Face Inferecence Point

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
