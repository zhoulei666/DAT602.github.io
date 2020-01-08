# DAT602.github.io
I first learned the video of ml5.js. Practiced how to use the ImageClassifier function of ml5.js.
Then I realized that I can use this function to recognize the different expressions of people to find out how people feel.
This will be related to the project Emoti-os.
So I used teachable machine (https://teachablemachine.withgoogle.com/train/image) to make a model with behavior characteristics to show mood.
The model was downloaded and used with the help of Adam.
The camera gives mood options based on the behavior characteristics identified by the model.
At the same time I realized that a person's expression is not necessarily a determining factor for mood.
So I used ml5.js' Sentiment function.
In this way, I simply distinguish the mood of people by defining the size of the value of the result (0 to 1) (Maybe there are some problems of the ml5 corpus itself, this function is not very smart).
Then I went further and gave a robot that users can train themselves on the basis of chatbots.
A homepage was created to connect these two functions.
Finally, beautify the page by css style sheets.

link to repository
https://github.com/zhoulei666/DAT602.github.io
