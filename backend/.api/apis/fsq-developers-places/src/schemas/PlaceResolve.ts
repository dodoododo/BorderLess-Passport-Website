const PlaceResolve = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "foreign_id": {
            "type": "string",
            "description": "The partner's place identifier from submitted source data."
          }
        },
        "required": [
          "foreign_id"
        ]
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
        "matched": {
          "type": "boolean"
        },
        "foreign_id": {
          "type": "string"
        },
        "matches": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "object",
            "properties": {
              "fsq_place_id": {
                "type": "string"
              }
            }
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlaceResolve
