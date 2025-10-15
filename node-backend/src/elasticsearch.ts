import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

const esClient = new Client({
    node: process.env.ELASTICSEARCH_HOST || "http://localhost:9200", //server
});

export default esClient;
