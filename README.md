This is a full stack app, built for a deeper understanding about geospatial search with Elasticsearch.

![Architecture Diagram](./architecture.png)

Pick any spot in Ireland, and it instantly shows you a list of products nearby. From there, you can search, filter and sort products in real time. The app deals with a dataset of 100,000 products. 

![App Demo](./demogif.gif)

What it Does:

- Geospatial Search: Finds products within a certain set distance(radius) of any chosen location.
- Sorting: Sort results by relevance, distance, or by price.
- Infinite Scrolling: Implements infinite scrolling with an offset of 30 products.
- UI Feedback: Toast notifications show the number of products found in and around a selected location and how many products are loading on each API request.

Tech Stack:

The entire app runs on Docker containers.
- Frontend: React, Vite, Typescript, Redux, Tailwind.
- Backend: Node.js, Express, Typescript.
- Database & Infra: Elasticsearch, Docker, Deployed on EKS.

How To Run It Locally:

Step 1 - Clone the Repo:
- Clone the project
    - git clone https://github.com/Vijayanand-debug/Elastic-Geo-Search.git
    - cd Elastic-Geo-Search

Step 2 - Set Up Env Variables
- In the backend node-backend, create a .env file and add
    - ELASTICSEARCH_HOST=http://elasticsearch:9200

Step 3 - Set Up the Datbase and Generate the Product Data
- Follow the instructions from node-backend/elastic-search-cmd.md file

Step 4 - Start Docker Containers
- docker-compose up -d --build
