const PlaceFlag = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "fsq_place_id": {
            "type": "string",
            "description": "A unique string identifier for a FSQ Place (formerly known as Venue ID). E.g., Foursquare HQ's fsq_place_id = 5a187743ccad6b307315e6fe."
          }
        },
        "required": [
          "fsq_place_id"
        ]
      },
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "dry_run": {
            "type": "boolean",
            "default": true,
            "description": "If true, return the expected result without actually submitting the suggestion. Useful for testing.\n**Note this defaults to *false* in all cases EXCEPT when calling through this docs page.**"
          },
          "fields": {
            "type": "string",
            "description": "List of fields being flagged as incorrect. Possible values are:<ul><li>address</li><li>latitude</li><li>longitude</li><li>locality</li><li>name</li><li>tel</li><li>postcode</li><li>region</li><li>state</li><li>website</li><li>placeActions</li></ul>"
          },
          "comment": {
            "type": "string",
            "description": "A comment describing the issue being flagged."
          }
        },
        "required": [
          "fields"
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
        },
        "errors": {
          "type": "array",
          "properties": {
            "traversable_again": {
              "type": "boolean"
            }
          },
          "items": {
            "type": "string"
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlaceFlag
