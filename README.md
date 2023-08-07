# Table Top Stories

An Applicaton for World Building in table top games such as DnD and Pathfinder

Main is the working branch

Development is a work in progress

## Running the Project

To launch this application on your local machine, please ensure that you meet the requirements.

#### Requirements:

-   Docker Desktop
-   Google Chrome or any browser

#### Installation

1.  Download and install **Docker Desktop** [here](https://www.docker.com/products/docker-desktop/)
2.  Open Terminal and choose the directory you will be working on by running this command:
    > `cd directory_name` <br><small>(change "directory_name" to your respective directory)</small>
3.  Fork and Clone tableTopStories from Git
    > `git clone paste_copied_HTTPS_URL_here`
4.  Change your working directory to the directory you just cloned
    > `cd tableTopStories`
5.  Create the volume in Docker
    > `docker volume create table-top-stories`
6.  Build the images on Docker > `docker-compose build`
7.  Run the container from the images you just created
    > `docker-compose up` <br><small>(at this point you should see all 3 containers running on Docker Desktop)</small>
8.  Open a browser of choice. Google Chrome is _recommended_.
9.  Head over to http://localhost:3000/ in your browser to start browsing through the website!
