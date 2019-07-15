# JustTalk
Just Talk - A Vocal Web Driver

Just Talk is a keyword interpreter which is directed at Web intereaction.
Specifically, interaction with the Document Object Model.
This means that it is not necessarily interacting with the web page HTML, 
but with the document as built.
Much of the code is aimed at working around the document injected by the web page, 
and by the visual layout:
ignoring the header and footer code!

## Not a chatbot

The intention of a chatbot is to engage the user in a conversation.
Using keyword search, it provides appropriate (stock) replies, aimed at provoking the user to enter further utterances.
Just Talk uses keywords, these are to invoke actions to interact with a browser.
There are informative replies to reassure the user that the appropriate action has been performed.
In many ways is it like SHRDLU,  but interacting with the web rather than a world of blocks.

# [so] what commands [are there]

Commands are given as boilerplate verb-phrases, interspersed with noun-phrases 
So the [keyword search|guesses] currently includes:
- click on X
- read .. from X
- read .. from main heading

## Notes

You'll need Chrome for the moment, I'm afraid.
If there's anyone out there in webland who knows a bit about manifests and can make 
this work on Firefox (etc.), please feel free to get in touch/fix.