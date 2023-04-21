Hello world

after opening the github make sure you're in the \ExplainerMD\ folder in the terminal of VSCode, then run
1. npm install 
2. npm run dev

(you might have to do some setup getting npm on your computer)


### Initial Setup
put google cloud authentication file (davi's is the "citric-trees... .json" file) inside of ML folder
install requirements.txt in the ML folder:
`cd ML`
`pip install -r requirements.txt`
(you may have to force pip to install in the same Python Instance that you are actually running the python flask server on, you may need to run a command like this:
`C:/Users/.../python3.9.exe -m pip install -r requirements.txt`
)
If you get some output like this `Running on http://127.0.0.1:5000` it works, you can press ctrl+c to stop it
now go to the react folder, `cd react` and do `npm install` (probably don't have to worry about vulnerabilities)

### Running it normally
`cd ML`
`flask --app main run`
go to a new terminal
`cd react`
`npm run dev`
You'll get output that says "  ➜  Local:   http://127.0.0.1:5173/" but I had to access the site via http://localhost:5173/ for google account login to work 