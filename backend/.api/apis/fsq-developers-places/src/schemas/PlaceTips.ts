const PlaceTips = {
  "metadata": {
    "allOf": [
      {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "fsq_place_id": {
            "type": "string",
            "description": "A unique string identifier for a FSQ Place (formerly known as Venue ID). E.g., Foursquare HQ's fsq_place_id = 5a187743ccad6b307315e6fe"
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
          "limit": {
            "maximum": 50,
            "minimum": 1,
            "type": "integer",
            "format": "int32",
            "description": "The specified number of tips per page. Returns 10 tips by default, up to a maximum number of 50."
          },
          "fields": {
            "type": "string",
            "description": "Indicate which fields to return in the response, separated by commas. Supported fields are:<ul><li> fsq_tip_id - The ID of the tip to be returned.</li><li> created_at - The timestamp indicating when the tip was created; UNIX timestamp in seconds since Epoch.</li><li> text - The text of the returned tip.</li><li> lang - The language of the returned tip.</li><li> url - The URL associated with the returned tip.</li><li> agree_count - The count of users who have agreed with the returned tip.</li><li> disagree_count - The count of users who have disagreed with the returned tip.</li><li> photo - The ID of the photo asociated with the returned tip.</li></ul>Default fields if this param is omitted are \"fsq_tip_id\", \"created_at\", and \"text\"."
          },
          "sort": {
            "type": "string",
            "enum": [
              "POPULAR",
              "NEWEST"
            ],
            "description": "Specifies the order in which results are listed. Possible values are:<ul><li>popular (default) - sorts results based on their popularity among Foursquare users</li><li>newest - sorts results from most recently added to least recently added</li></ul>"
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
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "fsq_tip_id": {
            "type": "string"
          },
          "created_at": {
            "type": "string",
            "format": "date-time"
          },
          "text": {
            "type": "string"
          },
          "url": {
            "type": "string"
          },
          "photo": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "created_at": {
                "type": "string",
                "format": "date-time"
              },
              "prefix": {
                "type": "string"
              },
              "suffix": {
                "type": "string"
              },
              "width": {
                "type": "integer",
                "format": "int32"
              },
              "height": {
                "type": "integer",
                "format": "int32"
              },
              "classifications": {
                "type": "array",
                "properties": {
                  "traversable_again": {
                    "type": "boolean"
                  }
                },
                "items": {
                  "type": "string"
                }
              },
              "tip": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string"
                  },
                  "created_at": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "text": {
                    "type": "string"
                  },
                  "url": {
                    "type": "string"
                  },
                  "photo": {},
                  "lang": {
                    "type": "string"
                  },
                  "agree_count": {
                    "type": "integer",
                    "format": "int32"
                  },
                  "disagree_count": {
                    "type": "integer",
                    "format": "int32"
                  }
                }
              }
            }
          },
          "lang": {
            "type": "string"
          },
          "agree_count": {
            "type": "integer",
            "format": "int32"
          },
          "disagree_count": {
            "type": "integer",
            "format": "int32"
          }
        }
      },
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlaceTips
