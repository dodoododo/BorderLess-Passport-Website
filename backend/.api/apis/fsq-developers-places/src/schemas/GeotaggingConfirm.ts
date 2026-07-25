const GeotaggingConfirm = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "request_id": {
            "type": "string",
            "description": "The request ID pulled from the header of the /geotagging/candidates request that generated the list of candidates shown to the user. The header key is X-Fsq-Request-Id."
          },
          "fsq_place_id": {
            "type": "string",
            "description": "The FSQ Place ID of the place which was selected by the user from the candidates list"
          },
          "confirm_context": {
            "type": "string",
            "enum": [
              "CurrentLocation",
              "Nearby",
              "Destination",
              "Search"
            ],
            "description": "Specify the use case for specified request. Options are: CurrentLocation, Nearby, Destination, Search"
          },
          "delayed": {
            "type": "boolean"
          }
        }
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "X-Places-Api-Version": {
            "type": "string",
            "default": "2025-06-17",
            "enum": [
              "2025-06-17"
            ],
            "description": "The version of the API to use."
          }
        },
        "required": [
          "X-Places-Api-Version"
        ]
      }
    ]
  },
  "response": {
    "200": {
      "type": "object",
      "properties": {
        "response": {
          "type": "string"
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default GeotaggingConfirm
