const PlacePhotos = {
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
            "type": "integer",
            "format": "int32",
            "description": "The specified number of photos per page. Returns 10 photos by default, up to a maximum number of 50."
          },
          "sort": {
            "type": "string",
            "enum": [
              "POPULAR",
              "NEWEST"
            ],
            "description": "Specifies the order in which results are listed. Possible values are:<ul><li>popular (default) - sorts results based on their popularity among Foursquare users</li><li>newest - sorts results from most recently added to least recently added</li></ul>"
          },
          "classifications": {
            "type": "string",
            "description": "Restricts the results to photos matching the specified classifications, separated by a comma. Possible values are:<ul><li>exhibit</li><li>facilities</li><li>food_or_drink</li><li>indoor_facilities_and_classrooms</li><li>indoor_general</li><li>indoor_or_ambience</li><li>logos</li><li>menu</li><li>monuments_and_landmark_buildings</li><li>outdoor</li><li>outdoor_building_and_grounds</li><li>outdoor_building_exterior</li><li>outdoor_grounds</li><li>outdoor_or_storefront</li><li>outdoor_scenery</li><li>product</li></ul>"
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
      "$schema": "http://json-schema.org/draft-04/schema#"
    }
  }
} as const;
export default PlacePhotos
