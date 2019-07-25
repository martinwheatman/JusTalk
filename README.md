# Just Talk - A Vocal Web Driver

Just Talk is an *experimental* keyword interpreter which is directed at Web intereaction.
These keywords help the user invoke the actions of a browser.
In keeping with speech act theory, there are informative replies to 
reassure the user that the appropriate action has been performed.
In many ways is it like Tery Winograd's Blocks World program,
[SHRDLU](https://en.wikipedia.org/wiki/SHRDLU), 
but it interacts with a web page of widgets rather than a tray of blocks.
Specifically, interaction is with the Document Object Model.
This means that it is not necessarily interacting with the web page HTML, 
but with the document as built.
Much of the code, therefore, is aimed at working around the document as injected 
by the web page, and by the visual elements of layout:
e.g. ignoring the header and footer code!

## To install:

Go to the [Just Talk Chrome Extension webpage](https://chrome.google.com/webstore/search/enguage?h1=en), and add it to your browser.

Because this may be out of date--it takes a few days for the upload to become visible--you may want [follow these instructions](https://youtu.be/6yZKteo1a2I):

- download these files in this repo into a directory/folder;
- go to chrome://extensions
- switch on "Developer mode"
- Select "Load Unpacked", and load the downloads from the new directory/folder created above.

If Chrome does not responding to the Ctrl-Space sequence, it
may be that you need [to unblock your microphone](https://www.youtube.com/watch?v=TiZcsd_BahU).

## Use cases:

- Ctrl-Space and say "Hello";
- [Navigating to a story on the BBC News website](https://www.youtube.com/watch?v=Q9PAZGEJe0E&t=2s);
- [Using Google to find an article on Wikipedia](https://www.youtube.com/watch?v=yWuij7lBooQ);
- Tweeting by voice, still trying!
- Facebook/Instagram: I'm not on these platforms, anyone else?

## Command details

Commands are given as verb-phrase string-literals, interspersed with noun-phrase variables.
So the comand to click on a button is currently described as:
- click on X

Where X is the 'name' of the button. Following the specification for clickable items, this is either the title, value, innerText or the 'submit' button.  Radio buttons and checkboxes are not supported yet.

Similarly, the page reader included the commands:
- read .. from X
- read .. from the main heading

Text and text areas are managed with the commands:
- set the value of X to Y
- get the value of X

Describing the page, there are several commands:
- describe the page
- how many \[buttons|values|links|figures|headings|paragraphs] are there
- how do I \[navigate|interact|query]
- what \[buttons|values|links|figures|title|headings|paragraphs] are there

## Notes

- You'll need Chrome for the moment, I'm afraid.
If there's anyone out there in webland who knows a bit about manifests and can make 
this work on Firefox (etc.), please feel free to get in touch/fix. I *will* address this, but its not high priority.
- you'll need to manually allow the microphone access to each page you visit. This pop-up seems to be inaccessible at the moment.
- this is experimental in that the source code may change widely as the extension develops.
- Radio buttons and checkboxes are still to be completed.