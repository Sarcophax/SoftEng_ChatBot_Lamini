# SoftEng_ChatBot_Lamini

## Installation
#### --Create a Virtual Environment inside your vscode--
!Note: Make sure your vscode terminal is in `cmd` NOT `powershell`.

Clone this repo:
```
git clone https://github.com/Sarcophax/SoftEng_ChatBot_Lamini
```

After cloning this repository, <br>
Create a virtual environment inside the cloned reposiory folder.


This helps isolate dependencies for your project. Here's a step-by-step guide:

**Step 1: Open the Cloned Repository in VSCode**<br>
Open VSCode and navigate to the folder where you have cloned your repository using the "Open Folder" option.

**Step 2: Open the Terminal in VSCode**<br>
Use the integrated terminal in VSCode by selecting "View" in the top menu, then "Terminal" or by pressing Ctrl + `.

**Step 3: Create a Virtual Environment**<br>
In the terminal, navigate to your project's root directory (where your cloned repository is) using the `cd PATH_OF_THE_CLONED_REPOSITORY` command. Example `cd SoftEng_ChatBot_Lamini`. <br>
Once there, type the following command to create a virtual environment:

```
python -m venv venv
```

**Step 4: Activate the Virtual Environment**<br>
Activate the virtual environment by running:

```
.\venv\Scripts\activate
```

You should see the virtual environment name in your terminal prompt, indicating that it's active.


#### --Install Dependencies--

```
pip install -r requirements.txt
```

#### --Cloning the Model--
Run this in your vscode terminal
```
git lfs clone https://huggingface.co/MBZUAI/LaMini-T5-738M
```

## How to start FastAPI

```
uvicorn main:app --reload
```
