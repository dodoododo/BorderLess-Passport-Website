const PlaceSuggestStatus = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "suggested_edit_ids": {
            "type": "string",
            "description": "A comma seperated list of suggested edit IDs. If specified, shows only suggested edits with these IDs. If not specified, returns all edits suggested using the calling service token."
          },
          "limit": {
            "maximum": 50,
            "minimum": 0,
            "type": "integer",
            "format": "int32",
            "description": "The specified number of suggested edits per page. Returns 10 suggested edits by default, up to a maximum number of 50."
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
        "suggested_edits": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "fsq_place_id": {
                "type": "string"
              },
              "suggested_edit_type": {
                "type": "string"
              },
              "created_at": {
                "type": "string",
                "format": "date-time"
              },
              "resolved_time": {
                "type": "string",
                "format": "date-time"
              },
              "rolled_back": {
                "type": "object",
                "additionalProperties": true
              },
              "status": {
                "type": "string"
              },
              "created_fsq_place_id": {
                "type": "string"
              },
              "matched_fsq_place_id": {
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
export default PlaceSuggestStatus
