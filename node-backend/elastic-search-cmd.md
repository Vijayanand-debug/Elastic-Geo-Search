# creating new index with mapping
    curl -XPUT "http://127.0.0.1:9200/products" -H "Content-Type: application/json" -d'
    {
        "mappings": {
            "properties": {
                "location": {
                    "type": "geo_point"
                },
                "price": {
                    "type": "float"
                },
                "name": {
                    "type": "keyword"
                },
                "brand": {
                    "type": "search_as_you_type"
                },
                "city": {
                    "type": "keyword"
                }   
            }
        }
    }'

# check geo_point mapping on the products index
    curl -XGET "http://127.0.0.1:9200/products/_mapping"

# to bulk upload - use .ndjson data format
    curl -XPOST "http://127.0.0.1:9200/products/_bulk" -H "Content-Type: application/x-ndjson" --data-binary "@products_bulk.ndjson"

# check for the count of records in the elastic search db
    curl -XGET "http://127.0.0.1:9200/products/_count"


# deleting the existing index
    curl -XDELETE "http://127.0.0.1:9200/products"

