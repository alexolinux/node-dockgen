# node-dockgen
A ***'simple'*** nodeJS lab to generate basic `Dockerfile`

---

## Overview

This is a basic and simple Node.js application that allows users without any knowledge about `docker` to easily generate basic Dockerfiles for their projects with a simple web-based interface.

## Requirements

To run this project, you need to have the following software installed on your system:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm (Node Package Manager): Included with Node.js installation
- Git: [Download Git](https://git-scm.com/)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/dockerfile-generator.git
    ```

2. Navigate to the project directory:

    ```bash
    cd node-dockgen
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the application:

    ```bash
    node index.js
    ```

2. Open your web browser and visit [http://localhost:3000](http://localhost:3000).

3. Fill out the form with the required information for your Dockerfile.

4. Click the "Generate Dockerfile" button.

5. A Basic Dockerfile will be generated based on your input, and you will see the generated Dockerfile on the page.

```yaml
FROM alexmbarbosa/flask-python3:latest
WORKDIR /app
COPY . /app
EXPOSE 5000

CMD ["python", "app.py"]
```

6. A popup message will notify you that the Dockerfile has been generated in the project folder.

## Author

Alex Mendes

<https://www.linkedin.com/in/mendesalex>
